import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import palette from 'theme/palette';
import styled from './styles';

const Image = ({ url, width, height, altText, roundBorders, background }) => {
	const emptyUrlIcon = !url && 'exclamation_circle';
	const [errorImage, setErrorImage] = useState(emptyUrlIcon);

	return errorImage ? (
		<styled.ImageWrapper background={background} width={width || height} height={height || width}>
			<Icon
				name={errorImage}
				size={(width || height) * 0.35 || 20}
				color={palette.lightGreyPressed}
			/>
		</styled.ImageWrapper>
	) : (
		<styled.Image
			src={url}
			alt={altText || url}
			width={width}
			height={height}
			roundBorders={roundBorders}
			onError={() => setErrorImage('img')}
		/>
	);
};

Image.propTypes = {
	/** Url de la imagen. Si no se puede mostrar se renderiza una imagen default. */
	url: PropTypes.string,
	/** Ancho (en px) del contenedor de la imagen. Si no se define, será el ancho de la imagen. */
	width: PropTypes.number,
	/** Alto (en px) del contenedor de la imagen. Si no se define, será igual al ancho. */
	height: PropTypes.number,
	/** Texto alternativo. */
	altText: PropTypes.string,
	/** Define si la imagen es un círculo o tiene bordes redondeados. Los valores se pasan a px. */
	roundBorders: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	/** Color de fondo para la imagen default. */
	background: PropTypes.string
};

Image.defaultProps = {
	background: palette.lightGreyHover
};

export default Image;
