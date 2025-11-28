import React from 'react'
import './ConfirmationModal.css'

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default' // 'default', 'danger', 'warning'
}) => {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn-confirm-danger'
      case 'warning':
        return 'btn-confirm-warning'
      default:
        return 'btn-confirm-default'
    }
  }

  return (
    <div className="confirmation-modal-overlay" onClick={handleBackdropClick}
      style={{ fontFamily: "Satoshi Variable" }}
    >
      <div className="confirmation-modal">
        <div className="confirmation-modal-header">
          <h3 className="confirmation-modal-title">{title}</h3>
        </div>
        <div className="confirmation-modal-body">
          <p className="confirmation-modal-message">{message}</p>
        </div>
        <div className="confirmation-modal-footer">
          <button 
            className="btn-cancel"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={getButtonClass()}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal

