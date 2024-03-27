import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useDevices from 'hooks/useDevices';
import { getImageMeasurements } from 'theme/utils';
import Skeleton from 'components/Skeleton';
import styled from './styles';
import { getInitialsTheme, getUserColor } from './utils';

const Avatar = ({ firstname, lastname, mainColor, size, url, rounded }) => {
	const [loading, setLoading] = useState(true);

	const [image, setImage] = useState(url);
	const [initialsData, setInitialsData] = useState();

	const { onlyDesktop } = useDevices();

	const initials = getInitialsTheme(firstname, lastname) || null;
	const imageSize = getImageMeasurements(size, onlyDesktop);

	const defaultUserImage = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y${
		imageSize && `&s=${imageSize}`
	}`;

	const getInitials = () => (initials ? setInitialsData(initials) : setImage(defaultUserImage));

	return !initialsData ? (
		<>
			<styled.Image
				src={url || image}
				alt={`${firstname} ${lastname}`}
				onError={getInitials}
				onLoad={() => setLoading(false)}
				show={!loading}
				size={imageSize}
				rounded={rounded}
			/>
			{loading && <Skeleton circle={rounded} width={imageSize} height={imageSize} />}
		</>
	) : (
		<styled.Initials color={mainColor || getUserColor(initials)} size={imageSize} rounded={rounded}>
			{initialsData}
		</styled.Initials>
	);
};

Avatar.propTypes = {
	/** Nombre del usuario */
	firstname: PropTypes.string,
	/** Apellido del usuario */
	lastname: PropTypes.string,
	/** Color del fondo para el Avatar de texto */
	mainColor: PropTypes.string,
	/** Medida de alto y ancho para la imagen en pixeles */
	size: PropTypes.oneOfType([
		PropTypes.oneOf(['small', 'medium', 'large', 'extralarge', 'auto']),
		PropTypes.number
	]),
	/** Si esta activa redondea el Avatar */
	rounded: PropTypes.bool,
	/** URL de donde  se carga la imagen del Avatar */
	url: PropTypes.string
};

Avatar.defaultProps = {
	firstname: '',
	lastname: '',
	size: 'small',
	url: '',
	rounded: true
};

export default Avatar;
