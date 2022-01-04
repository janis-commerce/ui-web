import PropTypes from 'prop-types';
import icons from 'components/Icon/icons.json';

export const iconName = PropTypes.oneOfType([PropTypes.oneOf(Object.keys(icons)), PropTypes.bool]);

export const styles = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func]))
]);

export const itemsCheckListPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string,
		translateLabel: PropTypes.bool,
		value: PropTypes.number
	})
);
export const groupsCheckListPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string,
		translateLabel: PropTypes.bool,
		items: itemsCheckListPropTypes
	})
);
export const sectionsCheckListPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string,
		translateLabel: PropTypes.bool,
		groups: groupsCheckListPropTypes
	})
);

export const ErrorDataResponse = PropTypes.shape({
	status: PropTypes.number
});

export const mapperPropTypes = PropTypes.oneOfType([
	PropTypes.array,
	PropTypes.string,
	PropTypes.shape({})
]);
