import {NextComponentType} from 'next'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useQuery} from 'react-query'
import {AuthAPI} from '../../api/AuthAPI'
import AuthProvider from '../../providers/authProvider'
import BaseLayout from '../common/BaseLayout'
import {Preloader} from '../common/preloader/Preloader'

function useAuthQuery() {
	return useQuery('auth', async () => {
		console.log(AuthProvider.getUserId())
		const response = await AuthAPI.get().authIdGet(AuthProvider.getUserId())
		return response.data
	})
}

export const withAuth = (Component: NextComponentType) => () => {
	const router = useRouter()
	const {status, data} = useAuthQuery()

	useEffect(() => {
		if (status === 'success') {
			AuthProvider.setAuthToken(data.token)
		}
		if (status === 'error') {
			router.replace('/')
		}
	}, [data, router, status])

	return (
		<BaseLayout>
			{status === 'success' && <Component />}
			{status === 'loading' && <Preloader />}
		</BaseLayout>
	)
}