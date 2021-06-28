import React, { useEffect, useState } from 'react'

export const SimplePaginator = ({
  totalCount,
  userName,
  paginator,
  usersPerPage = 5,
}) => {
  const [statusNext, setNextStatus] = useState('disabled')
  const [statusPrev, setPrevStatus] = useState('disabled')
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    paginator(userName, currentPage)
  }, [currentPage])

  useEffect(() => {
    if (currentPage !== 1) {
      setPrevStatus('')
    } else {
      setPrevStatus('disabled')
    }
    // eslint-disable-next-line no-debugger
    debugger
    if (totalCount - currentPage * usersPerPage > 0) {
      setNextStatus('')
    } else {
      setNextStatus('disabled')
    }
  })

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
              setCurrentPage(prev => prev - 1)
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
              setCurrentPage(prev => prev + 1)
            }}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  )
}
