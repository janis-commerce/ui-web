import React from 'react';
import { storybook as styled } from './styles';
import { mainPallet, viewsPallet } from './palette';
import { getColor } from './utils';

const Colors = () => {
	return (
		<styled.Grid>
			{Object.keys(mainPallet).map((themeKey) => (
				<div key={themeKey}>
					<span>{themeKey}:</span>
					{Object.keys(mainPallet[themeKey]).map((color) => (
						<styled.Item key={color}>
							<div>{color}</div>
							<span
								style={{
									display: 'inline-block',
									width: '50px',
									height: '50px',
									backgroundColor: getColor(`${themeKey}.${color}`),
									borderRadius: '50px',
									border: `1px solid ${viewsPallet.black}`
								}}
							/>
						</styled.Item>
					))}
				</div>
			))}
		</styled.Grid>
	);
};

export default Colors;
