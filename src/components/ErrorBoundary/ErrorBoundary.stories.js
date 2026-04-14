import React from 'react';
import Link from 'components/Link';
import palette from 'theme/palette';
import ErrorBoundary from './ErrorBoundary';

const Bomb = () => {
	throw new Error('Demo error (Storybook)');
};

const frame = {
	border: '1px dashed #ccc',
	padding: 12,
	minHeight: 40,
	minWidth: 280
};

export default {
	title: 'Components/ErrorBoundary',
	component: ErrorBoundary,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		childVariant: {
			control: 'select',
			options: ['throwing', 'healthy'],
			description: 'throwing: child throws on render; healthy: no error'
		},
		message: { control: 'text' },
		errorComponentVariant: {
			control: 'select',
			options: ['none', 'custom'],
			description:
				'When child throws and message is empty: none uses DefaultError; custom uses errorComponent prop'
		}
	}
};

const Template = (args) => {
	const message = args.message && String(args.message).trim() !== '' ? args.message : undefined;
	const errorComponent =
		args.errorComponentVariant === 'custom' ? (
			<strong style={{ color: palette.fizzGreen }}>Custom error content</strong>
		) : undefined;
	const child =
		args.childVariant === 'throwing' ? (
			<Bomb />
		) : (
			<Link href="https://app.janisdev.in/" target="_blank" icon="link">
				Janis
			</Link>
		);

	return (
		<div style={frame}>
			<ErrorBoundary key={JSON.stringify(args)} message={message} errorComponent={errorComponent}>
				{child}
			</ErrorBoundary>
		</div>
	);
};

const baseArgs = {
	childVariant: 'throwing',
	message: '',
	errorComponentVariant: 'none'
};

export const DefaultFallback = Template.bind({});
export const CustomMessage = Template.bind({});
export const CustomErrorComponent = Template.bind({});
export const HealthyChild = Template.bind({});

DefaultFallback.args = {
	...baseArgs
};

CustomMessage.args = {
	...baseArgs,
	message: 'Visible custom message'
};

CustomErrorComponent.args = {
	...baseArgs,
	errorComponentVariant: 'custom'
};

HealthyChild.args = {
	...baseArgs,
	childVariant: 'healthy',
	message: '',
	errorComponentVariant: 'none'
};
