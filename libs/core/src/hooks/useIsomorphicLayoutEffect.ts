import {useLayoutEffect as useSyncEffect, useEffect} from 'react'

const useLayoutEffect = typeof window !== 'undefined' ? useSyncEffect : useEffect

export {
	useLayoutEffect,
}