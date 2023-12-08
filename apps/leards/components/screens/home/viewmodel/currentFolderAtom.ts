import {Content, Folder} from '@leards/api/generated'
import {action, atom} from '@reatom/core'

const currentFolderAtom = atom<Folder>({
	folderId: '',
	name: '',
	path: [],
	content: [],
})

const add = action((ctx, material: Content) => {
	const folder = ctx.get(currentFolderAtom)
	const updatedFolder = {
		...folder,
		content: [
			...folder.content,
			material,
		],
	}

	currentFolderAtom(ctx, updatedFolder)
})

const remove = action((ctx, id: string) => {
	const folder = ctx.get(currentFolderAtom)
	const updatedFolder = {
		...folder,
		content: folder.content.filter(item => item.id !== id),
	}

	currentFolderAtom(ctx, updatedFolder)
})

const update = action((ctx, material: Content) => {
	const folder = ctx.get(currentFolderAtom)
	const updatedFolder = {
		...folder,
		content: folder.content.map(item => {
			if (item.id !== material.id) {
				return item
			}

			return material
		}),
	}

	currentFolderAtom(ctx, updatedFolder)
})


const currentFolderActions = {
	add,
	remove,
	update,
}

export {
	currentFolderAtom,
	currentFolderActions,
}
