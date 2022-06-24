import React from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import ErrorBoundary from 'components/ErrorBoundary';
import { getHeight } from './utils';

const HTML = ({ code, height, name, sourceURL, width }) => {
	if (!sourceURL && !code) return null;

	const formattedWidth = `${width}%`;
	const formattedHeight = getHeight(height);

	return sourceURL ? (
		<iframe title={name} src={sourceURL} width={formattedWidth} height={formattedHeight} />
	) : (
		<ErrorBoundary>
			<Frame initialContent={code} width={formattedWidth} height={formattedHeight} er />
		</ErrorBoundary>
	);
};

HTML.defaultProps = {
	width: 100,
	height: 'medium'
};

HTML.propTypes = {
	/** String de código HTML a renderizar */
	code: PropTypes.string,
	/** Altura del frame */
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** Nombre para pasarle al iFrame */
	name: PropTypes.string,
	/** URL a mostrar */
	sourceURL: PropTypes.string,
	/** Ancho del frame */
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default HTML;
