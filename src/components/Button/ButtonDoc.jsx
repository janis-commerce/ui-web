import PropTypes from 'prop-types';
import { SectionDoc } from 'docs';
import { GridWrapper, VariantWrapper } from 'docs/docStyles';
import Button from './Button';
import { extractVariantButton } from 'utils';

const ButtonDoc = () => {
	const variant = extractVariantButton();

	const buttonStories = [
		{ index: 1, variant, icon: 'warehouse', color: 'blue' },
		{
			index: 2,
			variant,
			icon: 'cross_bold',
			color: 'statusRed',
			children: 'Click'
		},
		{
			index: 3,
			variant,
			icon: 'check_bold',
			color: 'fizzGreen'
		},
		{
			index: 4,
			variant,
			icon: 'box',
			color: 'statusRed'
		}
	];

	return (
		<>
			<SectionDoc title="Variants">
				<VariantWrapper>
					<div className="type">
						<p>Icon - Color</p>
					</div>
					<GridWrapper columnQuantity={2}>
						{buttonStories.map(({ variant, icon, color, children, index }) => (
							<div key={index} className="stories">
								<p>
									<b>Icon:</b> {icon}
									<br />
									<b>Color:</b> {color}
								</p>
								<Button variant={variant} icon={icon} color={color} children={children} />
							</div>
						))}
					</GridWrapper>
				</VariantWrapper>
			</SectionDoc>
		</>
	);
};
export default ButtonDoc;

ButtonDoc.propTypes = {
	title: PropTypes.string
};
