import React from 'react';
import Callout from 'components/Callout';
import Icon from 'components/Icon';
import { create } from 'react-test-renderer';

describe('Callout component', () => {
	test('Should render info type by default and when type is invalid', () => {
		[undefined, 'invalid'].forEach((type) => {
			const wrapper = create(<Callout type={type}>Text</Callout>);
			const icon = wrapper.root.findByType(Icon);

			expect(wrapper.toJSON().props.role).toBe('status');
			expect(wrapper.toJSON().props.className).toContain('callout--info');
			expect(icon.props.name).toBe('info_circle_bold');
			expect(icon.props.color).toBe('blue');
		});
	});

	test('Should render warning type', () => {
		const wrapper = create(<Callout type="warning">Text</Callout>);
		const icon = wrapper.root.findByType(Icon);

		expect(icon.props.name).toBe('exclamation_triangle_bold');
		expect(icon.props.color).toBe('orangePressed');
	});

	test('Should render error type', () => {
		const wrapper = create(<Callout type="error">Text</Callout>);
		const icon = wrapper.root.findByType(Icon);

		expect(icon.props.name).toBe('cross_big_circle_bold');
		expect(icon.props.color).toBe('statusRedPressed');
	});

	test('Should render children', () => {
		const wrapper = mount(<Callout>Text children</Callout>);
		expect(wrapper.text()).toBe('Text children');
	});

	test('Should expose class names for consumer styling', () => {
		const wrapper = mount(<Callout onClose={() => {}}>Text</Callout>);

		['callout', 'callout__icon', 'callout__content', 'callout__close'].forEach((className) =>
			expect(wrapper.find(`.${className}`).hostNodes()).toHaveLength(1)
		);
	});

	test('Should add a modifier class for the type', () => {
		expect(create(<Callout>Text</Callout>).toJSON().props.className).toContain('callout--info');
		expect(create(<Callout type="warning">Text</Callout>).toJSON().props.className).toContain(
			'callout--warning'
		);
		expect(create(<Callout type="error">Text</Callout>).toJSON().props.className).toContain(
			'callout--error'
		);
	});

	test('Should keep its class names when receiving a className', () => {
		const { className } = create(<Callout className="custom">Text</Callout>).toJSON().props;
		expect(className.split(' ')).toEqual(
			expect.arrayContaining(['callout', 'callout--info', 'custom'])
		);
	});

	test('Should forward extra props to the container', () => {
		const { props } = create(<Callout data-testid="notice">Text</Callout>).toJSON();
		expect(props['data-testid']).toBe('notice');
	});

	test('Should set closeLabel as the close button aria-label', () => {
		const wrapper = create(
			<Callout onClose={() => {}} closeLabel="Cerrar">
				Text
			</Callout>
		);
		expect(wrapper.root.findByType('button').props['aria-label']).toBe('Cerrar');
	});

	test('Should default the close button aria-label to "Close"', () => {
		const wrapper = create(<Callout onClose={() => {}}>Text</Callout>);
		expect(wrapper.root.findByType('button').props['aria-label']).toBe('Close');
	});

	test('Should not render close button without onClose', () => {
		const wrapper = create(<Callout>Text</Callout>);
		expect(wrapper.root.findAllByType('button')).toHaveLength(0);
	});

	test('Should call onClose and stay rendered when close button is clicked', () => {
		const onClose = jest.fn();
		const wrapper = create(<Callout onClose={onClose}>Text</Callout>);

		wrapper.root.findByType('button').props.onClick();

		expect(onClose).toHaveBeenCalledTimes(1);
		expect(wrapper.toJSON()).not.toBeNull();
	});
});
