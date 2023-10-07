import {action, atom} from '@reatom/core'
import {
	ApplicationSelection,
	createSelection,
} from './types/ApplicationSelection'

const selectionAtom = atom<ApplicationSelection>({
	type: 'user-content',
	content: null,
})

const setSelectionAction = action((ctx, selectionType: string) =>
  selectionAtom(ctx, createSelection(selectionType))
);

export {
	selectionAtom,
	setSelectionAction,
}