import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import {PropsWithChildren, ReactElement, useContext, useState} from 'react'
import * as React from 'react'
import styles from './SelectList.module.css'

type ItemProps = PropsWithChildren & {
	id: string
	selected?: boolean
}

type ListProps = PropsWithClassname & {
	children: ReactElement<ItemProps>[];
	initialSelectedItem?: string;
	onItemSelect: (id: string) => void;
	selectedItem?: string;
};

type ListContextData = {
	selectedItem: string
	setSelectedItem: (id: string) => void;
}

const ListContext = React.createContext<ListContextData>({
	selectedItem: '',
	setSelectedItem: () => {
		throw new Error('ListContext setSelectedItem should be used under provider')
	},
})

function SelectList({
	children,
	className,
	initialSelectedItem,
	onItemSelect,
	selectedItem: forceSelectedItem,
}: ListProps) {
	const [selectedItem, setSelectedItem] = useState<string>(
		initialSelectedItem || '',
	)

	const contextValue: ListContextData = {
		selectedItem: forceSelectedItem || selectedItem,
		setSelectedItem: id => {
			onItemSelect(id)
			setSelectedItem(id)
		},
	}

	return (
		<ListContext.Provider value={contextValue}>
			<div className={classnames(styles['list'], className)}>{children}</div>
		</ListContext.Provider>
	)
}

function Item({id, children}: ItemProps) {
	const {selectedItem, setSelectedItem} = useContext(ListContext)
	const className = classnames(styles['item'], {
		[styles['item--selected']]: selectedItem === id,
	})
	const onClick = () => {
		setSelectedItem(id)
	}

	return (
		<div className={className} onClick={onClick}>
			{children}
		</div>
	)
}

SelectList.Item = Item

export {
	SelectList,
}