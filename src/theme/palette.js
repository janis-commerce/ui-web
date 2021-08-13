const mainPallet = {
	primary: {
		main: '#2979FF',
		hover: '#5393FF',
		pressed: '#1759FF',
		disabled: '#93BBFF'
	},
	alert: {
		main: '#FFCE17',
		hover: '#FFD745',
		dark: '#FFBA0C'
	},
	black: {
		main: '#2F2F2F',
		dark: '#050505',
		hover: '#585858',
		pressed: '#16232D'
	},
	base: {
		white: '#fff',
		black: '#000'
	},
	error: {
		main: '#FF4343',
		dark: '#FF2A2A',
		hover: '#FF6868'
	},
	grey: {
		main: '#D5D7DB',
		hover: '#DDDFE2',
		pressed: '#C4C6CC',
		darkHover: '#A8AAAC',
		dark: '#939598',
		darkPressed: '#747679'
	},
	success: {
		main: '#1DB779',
		dark: '#109D59',
		hover: '#4AC593'
	},
	warning: {
		main: '#FF8D10',
		dark: '#FF6E08',
		hover: '#FFA33F'
	},
	white: {
		main: '#E8EAF6',
		dark: '#D0D3E3',
		hover: '#F4F5FB'
	}
};

const { alert, base, black, error, grey, primary, success, warning, white } = mainPallet;

const viewsPallet = {
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
	fizzGreenPressed: success.dark,
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
	lightGreyPressed: white.dark,
	orange: warning.main,
	orangeHover: warning.hover,
	orangePressed: warning.dark,
	red: '#F13B70',
	redHover: '#F3628C',
	redPressed: '#EB2450',
	statusRed: error.main,
	statusRedHover: error.hover,
	statusRedPressed: error.dark,
	white: base.white,
	yellow: alert.main,
	yellowHover: alert.hover,
	yellowPressed: alert.dark,
	transparentWhite: 'rgba(256, 256, 256, 0.5)'
};

export default {
	...viewsPallet,
	...mainPallet
};
