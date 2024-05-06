import {Content} from '@leards/api/generated'
import {EmptyPlaceholder} from '@leards/components/common/placeholder/EmptyPlaceholder'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {SelectList} from '@viewshka/uikit'
import classnames from 'classnames'
import React, {useCallback, useState} from 'react'
import {selectedDeckIdAtom} from '../../../viewmodel/selectionAtom'
import styles from './ContentList.module.css'
import {ContentItem} from './item/ContentItem'

interface ContentListProps {
	editable: boolean
	onItemSelect: (id: string) => void
	selectedItem: string
	content: Content[] | null
}
function ContentList({onItemSelect, selectedItem, content, editable}: ContentListProps) {
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const [playAnimation, setPlayAnimation] = useState(false)
	const contentItems = content?.map(item =>
		<ContentItem
			item={item}
			selected={item.id === selectedDeckId}
			editable={editable}
			key={item.id}
		/>,
	)

	const selectHandler = useCallback((id: string) => {
		const selectedContent = content.find(c => c.id === id)
		setPlayAnimation(selectedContent.type === 'folder')
		onItemSelect(id)
	}, [content, onItemSelect])

	if (!contentItems?.length) {
		return (
			<Placeholder/>
		)
	}

	const className = classnames(styles.listContainer, {
		[styles.listContainerAnimation]: playAnimation,
	})

	return (
		<div className={className} onAnimationEnd={() => setPlayAnimation(false)}>
			<SelectList onItemSelect={selectHandler} selectedItem={selectedItem}>
				{contentItems}
			</SelectList>
		</div>
	)
}

function Placeholder() {
	const getMessage = useMessages()

	return <EmptyPlaceholder text={getMessage('Sidebar.Empty.Placeholder')}/>
}

export {
	ContentList,
}