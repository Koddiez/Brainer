import { Competition, Course, BlogPost, Badge, Resource, User, School } from './types';

export const mockSchools: School[] = [
    { id: 1, name: 'King\'s College, Lagos', address: '3 Catholic Mission St, Lagos Island', contactPerson: 'Mr. Adekunle', contactEmail: 'admin@kingscollege.edu.ng', subscriptionPlan: 'Premium', logoUrl: 'https://placehold.co/100x100/0B5345/FFFFFF/png?text=KC' },
    { id: 2, name: 'Queen\'s College, Lagos', address: '4-6 Onike Rd, Yaba, Lagos', contactPerson: 'Mrs. Okoro', contactEmail: 'admin@queenscollege.edu.ng', subscriptionPlan: 'Basic', logoUrl: 'https://placehold.co/100x100/4A235A/FFFFFF/png?text=QC' },
    { id: 3, name: 'Loyola Jesuit College, Abuja', address: 'GM 211, Loyola Street, Gidan Mangoro', contactPerson: 'Fr. Chukwuma', contactEmail: 'admin@loyolajesuit.org', subscriptionPlan: 'Free' },
];

export const competitions: Competition[] = [
  {
    id: 1,
    title: 'The Catalyst Challenge',
    category: 'Interdisciplinary',
    date: 'November 15, 2024',
    deadline: 'October 30, 2024',
    description: 'A groundbreaking competition where teams of students combine science, technology, arts, and ethics to solve a real-world Nigerian problem. This year\'s theme: "Urban Sustainability".',
    eligibility: 'SS1 - SS3 Students (Teams of 3-5)',
    prizes: ['Grand Prize: N1,000,000 Project Grant', 'Mentorship from industry leaders at Co-Creation Hub', 'University scholarship considerations'],
    region: 'Nigeria',
    format: 'team-based',
    allowMultimedia: true,
    hasMentorship: true,
  },
  {
    id: 2,
    title: 'Naija Innovate Fest',
    category: 'Social Impact',
    date: 'October 20, 2024',
    deadline: 'September 28, 2024',
    description: 'Develop a practical, tech-driven solution to a pressing local community issue. Participants will create a prototype or a detailed digital pitch for their innovation.',
    eligibility: 'All Secondary School Students',
    prizes: ['N500,000 seed funding for the winning idea', 'Incubation support from a top Nigerian tech hub', 'Feature in a national newspaper'],
    region: 'Nigeria',
    format: 'individual',
    allowMultimedia: true,
    hasMentorship: false,
  },
  {
    id: 3,
    title: 'Legacy Keepers Quest',
    category: 'Cultural Heritage',
    date: 'December 5, 2024',
    deadline: 'November 20, 2024',
    description: 'A vibrant quiz and creative presentation competition celebrating Nigeria\'s rich history, languages, traditions, and folklore. Rediscover and showcase our shared heritage.',
    eligibility: 'JSS1 - SS3 Students',
    prizes: ['Cultural tour of a major historical site in Nigeria', 'A curated library of Nigerian literature for the winner\'s school', 'Cash prizes and national recognition'],
    region: 'Nigeria',
    format: 'individual',
    allowMultimedia: false,
    hasMentorship: false,
  },
  {
    id: 4,
    title: 'Digital Griot Storytelling Contest',
    category: 'Creative Arts',
    date: 'January 18, 2025',
    deadline: 'December 22, 2024',
    description: 'Combine traditional storytelling with modern multimedia. Submit a compelling narrative on an academic theme through a short film, podcast, or interactive digital art piece.',
    eligibility: 'All Secondary School Students',
    prizes: ['Latest video/audio production equipment', 'A masterclass with a renowned Nollywood director or animator', 'Winning entry showcased at a national arts festival'],
    region: 'Nigeria',
    format: 'individual',
    allowMultimedia: true,
    hasMentorship: false,
  },
  {
    id: 5,
    title: 'Green Guardians Eco-Challenge',
    category: 'Environment',
    date: 'February 22, 2025',
    deadline: 'February 1, 2025',
    description: 'A project-based competition promoting environmental awareness. Teams will execute and document a local eco-project, such as a recycling drive, tree planting, or a digital awareness campaign.',
    eligibility: 'JSS2 - SS2 Students (Teams of 4)',
    prizes: ['N750,000 grant to expand the project', 'Solar panel installation for the winning school', 'National Eco-Ambassador titles for the winning team'],
    region: 'Nigeria',
    format: 'team-based',
    allowMultimedia: false,
    hasMentorship: true,
  },
  {
    id: 6,
    title: 'Code Weavers Hackathon',
    category: 'Technology',
    date: 'March 15, 2025',
    deadline: 'February 28, 2025',
    description: 'An introductory competition where students build simple AI models or analyze local datasets to solve social or academic problems. No prior coding experience is required—workshops will be provided.',
    eligibility: 'SS1 - SS3 Students',
    prizes: ['Brand new laptops for each team member', 'Internship opportunities at leading tech companies', 'Premium coding course subscriptions'],
    region: 'Nigeria',
    format: 'team-based',
    allowMultimedia: false,
    hasMentorship: true,
  },
  {
    id: 7,
    title: 'Future Leaders Assembly',
    category: 'Leadership',
    date: 'April 10, 2025',
    deadline: 'March 25, 2025',
    description: 'A unique challenge that tests critical thinking, decision-making, and public speaking through engaging, real-world leadership simulations and scenario-based tasks.',
    eligibility: 'SS2 - SS3 Students',
    prizes: ['Sponsored trip to the Nigerian Youth Parliament', 'Mentorship with a top CEO or public official', 'Leadership training and development grants'],
    region: 'Nigeria',
    format: 'individual',
    allowMultimedia: false,
    hasMentorship: true,
  },
  {
    id: 8,
    title: 'Virtual Voyager Challenge',
    category: 'Technology',
    date: 'May 8, 2025',
    deadline: 'April 24, 2025',
    description: 'Design an immersive learning experience using conceptual VR or AR. Pitch a project for a virtual science lab, a historical tour of the Benin Kingdom, or another innovative educational tool.',
    eligibility: 'All Secondary School Students',
    prizes: ['VR headsets for the winning team', 'Collaboration with a software company to develop the concept', 'Featured spot at a national EdTech conference'],
    region: 'Nigeria',
    format: 'team-based',
    allowMultimedia: true,
    hasMentorship: false,
  },
  {
    id: 9,
    title: 'National Mathematics Olympiad',
    category: 'Maths',
    date: 'June 12, 2025',
    deadline: 'May 30, 2025',
    description: 'A rigorous examination-based competition to identify the brightest young mathematicians in Nigeria. Rounds include algebra, geometry, and calculus.',
    eligibility: 'SS1 - SS3 Students with a passion for mathematics.',
    prizes: ['N500,000 cash prize', 'Full scholarship to a Nigerian university to study Mathematics', 'Represent Nigeria in the Pan-African Maths Olympiad'],
    region: 'Nigeria',
    format: 'individual',
    allowMultimedia: false,
    hasMentorship: false,
  },
  {
    id: 10,
    title: 'All-Nigeria Spelling Bee',
    category: 'English',
    date: 'July 5, 2025',
    deadline: 'June 20, 2025',
    description: 'The ultimate spelling challenge. Students will compete in oral spelling rounds, vocabulary tests, and etymology challenges to be crowned the National Spelling Champion.',
    eligibility: 'JSS1 - SS3 Students',
    prizes: ['N250,000 cash prize', 'An all-expenses-paid trip to the Scripps National Spelling Bee in the USA', 'A personal library worth N100,000'],
    region: 'Nigeria',
    format: 'individual',
    allowMultimedia: false,
    hasMentorship: false,
  },
  {
    id: 11,
    title: 'STEM Innovators Fair',
    category: 'Multi-Subject',
    date: 'August 1, 2025',
    deadline: 'July 15, 2025',
    description: 'A project-based competition where teams develop innovative projects that cut across Science, Technology, Engineering, and Maths. Submissions can be physical prototypes or digital simulations.',
    eligibility: 'SS1 - SS3 Students (Teams of 2-4)',
    prizes: ['N1,500,000 project grant for the winning team', 'Mentorship and incubation at a leading Nigerian innovation hub', 'Featured exhibition at the National Science and Technology Week'],
    region: 'Nigeria',
    format: 'team-based',
    allowMultimedia: true,
    hasMentorship: true,
  },
  {
    id: 12,
    title: 'King\'s vs Queen\'s Annual Debate Championship',
    category: 'Debate',
    date: 'September 10, 2024',
    deadline: 'August 25, 2024',
    description: 'The most anticipated inter-school debate of the year. Witness the clash of wits as King\'s College and Queen\'s College battle for the coveted championship trophy on the topic: "Has technology done more good than harm for Nigerian youth?"',
    eligibility: 'Selected students from King\'s College and Queen\'s College',
    prizes: ['Championship Trophy', 'N2,000,000 for the winning school', 'Bragging Rights'],
    region: 'Lagos',
    format: 'inter-school',
    allowMultimedia: false,
    hasMentorship: true,
    participatingSchools: [
      {
        schoolId: 1, // King's College
        students: [
          { id: 101 }, // Adebayo T.
          { id: 103 }, // Musa I.
          { id: 106 }, // Tunde Bakare
          { id: 107 }, // Femi Adeoye
        ],
      },
      {
        schoolId: 2, // Queen's College
        students: [
          { id: 102 }, // Chidinma O.
          { id: 105 }, // Emeka A.
          { id: 108, isDisqualified: true }, // Aisha Bello
          { id: 109 }, // Funke Williams
        ],
      },
    ],
  },
];

export const courses: Course[] = [
  {
    id: 1,
    title: 'Social Entrepreneurship 101: Building Your Impact Project',
    category: 'Social Impact',
    instructor: 'Ms. Adaobi Okonjo',
    duration: '6 Weeks',
    description: 'Learn how to identify community needs, design innovative solutions, and create a compelling pitch for your social impact idea. This course is the perfect launchpad for the "Naija Innovate Fest".',
    modules: [
      { title: 'Module 1: Identifying a Community Problem', content: 'Techniques for research and needs assessment.' },
      { title: 'Module 2: Ideation & Solution Design', content: 'Brainstorming and developing a viable solution.' },
      { title: 'Module 3: Prototyping Your Idea', content: 'Creating a basic model or digital mockup of your solution.' },
      { title: 'Module 4: The Art of the Pitch', content: 'Crafting a persuasive presentation to attract support.' },
      { title: 'Final Project: Pitch Your Social Venture', content: 'Develop and present a complete project proposal.' }
    ]
  },
  {
    id: 2,
    title: 'Intro to Immersive Worlds: AR & VR Design',
    category: 'Technology',
    instructor: 'Engr. David Musa',
    duration: '8 Weeks',
    description: 'Explore the future of digital interaction. This course introduces the fundamental concepts of Augmented and Virtual Reality, guiding you to conceptualize your own immersive educational experiences for the "Virtual Voyager Challenge".',
    modules: [
      { title: 'Module 1: What are AR & VR?', content: 'Understanding the key differences and technologies.' },
      { title: 'Module 2: Principles of UX for Immersive Tech', content: 'Designing user-friendly virtual experiences.' },
      { title: 'Module 3: Storyboarding an AR/VR Project', content: 'Visually planning your immersive world.' },
      { title: 'Module 4: Tools of the Trade', content: 'An overview of beginner-friendly creation platforms.' },
      { title: 'Final Project: Concept for an AR/VR App', content: 'Design a detailed proposal for an educational app.' }
    ]
  },
  {
    id: 3,
    title: 'Digital Griot: Podcasting Nigerian History',
    category: 'Cultural Heritage',
    instructor: 'Dr. Bolanle Adeyemi',
    duration: '5 Weeks',
    description: 'Become a modern-day storyteller. Learn how to research Nigerian history, script compelling narratives, and produce your own podcast series. Ideal for participants in the "Legacy Keepers Quest" and "Digital Griot Contest".',
    modules: [
      { title: 'Module 1: Finding the Story', content: 'Researching historical events and cultural folklore.' },
      { title: 'Module 2: Scripting for Audio', content: 'Writing engaging narratives for listeners.' },
      { title: 'Module 3: Recording & Sound Design', content: 'Basics of audio recording and editing.' },
      { title: 'Module 4: Publishing Your Podcast', content: 'How to share your stories with the world.' },
      { title: 'Final Project: Produce a 5-Minute Podcast Episode', content: 'Create a short historical narrative podcast.' }
    ]
  },
  {
    id: 4,
    title: 'The Catalyst Lab: Interdisciplinary Problem Solving',
    category: 'Interdisciplinary',
    instructor: 'Prof. Funke Akintola',
    duration: '4 Weeks',
    description: 'Break down the barriers between subjects. This workshop teaches you how to combine principles from science, arts, and ethics to tackle complex problems, providing the perfect mindset for "The Catalyst Challenge".',
    modules: [
      { title: 'Module 1: What is Interdisciplinary Thinking?', content: 'Connecting ideas from different fields.' },
      { title: 'Module 2: Systems Thinking for Big Problems', content: 'Understanding the interconnected parts of a challenge.' },
      { title: 'Module 3: The Role of Ethics in Innovation', content: 'Considering the human impact of new solutions.' },
      { title: 'Module 4: Collaborative Project Design', content: 'Working in diverse teams to create a holistic solution.' }
    ]
  },
  {
    id: 5,
    title: 'AI for Beginners: From Data to Discovery',
    category: 'Technology',
    instructor: 'Dr. Chinedu Eke',
    duration: '7 Weeks',
    description: 'A hands-on introduction to the world of Artificial Intelligence and Data Science. Learn how to analyze datasets and build simple predictive models. This course is designed to give you the foundational skills needed for the "Code Weavers Hackathon".',
    modules: [
      { title: 'Module 1: What is AI and Data Science?', content: 'Understanding the core concepts and real-world applications.' },
      { title: 'Module 2: Collecting and Cleaning Data', content: 'Learning the basics of preparing data for analysis.' },
      { title: 'Module 3: Introduction to Data Visualization', content: 'How to tell stories with data using charts and graphs.' },
      { title: 'Module 4: Building Your First Machine Learning Model', content: 'A step-by-step guide to creating a simple predictive model.' },
      { title: 'Module 5: Ethics in AI', content: 'Discussing the importance of fairness and responsibility in AI.' },
      { title: 'Final Project: Analyze a Local Dataset', content: 'Apply your new skills to a dataset relevant to your community.' }
    ]
  },
  {
    id: 6,
    title: 'Leadership in Action: Mastering Critical Skills',
    category: 'Leadership',
    instructor: 'Chief (Mrs.) Funmilayo Ransome',
    duration: '5 Weeks',
    description: 'Step into the shoes of a leader. This course uses simulations and case studies to teach critical thinking, effective communication, and ethical decision-making. Prepare yourself for the "Future Leaders Assembly".',
    modules: [
      { title: 'Module 1: The Modern Leader\'s Mindset', content: 'Exploring empathy, resilience, and vision.' },
      { title: 'Module 2: The Art of Persuasion and Public Speaking', content: 'Crafting and delivering compelling arguments.' },
      { title: 'Module 3: Solving Complex Problems Under Pressure', content: 'Frameworks for effective decision-making.' },
      { title: 'Module 4: Team Dynamics and Collaboration', content: 'How to motivate and lead a team successfully.' },
      { title: 'Final Simulation: The Community Crisis Challenge', content: 'Apply your skills in a realistic leadership scenario.' }
    ]
  },
  {
    id: 7,
    title: 'Eco-Warriors: Planning Your Green Project',
    category: 'Environment',
    instructor: 'Mr. Tunde Alakija',
    duration: '6 Weeks',
    description: 'Turn your passion for the planet into action. This course guides you through the process of planning, executing, and documenting an impactful environmental project, perfectly aligning with the "Green Guardians Eco-Challenge".',
    modules: [
      { title: 'Module 1: Understanding Local Environmental Issues', content: 'Researching and identifying key challenges in your community.' },
      { title: 'Module 2: Project Management for Eco-Initiatives', content: 'Setting goals, creating timelines, and managing resources.' },
      { title: 'Module 3: Community Mobilization and Awareness', content: 'How to get others involved in your cause.' },
      { title: 'Module 4: Measuring and Reporting Your Impact', content: 'Techniques for documenting the success of your project.' },
      { title: 'Final Project: Develop a Full Eco-Project Proposal', content: 'Create a comprehensive plan for a real-world environmental initiative.' }
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of EdTech in Nigeria',
    author: 'Dr. Amina Yusuf',
    date: 'July 25, 2024',
    excerpt: 'Exploring how technology is reshaping education for Nigerian students and how Brainer is leading the charge.',
    content: 'The educational landscape in Nigeria is undergoing a profound transformation, driven by the rapid adoption of technology. EdTech platforms are not just supplementary tools anymore; they are becoming integral to the learning process...',
    tags: ['EdTech', 'Nigeria', 'Innovation']
  },
  {
    id: 2,
    title: '5 Tips for Excelling in Academic Competitions',
    author: 'Tunde Adebayo, Catalyst Challenge Winner 2023',
    date: 'July 18, 2024',
    excerpt: 'A former winner shares his secrets to success, from effective study habits to mastering the art of teamwork.',
    content: 'Competing at a high level requires more than just intelligence. It demands strategy, resilience, and a smart approach to preparation. Here are five tips that helped my team win the Catalyst Challenge...',
    tags: ['Study Tips', 'Competitions', 'Success']
  },
  {
    id: 3,
    title: 'Why Interdisciplinary Skills Matter More Than Ever',
    author: 'The Brainer Team',
    date: 'July 10, 2024',
    excerpt: 'In today’s complex world, the ability to connect knowledge from different fields is a superpower. Learn why our competitions focus on interdisciplinary challenges.',
    content: 'The real-world problems we face today—from climate change to public health—do not fit neatly into one academic box. They require solutions that draw on science, arts, ethics, and technology. This is the philosophy behind competitions like The Catalyst Challenge...',
    tags: ['Skills', 'Future of Work', 'Education']
  }
];

export const badges: Badge[] = [
  { id: 1, name: 'First Steps', description: 'Registered for your first competition!', icon: '👣' },
  { id: 2, name: 'Eager Learner', description: 'Enrolled in your first course!', icon: '🎓' },
  { id: 3, name: 'Competitor', description: 'Registered for 3 competitions.', icon: '🏆' },
  { id: 4, name: 'Knowledge Seeker', description: 'Enrolled in 3 courses.', icon: '📚' },
  { id: 5, name: 'Brainiac', description: 'Earned over 1000 points!', icon: '🧠' },
];

export const resources: Resource[] = [
  {
    id: 1,
    title: 'Khan Academy: Algebra Basics',
    category: 'Mathematics',
    type: 'Video',
    description: 'A comprehensive video series covering the fundamentals of algebra, perfect for getting started.',
    url: 'https://www.khanacademy.org/math/algebra',
  },
  {
    id: 2,
    title: 'Past Questions: Nigerian National Science Fair 2023',
    category: 'Science',
    type: 'PDF',
    description: 'Download the official past questions from last year\'s national science competition to practice.',
    url: '#',
  },
  {
    id: 3,
    title: 'The Art of Public Speaking',
    category: 'Leadership',
    type: 'Article',
    description: 'An in-depth article with actionable tips for improving your public speaking and presentation skills.',
    url: '#',
  },
  {
    id: 4,
    title: 'Introduction to Python for Data Science',
    category: 'Technology',
    type: 'Video',
    description: 'A beginner-friendly video course on using Python for data analysis, a key skill for our tech challenges.',
    url: '#',
  },
   {
    id: 5,
    title: 'Guide to Effective Team Collaboration',
    category: 'Interdisciplinary',
    type: 'Article',
    description: 'Learn strategies for working effectively in a team, a crucial skill for most Brainer competitions.',
    url: '#',
  },
  {
    id: 6,
    title: 'Environmental Science Case Studies',
    category: 'Environment',
    type: 'PDF',
    description: 'A collection of case studies on successful eco-projects from around the world.',
    url: '#',
  }
];

// Mock users for leaderboard
export const mockUsers: User[] = [
    { id: 101, name: 'Adebayo T.', email: 'adebayo@example.com', points: 1250, badges: [1, 2, 3, 5], role: 'student', schoolId: 1, profilePictureUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Adebayo' },
    { id: 102, name: 'Chidinma O.', email: 'chidinma@example.com', points: 1100, badges: [1, 2, 4], role: 'student', schoolId: 2, profilePictureUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Chidinma' },
    { id: 103, name: 'Musa I.', email: 'musa@example.com', points: 950, badges: [1, 3], role: 'student', schoolId: 1 },
    { id: 104, name: 'Fatima S.', email: 'fatima@example.com', points: 800, badges: [2], role: 'student', schoolId: 3 },
    { id: 105, name: 'Emeka A.', email: 'emeka@example.com', points: 650, badges: [1], role: 'student', schoolId: 2 },
    { id: 106, name: 'Tunde Bakare', email: 'tunde@example.com', points: 720, badges: [1], role: 'student', schoolId: 1, profilePictureUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Tunde' },
    { id: 107, name: 'Femi Adeoye', email: 'femi@example.com', points: 680, badges: [1], role: 'student', schoolId: 1, profilePictureUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Femi' },
    { id: 108, name: 'Aisha Bello', email: 'aisha@example.com', points: 750, badges: [1, 2], role: 'student', schoolId: 2, profilePictureUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Aisha' },
    { id: 109, name: 'Funke Williams', email: 'funke@example.com', points: 810, badges: [1], role: 'student', schoolId: 2, profilePictureUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Funke' },
    { id: 201, name: 'Mr. Adekunle', email: 'admin@kingscollege.edu.ng', points: 0, badges: [], role: 'school_admin', schoolId: 1, profilePictureUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Adekunle' },
    { id: 202, name: 'Mrs. Okoro', email: 'admin@queenscollege.edu.ng', points: 0, badges: [], role: 'school_admin', schoolId: 2 },
];