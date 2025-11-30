import React, { useState } from 'react';
import { X, Heart, MessageCircle, ThumbsUp, Hash, Calendar, Trash2, ExternalLink, AlertCircle } from 'lucide-react';

interface PostDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: any;
    report: any;
    onDeletePost: (postId: string, reportId: string) => void;
    deletingPostId: string | null;
}

const PostImage: React.FC<{ image: any; index: number }> = ({ image, index }) => {
    const [imageError, setImageError] = useState(false);

    let imageUrl: string | null = null;
    if (typeof image === 'string') {
        imageUrl = image;
    } else if (image && typeof image === 'object') {
        imageUrl = image.url || image.imageUrl || image.uri;
    }

    if (!imageUrl) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-100 rounded-lg p-5">
                <AlertCircle size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Image URL not available</p>
            </div>
        );
    }

    if (imageError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-100 rounded-lg p-5">
                <AlertCircle size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Failed to load image</p>
                <p className="text-xs text-gray-400 mt-2 break-all text-center">{imageUrl.substring(0, 80)}...</p>
            </div>
        );
    }

    return (
        <img
            src={imageUrl}
            alt={`Post image ${index + 1}`}
            className="w-full max-h-[600px] object-contain bg-gray-50 rounded-lg"
            onError={() => setImageError(true)}
        />
    );
};

const PostDetailModal: React.FC<PostDetailModalProps> = ({
    isOpen,
    onClose,
    post,
    report,
    onDeletePost,
    deletingPostId
}) => {
    if (!isOpen || !post) return null;

    const author = post.user || {};
    let images: any[] = [];
    if (Array.isArray(post.images)) {
        images = post.images;
    } else if (post.imageUrls && Array.isArray(post.imageUrls)) {
        images = post.imageUrls.map((url: string) => ({ url }));
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">View Post</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {/* Post Author */}
                    <div className="flex items-center gap-3 mb-5">
                        {author.profilePictureUrl ? (
                            <img
                                src={author.profilePictureUrl}
                                alt={author.fullName || 'User'}
                                className="w-14 h-14 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-[#003366] text-white flex items-center justify-center font-semibold text-xl">
                                {(author.fullName || 'U').charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-lg text-gray-900">{author.fullName || 'Unknown'}</p>
                            <p className="text-sm text-gray-500">{author.username ? `@${author.username}` : ''}</p>
                        </div>
                    </div>

                    {/* Post Title */}
                    {post.title && (
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                    )}

                    {/* Post Content */}
                    <p className="text-gray-700 mb-5 whitespace-pre-wrap leading-relaxed">{post.content || 'No content'}</p>

                    {/* Post Images */}
                    {images.length > 0 ? (
                        <div className="space-y-4 mb-5">
                            {images.map((image, index) => (
                                <div key={image.id || index} className="bg-gray-50 rounded-lg overflow-hidden">
                                    <PostImage image={image} index={index} />
                                    {/* Shop Items */}
                                    {image.shopItems && image.shopItems.length > 0 && (
                                        <div className="p-4 bg-white border-t border-gray-200">
                                            <p className="font-semibold text-gray-900 mb-3">Shop Items:</p>
                                            <div className="space-y-2">
                                                {image.shopItems.map((item: any, itemIndex: number) => (
                                                    <div key={itemIndex} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                        <p className="font-semibold text-gray-900">{item.itemName || item.name}</p>
                                                        {item.brand && <p className="text-sm text-gray-600">Brand: {item.brand}</p>}
                                                        {item.price && (
                                                            <p className="font-semibold text-[#003366] mt-1">
                                                                {item.currency || '$'}{item.price}
                                                            </p>
                                                        )}
                                                        {item.url && (
                                                            <a
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 text-[#003366] hover:underline text-sm mt-2"
                                                            >
                                                                <ExternalLink size={14} />
                                                                <span>View Item</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400 italic">No images in this post</div>
                    )}

                    {/* Hashtags */}
                    {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {post.hashtags.map((tag: string, index: number) => (
                                <span key={index} className="inline-flex items-center gap-1 text-[#003366] font-medium text-sm">
                                    <Hash size={14} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Post Stats */}
                    <div className="flex gap-5 p-4 bg-gray-50 rounded-lg mb-5 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                            <Heart size={16} className="text-red-500" />
                            {post.likesCount || 0} likes
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageCircle size={16} className="text-blue-500" />
                            {post.commentsCount || 0} comments
                        </span>
                        {post.votes !== undefined && (
                            <span className="flex items-center gap-1">
                                <ThumbsUp size={16} className="text-green-500" />
                                {post.votes || 0} votes
                            </span>
                        )}
                    </div>

                    {/* Post Metadata */}
                    <div className="p-4 bg-gray-100 rounded-lg text-sm text-gray-600 space-y-1">
                        <p>Post ID: {post.id}</p>
                        {post.createdAt && (
                            <p className="flex items-center gap-1">
                                <Calendar size={14} />
                                Created: {new Date(post.createdAt).toLocaleString()}
                            </p>
                        )}
                        {post.challengeId && <p>Challenge ID: {post.challengeId}</p>}
                    </div>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={() => onDeletePost(post.id, report.id)}
                        disabled={deletingPostId === post.id}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Trash2 size={16} />
                        <span>{deletingPostId === post.id ? 'Deleting...' : 'Delete Post'}</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;
