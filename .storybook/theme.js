import { create } from '@storybook/theming';
import brandImage from '../src/images/janis-logo.png';

export default create({
	base: 'light',
	brandTitle: 'Janis UI Web',
	brandUrl: 'https://janis.im',
	brandTarget: 'https://janis.im',
	fontBase: '"Roboto", sans-serif',
	fontCode: 'Roboto',
	brandImage
});
