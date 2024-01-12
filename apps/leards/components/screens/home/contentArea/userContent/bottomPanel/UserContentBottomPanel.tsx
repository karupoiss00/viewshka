import {SpaceRepetitionAPI} from '@leards/api/SpaceRepetitionAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {BottomPanel} from '@leards/components/screens/home/contentArea/common/BottomPanel'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {goToFlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {goToSpaceRepetition} from '@leards/components/screens/practice/space-repetition/SpaceRepetition'
import {useCardsQuery} from '@leards/hooks/useCardsQuery'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'

interface UserContentBottomPanelProps {
	storageType: StorageType,
	storageId: string,
}
function UserContentBottomPanel({storageType, storageId}: UserContentBottomPanelProps) {
	const getMessage = useMessages()
	const {cards} = useCardsQuery(storageType, storageId)
	const canPractice = !!cards.length
	const canStartSpaceRepetition = useSpaceRepetitionAvailable(storageId, storageType)

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
				onClick={() => goToSpaceRepetition({
					storageId,
					storageType,
				})}
			>
				{getMessage('Button.Practice.SpaceRepetition')}
			</Button>
		</BottomPanel>
	)
}

function useSpaceRepetitionAvailable(storageId: string, storageType: string) {
	const [user] = useAtom(userAtom)
	const [available, setAvailable] = useState(false)

	const {data, status} = useQuery(['repetitionAvailable', storageId, storageType], async () => {
		const response = await SpaceRepetitionAPI.get().getNextCard(user.id, storageType, storageId)
		return !!response.data.card
	})

	useEffect(() => {
		if (status === 'success') {
			setAvailable(data)
		}
	}, [data, status])

	return available
}

export {
	UserContentBottomPanel,
}