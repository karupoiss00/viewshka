import React from 'react'
import {Card} from '../../../common/card/Card'
import styles from './LibraryFeature.module.css'

function LibraryFeature() {
	return (
		<div className={styles.container}>
			<div className={styles.textContainer}>
				<span className={styles.header}>
					Библиотека материалов
				</span>
				<span className={styles.description}>
					Делись материалами, публикуя их в библиотеке
				</span>
			</div>
			<div className={styles.cardsPair}>
				<Card size="medium" className={styles.bottomCard}>
					Библиотека
					<img src="images/planet.png" alt={'planet'}/>
				</Card>
				<Card size="medium" className={styles.topCard}>
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