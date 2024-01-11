import {
	SearchPublicStoragesOrderByEnum,
	SearchPublicStoragesSearchTypeEnum,
	SearchPublicStoragesSortTypeEnum, SearchResult as SearchResultData,
} from '@leards/api/generated'
import {SearchAPI} from '@leards/api/SearchAPI'
import {addHookDeps, useBatchedListItems} from '@viewshka/core'
import {useCallback, useEffect, useState} from 'react'

const PAGE_SIZE = 20
const BATCH_DELAY = 1000

type SearchQueryParams = {
	page: number
	pageSize: number,
	searchString: string
	searchType: SearchPublicStoragesSearchTypeEnum
	orderBy: SearchPublicStoragesOrderByEnum
	sortType: SearchPublicStoragesSortTypeEnum
}
function useSearchQuery({searchString, searchType, orderBy, sortType, page, pageSize}: SearchQueryParams) {
	const [result, setResult] = useState<SearchResultData[]>([])

	useEffect(() => {
		const tags = parseTags(searchString)
		const searchStr = prepareSearchString(searchString)

		SearchAPI.get().searchPublicStorages(
			searchType,
			sortType,
			orderBy,
			page + 1,
			pageSize,
			searchStr,
			tags,
		).then(({data: currentPageData}) => {
			SearchAPI.get().searchPublicStorages(
				searchType,
				sortType,
				orderBy,
				page + 2,
				pageSize,
				searchStr,
				tags,
			).then(({data: nextPageData}) => {
				setResult(oldResults => {
					const newResults = currentPageData.filter(c => c.type === 'deck')
					const mergedResults = oldResults.filter(x => !!x).concat(newResults)
					mergedResults.length += nextPageData.length

					return mergedResults
				})
			})

		})
	}, [searchString, searchType, orderBy, sortType, page, pageSize])

	useEffect(() => {
		setResult([])
		addHookDeps(searchString, searchType, orderBy, sortType)
	}, [searchString, searchType, orderBy, sortType])

	return result
}


type PaginatedSearchQueryParams = {
	searchString: string
	searchType: SearchPublicStoragesSearchTypeEnum
	orderBy: SearchPublicStoragesOrderByEnum
	sortType: SearchPublicStoragesSortTypeEnum
}
function usePaginatedSearchQuery({searchString, searchType, orderBy, sortType}: PaginatedSearchQueryParams) {
	const [page, setPage] = useState(0)
	const [batchResetDependency, setBatchResetDependency] = useState(Number.MIN_SAFE_INTEGER)
	useEffect(() => {
		setPage(0)
		setBatchResetDependency(i => i + 1)
		addHookDeps(searchString, searchType, orderBy, sortType)
	}, [orderBy, searchString, searchType, sortType])

	const searchResults = useSearchQuery({
		page,
		pageSize: PAGE_SIZE,
		searchString,
		searchType,
		orderBy,
		sortType,
	})

	const {
		visibleItems,
		showPreloader,
		revealNextBatch,
	} = useBatchedListItems({
		items: searchResults,
		batchSize: PAGE_SIZE,
		batchDelay: BATCH_DELAY,
		batchResetDependency,
	})

	const revealNext = useCallback(() => {
		setPage(page + 1)
		revealNextBatch()
	}, [page, revealNextBatch])

	return {
		visibleItems,
		revealNext,
		showPreloader: !!searchString && showPreloader,
	}
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
	usePaginatedSearchQuery,
}