import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Button, SystemIconDeck, SystemIconFolder} from '@viewshka/uikit'
import React from 'react'
import {SelectedContentData} from '../../viewmodel/selection/Selection'
import {BottomPanel} from '../common/BottomPanel'
import {DeckViewer} from '../common/deck/DeckViewer'
import styles from './UserContent.module.css'

interface UserContentProps {
	selectedContent: SelectedContentData | null
}

function UserContent({selectedContent}: UserContentProps) {
	const getMessage = useMessages()
	const emptyState = !selectedContent || !selectedContent.deckId

	return (
		<div className={styles.container}>
			{emptyState && <EmptyUserContent />}
			{!emptyState && <DeckViewer readonly={false}/>}
			<BottomPanel>
				<Button
					type={'secondary'}
					size={'medium'}
					onClick={() => console.log('start')}
					state={emptyState ? 'disabled' : 'default'}
				>
					{getMessage('Button.Start.Train')}
				</Button>
			</BottomPanel>
		</div>
	)
}

function EmptyUserContent() {
	const getMessage = useMessages()

	return (
		<div className={styles.emptyContent}>
			<div className={styles.createButtonsContainer}>
				<Button type={'secondary'} size={'large'} onClick={() => console.log('create folder')}>
					{<SystemIconFolder/>}
					{getMessage('Button.Create.Folder')}
				</Button>
				<Button type={'secondary'} size={'large'} onClick={() => console.log('create deck')}>
					{<SystemIconDeck/>}
					{getMessage('Button.Create.Deck')}
				</Button>
			</div>
		</div>
	)
}

export {
	UserContent,
}