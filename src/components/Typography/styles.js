import styled from 'styled-components';
import { getTypographyStyles } from './utils';

const Text = styled.span`
	${({ type, size, color }) => getTypographyStyles(type, size, color)}
	${({ styles }) => styles};
`;

export default {
	Text
};
