import {action, atom} from '@reatom/core'
import {ApplicationSelection} from './types/ApplicationSelection'

const selectionAtom = atom<ApplicationSelection>({
	type: 'user-content',
	content: null,
})

const setSelectionAction = action((ctx, selection: ApplicationSelection) =>
	selectionAtom(ctx, selection),
)

export {
	selectionAtom,
	setSelectionAction,
}