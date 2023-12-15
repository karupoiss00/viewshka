import {Card} from '@leards/components/screens/landing/common/card/Card'
import {
	AnimationTrigger,
} from '@leards/components/screens/landing/screens/advantages/common/animationTrigger/AnimationTrigger'
import {useElementWasShowed} from '@leards/components/screens/landing/screens/advantages/common/useElementWasShowed'
import classnames from 'classnames'
import React, {useRef} from 'react'
import styles from './WorkspaceFeature.module.css'

function WorkspaceFeature() {
	const ref = useRef<HTMLDivElement>(null)
	const visible = useElementWasShowed(ref)

	return (
		<div className={styles.container}>
			<div className={styles.cardsContainer}>
				<Card size="small" className={classnames(styles.topCard, {
					[styles.topCardVisible]: visible,
				})}>
					Participant
					<img src="images/person.png" alt="person"/>
				</Card>
				<Card size="small" className={classnames(styles.bottomCard, {
					[styles.bottomCardVisible]: visible,
				})}>
					Participant
					<img src="images/person.png" alt="person"/>
				</Card>
				<Card size="small" className={classnames(styles.rightCard, {
					[styles.rightCardVisible]: visible,
				})}>
					Participant
					<img src="images/person.png" alt="person"/>
				</Card>
				<Card size="medium" className={styles.leftCard}>
					Workspace
					<img src="images/workspace.png" alt="workspace"/>
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
			<AnimationTrigger ref={ref}/>
		</div>
	)
}

export {
	WorkspaceFeature,
}