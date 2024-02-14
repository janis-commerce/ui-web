import React from 'react';
import Color from 'components/Color';
import viewsPallet from 'theme/palette';
import { storybook as styled } from 'theme/styles';

export default {
	title: 'Theme/Colors',
	component: Color,
	parameters: {
		layout: 'centered'
	}
};
const colors = Object.values(viewsPallet);

const Template = () => (
	<styled.Grid>
		{colors.map((data) => (
			<styled.Item key={data}>
				<span>{data}:</span>
				<Color color={data} />
			</styled.Item>
		))}
	</styled.Grid>
);

export const Base = Template.bind({});
