import React from 'react';
import Link from 'components/Link';
import styled from './styles';
import { MemoryRouter } from 'react-router-dom';

const findLinkProps = (component, prop = 'to') =>
	component.find('[data-test="react-router-link"]').first().props()[prop];

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
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={href}>{text}</Link>
			</MemoryRouter>
		);
		expect(component.children().exists()).toBe(true);
	});
	test('should show the children', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={href}>{text}</Link>
			</MemoryRouter>
		);
		expect(component.text()).toBe(text);
	});
	test('shows href content if not receive children in react link', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={href} />
			</MemoryRouter>
		);
		expect(component.text()).toBe(href);
	});
	test('shows href content if not receive children in normal link (href2)', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={href2} />
			</MemoryRouter>
		);
		expect(component.text()).toBe(href2);
	});
	test('when href is an internal link, path must be the exact href', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={internalLink} />
			</MemoryRouter>
		);
		expect(findLinkProps(component)).toBe('/delivery/shipping/pick-up');
	});
	test('when href is an internal link starting with "/", path must be the exact href', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={internalLink} />
			</MemoryRouter>
		);
		expect(findLinkProps(component)).toBe('/delivery/shipping/pick-up');
	});
	test('when href is an internal link which does not start with "/", that character must be added to href', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={internalLink2} />
			</MemoryRouter>
		);
		expect(findLinkProps(component)).toBe('/playground/views-demo/monitor');
	});
	test('target default is _self', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={href}>{text}</Link>
			</MemoryRouter>
		);
		const LinkTargetProp = component.children().children().props().target;
		expect(LinkTargetProp).toBe('_self');
	});
	test('receive prop target', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={href} target="_blank">
					{text}
				</Link>
			</MemoryRouter>
		);
		const LinkTargetProp = component.children().children().props().target;
		expect(LinkTargetProp).toBe('_blank');
	});
	test('receive prop icon', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={href} icon={icon}>
					{text}
				</Link>
			</MemoryRouter>
		);
		const LinkIconProp = component.children().children().props().icon;
		expect(LinkIconProp).toBe('user_closed');
	});
	test('render Icon component if prop "icon" is received', () => {
		const component = mount(
			<MemoryRouter initialEntries={['/']}>
				<Link href={href} icon={icon}>
					{text}
				</Link>
			</MemoryRouter>
		);
		expect(component.find(styled.StyledIcon).length).toBe(1);
	});
});
