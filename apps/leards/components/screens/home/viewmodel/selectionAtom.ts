import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {action, atom} from '@reatom/core'
import {
	Selection,
	createSelection,
} from './selection/Selection'

const selectionAtom = atom<Selection>({
	type: 'user-content',
	content: null,
})

const selectedSectionAtom = atom(ctx => {
	const selection = ctx.spy(selectionAtom)

	return selection.type
})

const selectedFolderIdAtom = atom(ctx => {
	const user = ctx.spy(userAtom)
	const selection = ctx.spy(selectionAtom)

	if (selection.type !== 'user-content' && selection.type !== 'library') {
		return null
	}

	return selection.content?.folderId || user.rootFolderId
})

const selectedDeckIdAtom = atom(ctx => {
	const selection = ctx.spy(selectionAtom)

	if (selection.type !== 'user-content' && selection.type !== 'library') {
		return null
	}

	return selection.content?.deckId || null
})


const selectSection = action((ctx, sectionType: string) =>
	selectionAtom(ctx, createSelection(sectionType)),
)

type SelectDeckPayload = {
	parentFolderId: string
	deckId: string
}
const selectDeck = action((ctx, payload: SelectDeckPayload) => {
	const {type: selectionType} = ctx.get(selectionAtom)

	if (selectionType != 'user-content' && selectionType !== 'library') {
		console.warn('Can not set selected folder outside user-content or library section')
		return
	}

	const {parentFolderId, deckId} = payload

	selectionAtom(ctx, {
		type: selectionType,
		content: {
			deckId,
			folderId: parentFolderId,
		},
	})
})

type SelectFolderPayload = {
	folderId: string
}
const selectFolder = action((ctx, payload: SelectFolderPayload) => {
	const {type: selectionType} = ctx.get(selectionAtom)

	if (selectionType !== 'user-content' && selectionType !== 'library') {
		console.warn('Can not set selected folder outside user-content or library section')
		return
	}

	const {folderId} = payload

	selectionAtom(ctx, {
		type: selectionType,
		content: {
			deckId: null,
			folderId,
		},
	})
})

type SetSelectedFolderPayload = {
	folderId: string
}
const setSelectedFolder = action((ctx, payload: SetSelectedFolderPayload) => {
	const selection = ctx.get(selectionAtom)

	if (selection.type !== 'user-content' && selection.type !== 'library') {
		console.warn('Can not set selected folder outside user-content or library section')
		return
	}

	const {folderId} = payload

	selectionAtom(ctx, {
		type: selection.type,
		content: {
			...selection.content,
			folderId,
		},
	})
})


const selectionActions = {
	selectSection,
	selectDeck,
	selectFolder,
	setSelectedFolder,
} as const

export {
	selectionAtom,

	selectedFolderIdAtom,
	selectedDeckIdAtom,
	selectedSectionAtom,

	selectionActions,
}