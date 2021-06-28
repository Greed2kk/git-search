import React, { useContext } from 'react'
import AlertContext from '../context/alert/alertContext'

const Alert = () => {
  const { alert, hide } = useContext(AlertContext)

  if (!alert) return null

  return (
    <div
      className={`alert alert-${
        alert.type || 'secondary'
      } alert-dismissible fluid d-flex justify-content-between`}
      role="alert"
    >
      {alert.text}
      <button
        type="button"
        className="close border-0 bg-transparent"
        aria-label="Close"
        onClick={hide}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default Alert
