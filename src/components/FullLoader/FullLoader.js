import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';
import styles from './styles';

const FullLoader = ({
	children,
	backgroundColor = 'transparent',
	spinnerConfig = {},
	effect = {}
}) => {
	const defaultSpinnerConfig = { color: 'blue', duration: 4, size: 115, thickness: 8 };

	return (
		<styles.Container effect={effect} backgroundColor={backgroundColor}>
			<styles.LoaderContainer>
				{children || <Spinner config={{ ...defaultSpinnerConfig, ...spinnerConfig }} />}
			</styles.LoaderContainer>
		</styles.Container>
	);
};

FullLoader.propTypes = {
	/** Contenido del boton */
	children: PropTypes.node,
	/** Configuración del Spinner */
	spinnerConfig: PropTypes.shape({
		duration: PropTypes.number,
		size: PropTypes.number,
		thickness: PropTypes.number,
		color: PropTypes.string
	}),
	/** Color del fondo*/
	backgroundColor: PropTypes.string,
	/** Efecto del fondo del FullLoader */
	effect: PropTypes.shape({})
};

export default FullLoader;
