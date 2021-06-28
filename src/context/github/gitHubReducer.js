import {
  CLEAR_USERS,
  GET_ALL_REPOS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
  SET_REQUEST_ERROR,
  SET_SEARCH_VALUE,
} from '../types'

const handlers = {
  [SEARCH_USERS]: (state, { payload }) => ({
    ...state,
    users: payload.items,
    loading: false,
    error: false,
    totalCount: payload.total_count,
  }),
  [GET_REPOS]: (state, { payload }) => ({
    ...state,
    repos: payload,
    loading: false,
  }),
  [GET_USER]: (state, { payload }) => ({
    ...state,
    user: payload.data,
    selectedUser: payload.selectedUser,
    loading: false,
  }),
  [SET_LOADING]: state => ({
    ...state,
    loading: true,
  }),
  [CLEAR_USERS]: state => ({
    ...state,
    users: [],
    totalCount: 0,
  }),
  [SET_SEARCH_VALUE]: (state, { payload }) => ({
    ...state,
    findUser: payload,
  }),
  [SET_REQUEST_ERROR]: state => ({
    ...state,
    error: true,
    loading: false,
  }),
  [GET_ALL_REPOS]: (state, { payload }) => ({
    ...state,
    allRepos: payload.length,
  }),
  DEFAULT: state => state,
}

export const gitHubReducer = (state, action) => {
  const handler = handlers[action.type || handlers.default]
  return handler(state, action)
}
