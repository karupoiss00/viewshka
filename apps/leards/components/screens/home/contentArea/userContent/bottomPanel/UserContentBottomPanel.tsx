import {SpaceRepetitionAPI} from '@leards/api/SpaceRepetitionAPI'
import {StorageStats} from '@leards/components/common/storageStats/StorageStats'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {BottomPanel} from '@leards/components/screens/home/contentArea/common/BottomPanel'
import {currentDeckAtom} from '@leards/components/screens/home/viewmodel/currentDeckAtom'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {goToFlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {goToSpaceRepetition} from '@leards/components/screens/practice/space-repetition/SpaceRepetition'
import {repetitionActions} from '@leards/components/screens/practice/space-repetition/viewmodel/repetitionStateAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Button, Popup} from '@viewshka/uikit'
import React, {useEffect, useRef, useState} from 'react'
import {useQuery} from 'react-query'
import styles from './UserContentBottomPanel.module.css'

const SPACE_REPETITION_KEY = 'repetitionAvailable'

interface UserContentBottomPanelProps {
	storageType: StorageType,
	storageId: string,
}
function UserContentBottomPanel({storageType, storageId}: UserContentBottomPanelProps) {
	const getMessage = useMessages()
	const [currentDeck] = useAtom(currentDeckAtom)
	const currentDeckSize = currentDeck?.content?.length
	const canPractice = !!currentDeckSize
	const canStartSpaceRepetition = useSpaceRepetitionAvailable(storageId, storageType, currentDeckSize)
	const handleStartSpaceRepetition = useAction(repetitionActions.startRepetition)

	return (
		<BottomPanel>
			<Button
				type="secondary"
				size="medium"
				state={canPractice ? 'default' : 'disabled'}
				onClick={() => goToFlipPractice({
					storageId,
					storageType,
				})}
			>
				{getMessage('Button.Practice.Flip')}
			</Button>
			<Button
				type="secondary"
				size="medium"
				state={canStartSpaceRepetition ? 'default' : 'disabled'}
				onClick={() => {
					handleStartSpaceRepetition()
					goToSpaceRepetition({
						storageId,
						storageType,
					})
				}}
			>
				{getMessage('Button.Practice.SpaceRepetition')}
			</Button>
			{storageType === 'deck' && <StatsButton deckId={storageId} disabled={!currentDeckSize}/>}
		</BottomPanel>
	)
}

type StatsButtonProps = {
	deckId: string,
	disabled: boolean,
}

function StatsButton({deckId, disabled}: StatsButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const getMessage = useMessages()

	return (
		<>
			<Button
				type="secondary"
				size="medium"
				state={disabled ? 'disabled' : 'default'}
				ref={buttonRef}
			>
				{getMessage('Button.DeckStats')}
			</Button>
			<Popup triggerRef={buttonRef}>
				<Popup.Content className={styles.statsPopup}>
					<StorageStats storageType={'deck'} storageId={deckId} pieHole={0.4}/>
				</Popup.Content>
			</Popup>
		</>
	)
}

function useSpaceRepetitionAvailable(storageId: string, storageType: StorageType, currentDeckSize: number) {
	const [user] = useAtom(userAtom)
	const [available, setAvailable] = useState(false)

	const {data, status} = useQuery([SPACE_REPETITION_KEY, storageId, storageType, currentDeckSize], async () => {
		if (!currentDeckSize) {
			return false
		}

		try {
			const response = await SpaceRepetitionAPI.get().getNextCard(user.id, storageType, storageId)
			return !!response.data
		}
		catch {
			return false
		}
	}, {
		retryDelay: 1000,
	})

	useEffect(() => {
		setAvailable(status === 'success' && !!data)
	}, [data, status])

	return available
}

export {
	UserContentBottomPanel,
	SPACE_REPETITION_KEY,
}