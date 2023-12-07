import {DecksAPI} from '@leards/api/DecksAPI'
import {FoldersAPI} from '@leards/api/FoldersAPI'
import {Card} from '@leards/api/generated'
import {privatePage} from '@leards/components/providers/privatePage'
import {goToHome} from '@leards/components/screens/home/Home'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {FlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {useCardsQuery} from '@leards/hooks/useCardsQuery'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'

function FlipPracticePage() {
	return <FlipPractice loadCards={useLoadData}/>
}

function useLoadData(onMaterialNameLoad: (name: string) => void, onCardsLoad: (cards: Array<Card>) => void) {
	const router = useRouter()
	const {slug} = router.query
	const storageType = slug[0] as StorageType
	const storageId = slug[1]

	const {cards, isLoading: isCardsLoading}
		= useCardsQuery(storageType, storageId)
	const {title, isLoading: isTitleLoading} = useTitleQuery(storageType, storageId)

	useEffect(() => {
		if (title) {
			onMaterialNameLoad(title)
		}
	}, [title, onMaterialNameLoad])

	useEffect(() => {
		if (!cards) {
			goToHome()
			return
		}

		if (cards.length) {
			onCardsLoad(cards)
		}
	}, [cards, onCardsLoad, router])

	return isTitleLoading || isCardsLoading
}

function useTitleQuery(storageType: string, storageId: string) {
	const [title, setTitle] = useState('')

	const {data, isSuccess, isLoading} = useQuery([
		'practice-title', storageType, storageId,
	], async () => {
		const storage = storageType === 'folder'
			? (await FoldersAPI.get().getFolderById(storageId)).data.folder
			: (await DecksAPI.get().getDeckById(storageId)).data.deck

		return storage.name
	}, {
		retry: false,
	})

	useEffect(() => {
		if (isSuccess) {
			setTitle(data)
		}
	}, [data, isSuccess])

	return {title, isLoading}
}


export default privatePage(FlipPracticePage)