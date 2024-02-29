import React, { useEffect } from 'react';

const ClickAwayListener = ({ nodeRef, onClickAway, className, children }) => {
	let node = undefined;

	useEffect(() => {
		const handleClickAway = (e) => {
			if (node.contains(e.target)) return;
			if (nodeRef && nodeRef.contains(e.target)) return;
			if (onClickAway) onClickAway();
		};

		window.addEventListener('click', handleClickAway, true);

		return () => {
			window.removeEventListener('click', handleClickAway, true);
		};
	});

	return (
		<div ref={(ref) => (node = ref)} className={className}>
			{children}
		</div>
	);
};

export default ClickAwayListener;
