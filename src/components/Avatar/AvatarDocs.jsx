import { SectionDoc } from 'docs';
import { GridWrapper, VariantWrapper } from 'docs/docStyles';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const avatarStories = [
	{ size: 'small', description: 'Small', type: 'Initials' },
	{
		size: 'medium',
		description: 'Medium',
		type: 'Picture',
		url: 'https://media.admagazine.com/photos/637d11a6e63c8afac40e7a01/1:1/w_2896,h_2896,c_limit/1442809583'
	},
	{
		size: 'large',
		description: 'Large',
		type: 'Logo',
		url: 'https://cdn.id.janis.in/client-images/5ec2d43b70cd6700077c3aa1/0cdc0141-1f76-465a-8a06-8512b289eb85.png'
	},
	{
		size: 'extralarge',
		description: 'Extra Large'
	}
];

const AvatarDocs = () => {
	return (
		<>
			<SectionDoc title="Variants">
				<VariantWrapper>
					<div className="type">
						<p>Size</p>
					</div>
					<GridWrapper>
						{avatarStories.map((storySize) => (
							<div key={storySize.size} className="stories">
								<p>{storySize.description}</p>
								<Avatar size={storySize.size} />
							</div>
						))}
					</GridWrapper>
				</VariantWrapper>
			</SectionDoc>

			<SectionDoc>
				<VariantWrapper>
					<div className="type">
						<p>Type</p>
					</div>

					<GridWrapper columnQuantity={3}>
						{avatarStories.map(({ size, type, url }) =>
							type ? (
								<div key={size} className="stories">
									<p>{type}</p>
									<Avatar size={'large'} firstname={'Lionel'} url={url ? url : ''} />
								</div>
							) : null
						)}
					</GridWrapper>
				</VariantWrapper>
			</SectionDoc>
		</>
	);
};
export default AvatarDocs;

AvatarDocs.propTypes = {
	title: PropTypes.string.isRequired
};