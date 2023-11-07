import {usePrevious} from '@viewshka/core'
import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import {useState, ReactElement, useContext, useEffect} from 'react'
import * as React from 'react'
import {LifecycleAnimationWrapper} from '../animation/LifecycleAnimationWrapper'
import {SystemIconArrowDown} from '../icons/SystemIconArrowDown'
import {SystemIconArrowUp} from '../icons/SystemIconArrowUp'
import styles from './Dropdown.module.css'

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
					<DropdownIcon className={styles['dropdown-icon']} isOpen={isOpen}/>
				</div>
				<DropdownList isOpen={isOpen} children={children} className={className}/>
			</div>
		</DropdownContext.Provider>
	)
}

type DropdownListProps = {
	isOpen: boolean
	children: ReactElement<ItemProps, string | React.JSXElementConstructor<unknown>>[]
	className: string | undefined
}

function DropdownList({isOpen, children, className}: DropdownListProps) {
	return (
		<LifecycleAnimationWrapper
			createShowAnimation={() => ({
				keyframes: [
					{height: '0'},
					{height: `${children.length * 40}px`},
				],
				options:  {
					duration: 150,
					iterations: 1,
				},
			})}
			createHideAnimation={() => ({
				keyframes: [
					{height: `${children.length * 40}px`},
					{height: '0'},
				],
				options:  {
					duration: 150,
					iterations: 1,
				},
			})}
		>
			{
				isOpen && <div className={classnames(
					styles['dropdown-list'],
					className,
				)}>
					{children}
				</div>
			}
		</LifecycleAnimationWrapper>
	)
}

type ItemProps = {
    id: string
	value: string
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

type DropdownIconProps = PropsWithClassname & {
	isOpen: boolean
}

function DropdownIcon({className, isOpen}: DropdownIconProps) {
	if (isOpen) {
		return <SystemIconArrowUp className={className}/>
	}

	return <SystemIconArrowDown className={className}/>
}

Dropdown.Item = Item

export {Dropdown}