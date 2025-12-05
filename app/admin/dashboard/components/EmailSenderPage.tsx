'use client';

import React, { useState } from 'react';
import { Send, Eye, Code, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { adminService } from '../../../../services/adminService';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const EmailSenderPage: React.FC = () => {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlBody, setHtmlBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'split'>('split');

  const handleSend = async () => {
    // Validation
    if (!to.trim()) {
      toast.error('Receiver email is required');
      return;
    }

    if (!from.trim()) {
      toast.error('Sender email is required');
      return;
    }

    if (!subject.trim()) {
      toast.error('Subject is required');
      return;
    }

    if (!htmlBody.trim()) {
      toast.error('HTML body is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to.trim())) {
      toast.error('Invalid receiver email format');
      return;
    }

    if (!emailRegex.test(from.trim())) {
      toast.error('Invalid sender email format');
      return;
    }

    // Validate reply-to email if provided
    if (replyTo.trim() && !emailRegex.test(replyTo.trim())) {
      toast.error('Invalid reply-to email format');
      return;
    }

    setIsSending(true);
    try {
      const replyToValue = replyTo.trim() || undefined;
      await adminService.sendEmail(to.trim(), from.trim(), subject.trim(), htmlBody.trim(), replyToValue);
      toast.success('Email sent successfully!');
      
      // Reset form (optional - you might want to keep the values)
      setTo('');
      setReplyTo('');
      setSubject('');
      setHtmlBody('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
          Send Email
        </h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Email Form Fields */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Receiver Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
                disabled={isSending}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sender Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="sender@example.com"
                disabled={isSending}
                className="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reply-To Email <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <Input
                type="email"
                value={replyTo}
                onChange={(e) => setReplyTo(e.target.value)}
                placeholder="reply@example.com"
                disabled={isSending}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email address to receive replies (defaults to sender if not specified)
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                disabled={isSending}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-gray-700">View Mode:</span>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'editor' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('editor')}
              className="h-8"
            >
              <Code size={16} className="mr-2" />
              Editor
            </Button>
            <Button
              variant={viewMode === 'split' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('split')}
              className="h-8"
            >
              Split
            </Button>
            <Button
              variant={viewMode === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('preview')}
              className="h-8"
            >
              <Eye size={16} className="mr-2" />
              Preview
            </Button>
          </div>
        </div>

        {/* HTML Body Editor and Preview */}
        <div className="mb-6">
          {viewMode === 'split' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Editor */}
              <div className="flex flex-col">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  HTML Body <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={htmlBody}
                  onChange={(e) => setHtmlBody(e.target.value)}
                  placeholder="Paste your HTML email content here..."
                  disabled={isSending}
                  className="flex-1 min-h-[400px] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Paste your HTML email content. The preview will show how it appears in the email.
                </p>
              </div>
              {/* Preview */}
              <div className="flex flex-col">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preview
                </label>
                <div className="flex-1 min-h-[400px] border-2 border-gray-200 rounded-md overflow-auto bg-gray-50 p-4">
                  {htmlBody.trim() ? (
                    <div className="bg-white rounded-md shadow-sm p-6 max-w-2xl mx-auto">
                      <div
                        dangerouslySetInnerHTML={{ __html: htmlBody }}
                        className="email-preview"
                        style={{ maxWidth: '100%' }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <Eye size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Preview will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : viewMode === 'editor' ? (
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                HTML Body <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={htmlBody}
                onChange={(e) => setHtmlBody(e.target.value)}
                placeholder="Paste your HTML email content here..."
                disabled={isSending}
                className="min-h-[500px] font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Paste your HTML email content. Use the preview mode to see how it appears.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preview
              </label>
              <div className="min-h-[500px] border-2 border-gray-200 rounded-md overflow-auto bg-gray-50 p-4">
                {htmlBody.trim() ? (
                  <div className="bg-white rounded-md shadow-sm p-6 max-w-2xl mx-auto">
                    <div
                      dangerouslySetInnerHTML={{ __html: htmlBody }}
                      className="email-preview"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <Eye size={48} className="mx-auto mb-2 opacity-50" />
                      <p>No content to preview</p>
                      <p className="text-sm mt-2">Switch to editor mode to add HTML content</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Send Button */}
        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={handleSend}
            disabled={isSending || !to.trim() || !from.trim() || !subject.trim() || !htmlBody.trim()}
            className="bg-[#003366] text-white hover:bg-[#002244] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Send Email
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailSenderPage;

