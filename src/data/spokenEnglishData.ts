export interface SpokenLesson {
  id: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  topic: string;
  urduSummary: string;
  objectives: string[];
  keyVocabulary: {
    wordOrPhrase: string;
    urduMeaning: string;
    pronunciation: string;
    exampleSentence: string;
  }[];
  dialogue: {
    scenario: string;
    speakerA: string;
    speakerB: string;
    turns: {
      speaker: string;
      line: string;
      urduTranslation: string;
    }[];
  };
  commonMistakes: {
    wrong: string;
    correct: string;
    reason: string;
  }[];
  nusratTip: string;
  speakingChallenge: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  category: 'Tenses' | 'Modal Verbs' | 'Sentence Structure' | 'Prepositions' | 'Articles' | 'Common Errors';
  importance: 'Essential' | 'High-Yield' | 'Advanced';
  urduExplanation: string;
  ruleFormula: string;
  coreExplanation: string;
  examples: {
    positive: string;
    negative: string;
    question: string;
    urduMeaning: string;
  }[];
  nusratNote: string;
  commonTrap: string;
}

export interface StudyNote {
  id: string;
  title: string;
  category: 'Daily Sentences' | 'Fluency Tricks' | 'Interview & Office' | 'Pronunciation' | 'Connectors';
  author: string;
  summary: string;
  items: {
    english: string;
    urdu: string;
    contextOrPronunciation?: string;
  }[];
  instructorNote: string;
}

export interface DialogueScenario {
  id: string;
  title: string;
  setting: string;
  level: 'Beginner' | 'Intermediate' | 'Professional';
  description: string;
  roles: { user: string; partner: string };
  exchanges: {
    partnerPrompt: string;
    partnerAudioText?: string;
    recommendedUserResponse: string;
    urduHint: string;
    alternativeOptions?: string[];
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  context: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  instructorComment: string;
}

export const INSTRUCTOR_PROFILE = {
  name: 'Instructor Nusrat Waqar',
  title: 'Senior English Language Coach & Communication Specialist',
  organization: 'Educare Help Desk',
  phone: '03451291610',
  whatsapp: '923451291610',
  experience: '12+ Years Experience in Distance Learning & Spoken Fluency',
  tagline: 'Learn to Speak English Naturally, Confidently & Without Fear',
  welcomeMessage:
    'Assalamu Alaikum and Welcome! Many students tell me, "Sir/Madam, I can understand English when reading, but I freeze when speaking!" My mission is to give you practical, everyday spoken English tools, clear grammar formulas without confusion, and daily speaking habits that guarantee real fluency.',
  goldenRules: [
    'Rule #1: Speak to communicate, not to impress. Simple, correct sentences are 100 times better than complex, broken ones.',
    'Rule #2: Stop translating from Urdu in your head. Start naming things and feeling thoughts directly in English.',
    'Rule #3: Mistakes are proof that you are practicing. Never let the fear of someone laughing stop your vocal cords.',
    'Rule #4: Spend 10 minutes speaking out loud every single day — describe your room, what you did today, or read our dialogue scripts aloud.',
    'Rule #5: Master the 3 core tenses first: Present Simple, Past Simple, and Future with Will. 80% of daily conversation happens here!'
  ]
};

export const SPOKEN_LESSONS: SpokenLesson[] = [
  {
    id: 'lesson-1',
    lessonNumber: 1,
    title: 'Everyday Greetings, First Impressions & Self Introductions',
    subtitle: 'Confident greetings for formal, casual, and academic meetings',
    level: 'Beginner',
    durationMinutes: 15,
    topic: 'Greetings & Introductions',
    urduSummary: 'روزمرہ کی بات چیت، سلام دعا اور اپنا پر اعتماد تعارف کروانے کے بہترین طریقے',
    objectives: [
      'Learn the difference between formal greetings and casual spoken greetings.',
      'Deliver a polished 30-second self-introduction without stuttering.',
      'Respond politely to "How are you doing?" and "What do you do?"'
    ],
    keyVocabulary: [
      {
        wordOrPhrase: 'Pleased to meet you',
        urduMeaning: 'آپ سے مل کر بہت خوشی ہوئی',
        pronunciation: 'pleezd too meet yoo',
        exampleSentence: 'Pleased to meet you, Professor. I am an AIOU BS English student.'
      },
      {
        wordOrPhrase: 'How have you been?',
        urduMeaning: 'آپ کے کیا حال چال رہے ہیں؟ (عرصے بعد ملنے پر)',
        pronunciation: 'how hav yoo been',
        exampleSentence: 'Long time no see! How have you been lately?'
      },
      {
        wordOrPhrase: 'I am currently pursuing...',
        urduMeaning: 'میں فی الوقت تعلیم حاصل کر رہا ہوں...',
        pronunciation: 'I am kur-unt-lee per-soo-ing',
        exampleSentence: 'I am currently pursuing my B.Ed degree from Allama Iqbal Open University.'
      },
      {
        wordOrPhrase: 'Could you please repeat that?',
        urduMeaning: 'کیا آپ برائے مہربانی دوبارہ دہرا سکتے ہیں؟',
        pronunciation: 'kood yoo pleez ri-peet that',
        exampleSentence: 'Pardon me, could you please repeat that more slowly?'
      }
    ],
    dialogue: {
      scenario: 'Meeting an Academic Advisor or Tutor for the first time',
      speakerA: 'Ahmad (Student)',
      speakerB: 'Ms. Nusrat (Instructor)',
      turns: [
        {
          speaker: 'Ahmad',
          line: 'Good morning, Ma’am! Excuse me, do you have a quick moment?',
          urduTranslation: 'صبح بخیر میڈم! معاف کیجیے گا، کیا آپ کے پاس ایک مختصر لمحہ ہے؟'
        },
        {
          speaker: 'Ms. Nusrat',
          line: 'Good morning! Yes, of course. Please have a seat. How may I help you today?',
          urduTranslation: 'صبح بخیر! جی بالکل، تشریف رکھیے۔ میں آج آپ کی کس طرح مدد کر سکتی ہوں؟'
        },
        {
          speaker: 'Ahmad',
          line: 'Thank you. My name is Ahmad, and I am a new student in the B.Ed program. I had a query regarding assignment dispatch.',
          urduTranslation: 'شکریہ۔ میرا نام احمد ہے اور میں بی ایڈ پروگرام کا نیا طالبعلم ہوں۔ مجھے اسائنمنٹ بھیجنے سے متعلق ایک سوال پوچھنا تھا۔'
        },
        {
          speaker: 'Ms. Nusrat',
          line: 'Welcome Ahmad! It is great to meet you. You have reached the right place; let us look at your course codes together.',
          urduTranslation: 'خوش آمدید احمد! آپ سے مل کر اچھا لگا۔ آپ بالکل درست جگہ آئے ہیں؛ آئیے مل کر آپ کے کورس کوڈز دیکھ لیتے ہیں۔'
        }
      ]
    },
    commonMistakes: [
      {
        wrong: 'Myself Ahmad.',
        correct: 'My name is Ahmad. / I am Ahmad.',
        reason: 'Never start an introduction with "Myself". In English, myself is a reflexive pronoun and cannot stand as a subject.'
      },
      {
        wrong: 'I am fine and you?',
        correct: 'I’m doing very well, thank you! How about you?',
        reason: '"I am fine and you" sounds flat and monotonous. Adding "I’m doing well, how about you?" sounds energetic and natural.'
      },
      {
        wrong: 'Give me your pen.',
        correct: 'Could I borrow your pen for a second, please?',
        reason: 'In spoken English, direct commands can sound rude. Always soften requests with "Could I..." or "Would you mind...".'
      }
    ],
    nusratTip:
      'Keep your shoulders relaxed, make soft eye contact, and smile before speaking. A warm smile instantly makes your English sound friendlier and more confident!',
    speakingChallenge:
      'Stand before your mirror and record a 30-second voice note introducing: Your name, where you live, what degree you are pursuing, and one hobby you enjoy.'
  },
  {
    id: 'lesson-2',
    lessonNumber: 2,
    title: 'Daily Conversational English & Campus Life',
    subtitle: 'Navigating university desks, fees, library, and public places',
    level: 'Beginner',
    durationMinutes: 20,
    topic: 'Campus & Social Scenarios',
    urduSummary: 'یونیورسٹی کیمپس، فیس کاؤنٹر، لائبریری اور روزمرہ مقامات پر اعتماد سے گفتگو',
    objectives: [
      'Ask for directions and office timings politely.',
      'Inquire about fee submission and deadline extensions.',
      'Use natural conversational connectors like "By the way", "Actually", and "Excuse me".'
    ],
    keyVocabulary: [
      {
        wordOrPhrase: 'Due date / Deadline',
        urduMeaning: 'آخری تاریخ',
        pronunciation: 'doo dayt / ded-line',
        exampleSentence: 'What is the last due date to submit the exam admission form?'
      },
      {
        wordOrPhrase: 'Challan form',
        urduMeaning: 'بینک فیس واؤچر / چالان فارم',
        pronunciation: 'shuh-lahn form',
        exampleSentence: 'Can I pay this fee challan online through my mobile banking app?'
      },
      {
        wordOrPhrase: 'I would appreciate it if...',
        urduMeaning: 'میں آپ کا شکر گزار ہوں گا اگر...',
        pronunciation: 'I wood uh-pree-shee-ayt it if',
        exampleSentence: 'I would appreciate it if you could guide me to the regional office coordinator.'
      },
      {
        wordOrPhrase: 'In terms of...',
        urduMeaning: 'کے حوالے سے / کے سلسلے میں',
        pronunciation: 'in terms ov',
        exampleSentence: 'In terms of marks, how much weightage does the second assignment carry?'
      }
    ],
    dialogue: {
      scenario: 'Inquiring at the University Student Support Window',
      speakerA: 'Student',
      speakerB: 'Counter Officer',
      turns: [
        {
          speaker: 'Student',
          line: 'Excuse me, Sir. Could you kindly inform me where I can verify my fee challan?',
          urduTranslation: 'معاف کیجیے گا جناب۔ کیا آپ برائے مہربانی مجھے بتا سکتے ہیں کہ میں اپنا فیس چالان کہاں سے تصدیق کروا سکتا ہوں؟'
        },
        {
          speaker: 'Counter Officer',
          line: 'Sure thing! You need to head to Window Number 4 on the first floor.',
          urduTranslation: 'ضرور! آپ کو پہلی منزل پر کھڑکی نمبر 4 پر جانا ہوگا۔'
        },
        {
          speaker: 'Student',
          line: 'Thank you so much! Is the counter open during lunch hours as well?',
          urduTranslation: 'بہت بہت شکریہ! کیا یہ کاؤنٹر دوپہر کے کھانے کے وقفے کے دوران بھی کھلا ہوتا ہے؟'
        },
        {
          speaker: 'Counter Officer',
          line: 'No, there is a break from 1:00 PM to 2:00 PM. Please make sure to visit before one.',
          urduTranslation: 'نہیں، دوپہر 1 سے 2 بجے تک وقفہ ہوتا ہے۔ براہ کرم ایک بجے سے پہلے تشریف لے جائیں۔'
        }
      ]
    },
    commonMistakes: [
      {
        wrong: 'What is your good name?',
        correct: 'May I know your name, please? / Could I ask your name?',
        reason: '"What is your good name?" is a direct literal translation from Urdu "Aap ka shubh/acha naam". Native English speakers simply ask "May I have your name?".'
      },
      {
        wrong: 'I am having a doubt.',
        correct: 'I have a question. / I’m not quite clear on this point.',
        reason: 'In standard English, "doubt" implies mistrust or suspicion. Use "I have a question" or "I need clarification".'
      }
    ],
    nusratTip:
      'Never hesitate to ask someone to slow down. Simply say: "Would you mind speaking a bit slower, please?" Native and fluent speakers will respect your politeness.',
    speakingChallenge:
      'Practice asking for 3 different locations on your campus or in your city using "Excuse me, could you tell me how to get to..."'
  },
  {
    id: 'lesson-3',
    lessonNumber: 3,
    title: 'Professional Phone Calls & WhatsApp Voice Notes',
    subtitle: 'Handling official calls, inquiries, follow-ups, and voice messages',
    level: 'Intermediate',
    durationMinutes: 18,
    topic: 'Telephone English',
    urduSummary: 'فون کالز، ہیلپ لائن انکوائری اور دفتری پیغامات میں پروفیشنل لہجہ اور الفاظ',
    objectives: [
      'Initiate and conclude a formal phone conversation with poise.',
      'Leave clear, structured voice messages and follow-up requests.',
      'Handle bad connections and misunderstandings professionally.'
    ],
    keyVocabulary: [
      {
        wordOrPhrase: 'May I speak with...',
        urduMeaning: 'کیا میری بات ہو سکتی ہے...',
        pronunciation: 'may I speek with',
        exampleSentence: 'Hello, may I speak with the Educare assignment coordinator, please?'
      },
      {
        wordOrPhrase: 'Hold on a second, please',
        urduMeaning: 'براہ کرم ایک لمحہ ہولڈ کیجیے / انتظار فرمائیے',
        pronunciation: 'hold on uh sek-und pleez',
        exampleSentence: 'Please hold on for a moment while I pull up your student portal file.'
      },
      {
        wordOrPhrase: 'Your voice is breaking up',
        urduMeaning: 'آپ کی آواز کٹ رہی ہے',
        pronunciation: 'yor voys iz bray-king up',
        exampleSentence: 'I apologize, your voice is breaking up. Could you say that once more?'
      },
      {
        wordOrPhrase: 'I am calling regarding...',
        urduMeaning: 'میں اس سلسلے میں کال کر رہا ہوں...',
        pronunciation: 'I am kaw-ling ri-gard-ing',
        exampleSentence: 'I am calling regarding the Autumn 2026 workshop schedule.'
      }
    ],
    dialogue: {
      scenario: 'Calling the Educare Help Desk (03451291610)',
      speakerA: 'Student',
      speakerB: 'Educare Representative',
      turns: [
        {
          speaker: 'Student',
          line: 'Hello, good afternoon! Am I speaking with the Educare Student Support Desk?',
          urduTranslation: 'ہیلو، سہ پہر بخیر! کیا میری ایجوکئیر سٹوڈنٹ سپورٹ ڈیسک سے بات ہو رہی ہے؟'
        },
        {
          speaker: 'Educare Representative',
          line: 'Good afternoon! Yes, you have reached the Educare Help Desk. How can we assist you today?',
          urduTranslation: 'سہ پہر بخیر! جی ہاں، آپ نے ایجوکئیر ہیلپ ڈیسک پر کال کی ہے۔ ہم آج آپ کی کیا مدد کر سکتے ہیں؟'
        },
        {
          speaker: 'Student',
          line: 'I am an AIOU student. I need guidance regarding downloading solved assignments and the typing test portal.',
          urduTranslation: 'میں علامہ اقبال اوپن یونیورسٹی کا طالب علم ہوں۔ مجھے حل شدہ اسائنمنٹس ڈاؤنلوڈ کرنے اور ٹائپنگ ٹیسٹ پورٹل کے بارے میں رہنمائی درکار ہے۔'
        },
        {
          speaker: 'Educare Representative',
          line: 'Certainly! Both are available directly on our portal, and we can also send you direct links on WhatsApp at this number.',
          urduTranslation: 'یقیناً! دونوں سہولیات ہمارے پورٹل پر دستیاب ہیں، اور ہم آپ کو اسی نمبر پر واٹس ایپ پر براہ راست لنکس بھی فراہم کر سکتے ہیں۔'
        }
      ]
    },
    commonMistakes: [
      {
        wrong: 'Who is this?',
        correct: 'May I know who is calling, please? / Who am I speaking with?',
        reason: '"Who is this?" sounds aggressive and informal over the phone. Always use "May I know who is speaking?".'
      },
      {
        wrong: 'I am cutting the call.',
        correct: 'I will hang up now. / I need to let you go now.',
        reason: '"Cutting the call" is an Indian/Pakistani colloquialism. In international English, we say "hang up" or "disconnect".'
      }
    ],
    nusratTip:
      'Because the other person cannot see your face on the phone, your voice inflection and tone must carry all your warmth. Speak 10% slower than you usually do.',
    speakingChallenge:
      'Record a 45-second voice note pretending to leave a professional message for a tutor explaining that you were unwell and need an assignment extension.'
  },
  {
    id: 'lesson-4',
    lessonNumber: 4,
    title: 'Job & University Interview Mastery',
    subtitle: 'Cracking "Tell me about yourself" and answering with high impact',
    level: 'Intermediate',
    durationMinutes: 25,
    topic: 'Interviews & Career',
    urduSummary: 'جاب اور یونیورسٹی انٹرویو میں اپنے بارے میں بتانا اور مشکل سوالات کا پراعتماد جواب',
    objectives: [
      'Master the 3-part formula for "Tell me about yourself": Present, Past, Future.',
      'Highlight strengths without sounding boastful.',
      'Answer behavioral questions like "Why should we hire you / select you?"'
    ],
    keyVocabulary: [
      {
        wordOrPhrase: 'I specialize in...',
        urduMeaning: 'میری خاص مہارت اس شعبے میں ہے...',
        pronunciation: 'I spesh-uh-lyz in',
        exampleSentence: 'I specialize in distance curriculum study and administrative computer typing.'
      },
      {
        wordOrPhrase: 'A proactive approach',
        urduMeaning: 'پہل کرنے والا اور متحرک انداز',
        pronunciation: 'uh proh-ak-tiv uh-prohch',
        exampleSentence: 'I take a proactive approach to solving academic and operational problems.'
      },
      {
        wordOrPhrase: 'Strengths and areas of improvement',
        urduMeaning: 'خوبیاں اور وہ پہلو جن میں بہتری لائی جا رہی ہے',
        pronunciation: 'strengkths and ay-ree-uhz ov im-proov-munt',
        exampleSentence: 'One of my key strengths is dedication, while I am actively working on public speaking.'
      }
    ],
    dialogue: {
      scenario: 'Opening Question of an Academic / Job Interview',
      speakerA: 'Interviewer',
      speakerB: 'Candidate',
      turns: [
        {
          speaker: 'Interviewer',
          line: 'Welcome! Let us begin. Could you walk us through your background and experience?',
          urduTranslation: 'خوش آمدید! آئیے آغاز کرتے ہیں۔ کیا آپ ہمیں اپنے تعلیمی پس منظر اور تجربے کے بارے میں بتا سکتے ہیں؟'
        },
        {
          speaker: 'Candidate',
          line: 'Thank you for this opportunity. I have completed my Bachelor’s degree from AIOU with a focus on education and management. Over the past two years, I have strengthened my communication and computer typing skills to over 40 words per minute. I am eager to apply my strong work ethic in this role.',
          urduTranslation: 'اس موقع کا شکریہ۔ میں نے اے آئی او یو سے تعلیم اور انتظامیہ میں بیچلر مکمل کیا ہے۔ گزشتہ دو سالوں میں میں نے اپنی بول چال اور کمپیوٹر ٹائپنگ رفتار 40 الفاظ فی منٹ سے زیادہ کر لی ہے۔ میں اپنے محنتی جذبے کو اس کردار میں بروئے کار لانے کے لیے پرجوش ہوں۔'
        },
        {
          speaker: 'Interviewer',
          line: 'Impressive! What makes you distinct from other candidates applying for this post?',
          urduTranslation: 'بہت خوب! دیگر امیدواروں کے مقابلے میں وہ کون سی بات ہے جو آپ کو ممتاز بناتی ہے؟'
        },
        {
          speaker: 'Candidate',
          line: 'I believe my resilience as a distance learner has taught me independent problem-solving and strict deadline management.',
          urduTranslation: 'میرا ماننا ہے کہ ڈسٹنس لرنر کے طور پر میری محنت نے مجھے خود مختارانہ مسائل حل کرنا اور ڈیڈ لائنز کی پابندی سکھائی ہے۔'
        }
      ]
    },
    commonMistakes: [
      {
        wrong: 'Sir, I belong to a poor family and I need this job very much.',
        correct: 'I am passionate about this role and confident that my skills align with your department’s needs.',
        reason: 'Interviews evaluate capability and merit, not pity. Always highlight what value you bring to the organization.'
      },
      {
        wrong: 'I have no weakness.',
        correct: 'Sometimes I focus too much on details, but I have learned to prioritize tasks with daily checklists.',
        reason: 'Saying you have no weakness sounds arrogant. Share an authentic growth area and what you are doing to improve it.'
      }
    ],
    nusratTip:
      'Use the STAR Method for interview stories: Situation, Task, Action, Result. It keeps your answers crisp, structured, and under 90 seconds.',
    speakingChallenge:
      'Prepare and speak your own 60-second "Tell me about yourself" answer out loud without looking at notes.'
  },
  {
    id: 'lesson-5',
    lessonNumber: 5,
    title: 'Expressing Opinions, Agreement, Disagreement & Polite Interruptions',
    subtitle: 'Join group discussions and seminars without sounding aggressive',
    level: 'Intermediate',
    durationMinutes: 20,
    topic: 'Discussions & Debates',
    urduSummary: 'گروپ ڈسکشن، مباحثے اور میٹنگز میں شائستگی سے اپنی رائے دینا اور اختلاف کرنا',
    objectives: [
      'Express strong and soft opinions appropriately.',
      'Disagree politely using "I see your point, however...".',
      'Interrupt respectfully in university workshops or team discussions.'
    ],
    keyVocabulary: [
      {
        wordOrPhrase: 'In my perspective...',
        urduMeaning: 'میرے نقطہ نظر کے مطابق...',
        pronunciation: 'in my per-spek-tiv',
        exampleSentence: 'In my perspective, online workshops offer tremendous flexibility for working students.'
      },
      {
        wordOrPhrase: 'I respectfully disagree',
        urduMeaning: 'میں پورے احترام کے ساتھ اختلاف کرتا ہوں',
        pronunciation: 'I ri-spekt-fuh-lee dis-uh-gree',
        exampleSentence: 'I respectfully disagree with that point because the data shows otherwise.'
      },
      {
        wordOrPhrase: 'May I jump in here?',
        urduMeaning: 'کیا میں یہاں ایک بات شامل کر سکتا ہوں؟ (شائستہ مداخلت)',
        pronunciation: 'may I jump in heer',
        exampleSentence: 'Sorry to interrupt, but may I jump in here with a quick suggestion?'
      }
    ],
    dialogue: {
      scenario: 'AIOU Online Workshop / Student Seminar Debate',
      speakerA: 'Student 1 (Tariq)',
      speakerB: 'Student 2 (Zainab)',
      turns: [
        {
          speaker: 'Tariq',
          line: 'I firmly believe that traditional exams are outdated and should be completely replaced by open-book assignments.',
          urduTranslation: 'میرا پختہ یقین ہے کہ روایتی امتحانات پرانے ہو چکے ہیں اور ان کی جگہ مکمل طور پر اوپن بک اسائنمنٹس لانی چاہئیں۔'
        },
        {
          speaker: 'Zainab',
          line: 'I see where you are coming from, Tariq. However, don’t you think in-person exams ensure individual academic honesty?',
          urduTranslation: 'طارق، میں آپ کا نکتہ سمجھتی ہوں۔ تاہم، کیا آپ کا یہ خیال نہیں کہ امتحانی ہال کے امتحانات ذاتی دیانتداری کو یقینی بناتے ہیں؟'
        },
        {
          speaker: 'Tariq',
          line: 'That is a fair point, Zainab. Perhaps a blended model with 50% practical assessment is the best middle ground.',
          urduTranslation: 'یہ ایک مناسب بات ہے، زینب۔ شاید 50 فیصد عملی جائزہ والا ملا جلا نظام ہی بہترین درمیانی راستہ ہے۔'
        }
      ]
    },
    commonMistakes: [
      {
        wrong: 'You are wrong!',
        correct: 'I see it a bit differently. / I’m afraid I have a different perspective on this.',
        reason: '"You are wrong!" immediately provokes defensiveness and shuts down constructive dialogue.'
      },
      {
        wrong: 'According to me...',
        correct: 'In my opinion... / From my point of view...',
        reason: '"According to" is used for other sources (e.g., "According to the HEC report"). When stating your own view, say "In my opinion".'
      }
    ],
    nusratTip:
      'Always acknowledge the other speaker’s point before offering your counterpoint ("I hear what you are saying, but..."). This demonstrates emotional intelligence and high-level fluency.',
    speakingChallenge:
      'Pick a topic like "Should artificial intelligence be allowed in student homework?" and record 1 minute expressing both pros and cons politely.'
  },
  {
    id: 'lesson-6',
    lessonNumber: 6,
    title: 'Idioms, Phrasal Verbs & Native-Like Conversational Phrases',
    subtitle: 'Sound natural and fluent instead of like a textbook robot',
    level: 'Advanced',
    durationMinutes: 22,
    topic: 'Idioms & Fluency',
    urduSummary: 'روزمرہ بول چال میں محاورات اور نیچرل فقروں کا درست استعمال تاکہ آپ کی انگریزی فطری لگے',
    objectives: [
      'Learn 10 high-frequency idioms used in modern professional English.',
      'Understand how phrasal verbs change meaning with prepositions.',
      'Replace stiff textbook phrases with smooth, native expressions.'
    ],
    keyVocabulary: [
      {
        wordOrPhrase: 'Hit the books',
        urduMeaning: 'خوب دل لگا کر پڑھائی شروع کرنا',
        pronunciation: 'hit thuh books',
        exampleSentence: 'The final exams are next week, so it is time to hit the books!'
      },
      {
        wordOrPhrase: 'Call it a day',
        urduMeaning: 'آج کا کام ختم کرنا / چھٹی کرنا',
        pronunciation: 'kawl it uh day',
        exampleSentence: 'We have studied four chapters today; let’s call it a day.'
      },
      {
        wordOrPhrase: 'Burn the midnight oil',
        urduMeaning: 'رات دیر تک جاگ کر سخت محنت کرنا',
        pronunciation: 'burn thuh mid-nite oyl',
        exampleSentence: 'Many distance learners burn the midnight oil balancing jobs and university degrees.'
      },
      {
        wordOrPhrase: 'Figure out',
        urduMeaning: 'سمجھ لینا / حل تلاش کر لینا',
        pronunciation: 'fig-yer owt',
        exampleSentence: 'Don’t worry, we will figure out the CMS portal login issue soon.'
      }
    ],
    dialogue: {
      scenario: 'Two university friends discussing exam preparation',
      speakerA: 'Hamza',
      speakerB: 'Bilal',
      turns: [
        {
          speaker: 'Hamza',
          line: 'Hey Bilal, are you ready for tomorrow’s English linguistics presentation?',
          urduTranslation: 'ارے بلال، کیا تم کل کی انگلش لسانیات کی پریزنٹیشن کے لیے تیار ہو؟'
        },
        {
          speaker: 'Bilal',
          line: 'To be honest, I was feeling under the weather yesterday, so I am a bit behind schedule.',
          urduTranslation: 'سچ کہوں تو کل میری طبیعت کچھ ناساز تھی، اس لیے میں شیڈول سے تھوڑا پیچھے ہوں۔'
        },
        {
          speaker: 'Hamza',
          line: 'No worries at all! Let’s put our heads together this afternoon and polish your slides.',
          urduTranslation: 'کوئی پریشانی کی بات نہیں! آئیے آج سہ پہر مل بیٹھتے ہیں اور تمہاری سلائیڈز کو بہتر بناتے ہیں۔'
        },
        {
          speaker: 'Bilal',
          line: 'That would be a lifesaver, Hamza. I really owe you one!',
          urduTranslation: 'یہ میرے لیے بہت بڑا احسان ہوگا، حمزہ۔ میں واقعی تمہارا شکر گزار رہوں گا!'
        }
      ]
    },
    commonMistakes: [
      {
        wrong: 'He did suicide.',
        correct: 'He committed suicide. / He took his own life.',
        reason: 'In English, certain nouns pair with specific collocations. We say "commit suicide" or "commit a crime", never "did".'
      },
      {
        wrong: 'I will take tea.',
        correct: 'I will have some tea. / Would you like a cup of tea?',
        reason: 'We "have" tea, coffee, or breakfast in natural English, rather than literally "taking" it.'
      }
    ],
    nusratTip:
      'Do not overuse idioms all at once. Sprinkle one or two natural expressions into a 5-minute conversation — that is the hallmark of sophisticated fluency.',
    speakingChallenge:
      'Use "Call it a day", "Figure out", and "Put our heads together" in three sentences of your own.'
  },
  {
    id: 'lesson-7',
    lessonNumber: 7,
    title: 'Overcoming Hesitation & Thinking in English',
    subtitle: 'Rewire your brain to eliminate mental translation from Urdu',
    level: 'Beginner',
    durationMinutes: 15,
    topic: 'Mindset & Fluency Drills',
    urduSummary: 'ذہن میں اردو سے ترجمہ کرنے کی عادت ختم کرنا اور بغیر جھجھک کے رواں بولنا',
    objectives: [
      'Stop the mental pause caused by translating Urdu sentences in your head.',
      'Practice the "Object Naming & Action Commentary" drill.',
      'Develop conversational endurance and voice projection.'
    ],
    keyVocabulary: [
      {
        wordOrPhrase: 'Hesitation',
        urduMeaning: 'ہچکچاہٹ / جھجھک',
        pronunciation: 'hez-i-tay-shun',
        exampleSentence: 'With consistent daily practice, your hesitation will naturally fade away.'
      },
      {
        wordOrPhrase: 'Vocal projection',
        urduMeaning: 'آواز کو صاف اور واضح انداز میں دوسروں تک پہنچانا',
        pronunciation: 'voh-kul proh-jek-shun',
        exampleSentence: 'Good vocal projection makes you sound authoritative and trustworthy.'
      },
      {
        wordOrPhrase: 'Fluency over accuracy',
        urduMeaning: 'روانی کو بے عیب بولنے پر ترجیح دینا (ابتدائی مراحل میں)',
        pronunciation: 'floo-en-see oh-ver ak-yer-uh-see',
        exampleSentence: 'In the beginning, focus on fluency over accuracy so your speech flows freely.'
      }
    ],
    dialogue: {
      scenario: 'Instructor Nusrat coaching a shy student',
      speakerA: 'Student (Sana)',
      speakerB: 'Instructor Nusrat',
      turns: [
        {
          speaker: 'Sana',
          line: 'Ma’am, whenever I try to speak in public, my mind goes completely blank!',
          urduTranslation: 'میڈم، جب بھی میں لوگوں کے سامنے بولنے کی کوشش کرتی ہوں، میرا ذہن بالکل خالی ہو جاتا ہے!'
        },
        {
          speaker: 'Instructor Nusrat',
          line: 'That happens to 90% of learners, Sana. Do you know why? Because you are trying to construct a perfect Urdu sentence and then translate every single word into English.',
          urduTranslation: 'یہ 90 فیصد طلبہ کے ساتھ ہوتا ہے ثناء۔ کیا آپ جانتی ہیں کیوں؟ کیونکہ آپ ذہن میں ایک مکمل اردو جملہ بناتی ہیں اور پھر ایک ایک لفظ کا انگریزی ترجمہ کرنے کی کوشش کرتی ہیں۔'
        },
        {
          speaker: 'Sana',
          line: 'Yes! That is exactly what happens. How can I stop doing that?',
          urduTranslation: 'جی ہاں! بالکل یہی ہوتا ہے۔ میں اس عادت کو کیسے ختم کر سکتی ہوں؟'
        },
        {
          speaker: 'Instructor Nusrat',
          line: 'Start with 2-word and 3-word thoughts: "I am ready." "The weather is cool." "Let us begin." Gradually string them together. Speed will follow simplicity.',
          urduTranslation: 'دو اور تین الفاظ کے خیالات سے آغاز کریں: "میں تیار ہوں۔" "موسم ٹھنڈا ہے۔" "آئیے شروع کریں۔" رفتہ رفتہ انہیں جوڑتی جائیں۔ سادگی کے بعد روانی خود بخود آئے گی۔'
        }
      ]
    },
    commonMistakes: [
      {
        wrong: 'Repeating "Ummm... ahhh..." after every word.',
        correct: 'Take a silent breath or use natural fillers like "Well...", "Let me see...", "You see...".',
        reason: 'Silent pauses convey confidence and thoughtfulness. Constant filler noises convey panic.'
      }
    ],
    nusratTip:
      'The "Sportscaster Drill": When walking alone or making a cup of tea, narrate what you are doing in English out loud: "Now I am pouring water. The water is boiling. I am picking up the mug." This trains your brain to connect sight with English words without Urdu intermediate steps.',
    speakingChallenge:
      'Do the Sportscaster Drill for 2 minutes right now in your room. Describe 5 things you can see and 3 things you plan to do today.'
  },
  {
    id: 'lesson-8',
    lessonNumber: 8,
    title: 'Presentation Skills & AIOU Seminar / Defense Prep',
    subtitle: 'Deliver engaging academic presentations and handle Q&A gracefully',
    level: 'Advanced',
    durationMinutes: 25,
    topic: 'Academic Presentations',
    urduSummary: 'سیمینار، ورکشاپ پریزنٹیشن اور تھیسز ڈیفنس کے لیے شاندار انگلش باڈی لینگویج اور فقرے',
    objectives: [
      'Structure a formal presentation: Hook, Agenda, Body, Conclusion.',
      'Use transition signposts: "Moving on to...", "Let us turn our attention to...".',
      'Defend a thesis point or answer an unexpected question with confidence.'
    ],
    keyVocabulary: [
      {
        wordOrPhrase: 'To kick things off...',
        urduMeaning: 'گفتگو یا پریزنٹیشن کا آغاز کرنے کے لیے...',
        pronunciation: 'too kik things off',
        exampleSentence: 'To kick things off, let us examine the core objectives of this study.'
      },
      {
        wordOrPhrase: 'Turning our attention to...',
        urduMeaning: 'اب ذرا اس اہم نکتے پر غور کرتے ہیں...',
        pronunciation: 'turn-ing owr uh-ten-shun too',
        exampleSentence: 'Turning our attention to the second slide, we observe a steady increase in enrollments.'
      },
      {
        wordOrPhrase: 'To sum up...',
        urduMeaning: 'خلاصہ کلام کے طور پر / بات کو سمیٹتے ہوئے...',
        pronunciation: 'too sum up',
        exampleSentence: 'To sum up, active learning produces far better student outcomes than passive memorization.'
      },
      {
        wordOrPhrase: 'That is a compelling question',
        urduMeaning: 'یہ بہت ہی عمدہ اور سوچ بچار والا سوال ہے',
        pronunciation: 'that iz uh kum-pel-ing kwes-chun',
        exampleSentence: 'That is a compelling question, Professor; allow me to share our field data.'
      }
    ],
    dialogue: {
      scenario: 'Delivering the introduction of an M.Phil / Master’s seminar',
      speakerA: 'Presenter (Kamran)',
      speakerB: 'Audience / Evaluator',
      turns: [
        {
          speaker: 'Kamran',
          line: 'Distinguished faculty members and fellow researchers, a very good afternoon to you all. My topic today is "Distance Education Strategies in 21st Century Pakistan".',
          urduTranslation: 'معزز اساتذہ کرام اور ساتھی محققین، آپ سب کو دوپہر بخیر۔ آج میری گفتگو کا موضوع "اکیسویں صدی کے پاکستان میں فاصلاتی نظامِ تعلیم کی حکمت عملیاں" ہے۔'
        },
        {
          speaker: 'Kamran',
          line: 'I have divided today’s presentation into three core segments: First, the historical evolution; second, the digital hurdles; and finally, our proposed policy solutions.',
          urduTranslation: 'میں نے آج کی پریزنٹیشن کو تین بنیادی حصوں میں تقسیم کیا ہے: پہلا، تاریخی ارتقاء؛ دوسرا، ڈیجیٹل رکاوٹیں؛ اور آخر میں، ہماری مجوزہ پالیسی کے حل۔'
        },
        {
          speaker: 'Evaluator',
          line: 'Kamran, before you proceed, how does your sample size address remote rural students in Southern Punjab?',
          urduTranslation: 'کامران، آگے بڑھنے سے پہلے، آپ کے نمونے کے حجم نے جنوبی پنجاب کے دور دراز دیہی طلبہ کی نمائندگی کیسے کی؟'
        },
        {
          speaker: 'Kamran',
          line: 'Thank you for raising that crucial point, Sir. Over 40 percent of our survey respondents were directly recruited from rural learning centers.',
          urduTranslation: 'اس اہم نکتے کی نشاندہی کا شکریہ جناب۔ ہمارے سروے کے 40 فیصد سے زائد جواب دہندگان کا انتخاب براہ راست دیہی تعلیمی مراکز سے کیا گیا تھا۔'
        }
      ]
    },
    commonMistakes: [
      {
        wrong: 'Reading every single line directly from PowerPoint slides with head down.',
        correct: 'Keep slides minimal (bullet points only) and look up at your audience.',
        reason: 'Slides are visual anchors for the audience, not your teleprompter. Speak to human eyes.'
      }
    ],
    nusratTip:
      'Whenever an evaluator asks a challenging question, do not rush to speak in the first second. Take a calm breath, say: "Thank you for that insightful question," and organize your points. This 2-second pause makes you look composed and scholarly.',
    speakingChallenge:
      'Prepare a 2-minute oral presentation introducing any course of your AIOU program with: Greeting, Agenda, 2 Main Points, and Conclusion.'
  }
];

export const INSTRUCTOR_STUDY_NOTES: StudyNote[] = [
  {
    id: 'note-1',
    title: '100 Daily Essential Spoken Sentences with Urdu Meanings',
    category: 'Daily Sentences',
    author: 'Instructor Nusrat Waqar',
    summary: 'High-frequency conversational sentences used in homes, offices, transport, and universities.',
    instructorNote:
      'Memorize 5 sentences every morning. Say them out loud three times each before noon.',
    items: [
      { english: 'Could you please do me a favor?', urdu: 'کیا آپ برائے مہربانی میری ایک مدد کر سکتے ہیں؟', contextOrPronunciation: 'Polite request' },
      { english: 'I didn’t catch what you said.', urdu: 'میں سمجھ نہیں پایا کہ آپ نے کیا کہا۔', contextOrPronunciation: 'When someone speaks too fast' },
      { english: 'Let’s get straight to the point.', urdu: 'آئیے اصل بات کی طرف آتے ہیں۔', contextOrPronunciation: 'Professional meetings' },
      { english: 'Don’t take it to heart.', urdu: 'اس بات کو دل پر مت لیں۔', contextOrPronunciation: 'Consoling a friend' },
      { english: 'It slipped my mind completely.', urdu: 'یہ بات میرے ذہن سے بالکل نکل گئی تھی۔', contextOrPronunciation: 'Apologizing for forgetting' },
      { english: 'Where can I get this document attested?', urdu: 'میں یہ دستاویز کہاں سے تصدیق کروا سکتا ہوں؟', contextOrPronunciation: 'University / Govt office' },
      { english: 'I will be there in the blink of an eye.', urdu: 'میں پلک جھپکتے ہی وہاں پہنچ جاؤں گا۔', contextOrPronunciation: 'Assuring quick arrival' },
      { english: 'Let me sleep on it and decide tomorrow.', urdu: 'مجھے اس پر سوچنے کا موقع دیں، کل فیصلہ کروں گا۔', contextOrPronunciation: 'Big decisions' },
      { english: 'It’s not worth worrying about.', urdu: 'یہ ایسی بات نہیں جس پر پریشان ہوا جائے۔', contextOrPronunciation: 'Encouragement' },
      { english: 'Could you speak up a bit? I can barely hear you.', urdu: 'کیا آپ ذرا اونچا بول سکتے ہیں؟ مجھے بمشکل سنائی دے رہا ہے۔', contextOrPronunciation: 'Telephone / noisy room' },
      { english: 'Keep up the good work!', urdu: 'شاباش، یہ اچھا کام جاری رکھیں!', contextOrPronunciation: 'Praising someone' },
      { english: 'I have mixed feelings about this semester.', urdu: 'اس سمسٹر کے بارے میں میرے ملے جلے خیالات ہیں۔', contextOrPronunciation: 'Uncertainty' },
      { english: 'Pardon the interruption, but the bus is leaving.', urdu: 'مداخلت کی معافی، لیکن بس روانہ ہو رہی ہے۔', contextOrPronunciation: 'Urgent reminder' },
      { english: 'I am snowed under with assignments this week.', urdu: 'اس ہفتے مجھ پر اسائنمنٹس کا بہت زیادہ بوجھ ہے۔', contextOrPronunciation: 'Busy schedule' },
      { english: 'Better late than never.', urdu: 'دیر آید درست آید (نہ ہونے سے تاخیر بہتر ہے)۔', contextOrPronunciation: 'Proverb' }
    ]
  },
  {
    id: 'note-2',
    title: 'The 5-Step Formula to Conquer Hesitation & English Anxiety',
    category: 'Fluency Tricks',
    author: 'Instructor Nusrat Waqar',
    summary: 'Psychological and practical techniques to eliminate the fear of speaking in front of superiors or peers.',
    instructorNote:
      'Language anxiety is psychological, not intellectual. You already know the vocabulary; you just need to free your tongue from self-judgment.',
    items: [
      {
        english: 'Step 1: The Mirror Monologue (3 Minutes Daily)',
        urdu: 'روزانہ 3 منٹ شیشے کے سامنے کھڑے ہو کر باآوازِ بلند بولیں',
        contextOrPronunciation: 'Look directly into your own eyes. Talk about your day. It desensitizes you to the feeling of being watched while speaking.'
      },
      {
        english: 'Step 2: Slow Down Your Rate of Speech by 20%',
        urdu: 'اپنی گفتگو کی رفتار 20 فیصد کم کریں تاکہ دماغ کو الفاظ چننے کا وقت ملے',
        contextOrPronunciation: 'Fast speech is not fluent speech. Calmer pacing prevents tongue slips and eliminates panic filler noises.'
      },
      {
        english: 'Step 3: Chunking Sentences into 3-Word Units',
        urdu: 'بڑے جملوں کو تین تین الفاظ کے ٹکڑوں میں بولیں',
        contextOrPronunciation: 'Instead of memorizing long sentences: "I was wondering" + "if we could meet" + "after the workshop."'
      },
      {
        english: 'Step 4: The 100-Mistakes Milestone',
        urdu: 'خود کو روزانہ غلطیاں کرنے کی کھلی اجازت دیں',
        contextOrPronunciation: 'Tell yourself: "I am allowed to make 100 grammatical errors this month because that is how native speakers also learned as children."'
      },
      {
        english: 'Step 5: Replace Negative Self-Talk',
        urdu: 'منفی خیالات کو مثبت جملوں سے تبدیل کریں',
        contextOrPronunciation: 'Never say "My English is terrible." Say: "My spoken English is improving noticeably every single week."'
      }
    ]
  },
  {
    id: 'note-3',
    title: '50 Master Conversational Connectors & Fillers',
    category: 'Connectors',
    author: 'Instructor Nusrat Waqar',
    summary: 'The secret bridge words that give you time to think while keeping your speech natural and sophisticated.',
    instructorNote:
      'Fluency is built on transitions. These connectors buy your brain 1 to 2 seconds of thinking time.',
    items: [
      { english: 'As a matter of fact...', urdu: 'در حقیقت / دراصل...', contextOrPronunciation: 'Adding surprising facts' },
      { english: 'To be completely honest with you...', urdu: 'اگر سچائی سے کہوں تو...', contextOrPronunciation: 'Sharing genuine feelings' },
      { english: 'On the other hand...', urdu: 'دوسری طرف / اس کے برعکس...', contextOrPronunciation: 'Showing contrast' },
      { english: 'As far as I am concerned...', urdu: 'جہاں تک میری رائے کا تعلق ہے...', contextOrPronunciation: 'Expressing personal perspective' },
      { english: 'That reminds me of something...', urdu: 'اس بات سے مجھے ایک چیز یاد آئی...', contextOrPronunciation: 'Changing topic smoothly' },
      { english: 'In other words...', urdu: 'دوسرے الفاظ میں یوں کہیے کہ...', contextOrPronunciation: 'Simplifying a complex point' },
      { english: 'Needless to say...', urdu: 'یہ کہنے کی ضرورت نہیں کہ...', contextOrPronunciation: 'Stating obvious facts' },
      { english: 'First and foremost...', urdu: 'سب سے پہلے اور سب سے اہم بات...', contextOrPronunciation: 'Beginning an argument' }
    ]
  },
  {
    id: 'note-4',
    title: 'Pronunciation Guide: Silent Letters & Tricky Sounds',
    category: 'Pronunciation',
    author: 'Instructor Nusrat Waqar',
    summary: 'Clear rules for silent letters that Pakistani students commonly mispronounce.',
    instructorNote:
      'English spelling is historical, not phonetic. Learn these silent letter rules to sound instantly educated.',
    items: [
      { english: 'Doubt & Debt (Silent B)', urdu: 'اس میں B خاموش ہے (ڈاؤٹ، ڈیٹ پڑھیں، ڈوبٹ یا ڈیبٹ نہیں)', contextOrPronunciation: 'Dowt / Det' },
      { english: 'Receipt (Silent P)', urdu: 'اس میں P خاموش ہے (ریسیٹ پڑھیں، ریسپٹ نہیں)', contextOrPronunciation: 'Ri-seet' },
      { english: 'Subtle (Silent B)', urdu: 'اس میں B خاموش ہے (سَٹَل پڑھیں، سبٹل نہیں)', contextOrPronunciation: 'Sut-ul' },
      { english: 'Wednesday (Silent D)', urdu: 'اس میں پہلا D خاموش ہے (وینزڈے پڑھیں، ویڈنسڈے نہیں)', contextOrPronunciation: 'Wenz-day' },
      { english: 'Colleague (Silent UE)', urdu: 'اسے کولیگ پڑھیں، کولیگیو نہیں', contextOrPronunciation: 'Kol-eeg' },
      { english: 'Island (Silent S)', urdu: 'اس میں S خاموش ہے (آئیلینڈ پڑھیں، اِسلینڈ نہیں)', contextOrPronunciation: 'Eye-lund' },
      { english: 'Chamber & Schedule', urdu: 'چیمبر اور شیڈول / سکیجول', contextOrPronunciation: 'Chaym-ber / Shed-yool' }
    ]
  },
  {
    id: 'note-5',
    title: 'Formal vs. Casual Spoken English Cheat Sheet',
    category: 'Interview & Office',
    author: 'Instructor Nusrat Waqar',
    summary: 'Transform casual street slang into polished professional vocabulary for office, emails, and vivas.',
    instructorNote:
      'Know your audience! In vivas and interviews, choose formal diction; with friends, keep it casual.',
    items: [
      { english: 'Informal: Ask for -> Formal: Request', urdu: 'مانگنا / درخواست کرنا', contextOrPronunciation: 'I would like to request an extension.' },
      { english: 'Informal: Tell why -> Formal: Clarify / Explain', urdu: 'وضاحت کرنا', contextOrPronunciation: 'Could you clarify this requirement?' },
      { english: 'Informal: Put off -> Formal: Postpone', urdu: 'ملتوی کرنا', contextOrPronunciation: 'The workshop has been postponed.' },
      { english: 'Informal: Get in touch -> Formal: Contact', urdu: 'رابطہ کرنا', contextOrPronunciation: 'Please contact the regional coordinator.' },
      { english: 'Informal: Deal with -> Formal: Handle / Address', urdu: 'مسئلہ حل کرنا / سنبھالنا', contextOrPronunciation: 'We must address this concern promptly.' }
    ]
  }
];

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'grammar-1',
    title: 'The Present Simple vs. Present Continuous in Daily Speech',
    category: 'Tenses',
    importance: 'Essential',
    urduExplanation: 'مستقل عادات اور روزمرہ حقائق کے لیے پریزنٹ سمپل، جبکہ اس وقت جاری کام کے لیے پریزنٹ کنٹینیوئس کا استعمال',
    ruleFormula: 'Present Simple: Subject + V1(s/es) | Present Continuous: Subject + is/am/are + V-ing',
    coreExplanation:
      'Use Present Simple for routines, permanent truths, and schedules ("I study at AIOU", "The train arrives at 9"). Use Present Continuous ONLY for actions happening at the very moment of speaking ("I am studying right now").',
    examples: [
      {
        positive: 'I live in Sargodha and study education.',
        negative: 'I do not live in Lahore.',
        question: 'Do you study at Allama Iqbal Open University?',
        urduMeaning: 'میں سرگودھا میں رہتا ہوں اور تعلیم کے شعبے میں پڑھتا ہوں۔'
      },
      {
        positive: 'She is preparing her assignment currently.',
        negative: 'She is not watching television right now.',
        question: 'Is she preparing for the upcoming examination?',
        urduMeaning: 'وہ فی الوقت اپنی اسائنمنٹ تیار کر رہی ہے۔'
      }
    ],
    nusratNote:
      'Never say "I am understanding you." Statics verbs like understand, know, like, love, believe, and remember do NOT take "-ing" in standard English. Say: "I understand you perfectly."',
    commonTrap: 'Saying "I am having two brothers" instead of "I have two brothers". For possession, use simple "have".'
  },
  {
    id: 'grammar-2',
    title: 'Past Simple: The Backbone of Storytelling & Reporting',
    category: 'Tenses',
    importance: 'Essential',
    urduExplanation: 'ماضی میں مکمل ہو جانے والے کاموں کے لیے ورب کی دوسری فارم (V2) اور سوالیہ/منفی میں Did + V1 کا سنہری اصول',
    ruleFormula: 'Positive: Subject + V2 | Negative: Subject + did not + V1 | Question: Did + Subject + V1?',
    coreExplanation:
      'Whenever you mention a finished past time (yesterday, last week, in 2024, two hours ago), you MUST use Past Simple. Crucial rule: once you use "did", the verb reverts back to its 1st base form!',
    examples: [
      {
        positive: 'I dispatched my assignments yesterday.',
        negative: 'I did not receive the tracking slip.',
        question: 'Did you dispatch the parcel via Pakistan Post?',
        urduMeaning: 'میں نے کل اپنی اسائنمنٹس ڈاک کے ذریعے بھیج دی تھیں۔'
      }
    ],
    nusratNote:
      'The #1 mistake in Pakistani spoken English is: "I didn’t went there." Remember: "did" already carries the past tense, so pair it with V1: "I didn’t go there."',
    commonTrap: 'Using "did + second form" (e.g., "Did you saw him?"). Always say: "Did you see him?"'
  },
  {
    id: 'grammar-3',
    title: 'Modal Verbs of Politeness & Possibility: Could, Would, May, Should',
    category: 'Modal Verbs',
    importance: 'High-Yield',
    urduExplanation: 'شائستگی، اجازت، امکان اور نصیحت کے لیے ماڈل وربز کا خوبصورت استعمال',
    ruleFormula: 'Subject + Modal Verb (Could/Would/Should/May) + V1 (Base Form)',
    coreExplanation:
      'In spoken English, direct words like "Can you" sound forceful. "Could you" is much more polite. "Would you like" is the gold standard for offering hospitality. "Should" is for moral advice or recommendation.',
    examples: [
      {
        positive: 'You should review past papers before the exam.',
        negative: 'You should not leave questions unattempted.',
        question: 'Could you kindly guide me through the LMS portal?',
        urduMeaning: 'آپ کو امتحان سے قبل گزشتہ سالوں کے پرچے دہرانے چاہئیں۔'
      },
      {
        positive: 'Would you like some tea or cold water?',
        negative: 'I would rather not discuss this right now.',
        question: 'Would you mind closing the door, please?',
        urduMeaning: 'کیا آپ چائے یا ٹھنڈا پانی لینا پسند کریں گے؟'
      }
    ],
    nusratNote:
      'After "Would you mind...", always use the verb with "-ing"! Example: "Would you mind helping me?" NOT "Would you mind help me?".',
    commonTrap: 'Adding "to" after modal verbs (e.g., "I must to go"). Never add "to" after can, could, may, might, must, should.'
  },
  {
    id: 'grammar-4',
    title: 'Prepositions of Time & Place: At, On, In Made Easy',
    category: 'Prepositions',
    importance: 'Essential',
    urduExplanation: 'وقت اور جگہ کے لیے At, On اور In کا مکمل اور آسان خاکہ',
    ruleFormula: 'In = Big / Enclosed | On = Surface / Day / Date | At = Precise Point / Clock Time',
    coreExplanation:
      'Time: AT for exact clock times (at 5 PM, at midnight). ON for days and specific dates (on Monday, on 14th August). IN for months, years, and long periods (in July, in 2026, in the morning). Place: AT for specific address/point. ON for street or surface. IN for city, country, or room.',
    examples: [
      {
        positive: 'Our online workshop begins at 9:00 AM on Monday in Islamabad.',
        negative: 'I am not available on Sunday morning.',
        question: 'Were you at the university library on Friday?',
        urduMeaning: 'ہماری آن لائن ورکشاپ پیر کے روز صبح 9 بجے اسلام آباد میں شروع ہوگی۔'
      }
    ],
    nusratNote:
      'We say "at night" but "in the morning", "in the afternoon", "in the evening". Don’t say "in night"!',
    commonTrap: 'Saying "I was in the bus" when standing or walking on a public transit vehicle. For bus, train, and plane, say "on the bus / on the plane". For car or taxi, say "in the car".'
  },
  {
    id: 'grammar-5',
    title: 'Subject-Verb Agreement: The 7 Rules That Trip Students Up',
    category: 'Sentence Structure',
    importance: 'High-Yield',
    urduExplanation: 'فاعل اور فعل کا تال میل — واحد کے ساتھ واحد فعل، جمع کے ساتھ جمع فعل',
    ruleFormula: 'Singular Subject + Singular Verb (is/has/was/V1+s) | Plural Subject + Plural Verb (are/have/were/V1)',
    coreExplanation:
      'When words come between the subject and verb (like "One of my friends"), the verb must still agree with the main subject ("One"), NOT the nearby plural noun ("friends").',
    examples: [
      {
        positive: 'One of my teachers is guiding me.',
        negative: 'Neither of the answers is correct.',
        question: 'Does everyone in the class have the textbook?',
        urduMeaning: 'میرے اساتذہ میں سے ایک استاد میری رہنمائی فرما رہے ہیں۔'
      }
    ],
    nusratNote:
      '"Everyone", "Everybody", "Someone", and "Nobody" are singular pronouns in English! They always take singular verbs: "Everyone is ready" (NOT "Everyone are ready").',
    commonTrap: 'Saying "One of my friend live in Lahore". Correct is: "One of my friends lives in Lahore."'
  },
  {
    id: 'grammar-6',
    title: 'Conditionals in Spoken English: Talking About "If" & Real Life',
    category: 'Sentence Structure',
    importance: 'High-Yield',
    urduExplanation: 'شرطیہ جملے (اگر مگر) — حقیقت، مستقبل کے امکانات اور ماضی کے پچھتاوے',
    ruleFormula: 'First Conditional: If + Present Simple, will + V1 | Second Conditional: If + Past Simple, would + V1',
    coreExplanation:
      'First Conditional is for real future possibilities: "If it rains tomorrow, I will stay home." Second Conditional is for imaginary, hypothetical dreams right now: "If I were the minister of education, I would make books free."',
    examples: [
      {
        positive: 'If you practice daily, you will speak fluent English within 60 days.',
        negative: 'If she doesn’t study the syllabus, she won’t pass the test.',
        question: 'What will you do if the assignment deadline is extended?',
        urduMeaning: 'اگر آپ روزانہ مشق کریں گے، تو آپ 60 دنوں کے اندر روانی سے انگریزی بولیں گے۔'
      }
    ],
    nusratNote:
      'In the "if" clause, never put "will"! Wrong: "If you will come, I will help you." Right: "If you come, I will help you."',
    commonTrap: 'Saying "If I was you". In formal subjunctive English, always say: "If I were you, I would take that course."'
  },
  {
    id: 'grammar-7',
    title: 'Active vs. Passive Voice in Everyday Conversation',
    category: 'Sentence Structure',
    importance: 'High-Yield',
    urduExplanation: 'کب کام کرنے والے کا ذکر اہم ہے اور کب خود کام یا نتیجہ اہم ہوتا ہے',
    ruleFormula: 'Active: Subject + Verb + Object | Passive: Object + form of "be" + V3 (Past Participle)',
    coreExplanation:
      'In spoken English, 85% of sentences are active because they are direct and energetic. However, use passive voice when the actor is unknown, obvious, or unimportant ("My phone was stolen", "The results were announced").',
    examples: [
      {
        positive: 'AIOU announced the Autumn 2026 semester results.',
        negative: 'The date sheet has not been issued yet.',
        question: 'Was your assignment marked by the tutor?',
        urduMeaning: 'علامہ اقبال اوپن یونیورسٹی نے سمسٹر کے نتائج کا اعلان کر دیا۔'
      }
    ],
    nusratNote:
      'Don’t force passive voice where active is simpler. Say "I lost my pen", not "My pen was lost by me"!',
    commonTrap: 'Forgetting the 3rd form of the verb (V3) in passive voice. Passive ALWAYS requires V3.'
  },
  {
    id: 'grammar-8',
    title: 'The Articles "A", "An", and "The" Demystified',
    category: 'Articles',
    importance: 'Essential',
    urduExplanation: 'آرٹیکلز کا درست استعمال — آواز کے مطابق A یا An، اور خاص چیزوں کے لیے The کا استعمال',
    ruleFormula: 'A + Consonant Sound | An + Vowel Sound (a, e, i, o, u sounds) | The + Specific / Unique Noun',
    coreExplanation:
      'Decide between "A" and "An" based on the spoken SOUND of the next word, NOT the written alphabet! Example: "An hour" (silent H, sounds like vowel "ow-er"), but "A university" (U sounds like "yu", which is a consonant sound).',
    examples: [
      {
        positive: 'She is an honest officer and a university graduate.',
        negative: 'He did not bring an umbrella.',
        question: 'Did you submit the admission challan at the bank?',
        urduMeaning: 'وہ ایک دیانتدار افسر اور یونیورسٹی گریجویٹ ہیں۔'
      }
    ],
    nusratNote:
      'Do not put "The" before proper names of people or most countries: Say "I live in Pakistan", NOT "I live in the Pakistan". Exceptions: "The United States", "The United Kingdom", "The Netherlands".',
    commonTrap: 'Saying "An university" because it begins with U. Always say "A university" because the phonetic sound is consonant /j/.'
  }
];

export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  {
    id: 'scenario-1',
    title: 'AIOU Regional Office Inquiry Desk',
    setting: 'University Regional Office Counter',
    level: 'Beginner',
    description: 'Practice inquiring about your admission confirmation, book delivery, and LMS login details.',
    roles: { user: 'Student', partner: 'Desk Officer' },
    exchanges: [
      {
        partnerPrompt: 'Good morning! Welcome to the student information counter. How can I help you today?',
        partnerAudioText: 'Good morning! Welcome to the student information counter. How can I help you today?',
        recommendedUserResponse: 'Good morning, Sir. I wanted to verify the status of my Autumn semester admission, please.',
        urduHint: 'کہیں کہ آپ اپنے سمسٹر کے داخلے کی تصدیق کا سٹیٹس معلوم کرنا چاہتے ہیں۔',
        alternativeOptions: [
          'Hello, I am here to check if my admission has been confirmed yet.',
          'Good morning. Could you please check my admission confirmation status?'
        ]
      },
      {
        partnerPrompt: 'Certainly. Do you have your Student ID or online challan tracking number with you?',
        partnerAudioText: 'Certainly. Do you have your Student ID or online challan tracking number with you?',
        recommendedUserResponse: 'Yes, I do. Here is my nine-digit Student ID and a copy of the bank fee deposit slip.',
        urduHint: 'بتائیں کہ آپ کے پاس سٹوڈنٹ آئی ڈی اور بینک فیس کی رسید موجود ہے۔',
        alternativeOptions: [
          'Yes, here is my paid bank challan and Student ID number.',
          'Sure, let me share my Student ID number with you right now.'
        ]
      },
      {
        partnerPrompt: 'Thank you. Your admission is fully approved! Have you received your CMS login credentials via SMS?',
        partnerAudioText: 'Thank you. Your admission is fully approved! Have you received your CMS login credentials via SMS?',
        recommendedUserResponse: 'Not yet, Sir. That is why I visited today. Could you kindly generate or reset my temporary password?',
        urduHint: 'بتائیں کہ ابھی تک ایس ایم ایس موصول نہیں ہوا، کیا وہ پاسورڈ ری سیٹ کر سکتے ہیں؟',
        alternativeOptions: [
          'I haven’t received the SMS yet. Could you help me retrieve my password?',
          'No, I did not receive any text message. Please help me access my account.'
        ]
      },
      {
        partnerPrompt: 'Done! Your temporary password is set to your roll number. You can log in on enrollment.aiou.edu.pk.',
        partnerAudioText: 'Done! Your temporary password is set to your roll number. You can log in on enrollment.aiou.edu.pk.',
        recommendedUserResponse: 'Thank you very much for your kind support. I truly appreciate your help. Have a wonderful day!',
        urduHint: 'آفیسر کا شکریہ ادا کریں اور الوداع کہیں۔',
        alternativeOptions: [
          'Thank you so much, Sir! I am very grateful for your assistance.',
          'Much obliged for your help! Have a great day ahead.'
        ]
      }
    ]
  },
  {
    id: 'scenario-2',
    title: 'Job Interview: Junior Clerk / Data Entry Operator',
    setting: 'Formal Interview Panel Room',
    level: 'Intermediate',
    description: 'Face a panel for a government or private clerical / academic support role with poise.',
    roles: { user: 'Candidate', partner: 'Head of Panel' },
    exchanges: [
      {
        partnerPrompt: 'Please take your seat. We have reviewed your CV. Could you briefly introduce yourself and your typing background?',
        partnerAudioText: 'Please take your seat. We have reviewed your CV. Could you briefly introduce yourself and your typing background?',
        recommendedUserResponse: 'Thank you, Sir. My name is Nusrat Waqar. I hold a Bachelor’s degree from AIOU and possess a certified typing speed of 45 words per minute with 98% accuracy.',
        urduHint: 'اپنا تعارف کروائیں، ڈگری بتائیں اور ٹائپنگ رفتار و درستگی کا ذکر کریں۔',
        alternativeOptions: [
          'Good morning. I am a graduate with strong administrative and touch-typing skills averaging 45 words per minute.',
          'Thank you for having me. My educational background is in arts, and I have trained extensively in computer applications.'
        ]
      },
      {
        partnerPrompt: 'Handling high-pressure filing and tight deadlines is common in this office. How do you manage stress?',
        partnerAudioText: 'Handling high-pressure filing and tight deadlines is common in this office. How do you manage stress?',
        recommendedUserResponse: 'I stay organized by prioritizing tasks with a daily checklist and maintaining clear communication with my supervisor.',
        urduHint: 'وضاحت کریں کہ آپ ترجیحی فہرست اور بہتر رابطہ کاری کے ذریعے کام کا دباؤ سنبھالتے ہیں۔',
        alternativeOptions: [
          'I remain calm by breaking large workloads into manageable daily targets.',
          'My distance learning background has trained me to work diligently under strict deadlines.'
        ]
      },
      {
        partnerPrompt: 'Excellent. Do you have any questions for us before we conclude this session?',
        partnerAudioText: 'Excellent. Do you have any questions for us before we conclude this session?',
        recommendedUserResponse: 'Yes, Sir. Could you share what opportunities for professional training and skill development exist within this department?',
        urduHint: 'پوچھیں کہ اس محکمے میں پروفیشنل ٹریننگ کے کیا مواقع موجود ہیں۔',
        alternativeOptions: [
          'Yes, I would love to know more about the daily workflow of the team.',
          'Could you tell me what the next step in this selection process will be?'
        ]
      }
    ]
  },
  {
    id: 'scenario-3',
    title: 'Discussing an Assignment with Your Tutor',
    setting: 'Phone / In-Person Academic Discussion',
    level: 'Intermediate',
    description: 'Politely seek clarification on an assignment topic and request constructive feedback.',
    roles: { user: 'Student', partner: 'Course Tutor' },
    exchanges: [
      {
        partnerPrompt: 'Hello! Tutor office hours. Who is on the line, please?',
        partnerAudioText: 'Hello! Tutor office hours. Who is on the line, please?',
        recommendedUserResponse: 'Hello, Professor! This is Ali, one of your students for Course Code 8601. Do you have two minutes for a quick query?',
        urduHint: 'شائستگی سے اپنا نام بتائیں، کورس کوڈ بتائیں اور دو منٹ کا وقت مانگیں۔',
        alternativeOptions: [
          'Good afternoon, Sir. My name is Ali from Course 8601. I hope this is a good time to speak briefly.',
          'Hello, Sir. I am enrolled in your 8601 section and needed some academic guidance.'
        ]
      },
      {
        partnerPrompt: 'Yes, Ali. I have a few minutes. What seems to be the confusion in the assignment?',
        partnerAudioText: 'Yes, Ali. I have a few minutes. What seems to be the confusion in the assignment?',
        recommendedUserResponse: 'Sir, in Question 3 regarding educational philosophy, should we focus exclusively on Pakistani context or include international comparisons?',
        urduHint: 'پوچھیں کہ کیا سوال میں صرف ملکی تناظر پر بات کرنی ہے یا بین الاقوامی موازنہ بھی شامل کرنا ہے۔',
        alternativeOptions: [
          'I needed guidance on Question 3: Is an international case study required alongside local examples?',
          'Could you please clarify whether Question 3 requires field research or conceptual literature review?'
        ]
      },
      {
        partnerPrompt: 'Great question. Begin with the foundational theory and then connect it with current challenges in Pakistan.',
        partnerAudioText: 'Great question. Begin with the foundational theory and then connect it with current challenges in Pakistan.',
        recommendedUserResponse: 'That clarifies it completely! Thank you for your valuable guidance, Sir. I will submit the draft on time.',
        urduHint: 'شکریہ ادا کریں اور بتائیں کہ اب بات واضح ہو گئی ہے۔',
        alternativeOptions: [
          'Understood, Sir. That gives me very clear direction. Thank you so much.',
          'Perfect! I will implement your advice immediately. Thank you for your time.'
        ]
      }
    ]
  }
];

export const SPOKEN_ENGLISH_QUIZ: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'Choose the most natural and grammatically correct way to introduce yourself in an interview:',
    context: 'First impression greeting in a formal setting',
    options: [
      'Myself Imran Khan, from Sargodha.',
      'My name is Imran Khan, and I am from Sargodha.',
      'I am myself Imran Khan from Sargodha.',
      'Me is Imran Khan belonging to Sargodha.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Never start an introduction with "Myself". In English, "My name is..." or "I am..." is standard and polite.',
    instructorComment: 'Instructor Nusrat Waqar: "Myself" is an emphatic or reflexive pronoun. Using it as a subject is grammatically incorrect!'
  },
  {
    id: 'quiz-2',
    question: 'Which of the following sentences correctly uses the past simple tense?',
    context: 'Reporting an action that took place yesterday',
    options: [
      'I didn’t went to the university yesterday.',
      'I didn’t go to the university yesterday.',
      'I didn’t gone to the university yesterday.',
      'I was not go to the university yesterday.'
    ],
    correctAnswerIndex: 1,
    explanation: 'After the auxiliary verb "did" or "didn’t", the main verb MUST be in its base/first form (V1: go).',
    instructorComment: 'Instructor Nusrat Waqar: This is the most frequent blunder in Pakistan! Always remember: Did + 1st Form.'
  },
  {
    id: 'quiz-3',
    question: 'What is the correct polite request when asking someone to lower their volume or wait?',
    context: 'Formal communication in a shared room or office',
    options: [
      'Stop speaking now!',
      'Would you mind keeping your voice down for a moment, please?',
      'You are speaking too loud so keep quiet.',
      'Don’t do voice here.'
    ],
    correctAnswerIndex: 1,
    explanation: '"Would you mind + V-ing" is the international standard for courteous, diplomatic requests.',
    instructorComment: 'Instructor Nusrat Waqar: Direct commands alienate people. Polite phrasing wins cooperation every time.'
  },
  {
    id: 'quiz-4',
    question: 'Select the correct sentence with subject-verb agreement:',
    context: 'Discussing university classmates',
    options: [
      'One of my friends are preparing for the CSS examination.',
      'One of my friends is preparing for the CSS examination.',
      'One of my friend is preparing for the CSS examination.',
      'One of my friends have preparing for the CSS examination.'
    ],
    correctAnswerIndex: 1,
    explanation: 'The subject is "One" (singular), followed by "of my friends" (plural). Therefore, the verb must be singular "is".',
    instructorComment: 'Instructor Nusrat Waqar: Do not be distracted by the plural noun right next to the verb. The true subject is "One"!'
  },
  {
    id: 'quiz-5',
    question: 'Which preposition correctly completes this sentence: "Our online workshop starts ___ 10:00 AM ___ Monday"?',
    context: 'Scheduling academic appointments',
    options: [
      'on / at',
      'at / on',
      'in / at',
      'by / in'
    ],
    correctAnswerIndex: 1,
    explanation: 'We use "AT" for clock times (at 10:00 AM) and "ON" for specific days of the week (on Monday).',
    instructorComment: 'Instructor Nusrat Waqar: Remember my quick formula: At for Clock, On for Day, In for Month/Year!'
  },
  {
    id: 'quiz-6',
    question: 'How should you answer when an interviewer asks: "What are your weaknesses?"',
    context: 'Job and university viva situations',
    options: [
      '"Sir, I have no weaknesses at all."',
      '"I get angry very quickly when someone makes a mistake."',
      '"I used to hesitate when speaking in public, but I have been actively practicing daily and notice great improvement."',
      '"I am very lazy in the morning."'
    ],
    correctAnswerIndex: 2,
    explanation: 'The best answer acknowledges a genuine developmental area and demonstrates proactive steps taken to overcome it.',
    instructorComment: 'Instructor Nusrat Waqar: Turning a weakness into a story of self-improvement proves maturity and resilience.'
  },
  {
    id: 'quiz-7',
    question: 'Identify the correct sentence using the first conditional:',
    context: 'Talking about future study outcomes',
    options: [
      'If you will study hard, you will pass the exam.',
      'If you study hard, you will pass the exam.',
      'If you study hard, you passed the exam.',
      'If you will study hard, you pass the exam.'
    ],
    correctAnswerIndex: 1,
    explanation: 'In the "if" clause of the first conditional, we use present simple (study), NOT "will study".',
    instructorComment: 'Instructor Nusrat Waqar: Never put "will" inside the "if" room! Keep "will" in the second clause.'
  },
  {
    id: 'quiz-8',
    question: 'Choose the word with a silent letter that is correctly pronounced:',
    context: 'Pronunciation and phonetics',
    options: [
      'In "Doubt", the letter "B" is silent (pronounced: dowt).',
      'In "Doubt", the letter "D" is silent.',
      'In "Doubt", the letter "T" is silent.',
      'In "Doubt", all letters must be pronounced clearly as dow-but.'
    ],
    correctAnswerIndex: 0,
    explanation: 'In words like Doubt, Debt, and Subtle, the letter "B" is completely silent.',
    instructorComment: 'Instructor Nusrat Waqar: Silent B trips up many learners. Practice saying: dowt, det, sut-ul!'
  }
];
