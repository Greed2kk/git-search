import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import AlertContext from '../context/alert/alertContext'
import { GithubContext } from '../context/github/githubContext'
import { PaginationContext } from '../context/pagination/paginationContext'

export const Search = () => {
  const [value, setValue] = useState('')

  const alert = useContext(AlertContext)
  const gitHub = useContext(GithubContext)
  const currentValue = useRef('')
  const { clearPagination, usersPagination } = useContext(
    PaginationContext
  )

  useEffect(() => {
    if (currentValue.current !== '') {
      gitHub
        .searchUsers(
          usersPagination.usersPerPage,
          usersPagination.currentPage
        )
        .then(({ total_count }) => {
          if (total_count === 0) {
            alert.show('Пользователь не найден')
          }
        })
        .catch(() => alert.show('Превышен лимит запросов'))
    }
    return () => {
      gitHub.clearUsers()
      clearPagination(usersPagination)
    }
  }, [currentValue.current])

  const onSubmit = e => {
    const username = value.trim()

    if (e.key !== 'Enter') {
      return
    }

    if (username !== currentValue.current) {
      gitHub.clearUsers()
    }

    if (username) {
      // alert.hide()
      currentValue.current = username
      clearPagination(usersPagination)
      gitHub.setSearchValue(username)
    } else {
      alert.show('Пустой запрос')
    }
  }

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search by username"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyPress={onSubmit}
      />
    </div>
  )
}
