import {
	SearchPublicStoragesOrderByEnum,
	SearchPublicStoragesSearchTypeEnum,
	SearchPublicStoragesSortTypeEnum,
	SearchResult as SearchResultData,
} from '@leards/api/generated'
import {SearchAPI} from '@leards/api/SearchAPI'
import {useDebounce} from '@viewshka/core'
import {TextField} from '@viewshka/uikit'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {DecksList} from './deckList/DecksList'
import styles from './SearchResult.module.css'
import {SortingPanel} from './sortingPanel/SortingPanel'

const PAGE_SIZE = 1000
const DEBOUNCE_DELAY = 1000

function SearchResult() {
	const [searchString, setSearchString] = useState('')
	const [searchType, setSearchType] = useState<SearchPublicStoragesSearchTypeEnum>('all')
	const [orderBy, setOrderBy] = useState<SearchPublicStoragesOrderByEnum>('asc')
	const [sortType, setSortType] = useState<SearchPublicStoragesSortTypeEnum>('name')
	const debouncedSearchString = useDebounce(searchString, DEBOUNCE_DELAY)
	const searchResult = useSearchQuery({
		searchString: debouncedSearchString,
		searchType,
		orderBy,
		sortType,
	})

	return (
		<div className={styles.layout}>
			<TextField
				className={styles.searchField}
				placeholder="Поиск колод"
				onChange={setSearchString}
				size="small"
			/>
			<div className={styles.results}>
				{
					!!searchString
					&& <SortingPanel
						onSearchTypeChange={setSearchType}
						onSortParameterChange={setSortType}
						onOrderByChange={setOrderBy}
					/>
				}
				{
					searchString
						? <DecksList decks={searchResult}/>
						: <MostPopularDecks/>
				}
			</div>
		</div>
	)
}

function MostPopularDecks() {
	const {data, isLoading} = useQuery('popularDecks', async () => ({
		content: [
			{
				id: '1',
				name: 'животные🐶',
				tags: [],
			},
			{
				id: '2',
				name: 'еда🍉',
				tags: [],
			},
			{
				id: '3',
				name: 'эмоции😄',
				tags: [],
			},
			{
				id: '4',
				name: 'природа🌳',
				tags: [],
			},
			{
				id: '5',
				name: 'технологии🔧',
				tags: [],
			},
			{
				id: '6',
				name: 'искусство🎨',
				tags: [],
			},
			{
				id: '7',
				name: 'спорт⚽',
				tags: [],
			},
			{
				id: '8',
				name: 'музыка🎵',
				tags: [],
			},
			{
				id: '9',
				name: 'путешествия✈️',
				tags: [],
			},
			{
				id: '10',
				name: 'наука🔬',
				tags: [],
			},
			{
				id: '11',
				name: 'фильмы🎥',
				tags: [],
			},
			{
				id: '12',
				name: 'литература📚',
				tags: [],
			},
			{
				id: '13',
				name: 'мода👗',
				tags: [],
			},
			{
				id: '14',
				name: 'история📜',
				tags: [],
			},
			{
				id: '15',
				name: 'автомобили🚗',
				tags: [],
			},
			{
				id: '16',
				name: 'компьютеры💻',
				tags: [],
			},
			{
				id: '17',
				name: 'здоровье🏥',
				tags: [],
			},
			{
				id: '18',
				name: 'образование📖',
				tags: [],
			},
			{
				id: '19',
				name: 'домашние дела🏠',
				tags: [],
			},
			{
				id: '20',
				name: 'мемы😂',
				tags: [],
			},
		],
	}))

	if (!data || isLoading) {
		return null
	}

	return (
		<DecksList decks={data.content}/>
	)
}

type SearchQueryParams = {
	searchString: string
	searchType: SearchPublicStoragesSearchTypeEnum
	orderBy: SearchPublicStoragesOrderByEnum
	sortType: SearchPublicStoragesSortTypeEnum
}
function useSearchQuery({searchString, searchType, orderBy, sortType}: SearchQueryParams) {
	const [result, setResult] = useState<SearchResultData[]>([])

	const {data, status} = useQuery(['librarySearch', searchString, searchType, orderBy, sortType], async () => {
		const tags = parseTags(searchString)
		const searchStr = prepareSearchString(searchString)
		const response = await SearchAPI.get().searchPublicStorages(
			searchType,
			sortType,
			orderBy,
			0,
			PAGE_SIZE,
			searchStr,
			tags,
		)

		return response.data
	})

	useEffect(() => {
		if (status === 'success') {
			setResult(data.filter(data => data.type === 'deck'))
		}
	}, [data, status])

	return result
}

function prepareSearchString(str: string): string {
	return str
		.split(' ')
		.filter(word => word[0] !== '#')
		.join(' ')
}

function parseTags(str: string): Array<string> {
	return str
		.split(' ')
		.filter(word => word[0] === '#')
		.map(s => s.substring(1))
}

export {
	SearchResult,
}