import React from 'react';
import { element, string, arrayOf, oneOfType } from 'prop-types';
import DefaultError from './DefaultError';

/** Class boundary: React has no hook equivalent to componentDidCatch / getDerivedStateFromError; a functional wrapper may be evaluated later (JMV-4037). */
export default class ErrorBoundary extends React.Component {
	static propTypes = {
		/** The content to be displayed */
		children: oneOfType([element, arrayOf(element)]),
		/** Custom content to show in case there is an error */
		errorContent: element,
		/** Final user-visible error string (opaque). The package does not translate or resolve i18n keys — pass already-resolved text or use errorContent. */
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
		const { children, errorContent = <DefaultError />, message } = this.props;

		if (!children) return null;

		if (this.state.hasError) {
			// You can render any custom fallback UI
			return message ? <DefaultError message={message} /> : errorContent;
		}

		return children;
	}
}
