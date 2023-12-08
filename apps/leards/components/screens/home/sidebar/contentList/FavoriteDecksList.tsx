import {LibraryAPI} from '@leards/api/LibraryAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {favoritesAtom} from '@leards/components/screens/home/contentArea/library/viewmodel/favoritesAtom'
import {ContentList} from '@leards/components/screens/home/sidebar/contentList/common/ContentList'
import {selectedDeckIdAtom, selectionActions} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useAction, useAtom} from '@reatom/npm-react'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useQuery} from 'react-query'
import {useSetSelectedStorageParam} from '../../hooks/useLoadSelectionParams'

const FAVORITE_DECKS_QUERY_KEY = 'sidebar-favorites'

function FavoriteDecksList() {
	const [user] = useAtom(userAtom)
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [favorites] = useAtom(favoritesAtom)
	const setStorageQueryParam = useSetSelectedStorageParam()
	const handleSelectFolderAction = useAction(selectionActions.selectDeck)


	useFavoritesQuery(user.id)

	const setSelection = (id: string) => {
		setStorageQueryParam('deck', id)
		handleSelectFolderAction({
			deckId: id,
		})
	}

	return (
		<ContentList
			onItemSelect={setSelection}
			selectedItem={selectedDeckId}
			content={favorites}
			editable={false}
		/>
	)
}

function useFavoritesQuery(userId: string) {
	const router = useRouter()
	const [, setFavorites] = useAtom(favoritesAtom)
	const queryKey = [FAVORITE_DECKS_QUERY_KEY]
	const {isError, isSuccess, data} = useQuery(queryKey, async () => {
		const api = LibraryAPI.get()
		const {data} = await api.getFavoriteStorages(userId)

		return data.favoriteStorages
	}, {
		retry: false,
	})

	useEffect(() => {
		if (isSuccess) {
			setFavorites(data)
		}

		if (isError) {
			router.replace('/home')
		}
	}, [data, isError, isSuccess, router, setFavorites])
}

export {
	FavoriteDecksList,
}