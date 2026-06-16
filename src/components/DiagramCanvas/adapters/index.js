import reactFlowAdapter from './reactFlow';

/**
 * Contrato que debe implementar cada adapter:
 *
 * @typedef {Object} DiagramAdapter
 * @property {(nodes: object[], edges: object[]) => { nodes: object[], edges: object[] }} formatInput
 *   Traduce nodes y edges del formato agnóstico al formato interno del motor.
 * @property {(nodesChanges: object[], edgesChanges: object[]) => { nodes: object[], edges: object[] }} formatOutput
 *   Traduce cambios internos del motor al formato agnóstico del consumidor.
 * @property {(connection: object) => { source: string, target: string, sourceHandle: string|null, targetHandle: string|null }} formatConnection
 *   Traduce una conexión nueva del motor al formato agnóstico del consumidor.
 * @property {React.ComponentType} Component
 *   Componente React que renderiza el canvas usando el motor interno.
 */

export const ADAPTERS = {
	reactFlow: reactFlowAdapter
};

export const DEFAULT_ADAPTER = 'reactFlow';
