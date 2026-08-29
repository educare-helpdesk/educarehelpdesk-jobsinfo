import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { HELPDESK_PHONE } from '../data/aiouData';

interface ShareButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'amber' | 'iconOnly' | 'compact';
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  className = '',
  variant = 'primary'
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const shareTitle = 'Educare Help Desk - AIOU & Pakistan Jobs Portal (03451291610)';
  const shareText = `Allama Iqbal Open University (AIOU) & Pakistan Job Portal Support.\nGet Solved Assignments, Admission Guidance, Job Apply Guides & AI Study Assistant!\nHelpline & WhatsApp: ${HELPDESK_PHONE}`;
  const shareUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareTitle}\n${shareText}\n${shareUrl}`);
        setCopied(true);
        setShowToast(true);
        setTimeout(() => setCopied(false), 2500);
        setTimeout(() => setShowToast(false), 3000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  if (variant === 'iconOnly') {
    return (
      <div className="relative inline-block">
        <button
          onClick={handleShare}
          className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${className}`}
          title="Share Educare Portal"
        >
          {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
        </button>
        {showToast && (
          <div className="absolute right-0 top-12 z-50 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap animate-in fade-in border border-slate-700">
            Link copied!
          </div>
        )}
      </div>
    );
  }

  if (variant === 'amber') {
    return (
      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-xs ${className}`}
      >
        {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Share2 className="w-4 h-4 text-slate-950" />}
        <span>{copied ? 'Copied to Clipboard!' : 'Share Jobs & Portal'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all border border-slate-700 shadow-2xs ${className}`}
    >
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-300" />}
      <span>{copied ? 'Copied to Clipboard!' : 'Share Portal'}</span>
    </button>
  );
};
