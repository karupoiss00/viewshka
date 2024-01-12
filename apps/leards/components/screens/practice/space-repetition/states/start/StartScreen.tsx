import {Card} from '@leards/api/generated'
import {TrainingCard} from '@leards/components/screens/practice/common/trainingCard/TrainingCard'
import {repetitionActions} from '@leards/components/screens/practice/space-repetition/viewmodel/repetitionStateAtom'
import {useAction} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React from 'react'
import styles from './StartScreen.module.css'

type StartScreenProps = {
	firstCard: Card
}
function StartScreen({firstCard}: StartScreenProps) {
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
					Интервальные повторения — техника удержания в памяти, заключающаяся в повторении запомненного учебного материала по определённым, постоянно возрастающим интервалам.
				</div>
				<div className={styles.buttonContainer}>
					<Button type="primary" size="medium" onClick={start}>
						Начать
					</Button>
				</div>
			</TrainingCard>
		</div>
	)
}

export {
	StartScreen,
}