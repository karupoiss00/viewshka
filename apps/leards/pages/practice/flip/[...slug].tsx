import {Card} from '@leards/api/generated'
import {privatePage} from '@leards/components/providers/privatePage'
import {goToHome} from '@leards/components/screens/home/Home'
import {StorageType} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {FlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {useCardsQuery} from '@leards/hooks/useCardsQuery'
import {useStorageNameQuery} from '@leards/hooks/useStorageNameQuery'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

function FlipPracticePage() {
	return <FlipPractice loadCards={useLoadData}/>
}

function useLoadData(onMaterialNameLoad: (name: string) => void, onCardsLoad: (cards: Array<Card>) => void) {
	const router = useRouter()
	const {slug} = router.query
	const storageType = slug[0] as StorageType
	const storageId = slug[1]

	const {cards, isLoading: isCardsLoading} = useCardsQuery(storageType, storageId)
	const {name, isLoading: isTitleLoading} = useStorageNameQuery(storageType, storageId)

	useEffect(() => {
		if (name) {
			onMaterialNameLoad(name)
		}
	}, [name, onMaterialNameLoad])

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


export default privatePage(FlipPracticePage)