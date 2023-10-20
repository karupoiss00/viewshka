import {useState} from 'react'
import {useDidUpdateEffect} from './useDidUpdateEffect'

function useDebounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useDidUpdateEffect(
		() => {
			const handler = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)
			return () => {
				clearTimeout(handler)
			}
		},
		[delay, value],
	)

	return debouncedValue
}

export {
	useDebounce,
}