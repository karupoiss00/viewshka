import {ReviewAnswerEnum} from '@leards/api/generated'
import {SpaceRepetitionAPI} from '@leards/api/SpaceRepetitionAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {useStorageParams} from '@leards/components/screens/practice/space-repetition/hooks/useStorageParams'
import {repetitionActions} from '@leards/components/screens/practice/space-repetition/viewmodel/repetitionStateAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React, {useCallback} from 'react'
import styles from './Controls.module.css'

type ControlsProps = {
	cardId: string
}
function Controls({cardId}: ControlsProps) {
	const {storageType, storageId} = useStorageParams()
	const [user] = useAtom(userAtom)
	const handleSwitchToNextCard = useAction(repetitionActions.showNextCard)
	const handleFinishRepetition = useAction(repetitionActions.finishRepetition)
	const getMessage = useMessages()

	const reviewCard = useCallback(async (answer: ReviewAnswerEnum) => {
		await SpaceRepetitionAPI.get().reviewCard({
			userId: user.id,
			cardId,
			reviewAnswer: answer,
		})
		const response = await SpaceRepetitionAPI.get().getNextCard(
			user.id,
			storageType,
			storageId,
		)
		if (response.data) {
			handleSwitchToNextCard({
				card: response.data,
			})
		}
		else {
			handleFinishRepetition()
		}
	}, [cardId, handleFinishRepetition, handleSwitchToNextCard, storageId, storageType, user.id])

	return (
		<div className={styles.bottomPanel}>
			<Button
				className={styles.repeatButton}
				type="primary"
				size="large"
				onClick={() => reviewCard('repeat')}
			>
				<span>{getMessage('Practice.Flip.Button.Repeat')}</span>
			</Button>
			<Button
				className={styles.hardButton}
				type="primary"
				size="large"
				onClick={() => reviewCard('hard')}
			>
				<span>{getMessage('Practice.Flip.Button.Hard')}</span>
			</Button>
			<Button
				className={styles.goodButton}
				type="primary"
				size="large"
				onClick={() => reviewCard('good')}
			>
				<span>{getMessage('Practice.Flip.Button.Good')}</span>
			</Button>
			<Button
				className={styles.easyButton}
				type="primary"
				size="large"
				onClick={() => reviewCard('easy')}
			>
				<span>{getMessage('Practice.Flip.Button.Easy')}</span>
			</Button>
		</div>
	)
}

export default Controls