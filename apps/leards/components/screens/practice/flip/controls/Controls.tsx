import {practiceActions} from '@leards/components/screens/practice/flip/viewmodel/practiceAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React from 'react'
import styles from './Controls.module.css'

function Controls() {
	const getMessage = useMessages()
	const handleNextCard = useAction(practiceActions.nextCard)
	return (
		<div className={styles.controlsContainer}>
			<Button
				className={styles.repeatButton}
				type={'primary'}
				size={'large'}
				onClick={() => handleNextCard({
					repeatCard: true,
				})}
			>
				<span>{getMessage('Practice.Flip.Button.Repeat')}</span>
			</Button>
			<Button
				className={styles.easyButton}
				type={'primary'}
				size={'large'}
				onClick={() => handleNextCard({
					repeatCard: false,
				})}
			>
				<span>{getMessage('Practice.Flip.Button.Easy')}</span>
			</Button>
		</div>
	)
}

export default Controls