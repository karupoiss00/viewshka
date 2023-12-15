import {BottomPanel} from '@leards/components/screens/home/contentArea/common/BottomPanel'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {goToFlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {useCardsQuery} from '@leards/hooks/useCardsQuery'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Button} from '@viewshka/uikit'
import React from 'react'

interface UserContentBottomPanelProps {
	storageType: StorageType,
	storageId: string,
}
function UserContentBottomPanel({storageType, storageId}: UserContentBottomPanelProps) {
	const getMessage = useMessages()
	const {cards} = useCardsQuery(storageType, storageId)
	const canPractice = !!cards.length

	return (
		<BottomPanel>
			<Button
				type="secondary"
				size="medium"
				state={canPractice ? 'default' : 'disabled'}
				onClick={() => {
					goToFlipPractice({
						storageId,
						storageType,
					})
				}}
			>
				{getMessage('Button.Practice.Flip')}
			</Button>
			<Button
				type="secondary"
				size="medium"
				state={canPractice ? 'default' : 'disabled'}
				onClick={() => {}}
			>
				{getMessage('Button.Practice.SpaceRepetition')}
			</Button>
		</BottomPanel>
	)
}

export {
	UserContentBottomPanel,
}