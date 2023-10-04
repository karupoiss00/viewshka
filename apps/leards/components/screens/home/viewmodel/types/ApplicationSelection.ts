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


export type {
	ApplicationSelection,
	SelectedContentData,
}