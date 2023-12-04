import {Card} from '@leards/components/screens/landing/common/card/Card'
import {ANIMATION_DELAY} from '@leards/components/screens/landing/screens/advantages/common/animation'
import classnames from 'classnames'
import React, {useRef} from 'react'
import {useElementVisible} from '../common/useElementVisible'
import styles from './PersonalDecks.module.css'

function PersonalDecks() {
	const ref = useRef<HTMLDivElement>(null)
	const visible = useElementVisible(ref, ANIMATION_DELAY)

	return (
		<div className={styles.container} ref={ref}>
			<div className={styles.textContainer}>
				<span className={styles.header}>
					Личные колоды
				</span>
				<span className={styles.description}>
					Составляй свои коллекции  слов - колоды
					и объединяй их в папки
				</span>
			</div>
			<div className={styles.cardsStack}>
				<Card size="medium" className={classnames(styles.bottomCard, {
					[styles.bottomCardVisible]: visible,
				})}></Card>
				<Card size="medium" className={classnames(styles.centerCard, {
					[styles.centerCardVisible]: visible,
				})}></Card>
				<Card size="medium" className={styles.topCard}>Personal</Card>
			</div>
		</div>
	)
}

export {
	PersonalDecks,
}