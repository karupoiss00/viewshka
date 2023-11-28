import {CardsAPI} from '@leards/api/CardsAPI'
import {Card} from '@leards/api/generated'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'

const CARDS_QUERY_KEY = 'cards'

function useCardsQuery(storageType: StorageType, storageId: string) {
	const [cards, setCards] = useState<Card[]>(() => [])
	const {data, isSuccess, isLoading} = useQuery([
		CARDS_QUERY_KEY, storageType, storageId,
	], async () => {

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
	CARDS_QUERY_KEY,
}