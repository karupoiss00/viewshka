import {ResultCard} from '@leards/components/screens/practice/flip/results/common/ResultCard'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Button} from '@viewshka/uikit'
import React from 'react'
import styles from './Results.module.css'

type TotalResultProps = {
	onExit: () => void
	onRestart: () => void
}
function TotalResult({onExit, onRestart}: TotalResultProps) {
	const getMessage = useMessages()
	return (
		<div className={styles.container}>
			<ResultCard>
				<div className={styles.header}>
					{getMessage('Practice.Flip.PracticeFinished')}
				</div>
				<ResultFooter
					onRestart={onRestart}
					onExit={onExit}
				/>
			</ResultCard>
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
				type={'primary'}
				size={'medium'}
				onClick={onExit}
			>
				{getMessage('Practice.Flip.Button.Exit')}
			</Button>
			<Button
				type={'secondary'}
				size={'medium'}
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