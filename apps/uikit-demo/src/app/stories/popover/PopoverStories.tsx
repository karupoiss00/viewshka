import {Button, TextField, Popover} from '@viewshka/uikit'
import React from 'react'
import ComponentStory from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './PopoverStories.module.css'

function PopoverStories() {
	return (
		<ComponentStory>
			<Popover preferredPosition="bottom-center">
				<Popover.Trigger>
					<Button
						type={'primary'}
						size={'small'}
						onClick={() => {}}
					>
						Открыть поповер
					</Button>
				</Popover.Trigger>
				<Popover.Content className={styles['popover']}>
					<TextField
						size={'small'}
						onChange={console.log}
						placeholder={'Введите номер карты'}
					/>
					<Popover.Close>
						<Button
							type={'primary'}
							size={'small'}
							onClick={() => {}}
						>
							Отправить
						</Button>
					</Popover.Close>
				</Popover.Content>
			</Popover>
		</ComponentStory>
	)
}

addStory('Popover', PopoverStories)