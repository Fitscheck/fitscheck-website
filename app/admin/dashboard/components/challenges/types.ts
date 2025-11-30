export interface Challenge {
    id: string;
    title: string;
    description: string;
    bannerImageUrl?: string;
    startDate: string;
    endDate: string;
    reward?: string;
    hashtags?: string[];
    status?: 'active' | 'ended';
    participants?: number;
    participantsCount?: number;
    winner?: {
        id: string;
        fullName?: string;
        name?: string;
    } | string;
}

export interface ChallengeFormData {
    title: string;
    description: string;
    bannerImageUrl: string;
    startDate: string;
    endDate: string;
    reward: string;
    hashtags: string;
}

export interface Participant {
    id: string;
    userId: string;
    user?: {
        id: string;
        fullName?: string;
        full_name?: string;
        name?: string;
        username?: string;
    };
    fullName?: string;
    full_name?: string;
    name?: string;
    username?: string;
    postId?: string;
    post?: {
        id: string;
        likesCount?: number;
        likes_count?: number;
    };
    createdAt: string;
}
