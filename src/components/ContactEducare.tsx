import React, { useState } from 'react';
import { ProgramLevel, ServiceInquiry } from '../types';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP, AIOU_FAQS } from '../data/aiouData';
import { Phone, MessageCircle, Clock, MapPin, Send, HelpCircle, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { FaqSection } from './FaqSection';
import { StudentFeedback } from './StudentFeedback';

interface ContactEducareProps {
  initialLevel?: ProgramLevel;
  initialCode?: string;
}

export const ContactEducare: React.FC<ContactEducareProps> = ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone) {
      setStatus({ type: 'error', message: 'Please provide your name and phone number.' });
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
        message: 'Inquiry registered! Opening direct WhatsApp link with Educare Help Desk...',
        whatsappUrl: data.whatsappUrl
      });

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Network error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk (03451291610), I need student support for AIOU.")}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Contact Banner */}
      <div
        className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-700"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full">
              Official Educare Helpline
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-200">
              Contact Educare Help Desk: 03451291610
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-base leading-relaxed">
              Have queries regarding Allama Iqbal Open University (AIOU) admissions, solved assignments, LMS workshops, CMS portal, or degree verification? Reach out to our helpline directly.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${HELPDESK_PHONE}`}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-3 rounded-xl text-sm flex items-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call Helpline: {HELPDESK_PHONE}</span>
              </a>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-2 shadow-md border border-emerald-500/50"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Chat (03451291610)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-3 border-2 border-amber-400 shadow-xl group">
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner">
                <img
                  src="/educare-description.png"
                  alt="Educare Help Desk - Your Guide to a Brighter Future! Website Description"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs font-bold text-slate-700 px-1">
                <span>Learn. Choose. Succeed.</span>
                <span className="text-emerald-700 font-extrabold">Helpline: 03451291610</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-xl font-bold text-slate-900 font-serif border-b border-slate-100 pb-3">
            Submit Online Student Inquiry
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  placeholder="Your Full Name"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Academic Level</label>
                <select
                  value={formData.programLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, programLevel: e.target.value as ProgramLevel }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
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
                <label className="block font-bold text-slate-700 mb-1">Course Code (Optional)</label>
                <input
                  type="text"
                  value={formData.courseCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                  placeholder="e.g. 8601, 247, 1423"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Service Needed</label>
              <select
                value={formData.serviceNeeded}
                onChange={(e) => setFormData(prev => ({ ...prev, serviceNeeded: e.target.value as any }))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Assignment Assistance">Assignment Assistance & Solved Papers</option>
                <option value="Admission Help">AIOU New Admission Help & Form Filling</option>
                <option value="Fee Information">Fee Structure & Challan Query</option>
                <option value="Past Papers">Past Papers & Exam Guidance</option>
                <option value="LMS / CMS Support">AAGHI LMS / CMS Portal Support</option>
                <option value="Degree Verification">Degree Verification & Result Cards</option>
                <option value="Other">Other Query</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Message / Question Details</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Type your questions or required course details here..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Submit & Open WhatsApp Desk</span>
            </button>

            {status && (
              <div className={`p-4 rounded-xl text-xs flex items-start gap-2 ${
                status.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'
              }`}>
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{status.message}</p>
                  {status.whatsappUrl && (
                    <a
                      href={status.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-extrabold text-emerald-800 mt-1 inline-block"
                    >
                      Click here if WhatsApp didn't open automatically
                    </a>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Info & FAQ Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-amber-300">
              Educare Help Desk Details
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Helpline Phone</span>
                  <a href={`tel:${HELPDESK_PHONE}`} className="text-sm font-bold text-white hover:underline">{HELPDESK_PHONE}</a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">WhatsApp Desk</span>
                  <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:underline">{HELPDESK_PHONE}</a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Working Hours</span>
                  <span className="text-xs font-semibold text-white">Mon - Sat: 8:00 AM to 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive FAQs */}
          <FaqSection />
        </div>
      </div>
    </div>
  );
};
