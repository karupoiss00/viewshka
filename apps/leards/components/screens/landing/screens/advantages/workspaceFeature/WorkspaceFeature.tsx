import {Card} from '@leards/components/screens/landing/common/card/Card'
import React from 'react'
import styles from './WorkspaceFeature.module.css'

function WorkspaceFeature() {
	return (
		<div className={styles.container}>
			<div className={styles.cardsContainer}>
				<Card size="small" className={styles.topCard}>
					Participant
					<img src="images/person.png" alt={'person'}/>
				</Card>
				<Card size="small" className={styles.bottomCard}>
					Participant
					<img src="images/person.png" alt={'person'}/>
				</Card>
				<Card size="small" className={styles.rightCard}>
					Participant
					<img src="images/person.png" alt={'person'}/>
				</Card>
				<Card size="medium" className={styles.leftCard}>
					Workspace
					<img src="images/workspace.png" alt={'workspace'}/>
				</Card>
			</div>
			<div className={styles.textContainer}>
				<span className={styles.header}>
					Воркспейс
				</span>
				<span className={styles.description}>
					Расскажи своему учителю и учи его диктанты здесь
				</span>
			</div>
		</div>
	)
}

export {
	WorkspaceFeature,
}