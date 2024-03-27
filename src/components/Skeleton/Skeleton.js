import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

const Skeleton = ({ circle, width, height }) => (
	<styled.SkeletonContainer width={width} height={height} circle={circle} />
);

Skeleton.propTypes = {
	/** Si está en true, se redondea el Skeleton */
	circle: PropTypes.bool,
	/** Ancho del Skeleton - Es requerido */
	width: PropTypes.string.isRequired,
	/** Alto del Skeleton - Es requerido */
	height: PropTypes.string.isRequired
};

Skeleton.defaultProps = {
	circle: false
};

export default Skeleton;
