import React from 'react'
import styles from './PopoverLayer.module.css'

const POPOVER_LAYER_KEY = 'popover-layer'

function PopoverLayer() {
	return (
		<div className={styles['popup-layer']} data-layer-key={POPOVER_LAYER_KEY}></div>
	)
}

function getPopoverLayerElement() {
	return document.body.querySelector(`[data-layer-key="${POPOVER_LAYER_KEY}"]`) || document.body
}

export {
	PopoverLayer,
	getPopoverLayerElement,
}