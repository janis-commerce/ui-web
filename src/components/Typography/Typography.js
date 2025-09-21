import React from 'react';
import PropTypes from 'prop-types';
import { TYPOGRAPHY } from './utils';
import styled from './styles';

const Typography = ({
	children,
	type = 'body',
	size = 'small',
	color = 'black',
	styles,
	...props
}) => {
	if (!children) return null;

	const availableSizes = Object.keys(TYPOGRAPHY[type]);
	const selectedSize = availableSizes.includes(size) ? size : null;

	if (!selectedSize) return null;

	// TODO: replace this component with Text component
	return (
		<styled.Text type={type} size={selectedSize} color={color} styles={styles} {...props}>
			{children}
		</styled.Text>
	);
};

Typography.propTypes = {
	children: PropTypes.node,
	type: PropTypes.string,
	size: PropTypes.string,
	color: PropTypes.string,
	styles: PropTypes.object
};

export default Typography;
