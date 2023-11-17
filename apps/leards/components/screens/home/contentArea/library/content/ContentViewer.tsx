import {DeckViewer} from '@leards/components/screens/home/contentArea/common/deck/DeckViewer'
import {SelectedContentData} from '@leards/components/screens/home/viewmodel/selection/Selection'
import React from 'react'
import {LibraryBottomPanel} from './bottomPanel/LibraryBottomPanel'
import styles from './ContentViewer.module.css'

type ContentViewerProps = {
	selectedContent: SelectedContentData | null
}
function ContentViewer({selectedContent}: ContentViewerProps) {
	return (
		<div className={styles.container}>
			<DeckViewer readonly={true}/>
			<LibraryBottomPanel selectedContent={selectedContent}/>
		</div>
	)
}

export {
	ContentViewer,
}