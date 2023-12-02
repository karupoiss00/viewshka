import {Card} from '@leards/components/screens/landing/common/card/Card'
import React from 'react'
import styles from './SharingFeature.module.css'

function SharingFeature() {
	return (
		<div className={styles.container}>
			<div className={styles.cardsPair}>
				<Card size="medium" className={styles.bottomCard}>
					Делиться
					<img src="images/coffee.png" alt={'coffee'}/>
				</Card>
				<Card size="medium" className={styles.topCard}>
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
		</div>
	)
}

export {
	SharingFeature,
}