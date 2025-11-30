export type ReportStatus = 'pending' | 'reviewed' | 'resolved';
export type ReportType = 'profile' | 'post' | 'comment';

export interface BaseReport {
    id: string;
    status: ReportStatus;
    reason: string;
    description?: string;
    created_at: string;
    createdAt?: string;
    reporter_full_name?: string;
    reporterFullName?: string;
    reporter_username?: string;
    reporterUsername?: string;
}

export interface ProfileReport extends BaseReport {
    reported_full_name?: string;
    reportedFullName?: string;
    reported_username?: string;
    reportedUsername?: string;
    reported_profile_picture?: string;
    reportedProfilePicture?: string;
}

export interface CommentReport extends BaseReport {
    comment_id?: string;
    commentId?: string;
    comment_content?: string;
    commentContent?: string;
    comment_author_name?: string;
    commentAuthorName?: string;
    comment_author_username?: string;
    commentAuthorUsername?: string;
    post_id?: string;
    postId?: string;
}

export interface PostReport extends BaseReport {
    post_id?: string;
    postId?: string;
    post_title?: string;
    postTitle?: string;
    post_content?: string;
    postContent?: string;
    post_author_name?: string;
    postAuthorName?: string;
    post_author_username?: string;
    postAuthorUsername?: string;
    post_images?: string[];
    postImages?: string[];
}
