import React from 'react'
import ComponentStory, {StoryColumn} from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './TokensStory.module.css'

/*
* --large-regular-text: 400 44px "Euclid Circular B";
    --large-light-text: 300 32px "Euclid Circular B";

    --normal-medium-text: 500 24px "Euclid Circular B";
    --normal-regular-text: 400 24px "Euclid Circular B";
    --normal-light-text: 300 20px "Euclid Circular B";

    --small-medium-text: 500 18px "Euclid Circular B";
    --small-regular-text: 400 18px "Euclid Circular B";
    --small-light-text: 300 16px "Euclid Circular B";

    --xsmall-light-text: 300 12px "Euclid Circular B";*/

function TokensStory() {
	return (
		<ComponentStory>
			<StoryColumn width={400} name={'Colors'}>
				<ColorExample colorName={'--accent-color'}/>
				<ColorExample colorName={'--error-color'}/>
				<ColorExample colorName={'--selection-color'}/>
				<ColorExample colorName={'--surface-color'}/>
				<ColorExample colorName={'--stroke-color'}/>
				<ColorExample colorName={'--text-color-default'}/>
				<ColorExample colorName={'--text-color-subdued'}/>
			</StoryColumn>

			<StoryColumn width={500} name={'Fonts'}>
				<FontExample fontName={'--large-regular-text'}/>
				<FontExample fontName={'--large-light-text'}/>
				<FontExample fontName={'--normal-medium-text'} />
				<FontExample fontName={'--normal-regular-text'} />
				<FontExample fontName={'--normal-light-text'} />
				<FontExample fontName={'--small-medium-text'} />
				<FontExample fontName={'--small-regular-text'} />
				<FontExample fontName={'--small-light-text'} />
				<FontExample fontName={'--xsmall-light-text'} />
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
			<div className={styles['color-circle']}style={{background: `var(${colorName})`}}></div>
			<div className={styles['color-name']}>{colorName}</div>
		</div>
	)
}


addStory('Tokens', TokensStory)