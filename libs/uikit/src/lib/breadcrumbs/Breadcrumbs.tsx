import {PropsWithClassname} from '@viewshka/core'
import {Button, SystemIconArrowRight} from '@viewshka/uikit'
import classnames from 'classnames'
import {PropsWithChildren, ReactElement, useContext} from 'react'
import * as React from 'react'
import styles from './Breadcrumbs.module.css'

type ItemProps = PropsWithChildren & {
	id: string
}

type BreadcrumbsProps = PropsWithClassname & {
	children?: ReactElement<ItemProps>[] | ReactElement<ItemProps>;
	onItemClick: (id: string) => void;
};

type BreadcrumbsContextData = {
	onItemClick: (id: string) => void;
}

const BreadcrumbsContext = React.createContext<BreadcrumbsContextData>({
	onItemClick: () => {
		throw new Error('BreadcrumbsContext onItemClick should be used under provider')
	},
})

function Breadcrumbs({
	children,
	className,
	onItemClick,
}: BreadcrumbsProps) {

	const contextValue: BreadcrumbsContextData = {
		onItemClick: id => {
			onItemClick(id)
		},
	}

	let crumbs

	if (children) {
		crumbs = (Array.isArray(children) ? children : [children]).map(child => (
			<div className={styles['item-with-arrow']} key={child.key}>
				{child}
				<SystemIconArrowRight/>
			</div>
		))
	}

	return (
		<BreadcrumbsContext.Provider value={contextValue}>
			<div className={classnames(styles['breadcrumbs'], className)}>
				{crumbs}
			</div>
		</BreadcrumbsContext.Provider>
	)
}

function Item({id, children}: ItemProps) {
	const {onItemClick} = useContext(BreadcrumbsContext)
	const onClick = () => {
		onItemClick(id)
	}

	return (
		<div className={styles['item']} onClick={onClick}>
			{children}
		</div>
	)
}

Breadcrumbs.Item = Item

export {
	Breadcrumbs,
}