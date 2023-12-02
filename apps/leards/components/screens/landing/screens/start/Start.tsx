import {LeardsLogo} from '@leards/components/common/Logo'
import {Button} from '@viewshka/uikit'
import React from 'react'
import {Card} from '../../common/card/Card'
import styles from './Start.module.css'

function Start({onGoLearn}: {
	onGoLearn: () => void,
}) {
	return (
		<div className={styles.layout}>
			<Card size="large">
				<LeardsLogo className={styles.logo}/>
			</Card>
			<Button type="primary" size="large" onClick={onGoLearn}>
				<span className={styles.startButtonText}>
					Создай свою колоду
				</span>
			</Button>
		</div>
	)
}

export default Start