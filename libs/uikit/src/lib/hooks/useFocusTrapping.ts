import * as React from 'react'
import {useCallback, useEffect, useRef} from 'react'

const focusableQuery = ':is(input, button, [tab-index])'

function useFocusTrapping(ref: React.MutableRefObject<HTMLElement|null>) {
	const refTrigger = useRef<HTMLElement>(document.activeElement as HTMLElement)

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		const popover = ref.current
		if (popover == null) {
			return
		}
		const focusableElements: Array<HTMLElement> = Array.from(popover.querySelectorAll(focusableQuery))

		const lastFocusable = focusableElements[focusableElements.length - 1]
		if (e.key === 'Tab' && document.activeElement === lastFocusable) {
			focusableElements[0]?.focus()
			e.preventDefault()
		}
	}, [ref])

	useEffect(() => {
		const popover = ref.current
		const trigger = refTrigger.current

		if (popover == null) {
			return
		}

		const focusableElements: Array<HTMLElement> = Array.from(popover.querySelectorAll(focusableQuery))
		focusableElements[0]?.focus()

		document.addEventListener('keydown', onKeyDown)

		return () => {
			document.removeEventListener('keydown', onKeyDown)
			const currentActiveElement = document.activeElement
			if (currentActiveElement == document.body) {
				trigger?.focus()
			}
		}
	}, [onKeyDown, ref])
}

export {
	useFocusTrapping,
}