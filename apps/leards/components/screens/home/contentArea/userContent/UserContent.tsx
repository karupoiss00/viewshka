import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {Button, SystemIconDeck, SystemIconFolder} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {SELECTED_FOLDER_QUERY_KEY} from '../../sidebar/Sidebar'
import {SelectedContentData} from '../../viewmodel/selection/Selection'
import {selectedFolderIdAtom} from '../../viewmodel/selectionAtom'
import {BottomPanel} from '../common/BottomPanel'
import {DeckViewer} from '../common/deck/DeckViewer'
import styles from './UserContent.module.css'

interface UserContentProps {
	selectedContent: SelectedContentData | null
}

function UserContent({selectedContent}: UserContentProps) {
	const router = useRouter()
	const getMessage = useMessages()
	const [{rootFolderId}] = useAtom(userAtom)
	const hasContent = !!selectedContent?.deckId
	const canPractice = selectedContent && (selectedContent.deckId || selectedContent.folderId !== rootFolderId)

	return (
		<div className={styles.container}>
			{!hasContent && <EmptyUserContent/>}
			{hasContent && <DeckViewer readonly={false}/>}
			{canPractice && <BottomPanel>
				<Button
					type={'secondary'}
					size={'medium'}
					onClick={() => {
						router.push(
                `/practice/flip/${selectedContent.folderId}/${selectedContent.deckId}`,
						)
					}}
				>
					{getMessage('Button.Practice.Flip')}
				</Button>
				<Button
					type={'secondary'}
					size={'medium'}
					onClick={() => {
						router.push(
                `/practice/spacerepetition/${selectedContent.folderId}/${selectedContent.deckId}`,
						)
					}}
				>
					{getMessage('Button.Practice.SpaceRepetition')}
				</Button>
			</BottomPanel>}
		</div>
	)
}

function EmptyUserContent() {
	const getMessage = useMessages()
	const {mutate: createDeck} = useDeckCreateMutation()
	const {mutate: createFolder} = useFolderCreateMutation()

	return (
		<div className={styles.emptyContent}>
			<div className={styles.createButtonsContainer}>
				<Button type={'secondary'} size={'large'} onClick={() => createFolder()}>
					{<SystemIconFolder/>}
					{getMessage('Button.Create.Folder')}
				</Button>
				<Button type={'secondary'} size={'large'} onClick={() => createDeck()}>
					{<SystemIconDeck/>}
					{getMessage('Button.Create.Deck')}
				</Button>
			</div>
		</div>
	)
}

function useDeckCreateMutation() {
	const queryClient = useQueryClient()
	const getMessage = useMessages()
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)

	return useMutation(async () => {
		await DecksAPI.get().createNewDeck(selectedFolderId, {
			name: getMessage('Deck.DefaultName'),
			parentFolderId: selectedFolderId,
		})
		await queryClient.invalidateQueries({
			queryKey: [SELECTED_FOLDER_QUERY_KEY],
		})
	})
}

function useFolderCreateMutation() {
	const queryClient = useQueryClient()
	const getMessage = useMessages()
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)

	return useMutation(async () => {
		await FoldersAPI.get().createNewFolder({
			name: getMessage('Folder.DefaultName'),
			parentFolderId: selectedFolderId,
		})
		await queryClient.invalidateQueries({
			queryKey: [SELECTED_FOLDER_QUERY_KEY],
		})
	})
}

export {
	UserContent,
}