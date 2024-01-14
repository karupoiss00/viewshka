import {CardsAPI} from '@leards/api/CardsAPI'
import {DecksAPI} from '@leards/api/DecksAPI'
import {QuizletScraberAPI} from '@leards/api/QuizletScraberAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {currentFolderActions} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {selectedFolderIdAtom, selectionActions} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Button, TextField} from '@viewshka/uikit'
import React, {useCallback, useState} from 'react'
import {useMutation} from 'react-query'
import styles from './QuizletImportPopup.module.css'


type QuizletImportPopupProps = {
	onImportComplete: () => void
}
function QuizletImportPopup({onImportComplete}: QuizletImportPopupProps) {
	const getMessage = useMessages()
	const [url, setUrl] = useState('')
	const {mutate: importDeck, isLoading} = useImportDeckMutation()
	const buttonState = isLoading
		? 'loading'
		: isValidQuizletUrl(url) ? 'default' : 'disabled'

	const importHandler = useCallback(() => {
		importDeck({
			url,
			onImportComplete,
		})
	}, [importDeck, onImportComplete, url])

	return (
		<div className={styles.popup}>
			<span className={styles.header}>
				{getMessage('QuizletImportPopup.Header')}
			</span>
			<TextField
				className={styles.textField}
				size="small"
				onChange={setUrl}
			/>
			<Button
				type="primary"
				size="medium"
				state={buttonState}
				onClick={importHandler}
			>
				{getMessage('QuizletImportPopup.Button.Import')}
			</Button>
		</div>
	)
}

function isValidQuizletUrl(urlStr: string) {
	let url

	try {
		url = new URL(urlStr)
		return (url.protocol === 'http:' || url.protocol === 'https:')
			&& url.hostname === 'quizlet.com'
	}
	catch (_) {
		return false
	}
}

type ImportMutationParams = {
	url: string,
	onImportComplete:() => void
}
function useImportDeckMutation() {
	const [user] = useAtom(userAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleAddMaterial = useAction(currentFolderActions.add)
	const handleSelectDeck = useAction(selectionActions.selectDeck)

	return useMutation(async ({url, onImportComplete}: ImportMutationParams) => {
		const data = await QuizletScraberAPI.get().importCards(url)
		if (!data?.cards?.length) {
			onImportComplete()
		}

		const response = await DecksAPI.get().createNewDeck({
			userId: user.id,
			parentFolderId: selectedFolderId,
			name: data.cards[0].front,
		})

		const createdDeck = response.data.deck

		await CardsAPI.get().syncCardsByDeckId(createdDeck.deckId, {
			cards: data.cards.map((card, i) => ({
				cardId: `quizletCard${i}`,
				frontSide: card.front,
				backSide: card.back,
			})),
		})

		handleAddMaterial({
			material: {
				type: 'deck',
				id: createdDeck.deckId,
				name: createdDeck.name,
			},
		})

		handleSelectDeck({
			deckId: createdDeck.deckId,
		})

		onImportComplete()
	})
}

export {
	QuizletImportPopup,
}