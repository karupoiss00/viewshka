import classnames from 'classnames'
import React from 'react'
import {getAllStories} from '../stories'
import styles from './StoriesList.module.css'

interface StoriesListProps {
	selectedStory: string
	setSelectedStory: (storyName: string) => void
}

function StoriesList({selectedStory, setSelectedStory}: StoriesListProps) {
	const items: Array<JSX.Element> = []

	for (const key of getAllStories().keys()) {
		items.push((
			<div
				className={
					classnames(styles['item'], {
						[styles['item--selected']]: key === selectedStory,
					})
				}
				key={key}
				onClick={() => setSelectedStory(key)}
			>
				{key}
			</div>
		))
	}

	return (
		<div className={styles['items-list']}>
			{items}
		</div>
	)
}

export default StoriesList