import {CardData} from '../cardEditor/CardEditor'

const CARDS_PULL: CardData[] = [
	{
		word: 'car🚗',
		translation: 'автомобиль',
	},
	{
		word: 'house🏠',
		translation: 'дом',
	},
	{
		word: 'book📚',
		translation: 'книга',
	},
	{
		word: 'computer💻',
		translation: 'компьютер',
	},
	{
		word: 'phone📱',
		translation: 'телефон',
	},
	{
		word: 'tree🌳',
		translation: 'дерево',
	},
	{
		word: 'cat🐱',
		translation: 'кошка',
	},
	{
		word: 'dog🐶',
		translation: 'собака',
	},
	{
		word: 'flower🌺',
		translation: 'цветок',
	},
	{
		word: 'sun☀',
		translation: 'солнце',
	},
	{
		word: 'moon🌙',
		translation: 'луна',
	},
	{
		word: 'star⭐',
		translation: 'звезда',
	},
	{
		word: 'heart❤',
		translation: 'сердце',
	},
	{
		word: 'fish🐠',
		translation: 'рыба',
	},
	{
		word: 'bird🐦',
		translation: 'птица',
	},
	{
		word: 'apple🍎',
		translation: 'яблоко',
	},
	{
		word: 'pear🍐',
		translation: 'груша',
	},
	{
		word: 'orange🍊',
		translation: 'апельсин',
	},
	{
		word: 'banana🍌',
		translation: 'банан',
	},
	{
		word: 'grape🍇',
		translation: 'виноград',
	},
]

function createRandomCardGetter() {
	let copy = CARDS_PULL.slice(0)
	return () => {
		if (copy.length < 1) {
			copy = CARDS_PULL.slice(0)
		}
		const index = Math.floor(Math.random() * copy.length)
		const item = copy[index]
		copy.splice(index, 1)
		return item
	}
}

function getCards() {
	const get = createRandomCardGetter()
	return [
		get(),
		get(),
		get(),
		get(),
		get(),
	]
}

export {
	getCards,
}