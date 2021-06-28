import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GithubContext } from '../context/github/githubContext'
import Repos from '../components/Repos'

export const Profile = ({ match }) => {
  const {
    getUser,
    getRepos,
    user,
    repos,
    getAllRepos,
    allRepos,
  } = useContext(GithubContext)

  const userName = match.params.name

  useEffect(() => {
    getUser(userName)
    getAllRepos(userName)
  }, [])

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user

  return (
    <>
      <Link to="/" className="btn btn-link">
        На главную
      </Link>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img
                src={avatar_url}
                alt={name}
                style={{ width: 150 }}
              />
              <a
                href={html_url}
                target="_blank"
                className="btn btn-primary"
                rel="noreferrer"
              >
                Открыть профиль
              </a>
              <h1>{name}</h1>

              {location && (
                <p>Местоположение: {location}</p>
              )}
            </div>
            <div className="col">
              {bio && (
                <>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </>
              )}
              <ul>
                {login && (
                  <li>
                    <strong>Пользователь:</strong> {login}
                  </li>
                )}
                {company && (
                  <li>
                    <strong>Компания:</strong> {company}
                  </li>
                )}
                {blog && (
                  <li>
                    <strong>Веб-сайт: </strong>
                    <a
                      href={
                        blog.startsWith('http')
                          ? blog
                          : `http://${blog}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {blog}
                    </a>
                  </li>
                )}
              </ul>
              <span className="badge bg-primary">
                Подписчики: {followers}
              </span>
              <span className="badge bg-success">
                Подписан: {following}
              </span>
              <span className="badge bg-info">
                Репозитории: {public_repos}
              </span>
              <span className="badge bg-dark">
                Gists: {public_gists}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Repos
        repos={repos}
        totalRepos={allRepos}
        userName={userName}
        getRepos={getRepos}
      />
    </>
  )
}
