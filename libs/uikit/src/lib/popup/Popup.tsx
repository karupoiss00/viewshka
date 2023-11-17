import classnames from 'classnames'
import * as React from 'react'
import {
	KeyboardEvent,
	MouseEvent,
	PropsWithChildren,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react'
import {createPortal} from 'react-dom'
import {useEventListener} from '../../../../core/src/hooks/useEventListener'
import {useFocusTrapping} from '../hooks/useFocusTrapping'
import {useOutsideClick} from '../hooks/useOutsideClick'
import {getPopupLayerElement, PopupLayer} from './layer/PopupLayer'
import styles from './Popup.module.css'

type PopupContextData = {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	close: () => void,
}

const PopupContext = React.createContext<PopupContextData>({
	show: false,
	setShow: () => {
		throw new Error('PopupContext setIsShow should be used under provider')
	},
	close: () => {
		throw new Error('PopupContext close should be used under provider')
	},
})

interface PopupProps {
	children: React.ReactNode
	triggerRef?: React.RefObject<HTMLElement>,
}

function Popup({children, triggerRef}: PopupProps) {
	const [show, setShow] = useState(false)

	const contextValue = {
		show,
		setShow,
		close: () => setShow(false),
	}

	useEventListener(
		'click',
		() => setShow(isShow => !isShow),
		triggerRef,
	)

	return (
		createPortal(
			<PopupContext.Provider value={contextValue}>
				{children}
			</PopupContext.Provider>,
			getPopupLayerElement(),
		)
	)
}

interface TriggerProps {
	children: React.ReactElement
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

interface ContentProps extends PropsWithChildren {
	className?: string
}

function Content({className, children}: ContentProps) {
	const {show, setShow} = useContext(PopupContext)
	const ref = useRef<HTMLDivElement>(null)

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			setShow(false)
		}
	}, ref)

	if (!show) {
		return null
	}

	return (
		<PopupWindow className={className} ref={ref}>
			{children}
		</PopupWindow>
	)
}

interface PopupWindowProps extends PropsWithChildren {
	className?: string
	children: React.ReactNode
}
const PopupWindow = React.forwardRef<HTMLDivElement, PopupWindowProps>(({className, children}, ref) => {
	const {setShow} = useContext(PopupContext)
	const popupWindowRef = useRef<HTMLDivElement>(null)
	const closePopup = useCallback(() => {
		setShow(false)
	}, [setShow])

	useFocusTrapping(popupWindowRef)
	useOutsideClick(popupWindowRef, closePopup)

	return (
		<div
			className={styles['popup-layout']}
			ref={ref}
		>
			<div
				className={classnames(styles['popup'], className)}
				ref={popupWindowRef}
				onClick={e => e.preventDefault()}
			>
				{children}
			</div>
		</div>
	)
})

type CloseProps = {
	children: React.ReactElement
	onClick?: () => void,
}
function Close({children, onClick}: CloseProps) {
	const {setShow} = useContext(PopupContext)
	const clickHandler = (e: MouseEvent) => {
		onClick && onClick()
		setShow(false)
		e.stopPropagation()
	}
	const childrenToClosePopup = React.cloneElement(children, {
		onClick: clickHandler,
	})

	return childrenToClosePopup
}

Popup.Content = Content
Popup.Close = Close


export {
	Popup,
	PopupContext,
}