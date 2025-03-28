import React from 'react';
import Map from './Map';

const center = {
	lat: -34.5681233,
	lng: -58.4373331
};

const markersMockMultiRutas = [
	{
		polylines: [
			{
				lat: -34.59844,
				lng: -58.42975
			},
			{
				lat: -34.59897,
				lng: -58.42924
			},
			{
				lat: -34.59905,
				lng: -58.42936
			},
			{
				lat: -34.59912,
				lng: -58.42944
			},
			{
				lat: -34.59921,
				lng: -58.42956
			},
			{
				lat: -34.59933,
				lng: -58.42969
			},
			{
				lat: -34.59974,
				lng: -58.43016
			},
			{
				lat: -34.59977,
				lng: -58.43018
			},
			{
				lat: -34.59988,
				lng: -58.43029
			},
			{
				lat: -34.60074,
				lng: -58.43105
			},
			{
				lat: -34.60085,
				lng: -58.43096
			},
			{
				lat: -34.60086,
				lng: -58.43094
			},
			{
				lat: -34.60088,
				lng: -58.43091
			},
			{
				lat: -34.60089,
				lng: -58.43087
			},
			{
				lat: -34.60091,
				lng: -58.43072
			},
			{
				lat: -34.60095,
				lng: -58.4304
			},
			{
				lat: -34.60099,
				lng: -58.42996
			},
			{
				lat: -34.60114,
				lng: -58.4284
			},
			{
				lat: -34.60103,
				lng: -58.42838
			},
			{
				lat: -34.60101,
				lng: -58.42838
			},
			{
				lat: -34.60009,
				lng: -58.42824
			},
			{
				lat: -34.59995,
				lng: -58.42822
			},
			{
				lat: -34.59989,
				lng: -58.42881
			},
			{
				lat: -34.59979,
				lng: -58.42973
			},
			{
				lat: -34.59976,
				lng: -58.43
			},
			{
				lat: -34.59975,
				lng: -58.43005
			},
			{
				lat: -34.59974,
				lng: -58.43016
			},
			{
				lat: -34.59977,
				lng: -58.43018
			},
			{
				lat: -34.59988,
				lng: -58.43029
			},
			{
				lat: -34.60074,
				lng: -58.43105
			},
			{
				lat: -34.60098,
				lng: -58.43127
			},
			{
				lat: -34.60161,
				lng: -58.43182
			},
			{
				lat: -34.60165,
				lng: -58.4319
			},
			{
				lat: -34.60172,
				lng: -58.43194
			},
			{
				lat: -34.60189,
				lng: -58.43207
			},
			{
				lat: -34.60205,
				lng: -58.43219
			},
			{
				lat: -34.60214,
				lng: -58.43229
			},
			{
				lat: -34.60219,
				lng: -58.4324
			},
			{
				lat: -34.60252,
				lng: -58.43305
			},
			{
				lat: -34.60258,
				lng: -58.43316
			},
			{
				lat: -34.60266,
				lng: -58.43333
			},
			{
				lat: -34.6027,
				lng: -58.43343
			},
			{
				lat: -34.60284,
				lng: -58.43371
			},
			{
				lat: -34.60293,
				lng: -58.43388
			},
			{
				lat: -34.60295,
				lng: -58.43392
			},
			{
				lat: -34.60356,
				lng: -58.43515
			},
			{
				lat: -34.6036,
				lng: -58.43522
			},
			{
				lat: -34.60415,
				lng: -58.43635
			},
			{
				lat: -34.60417,
				lng: -58.43638
			},
			{
				lat: -34.60424,
				lng: -58.43646
			},
			{
				lat: -34.60426,
				lng: -58.43649
			},
			{
				lat: -34.60428,
				lng: -58.43651
			},
			{
				lat: -34.60431,
				lng: -58.43654
			},
			{
				lat: -34.60435,
				lng: -58.43664
			},
			{
				lat: -34.60455,
				lng: -58.43704
			},
			{
				lat: -34.6046,
				lng: -58.43718
			},
			{
				lat: -34.60464,
				lng: -58.4373
			},
			{
				lat: -34.60491,
				lng: -58.43784
			},
			{
				lat: -34.60493,
				lng: -58.43793
			},
			{
				lat: -34.60496,
				lng: -58.43799
			},
			{
				lat: -34.60523,
				lng: -58.43851
			},
			{
				lat: -34.60524,
				lng: -58.43856
			},
			{
				lat: -34.60556,
				lng: -58.43922
			},
			{
				lat: -34.60559,
				lng: -58.43929
			},
			{
				lat: -34.60577,
				lng: -58.43995
			},
			{
				lat: -34.6058,
				lng: -58.44007
			},
			{
				lat: -34.60584,
				lng: -58.4402
			},
			{
				lat: -34.60589,
				lng: -58.44039
			},
			{
				lat: -34.60595,
				lng: -58.44064
			},
			{
				lat: -34.60623,
				lng: -58.44166
			},
			{
				lat: -34.60656,
				lng: -58.44288
			},
			{
				lat: -34.6066,
				lng: -58.44303
			},
			{
				lat: -34.60689,
				lng: -58.44413
			},
			{
				lat: -34.6069,
				lng: -58.44419
			},
			{
				lat: -34.60724,
				lng: -58.4453
			},
			{
				lat: -34.60736,
				lng: -58.44562
			},
			{
				lat: -34.60742,
				lng: -58.44574
			},
			{
				lat: -34.6075,
				lng: -58.44594
			},
			{
				lat: -34.60755,
				lng: -58.44606
			},
			{
				lat: -34.60763,
				lng: -58.44624
			},
			{
				lat: -34.60779,
				lng: -58.44653
			},
			{
				lat: -34.60794,
				lng: -58.44653
			},
			{
				lat: -34.6087,
				lng: -58.44654
			},
			{
				lat: -34.60896,
				lng: -58.4465
			},
			{
				lat: -34.60907,
				lng: -58.44655
			},
			{
				lat: -34.6092,
				lng: -58.44656
			}
		],
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
		polylines: [
			{
				lat: -34.6064,
				lng: -58.4371
			},
			{
				lat: -34.60641,
				lng: -58.43717
			},
			{
				lat: -34.60643,
				lng: -58.43739
			},
			{
				lat: -34.60653,
				lng: -58.43845
			},
			{
				lat: -34.60642,
				lng: -58.43845
			},
			{
				lat: -34.60637,
				lng: -58.43844
			},
			{
				lat: -34.60626,
				lng: -58.43851
			},
			{
				lat: -34.60612,
				lng: -58.43851
			},
			{
				lat: -34.60603,
				lng: -58.4385
			},
			{
				lat: -34.60592,
				lng: -58.43848
			},
			{
				lat: -34.60576,
				lng: -58.43843
			},
			{
				lat: -34.60567,
				lng: -58.4384
			},
			{
				lat: -34.60556,
				lng: -58.43835
			},
			{
				lat: -34.60541,
				lng: -58.43826
			},
			{
				lat: -34.60537,
				lng: -58.43831
			},
			{
				lat: -34.60535,
				lng: -58.43833
			},
			{
				lat: -34.60534,
				lng: -58.43835
			},
			{
				lat: -34.60533,
				lng: -58.43837
			},
			{
				lat: -34.60531,
				lng: -58.43839
			},
			{
				lat: -34.60529,
				lng: -58.43841
			},
			{
				lat: -34.60527,
				lng: -58.43844
			},
			{
				lat: -34.60523,
				lng: -58.43851
			},
			{
				lat: -34.60524,
				lng: -58.43856
			},
			{
				lat: -34.60556,
				lng: -58.43922
			},
			{
				lat: -34.60559,
				lng: -58.43929
			},
			{
				lat: -34.60577,
				lng: -58.43995
			},
			{
				lat: -34.6058,
				lng: -58.44007
			},
			{
				lat: -34.60584,
				lng: -58.4402
			},
			{
				lat: -34.60589,
				lng: -58.44039
			},
			{
				lat: -34.60595,
				lng: -58.44064
			},
			{
				lat: -34.60623,
				lng: -58.44166
			},
			{
				lat: -34.60656,
				lng: -58.44288
			},
			{
				lat: -34.6066,
				lng: -58.44303
			},
			{
				lat: -34.60689,
				lng: -58.44413
			},
			{
				lat: -34.6069,
				lng: -58.44419
			},
			{
				lat: -34.60724,
				lng: -58.4453
			},
			{
				lat: -34.60736,
				lng: -58.44562
			},
			{
				lat: -34.60742,
				lng: -58.44574
			},
			{
				lat: -34.6075,
				lng: -58.44594
			},
			{
				lat: -34.60755,
				lng: -58.44606
			},
			{
				lat: -34.60763,
				lng: -58.44624
			},
			{
				lat: -34.60779,
				lng: -58.44653
			},
			{
				lat: -34.60794,
				lng: -58.44653
			},
			{
				lat: -34.6087,
				lng: -58.44654
			},
			{
				lat: -34.60896,
				lng: -58.4465
			},
			{
				lat: -34.60907,
				lng: -58.44655
			},
			{
				lat: -34.6092,
				lng: -58.44656
			},
			{
				lat: -34.60937,
				lng: -58.44657
			},
			{
				lat: -34.60961,
				lng: -58.44658
			},
			{
				lat: -34.60976,
				lng: -58.44659
			},
			{
				lat: -34.60961,
				lng: -58.44618
			},
			{
				lat: -34.60942,
				lng: -58.44564
			},
			{
				lat: -34.60927,
				lng: -58.44524
			},
			{
				lat: -34.609,
				lng: -58.4445
			},
			{
				lat: -34.60895,
				lng: -58.44439
			},
			{
				lat: -34.60857,
				lng: -58.44337
			},
			{
				lat: -34.60823,
				lng: -58.44241
			},
			{
				lat: -34.60839,
				lng: -58.44159
			},
			{
				lat: -34.60879,
				lng: -58.44145
			},
			{
				lat: -34.60879,
				lng: -58.44011
			},
			{
				lat: -34.6088,
				lng: -58.43999
			},
			{
				lat: -34.6088,
				lng: -58.43946
			},
			{
				lat: -34.60879,
				lng: -58.43916
			},
			{
				lat: -34.60878,
				lng: -58.43894
			},
			{
				lat: -34.60877,
				lng: -58.43882
			},
			{
				lat: -34.60877,
				lng: -58.43876
			},
			{
				lat: -34.60878,
				lng: -58.43756
			},
			{
				lat: -34.60878,
				lng: -58.43742
			},
			{
				lat: -34.60879,
				lng: -58.43738
			},
			{
				lat: -34.60878,
				lng: -58.4373
			},
			{
				lat: -34.60878,
				lng: -58.43713
			},
			{
				lat: -34.60878,
				lng: -58.437
			},
			{
				lat: -34.60876,
				lng: -58.43688
			},
			{
				lat: -34.60876,
				lng: -58.43612
			},
			{
				lat: -34.60875,
				lng: -58.43546
			},
			{
				lat: -34.60874,
				lng: -58.43462
			},
			{
				lat: -34.60874,
				lng: -58.43431
			},
			{
				lat: -34.60874,
				lng: -58.43408
			},
			{
				lat: -34.60874,
				lng: -58.43307
			},
			{
				lat: -34.60873,
				lng: -58.43295
			},
			{
				lat: -34.60873,
				lng: -58.43283
			},
			{
				lat: -34.60872,
				lng: -58.43272
			},
			{
				lat: -34.60871,
				lng: -58.43211
			},
			{
				lat: -34.60871,
				lng: -58.43184
			},
			{
				lat: -34.60871,
				lng: -58.43082
			},
			{
				lat: -34.60871,
				lng: -58.43065
			},
			{
				lat: -34.60871,
				lng: -58.43051
			},
			{
				lat: -34.60875,
				lng: -58.43029
			},
			{
				lat: -34.60875,
				lng: -58.43018
			},
			{
				lat: -34.60874,
				lng: -58.43003
			},
			{
				lat: -34.60874,
				lng: -58.4292
			},
			{
				lat: -34.60873,
				lng: -58.42912
			},
			{
				lat: -34.6087,
				lng: -58.42774
			},
			{
				lat: -34.60869,
				lng: -58.42733
			},
			{
				lat: -34.60868,
				lng: -58.42702
			},
			{
				lat: -34.60867,
				lng: -58.42696
			},
			{
				lat: -34.60866,
				lng: -58.42626
			},
			{
				lat: -34.60862,
				lng: -58.42483
			},
			{
				lat: -34.60863,
				lng: -58.42469
			},
			{
				lat: -34.60863,
				lng: -58.42455
			},
			{
				lat: -34.60862,
				lng: -58.42379
			},
			{
				lat: -34.6086,
				lng: -58.42309
			},
			{
				lat: -34.60858,
				lng: -58.42293
			},
			{
				lat: -34.60856,
				lng: -58.42169
			},
			{
				lat: -34.60855,
				lng: -58.42151
			},
			{
				lat: -34.60856,
				lng: -58.42136
			},
			{
				lat: -34.60856,
				lng: -58.42105
			},
			{
				lat: -34.60855,
				lng: -58.42082
			},
			{
				lat: -34.60856,
				lng: -58.42079
			},
			{
				lat: -34.60854,
				lng: -58.42006
			},
			{
				lat: -34.60727,
				lng: -58.41996
			},
			{
				lat: -34.60719,
				lng: -58.41997
			},
			{
				lat: -34.60685,
				lng: -58.41994
			},
			{
				lat: -34.60671,
				lng: -58.41993
			},
			{
				lat: -34.60649,
				lng: -58.41991
			},
			{
				lat: -34.60615,
				lng: -58.41989
			},
			{
				lat: -34.60603,
				lng: -58.41987
			},
			{
				lat: -34.60602,
				lng: -58.41994
			},
			{
				lat: -34.60601,
				lng: -58.42018
			},
			{
				lat: -34.60601,
				lng: -58.42129
			},
			{
				lat: -34.60667,
				lng: -58.42136
			},
			{
				lat: -34.60669,
				lng: -58.42126
			},
			{
				lat: -34.6067,
				lng: -58.42114
			},
			{
				lat: -34.6067,
				lng: -58.42094
			},
			{
				lat: -34.6067,
				lng: -58.4207
			}
		],
		polylineOptions: {
			strokeColor: '#22bbbb',
			strokeOpacity: 0.8,
			strokeWeight: 4
		},
		points: [
			{
				onClick: (args) => console.log('marker 1', args),
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
		polylines: [
			{
				lat: -34.60646,
				lng: -58.43766
			},
			{
				lat: -34.60653,
				lng: -58.43845
			},
			{
				lat: -34.60642,
				lng: -58.43845
			},
			{
				lat: -34.60637,
				lng: -58.43844
			},
			{
				lat: -34.60626,
				lng: -58.43851
			},
			{
				lat: -34.60612,
				lng: -58.43851
			},
			{
				lat: -34.60603,
				lng: -58.4385
			},
			{
				lat: -34.60592,
				lng: -58.43848
			},
			{
				lat: -34.60576,
				lng: -58.43843
			},
			{
				lat: -34.60567,
				lng: -58.4384
			},
			{
				lat: -34.60556,
				lng: -58.43835
			},
			{
				lat: -34.60541,
				lng: -58.43826
			},
			{
				lat: -34.60521,
				lng: -58.43807
			},
			{
				lat: -34.60519,
				lng: -58.43806
			},
			{
				lat: -34.60516,
				lng: -58.43805
			},
			{
				lat: -34.6051,
				lng: -58.43802
			},
			{
				lat: -34.60507,
				lng: -58.43801
			},
			{
				lat: -34.60504,
				lng: -58.438
			},
			{
				lat: -34.60496,
				lng: -58.43799
			},
			{
				lat: -34.60485,
				lng: -58.4381
			},
			{
				lat: -34.60465,
				lng: -58.43829
			},
			{
				lat: -34.60454,
				lng: -58.43839
			},
			{
				lat: -34.60429,
				lng: -58.43863
			},
			{
				lat: -34.60408,
				lng: -58.43882
			},
			{
				lat: -34.60392,
				lng: -58.43898
			},
			{
				lat: -34.60384,
				lng: -58.43904
			},
			{
				lat: -34.60375,
				lng: -58.43886
			},
			{
				lat: -34.6037,
				lng: -58.43878
			},
			{
				lat: -34.60349,
				lng: -58.43847
			},
			{
				lat: -34.60303,
				lng: -58.43774
			},
			{
				lat: -34.603,
				lng: -58.43768
			},
			{
				lat: -34.60252,
				lng: -58.43693
			},
			{
				lat: -34.60226,
				lng: -58.43654
			},
			{
				lat: -34.60223,
				lng: -58.43648
			},
			{
				lat: -34.60219,
				lng: -58.43645
			},
			{
				lat: -34.60151,
				lng: -58.43539
			},
			{
				lat: -34.60148,
				lng: -58.43534
			},
			{
				lat: -34.60116,
				lng: -58.43484
			},
			{
				lat: -34.60147,
				lng: -58.43394
			},
			{
				lat: -34.60162,
				lng: -58.43347
			},
			{
				lat: -34.60193,
				lng: -58.43256
			},
			{
				lat: -34.60199,
				lng: -58.4324
			},
			{
				lat: -34.60201,
				lng: -58.43232
			},
			{
				lat: -34.60205,
				lng: -58.43219
			},
			{
				lat: -34.60208,
				lng: -58.4319
			},
			{
				lat: -34.60212,
				lng: -58.43134
			},
			{
				lat: -34.60214,
				lng: -58.4311
			},
			{
				lat: -34.60217,
				lng: -58.43088
			},
			{
				lat: -34.60221,
				lng: -58.43055
			},
			{
				lat: -34.60224,
				lng: -58.43018
			},
			{
				lat: -34.6024,
				lng: -58.42858
			},
			{
				lat: -34.60228,
				lng: -58.42857
			},
			{
				lat: -34.60114,
				lng: -58.4284
			},
			{
				lat: -34.60118,
				lng: -58.42803
			},
			{
				lat: -34.60129,
				lng: -58.42692
			},
			{
				lat: -34.60184,
				lng: -58.427
			},
			{
				lat: -34.60255,
				lng: -58.4271
			},
			{
				lat: -34.60341,
				lng: -58.42722
			},
			{
				lat: -34.60356,
				lng: -58.42724
			},
			{
				lat: -34.6042,
				lng: -58.42733
			},
			{
				lat: -34.60411,
				lng: -58.42884
			},
			{
				lat: -34.60402,
				lng: -58.43042
			},
			{
				lat: -34.60416,
				lng: -58.43043
			},
			{
				lat: -34.60491,
				lng: -58.43054
			},
			{
				lat: -34.60494,
				lng: -58.42999
			}
		],
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
		polylines: [
			{
				lat: -34.59169,
				lng: -58.4329
			},
			{
				lat: -34.59203,
				lng: -58.43342
			},
			{
				lat: -34.59204,
				lng: -58.43345
			},
			{
				lat: -34.59227,
				lng: -58.43379
			},
			{
				lat: -34.59231,
				lng: -58.43386
			},
			{
				lat: -34.59268,
				lng: -58.43444
			},
			{
				lat: -34.59296,
				lng: -58.43487
			},
			{
				lat: -34.59304,
				lng: -58.4348
			},
			{
				lat: -34.59328,
				lng: -58.43458
			},
			{
				lat: -34.59385,
				lng: -58.43405
			},
			{
				lat: -34.5945,
				lng: -58.43344
			},
			{
				lat: -34.59467,
				lng: -58.43328
			},
			{
				lat: -34.59472,
				lng: -58.43323
			},
			{
				lat: -34.59479,
				lng: -58.43317
			},
			{
				lat: -34.59501,
				lng: -58.43296
			},
			{
				lat: -34.59519,
				lng: -58.4328
			},
			{
				lat: -34.59539,
				lng: -58.43262
			},
			{
				lat: -34.59561,
				lng: -58.43241
			},
			{
				lat: -34.59574,
				lng: -58.4323
			},
			{
				lat: -34.59582,
				lng: -58.43243
			},
			{
				lat: -34.59591,
				lng: -58.43258
			},
			{
				lat: -34.59594,
				lng: -58.43262
			},
			{
				lat: -34.59597,
				lng: -58.43266
			},
			{
				lat: -34.59601,
				lng: -58.43273
			},
			{
				lat: -34.5961,
				lng: -58.43287
			},
			{
				lat: -34.59635,
				lng: -58.43327
			},
			{
				lat: -34.59642,
				lng: -58.43337
			},
			{
				lat: -34.59591,
				lng: -58.43386
			},
			{
				lat: -34.59548,
				lng: -58.43426
			},
			{
				lat: -34.59614,
				lng: -58.43532
			},
			{
				lat: -34.59685,
				lng: -58.43467
			},
			{
				lat: -34.59709,
				lng: -58.43445
			},
			{
				lat: -34.59717,
				lng: -58.43437
			},
			{
				lat: -34.5978,
				lng: -58.43377
			},
			{
				lat: -34.59712,
				lng: -58.43271
			},
			{
				lat: -34.59643,
				lng: -58.43164
			},
			{
				lat: -34.59582,
				lng: -58.43069
			}
		],
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
		polylines: [
			{
				lat: -34.6067,
				lng: -58.4207
			},
			{
				lat: -34.6067,
				lng: -58.42041
			},
			{
				lat: -34.60671,
				lng: -58.41993
			},
			{
				lat: -34.60649,
				lng: -58.41991
			},
			{
				lat: -34.60615,
				lng: -58.41989
			},
			{
				lat: -34.60603,
				lng: -58.41987
			},
			{
				lat: -34.60526,
				lng: -58.41976
			},
			{
				lat: -34.60516,
				lng: -58.41974
			},
			{
				lat: -34.60514,
				lng: -58.41974
			},
			{
				lat: -34.60508,
				lng: -58.41973
			},
			{
				lat: -34.60491,
				lng: -58.42107
			},
			{
				lat: -34.60491,
				lng: -58.4212
			},
			{
				lat: -34.60488,
				lng: -58.42134
			},
			{
				lat: -34.60477,
				lng: -58.42218
			},
			{
				lat: -34.6047,
				lng: -58.42281
			},
			{
				lat: -34.60466,
				lng: -58.42297
			},
			{
				lat: -34.60465,
				lng: -58.42304
			},
			{
				lat: -34.60457,
				lng: -58.42365
			},
			{
				lat: -34.60448,
				lng: -58.42435
			},
			{
				lat: -34.60431,
				lng: -58.42574
			},
			{
				lat: -34.6043,
				lng: -58.42578
			},
			{
				lat: -34.6043,
				lng: -58.42587
			},
			{
				lat: -34.60424,
				lng: -58.42668
			},
			{
				lat: -34.6042,
				lng: -58.42733
			},
			{
				lat: -34.60411,
				lng: -58.42884
			},
			{
				lat: -34.60404,
				lng: -58.43008
			},
			{
				lat: -34.60402,
				lng: -58.43042
			},
			{
				lat: -34.60401,
				lng: -58.43064
			},
			{
				lat: -34.60399,
				lng: -58.43108
			},
			{
				lat: -34.60397,
				lng: -58.43127
			},
			{
				lat: -34.60397,
				lng: -58.43144
			},
			{
				lat: -34.60395,
				lng: -58.43182
			},
			{
				lat: -34.60393,
				lng: -58.43203
			},
			{
				lat: -34.60393,
				lng: -58.43216
			},
			{
				lat: -34.60392,
				lng: -58.43225
			},
			{
				lat: -34.60392,
				lng: -58.43227
			},
			{
				lat: -34.60392,
				lng: -58.4323
			},
			{
				lat: -34.60393,
				lng: -58.43232
			},
			{
				lat: -34.60414,
				lng: -58.43287
			},
			{
				lat: -34.60422,
				lng: -58.43306
			},
			{
				lat: -34.60425,
				lng: -58.43312
			},
			{
				lat: -34.60427,
				lng: -58.43316
			},
			{
				lat: -34.60428,
				lng: -58.43319
			},
			{
				lat: -34.60428,
				lng: -58.43322
			},
			{
				lat: -34.60422,
				lng: -58.43326
			},
			{
				lat: -34.60419,
				lng: -58.43328
			},
			{
				lat: -34.60415,
				lng: -58.43329
			},
			{
				lat: -34.60409,
				lng: -58.43332
			},
			{
				lat: -34.60393,
				lng: -58.43341
			},
			{
				lat: -34.60315,
				lng: -58.43381
			},
			{
				lat: -34.60302,
				lng: -58.43389
			},
			{
				lat: -34.60295,
				lng: -58.43392
			},
			{
				lat: -34.60349,
				lng: -58.43501
			}
		],
		polylineOptions: {
			strokeColor: '#bb22aa',
			strokeOpacity: 0.8,
			strokeWeight: 4
		},
		points: [
			{
				position: { lat: -34.6065, lng: -58.4207 },
				icon: {
					url: `data:image/svg+xml;utf-8, <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
					url: `data:image/svg+xml;utf-8, <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
					url: `data:image/svg+xml;utf-8, <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	googleMapsApiKey: ''
};
export const OnlyMap = Template.bind({});
export const HiddenInfo = Template.bind({});

OnlyMap.args = {
	...baseArgs
};

HiddenInfo.args = {
	...baseArgs,
	options: {
		showSearchBar: false,
		zoomControl: false,
		poiRules: [
			{
				featureType: 'road',
				stylers: [{ visibility: 'on' }, { saturation: 0 }, { lightness: 0 }]
			},

			{
				featureType: 'poi',
				stylers: [{ visibility: 'off' }]
			},

			{
				featureType: 'poi.business',
				stylers: [{ visibility: 'off' }]
			},
			{
				featureType: 'poi.park',
				stylers: [{ visibility: 'off' }]
			},

			{
				featureType: 'administrative.locality',
				stylers: [{ visibility: 'on' }, { saturation: 0 }, { lightness: 0 }]
			}
		]
	}
};
