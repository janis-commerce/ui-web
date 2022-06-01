import React from 'react';
import PropTypes from 'prop-types';
import { QRCodeSVG } from 'qrcode.react';

const QRCode = ({ value, size }) => {
	if (typeof value !== 'string') return null;

	return <QRCodeSVG value={value} size={size} />;
};

QRCode.propTypes = {
	value: PropTypes.string.isRequired,
	size: PropTypes.number
};

QRCode.defaultProps = {
	size: 100
};

export default QRCode;
