# Tasks: Barra de controles custom en DiagramCanvas

## Phase 1: Foundation (styles.js)

- [x] 1.1 En `styles.js`, agregar `Panel`/`Group`/`Button` (`styled(ControlButton)`, `&&` sin `!important`) según design.md.
- [x] 1.2 En `styles.js`, eliminar `ControlsGlobalStyle` y `CONTROLS_STYLE`.

## Phase 2: Core Implementation (Controls.js)

- [x] 2.1 Reescribir `Controls.js`: `Panel` + dos `Group` (nativo / `additionalControls`) con `useReactFlow`/`useStore`/`useStoreApi`.
- [x] 2.2 Definir `controlBarActions` (`zoomIn`/`zoomOut`/`fitView`/`toggleInteractivity`) con `icon(state)`/`label`/`isDisabled?(state)` (Interfaces/Contracts).
- [x] 2.3 Handlers `zoomIn`/`zoomOut`/`fitView` vía `useReactFlow()`; `toggleInteractivity` invierte `nodesDraggable`/`nodesConnectable`/`elementsSelectable` (Interactivity Toggle Behavior).
- [x] 2.4 Selectores `useStore` para `minZoomReached`/`maxZoomReached`/`isInteractive`, devolviendo primitivos (sin `shallow`).
- [x] 2.5 Prop `additionalControls` (`React.ReactNode[]`, default `[]`): array de nodos React ya armados por el consumidor, renderizados tal cual (sin desarmar forma) envueltos en `React.Fragment key={index}`; su `Group` solo si `length > 0` (Additional Controls Group). **REVISADA**: shape cambiado de `{icon, onClick, ariaLabel}[]` a array de nodos para soportar cualquier tipo de control, no solo botones (ver design.md).
- [x] 2.7 `propTypes`/`defaultProps` de `Controls.js` (Interfaces/Contracts).

## Phase 3: Integración

- [x] 3.1 En `Canvas.js` (~:267), reenviar `additionalControls` a `<DiagramControls>`; actualizar `canvasPropTypes`.
- [x] 3.2 En `DiagramCanvas.js`, confirmar paso vía `...rest` (:14); si no, declararlos en `propTypes`. (Confirmado: no se desestructuran en `DiagramCanvas.js`, caen en `...rest` y se reenvían tal cual; `propTypes` ya cubierto porque `DiagramCanvas.propTypes = canvasPropTypes` referencia el mismo objeto actualizado en `Canvas.js`.)

## Phase 4: Testing (`Controls.test.js`, nuevo)

- [ ] 4.1 Test: 4 botones nativos con su icono ("All native controls render with their icons").
- [ ] 4.2 Test: icono toggle `unlock` si interactivo, `lock` si no ("Toggle icon reflects current interactivity state").
- [ ] 4.3 Test: zoom in disabled con zoom === `maxZoom` ("Zoom in disabled at max zoom").
- [ ] 4.4 Test: zoom out disabled en `minZoom`, ambos enabled entre límites ("Zoom out disabled at min zoom, enabled between limits").
- [ ] 4.5 Test: click en toggle sobre diagrama interactivo pone los 3 flags en `false` ("Locking an interactive diagram").
- [ ] 4.6 Test: click en toggle sobre diagrama no interactivo pone los 3 flags en `true` ("Unlocking a locked diagram").
- [ ] 4.7 Test: `additionalControls` con N nodos React (p.ej. un `<button>` y un `<Switch>`) se renderizan tal cual, sin desarmar forma, dentro de un `Group` separado ("Additional controls render as a separate group").
- [ ] 4.8 Test: `additionalControls` vacío/ausente no renderiza grupo extra ("Empty additionalControls renders no extra group").
- [ ] 4.11 Test: cada botón nativo tiene su `aria-label` fijo en inglés, no configurable ("Native buttons always have a fixed aria-label").
- [ ] 4.12 Test `jest-styled-components` (`toHaveStyleRule`): `Panel`/`Group`/`Button` sin `!important` (Testing Strategy).
- [ ] 4.13 Correr `yarn test`; `Controls.test.js` en verde sin romper suites de `DiagramCanvas`.

## Phase 5: Cleanup / Documentación

- [x] 5.1 En `stories/meta.js`, agregar `argTypes` de `additionalControls` (`table.type.detail`).
- [x] 5.2 En `stories/Interactions.stories.js`, agregar story con `additionalControls`.
- [x] 5.3 Ajustar tamaño/padding/gap de `Panel`/`Group`/`Button` contra `docs/design.png` (Open Question de design.md; si no existe, validar contra el mockup original del change).
- [x] 5.4 Definir `plus_bold_medium` vs `plus_bold_small` para el ícono de zoom in contra el mismo mockup (Open Question de design.md).
- [x] 5.5 Grep en `src/`/`dist/` post-build: sin referencias a `ControlsGlobalStyle`/`CONTROLS_STYLE` (proposal → Success Criteria).
- [x] 5.6 Correr `yarn build`; verificar compilación sin errores.
