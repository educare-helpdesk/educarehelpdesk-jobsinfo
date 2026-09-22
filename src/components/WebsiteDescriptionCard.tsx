import React, { useState } from 'react';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import {
  GraduationCap,
  BookOpen,
  Compass,
  Award,
  FileCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink,
  Maximize2,
  X,
  Sparkles,
  Youtube,
  Send
} from 'lucide-react';

interface WebsiteDescriptionCardProps {
  onOpenInquiry?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const WebsiteDescriptionCard: React.FC<WebsiteDescriptionCardProps> = ({
  onOpenInquiry,
  onNavigateTab
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
    "Hello Educare Help Desk (03451291610), I visited your website and would like guidance for admissions/studies."
  )}`;

  const corePillars = [
    {
      title: "University, College & School Admission Guides",
      desc: "Step-by-step guidance for AIOU, BISE Sargodha, colleges, and top universities across Pakistan.",
      icon: GraduationCap,
      color: "bg-blue-600 text-white",
      badge: "Admissions 2026",
      tab: "programs"
    },
    {
      title: "Career Counseling & Career Planning",
      desc: "Expert roadmap advising students on degree scopes, industry demand, and job opportunities.",
      icon: Compass,
      color: "bg-emerald-600 text-white",
      badge: "Career Advisory",
      tab: "jobs"
    },
    {
      title: "Scholarship Opportunities & Updates",
      desc: "Information on CM Punjab Honhaar, HEC, PEEF, PEF, and need-based financial aid programs.",
      icon: Award,
      color: "bg-purple-600 text-white",
      badge: "Scholarships",
      tab: "scholarships"
    },
    {
      title: "Entry Test Preparation Tips",
      desc: "Proven tips and strategies for PPSC, NTS, MDCAT, ECAT, and university entry examinations.",
      icon: FileCheck,
      color: "bg-amber-600 text-white",
      badge: "Test Prep",
      tab: "jobs"
    },
    {
      title: "Information About Degree Programs",
      desc: "Comprehensive insights into Matric, FA/FSc, BA/BS 4-Year, B.Ed, M.Phil, and Ph.D. degrees.",
      icon: BookOpen,
      color: "bg-cyan-700 text-white",
      badge: "All Programs",
      tab: "programs"
    },
    {
      title: "Study Tips & Student Guidance",
      desc: "Touch-typing speed tests, solved assignment hub, CMS/LMS support, and 24/7 helpline assistance.",
      icon: Sparkles,
      color: "bg-rose-600 text-white",
      badge: "Student Help",
      tab: "typing-test"
    }
  ];

  const benefits = [
    "Reliable Information",
    "Expert Guidance",
    "Better Decisions",
    "Bright Future"
  ];

  return (
    <section className="bg-white rounded-3xl border-2 border-emerald-700/80 shadow-xl overflow-hidden transition-all">
      {/* Top Description Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-4 sm:p-6 border-b-2 border-emerald-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>About Educare Help Desk • Official Website Description</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-serif text-white tracking-tight">
            Your Guide to a Brighter Future!
          </h2>
          <p className="text-emerald-200 text-xs sm:text-sm font-medium">
            Learn. Choose. Succeed. • Complete Educational & Career Guidance Portal
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial min-h-[42px] bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors border border-emerald-500"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>WhatsApp: 03451291610</span>
          </a>

          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="flex-1 md:flex-initial min-h-[42px] bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors border border-amber-500"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Call Helpline</span>
          </a>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-8">
        {/* The Official Description Banner Showcase Card */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-950 group shadow-md">
          <img
            src="/educare-description.png"
            alt="Educare Help Desk - Your Guide to a Brighter Future! Website Description Banner"
            className="w-full h-auto object-cover max-h-[520px] transition-transform duration-300 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />

          {/* Quick Overlay Action Bar */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 shadow-lg backdrop-blur-sm transition-all hover:scale-105"
              title="Click to view full picture in HD zoom"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Expand Picture</span>
            </button>
          </div>
        </div>

        {/* Website Description Narrative & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-2xl">
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                “<strong>We provide easy-to-understand guidance</strong> on university, college, and school admissions, scholarships, entry tests, and career planning to help you make the right decisions for a successful future.”
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-xs font-bold text-emerald-900">
                <span className="font-serif italic text-amber-800 font-extrabold text-sm">“Your Future Starts with the Right Choice, We're Here to Guide You!”</span>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Educare Help Desk is an independent student support and educational consultancy platform. Whether you need assistance with Allama Iqbal Open University (AIOU) admissions, solved assignments, LMS workshops, BISE Sargodha results, government job applications (PPSC/FPSC), touch-typing test practice, or CM Punjab student initiatives, our desk is dedicated to your academic and professional triumph.
            </p>
          </div>

          {/* 4 Trust Pillars from the Picture */}
          <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What We Guarantee</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 bg-white px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="bg-slate-900 text-white rounded-xl p-3 flex items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold block">HELPLINE & WHATSAPP</span>
                  <span className="font-mono font-black text-sm">03451291610</span>
                </div>
                <a
                  href={`tel:${HELPDESK_PHONE}`}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Offerings as shown on the banner */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-950 font-serif">
                What You'll Find On Our Website & Channel
              </h3>
              <p className="text-xs text-slate-600">
                Explore our specialized services tailored for Matric, Intermediate, BS, Master, and Job Aspirants
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full self-start sm:self-auto">
              6 Core Service Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigateTab && onNavigateTab(pillar.tab)}
                  className="bg-slate-50 hover:bg-emerald-50/50 p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer group shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${pillar.color} shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {pillar.badge}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 group-hover:text-emerald-950 pt-1 border-t border-slate-200/80">
                    <span>Explore Service</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Callout & Quick Inquire Button */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-800">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white font-serif">
                Need Personal Student Guidance or Solved Assignments?
              </h4>
              <p className="text-xs text-emerald-200 mt-0.5">
                Reach out to Educare Help Desk at <strong>03451291610</strong> or submit an online inquiry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onOpenInquiry && (
              <button
                onClick={onOpenInquiry}
                className="flex-1 sm:flex-initial min-h-[44px] bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl font-black text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 border border-emerald-500"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Picture Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-3 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 px-2 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-bold font-serif">
                  Educare Help Desk - Official Website Description Picture
                </span>
              </div>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/educare-description.png"
                alt="Educare Help Desk Full Website Description"
                className="w-full h-auto max-h-[80vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="pt-3 px-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300">
              <span>Helpline: <strong>03451291610</strong> • Official Channel: Educare Help Desk</span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${HELPDESK_PHONE}`}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  Call 03451291610
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
