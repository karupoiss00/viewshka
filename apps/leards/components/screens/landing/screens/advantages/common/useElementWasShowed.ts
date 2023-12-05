import {useIntersectionObserver} from '@viewshka/core'
import {RefObject, useState} from 'react'

function useElementWasShowed(ref: RefObject<HTMLElement>) {
	const [visible, setVisible] = useState(false)

	useIntersectionObserver({
		ref,
		onIntersect: () => setVisible(true),
	})

	return visible
}

export {
	useElementWasShowed,
}