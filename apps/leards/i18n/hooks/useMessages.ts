import {useIntl} from 'react-intl'

function useMessages(): (id: string) => string {
	const intl = useIntl()

	return (id: string) => intl.formatMessage({
		id,
	})
}

export {
	useMessages,
}