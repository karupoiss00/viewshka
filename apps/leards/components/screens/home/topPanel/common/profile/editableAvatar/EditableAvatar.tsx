import {userAtom} from '@leards/components/common/viewmodel/userAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {generateRandomColor, isUndefined} from '@viewshka/core'
import {ActionList, Avatar, Popover, SystemIconCamera} from '@viewshka/uikit'
import {useRef, useState} from 'react'
import styles from './EditableAvatar.module.css'

type EditableAvatarProps = {
	addImage: () => void
	deleteImage: () => void
}

function EditableAvatar({addImage, deleteImage}: EditableAvatarProps) {
	const [user] = useAtom(userAtom)

	const avatarExist = !isUndefined(user.avatarUrl) && user.avatarUrl !== undefined

	return (
		<div className={styles['avatar-container']}>
			{
				avatarExist
					? <Avatar size="large" type="image" avatarUrl={user.avatarUrl}/>
					: <Avatar size="large" type="gradient" name={user.name}/>
			}
			<AvatarActionButton
				addImage={addImage}
				deleteImage={deleteImage}
			/>
		</div>
	)
}

type AvatarActionListProps = {
	addImage: () => void
	deleteImage: () => void
}

function AvatarActionButton({addImage, deleteImage}: AvatarActionListProps) {
	const getMessage = useMessages()
	const [user] = useAtom(userAtom)
	const listRef = useRef()
	const [popoverOpened, setPopoverOpened] = useState(false)

	const avatarExist = !isUndefined(user.avatarUrl) && user.avatarUrl !== undefined

	const onItemClick = (id: string) => {
		if (id === 'add-image') {
			addImage()
		}
		if (id === 'delete-image') {
			deleteImage()
		}
		setPopoverOpened(false)
	}

	return (
		<div>
			<div
				className={styles['avatar-button']}
				style={{
					backgroundColor: generateColor(avatarExist, user.name),
				}}
				ref={listRef}
				onClick={() => setPopoverOpened(true)}
			>
				<SystemIconCamera/>
			</div>
			<Popover
				relativePosition={{
					verticalAlign: 'bottom',
					horizontalAlign: 'end',
				}}
				triggerRef={listRef}
				visible={!popoverOpened ? popoverOpened : undefined}
			>
				<Popover.Content>
					<ActionList onItemClick={onItemClick}>
						<ActionList.Item id="add-image">
							{getMessage('Avatar.Add')}
						</ActionList.Item>
						<ActionList.Item id="delete-image">
							{getMessage('Avatar.Delete')}
						</ActionList.Item>
					</ActionList>
				</Popover.Content>
			</Popover>
		</div>
	)
}

function generateColor(hasAvatar: boolean, name: string) {
	if (hasAvatar) {
		return null
	}

	return generateRandomColor(name.length < 4 ? name + name : name.substring(0, 4))
}

export {
	EditableAvatar,
}