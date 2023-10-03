import {Button, TextField} from '@viewshka/uikit'
import React from 'react'
import Popup from '../../../../../../libs/uikit/src/lib/popup/Popup'
import ComponentStory from '../../common/ComponentStory'
import {addStory} from '../../stories'
import styles from './PopupStories.module.css'

function PopupStories() {
	return (
		<ComponentStory>
			<Popup>
				<Popup.Trigger>
					<Button
						type={'primary'}
						size={'small'}
						onClick={() => {}}
					>
						Открыть попап
					</Button>
				</Popup.Trigger>
				<Popup.Content className={styles['popup']}>
					<TextField
						size={'small'}
						onChange={console.log}
						placeholder={'Введите номер карты'}
					/>
					<Popup.Close>
						<Button
							type={'primary'}
							size={'small'}
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