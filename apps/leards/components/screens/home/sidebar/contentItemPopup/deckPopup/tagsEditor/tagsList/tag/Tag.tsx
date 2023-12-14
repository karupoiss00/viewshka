import React from 'react'
import styles from './Tag.module.css'

type TagProps = {
	value: string
	onRemove: (value: string) => void
}
function Tag({value, onRemove}: TagProps) {
	return (
		<div className={styles.tag}>
			{value}
			<div className={styles.removeIcon} onClick={() => onRemove(value)}>
				<Cross/>
			</div>
		</div>
	)
}

function Cross() {
	return (
		<svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_1687_16744)">
				<path d="M9.28522 7.04505C9.0508 6.81063 8.73285 6.67893 8.40133 6.67893C8.06981 6.67893 7.75187 6.81063 7.51745 7.04505C7.28303 7.27947 7.15133 7.59741 7.15133 7.92893C7.15134 8.26045 7.28303 8.5784 7.51745 8.81282L13.7046 15L7.51745 21.1872C7.28303 21.4216 7.15134 21.7395 7.15133 22.0711C7.15133 22.4026 7.28303 22.7205 7.51745 22.955C7.75187 23.1894 8.06981 23.3211 8.40133 23.3211C8.73285 23.3211 9.0508 23.1894 9.28522 22.955L15.4724 16.7678L21.6596 22.955C21.894 23.1894 22.212 23.3211 22.5435 23.3211C22.875 23.3211 23.1929 23.1894 23.4274 22.955C23.6618 22.7205 23.7935 22.4026 23.7935 22.0711C23.7935 21.7395 23.6618 21.4216 23.4274 21.1872L17.2402 15L23.4274 8.81282C23.6618 8.5784 23.7935 8.26045 23.7935 7.92893C23.7935 7.59741 23.6618 7.27947 23.4274 7.04505C23.1929 6.81063 22.875 6.67893 22.5435 6.67893C22.212 6.67893 21.894 6.81063 21.6596 7.04505L15.4724 13.2322L9.28522 7.04505Z" fill="currentColor"/>
			</g>
			<defs>
				<clipPath id="clip0_1687_16744">
					<rect width="30" height="30" fill="white" transform="translate(0.5)"/>
				</clipPath>
			</defs>
		</svg>
	)
}

export {
	Tag,
}