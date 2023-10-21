import React, {PropsWithChildren} from 'react'
import styles from './BottomPanel.module.css'


function BottomPanel({children}: PropsWithChildren) {
	return <div className={styles.bottomPanel}>{children}</div>
}

export {
	BottomPanel,
}