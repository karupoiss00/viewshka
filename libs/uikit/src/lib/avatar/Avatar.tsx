import {generateGradient, generateRandomGradient} from '@viewshka/core'
import classnames from 'classnames'
import {Gradient} from '../types/Gradient'
import styles from './Avatar.module.css'

type AvatarSize = 'large' | 'medium' | 'small'

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
	gradient?: Gradient
}

type AvatarProps = AvatarImageProps | GradientAvatarProps

function Avatar(props: AvatarProps) {
	switch (props.type) {
		case 'image': {
			return <AvatarImage {...props}/>
		}
		case 'gradient':
			return <GradientAvatar {...props}/>
		default:
			throw Error('Unknown type of avatar')
	}
}

function AvatarImage({avatarUrl, size}: AvatarImageProps) {
	const className = classnames(styles['avatar-container'], {
		[styles[`avatar-container--${size}`]]: true,
	})

	return (
		<div className={className}>
			<img className={styles['avatar-image']} src={avatarUrl}/>
		</div>
	)
}

function GradientAvatar({name, size, gradient}: GradientAvatarProps) {
	const containerClassName = classnames(styles['avatar-container'], {
		[styles[`avatar-container--${size}`]]: true,
	})

	const textClassName = classnames(styles['avatar-text'], {
		[styles[`avatar-text--${size}`]]: true,
	})

	const backgroundGradient = gradient == null
		? generateRandomGradient(name)
		: generateGradient(gradient.startColor, gradient.endColor)


	return (
		<div className={containerClassName}>
			<div className={styles['avatar-gradient']}
				style={{
					background: backgroundGradient,
				}}
			>
				<p className={textClassName}>
					{getAvatarInitials(name)}
				</p>
			</div>
		</div>
	)
}

function getAvatarInitials(str: string): string {
	const strs: Array<string> = str.split(' ')
	if (strs.length > 1) {
		return strs[0][0] + strs[1][0]
	}
	return strs[0].substring(0, 2)
}

export {
	AvatarSize,
	Avatar,
}