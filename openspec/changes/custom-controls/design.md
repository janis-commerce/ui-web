# Design: Barra de controles custom en DiagramCanvas

## Technical Approach

`Controls.js` deja de renderizar `<Controls>` y arma la barra con primitivos sin dependencia de contexto (`Panel`, `ControlButton`) más los hooks de estado (`useReactFlow`, `useStore`, `useStoreApi`), disponibles porque `DiagramCanvas.js:17` ya envuelve todo en `<ReactFlowProvider>`. Los 4 botones nativos se declaran en `controlBarActions` y se renderizan con `.map`; los del consumidor van por `additionalControls` en un `Group` aparte, renderizados tal cual (sin desarmar forma) envueltos en `React.Fragment key={index}`. `Canvas.js` reenvía ambos props a `<DiagramControls>` (`:267`) y `DiagramCanvas.js` los deja pasar por el `...rest` existente (`:14`), sin tocar `config`. Ver `exploration.md` (Approach 1).

## Architecture Decisions

### Decision: `Panel` + `ControlButton` en vez de `<Controls>` con `children`

**Choice**: contenedor propio (`styled(Panel)`) con dos `Group` hermanos.
**Alternatives considered**: `<Controls>` + `children`; barra 100% bespoke sin imports de RF.
**Rationale**: `children` solo *agrega* botones al final del mismo bloque — no permite dos grupos ni reemplazar los iconos nativos (verificado en `@xyflow/react/dist/esm/index.js:4482-4517`). La bespoke no aporta nada sobre `ControlButton`, ya un `<button>` sin lógica propia.

### Decision: objeto `controlBarActions` iterado

**Choice**: config declarativa `{ icon(state), label, isDisabled?(state) }` + handlers aparte.
**Alternatives considered**: 4 bloques de JSX casi idénticos.
**Rationale**: el JSX repetido difiere solo en icono/label/disabled; el objeto deja un punto único de cambio y hace trivial agregar flags `showZoom`-like. Los handlers van aparte: necesitan los closures de los hooks.

### Decision: `additionalControls` como array de nodos React, no de objetos de config

**Choice**: `additionalControls: PropTypes.arrayOf(PropTypes.node)` — el consumidor pasa elementos ya armados (botones, `Switch`, `Checkbox`, lo que sea) y `Controls.js` los renderiza tal cual dentro de su `Group`, envueltos en `React.Fragment key={index}` (lista chica y de orden estable: usar índice como key es aceptable acá).
**Alternatives considered**: `{ icon, onClick, ariaLabel }[]` (planteo original: `ui-web` arma un `Button`+`Icon` fijo por cada entrada).
**Rationale**: el objeto de config solo podía representar un botón con icono — cualquier otro tipo de control (switch, checkbox, texto, un grupo de radio) quedaba fuera de la API. Como nodo React, `ui-web` no impone ninguna forma: estilo, accesibilidad (`aria-label`, etc.) y comportamiento de cada control quedan enteramente del lado del consumidor, igual que ya ocurre con `nodeComponents`.

**REVISADA**: este cambio de shape se decidió antes de publicar el paquete — ningún consumidor real (`janis-views/crossdocking` incluido) usaba todavía la prop, por lo que no hay compatibilidad hacia atrás que romper.

### Decision: sin i18n en `ui-web`; `labels` como override

**Choice**: defaults en español en `controlBarActions`, override opcional vía prop `labels`.
**Alternatives considered**: capa de i18n/diccionario dentro del paquete.
**Rationale**: precedente explícito en `ErrorBoundary.js:11` ("pass already-resolved text"); el paquete no tiene runtime de traducción.

**REVISADA**: antes de cerrar la implementación se decidió eliminar la prop `labels` por completo. Los 4 `aria-label` de `controlBarActions` quedan hardcodeados en inglés (`Zoom in`, `Zoom out`, `Fit view`, `Toggle lock`), sin ningún mecanismo de override, por el momento. Se mantiene la decisión de no tener runtime de i18n en el paquete; lo que cambia es que ni siquiera se expone un punto de extensión para el `aria-label` — se difiere a un change futuro si surge la necesidad (ver Open Questions).

### Decision: reemplazo de `createGlobalStyle` + `!important`

**Choice**: baja de `ControlsGlobalStyle` y del `style` inline (`CONTROLS_STYLE`); el separador entre grupos pasa a ser `border-top`/`gap` del segundo `Group`; los overrides de clases RF se resuelven con `&&` (doble clase → 0,2,0).

```js
Button: styled(ControlButton)`
	&& { width: 32px; height: 32px; border: none; background: #fff; }
	&& svg { max-width: none; max-height: none; }   // vence …-button svg
`
```

**Alternatives considered**: seguir con `!important`; confiar en el orden de inyección de styled-components.
**Rationale**: el `!important` existía porque el `style` inline gana a cualquier hoja; sin inline no hace falta. `.react-flow__controls-button` (`dist/style.css:415`) es 0,1,0 y `…-button svg` (`:438`) 0,1,1; como el orden de inyección de SC vs. `import '@xyflow/react/dist/style.css'` (`DiagramCanvas.js:3`) no está garantizado, `&&` gana igual.

## Data Flow

```
consumidor ─additionalControls─→ DiagramCanvas ─→ Canvas ─→ DiagramControls
                                                                        │
   zoomIn/Out/fitView ──→ useReactFlow() ─────────→ store RF ──┐        │
   toggleInteractivity ─→ setState({nodesDraggable,...}) ──────┤        │
                                                               ▼        ▼
   useStore(selector) ←── transform/minZoom/maxZoom/flags ── re-render (disabled, lock↔unlock)
```

Secuencia del toggle:

```
Usuario → Button → setState(!isInteractive ×3) → useStore emite → icon() → 'lock'|'unlock'
```

Selectores separados que devuelven primitivos: evitan `shallow`, que `@xyflow/react` no exporta.

## File Changes

Rutas bajo `src/components/DiagramCanvas/`.

| File | Action | Description |
|------|--------|-------------|
| `Controls.js` | Modify | Reescritura: primitivos + hooks, `controlBarActions`, propTypes |
| `styles.js` | Modify | Alta `Panel`/`Group`/`Button`; baja `ControlsGlobalStyle` |
| `Canvas.js` | Modify | Reenvío a `<DiagramControls>` + `canvasPropTypes` |
| `DiagramCanvas.js` | Modify | Solo si se explicitan (hoy van por `...rest`) |
| `stories/meta.js` | Modify | `argTypes` de `additionalControls` con `table.type.detail` |
| `stories/Interactions.stories.js` | Modify | Story con `additionalControls` |
| `Controls.test.js` | Create | Tests del componente |

## Interfaces / Contracts

```js
// controlBarActions — interno, NO exportado
{ [key]: { icon: (state) => string, label: string, isDisabled?: (state) => boolean } }
// key ∈ zoomIn | zoomOut | fitView | toggleInteractivity
// state = { isInteractive, minZoomReached, maxZoomReached }
// iconos: plus_bold_medium | minus_bold_medium | expand | lock|unlock

additionalControls: PropTypes.arrayOf(PropTypes.node)  // default: []
// Cada entrada es un nodo React ya armado por el consumidor (botón, Switch,
// Checkbox, etc.); Controls.js lo renderiza sin desarmarlo, envuelto en
// React.Fragment key={index}. Sin campos requeridos: forma, estilo,
// accesibilidad y comportamiento son responsabilidad de quien lo define.
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | 4 botones nativos + N nodos de `additionalControls` renderizados tal cual (sin desarmar forma) en su propio `Group`; `aria-label` fijo en inglés por botón nativo | Jest 27 + Enzyme `mount` (globals de `config/jest/setup.js`), mock de los 3 hooks |
| Unit | `disabled` en min/maxZoomReached; icono `lock`↔`unlock`; toggle invierte los 3 flags | `useStore` mockeado por selector; assert en props de `<Icon>` y espía en `setState` |
| Integration | Estilos de `Panel`/`Group`/`Button` | `jest-styled-components` (`toHaveStyleRule`); sin `!important` |
| E2E | — | Sin infra E2E; cobertura visual en Storybook |

## Migration / Rollout

No requiere migración: ambos props son opcionales y aditivos, y `config.showControls` no cambia. Es un cambio visual (no de API) para todo consumidor con controles visibles. Rollback = revert del PR (`proposal.md`).

## Open Questions

- [ ] Tamaño/padding de `Group`/`Button` y separación entre grupos: se ajustan contra `docs/design.png`.
- [ ] `plus_bold_medium` vs `plus_bold_small` para zoom in (ambos 16px): decisión visual.
- [ ] Soportar override/i18n de `aria-label` de los botones nativos (prop `labels` u otro mecanismo) si algún consumidor lo necesita a futuro — por el momento quedan hardcodeados en inglés.
