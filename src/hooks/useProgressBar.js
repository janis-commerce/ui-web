import { useState, useEffect } from 'react';

const useProgressBar = (value = 0, animated = false, maxValue = 100) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!animated) return setProgress(value);

		const timer = setInterval(() => {
			setProgress((prevValue) => {
				if (prevValue >= maxValue) {
					clearInterval(timer);
					return maxValue;
				}
				return prevValue + 1;
			});
		}, 100);
		return () => clearInterval(timer);
	}, [value, animated]);

	return { progress };
};

export default useProgressBar;
