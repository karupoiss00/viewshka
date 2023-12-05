import {Locale} from '../providers/localeProvider'
import {chmMessages} from './messages/chm-RU'
import {enMessages} from './messages/en-US'
import {ruMessages} from './messages/ru-RU'

const i18n = {
	[Locale.ENGLISH]: enMessages,
	[Locale.RUSSIAN]: ruMessages,
	[Locale.MARI]: chmMessages,
}

export {
	i18n,
}