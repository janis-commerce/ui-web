# Exploración: Zoom inicial configurable en DiagramCanvas (`config.initialZoom`, `config.minZoom`, `config.maxZoom`)

> Alcance: permitir que un consumidor de `DiagramCanvas` (ej. `janis-views`) fije el nivel de zoom con el que arranca el diagrama, manteniendo el centrado automático sobre los nodos que hoy da `fitViewOnMount`. Incluye exponer `minZoom`/`maxZoom` como configurables, porque `initialZoom` necesita clampearse contra esos límites (ver Riesgo verificado más abajo) y hoy `DiagramCanvas` no los expone. Sin implementar todavía — base para `/sdd-propose`.

## Current State

`DiagramCanvas` (`DiagramCanvas.js:6-12`) trae `fitViewOnMount: true` por default en `defaultConfig`. `Canvas.js` lo consume así:

```js
const { readOnly, showControls, showMiniMap, resizableNodes, fitViewOnMount } = config;
...
<ReactFlow
  ...
  fitView={fitViewOnMount}
  ...
>
```

`fitView` es un prop nativo de `@xyflow/react` (confirmado con Context7, `/websites/reactflow_dev`, `api-reference/react-flow`): al montar, calcula el bounding box de todos los nodos iniciales y ajusta pan (centrado) + zoom para que entren todos en el viewport. Internamente **espera a que los nodos estén medidos** antes de calcular el fit — por eso funciona out-of-the-box incluso con los `nodeComponents` custom de tamaño variable que usa `DiagramCanvas`, sin que nadie tenga que esperar nada a mano.

Confirmado en la conversación con el consumidor real (`janis-views/src/features/crossdocking/ui/Canvas/Canvas.js`): hoy el centrado inicial depende 100% de `fitViewOnMount` (default `true`, no lo pisan en su `config`). El `canvasRef.current?.fitView()` que ese archivo llama manualmente (línea 70, vía `pendingFitRef`) es para **re-encuadrar después de agregar un grupo de tiendas**, no corre en el mount inicial (el guard `pendingFitRef.current` arranca en `false`).

No existe hoy ninguna forma de fijar un zoom inicial específico — `fitView` siempre calcula el zoom que hace falta para mostrar todo, no un valor exacto.

## Qué expone React Flow (verificado con Context7)

| Primitivo | Qué hace | Problema para este caso |
|---|---|---|
| `defaultViewport` (prop de `<ReactFlow>`) | Fija `{x, y, zoom}` inicial exacto | Doc oficial: *"If `fitView` is also enabled, `defaultViewport` will be ignored"* — y aunque se desactive `fitView`, el `x`/`y` fijo no sabe dónde están los nodos reales (no centra, solo posiciona en un punto absoluto del canvas) |
| `onInit(instance)` + `instance.zoomTo(valor)` | Zoom imperativo al inicializar | `onInit` se dispara cuando la instancia está lista, **no** cuando los nodos ya fueron medidos — con nodos de tamaño custom (como acá) el cálculo de centro podría hacerse sobre bounds todavía no confiables |
| `useNodesInitialized()` | Hook que devuelve `true` recién cuando **todos** los nodos ya tienen `width`/`height` medidos | Es la señal de timing correcta — la misma garantía que usa `fitView` internamente |
| `getNodesBounds(nodes, { nodeLookup? })` | Calcula el rectángulo que contiene todos los nodos dados | En v12 las dimensiones medidas viven en `node.measured.width/height` (no en `node.width/height` como en ejemplos de versiones viejas) — hay que confirmar en implementación si `getNodesBounds(rf.getNodes())` ya lo resuelve solo o si hace falta pasarle el `nodeLookup` interno (`useStoreApi().getState().nodeLookup`), que la propia función acepta como segundo parámetro para este caso |
| `useReactFlow().setCenter(x, y, { zoom, duration })` | Centra el viewport en un punto dado, con el zoom exacto que se le pase | Es la única operación que permite "centrar" y "fijar un zoom exacto" en la misma llamada — a diferencia de `fitView()`, que siempre recalcula el zoom para que entre todo y no permite conservar un valor fijo |

## Diseño propuesto

1. `defaultConfig` de `DiagramCanvas.js` suma `initialZoom` (número, **sin default** — si no se pasa, comportamiento actual sin cambios). `minZoom`/`maxZoom` **no** se agregan a `defaultConfig` con un valor propio — se dejan sin declarar para que, si el consumidor no los pasa, `config.minZoom`/`config.maxZoom` sean `undefined` y React Flow aplique sus propios defaults (`0.5`/`2`) al recibir `undefined` en esos props (comportamiento estándar de parámetro por default de JS, no hace falta que `ui-web` hardcodee esos números).
2. En `Canvas.js`:
   - `<ReactFlow minZoom={config.minZoom} maxZoom={config.maxZoom} ... />` — pass-through directo. Si el consumidor no los declara, React Flow arranca con `0.5`/`2` como siempre; si los declara, esos son los límites reales del diagrama (afectan zoom por scroll/pinch, botones +/- de los controles, y ahora también el clamp de `initialZoom`).
   - `fitView={config.initialZoom != null ? false : fitViewOnMount}` — si hay `initialZoom`, se apaga el fit automático (mismo criterio que ya aplica React Flow nativamente entre `fitView` y `defaultViewport`, ahora explícito y bajo nuestro control).
   - Nuevo efecto, dentro del componente (ya está en el árbol de `ReactFlowProvider`, así que los hooks de RF funcionan sin cambios de estructura):
     ```js
     const nodesInitialized = useNodesInitialized();
     const didSetInitialZoomRef = useRef(false);

     useEffect(() => {
       if (config.initialZoom == null) return;
       if (didSetInitialZoomRef.current) return;
       if (!nodesInitialized) return;

       const bounds = getNodesBounds(rf.getNodes());
       // guard: sin nodos, bounds degenerado — no forzar centro/zoom
       if (!bounds.width && !bounds.height) return;

       // clamp contra los límites REALMENTE efectivos (los que pasó el consumidor,
       // o los defaults de RF si no pasó nada) — se leen del store, no de `config`,
       // para no tener que reimplementar la lógica de "cuál es el default de RF".
       const { minZoom, maxZoom } = store.getState();
       const clampedZoom = Math.min(Math.max(config.initialZoom, minZoom), maxZoom);

       const centerX = bounds.x + bounds.width / 2;
       const centerY = bounds.y + bounds.height / 2;
       rf.setCenter(centerX, centerY, { zoom: clampedZoom });
       didSetInitialZoomRef.current = true;
     }, [nodesInitialized, config.initialZoom]);
     ```
     El `ref`-guard asegura que corra **una sola vez** por instancia de `DiagramCanvas` — igual que `fitViewOnMount` hoy solo aplica al mount. En consumidores que remontan `DiagramCanvas` con `key` al cambiar de diagrama (patrón ya usado en `janis-views`), el efecto se reinicia solo porque es una instancia de componente nueva.
     Leer `minZoom`/`maxZoom` del **store** (`useStoreApi().getState()`) en vez de directamente de `config` es la parte importante acá: el store siempre tiene el valor *efectivo* (el que pasó el consumidor, o el default `0.5`/`2` de RF si no pasó nada), sin que `ui-web` tenga que duplicar el conocimiento de cuáles son los defaults de React Flow.

## Por qué no conflictúa con el `fitView()` manual que ya usa `janis-views`

El efecto de `initialZoom` corre una única vez, apenas los nodos están medidos tras el mount — **antes** de que el consumidor dispare cualquier `canvasRef.current?.fitView()` propio (que en `janis-views` solo se activa al agregar un grupo de tiendas, una interacción posterior). No hay carrera ni pisada: el mount inicial queda centrado con el zoom fijo, y las re-fits posteriores del consumidor siguen recalculando zoom automático como corresponde a esa acción.

## Approaches descartados

1. **`defaultViewport` simple** (`{x:0, y:0, zoom: initialZoom}`) — no centra sobre los nodos reales; solo sirve si los nodos arrancan siempre cerca del origen, lo cual no está garantizado.
2. **`onInit` + `zoomTo` sin esperar medición** — mismo problema de timing que llevó a `fitView` a resolverlo internamente con espera; con nodos de tamaño variable el cálculo de centro podría hacerse sobre datos incompletos.
3. **`fitViewOptions.minZoom`/`maxZoom` como techo/piso del auto-fit** — no es un zoom fijo, es un límite; si el fit natural ya da menos que el límite, no cambia nada. No resuelve el pedido ("quiero este zoom exacto").

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/components/DiagramCanvas/DiagramCanvas.js` | Modified | Agregar `initialZoom`/`minZoom`/`maxZoom` a `defaultConfig` (los 3 opcionales, sin valor propio — `minZoom`/`maxZoom` sin declarar para heredar los defaults de RF) |
| `src/components/DiagramCanvas/Canvas.js` | Modified | `minZoom`/`maxZoom` pass-through a `<ReactFlow>`; `fitView` condicional; nuevo efecto `useNodesInitialized` + `getNodesBounds` + clamp contra el store + `setCenter`; import de `useNodesInitialized`/`getNodesBounds` de `@xyflow/react` |
| `canvasPropTypes` (mismo archivo) | Modified | Documentar `initialZoom`/`minZoom`/`maxZoom` en el JSDoc de `config` |

## Risks / puntos a verificar en implementación

- **`getNodesBounds` + dimensiones v12**: confirmar empíricamente si `getNodesBounds(rf.getNodes())` alcanza o si hace falta pasar `nodeLookup` (`useStoreApi().getState().nodeLookup`) para que las dimensiones medidas (`node.measured.width/height`) se lean correctamente con los `nodeComponents` custom de este proyecto.
- **Diagrama vacío**: `getNodesBounds([])` da un rect degenerado (`width`/`height` en `0` o `NaN`) — el guard ya contemplado evita llamar `setCenter` en ese caso.
- **`initialZoom` fuera de `minZoom`/`maxZoom` — riesgo VERIFICADO en el código fuente de `@xyflow/system` (`dist/esm/index.js`), no es especulación**: `setCenter()` internamente llama a `panZoom.setViewport()`, que aplica el transform **sin pasar por `d3ZoomInstance.constrain()`** (a diferencia de `setViewportConstrained`, que sí lo hace). Es decir, `setCenter(x, y, { zoom })` **no clampea** — si se le pasa un `zoom` fuera de `[minZoom, maxZoom]`, lo aplica tal cual. El `scaleExtent` de d3-zoom sigue configurado con esos límites por debajo, así que la próxima interacción del usuario que pase por un gesto (scroll, pinch, o los botones `+`/`-` de los controles, que usan `scaleBy`) va a **clampear de golpe** el zoom de vuelta al rango válido — un salto visual brusco que el usuario no pidió.
  - **Mitigación ya incorporada al diseño** (ver sección de arriba): clampear `config.initialZoom` a mano contra `store.getState().minZoom/maxZoom` *antes* de llamar `setCenter`, para que el valor que se aplica ya esté siempre dentro del `scaleExtent` real — sea el default de RF o el que haya configurado el consumidor vía `minZoom`/`maxZoom`.
- Es una librería compartida: revisar si `DiagramCanvas` tiene otro consumidor además de `janis-views/crossdocking` que dependa del centrado automático actual, o de los defaults de zoom actuales, antes de cerrar el diseño final (mismo riesgo ya señalado en el change `custom-controls`).

### Ready for Proposal

Sí. El mecanismo está validado con la documentación oficial de React Flow (Context7), con el código fuente compilado de `@xyflow/system` (para el riesgo del clamp), y contrastado contra el uso real que hace `janis-views` de `fitView()`/`fitViewOnMount` hoy. Queda un único punto a confirmar durante la implementación (no bloqueante para proponer): el comportamiento exacto de `getNodesBounds` con nodos medidos en v12 (`measured.width/height` vs `nodeLookup`).
