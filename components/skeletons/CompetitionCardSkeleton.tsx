import React from 'react';

const CompetitionCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="p-6 animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mt-4"></div>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CompetitionCardSkeleton;
