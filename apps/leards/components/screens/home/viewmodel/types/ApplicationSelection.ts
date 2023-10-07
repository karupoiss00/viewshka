type SelectedContentData = {
	id: string,
	type: 'folder' | 'deck',
}

type UserContentSelection = {
	type: 'user-content',
	content: SelectedContentData | null
}

type LibrarySelection = {
	type: 'library',
}

type TasksSelection = {
	type: 'tasks',
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
	}
}

function createTasksSelection(): TasksSelection {
	return {
		type: 'tasks',
	}
}

type ApplicationSelection = UserContentSelection | LibrarySelection | TasksSelection

function createSelection(type: string): ApplicationSelection {
	switch (type) {
		case 'user-content':
			return createUserContentSelection()
		case 'library':
			return createLibrarySelection()
		case 'tasks':
			return createTasksSelection()
		default:
			throw new Error(`Unknown selectio;n type: ${type}`)
	}
}

export type {
	ApplicationSelection,
	SelectedContentData,
}

export {
	createSelection,
}