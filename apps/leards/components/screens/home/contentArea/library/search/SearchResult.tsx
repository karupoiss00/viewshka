import {
	SearchPublicStoragesOrderByEnum,
	SearchPublicStoragesSearchTypeEnum,
	SearchPublicStoragesSortTypeEnum,
} from '@leards/api/generated'
import {
	usePaginatedSearchQuery,
} from '@leards/components/screens/home/contentArea/library/search/usePaginatedSearchQuery'
import {useAction} from '@reatom/npm-react'
import {useDebounce} from '@viewshka/core'
import {ReachablePreloaderContainer, TextField} from '@viewshka/uikit'
import React, {useCallback, useState} from 'react'
import {useQuery} from 'react-query'
import {selectionActions} from '../../../viewmodel/selectionAtom'
import {DecksList} from './deckList/DecksList'
import styles from './SearchResult.module.css'
import {SortingPanel} from './sortingPanel/SortingPanel'

const DEBOUNCE_DELAY = 1000

function SearchResult() {
	const handleSelectDeckAction = useAction(selectionActions.selectDeck)
	const [searchString, setSearchString] = useState('')
	const [searchType, setSearchType] = useState<SearchPublicStoragesSearchTypeEnum>('all')
	const [orderBy, setOrderBy] = useState<SearchPublicStoragesOrderByEnum>('asc')
	const [sortType, setSortType] = useState<SearchPublicStoragesSortTypeEnum>('name')
	const debouncedSearchString = useDebounce(searchString, DEBOUNCE_DELAY)
	const {visibleItems, showPreloader, revealNext} = usePaginatedSearchQuery({
		searchString: debouncedSearchString,
		searchType,
		orderBy,
		sortType,
	})

	const selectDeck = useCallback((id: string) => handleSelectDeckAction({
		deckId: id,
	}), [handleSelectDeckAction])

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
						? <DecksList
							decks={visibleItems.filter(x => !!x)}
							onDeckClick={selectDeck}
						>
							{
								showPreloader && <ReachablePreloaderContainer
									className={styles.loadingContainer}
									onPreloaderReached={revealNext}
								/>
							}
						</DecksList>
						: <MostPopularDecks/>
				}

			</div>
		</div>
	)
}

function MostPopularDecks() {
	const {data, isLoading} = useQuery('popularDecks', async () => ({
		content: [],
	}))

	if (!data || isLoading) {
		return null
	}

	return (
		<DecksList decks={data.content} onDeckClick={() => {}}/>
	)
}


export {
	SearchResult,
}