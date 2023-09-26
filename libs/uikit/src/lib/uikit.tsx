import styles from './uikit.module.css'

/* eslint-disable-next-line */
export interface UikitProps {}

export function Uikit(props: UikitProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to Uikit!</h1>
		</div>
	)
}

export default Uikit
