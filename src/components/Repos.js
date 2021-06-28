import React from 'react'
import { SimplePaginator } from './SimplePaginator'

const Repos = ({
  repos,
  totalRepos,
  userName,
  getRepos,
}) => (
  <>
    <SimplePaginator
      totalCount={totalRepos}
      userName={userName}
      paginator={getRepos}
    />
    {repos.map(repo => (
      <div className="card mb-3" key={repo.id}>
        <div className="card-body">
          <h5 className="d-flex justify-content-between">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {repo.name}
            </a>
            <div>
              <i className="bi bi-pencil-fill">
                {repo.language}
              </i>{' '}
              <i className="bi bi-star-fill">
                {repo.stargazers_count}
              </i>
            </div>
          </h5>
        </div>
      </div>
    ))}
  </>
)

export default Repos
