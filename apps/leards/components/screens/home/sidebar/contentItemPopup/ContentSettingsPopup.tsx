import {useMessages} from '@leards/i18n/hooks/useMessages'
import {Button, Popup, TextField} from '@viewshka/uikit'
import React from 'react'
import styles from './ContentSettingsPopup.module.css'

/**
 * : 'Название материала:',
 * 	: 'Поделиться:',
 * 	: 'Скопировать',
 * 	: 'Публичный',
 * 	: 'Удалить',
 * 	: 'Сохранить',
 * @constructor
 */
function ContentSettingsPopup() {
	const getMessage = useMessages()

	return (
		<div className={styles.container}>
			<div className={styles.contentName}>
				<span>{getMessage('ContentSettingsPopup.Material.Name')}</span>
				<TextField onChange={console.log} size={'small'}/>
			</div>
			<div className={styles.sharingArea}>
				<span>{getMessage('ContentSettingsPopup.Material.Share')}</span>
				<div className={styles.linkContainer}></div>
				<div className={styles.shareButtonContainer}>
					<Button className={styles.shareButton} type={'secondary'} size={'small'} onClick={console.log}>
						{getMessage('ContentSettingsPopup.Material.Button.Copy')}
					</Button>
				</div>
			</div>
			<div className={styles.publicContent}>
				<span>{getMessage('ContentSettingsPopup.Material.Checkbox.Public')}</span>
			</div>
			<div className={styles.bottomPanel}>
				<Popup.Close>
					<Button className={styles.closeButton} type={'secondary'} size={'small'} onClick={console.log}>
						{getMessage('ContentSettingsPopup.Material.Button.Delete')}
					</Button>
				</Popup.Close>
				<Popup.Close>
					<Button type={'primary'} size={'small'} onClick={console.log}>
						{getMessage('ContentSettingsPopup.Material.Button.Save')}
					</Button>
				</Popup.Close>
			</div>
		</div>
	)
}

export {
	ContentSettingsPopup,
}