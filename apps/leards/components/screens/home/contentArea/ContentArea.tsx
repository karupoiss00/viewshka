import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {PropsWithClassname} from '@viewshka/core'
import {Button, SystemIconDeck, SystemIconFolder, SystemIconShare} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren, useEffect, useState} from 'react'
import {currentFolderAtom} from '../viewmodel/currentFolderAtom'
import {SelectedContentData} from '../viewmodel/selection/Selection'
import {selectionAtom} from '../viewmodel/selectionAtom'
import styles from './ContentArea.module.css'
import {DeckViewer} from './deck/DeckViewer'

function ContentArea({className}: PropsWithClassname) {
	const [selection] = useAtom(selectionAtom)

	return (
		<div className={classnames(styles.contentArea, className)}>
			{selection.type === 'user-content' && <UserContent selectedContent={selection.content}/>}
			{selection.type === 'library' && <LibraryContent selectedContent={selection.content}/>}
		</div>
	)
}

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

function BottomPanel({children}: PropsWithChildren) {
	return <div className={styles.bottomPanel}>{children}</div>
}

interface LibraryContentProps {
	selectedContent: SelectedContentData | null
}
function LibraryContent({selectedContent}: LibraryContentProps) {
	const emptyState = !selectedContent || !selectedContent.deckId
	return (
		<div className={styles.container}>
			{!emptyState && <DeckViewer readonly={true}/>}
			<LibraryBottomPanel selectedContent={selectedContent}/>
		</div>
	)
}

interface LibraryBottomPanelProps {
	selectedContent: SelectedContentData | null
}
function LibraryBottomPanel({selectedContent}: LibraryBottomPanelProps) {
	const [bottomPanelState, setBottomPanelState] = useState<'added-material'|'new-material'>(null)
	const [{content}] = useAtom(currentFolderAtom)
	const emptyState = !selectedContent || !selectedContent.deckId

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
				{getMessage('Button.Add.Copy')}
			</Button>
		</div>
	)
}

export default ContentArea