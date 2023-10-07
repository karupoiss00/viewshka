import {BaseAPI} from '../generated/base'

export type WrappedAPI<T extends BaseAPI> = {
  get: () => T;
};

export function wrapApi<T extends BaseAPI>(apiCreator: () => T) {
	return {
		get: () => apiCreato(),
	}
}
