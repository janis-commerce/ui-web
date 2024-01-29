import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { docz as styled } from './styles';
import icons from './icons.json';
import { copyToClipboard } from 'utils';
import Icon from './Icon';
import { validColors } from 'components/Button/utils';

const Icons = ({ color }) => {
	const [iconName, setIconName] = useState('');
	const names = Object.keys(icons);

	const filteredNames = names.filter((name) => name.toLowerCase().includes(iconName.toLowerCase()));

	return (
		<div>
			<styled.SearchInput
				type="text"
				placeholder="Buscar por nombre..."
				value={iconName}
				onChange={(e) => setIconName(e.target.value)}
			/>
			<styled.Grid style={{ width: '100%' }}>
				{filteredNames.map((name) => (
					<styled.Item key={name} onClick={() => copyToClipboard(name)}>
						<div>{name}</div>
						<Icon name={name} color={color} />
					</styled.Item>
				))}
			</styled.Grid>
		</div>
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
