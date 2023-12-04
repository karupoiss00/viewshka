import {useIntersectionObserver} from '@viewshka/core'
import {RefObject, useState} from 'react'

function useElementVisible(ref: RefObject<HTMLElement>, delay = 0) {
	const [visible, setVisible] = useState(false)

	useIntersectionObserver({
		ref,
		onIntersect: () => setTimeout(() => setVisible(true), delay),
	})

	return visible
}

export {
	useElementVisible,
}