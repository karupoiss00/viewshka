import React from 'react'

function SystemIconClose(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg width={40}
			height={40}
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g id="Exit" clipPath={'url(#clip0_134_3503)'}>
				<path id="Vector" d="M10.5563 7.27208C10.1813 6.89701 9.67257 6.68629 9.14214 6.68629C8.6117 6.68629 8.103 6.897 7.72792 7.27208C7.35285 7.64715 7.14214 8.15586 7.14214 8.68629C7.14214 9.21672 7.35285 9.72543 7.72792 10.1005L17.6274 20L7.72792 29.8995C7.35285 30.2746 7.14214 30.7833 7.14214 31.3137C7.14214 31.8441 7.35285 32.3528 7.72792 32.7279C8.103 33.103 8.6117 33.3137 9.14214 33.3137C9.67257 33.3137 10.1813 33.103 10.5563 32.7279L20.4558 22.8284L30.3553 32.7279C30.7304 33.103 31.2391 33.3137 31.7696 33.3137C32.3 33.3137 32.8087 33.103 33.1838 32.7279C33.5588 32.3528 33.7696 31.8441 33.7696 31.3137C33.7696 30.7833 33.5588 30.2746 33.1838 29.8995L23.2843 20L33.1838 10.1005C33.5588 9.72543 33.7696 9.21672 33.7696 8.68629C33.7696 8.15586 33.5588 7.64715 33.1838 7.27208C32.8087 6.897 32.3 6.68629 31.7696 6.68629C31.2391 6.68629 30.7304 6.897 30.3553 7.27208L20.4558 17.1716L10.5563 7.27208Z" fill="currentColor"/>
			</g>
			<defs>
				<clipPath id="clip0_134_3503">
					<rect width="40" height="40" fill="white" opacity={0}/>
				</clipPath>
			</defs>
		</svg>
	)
}

export {
	SystemIconClose,
}