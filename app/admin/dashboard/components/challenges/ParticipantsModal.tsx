import React from 'react';
import { X, Award, Calendar, Image as ImageIcon, ThumbsUp } from 'lucide-react';
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
        const user = participant.user || participant;
        return user.fullName || user.full_name || user.name || 'Unknown User';
    };

    const getUserId = (participant: Participant) => {
        return participant.userId || participant.user?.id || participant.id;
    };

    const getUsername = (participant: Participant) => {
        const user = participant.user || participant;
        return user.username ? `@${user.username}` : '@unknown';
    };

    const getVotes = (participant: Participant) => {
        const post = participant.post;
        if (!post) return 0;
        return post.likesCount || post.likes_count || 0;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {showWinnerSelection ? 'Select Winner' : 'Challenge Participants'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">{participants.length} total entries</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#003366]"></div>
                            <p className="mt-4 text-gray-500">Loading participants...</p>
                        </div>
                    ) : participants.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-2">
                                <ImageIcon size={48} className="mx-auto" />
                            </div>
                            <p className="text-gray-500">No participants found</p>
                            <p className="text-sm text-gray-400 mt-1">Entries will appear here once users participate</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {participants.map((participant, index) => (
                                <div
                                    key={participant.id || index}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                                            {getUserName(participant).charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900">{getUserName(participant)}</p>
                                            <p className="text-sm text-gray-500">{getUsername(participant)}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                {participant.createdAt && (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>{new Date(participant.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                )}
                                                {participant.postId && (
                                                    <div className="flex items-center gap-1">
                                                        <ImageIcon size={14} />
                                                        <span>Post: {participant.postId}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                                            <ThumbsUp size={16} />
                                            <span className="font-semibold">{getVotes(participant)}</span>
                                            <span className="text-sm">votes</span>
                                        </div>
                                    </div>
                                    {showWinnerSelection && onSelectWinner && (
                                        <button
                                            onClick={() => onSelectWinner(getUserId(participant), getUserName(participant))}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex-shrink-0 ml-4"
                                        >
                                            <Award size={16} />
                                            <span>Select Winner</span>
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
