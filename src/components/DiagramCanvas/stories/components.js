/* eslint-disable react/prop-types */
import React from 'react';
import { PRIMARY, PRIMARY_SOFT, SECONDARY_DEEP, SECONDARY_SOFT } from './theme';

const WarehouseIcon = () => (
	<svg
		viewBox="0 0 24 24"
		width={18}
		height={18}
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M22 8.35V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.35a1 1 0 0 1 .726-.961l9-2.572a1 1 0 0 1 .548 0l9 2.572a1 1 0 0 1 .726.961Z" />
		<path d="M6 18v-7M18 18v-7M10 21v-7h4v7" />
	</svg>
);

const StoreIcon = () => (
	<svg
		viewBox="0 0 24 24"
		width={18}
		height={18}
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M3 9 4.5 4.5h15L21 9" />
		<path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
		<path d="M3 9c0 1.5 1.5 3 3 3s3-1.5 3-3M9 9c0 1.5 1.5 3 3 3s3-1.5 3-3M15 9c0 1.5 1.5 3 3 3s3-1.5 3-3" />
	</svg>
);

// Replica el patrón del consumidor: el ícono va en un círculo posicionado
// `absolute` por fuera del label (arriba), y el Wrapper (solo el label) es la
// caja que React Flow mide. Sirve para ver el solapamiento ícono/handle/flecha.
export const CdNode = ({ data, selected, style }) => (
	<div
		style={{
			position: 'relative',
			background: selected ? PRIMARY_SOFT : '#fff',
			border: `2px solid ${selected ? PRIMARY : '#c8d8f0'}`,
			borderRadius: 10,
			padding: '6px 12px',
			boxShadow: selected ? `0 4px 14px ${PRIMARY}3d` : '0 2px 6px rgba(0,17,51,0.06)',
			cursor: 'pointer',
			minWidth: 110,
			textAlign: 'center',
			boxSizing: 'border-box',
			...style
		}}
	>
		<div
			style={{
				position: 'absolute',
				top: '-100%',
				left: '20%',
				transform: 'translate(-50%, -50%)',
				color: PRIMARY,
				background: PRIMARY_SOFT,
				borderRadius: '50%',
				width: 38,
				height: 38,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				border: '2px solid #fff',
				boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
			}}
		>
			<WarehouseIcon />
			{data.priority != null && (
				<span
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						transform: 'translate(50%, -50%)',
						width: 16,
						height: 16,
						borderRadius: '50%',
						background: PRIMARY,
						color: '#fff',
						fontSize: 9,
						fontWeight: 700,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px solid #fff'
					}}
				>
					{data.priority}
				</span>
			)}
		</div>
		<div style={{ fontWeight: 400, fontSize: 13, color: '#001233', whiteSpace: 'nowrap' }}>
			{data.label}
		</div>
	</div>
);

export const GrupoTiendasNode = ({ data, selected, style }) => {
	const count = (data.tiendas || []).length;
	return (
		<div
			style={{
				background: selected ? SECONDARY_SOFT : '#fff',
				border: `2px solid ${selected ? SECONDARY_DEEP : '#e8cdb0'}`,
				borderRadius: 10,
				padding: '12px 12px 6px 8px',
				boxShadow: selected ? `0 4px 14px ${SECONDARY_DEEP}3d` : '0 2px 6px rgba(0,17,51,0.06)',
				display: 'flex',
				alignItems: 'center',
				gap: 8,
				cursor: 'pointer',
				minWidth: 110,
				boxSizing: 'border-box',
				...style
			}}
		>
			<div
				style={{
					color: SECONDARY_DEEP,
					background: SECONDARY_SOFT,
					borderRadius: 7,
					width: 30,
					height: 30,
					flexShrink: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative'
				}}
			>
				<StoreIcon />
				<span
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						transform: 'translate(50%, -50%)',
						width: 16,
						height: 16,
						borderRadius: '50%',
						background: count ? SECONDARY_DEEP : '#7588a3',
						color: '#fff',
						fontSize: 9,
						fontWeight: 700,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px solid #fff'
					}}
				>
					{count}
				</span>
			</div>
			<div style={{ fontWeight: 400, fontSize: 13, color: '#001233', whiteSpace: 'nowrap' }}>
				{data.label}
			</div>
		</div>
	);
};

export const nodeComponents = { cd: CdNode, grupoTiendas: GrupoTiendasNode };
