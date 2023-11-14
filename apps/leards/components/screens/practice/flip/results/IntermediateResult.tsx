import {ResultCard} from '@leards/components/screens/practice/flip/results/common/ResultCard'
import {practiceActions, practiceAtom} from '@leards/components/screens/practice/flip/viewmodel/practiceAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React from 'react'
import styles from './Results.module.css'

type IntermediateResultProps = {
	onExit: () => void
}
function IntermediateResult({onExit}: IntermediateResultProps) {
	const [practice] = useAtom(practiceAtom)
	const handleContinuePracticeAction = useAction(practiceActions.continuePractice)
	const getMessage = useMessages()

	if (practice.status !== 'intermediate-result') {
		return null
	}

	const {cardsLeft, cardsLearned} = practice

	return (
		<div className={styles.container}>
			<ResultCard>
				<div className={styles.header}>{getMessage('Practice.Flip.WantContinue')}</div>
				<Stats
					learnedCardsCount={cardsLearned}
					repeatCardsCount={cardsLeft}
				/>
				<ResultFooter
					onContinuePractice={() => handleContinuePracticeAction()}
					onExit={onExit}
				/>
			</ResultCard>
		</div>
	)
}

type StatsProps = {
	learnedCardsCount: number
	repeatCardsCount: number
}
function Stats({learnedCardsCount, repeatCardsCount}: StatsProps) {
	const getMessage = useMessages()
	return (
		<div className={styles.statsContainer}>
			<div className={styles.statRow}>
				<span>{getMessage('Practice.Flip.Stats.LearnedWords')}</span>
				<span>{learnedCardsCount}</span>
			</div>
			<div className={styles.statRow}>
				<span>{getMessage('Practice.Flip.Stats.RemainToLearn')}</span>
				<span>{repeatCardsCount}</span>
			</div>
		</div>
	)
}
type ResultFooterProps = {
	onExit: () => void
	onContinuePractice: () => void
}

function ResultFooter({onContinuePractice, onExit}: ResultFooterProps) {
	const getMessage = useMessages()
	return (
		<div className={styles.footer}>
			<Button
				type={'primary'}
				size={'medium'}
				onClick={onContinuePractice}
			>
				{getMessage('Practice.Flip.Button.Continue')}
			</Button>
			<Button
				type={'secondary'}
				size={'medium'}
				onClick={onExit}
			>
				{getMessage('Practice.Flip.Button.Exit')}
			</Button>
		</div>
	)
}

export {
	IntermediateResult,
}