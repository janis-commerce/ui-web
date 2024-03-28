import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

const Skeleton = ({ circle, width, height, count, backgroundColor }) => {
	const currentWidth = !Number.isNaN(Number(width)) ? `${width}px` : width;
	const currentHeight = !Number.isNaN(Number(height)) ? `${height}px` : height;

	const skeletons = Array.from({ length: count }, (_, index) => (
		<styled.SkeletonContainer
			key={index}
			width={currentWidth}
			height={currentHeight}
			circle={circle}
			backgroundColor={backgroundColor}
		/>
	));

	return <>{skeletons}</>;
};

Skeleton.propTypes = {
	/** Si está en true, se redondea el Skeleton */
	circle: PropTypes.bool,
	/** Cantidad de veces que se mostrará el Skeleton por uso */
	count: PropTypes.number,
	/** Alto del Skeleton - Es requerido */
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Ancho del Skeleton - Es requerido */
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** Color de fondo del Skeleton */
	backgroundColor: PropTypes.string
};

Skeleton.defaultProps = {
	circle: false,
	count: 1
};

export default Skeleton;
