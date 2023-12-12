import {TextField} from '@viewshka/uikit'
import React, {useEffect, useState} from 'react'

type MaterialNameEditorProps = {
	initialValue: string
	onChange: (name: string, valid: boolean) => void
}
function MaterialNameEditor({initialValue, onChange}: MaterialNameEditorProps) {
	const [nameValid, setNameValid] = useState(true)
	const [name, setName] = useState('')

	const onNameValidate = (value: string) => {
		const valid = value.length > 0
		setNameValid(valid)
		return valid
	}

	useEffect(() => {
		onChange(name, nameValid)
	}, [name, nameValid, onChange])

	return (
		<TextField
			onChange={setName}
			size={'small'}
			initialValue={initialValue}
			invalidateOnChange={true}
			onValidate={onNameValidate}
		/>
	)
}

export {
	MaterialNameEditor,
}