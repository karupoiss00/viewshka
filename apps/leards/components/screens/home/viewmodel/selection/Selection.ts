type StorageType = 'folder' | 'deck'

type SelectedStorageData = {
	type: StorageType
	id: string
};

type UserContentSelection = {
	type: 'user-content'
	content: SelectedStorageData | null
}

type LibrarySelection = {
	type: 'library'
	content: SelectedStorageData | null
}

function createUserContentSelection(): UserContentSelection {
	return {
		type: 'user-content',
		content: null,
	}
}

function createLibrarySelection(): LibrarySelection {
	return {
		type: 'library',
		content: null,
	}
}

function createDefaultSelection() {
	return createUserContentSelection()
}

type Selection = UserContentSelection | LibrarySelection

function createSelection(type: string): Selection {
	switch (type) {
		case 'user-content':
			return createUserContentSelection()
		case 'library':
			return createLibrarySelection()
		default:
			console.warn(`Unknown selection type: ${type}`)
			return createDefaultSelection()
	}
}

type CreateStorageSelectionParams = {
	section: string
	storageType: string
	storageId: string
}
function createStorageSelection({
	section,
	storageType,
	storageId,
}: CreateStorageSelectionParams): Selection {
	if (section !== 'user-content' && section !== 'library') {
		return createDefaultSelection()
	}

	const invalidStorageType = storageType !== 'folder' && storageType !== 'deck'
	const invalidStorageId = !storageId

	if (invalidStorageType || invalidStorageId) {
		return {
			type: section,
			content: null,
		}
	}

	return {
		type: section,
		content: {
			type: storageType,
			id: storageId,
		},
	}
}

export type {
	Selection,
	SelectedStorageData,
	StorageType,
}

export {
	createSelection,
	createStorageSelection,
}