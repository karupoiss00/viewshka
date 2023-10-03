import * as React from 'react'
import {useEffect} from 'react'

function useOutsideClick(ref: React.MutableRefObject<HTMLElement | null>, callback: () => void) {
	useEffect(() => {
		const element = ref.current
		if (element == null) {
			return
		}

		const onClick = (e: MouseEvent) => {
			if (e.target instanceof Node && !element.contains(e.target)) {
				callback()
			}
		}

		/*
		 	подписка откладывается на один кадр отрисовки,
		 	чтобы повторный клик по триггеру не считался кликом вне поповера
		 */
		requestAnimationFrame(() => document.addEventListener('click', onClick))
		return () => {
			requestAnimationFrame(() => document.removeEventListener('click', onClick))
		}
	}, [callback, ref])

	return ref
}


export {
	useOutsideClick,
}