import {DecksAPI} from '@leards/api/DecksAPI'
import {currentFolderActions} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {selectedFolderIdAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useAction, useAtom} from '@reatom/npm-react'
import React from 'react'
import {useMutation, useQuery} from 'react-query'
import {MaterialSettingsPopup} from '../common/MaterialSettingsPopup'

type AccessType = 'public' | 'shared' | 'private'

type DeckSettingsData = {
	name: string
	access: AccessType
}

const getLink = (id: string) => `https://leards.space/share/${id}`

type DeckSettingsPopupProps = {
	deckId: string
	deckName: string
}
function DeckSettingsPopup({deckId, deckName}: DeckSettingsPopupProps) {
	const {data} = useDeckSettingsQuery(deckId, deckName)
	const {mutate: deleteDeck} = useDeleteDeckMutation(deckId)
	const {mutate: updateName} = useUpdateDeckMutation(deckId)

	if (!data) {
		return null
	}

	return (
		<MaterialSettingsPopup
			initialSettings={data}
			onSettingsUpdate={settings => updateName(settings.name)}
			onMaterialRemove={deleteDeck}
			getSharingLink={() => getLink(deckId)}
		>

		</MaterialSettingsPopup>
	)
}

function useDeleteDeckMutation(deckId: string) {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleDeleteContent = useAction(currentFolderActions.remove)

	return useMutation(['removeDeck', deckId], async () => {
		await DecksAPI.get().deleteDeckById(selectedFolderId, deckId)
		handleDeleteContent({contentId: deckId})
	})
}

function useUpdateDeckMutation(deckId: string) {
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleUpdateMaterial = useAction(currentFolderActions.update)

	return useMutation(
		['updateDeck', deckId],
		async (name: string) => {
			const response = await DecksAPI.get().updateDeckById(selectedFolderId, deckId, {
				name,
			})
			const deck = response.data.deck
			handleUpdateMaterial({
				material: {
					type: 'deck',
					name: deck.name,
					id: deck.deckId,
				},
			})
		},
	)
}

function useDeckSettingsQuery(deckId: string, name: string) {
	return useQuery(['deckSettings', deckId, name], (): DeckSettingsData => ({
		name,
		access: 'private',
	}))
}

export {
	DeckSettingsPopup,
}