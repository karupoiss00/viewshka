import {Content} from '@leards/api/generated'
import {ContentSettingsPopup} from '@leards/components/screens/home/sidebar/contentItemPopup/ContentSettingsPopup'
import {
	Button,
	Popup,
	SelectList,
	SystemIconDeck,
	SystemIconFolder,
	SystemIconMore,
} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {useRef} from 'react'
import styles from './ContentItem.module.css'

type ContentItemProps = {
	item: Content
	editable: boolean
	selected: boolean
}
function ContentItem({item, editable, selected}: ContentItemProps) {
	const settingsButtonRef = useRef<HTMLButtonElement>()

	return (
		<SelectList.Item className={classnames(styles.contentItem, {
			[styles.contentItemSelected]: selected,
		})} id={item.id} key={item.id}>
			{item.type === 'folder' && <SystemIconFolder />}
			{item.type === 'deck' && <SystemIconDeck />}
			<span>{item.name}</span>
			{editable && <>
				<Button
					className={styles.moreButton}
					type="link"
					size="small"
					onClick={e => e.preventDefault()}
					spacing="none"
					ref={settingsButtonRef}
				>
					<SystemIconMore/>
				</Button>

				<Popup triggerRef={settingsButtonRef}>
					<Popup.Content>
						<ContentSettingsPopup
							contentType={item.type}
							contentId={item.id}
							contentName={item.name}
						/>
					</Popup.Content>
				</Popup>
			</>
			}
		</SelectList.Item>
	)
}

export {
	ContentItem,
}