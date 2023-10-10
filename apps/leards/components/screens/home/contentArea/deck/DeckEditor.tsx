import {DecksAPI} from '@leards/api/DecksAPI'
import {HttputilsCard, HttputilsDeck} from '@leards/api/generated'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {useDebounce, useDidUpdateEffect} from '@viewshka/core'
import {useRouter} from 'next/router'
import React, {useEffect, useRef, useState} from 'react'
import {useMutation, useQuery} from 'react-query'
import {currentDeckActions, currentDeckAtom} from '../../viewmodel/currentDeckAtom'
import {selectedDeckIdAtom} from '../../viewmodel/selectionAtom'
import styles from './DeckEditor.module.css'

function DeckEditor() {
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [deck] = useAtom(currentDeckAtom)
	const debouncedDeck = useDebounce(deck, 1000)
	const {mutate: updateDeckRequest, isLoading} = useUpdateDeckMutation(debouncedDeck)

	useDidUpdateEffect(() => {
		if (!isLoading) {
			updateDeckRequest()
		}
	}, [debouncedDeck])

	useSelectedDeckQuery(selectedDeckId)

	return (
		<div className={styles.content}>
			<div className={styles.list}>
				<CardCreator/>
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
	const {cardId, frontSide, backSide} = card
	const [frontSideText, setFrontSideText] = useState(frontSide)
	const [backSideText, setBackSideText] = useState(backSide)
	const handleEditCardFrontSideAction = useAction(currentDeckActions.editCardFrontSide)
	const handleEditCardBackSideAction = useAction(currentDeckActions.editCardBackSide)
	const handleRemoveCardAction = useAction(currentDeckActions.removeCard)

	const onFrontEditorKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
		const removeCombinationPressed = e.key === 'Backspace' && e.ctrlKey
		if (removeCombinationPressed && !frontSideText.length) {
			handleRemoveCardAction({
				cardId,
			})
		}
	}

	return (
		<div className={styles.card}>
			<input
				className={styles.sideValueEditor}
				value={frontSideText}
				onKeyDown={onFrontEditorKeyDown}
				onChange={e => {
					handleEditCardFrontSideAction({
						cardId,
						frontSide: e.target.value,
					})
					setFrontSideText(e.target.value)
				}}
			/>
			<div className={styles.divider}></div>
			<input
				className={styles.sideValueEditor}
				value={backSideText}
				onChange={e => {
					handleEditCardBackSideAction({
						cardId,
						backSide: e.target.value,
					})
					setBackSideText(e.target.value)
				}}/>
		</div>
	)
}

function CardCreator() {
	const getMessage = useMessages()
	const [frontSideText, setFrontSideText] = useState('')
	const [backSideText, setBackSideText] = useState('')
	const handleAddCardFrontAction = useAction(currentDeckActions.addCard)
	const frontSideEditorRef = useRef<HTMLInputElement>()

	const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
		if (e.key === 'Enter' && frontSideText && backSideText) {
			handleAddCardFrontAction({
				frontSide: frontSideText,
				backSide: backSideText,
			})
			setFrontSideText('')
			setBackSideText('')
			frontSideEditorRef.current.focus()
		}
	}
	const onChangeWord: React.ChangeEventHandler<HTMLInputElement> = e => {
		setFrontSideText(e.target.value)
	}
	const onChangeTranslation: React.ChangeEventHandler<HTMLInputElement> = e => {
		setBackSideText(e.target.value)
	}

	return (
		<div className={styles.cardCreator} onKeyDown={onKeyDown}>
			<input
				className={styles.sideValueEditor}
				value={frontSideText}
				placeholder={getMessage('ContentArea.CardCreator.WordPlaceholder')}
				onChange={onChangeWord}
				ref={frontSideEditorRef}
			/>
			<div className={styles.divider}></div>
			<input
				className={styles.sideValueEditor}
				value={backSideText}
				placeholder={getMessage('ContentArea.CardCreator.TranslationPlaceholder')}
				onChange={onChangeTranslation}/>
		</div>
	)
}


function useSelectedDeckQuery(deckId: string | null) {
	const router = useRouter()
	const handleSetCurrentDeckAction = useAction(currentDeckActions.set)

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

function useUpdateDeckMutation(deck: HttputilsDeck) {
	return useMutation('updateDeck', async () => {
		const response = await DecksAPI.get().decksIdPut(deck.deckId, deck)
		return response.data
	})
}

export {
	DeckEditor,
}