import React, { useState, useRef } from 'react';
import { Competition, Course, View, User, Badge } from '../types';
import AIAssistant from './AIAssistant';
import AIAssistantCourse from './AIAssistantCourse';
import ShareButtons from './ShareButtons';
import { motion } from 'framer-motion';
import { User as UserIcon } from 'lucide-react';

interface StudentDashboardProps {
  currentUser: User;
  registeredCompetitions: Competition[];
  enrolledCourses: Course[];
  allBadges: Badge[];
  onNavigate: (view: View) => void;
  onUploadProfilePicture: (userId: number, pictureUrl: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ currentUser, registeredCompetitions, enrolledCourses, allBadges, onNavigate, onUploadProfilePicture }) => {
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const profilePicInputRef = useRef<HTMLInputElement>(null);

  const openAIAssistant = (competition: Competition) => {
    setSelectedCompetition(competition);
  };

  const closeAIAssistant = () => {
    setSelectedCompetition(null);
  };
  
  const openAITutor = (course: Course) => {
    setSelectedCourse(course);
  };

  const closeAITutor = () => {
    setSelectedCourse(null);
  };

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            onUploadProfilePicture(currentUser.id, reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const userBadges = allBadges.filter(badge => currentUser.badges.includes(badge.id));

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 flex flex-col items-center gap-4">
            <div className="relative group">
                {currentUser.profilePictureUrl ? (
                    <img src={currentUser.profilePictureUrl} alt={currentUser.name} className="h-28 w-28 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg" />
                ) : (
                    <div className="h-28 w-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg">
                        <UserIcon className="h-16 w-16 text-gray-500" />
                    </div>
                )}
                <button 
                    onClick={() => profilePicInputRef.current?.click()} 
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Upload profile picture"
                >
                    Upload
                </button>
                <input type="file" ref={profilePicInputRef} onChange={handleProfilePicChange} accept="image/*" className="hidden" />
            </div>
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">My Dashboard</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">Welcome back, {currentUser.name}! Track your progress and get ready to shine.</p>
            </div>
        </div>
        
        {/* Gamification Stats */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Your Progress</h2>
                <p className="text-indigo-600 dark:text-indigo-400 font-extrabold text-6xl mt-2 tracking-tighter">{currentUser.points.toLocaleString()}</p>
                <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">Points Earned</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Your Badges ({userBadges.length})</h2>
                {userBadges.length > 0 ? (
                <div className="flex flex-wrap gap-3 items-center">
                    {userBadges.map((badge, index) => (
                        <motion.div 
                          key={badge.id} 
                          className="text-center group relative cursor-pointer"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        >
                            <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-4xl shadow-inner group-hover:bg-amber-100 dark:group-hover:bg-amber-800/50 transition-colors">
                                {badge.icon}
                            </div>
                            <div className="absolute bottom-full mb-2 w-48 bg-gray-800 dark:bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-gray-800 dark:before:border-t-gray-900">
                                <p className="font-bold text-amber-300">{badge.name}</p>
                                <p>{badge.description}</p>
                            </div>
                        </motion.div>
                    ))}
                    <ShareButtons text={`I've earned ${userBadges.length} badges on Brainer! Come join the challenge.`} />
                </div>
                 ) : (
                    <p className="text-gray-500 dark:text-gray-400">Start competing and learning to earn badges!</p>
                 )}
            </motion.div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Competitions Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-b-2 border-indigo-500 pb-2">My Competitions</h2>
                {registeredCompetitions.length > 0 ? (
                  <div className="space-y-4">
                    {registeredCompetitions.map(comp => (
                      <div key={comp.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{comp.title}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{comp.category} - Coming Soon</p>
                        </div>
                        <button 
                          onClick={() => openAIAssistant(comp)}
                          className="bg-teal-500 text-white font-semibold py-2 px-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center space-x-2 text-sm"
                          aria-label={`Get AI study coach for ${comp.title}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                          <span>AI Coach</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Competitions Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">You haven't signed up for any competitions.</p>
                  </div>
                )}
            </div>

            {/* Courses Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-b-2 border-purple-500 pb-2">My Courses</h2>
                {enrolledCourses.length > 0 ? (
                    <div className="space-y-4">
                        {enrolledCourses.map(course => {
                            const totalModules = course.modules.length;
                            // Simple deterministic simulation of progress for visual representation
                            const completedModules = (course.id * 3) % (totalModules + 1); 
                            const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

                            return (
                                <div key={course.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{course.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{course.category} - Starts Soon</p>
                                    
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Progress ({completedModules}/{totalModules} modules)</span>
                                            <span className="text-xs font-bold text-purple-700">{progressPercent}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-3 border-t dark:border-gray-700 flex items-center justify-end">
                                        <button 
                                          onClick={() => openAITutor(course)}
                                          className="bg-purple-500 text-white font-semibold py-2 px-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2 text-sm"
                                          aria-label={`Get AI tutor for ${course.title}`}
                                        >
                                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                          <span>AI Tutor</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Courses Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">You haven't enrolled in any courses.</p>
                    </div>
                )}
            </div>
        </div>

        <div className="mt-16 pt-8 border-t-2 border-gray-200 dark:border-gray-700 border-dashed text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Ready for more?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">Continue your journey by exploring more challenges and learning opportunities on Brainer.</p>
            <div className="flex justify-center flex-wrap gap-4">
                <button 
                onClick={() => onNavigate(View.COMPETITION_LIST)}
                className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                >
                Explore All Competitions
                </button>
                <button 
                onClick={() => onNavigate(View.COURSE_LIST)}
                className="bg-white text-indigo-600 border-2 border-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-transform transform hover:scale-105 duration-300 dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700"
                >
                Browse All Courses
                </button>
            </div>
        </div>

      </div>

      {selectedCompetition && (
        <AIAssistant competition={selectedCompetition} onClose={closeAIAssistant} />
      )}
      {selectedCourse && (
        <AIAssistantCourse course={selectedCourse} onClose={closeAITutor} />
      )}
    </>
  );
};

export default StudentDashboard;
