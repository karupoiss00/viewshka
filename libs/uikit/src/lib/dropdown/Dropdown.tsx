import {PropsWithClassname} from '@viewshka/core'
import classnames from 'classnames'
import {PropsWithChildren, useState, ReactElement, useContext} from 'react'
import * as React from 'react'
import {SystemIconArrowDown} from '../icons/SystemIconArrowDown'
import {SystemIconArrowUp} from '../icons/SystemIconArrowUp'
import styles from './Dropdown.module.css'

type ItemProps = {
    id: string
	value: string
}

type DropdownProps = PropsWithClassname & {
	children: ReactElement<ItemProps>[]
	initialSelectedItem?: string
	onItemSelect: (id: string, value: string) => void,
	placeholder: string
}

type DropdownContextData = {
    selectedItem: string
    setSelectedItem: (id: string, value: string) => void
}

type DropdownIconProps = {
	isOpen: boolean
}

type DropdownListProps = {
	isOpen: boolean
	children: ReactElement<ItemProps, string | React.JSXElementConstructor<unknown>>[]
	className: string | undefined
}

const DropdownContext = React.createContext<DropdownContextData>({
	selectedItem: '',
	setSelectedItem: () => {
		throw new Error('ListContext setIsShow should be used under provider')
	},
})

function Dropdown({children, className, initialSelectedItem, onItemSelect, placeholder}: DropdownProps) {
	const initialItem = children.find(item => item.props.id === initialSelectedItem)?.props.value
	const [selectedItem, setSelectedItem] = useState(initialSelectedItem || '')
	const [isOpen, setIsOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState(initialItem ?? placeholder)

	const contextValue: DropdownContextData = {
		selectedItem,
		setSelectedItem: (id, value) => {
			onItemSelect(id, value)
			setSelectedItem(id)
			setSelectedValue(value)
			setIsOpen(false)
		},
	}

	return (
		<DropdownContext.Provider value={contextValue}>
			<div className={styles['dropdown-container']}>
				<div
					onClick={_ => {
						setIsOpen(!isOpen)
					}}
					className={classnames(styles['dropdown'])}
				>
					<p
						className={classnames(styles['dropdown-text'], {
							[styles['dropdown-text--default']]: selectedItem.length === 0,
						})
						}
					>
						{selectedValue}
					</p>
					<DropdownIcon isOpen={isOpen}/>
				</div>
				<DropdownList isOpen={isOpen} children={children} className={className}/>
			</div>
		</DropdownContext.Provider>
	)
}

function DropdownList({isOpen, children, className}: DropdownListProps) {
	if (isOpen) {
		return (
			<div className={classnames(styles['dropdown-list'], className)}>
				{children}
			</div>
		)
	}
	else {
		return null
	}
}

function Item({id, value}: ItemProps) {
	const {selectedItem, setSelectedItem} = useContext(DropdownContext)
	const className = classnames(styles['item'], {
		[styles['item--selected']]: selectedItem === id,
	})
	const onClick = () => {
		setSelectedItem(id, value)
	}

	return (
		<div className={className} onClick={onClick}>
			{value}
		</div>
	)
}

function DropdownIcon({isOpen}: DropdownIconProps) {
	if (isOpen) {
		return <SystemIconArrowUp/>
	}
	else {
		return <SystemIconArrowDown/>
	}
}

Dropdown.Item = Item

export {Dropdown}