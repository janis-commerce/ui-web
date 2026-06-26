// Shapes documentadas (se usan en argTypes.table.type.detail)

export const NODE_SHAPE = `{
  id:           string          // requerido
  type:         string          // requerido — clave en nodeComponents
  position:     { x, y }        // requerido
  data?:        object          // props que recibe el componente
  width?:       number          // para resize persistido
  height?:      number
  handleConfig?: {
    color?:     string          // color de los handles (default '#b1b1b7')
    positions?: ('top'|'right'|'bottom'|'left')[]  // default: los 4 lados
  }
}`;

export const EDGE_SHAPE = `{
  id:            string         // requerido
  source:        string         // requerido — id del nodo origen
  target:        string         // requerido — id del nodo destino
  sourceHandle?: string         // 'top' | 'right' | 'bottom' | 'left'
  targetHandle?: string
  lineType?:     'step' | 'curved' | 'straight'   // default 'curved'
  animated?:     boolean
  label?:        string
  style?:        object         // estilos CSS del trazo (stroke, strokeWidth…)
  selectedStyle?: object        // estilos CSS al estar seleccionado
  arrowStart?:   { type: 'outlined' | 'contained', size?: number }  // color heredado de style.stroke
  arrowEnd?:     { type: 'outlined' | 'contained', size?: number }  // color heredado de style.stroke
  data?:         object         // datos de negocio que recibe onEdgeClick
}`;

export const NODE_CHANGE_SHAPE = `Array<
  | { type: 'position',   id, position: { x, y } }
  | { type: 'dimensions', id, width, height }
  | { type: 'remove',     id }
>`;

export const EDGE_CHANGE_SHAPE = `Array<{ type: 'remove', id }>`;
