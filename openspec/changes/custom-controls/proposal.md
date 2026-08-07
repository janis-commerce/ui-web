# Proposal: Barra de controles custom en DiagramCanvas

## Intent

`DiagramCanvas` usa hoy `<Controls>` de `@xyflow/react` (`Controls.js`) con estilos inline y overrides globales vía `!important`. Ese componente no permite reagrupar botones ni agregar acciones ajenas al estado de React Flow (ver `openspec/changes/custom-controls/exploration.md`), por lo que `janis-views` no puede lograr el layout de diseño (grupo de acciones propias + grupo nativo zoom/fit/lock) sin hackear CSS. Se reemplaza `Controls.js` por una barra construida sobre primitivos de bajo nivel (`Panel`, `ControlButton`, hooks de estado), exponiendo una API pública para extensión.

## Scope

### In Scope

- Reescribir `DiagramControls` (`Controls.js`) sin `<Controls>`: `Panel` + `ControlButton` + `useReactFlow`/`useStore`/`useStoreApi`, replicando zoom in/out, fit view y toggle de interactividad (lock).
- Config declarativa `controlBarActions` (icon/label/isDisabled por acción) iterada con `.map`.
- Prop pública `additionalControls` (`React.ReactNode[]`) para nodos ya armados por el consumidor (botones, `Switch`, `Checkbox`, cualquier componente), renderizados tal cual — sin desarmar forma — en grupo separado. **REVISADA**: originalmente se planteó como `{ icon, onClick, ariaLabel }[]` (objeto de config que `ui-web` desarmaba en un `Button`+`Icon` fijo); se cambió a array de nodos React arbitrarios antes de publicar el paquete (sin consumidores reales todavía) para soportar cualquier tipo de control, no solo botones. Ver design.md.
- Forward de `additionalControls` en `Canvas.js` y `DiagramCanvas.js`.
- Nuevos styled components en `styles.js` (`Panel`, `Group`, `Button`); baja `ControlsGlobalStyle` y `CONTROLS_STYLE`.

### Out of Scope

- Iconos "book"/"conexión" y cualquier semántica de negocio de crossdocking (los define `janis-views` vía `additionalControls`).
- Callbacks `onZoomIn`/`onZoomOut`/`onFitView`/`onInteractiveChange` (no usados hoy por ningún consumidor).
- Toggle para ocultar botones nativos individualmente (equivalente a `showZoom`/`showFitView`/`showInteractive`).
- Implementación del lado de `janis-views` (toolbar externa/CSS previos quedan a cargo de esa vista, fuera de este change).
- Override/i18n de `aria-label` (prop `labels`) — se difiere; los 4 botones nativos usan `aria-label` hardcodeado en inglés por el momento.

## Approach

Ver `exploration.md`, Approach 1: `Panel`/`ControlButton` son componentes sin dependencia de contexto (verificado en fuente compilado); `useReactFlow`/`useStore` ya están disponibles porque `DiagramCanvas.js` envuelve todo en `ReactFlowProvider`. Patrón validado contra el ejemplo oficial `ZoomSlider` de la documentación de React Flow (Context7).

## Affected Areas

| Area | Impact | Description |
|------|--------|--------------------------------------|
| `src/components/DiagramCanvas/Controls.js` | Modified | Reescritura completa |
| `src/components/DiagramCanvas/styles.js` | Modified | Nuevos styled components, baja global style |
| `src/components/DiagramCanvas/Canvas.js` | Modified | Forward de `additionalControls` |
| `src/components/DiagramCanvas/DiagramCanvas.js` | Modified | Acepta y reenvía los nuevos props |
| `src/components/DiagramCanvas/stories/*` | Modified | Story cubriendo `additionalControls` |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Otro consumidor de `DiagramCanvas` además de `janis-views/crossdocking` depende del `<Controls>` nativo | Baja | Buscar usos de `DiagramCanvas`/`config.showControls` en consumidores antes de mergear |
| Pérdida de `aria-label` traducido que resolvía RF internamente | Media | Defaults hardcodeados en inglés en los 4 botones nativos; sin override por el momento |
| `controlBarActions` fija el set de 4 botones (sin `showZoom`/etc.) | Baja | Documentar como limitación conocida; agregar flags si surge la necesidad |

## Rollback Plan

Revert del commit/PR que reemplaza `Controls.js`/`styles.js`; `DiagramCanvas`/`Canvas.js` vuelven a su firma previa (los nuevos props son opcionales y aditivos, por lo que revertir no rompe consumidores que ya los estén usando salvo que dependan de ellos). Republicar versión anterior de `@janiscommerce/ui-web` si ya se llegó a publicar.

## Dependencies

Ninguna nueva — usa `@xyflow/react` (ya instalado) y el `Icon` interno de `ui-web`.

## Success Criteria

- [ ] Barra visualmente igual al diseño objetivo: grupo de `additionalControls` + grupo nativo, con spacing/sombra/radio correctos.
- [ ] Zoom in/out, fit view y lock funcionan igual que con `<Controls>` (incluye `disabled` en límites de zoom).
- [ ] `additionalControls` documentado en Storybook con al menos un ejemplo.
- [ ] `yarn test` y `yarn build` OK.
- [ ] No quedan referencias a `ControlsGlobalStyle`/`CONTROLS_STYLE` en el bundle.
