import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import palette from 'theme/palette';
import styled from './styles';

const ICON_SIZE = 24;
const CLOSE_ICON_SIZE = 16;

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

const Callout = ({ type: typeProp, children, closable = false, onClose, closeLabel }) => {
	const [visible, setVisible] = useState(true);

	if (!visible) return null;

	const type = types[typeProp] ? typeProp : 'info';
	const { icon, color, background } = types[type];

	const handleClose = () => {
		setVisible(false);
		if (onClose) onClose();
	};

	return (
		<styled.Callout className={`callout callout--${type}`} role="status" $background={background}>
			<Icon className="callout__icon" name={icon} color={color} size={ICON_SIZE} />
			<styled.Content className="callout__content">{children}</styled.Content>
			{closable && (
				<styled.CloseButton
					className="callout__close"
					type="button"
					aria-label={closeLabel}
					onClick={handleClose}
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
	/** If true, shows a close button */
	closable: PropTypes.bool,
	/** Function called on close */
	onClose: PropTypes.func,
	/** Accessible label for the close button, already translated by the consumer */
	closeLabel: PropTypes.string
};

export default Callout;
