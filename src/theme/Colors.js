import React, { useState } from 'react';
import { storybook as styled } from 'theme/styles';
import palette from 'theme/palette';
import { Color, Input } from 'components';

const colors = Object.entries(palette);

const Colors = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredColors = colors.filter(
		([key, value]) =>
			key.toLowerCase().includes(searchTerm.toLowerCase()) ||
			value.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<Input
				errorMessage="Error"
				hasFloatingLabel={false}
				icon="search"
				onBlur={() => {}}
				onChange={handleSearchChange}
				placeholder="Busca un color..."
			/>
			<styled.Grid>
				{filteredColors.map(([key, value]) => (
					<styled.Item key={key}>
						<span>{key}</span>
						<Color color={value} />
					</styled.Item>
				))}
			</styled.Grid>
		</>
	);
};
export default Colors;
