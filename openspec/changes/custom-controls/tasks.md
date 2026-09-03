# Tasks: Barra de controles custom en DiagramCanvas

## Phase 1: Foundation (styles.js)

- [x] 1.1 En `styles.js`, agregar `Panel`/`Group`/`Button` (`styled(ControlButton)`, `&&` sin `!important`) según design.md.
- [x] 1.2 En `styles.js`, eliminar `ControlsGlobalStyle` y `CONTROLS_STYLE`.

## Phase 2: Core Implementation (Controls.js)

- [x] 2.1 Reescribir `Controls.js`: `Panel` + hasta 3 `Group` (`additionalControls` / nativo / toggle) con `useReactFlow`/`useStore`/`useStoreApi`. **REVISADA (code review, comentario #9)**: eran 2 `Group` en el texto original de esta tarea, pero la implementación real siempre tuvo 3 (el toggle nunca compartió `Group` con los nativos) — texto corregido para reflejarlo; ver design.md.
- [x] 2.2 Definir `CONTROLS` (`zoomIn`/`zoomOut`/`fitView`) con `icon(state)`/`label`/`isDisabled?(state)` (Interfaces/Contracts). **REVISADA (code review, comentario #9)**: `toggleInteractivity` NO es una key de este objeto — se renderiza aparte, en su propio `Group`, con el mismo helper `renderControlButton` (ver design.md).
- [x] 2.3 Handlers `zoomIn`/`zoomOut`/`fitView` vía `useReactFlow()`; `toggleInteractivity` invierte `nodesDraggable`/`nodesConnectable`/`elementsSelectable` (Interactivity Toggle Behavior).
- [x] 2.4 Selectores `useStore` para `minZoomReached`/`maxZoomReached`/`isInteractive`, devolviendo primitivos (sin `shallow`).
- [x] 2.5 Prop `additionalControls` (`React.ReactNode`): nodo(s) React ya armados por el consumidor, normalizados con `React.Children.toArray` y renderizados tal cual (sin desarmar forma); su `Group` solo si hay al menos uno (Additional Controls Group). **REVISADA**: shape cambiado de `{icon, onClick, ariaLabel}[]` a nodos React para soportar cualquier tipo de control, no solo botones (ver design.md). **REVISADA (code review)**: de `PropTypes.arrayOf(PropTypes.node)` + `.map` con key manual a `PropTypes.node` + `React.Children.toArray` — acepta nodo suelto sin omitir el grupo en silencio, y evita colisión de keys (ver design.md).
- [x] 2.7 `propTypes`/`defaultProps` de `Controls.js` (Interfaces/Contracts).

## Phase 3: Integración

- [x] 3.1 En `Canvas.js` (~:267), reenviar `additionalControls` a `<DiagramControls>`; actualizar `canvasPropTypes`.
- [x] 3.2 En `DiagramCanvas.js`, confirmar paso vía `...rest` (:14); si no, declararlos en `propTypes`. (Confirmado: no se desestructuran en `DiagramCanvas.js`, caen en `...rest` y se reenvían tal cual; `propTypes` ya cubierto porque `DiagramCanvas.propTypes = canvasPropTypes` referencia el mismo objeto actualizado en `Canvas.js`.)

## Phase 4: Testing (`Controls.test.js`, nuevo)

**REVISADA (code review)**: esta lista original (4.1-4.13, numeración con huecos en 4.9/4.10 heredados de un recorte previo de la prop `labels`) quedó desactualizada por los fixes de los comentarios #1, #4, #5, #6 y #9 — le faltaban 3 scenarios completos de `spec.md` y varios tests existentes quedaron incompletos. Renumerada 4.1-4.14, mapeada 1:1 contra los 11 scenarios actuales de `spec.md` (más estilos y la corrida de test/build), en el mismo orden. **4.13 eliminada después** en un segundo review — ver su entrada.

- [x] 4.1 Test: con `readOnly` `false` (default propio de `DiagramControls`, sin pasar la prop), los 4 botones nativos son visibles con su icono ("All native controls render with their icons"). Montar `DiagramControls` directamente, NO `DiagramCanvas` (cuyo `defaultConfig.readOnly` es `true` y solo mostraría 3).
- [x] 4.2 Test: icono toggle `unlock` si interactivo, `lock` si no ("Toggle icon reflects current interactivity state").
- [x] 4.3 Test: con `readOnly` `true`, el botón toggle NO se renderiza, y zoom in/zoom out/fit view siguen renderizando agrupados ("Toggle button is hidden in read-only mode") — comentario #1.
- [x] 4.4 Test: con `readOnly` `false`, el botón toggle se renderiza en su propio `Group`, separado de zoom/fit por un divisor visual (asserar que son dos `Group` DOM distintos, no el mismo) ("Toggle button renders in its own group, separated by a divider") — comentario #9.
- [x] 4.5 Test: zoom in disabled con zoom === `maxZoom` ("Zoom in disabled at max zoom").
- [x] 4.6 Test: zoom out disabled en `minZoom`, ambos enabled entre límites ("Zoom out disabled at min zoom, enabled between limits").
- [x] 4.7 Test: click en toggle sobre diagrama interactivo pone los 3 flags en `false` ("Locking an interactive diagram").
- [x] 4.8 Test: click en toggle sobre diagrama no interactivo pone los 3 flags en `true` ("Unlocking a locked diagram").
- [x] 4.9 Test: `additionalControls` con un **nodo suelto** (p.ej. un solo `<button>`, sin envolver en array) Y con un array de N nodos (p.ej. un `<button>` y un `<Switch>`) se renderizan tal cual, sin desarmar forma, dentro de un `Group` separado ("Additional controls render as a separate group") — el caso de nodo suelto es el que arregló el comentario #4 (antes se omitía en silencio).
- [x] 4.10 Test: `additionalControls` ausente, `null`/`undefined`, o array vacío no renderiza grupo extra ("Empty additionalControls renders no extra group").
- [x] 4.11 Test: cada botón nativo (incluido el toggle cuando se renderiza) tiene su `aria-label` Y su `title` fijos en inglés, con el mismo texto, no configurables ("Native buttons always have a fixed aria-label and title") — el `title` lo agregó el comentario #5.
- [x] 4.12 Test: el `Panel` contenedor tiene `aria-label="Diagram controls"` ("Control bar container has a fixed aria-label") — comentario #5.
- [x] 4.13 ~~Test de estilos~~ **ELIMINADA (code review)**: el test verificaba, con un regex sobre `document.head.innerHTML`, que styled-components hubiera emitido el CSS escrito en el template — tautológico. jsdom no computa cascada (no resuelve `var()`, no hace layout, no decide especificidad), así que no podía detectar la regresión de su propio dominio: pasaba en verde con el bug de `fill-opacity` acumulado (`.react-flow__controls-button:disabled svg` 0,2,1 empatando con `&& svg`, ícono deshabilitado a 0.4×0.4 de opacidad). Además corría bajo el `jest.mock` de `@xyflow/react`, que no emite `className="react-flow__controls-button"` — o sea validaba el `&&` contra un DOM sin el conflicto que el `&&` existe para resolver. La verificación de estilos queda visual (story `CustomControls` en Storybook); el porqué del `&&` está documentado como comentario en `styles.js:10-13`, que es la protección real contra que alguien lo saque sin entender.
- [x] 4.14 Correr `yarn test`; `Controls.test.js` en verde sin romper suites de `DiagramCanvas`. **Ampliada**: corrida `yarn test` completa (178/178 verde) y `yarn build` (sin errores, solo warnings preexistentes de `@xyflow/react`/`d3-selection` no relacionados).

## Phase 5: Cleanup / Documentación

- [x] 5.1 En `stories/meta.js`, agregar `argTypes` de `additionalControls` (`table.type.detail`).
- [x] 5.2 En `stories/Interactions.stories.js`, agregar story con `additionalControls`.
- [x] 5.3 Ajustar tamaño/padding/gap de `Panel`/`Group`/`Button` contra `docs/design.png` (Open Question de design.md; si no existe, validar contra el mockup original del change).
- [x] 5.4 Definir `plus_bold_medium` vs `plus_bold_small` para el ícono de zoom in contra el mismo mockup (Open Question de design.md).
- [x] 5.5 Grep en `src/`/`dist/` post-build: sin referencias a `ControlsGlobalStyle`/`CONTROLS_STYLE` (proposal → Success Criteria).
- [x] 5.6 Correr `yarn build`; verificar compilación sin errores.
