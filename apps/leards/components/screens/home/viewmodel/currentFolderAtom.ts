import {HttputilsFolder} from '@leards/api/generated'
import {action, atom} from '@reatom/core'

const currentFolderAtom = atom<HttputilsFolder>({})

type SetCurrentFolderActionPayload = {
	folder: HttputilsFolder
}
const setCurrentFolderAction = action((ctx, {folder}: SetCurrentFolderActionPayload) => {
	currentFolderAtom(ctx, folder)
})

export {
	currentFolderAtom,
	setCurrentFolderAction,
}
