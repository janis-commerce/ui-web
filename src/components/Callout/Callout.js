import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import palette from 'theme/palette';
import styled from './styles';

const ICON_SIZE = 24;
const CLOSE_ICON_SIZE = 16;
const DEFAULT_CLOSE_LABEL = 'Close';

const types = {
	info: { icon: 'info_circle_bold', color: 'blue', background: palette.secondaryBluePressed },
	warning: {
		icon: 'exclamation_triangle_bold',
		color: 'orangePressed',
		background: palette.orangeLight
	},
	error: {
		icon: 'cross_big_circle_bold',
		color: 'statusRedPressed',
		background: palette.redUnavailable
	}
};

const Callout = ({
	type: typeProp,
	children,
	onClose,
	closeLabel = DEFAULT_CLOSE_LABEL,
	className,
	...props
}) => {
	const type = types[typeProp] ? typeProp : 'info';
	const { icon, color, background } = types[type];
	const classNames = ['callout', `callout--${type}`, className].filter(Boolean).join(' ');

	return (
		<styled.Callout role="status" {...props} className={classNames} $background={background}>
			<Icon className="callout__icon" name={icon} color={color} size={ICON_SIZE} />
			<styled.Content className="callout__content">{children}</styled.Content>
			{onClose && (
				<styled.CloseButton
					className="callout__close"
					type="button"
					aria-label={closeLabel}
					onClick={onClose}
				>
					<Icon name="cross_light" color="darkGreyPressed" size={CLOSE_ICON_SIZE} />
				</styled.CloseButton>
			)}
		</styled.Callout>
	);
};

Callout.propTypes = {
	/** Callout type */
	type: PropTypes.oneOf(['info', 'warning', 'error']),
	/** Callout content */
	children: PropTypes.node,
	/** If provided, shows a close button. The consumer decides whether to keep rendering the callout */
	onClose: PropTypes.func,
	/** Accessible label for the close button. Defaults to "Close"; pass it to translate */
	closeLabel: PropTypes.string,
	/** Extra class names, so the callout can be extended with styled-components */
	className: PropTypes.string
};

export default Callout;
