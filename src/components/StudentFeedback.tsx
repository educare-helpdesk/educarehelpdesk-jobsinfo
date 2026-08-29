import React, { useState } from 'react';
import { Star, Send, CheckCircle2, MessageSquare, ThumbsUp, AlertCircle } from 'lucide-react';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';

export const StudentFeedback: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [studentName, setStudentName] = useState<string>('');
  const [programLevel, setProgramLevel] = useState<string>('B.Ed');
  const [comments, setComments] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappFeedbackUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
    `Hello Educare Help Desk (03451291610),\nStudent Feedback:\nName: ${studentName || 'Student'}\nRating: ${rating}/5 Stars\nProgram: ${programLevel}\nComments: ${comments}`
  )}`;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <ThumbsUp className="w-5 h-5 text-amber-500" />
        <h3 className="text-base font-bold font-serif text-slate-900">
          Student Feedback & Rating
        </h3>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900">Thank you for your review!</h4>
          <p className="text-xs text-slate-600">Your feedback helps us continuously improve our student support services.</p>
          <a
            href={whatsappFeedbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send Feedback via WhatsApp</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="text-center space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="font-bold text-slate-700 block">Rate Educare Help Desk:</span>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Ali Raza"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Comments / Suggestions</label>
            <textarea
              rows={2}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Share your experience or suggestions for Educare Help Desk..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-2xs"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};
