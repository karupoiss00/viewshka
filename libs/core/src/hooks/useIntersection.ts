import {useCallback, useRef, useState} from 'react'

function useIntersection<T extends HTMLElement = HTMLElement>(
	options?: ConstructorParameters<typeof IntersectionObserver>[1],
) {
	const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

	const observer = useRef<IntersectionObserver | null>(null)

	const ref = useCallback(
		(element: T | null) => {
			if (observer.current) {
				observer.current.disconnect()
				observer.current = null
			}

			if (element === null) {
				setEntry(null)
				return
			}

			observer.current = new IntersectionObserver(([_entry]) => {
				setEntry(_entry)
			}, options)

			observer.current.observe(element)
		},
		[options],
	)

	return {ref, entry}
}

export {
	useIntersection,
}