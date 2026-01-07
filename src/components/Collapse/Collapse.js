import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useCollapse } from 'react-collapsed';
import { isFunction } from 'utils';
import styled from './styles';
import { AVAILABLE_ICONS, DEFAULT_TOGGLE_ICON } from './constants';

const getIcon = (iconName) => (AVAILABLE_ICONS.includes(iconName) ? iconName : null);

const Collapse = ({
	disabled = false,
	isOpen = false,
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
	const collapseRef = useRef(null);
	const [isOpenState, setIsOpenState] = useState(isOpen);

	const collapseState = useMemo(
		() => ({
			expandStart: () => {
				collapseRef.current?.setAttribute('data-is-opened', true);
				expandStartHandler();
			},
			expanding: expandingHandler,
			expandEnd: expandEndHandler,
			collapseStart: collapseStartHandler,
			collapsing: collapsingHandler,
			collapseEnd: () => {
				collapseEndHandler();
				collapseRef.current?.setAttribute('data-is-opened', false);
			}
		}),
		[
			expandStartHandler,
			expandingHandler,
			expandEndHandler,
			collapseStartHandler,
			collapsingHandler,
			collapseEndHandler
		]
	);

	const triggerHandler = (state) => collapseState[state]?.();

	const { getCollapseProps, getToggleProps } = useCollapse({
		isExpanded: isOpenState,
		onTransitionStateChange: (state) => !disabled && triggerHandler(state)
	});

	const { iconNames = {}, color = '', position = '' } = { ...DEFAULT_TOGGLE_ICON, ...toggleIcon };

	const handleClick = useCallback(() => setIsOpenState((prevOpenState) => !prevOpenState), []);

	const togglePropsParams = {
		...(!disabled && { onClick: handleClick })
	};

	const buttonProps = {
		className: 'collapse__collapseButton',
		icon: isOpenState
			? getIcon(iconNames?.opened) || 'minus_big_light'
			: getIcon(iconNames?.closed) || 'plus_big_light',
		iconColor: color,
		disabled
	};

	useEffect(() => {
		collapseRef.current?.setAttribute('data-is-opened', isOpen);
		setIsOpenState(isOpen);
	}, [isOpen]);

	if (!renderHeader || !isFunction(renderHeader) || !renderContent || !isFunction(renderContent))
		return null;

	return (
		<styled.Wrapper className="collapse" ref={collapseRef}>
			<styled.HeaderWrapper
				className="collapse__header"
				{...getToggleProps(togglePropsParams)}
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
	/** Controla el estado (abierto/cerrado) del colapsable */
	isOpen: PropTypes.bool,
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

export default React.memo(Collapse);
