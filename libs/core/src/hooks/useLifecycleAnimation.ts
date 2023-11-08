import {RefObject, useMemo, useRef} from 'react'
import {CreateAnimationFn, playAnimation, PlayAnimationResult} from '../animation/playAnimation'
import {sequentalAsync} from '../async/sequentalAsync'
import {verify} from '../types/assert'
import {useLatestRef} from './useLatestRef'

/**
 * Привязывает анимации отображения и скрытия к переданному dom-элементу
 */
function useLifecycleAnimation<ELEM extends Element>(args: {
	ref: RefObject<ELEM>,
	createShowAnimation?: CreateAnimationFn<ELEM>,
	createHideAnimation?: CreateAnimationFn<ELEM>,
}): {
	show: () => Promise<PlayAnimationResult>,
	hide: () => Promise<PlayAnimationResult>,
} {
	const argsRef = useLatestRef(args)
	const abortControllerRef = useRef<AbortController | null>(null)

	return useMemo(() => {
		async function animate(
			createAnimation: CreateAnimationFn<ELEM> | undefined,
			hidden: boolean,
		): Promise<PlayAnimationResult> {
			const element = verify(args.ref.current, useLifecycleAnimation.name)

			if (element instanceof HTMLElement) {
				element.style.visibility = 'visible'
			}
			const promise: Promise<PlayAnimationResult> = createAnimation
				? (() => {
					abortControllerRef.current?.abort()
					abortControllerRef.current = new AbortController()
					return playAnimation(
						element,
						createAnimation,
						abortControllerRef.current.signal,
					)
				})()
				: Promise.resolve('finished')
			const result = await promise
			if (hidden && element instanceof HTMLElement) {
				element.style.visibility = 'hidden'
			}
			return result
		}

		return {
			show: sequentalAsync(() =>
				animate(argsRef.current?.createShowAnimation, false),
			),
			hide: sequentalAsync(() =>
				animate(argsRef.current?.createHideAnimation, true),
			),
		}
	}, [args.ref, argsRef])
}

export {
	useLifecycleAnimation,
}
