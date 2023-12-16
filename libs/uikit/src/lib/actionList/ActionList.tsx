import {PropsWithClassname} from '@viewshka/uikit'
import classnames from 'classnames'
import {forwardRef, PropsWithChildren, ReactElement, useContext} from 'react'
import * as React from 'react'
import styles from './ActionList.module.css'

type ItemProps = PropsWithChildren & PropsWithClassname & {
	id: string
	selected?: boolean
}

type ListProps = PropsWithClassname & {
	children: ReactElement<ItemProps>[];
	onItemClick: (id: string) => void;
};

type ListContextData = {
	onItemClick: (id: string) => void;
}

const ListContext = React.createContext<ListContextData>({
	onItemClick: () => {
		throw new Error('ListContext setSelectedItem should be used under provider')
	},
})

function ActionList({
	children,
	className,
	onItemClick,
}: ListProps) {
	const contextValue: ListContextData = {
		onItemClick,
	}

	return (
		<ListContext.Provider value={contextValue}>
			<div className={classnames(styles['list'], className)}>{children}</div>
		</ListContext.Provider>
	)
}

const Item = forwardRef<HTMLDivElement, ItemProps>(({id, children, className: externalStyle}: ItemProps, ref) => {
	const {onItemClick} = useContext(ListContext)
	const className = classnames(styles['item'], externalStyle)
	const onClick = (e: React.MouseEvent<HTMLElement>) => {
		if (!e.defaultPrevented) {
			onItemClick(id)
		}
	}

	return (
		<div
			className={className}
			onClick={onClick}
			ref={ref}
		>
			{children}
		</div>
	)
})


ActionList.Item = Item

export {
	ActionList,
}