import React from 'react';
import { storybook as styled } from 'theme/styles';
import viewsPallet from 'theme/palette';
import { Color } from 'components';

const colors = Object.entries(viewsPallet);

const Colors = () => (
	<styled.Grid>
		{colors.map(([key, value]) => (
			<styled.Item key={key}>
				<span>{key}</span>
				<Color color={value} />
			</styled.Item>
		))}
	</styled.Grid>
);

export default Colors;
