import {useEffect} from 'react'

function useEnterHandler(callback: () => void) {
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				callback()
			}
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [callback])
}

export {
	useEnterHandler,
}