import React from 'react';
import { node, element, string } from 'prop-types';
import DefaultError from './DefaultError';

export default class ErrorBoundary extends React.PureComponent {
	static propTypes = {
		/** The content to be displayed */
		children: node,
		/** Custom content to show in case there is an error */
		errorComponent: element,
		/** Final user-visible error string (opaque). The package does not translate or resolve i18n keys — pass already-resolved text or use errorComponent. */
		message: string
	};

	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
		console.error(error, info);
	}

	render() {
		const { children, errorComponent = <DefaultError />, message } = this.props;

		if (!children) return null;

		if (this.state.hasError) {
			// You can render any custom fallback UI
			return message ? <DefaultError message={message} /> : errorComponent;
		}

		return children;
	}
}
