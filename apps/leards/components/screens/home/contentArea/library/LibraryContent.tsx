import {ContentViewer} from '@leards/components/screens/home/contentArea/library/content/ContentViewer'
import {SearchResult} from '@leards/components/screens/home/contentArea/library/search/SearchResult'
import React from 'react'
import {SelectedStorageData} from '../../viewmodel/selection/Selection'
import styles from './LibraryContent.module.css'

type LibraryContentProps = {
	selectedContent: SelectedStorageData | null
}
function LibraryContent({selectedContent}: LibraryContentProps) {
	const deckOpened = selectedContent?.type === 'deck'
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