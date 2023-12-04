import {ANIMATION_DELAY} from '@leards/components/screens/landing/screens/advantages/common/animation'
import {useElementVisible} from '@leards/components/screens/landing/screens/advantages/common/useElementVisible'
import classnames from 'classnames'
import React, {useRef} from 'react'
import {Card} from '../../../common/card/Card'
import styles from './LibraryFeature.module.css'

function LibraryFeature() {
	const ref = useRef<HTMLDivElement>(null)
	const visible = useElementVisible(ref, ANIMATION_DELAY)
	return (
		<div className={styles.container} ref={ref}>
			<div className={styles.textContainer}>
				<span className={styles.header}>
					Библиотека материалов
				</span>
				<span className={styles.description}>
					Делись материалами, публикуя их в библиотеке
				</span>
			</div>
			<div className={styles.cardsPair}>
				<Card size="medium" className={classnames(styles.bottomCard, {
					[styles.bottomCardVisible]: visible,
				})}>
					Библиотека
					<img src="images/planet.png" alt={'planet'}/>
				</Card>
				<Card size="medium" className={classnames(styles.topCard, {
					[styles.topCardVisible]: visible,
				})}>
					Library
					<img src="images/planet.png" alt={'planet'}/>
				</Card>
			</div>
		</div>
	)
}

export {
	LibraryFeature,
}