export const mainPallet = {
	primary: {
		main: '#2979FF',
		hover: '#5393FF',
		pressed: '#1759FF',
		disabled: '#93BBFF'
	},
	alert: {
		main: '#FFCE17',
		hover: '#FFD745',
		pressed: '#FFBA0C',
		dark: '#FFBA0C'
	},
	black: {
		main: '#2F2F2F',
		hover: '#585858',
		pressed: '#16232D',
		dark: '#050505'
	},
	base: {
		white: '#fff',
		black: '#000'
	},
	error: {
		main: '#FF4343',
		hover: '#FF6868',
		pressed: '#FF2A2A',
		dark: '#FF2A2A'
	},
	grey: {
		main: '#D5D7DB',
		hover: '#DDDFE2',
		pressed: '#C4C6CC',
		dark: '#939598',
		darkHover: '#A8AAAC',
		darkPressed: '#747679'
	},
	success: {
		main: '#1DB779',
		hover: '#4AC593',
		pressed: '#109D59',
		dark: '#109D59'
	},
	warning: {
		main: '#FF8D10',
		hover: '#FFA33F',
		pressed: '#FF6E08',
		dark: '#FF6E08'
	},
	white: {
		main: '#E8EAF6',
		hover: '#F4F5FB',
		pressed: '#D0D3E3',
		dark: '#D0D3E3'
	}
};

const { alert, base, black, error, grey, primary, success, warning, white } = mainPallet;

export const viewsPallet = {
	black: black.main,
	blackHover: black.hover,
	blackPressed: black.pressed,
	blue: primary.main,
	blueHover: primary.hover,
	bluePressed: primary.pressed,
	blueDisabled: primary.disabled,
	darkGrey: grey.dark,
	darkGreyHover: grey.darkHover,
	darkGreyPressed: grey.darkPressed,
	fizzGreen: success.main,
	fizzGreenHover: success.hover,
	fizzGreenPressed: success.pressed,
	green: '#74C655',
	greenHover: '#8FD177',
	greenPressed: '#54B039',
	grey: grey.main,
	greyHover: grey.hover,
	greyPressed: grey.pressed,
	lightBlue: '#08C4C4',
	lightBlueHover: '#39CFCF',
	lightBluePressed: '#04ADAD',
	lightGrey: white.main,
	lightGreyHover: white.hover,
	lightGreyPressed: white.pressed,
	orange: warning.main,
	orangeHover: warning.hover,
	orangePressed: warning.pressed,
	red: '#F13B70',
	redHover: '#F3628C',
	redPressed: '#EB2450',
	statusRed: error.main,
	statusRedHover: error.hover,
	statusRedPressed: error.pressed,
	white: base.white,
	yellow: alert.main,
	yellowHover: alert.hover,
	yellowPressed: alert.pressed,
	transparentWhite: 'rgba(256, 256, 256, 0.5)'
};

export default {
	...viewsPallet,
	...mainPallet
};
