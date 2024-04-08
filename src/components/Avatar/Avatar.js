import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useDevices from 'hooks/useDevices';
import { getImageMeasurements } from 'theme/utils';
import Skeleton from 'components/Skeleton';
import styled from './styles';
import { getInitialsTheme } from './utils';
import InitialsAvatar from './components/InitialsAvatar';

const Avatar = ({ firstname, lastname, mainColor, size, url, rounded }) => {
	const imageRef = useRef();

	const [loading, setLoading] = useState(true);
	const [showInitials, setShowInitials] = useState(false);

	const { onlyDesktop } = useDevices();

	const initials = getInitialsTheme(firstname, lastname) || null;
	const imageSize = getImageMeasurements(size, onlyDesktop);

	const defaultUserImage = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y${
		imageSize && `&s=${imageSize}`
	}`;

	const getInitials = () => {
		try {
			if (!initials) throw new Error('First or lastname not provided');
			return setShowInitials(true);
		} catch {
			imageRef.current.src = defaultUserImage;
		}
	};

	if (showInitials)
		return (
			<InitialsAvatar
				initials={initials}
				mainColor={mainColor}
				imageSize={imageSize}
				rounded={rounded}
			/>
		);

	return (
		<>
			<styled.Image
				ref={imageRef}
				src={url}
				alt={`${firstname} ${lastname}`}
				onError={getInitials}
				onLoad={() => setLoading(false)}
				show={!loading}
				size={imageSize}
				rounded={rounded}
			/>
			{loading && <Skeleton circle={rounded} width={imageSize} height={imageSize} />}
		</>
	);
};

Avatar.propTypes = {
	/** Nombre del usuario */
	firstname: PropTypes.string,
	/** Apellido del usuario */
	lastname: PropTypes.string,
	/** Color de fondo de avatar. Aplica solo cuando se muestran las iniciales de nombre y apellido */
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
