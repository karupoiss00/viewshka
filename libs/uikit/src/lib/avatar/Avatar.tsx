import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import styles from './Avatar.module.css'

type AvatarSize = 'large' | 'small'

type AvatarProps = PropsWithClassname & {
    username: string
    avatarUrl?: string
    size: AvatarSize
}

function Avatar({username, avatarUrl, size, className}: AvatarProps) {
	if (avatarUrl !== null && avatarUrl !== undefined) {
		return (
			<div className={classnames(styles['avatar-container'], {
				[styles[`avatar-container--${size}`]]: true, className,
			})}>
			</div>
		)
	}
	else {
		return (
			<div className={classnames(styles['avatar-container'], {
				[styles[`avatar-container--${size}`]]: true, className,
			})}>
				<div style={{
					background: generateRandomGradient(),
					width: '100%',
					height: '100%',
				}}
				>
				</div>
			</div>
		)
	}
}

function generateRandomGradient() {
	const angle = Math.floor(Math.random() * 361)
	const color1 = generateRandomColor()
	const color2 = generateRandomColor()

	return `linear-gradient(${angle}deg, ${color1}, ${color2})`
}

function generateRandomColor() {
	const letters = '0123456789ABCDEF'
	let color = '#'

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}

	return color
}

export {
	AvatarSize,
	Avatar,
}