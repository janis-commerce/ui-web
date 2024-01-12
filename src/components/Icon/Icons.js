import React from 'react';
import PropTypes from 'prop-types';
import { docz as styled } from './styles';
import icons from './icons.json';
import { copyToClipboard } from 'utils';
import Icon from './Icon';
import { validColors } from 'components/Button/utils';

const Icons = ({ color }) => {
	const names = Object.keys(icons);

	return (
		<styled.Grid style={{ width: '100%' }}>
			{names.map((name) => (
				<styled.Item key={name} onClick={() => copyToClipboard(name)}>
					<div>{name}</div>
					<Icon name={name} color={color} />
				</styled.Item>
			))}
		</styled.Grid>
	);
};

Icons.propTypes = {
	/** Color para cambiar el color de los iconos de la lista */
	color: PropTypes.oneOf(validColors)
};

Icons.defaultProps = {
	color: 'black'
};

export default Icons;
