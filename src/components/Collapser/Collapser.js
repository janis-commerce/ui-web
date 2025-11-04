import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCollapse } from 'react-collapsed';
import { isFunction } from 'utils';
import styled from './styles';

const AVAILABLE_ICONS = ['minus_big_light', 'plus_big_light', 'arrow_down_flat', 'arrow_up_flat'];

const getIcon = (iconName) => AVAILABLE_ICONS.includes(iconName) && iconName;

const Collapser = ({
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
	const [isClicked, setIsClicked] = useState(false);

	const triggerHandler = (state) => {
		const collapserState = {
			expandStart: expandStartHandler,
			expanding: expandingHandler,
			expandEnd: expandEndHandler,
			collapseStart: collapseStartHandler,
			collapsing: collapsingHandler,
			collapseEnd: collapseEndHandler
		};
		return collapserState[state]?.();
	};

	const { getCollapseProps = () => {}, getToggleProps = () => {} } = useCollapse({
		isExpanded: isOpen,
		onTransitionStateChange: (state) => isClicked && triggerHandler(state)
	});

	useEffect(() => {
		setIsOpen(isDefaultOpen);
		setIsClicked(false);
	}, [isDefaultOpen]);

	const handleClick = () => {
		if (disabled) return;
		setIsOpen((oldOpen) => !oldOpen);
		setIsClicked(true);
	};

	const {
		iconNames = { opened: 'minus_big_light', closed: 'plus_big_light' },
		color = 'blue',
		position = 'left'
	} = toggleIcon || {};

	const buttonProps = {
		className: 'collapser__collapseButton',
		icon: isOpen
			? getIcon(iconNames?.opened) || 'minus_big_light'
			: getIcon(iconNames?.closed) || 'plus_big_light',
		iconColor: color
	};

	if (!renderHeader || !isFunction(renderHeader) || !renderContent || !isFunction(renderContent))
		return null;

	return (
		<styled.Wrapper className="collapser" isOpen={isOpen}>
			<styled.HeaderWrapper
				className="collapser__header"
				{...getToggleProps({ onClick: handleClick })}
				isOpen={isOpen}
				position={position}
			>
				<styled.CollapseButton {...buttonProps} />
				{renderHeader && renderHeader()}
			</styled.HeaderWrapper>
			<div {...getCollapseProps()}>
				<styled.ContentWrapper className="collapser__content" contentBorder={contentBorder}>
					{renderContent && renderContent()}
				</styled.ContentWrapper>
			</div>
		</styled.Wrapper>
	);
};

Collapser.propTypes = {
	/** Indica si un collapser esta desabilitado o no */
	disabled: PropTypes.bool,
	/** Fuerza la apertura o cierre por defecto (o desde fuera del componente) del Collapser */
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

export default Collapser;
