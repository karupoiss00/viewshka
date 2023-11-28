import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {
	UserContentBottomPanel,
} from '@leards/components/screens/home/contentArea/userContent/bottomPanel/UserContentBottomPanel'
import {SELECTED_FOLDER_QUERY_KEY} from '@leards/components/screens/home/sidebar/contentList/UserContentList'
import {SelectedStorageData} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {Button, SystemIconDeck, SystemIconFolder} from '@viewshka/uikit'
import React from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {selectedFolderIdAtom} from '../../viewmodel/selectionAtom'
import {DeckViewer} from '../common/deck/DeckViewer'
import styles from './UserContent.module.css'


type UserContentProps = {
	selectedContent: SelectedStorageData | null
}
function UserContent({selectedContent}: UserContentProps) {
	const storageType = selectedContent?.type
	const storageId = selectedContent?.id
	const [{rootFolderId}] = useAtom(userAtom)
	const showBottomPanel = !!selectedContent && storageId !== rootFolderId

	return (
		<div className={styles.container}>
			{
				storageType === 'deck'
					? <DeckViewer deckId={storageId} readonly={false}/>
					: <EmptyUserContent/>
			}
			{showBottomPanel && <UserContentBottomPanel storageType={storageType} storageId={storageId}/>}
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
	const [user] = useAtom(userAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)

	return useMutation(async () => {
		await DecksAPI.get().createNewDeck(selectedFolderId, {
			parentFolderId: selectedFolderId,
			name: getMessage('Deck.DefaultName'),
			userId: user.id,
		})
		await queryClient.invalidateQueries({
			queryKey: [SELECTED_FOLDER_QUERY_KEY],
		})
	})
}

function useFolderCreateMutation() {
	const queryClient = useQueryClient()
	const getMessage = useMessages()
	const [user] = useAtom(userAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)

	return useMutation(async () => {
		await FoldersAPI.get().createNewFolder({
			name: getMessage('Folder.DefaultName'),
			parentFolderId: selectedFolderId,
			userId: user.id,
		})
		await queryClient.invalidateQueries({
			queryKey: [SELECTED_FOLDER_QUERY_KEY],
		})
	})
}

export {
	UserContent,
}