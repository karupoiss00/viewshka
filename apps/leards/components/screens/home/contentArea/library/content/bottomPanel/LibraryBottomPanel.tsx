import {BottomPanel} from '@leards/components/screens/home/contentArea/common/BottomPanel'
import {currentDeckAtom} from '@leards/components/screens/home/viewmodel/currentDeckAtom'
import {currentFolderAtom} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {SelectedContentData} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {goToFlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React, {useEffect, useState} from 'react'
import styles from './LibraryBottomPanel.module.css'

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
		['added-material', <TrainBottomPanel selectedContent={selectedContent} disabled={emptyState}/>],
		['new-material', <AddMaterialBottomPanel/>],
	])

	return (
		<BottomPanel>
			{mapStateToView.get(bottomPanelState)}
		</BottomPanel>
	)
}

interface TrainBottomPanelProps {
	selectedContent: SelectedContentData | null
	disabled: boolean
}
function TrainBottomPanel({disabled, selectedContent}: TrainBottomPanelProps) {
	const getMessage = useMessages()
	return (
		<Button
			type={'secondary'}
			size={'medium'}
			onClick={() => selectedContent && goToFlipPractice(selectedContent)}
			state={disabled ? 'disabled' : 'default'}
		>
			{getMessage('Button.Practice.Flip')}
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

export {
	LibraryBottomPanel,
}