import {Folder} from '@leards/api/generated'
import {action, atom} from '@reatom/core'

const currentFolderAtom = atom<Folder>({
	folderId: '',
	name: '',
	path: [],
	content: [],
})

type SetCurrentFolderActionPayload = {
	folder: Folder
}
const setCurrentFolderAction = action((ctx, {folder}: SetCurrentFolderActionPayload) => {
	if (folder) {
		currentFolderAtom(ctx, folder)
	}
})

export {
	currentFolderAtom,
	setCurrentFolderAction,
}
