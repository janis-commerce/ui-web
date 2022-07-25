import React from 'react';
import Icon from 'components/Icon';
import ErrorBoundary from 'components/ErrorBoundary';

describe('ErrorBoundary component', () => {
	test('must contain a child component', () => {
		const wrapper = mount(
			<ErrorBoundary>
				<Icon name="clock" />
			</ErrorBoundary>
		);

		expect(wrapper.children().exists()).toBe(true);
	});

	test('should not render if no child component was provided', () => {
		const wrapper = mount(<ErrorBoundary />);

		expect(wrapper.isEmptyRender()).toBe(true);
	});

	test("should render an error message if there's an error in its child component", () => {
		const Bomb = () => {
			throw new Error('Kaboom');
		};

		const wrapper = mount(
			<ErrorBoundary>
				<Bomb />
			</ErrorBoundary>
		);

		expect(wrapper.children().getDOMNode().textContent).toMatch('something went wrong error');
	});

	test("should render an custom error message if there's an error in its child component", () => {
		const Bomb = () => {
			throw new Error('Kaboom');
		};

		const wrapper = mount(
			<ErrorBoundary message="Some Error">
				<Bomb />
			</ErrorBoundary>
		);

		expect(wrapper.children().getDOMNode().textContent).toMatch('Some Error');
	});

	test('should render the provided children if no error occurred', () => {
		const ClockIcon = <Icon name="clock" />;
		const wrapper = mount(<ErrorBoundary>{ClockIcon}</ErrorBoundary>);

		expect(wrapper.containsMatchingElement(ClockIcon)).toBe(true);
	});
});
