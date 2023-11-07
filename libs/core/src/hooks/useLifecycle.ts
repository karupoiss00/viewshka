import {MutableRefObject, RefObject, useLayoutEffect, useRef} from 'react'
import {ReactElementWithRef} from '../types/ReactElementWithRef'
import {Falsy} from '../types/types'
import {useLatestRef} from './useLatestRef'
import {usePrevious} from './usePrevious'
import {useReactElementRef} from './useReactElementRef'
import {useRerender} from './useRerender'

/**
 * Вызывает `onShow` в начале жизни react-элемента и `onHide` в конце.
 * Возвращает react-элемент с учетом выполнения `onHide`.
 */
function useLifecycle<
	ELEM extends Element,
	REACT_ELEM extends ReactElementWithRef<ELEM> = ReactElementWithRef<ELEM>,
>(args: {
	ref: RefObject<ELEM>,
	reactElement: REACT_ELEM | Falsy,
	onShow?: (element: ELEM) => Promise<unknown>,
	onHide?: (element: ELEM) => Promise<unknown>,
}): REACT_ELEM | null {
	const [reactElement, ref] = useReactElementRef<ELEM, REACT_ELEM>(args.reactElement)

	const argsRef = useLatestRef(args)
	const rerender = useRerender()

	const reactElementRef = useRef<REACT_ELEM | null>(null)
	if (reactElement) {
		reactElementRef.current = reactElement
	}

	const alive = !!reactElement
	const prevAlive = usePrevious(alive)
	const mutableRef = args.ref as MutableRefObject<ELEM | null>

	useLayoutEffect(() => {
		const element = ref.current ?? mutableRef.current

		if (!element) {
			return
		}
		mutableRef.current = element

		if (alive && !prevAlive) {
			argsRef.current.onShow?.(element)
		}
		else if (!alive && prevAlive) {
			const cleanup = () => {
				mutableRef.current = null
				reactElementRef.current = null
				rerender()
			}
			const hide = argsRef.current.onHide
			if (hide) {
				hide(element).finally(cleanup)
			}
			else {
				cleanup()
			}
		}
	}, [mutableRef, ref, alive, prevAlive, argsRef, rerender, reactElement])

	return reactElementRef.current
}

export {
	useLifecycle,
}
