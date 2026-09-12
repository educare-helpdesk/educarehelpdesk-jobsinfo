import React, { useState } from 'react';
import { CoverPageData } from '../types';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { FileText, Printer, Download, Sparkles, CheckCircle2, GraduationCap, Phone } from 'lucide-react';

export const CoverPageMaker: React.FC = () => {
  const [formData, setFormData] = useState<CoverPageData>({
    studentName: 'Muhammad Ali',
    rollNumber: 'CB-849201',
    registrationNumber: '21-PBN-04821',
    program: 'B.Ed (1.5 Years)',
    courseCode: '8601',
    courseTitle: 'General Methods of Teaching',
    assignmentNumber: 'Assignment 1',
    semester: 'Autumn 2025',
    tutorName: 'Prof. Dr. Ahmed Khan',
    tutorAddress: 'AIOU Regional Campus, Sector H-8, Islamabad',
    submissionDate: new Date().toISOString().split('T')[0],
    studentPhone: '0300-1234567'
  });

  const handleChange = (field: keyof CoverPageData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePrintHtml = () => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>AIOU Assignment Cover Page - ${formData.courseCode}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: 'Times New Roman', serif; color: #000; padding: 20px; box-sizing: border-box; }
          .border-box { border: 4px double #064e3b; padding: 25px; min-height: 90vh; position: relative; }
          .header { text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 15px; margin-bottom: 25px; }
          .header h1 { font-size: 24px; margin: 0; text-transform: uppercase; color: #064e3b; letter-spacing: 1px; }
          .header h2 { font-size: 18px; margin: 5px 0 0; color: #1e293b; font-weight: normal; }
          .header p { font-size: 14px; margin: 5px 0 0; font-style: italic; color: #475569; }
          .title-badge { text-align: center; margin: 20px 0; }
          .title-badge span { background: #064e3b; color: #fff; padding: 8px 25px; font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .table td { padding: 10px 12px; border: 1px solid #064e3b; font-size: 15px; }
          .table td.label { font-weight: bold; background: #f0fdf4; width: 35%; color: #064e3b; }
          .footer-note { margin-top: 40px; border-top: 1px solid #cbd5e1; pt: 15px; text-align: center; font-size: 12px; color: #64748b; }
          .watermark { position: absolute; bottom: 30px; right: 30px; font-size: 11px; color: #94a3b8; font-family: sans-serif; }
        </style>
      </head>
      <body>
        <div class="border-box">
          <div class="header">
            <h1>Allama Iqbal Open University, Islamabad</h1>
            <h2>Assignment Submission Declaration Sheet</h2>
            <p>Prepared via Educare Help Desk (Helpline: ${HELPDESK_PHONE})</p>
          </div>

          <div class="title-badge">
            <span>${formData.assignmentNumber.toUpperCase()}</span>
          </div>

          <table class="table">
            <tr>
              <td class="label">Student Full Name:</td>
              <td><strong>${formData.studentName}</strong></td>
            </tr>
            <tr>
              <td class="label">Roll Number:</td>
              <td><strong>${formData.rollNumber}</strong></td>
            </tr>
            <tr>
              <td class="label">Registration Number:</td>
              <td><strong>${formData.registrationNumber}</strong></td>
            </tr>
            <tr>
              <td class="label">Academic Program:</td>
              <td>${formData.program}</td>
            </tr>
            <tr>
              <td class="label">Course Code & Title:</td>
              <td><strong>Code ${formData.courseCode}:</strong> ${formData.courseTitle}</td>
            </tr>
            <tr>
              <td class="label">Semester / Session:</td>
              <td>${formData.semester}</td>
            </tr>
            <tr>
              <td class="label">Tutor Name:</td>
              <td>${formData.tutorName}</td>
            </tr>
            <tr>
              <td class="label">Tutor Address / LMS Details:</td>
              <td>${formData.tutorAddress}</td>
            </tr>
            <tr>
              <td class="label">Submission Date:</td>
              <td>${formData.submissionDate}</td>
            </tr>
            <tr>
              <td class="label">Student Phone Number:</td>
              <td>${formData.studentPhone}</td>
            </tr>
          </table>

          <div style="margin-top: 50px; display: flex; justify-content: space-between; font-size: 14px;">
            <div>______________________<br/>Student Signature</div>
            <div>______________________<br/>Tutor Signature & Stamp</div>
          </div>

          <div class="footer-note">
            This cover page meets Allama Iqbal Open University assignment submission guidelines.<br/>
            Educare Help Desk • Student Counseling & Solved Assignment Support • 03451291610
          </div>
          <div class="watermark">Educare Desk 03451291610</div>
        </div>
      </body>
    </html>
  `;

  const handlePrint = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        // Fallback for Windows 7 popup blockers
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);
        const doc = iframe.contentWindow?.document || iframe.contentDocument;
        if (doc) {
          doc.open();
          doc.write(generatePrintHtml());
          doc.close();
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 3000);
        } else {
          window.print();
        }
        return;
      }

      printWindow.document.write(generatePrintHtml());
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } catch {
      window.print();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div
        className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-emerald-700"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md">
              AIOU Mandatory Sheet Generator
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-200">
              Assignment Cover Page Maker
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Fill in your student credentials below to generate a formatted Allama Iqbal Open University assignment cover page. Print or download PDF instantly!
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0"
          >
            <Printer className="w-5 h-5 text-slate-950" />
            <span>Print Cover Page</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs Column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-serif border-b border-slate-100 pb-2">
            Enter Assignment & Student Details
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Student Name:</label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Roll Number:</label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => handleChange('rollNumber', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Registration No:</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleChange('registrationNumber', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Program Level:</label>
              <input
                type="text"
                value={formData.program}
                onChange={(e) => handleChange('program', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Code:</label>
                <input
                  type="text"
                  value={formData.courseCode}
                  onChange={(e) => handleChange('courseCode', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assignment No:</label>
                <select
                  value={formData.assignmentNumber}
                  onChange={(e) => handleChange('assignmentNumber', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Assignment 1">Assignment 1</option>
                  <option value="Assignment 2">Assignment 2</option>
                  <option value="Research Project / Thesis">Research Project / Thesis</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Course Title:</label>
              <input
                type="text"
                value={formData.courseTitle}
                onChange={(e) => handleChange('courseTitle', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Semester / Session:</label>
              <input
                type="text"
                value={formData.semester}
                onChange={(e) => handleChange('semester', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tutor Name:</label>
              <input
                type="text"
                value={formData.tutorName}
                onChange={(e) => handleChange('tutorName', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tutor Address / LMS:</label>
              <input
                type="text"
                value={formData.tutorAddress}
                onChange={(e) => handleChange('tutorAddress', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Submission Date:</label>
                <input
                  type="date"
                  value={formData.submissionDate}
                  onChange={(e) => handleChange('submissionDate', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number:</label>
                <input
                  type="text"
                  value={formData.studentPhone}
                  onChange={(e) => handleChange('studentPhone', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-2xs mt-2"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Generate & Print Declaration Sheet</span>
          </button>
        </div>

        {/* Live Sheet Preview Column */}
        <div className="lg:col-span-7 bg-slate-100 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-start overflow-x-auto">
          <div className="w-full max-w-[650px] bg-white border-4 border-double border-emerald-900 p-6 shadow-md rounded-xs font-serif text-slate-900 space-y-6">
            <div className="text-center border-b-2 border-emerald-900 pb-3 space-y-1">
              <h3 className="text-xl font-extrabold text-emerald-900 uppercase tracking-wide">
                Allama Iqbal Open University
              </h3>
              <h4 className="text-sm font-bold text-slate-800">
                Assignment Declaration & Submission Sheet
              </h4>
              <p className="text-[11px] text-slate-500 italic">
                Educare Help Desk • Helpline 03451291610
              </p>
            </div>

            <div className="text-center">
              <span className="bg-emerald-900 text-white font-extrabold text-sm px-6 py-1.5 rounded-sm uppercase tracking-wider">
                {formData.assignmentNumber || 'ASSIGNMENT 1'}
              </span>
            </div>

            <table className="w-full text-xs border-collapse border border-emerald-900">
              <tbody>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 w-2/5 border-r border-emerald-900">Student Name:</td>
                  <td className="p-2.5 font-bold text-slate-900">{formData.studentName || '—'}</td>
                </tr>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Roll Number:</td>
                  <td className="p-2.5 font-bold text-slate-900">{formData.rollNumber || '—'}</td>
                </tr>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Registration No:</td>
                  <td className="p-2.5 font-bold text-slate-900">{formData.registrationNumber || '—'}</td>
                </tr>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Academic Program:</td>
                  <td className="p-2.5 font-semibold text-slate-900">{formData.program || '—'}</td>
                </tr>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Course Code & Title:</td>
                  <td className="p-2.5 font-bold text-slate-900">Code {formData.courseCode}: {formData.courseTitle}</td>
                </tr>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Semester / Session:</td>
                  <td className="p-2.5 font-semibold text-slate-900">{formData.semester || '—'}</td>
                </tr>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Tutor Name:</td>
                  <td className="p-2.5 text-slate-900">{formData.tutorName || '—'}</td>
                </tr>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Tutor Address / LMS:</td>
                  <td className="p-2.5 text-slate-900">{formData.tutorAddress || '—'}</td>
                </tr>
                <tr className="border-b border-emerald-900">
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Submission Date:</td>
                  <td className="p-2.5 text-slate-900">{formData.submissionDate || '—'}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold bg-emerald-50 text-emerald-950 border-r border-emerald-900">Student Contact:</td>
                  <td className="p-2.5 text-slate-900">{formData.studentPhone || '—'}</td>
                </tr>
              </tbody>
            </table>

            <div className="pt-8 flex justify-between items-end text-xs text-slate-800">
              <div className="text-center">
                <div className="w-36 border-b border-slate-900 mb-1"></div>
                <span>Student Signature</span>
              </div>
              <div className="text-center">
                <div className="w-36 border-b border-slate-900 mb-1"></div>
                <span>Tutor Signature & Stamp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
