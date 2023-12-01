import {useAtom} from '@reatom/npm-react'
import {SectionSelector, SystemIconDeck, TextField} from '@viewshka/uikit'
import React from 'react'
import {useQuery} from 'react-query'
import {searchStringAtom} from '../viewmodel/searchStringAtom'
import {DecksList} from './deckList/DecksList'
import styles from './SearchResult.module.css'

function SearchResult() {
	//const [searchResult] = useAtom(searchResultAtom)
	const [searchString, setSearchString] = useAtom(searchStringAtom)

	return (
		<div className={styles.layout}>
			<TextField
				className={styles.searchField}
				placeholder={'Поиск колод'}
				onChange={setSearchString}
				size={'small'}
			/>
			<div className={styles.results}>
				{!!searchString && <SortingPanel/>}
				{
					searchString
						? <MostPopularDecks/> //<DecksList decks={searchResult}/>
						: <MostPopularDecks/>
				}
			</div>
		</div>
	)
}

function SortingPanel() {
	return (
		<div className={styles.filterPanel}>
			<SectionSelector
				type={'secondary'}
				onItemSelect={() => {}}
			>
				<SectionSelector.Item id={'all'}>
					Все
				</SectionSelector.Item>
				<SectionSelector.Item id={'name'}>
					По названию
				</SectionSelector.Item>
				<SectionSelector.Item id={'tags'}>
					По тегам
				</SectionSelector.Item>
			</SectionSelector>
			<SystemIconDeck/>
		</div>
	)
}

function MostPopularDecks() {
	const {data, isLoading} = useQuery('popularDecks', async () => ({
		content: [
			{
				id: '1',
				name: 'животные🐶',
			},
			{
				id: '2',
				name: 'еда🍉',
			},
			{
				id: '3',
				name: 'эмоции😄',
			},
			{
				id: '4',
				name: 'природа🌳',
			},
			{
				id: '5',
				name: 'технологии🔧',
			},
			{
				id: '6',
				name: 'искусство🎨',
			},
			{
				id: '7',
				name: 'спорт⚽',
			},
			{
				id: '8',
				name: 'музыка🎵',
			},
			{
				id: '9',
				name: 'путешествия✈️',
			},
			{
				id: '10',
				name: 'наука🔬',
			},
			{
				id: '11',
				name: 'фильмы🎥',
			},
			{
				id: '12',
				name: 'литература📚',
			},
			{
				id: '13',
				name: 'мода👗',
			},
			{
				id: '14',
				name: 'история📜',
			},
			{
				id: '15',
				name: 'автомобили🚗',
			},
			{
				id: '16',
				name: 'компьютеры💻',
			},
			{
				id: '17',
				name: 'здоровье🏥',
			},
			{
				id: '18',
				name: 'образование📖',
			},
			{
				id: '19',
				name: 'домашние дела🏠',
			},
			{
				id: '20',
				name: 'мемы😂',
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

export {
	SearchResult,
}