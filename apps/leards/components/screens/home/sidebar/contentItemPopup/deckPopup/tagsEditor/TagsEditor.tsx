import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useEventListener} from '@viewshka/core'
import {TextField} from '@viewshka/uikit'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {arrayDiff} from '../../../../../../../../../libs/uikit/src/lib/types/arrayDiff'
import styles from './TagsEditor.module.css'
import {TagsList} from './tagsList/TagsList'

const MAX_TAG_LENGTH = 16
const MAX_TAGS_COUNT = 5

type TagsEditorProps = {
	tags: string[]
	onChange: (tags: unknown) => void
}
function TagsEditor({tags: _tags, onChange}: TagsEditorProps) {
	const getMessage = useMessages()
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const {initialTags, tags, addTag, removeTag} = useDeckTags(_tags)

	const isValidTagName = useCallback((value: string) => {
		const preparedValue = value.trim()
		return preparedValue.length < MAX_TAG_LENGTH && !tags.includes(preparedValue)
	}, [tags])

	const onEnter = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Enter' && isValidTagName(value)) {
			setValue('')
			addTag(value.trim().replace(' ', '_'))
		}
	}, [addTag, isValidTagName, value])


	useEventListener('keydown', onEnter, inputRef)

	useEffect(() => {
		if (!initialTags || !tags) {
			return
		}
		onChange(arrayDiff(initialTags, tags, (a, b) => a === b))
	}, [initialTags, onChange, tags])

	if (!tags) {
		return null
	}

	return (
		<div className={styles.tagsEditor}>
			<TextField
				size="small"
				ref={inputRef}
				value={value}
				onChange={newValue => setValue(newValue)}
				onValidate={isValidTagName}
				invalidateOnChange={true}
				placeholder={getMessage('ContentSettingsPopup.TextField.AddTag')}
				disabled={tags.length >= MAX_TAGS_COUNT}
			/>
			<TagsList tags={tags} onRemove={removeTag} />
		</div>
	)
}

function useDeckTags(_tags: string[]) {
	const [tags, setTags] = useState<string[]>(_tags)
	const initialTagsRef = useRef(tags)

	const addTag = useCallback((tag: string) => {
		if (tags.includes(tag)) {
			return
		}

		setTags([...tags, tag])
	}, [tags])

	const removeTag = useCallback((tagToRemove: string) => {
		setTags(tags.filter(tag => tag !== tagToRemove))
	}, [tags])

	return {
		tags,
		addTag,
		removeTag,
		initialTags: initialTagsRef.current,
	}
}

export {
	TagsEditor,
}