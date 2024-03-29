import {CardsAPI} from '@leards/api/CardsAPI'
import {DecksAPI} from '@leards/api/DecksAPI'
import {Deck} from '@leards/api/generated'
import {CARDS_QUERY_KEY} from '@leards/hooks/useCardsQuery'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {useDebounce, useDidUpdateEffect} from '@viewshka/core'
import {Button, SystemIconEnterKey} from '@viewshka/uikit'
import classnames from 'classnames'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {currentDeckActions, currentDeckAtom} from '../../../viewmodel/currentDeckAtom'
import {CardList} from './CardList'
import styles from './DeckViewer.module.css'

interface DeckViewerProps {
	deckId: string,
	readonly: boolean
}
function DeckViewer({deckId, readonly}: DeckViewerProps) {
	const [deck] = useAtom(currentDeckAtom)
	const debouncedDeck = useDebounce(deck, 1000)
	const {mutate: updateDeckRequest, isLoading} = useUpdateDeckMutation()

	useDidUpdateEffect(() => {
		if (!readonly && !isLoading) {
			updateDeckRequest(debouncedDeck)
		}
	}, [debouncedDeck])

	useSelectedDeckQuery(deckId)

	return (
		<div className={styles.content}>
			<div className={styles.list}>
				{!readonly && <CardCreator />}
				{deck?.content && <CardList deck={deck} readonly={readonly} />}
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

	const addCard = useCallback(() => {
		if (frontSideText && backSideText) {
			handleAddCardFrontAction({
				frontSide: frontSideText,
				backSide: backSideText,
			})
			setFrontSideText('')
			setBackSideText('')
			frontSideEditorRef.current.focus()
		}
	}, [backSideText, frontSideText, handleAddCardFrontAction])

	const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
		if (e.key === 'Enter') {
			addCard()
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
			{
				<div
					className={classnames(styles.enterIcon, {
						[styles.enterIconHidden]: !frontSideText || !backSideText,
					})}
				>
					<Button
						type="link"
						size="medium"
						onClick={addCard}
					>
						<SystemIconEnterKey/>
					</Button>
				</div>
			}
			{

			}
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

		const response = await DecksAPI.get().getDeckById(deckId)
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

function useUpdateDeckMutation() {
	const queryClient = useQueryClient()
	const handleUpdateCardsAction = useAction(currentDeckActions.updateCards)

	return useMutation('updateDeck', async (deck: Deck) => {
		const cards = deck.content
		if (!cards) {
			return
		}
		await CardsAPI.get().syncCardsByDeckId(deck.deckId, {
			cards,
		})

		const updatedDeckDataResponse = await CardsAPI.get().getStorageCards('deck', deck.deckId)
		handleUpdateCardsAction({
			cards: updatedDeckDataResponse.data.cards,
		})

		await queryClient.invalidateQueries({
			queryKey: [CARDS_QUERY_KEY],
		})
	})
}

export {
	DeckViewer,
}