import icons from 'components/Icon/icons.json';
/* Library used for transform svg paths: https://github.com/fontello/svgpath */
import svgpath from 'svgpath';
import colors from 'theme/palette';

const encodeColor = (color) => {
	const parsedColor = /#/.test(color) ? color : `#${color}`;
	return encodeURIComponent(parsedColor);
};

const iconColorTheme = (color) => {
	const colorInTheme = colors[color] || color;
	const encodedColor = encodeColor(colorInTheme);
	return encodedColor;
};

export const getDefaultSvgTemplate = (color, label) => {
	const encodedColor = encodeColor(color);
	const isLabel = label.text ? label.text : '';
	const template = `data:image/svg+xml;utf-8, \
		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(%23filter0_d_491_165663)">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
			</g>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="${encodedColor}"/>
			<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >${isLabel}</text>
			<defs>
				<filter id="filter0_d_491_165663" x="0" y="0" width="44" height="51" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset dy="6"/>
					<feGaussianBlur stdDeviation="5"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0.152941 0 0 0 0 0.223529 0 0 0 0 0.278431 0 0 0 0.393597 0"/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_491_165663"/>
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_491_165663" result="shape"/>
				</filter>
			</defs>
		</svg>`;

	return template;
};

const getIconSvgTemplate = (color, icon, size, iconColor, index = null) => {
	const { path = '' } = icons[icon];
	const encodedColor = encodeColor(color);
	const encodedColorIcon = iconColor && iconColorTheme(iconColor);
	const validColorIcon = encodedColorIcon || encodeColor(colors.white);
	const iconSize = +size || 32;
	const pathScale = iconSize / 1024; // resize original icon path
	const transformedPath = svgpath(path).scale(pathScale).toString();

	const mainSizeWidth = iconSize + 20;
	const mainSizeHeight = iconSize + 36;
	const separation = 8;
	const padding = 2;

	const template = `data:image/svg+xml;utf-8, \
		<svg width="${mainSizeWidth + 24 + padding * 2}"
			height="${mainSizeHeight + 6 + separation + padding * 2}"
			viewBox="0 0 ${mainSizeWidth + 12 + padding * 2} ${mainSizeHeight + 10 + separation + padding * 2}"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<style>
				.iconPath {
					transform: translate(${5 + padding / 2}px, ${5 + padding / 2}px);
				}
				.text {
					font-family: 'Roboto', sans-serif;
					font-size: 12px;
					font-weight: 700;
					fill: white;
					line-height: 14px;
				}
			</style>
			${
				index
					? `
						<rect
							x="${mainSizeWidth / 2 - 12 + padding}"
							y="${mainSizeHeight - 16 + separation + padding}"
							width="24"
							height="24"
							rx="12"
							fill="${encodedColorIcon || encodedColor}"
						/>
						<text x="${mainSizeWidth / 2 + padding}" y="${
							mainSizeHeight - 3 + separation + padding
					  }" text-anchor="middle" dominant-baseline="middle" class="text">${index}</text>
					`
					: `<rect
							x="${mainSizeWidth / 2 - 6 + padding}"
							y="${mainSizeHeight - 12 + separation + padding}"
							width="12"
							height="12"
							rx="6"
							fill="white"
						/>
						<rect
							x="${mainSizeWidth / 2 - 3 + padding}"
							y="${mainSizeHeight - 9 + separation + padding}"
							width="6" height="6" rx="3"
							fill="${encodedColorIcon || encodedColor}"
						/>`
			}
			<g filter="url(%23filter0_d_1140_220191)">
				<circle
					cx="${mainSizeWidth / 2 + padding}"
					cy="${mainSizeWidth / 2 + padding}"
					r="${mainSizeWidth / 2}"
					fill="none"
					stroke="${validColorIcon}"
					stroke-width="2" 
				/>
				<rect
					x="${padding}"
					y="${padding}"
					width="${mainSizeWidth}"
					height="${mainSizeWidth}"
					rx="${mainSizeWidth / 2}"
					fill="${encodedColor}"
				/>
			</g>
			<g class='iconPath'>
				<path fill-rule="evenodd" clip-rule="evenodd" d="${transformedPath}" fill="${validColorIcon}" class="iconPath"/>	
			</g>
			<defs>
				<filter
					id="filter0_d_1140_220191"
					x="${padding - 8}"
					y="${padding - 8}"
					width="${mainSizeWidth + 12 + padding * 2}"
					height="${mainSizeWidth + 24 + separation + padding * 2}"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset dy="4"/>
					<feGaussianBlur stdDeviation="3"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
				</filter>
			</defs>
		</svg>`;

	return template;
};

export const getSvgUrl = ({ color, icon, size, label, iconColor }, index) =>
	icons[icon]
		? getIconSvgTemplate(color, icon, size, iconColor, index)
		: getDefaultSvgTemplate(color, label);
