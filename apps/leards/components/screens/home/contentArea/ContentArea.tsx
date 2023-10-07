import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {PropsWithClassname} from '@viewshka/core'
import {Button, SystemIconDeck, SystemIconFolder, SystemIconShare} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {PropsWithChildren} from 'react'
import {selectionAtom} from '../viewmodel/selectionAtom'
import {SelectedContentData} from '../viewmodel/types/ApplicationSelection'
import styles from './ContentArea.module.css'

function ContentArea({className}: PropsWithClassname) {
	const [selection] = useAtom(selectionAtom)

	return (
		<div className={classnames(styles.contentArea, className)}>
			{selection.type === 'user-content' && <UserContent info={selection.content}/>}
		</div>
	)
}

interface UserContentProps {
	info: SelectedContentData | null
}

function UserContent({info}: UserContentProps) {
	const getMessage = useMessages()
	const emptyState = !info || !info.deckId

	return (
		<div className={styles.container}>
			{emptyState && <EmptyContent />}
			<BottomPanel>
				<Button
					type={'link'}
					size={'large'}
					onClick={() => console.log('share')}
				>
					<SystemIconShare />
				</Button>
				<Button
					className={styles.buttonStart}
					type={'secondary'}
					size={'medium'}
					onClick={() => console.log('start')}
					state={emptyState ? 'disabled' : 'default'}
				>
					{getMessage('Button.Start.Train')}
				</Button>
			</BottomPanel>
		</div>
	)
}

function EmptyContent() {
	const getMessage = useMessages()

	return (
		<div className={styles.emptyContent}>
			<div className={styles.createButtonsContainer}>
				<Button type={'secondary'} size={'large'} onClick={() => console.log('create folder')}>
					{<SystemIconFolder/>}
					{getMessage('Button.Create.Folder')}
				</Button>
				<Button type={'secondary'} size={'large'} onClick={() => console.log('create deck')}>
					{<SystemIconDeck/>}
					{getMessage('Button.Create.Deck')}
				</Button>
			</div>
		</div>
	)
}

function BottomPanel({children}: PropsWithChildren) {
	return <div className={styles.bottomPanel}>{children}</div>
}

export default ContentArea