import classnames from 'classnames'
import * as React from 'react'
import {
	PropsWithChildren,
	useCallback,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import {useFocusTrapping} from '../hooks/useFocusTrapping'
import {useOutsideClick} from '../hooks/useOutsideClick'
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
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	preferredPosition: Position;
	triggerRect: Rect;
	setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>;
}

const PopoverContext = React.createContext<PopoverContextData>({
	show: false,
	setShow: () => {
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
	const [show, setShow] = useState(false)
	const [triggerRect, setTriggerRect] = useState(DEFAULT_RECT)

	const contextValue = {
		show,
		setShow,
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
	const {setShow, setTriggerRect} = useContext(PopoverContext)

	const ref = useRef<HTMLElement>(null)

	const onClick = () => {
		const element = ref.current
		if (element == null) {
			return
		}

		const rect = element.getBoundingClientRect()
		setTriggerRect(rect)
		setShow(isShow => !isShow)
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
	const {show} = useContext(PopoverContext)

	if (!show) {
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
	const {triggerRect, preferredPosition, setShow} = useContext(PopoverContext)
	const popoverWindowRef = useRef<HTMLDivElement>(null)
	const [coords, setCoords] = useState({
		left: 0,
		top: 0,
	})
	const closePopover = useCallback(() => {
		setShow(false)
	}, [setShow])

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
	useOutsideClick(popoverWindowRef, closePopover)

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
	const {setShow} = useContext(PopoverContext)
	const onClick = (e: MouseEvent) => {
		setShow(false)

		e.stopPropagation()
	}
	const childrenToClosePopover = React.cloneElement(children, {
		onClick,
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

Popover.Trigger = Trigger
Popover.Content = Content
Popover.Close = Close


export {
	Popover,
}