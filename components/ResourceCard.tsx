import React from 'react';
import { Resource } from '../types';

const TypeIcon: React.FC<{ type: Resource['type'] }> = ({ type }) => {
    const icons = {
        'Video': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>,
        'PDF': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
        'Article': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>,
    };
    return icons[type];
}

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <span className="text-sm font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 py-1 px-3 rounded-full mb-3 inline-block">{resource.category}</span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{resource.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">{resource.description}</p>
        <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            <TypeIcon type={resource.type} />
            <span>{resource.type}</span>
        </div>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-700">
        <button 
          disabled
          className="w-full text-center block bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed"
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;