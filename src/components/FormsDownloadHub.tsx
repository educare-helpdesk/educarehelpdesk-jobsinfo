import React, { useState, useMemo, useRef } from 'react';
import {
  FileDown,
  Printer,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Building2,
  Clock,
  Coins,
  ShieldCheck,
  Send,
  MessageCircle,
  Eye,
  Edit3,
  X,
  Sparkles,
  Download,
  Filter,
  FileCheck,
  HelpCircle,
  PhoneCall,
  GraduationCap
} from 'lucide-react';
import {
  DOWNLOADABLE_FORMS,
  FORMS_CATEGORIES,
  DownloadableForm,
  FormCategory
} from '../data/formsData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';

interface FormsDownloadHubProps {
  onNavigateTab?: (tab: string) => void;
  onOpenInquiry?: (formTitle?: string) => void;
}

export const FormsDownloadHub: React.FC<FormsDownloadHubProps> = ({
  onNavigateTab,
  onOpenInquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FormCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewForm, setPreviewForm] = useState<DownloadableForm | null>(null);
  const [fillModalForm, setFillModalForm] = useState<DownloadableForm | null>(null);

  // Form customizer inputs state
  const [customFields, setCustomFields] = useState<Record<string, string>>({
    fullName: '',
    fatherName: '',
    cnic: '',
    rollNo: '',
    program: '',
    mobile: '',
    address: '',
    challanNo: '',
    purposeReason: ''
  });

  const printAreaRef = useRef<HTMLDivElement>(null);

  // Filter forms
  const filteredForms = useMemo(() => {
    return DOWNLOADABLE_FORMS.filter((form) => {
      const matchesCategory =
        selectedCategory === 'All' || form.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        form.title.toLowerCase().includes(q) ||
        form.description.toLowerCase().includes(q) ||
        form.department.toLowerCase().includes(q) ||
        form.formCode.toLowerCase().includes(q) ||
        form.category.toLowerCase().includes(q) ||
        form.applicableFor.toLowerCase().includes(q) ||
        form.requiredDocuments.some((doc) => doc.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Copy text handler
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Download raw text file (.txt / Word-compatible document)
  const handleDownloadTextFile = (form: DownloadableForm) => {
    const header = `========================================================================\n` +
      `EDUCARE HELP DESK PAKISTAN - OFFICIAL FORMS & APPLICATIONS REPOSITORY\n` +
      `Helpline: ${HELPDESK_PHONE} | WhatsApp: 03451291610\n` +
      `========================================================================\n\n` +
      `FORM TITLE: ${form.title}\n` +
      `FORM CODE: ${form.formCode}\n` +
      `DEPARTMENT: ${form.department}\n` +
      `CATEGORY: ${form.category}\n` +
      `FEE: ${form.feeInfo}\n` +
      `PROCESSING TIME: ${form.processingTime}\n` +
      `SUBMISSION TO: ${form.submissionChannel}\n\n` +
      `REQUIRED DOCUMENTS TO ATTACH:\n` +
      form.requiredDocuments.map((d, i) => `  ${i + 1}. [ ] ${d}`).join('\n') +
      `\n\nSPECIAL INSTRUCTIONS:\n` +
      form.instructions.map((ins, i) => `  * ${ins}`).join('\n') +
      `\n\n------------------------------------------------------------------------\n` +
      `OFFICIAL APPLICATION / PROFORMA TEXT (FILLABLE):\n` +
      `------------------------------------------------------------------------\n\n` +
      form.sampleContent +
      `\n\n========================================================================\n` +
      `Downloaded from Educare Help Desk Pakistan Student Portal (www.educare.pk)\n` +
      `For instant online verification & processing assistance, call ${HELPDESK_PHONE}.\n`;

    const blob = new Blob([header], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.formCode}_${form.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Trigger Print Dialog
  const handlePrintForm = (form: DownloadableForm, customValues?: Record<string, string>) => {
    const printWindow = window.open('', '_blank', 'width=850,height=1100');
    if (!printWindow) {
      alert('Please allow popups to open the print dialog.');
      return;
    }

    const tpl = form.printableTemplate;
    const nameVal = customValues?.fullName || '________________________________________';
    const fNameVal = customValues?.fatherName || '________________________________________';
    const cnicVal = customValues?.cnic || '_____-________-_';
    const rollVal = customValues?.rollNo || '___________________';
    const progVal = customValues?.program || '________________________________________';
    const mobileVal = customValues?.mobile || '03___-________';
    const addrVal = customValues?.address || '____________________________________________________________________';
    const challanVal = customValues?.challanNo || '___________________';
    const reasonVal = customValues?.purposeReason || '____________________________________________________________________';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${form.formCode} - ${form.title}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #0f172a;
            line-height: 1.4;
            margin: 0;
            padding: 10px;
            font-size: 13px;
          }
          .header-box {
            text-align: center;
            border-bottom: 2px solid #047857;
            padding-bottom: 12px;
            margin-bottom: 16px;
          }
          .auth-title {
            font-size: 18px;
            font-weight: 800;
            color: #064e3b;
            margin: 0;
            letter-spacing: 0.5px;
          }
          .sub-title {
            font-size: 13px;
            font-weight: 600;
            color: #334155;
            margin: 4px 0 0 0;
          }
          .form-title-badge {
            display: inline-block;
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            padding: 4px 14px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 14px;
            margin-top: 8px;
            color: #0f172a;
          }
          .meta-bar {
            display: flex;
            justify-content: space-between;
            background: #f8fafc;
            border: 1px dashed #94a3b8;
            padding: 6px 10px;
            font-size: 11px;
            margin-bottom: 16px;
            border-radius: 4px;
          }
          .section-box {
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            overflow: hidden;
          }
          .section-head {
            background: #047857;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            padding: 5px 10px;
          }
          .section-body {
            padding: 10px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 14px;
          }
          .field-row {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          .field-row.full {
            grid-column: span 2;
          }
          .field-label {
            font-size: 11px;
            font-weight: 700;
            color: #475569;
            text-transform: uppercase;
          }
          .field-value {
            border-bottom: 1px dotted #475569;
            padding: 2px 4px;
            font-size: 13px;
            font-weight: 600;
            min-height: 18px;
          }
          .declaration-box {
            border: 1px solid #cbd5e1;
            padding: 10px;
            border-radius: 4px;
            background: #fafafa;
            font-size: 11.5px;
            margin-bottom: 20px;
          }
          .signature-grid {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            padding-top: 10px;
          }
          .sig-line {
            width: 220px;
            border-top: 1px solid #0f172a;
            text-align: center;
            font-size: 11px;
            font-weight: 700;
            padding-top: 4px;
          }
          .docs-checklist {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            font-size: 11px;
            border-radius: 4px;
            margin-bottom: 14px;
          }
          .docs-checklist h4 {
            margin: 0 0 6px 0;
            color: #064e3b;
            font-size: 11px;
          }
          .footer-note {
            margin-top: 25px;
            border-top: 1px solid #e2e8f0;
            padding-top: 6px;
            font-size: 10px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div class="auth-title">${tpl.authority}</div>
          <div class="sub-title">${tpl.subHeader}</div>
          <div class="form-title-badge">${form.title} (${form.formCode})</div>
        </div>

        <div class="meta-bar">
          <div><strong>Category:</strong> ${form.category}</div>
          <div><strong>Processing Fee:</strong> ${form.feeInfo}</div>
          <div><strong>Processing Time:</strong> ${form.processingTime}</div>
        </div>

        ${tpl.sections
          .map(
            (sec) => `
          <div class="section-box">
            <div class="section-head">${sec.heading}</div>
            <div class="section-body">
              ${sec.fields
                .map((f) => {
                  let mappedVal = f.valuePlaceholder || '';
                  if (f.label.toLowerCase().includes('name') && !f.label.toLowerCase().includes('father') && !f.label.toLowerCase().includes('mother') && !f.label.toLowerCase().includes('dept')) mappedVal = nameVal;
                  else if (f.label.toLowerCase().includes('father')) mappedVal = fNameVal;
                  else if (f.label.toLowerCase().includes('cnic') || f.label.toLowerCase().includes('b-form')) mappedVal = cnicVal;
                  else if (f.label.toLowerCase().includes('roll')) mappedVal = rollVal;
                  else if (f.label.toLowerCase().includes('program') || f.label.toLowerCase().includes('course') || f.label.toLowerCase().includes('post applied')) mappedVal = progVal;
                  else if (f.label.toLowerCase().includes('mobile') || f.label.toLowerCase().includes('phone')) mappedVal = mobileVal;
                  else if (f.label.toLowerCase().includes('address')) mappedVal = addrVal;
                  else if (f.label.toLowerCase().includes('challan') || f.label.toLowerCase().includes('transaction')) mappedVal = challanVal;
                  else if (f.label.toLowerCase().includes('reason') || f.label.toLowerCase().includes('justification')) mappedVal = reasonVal;

                  return `
                    <div class="field-row ${f.isLong ? 'full' : ''}">
                      <div class="field-label">${f.label}</div>
                      <div class="field-value">${mappedVal}</div>
                    </div>
                  `;
                })
                .join('')}
            </div>
          </div>
        `
          )
          .join('')}

        <div class="docs-checklist">
          <h4>MANDATORY ATTACHMENTS & CHECKLIST:</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            ${form.requiredDocuments
              .map((doc) => `<div>[ &nbsp; ] ${doc}</div>`)
              .join('')}
          </div>
        </div>

        <div class="declaration-box">
          <strong>DECLARATION / UNDERTAKING:</strong><br/>
          ${tpl.declarationText}
        </div>

        <div class="signature-grid">
          <div>
            <div style="font-size: 11px; margin-bottom: 25px;">Date: ____/____/2026</div>
            <div class="sig-line">Thumb Impression (Left/Right)</div>
          </div>
          <div>
            <div style="font-size: 11px; margin-bottom: 25px;">Candidate / Applicant Name: ${nameVal}</div>
            <div class="sig-line">Signature of Applicant / Deponent</div>
          </div>
          <div>
            <div style="font-size: 11px; margin-bottom: 25px;">Verified By (Official Seal)</div>
            <div class="sig-line">Attestation Authority / Head of Office</div>
          </div>
        </div>

        <div class="footer-note">
          <span>Educare Help Desk Pakistan • Official Student & Citizen Facilitation Center • Helpline: ${HELPDESK_PHONE}</span>
          <span>Tracking / Inquiries: WhatsApp 03451291610</span>
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleOpenFillModal = (form: DownloadableForm) => {
    setFillModalForm(form);
  };

  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fillModalForm) return;
    handlePrintForm(fillModalForm, customFields);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner with Clean Aesthetics */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold uppercase tracking-wide">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Master Forms & Applications Desk 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Download Official Forms, Applications & Certificates
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Instant 1-click printable downloads for <strong>AIOU Admission & Degree Forms</strong>, <strong>Job Applications & Experience Letters</strong>, <strong>University NOC & Migration</strong>, <strong>Bank Challans</strong>, <strong>NADRA Birth Proformas</strong>, and <strong>Legal Stamp Affidavits</strong>.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <div className="text-xl sm:text-2xl font-black text-amber-300">
                {DOWNLOADABLE_FORMS.length}+
              </div>
              <div className="text-xs text-slate-200 font-medium">Official Forms</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <div className="text-xl sm:text-2xl font-black text-emerald-300">100%</div>
              <div className="text-xs text-slate-200 font-medium">Free Downloads</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <div className="text-xl sm:text-2xl font-black text-teal-300">A4 PDF</div>
              <div className="text-xs text-slate-200 font-medium">Print & Word Ready</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <div className="text-xl sm:text-2xl font-black text-rose-300">24/7</div>
              <div className="text-xs text-slate-200 font-medium">Helpline Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by form name, department, code (e.g. Degree form, NOC, Job Apply, Experience letter, Birth, Challan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 shrink-0 pr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>

          {FORMS_CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? DOWNLOADABLE_FORMS.length
                : DOWNLOADABLE_FORMS.filter((f) => f.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    isSelected
                      ? 'bg-emerald-950 text-emerald-200'
                      : 'bg-white text-slate-700 border border-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="text-sm font-bold text-slate-700">
          Showing <span className="text-emerald-700 font-extrabold">{filteredForms.length}</span> official downloadable forms
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1">
            <Printer className="w-3.5 h-3.5 text-emerald-600" /> A4 Printable
          </span>
          <span className="flex items-center gap-1">
            <FileDown className="w-3.5 h-3.5 text-teal-600" /> Text / Word Template
          </span>
          <span className="flex items-center gap-1">
            <Edit3 className="w-3.5 h-3.5 text-indigo-600" /> Interactive Fill
          </span>
        </div>
      </div>

      {/* Forms Grid */}
      {filteredForms.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No forms found matching your search</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords or switch category to "All". You can also directly contact Educare Help Desk for custom forms.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
            >
              Reset Filters
            </button>
            <a
              href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk, I need a specific application form not found on the portal.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Helpline via WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredForms.map((form) => {
            const isCopied = copiedId === form.id;

            return (
              <div
                key={form.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top / Header */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${form.badgeColor}`}
                        >
                          {form.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-500 font-mono">
                          {form.formCode}
                        </span>
                        {form.isUrgentAvailable && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            Fast-Track Urgent Mode
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                        {form.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{form.department}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {form.description}
                  </p>

                  {/* Metadata Chips Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 block uppercase">
                          Fee / Charges
                        </span>
                        <span className="font-bold text-slate-800">{form.feeInfo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 block uppercase">
                          Processing Time
                        </span>
                        <span className="font-bold text-slate-800">{form.processingTime}</span>
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex items-start gap-2 pt-1 border-t border-slate-200/60">
                      <Send className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 block uppercase">
                          Submission Destination
                        </span>
                        <span className="font-medium text-slate-700 text-[11px] leading-tight">
                          {form.submissionChannel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Required Documents Accordion / Preview */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Required Documents to Attach:</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 pl-1">
                      {form.requiredDocuments.slice(0, 3).map((doc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{doc}</span>
                        </li>
                      ))}
                      {form.requiredDocuments.length > 3 && (
                        <li className="text-[11px] text-slate-500 pl-5 italic">
                          + {form.requiredDocuments.length - 3} more attachments required (view preview for full list)
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
                  {/* Left Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Print / A4 Download Button */}
                    <button
                      onClick={() => handlePrintForm(form)}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all border border-emerald-800"
                      title="Print A4 Format or Save as PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / PDF</span>
                    </button>

                    {/* Word / TXT Template Download */}
                    <button
                      onClick={() => handleDownloadTextFile(form)}
                      className="bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all border border-teal-200"
                      title="Download Editable Text / Word Template"
                    >
                      <FileDown className="w-3.5 h-3.5 text-teal-700" />
                      <span>Download Text</span>
                    </button>

                    {/* Interactive Form Fill Button */}
                    <button
                      onClick={() => handleOpenFillModal(form)}
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all border border-indigo-200"
                      title="Fill Online with your Name & Roll No before printing"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-700" />
                      <span>Fill & Print</span>
                    </button>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewForm(form)}
                      className="p-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-all text-xs font-bold flex items-center gap-1"
                      title="View Full Form Details & Checklist"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Preview</span>
                    </button>

                    <button
                      onClick={() => handleCopyText(form.id, form.sampleContent)}
                      className="p-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-all"
                      title="Copy Form Text to Clipboard"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk, I need help regarding ${form.title} (${form.formCode}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-300 transition-all"
                      title="Ask Help Desk on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Form Fill & Customizer Modal */}
      {fillModalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-500/30 border border-indigo-400/40 text-indigo-200">
                    Interactive Form Fill
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    {fillModalForm.formCode}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {fillModalForm.title}
                </h3>
              </div>
              <button
                onClick={() => setFillModalForm(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Inputs */}
            <form onSubmit={handleCustomFormSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3.5 text-xs text-indigo-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  Enter your details below to generate a pre-filled, print-ready document. Empty fields will appear with clean standard underline blanks for manual handwriting.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Candidate / Applicant Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammad Usman"
                    value={customFields.fullName}
                    onChange={(e) =>
                      setCustomFields({ ...customFields, fullName: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Father's / Husband's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Abdul Rasheed"
                    value={customFields.fatherName}
                    onChange={(e) =>
                      setCustomFields({ ...customFields, fatherName: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    CNIC / B-Form Number
                  </label>
                  <input
                    type="text"
                    placeholder="38403-1234567-1"
                    value={customFields.cnic}
                    onChange={(e) =>
                      setCustomFields({ ...customFields, cnic: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Roll Number / Student ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CE648902 / 0000123456"
                    value={customFields.rollNo}
                    onChange={(e) =>
                      setCustomFields({ ...customFields, rollNo: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Program / Degree / Post Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Ed 1.5 Years / BS English / Educator"
                    value={customFields.program}
                    onChange={(e) =>
                      setCustomFields({ ...customFields, program: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Active Mobile / WhatsApp Number
                  </label>
                  <input
                    type="text"
                    placeholder="0345-1234567"
                    value={customFields.mobile}
                    onChange={(e) =>
                      setCustomFields({ ...customFields, mobile: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Complete Postal Mailing Address
                  </label>
                  <input
                    type="text"
                    placeholder="House No., Street, Mohallah / City, District"
                    value={customFields.address}
                    onChange={(e) =>
                      setCustomFields({ ...customFields, address: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Specific Reason / Purpose / Course Codes / Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter any additional details, target university for NOC, or justification..."
                    value={customFields.purposeReason}
                    onChange={(e) =>
                      setCustomFields({ ...customFields, purposeReason: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium text-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFillModalForm(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-600 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Generate & Print Pre-Filled Form</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Form Preview & Details
                  </span>
                  <span className="text-xs text-slate-300 font-mono">{previewForm.formCode}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{previewForm.title}</h3>
              </div>
              <button
                onClick={() => setPreviewForm(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              {/* Overview Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">
                    Department
                  </span>
                  <span className="font-bold text-slate-800">{previewForm.department}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">
                    Fee / Bank Charges
                  </span>
                  <span className="font-bold text-slate-800">{previewForm.feeInfo}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">
                    Processing Duration
                  </span>
                  <span className="font-bold text-slate-800">{previewForm.processingTime}</span>
                </div>
              </div>

              {/* Required Documents */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Mandatory Documents Checklist:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200">
                  {previewForm.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Important Instructions & Submission Rules:</span>
                </h4>
                <ul className="space-y-1.5 list-disc pl-5 text-slate-600 font-medium">
                  {previewForm.instructions.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
                </ul>
              </div>

              {/* Raw Form Template Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">
                    Form Layout & Text Template:
                  </h4>
                  <button
                    onClick={() => handleCopyText(previewForm.id, previewForm.sampleContent)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    {copiedId === previewForm.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Text
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-slate-900 text-emerald-300 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap overflow-x-auto border border-slate-800 max-h-52">
                  {previewForm.sampleContent}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setPreviewForm(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handlePrintForm(previewForm);
                    setPreviewForm(null);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Blank A4</span>
                </button>

                <button
                  onClick={() => {
                    const target = previewForm;
                    setPreviewForm(null);
                    handleOpenFillModal(target);
                  }}
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Fill & Print</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Assistance & Facilitation Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Need Help with Form Submission or Attestation?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Educare Help Desk Form Filling & Degree Tracking Desk
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            Our student advisors assist with challan generation, urgent degree applications, degree tracking (DTS), paper rechecking, and courier dispatches.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk, I need assistance in filling and submitting my university / job form.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-900 hover:bg-emerald-50 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp 03451291610</span>
          </a>

          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="bg-emerald-950 hover:bg-black text-amber-300 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 border border-emerald-600"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Call Helpline</span>
          </a>
        </div>
      </div>
    </div>
  );
};
