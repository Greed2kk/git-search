import {
  CLEAR_PAGINATION,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from '../types'

const handlers = {
  [NEXT_PAGE]: (state, { payload }) => ({
    ...state,
    [payload.name]: {
      ...state[payload.name],
      currentPage: ++state[payload.name].currentPage,
    },
  }),
  [PREVIOUS_PAGE]: (state, { payload }) => ({
    ...state,
    [payload.name]: {
      ...state[payload.name],
      currentPage: --state[payload.name].currentPage,
    },
  }),
  [CLEAR_PAGINATION]: (state, { payload }) => ({
    ...state,
    [payload.selected.name]: {
      ...payload.init[payload.selected.name],
    },
  }),
  DEFAULT: state => state,
}

export const paginationReducer = (state, action) => {
  const handler = handlers[action.type || handlers.default]
  return handler(state, action)
}
