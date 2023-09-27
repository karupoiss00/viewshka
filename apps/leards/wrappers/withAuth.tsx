import {NextComponentType} from 'next'
import {useQuery} from 'react-query'
import {AuthAPI} from '../api/AuthAPI'
import AuthProvider from '../api/common/authProvider'
import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import BaseLayout from '../components/common/BaseLayout'
import {Preloader} from '../components/common/preloader/Preloader'

export const withAuth = (Component: NextComponentType) => () => {
	const router = useRouter()
	const {status, data} = useAuthQuery()

	useEffect(() => {
    if (status === 'success') {
      AuthProvider.setAuthToken(data.token);
    }
    if (status === 'error') {
      router.replace('/');
    }
  }, [data, router, status]);

	return (
		<BaseLayout>
			{status === 'success' && <Component />}
			{status === 'loading' && <Preloader />}
		</BaseLayout>
	)
}

function useAuthQuery() {
	return useQuery('auth', async () => {
		const response = await AuthAPI.get().authIdGet(AuthProvider.getUserId())
		return response.data
	})
}
