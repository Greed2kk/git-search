import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import defaultAvatar from '../images/defaultAvatar.jpg'

export const Card = ({ user }) => (
  <div className="card mt-2">
    <LazyLoadImage
      src={user.avatar_url}
      placeholderSrc={defaultAvatar}
      alt={user.login}
      effect="blur"
      className="card-img-top img-thumbnail"
      loading="lazy"
      height="200"
      width="200"
    />
    <div className="card-body">
      <h5 className="card-title">{user.login}</h5>
      <Link
        to={`/profile/${user.login}`}
        className="btn btn-primary"
      >
        Открыть
      </Link>
    </div>
  </div>
)
