import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useEventListener} from '@viewshka/core'
import {Button, Dropdown, Popup, PopupContext} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren, useCallback, useContext, useEffect, useRef, useState} from 'react'
import {CopyLinkField} from '../common/copyLinkField/CopyLinkField'
import {MaterialNameEditor} from '../common/materialNameEditor/MaterialNameEditor'
import {SharingSwitcher} from '../common/sharingSwitcher/SharingSwitcher'
import styles from './MaterialSettingsPopup.module.css'

type AccessType = 'public' | 'shared' | 'private'

type MaterialSettingsData = {
	name: string
	access: string
}

type MaterialSettingsPopupProps = PropsWithChildren & {
	getSharingLink: () => string
	initialSettings: MaterialSettingsData
	onSettingsUpdate: (settings: MaterialSettingsData) => void
	onMaterialRemove: () => void
	closeOnEnter?: boolean
}
function MaterialSettingsPopup(props: MaterialSettingsPopupProps) {
	const {getSharingLink, initialSettings, onSettingsUpdate, onMaterialRemove} = props
	const getMessage = useMessages()
	const {close} = useContext(PopupContext)
	const popupRef = useRef<HTMLDivElement>()
	const [valid, setValid] = useState(false)
	const [settings, setSettings] = useState<MaterialSettingsData>(initialSettings)
	const sharingDisabled = settings?.access === 'private'

	const onSharingEnabledChange = useCallback((sharingEnabled: boolean) => {
		setSettings({
			name: settings.name,
			access: sharingEnabled ? 'shared' : 'private',
		})
	}, [settings])

	const onNameChange = useCallback((name: string, valid: boolean) => {
		setValid(valid)
		setSettings(current => ({
			...current,
			name,
		}))
	}, [])

	const onSave = useCallback(() => {
		if (!valid) {
			return
		}

		onSettingsUpdate(settings)
		close()
	}, [close, onSettingsUpdate, settings, valid])

	useEventListener('keydown', e => {
		if (!props.closeOnEnter) {
			return
		}
		if (e.key === 'Enter') {
			onSave()
		}
	}, popupRef)

	return (
		<div className={styles.container} ref={popupRef}>
			<div className={styles.contentName}>
				<MaterialNameEditor
					initialValue={initialSettings.name}
					onChange={onNameChange}
				/>
			</div>
			<SharingSwitcher
				className={styles.sharingSwitcher}
				initialValue={!sharingDisabled}
				onChange={onSharingEnabledChange}
			/>
			<CopyLinkField link={getSharingLink()} disabled={sharingDisabled}/>
			<div className={styles.sharingContainer}>
				<span className={classnames(styles.sharingHeading, {
					[styles.sharingHeadingDisabled]: sharingDisabled,
				})}>
					{getMessage('ContentSettingsPopup.Material.Share.Level')}
				</span>
				<Dropdown
					disabled={sharingDisabled}
					className={styles.sharingDropdown}
					selectedItem={sharingDisabled ? 'shared' : settings.access}
					onItemSelect={(access: AccessType) => {
						setSettings(settings => ({
							...settings,
							access,
						}))
					}}
				>
					<Dropdown.Item id="shared" value={getMessage('ContentSettingsPopup.Material.Share.ByLink')}/>
					<Dropdown.Item id="public" value={getMessage('ContentSettingsPopup.Material.Share.Public')}/>
				</Dropdown>
			</div>
			{props.children}
			<PopupFooter
				onSave={onSave}
				onDelete={onMaterialRemove}
				saveAvailable={valid}
			/>
		</div>
	)
}

type PopupFooterProps = {
	onDelete: () => void
	onSave: () => void
	saveAvailable: boolean
}
function PopupFooter({onDelete, onSave, saveAvailable}: PopupFooterProps) {
	const getMessage = useMessages()

	return (
		<div className={styles.bottomPanel}>
			<Popup.Close onClick={onDelete}>
				<Button
					className={styles.closeButton}
					type={'secondary'}
					size={'small'}
				>
					{getMessage('ContentSettingsPopup.Material.Button.Delete')}
				</Button>
			</Popup.Close>
			<Button
				type={'primary'}
				size={'small'}
				state={saveAvailable ? 'default' : 'disabled'}
				onClick={onSave}
			>
				{getMessage('ContentSettingsPopup.Material.Button.Save')}
			</Button>
		</div>
	)
}

export {
	MaterialSettingsPopup,
}