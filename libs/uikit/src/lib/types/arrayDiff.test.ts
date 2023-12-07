import {arrayDiff} from './arrayDiff'

it('check empty arrays', () => {
	const {added, removed} = arrayDiff([], [], (a, b) => a === b)

	expect(added.length).toEqual(0)
	expect(removed.length).toEqual(0)
})

it('check equal arrays', () => {
	const {added, removed} = arrayDiff([1, 2, 3, 4, 5], [5, 4, 3, 2, 1], (a, b) => a === b)

	expect(added.length).toEqual(0)
	expect(removed.length).toEqual(0)
})

it('check added', () => {
	const {added, removed} = arrayDiff([], [1, 2, 3], (a, b) => a === b)

	expect(added).toEqual([1, 2, 3])
	expect(removed.length).toEqual(0)
})

it('check removed', () => {
	const {added, removed} = arrayDiff([1, 2, 3], [], (a, b) => a === b)

	expect(added.length).toEqual(0)
	expect(removed).toEqual([1, 2, 3])
})

it('check added and removed', () => {
	const {added, removed} = arrayDiff([1, 2, 3], [5, 6, 7], (a, b) => a === b)

	expect(added).toEqual([5, 6, 7])
	expect(removed).toEqual([1, 2, 3])
})
