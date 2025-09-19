

import React from 'react';
import { Competition, View } from '../types';
// FIX: Imported Variants type from framer-motion to correctly type animation variants.
import { motion, type Variants } from 'framer-motion';

interface CompetitionCardProps {
  competition: Competition;
  onNavigate: (view: View, competitionId: number) => void;
}

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1]
    }
  }
};

const CategoryBadge: React.FC<{category: string}> = ({ category }) => {
    // A more professional and harmonious color palette
    const colors: {[key: string]: string} = {
        'Interdisciplinary': 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
        'Social Impact': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
        'Cultural Heritage': 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
        'Creative Arts': 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
        'Environment': 'bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-300',
        'Technology': 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
        'Leadership': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    };
    return (
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${colors[category] || 'bg-gray-100 text-gray-800'}`}>
            {category}
        </span>
    );
};

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition, onNavigate }) => {
  return (
    <motion.div 
      variants={cardVariants}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col border border-gray-200 dark:border-gray-800 hover:shadow-emerald-500/20 dark:hover:shadow-emerald-400/10 hover:shadow-xl"
    >
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
            <CategoryBadge category={competition.category} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{competition.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">{competition.description}</p>
        <div className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" /></svg>
          <span>Coming Soon</span>
        </div>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <button 
          onClick={() => onNavigate(View.COMPETITION_DETAIL, competition.id)}
          className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default CompetitionCard;
