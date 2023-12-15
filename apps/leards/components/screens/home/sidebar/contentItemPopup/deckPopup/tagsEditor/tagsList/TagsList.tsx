import React from 'react'
import {Tag} from './tag/Tag'
import styles from './TagsList.module.css'

type TagsListProps = {
	tags: Array<string>
	onRemove: (tag: string) => void
}
function TagsList({tags, onRemove}: TagsListProps) {
	return (
		<div className={styles.tagsContainer}>
			{tags.map(tag => <Tag onRemove={onRemove} value={tag} key={tag}/>)}
		</div>
	)
}

export {
	TagsList,
}