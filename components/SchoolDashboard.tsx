import React, { useState, useMemo, useRef } from 'react';
import { User, School, Registration, Competition, View, SubscriptionPlan } from '../types';
import Card from './ui/Card';
import { Building, Users, Trophy, Lock, BarChart2 } from 'lucide-react';

const PlanDisplay: React.FC<{ plan: SubscriptionPlan, onUpgradeClick: () => void }> = ({ plan, onUpgradeClick }) => {
    const planColors = {
        Free: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        Basic: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
        Premium: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    };
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">
                You are currently on the <span className={`font-bold px-2 py-1 rounded-md ${planColors[plan]}`}>{plan}</span> plan.
            </p>
            {plan !== 'Premium' && (
                <button onClick={onUpgradeClick} className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Upgrade Plan &rarr;
                </button>
            )}
        </div>
    );
};

interface SchoolDashboardProps {
    currentUser: User;
    school: School;
    students: User[];
    registrations: Map<number, Registration[]>;
    competitions: Competition[];
    onNavigate: (view: View) => void;
    onBulkRegister: (competitionId: number, studentIds: number[], discountCode: string) => void;
    onApproveStudent: (studentId: number, isApproved: boolean) => void;
    onUpgradePlan: (newPlan: SubscriptionPlan) => void;
    onUploadLogo: (schoolId: number, logoUrl: string) => void;
}

const BulkRegister: React.FC<{
    competitions: Competition[];
    students: User[];
    registrations: Map<number, Registration[]>;
    onBulkRegister: (competitionId: number, studentIds: number[], discountCode: string) => void;
}> = ({ competitions, students, registrations, onBulkRegister }) => {
    const [selectedCompetitionId, setSelectedCompetitionId] = useState<string>('');
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
    const [discountCode, setDiscountCode] = useState('');

    const unregisteredStudents = useMemo(() => {
        if (!selectedCompetitionId) return [];
        const competitionIdNum = parseInt(selectedCompetitionId, 10);
        
        const studentIdsInComp = new Set<number>();
        registrations.forEach((regs, studentId) => {
            if (regs.some(r => r.competitionId === competitionIdNum && r.status === 'paid')) {
                 const student = students.find(s => s.id === studentId);
                 if (student) studentIdsInComp.add(student.id);
            }
        });
        
        return students.filter(s => !studentIdsInComp.has(s.id));

    }, [selectedCompetitionId, students, registrations]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedStudentIds(unregisteredStudents.map(s => s.id));
        } else {
            setSelectedStudentIds([]);
        }
    };
    
    const handleStudentSelect = (studentId: number) => {
        setSelectedStudentIds(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSubmit = () => {
        if (selectedCompetitionId && selectedStudentIds.length > 0) {
            onBulkRegister(parseInt(selectedCompetitionId, 10), selectedStudentIds, discountCode);
            setSelectedStudentIds([]);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="competition-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Competition</label>
                    <select
                        id="competition-select"
                        value={selectedCompetitionId}
                        onChange={e => {
                            setSelectedCompetitionId(e.target.value);
                            setSelectedStudentIds([]);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="" disabled>-- Choose a competition --</option>
                        {competitions.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Code (optional)</label>
                    <input
                        type="text"
                        id="discount-code"
                        value={discountCode}
                        onChange={e => setDiscountCode(e.target.value)}
                        placeholder="e.g., SCHOOLABC-10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
            </div>

            {selectedCompetitionId && (
                <div className="mt-6 border-t dark:border-gray-700 pt-4">
                    <h4 className="font-semibold mb-2">Select students to register:</h4>
                    {unregisteredStudents.length > 0 ? (
                        <>
                            <div className="max-h-60 overflow-y-auto border dark:border-gray-600 rounded-md p-2 space-y-2">
                                <div className="flex items-center p-2">
                                    <input type="checkbox" id="select-all" onChange={handleSelectAll} checked={unregisteredStudents.length > 0 && selectedStudentIds.length === unregisteredStudents.length} className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                    <label htmlFor="select-all" className="ml-3 text-sm font-bold">Select All</label>
                                </div>
                                {unregisteredStudents.map(student => (
                                    <div key={student.id} className="flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <input type="checkbox" id={`student-${student.id}`} checked={selectedStudentIds.includes(student.id)} onChange={() => handleStudentSelect(student.id)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                        <label htmlFor={`student-${student.id}`} className="ml-3 text-sm">{student.name}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-sm font-semibold">{selectedStudentIds.length} student(s) selected</p>
                                <button
                                    onClick={handleSubmit}
                                    disabled={selectedStudentIds.length === 0}
                                    className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
                                >
                                    Register Selected
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 py-4">All your approved students are registered for this competition!</p>
                    )}
                </div>
            )}
        </div>
    );
};


const SchoolDashboard: React.FC<SchoolDashboardProps> = ({ school, students, registrations, competitions, onNavigate, onBulkRegister, onApproveStudent, onUpgradePlan, onUploadLogo }) => {
    
    const logoInputRef = useRef<HTMLInputElement>(null);

    const getStudentLimit = (plan: SubscriptionPlan) => {
        switch(plan) {
            case 'Free': return 50;
            case 'Basic': return 200;
            case 'Premium': return Infinity;
            default: return 50;
        }
    };
    const studentLimit = getStudentLimit(school.subscriptionPlan);

    const pendingStudents = useMemo(() => students.filter(s => s.isApprovedBySchool === false), [students]);
    const approvedStudents = useMemo(() => students.filter(s => s.isApprovedBySchool !== false), [students]);

    const getStudentRegistrations = (studentId: number) => {
        const studentRegs = registrations.get(studentId) || [];
        return studentRegs
            .filter(reg => reg.status === 'paid')
            .map(reg => competitions.find(c => c.id === reg.competitionId))
            .filter((c): c is Competition => c !== undefined);
    };
    
    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUploadLogo(school.id, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const totalStudents = approvedStudents.length;
    const totalRegistrations = approvedStudents.reduce((acc, student) => acc + (registrations.get(student.id)?.filter(r => r.status === 'paid').length || 0), 0);
    const uniqueCompetitions = new Set(
        approvedStudents.flatMap(student => getStudentRegistrations(student.id).map(c => c.title))
    ).size;
        
    const isAtStudentLimit = totalStudents >= studentLimit;

    const competitionBreakdown = useMemo(() => {
        const breakdown = new Map<string, number>();
        const schoolStudentIds = new Set(approvedStudents.map(s => s.id));

        competitions.forEach(comp => {
            let count = 0;
            registrations.forEach((regs, studentId) => {
                if (schoolStudentIds.has(studentId)) {
                    if (regs.some(r => r.competitionId === comp.id && r.status === 'paid')) {
                        count++;
                    }
                }
            });
            if (count > 0) {
                breakdown.set(comp.title, count);
            }
        });

        // Sort by number of registrations, descending
        return Array.from(breakdown.entries()).sort(([, countA], [, countB]) => countB - countA);
    }, [approvedStudents, registrations, competitions]);

    const topStudents = useMemo(() => {
        return [...approvedStudents].sort((a, b) => b.points - a.points).slice(0, 10);
    }, [approvedStudents]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 flex flex-col items-center gap-4">
                {school.logoUrl ? (
                    <img src={school.logoUrl} alt={`${school.name} logo`} className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg" />
                ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg">
                        <Building className="h-12 w-12 text-gray-500" />
                    </div>
                )}
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">{school.name} Dashboard</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Manage your students and track their progress.</p>
                     <button onClick={() => logoInputRef.current?.click()} className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                        {school.logoUrl ? 'Change Logo' : 'Upload Logo'}
                    </button>
                    <input type="file" ref={logoInputRef} onChange={handleLogoChange} accept="image/*" className="hidden" />
                </div>
            </div>
            
            <PlanDisplay plan={school.subscriptionPlan} onUpgradeClick={() => onNavigate(View.PRICING)} />

            {/* Pending Approvals Section */}
            {pendingStudents.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Pending Student Approvals ({pendingStudents.length})</h2>
                    {isAtStudentLimit && (
                        <div className="bg-amber-50 dark:bg-amber-900/40 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200 p-4 mb-4 rounded-md">
                            <p><span className="font-bold">Student Limit Reached!</span> Your '{school.subscriptionPlan}' plan is limited to {studentLimit} students. Please upgrade your plan to approve more.</p>
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Student Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingStudents.map(student => (
                                        <tr key={student.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {student.name}
                                            </th>
                                            <td className="px-6 py-4">{student.email}</td>
                                            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                                <button onClick={() => onApproveStudent(student.id, true)} disabled={isAtStudentLimit} className="font-semibold text-green-600 dark:text-green-500 hover:underline px-2 py-1 rounded-md hover:bg-green-50 dark:hover:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline">Approve</button>
                                                <button onClick={() => onApproveStudent(student.id, false)} className="font-semibold text-red-600 dark:text-red-500 hover:underline px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/50">Reject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}


            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card icon={<Users className="text-indigo-500" />} title="Total Approved Students" value={`${totalStudents} / ${studentLimit === Infinity ? 'Unlimited' : studentLimit}`} />
                <Card icon={<Trophy className="text-amber-500" />} title="Total Competition Entries" value={totalRegistrations.toString()} />
                <Card icon={<BarChart2 className="text-emerald-500" />} title="Competitions Involved In" value={uniqueCompetitions.toString()} />
            </div>
            
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Competition Enrollment Summary Section */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Competition Enrollment Summary</h2>
                    {school.subscriptionPlan === 'Free' ? (
                        <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 text-center overflow-hidden h-full flex flex-col justify-center">
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>
                            <div className="relative z-20 flex flex-col items-center">
                                <Lock className="w-12 h-12 text-amber-400 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Unlock Analytics</h3>
                                <p className="text-gray-300 max-w-md mx-auto mb-6">Upgrade to Basic or Premium to see enrollment insights.</p>
                                <button onClick={() => onNavigate(View.PRICING)} className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600 transition-colors">Upgrade Plan</button>
                            </div>
                        </div>
                    ) : competitionBreakdown.length > 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full">
                             {school.subscriptionPlan === 'Basic' && (
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-center rounded-t-lg">
                                    <p className="text-sm text-indigo-800 dark:text-indigo-200">Upgrade to <span className="font-bold">Premium</span> for advanced analytics.</p>
                                </div>
                             )}
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                                {competitionBreakdown.map(([title, count]) => (
                                    <li key={title} className="px-6 py-4 flex justify-between items-center">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{title}</p>
                                        <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 font-bold px-3 py-1 rounded-full text-sm">
                                            {count} {count > 1 ? 'students' : 'student'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
                            No students are registered for any competitions yet.
                        </div>
                    )}
                </div>

                {/* School Leaderboard */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Top Students in Your School</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                         <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {topStudents.length > 0 ? topStudents.map((user, index) => (
                                 <li key={user.id} className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className={`font-bold w-8 text-center text-lg ${index < 3 ? 'text-amber-500' : 'text-gray-400'}`}>
                                            {index + 1}
                                        </span>
                                        <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                                    </div>
                                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{user.points} pts</span>
                                 </li>
                            )) : (
                                <li className="px-6 py-8 text-center text-gray-500">No student data to display.</li>
                            )}
                         </ul>
                    </div>
                </div>
            </div>

            {/* Bulk Registration Section */}
             <div className="my-12">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Register Students for Competitions</h2>
                {school.subscriptionPlan !== 'Premium' ? (
                     <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 text-center overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>
                        <div className="relative z-20 flex flex-col items-center">
                            <Lock className="w-12 h-12 text-amber-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Unlock Bulk Registration</h3>
                            <p className="text-gray-300 max-w-md mx-auto mb-6">Save time by registering multiple students at once. Upgrade to our Premium plan to access this feature.</p>
                            <button onClick={() => onNavigate(View.PRICING)} className="bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-600 transition-colors">Upgrade to Premium</button>
                        </div>
                    </div>
                ) : (
                    <BulkRegister 
                        competitions={competitions}
                        students={approvedStudents}
                        registrations={registrations}
                        onBulkRegister={onBulkRegister}
                    />
                )}
            </div>

            {/* Students Table */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Approved Students</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Student Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Points</th>
                                    <th scope="col" className="px-6 py-3">Registered Competitions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedStudents.length > 0 ? approvedStudents.map(student => {
                                    const studentComps = getStudentRegistrations(student.id);
                                    return (
                                        <tr key={student.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {student.name}
                                            </th>
                                            <td className="px-6 py-4">{student.email}</td>
                                            <td className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-400">{student.points}</td>
                                            <td className="px-6 py-4">
                                                {studentComps.length > 0 ? studentComps.map(c => c.title).join(', ') : 'None'}
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-8">No approved students have registered from your school yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
             <div className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-700 border-dashed text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Want to enroll more students?</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">Share the registration link with your students or contact us for bulk enrollment options.</p>
                <button 
                onClick={() => onNavigate(View.CONTACT)}
                className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                >
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default SchoolDashboard;