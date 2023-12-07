import {Card} from '@leards/components/screens/landing/common/card/Card'
import {
	AnimationTrigger,
} from '@leards/components/screens/landing/screens/advantages/common/animationTrigger/AnimationTrigger'
import {useElementWasShowed} from '@leards/components/screens/landing/screens/advantages/common/useElementWasShowed'
import classnames from 'classnames'
import React, {useRef} from 'react'
import styles from './SharingFeature.module.css'

function SharingFeature() {
	const ref = useRef<HTMLDivElement>(null)
	const visible = useElementWasShowed(ref)

	return (
		<div className={styles.container}>
			<div className={styles.cardsPair}>
				<Card size="medium" className={classnames(styles.bottomCard, {
					[styles.bottomCardVisible]: visible,
				})}>
					Делиться
					<img src="images/coffee.png" alt={'coffee'}/>
				</Card>
				<Card size="medium" className={classnames(styles.topCard, {
					[styles.topCardVisible]: visible,
				})}>
					Share
					<img src="images/coffee.png" alt={'coffee'}/>
				</Card>
			</div>
			<div className={styles.textContainer}>
				<span className={styles.header}>
					Шаринг
				</span>
				<span className={styles.description}>
					Делись колодами с друзьями
				</span>
			</div>
			<AnimationTrigger ref={ref}/>
		</div>
	)
}

export {
	SharingFeature,
}