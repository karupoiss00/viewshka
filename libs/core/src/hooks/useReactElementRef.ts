import {
	RefObject,
	cloneElement,
	useRef,
} from 'react'
import {isRefObject} from '../types/isRefObject'
import {ReactElementWithRef} from '../types/ReactElementWithRef'
import {Falsy} from '../types/types'

function useReactElementRef<
	T,
	REACT_ELEM extends ReactElementWithRef<T> = ReactElementWithRef<T>,
>(
	reactElement: REACT_ELEM | Falsy,
): [REACT_ELEM | Falsy, RefObject<T>] {
	const ref = useRef<T | null>(null)

	if (!reactElement) {
		ref.current = null
		return [reactElement, ref]
	}

	const elementRef = reactElement
		? reactElement.ref
		: null
	if (elementRef && !isRefObject(elementRef)) {
		throw new Error('useReactElementRef: RefCallback not supported')
	}

	return elementRef
		? [reactElement, elementRef]
		: [cloneElement(reactElement, {ref}) as REACT_ELEM, ref]
}

export {
	useReactElementRef,
}
