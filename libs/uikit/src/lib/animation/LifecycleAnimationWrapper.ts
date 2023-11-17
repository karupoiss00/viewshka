import {getOnlyChildElement, useLifecycle, useLifecycleAnimation, CreateAnimationFn} from '@viewshka/core'
import {PropsWithChildren, useRef} from 'react'

function LifecycleAnimationWrapper<ELEM extends Element>(props: PropsWithChildren<{
	createShowAnimation?: CreateAnimationFn<ELEM>,
	createHideAnimation?: CreateAnimationFn<ELEM>,
	onShowStart?: () => void,
	onShowFinish?: () => void,
	onHideStart?: () => void,
	onHideFinish?: () => void,
}>) {
	const {
		createShowAnimation,
		createHideAnimation,
		onShowStart,
		onShowFinish,
		onHideStart,
		onHideFinish,
		children,
	} = props
	const ref = useRef<ELEM>(null)

	const {
		show,
		hide,
	} = useLifecycleAnimation({
		ref,
		createShowAnimation,
		createHideAnimation,
	})

	const reactElement = getOnlyChildElement(children)

	return useLifecycle<ELEM>({
		ref,
		reactElement,
		onShow: async () => {
			onShowStart?.()
			const result = await show()
			onShowFinish?.()
			return result
		},
		onHide: async () => {
			onHideStart?.()
			const result = await hide()
			onHideFinish?.()
			return result
		},
	})
}

export {
	LifecycleAnimationWrapper,
}
