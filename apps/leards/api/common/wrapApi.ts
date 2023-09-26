import { BaseAPI } from '../generated/base';

export function wrapApi<T extends BaseAPI>(apiCreator: () => T) {
  let api: T | null = null;

  return {
    get: () => {
      if (!api) {
        api = apiCreator();
      }

      return api;
    },
  };
}
