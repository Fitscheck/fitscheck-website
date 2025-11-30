import React from 'react';
import { ReportStatus } from './types';

interface StatusBadgeProps {
    status: ReportStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'pending':
                return 'bg-orange-500 text-white';
            case 'reviewed':
                return 'bg-blue-500 text-white';
            case 'resolved':
                return 'bg-green-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusStyles()}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
