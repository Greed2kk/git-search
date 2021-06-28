import React, { useContext, useReducer } from 'react'
import {
  NEXT_PAGE,
  PREVIOUS_PAGE,
  CLEAR_PAGINATION,
} from '../types'
import { paginationReducer } from './paginationReducer'
import { PaginationContext } from './paginationContext'
import { GithubContext } from '../github/githubContext'

const initialState = {
  usersPagination: {
    usersPerPage: 100,
    currentPage: 1,
    name: 'usersPagination',
  },
  repoPagination: {
    usersPerPage: 5,
    currentPage: 1,
    name: 'repoPagination',
  },
}

const PaginationState = ({ children }) => {
  const { setLoading } = useContext(GithubContext)

  const [state, dispatch] = useReducer(
    paginationReducer,
    initialState
  )

  const { usersPagination, repoPagination } = state

  const nextPage = page => {
    setLoading()
    dispatch({
      type: NEXT_PAGE,
      payload: page,
    })
  }

  const clearPagination = page => {
    dispatch({
      type: CLEAR_PAGINATION,
      payload: { selected: page, init: initialState },
    })
  }

  const previousPage = page => {
    setLoading()
    dispatch({
      type: PREVIOUS_PAGE,
      payload: page,
    })
  }

  return (
    <PaginationContext.Provider
      value={{
        nextPage,
        previousPage,
        clearPagination,
        usersPagination,
        repoPagination,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export default PaginationState
