import {Content, Folder as FolderData} from '@leards/api/generated'

interface AddContentPayload {
	material: Content
}
function addContent(folder: FolderData, {material}: AddContentPayload): FolderData {
	return {
		...folder,
		content: [
			...folder.content,
			material,
		],
	}
}

interface RemoveContentPayload {
	contentId: string
}
function removeContent(folder: FolderData, {contentId}: RemoveContentPayload): FolderData {
	folder.content = folder.content.filter(content => content.id !== contentId)

	return folder
}

interface UpdateContentPayload {
	material: Content
}
function updateContent(folder: FolderData, {material}: UpdateContentPayload): FolderData {
	return {
		...folder,
		content: folder.content.map(item => {
			if (item.id !== material.id) {
				return item
			}

			return material
		}),
	}
}

const Folder = {
	addContent,
	removeContent,
	updateContent,
} as const

export type {
	AddContentPayload,
	UpdateContentPayload,
}

export {
	Folder,
}