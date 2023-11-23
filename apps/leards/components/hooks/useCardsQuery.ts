import {CardsAPI} from '@leards/api/CardsAPI'
import {Card} from '@leards/api/generated'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'

function useCardsQuery(folderId: string | null, deckId: string | null = null) {
	const [cards, setCards] = useState<Card[]>(() => [])
	const storageType = deckId ? 'deck' : 'folder'
	const storageId = deckId || folderId

	const {data, isSuccess, isLoading} = useQuery([
		'cards', folderId, deckId,
	], async () => {
		if (!folderId) {
			return []
		}

		const {data: storageData} = await CardsAPI.get().getStorageCards(
			storageType,
			storageId,
		)

		return storageData.cards
	}, {
		retry: false,
	})

	useEffect(() => {
		if (isSuccess) {
			setCards(data)
		}
	}, [data, isSuccess])

	return {cards, isLoading}
}

export {
	useCardsQuery,
}