import React from 'react';
import { User } from '../types';
import LeaderboardSkeleton from './skeletons/LeaderboardSkeleton';
// FIX: Import `Variants` from framer-motion and explicitly type animation variants to resolve type errors.
import { motion, type Variants } from 'framer-motion';

interface LeaderboardPageProps {
  users: User[];
  isLoading: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ users, isLoading }) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">Leaderboard</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400">See who's at the top of their game. Keep learning and competing to climb the ranks!</p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : (
          <motion.ul
            className="divide-y divide-gray-200 dark:divide-gray-700"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedUsers.map((user, index) => (
              <motion.li
                key={user.id}
                variants={itemVariants}
                className={`p-4 flex items-center justify-between transition-colors ${index < 3 ? 'bg-emerald-50 dark:bg-emerald-900/50' : ''}`}
              >
                <div className="flex items-center">
                  <span className={`text-xl font-bold w-10 text-center ${index < 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </span>
                  <span className="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-200">{user.name}</span>
                </div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {user.points} points
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
