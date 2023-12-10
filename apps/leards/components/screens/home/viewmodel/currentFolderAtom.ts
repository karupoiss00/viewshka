import {Folder as FolderData} from '@leards/api/generated'
import {currentDeckAtom} from '@leards/components/screens/home/viewmodel/currentDeckAtom'
import {Folder} from '@leards/components/screens/home/viewmodel/folder/Folder'
import {selectionActions} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {action, atom} from '@reatom/core'
import {deepClone} from '@viewshka/core'

const currentFolderAtom = atom<FolderData>({
	folderId: '',
	name: '',
	path: [],
	content: [],
})

function declareFolderAction<T>(reducer: (folder: FolderData, payload: T) => FolderData) {
	return action((ctx, payload: T) => {
		const folder = deepClone(ctx.get(currentFolderAtom))
		currentFolderAtom(
			ctx,
			reducer(folder, payload),
		)
	})
}

currentFolderAtom.onChange((ctx, newState) => {
	const selectedDeck = ctx.get(currentDeckAtom)

	const deckExists = newState.content.find(material => material.id === selectedDeck.deckId)

	if (!deckExists) {
		selectionActions.selectFolder(ctx, {
			folderId: newState.folderId,
		})
	}
})

const currentFolderActions = {
	add: declareFolderAction(Folder.addContent),
	remove: declareFolderAction(Folder.removeContent),
	update: declareFolderAction(Folder.updateContent),
}

export {
	currentFolderAtom,
	currentFolderActions,
}
