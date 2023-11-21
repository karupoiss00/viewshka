import {ContentViewer} from '@leards/components/screens/home/contentArea/library/content/ContentViewer'
import {SearchResult} from '@leards/components/screens/home/contentArea/library/search/SearchResult'
import React from 'react'
import {SelectedContentData} from '../../viewmodel/selection/Selection'
import styles from './LibraryContent.module.css'

type LibraryContentProps = {
	selectedContent: SelectedContentData | null
}
function LibraryContent({selectedContent}: LibraryContentProps) {
	const deckOpened = selectedContent && selectedContent.deckId
	return (
		<div className={styles.container}>
			{
				deckOpened
					? <ContentViewer selectedContent={selectedContent}/>
					: <SearchResult/>
			}
		</div>
	)
}

export {
	LibraryContent,
}