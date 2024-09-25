import React from 'react';
import { GeneralWrapper } from './docStyles';
import { SectionDoc } from './SectionDoc';
import { getIdParam } from 'utils';
import { Story, Canvas, ArgsTable } from '@storybook/addon-docs';
import { HeaderDoc } from './HeaderDoc';
import PropTypes from 'prop-types';

export const DocComponent = ({ title, description, children, argsTableOf }) => {
	const id = getIdParam();
	return (
		<GeneralWrapper>
			<HeaderDoc title={title} />
			<SectionDoc title="Componente" padding="1rem">
				<p>{description}</p>
			</SectionDoc>

			<SectionDoc>
				<Canvas>
					<Story id={id} />
				</Canvas>
			</SectionDoc>

			<SectionDoc title="Parámetros">
				<ArgsTable of={argsTableOf} />
			</SectionDoc>

			{children}
		</GeneralWrapper>
	);
};

DocComponent.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	argsTableOf: PropTypes.func.isRequired
};
