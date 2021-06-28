import React, { useReducer } from 'react'
import axios from 'axios'
import { GithubContext } from './githubContext'
import { gitHubReducer } from './gitHubReducer'
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

const {
  REACT_APP_CLIENT_ID: clientId,
  REACT_APP_CLIENT_SECRET: clientSecret,
} = process.env

const withCreds = url =>
  `${url}client_id=${clientId}&client_secret=${clientSecret}`

const GitHubState = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: [],
    findUser: '',
    error: false,
    totalCount: 0,
    allRepos: 0,
    selectedUser: '',
  }

  const [state, dispatch] = useReducer(
    gitHubReducer,
    initialState
  )

  const {
    user,
    users,
    repos,
    loading,
    findUser,
    error,
    totalCount,
    allRepos,
    selectedUser,
  } = state

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  const searchUsers = async (usersPerPage, page) => {
    try {
      setLoading()
      const response = await axios.get(
        withCreds(
          `https://api.github.com/search/users?q=${findUser}&per_page=${usersPerPage}&page=${page}&`
        )
      )
      dispatch({
        type: SEARCH_USERS,
        payload: response.data,
      })
      return response.data
    } catch (e) {
      dispatch({
        type: SET_REQUEST_ERROR,
      })
      throw e
    }
  }

  const setSearchValue = username => {
    dispatch({
      type: SET_SEARCH_VALUE,
      payload: username,
    })
  }

  const getRepos = async (
    username,
    page = 1,
    ReposPerPage = 5
  ) => {
    setLoading()
    const response = await axios.get(
      withCreds(
        `https://api.github.com/users/${username}/repos?per_page=${ReposPerPage}&page=${page}&`
      )
    )
    dispatch({
      type: GET_REPOS,
      payload: response.data,
    })
  }

  const getUser = async name => {
    setLoading()
    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    )

    dispatch({
      type: GET_USER,
      payload: { data: response.data, selectedUser: name },
    })
  }

  const getAllRepos = async name => {
    const response = await axios.get(
      withCreds(
        `https://api.github.com/users/${name}/repos?`
      )
    )
    dispatch({
      type: GET_ALL_REPOS,
      payload: response.data,
    })
  }

  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS })
  }

  return (
    <GithubContext.Provider
      value={{
        setLoading,
        searchUsers,
        clearUsers,
        getRepos,
        getUser,
        setSearchValue,
        totalCount,
        user,
        users,
        repos,
        loading,
        error,
        allRepos,
        selectedUser,
        getAllRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GitHubState
