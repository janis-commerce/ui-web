/**
 * Copy string to clipboard
 * @param {string} str
 */
export const copyToClipboard = (value) => {
	const component = document.createElement('textarea');
	component.value = value;
	document.body.appendChild(component);
	component.select();
	document.execCommand('copy');
	document.body.removeChild(component);
};
