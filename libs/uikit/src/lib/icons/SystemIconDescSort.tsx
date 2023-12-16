import React from 'react'

function SystemIconDescSort(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="30"
			height="30"
			viewBox="0 0 30 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M5 8L5 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
			<path d="M10 8H25" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
			<path d="M10 14H22" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
			<path d="M10 20H18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
		</svg>

	)
}

export {
	SystemIconDescSort,
}