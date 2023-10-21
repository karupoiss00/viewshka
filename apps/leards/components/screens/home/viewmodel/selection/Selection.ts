type SelectedContentData = {
  deckId: string | null
  folderId: string
};

type UserContentSelection = {
	type: 'user-content'
	content: SelectedContentData | null
}

type LibrarySelection = {
	type: 'library'
	content: SelectedContentData | null
}

type TasksSelection = {
	type: 'tasks'
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

function createTasksSelection(): TasksSelection {
	return {
		type: 'tasks',
	}
}

function createDefaultSelection() {
	return createUserContentSelection()
}

type Selection = UserContentSelection | LibrarySelection | TasksSelection

function createSelection(type: string): Selection {
	switch (type) {
		case 'user-content':
			return createUserContentSelection()
		case 'library':
			return createLibrarySelection()
		case 'tasks':
			return createTasksSelection()
		default:
			console.warn(`Unknown selection type: ${type}`)
			return createDefaultSelection()
	}
}

export type {
	Selection,
	SelectedContentData,
}

export {
	createSelection,
}