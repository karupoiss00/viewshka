import {listen} from '../events/listen'
import {optionalArrayItems} from '../types/optionalArrayItems'

type CreateAnimationFn<ELEM extends Element = Element> = (element: ELEM) => AnimationInfo

type AnimationInfo = {
	keyframes: Keyframe[] | PropertyIndexedKeyframes | null
	options?: number | KeyframeEffectOptions
}
type PlayAnimationResult = 'finished' | 'canceled' | 'removed'
function playAnimation<ELEM extends Element = Element>(
	element: ELEM, createAnimation: CreateAnimationFn<ELEM>,
	abortSignal?: AbortSignal,
): Promise<PlayAnimationResult> {
	if (!isNativeAnimationSupported()) {
		return Promise.resolve('finished')
	}
	return new Promise(resolve => {
		const {keyframes, options} = createAnimation(element)
		const effect = new KeyframeEffect(
			element,
			keyframes,
			options,
		)
		const animation = new Animation(effect)
		const unsubs = [
			abortSignal && listen(abortSignal, 'abort', () => onEnd('canceled')),
			listen(animation, 'cancel', () => onEnd('canceled')),
			listen(animation, 'finish', () => onEnd('finished')),
			listen(animation, 'remove', () => onEnd('removed')),
		]
		animation.play()
		function onEnd(result: PlayAnimationResult) {
			optionalArrayItems(unsubs).forEach(x => x())
			animation.cancel()
			resolve(result)
		}
	})
}
function isNativeAnimationSupported() {
	let supported = false
	try {
		supported = !!window['Animation']
	}
	catch (_) {}
	return supported
}
export type {
	CreateAnimationFn,
	AnimationInfo,
	PlayAnimationResult,
}
export {
	playAnimation,
}