import React from 'react';
import { X, Award } from 'lucide-react';
import { Participant } from './types';

interface ParticipantsModalProps {
    isOpen: boolean;
    onClose: () => void;
    participants: Participant[];
    loading: boolean;
    onSelectWinner?: (userId: string, userName: string) => void;
    showWinnerSelection?: boolean;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({
    isOpen,
    onClose,
    participants,
    loading,
    onSelectWinner,
    showWinnerSelection = false
}) => {
    if (!isOpen) return null;

    const getUserName = (participant: Participant) => {
        return participant.user?.fullName || participant.user?.name || participant.fullName || participant.name || 'Unknown User';
    };

    const getUserId = (participant: Participant) => {
        return participant.userId || participant.user?.id || participant.id;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {showWinnerSelection ? 'Select Winner' : 'Participants'} ({participants.length})
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {loading ? (
                        <div className="text-center py-8 text-gray-500">Loading participants...</div>
                    ) : participants.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No participants yet</div>
                    ) : (
                        <div className="space-y-2">
                            {participants.map((participant, index) => (
                                <div
                                    key={participant.id || index}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">{getUserName(participant)}</p>
                                        {participant.createdAt && (
                                            <p className="text-sm text-gray-500">
                                                Joined: {new Date(participant.createdAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    {showWinnerSelection && onSelectWinner && (
                                        <button
                                            onClick={() => onSelectWinner(getUserId(participant), getUserName(participant))}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <Award size={16} />
                                            <span>Select as Winner</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParticipantsModal;
