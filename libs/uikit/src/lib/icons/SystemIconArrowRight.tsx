import React from 'react'

function SystemIconArrowRight(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={7}
			height={12}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M1 11L6 6L1 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}

export {
	SystemIconArrowRight,
}