interface IAuthProvider {
  getUserId(): string | null;

  setUserId(id: string): void;

  getAuthToken(): string | null;

  setAuthToken(token: string): void;

  getBaseAuth(): { username: string; password: string };

  setBaseAuth(username: string, password: string): void;
}

const USER_ID_KEY = 'uid'
const AUTH_TOKEN_KEY = 'tkn'
const BASE_AUTH_DATA_KEY = 'bsauth'

const AuthProvider: IAuthProvider = {
	getUserId: () => window.localStorage.getItem(USER_ID_KEY),
	setUserId: (id: string) => window.localStorage.setItem(USER_ID_KEY, id),
	getAuthToken: () => window.localStorage.getItem(AUTH_TOKEN_KEY),
	setAuthToken: (token: string) => {
		window.localStorage.setItem(AUTH_TOKEN_KEY, btoa(token))
	},
	getBaseAuth: () => {
		const authData = JSON.parse(
			window.localStorage.getItem(BASE_AUTH_DATA_KEY),
		)

		if (!authData || !authData.username || !authData.password) {
			return {
				username: '',
				password: '',
			}
		}
		window.localStorage.removeItem(BASE_AUTH_DATA_KEY)
		return authData
	},
	setBaseAuth: (username: string, password: string) => {
		window.localStorage.setItem(
			BASE_AUTH_DATA_KEY,
			JSON.stringify({
				username,
				password,
			}),
		)
	},
}

export default AuthProvider