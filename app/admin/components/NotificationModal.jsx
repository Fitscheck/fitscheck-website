import React, { useEffect } from 'react'
import './NotificationModal.css'

const NotificationModal = ({ 
  isOpen, 
  onClose, 
  message = '',
  type = 'info', // 'success', 'error', 'info', 'warning'
  autoClose = true,
  autoCloseDelay = 3000
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose])

  if (!isOpen || !message) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      default:
        return 'ℹ'
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Success'
      case 'error':
        return 'Error'
      case 'warning':
        return 'Warning'
      default:
        return 'Information'
    }
  }

  return (
    <div className="notification-modal-overlay" onClick={handleBackdropClick}
      style={{ fontFamily: "Satoshi Variable" }}
    >
      <div className={`notification-modal notification-modal-${type}`}>
        <div className="notification-modal-header">
          <div className="notification-icon">{getIcon()}</div>
          <h3 className="notification-modal-title">{getTitle()}</h3>
        </div>
        <div className="notification-modal-body">
          <p className="notification-modal-message">{message}</p>
        </div>
        <div className="notification-modal-footer">
          <button 
            className="btn-notification-ok"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal

