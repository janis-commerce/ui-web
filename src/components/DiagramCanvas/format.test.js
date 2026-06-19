jest.mock('@xyflow/react', () => ({
	MarkerType: { Arrow: 'arrow', ArrowClosed: 'arrowclosed' }
}));

const { mapNodesToRf, mapEdgesToRf, readNodeChanges, readEdgeChanges } = require('./format');

describe('DiagramCanvas / format', () => {
	describe('mapNodesToRf', () => {
		test('maps required fields', () => {
			const result = mapNodesToRf([{ id: 'n1', type: 'cd', position: { x: 0, y: 0 } }]);
			expect(result[0]).toMatchObject({ id: 'n1', type: 'cd', position: { x: 0, y: 0 } });
		});

		test('adds dc-node className with type', () => {
			const result = mapNodesToRf([{ id: 'n1', type: 'cd', position: { x: 0, y: 0 } }]);
			expect(result[0].className).toBe('dc-node cd');
		});

		test('includes width and height when provided', () => {
			const result = mapNodesToRf([
				{ id: 'n1', type: 'cd', position: { x: 0, y: 0 }, width: 200, height: 100 }
			]);
			expect(result[0].width).toBe(200);
			expect(result[0].height).toBe(100);
		});

		test('omits width and height when not provided', () => {
			const result = mapNodesToRf([{ id: 'n1', type: 'cd', position: { x: 0, y: 0 } }]);
			expect(result[0]).not.toHaveProperty('width');
			expect(result[0]).not.toHaveProperty('height');
		});

		test('moves handleConfig into data', () => {
			const handleConfig = { color: 'red', positions: ['top'] };
			const result = mapNodesToRf([
				{ id: 'n1', type: 'cd', position: { x: 0, y: 0 }, handleConfig, data: { label: 'X' } }
			]);
			expect(result[0].data).toEqual({ label: 'X', handleConfig });
			expect(result[0]).not.toHaveProperty('handleConfig');
		});
	});

	describe('mapEdgesToRf', () => {
		const baseEdge = { id: 'e1', source: 'n1', target: 'n2' };

		test('maps required fields', () => {
			const result = mapEdgesToRf([baseEdge]);
			expect(result[0]).toMatchObject({ id: 'e1', source: 'n1', target: 'n2' });
		});

		test('defaults to bezier when lineType is not provided', () => {
			const result = mapEdgesToRf([baseEdge]);
			expect(result[0].type).toBe('bezier');
		});

		test('maps lineType to RF type', () => {
			expect(mapEdgesToRf([{ ...baseEdge, lineType: 'step' }])[0].type).toBe('smoothstep');
			expect(mapEdgesToRf([{ ...baseEdge, lineType: 'curved' }])[0].type).toBe('bezier');
			expect(mapEdgesToRf([{ ...baseEdge, lineType: 'straight' }])[0].type).toBe('straight');
		});

		test('adds dc-edge className with lineType', () => {
			const result = mapEdgesToRf([{ ...baseEdge, lineType: 'step' }]);
			expect(result[0].className).toBe('dc-edge step');
		});

		test('adds dc-edge className without lineType', () => {
			const result = mapEdgesToRf([baseEdge]);
			expect(result[0].className).toBe('dc-edge');
		});

		test('translates arrowEnd outlined to markerEnd', () => {
			const result = mapEdgesToRf([{ ...baseEdge, arrowEnd: { type: 'outlined', color: 'red' } }]);
			expect(result[0].markerEnd).toEqual({ type: 'arrow', color: 'red' });
		});

		test('translates arrowStart contained to markerStart', () => {
			const result = mapEdgesToRf([{ ...baseEdge, arrowStart: { type: 'contained', color: 'blue' } }]);
			expect(result[0].markerStart).toEqual({ type: 'arrowclosed', color: 'blue' });
		});

		test('omits markerStart and markerEnd when arrows not provided', () => {
			const result = mapEdgesToRf([baseEdge]);
			expect(result[0].markerStart).toBeUndefined();
			expect(result[0].markerEnd).toBeUndefined();
		});

		test('moves selectedStyle into data', () => {
			const selectedStyle = { stroke: 'red' };
			const result = mapEdgesToRf([{ ...baseEdge, selectedStyle, data: { foo: 1 } }]);
			expect(result[0].data).toEqual({ foo: 1, selectedStyle });
			expect(result[0]).not.toHaveProperty('selectedStyle');
		});
	});

	describe('readNodeChanges', () => {
		test('returns position change when drag ended', () => {
			const changes = [{ type: 'position', id: 'n1', position: { x: 10, y: 20 }, dragging: false }];
			expect(readNodeChanges(changes)).toEqual([{ type: 'position', id: 'n1', position: { x: 10, y: 20 } }]);
		});

		test('ignores position change while dragging', () => {
			const changes = [{ type: 'position', id: 'n1', position: { x: 10, y: 20 }, dragging: true }];
			expect(readNodeChanges(changes)).toEqual([]);
		});

		test('ignores position change without position value', () => {
			const changes = [{ type: 'position', id: 'n1', dragging: false }];
			expect(readNodeChanges(changes)).toEqual([]);
		});

		test('returns dimensions change when resize ended', () => {
			const changes = [{ type: 'dimensions', id: 'n1', dimensions: { width: 200, height: 100 }, resizing: false }];
			expect(readNodeChanges(changes)).toEqual([{ type: 'dimensions', id: 'n1', width: 200, height: 100 }]);
		});

		test('ignores dimensions change while resizing', () => {
			const changes = [{ type: 'dimensions', id: 'n1', dimensions: { width: 200, height: 100 }, resizing: true }];
			expect(readNodeChanges(changes)).toEqual([]);
		});

		test('ignores dimensions change without dimensions value', () => {
			const changes = [{ type: 'dimensions', id: 'n1', resizing: false }];
			expect(readNodeChanges(changes)).toEqual([]);
		});

		test('returns remove change', () => {
			const changes = [{ type: 'remove', id: 'n1' }];
			expect(readNodeChanges(changes)).toEqual([{ type: 'remove', id: 'n1' }]);
		});

		test('ignores unknown change types', () => {
			const changes = [{ type: 'select', id: 'n1' }];
			expect(readNodeChanges(changes)).toEqual([]);
		});

		test('handles mixed changes', () => {
			const changes = [
				{ type: 'position', id: 'n1', position: { x: 5, y: 5 }, dragging: false },
				{ type: 'select', id: 'n2' },
				{ type: 'remove', id: 'n3' }
			];
			expect(readNodeChanges(changes)).toEqual([
				{ type: 'position', id: 'n1', position: { x: 5, y: 5 } },
				{ type: 'remove', id: 'n3' }
			]);
		});
	});

	describe('readEdgeChanges', () => {
		test('returns remove change', () => {
			const changes = [{ type: 'remove', id: 'e1' }];
			expect(readEdgeChanges(changes)).toEqual([{ type: 'remove', id: 'e1' }]);
		});

		test('ignores non-remove change types', () => {
			const changes = [{ type: 'select', id: 'e1' }];
			expect(readEdgeChanges(changes)).toEqual([]);
		});

		test('handles mixed changes', () => {
			const changes = [
				{ type: 'select', id: 'e1' },
				{ type: 'remove', id: 'e2' }
			];
			expect(readEdgeChanges(changes)).toEqual([{ type: 'remove', id: 'e2' }]);
		});
	});
});
