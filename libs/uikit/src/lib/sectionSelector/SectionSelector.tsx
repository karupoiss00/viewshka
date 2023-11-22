import classnames from 'classnames'
import React, {PropsWithChildren, ReactElement, useContext, useState} from 'react'
import styles from './SectionSelector.module.css'

type SectionSelectorType = 'primary' | 'secondary'

type SectionSelectorProps = {
	type: SectionSelectorType
    children: ReactElement<ItemProps>[]
    onItemSelect: (id: string) => void
}

type SectionSelectorContextData = {
	type: SectionSelectorType
	selectedItem: string
	setSelectedItem: (id: string) => void;
}

const SectionSelectorContext = React.createContext<SectionSelectorContextData>({
	type: 'primary',
	selectedItem: '',
	setSelectedItem: () => {
		throw new Error('ListContext setSelectedItem should be used under provider')
	},
})

function SectionSelector({
	type,
	children,
	onItemSelect,
}: SectionSelectorProps) {
	const [selectedItem, setSelectedItem] = useState<string>(children[0].props.id)

	const contextValue: SectionSelectorContextData = {
		type,
		selectedItem: selectedItem,
		setSelectedItem: id => {
			onItemSelect(id)
			setSelectedItem(id)
		},
	}

	return (
		<SectionSelectorContext.Provider value={contextValue}>
			<div className={styles['selector']}>
				{children}
			</div>
		</SectionSelectorContext.Provider>
	)
}

type ItemProps = PropsWithChildren & {
    id: string
}

function Item({id, children}: ItemProps) {
	const {type, selectedItem, setSelectedItem} = useContext(SectionSelectorContext)

	const onClick = () => {
		setSelectedItem(id)
	}

	const className = classnames(
		styles['item'],
		styles[`item--type-${type}`], {
			[styles['item--selected']]: selectedItem === id,
		},
	)

	return (
		<div
			className={className}
			onClick={onClick}
		>
			{children}
		</div>
	)
}

SectionSelector.Item = Item

export {
	SectionSelector,
}