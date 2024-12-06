import React from 'react';
import PropTypes from 'prop-types';
import { QRCodeSVG } from 'qrcode.react';

const QRCode = ({ value, size }) => {
	if (typeof value !== 'string') return null;

	return <QRCodeSVG value={value} size={size} />;
};

QRCode.propTypes = {
	/** Url hacia donde dirige el QR */
	value: PropTypes.string.isRequired,
	/** Permite modificar el tamaño del componente */
	size: PropTypes.number
};

QRCode.defaultProps = {
	size: 100
};

export default QRCode;
