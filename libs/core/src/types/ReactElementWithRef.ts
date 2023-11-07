import {ReactElement, Ref, RefAttributes} from 'react'

type ReactElementWithRef<T, P extends RefAttributes<T> = RefAttributes<T>> = ReactElement<P> & {
	ref?: Ref<T>
}

export type {
	ReactElementWithRef,
}