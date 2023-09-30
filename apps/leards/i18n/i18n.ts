import {Locale} from '../providers/localeProvider'
import {enMessages} from './messages/en-US'
import {ruMessages} from './messages/ru-RU'

const i18n = {
	[Locale.ENGLISH]: enMessages,
	[Locale.RUSSIAN]: ruMessages,
}

export {
	i18n,
}