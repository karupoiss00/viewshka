import * as React from 'react'
import {useEffect} from 'react'

function useOutsideClick(ref: React.MutableRefObject<HTMLElement | null>, callback: () => void, excludedElements: Array<Element> = []) {
	useEffect(() => {
		const element = ref.current
		if (element == null) {
			return
		}

		const onClick = (e: MouseEvent) => {
			const clickOnExcludedElement = excludedElements.some(el => e.composedPath().includes(el))
			if (e.target instanceof Node && !element.contains(e.target) && !clickOnExcludedElement) {
				callback()
			}
		}

		/*
		 	подписка откладывается на один кадр отрисовки,
		 	чтобы повторный клик по триггеру не считался кликом вне поповера
		 */
		requestAnimationFrame(() => document.addEventListener('mousedown', onClick))
		return () => {
			requestAnimationFrame(() => document.removeEventListener('mousedown', onClick))
		}
	}, [callback, excludedElements, ref])

	return ref
}


export {
	useOutsideClick,
}