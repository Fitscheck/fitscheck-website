import React from 'react';
import { Calendar, Users as UsersIcon, Award, Edit, Eye, AlertCircle } from 'lucide-react';
import { Challenge } from './types';

interface ChallengeCardProps {
    challenge: Challenge;
    onEdit: (challenge: Challenge) => void;
    onViewParticipants: (challengeId: string) => void;
    onSelectWinner: (challengeId: string) => void;
    onEndChallenge: (challengeId: string) => void;
    loading?: boolean;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
    challenge,
    onEdit,
    onViewParticipants,
    onSelectWinner,
    onEndChallenge,
    loading
}) => {
    const isEnded = challenge.status === 'ended' || (challenge.endDate && new Date(challenge.endDate) < new Date());
    const isActive = challenge.status === 'active' || (!challenge.status && challenge.endDate && new Date(challenge.endDate) >= new Date());

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${isEnded
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                >
                    {isEnded ? 'Ended' : 'Active'}
                </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{challenge.description}</p>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>
                        {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UsersIcon size={16} />
                    <span>{challenge.participants || challenge.participantsCount || 0} participants</span>
                </div>
                {challenge.winner && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <Award size={16} />
                        <span className="font-medium">
                            Winner: {typeof challenge.winner === 'string' ? challenge.winner : challenge.winner?.fullName || challenge.winner?.name || 'N/A'}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onViewParticipants(challenge.id)}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    <Eye size={16} />
                    <span>View Participants</span>
                </button>
                <button
                    onClick={() => onEdit(challenge)}
                    className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Edit size={16} />
                    <span>Edit</span>
                </button>
                {isActive && (
                    <button
                        onClick={() => onEndChallenge(challenge.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-yellow-300 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                        <AlertCircle size={16} />
                        <span>End Challenge</span>
                    </button>
                )}
                {isEnded && !challenge.winner && (
                    <button
                        onClick={() => onSelectWinner(challenge.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Award size={16} />
                        <span>Select Winner</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChallengeCard;
