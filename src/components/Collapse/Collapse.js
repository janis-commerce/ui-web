import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCollapse } from 'react-collapsed';
import { isFunction } from 'utils';
import styled from './styles';
import { AVAILABLE_ICONS, DEFAULT_TOGGLE_ICON } from './constants';

const getIcon = (iconName) => (AVAILABLE_ICONS.includes(iconName) ? iconName : null);

const Collapse = ({
	disabled = false,
	isDefaultOpen = false,
	renderHeader,
	renderContent,
	toggleIcon = {},
	contentBorder = true,
	expandStartHandler = () => {},
	expandingHandler = () => {},
	expandEndHandler = () => {},
	collapseStartHandler = () => {},
	collapsingHandler = () => {},
	collapseEndHandler = () => {}
}) => {
	const [isOpen, setIsOpen] = useState(isDefaultOpen);

	const triggerHandler = (state) => {
		const collapseState = {
			expandStart: expandStartHandler,
			expanding: expandingHandler,
			expandEnd: expandEndHandler,
			collapseStart: collapseStartHandler,
			collapsing: collapsingHandler,
			collapseEnd: collapseEndHandler
		};
		return collapseState[state]?.();
	};

	const { getCollapseProps, getToggleProps } = useCollapse({
		isExpanded: isOpen,
		onTransitionStateChange: (state) => !disabled && triggerHandler(state)
	});

	const { iconNames = {}, color = '', position = '' } = { ...DEFAULT_TOGGLE_ICON, ...toggleIcon };

	const handleClick = () => setIsOpen((prevOpenState) => !prevOpenState);

	const togglePropsParams = {
		...(!disabled && { onClick: handleClick })
	};

	const buttonProps = {
		className: 'collapse__collapseButton',
		icon: isOpen
			? getIcon(iconNames?.opened) || 'minus_big_light'
			: getIcon(iconNames?.closed) || 'plus_big_light',
		iconColor: color,
		disabled
	};

	if (!renderHeader || !isFunction(renderHeader) || !renderContent || !isFunction(renderContent))
		return null;

	return (
		<styled.Wrapper className="collapse" isOpen={isOpen}>
			<styled.HeaderWrapper
				className="collapse__header"
				{...getToggleProps(togglePropsParams)}
				isOpen={isOpen}
				position={position}
			>
				<styled.CollapseButton {...buttonProps} />
				{renderHeader()}
			</styled.HeaderWrapper>
			<div {...getCollapseProps()}>
				<styled.ContentWrapper className="collapse__content" contentBorder={contentBorder}>
					{renderContent()}
				</styled.ContentWrapper>
			</div>
		</styled.Wrapper>
	);
};

Collapse.propTypes = {
	/** Indica si el colapsable esta desabilitado o no */
	disabled: PropTypes.bool,
	/** Establece el estado inicial (abierto/cerrado) del colapsable al montarse */
	isDefaultOpen: PropTypes.bool,
	/** Funcion que se ejecuta para renderizar el encabezado del colapsable */
	renderHeader: PropTypes.func,
	/** Funcion que se ejecuta para renderizar el contenido del colapsable */
	renderContent: PropTypes.func,
	/** Configuración del icono del colapsable */
	toggleIcon: PropTypes.shape({
		iconNames: PropTypes.shape({
			opened: PropTypes.string,
			closed: PropTypes.string
		}),
		color: PropTypes.string,
		position: PropTypes.string
	}),
	/** Borde para el contenido del colapsable */
	contentBorder: PropTypes.bool,
	/** Funcion que se ejecuta cuando inicia la animacion de expandir */
	expandStartHandler: PropTypes.func,
	/** Funcion que se ejecuta cuando el colapsable se esta abriendo */
	expandingHandler: PropTypes.func,
	/** Funcion que se ejecuta cuando termina la animacion de expandir */
	expandEndHandler: PropTypes.func,
	/** Funcion que se ejecuta cuando inicia la animacion de colapsar */
	collapseStartHandler: PropTypes.func,
	/** Funcion que se ejecuta cuando el colapsable se esta cerrando */
	collapsingHandler: PropTypes.func,
	/** Funcion que se ejecuta cuando termina la animacion de colapsar */
	collapseEndHandler: PropTypes.func
};

export default Collapse;
