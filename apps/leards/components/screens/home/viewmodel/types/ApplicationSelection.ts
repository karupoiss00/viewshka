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


type ApplicationSelection = UserContentSelection | LibrarySelection | TasksSelection

function createSelection(type: string): ApplicationSelection {
  switch (type) {
    case 'user-content':
      return {
        type,
        content: null,
      };
    case 'library':
      return {
        type,
      };
    case 'tasks':
      return {
        type,
      };
    default:
      throw new Error(`Unknown selection type: ${type}`);
  }
}

export type {
	ApplicationSelection,
Se;lectedContentData,
}

export {
	createSelection,
}