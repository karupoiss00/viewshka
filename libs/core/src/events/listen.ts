function listen< TARGET extends EventTarget,
	TYPE extends keyof GetEventTypeMap<TARGET>, >(
	target: TARGET, type: TYPE,
	callback: ((event: GetEventTypeMap<TARGET>[TYPE]) => boolean | void) | null, options?: AddEventListenerOptions | boolean,
): () => void {
	target.addEventListener(
	type as string, callback as EventListenerOrEventListenerObject | null,
	options)
	return () => target.removeEventListener(type as string,
		callback as EventListenerOrEventListenerObject | null, options,
	)
}

type GetEventTypeMap<TARGET extends EventTarget> = TARGET extends Animation ? AnimationEventMap :
	TARGET extends AbortSignal ? AbortSignalEventMap : TARGET extends Document ? DocumentEventMap :
		TARGET extends Window ? (WindowEventHandlersEventMap & GlobalEventHandlersEventMap) : TARGET extends HTMLBodyElement ? HTMLBodyElementEventMap :
			TARGET extends HTMLVideoElement ? HTMLVideoElementEventMap : TARGET extends HTMLMediaElementEventMap ? HTMLMediaElementEventMap :
				TARGET extends HTMLElement ? HTMLElementEventMap : TARGET extends Element ? (ElementEventMap & GlobalEventHandlersEventMap) :
					never
export {
	type GetEventTypeMap,
	listen,
}