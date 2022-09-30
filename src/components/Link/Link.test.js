import React from 'react';
import Link from 'components/Link';
import styled from './styles';

describe('Link component', () => {
	const href = 'https://janis.in/test';
	const href2 = 'janisdev.in/test';
	const href3 = 'https://janisdev.in/test';
	const text = 'janis';
	const icon = 'user_closed';

	test('render', () => {
		const component = mount(<Link href={href}>{text}</Link>);
		expect(component.children().exists()).toBe(true);
	});
	test('should show the children', () => {
		const component = mount(<Link href={href}>{text}</Link>);
		expect(component.text()).toBe(text);
	});
	test('shows href content if not receive children (href3)', () => {
		const component = mount(<Link href={href3} />);
		expect(component.text()).toBe(href3);
	});
	test('target default is _self', () => {
		const component = mount(<Link href={href}>{text}</Link>);
		const LinkTargetProp = component.find('a').props().target;
		expect(LinkTargetProp).toBe('_self');
	});
	test('receive prop target', () => {
		const component = mount(
			<Link href={href} target="_blank">
				{text}
			</Link>
		);
		const LinkTargetProp = component.find('a').props().target;
		expect(LinkTargetProp).toBe('_blank');
	});
	test('receive prop icon', () => {
		const component = mount(
			<Link href={href} icon={icon}>
				{text}
			</Link>
		);
		const LinkIconProp = component.childAt(0).children().childAt(0).props().name;
		expect(LinkIconProp).toBe('user_closed');
	});
	test('render Icon component if prop "icon" is received', () => {
		const component = mount(
			<Link href={href} icon={icon}>
				{text}
			</Link>
		);
		expect(component.find(styled.StyledIcon).length).toBe(1);
	});
});
