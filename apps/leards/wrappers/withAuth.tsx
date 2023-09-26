import { NextComponentType } from 'next';
import { useQuery } from 'react-query';
import { AuthAPI } from '../api/AuthAPI';
import { AuthProvider, getAuthProvider } from '../api/common/authProvider';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '../components/common/BaseLayout';

export const withAuth = (Component: NextComponentType) => () => {
  const router = useRouter();
  const authProvider = getAuthProvider();
  const { status, data } = useAuthQuery(authProvider);

  useEffect(() => {
    if (status === 'success') {
      authProvider.setAuthToken(data.token);
    }
    if (status === 'error') {
      router.push('/');
    }
  }, [status]);

  return <BaseLayout>{status === 'success' && <Component />}</BaseLayout>;
};

function useAuthQuery(authProvider: AuthProvider) {
  return useQuery('auth', async () => {
    const response = await AuthAPI.get().authIdGet(authProvider.getUserId());
    return response.data;
  });
}
