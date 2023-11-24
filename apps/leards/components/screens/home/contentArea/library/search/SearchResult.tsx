import {LibraryAPI} from '@leards/api/LibraryAPI'
import {useAtom} from '@reatom/npm-react'
import React from 'react'
import {useQuery} from 'react-query'
import {searchResultAtom} from '../viewmodel/searchResultAtom'
import {searchStringAtom} from '../viewmodel/searchStringAtom'
import {DecksList} from './deckList/DecksList'

function SearchResult() {
	const [searchResult] = useAtom(searchResultAtom)
	const [searchString] = useAtom(searchStringAtom)

	if (!searchString) {
		return (
			<MostPopularDecks/>
		)
	}

	return (
		<div>
			<DecksList decks={searchResult}/>
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
		<div>
			<DecksList decks={data.content}/>
		</div>
	)
}

export {
	SearchResult,
}