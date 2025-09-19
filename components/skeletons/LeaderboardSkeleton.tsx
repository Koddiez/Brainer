import React from 'react';

const LeaderboardSkeleton: React.FC = () => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700 animate-pulse">
      {[...Array(8)].map((_, index) => (
        <li key={index} className={`p-4 flex items-center justify-between ${index < 3 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
          <div className="flex items-center">
            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="ml-4 h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </li>
      ))}
    </ul>
  );
};

export default LeaderboardSkeleton;
