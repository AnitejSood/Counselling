/**
 * Standardized Public Domain Psychometric Test Question Bank & O*NET Crosswalk Data
 */

// 1. RIASEC Interest Inventory (48 Standard O*NET Profiler Items - 8 per category)
export const RIASEC_QUESTIONS = [
  // Realistic (R)
  { id: 'r1', category: 'R', text: 'Build kitchen cabinets or custom wooden furniture' },
  { id: 'r2', category: 'R', text: 'Test electronic circuits and repair mechanical devices' },
  { id: 'r3', category: 'R', text: 'Assemble computer hardware systems or operate heavy machinery' },
  { id: 'r4', category: 'R', text: 'Install solar panel systems or electrical wiring' },
  { id: 'r5', category: 'R', text: 'Work on an offshore engineering rig or construction site' },
  { id: 'r6', category: 'R', text: 'Operate robotics equipment or precision machining tools' },
  { id: 'r7', category: 'R', text: 'Repair automobile engines or drone hardware' },
  { id: 'r8', category: 'R', text: 'Survey land for civil infrastructure and highway building' },

  // Investigative (I)
  { id: 'i1', category: 'I', text: 'Study the structure of human DNA or genetic mutations' },
  { id: 'i2', category: 'I', text: 'Develop complex machine learning algorithms or neural networks' },
  { id: 'i3', category: 'I', text: 'Conduct chemical analysis in a pharmaceutical research lab' },
  { id: 'i4', category: 'I', text: 'Analyze astronomical data to study deep space phenomena' },
  { id: 'i5', category: 'I', text: 'Examine medical test samples to diagnose biological diseases' },
  { id: 'i6', category: 'I', text: 'Solve complex mathematical models or theoretical proofs' },
  { id: 'i7', category: 'I', text: 'Investigate cyber security breaches and cryptographic protocols' },
  { id: 'i8', category: 'I', text: 'Research economic trends and financial market data' },

  // Artistic (A)
  { id: 'a1', category: 'A', text: 'Write original novels, screenplays, or creative poetry' },
  { id: 'a2', category: 'A', text: 'Design user interfaces, visual graphics, or brand identities' },
  { id: 'a3', category: 'A', text: 'Compose background musical scores for films or games' },
  { id: 'a4', category: 'A', text: 'Direct theatrical productions or cinematic documentaries' },
  { id: 'a5', category: 'A', text: 'Architect modern residential buildings or aesthetic spaces' },
  { id: 'a6', category: 'A', text: 'Design fashion collections or digital 3D character art' },
  { id: 'a7', category: 'A', text: 'Create multimedia animations or interactive digital experiences' },
  { id: 'a8', category: 'A', text: 'Perform live musical instruments or dramatic theater' },

  // Social (S)
  { id: 's1', category: 'S', text: 'Teach mathematics or science to high school students' },
  { id: 's2', category: 'S', text: 'Counsel individuals dealing with career burnout or personal stress' },
  { id: 's3', category: 'S', text: 'Work with patients in physical rehabilitation or nursing care' },
  { id: 's4', category: 'S', text: 'Volunteer with international humanitarian aid organizations' },
  { id: 's5', category: 'S', text: 'Help young students overcome learning disabilities' },
  { id: 's6', category: 'S', text: 'Conduct family therapy or educational guidance sessions' },
  { id: 's7', category: 'S', text: 'Train new team members in interpersonal communication skills' },
  { id: 's8', category: 'S', text: 'Organize community development programs and social welfare drives' },

  // Enterprising (E)
  { id: 'e1', category: 'E', text: 'Pitch business strategy to venture capital investors' },
  { id: 'e2', category: 'E', text: 'Lead a fast-growing tech startup or corporate enterprise' },
  { id: 'e3', category: 'E', text: 'Negotiate major commercial real estate or merger deals' },
  { id: 'e4', category: 'E', text: 'Manage product marketing campaigns and sales teams' },
  { id: 'e5', category: 'E', text: 'Run for public office or lead political campaign strategy' },
  { id: 'e6', category: 'E', text: 'Drive international trade negotiations and business expansion' },
  { id: 'e7', category: 'E', text: 'Present keynote strategic speeches to corporate executives' },
  { id: 'e8', category: 'E', text: 'Manage risk investment portfolios and fund allocations' },

  // Conventional (C)
  { id: 'c1', category: 'C', text: 'Audit financial accounting statements for corporate compliance' },
  { id: 'c2', category: 'C', text: 'Manage database records and structured data pipelines' },
  { id: 'c3', category: 'C', text: 'Maintain systematic inventory and logistics tracking' },
  { id: 'c4', category: 'C', text: 'Calculate tax obligations and prepare official regulatory filings' },
  { id: 'c5', category: 'C', text: 'Verify payroll calculations and employee benefit records' },
  { id: 'c6', category: 'C', text: 'Inspect manufacturing processes for quality assurance standards' },
  { id: 'c7', category: 'C', text: 'Organize legal contract archives and compliance records' },
  { id: 'c8', category: 'C', text: 'Analyze cost-efficiency data for corporate budget planning' }
];

// O*NET Holland Code Crosswalk Job Titles Mapping
export const HOLLAND_CAREER_MAP = {
  'ISR': {
    code: 'ISR',
    title: 'Investigative - Social - Realistic',
    topCareers: ['Medical Research Scientist', 'Biomedical Engineer', 'Surgeon', 'Clinical Neurologist'],
    suitableMajors: ['Biomedical Engineering', 'Neuroscience', 'Medicine', 'Biotechnology'],
    onetCode: '17-2031.00'
  },
  'IES': {
    code: 'IES',
    title: 'Investigative - Enterprising - Social',
    topCareers: ['Management Consultant', 'Health Systems Strategist', 'Data Scientist Leader', 'Tech Product Director'],
    suitableMajors: ['Computer Science & Business', 'Industrial Engineering', 'Healthcare Management'],
    onetCode: '15-1111.00'
  },
  'IRC': {
    code: 'IRC',
    title: 'Investigative - Realistic - Conventional',
    topCareers: ['Software Systems Architect', 'Cyber Security Analyst', 'Robotics Systems Engineer', 'Quantitative Financial Analyst'],
    suitableMajors: ['Computer Science', 'Electrical Engineering', 'Computational Mathematics'],
    onetCode: '15-1132.00'
  },
  'IAS': {
    code: 'IAS',
    title: 'Investigative - Artistic - Social',
    topCareers: ['User Experience (UX) Researcher', 'Educational Game Designer', 'Bio-Graphics Architect', 'Architectural Historian'],
    suitableMajors: ['Human-Computer Interaction', 'Cognitive Science', 'Digital Media Studies'],
    onetCode: '15-1255.00'
  },
  'SEC': {
    code: 'SEC',
    title: 'Social - Enterprising - Conventional',
    topCareers: ['Educational Consultant', 'Human Resources Director', 'Admissions Strategist', 'Career Development Manager'],
    suitableMajors: ['Educational Psychology', 'Human Resource Management', 'Business Administration'],
    onetCode: '21-1012.00'
  },
  'ECA': {
    code: 'ECA',
    title: 'Enterprising - Conventional - Artistic',
    topCareers: ['Digital Marketing Manager', 'Brand Director', 'Media Producer', 'Creative Operations Lead'],
    suitableMajors: ['Marketing & Media', 'Business Communication', 'Graphic Design Management'],
    onetCode: '11-2021.00'
  },
  'ARI': {
    code: 'ARI',
    title: 'Artistic - Realistic - Investigative',
    topCareers: ['Industrial Product Designer', 'Architect', '3D VFX Supervisor', 'Acoustic Engineer'],
    suitableMajors: ['Architecture', 'Industrial Design', 'Computational Arts'],
    onetCode: '17-1011.00'
  },
  'DEFAULT': {
    code: 'GENERAL',
    title: 'Multi-Disciplinary Profile',
    topCareers: ['Software Engineer', 'Management Analyst', 'Business Strategist', 'Data Analyst'],
    suitableMajors: ['Computer Science', 'Business Administration', 'Data Science'],
    onetCode: '15-1252.00'
  }
};


// 2. Big Five Personality Test (IPIP 20-Item Short Form)
export const BIG_FIVE_QUESTIONS = [
  // Extraversion (E)
  { id: 'bf1', trait: 'Extraversion', text: 'I am usually the life of the party or active in group discussions.', isReverse: false },
  { id: 'bf2', trait: 'Extraversion', text: 'I feel comfortable starting conversations with strangers.', isReverse: false },
  { id: 'bf3', trait: 'Extraversion', text: 'I tend to keep in the background and stay quiet in large crowds.', isReverse: true },
  { id: 'bf4', trait: 'Extraversion', text: 'I prefer spending time alone rather than attending social gatherings.', isReverse: true },

  // Agreeableness (A)
  { id: 'bf5', trait: 'Agreeableness', text: 'I feel genuine concern and empathy for other people\'s feelings.', isReverse: false },
  { id: 'bf6', trait: 'Agreeableness', text: 'I am always willing to assist colleagues and teammates in need.', isReverse: false },
  { id: 'bf7', trait: 'Agreeableness', text: 'I am sometimes skeptical or critical of others\' intentions.', isReverse: true },
  { id: 'bf8', trait: 'Agreeableness', text: 'I can be blunt or harsh when giving feedback.', isReverse: true },

  // Conscientiousness (C)
  { id: 'bf9', trait: 'Conscientiousness', text: 'I keep my work space organized and follow structured plans.', isReverse: false },
  { id: 'bf10', trait: 'Conscientiousness', text: 'I pay high attention to detail and complete tasks ahead of schedule.', isReverse: false },
  { id: 'bf11', trait: 'Conscientiousness', text: 'I sometimes procrastinate or forget to complete administrative chores.', isReverse: true },
  { id: 'bf12', trait: 'Conscientiousness', text: 'I dislike strict schedules and prefer spontaneous workflows.', isReverse: true },

  // Emotional Stability / Neuroticism (N)
  { id: 'bf13', trait: 'EmotionalStability', text: 'I remain calm, relaxed, and composed under high pressure.', isReverse: false },
  { id: 'bf14', trait: 'EmotionalStability', text: 'I rarely feel anxious, stressed, or overwhelmed by sudden changes.', isReverse: false },
  { id: 'bf15', trait: 'EmotionalStability', text: 'I get stressed or mood swings easily when plans change unexpectedly.', isReverse: true },
  { id: 'bf16', trait: 'EmotionalStability', text: 'I tend to worry frequently about future outcomes or exams.', isReverse: true },

  // Openness to Experience (O)
  { id: 'bf17', trait: 'Openness', text: 'I am fascinated by abstract concepts, philosophy, and innovative ideas.', isReverse: false },
  { id: 'bf18', trait: 'Openness', text: 'I love exploring unfamiliar cultures, art forms, and cutting-edge tech.', isReverse: false },
  { id: 'bf19', trait: 'Openness', text: 'I prefer sticking to proven, traditional methods rather than experimenting.', isReverse: true },
  { id: 'bf20', trait: 'Openness', text: 'I have little interest in artistic expression or theoretical debates.', isReverse: true }
];


// 3. Work Values Assessment (20 Values for Forced-Choice Top 5 & Bottom 3 Ranking)
export const WORK_VALUES_ITEMS = [
  { id: 'v1', title: 'Autonomy & Independence', desc: 'Freedom to determine your own work methods, schedule, and decisions.', category: 'Workplace Environment' },
  { id: 'v2', title: 'High Compensation & Wealth', desc: 'Earning substantial financial rewards, bonuses, and equity wealth.', category: 'Financial Rewards' },
  { id: 'v3', title: 'Job Security & Stability', desc: 'Predictable long-term employment with low risk of layoffs or market shifts.', category: 'Security' },
  { id: 'v4', title: 'Intellectual Challenge', desc: 'Solving complex, novel problems that require continuous deep learning.', category: 'Cognitive Drive' },
  { id: 'v5', title: 'Social Impact & Altruism', desc: 'Directly improving society, helping communities, or saving lives.', category: 'Purpose' },
  { id: 'v6', title: 'Work-Life Harmony', desc: 'Generous personal time, reasonable hours, and zero mandatory weekend work.', category: 'Lifestyle' },
  { id: 'v7', title: 'Prestige & High Status', desc: 'Working at a globally respected institution with high social recognition.', category: 'Recognition' },
  { id: 'v8', title: 'Creativity & Innovation', desc: 'Inventing new products, design aesthetics, or original solutions.', category: 'Cognitive Drive' },
  { id: 'v9', title: 'Leadership & Influence', desc: 'Directing teams, steering corporate strategy, and managing large budgets.', category: 'Leadership' },
  { id: 'v10', title: 'Rapid Career Progression', desc: 'Fast-track promotions, merit-based advancement, and rapid responsibility growth.', category: 'Growth' },
  { id: 'v11', title: 'Global Mobility & Travel', desc: 'Opportunities to live, work, or travel internationally across continents.', category: 'Lifestyle' },
  { id: 'v12', title: 'Collaborative Teamwork', desc: 'Working closely with friendly, supportive, and energetic colleagues.', category: 'Workplace Environment' },
  { id: 'v13', title: 'Structured Environment', desc: 'Clear guidelines, standard operating procedures, and well-defined roles.', category: 'Security' },
  { id: 'v14', title: 'Entrepreneurial Risk', desc: 'Building new ventures from scratch with high risk and high reward potential.', category: 'Leadership' },
  { id: 'v15', title: 'Continuous Mentorship', desc: 'Working under world-class leaders who actively coach your professional development.', category: 'Growth' },
  { id: 'v16', title: 'Aesthetic Beauty', desc: 'Creating or surrounded by visually pleasing designs, art, and environments.', category: 'Purpose' },
  { id: 'v17', title: 'Variety & Dynamism', desc: 'Fast-paced environment where no two work days are ever identical.', category: 'Workplace Environment' },
  { id: 'v18', title: 'Technical Mastery', desc: 'Becoming a recognized deep subject matter expert in a specialized niche.', category: 'Cognitive Drive' },
  { id: 'v19', title: 'Ethics & Integrity', desc: 'Working for an organization with transparent values and zero ethical compromise.', category: 'Purpose' },
  { id: 'v20', title: 'Physical Activity & Outdoor Work', desc: 'Active physical movement rather than sitting at a desk all day.', category: 'Lifestyle' }
];
