import React from 'react';
import { Competition, School, User, View } from '../types';
import { Shield, Mic, Gavel, XOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

interface InterSchoolCompetitionBoardProps {
  competition: Competition;
  onNavigate: (view: View) => void;
  schools: School[];
  users: User[];
}

const SchoolCard: React.FC<{ school: School; students: (User | undefined)[]; disqualifiedStudents: (User | undefined)[] }> = ({ school, students, disqualifiedStudents }) => (
    <div className="flex flex-col items-center text-center">
        {school.logoUrl ? 
            <img src={school.logoUrl} alt={`${school.name} logo`} className="h-28 w-28 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg mb-4" />
            : <div className="h-28 w-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg mb-4 text-4xl font-bold">{school.name.substring(0,2)}</div>
        }
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{school.name}</h2>
        <p className="text-7xl font-extrabold text-indigo-500 dark:text-indigo-400 my-6">0</p>
        
        <div className="w-full bg-slate-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center justify-center"><Mic className="mr-2 h-5 w-5" /> Line-up</h3>
            <ul className="space-y-2">
                {students.map(student => student && (
                    <li key={student.id} className="text-gray-600 dark:text-gray-400 text-base">{student.name}</li>
                ))}
                {disqualifiedStudents.map(student => student && (
                     <li key={student.id} className="relative text-gray-500 dark:text-gray-500 text-base italic">
                        <span className="line-through">{student.name}</span>
                        <span className="absolute -top-1 -right-2 transform rotate-12 text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/50 px-2 py-0.5 rounded-md">DISQUALIFIED</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);


const InterSchoolCompetitionBoard: React.FC<InterSchoolCompetitionBoardProps> = ({ competition, onNavigate, schools, users }) => {

    if (!competition.participatingSchools || competition.participatingSchools.length < 2) {
        return <p>Competition data is incomplete.</p>;
    }

    const school1Data = competition.participatingSchools[0];
    const school2Data = competition.participatingSchools[1];

    const school1 = schools.find(s => s.id === school1Data.schoolId);
    const school2 = schools.find(s => s.id === school2Data.schoolId);
    
    const getStudentDetails = (studentInfo: { id: number; isDisqualified?: boolean }[]) => {
        const active = studentInfo.filter(s => !s.isDisqualified).map(s => users.find(u => u.id === s.id));
        const disqualified = studentInfo.filter(s => s.isDisqualified).map(s => users.find(u => u.id === s.id));
        return { active, disqualified };
    };
    
    const school1Students = getStudentDetails(school1Data.students);
    const school2Students = getStudentDetails(school2Data.students);

    if (!school1 || !school2) {
        return <p>School data could not be found.</p>;
    }

    const rules = [
        "Each speaker has 5 minutes for their main argument.",
        "Each team gets 3 minutes for rebuttal.",
        "A 2-minute closing statement is given by one speaker from each team.",
        "Points are awarded for clarity, evidence, and persuasiveness."
    ];

    const disqualifiers = [
        "Use of personal attacks or ad hominem fallacies.",
        "Plagiarism or presenting false evidence.",
        "Exceeding time limits after a formal warning.",
        "Unsportsmanlike conduct as determined by the judges."
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-12">
                    <button onClick={() => onNavigate(View.COMPETITION_LIST)} className="text-indigo-600 hover:underline dark:text-indigo-400 mb-4 text-sm font-semibold">&larr; Back to all competitions</button>
                    <span className="block text-sm font-semibold text-emerald-600 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/50 py-1 px-3 rounded-full inline-block">{competition.category}</span>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-3">{competition.title}</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{competition.date}</p>
                </div>

                <div className="grid md:grid-cols-2 items-start gap-12 relative">
                    <div className="hidden md:flex absolute inset-0 items-center justify-center">
                        <span className="text-5xl font-black text-gray-300 dark:text-gray-700 select-none">VS</span>
                    </div>
                    <SchoolCard school={school1} students={school1Students.active} disqualifiedStudents={school1Students.disqualified} />
                    <SchoolCard school={school2} students={school2Students.active} disqualifiedStudents={school2Students.disqualified} />
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                 <div className="mt-16 grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border dark:border-gray-800">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center"><Gavel className="mr-2 h-5 w-5 text-indigo-500"/> Match Rules</h3>
                        <ul className="space-y-2">
                            {rules.map((rule, index) => (
                                <li key={index} className="flex items-start">
                                    <Shield className="h-4 w-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-400">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center"><XOctagon className="mr-2 h-5 w-5 text-red-500"/> Disqualification Clauses</h3>
                        <ul className="space-y-2">
                            {disqualifiers.map((clause, index) => (
                                <li key={index} className="flex items-start">
                                    <XOctagon className="h-4 w-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-400">{clause}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InterSchoolCompetitionBoard;
