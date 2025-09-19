import React, { useState } from 'react';
import { Course, View, User } from '../types';
import AIAssistantCourse from './AIAssistantCourse';
import { Bot } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  currentUser: User | null;
  isEnrolled: boolean;
  onEnroll: (courseId: number) => void;
  onNavigate: (view: View, courseId?: number) => void;
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

const CourseDetail: React.FC<CourseDetailProps> = ({ course, currentUser, isEnrolled, onEnroll, onNavigate }) => {
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  const handleEnrollmentClick = () => {
      if (!currentUser) {
          onNavigate(View.LOGIN);
      } else {
          onEnroll(course.id);
      }
  };

  const BookOpenIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
  const UserCircleIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  const CollectionIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
  
  return (
    <>
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="p-8">
        <button onClick={() => onNavigate(View.COURSE_LIST)} className="text-indigo-600 hover:underline dark:text-indigo-400 mb-6 text-sm font-semibold">&larr; Back to all courses</button>
        <div className="border-b dark:border-gray-700 pb-6">
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/50 py-1 px-3 rounded-full">{course.category}</span>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-3">{course.title}</h1>
            <p className="mt-2 text-lg font-semibold text-green-600 dark:text-green-400">Start Date: Coming Soon</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-0">
        <div className="md:col-span-2 p-8">
            <DetailSection title="About this Course" icon={BookOpenIcon}>
                <p>{course.description}</p>
            </DetailSection>

            <DetailSection title="Your Instructor" icon={UserCircleIcon}>
                <p className="font-semibold">{course.instructor}</p>
            </DetailSection>

            <DetailSection title="Course Modules" icon={CollectionIcon}>
                <ul className="space-y-3">
                    {course.modules.map((module, index) => 
                        <li key={index} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{module.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{module.content}</p>
                        </li>
                    )}
                </ul>
            </DetailSection>
        </div>
        <div className="p-8 bg-slate-50 dark:bg-gray-800/50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800">
            <div className="bg-white dark:bg-gray-900/50 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-inner">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Start Learning Today</h3>
                {isEnrolled ? (
                    <div className="w-full text-center p-4 rounded-md bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 font-semibold space-y-4">
                        <p>You are enrolled! Happy learning!</p>
                        <button 
                          onClick={() => setIsTutorOpen(true)}
                          className="w-full bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-600 transition-transform transform hover:scale-105 duration-300 shadow-lg text-lg flex items-center justify-center gap-2"
                        >
                          <Bot className="h-5 w-5" />
                          <span>Ask AI Tutor</span>
                        </button>
                    </div>
                ) : (
                    <button 
                    onClick={handleEnrollmentClick}
                    className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 duration-300 shadow-lg text-lg"
                    >
                    {currentUser ? 'Enroll Now' : 'Login to Enroll'}
                    </button>
                )}
                {!currentUser && <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">You must be logged in to enroll in courses.</p>}
            </div>
        </div>
      </div>
    </div>
    {isTutorOpen && <AIAssistantCourse course={course} onClose={() => setIsTutorOpen(false)} />}
    </>
  );
};

export default CourseDetail;