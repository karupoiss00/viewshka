import {useSetSelectedStorageParam} from '@leards/components/screens/home/common/hooks/useLoadSelectionParams'
import {currentFolderAtom} from '@leards/components/screens/home/viewmodel/currentFolderAtom'
import {selectionActions} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAction, useAtom} from '@reatom/npm-react'
import {Breadcrumbs} from '@viewshka/uikit'
import React from 'react'

const MAX_CRUMBS_COUNT = 4

function UserContentPanel() {
	const getMessages = useMessages()
	const [currentFolder] = useAtom(currentFolderAtom)
	const setSelectedStorageQuery = useSetSelectedStorageParam()
	const handleSelectFolderAction = useAction(selectionActions.selectFolder)

	const selectFolder = (id: string) => {
		handleSelectFolderAction({
			folderId: id,
		})
		setSelectedStorageQuery('folder', id)
	}

	const path = currentFolder?.path?.length > MAX_CRUMBS_COUNT
		? [currentFolder.path[0], ...currentFolder.path.slice(-3)]
		: currentFolder?.path || []

	return (
		<Breadcrumbs onItemClick={selectFolder}>
			{path?.map((item, i) => (
				<Breadcrumbs.Item id={item.id} key={item.id}>
					{i === 0 ? getMessages('TopPanel.MainFolder.Name') : item.name}
				</Breadcrumbs.Item>
			))}
		</Breadcrumbs>
	)
}
export {
	UserContentPanel,
}