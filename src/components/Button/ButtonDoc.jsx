import PropTypes from 'prop-types';
import { Story, Canvas } from '@storybook/addon-docs/blocks';
import { HeaderDoc, SectionDoc } from 'docs';
import { GeneralWrapper } from 'docs/docStyles';
import { getIdParam } from 'utils';

const ButtonDoc = ({ title }) => {
	const id = getIdParam();

	return (
		<GeneralWrapper>
			<HeaderDoc title={title} />
			<SectionDoc title="Component" padding={'1rem'}>
				<h2>{title}</h2>
				<p>
					Small image or icon representing a user within a digital interface. Avatars add a personal
					touch and aid in quick user recognition.
				</p>
			</SectionDoc>
			<SectionDoc title="Copy Me">
				<Canvas>
					<Story id={id} />
				</Canvas>
			</SectionDoc>
			<SectionDoc padding={'1rem'}>
				<h1>Section sin title</h1>
			</SectionDoc>
			<SectionDoc title="Section con title" padding={'1rem'}>
				<p>Section con title</p>
			</SectionDoc>
		</GeneralWrapper>
	);
};
export default ButtonDoc;

ButtonDoc.propTypes = {
	title: PropTypes.string
};