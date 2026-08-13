# Design: Barra de controles custom en DiagramCanvas

## Technical Approach

`Controls.js` deja de renderizar `<Controls>` y arma la barra con primitivos sin dependencia de contexto (`Panel`, `ControlButton`) más los hooks de estado (`useReactFlow`, `useStore`, `useStoreApi`), disponibles porque `DiagramCanvas.js:17` ya envuelve todo en `<ReactFlowProvider>`. La barra tiene hasta 3 `Group` hermanos, cada uno opcional salvo el nativo: `additionalControls` (solo si hay al menos un nodo), el grupo nativo de zoom in/zoom out/fit view (`CONTROLS`, siempre), y el grupo del toggle de interactividad (solo si `!readOnly`) — separados entre sí por un divisor (`border-top`, ver `styles.js` `Group` `& + &`) que reproduce `docs/design.png`. Los 3 nativos de zoom/fit y el toggle comparten un mismo helper de render (`renderControlButton`) para no duplicar la estructura `ButtonWrapper`+`Button`+`Icon`, pero se renderizan en `Group`s distintos — nunca se fusionan en un solo `.map`. Los del consumidor van por `additionalControls`, normalizados con `React.Children.toArray` (acepta nodo suelto, array, o arrays anidados) y renderizados tal cual (sin desarmar forma). `Canvas.js` reenvía `readOnly` y `additionalControls` a `<DiagramControls>` (`:269`) y `DiagramCanvas.js` los deja pasar por el `...rest` existente (`:14`), sin tocar `config`. Ver `exploration.md` (Approach 1).

## Architecture Decisions

### Decision: `Panel` + `ControlButton` en vez de `<Controls>` con `children`

**Choice**: contenedor propio (`styled(Panel)`) con hasta 3 `Group` hermanos (ver Technical Approach).
**Alternatives considered**: `<Controls>` + `children`; barra 100% bespoke sin imports de RF.
**Rationale**: `children` solo *agrega* botones al final del mismo bloque — no permite varios grupos ni reemplazar los iconos nativos (verificado en `@xyflow/react/dist/esm/index.js:4482-4517`). La bespoke no aporta nada sobre `ControlButton`, ya un `<button>` sin lógica propia.

**REVISADA (code review, comentario #9)**: el reviewer propuso fusionar el toggle de interactividad dentro del mismo objeto/`.map` que zoom in/zoom out/fit view (una función `buildControls` con las 4 keys, un solo `Group`), señalando él mismo el efecto colateral de que "se va el tercer grupo y su separador". Se rechazó: `docs/design.png`/`docs/controls.png`/`docs/actual.png` muestran un divisor gris entre el toggle y los otros 3 botones — perderlo es una regresión visual, no una limpieza. Se resolvió la duplicación real (JSX repetida a mano para el toggle) extrayendo `renderControlButton` como helper compartido, sin fusionar los `Group`.

### Decision: objeto `controlBarActions` iterado

**Choice**: config declarativa `{ icon(state), label, isDisabled?(state) }` + handlers aparte.
**Alternatives considered**: 4 bloques de JSX casi idénticos.
**Rationale**: el JSX repetido difiere solo en icono/label/disabled; el objeto deja un punto único de cambio y hace trivial agregar flags `showZoom`-like. Los handlers van aparte: necesitan los closures de los hooks.

### Decision: `additionalControls` como array de nodos React, no de objetos de config

**Choice**: `additionalControls: PropTypes.arrayOf(PropTypes.node)` — el consumidor pasa elementos ya armados (botones, `Switch`, `Checkbox`, lo que sea) y `Controls.js` los renderiza tal cual dentro de su `Group`, envueltos en `React.Fragment key={index}` (lista chica y de orden estable: usar índice como key es aceptable acá).
**Alternatives considered**: `{ icon, onClick, ariaLabel }[]` (planteo original: `ui-web` arma un `Button`+`Icon` fijo por cada entrada).
**Rationale**: el objeto de config solo podía representar un botón con icono — cualquier otro tipo de control (switch, checkbox, texto, un grupo de radio) quedaba fuera de la API. Como nodo React, `ui-web` no impone ninguna forma: estilo, accesibilidad (`aria-label`, etc.) y comportamiento de cada control quedan enteramente del lado del consumidor, igual que ya ocurre con `nodeComponents`.

**REVISADA**: este cambio de shape se decidió antes de publicar el paquete — ningún consumidor real (`janis-views/crossdocking` incluido) usaba todavía la prop, por lo que no hay compatibilidad hacia atrás que romper.

**REVISADA (code review, comentarios #3/#4)**: `PropTypes.arrayOf(PropTypes.node)` asumía que el consumidor siempre pasa un array. Un nodo suelto (`additionalControls={<button />}`, error fácil dado el nombre de la prop) no tiene `.length` → `!!undefined` es `false` → el grupo se omite en silencio (sin error en producción, donde PropTypes se elimina). Un string (que `PropTypes.node` permite) sí tiene `.length` truthy pero no `.map` → crash. Separado de esto, la key manual (`control.key ?? index`) mezclaba dos namespaces y podía colisionar (`key="0"` explícita vs. índice `0`). Se reemplazó todo por `React.Children.toArray(additionalControls)`: acepta nodo suelto/array/arrays anidados, descarta `null`/`undefined`/booleanos, y asigna keys estables sin colisión (prefija las explícitas, genera posicionales para el resto). `PropTypes` pasa a `PropTypes.node` (cubre nodo suelto y array).

### Decision: `toggleInteractivity` oculto cuando `config.readOnly` es `true` (code review, comentario #1)

**Choice**: `Canvas.js` reenvía `readOnly` a `<DiagramControls>`; `Controls.js` renderiza el `Group` del botón de lock solo cuando `!readOnly`.
**Alternatives considered**: ninguna — el estado anterior (candado siempre visible) no era una alternativa deliberada, era el bug reportado.
**Rationale**: `toggleInteractivity` escribe directo en el store de React Flow (`nodesDraggable`/`nodesConnectable`/`elementsSelectable`) sin considerar `config.readOnly`; con `readOnly: true` (default) el usuario final podía volver editable un canvas declarado de solo lectura, y el override persistía porque RF solo re-sincroniza esas props cuando cambia el valor de la prop de `<ReactFlow>` (que `Canvas.js` fija una sola vez). En un canvas read-only el botón no tiene sentido: existe para congelar temporalmente un canvas editable, no para des-bloquear uno que el consumidor declaró inmutable.

### Decision: sin i18n en `ui-web`; `labels` como override

**Choice**: defaults en español en `controlBarActions`, override opcional vía prop `labels`.
**Alternatives considered**: capa de i18n/diccionario dentro del paquete.
**Rationale**: precedente explícito en `ErrorBoundary.js:11` ("pass already-resolved text"); el paquete no tiene runtime de traducción.

**REVISADA**: antes de cerrar la implementación se decidió eliminar la prop `labels` por completo. Los 4 `aria-label` de `controlBarActions` quedan hardcodeados en inglés (`Zoom in`, `Zoom out`, `Fit view`, `Toggle lock`), sin ningún mecanismo de override, por el momento. Se mantiene la decisión de no tener runtime de i18n en el paquete; lo que cambia es que ni siquiera se expone un punto de extensión para el `aria-label` — se difiere a un change futuro si surge la necesidad (ver Open Questions).

**REVISADA (code review, comentario #5)**: los botones nativos tenían `aria-label` pero no `title` — el `<Controls />` nativo que este componente reemplaza sí traía `title` (tooltip on-hover para mouse), y perderlo era una regresión de UX/accesibilidad. Se agregó `title={action.label}` (mismo texto que el `aria-label`) a cada botón nativo, incluido el toggle. También se agregó `aria-label="Diagram controls"` al `Panel` contenedor, que había quedado sin nombre accesible. Confirmado que `Panel` y `ControlButton` de `@xyflow/react` reenvían props arbitrarias al DOM subyacente vía `...rest` (`dist/esm/index.js` líneas ~123-125 y ~4482-4484), así que no hace falta ningún wrapper adicional.

### Decision: reemplazo de `createGlobalStyle` + `!important`

**Choice**: baja de `ControlsGlobalStyle` y del `style` inline (`CONTROLS_STYLE`); el separador entre grupos pasa a ser `border-top`/`gap` del segundo `Group`; los overrides de clases RF se resuelven con `&&` (doble clase → 0,2,0).

```js
Button: styled(ControlButton)`
	&& { width: 32px; height: 32px; border: none; background: transparent; }
	&& svg { max-width: none; max-height: none; fill: ${getColor('black')}; }   // vence …-button svg
`
```

**Alternatives considered**: seguir con `!important`; confiar en el orden de inyección de styled-components.
**Rationale**: el `!important` existía porque el `style` inline gana a cualquier hoja; sin inline no hace falta. `.react-flow__controls-button` (`dist/style.css:415`) es 0,1,0 y `…-button svg` (`:438`) 0,1,1; como el orden de inyección de SC vs. `import '@xyflow/react/dist/style.css'` (`DiagramCanvas.js:3`) no está garantizado, `&&` gana igual.

**REVISADA (code review, comentario #6)**: el `&&` base no declaraba `background`, así que en reposo el botón heredaba el default no documentado de la librería (`--xy-controls-button-background-color-default: #fefefe`), casi imperceptible sobre el `#ffffff` del `Panel` pero fuera de nuestro control (podía cambiar en cualquier upgrade de `@xyflow/react`). Se agregó `background: transparent` explícito al `&&` base — el `Panel` pasa a ser el único dueño del color de fondo visible. El `:hover` (`background: ${getColor('greyHoverLight')}`) sigue ganando sin conflicto por estar anidado dentro del mismo bloque `&&` (mayor especificidad que la base), y `:disabled` no toca `background`, así que el estado disabled queda transparente + atenuado por `opacity`, sin efecto visual raro.

**REVISADA (code review, comentario #2)**: `&& svg` tampoco declaraba `fill`, y el `fill: ${(props) => getColor(props.color)}` de `<Icon>` (aplicado sobre el propio `<svg>`, especificidad 0,1,0) perdía contra `.react-flow__controls-button svg { fill: currentColor; ... }` nativo (0,1,1) — los íconos terminaban heredando el `color` del host en vez del negro elegido. Se agregó `fill: ${getColor('black')}` al bloque `&& svg` (especificidad 0,2,1, gana), y se sacó el `color="black"` (ya inútil) de los `<Icon>` en `Controls.js`.

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
// CONTROLS — interno, NO exportado. Solo los 3 nativos de zoom/fit;
// toggleInteractivity NO es una key de este objeto (ver REVISADA comentario #9).
{ [key]: { icon: (state) => string, label: string, isDisabled?: (state) => boolean } }
// key ∈ zoomIn | zoomOut | fitView
// state = { isInteractive, minZoomReached, maxZoomReached }
// iconos: plus_bold_medium | minus_bold_medium | expand

// toggleInteractivity — literal aparte, misma forma { icon, label, handler },
// renderizado con el mismo helper renderControlButton pero en su propio
// Group (separado por divisor), no dentro de CONTROLS.map (ver REVISADA
// comentario #9). icono: lock|unlock

// Cada botón nativo (nativos + toggle) expone aria-label Y title (mismo
// texto: label, o "Toggle lock" para el toggle) — ver REVISADA (code
// review, comentario #5) más abajo.

readOnly: boolean  // default false; oculta el botón toggleInteractivity (ver REVISADA arriba)

additionalControls: PropTypes.node  // default: undefined
// Nodo(s) React ya armados por el consumidor (un elemento suelto, un array,
// o arrays anidados: botón, Switch, Checkbox, etc.); Controls.js lo renderiza
// sin desarmarlo, normalizado vía React.Children.toArray. Sin campos
// requeridos: forma, estilo, accesibilidad y comportamiento son
// responsabilidad de quien lo define. (Ver REVISADA code review arriba.)

// Panel contenedor: aria-label="Diagram controls" fijo, no configurable.
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | 4 botones nativos (o 3 si `readOnly`) con su icono; toggle en `Group` propio separado por divisor de zoom/fit; nodo suelto o array de N nodos de `additionalControls` renderizados tal cual (sin desarmar forma) en su propio `Group`, o ningún grupo extra si está ausente/vacío; `aria-label` Y `title` fijos en inglés por botón nativo; `Panel` con `aria-label="Diagram controls"` | Jest 27 + Enzyme `mount` (globals de `config/jest/setup.js`), mock de los 3 hooks |
| Unit | `disabled` en min/maxZoomReached; icono `lock`↔`unlock`; toggle invierte los 3 flags | `useStore` mockeado por selector; assert en props de `<Icon>` y espía en `setState` |
| Integration | Estilos de `Panel`/`Group`/`Button`, incluido `fill` del `&& svg` y `background: transparent` en reposo del `Button` | CSS crudo (`document.head.innerHTML`) filtrado por la clase dinámica del componente. **REVISADA**: se había previsto `jest-styled-components` (`toHaveStyleRule`), pero el matcher no resuelve declaraciones anidadas dentro del bloque `&&{...}` (doble clase, especificidad 0,2,0) — confirmado con un componente mínimo reproducido ad-hoc: falla con "No style rules found" aunque las reglas están efectivamente en el CSS inyectado. Limitación del matcher con este patrón, no un bug del código. |
| E2E | — | Sin infra E2E; cobertura visual en Storybook |

## Migration / Rollout

No requiere migración: ambos props son opcionales y aditivos, y `config.showControls` no cambia. Es un cambio visual (no de API) para todo consumidor con controles visibles. Rollback = revert del PR (`proposal.md`).

## Open Questions

- [ ] Tamaño/padding de `Group`/`Button` y separación entre grupos: se ajustan contra `docs/design.png`.
- [ ] `plus_bold_medium` vs `plus_bold_small` para zoom in (ambos 16px): decisión visual.
- [ ] Soportar override/i18n de `aria-label` de los botones nativos (prop `labels` u otro mecanismo) si algún consumidor lo necesita a futuro — por el momento quedan hardcodeados en inglés.
