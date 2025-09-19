
import React from 'react';
import { Competition, View, User, SubscriptionPlan } from '../types';
import { Users, Film, Award, UserCheck, Calendar, ClipboardList, Trophy, GraduationCap, Briefcase, Banknote, Laptop, AlarmClock } from 'lucide-react';

interface CompetitionDetailProps {
  competition: Competition;
  currentUser: User | null;
  isRegistered: boolean;
  onRegister: (competitionId: number) => void;
  onNavigate: (view: View, competitionId?: number) => void;
  subscriptionPlan?: SubscriptionPlan;
}

const DetailSection: React.FC<{title: string; children: React.ReactNode, icon: React.ReactNode}> = ({ title, children, icon }) => (
    <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
            {icon}
            <span className="ml-3">{title}</span>
        </h3>
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed pl-9 border-l-2 border-slate-200 dark:border-gray-700">
            {children}
        </div>
    </div>
);

const CompetitionDetail: React.FC<CompetitionDetailProps> = ({ competition, currentUser, isRegistered, onRegister, onNavigate, subscriptionPlan }) => {
  
  const handleRegistrationClick = () => {
      onRegister(competition.id);
  };
  
  const getPrizeIcon = (prize: string) => {
    const lowerPrize = prize.toLowerCase();
    if (lowerPrize.includes('grant') || lowerPrize.includes('funding') || lowerPrize.includes('cash') || lowerPrize.includes('n1,000,000') || lowerPrize.includes('n500,000') || lowerPrize.includes('n750,000') || lowerPrize.includes('n1,500,000') || lowerPrize.includes('n250,000')) return <Banknote className="h-5 w-5" />;
    if (lowerPrize.includes('mentorship') || lowerPrize.includes('ceo') || lowerPrize.includes('incubation')) return <Briefcase className="h-5 w-5" />;
    if (lowerPrize.includes('scholarship')) return <GraduationCap className="h-5 w-5" />;
    if (lowerPrize.includes('laptop') || lowerPrize.includes('equipment') || lowerPrize.includes('vr headset')) return <Laptop className="h-5 w-5" />;
    return <Trophy className="h-5 w-5" />;
  };
  
  // Calculates the number of days remaining until the registration deadline.
  // Returns an object with the number of days and a display-friendly text.
  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    deadlineDate.setHours(0,0,0,0);
    now.setHours(0,0,0,0);

    const diffTime = deadlineDate.getTime() - now.getTime();
    if (diffTime < 0) return { days: -1, text: 'Deadline has passed' };
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return { days: 0, text: 'Deadline is today!' };
    return { days: diffDays, text: `${diffDays} day${diffDays !== 1 ? 's' : ''} left` };
  };

  const deadlineInfo = getDaysRemaining(competition.deadline);
  
  // Determines the registration fee based on the user's status and school's subscription plan.
  const getRegistrationFee = () => {
    const INDIVIDUAL_FEE = 10000;
    const SCHOOL_BASE_FEE = 5000;
    
    if (!currentUser || !currentUser.schoolId) return INDIVIDUAL_FEE;

    switch (subscriptionPlan) {
      case 'Basic': return SCHOOL_BASE_FEE * 0.8; // 20% discount
      case 'Premium': return SCHOOL_BASE_FEE * 0.5; // 50% discount
      case 'Free':
      default:
        return SCHOOL_BASE_FEE;
    }
  };
  const registrationFee = getRegistrationFee();


  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="p-8">
            <button onClick={() => onNavigate(View.COMPETITION_LIST)} className="text-indigo-600 hover:underline dark:text-indigo-400 mb-6 text-sm font-semibold">&larr; Back to all competitions</button>
            <div className="border-b dark:border-gray-700 pb-6">
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/50 py-1 px-3 rounded-full">{competition.category}</span>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-3">{competition.title}</h1>
                 <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full"><Users className="h-4 w-4 text-indigo-500" /> Format: <span className="font-semibold">{competition.format}</span></div>
                    {competition.hasMentorship && <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full"><Award className="h-4 w-4 text-amber-500" /> Mentorship Included</div>}
                    {competition.allowMultimedia && <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full"><Film className="h-4 w-4 text-rose-500" /> Multimedia Submissions</div>}
                </div>
            </div>
        </div>
      
        <div className="grid md:grid-cols-3">
            <div className="md:col-span-2 p-8">
                <DetailSection title="Description" icon={<ClipboardList className="h-6 w-6 text-indigo-500" />}>
                    <p>{competition.description}</p>
                </DetailSection>

                <DetailSection title="Eligibility" icon={<UserCheck className="h-6 w-6 text-indigo-500" />}>
                    <p>{competition.eligibility}</p>
                </DetailSection>

                <DetailSection title="Prizes & Awards" icon={<Trophy className="h-6 w-6 text-indigo-500" />}>
                    <ul className="space-y-4">
                        {competition.prizes.map((prize, index) => 
                            <li key={index} className="flex items-start">
                                <div className="flex-shrink-0 text-emerald-500 dark:text-emerald-400 mt-1">{getPrizeIcon(prize)}</div>
                                <span className="ml-3 text-gray-700 dark:text-gray-300">{prize}</span>
                            </li>
                        )}
                    </ul>
                </DetailSection>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-gray-800/50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800">
                <div>
                     <DetailSection title="Key Dates" icon={<Calendar className="h-6 w-6 text-indigo-500" />}>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Competition Date</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{competition.date}</p>
                            </div>
                            <div className="pt-3 border-t border-slate-200 dark:border-gray-700">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Registration Deadline</p>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{competition.deadline}</p>
                            </div>
                        </div>
                    </DetailSection>
                    
                     {deadlineInfo.days >= 0 && (
                        <div className={`mt-4 p-3 rounded-lg border flex items-center ${deadlineInfo.days <= 7 ? 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-700/50' : 'bg-amber-50 dark:bg-amber-900/40 border-amber-200 dark:border-amber-700/50'}`}>
                            <div className={`flex-shrink-0 ${deadlineInfo.days <= 7 ? 'text-red-500' : 'text-amber-500'}`}>
                                <AlarmClock className="h-6 w-6"/>
                            </div>
                            <div className="ml-3">
                                <p className={`font-bold text-lg ${deadlineInfo.days <= 7 ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300'}`}>{deadlineInfo.text}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">to register!</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-8 bg-white dark:bg-gray-900/50 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-inner">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Ready to Compete?</h3>
                    {isRegistered ? (
                        <div className="w-full text-center p-4 rounded-md bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 font-semibold">
                            You are registered! Good luck!
                        </div>
                    ) : deadlineInfo.days < 0 ? (
                         <div className="w-full text-center p-4 rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300 font-semibold">
                            Registration has closed.
                        </div>
                    ) : (
                        <button 
                        onClick={handleRegistrationClick}
                        className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 duration-300 shadow-lg text-lg"
                        >
                        {currentUser ? `Register Now (₦${registrationFee.toLocaleString()})` : 'Login to Register'}
                        </button>
                    )}
                    {!currentUser && deadlineInfo.days >= 0 && <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">You must be logged in to sign up for events.</p>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default CompetitionDetail;