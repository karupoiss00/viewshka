import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import styles from './Avatar.module.css'

type AvatarSize = 'large' | 'small'

type AvatarProps = {
    username: string
    avatarUrl?: string
    size: AvatarSize
}

function Avatar({username, avatarUrl, size}: AvatarProps) {
	if (avatarUrl !== null && avatarUrl !== undefined) {
		return (
			<div className={classnames(styles['avatar-container'], {
				[styles[`avatar-container--${size}`]]: true,
			})}>
			</div>
		)
	}
	else {
		return (
			<div className={classnames(styles['avatar-container'], {
				[styles[`avatar-container--${size}`]]: true,
			})}>
				<div className={classnames(styles['avatar-gradient'])}
					style={{
						background: generateRandomGradient(username),
					}}
				>
					<p className={styles['avatar-text']}>
						{size == 'large' ? getAvatarName(username) : null}
					</p>
				</div>
			</div>
		)
	}
}

function generateRandomGradient(username: string) {
	const angle = 180
	const color1 = generateRandomColor(username)
	const color2 = generateRandomColor(username.length < 4 ? username + username : username.substring(0, 4))

	return `linear-gradient(${angle}deg, ${color1}, ${color2})`
}

function generateRandomColor(username: string) {
	let hash = 0
	username.split('').forEach(char => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})
	let color = '#'
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		color += value.toString(16).padStart(2, '0')
	}
	return color
}

function getAvatarName(username: string): string {
	const strs: Array<string> = username.split(' ')
	if (strs.length > 1) {
		return strs[0][0] + strs[1][0]
	}
	else {
		return strs[0].substring(0, 2)
	}
}

export {
	AvatarSize,
	Avatar,
}