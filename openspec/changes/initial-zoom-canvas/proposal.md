# Proposal: Zoom inicial configurable en DiagramCanvas

## Intent

Hoy `DiagramCanvas` solo permite `fitViewOnMount` (ajusta pan+zoom para mostrar todos los nodos). No hay forma de que un consumidor (ej. `janis-views`) fije un nivel de zoom inicial exacto manteniendo el centrado. Se agrega `config.initialZoom`, y como requisito derivado, `config.minZoom`/`config.maxZoom` (hoy no expuestos), porque `initialZoom` debe clampearse contra esos límites para evitar un salto visual en la primera interacción del usuario (ver `exploration.md`, riesgo verificado en el código fuente de `@xyflow/system`).

## Scope

### In Scope

- `config.initialZoom` (número, opcional): centra el diagrama sobre sus nodos (mismo cálculo de bounds que usa `fitView`) con ese zoom exacto en vez del zoom auto-calculado.
- `config.minZoom`/`config.maxZoom` (opcionales): pass-through a `<ReactFlow>`; sin declarar, se heredan los defaults de React Flow (`0.5`/`2`).
- Clamp de `initialZoom` contra `minZoom`/`maxZoom` **efectivos** (leídos del store, no de `config`), para no reimplementar los defaults de RF.
- `fitView` se desactiva automáticamente cuando `initialZoom` está presente (mismo criterio nativo que RF aplica entre `fitView` y `defaultViewport`).
- Validación de `config.minZoom`/`config.maxZoom` antes de pasarlos a `<ReactFlow>`: si alguno es `<= 0`, o si el rango está invertido (`maxZoom <= minZoom`), se ignoran **ambos** valores (warning en desarrollo) y se cae a los defaults de React Flow (`0.5`/`2`).

### Out of Scope

- Cambiar el comportamiento de `fitViewOnMount` cuando `initialZoom` no se pasa (sin cambios).
- Exponer `onInit`/callbacks de viewport nuevos.
- Persistir o sincronizar el zoom con estado externo (esto es solo el valor inicial de montaje).

## Approach

Ver `exploration.md`: `useNodesInitialized()` (espera a que los nodos estén medidos, igual que hace `fitView` internamente) + `getNodesBounds()` (calcula el centro real de los nodos) + `useReactFlow().setCenter(x, y, { zoom })` (única operación que centra y fija un zoom exacto a la vez). Guardado con un `ref` para que corra una sola vez por instancia, igual que `fitViewOnMount`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/DiagramCanvas/DiagramCanvas.js` | Modified | `initialZoom`/`minZoom`/`maxZoom` en `defaultConfig` (sin valor propio) |
| `src/components/DiagramCanvas/Canvas.js` | Modified | Pass-through de `minZoom`/`maxZoom`; `fitView` condicional; efecto de centrado+zoom con clamp |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `setCenter` no clampea el zoom (verificado en fuente de `@xyflow/system`) → salto visual en la primera interacción | Alta si no se mitiga | Clamp manual contra `store.getState().minZoom/maxZoom` antes de `setCenter` (ya en el diseño) |
| `getNodesBounds` con nodos custom v12 (`measured.width/height`) puede requerir `nodeLookup` en vez de `getNodes()` plano | Media | Verificar empíricamente en implementación; fallback a `nodeLookup` si hace falta |
| Diagrama vacío → bounds degenerado | Baja | Guard: no llamar `setCenter` si `bounds.width/height` es `0` |
| Otro consumidor de `DiagramCanvas` depende de los defaults de zoom actuales | Baja | Cambios aditivos y opcionales; sin `initialZoom` el comportamiento no cambia |
| `config.minZoom`/`config.maxZoom` sin validar (`<= 0`, o rango invertido) llegan tal cual a RF/d3-zoom, que no validan signo ni orden (verificado en fuente de `@xyflow/system`); un rango invertido degenera el clamp de `initialZoom` (`Math.min(x, maxZoom)` con `maxZoom < minZoom` siempre devuelve `maxZoom`, aplicando en silencio un zoom no pedido, incluso negativo) | Resuelto | `getEffectiveZoomBounds` valida antes del pass-through a `<ReactFlow>`; inválidos → se ignoran ambos + warning en dev + fallback a defaults de RF |

## Rollback Plan

Revert del commit; `DiagramCanvas`/`Canvas.js` vuelven a su firma previa. Los 3 props nuevos son opcionales y aditivos — ningún consumidor existente rompe al revertir.

## Dependencies

Ninguna nueva — usa utilidades ya incluidas en `@xyflow/react` (`useNodesInitialized`, `getNodesBounds`, `useReactFlow().setCenter`).

## Success Criteria

- [ ] Sin `initialZoom`: comportamiento idéntico al actual (`fitViewOnMount` sigue igual).
- [ ] Con `initialZoom`: diagrama centrado sobre los nodos, con ese zoom exacto al montar.
- [ ] `initialZoom` fuera de `minZoom`/`maxZoom` (default o configurado) queda clampeado, sin salto visual al primer scroll/pinch/click en +/-.
- [ ] `minZoom`/`maxZoom` sin declarar preservan los defaults de RF (`0.5`/`2`).
- [ ] `yarn test` y `yarn build` OK.
