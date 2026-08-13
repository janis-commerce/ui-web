# Tasks: Zoom inicial configurable en DiagramCanvas

## Phase 1: Foundation (config plumbing en Canvas.js)

- [x] 1.1 En `Canvas.js` (~línea 52), desestructurar `initialZoom`, `minZoom`, `maxZoom` de `config`.
- [x] 1.2 Actualizar `canvasPropTypes.config` agregando `initialZoom`/`minZoom`/`maxZoom` como `PropTypes.number` opcionales, con el JSDoc de `config` actualizado (Interfaces/Contracts de `design.md`).

## Phase 2: Core Implementation (viewport al montar)

- [x] 2.1 Pasar `minZoom={minZoom}` y `maxZoom={maxZoom}` a `<ReactFlow>` (pass-through directo).
- [x] 2.2 Cambiar `fitView={fitViewOnMount}` por `fitView={initialZoom != null ? false : fitViewOnMount}`.
- [x] 2.3 Importar `useNodesInitialized` de `@xyflow/react`; declarar `const nodesInitialized = useNodesInitialized()` y `const didSetInitialZoomRef = useRef(false)`.
- [x] 2.4 Agregar el `useEffect` que calcula `rf.getNodesBounds(rf.getNodes())`, guarda contra bounds vacío (`!bounds.width && !bounds.height`), clampea `initialZoom` con `store.getState().{minZoom,maxZoom}`, y llama `rf.setCenter(centerX, centerY, { zoom: clampedZoom })` una sola vez (snippet exacto en `design.md`).
- [x] 2.5 Agregar `getEffectiveZoomBounds(minZoom, maxZoom)` (función pura de módulo, arriba del componente) que valida `config.minZoom`/`config.maxZoom`: si alguno es `<= 0`, o si `maxZoom <= minZoom`, ignora ambos (warning en dev) y devuelve `{ minZoom: undefined, maxZoom: undefined }` para caer a los defaults de React Flow. Calcular `effectiveMinZoom`/`effectiveMaxZoom` con `useMemo` dentro de `Canvas` y pasarlos a `<ReactFlow>` en vez de los crudos de `config` (snippet exacto en `design.md`).

## Phase 3: Testing (`Canvas.test.js`, nuevo)

- [ ] 3.1 Setup: helper de render que monta `DiagramCanvas` (ya envuelve `ReactFlowProvider`) y lee el `transform` del nodo `.react-flow__viewport` en el DOM para verificar zoom/posición resultante (patrón estándar para testear pan/zoom de React Flow con Enzyme).
- [ ] 3.2 Test: `initialZoom` centra sobre los nodos y fija ese zoom exacto (*"initialZoom fija el zoom y centra sobre los nodos"*).
- [ ] 3.3 Test: sin `initialZoom`, comportamiento igual al `fitViewOnMount` actual (*"initialZoom ausente preserva el comportamiento actual"*).
- [ ] 3.4 Test: agregar nodos después del mount no reaplica `initialZoom` (*"initialZoom se aplica una sola vez por instancia"*).
- [ ] 3.5 Test: `nodes = []` con `initialZoom` definido no lanza error ni llama `setCenter` (*"diagrama sin nodos"*).
- [ ] 3.6 Test: sin `minZoom`/`maxZoom`, los límites efectivos son `0.5`/`2` (*"minZoom/maxZoom sin declarar usan los defaults de React Flow"*).
- [ ] 3.7 Test: con `minZoom=1`/`maxZoom=10`, el zoom por scroll/pinch/botones nunca sale de ese rango (*"minZoom/maxZoom declarados se respetan como límites reales"*).
- [x] 3.8 Test: `initialZoom` por encima del `maxZoom` efectivo queda clampeado a `maxZoom` (*"initialZoom por encima del maxZoom efectivo"*).
- [x] 3.9 Test: `initialZoom` por debajo del `minZoom` efectivo queda clampeado a `minZoom` (*"initialZoom por debajo del minZoom efectivo"*).
- [ ] 3.10 Test: `initialZoom` dentro de límites ampliados (`minZoom=1`, `maxZoom=10`, `initialZoom=5`) no se clampea (*"initialZoom dentro de límites ampliados no se clampea"*).
- [ ] 3.11 Test de integración: `fitViewOnMount: true` + `initialZoom` definidos a la vez → gana `initialZoom`, `fitView` nunca corre (Integration de `design.md` + *"no hay salto visual en la primera interacción tras el clamp"*).
- [ ] 3.12 Correr `yarn test`; `Canvas.test.js` en verde sin romper `format.test.js`.
- [x] 3.13 Test: `minZoom`/`maxZoom` con valor `<= 0` (ej. `minZoom = -1`, o `maxZoom = 0`) → se ignoran ambos, los límites efectivos son los defaults de React Flow (`0.5`/`2`) (*"minZoom o maxZoom con valor <= 0"*).
- [x] 3.14 Test: `maxZoom <= minZoom` (ej. `minZoom = 5`, `maxZoom = 2`) → se ignoran ambos, los límites efectivos son los defaults de React Flow, y el clamp de `initialZoom` (si está definido) se calcula contra esos defaults (*"maxZoom menor o igual a minZoom"*).

**REVISADA (code review)**: Fernando pidió estos 4 (3.8/3.9/3.13/3.14) como bloqueantes antes de mergear; el resto de Phase 3 (3.1-3.7, 3.10-3.12) queda pendiente, acordado explícitamente con el usuario para un momento posterior. Se creó `Canvas.test.js` con estos 4 casos únicamente — el helper de render (3.1) quedó resuelto ad-hoc dentro de este archivo, no como un módulo compartido, ya que las demás tareas de Phase 3 no se implementaron todavía.

**Hallazgo de infraestructura (no específico de este change)**: montar `Canvas.js`/`DiagramCanvas.js` en un test reveló dos gaps del entorno de Jest que nadie había pisado antes (ningún test previo montaba estos componentes): (1) `regeneratorRuntime` no definido — `Canvas.js` tiene un handler `async` (`handleBeforeDelete`) y `@babel/preset-env` no inyecta el runtime; se agregó `import 'regenerator-runtime/runtime'` a `config/jest/setup.js` + el paquete como devDependency. (2) `ResizeObserver` no definido — jsdom no lo implementa, y `@xyflow/react` (`useResizeHandler`) lo usa sin guard para medir su contenedor; se agregó un stub mínimo (`observe`/`unobserve`/`disconnect` no-op) a `config/jest/setup.js`. Ambos quedan disponibles para cualquier test futuro que monte estos componentes.

## Phase 4: Cleanup / Documentación

- [x] 4.1 Revisar el JSDoc de `config` en `canvasPropTypes` (redacción final tras Fase 1).
- [x] 4.2 Agregar/actualizar story de Storybook mostrando `initialZoom` (y opcionalmente `minZoom`/`maxZoom`) en uso.
- [x] 4.3 Correr `yarn build`; verificar compilación sin errores.
