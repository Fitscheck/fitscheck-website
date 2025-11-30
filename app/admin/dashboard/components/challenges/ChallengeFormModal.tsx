import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon } from 'lucide-react';
import { ChallengeFormData } from './types';

interface ChallengeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ChallengeFormData, file: File | null) => Promise<void>;
    initialData?: ChallengeFormData;
    title: string;
}

const ChallengeFormModal: React.FC<ChallengeFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title
}) => {
    const [formData, setFormData] = useState<ChallengeFormData>(
        initialData || {
            title: '',
            description: '',
            bannerImageUrl: '',
            startDate: '',
            endDate: '',
            reward: '',
            hashtags: '',
        }
    );
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string>(initialData?.bannerImageUrl || '');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerFile(file);
            setFormData({ ...formData, bannerImageUrl: '' });
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData, bannerFile);
            onClose();
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#003366] transition-colors">
                                        <Upload size={20} />
                                        <span className="text-sm">Upload Image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={!!formData.bannerImageUrl}
                                            className="hidden"
                                        />
                                    </label>
                                    <span className="text-gray-400">or</span>
                                    <div className="flex-1 relative">
                                        <LinkIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="url"
                                            value={formData.bannerImageUrl}
                                            onChange={(e) => {
                                                setFormData({ ...formData, bannerImageUrl: e.target.value });
                                                if (e.target.value) {
                                                    setBannerFile(null);
                                                    setBannerPreview(e.target.value);
                                                }
                                            }}
                                            disabled={!!bannerFile}
                                            placeholder="Image URL"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                                        />
                                    </div>
                                </div>
                                {bannerPreview && (
                                    <div className="relative inline-block">
                                        <img src={bannerPreview} alt="Preview" className="max-w-full h-32 rounded-lg border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setBannerFile(null);
                                                setBannerPreview('');
                                                setFormData({ ...formData, bannerImageUrl: '' });
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Reward</label>
                            <input
                                type="text"
                                value={formData.reward}
                                onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                                placeholder="e.g., $500 Gift Card"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
                            <input
                                type="text"
                                value={formData.hashtags}
                                onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                                placeholder="#summer, #fashion"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Saving...' : 'Save Challenge'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChallengeFormModal;
