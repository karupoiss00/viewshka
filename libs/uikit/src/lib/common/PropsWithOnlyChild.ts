import type {ReactElement} from 'react'

type PropsWithOnlyChild<P = unknown> = P & {children?: ReactElement | undefined}

export type {
	PropsWithOnlyChild,
}
