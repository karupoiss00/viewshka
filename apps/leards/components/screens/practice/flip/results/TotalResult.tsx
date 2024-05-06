import {TrainingCard} from '@leards/components/screens/practice/common/trainingCard/TrainingCard'
import {cardsAtom} from '@leards/components/screens/practice/flip/viewmodel/cardsAtom'
import {practiceActions} from '@leards/components/screens/practice/flip/viewmodel/practiceAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React, {useCallback} from 'react'
import styles from './Results.module.css'

type TotalResultProps = {
	onExit: () => void
}
function TotalResult({onExit}: TotalResultProps) {
	const [allCards] = useAtom(cardsAtom)
	const handleRestartPractice = useAction(practiceActions.start)
	const getMessage = useMessages()
	const onRestart = useCallback(() => handleRestartPractice({
		cards: allCards,
	}), [allCards, handleRestartPractice])

	return (
		<div className={styles.container}>
			<TrainingCard>
				<div className={styles.header}>
					{getMessage('Practice.Flip.PracticeFinished')}
				</div>
				<ResultFooter
					onRestart={onRestart}
					onExit={onExit}
				/>
			</TrainingCard>
		</div>
	)
}

type ResultFooterProps = {
	onExit: () => void
	onRestart: () => void
}
function ResultFooter({onRestart, onExit}: ResultFooterProps) {
	const getMessage = useMessages()
	return (
		<div className={styles.footer}>
			<Button
				type="primary"
				size="medium"
				onClick={onExit}
			>
				{getMessage('Practice.Flip.Button.Exit')}
			</Button>
			<Button
				type="secondary"
				size="medium"
				onClick={onRestart}
			>
				{getMessage('Practice.Flip.Button.Restart')}
			</Button>
		</div>
	)
}

export {
	TotalResult,
}