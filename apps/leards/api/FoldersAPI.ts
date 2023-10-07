import {mockAPI} from '@leards/api/common/mockApi'
import {wrapApi, WrappedAPI} from '@leards/api/common/wrapApi'
import {
	Configuration,
	FoldersApi,
	HttputilsFolderResponse,
} from '@leards/api/generated'
import AuthProvider from '@leards/providers/authProvider'

const wrappedApi = wrapApi<FoldersApi>(() => {
	const baseAuth = AuthProvider.getBaseAuth()
	const config = new Configuration({
		// eslint-disable-next-line no-process-env
		basePath: process.env.NEXT_PUBLIC_API_URL,
		username: baseAuth.username,
		password: baseAuth.password,
		baseOptions: {
			headers: {
				Authorization: `Bearer ${AuthProvider.getAuthToken()}`,
			},
		},
	})

	return new FoldersApi(config)
})

type MockFolderApi = {
  getRoot: (userId: string) => Promise<HttputilsFolderResponse>;
};

export const FoldersAPI = mockAPI<MockFolderApi, FoldersApi>(wrappedApi, {
  getRoot: (userId: string) =>
    Promise.resolve({
      message: 'success',
      folder: {
        id: 'root',
        name: 'root',
        content: [
          {
            type: 'folder',
            id: 'f82303ff-dfee-449f-9732-71d9af7a0fd5',
            name: 'QA',
          },
          {
            type: 'folder',
            id: 'dec0c6a0-98de-42e5-8ac8-98e0fc72e097',
            name: 'PM',
          },
          {
            type: 'folder',
            id: '21b615bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'TT',
          },
          {
            type: 'deck',
            id: '21b614bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'Viewshka',
          },

          {
            type: 'folder',
            id: 'f82303ff-dfee-449f-9732-71d9af7a0fd5',
            name: 'QA',
          },
          {
            type: 'folder',
            id: 'dec0c6a0-98de-42e5-8ac8-98e0fc72e097',
            name: 'PM',
          },
          {
            type: 'folder',
            id: '21b615bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'TT',
          },
          {
            type: 'deck',
            id: '21b614bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'Viewshka',
          },
          {
            type: 'folder',
            id: 'f82303ff-dfee-449f-9732-71d9af7a0fd5',
            name: 'QA',
          },
          {
            type: 'folder',
            id: 'dec0c6a0-98de-42e5-8ac8-98e0fc72e097',
            name: 'PM',
          },
          {
            type: 'folder',
            id: '21b615bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'TT',
          },
          {
            type: 'deck',
            id: '21b614bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'Viewshka',
          },
          {
            type: 'folder',
            id: 'f82303ff-dfee-449f-9732-71d9af7a0fd5',
            name: 'QA',
          },
          {
            type: 'folder',
            id: 'dec0c6a0-98de-42e5-8ac8-98e0fc72e097',
            name: 'PM',
          },
          {
            type: 'folder',
            id: '21b615bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'TT',
          },
          {
            type: 'deck',
            id: '21b614bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'Viewshka',
          },
          {
            type: 'folder',
            id: 'f82303ff-dfee-449f-9732-71d9af7a0fd5',
            name: 'QA',
          },
          {
            type: 'folder',
            id: 'dec0c6a0-98de-42e5-8ac8-98e0fc72e097',
            name: 'PM',
          },
          {
            type: 'folder',
            id: '21b615bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'TT',
          },
          {
            type: 'deck',
            id: '21b614bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'Viewshka',
          },
          {
            type: 'folder',
            id: 'f82303ff-dfee-449f-9732-71d9af7a0fd5',
            name: 'QA',
          },
          {
            type: 'folder',
            id: 'dec0c6a0-98de-42e5-8ac8-98e0fc72e097',
            name: 'PM',
          },
          {
            type: 'folder',
            id: '21b615bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'TT',
          },
          {
            type: 'deck',
            id: '21b614bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'Viewshka',
          },
          {
            type: 'folder',
            id: 'f82303ff-dfee-449f-9732-71d9af7a0fd5',
            name: 'QA',
          },
          {
            type: 'folder',
            id: 'dec0c6a0-98de-42e5-8ac8-98e0fc72e097',
            name: 'PM',
          },
          {
            type: 'folder',
            id: '21b615bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'TT',
          },
          {
            type: 'deck',
            id: '21b614bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'Viewshka',
          },
          {
            type: 'folder',
            id: 'f82303ff-dfee-449f-9732-71d9af7a0fd5',
            name: 'QA',
          },
          {
            type: 'folder',
            id: 'dec0c6a0-98de-42e5-8ac8-98e0fc72e097',
            name: 'PM',
          },
          {
            type: 'folder',
            id: '21b615bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'TT',
          },
          {
            type: 'deck',
            id: '21b614bb-a931-4fc6-8591-14e1eb0ccd5a',
            name: 'Viewshka',
          },
        ],
        path: [],
      },
    }),
});
