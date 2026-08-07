# Design: Zoom inicial configurable en DiagramCanvas

## Technical Approach

`Canvas.js` (`src/components/DiagramCanvas/Canvas.js`) gana un efecto que, cuando `config.initialZoom` está definido, espera a que los nodos estén medidos (`useNodesInitialized`), calcula el bounding box real de los nodos vía el método `getNodesBounds` de la propia instancia de `useReactFlow()` (no el utilitario standalone), y centra el viewport con `setCenter(centerX, centerY, { zoom })`, clampeando ese zoom contra los límites efectivos leídos del store. `fitView` se desactiva automáticamente cuando `initialZoom` está presente. `minZoom`/`maxZoom` se agregan como pass-through directo a `<ReactFlow>`. Mapea 1:1 contra los 3 requirements de `specs/diagram-canvas-viewport/spec.md`.

## Architecture Decisions

### Decision: usar `rf.getNodesBounds()` (método de instancia), no el utilitario `getNodesBounds` standalone

**Choice**: `const bounds = rf.getNodesBounds(rf.getNodes())`, con `rf = useReactFlow()` (ya existe en `Canvas.js:53`).
**Alternatives considered**: importar `getNodesBounds` de `@xyflow/react` y pasarle `nodeLookup` a mano vía `useStoreApi().getState()`.
**Rationale**: verificado en el bundle compilado (`node_modules/@xyflow/react/dist/esm/index.js:1195-1198`) que el objeto que devuelve `useReactFlow()` YA expone `getNodesBounds: (nodes) => getNodesBounds(nodes, { nodeLookup, nodeOrigin })` — resuelve automáticamente el problema de dimensiones medidas en v12 (`node.measured.width/height`) sin que `ui-web` tenga que leer `nodeLookup` a mano. Esto **resuelve el open question** que había quedado pendiente en `proposal.md`/`spec.md`.

### Decision: guard con `useRef` para aplicar `initialZoom` una sola vez

**Choice**: `didSetInitialZoomRef` (booleano), seteado a `true` recién después de llamar `setCenter`.
**Alternatives considered**: condicionar solo por `nodesInitialized` (sin ref).
**Rationale**: `nodesInitialized` puede volver a `false`→`true` si se agregan nodos después del mount (según la doc de `useNodesInitialized`, retorna `false` al agregar un nodo hasta que se mide). Sin el guard, el efecto reaplicaría `initialZoom` en cada alta de nodo, pisando cualquier zoom que el usuario haya elegido manualmente después del mount — viola el Scenario "se aplica una sola vez" del spec.

### Decision: leer `minZoom`/`maxZoom` del store, no de `config`, para el clamp

**Choice**: `const { minZoom, maxZoom } = store.getState()` (store ya existe en `Canvas.js:54`, vía `useStoreApi()`).
**Alternatives considered**: `config.minZoom ?? 0.5` / `config.maxZoom ?? 2` (hardcodear los defaults de RF en `ui-web`).
**Rationale**: el store siempre tiene el valor *efectivo* que React Flow ya resolvió (el pasado por props, o su propio default si no se pasó nada). Hardcodear `0.5`/`2` en `ui-web` duplicaría conocimiento de una librería externa que podría cambiar sus defaults en una versión futura.

### Decision: `fitView` condicional en el mismo prop, no un segundo `<ReactFlow>` distinto

**Choice**: `fitView={config.initialZoom != null ? false : fitViewOnMount}`.
**Rationale**: replica exactamente la regla nativa de RF entre `fitView` y `defaultViewport` ("if fitView is enabled, defaultViewport is ignored"), pero aplicada explícitamente y sin usar `defaultViewport` (que no centra sobre nodos reales, solo fija x/y absolutos).

### Decision: Validación de `minZoom`/`maxZoom` antes de pasarlos a React Flow

**Choice**: función pura de módulo `getEffectiveZoomBounds(minZoom, maxZoom)`, calculada con `useMemo` dentro de `Canvas` inmediatamente después de desestructurar `config`, y **ejecutada antes del pass-through** a `<ReactFlow>` (no dentro del `useEffect` de `initialZoom`). Si `minZoom`/`maxZoom` son `<= 0`, o si el rango está invertido (`maxZoom <= minZoom`), devuelve `{ minZoom: undefined, maxZoom: undefined }` (con un `console.warn` en desarrollo) para que React Flow aplique sus propios defaults (`0.5`/`2`). `<ReactFlow>` recibe `effectiveMinZoom`/`effectiveMaxZoom` en vez de los crudos de `config`.
**Alternatives considered**: validar solo dentro del `useEffect` de `initialZoom`. Se descartó porque `minZoom`/`maxZoom` también gobiernan el zoom por scroll/pinch/botones del usuario, no solo el `initialZoom` — la validación tiene que aplicarse ANTES del pass-through a `<ReactFlow>`, no solo en el efecto de montaje, o el rango inválido seguiría llegando a d3-zoom para toda interacción posterior al mount.
**Rationale**: verificado en el código fuente de `@xyflow/system` (`dist/esm/index.js`, `scaleExtent([minZoom, maxZoom])`) que ni React Flow ni d3-zoom validan signo ni orden de estos valores — se propagan tal cual. Con un rango invertido, además, la fórmula de clamp existente del efecto de `initialZoom` (`Math.min(Math.max(initialZoom, minZoom), maxZoom)`) degenera: como `maxZoom < minZoom`, `Math.min(x, maxZoom)` con `x >= minZoom` siempre devuelve `maxZoom`, sin importar qué `initialZoom` se haya pedido — puede terminar aplicando en silencio un zoom no solicitado (incluso negativo) a `setCenter`. El efecto de `initialZoom` no necesita cambios porque sigue leyendo `store.getState().{minZoom,maxZoom}`, que ahora refleja siempre los valores ya validados.

## Data Flow

    config.initialZoom ──┐
                          ├─→ fitView=false (si initialZoom != null)
    mount ──→ nodesInitialized (hook) ──→ efecto ──┬─→ rf.getNodesBounds(rf.getNodes()) ──→ centro
                                                    └─→ store.getState().{minZoom,maxZoom} ──→ clamp(initialZoom)
                                                              │
                                                              └─→ rf.setCenter(centro, { zoom: clamped })  [una sola vez, ref-guard]

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/DiagramCanvas/DiagramCanvas.js` | Modify | Nada que agregar a `defaultConfig` (los 3 props nuevos quedan `undefined` si no se declaran — no necesitan valor default propio) |
| `src/components/DiagramCanvas/Canvas.js` | Modify | Destructurar `initialZoom`/`minZoom`/`maxZoom` de `config`; pass-through `minZoom`/`maxZoom` a `<ReactFlow>`; `fitView` condicional; nuevo `useEffect` + `useNodesInitialized` + `useRef` guard; actualizar `canvasPropTypes` |
| `src/components/DiagramCanvas/Canvas.test.js` | Create | No existe hoy (solo `format.test.js` en la carpeta) — nuevo archivo de tests para este efecto |

## Interfaces / Contracts

```js
// canvasPropTypes.config (agregado)
config: PropTypes.shape({
  // ...props existentes sin cambios
  initialZoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number
})
```

```js
// Canvas.js — validación de minZoom/maxZoom (función pura de módulo, arriba del componente)
const getEffectiveZoomBounds = (minZoom, maxZoom) => {
  const isInvalidBound = (value) => value != null && value <= 0;
  const hasInvalidRange = minZoom != null && maxZoom != null && maxZoom <= minZoom;

  if (isInvalidBound(minZoom) || isInvalidBound(maxZoom) || hasInvalidRange) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[DiagramCanvas] config.minZoom/maxZoom inválidos...');
    }
    return { minZoom: undefined, maxZoom: undefined };
  }

  return { minZoom, maxZoom };
};

// Dentro de Canvas, después de desestructurar config:
const { minZoom: effectiveMinZoom, maxZoom: effectiveMaxZoom } = useMemo(
  () => getEffectiveZoomBounds(minZoom, maxZoom),
  [minZoom, maxZoom]
);
// <ReactFlow minZoom={effectiveMinZoom} maxZoom={effectiveMaxZoom} ... />
```

```js
// Canvas.js — nuevo efecto (ubicado junto a los demás hooks, antes del useImperativeHandle)
const nodesInitialized = useNodesInitialized();
const didSetInitialZoomRef = useRef(false);

useEffect(() => {
  if (initialZoom == null || didSetInitialZoomRef.current || !nodesInitialized) return;

  const bounds = rf.getNodesBounds(rf.getNodes());
  if (!bounds.width && !bounds.height) return; // sin nodos: no-op

  const { minZoom, maxZoom } = store.getState();
  const clampedZoom = Math.min(Math.max(initialZoom, minZoom), maxZoom);

  rf.setCenter(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, { zoom: clampedZoom });
  didSetInitialZoomRef.current = true;
}, [nodesInitialized, initialZoom, rf, store]);
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Los 10 escenarios de `spec.md` (initialZoom aplica zoom+centro, ausente preserva comportamiento, una sola vez, sin nodos, minZoom/maxZoom defaults y declarados, los 3 casos de clamp, sin salto en la primera interacción) | Jest + Enzyme (`mount`, ya usado en el resto del repo — no hay convención de test para `DiagramCanvas` todavía, `Canvas.test.js` es nuevo). Mockear/usar `ReactFlowProvider` real; leer `rf.getViewport()` tras el mount para asertar `zoom`/`x`/`y` |
| Integration | Interacción entre `fitViewOnMount` e `initialZoom` (uno excluye al otro) | Test con ambos configurados a la vez, asertar que gana `initialZoom` (fitView nunca corre) |

## Migration / Rollout

No migration required — los 3 props son opcionales y aditivos. Sin `initialZoom`, cero cambio de comportamiento respecto a hoy.

## Open Questions

Ninguna — el punto pendiente de `proposal.md`/`spec.md` (`getNodesBounds` vs `nodeLookup` en v12) quedó resuelto usando el método de instancia `rf.getNodesBounds()`, verificado en el código fuente compilado de `@xyflow/react`.
