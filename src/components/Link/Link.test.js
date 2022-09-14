import React from 'react';
import { Router as ReactRouter } from 'react-router';
import { getCurrentHistory } from 'utils/location';
import Link from 'components/Link';
import styled from './styles';

const history = getCurrentHistory();

const findLinkProps = (wrapper, prop = 'to') =>
	wrapper
		.find('[data-test="react-router-link"]')
		.first()
		.props()[prop];

describe('Link component', () => {
	const origin = 'https://janis.in';
	const href = 'https://janis.in/test';
	const href2 = 'https://janisdev.in/test';
	const internalLink = '/delivery/shipping/pick-up';
	const internalLink2 = 'playground/views-demo/monitor';
	const text = 'janis';
	const icon = 'user_closed';
	const { location } = global.window;

	beforeAll(() => {
		delete global.window.location;
		global.window.location = { ...location, origin };
	});

	afterAll(() => {
		global.window.location = location;
	});

	test('render', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={href}>{text}</Link>
			</ReactRouter>
		);
		expect(wrapper.children().exists()).toBe(true);
	});
	test('should show the children', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={href}>{text}</Link>
			</ReactRouter>
		);
		expect(wrapper.text()).toBe(text);
	});
	test('shows href content if not receive children in react link', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={href} />
			</ReactRouter>
		);
		expect(wrapper.text()).toBe(href);
	});
	test('shows href content if not receive children in normal link', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={href2} />
			</ReactRouter>
		);
		expect(wrapper.text()).toBe(href2);
	});
	test('when href is an internal link, path must be the exact href', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={internalLink} />
			</ReactRouter>
		);
		expect(findLinkProps(wrapper)).toBe('/delivery/shipping/pick-up');
	});
	test('when href is an internal link starting with "/", path must be the exact href', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={internalLink} />
			</ReactRouter>
		);
		expect(findLinkProps(wrapper)).toBe('/delivery/shipping/pick-up');
	});
	test('when href is an internal link which does not start with "/", that character must be added to href', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={internalLink2} />
			</ReactRouter>
		);
		expect(findLinkProps(wrapper)).toBe('/playground/views-demo/monitor');
	});
	test('target default is _self', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={href}>{text}</Link>
			</ReactRouter>
		);
		expect(wrapper.children().props().target).toBe('_self');
	});
	test('recive prop target', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={href} target="_blank">
					{text}
				</Link>
			</ReactRouter>
		);
		expect(wrapper.children().props().target).toBe('_blank');
	});
	test('receive prop icon', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={href} icon={icon}>
					{text}
				</Link>
			</ReactRouter>
		);
		expect(wrapper.children().props().icon).toBe('user_closed');
	});
	test('renders Icon component if prop "icon" is received', () => {
		const wrapper = mount(
			<ReactRouter history={history}>
				<Link href={href} icon={icon}>
					{text}
				</Link>
			</ReactRouter>
		);
		expect(wrapper.find(styled.StyledIcon).length).toBe(1);
	});
});
