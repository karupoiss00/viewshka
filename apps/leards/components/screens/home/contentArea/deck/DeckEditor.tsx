import {DecksAPI} from '@leards/api/DecksAPI'
import {HttputilsCard} from '@leards/api/generated'
import {useAction, useAtom} from '@reatom/npm-react'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useQuery} from 'react-query'
import {currentDeckAtom, setCurrentDeckAction} from '../../viewmodel/currentDeckAtom'
import {selectedDeckIdAtom} from '../../viewmodel/selectionAtom'
import styles from './DeckEditor.module.css'

function DeckEditor() {
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [deck] = useAtom(currentDeckAtom)

	useSelectedDeckQuery(selectedDeckId)

	return (
		<div className={styles.content}>
			<div className={styles.list}>
				{deck?.content.map(card => (
					<Card card={card} key={card.cardId}/>
				))}
			</div>
		</div>
	)
}

type CardProps = {
	card: HttputilsCard
}
function Card({card}: CardProps) {
	return (
		<div className={styles.card}>
			<input className={styles.sideValueEditor} value={card.frontSide}/>
			<div className={styles.divider}></div>
			<input className={styles.sideValueEditor} value={card.backSide}/>
		</div>
	)
}

function useSelectedDeckQuery(deckId: string | null) {
	const router = useRouter()
	const handleSetCurrentDeckAction = useAction(setCurrentDeckAction)

	const {isError, isSuccess, data} = useQuery(`deckId:${deckId}`, async () => {
		if (!deckId) {
			return null
		}

		const response = await DecksAPI.get().decksIdGet(deckId)
		return response.data.deck
	}, {
		retry: false,
	})

	useEffect(() => {
		if (isError) {
			router.replace('/home')
		}

		if (isSuccess) {
			handleSetCurrentDeckAction({
				deck: data,
			})
		}
	}, [data, handleSetCurrentDeckAction, isError, isSuccess, router])
}

export {
	DeckEditor,
}