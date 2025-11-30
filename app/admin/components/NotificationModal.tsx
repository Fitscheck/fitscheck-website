import React, { useEffect } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

interface NotificationModalProps {
    isOpen: boolean
    onClose: () => void
    message?: string
    type?: 'success' | 'error' | 'info' | 'warning'
    autoClose?: boolean
    autoCloseDelay?: number
}

const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
    message = '',
    type = 'info',
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

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="text-green-600" size={24} />
            case 'error':
                return <XCircle className="text-red-600" size={24} />
            case 'warning':
                return <AlertTriangle className="text-yellow-600" size={24} />
            default:
                return <Info className="text-blue-600" size={24} />
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

    const getBorderColor = () => {
        switch (type) {
            case 'success':
                return 'border-green-200'
            case 'error':
                return 'border-red-200'
            case 'warning':
                return 'border-yellow-200'
            default:
                return 'border-blue-200'
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={handleBackdropClick}
            style={{ fontFamily: "var(--font-satoshi)" }}
        >
            <div className={`bg-white rounded-lg shadow-xl max-w-md w-full border-t-4 ${getBorderColor()}`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        {getIcon()}
                        <h3 className="text-lg font-semibold text-gray-900">{getTitle()}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-600">{message}</p>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-gray-200">
                    <button
                        className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors font-medium"
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
