import React, { useState } from 'react';
import { ProgramLevel } from '../types';
import { AIOU_PROGRAMS, HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { Calculator, CheckCircle2, Phone, MessageCircle, FileCheck, Info, ShieldAlert } from 'lucide-react';

export const FeeCalculator: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel>('B.Ed');
  const [numberOfCourses, setNumberOfCourses] = useState<number>(4);
  const [isLateFee, setIsLateFee] = useState<boolean>(false);
  const [includeTechFee, setIncludeTechFee] = useState<boolean>(true);

  const currentProgram = AIOU_PROGRAMS.find(p => p.level === selectedLevel) || AIOU_PROGRAMS[0];

  // Fee calculation logic
  const baseSemesterFee = currentProgram.estimatedFeePerSemester;
  const courseBaseRate = Math.round(baseSemesterFee / 4);
  const courseTotal = courseBaseRate * numberOfCourses;
  const techFee = includeTechFee ? 1000 : 0;
  const lateFee = isLateFee ? 1500 : 0;
  const totalEstimatedFee = courseTotal + techFee + lateFee;

  const requiredDocsMap: Record<ProgramLevel, string[]> = {
    'Matric': [
      'Middle / 8th Class School Leaving Certificate or Result Card',
      'CNIC or B-Form copy of student',
      'Father / Guardian CNIC copy',
      '2 Passport size photographs with blue background',
      'Attested copies of domicile (if applicable)'
    ],
    'FA / Intermediate': [
      'Matriculation / SSC Certificate & Detailed Marks Sheet (DMC)',
      'CNIC / B-Form copy',
      'Father / Guardian CNIC copy',
      '2 Passport size photographs',
      'NOC / Migration certificate if board is outside Punjab/Federal'
    ],
    'BA / AD': [
      'Matric & Intermediate (FA/F.Sc/I.Com) certificates & DMCs',
      'CNIC copy',
      '2 Passport size photographs',
      'Equivalence certificate from IBCC (for O/A levels)'
    ],
    'BS (4-Year)': [
      'SSC & HSSC Result Cards / Certificates',
      'CNIC copy',
      'Character Certificate from previous college',
      '2 Passport size photographs'
    ],
    'B.Ed': [
      'All previous academic degrees (Matric, FA, BA/MA DMCs)',
      'CNIC copy',
      'Work experience certificate (if applying for B.Ed 1.5yr in relevant stream)',
      '2 Passport size photographs'
    ],
    'Master / PGD': [
      'Bachelor Degree / DMC (BA, BSc, B.Com)',
      'SSC & HSSC DMCs',
      'CNIC copy & 2 Photographs'
    ],
    'M.Phil / MS': [
      '16 Years Education Transcripts (BS 4-Year / MA / MSc)',
      'GAT General Result Card / AIOU Entry Test slip',
      'CNIC copy & 2 Photographs',
      'NOC from employer (if employed)'
    ],
    'Ph.D.': [
      'M.Phil / MS Degree Transcript (18 Years Education)',
      'GAT Subject / AIOU Departmental Test Card',
      'Research Proposal draft',
      'CNIC copy & 2 Photographs',
      'NOC from parent department'
    ]
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
              AIOU Semester Fee Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-200">
              Admission Fee Calculator & Requirements
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Calculate semester tuition fees, technological processing charges, late fee surcharges, and review required admission documents for your program level.
            </p>
          </div>

          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all shrink-0"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Confirm Fee: {HELPDESK_PHONE}</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 font-serif border-b border-slate-100 pb-2">
            Select Fee Calculation Parameters
          </h3>

          <div className="space-y-4 text-xs">
            {/* Level Select */}
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                1. Academic Level:
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as ProgramLevel)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-bold rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Matric">Matriculation (SSC)</option>
                <option value="FA / Intermediate">FA / F.Sc / I.Com (HSSC)</option>
                <option value="BA / AD">BA / Associate Degree (AD)</option>
                <option value="BS (4-Year)">BS 4-Year Program</option>
                <option value="B.Ed">B.Ed (Teacher Education)</option>
                <option value="Master / PGD">Master Degree / PGD</option>
                <option value="M.Phil / MS">M.Phil / MS Research</option>
                <option value="Ph.D.">Ph.D. Program</option>
              </select>
            </div>

            {/* Courses Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  2. Number of Courses Enrolled:
                </label>
                <span className="font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-sm">
                  {numberOfCourses} Courses
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                value={numberOfCourses}
                onChange={(e) => setNumberOfCourses(parseInt(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 mt-1">
                <span>2 Courses</span>
                <span>4 Courses (Standard)</span>
                <span>6 Courses</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={includeTechFee}
                  onChange={(e) => setIncludeTechFee(e.target.checked)}
                  className="w-4 h-4 text-emerald-800 accent-emerald-800 rounded"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Include Technology & LMS Charges (PKR 1,000)</span>
                  <span className="text-[10px] text-slate-500">AAGHI LMS / Digital Enrollment & Portal maintenance fee</span>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-amber-50/80 rounded-xl border border-amber-200">
                <input
                  type="checkbox"
                  checked={isLateFee}
                  onChange={(e) => setIsLateFee(e.target.checked)}
                  className="w-4 h-4 text-amber-600 accent-amber-600 rounded"
                />
                <div>
                  <span className="font-bold text-amber-950 block">Late Fee Surcharge (PKR 1,500)</span>
                  <span className="text-[10px] text-amber-800">Check if applying after first admission deadline</span>
                </div>
              </label>
            </div>
          </div>

          {/* Breakdown Box */}
          <div className="bg-emerald-900 text-white p-5 rounded-2xl space-y-3 shadow-md">
            <h4 className="text-xs font-extrabold uppercase text-amber-300 tracking-wider">
              Estimated Fee Breakdown ({selectedLevel})
            </h4>

            <div className="space-y-1.5 text-xs text-slate-200">
              <div className="flex justify-between">
                <span>Tuition Fee ({numberOfCourses} courses @ PKR {courseBaseRate.toLocaleString()}):</span>
                <span className="font-bold text-white">PKR {courseTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Technology / Portal Charges:</span>
                <span className="font-bold text-white">PKR {techFee.toLocaleString()}</span>
              </div>
              {isLateFee && (
                <div className="flex justify-between text-amber-300">
                  <span>Late Fee Surcharge:</span>
                  <span className="font-bold">PKR {lateFee.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-emerald-700/80 flex justify-between items-center text-sm sm:text-base font-extrabold text-amber-300">
              <span>Total Estimated Fee:</span>
              <span className="text-lg sm:text-xl font-serif">PKR {totalEstimatedFee.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Requirements & Action Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Required Docs Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-800" />
              <span>Required Documents for {selectedLevel} Admission</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-700">
              {(requiredDocsMap[selectedLevel] || []).map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Submission Note:</strong> All academic documents must be attested by a Grade 17+ government officer before submitting online at OAS AIOU Portal or mailing to regional office.
              </span>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
            <h4 className="text-sm font-bold font-serif text-amber-300">
              Need Help submitting AIOU Admission Form or Challan?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Educare Help Desk can assist you in generating fee challan, online form filling, and document verification.
            </p>
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold">
              <a
                href={`tel:${HELPDESK_PHONE}`}
                className="bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call {HELPDESK_PHONE}</span>
              </a>

              <a
                href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk, I need help for AIOU ${selectedLevel} admission and fee challan.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp 03451291610</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
