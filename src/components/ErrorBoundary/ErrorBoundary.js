import React from 'react';
import { element, string, arrayOf, oneOfType } from 'prop-types';
import DefaultError from './DefaultError';

export default class ErrorBoundary extends React.Component {
	static propTypes = {
		/** El contenido que se pretende mostrar */
		children: oneOfType([element, arrayOf(element)]),
		/** Contenido custom a mostrar en caso de que haya un error */
		errorContent: element,
		/** Texto o key de traducción para mostrar en un mensaje de error sencillo */
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
