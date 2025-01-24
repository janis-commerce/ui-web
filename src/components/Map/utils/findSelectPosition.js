export const findSelectedPosition = (selectedRows, marker) => {
	const { id, shippingId, type } = marker;
	const index = selectedRows.indexOf(type === 'warehouse' ? id : shippingId);
	return index !== -1 ? index + 1 : null;
};
