import {TrainingCard} from '@leards/components/screens/practice/common/trainingCard/TrainingCard'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Button} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React from 'react'
import styles from './FinishScreen.module.css'

function FinishScreen() {
	const router = useRouter()
	const getMessage = useMessages()

	return (
		<div className={styles.container}>
			<TrainingCard>
				<div className={styles.description}>
					{getMessage('SpaceRepetition.Finish.Description')}
				</div>
				<div className={styles.buttonContainer}>
					<Button type="primary" size="medium" onClick={() => router.back()}>
						{getMessage('SpaceRepetition.Button.Finish')}
					</Button>
				</div>
			</TrainingCard>
		</div>
	)
}

export {
	FinishScreen,
}