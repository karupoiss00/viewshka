import {Button, SystemIconCopy} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {useRef} from 'react'
import styles from './CopyLinkField.module.css'

type CopyLinkFieldProps = {
	link: string,
	disabled: boolean
}
function CopyLinkField({link, disabled}: CopyLinkFieldProps) {
	const linkContainerRef = useRef<HTMLInputElement>()

	const copyShareLink = () => {
		const {current: linkContainer} = linkContainerRef
		const link = linkContainer.value
		window.navigator.clipboard.writeText(link)
		linkContainer.select()
		linkContainer.setSelectionRange(0, link.length)
	}

	return (
		<div className={styles.container}>
			<input
				className={classnames(styles.link, {
					[styles.linkDisabled]: disabled,
				})}
				ref={linkContainerRef}
				value={link}
				readOnly={true}
				disabled={disabled}
			/>
			<Button
				className={styles.copyButton}
				spacing="none"
				type="link"
				size="small"
				state={disabled ? 'disabled' : 'default'}
				onClick={copyShareLink}
			>
				<SystemIconCopy/>
			</Button>
		</div>
	)
}

export {
	CopyLinkField,
}