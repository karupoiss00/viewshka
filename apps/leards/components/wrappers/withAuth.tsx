import {NextComponentType} from 'next'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useMutation} from 'react-query'
import {AuthAPI} from '../../api/AuthAPI'
import AuthProvider from '../../providers/authProvider'
import LoadingPage from '../screens/loading/LoadingPage'

function useAuthMutation() {
	return useMutation('auth', async () => {
		AuthAPI.update()
		const response = await AuthAPI.get().authIdGet(AuthProvider.getUserId())
		return response.data
	})
}

export const withAuth = (Component: NextComponentType) => () => {
	const router = useRouter()
	const {status, data, mutate} = useAuthMutation()

	useEffect(() => {
		mutate()
	}, [mutate])

	useEffect(() => {
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