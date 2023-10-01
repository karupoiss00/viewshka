import {TextField} from '@viewshka/uikit'
import React from 'react'
import Popover from '../../../../../../libs/uikit/src/lib/popover/Popover'
import ComponentStory from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './PopoverStories.module.css'

function PopoverStories() {
	return (
		<ComponentStory>
			<Popover preferredPosition="bottom-center">
				<Popover.Trigger>
					<button className={styles['trigger-button']}>show popover</button>
				</Popover.Trigger>
				<Popover.Content className={styles['popover']}>
					<TextField
						size={'small'}
						onChange={console.log}
					/>
					<Popover.Close>
						<button className={styles['close-button']}>close</button>
					</Popover.Close>
				</Popover.Content>
			</Popover>
		</ComponentStory>
	)
}

addStory('Popover', PopoverStories)