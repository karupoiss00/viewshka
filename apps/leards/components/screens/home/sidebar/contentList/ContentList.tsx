import {Content} from '@leards/api/generated'
import {ContentItem} from '@leards/components/screens/home/sidebar/contentList/item/ContentItem'
import {selectedDeckIdAtom} from '@leards/components/screens/home/viewmodel/selectionAtom'
import {useMessages} from '@leards/i18n/hooks/useMessages'
import {useAtom} from '@reatom/npm-react'
import {SelectList} from '@viewshka/uikit'
import React from 'react'
import styles from './ContentList.module.css'

interface ContentListProps {
	editable: boolean
	onItemSelect: (id: string) => void
	selectedItem: string
	content: Content[] | null
}
function ContentList({onItemSelect, selectedItem, content, editable}: ContentListProps) {
	const [selectedDeckId] = useAtom(selectedDeckIdAtom)
	const contentItems = content?.map(item =>
		<ContentItem
			item={item}
			selected={item.id === selectedDeckId}
			editable={editable}
			key={item.id}
		/>,
	)

	if (!contentItems?.length) {
		return (
			<Placeholder/>
		)
	}

	return (
		<div className={styles.listContainer}>
			<SelectList onItemSelect={onItemSelect} selectedItem={selectedItem}>
				{contentItems}
			</SelectList>
		</div>
	)
}

function Placeholder() {
	const getMessage = useMessages()

	return (
		<div className={styles.placeholderContainer}>
			<div className={styles.placeholder}></div>
			{getMessage('Sidebar.Empty.Placeholder')}
		</div>
	)
}

export {
	ContentList,
}