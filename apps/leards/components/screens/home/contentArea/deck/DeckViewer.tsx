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
import {CardList} from './CardList'
import styles from './DeckViewer.module.css'

interface DeckViewerProps {
	readonly: boolean
}
function DeckViewer({readonly}: DeckViewerProps) {
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
				{!readonly && <CardCreator />}
				{deck && <CardList deck={deck} readonly={readonly} />}
			</div>
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
	DeckViewer,
}