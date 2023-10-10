import {action, atom} from '@reatom/core'
import {
	Selection,
	createSelection,
} from './selection/Selection'

const selectionAtom = atom<Selection>({
	type: null,
	content: null,
})

const selectedFolderIdAtom = atom(ctx => {
	const selection = ctx.spy(selectionAtom)

	if (selection.type !== 'user-content') {
		return null
	}

	return selection.content?.folderId
})

const selectedDeckIdAtom = atom(ctx => {
	const selection = ctx.spy(selectionAtom)

	if (selection.type !== 'user-content') {
		return null
	}

	return selection.content?.deckId
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

	if (selectionType != 'user-content') {
		throw new Error('Can not select deck outside user-content section')
	}

	const {parentFolderId, deckId} = payload

	selectionAtom(ctx, {
		type: 'user-content',
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

	if (selectionType != 'user-content') {
		throw new Error('Can not select folder outside user-content section')
	}

	const {folderId} = payload

	selectionAtom(ctx, {
		type:'user-content',
		content: {
			deckId: null,
			folderId,
		},
	})
})


const selectionActions = {
	selectSection,
	selectDeck,
	selectFolder,
} as const

export {
	selectionAtom,
	selectedFolderIdAtom,
	selectedDeckIdAtom,

	selectionActions,
}