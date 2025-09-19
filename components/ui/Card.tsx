import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  delay?: number;
}

const Card: React.FC<CardProps> = ({ icon, title, value, delay = 0 }) => {
  return (
    <motion.div
// FIX: Correctly pass framer-motion props to resolve type errors.
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-gray-700">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </motion.div>
  );
};

export default Card;
