import { wrapApi } from './common/wrapApi';
import { AuthApi } from './generated/api';
import { Configuration } from './generated/configuration';
import { getAuthProvider } from './common/authProvider';

export const AuthAPI = wrapApi<AuthApi>(() => {
  const authProvider = getAuthProvider();
  const baseAuth = authProvider.getBaseAuth();
  const config = new Configuration({
    basePath: 'http://localhost:8080/api/v1',
    username: baseAuth.username,
    password: baseAuth.password,
    apiKey: authProvider.getAuthToken(),
  });

  return new AuthApi(config);
});
