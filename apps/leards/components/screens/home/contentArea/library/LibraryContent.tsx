import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React, {useEffect, useState} from 'react'
import {currentDeckAtom} from '../../viewmodel/currentDeckAtom'
import {currentFolderAtom} from '../../viewmodel/currentFolderAtom'
import {SelectedContentData} from '../../viewmodel/selection/Selection'
import {BottomPanel} from '../common/BottomPanel'
import {DeckViewer} from '../common/deck/DeckViewer'
import styles from './LibraryContent.module.css'

interface LibraryContentProps {
	selectedContent: SelectedContentData | null
}
function LibraryContent({selectedContent}: LibraryContentProps) {
	const deckOpened = selectedContent && selectedContent.deckId
	return (
		<div className={styles.container}>
			{
				deckOpened
					? <DeckViewer readonly={true}/>
					: <SearchResult/>
			}
			<LibraryBottomPanel selectedContent={selectedContent}/>
		</div>
	)
}

interface LibraryBottomPanelProps {
	selectedContent: SelectedContentData | null
}
function LibraryBottomPanel({selectedContent}: LibraryBottomPanelProps) {
	const [bottomPanelState, setBottomPanelState] = useState<'added-material'|'new-material'>('added-material')
	const [{content}] = useAtom(currentFolderAtom)
	const [deck] = useAtom(currentDeckAtom)
	const emptyState = !deck || !deck.content?.length

	useEffect(() => {
		if (selectedContent?.deckId) {
			setBottomPanelState(
				content.find(m => m.id === selectedContent.deckId)
					? 'added-material'
					: 'new-material',
			)
		}
	}, [content, selectedContent])

	const mapStateToView = new Map([
		['added-material', <TrainBottomPanel disabled={emptyState}/>],
		['new-material', <AddMaterialBottomPanel/>],
	])

	return (
		<BottomPanel>
			{mapStateToView.get(bottomPanelState)}
		</BottomPanel>
	)
}

interface TrainBottomPanelProps {
	disabled: boolean
}
function TrainBottomPanel({disabled}: TrainBottomPanelProps) {
	const getMessage = useMessages()
	return (
		<Button
			type={'secondary'}
			size={'medium'}
			onClick={() => console.log('start')}
			state={disabled ? 'disabled' : 'default'}
		>
			{getMessage('Button.Start.Train')}
		</Button>
	)
}

function AddMaterialBottomPanel() {
	const getMessage = useMessages()

	return (
		<div className={styles.addMaterialBottomPanel}>
			<Button
				type={'secondary'}
				size={'medium'}
				onClick={() => console.log('add')}
			>
				{getMessage('Button.Add.Material')}
			</Button>
			<Button
				type={'secondary'}
				size={'medium'}
				onClick={() => console.log('copy')}
			>
				{getMessage('Button.Copy.Material')}
			</Button>
		</div>
	)
}

function SearchResult() {
	return (
		<div>

		</div>
	)
}

export {
	LibraryContent,
}