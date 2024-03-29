import {AccountsAPI} from '@leards/api/AccountsAPI'
import {AuthAPI} from '@leards/api/AuthAPI'
import {UpdateUserRequest, UpdateUserSettingsRequest} from '@leards/api/generated'
import {UserSettingsAPI} from '@leards/api/UserSettingsAPI'
import {localeToId} from '@leards/components/common/i18n/localeToMessageId'
import {themeToId} from '@leards/components/common/i18n/themeToMessageId'
import {settingsAction, settingsAtom} from '@leards/components/common/viewmodel/settingsAtom'
import {userActions, userAtom} from '@leards/components/common/viewmodel/userAtom'
import {EditableAvatar} from '@leards/components/screens/home/topPanel/common/profile/editableAvatar/EditableAvatar'
import {goToLanding} from '@leards/components/screens/landing/Landing'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {isLocale, Locale} from '@leards/providers/localeProvider'
import {isTheme, Theme} from '@leards/providers/themeProvider'
import {useAction, useAtom} from '@reatom/npm-react'
import {isUndefined, isValidPassword, isValidUsername, noop} from '@viewshka/core'
import {
	Avatar,
	Button, Dropdown,
	Popover,
	SystemIconArrowLeft,
	SystemIconClose, SystemIconLogout, SystemIconPencil,
	SystemIconSettings,
	TextField,
} from '@viewshka/uikit'
import React, {useRef, useState} from 'react'
import {useMutation} from 'react-query'
import {PersonInfo} from './personInfo/PersonInfo'
import styles from './UserProfile.module.css'

type ProfilePopupState = 'default' | 'settings' | 'editing'

function UserProfile() {
	const [userInfo] = useAtom(userAtom)
	const triggerRef = useRef()
	const [profileState, setProfileState] = useState<ProfilePopupState>('default')

	const buttonClick = () => {
		setProfileState('default')
	}

	return (
		<div className={styles['user-avatar-panel']}>
			<div ref={triggerRef} className={styles['user-avatar']}>
				{isUndefined(userInfo?.avatarUrl) || !userInfo?.avatarUrl
					? <Avatar size="small" type="gradient" name={userInfo?.name} />
					: <Avatar size="small" type="image" avatarUrl={userInfo?.avatarUrl} />
				}
			</div>
			<Popover
				relativePosition={{
					verticalAlign: 'bottom',
					horizontalAlign: 'center',
				}}
				triggerRef={triggerRef}
				onClose={buttonClick}
			>
				<PopoverContent buttonClick={buttonClick} profileState={profileState} setProfileState={setProfileState}/>
			</Popover>
		</div>
	)
}

type PopoverContentProps = {
	buttonClick: () => void,
	profileState: ProfilePopupState,
	setProfileState: (value: ProfilePopupState) => void,
}

function PopoverContent({buttonClick, profileState, setProfileState}: PopoverContentProps) {
	const [user] = useAtom(userAtom)
	const {mutate: logoutUser} = useLogoutMutation(user.id)

	return (
		<Popover.Content>
			<div className={styles['profile-navigation-bar']}>
				<Popover.Close onClose={noop}>
					<div hidden={profileState !== 'default'}>
						<Button className={styles['profile-popover-navigation-button']} type="link" size="small">
							<SystemIconClose />
						</Button>
					</div>
				</Popover.Close>
				<div hidden={profileState === 'default'} onClick={buttonClick}>
					<Button className={styles['profile-popover-navigation-button']} type="link" size="small">
						<SystemIconArrowLeft/>
					</Button>
				</div>
				<PersonInfo currentProfileState={profileState}/>
				<div hidden={profileState !== 'default'} onClick={() => logoutUser()}>
					<Button className={styles['profile-popover-button-logout']} type="link" size="small">
						<SystemIconLogout/>
					</Button>
				</div>
			</div>
			<ProfileContent profileState={profileState} changeState={setProfileState}/>
		</Popover.Content>
	)
}

function useLogoutMutation(userId: string) {
	const handleResetSettings = useAction(settingsAction.reset)

	return useMutation(async () => {
		await AuthAPI.get().revokeToken(userId)
		handleResetSettings()
		goToLanding()
	})
}

type ProfileContentProps = {
    profileState: ProfilePopupState,
    changeState: (value: ProfilePopupState) => void
}

function ProfileContent({profileState, changeState}: ProfileContentProps) {
	const showSettings = () => {
		changeState('settings')
	}

	const showEditing = () => {
		changeState('editing')
	}

	switch (profileState) {
		case 'default':
			return <Profile showSettings={showSettings} showEditing={showEditing}/>
		case 'editing':
			return <Editing/>
		case 'settings':
			return <Settings/>
	}
}

type ProfileProps = {
    showSettings: () => void
    showEditing: () => void
}

function Profile({showSettings, showEditing}: ProfileProps) {
	const [userInfo] = useAtom(userAtom)
	const getMessage = useMessages()
	const {mutate: updateAvatar} = useUpdateAvatarMutation(userInfo.id)
	const {mutate: removeAvatar} = useRemoveAvatarMutation(userInfo.id)

	const addImage = () => {
		loadImageFromDisk().then(file => {
			updateAvatar(file)
		})
	}

	const deleteImage = () => {
		removeAvatar()
	}

	return (
		<div className={styles['profile-popover-content']}>
			<div className={styles['avatar-container']}>
				<EditableAvatar addImage={addImage} deleteImage={deleteImage}/>
			</div>
			<div className={styles['profile-popover-username']}>
				{userInfo.name}
			</div>
			<div className={styles['profile-popover-buttons']}>
				<Button className={styles['profile-popover-button']}
					type="secondary"
					size="medium"
					onClick={showSettings}
				>
					<SystemIconSettings/>
					<div>
						{getMessage('Profile.Settings')}
					</div>
				</Button>
				<Button className={styles['profile-popover-button']}
					type="secondary"
					size="medium"
					onClick={showEditing}
				>
					<SystemIconPencil/>
					<div>
						{getMessage('Profile.Editing')}
					</div>
				</Button>
			</div>
		</div>
	)
}

function loadImageFromDisk(): Promise<File> {
	const onFileUpload = (input: HTMLInputElement, onSuccess: (file: File) => void, onFailure: () => void) => {
		if (input.files && input.files[0].type.match('image.*')) {
			const reader = new FileReader()
			reader.readAsDataURL(input.files[0])
			onSuccess(input.files[0])
		}
		else {
			onFailure()
		}
	}

	return new Promise((resolve, reject) => {
		const input = document.createElement('input')
		input.style.display = 'none'
		input.type = 'file'
		input.accept = '.jpg,.png,.png,.gif'
		input.onchange = () => onFileUpload(input, resolve, reject)
		document.body.appendChild(input)
		input.click()
	})
}

function useUpdateAvatarMutation(userId: string) {
	const handleUpdateAvatar = useAction(userActions.setAvatar)

	return useMutation(async (file: File) => {
		const response = await AccountsAPI.get().uploadAvatarByUserId(userId, file)

		handleUpdateAvatar(response.data.profileIcon)
	})
}

function useRemoveAvatarMutation(userId: string) {
	const handleUpdateAvatar = useAction(userActions.setAvatar)

	return useMutation(async () => {
		await AccountsAPI.get().removeAvatarByUserId(userId)

		handleUpdateAvatar(null)
	})
}

function Settings() {
	const getMessage = useMessages()
	const [userInfo] = useAtom(userAtom)
	const [settings] = useAtom(settingsAtom)
	const [selectedTheme, setSelectedTheme] = useState(settings.theme.toString())
	const [selectedLocale, setSelectedLocale] = useState(settings.locale.toString())
	const {mutate: updateSettings} = useSettingsMutation(userInfo.id, settings.locale, settings.theme)

	const tryUpdate = () => {
		updateSettings({
			settings: {
				locale: selectedLocale,
				theme: selectedTheme,
			},
		})
	}

	return (
		<div className={styles['profile-popover-content']}>
			<div className={styles['profile-popover-module-name']}>
				{getMessage('Profile.Settings')}
			</div>
			<div className={styles['profile-popover-settings-content']}>
				<div className={styles['profile-popover-settings-item-container']}>
					<div className={styles['profile-popover-settings-item-text']}>{getMessage('Profile.Settings.Theme')}</div>
					<Dropdown className={styles['profile-popover-settings-dropdown']} onItemSelect={setSelectedTheme} initialSelectedItem={settings.theme}>
						{Object.values(Theme).map(theme => <Dropdown.Item id={theme} value={getMessage(themeToId(theme))} key={theme}/>)}
					</Dropdown>
				</div>
				<div className={styles['profile-popover-settings-item-container']}>
					<div className={styles['profile-popover-settings-item-text']}>{getMessage('Profile.Settings.Locale')}</div>
					<Dropdown className={styles['profile-popover-settings-dropdown']} onItemSelect={setSelectedLocale} initialSelectedItem={settings.locale}>
						{Object.values(Locale).map(locale => <Dropdown.Item id={locale} value={getMessage(localeToId(locale))} key={locale}/>)}
					</Dropdown>
				</div>
				<Button
					className={styles['profile-button-settings-confirm']}
					type="primary"
					size="medium"
					onClick={tryUpdate}
				>
					{getMessage('Profile.Confirm')}
				</Button>
			</div>
		</div>
	)
}

function useSettingsMutation(userId: string, currenLocale: Locale, currentTheme: Theme) {
	const handleUpdateInfo = useAction(settingsAction.set)

	return useMutation(async (settingsData: UpdateUserSettingsRequest) => {
		const response = await UserSettingsAPI.get().updateUserSettings(userId, settingsData)

		handleUpdateInfo({
			locale: isLocale(response.data.settings['locale']) ? response.data.settings['locale'] : currenLocale,
			theme: isTheme(response.data.settings['theme']) ? response.data.settings['theme'] : currentTheme,
		})
	})
}

function Editing() {
	const [userInfo] = useAtom(userAtom)
	const getMessage = useMessages()
	const {mutate: updateUserInfo} = useUpdateMutation(userInfo.id)
	const [name, setName] = useState(userInfo.name)
	const [password, setPassword] = useState('')
	const [usernameValid, setUsernameValid] = useState(true)
	const [passwordValid, setPasswordValid] = useState(true)

	const nameChange = (value: string) => {
		setName(value)
	}
	const loginChange = (value: string) => {
		setPassword(value)
	}

	const validateUsername = (data: string) => {
		const isValid = isValidUsername(data)
		setUsernameValid(isValid)
		return isValid
	}

	const validatePassword = (data: string) => {
		const isValid = isValidPassword(data)
		setPasswordValid(isValid)
		return isValid
	}

	const tryUpdate = () => {
		if (password.length !== 0 && userInfo.name !== name) {
			const validUsername = validateUsername(name)
			const validPassword = validatePassword(password)
			if (validPassword && validUsername) {
				updateUserInfo({
					name,
					password,
				})
			}
		}
		if (password.length !== 0) {
			const validPassword = validatePassword(password)
			if (validPassword) {
				updateUserInfo({
					password,
				})
			}
		}
		if (userInfo.name !== name) {
			const validUsername = validateUsername(name)
			if (validUsername) {
				updateUserInfo({
					name,
				})
			}
		}
	}

	return (
		<div className={styles['profile-popover-content']}>
			<div className={styles['profile-popover-module-name']}>
				{getMessage('Profile.Editing')}
			</div>
			<div className={styles['profile-popover-editing-content']}>
				<div className={styles['profile-popover-editing-separator']}>
					{getMessage('Profile.Editing.Change.Info')}
					<div className={styles['profile-popover-editing-separator-view']}/>
				</div>
				<TextField
					className={styles['profile-text-field']}
					onChange={nameChange}
					initialValue={userInfo.name}
					errorMessage={getMessage('Error.InvalidUsernameFormat')}
					onValidate={validateUsername}
					valid={usernameValid}
				/>
				<div className={styles['profile-popover-editing-separator']}>
					{getMessage('Profile.Editing.Change.Password')}
					<div className={styles['profile-popover-editing-separator-view']}/>
				</div>
				<TextField
					className={styles['profile-text-field']}
					onChange={loginChange}
					placeholder={getMessage('Profile.Editing.Password.New')}
					errorMessage={getMessage('Error.InvalidPasswordFormat')}
					onValidate={validatePassword}
					valid={passwordValid}
				/>
				<Button
					className={styles['profile-button-confirm']}
					type="primary"
					size="medium"
					onClick={tryUpdate}
				>
					<div>{getMessage('Profile.Confirm')}</div>
				</Button>
			</div>
		</div>
	)
}

function useUpdateMutation(userId: string) {
	const handleUpdateInfo = useAction(userActions.set)

	return useMutation(async (userData: UpdateUserRequest) => {
		const response = await AccountsAPI.get().updateUser(userId, userData)

		handleUpdateInfo({user: response.data.user})
	})
}

export type {
	ProfilePopupState,
}

export {
	UserProfile,
}