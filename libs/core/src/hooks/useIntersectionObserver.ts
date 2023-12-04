import type {RefObject} from 'react'
import {useEffect} from 'react'
import {verify} from '../types/assert'
import {useLatestRef} from './useLatestRef'

type Args = {
	ref: RefObject<Element>,
	onIntersect?: () => void,
	onLeave?: () => void,
	disabled?: boolean,
	threshold?: number | number[],
}

function useIntersectionObserver({
	ref,
	onIntersect: _onIntersect,
	onLeave: _onLeave,
	disabled = false,
	threshold,
}: Args) {
	const onIntersectRef = useLatestRef(_onIntersect)
	const onLeaveRef = useLatestRef(_onLeave)

	useEffect(() => {
		if (disabled) {
			return
		}
		const observer = new IntersectionObserver(entries => {
			const onLeave = onLeaveRef.current
			const onIntersect = onIntersectRef.current
			if (entries.some(x => x.isIntersecting)) {
				onIntersect && onIntersect()
			}
			else {
				onLeave && onLeave()
			}
		}, {
			threshold,
		})
		observer.observe(verify(ref.current))
		return () => observer.disconnect()
	}, [onLeaveRef, onIntersectRef, ref, disabled, threshold])
}

export {
	useIntersectionObserver,
}