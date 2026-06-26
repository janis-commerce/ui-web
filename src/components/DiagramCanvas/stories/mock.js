import { PRIMARY, PRIMARY_SOFT, SECONDARY_DEEP, SECONDARY_SOFT } from './theme';

export { PRIMARY, PRIMARY_SOFT, SECONDARY_DEEP, SECONDARY_SOFT };

export const edgeCdCd = {
	lineType: 'step',
	animated: true,
	style: { stroke: PRIMARY, strokeWidth: 2, strokeDasharray: '6 3' },
	selectedStyle: { stroke: PRIMARY, strokeWidth: 3, strokeDasharray: 'none' },
	arrowEnd: { type: 'outlined' }
};

export const edgeCdGrupo = {
	lineType: 'step',
	animated: true,
	style: { stroke: SECONDARY_DEEP, strokeWidth: 2, strokeDasharray: '6 3' },
	selectedStyle: { stroke: SECONDARY_DEEP, strokeWidth: 3, strokeDasharray: 'none' },
	arrowStart: { type: 'outlined' },
	arrowEnd: { type: 'outlined' }
};

export const baseNodes = [
	{
		id: 'wh-cordoba',
		type: 'cd',
		position: { x: 340, y: 170 },
		handleConfig: { color: PRIMARY },
		data: { label: 'Córdoba', priority: 1 }
	},
	{
		id: 'wh-escobar',
		type: 'cd',
		position: { x: 540, y: 230 },
		handleConfig: { color: PRIMARY },
		data: { label: 'Escobar', priority: 1 }
	},
	{
		id: 'wh-mendoza',
		type: 'cd',
		position: { x: 120, y: 200 },
		handleConfig: { color: PRIMARY },
		data: { label: 'Mendoza', priority: 2 }
	},
	{
		id: 'gt-cba',
		type: 'grupoTiendas',
		position: { x: 540, y: 60 },
		handleConfig: { color: SECONDARY_DEEP },
		data: { label: 'Zona Córdoba L-M', tiendas: ['st-cba-1', 'st-cba-2'] }
	},
	{
		id: 'gt-norte',
		type: 'grupoTiendas',
		position: { x: 760, y: 170 },
		handleConfig: { color: SECONDARY_DEEP },
		data: { label: 'BsAs Norte M-V', tiendas: ['st-esc-1', 'st-esc-2'] }
	}
];

export const baseEdges = [
	{
		id: 'e-1',
		source: 'wh-mendoza',
		target: 'wh-cordoba',
		...edgeCdCd,
		label: 'Ruta principal',
		data: { priority: 1 }
	},
	{
		id: 'e-2',
		source: 'wh-cordoba',
		target: 'wh-escobar',
		...edgeCdCd,
		label: 'Ruta secundaria',
		data: { priority: 2 }
	},
	{
		id: 'e-3',
		source: 'wh-cordoba',
		target: 'gt-cba',
		...edgeCdGrupo,
		label: 'CD → Grupo Cba',
		data: { type: 'abastecimiento' }
	},
	{
		id: 'e-4',
		source: 'wh-escobar',
		target: 'gt-norte',
		...edgeCdGrupo,
		label: 'CD → Grupo Norte',
		data: { type: 'abastecimiento' }
	}
];
