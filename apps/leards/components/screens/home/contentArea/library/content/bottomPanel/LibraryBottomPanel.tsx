import {DecksAPI} from '@leards/api/DecksAPI'
import {LibraryAPI} from '@leards/api/LibraryAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {BottomPanel} from '@leards/components/screens/home/contentArea/common/BottomPanel'
import {favoritesAtom} from '@leards/components/screens/home/contentArea/library/viewmodel/favoritesAtom'
import {currentDeckAtom} from '@leards/components/screens/home/viewmodel/currentDeckAtom'
import {SelectedStorageData} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {goToFlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {Button} from '@viewshka/uikit'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
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
			type="secondary"
			size="medium"
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
	const [deck] = useAtom(currentDeckAtom)
	const {mutate: addToFavorites} = useAddToFavoriteMutation()
	const {mutate: copyToRoot} = useCopyDeckMutation()
	if (!deck) {
		return null
	}

	return (
		<div className={styles.addMaterialBottomPanel}>
			<Button
				type="secondary"
				size="medium"
				onClick={() => addToFavorites(deck.deckId)}
			>
				{getMessage('Button.Add.Material')}
			</Button>
			<Button
				type="secondary"
				size="medium"
				onClick={() => copyToRoot(deck.deckId)}
			>
				{getMessage('Button.Copy.Material')}
			</Button>
		</div>
	)
}

function useAddToFavoriteMutation() {
	const [user] = useAtom(userAtom)
	const [, setFavorites] = useAtom(favoritesAtom)

	return useMutation(async (deckId: string) => {
		if (!user) {
			return
		}
		const api = LibraryAPI.get()
		await api.addStorageToFavorite(user.id, 'deck', deckId)
		const {data} = await api.getFavoriteStorages(user.id)
		setFavorites([...data.favoriteStorages])
	})
}

function useCopyDeckMutation() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const [user] = useAtom(userAtom)

	return useMutation(async (deckId: string) => {
		if (!user) {
			return
		}
		const api = DecksAPI.get()
		const {data} = await api.cloneDeckById({
			userId: user.id,
			deckId,
			parentFolderId: user.rootFolderId,
		})

		await queryClient.refetchQueries(['sidebar-folder-content'])

		console.log(data.deck.content)

		router.push(`/home?section=user-content&storageType=deck&storageId=${data.deck.deckId}`)
	})
}

export {
	LibraryBottomPanel,
}