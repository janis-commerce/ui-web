import React from 'react';
import 'jest-styled-components';
import Icon from 'components/Icon';
import ErrorBoundary from 'components/ErrorBoundary';
import DefaultError from './DefaultError';
import palette from 'theme/palette';

describe('ErrorBoundary component', () => {
	let consoleErrorSpy;

	beforeEach(() => {
		consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

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

		expect(wrapper.children().getDOMNode().textContent).toMatch('Something went wrong');
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

	test('should render custom errorComponent when there is an error and no message', () => {
		const Bomb = () => {
			throw new Error('Kaboom');
		};

		const wrapper = mount(
			<ErrorBoundary errorComponent={<span data-testid="custom-fallback">Custom fallback</span>}>
				<Bomb />
			</ErrorBoundary>
		);

		expect(wrapper.find('[data-testid="custom-fallback"]').text()).toBe('Custom fallback');
	});

	test('DefaultError message uses package theme error color', () => {
		const wrapper = mount(<DefaultError message="Err" />);
		expect(wrapper.find('span').last()).toHaveStyleRule('color', palette.statusRed);
	});

	test('should render the provided children if no error occurred', () => {
		const ClockIcon = <Icon name="clock" />;
		const wrapper = mount(<ErrorBoundary>{ClockIcon}</ErrorBoundary>);

		expect(wrapper.containsMatchingElement(ClockIcon)).toBe(true);
	});
});
