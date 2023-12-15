import {Button, TextField, Popup} from '@viewshka/uikit'
import React, {useRef} from 'react'
import ComponentStory from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './PopupStories.module.css'

function PopupStories() {
	const buttonRef = useRef<HTMLButtonElement>(null)
	return (
		<ComponentStory>
			<Button
				type="primary"
				size="small"
				onClick={() => {}}
				ref={buttonRef}
			>
				Открыть попап
			</Button>
			<Popup triggerRef={buttonRef}>
				<Popup.Content className={styles['popup']}>
					<TextField
						size="small"
						onChange={console.log}
						placeholder="Введите номер карты"
					/>
					<Popup.Close>
						<Button
							type="primary"
							size="small"
							onClick={() => {}}
						>
								Отправить
						</Button>
					</Popup.Close>
				</Popup.Content>
			</Popup>
		</ComponentStory>
	)
}

addStory('Popup', PopupStories)