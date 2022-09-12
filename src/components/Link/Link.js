import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';
import styled from './styles';

const Link = ({ href, children, target, icon, ...props }) => {
	const { origin } = window.location;

	const internalLink = !href.startsWith('http');

	const renderIcon = () => (icon ? <styled.StyledIcon name={icon} /> : null);

	if ((internalLink || href.includes(`${origin}`)) && target === '_self') {
		let path;

		if (internalLink) {
			path = href.startsWith('/') ? href : `/${href}`;
		} else {
			path = href.replace(`${origin}`, '');
		}

		return (
			<styled.LinkWrapper {...props}>
				{renderIcon()}
				<ReactLink to={path} data-test="react-router-link">
					{children || href}
				</ReactLink>
			</styled.LinkWrapper>
		);
	}
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
