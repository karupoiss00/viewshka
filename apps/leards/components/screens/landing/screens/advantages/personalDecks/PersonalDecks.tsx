import {Card} from '@leards/components/screens/landing/common/card/Card'
import React from 'react'
import styles from './PersonalDecks.module.css'

function PersonalDecks() {
	return (
		<div className={styles.container}>
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
				<Card size="medium" className={styles.bottomCard}></Card>
				<Card size="medium" className={styles.centerCard}></Card>
				<Card size="medium" className={styles.topCard}>Personal</Card>
			</div>
		</div>
	)
}

export {
	PersonalDecks,
}