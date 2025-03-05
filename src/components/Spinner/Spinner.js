import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Spinner = ({ config = {}, children }) => {
	const { color = 'blue', duration = 4, size = 115, thickness = 8 } = config;

	return (
		<styles.SpinnerWrapper size={size}>
			<styles.Spinner color={color} duration={duration} size={size} thickness={thickness} />
			{children && <styles.CenterContent>{children}</styles.CenterContent>}
		</styles.SpinnerWrapper>
	);
};

Spinner.propTypes = {
	/** Configuración del Spinner */
	config: PropTypes.shape({
		color: PropTypes.string,
		duration: PropTypes.number,
		size: PropTypes.number,
		thickness: PropTypes.number
	}),
	/** Contenido opcional dentro del Spinner */
	children: PropTypes.node
};

export default Spinner;
