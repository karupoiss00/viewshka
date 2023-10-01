import React, {PropsWithChildren} from 'react'
import styles from './ComponentStory.module.css'

function ComponentStory({children}: PropsWithChildren) {
	return (
		<div className={styles['layout']}>
			{children}
		</div>
	)
}

type StoryColumnProps = PropsWithChildren & {
	name?: string
	width?: number
}

function StoryColumn({children, width, name}: StoryColumnProps) {
	return (
		<div className={styles['column']} style={width ? {
			width: `${width}px`,
		} : undefined}>
			{name && <div className={styles['column-name']}>{name}</div>}
			{children}
		</div>
	)
}

export {
	StoryColumn,
}

export default ComponentStory
