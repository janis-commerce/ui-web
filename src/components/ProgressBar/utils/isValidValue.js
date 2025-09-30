import { isNumber } from 'utils';

export default (value) => !!value && isNumber(value) && value > 0;
