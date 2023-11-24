import {Content} from '@leards/api/generated'
import {LibraryAPI} from '@leards/api/LibraryAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {ContentList} from '@leards/components/screens/home/sidebar/contentList/common/ContentList'
import {useAtom} from '@reatom/npm-react'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'

const FAVORITE_DECKS_QUERY_KEY = 'sidebar-favorites'

function FavoriteDecksList() {
	const [user] = useAtom(userAtom)
	const favoriteDecks = useFavoritesQuery(user.id)

	return (
		<ContentList
			onItemSelect={() => {}}
			selectedItem={null}
			content={favoriteDecks}
			editable={false}
		/>
	)
}

function useFavoritesQuery(userId: string) {
	const router = useRouter()
	const [decks, setDecks] = useState<Content[]>([])
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
			setDecks(data)
		}

		if (isError) {
			router.replace('/home')
		}
	}, [data, isError, isSuccess, router])

	return decks
}

export {
	FavoriteDecksList,
}