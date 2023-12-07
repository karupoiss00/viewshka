import {Card} from '@leards/api/generated'
import {withI18n} from '@leards/components/providers/withI18n'
import {goToLanding} from '@leards/components/screens/landing/Landing'
import {CardData} from '@leards/components/screens/landing/screens/learning/cardEditor/CardEditor'
import {LOCAL_CARDS_STORAGE_KEY} from '@leards/components/screens/landing/screens/learning/Learning'
import {FlipPractice} from '@leards/components/screens/practice/flip/FlipPractice'
import {useEffect, useState} from 'react'

function TrialPracticePage() {
	return <FlipPractice loadCards={useLoadData}/>
}

function useLoadData(onMaterialNameLoad: (name: string) => void, onCardsLoad: (cards: Array<Card>) => void) {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const cardsStr = window?.localStorage.getItem(LOCAL_CARDS_STORAGE_KEY)

		if (!cardsStr) {
			goToLanding()
			return
		}

		const cards = JSON.parse(cardsStr) as Array<CardData>
		const remappedCards = cards.map((card, i) => ({
			id: `card${i}`,
			frontSide: card.word,
			backSide: card.translation,
		}))

		onMaterialNameLoad('Твоя первая колода')
		onCardsLoad(remappedCards)
		setLoading(false)
	}, [onCardsLoad, onMaterialNameLoad])

	return loading
}

export default withI18n(TrialPracticePage)