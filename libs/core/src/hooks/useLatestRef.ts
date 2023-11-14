import {MutableRefObject, useRef} from 'react'

function useLatestRef<T>(value: T): MutableRefObject<T> {
	const ref = useRef(value)
	ref.current = value
	return ref
}

export {
	useLatestRef,
}