import classnames from 'classnames'
import React, {PropsWithChildren, ReactElement, useContext, useState} from 'react'
import styles from './SectionSelector.module.css'

type ItemProps = PropsWithChildren & {
    id: string
}

type SectionSelectorProps = {
    children: ReactElement<ItemProps>[]
    onItemSelect: (id: string) => void
}

type SectionSelectorContextData = {
	selectedItem: string
	setSelectedItem: (id: string) => void;
}

const SectionSelectorContext = React.createContext<SectionSelectorContextData>({
	selectedItem: '',
	setSelectedItem: () => {
		throw new Error('ListContext setSelectedItem should be used under provider')
	},
})

function SectionSelector({children, onItemSelect}: SectionSelectorProps) {
	const [selectedItem, setSelectedItem] = useState<string>(children[0].props.id)

	const contextValue: SectionSelectorContextData = {
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

function Item({id, children}: ItemProps) {
	const {selectedItem, setSelectedItem} = useContext(SectionSelectorContext)
	const onClick = () => {
		setSelectedItem(id)
	}

	return (
		<div
			className={classnames(styles['item'], {
				[styles['item--selected']]: selectedItem === id,
			})}
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