import React, {useState} from 'react'
import StoriesList from './common/StoriesList'
import styles from './Demo.module.css'
import {getStory} from './stories'
import './stories/index'

function Demo() {
	const [selectedStory, setSelectedStory] = useState('')
	const StoryComponent = getStory(selectedStory)

	return (
		<div className={styles['layout']}>
			<Header />
			<div className={styles['container']}>
				<StoriesList selectedStory={selectedStory} setSelectedStory={setSelectedStory}/>
				{StoryComponent ? <StoryComponent/> : <StoryPlaceholder/>}
			</div>
		</div>
	)
}

function StoryPlaceholder() {
	return (
		<div className={styles['placeholder']}>
			Пусто :*(
		</div>
	)
}

function Header() {
	return (
		<div className={styles['header']}>
			Viewshka Design System
		</div>
	)
}


export default Demo
