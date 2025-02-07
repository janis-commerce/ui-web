/**
 * finds the selected position of a marker into the selected rows
 * @param {array} selectedRows - the selected rows
 * @param {array} marker - a marker data object
 * @return {number | null} the index number if found, otherwise null
 */
export default (selectedRows = [], marker = {}) => {
	const { id, shippingId, type } = marker;
	const index = selectedRows.indexOf(type === 'warehouse' ? id : shippingId);
	return index !== -1 ? index + 1 : null;
};
