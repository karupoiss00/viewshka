import {Card} from '@leards/api/generated'
import {TrainingCard} from '@leards/components/screens/practice/common/trainingCard/TrainingCard'
import {repetitionActions} from '@leards/components/screens/practice/space-repetition/viewmodel/repetitionStateAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React from 'react'
import styles from './StartScreen.module.css'

type StartScreenProps = {
	firstCard: Card
}
function StartScreen({firstCard}: StartScreenProps) {
	const getMessage = useMessages()
	const handleStartRepetitionAction = useAction(repetitionActions.showNextCard)
	const start = () => {
		handleStartRepetitionAction({
			card: firstCard,
		})
	}

	return (
		<div className={styles.container}>
			<TrainingCard>
				<div className={styles.description}>
					{getMessage('SpaceRepetition.Description')}
				</div>
				<div className={styles.buttonContainer}>
					<Button type="primary" size="medium" onClick={start}>
						{getMessage('SpaceRepetition.Button.Start')}
					</Button>
				</div>
			</TrainingCard>
		</div>
	)
}

export {
	StartScreen,
}