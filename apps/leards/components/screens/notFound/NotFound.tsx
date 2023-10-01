import Image from 'next/image'
import React from 'react'
import styles from './NotFound.module.css'

function get404ImageSrc() {
	const isHorribleBackground = Math.round(Math.random() * 100) % 2 === 0
	return isHorribleBackground ? '/images/404_black.svg' : '/images/404.svg'
}

function NotFound() {
	return (
		<div className={styles.layout}>
			<Image src={get404ImageSrc()} alt={'background'} layout={'fill'} draggable={false}/>
		</div>
	)
}

export default NotFound