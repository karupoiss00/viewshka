import {Card} from '@leards/components/screens/landing/common/card/Card'
import {ANIMATION_DELAY} from '@leards/components/screens/landing/screens/advantages/common/animation'
import {useElementVisible} from '@leards/components/screens/landing/screens/advantages/common/useElementVisible'
import classnames from 'classnames'
import React, {useRef} from 'react'
import styles from './WorkspaceFeature.module.css'

function WorkspaceFeature() {
	const ref = useRef<HTMLDivElement>(null)
	const visible = useElementVisible(ref, ANIMATION_DELAY)


	return (
		<div className={styles.container}>
			<div className={styles.cardsContainer} ref={ref}>
				<Card size="small" className={classnames(styles.topCard, {
					[styles.topCardVisible]: visible,
				})}>
					Participant
					<img src="images/person.png" alt={'person'}/>
				</Card>
				<Card size="small" className={classnames(styles.bottomCard, {
					[styles.bottomCardVisible]: visible,
				})}>
					Participant
					<img src="images/person.png" alt={'person'}/>
				</Card>
				<Card size="small" className={classnames(styles.rightCard, {
					[styles.rightCardVisible]: visible,
				})}>
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