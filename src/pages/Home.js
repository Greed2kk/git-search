import React, { useContext } from 'react'
import { Search } from '../components/Search'
import { Card } from '../components/Card'
import { GithubContext } from '../context/github/githubContext'
import { Spinner } from '../components/Loader'
import { Paginator } from '../components/Paginator'
import { PaginationContext } from '../context/pagination/paginationContext'

export const Home = () => {
  const { loading, users, totalCount, searchUsers } =
    useContext(GithubContext)
  const { usersPagination } = useContext(PaginationContext)

  return (
    <>
      <Search />
      <div className="row">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {totalCount !== 0 ? (
              <Paginator
                totalCount={totalCount}
                searchFn={searchUsers}
                paginator={usersPagination}
              />
            ) : null}
            {users.map(user => (
              <div className="col-sm-4 mb-4" key={user.id}>
                <Card user={user} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}
