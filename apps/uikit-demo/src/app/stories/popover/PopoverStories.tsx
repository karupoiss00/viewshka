import {Button, TextField, Popover} from '@viewshka/uikit'
import React, {useRef} from 'react'
import ComponentStory from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './PopoverStories.module.css'

function PopoverStories() {
	const triggerRef = useRef<HTMLButtonElement>(null)
	return (
		<ComponentStory>
			<Button
				type={'primary'}
				size={'small'}
				onClick={() => {}}
				ref={triggerRef}
			>
				Открыть поповер
			</Button>
			<Popover
				preferredHorizontalPosition={'center'}
				preferredVerticalPosition={'bottom'}
				triggerRef={triggerRef}
				onClose={() => {}}
			>
				<Popover.Content className={styles['popover']}>
					<TextField
						size={'small'}
						onChange={console.log}
						placeholder={'Введите номер карты'}
					/>
					<Popover.Close onClose={() => {}}>
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