import React from 'react';
import Map from './Map';

const center = {
	lat: -34.5681233,
	lng: -58.4373331
};

const containerStyle = { width: '400px', height: '400px' };

/** Mock to reproduce shipping step case */
// const markersMockShippingStep = [
// 	{
// 		drawRoute: false,
// 		points: [
// 			{
// 				position: { lng: -58.41081198528481, lat: -34.588339493121886 },
// 				icon: {
// 					url: `data:image/svg+xml;utf-8, 		<svg width="72"
// 			height="78"
// 			viewBox="0 0 60 82"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<style>
// 				.iconPath {
// 					transform: translate(6px, 6px);
// 				}
// 				.text {
// 					font-family: 'Roboto', sans-serif;
// 					font-size: 12px;
// 					font-weight: 700;
// 					fill: white;
// 					line-height: 14px;
// 				}
// 			</style>
// 			<rect
// 							x="18"
// 							y="58"
// 							width="12"
// 							height="12"
// 							rx="6"
// 							fill="white"
// 						/>
// 						<rect
// 							x="21"
// 							y="61"
// 							width="6" height="6" rx="3"
// 							fill="%23A06CEC"
// 						/>

// 			<g filter="url(%23filter0_d_1140_220191)">
// 				<circle
// 					cx="24"
// 					cy="24"
// 					r="22"
// 					fill="none"
// 					stroke="%23FFF"
// 					stroke-width="2"
// 				/>
// 				<rect
// 					x="2"
// 					y="2"
// 					width="44"
// 					height="44"
// 					rx="22"
// 					fill="%23A06CEC"
// 				/>
// 			</g>
// 			<g class='iconPath'>
// 				<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0000078125 21h-1.9999921875v-9.4999921875c0-0.27614062500000003-0.2238515625-0.49999218749999996-0.49999218749999996-0.49999218749999996v0h-9c-0.0008906249999999999 0-0.0019453125 0-0.003 0-0.1348359375 0-0.257203125 0.0533671875-0.34715625 0.14015625l0.00014062500000000002-0.00014062500000000002c-0.0890859375 0.09410156249999999-0.14533593749999998 0.22005468749999998-0.1499765625 0.3590859375l-0.0000234375 0.0009140624999999999v9.4999921875h-1.9999921875v-12h-1.0000078125v12.4900078125c0 0.27614062500000003 0.2238515625 0.49999218749999996 0.49999218749999996 0.49999218749999996v0h3.4999921875v-9.99h7.9999921875v10.0000078125h3.4999921875c0.27614062500000003 0 0.49999218749999996-0.2238515625 0.49999218749999996-0.49999218749999996v0-12.499992187499998h-1.0000078125zM21.8299921875 7.68l-9.5800078125-5.61c-0.07338281249999999-0.0420234375-0.161296875-0.0668203125-0.255-0.0668203125s-0.1816171875 0.024796875000000003-0.2575546875 0.06815625l0.0025546875-0.0013359375-9.57 5.61c-0.14763281250000002 0.0887109375-0.2448984375 0.24801562500000002-0.2448984375 0.43003125 0 0.27435937499999996 0.22096875000000002 0.49708593749999996 0.494625 0.49996875l0.00028125000000000003 0c0.002625 0.000046875 0.00571875 0.00009375 0.0088359375 0.00009375 0.089484375 0 0.172875-0.026132812499999998 0.242953125-0.07115625l-0.0017812499999999998 0.001078125 9.33-5.4499921874999995 9.3199921875 5.4499921874999995c0.07082812499999999 0.0396328125 0.1554375 0.0629765625 0.245484375 0.0629765625 0.182859375 0 0.3432421875-0.096234375 0.4332421875-0.24082031250000002l0.0012421875-0.00215625c0.0433828125-0.0725390625 0.06902343749999999-0.16003125 0.06902343749999999-0.2535 0-0.1796015625-0.09471093750000001-0.3371015625-0.23690625-0.42524999999999996l-0.0021328125-0.0012421875zM9.0400078125 13.68h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125zM9.0400078125 16.0099921875h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125z" fill="%23FFF" class="iconPath"/>
// 			</g>
// 			<defs>
// 				<filter
// 					id="filter0_d_1140_220191"
// 					x="-6"
// 					y="-6"
// 					width="60"
// 					height="80"
// 					filterUnits="userSpaceOnUse"
// 					color-interpolation-filters="sRGB"
// 				>
// 					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
// 					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// 					<feOffset dy="4"/>
// 					<feGaussianBlur stdDeviation="3"/>
// 					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
// 					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
// 					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
// 				</filter>
// 			</defs>
// 		</svg>`
// 				},
// 				zIndex: 999
// 			},
// 			{
// 				position: { lng: -58.4373331, lat: -34.5681233 },
// 				icon: {
// 					url: `data:image/svg+xml;utf-8, 		<svg width="72"
// 			height="78"
// 			viewBox="0 0 60 82"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<style>
// 				.iconPath {
// 					transform: translate(6px, 6px);
// 				}
// 				.text {
// 					font-family: 'Roboto', sans-serif;
// 					font-size: 12px;
// 					font-weight: 700;
// 					fill: white;
// 					line-height: 14px;
// 				}
// 			</style>
// 			<rect
// 							x="18"
// 							y="58"
// 							width="12"
// 							height="12"
// 							rx="6"
// 							fill="white"
// 						/>
// 						<rect
// 							x="21"
// 							y="61"
// 							width="6" height="6" rx="3"
// 							fill="%231DB779"
// 						/>

// 			<g filter="url(%23filter0_d_1140_220191)">
// 				<circle
// 					cx="24"
// 					cy="24"
// 					r="22"
// 					fill="none"
// 					stroke="%23FFF"
// 					stroke-width="2"
// 				/>
// 				<rect
// 					x="2"
// 					y="2"
// 					width="44"
// 					height="44"
// 					rx="22"
// 					fill="%231DB779"
// 				/>
// 			</g>
// 			<g class='iconPath'>
// 				<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0000078125 21h-1.9999921875v-9.4999921875c0-0.27614062500000003-0.2238515625-0.49999218749999996-0.49999218749999996-0.49999218749999996v0h-9c-0.0008906249999999999 0-0.0019453125 0-0.003 0-0.1348359375 0-0.257203125 0.0533671875-0.34715625 0.14015625l0.00014062500000000002-0.00014062500000000002c-0.0890859375 0.09410156249999999-0.14533593749999998 0.22005468749999998-0.1499765625 0.3590859375l-0.0000234375 0.0009140624999999999v9.4999921875h-1.9999921875v-12h-1.0000078125v12.4900078125c0 0.27614062500000003 0.2238515625 0.49999218749999996 0.49999218749999996 0.49999218749999996v0h3.4999921875v-9.99h7.9999921875v10.0000078125h3.4999921875c0.27614062500000003 0 0.49999218749999996-0.2238515625 0.49999218749999996-0.49999218749999996v0-12.499992187499998h-1.0000078125zM21.8299921875 7.68l-9.5800078125-5.61c-0.07338281249999999-0.0420234375-0.161296875-0.0668203125-0.255-0.0668203125s-0.1816171875 0.024796875000000003-0.2575546875 0.06815625l0.0025546875-0.0013359375-9.57 5.61c-0.14763281250000002 0.0887109375-0.2448984375 0.24801562500000002-0.2448984375 0.43003125 0 0.27435937499999996 0.22096875000000002 0.49708593749999996 0.494625 0.49996875l0.00028125000000000003 0c0.002625 0.000046875 0.00571875 0.00009375 0.0088359375 0.00009375 0.089484375 0 0.172875-0.026132812499999998 0.242953125-0.07115625l-0.0017812499999999998 0.001078125 9.33-5.4499921874999995 9.3199921875 5.4499921874999995c0.07082812499999999 0.0396328125 0.1554375 0.0629765625 0.245484375 0.0629765625 0.182859375 0 0.3432421875-0.096234375 0.4332421875-0.24082031250000002l0.0012421875-0.00215625c0.0433828125-0.0725390625 0.06902343749999999-0.16003125 0.06902343749999999-0.2535 0-0.1796015625-0.09471093750000001-0.3371015625-0.23690625-0.42524999999999996l-0.0021328125-0.0012421875zM9.0400078125 13.68h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125zM9.0400078125 16.0099921875h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125z" fill="%23FFF" class="iconPath"/>
// 			</g>
// 			<defs>
// 				<filter
// 					id="filter0_d_1140_220191"
// 					x="-6"
// 					y="-6"
// 					width="60"
// 					height="80"
// 					filterUnits="userSpaceOnUse"
// 					color-interpolation-filters="sRGB"
// 				>
// 					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
// 					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// 					<feOffset dy="4"/>
// 					<feGaussianBlur stdDeviation="3"/>
// 					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
// 					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
// 					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
// 				</filter>
// 			</defs>
// 		</svg>`
// 				},
// 				zIndex: 999
// 			},
// 			{
// 				position: { lng: -58.392933, lat: -34.5840199 },
// 				icon: {
// 					url: `data:image/svg+xml;utf-8, 		<svg width="72"
// 			height="78"
// 			viewBox="0 0 60 82"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<style>
// 				.iconPath {
// 					transform: translate(6px, 6px);
// 				}
// 				.text {
// 					font-family: 'Roboto', sans-serif;
// 					font-size: 12px;
// 					font-weight: 700;
// 					fill: white;
// 					line-height: 14px;
// 				}
// 			</style>
// 			<rect
// 							x="18"
// 							y="58"
// 							width="12"
// 							height="12"
// 							rx="6"
// 							fill="white"
// 						/>
// 						<rect
// 							x="21"
// 							y="61"
// 							width="6" height="6" rx="3"
// 							fill="%23A06CEC"
// 						/>

// 			<g filter="url(%23filter0_d_1140_220191)">
// 				<circle
// 					cx="24"
// 					cy="24"
// 					r="22"
// 					fill="none"
// 					stroke="%23A06CEC"
// 					stroke-width="2"
// 				/>
// 				<rect
// 					x="2"
// 					y="2"
// 					width="44"
// 					height="44"
// 					rx="22"
// 					fill="%23FFF"
// 				/>
// 			</g>
// 			<g class='iconPath'>
// 				<path fill-rule="evenodd" clip-rule="evenodd" d="M14.002546875 12.9785390625c-0.07860937500000001 0-0.15625781249999998 0.0185390625-0.22607812500000002 0.0542109375l-1.776375 0.9008906250000001-1.7768671875000002-0.9008906250000001c-0.06982031250000001-0.0356484375-0.14746874999999998-0.0542109375-0.22607812500000002-0.0542109375-3.662109375 0-6.997078125 3.0825234375-6.997078125 6.4668046875v1.0507734375c0 0.276375 0.22364062499999998 0.49999218749999996 0.49999218749999996 0.49999218749999996h16.9999921875c0.276375 0 0.49999218749999996-0.22364062499999998 0.49999218749999996-0.49999218749999996v-1.0507734375c0-3.38428125-3.3354609374999997-6.4668046875-6.9975703125-6.4668046875zM20.000109375 19.996125h-16.0000078125v-0.55078125c0-2.7744140625 2.8408125-5.3994140625 5.8798828125-5.4653203125l1.8940312499999998 0.959953125c0.14160937499999998 0.07228125 0.310546875 0.07228125 0.45215625000000004 0l1.8935390625-0.959953125c3.0390703125 0.0659296875 5.880375 2.6909296875 5.880375 5.4653203125v0.55078125zM12.000117187499999 11.9848828125c1.8207890624999998 0 3.9917109374999997-0.78028125 3.9917109374999997-4.4980546875 0-2.4804609375-1.79053125-4.498546875-3.9917109374999997-4.498546875s-3.9917109374999997 2.0180625-3.9917109374999997 4.498546875c0 3.7177734375 2.1708984375 4.4980546875 3.9917109374999997 4.4980546875zM12.000117187499999 3.9619453125c1.6640625 0 3.0180703125 1.581046875 3.0180703125 3.52490625 0 2.40478125-0.9589687499999999 3.5244140625-3.0180703125 3.5244140625s-3.0180703125-1.119609375-3.0180703125-3.5243906249999997c0-1.9438593750000002 1.3540078125-3.52490625 3.0180703125-3.52490625z" fill="%23A06CEC" class="iconPath"/>
// 			</g>
// 			<defs>
// 				<filter
// 					id="filter0_d_1140_220191"
// 					x="-6"
// 					y="-6"
// 					width="60"
// 					height="80"
// 					filterUnits="userSpaceOnUse"
// 					color-interpolation-filters="sRGB"
// 				>
// 					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
// 					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// 					<feOffset dy="4"/>
// 					<feGaussianBlur stdDeviation="3"/>
// 					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
// 					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
// 					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
// 				</filter>
// 			</defs>
// 		</svg>`
// 				},
// 				zIndex: 999
// 			},
// 			{
// 				position: { lng: -58.42992459999999, lat: -34.5863338 },
// 				icon: {
// 					url: `data:image/svg+xml;utf-8, 		<svg width="72"
// 			height="78"
// 			viewBox="0 0 60 82"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<style>
// 				.iconPath {
// 					transform: translate(6px, 6px);
// 				}
// 				.text {
// 					font-family: 'Roboto', sans-serif;
// 					font-size: 12px;
// 					font-weight: 700;
// 					fill: white;
// 					line-height: 14px;
// 				}
// 			</style>
// 			<rect
// 							x="18"
// 							y="58"
// 							width="12"
// 							height="12"
// 							rx="6"
// 							fill="white"
// 						/>
// 						<rect
// 							x="21"
// 							y="61"
// 							width="6" height="6" rx="3"
// 							fill="%23A06CEC"
// 						/>

// 			<g filter="url(%23filter0_d_1140_220191)">
// 				<circle
// 					cx="24"
// 					cy="24"
// 					r="22"
// 					fill="none"
// 					stroke="%23A06CEC"
// 					stroke-width="2"
// 				/>
// 				<rect
// 					x="2"
// 					y="2"
// 					width="44"
// 					height="44"
// 					rx="22"
// 					fill="%23FFF"
// 				/>
// 			</g>
// 			<g class='iconPath'>
// 				<path fill-rule="evenodd" clip-rule="evenodd" d="M14.002546875 12.9785390625c-0.07860937500000001 0-0.15625781249999998 0.0185390625-0.22607812500000002 0.0542109375l-1.776375 0.9008906250000001-1.7768671875000002-0.9008906250000001c-0.06982031250000001-0.0356484375-0.14746874999999998-0.0542109375-0.22607812500000002-0.0542109375-3.662109375 0-6.997078125 3.0825234375-6.997078125 6.4668046875v1.0507734375c0 0.276375 0.22364062499999998 0.49999218749999996 0.49999218749999996 0.49999218749999996h16.9999921875c0.276375 0 0.49999218749999996-0.22364062499999998 0.49999218749999996-0.49999218749999996v-1.0507734375c0-3.38428125-3.3354609374999997-6.4668046875-6.9975703125-6.4668046875zM20.000109375 19.996125h-16.0000078125v-0.55078125c0-2.7744140625 2.8408125-5.3994140625 5.8798828125-5.4653203125l1.8940312499999998 0.959953125c0.14160937499999998 0.07228125 0.310546875 0.07228125 0.45215625000000004 0l1.8935390625-0.959953125c3.0390703125 0.0659296875 5.880375 2.6909296875 5.880375 5.4653203125v0.55078125zM12.000117187499999 11.9848828125c1.8207890624999998 0 3.9917109374999997-0.78028125 3.9917109374999997-4.4980546875 0-2.4804609375-1.79053125-4.498546875-3.9917109374999997-4.498546875s-3.9917109374999997 2.0180625-3.9917109374999997 4.498546875c0 3.7177734375 2.1708984375 4.4980546875 3.9917109374999997 4.4980546875zM12.000117187499999 3.9619453125c1.6640625 0 3.0180703125 1.581046875 3.0180703125 3.52490625 0 2.40478125-0.9589687499999999 3.5244140625-3.0180703125 3.5244140625s-3.0180703125-1.119609375-3.0180703125-3.5243906249999997c0-1.9438593750000002 1.3540078125-3.52490625 3.0180703125-3.52490625z" fill="%23A06CEC" class="iconPath"/>
// 			</g>
// 			<defs>
// 				<filter
// 					id="filter0_d_1140_220191"
// 					x="-6"
// 					y="-6"
// 					width="60"
// 					height="80"
// 					filterUnits="userSpaceOnUse"
// 					color-interpolation-filters="sRGB"
// 				>
// 					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
// 					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// 					<feOffset dy="4"/>
// 					<feGaussianBlur stdDeviation="3"/>
// 					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
// 					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
// 					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
// 				</filter>
// 			</defs>
// 		</svg>`
// 				},
// 				zIndex: 999
// 			}
// 		]
// 	}
// ];

/** Mock to reproduce creation step case */
// const markersMockCreationStep = [
// 	{
// 		drawRoute: true,
// 		points: [
// 			{
// 				position: { lng: -58.4373331, lat: -34.5681233 },
// 				icon: {
// 					url: `data:image/svg+xml;utf-8, 		<svg width="72"
// 			height="78"
// 			viewBox="0 0 60 82"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<style>
// 				.iconPath {
// 					transform: translate(6px, 6px);
// 				}
// 				.text {
// 					font-family: 'Roboto', sans-serif;
// 					font-size: 12px;
// 					font-weight: 700;
// 					fill: white;
// 					line-height: 14px;
// 				}
// 			</style>

// 						<rect
// 							x="12"
// 							y="54"
// 							width="24"
// 							height="24"
// 							rx="12"
// 							fill="%231DB779"
// 						/>
// 						<text x="24" y="67" text-anchor="middle" dominant-baseline="middle" class="text">1</text>

// 			<g filter="url(%23filter0_d_1140_220191)">
// 				<circle
// 					cx="24"
// 					cy="24"
// 					r="22"
// 					fill="none"
// 					stroke="%23FFF"
// 					stroke-width="2"
// 				/>
// 				<rect
// 					x="2"
// 					y="2"
// 					width="44"
// 					height="44"
// 					rx="22"
// 					fill="%231DB779"
// 				/>
// 			</g>
// 			<g class='iconPath'>
// 				<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0000078125 21h-1.9999921875v-9.4999921875c0-0.27614062500000003-0.2238515625-0.49999218749999996-0.49999218749999996-0.49999218749999996v0h-9c-0.0008906249999999999 0-0.0019453125 0-0.003 0-0.1348359375 0-0.257203125 0.0533671875-0.34715625 0.14015625l0.00014062500000000002-0.00014062500000000002c-0.0890859375 0.09410156249999999-0.14533593749999998 0.22005468749999998-0.1499765625 0.3590859375l-0.0000234375 0.0009140624999999999v9.4999921875h-1.9999921875v-12h-1.0000078125v12.4900078125c0 0.27614062500000003 0.2238515625 0.49999218749999996 0.49999218749999996 0.49999218749999996v0h3.4999921875v-9.99h7.9999921875v10.0000078125h3.4999921875c0.27614062500000003 0 0.49999218749999996-0.2238515625 0.49999218749999996-0.49999218749999996v0-12.499992187499998h-1.0000078125zM21.8299921875 7.68l-9.5800078125-5.61c-0.07338281249999999-0.0420234375-0.161296875-0.0668203125-0.255-0.0668203125s-0.1816171875 0.024796875000000003-0.2575546875 0.06815625l0.0025546875-0.0013359375-9.57 5.61c-0.14763281250000002 0.0887109375-0.2448984375 0.24801562500000002-0.2448984375 0.43003125 0 0.27435937499999996 0.22096875000000002 0.49708593749999996 0.494625 0.49996875l0.00028125000000000003 0c0.002625 0.000046875 0.00571875 0.00009375 0.0088359375 0.00009375 0.089484375 0 0.172875-0.026132812499999998 0.242953125-0.07115625l-0.0017812499999999998 0.001078125 9.33-5.4499921874999995 9.3199921875 5.4499921874999995c0.07082812499999999 0.0396328125 0.1554375 0.0629765625 0.245484375 0.0629765625 0.182859375 0 0.3432421875-0.096234375 0.4332421875-0.24082031250000002l0.0012421875-0.00215625c0.0433828125-0.0725390625 0.06902343749999999-0.16003125 0.06902343749999999-0.2535 0-0.1796015625-0.09471093750000001-0.3371015625-0.23690625-0.42524999999999996l-0.0021328125-0.0012421875zM9.0400078125 13.68h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125zM9.0400078125 16.0099921875h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125z" fill="%23FFF" class="iconPath"/>
// 			</g>
// 			<defs>
// 				<filter
// 					id="filter0_d_1140_220191"
// 					x="-6"
// 					y="-6"
// 					width="60"
// 					height="80"
// 					filterUnits="userSpaceOnUse"
// 					color-interpolation-filters="sRGB"
// 				>
// 					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
// 					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// 					<feOffset dy="4"/>
// 					<feGaussianBlur stdDeviation="3"/>
// 					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
// 					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
// 					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
// 				</filter>
// 			</defs>
// 		</svg>`
// 				}
// 			},
// 			{
// 				position: { lng: -58.42992459999999, lat: -34.5863338 },
// 				icon: {
// 					url: `data:image/svg+xml;utf-8, 		<svg width="80"
// 			height="86"
// 			viewBox="0 0 68 90"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<style>
// 				.iconPath {
// 					transform: translate(6px, 6px);
// 				}
// 				.text {
// 					font-family: 'Roboto', sans-serif;
// 					font-size: 12px;
// 					font-weight: 700;
// 					fill: white;
// 					line-height: 14px;
// 				}
// 			</style>

// 						<rect
// 							x="16"
// 							y="62"
// 							width="24"
// 							height="24"
// 							rx="12"
// 							fill="%231DB779"
// 						/>
// 						<text x="28" y="75" text-anchor="middle" dominant-baseline="middle" class="text">2</text>

// 			undefined
// 			<defs>
// 				<filter
// 					id="filter0_d_1140_220191"
// 					x="-6"
// 					y="-6"
// 					width="68"
// 					height="88"
// 					filterUnits="userSpaceOnUse"
// 					color-interpolation-filters="sRGB"
// 				>
// 					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
// 					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// 					<feOffset dy="4"/>
// 					<feGaussianBlur stdDeviation="3"/>
// 					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
// 					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
// 					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
// 				</filter>
// 			</defs>
// 		</svg>`
// 				}
// 			},
// 			{
// 				position: { lng: -58.4403476, lat: -34.5655887 },
// 				icon: {
// 					url: `data:image/svg+xml;utf-8, 		<svg width="80"
// 			height="86"
// 			viewBox="0 0 68 90"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg"
// 		>
// 			<style>
// 				.iconPath {
// 					transform: translate(6px, 6px);
// 				}
// 				.text {
// 					font-family: 'Roboto', sans-serif;
// 					font-size: 12px;
// 					font-weight: 700;
// 					fill: white;
// 					line-height: 14px;
// 				}
// 			</style>

// 						<rect
// 							x="16"
// 							y="62"
// 							width="24"
// 							height="24"
// 							rx="12"
// 							fill="%231DB779"
// 						/>
// 						<text x="28" y="75" text-anchor="middle" dominant-baseline="middle" class="text">3</text>

// 			undefined
// 			<defs>
// 				<filter
// 					id="filter0_d_1140_220191"
// 					x="-6"
// 					y="-6"
// 					width="68"
// 					height="88"
// 					filterUnits="userSpaceOnUse"
// 					color-interpolation-filters="sRGB"
// 				>
// 					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
// 					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// 					<feOffset dy="4"/>
// 					<feGaussianBlur stdDeviation="3"/>
// 					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.292799 0"/>
// 					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1140_220191"/>
// 					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1140_220191" result="shape"/>
// 				</filter>
// 			</defs>
// 		</svg>`
// 				}
// 			}
// 		]
// 	}
// ];

const markersMockMultiRutas = [
	{
		drawRoute: true,
		polylineOptions: {
			strokeColor: '#f11111',
			strokeOpacity: 0.8,
			strokeWeight: 4
		},
		points: [
			{
				position: { lng: -58.43, lat: -34.5986 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="72"
			height="78"
			viewBox="0 0 60 82"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<style>
				.iconPath {
					transform: translate(6px, 6px);
				}
				.text {
					font-family: 'Roboto', sans-serif;
					font-size: 12px;
					font-weight: 700;
					fill: white;
					line-height: 14px;
				}
			</style>
			
			<g filter="url(%23filter0_d_1140_220191)">
				<circle
					cx="24"
					cy="24"
					r="22"
					fill="none"
					stroke="%23FFF"
					stroke-width="2" 
				/>
				<rect
					x="2"
					y="2"
					width="44"
					height="44"
					rx="22"
					fill="%23000000"
				/>
			</g>
			<g class='iconPath'>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0000078125 21h-1.9999921875v-9.4999921875c0-0.27614062500000003-0.2238515625-0.49999218749999996-0.49999218749999996-0.49999218749999996v0h-9c-0.0008906249999999999 0-0.0019453125 0-0.003 0-0.1348359375 0-0.257203125 0.0533671875-0.34715625 0.14015625l0.00014062500000000002-0.00014062500000000002c-0.0890859375 0.09410156249999999-0.14533593749999998 0.22005468749999998-0.1499765625 0.3590859375l-0.0000234375 0.0009140624999999999v9.4999921875h-1.9999921875v-12h-1.0000078125v12.4900078125c0 0.27614062500000003 0.2238515625 0.49999218749999996 0.49999218749999996 0.49999218749999996v0h3.4999921875v-9.99h7.9999921875v10.0000078125h3.4999921875c0.27614062500000003 0 0.49999218749999996-0.2238515625 0.49999218749999996-0.49999218749999996v0-12.499992187499998h-1.0000078125zM21.8299921875 7.68l-9.5800078125-5.61c-0.07338281249999999-0.0420234375-0.161296875-0.0668203125-0.255-0.0668203125s-0.1816171875 0.024796875000000003-0.2575546875 0.06815625l0.0025546875-0.0013359375-9.57 5.61c-0.14763281250000002 0.0887109375-0.2448984375 0.24801562500000002-0.2448984375 0.43003125 0 0.27435937499999996 0.22096875000000002 0.49708593749999996 0.494625 0.49996875l0.00028125000000000003 0c0.002625 0.000046875 0.00571875 0.00009375 0.0088359375 0.00009375 0.089484375 0 0.172875-0.026132812499999998 0.242953125-0.07115625l-0.0017812499999999998 0.001078125 9.33-5.4499921874999995 9.3199921875 5.4499921874999995c0.07082812499999999 0.0396328125 0.1554375 0.0629765625 0.245484375 0.0629765625 0.182859375 0 0.3432421875-0.096234375 0.4332421875-0.24082031250000002l0.0012421875-0.00215625c0.0433828125-0.0725390625 0.06902343749999999-0.16003125 0.06902343749999999-0.2535 0-0.1796015625-0.09471093750000001-0.3371015625-0.23690625-0.42524999999999996l-0.0021328125-0.0012421875zM9.0400078125 13.68h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125zM9.0400078125 16.0099921875h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125z" fill="%23FFF" class="iconPath"/>	
			</g>
			<defs>
				<filter
					id="filter0_d_1140_220191"
					x="-6"
					y="-6"
					width="60"
					height="80"
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
		</svg>`
				}
			},
			{
				position: { lat: -34.601, lng: -58.4285 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(%23filter0_d_491_165663)">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
			</g>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%23f11111"/>
			<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >2</text>
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
		</svg>`
				}
			},
			{
				position: { lat: -34.6092, lng: -58.4465 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(%23filter0_d_491_165663)">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
			</g>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%23f11111"/>
			<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >3</text>
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
		</svg>`
				}
			}
		]
	},
	{
		drawRoute: true,
		polylineOptions: {
			strokeColor: '#22bbbb',
			strokeOpacity: 0.8,
			strokeWeight: 4
		},
		points: [
			{
				position: { lat: -34.6064, lng: -58.4371 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(%23filter0_d_491_165663)">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
		</g>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%2322bbbb"/>
		<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >1</text>
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
	</svg>`
				}
			},
			{
				position: { lat: -34.6092, lng: -58.4465 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g filter="url(%23filter0_d_491_165663)">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
	</g>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%2322bbbb"/>
	<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >2</text>
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
</svg>`
				}
			},
			{
				position: { lat: -34.6065, lng: -58.4207 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g filter="url(%23filter0_d_491_165663)">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
	</g>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%2322bbbb"/>
	<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >3</text>
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
</svg>`
				}
			}
		]
	},
	{
		drawRoute: true,
		polylineOptions: {
			strokeColor: '#2222aa',
			strokeOpacity: 0.8,
			strokeWeight: 4
		},
		points: [
			{
				position: { lat: -34.6062, lng: -58.4377 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="72"
			height="78"
			viewBox="0 0 60 82"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<style>
				.iconPath {
					transform: translate(6px, 6px);
				}
				.text {
					font-family: 'Roboto', sans-serif;
					font-size: 12px;
					font-weight: 700;
					fill: white;
					line-height: 14px;
				}
			</style>
			
			<g filter="url(%23filter0_d_1140_220191)">
				<circle
					cx="24"
					cy="24"
					r="22"
					fill="none"
					stroke="%23FFF"
					stroke-width="2" 
				/>
				<rect
					x="2"
					y="2"
					width="44"
					height="44"
					rx="22"
					fill="%23000000"
				/>
			</g>
			<g class='iconPath'>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0000078125 21h-1.9999921875v-9.4999921875c0-0.27614062500000003-0.2238515625-0.49999218749999996-0.49999218749999996-0.49999218749999996v0h-9c-0.0008906249999999999 0-0.0019453125 0-0.003 0-0.1348359375 0-0.257203125 0.0533671875-0.34715625 0.14015625l0.00014062500000000002-0.00014062500000000002c-0.0890859375 0.09410156249999999-0.14533593749999998 0.22005468749999998-0.1499765625 0.3590859375l-0.0000234375 0.0009140624999999999v9.4999921875h-1.9999921875v-12h-1.0000078125v12.4900078125c0 0.27614062500000003 0.2238515625 0.49999218749999996 0.49999218749999996 0.49999218749999996v0h3.4999921875v-9.99h7.9999921875v10.0000078125h3.4999921875c0.27614062500000003 0 0.49999218749999996-0.2238515625 0.49999218749999996-0.49999218749999996v0-12.499992187499998h-1.0000078125zM21.8299921875 7.68l-9.5800078125-5.61c-0.07338281249999999-0.0420234375-0.161296875-0.0668203125-0.255-0.0668203125s-0.1816171875 0.024796875000000003-0.2575546875 0.06815625l0.0025546875-0.0013359375-9.57 5.61c-0.14763281250000002 0.0887109375-0.2448984375 0.24801562500000002-0.2448984375 0.43003125 0 0.27435937499999996 0.22096875000000002 0.49708593749999996 0.494625 0.49996875l0.00028125000000000003 0c0.002625 0.000046875 0.00571875 0.00009375 0.0088359375 0.00009375 0.089484375 0 0.172875-0.026132812499999998 0.242953125-0.07115625l-0.0017812499999999998 0.001078125 9.33-5.4499921874999995 9.3199921875 5.4499921874999995c0.07082812499999999 0.0396328125 0.1554375 0.0629765625 0.245484375 0.0629765625 0.182859375 0 0.3432421875-0.096234375 0.4332421875-0.24082031250000002l0.0012421875-0.00215625c0.0433828125-0.0725390625 0.06902343749999999-0.16003125 0.06902343749999999-0.2535 0-0.1796015625-0.09471093750000001-0.3371015625-0.23690625-0.42524999999999996l-0.0021328125-0.0012421875zM9.0400078125 13.68h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125zM9.0400078125 16.0099921875h6.0100078125000005v1.0000078125h-6.0100078125000005v-1.0000078125z" fill="%23FFF" class="iconPath"/>	
			</g>
			<defs>
				<filter
					id="filter0_d_1140_220191"
					x="-6"
					y="-6"
					width="60"
					height="80"
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
		</svg>`
				}
			},
			{
				position: { lat: -34.601, lng: -58.428 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g filter="url(%23filter0_d_491_165663)">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
	</g>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%232222aa"/>
	<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >1</text>
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
</svg>`
				}
			},
			{
				position: { lat: -34.605, lng: -58.43 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g filter="url(%23filter0_d_491_165663)">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
	</g>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%232222aa"/>
	<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >2</text>
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
</svg>`
				}
			}
		]
	},
	{
		drawRoute: true,
		polylineOptions: {
			strokeColor: '#22ffaa',
			strokeOpacity: 0.8,
			strokeWeight: 4
		},
		points: [
			{
				position: { lat: -34.5919, lng: -58.4327 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(%23filter0_d_491_165663)">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%2322ffaa"/>
<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >1</text>
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
</svg>`
				}
			},
			{
				position: { lat: -34.596, lng: -58.434 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(%23filter0_d_491_165663)">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%2322ffaa"/>
<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >2</text>
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
</svg>`
				}
			},
			{
				position: { lat: -34.5957, lng: -58.4308 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(%23filter0_d_491_165663)">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%2322ffaa"/>
<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >3</text>
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
</svg>`
				}
			}
		]
	},
	{
		drawRoute: true,
		polylineOptions: {
			strokeColor: '#bb22aa',
			strokeOpacity: 0.8,
			strokeWeight: 4
		},
		points: [
			{
				position: { lat: -34.6065, lng: -58.4207 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(%23filter0_d_491_165663)">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%23bb22aa"/>
<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >1</text>
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
</svg>`
				}
			},
			{
				position: { lat: -34.6043, lng: -58.4301 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(%23filter0_d_491_165663)">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%23bb22aa"/>
<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >2</text>
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
</svg>`
				}
			},
			{
				position: { lat: -34.6035, lng: -58.435 },
				icon: {
					url: `data:image/svg+xml;utf-8, 		<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(%23filter0_d_491_165663)">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M22 4C28.6274 4 34 9.2873 34 15.8095C34 19.6038 32.5151 23.4609 29.5454 27.3809C27.6409 29.8948 22 35 22 35C18.2394 31.5965 15.7243 29.0568 14.4546 27.3809C11.4849 23.4609 10 19.6038 10 15.8095C10 9.2873 15.3726 4 22 4Z" fill="white"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C26.4183 8 30 11.5817 30 16C30 18.5703 29.0101 21.1832 27.0302 23.8387C25.7606 25.5416 22 29 22 29C19.4929 26.6944 17.8162 24.974 16.9698 23.8387C14.9899 21.1832 14 18.5703 14 16C14 11.5817 17.5817 8 22 8Z" fill="%23bb22aa"/>
<text x="49%" y="43%" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Roboto" font-weight="1000" fill="white" >3</text>
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
</svg>`
				}
			}
		]
	}
];

export default {
	title: 'Components/Map',
	component: Map,
	parameters: {
		layout: 'centered'
	},
	argTypes: {}
};

const Template = (args) => <Map {...args} />;

const baseArgs = {
	center,
	markers: markersMockMultiRutas,
	googleMapsApiKey: '',
	...containerStyle
};
export const OnlyMap = Template.bind({});

OnlyMap.args = {
	...baseArgs
};
