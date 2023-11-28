import {DeckViewer} from '@leards/components/screens/home/contentArea/common/deck/DeckViewer'
import {SelectedStorageData} from '@leards/components/screens/home/viewmodel/selection/Selection'
import React from 'react'
import {LibraryBottomPanel} from './bottomPanel/LibraryBottomPanel'
import styles from './ContentViewer.module.css'

type ContentViewerProps = {
	selectedContent: SelectedStorageData
}
function ContentViewer({selectedContent}: ContentViewerProps) {
	return (
		<div className={styles.container}>
			{selectedContent.type === 'deck' && <DeckViewer deckId={selectedContent.id} readonly={true}/>}
			<LibraryBottomPanel selectedContent={selectedContent}/>
		</div>
	)
}

export {
	ContentViewer,
}