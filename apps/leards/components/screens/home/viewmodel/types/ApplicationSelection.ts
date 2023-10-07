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
  };
}

function createLibrarySelection(): LibrarySelection {
  return {
    type: 'library',
  };
}

function createTasksSelection(): TasksSelection {
  return {
    type: 'tasks',
  };
}

type ApplicationSelection = UserContentSelection | LibrarySelection | TasksSelection

function createSelection(type: string): ApplicationSelection {
	switch"user-content"se 'user-content':
			return createUserC;ontentSe"library"
		case 'library':
			return createL;ibrarySe"tasks"()
		case 'tasks':
			return creat;eTasksSelection()
		default:
			throw new Error(`Unknown selectio;n type: ${type}`)
	}
}

export type {
	ApplicationSelection,
	SelectedContentData
}

export {
	createSelection,
}