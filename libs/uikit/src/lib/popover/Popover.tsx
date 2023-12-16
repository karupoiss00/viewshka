import {addHookDeps, clampNumber, useEventListener, useResizeObserver} from '@viewshka/core'
import classnames from 'classnames'
import * as React from 'react'
import {PropsWithChildren, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {useFocusTrapping} from '../hooks/useFocusTrapping'
import {useOutsideClick} from '../hooks/useOutsideClick'
import {getPopoverLayerElement} from './layer/PopoverLayer'
import styles from './Popover.module.css'

type HorizontalPosition = 'start' | 'center' | 'end'
type VerticalPosition = 'top' | 'center' | 'bottom'

type RelativePosition = {
	verticalAlign: VerticalPosition,
	horizontalAlign: HorizontalPosition,
}

const DEFAULT_RECT = {
	left: 0,
	top: 0,
	width: 0,
	height: 0,
}

const MARGIN = 30

type Rect = Pick<DOMRect, 'left' | 'top' | 'height' | 'width'>;

type PopoverContextData = {
	show: boolean,
	setShow: React.Dispatch<React.SetStateAction<boolean>>,
	relativePosition: RelativePosition,
	triggerRect: Rect,
	setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>,
	notExcludedElements: boolean,
}

const PopoverContext = React.createContext<PopoverContextData>({
	show: false,
	setShow: () => {
		throw new Error('PopoverContext setIsShow should be used under provider')
	},
	relativePosition: {
		verticalAlign: 'bottom',
		horizontalAlign: 'center',
	},
	triggerRect: DEFAULT_RECT,
	setTriggerRect: () => {
		throw new Error(
			'PopoverContext setTriggerRect should be used under provider',
		)
	},
	notExcludedElements: false,
})

interface PopoverProps {
	children: React.ReactNode
	relativePosition?: RelativePosition,
	triggerRef?: React.RefObject<HTMLElement>
	onClose?: () => void
	visible?: boolean
	notExcludedElements?: boolean
}

function Popover({
	children,
	triggerRef,
	relativePosition = {
		verticalAlign: 'bottom',
		horizontalAlign: 'center',
	},
	onClose,
	visible = true,
	notExcludedElements = false,
}: PopoverProps) {
	const [show, setShow] = useState(false)
	const [triggerRect, setTriggerRect] = useState(DEFAULT_RECT)

	const bodyRef = useRef(document.body)
	const bodySize = useResizeObserver(bodyRef)

	useEventListener(
		'mousedown',
		() => {
			const rect = triggerRef?.current?.getBoundingClientRect()
			if (!rect) {
				return
			}
			onClose?.()
			setShow(isShow => !isShow)
			setTriggerRect(rect)
		},
		triggerRef,
	)

	useEffect(() => {
		const rect = triggerRef?.current?.getBoundingClientRect()
		if (!rect) {
			return
		}
		setTriggerRect(rect)
		addHookDeps(bodySize)
	}, [bodySize, triggerRef])


	useEffect(() => {
		if (!visible) {
			setShow(false)
		}
	}, [visible])

	const contextValue = {
		show,
		setShow,
		relativePosition,
		triggerRect,
		setTriggerRect,
		notExcludedElements,
	}

	return (
		createPortal(
			<PopoverContext.Provider value={contextValue}>
				{children}
			</PopoverContext.Provider>,
			getPopoverLayerElement(),
		)
	)
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
	const {triggerRect, relativePosition, setShow, notExcludedElements} = useContext(PopoverContext)
	const bodyRef = useRef(document.body)
	const popoverWindowRef = useRef<HTMLDivElement>(null)
	const [coords, setCoords] = useState({
		left: 0,
		top: 0,
	})
	const closePopover = useCallback(() => {
		setShow(false)
	}, [setShow])

	const bodySize = useResizeObserver(bodyRef)

	const arrayPopoverLayerElement = notExcludedElements ? [] : [getPopoverLayerElement()]

	useLayoutEffect(() => {
		const element = popoverWindowRef.current
		if (element == null) {
			return
		}

		const rect = element.getBoundingClientRect()

		const coords = getPopoverCoords(triggerRect, rect, relativePosition)

		setCoords(coords)
		addHookDeps(bodySize)
	}, [bodySize, relativePosition, triggerRect])

	useFocusTrapping(popoverWindowRef)

	useOutsideClick(popoverWindowRef, closePopover, arrayPopoverLayerElement)

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

type CloseProps = {
	children: React.ReactElement
	onClose: () => void
}

function Close({children, onClose}: CloseProps) {
	const {setShow} = useContext(PopoverContext)
	const onClick = (e: MouseEvent) => {
		onClose()
		setShow(false)

		e.stopPropagation()
	}
	return React.cloneElement(children, {
		onClick,
	})
}

function getPopoverCoords(
	triggerRect: Rect,
	popoverRect: Rect,
	relativePosition: RelativePosition,
) {
	return {
		top: getVerticalPosition(triggerRect, popoverRect, relativePosition.verticalAlign),
		left: getHorizontalPosition(triggerRect, popoverRect, relativePosition.horizontalAlign),
	}
}

function getHorizontalPosition(triggerRect: Rect, popoverRect: Rect, position: HorizontalPosition) {
	const minLeft = MARGIN
	const maxLeft = window.innerWidth - popoverRect.width - MARGIN
	let left: number
	switch (position) {
		case 'center':
			left = Math.max(triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2, MARGIN)
			break
		case 'end':
			left = Math.max(triggerRect.left + triggerRect.width + MARGIN, MARGIN)
			break
		case 'start':
			left = Math.max(triggerRect.left - triggerRect.width - popoverRect.width - MARGIN, MARGIN)
			break
	}
	return clampNumber(left, minLeft, maxLeft)
}

function getVerticalPosition(triggerRect: Rect, popoverRect: Rect, position: VerticalPosition) {
	let top: number

	switch (position) {
		case 'top':
			top = triggerRect.top - triggerRect.height - popoverRect.height - MARGIN
			break
		case 'center':
			top = triggerRect.top
			break
		case 'bottom':
			top = triggerRect.top + triggerRect.height + MARGIN
			break
	}

	if (top + popoverRect.height > window.innerHeight - MARGIN) {
		top = triggerRect.top - MARGIN - popoverRect.height
	}

	return top
}

Popover.Content = Content
Popover.Close = Close


export {
	Popover,
}