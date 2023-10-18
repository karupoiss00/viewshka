import classnames from 'classnames'
import styles from './Avatar.module.css'

type AvatarSize = 'large' | 'medium' | 'small'

type AvatarGradient = {
	startColor: string
	endColor: string
}

type CommonAvatarProps = {
    size: AvatarSize
}

type AvatarImageProps = CommonAvatarProps & {
	type: 'image'
	avatarUrl: string
}

type GradientAvatarProps = CommonAvatarProps & {
	type: 'gradient'
	name: string
	gradient?: AvatarGradient
}

type AvatarProps = AvatarImageProps | GradientAvatarProps

function Avatar(props: AvatarProps) {
	if (props.type === 'image') {
		return (
			<AvatarImage {...props}/>
		)
	}
	else {
		return (
			<GradientAvatar {...props}/>
		)
	}
}

function AvatarImage({avatarUrl, size}: AvatarImageProps) {
	return (
		<div className={classnames(styles['avatar-container'], {
			[styles[`avatar-container--${size}`]]: true,
		})}>
			<img src={avatarUrl}
				className={styles['avatar-image']}
			/>
		</div>
	)
}

function GradientAvatar({name, size, gradient}: GradientAvatarProps) {
	return (
		<div className={classnames(styles['avatar-container'], {
			[styles[`avatar-container--${size}`]]: true,
		})}>
			<div className={classnames(styles['avatar-gradient'])}
				style={{
					background: generateRandomGradient(name, gradient),
				}}
			>
				<p className={classnames(styles['avatar-text'], {
					[styles[`avatar-text--${size}`]]: true,
				})}>
					{getAvatarName(name)}
				</p>
			</div>
		</div>
	)
}

function generateRandomGradient(username: string, gradient?: AvatarGradient) {
	const angle = 180
	let color1 = ''
	let color2 = ''
	if (gradient !== null && gradient !== undefined) {
		color1 = gradient.startColor
		color2 = gradient.endColor
	}
	else {
		color1 = generateRandomColor(username)
		color2 = generateRandomColor(username.length < 4 ? username + username : username.substring(0, 4))
	}

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