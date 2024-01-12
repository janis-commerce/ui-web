import React from 'react';
import PropTypes from 'prop-types';
import styled from './styles';
import Icon from 'components/Icon';

const Link = ({ href, children, target, icon, ...props }) => {
	const renderIcon = () => (icon ? <Icon name={icon} /> : null);

	return (
		<styled.LinkWrapper {...props}>
			<styled.LinkItem href={href} target={target}>
				{renderIcon()}
				{children || href}
			</styled.LinkItem>
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
