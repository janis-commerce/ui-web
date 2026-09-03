import React from 'react';
import DiagramCanvas from './DiagramCanvas';

// `DiagramCanvas.js` importa el CSS de la librería; Jest no tiene un transform
// para `.css` (ver package.json > jest.transform) y nadie lo había importado
// todavía desde un test en este repo.
jest.mock('@xyflow/react/dist/style.css', () => ({}));

const Box = () => <div />;
const nodeComponents = { box: Box };

// `measured.width/height` a mano: en jsdom no hay `ResizeObserver`, así que
// React Flow nunca mide los nodos por su cuenta. `format.js` (mapNodesToRf)
// no desestructura `measured`, así que pasa intacto y `nodesInitialized` (y
// por lo tanto el efecto de `initialZoom`) corre sincrónicamente al montar.
const nodes = [
	{ id: 'n1', type: 'box', position: { x: 0, y: 0 }, measured: { width: 100, height: 50 } },
	{ id: 'n2', type: 'box', position: { x: 300, y: 200 }, measured: { width: 100, height: 50 } }
];

const getZoom = (wrapper) => {
	const transform = wrapper.find('.react-flow__viewport').prop('style').transform;
	return Number(transform.match(/scale\(([\d.]+)\)/)[1]);
};

const renderCanvas = (config) =>
	mount(<DiagramCanvas nodes={nodes} nodeComponents={nodeComponents} config={config} />);

describe('Canvas / initialZoom clamping and minZoom/maxZoom validation', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('3.8 initialZoom por encima del maxZoom efectivo queda clampeado a maxZoom', () => {
		const wrapper = renderCanvas({ initialZoom: 5 });
		expect(getZoom(wrapper)).toBe(2);
	});

	test('3.9 initialZoom por debajo del minZoom efectivo queda clampeado a minZoom', () => {
		const wrapper = renderCanvas({ initialZoom: 0.1 });
		expect(getZoom(wrapper)).toBe(0.5);
	});

	test('3.13 minZoom o maxZoom con valor <= 0 ignora ambos y usa los defaults del componente', () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

		let wrapper = renderCanvas({ minZoom: -1, initialZoom: 5 });
		expect(getZoom(wrapper)).toBe(2);

		wrapper = renderCanvas({ maxZoom: 0, initialZoom: 0.1 });
		expect(getZoom(wrapper)).toBe(0.5);

		expect(warnSpy).toHaveBeenCalled();
	});

	test('3.14 maxZoom menor o igual a minZoom ignora ambos y clampea contra los defaults', () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

		// Si la validación NO corriera, Math.min(Math.max(1.8, 5), 2) degeneraría a 2.
		// Si corre (cae a los defaults 0.5/2), 1.8 cae dentro del rango y no se clampea.
		const wrapper = renderCanvas({ minZoom: 5, maxZoom: 2, initialZoom: 1.8 });
		expect(getZoom(wrapper)).toBe(1.8);

		expect(warnSpy).toHaveBeenCalled();
	});
});
