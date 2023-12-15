import {DecksAPI} from '@leards/api/DecksAPI'
import {Deck} from '@leards/api/generated'
import {SharingAPI} from '@leards/api/SharingAPI'
import {TagsAPI} from '@leards/api/TagsAPI'
import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {TagsEditor} from '@leards/components/screens/home/sidebar/contentItemPopup/deckPopup/tagsEditor/TagsEditor'
import {currentFolderActions} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {selectedFolderIdAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useAction, useAtom} from '@reatom/npm-react'
import React, {useCallback, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {DiffResult} from '../../../../../../../../libs/uikit/src/lib/types/arrayDiff'
import {MaterialSettingsPopup} from '../common/MaterialSettingsPopup'

const getLink = (id: string) => `https://leards.space/share/${id}`

type DeckSettingsPopupProps = {
	deckId: string
}
function DeckSettingsPopup({deckId}: DeckSettingsPopupProps) {
	const [tagsDiff, setTagsDiff] = useState<DiffResult<string>>({added: [], removed: []})
	const {data} = useDeckSettingsQuery(deckId)
	const {mutate: deleteDeck} = useDeleteDeckMutation(deckId)
	const {mutate: updateDeck} = useUpdateDeckMutation(deckId)

	if (!data) {
		return null
	}

	return (
		<MaterialSettingsPopup
			initialSettings={data}
			onSettingsUpdate={settings => updateDeck({
				name: settings.name,
				addedTags: tagsDiff.added,
				removedTags: tagsDiff.removed,
				access: settings.access,
			})}
			onMaterialRemove={deleteDeck}
			getSharingLink={() => getLink(deckId)}
			closeOnEnter={false}
		>
			<TagsEditor tags={data.tags} onChange={setTagsDiff} />
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

type UpdateDeckArgs = {
	name: string
	access: string
	addedTags: string[]
	removedTags: string[]
}
function useUpdateDeckMutation(deckId: string) {
	const [user] = useAtom(userAtom)
	const [selectedFolderId] = useAtom(selectedFolderIdAtom)
	const handleUpdateMaterial = useAction(currentFolderActions.update)
	const queryClient = useQueryClient()

	const updateTags = useCallback(async (addedTags: string[], removedTags: string[]) => {
		if (!user) {
			return
		}

		const api = TagsAPI.get()
		!!removedTags.length && await api.removeTagsFromStorage(user.id, 'deck', deckId, {
			tags: removedTags,
		})

		!!addedTags.length && await api.addTagsToStorage(user.id, 'deck', deckId, {
			tags: addedTags,
		})
	}, [deckId, user])

	const updateName = useCallback(async (name: string) => {
		if (!name) {
			return
		}

		const api = DecksAPI.get()
		const response = await api.updateDeckById(selectedFolderId, deckId, {
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
	}, [deckId, handleUpdateMaterial, selectedFolderId])

	const updateAccess = useCallback(async (access: string) => {
		const api = SharingAPI.get()
		await api.setStorageAccess('deck', deckId, {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			type: access,
		})
	}, [deckId])

	return useMutation(
		['updateDeck', deckId],
		async ({name, addedTags, removedTags, access}: UpdateDeckArgs) => {
			await updateTags(addedTags, removedTags)
			await updateName(name)
			await updateAccess(access)
			queryClient.getQueryCache().clear()
		},
	)
}

function useDeckSettingsQuery(deckId: string) {
	return useQuery(['deckSettings', deckId], async () => {
		const api = DecksAPI.get()

		const response = await api.getDeckById(deckId)
		const deck = response.data.deck
		return {
			name: deck.name,
			access: deck.accessType,
			tags: deck.tags,
		}
	})
}

export {
	DeckSettingsPopup,
}