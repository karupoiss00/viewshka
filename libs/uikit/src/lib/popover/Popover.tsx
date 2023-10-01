import classnames from 'classnames'
import * as React from 'react'
import {
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import styles from './Popover.module.css'

type Position = 'bottom-center' | 'bottom-left' | 'bottom-right';

const DEFAULT_RECT = {
	left: 0,
	top: 0,
	width: 0,
	height: 0,
}

type Rect = Pick<DOMRect, 'left' | 'top' | 'height' | 'width'>;

type PopoverContextData = {
	isShow: boolean;
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
	preferredPosition: Position;
	triggerRect: Rect;
	setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>;
}

const PopoverContext = React.createContext<PopoverContextData>({
	isShow: false,
	setIsShow: () => {
		throw new Error('PopoverContext setIsShow should be used under provider')
	},
	preferredPosition: 'bottom-center',
	triggerRect: DEFAULT_RECT,
	setTriggerRect: () => {
		throw new Error(
			'PopoverContext setTriggerRect should be used under provider',
		)
	},
})

interface PopoverProps {
	children: React.ReactNode;
	preferredPosition: Position;
}

function Popover({
	children,
	preferredPosition = 'bottom-center',
}: PopoverProps) {
	const [isShow, setIsShow] = useState(false)
	const [triggerRect, setTriggerRect] = useState(DEFAULT_RECT)

	const contextValue = {
		isShow,
		setIsShow,
		preferredPosition,
		triggerRect,
		setTriggerRect,
	}

	return (
		<PopoverContext.Provider value={contextValue}>
			{children}
		</PopoverContext.Provider>
	)
}

interface TriggerProps {
	children: React.ReactElement
}

function Trigger({children}: TriggerProps) {
	const {setIsShow, setTriggerRect} = useContext(PopoverContext)

	const ref = useRef<HTMLElement>(null)

	const onClick = () => {
		const element = ref.current
		if (element == null) {
			return
		}

		const rect = element.getBoundingClientRect()
		setTriggerRect(rect)
		setIsShow(isShow => !isShow)
	}

	const triggeringPopoverChildren = React.cloneElement(children, {
		onClick,
		ref,
	})

	return triggeringPopoverChildren
}

interface ContentProps extends PropsWithChildren {
	className?: string
}

function Content({className, children}: ContentProps) {
	const {isShow} = useContext(PopoverContext)

	if (!isShow) {
		return null
	}

	return (
		<PopoverWindow className={className}>
			{children}
		</PopoverWindow>
	)
}

interface PopoverWindowProps extends PropsWithChildren {
	className?: string
	children: React.ReactNode
}

function PopoverWindow({className, children}: PopoverWindowProps) {
	const {triggerRect, preferredPosition, setIsShow} = useContext(PopoverContext)
	const popoverWindowRef = useRef<HTMLDivElement>(null)
	const [coords, setCoords] = useState({
		left: 0,
		top: 0,
	})
	const closePopover = useCallback(() => {
		setIsShow(false)
	}, [setIsShow])

	useLayoutEffect(() => {
		const element = popoverWindowRef.current
		if (element == null) {
			return
		}

		const rect = element.getBoundingClientRect()

		const coords = getPopoverCoords(triggerRect, rect, preferredPosition)

		setCoords(coords)
	}, [preferredPosition, triggerRect])

	useFocusTrapping(popoverWindowRef)
	useClickOutside(popoverWindowRef, closePopover)

	return (
		<div
			className={classnames(styles['popover'], className)}
			ref={popoverWindowRef}
			style={{
				position: 'fixed',
				left: `${coords.left}px`,
				top: `${coords.top}px`,
				margin: 0,
			}}
		>
			{children}
		</div>
	)
}

function Close({children}: { children: React.ReactElement }) {
	const {setIsShow} = useContext(PopoverContext)
	const onClick = (e: MouseEvent) => {
		setIsShow(false)

		// popover will be gone
		// prevent this event triggering unexpected click
		e.stopPropagation()
	}
	const childrenToClosePopover = React.cloneElement(children, {
		onClick, // TODO: we better merge the onClick
	})

	return childrenToClosePopover
}

function getPopoverCoords(
	triggerRect: Rect,
	popoverRect: Rect,
	position: Position,
) {
	// TODO: допилить для остальных положений
	let top = triggerRect.top + triggerRect.height + 10
	const left = Math.max(triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2, 10)

	if (top + popoverRect.height > window.innerHeight - 10) {
		top = triggerRect.top - 10 - popoverRect.height
	}

	return {
		top,
		left,
	}
}

const focusableQuery = ':is(input, button, [tab-index])'

function useFocusTrapping(ref: React.MutableRefObject<HTMLElement|null>) {
	const refTrigger = useRef<HTMLElement>(document.activeElement as HTMLElement)

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		const popover = ref.current
		if (popover == null) {
			return
		}
		const focusableElements: Array<HTMLElement> = Array.from(popover.querySelectorAll(focusableQuery))

		const lastFocusable = focusableElements[focusableElements.length - 1]
		if (e.key === 'Tab' && document.activeElement === lastFocusable) {
			focusableElements[0]?.focus()
			e.preventDefault()
		}
	}, [ref])

	useEffect(() => {
		const popover = ref.current
		const trigger = refTrigger.current

		if (popover == null) {
			return
		}

		const focusableElements: Array<HTMLElement> = Array.from(popover.querySelectorAll(focusableQuery))
		focusableElements[0]?.focus()

		document.addEventListener('keydown', onKeyDown)

		return () => {
			document.removeEventListener('keydown', onKeyDown)
			const currentActiveElement = document.activeElement
			if (currentActiveElement == document.body) {
				trigger?.focus()
			}
		}
	}, [onKeyDown, ref])
}

function useClickOutside(ref: React.MutableRefObject<HTMLElement|null>, callback: () => void) {
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

Popover.Trigger = Trigger
Popover.Content = Content
Popover.Close = Close


export default Popover