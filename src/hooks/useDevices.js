import { useState, useEffect } from 'react';
import { debounce } from 'utils';
import { breakpoints } from 'devices';

/** Checks the current view width against different device size settings.
 * Import it when needed, and get the most appropiate condition.
 * (In this project, tabletLg equals the "onlyMobile" condition.)
 * @returns {object} an object with the current width value and boolean values for each device.
 */

const useDevices = () => {
	const getWindowWidth = () => window.innerWidth;
	const checkDeviceMax = (device) => getWindowWidth() < breakpoints.values[device];
	const checkDeviceMin = (device) => getWindowWidth() >= breakpoints.values[device];

	const initialWidth = getWindowWidth();
	const initialMobile = checkDeviceMax('sm');
	const initialTablet = checkDeviceMax('md');
	const initialTabletLg = checkDeviceMax('lg');
	const initialOnlyDesktop = checkDeviceMin('lg');
	const initialDesktopSm = checkDeviceMax('xl');
	const initialDesktopLg = checkDeviceMin('xl');

	const [width, setWidth] = useState(initialWidth);
	const [mobile, setMobile] = useState(initialMobile);
	const [tablet, setTablet] = useState(initialTablet);
	const [tabletLg, setTabletLg] = useState(initialTabletLg);
	const [onlyDesktop, setOnlyDesktop] = useState(initialOnlyDesktop);
	const [desktopSm, setDesktopSm] = useState(initialDesktopSm);
	const [desktopLg, setDesktopLg] = useState(initialDesktopLg);

	const handleChanges = debounce(() => {
		const windowWidth = getWindowWidth();
		const isMobile = checkDeviceMax('sm');
		const isTablet = checkDeviceMax('md');
		const isTabletLg = checkDeviceMax('lg');
		const isOnlyDesktop = checkDeviceMin('lg');
		const isDesktopSm = checkDeviceMax('xl');
		const isDesktopLg = checkDeviceMin('xl');

		setWidth(windowWidth);
		setMobile(isMobile);
		setTablet(isTablet);
		setTabletLg(isTabletLg);
		setOnlyDesktop(isOnlyDesktop);
		setDesktopSm(isDesktopSm);
		setDesktopLg(isDesktopLg);
	}, 100);

	useEffect(() => {
		window.addEventListener('resize', handleChanges);

		return () => window.removeEventListener('resize', handleChanges);
	});

	return {
		width,
		mobile,
		tablet,
		tabletLg,
		onlyDesktop,
		desktopSm,
		desktopLg
	};
};

export default useDevices;
