import {BottomPanel} from '@leards/components/screens/home/contentArea/common/BottomPanel'
import {favoritesAtom} from '@leards/components/screens/home/contentArea/library/viewmodel/favoritesAtom'
import {currentDeckAtom} from '@leards/components/screens/home/viewmodel/currentDeckAtom'
import {SelectedStorageData} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {goToFlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import React, {useEffect, useState} from 'react'
import styles from './LibraryBottomPanel.module.css'

interface LibraryBottomPanelProps {
	selectedContent: SelectedStorageData
}
function LibraryBottomPanel({selectedContent}: LibraryBottomPanelProps) {
	const [bottomPanelState, setBottomPanelState] = useState<'added-material'|'new-material'>('added-material')
	const [favorites] = useAtom(favoritesAtom)
	const [deck] = useAtom(currentDeckAtom)
	const emptyState = !deck || !deck.content?.length

	useEffect(() => {
		if (selectedContent?.id) {
			setBottomPanelState(
				favorites.find(m => m.id === selectedContent.id)
					? 'added-material'
					: 'new-material',
			)
		}
	}, [favorites, selectedContent])

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
	selectedContent: SelectedStorageData | null
	disabled: boolean
}
function TrainBottomPanel({disabled, selectedContent}: TrainBottomPanelProps) {
	const getMessage = useMessages()
	return (
		<Button
			type={'secondary'}
			size={'medium'}
			onClick={() => selectedContent && goToFlipPractice({
				storageType: selectedContent.type,
				storageId: selectedContent.id,
			})}
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