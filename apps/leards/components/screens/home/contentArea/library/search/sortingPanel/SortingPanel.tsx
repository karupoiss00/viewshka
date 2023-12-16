import {
	SearchPublicStoragesOrderByEnum,
	SearchPublicStoragesSearchTypeEnum,
	SearchPublicStoragesSortTypeEnum,
} from '@leards/api/generated'
import {
	SectionSelector,
	SystemIconAlphaList,
	SystemIconAscSort,
	SystemIconDescSort,
	SystemIconRatingList,
} from '@viewshka/uikit'
import React, {useCallback, useEffect, useState} from 'react'
import styles from './SortingPanel.module.css'

type SortingPanelProps = {
	onSearchTypeChange: (searchType: SearchPublicStoragesSearchTypeEnum) => void
	onOrderByChange: (orderBy: SearchPublicStoragesOrderByEnum) => void
	onSortParameterChange: (sortType: 'name' | 'rating') => void
}
function SortingPanel(props: SortingPanelProps) {
	const {
		onSearchTypeChange,
		onOrderByChange,
		onSortParameterChange,
	} = props
	return (
		<div className={styles.filterPanel}>
			<SectionSelector
				type="secondary"
				onItemSelect={onSearchTypeChange}
			>
				<SectionSelector.Item id="all">
					Все
				</SectionSelector.Item>
				<SectionSelector.Item id="name">
					По названию
				</SectionSelector.Item>
				<SectionSelector.Item id="tag">
					По тегам
				</SectionSelector.Item>
			</SectionSelector>
			<OrderBySwitcher onChange={onOrderByChange}/>
			<SortTypeSwitcher onChange={onSortParameterChange}/>
		</div>
	)
}

type OrderBySwitcherProps = {
	onChange: (orderBy: SearchPublicStoragesOrderByEnum) => void
}
function OrderBySwitcher({onChange}: OrderBySwitcherProps) {
	const [orderBy, setOrderBy] = useState<SearchPublicStoragesOrderByEnum>('asc')

	const onClick = useCallback(() => {
		if (orderBy === 'asc') {
			setOrderBy('desc')
		}
		else {
			setOrderBy('asc')
		}
	}, [orderBy])

	useEffect(() => {
		onChange(orderBy)
	}, [onChange, orderBy])

	return (
		<div
			className={styles.switcher}
			onClick={onClick}
		>
			{
				orderBy === 'desc'
					? <SystemIconDescSort/>
					: <SystemIconAscSort/>
			}
		</div>
	)
}

type SortTypeSwitcherProps = {
	onChange: (sortType: SearchPublicStoragesSortTypeEnum) => void
}
function SortTypeSwitcher({onChange}: SortTypeSwitcherProps) {
	const [sortType, setSortType] = useState<SearchPublicStoragesSortTypeEnum>('name')

	const onClick = useCallback(() => {
		if (sortType === 'name') {
			setSortType('rating')
		}
		else {
			setSortType('name')
		}
	}, [sortType])

	useEffect(() => {
		onChange(sortType)
	}, [onChange, sortType])

	return (
		<div
			className={styles.switcher}
			onClick={onClick}
		>
			{
				sortType === 'name'
					? <SystemIconAlphaList/>
					: <SystemIconRatingList/>
			}
		</div>
	)
}

export {
	SortingPanel,
}