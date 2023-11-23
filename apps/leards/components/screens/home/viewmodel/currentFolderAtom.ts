import {Folder} from '@leards/api/generated'
import {atom} from '@reatom/core'

const currentFolderAtom = atom<Folder>({
	folderId: '',
	name: '',
	path: [],
	content: [],
})

export {
	currentFolderAtom,
}
