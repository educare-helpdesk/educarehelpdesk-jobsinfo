import React, { useState, useEffect } from 'react';
import { ProgramLevel, ServiceInquiry } from '../types';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { X, Send, Phone, MessageCircle, CheckCircle2, AlertCircle, GraduationCap } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: ProgramLevel;
  initialCode?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialLevel,
  initialCode
}) => {
  const [formData, setFormData] = useState<ServiceInquiry>({
    studentName: '',
    phone: '',
    programLevel: initialLevel || 'General Inquiry',
    courseCode: initialCode || '',
    serviceNeeded: 'Assignment Assistance',
    message: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string; whatsappUrl?: string } | null>(null);

  useEffect(() => {
    if (initialLevel) {
      setFormData(prev => ({ ...prev, programLevel: initialLevel }));
    }
    if (initialCode) {
      setFormData(prev => ({ ...prev, courseCode: initialCode }));
    }
  }, [initialLevel, initialCode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone) {
      setStatus({ type: 'error', message: 'Please enter your name and phone number.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');

      setStatus({
        type: 'success',
        message: 'Inquiry received! Redirecting to WhatsApp desk...',
        whatsappUrl: data.whatsappUrl
      });

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Error sending request.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-emerald-900 text-white p-5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-amber-100">Educare Help Desk (03451291610)</h3>
              <p className="text-[11px] text-emerald-200">AIOU Student Support & Solved Assignments Desk</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
            <input
              type="text"
              required
              value={formData.studentName}
              onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
              placeholder="Your Name"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="e.g. 03451234567"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Program Level</label>
              <select
                value={formData.programLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, programLevel: e.target.value as ProgramLevel }))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Matric">Matric</option>
                <option value="FA / Intermediate">FA / Intermediate</option>
                <option value="BA / AD">BA / AD</option>
                <option value="BS (4-Year)">BS (4-Year)</option>
                <option value="B.Ed">B.Ed</option>
                <option value="Master / PGD">Master / PGD</option>
                <option value="M.Phil / MS">M.Phil / MS</option>
                <option value="Ph.D.">Ph.D.</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Course Code (If any)</label>
              <input
                type="text"
                value={formData.courseCode}
                onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                placeholder="e.g. 8601"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Service Needed</label>
            <select
              value={formData.serviceNeeded}
              onChange={(e) => setFormData(prev => ({ ...prev, serviceNeeded: e.target.value as any }))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="Assignment Assistance">Assignment Assistance & Solved Papers</option>
              <option value="Admission Help">New Admission Form & Eligibility</option>
              <option value="Fee Information">Fee Structure & Challan</option>
              <option value="Past Papers">Past Papers & Syllabus</option>
              <option value="LMS / CMS Support">LMS Workshop / CMS Portal Help</option>
              <option value="Other">Other Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Message Details</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="How can Educare Help Desk assist you today?"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Submit & Connect to 03451291610</span>
          </button>

          {status && (
            <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold">{status.message}</p>
              </div>
            </div>
          )}
        </form>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center text-xs text-slate-500 flex justify-between items-center">
          <span>Or call directly:</span>
          <a href={`tel:${HELPDESK_PHONE}`} className="font-extrabold text-emerald-800 hover:underline">{HELPDESK_PHONE}</a>
        </div>
      </div>
    </div>
  );
};
