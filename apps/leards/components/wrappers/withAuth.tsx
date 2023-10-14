import {useAtom} from '@reatom/npm-react'
import {useLayoutEffect} from '@viewshka/core'
import {NextComponentType} from 'next'
import {useRouter} from 'next/router'
import React from 'react'
import {useMutation} from 'react-query'
import {AuthAPI} from '../../api/AuthAPI'
import AuthProvider from '../../providers/authProvider'
import {userAtom} from '../common/viewmodel/userAtom'
import LoadingPage from '../screens/loading/LoadingPage'

function useAuthMutation() {
	const [user] = useAtom(userAtom)

	return useMutation('auth', async () => {
		const response = await AuthAPI.get().authUserIdGet(user.id)
		return response.data
	})
}

export const withAuth = (Component: NextComponentType) => () => {
	const router = useRouter()
	const {status, data, mutate} = useAuthMutation()

	useLayoutEffect(() => {
		mutate()
	}, [mutate])

	useLayoutEffect(() => {
		if (status === 'success') {
			AuthProvider.setAuthToken(data.token)
		}
		if (status === 'error') {
			router.replace('/')
		}
	}, [data, router, status])

	if (status === 'success') {
		return <Component />
	}

	return <LoadingPage />
}