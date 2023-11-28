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
import {createPortal} from 'react-dom'
import {useEventListener} from '../../../../core/src/hooks/useEventListener'
import {useFocusTrapping} from '../hooks/useFocusTrapping'
import {useOutsideClick} from '../hooks/useOutsideClick'
import {getPopoverLayerElement} from './layer/PopoverLayer'
import styles from './Popover.module.css'

type Position = 'bottom-center' | 'bottom-left' | 'bottom-right';

const DEFAULT_RECT = {
	left: 0,
	top: 0,
	width: 0,
	height: 0,
}

const MARGIN = 30

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
	children: React.ReactNode
	preferredPosition: Position
	triggerRef?: React.RefObject<HTMLElement>
	onClose: () => void
}

function Popover({
	children,
	triggerRef,
	preferredPosition = 'bottom-center',
	onClose,
}: PopoverProps) {
	const [show, setShow] = useState(false)
	const [triggerRect, setTriggerRect] = useState(DEFAULT_RECT)

	useEventListener(
		'click',
		() => {
			const rect = triggerRef?.current?.getBoundingClientRect()
			if (!rect) {
				return
			}
			onClose()
			setShow(isShow => !isShow)
			setTriggerRect(rect)
		},
		triggerRef,
	)

	const contextValue = {
		show,
		setShow,
		preferredPosition,
		triggerRect,
		setTriggerRect,
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
	let top = triggerRect.top + triggerRect.height + MARGIN
	const left = Math.max(triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2, MARGIN)

	if (top + popoverRect.height > window.innerHeight - MARGIN) {
		top = triggerRect.top - MARGIN - popoverRect.height
	}

	return {
		top,
		left,
	}
}

Popover.Content = Content
Popover.Close = Close


export {
	Popover,
}