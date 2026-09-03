import React from 'react';
import { useReactFlow, useStore, useStoreApi } from '@xyflow/react';
import Icon from '../Icon';
import DiagramControls from './Controls';

jest.mock('@xyflow/react', () => {
	const ReactLib = require('react');
	return {
		useReactFlow: jest.fn(),
		useStore: jest.fn(),
		useStoreApi: jest.fn(),
		Panel: ReactLib.forwardRef(({ children, ...rest }, ref) =>
			ReactLib.createElement('div', { ref, ...rest }, children)
		),
		ControlButton: ({ children, ...rest }) =>
			ReactLib.createElement('button', { type: 'button', ...rest }, children)
	};
});

const baseState = {
	transform: [0, 0, 1],
	minZoom: 0.5,
	maxZoom: 2,
	nodesDraggable: true,
	nodesConnectable: true,
	elementsSelectable: true
};

const setup = (stateOverrides = {}) => {
	const state = { ...baseState, ...stateOverrides };
	const zoomIn = jest.fn();
	const zoomOut = jest.fn();
	const fitView = jest.fn();
	const setState = jest.fn();

	useReactFlow.mockReturnValue({ zoomIn, zoomOut, fitView });
	useStore.mockImplementation((selector) => selector(state));
	useStoreApi.mockReturnValue({ setState });

	return { zoomIn, zoomOut, fitView, setState };
};

beforeEach(() => {
	jest.clearAllMocks();
});

describe('DiagramControls', () => {
	test('4.1 renders the 4 native buttons with their icons when readOnly is false (own default)', () => {
		setup();
		const wrapper = mount(<DiagramControls />);
		const icons = wrapper.find(Icon).map((node) => node.prop('name'));
		expect(icons).toEqual(['plus_big_light', 'minus_big_light', 'expand', 'unlock']);
	});

	test('4.2 toggle icon shows unlock when interactive, lock when not', () => {
		setup({ nodesDraggable: true, nodesConnectable: true, elementsSelectable: true });
		let wrapper = mount(<DiagramControls />);
		expect(wrapper.find(Icon).last().prop('name')).toBe('unlock');

		setup({ nodesDraggable: false, nodesConnectable: false, elementsSelectable: false });
		wrapper = mount(<DiagramControls />);
		expect(wrapper.find(Icon).last().prop('name')).toBe('lock');
	});

	test('4.3 toggle button is hidden when readOnly is true, native buttons still render', () => {
		setup();
		const wrapper = mount(<DiagramControls readOnly />);
		const icons = wrapper.find(Icon).map((node) => node.prop('name'));
		expect(icons).toEqual(['plus_big_light', 'minus_big_light', 'expand']);
		expect(wrapper.find('[aria-label="Toggle lock"]').exists()).toBe(false);
	});

	test('4.4 toggle button renders in its own group, separate from the native group', () => {
		setup();
		const wrapper = mount(<DiagramControls />);
		const groups = wrapper.find('.controls__group').hostNodes();
		expect(groups).toHaveLength(2);
		expect(groups.at(0).find('[aria-label="Toggle lock"]').exists()).toBe(false);
		expect(groups.at(1).find('[aria-label="Toggle lock"]').exists()).toBe(true);
	});

	test('4.5 zoom in is disabled at max zoom', () => {
		setup({ transform: [0, 0, 2], maxZoom: 2 });
		const wrapper = mount(<DiagramControls />);
		expect(wrapper.find('[aria-label="Zoom in"]').first().prop('disabled')).toBe(true);
	});

	test('4.6 zoom out is disabled at min zoom, both enabled between limits', () => {
		setup({ transform: [0, 0, 0.5], minZoom: 0.5 });
		let wrapper = mount(<DiagramControls />);
		expect(wrapper.find('[aria-label="Zoom out"]').first().prop('disabled')).toBe(true);

		setup({ transform: [0, 0, 1], minZoom: 0.5, maxZoom: 2 });
		wrapper = mount(<DiagramControls />);
		expect(wrapper.find('[aria-label="Zoom in"]').first().prop('disabled')).toBeFalsy();
		expect(wrapper.find('[aria-label="Zoom out"]').first().prop('disabled')).toBeFalsy();
	});

	test('4.7 clicking toggle on an interactive diagram sets the 3 flags to false', () => {
		const { setState } = setup({
			nodesDraggable: true,
			nodesConnectable: true,
			elementsSelectable: true
		});
		const wrapper = mount(<DiagramControls />);
		wrapper.find('[aria-label="Toggle lock"]').first().simulate('click');
		expect(setState).toHaveBeenCalledWith({
			nodesDraggable: false,
			nodesConnectable: false,
			elementsSelectable: false
		});
	});

	test('4.8 clicking toggle on a non-interactive diagram sets the 3 flags to true', () => {
		const { setState } = setup({
			nodesDraggable: false,
			nodesConnectable: false,
			elementsSelectable: false
		});
		const wrapper = mount(<DiagramControls />);
		wrapper.find('[aria-label="Toggle lock"]').first().simulate('click');
		expect(setState).toHaveBeenCalledWith({
			nodesDraggable: true,
			nodesConnectable: true,
			elementsSelectable: true
		});
	});

	test('4.9 additionalControls renders a lone node or an array of nodes unmodified, in a separate group', () => {
		setup();
		let wrapper = mount(
			<DiagramControls additionalControls={<button type="button">Solo</button>} />
		);
		let groups = wrapper.find('.controls__group').hostNodes();
		expect(groups).toHaveLength(3);
		expect(groups.at(0).find('button').text()).toBe('Solo');

		wrapper = mount(
			<DiagramControls
				additionalControls={[
					<button type="button" key="a">
						A
					</button>,
					<button type="button" key="b">
						B
					</button>
				]}
			/>
		);
		groups = wrapper.find('.controls__group').hostNodes();
		expect(groups).toHaveLength(3);
		expect(groups.at(0).find('button')).toHaveLength(2);
	});

	test('4.10 empty, absent, null or undefined additionalControls renders no extra group', () => {
		setup();
		[undefined, null, []].forEach((additionalControls) => {
			const wrapper = mount(<DiagramControls additionalControls={additionalControls} />);
			expect(wrapper.find('.controls__group').hostNodes()).toHaveLength(2);
		});
	});

	test('4.11 every native button has a fixed aria-label and a matching title', () => {
		setup();
		const wrapper = mount(<DiagramControls />);
		[
			['Zoom in', 'Zoom in'],
			['Zoom out', 'Zoom out'],
			['Fit view', 'Fit view'],
			['Toggle lock', 'Toggle lock']
		].forEach(([ariaLabel, title]) => {
			const button = wrapper.find(`[aria-label="${ariaLabel}"]`).first();
			expect(button.prop('title')).toBe(title);
		});
	});

	test('4.12 the control bar container has a fixed aria-label', () => {
		setup();
		const wrapper = mount(<DiagramControls />);
		expect(wrapper.find('[aria-label="Diagram controls"]').first().exists()).toBe(true);
	});
});
