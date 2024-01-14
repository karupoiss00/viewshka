import React from 'react'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './TokensStory.module.css'

function TokensStory() {
	return (
		<ComponentStory>
			<StoryColumn width={400} name="Colors">
				<ColorExample colorName="--access-color"/>
				<ColorExample colorName="--accent-color"/>
				<ColorExample colorName="--error-color"/>
				<ColorExample colorName="--selection-color"/>
				<ColorExample colorName="--surface-color"/>
				<ColorExample colorName="--stroke-color"/>
				<ColorExample colorName="--text-color-default"/>
				<ColorExample colorName="--text-color-subdued"/>
			</StoryColumn>

			<StoryColumn width={500} name="Fonts">
				<FontExample fontName="--text-large-regular"/>
				<FontExample fontName="--text-large-light"/>
				<FontExample fontName="--text-normal-medium" />
				<FontExample fontName="--text-normal-regular" />
				<FontExample fontName="--text-normal-light" />
				<FontExample fontName="--text-small-medium" />
				<FontExample fontName="--text-small-regular" />
				<FontExample fontName="--text-small-light" />
				<FontExample fontName="--text-xsmall-light" />
			</StoryColumn>
		</ComponentStory>
	)
}

interface FontExampleProps {
	fontName: string
}

function FontExample({fontName}: FontExampleProps) {
	return <div style={{font: `var(${fontName})`}}>{fontName}</div>
}

interface ColorExampleProps {
	colorName: string
}

function ColorExample({colorName}: ColorExampleProps) {
	return (
		<div className={styles['color-container']}>
			<div className={styles['color-circle']} style={{background: `var(${colorName})`}}></div>
			<div className={styles['color-name']}>{colorName}</div>
		</div>
	)
}


addStory('Tokens', TokensStory)