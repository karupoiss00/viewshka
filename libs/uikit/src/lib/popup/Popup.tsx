import classnames from 'classnames'
import * as React from 'react'
import {
	PropsWithChildren,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react'
import {useFocusTrapping} from '../hooks/useFocusTrapping'
import {useOutsideClick} from '../hooks/useOutsideClick'
import styles from './Popup.module.css'

type PopupContextData = {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupContext = React.createContext<PopupContextData>({
	show: false,
	setShow: () => {
		throw new Error('PopupContext setIsShow should be used under provider')
	},
})

interface PopupProps {
	children: React.ReactNode;
}

function Popup({
	children,
}: PopupProps) {
	const [show, setShow] = useState(false)

	const contextValue = {
		show,
		setShow,
	}

	return (
		<PopupContext.Provider value={contextValue}>
			{children}
		</PopupContext.Provider>
	)
}

interface TriggerProps {
	children: React.ReactElement
}

function Trigger({children}: TriggerProps) {
	const {setShow} = useContext(PopupContext)

	const ref = useRef<HTMLElement>(null)

	const onClick = () => {
		const element = ref.current
		if (element == null) {
			return
		}
		setShow(isShow => !isShow)
	}

	return React.cloneElement(children, {
		onClick,
		ref,
	})
}

interface ContentProps extends PropsWithChildren {
	className?: string
}

function Content({className, children}: ContentProps) {
	const {show} = useContext(PopupContext)

	if (!show) {
		return null
	}

	return (
		<PopupWindow className={className}>
			{children}
		</PopupWindow>
	)
}

interface PopupWindowProps extends PropsWithChildren {
	className?: string
	children: React.ReactNode
}

function PopupWindow({className, children}: PopupWindowProps) {
	const {setShow} = useContext(PopupContext)
	const popupWindowRef = useRef<HTMLDivElement>(null)
	const closePopup = useCallback(() => {
		setShow(false)
	}, [setShow])

	useFocusTrapping(popupWindowRef)
	useOutsideClick(popupWindowRef, closePopup)

	return (
		<div className={styles['popup-layout']}>
			<div
				className={classnames(styles['popup'], className)}
				ref={popupWindowRef}
			>
				{children}
			</div>
		</div>
	)
}

function Close({children}: { children: React.ReactElement }) {
	const {setShow} = useContext(PopupContext)
	const onClick = (e: MouseEvent) => {
		setShow(false)
		e.stopPropagation()
	}
	const childrenToClosePopup = React.cloneElement(children, {
		onClick,
	})

	return childrenToClosePopup
}

Popup.Trigger = Trigger
Popup.Content = Content
Popup.Close = Close


export default Popup