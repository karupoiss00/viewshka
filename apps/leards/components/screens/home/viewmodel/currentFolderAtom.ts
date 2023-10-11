import {HttputilsFolder} from '@leards/api/generated'
import {action, atom} from '@reatom/core'

const currentFolderAtom = atom<HttputilsFolder>({
	folderId: '',
	name: '',
	path: [],
	content: [],
})

type SetCurrentFolderActionPayload = {
	folder: HttputilsFolder
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
