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

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have
 * elapsed since the last time the debounced function was invoked.
 * @param {function} fn - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {function} The new debounced function.
 */
export function debounce(fn, wait) {
	let timerID;
	function debounced(...params) {
		const context = this;

		clearTimeout(timerID);
		timerID = setTimeout(fn.bind(context), wait, ...params);
	}

	debounced.cancel = function cancel() {
		clearTimeout(timerID);
	};

	return debounced;
}
