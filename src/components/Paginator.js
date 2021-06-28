import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { PaginationContext } from '../context/pagination/paginationContext'

export const Paginator = ({
  totalCount,
  searchFn,
  paginator,
}) => {
  const { nextPage, previousPage } = useContext(
    PaginationContext
  )

  const [statusNext, setStatusNext] = useState('disabled')
  const [statusPrev, setStatusPrev] = useState('disabled')

  const page = useRef(paginator.currentPage)
  useEffect(() => {
    if (
      totalCount - page.current * paginator.usersPerPage >
      0
    ) {
      setStatusNext('')
    }

    if (page.current !== 1) {
      setStatusPrev('')
    }
  }, [page.current])

  const pageItem = {
    next: {
      className: `page-item ${statusNext}`,
      style:
        statusNext === 'disabled'
          ? { cursor: 'not-allowed' }
          : { cursor: 'pointer' },
    },
    prev: {
      className: `page-item ${statusPrev}`,
      style:
        statusPrev === 'disabled'
          ? { cursor: 'not-allowed' }
          : { cursor: 'pointer' },
    },
  }

  return (
    <nav aria-label="Paginator">
      <div className="total-items mt-2 d-flex justify-content-center">
        <span className="badge badge-dark bg-primary">
          {totalCount}
        </span>
      </div>
      <ul className="pagination justify-content-center mt-2">
        <li
          className={pageItem.prev.className}
          style={pageItem.prev.style}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span
            className="page-link previous-page"
            onClick={() => {
              previousPage(paginator)
              searchFn(
                paginator.usersPerPage,
                --page.current
              )
            }}
          >
            Previous
          </span>
        </li>
        <li
          className={pageItem.next.className}
          style={pageItem.next.style}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span
            className="page-link next-page"
            onClick={() => {
              nextPage(paginator)
              searchFn(
                paginator.usersPerPage,
                ++page.current
              )
            }}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  )
}
