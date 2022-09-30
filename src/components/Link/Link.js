import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

const Link = ({ href, children, target, icon, ...props }) => {
	const renderIcon = () => (icon ? <styled.StyledIcon name={icon} /> : null);

	return (
		<styled.LinkWrapper {...props}>
			{renderIcon()}
			<a href={href} target={target}>
				{children || href}
			</a>
		</styled.LinkWrapper>
	);
};

Link.defaultProps = {
	href: '',
	target: '_self'
};

Link.propTypes = {
	/** La ruta destino del link */
	href: PropTypes.string,
	/** El texto a mostrar */
	children: PropTypes.node,
	/** Atributo target del link */
	target: PropTypes.string,
	/** Nombre del ícono opcional a mostrar */
	icon: PropTypes.string
};

export default Link;
