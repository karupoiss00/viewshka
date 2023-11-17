import {useLayoutEffect} from '@viewshka/core'
import {RefObject, useEffect, useRef} from 'react'

type GetEventTypeMap<TARGET extends EventTarget> =
	TARGET extends Animation ? AnimationEventMap :
	TARGET extends AbortSignal ? AbortSignalEventMap :
	TARGET extends Document ? DocumentEventMap :
	TARGET extends Window ? (WindowEventHandlersEventMap & GlobalEventHandlersEventMap) :
	TARGET extends HTMLBodyElement ? HTMLBodyElementEventMap :
	TARGET extends HTMLVideoElement ? HTMLVideoElementEventMap :
	TARGET extends HTMLMediaElementEventMap ? HTMLMediaElementEventMap :
	TARGET extends HTMLElement ? HTMLElementEventMap :
	TARGET extends Element ? (ElementEventMap & GlobalEventHandlersEventMap) :
	never

function useEventListener<
	TARGET extends EventTarget,
	TYPE extends keyof GetEventTypeMap<TARGET>
>(
	eventName: TYPE,
	handler: (event: GetEventTypeMap<TARGET>[TYPE]) => void,
	element?: RefObject<TARGET>,
	options?: boolean | AddEventListenerOptions,
) {
	// Create a ref that stores handler
	const savedHandler = useRef(handler)

	useLayoutEffect(() => {
		savedHandler.current = handler
	}, [handler])

	useEffect(() => {
		// Define the listening target
		const targetElement: TARGET | Window = element?.current ?? window

		if (!(targetElement && targetElement.addEventListener)) {
			return
		}

		// Create event listener that calls handler function stored in ref
		const listener: typeof handler = event => savedHandler.current(event)

		targetElement.addEventListener(eventName as string, listener as EventListenerOrEventListenerObject, options)

		// Remove event listener on cleanup
		return () => {
			targetElement.removeEventListener(eventName as string, listener as EventListenerOrEventListenerObject, options)
		}
	}, [eventName, element, options])
}

export {
	useEventListener,
}