# Exploración: Barra de controles custom para DiagramCanvas (reemplazo de `Controls.js`)

> Alcance de este documento: análisis técnico para reescribir `src/components/DiagramCanvas/Controls.js` desde cero dentro de **ui-web**, de forma que la barra de zoom/fit/lock (y los botones adicionales que se necesiten) tenga el layout y estilo de `docs/design.png`, sin depender de `<Controls>` de `@xyflow/react` ni de overrides de CSS con `!important` desde los consumidores. No se modifica código todavía — es la base para un `/sdd-propose`.

## Current State

`DiagramCanvas` (`ReactFlowProvider` → `Canvas.js` → `<ReactFlow>`) renderiza hoy `{showControls && <DiagramControls />}` (`Canvas.js:267`). `DiagramControls` (`Controls.js`) es un wrapper delgado sobre `<Controls>` de `@xyflow/react`:

```js
const CONTROLS_STYLE = {
  background: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
  '--xy-controls-box-shadow': 'none',
  '--xy-controls-button-background-color': '#ffffff',
  '--xy-controls-button-background-color-hover': '#f4f4f4',
  '--xy-controls-button-border-color': 'transparent',
  '--xy-controls-button-color': '#333333'
};

const DiagramControls = () => (
  <>
    <styles.ControlsGlobalStyle />
    <Controls style={CONTROLS_STYLE} />
  </>
);
```

`styles.js` agrega además un `createGlobalStyle` que fuerza un `border-top` en el último botón. No hay ningún prop expuesto hacia `DiagramCanvas`/el consumidor para personalizar iconos, agregar botones o cambiar el layout — todo vive hardcodeado en estos dos archivos.

**Limitación confirmada de `<Controls>`** (Context7, `/websites/reactflow_dev`, `api-reference/components/controls`): solo permite `showZoom` / `showFitView` / `showInteractive` / `style` / `className` / `position` / `orientation` / `children` (para **agregar** botones al final, vía `<ControlButton>`). No expone forma de **reemplazar** los 4 iconos nativos (`PlusIcon`, `MinusIcon`, `FitViewIcon`, `LockIcon`/`UnlockIcon` — confirmado leyendo el bundle compilado `node_modules/@xyflow/react/dist/esm/index.js:4482-4517`) ni de reagrupar/separar los botones en sub-bloques. Por eso la única vía real para lograr el layout de `design.png` es dejar de usar `<Controls>` como contenedor y construir la barra desde los primitivos de más bajo nivel de la librería.

## Diseño objetivo (lectura de `docs/design.png`)

Ignorando el recuadro rojo y la marca de anotación (son de la herramienta de anotación de la captura, no del diseño real), la barra objetivo tiene:

- Un contenedor flotante blanco, esquinas redondeadas, sombra suave, posicionado abajo-a-la-izquierda del canvas con margen respecto al borde.
- **Grupo superior**: 2 botones (icono "book"/manual, icono de conexión/"88") — separados por más aire que en `actual.png`.
- **Separación visual clara** entre el grupo superior y el grupo inferior (más que el simple `border-top` actual).
- **Grupo inferior**: zoom-in (+), zoom-out (−), fit view (expandir), lock — con más padding por botón y espacio entre ellos (no pegados como en `actual.png`).

Esto no es alcanzable con `<Controls>` porque mezcla botones que SÍ son de React Flow (zoom/fit/lock) con botones que NO tienen nada que ver con el estado interno del diagrama (book, conexión) — `<Controls>` está diseñado para ser homogéneo, no para dos grupos heterogéneos con distinta semántica.

## Qué expone la librería para construirla desde cero (verificado con Context7 + código fuente compilado)

Los primitivos relevantes de `@xyflow/react` v12:

| Primitivo | Qué es | Dependencia de contexto |
|---|---|---|
| `Panel` | `<div>` posicionado (`position`, `className`, `style`) — el mismo building block que usan internamente `<Controls>` y `<MiniMap>` | **Ninguna** — confirmado en el fuente (`dist/esm/index.js:123-127`): es un `forwardRef` que solo arma clases (`react-flow__panel` + posición) y renderiza un `div`. No usa hooks. |
| `ControlButton` | `<button className="react-flow__controls-button" {...props}>` | **Ninguna** — confirmado en el fuente (`dist/esm/index.js:4482-4484`): recibe `children`/`className`/resto de props HTML y no usa hooks. |
| `useReactFlow()` | Hook con `zoomIn`, `zoomOut`, `fitView`, `zoomTo`, `setCenter`, `getZoom`, etc. | Requiere estar dentro de `ReactFlowProvider` — **ya lo estamos**, porque `DiagramCanvas.js` envuelve todo en `<ReactFlowProvider>`. |
| `useStore(selector)` / `useStoreApi()` | Acceso al estado interno de Zustand de esa instancia de React Flow (incluye `minZoom`, `maxZoom`, `transform`, `nodesDraggable`, `nodesConnectable`, `elementsSelectable`, y `setState` para mutarlo) | Igual que arriba, requiere `ReactFlowProvider`. |
| `useViewport()` | Hook reactivo con `{ x, y, zoom }` | Igual. |

Referencia oficial encontrada en Context7 que usa exactamente este patrón para armar un panel de zoom **completamente custom** (no `<Controls>`): el ejemplo `ZoomSlider` de la documentación de React Flow arma su propio `<Panel>` con botones propios, usando `useViewport`, `useStore` (para `minZoom`/`maxZoom`) y `useReactFlow` (`zoomIn`, `zoomOut`, `zoomTo`, `fitView`) — es la prueba de que este approach es el soportado oficialmente por la librería para casos como el nuestro, no un hack.

También se puede replicar el toggle de "lock" nativo: en el fuente de `ControlsComponent` (`dist/esm/index.js:4491-4517`) el estado "interactivo" se lee así:

```js
const selector = (s) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});
```

y el toggle hace `store.setState({ nodesDraggable, nodesConnectable, elementsSelectable })`. Es exactamente el mismo mecanismo que ya usa `Canvas.js` de ui-web para el prop `readOnly` (`nodesDraggable={!readOnly}` etc.), así que replicarlo es consistente con el resto del componente.

> Nota: `@xyflow/react` no exporta `shallow` (el helper de igualdad de Zustand) para uso externo. Para evitar necesitarlo, conviene usar **selectores separados que devuelvan primitivos** (`boolean`/`number`) en vez de un único selector que devuelva un objeto — así no hace falta comparación custom y no se generan renders de más.

## Iconos disponibles en el sistema de `ui-web`

`ui-web` ya tiene su propio componente `Icon` (`src/components/Icon/Icon.js`, API `<Icon name="..." />`) con un set fijo en `icons.json`. Mapeo contra los 4 botones que sí son responsabilidad de `ui-web` (zoom/fit/lock — el estado que manejan viene del store interno de React Flow):

| Botón nativo | Icono disponible en `ui-web` | Observación |
|---|---|---|
| Zoom in | `plus_bold_medium` (16px) o `plus_bold_small` (16px) | Elegir según el peso visual del mockup |
| Zoom out | `minus_bold_medium` (16px) | No existe `minus_bold_small` |
| Fit view | `expand` (24px) | Encaja directo |
| Lock / Unlock | `lock` / `unlock` (24px) | Encaja directo, ya soporta ambos estados |

Los botones "book" y "conexión/88" del mockup **no entran en este mapeo**: no dependen de ningún estado interno de React Flow, son acciones de negocio específicas de la vista de crossdocking. Quedan fuera de `ui-web` — los provee el consumidor vía `additionalControls` (ver más abajo), con su propio icono (del set de `ui-web` o cualquier otro) y su propio handler. Esto resuelve de paso la duda pendiente del icono de "book": no hace falta agregarlo a `icons.json` de `ui-web`, `janis-views` decide qué icono usar para su propio botón.

## Propuesta de arquitectura (v2)

Reescribir `Controls.js` sin usar `<Controls>`, construyendo la barra sobre `Panel` + `ControlButton` + los hooks de estado. Respecto a la primera versión de este documento, se incorporan tres ajustes:

1. **`controlBarActions`**: los 4 botones nativos (zoom in, zoom out, fit view, lock) dejan de repetirse como JSX casi idéntico y pasan a un objeto de configuración declarativo que se itera con `.map`. Cada entrada define `icon` (función del estado → nombre de icono, para soportar el caso dinámico de lock/unlock), `label` (texto default del `aria-label`) y opcionalmente `isDisabled` (función del estado → boolean). El `onClick` real se arma aparte, en un mapa de handlers, porque necesita los closures de `zoomIn`/`zoomOut`/`fitView`/`toggleInteractivity` que solo existen dentro del componente.
2. **`labels` (texto para `aria-label`, sin i18n)**: revisé si `ui-web` tiene algún mecanismo de traducción — no lo tiene, y hay un precedente explícito en `src/components/ErrorBoundary/ErrorBoundary.js:11`: *"The package does not translate or resolve i18n keys — pass already-resolved text"*. Se sigue el mismo criterio acá: no se agrega ninguna lógica de i18n en `ui-web`, sino un prop `labels` (objeto, mismas keys que `controlBarActions`) para que el consumidor pase el texto ya traducido si lo necesita (en `janis-views` sería `labels={{ zoomIn: t('...'), ... }}`). Si no se pasa, se usa el texto default en español de `controlBarActions`.
3. **`extraButtons` → `additionalControls`**: nombre más semántico — no son "botones extra" genéricos, son controles adicionales de la barra provistos por el consumidor (book, conexión/88, o lo que necesite cada vista). El icono de "book" ya no es un problema de `ui-web`: como viene 100% desde `additionalControls`, el consumidor elige cualquier icono (del set de `ui-web` o propio) sin que haga falta agregar nada a `icons.json`.

```js
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Panel, ControlButton, useReactFlow, useStore, useStoreApi } from '@xyflow/react';
import Icon from '../Icon';
import styles from './styles';

const isInteractiveSelector = (s) => s.nodesDraggable || s.nodesConnectable || s.elementsSelectable;
const minZoomReachedSelector = (s) => s.transform[2] <= s.minZoom;
const maxZoomReachedSelector = (s) => s.transform[2] >= s.maxZoom;

// Config declarativa de los 4 botones nativos. `icon`/`isDisabled` reciben el
// estado derivado del store de React Flow (ver `buildActionState` más abajo).
const controlBarActions = {
  zoomIn: {
    icon: () => 'plus_bold_medium',
    label: 'Acercar',
    isDisabled: ({ maxZoomReached }) => maxZoomReached
  },
  zoomOut: {
    icon: () => 'minus_bold_medium',
    label: 'Alejar',
    isDisabled: ({ minZoomReached }) => minZoomReached
  },
  fitView: {
    icon: () => 'expand',
    label: 'Encuadrar'
  },
  toggleInteractivity: {
    icon: ({ isInteractive }) => (isInteractive ? 'unlock' : 'lock'),
    label: 'Bloquear/Desbloquear'
  }
};

const DiagramControls = ({ additionalControls, labels }) => {
  const store = useStoreApi();
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const isInteractive = useStore(isInteractiveSelector);
  const minZoomReached = useStore(minZoomReachedSelector);
  const maxZoomReached = useStore(maxZoomReachedSelector);

  const toggleInteractivity = useCallback(() => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive
    });
  }, [isInteractive, store]);

  // Estado que consumen `icon`/`isDisabled` de `controlBarActions`.
  const actionState = { isInteractive, minZoomReached, maxZoomReached };

  // Handlers reales — necesitan los closures de los hooks, por eso viven acá y no en `controlBarActions`.
  const actionHandlers = {
    zoomIn: () => zoomIn(),
    zoomOut: () => zoomOut(),
    fitView: () => fitView(),
    toggleInteractivity
  };

  return (
    <styles.Panel position="bottom-left">
      {additionalControls.length > 0 && (
        <styles.Group>
          {additionalControls.map(({ icon, onClick, ariaLabel }) => (
            <styles.Button key={ariaLabel} as={ControlButton} onClick={onClick} aria-label={ariaLabel}>
              <Icon name={icon} />
            </styles.Button>
          ))}
        </styles.Group>
      )}
      <styles.Group>
        {Object.entries(controlBarActions).map(([key, action]) => (
          <styles.Button
            key={key}
            as={ControlButton}
            onClick={actionHandlers[key]}
            disabled={action.isDisabled?.(actionState)}
            aria-label={labels[key] ?? action.label}
          >
            <Icon name={action.icon(actionState)} />
          </styles.Button>
        ))}
      </styles.Group>
    </styles.Panel>
  );
};

DiagramControls.propTypes = {
  /** Controles adicionales a la izquierda/arriba de los nativos (ej. book, conexión). El icono y el texto son responsabilidad de quien los define. */
  additionalControls: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      ariaLabel: PropTypes.string.isRequired
    })
  ),
  /** Override de los textos de aria-label de los 4 botones nativos (zoomIn, zoomOut, fitView, toggleInteractivity). ui-web no traduce: si no se pasa, se usa el default en español. */
  labels: PropTypes.shape({
    zoomIn: PropTypes.string,
    zoomOut: PropTypes.string,
    fitView: PropTypes.string,
    toggleInteractivity: PropTypes.string
  })
};

DiagramControls.defaultProps = { additionalControls: [], labels: {} };

export default DiagramControls;
```

`styles.js` pasa a definir `Panel` (styled del `Panel` de RF, con el fondo/radio/sombra/margen del contenedor), `Group` (cada sub-bloque, con su propio padding y `gap` entre botones) y `Button` (tamaño, hover, estado `disabled`) — sin `!important` ni pelea de especificidad, porque ahora el estilo se define en el mismo lugar donde se renderiza, no hay inline `style` de por medio compitiendo.

`additionalControls` es la propuesta de extensibilidad para los botones "book"/"conexión": en vez de hardcodear esa semántica de negocio (que es específica de la vista de crossdocking) dentro de una librería de componentes genérica, `DiagramCanvas`/`Canvas.js` recibiría este prop opcional y lo pasaría hacia abajo hasta `DiagramControls`. Esto además responde a la conversación pendiente sobre "la prop para `ui-web`": con este diseño, esa prop es `additionalControls`, consistente con el patrón que ya usa `Canvas.js` para `nodeComponents`.

## Approaches

1. **Reconstruir sobre `Panel` + `ControlButton` de RF (recomendado)** — lo detallado arriba.
   - Pros: reutiliza primitivos oficiales y probados (mismo patrón que el ejemplo `ZoomSlider` de la doc oficial), keyboard/focus básico de `<button>` nativo se mantiene, no hay que reinventar el manejo de `disabled` en los límites de zoom (se replica con 2 selectores de `useStore`); el mapping `controlBarActions` evita repetir el mismo JSX 4 veces.
   - Cons: hay que reimplementar a mano el `aria-label` que `<Controls>` resolvía solo internamente (acá se resuelve con el prop `labels`, sin i18n en `ui-web` — ver más abajo); se pierde automáticamente el soporte de `orientation="horizontal"` que traía gratis `<Controls>` (no debería hacer falta para este diseño, que es vertical).
   - Effort: Medium

2. **Barra 100% bespoke (sin ningún import de `@xyflow/react` salvo los hooks)** — armar los botones como `<button>` propios en vez de `ControlButton`, sin la clase `react-flow__controls-button`.
   - Pros: cero acoplamiento a nombres de clase internos de RF, control total del markup.
   - Cons: no aporta nada sobre la opción 1 (`ControlButton` ya es un `<button>` sin estilos propios más allá de la clase) y suma código sin beneficio real.
   - Effort: Medium (mismo esfuerzo que 1, sin ventaja)

3. **Mantener `<Controls>` y solo forwardear `children`** (la alternativa "liviana" discutida antes en la conversación) — agregar un prop `children`/`additionalControls` a `DiagramControls` pero seguir usando `<Controls>` como contenedor de los 4 botones nativos, agregando los botones extra al final vía `children`.
   - Pros: cambio mínimo, no hay que reimplementar el toggle de lock ni el disabled de zoom (RF lo sigue haciendo).
   - Cons: **no resuelve el layout del diseño** — los botones extra quedarían dentro de la MISMA caja/columna que zoom/fit/lock (eso es lo único que `children` permite: agregar al final del mismo grupo), no un grupo visualmente separado arriba como en `design.png`; tampoco permite cambiar los iconos nativos. Esta opción ya fue descartada en la conversación porque no llega al resultado visual pedido.
   - Effort: Low, pero no cumple el objetivo → no recomendada

## Recommendation

Approach 1. Es el único que llega al layout de dos grupos de `design.png`, está respaldado por un patrón oficial de la documentación de React Flow (`ZoomSlider`), y de paso resuelve el punto pendiente de la "prop en `ui-web`" con `additionalControls` como API pública y genérica (no atada a "book"/"conexión" como conceptos de negocio).

## Risks

- Al dejar de usar `<Controls>`, se pierde el `aria-label` que trae por default (`ariaLabelConfig`, con su propio i18n interno de RF) — se resuelve con el prop `labels`, siguiendo el criterio ya establecido en `ui-web` (`ErrorBoundary.js:11`) de no traducir dentro de la librería y aceptar texto ya resuelto del consumidor.
- Cambio de comportamiento sutil: `<Controls>` nativo también escuchaba `onZoomIn`/`onZoomOut`/`onFitView`/`onInteractiveChange` como callbacks adicionales — si algún consumidor externo llegara a necesitar enterarse de estos eventos, habría que agregar esos callbacks explícitamente al nuevo `DiagramControls` (hoy no se usan en `janis-views`, así que no bloquea, pero es un cambio de superficie de API interna a tener en cuenta).
- Es un cambio de una librería compartida (`ui-web`) consumida por más de una vista — conviene revisar si `DiagramCanvas` se usa en otro lugar además de `janis-views/crossdocking` antes de fijar el diseño final de `additionalControls` (que ese otro consumidor, si existe, no necesite algo distinto).
- `controlBarActions` fija el orden y el set de los 4 botones nativos vía `Object.entries` — si en el futuro se necesita ocultar alguno (equivalente a `showZoom`/`showFitView`/`showInteractive` de `<Controls>`), hay que agregar esa opción explícitamente (no viene gratis con este diseño).

## Ready for Proposal

Sí. No quedan decisiones bloqueantes: el icono de "book" y el de "conexión/88" ya no son responsabilidad de `ui-web` (los define `janis-views` vía `additionalControls`), y el approach (arquitectura, hooks, primitivos de RF, manejo de `aria-label` sin i18n) está validado con la documentación oficial y el código fuente de la librería.
