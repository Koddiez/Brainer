import React, { useState, useMemo } from 'react';
import { Course, View } from '../types';
import CourseCard from './CourseCard';
import CourseCardSkeleton from './skeletons/CourseCardSkeleton';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

interface CourseListProps {
  courses: Course[];
  onNavigate: (view: View, courseId: number) => void;
  isLoading: boolean;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onNavigate, isLoading }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => ['All', ...Array.from(new Set(courses.map(c => c.category)))], [courses]);

  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        if (activeFilter === 'All') return true;
        return course.category === activeFilter;
      })
      .filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [courses, activeFilter, searchQuery]);

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Explore Our Courses</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Level up your skills with expert-led courses designed for success.</p>
      </div>

      <div className="mb-12 flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg">
        <div className="w-full max-w-lg">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            aria-label="Search courses"
          />
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ${
                activeFilter === category
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <CourseCardSkeleton key={i} />)}
        </div>
      ) : (
        <motion.div 
// FIX: Correctly pass framer-motion props to resolve type errors.
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} onNavigate={onNavigate} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No Courses Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CourseList;
