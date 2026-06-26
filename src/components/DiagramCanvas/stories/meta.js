import DiagramCanvas from '../DiagramCanvas';
import { NODE_SHAPE, EDGE_SHAPE, NODE_CHANGE_SHAPE, EDGE_CHANGE_SHAPE } from './shapes';

// Meta base compartido por los archivos de stories de DiagramCanvas.
// Cada archivo lo reusa con `{ ...meta, title: 'Components/DiagramCanvas/<Tema>' }`.
const meta = {
	component: DiagramCanvas,
	parameters: { layout: 'padded' },
	argTypes: {
		nodes: {
			control: false,
			description:
				'Nodos del diagrama. El consumidor es dueño de este array — lo inicializa, lo actualiza en `onNodesChange` y lo pasa de vuelta.',
			table: { type: { summary: 'Node[]', detail: NODE_SHAPE } }
		},
		edges: {
			control: false,
			description:
				'Conexiones entre nodos. El consumidor crea edges en `onConnect` y los agrega a su array.',
			table: { type: { summary: 'Edge[]', detail: EDGE_SHAPE } }
		},
		nodeComponents: {
			control: false,
			description:
				'Mapa `{ [type]: ComponenteReact }`. El tipo debe coincidir con `node.type`. El componente recibe `{ data, selected, style }`. Definirlo **fuera del render** para evitar recreaciones.',
			table: {
				type: {
					summary: '{ [type: string]: React.ComponentType }',
					detail: `// Ejemplo:
const MyNode = ({ data, selected }) => <div>...</div>
const nodeComponents = { myType: MyNode }

// El componente recibe:
//   data     — el objeto node.data del consumidor
//   selected — true cuando el nodo está seleccionado
//   style    — { width: '100%', height: '100%' } cuando resizableNodes está activo`
				}
			}
		},
		config: {
			description: 'Configuración del canvas.',
			table: {
				type: {
					summary: 'Config',
					detail: `{
  readOnly?:      boolean  // default true  — deshabilita drag, conexiones y selección
  showControls?:  boolean  // default true  — botones de zoom
  showMiniMap?:   boolean  // default true  — minimapa
  resizableNodes?: boolean // default false — habilita resize de nodos (ver story ResizableNodes)
}`
				},
				defaultValue: {
					summary:
						'{ readOnly: true, showControls: true, showMiniMap: true, resizableNodes: false }'
				}
			}
		},
		onNodesChange: {
			description:
				'Se llama cuando el usuario mueve, redimensiona o elimina nodos. El consumidor aplica los cambios a su array y lo pasa de vuelta como prop.',
			table: {
				type: { summary: '(changes: NodeChange[]) => void', detail: NODE_CHANGE_SHAPE }
			}
		},
		onEdgesChange: {
			description: 'Se llama cuando el usuario elimina un edge.',
			table: {
				type: { summary: '(changes: EdgeChange[]) => void', detail: EDGE_CHANGE_SHAPE }
			}
		},
		onConnect: {
			description:
				'El usuario arrastró entre dos handles. El consumidor crea el edge y lo agrega a su array.',
			table: {
				type: {
					summary: '(connection) => void',
					detail: `({ source, target, sourceHandle, targetHandle }) => void`
				}
			}
		},
		onReconnect: {
			description: 'El usuario arrastró un extremo de un edge existente a otro nodo.',
			table: { type: { summary: '(id, { source, target }) => void' } }
		},
		onNodeClick: {
			description: 'Click en un nodo.',
			table: { type: { summary: '(id: string, data: object) => void' } }
		},
		onEdgeClick: {
			description: 'Click en un edge. `data` es el `edge.data` del consumidor sin `selectedStyle`.',
			table: { type: { summary: '(id: string, data: object) => void' } }
		},
		onBeforeDelete: {
			description:
				'Intercepta el borrado antes de que ocurra (tecla Delete/Backspace). Async: retornar `false` cancela el borrado. Ver story DeleteWithConfirm.',
			table: {
				type: {
					summary: '({ nodes, edges }) => Promise<boolean>',
					detail: `async ({ nodes, edges }) => {
  // nodes/edges: elementos que se van a borrar (formato de dominio)
  return window.confirm('¿Eliminar?'); // false cancela
}`
				}
			}
		},
		onSelectionChange: {
			description: 'Se llama cuando cambia la selección. Ver story ExternalAction.',
			table: {
				type: {
					summary: '({ nodes, edges }) => void',
					detail: `({ nodes: [{ id }], edges: [{ id }] }) => void`
				}
			}
		}
	}
};

export default meta;
