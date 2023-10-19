import React from 'react'
import styles from './PopupLayer.module.css'

const POPUP_LAYER_KEY = 'popup-layer'

function PopupLayer() {
	return (
		<div className={styles['popup-layer']} data-layer-key={'popup-layer'}></div>
	)
}

function getPopupLayerElement() {
	return document.body.querySelector(`[data-layer-key="${POPUP_LAYER_KEY}"]`) || document.body
}

export {
	PopupLayer,
	getPopupLayerElement,
}