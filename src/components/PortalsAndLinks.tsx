import React from 'react';
import { PORTAL_LINKS, HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { Globe, ExternalLink, ShieldAlert, KeyRound, HelpCircle, Phone, MessageCircle, Layers, CheckCircle2 } from 'lucide-react';
import { FaqSection } from './FaqSection';


export const PortalsAndLinks: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div
        className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-emerald-700"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md">
              AIOU Official Systems Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-200">
              CMS, LMS, Tutor & Book Tracking Portals
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Direct official links to Allama Iqbal Open University digital portals. Contact Educare Help Desk (03451291610) if you face login issues or password resets.
            </p>
          </div>

          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all shrink-0"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Portal Help: {HELPDESK_PHONE}</span>
          </a>
        </div>
      </div>

      {/* Portals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTAL_LINKS.map((portal, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5 text-emerald-800" />
                </div>
                {portal.badge && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded">
                    {portal.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 font-serif transition-colors">
                {portal.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {portal.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-2xs"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>

              <a
                href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk, I need help accessing ${portal.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Issue Help</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Troubleshooting & Login Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-slate-100 pb-2">
            <KeyRound className="w-5 h-5 text-amber-500" />
            <span>AIOU CMS Portal Login Instructions</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Username:</strong> Your Student Registration Number (e.g., 21-PBN-04821) or Student ID.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Password:</strong> Sent via SMS by AIOU upon admission confirmation. Default is usually the last 4 digits of your student ID + registration letters.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Password Reset:</strong> Contact Educare Help Desk at 03451291610 if you haven't received SMS or need login recovery.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-slate-100 pb-2">
            <Layers className="w-5 h-5 text-emerald-800" />
            <span>AAGHI LMS Workshop Attendance Rules</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Online workshops are compulsory for BS, B.Ed, Master, MPhil, and PhD students.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>At least 70% online attendance on Microsoft Teams via AAGHI portal is required to pass the course.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Submit digital assignments in PDF or DOCX format before workshop completion deadline.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive FAQ Knowledge Base */}
      <FaqSection />
    </div>
  );
};
