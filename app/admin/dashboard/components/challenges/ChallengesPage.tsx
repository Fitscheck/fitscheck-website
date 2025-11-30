'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { adminService } from '../../../../../services/adminService';
import { Challenge, ChallengeFormData, Participant } from './types';
import ChallengeCard from './ChallengeCard';
import ChallengeFormModal from './ChallengeFormModal';
import ParticipantsModal from './ParticipantsModal';
import ConfirmationModal from '../../../components/ConfirmationModal';

const ChallengesPage: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
    const [showParticipantsModal, setShowParticipantsModal] = useState(false);
    const [showWinnerModal, setShowWinnerModal] = useState(false);
    const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        type: 'end' | 'winner' | null;
        challengeId?: string;
        userId?: string;
        userName?: string;
    }>({ isOpen: false, type: null });

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        setLoading(true);
        try {
            const response = await adminService.getChallenges('all', 1, 50);
            const challengesData = response.data?.challenges || response.challenges || [];
            setChallenges(Array.isArray(challengesData) ? challengesData : []);
        } catch (err: any) {
            console.error('Error fetching challenges:', err);
            toast.error(err.message || 'Failed to load challenges');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateChallenge = async (formData: ChallengeFormData, bannerFile: File | null) => {
        try {
            if (bannerFile && formData.bannerImageUrl.trim()) {
                toast.error('Please use either file upload OR URL, not both');
                return;
            }

            const startDate = formData.startDate
                ? new Date(formData.startDate + 'T00:00:00.000Z').toISOString()
                : '';
            const endDate = formData.endDate
                ? new Date(formData.endDate + 'T23:59:59.000Z').toISOString()
                : '';

            const hashtagsArray = formData.hashtags
                .split(',')
                .map(tag => tag.trim().replace(/^#/, ''))
                .filter(Boolean);

            let challengeData: any;

            if (bannerFile) {
                challengeData = new FormData();
                challengeData.append('title', formData.title.trim());
                challengeData.append('description', formData.description.trim() || '');
                challengeData.append('startDate', startDate);
                challengeData.append('endDate', endDate);
                if (formData.reward.trim()) {
                    challengeData.append('reward', formData.reward.trim());
                }
                if (hashtagsArray.length > 0) {
                    challengeData.append('hashtags', JSON.stringify(hashtagsArray));
                }
                challengeData.append('banner', bannerFile);
            } else {
                challengeData = {
                    title: formData.title.trim(),
                    description: formData.description.trim() || '',
                    bannerImageUrl: formData.bannerImageUrl.trim() || null,
                    startDate,
                    endDate,
                    reward: formData.reward.trim() || '',
                };
                if (hashtagsArray.length > 0) {
                    challengeData.hashtags = hashtagsArray;
                }
            }

            await adminService.createChallenge(challengeData);
            toast.success('Challenge created successfully!');
            setShowCreateModal(false);
            await fetchChallenges();
        } catch (err: any) {
            console.error('Error creating challenge:', err);
            toast.error(err.message || 'Failed to create challenge');
            throw err;
        }
    };

    const handleEditChallenge = (challenge: Challenge) => {
        const startDate = challenge.startDate ? new Date(challenge.startDate).toISOString().split('T')[0] : '';
        const endDate = challenge.endDate ? new Date(challenge.endDate).toISOString().split('T')[0] : '';

        setEditingChallenge(challenge);
        setShowEditModal(true);
    };

    const handleUpdateChallenge = async (formData: ChallengeFormData, bannerFile: File | null) => {
        if (!editingChallenge) return;

        try {
            if (bannerFile && formData.bannerImageUrl.trim()) {
                toast.error('Please use either file upload OR URL, not both');
                return;
            }

            const startDate = formData.startDate
                ? new Date(formData.startDate + 'T00:00:00.000Z').toISOString()
                : '';
            const endDate = formData.endDate
                ? new Date(formData.endDate + 'T23:59:59.000Z').toISOString()
                : '';

            const hashtagsArray = formData.hashtags
                .split(',')
                .map(tag => tag.trim().replace(/^#/, ''))
                .filter(Boolean);

            let challengeData: any;

            if (bannerFile) {
                challengeData = new FormData();
                challengeData.append('title', formData.title.trim());
                challengeData.append('description', formData.description.trim() || '');
                challengeData.append('startDate', startDate);
                challengeData.append('endDate', endDate);
                if (formData.reward.trim()) {
                    challengeData.append('reward', formData.reward.trim());
                }
                if (hashtagsArray.length > 0) {
                    challengeData.append('hashtags', JSON.stringify(hashtagsArray));
                }
                challengeData.append('banner', bannerFile);
            } else {
                challengeData = {
                    title: formData.title.trim(),
                    description: formData.description.trim() || '',
                    bannerImageUrl: formData.bannerImageUrl.trim() || null,
                    startDate,
                    endDate,
                    reward: formData.reward.trim() || '',
                };
                if (hashtagsArray.length > 0) {
                    challengeData.hashtags = hashtagsArray;
                }
            }

            await adminService.updateChallenge(editingChallenge.id, challengeData);
            toast.success('Challenge updated successfully!');
            setShowEditModal(false);
            setEditingChallenge(null);
            await fetchChallenges();
        } catch (err: any) {
            console.error('Error updating challenge:', err);
            toast.error(err.message || 'Failed to update challenge');
            throw err;
        }
    };

    const handleViewParticipants = async (challengeId: string) => {
        setSelectedChallengeId(challengeId);
        setLoadingParticipants(true);
        setShowParticipantsModal(true);
        try {
            const response = await adminService.getChallengeParticipants(challengeId);
            const entries = response.data?.entries || response.entries || [];
            setParticipants(Array.isArray(entries) ? entries : []);
        } catch (err: any) {
            console.error('Error fetching participants:', err);
            toast.error(err.message || 'Failed to load participants');
        } finally {
            setLoadingParticipants(false);
        }
    };

    const handleSelectWinnerClick = async (challengeId: string) => {
        setSelectedChallengeId(challengeId);
        setLoadingParticipants(true);
        setShowWinnerModal(true);
        try {
            const response = await adminService.getChallengeParticipants(challengeId);
            const entries = response.data?.entries || response.entries || [];
            setParticipants(Array.isArray(entries) ? entries : []);
        } catch (err: any) {
            console.error('Error fetching participants:', err);
            toast.error(err.message || 'Failed to load participants');
        } finally {
            setLoadingParticipants(false);
        }
    };

    const handleWinnerSelection = (userId: string, userName: string) => {
        setConfirmModal({
            isOpen: true,
            type: 'winner',
            challengeId: selectedChallengeId!,
            userId,
            userName
        });
    };

    const confirmWinnerSelection = async () => {
        const { challengeId, userId, userName } = confirmModal;
        setConfirmModal({ isOpen: false, type: null });

        try {
            await adminService.selectChallengeWinner(challengeId!, userId!);
            toast.success(`Successfully selected ${userName} as the winner!`);
            setShowWinnerModal(false);
            setSelectedChallengeId(null);
            setParticipants([]);
            await fetchChallenges();
        } catch (err: any) {
            console.error('Error selecting winner:', err);
            toast.error(err.message || 'Failed to select winner');
        }
    };

    const handleEndChallenge = (challengeId: string) => {
        setConfirmModal({
            isOpen: true,
            type: 'end',
            challengeId
        });
    };

    const confirmEndChallenge = async () => {
        const { challengeId } = confirmModal;
        setConfirmModal({ isOpen: false, type: null });

        try {
            await adminService.endChallenge(challengeId!);
            toast.success('Challenge ended successfully!');
            await fetchChallenges();
        } catch (err: any) {
            console.error('Error ending challenge:', err);
            toast.error(err.message || 'Failed to end challenge');
        }
    };

    const getEditFormData = (): ChallengeFormData => {
        if (!editingChallenge) {
            return {
                title: '',
                description: '',
                bannerImageUrl: '',
                startDate: '',
                endDate: '',
                reward: '',
                hashtags: '',
            };
        }

        const startDate = editingChallenge.startDate ? new Date(editingChallenge.startDate).toISOString().split('T')[0] : '';
        const endDate = editingChallenge.endDate ? new Date(editingChallenge.endDate).toISOString().split('T')[0] : '';

        return {
            title: editingChallenge.title || '',
            description: editingChallenge.description || '',
            bannerImageUrl: editingChallenge.bannerImageUrl || '',
            startDate,
            endDate,
            reward: editingChallenge.reward || '',
            hashtags: editingChallenge.hashtags ? editingChallenge.hashtags.join(', ') : '',
        };
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                    Challenges
                </h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors"
                >
                    <Plus size={20} />
                    <span>Create Challenge</span>
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading challenges...</div>
            ) : challenges.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No challenges found. Create your first challenge!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                        <ChallengeCard
                            key={challenge.id}
                            challenge={challenge}
                            onEdit={handleEditChallenge}
                            onViewParticipants={handleViewParticipants}
                            onSelectWinner={handleSelectWinnerClick}
                            onEndChallenge={handleEndChallenge}
                            loading={loadingParticipants}
                        />
                    ))}
                </div>
            )}

            <ChallengeFormModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateChallenge}
                title="Create New Challenge"
            />

            <ChallengeFormModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditingChallenge(null);
                }}
                onSubmit={handleUpdateChallenge}
                initialData={getEditFormData()}
                title="Edit Challenge"
            />

            <ParticipantsModal
                isOpen={showParticipantsModal}
                onClose={() => {
                    setShowParticipantsModal(false);
                    setSelectedChallengeId(null);
                    setParticipants([]);
                }}
                participants={participants}
                loading={loadingParticipants}
            />

            <ParticipantsModal
                isOpen={showWinnerModal}
                onClose={() => {
                    setShowWinnerModal(false);
                    setSelectedChallengeId(null);
                    setParticipants([]);
                }}
                participants={participants}
                loading={loadingParticipants}
                onSelectWinner={handleWinnerSelection}
                showWinnerSelection
            />

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, type: null })}
                onConfirm={confirmModal.type === 'winner' ? confirmWinnerSelection : confirmEndChallenge}
                title={confirmModal.type === 'winner' ? 'Confirm Winner' : 'End Challenge'}
                message={
                    confirmModal.type === 'winner'
                        ? `Are you sure you want to select ${confirmModal.userName} as the winner?`
                        : 'Are you sure you want to end this challenge?'
                }
                confirmText={confirmModal.type === 'winner' ? 'Select Winner' : 'End Challenge'}
                type={confirmModal.type === 'end' ? 'warning' : 'default'}
            />
        </div>
    );
};

export default ChallengesPage;
