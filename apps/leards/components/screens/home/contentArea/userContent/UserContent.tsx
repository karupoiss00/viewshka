import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {
	UserContentBottomPanel,
} from '@leards/components/screens/home/contentArea/userContent/bottomPanel/UserContentBottomPanel'
import {SelectedStorageData} from '@leards/components/screens/home/viewmodel/selection/Selection'
import {useAtom} from '@reatom/npm-react'
import React from 'react'
import {DeckViewer} from '../common/deck/DeckViewer'
import {FolderStats} from './stats/FolderStats'
import styles from './UserContent.module.css'


type UserContentProps = {
	selectedContent: SelectedStorageData | null
}
function UserContent({selectedContent}: UserContentProps) {
	const storageType = selectedContent?.type
	const storageId = selectedContent?.id
	const [{rootFolderId}] = useAtom(userAtom)
	const showBottomPanel = !!selectedContent && storageId !== rootFolderId

	return (
		<div className={styles.container}>
			{
				storageType === 'deck'
					&& <DeckViewer deckId={storageId} readonly={false}/>
			}
			{
				storageType === 'folder'
				&& <FolderStats folderId={storageId || rootFolderId}/>
			}
			{showBottomPanel && <UserContentBottomPanel storageType={storageType} storageId={storageId}/>}
		</div>
	)
}


export {
	UserContent,
}