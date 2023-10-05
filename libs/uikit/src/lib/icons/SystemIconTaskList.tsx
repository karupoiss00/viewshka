import * as React from 'react'

function SystemIconTaskList(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={30}
			height={30}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#prefix__clip0_639_10570)" fill="currentColor">
				<path d="M24.408 28.333H5.592a1.418 1.418 0 01-1.425-1.408V5.575a1.458 1.458 0 011.666-1.408H7.5v1.666H5.833v20.834h18.334V5.833H22.5V4.167h1.875a1.417 1.417 0 011.458 1.408v21.35a1.417 1.417 0 01-1.425 1.408z" />
				<path d="M13.883 21.467L9.417 17a.833.833 0 011.183-1.167l3.283 3.284 7.2-7.2a.833.833 0 011.175 1.175l-8.375 8.375zM21.667 9.167H8.333V6.108a1.95 1.95 0 011.942-1.941h1.492a3.333 3.333 0 016.458 0h1.492a1.95 1.95 0 011.95 1.941v3.059zM10 7.5h10V6.108a.275.275 0 00-.275-.275h-3.058V5a1.667 1.667 0 00-3.334 0v.833h-3.058a.275.275 0 00-.275.275V7.5z" />
			</g>
			<defs>
				<clipPath id="prefix__clip0_639_10570">
					<path fill="#fff" d="M0 0h30v30H0z" />
				</clipPath>
			</defs>
		</svg>
	)
}

export {
	SystemIconTaskList,
}