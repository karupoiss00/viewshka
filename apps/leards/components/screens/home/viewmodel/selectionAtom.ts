import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {currentFolderAtom} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {action, atom} from '@reatom/core'
import {
	Selection,
	createSelection,
} from './selection/Selection'

const selectionAtom = atom<Selection>({
	type: 'user-content',
	content: null,
})

const selectedFolderIdAtom = atom(ctx => {
	const {rootFolderId} = ctx.spy(userAtom)
	const selection = ctx.spy(selectionAtom)
	const folder = ctx.spy(currentFolderAtom)

	if (selection.type !== 'user-content' && selection.type !== 'library') {
		return null
	}

	if (!selection.content) {
		return rootFolderId
	}

	if (selection.content.type !== 'folder') {
		return folder?.folderId
	}

	return selection.content.id
})

const selectedDeckIdAtom = atom(ctx => {
	const selection = ctx.spy(selectionAtom)

	if (selection.type !== 'user-content' && selection.type !== 'library') {
		return null
	}

	if (selection.content?.type !== 'deck') {
		return null
	}

	return selection.content.id
})


const selectSection = action((ctx, sectionType: string) =>
	selectionAtom(ctx, createSelection(sectionType)),
)

type SelectDeckPayload = {
	deckId: string
}
const selectDeck = action((ctx, payload: SelectDeckPayload) => {
	const {type: selectionType} = ctx.get(selectionAtom)

	if (selectionType != 'user-content' && selectionType !== 'library') {
		console.warn('Can not set selected folder outside user-content or library section')
		return
	}

	const {deckId} = payload

	selectionAtom(ctx, {
		type: selectionType,
		content: {
			type: 'deck',
			id: deckId,
		},
	})
})

type SelectFolderPayload = {
	folderId: string
}
const selectFolder = action((ctx, payload: SelectFolderPayload) => {
	const {type: section} = ctx.get(selectionAtom)

	if (section !== 'user-content' && section !== 'library') {
		console.warn('Can not set selected folder outside user-content or library section')
		return
	}

	const {folderId} = payload

	selectionAtom(ctx, {
		type: section,
		content: {
			type: 'folder',
			id: folderId,
		},
	})
})

const reset = action(ctx => {
	selectionAtom(ctx, {
		type: 'user-content',
		content: null,
	})
})


const selectionActions = {
	selectSection,
	selectDeck,
	selectFolder,
	reset,
} as const

export {
	selectionAtom,

	selectedFolderIdAtom,
	selectedDeckIdAtom,

	selectionActions,
}