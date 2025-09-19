import React, { useState, useMemo } from 'react';
import { Resource } from '../types';
import ResourceCard from './ResourceCard';

interface ResourceLibraryPageProps {
  resources: Resource[];
}

const ResourceLibraryPage: React.FC<ResourceLibraryPageProps> = ({ resources }) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState< 'All' | Resource['type']>('All');

  // Derive categories and types for filter UI
  const categories = useMemo(() => ['All', ...Array.from(new Set(resources.map(r => r.category)))], [resources]);
  const types: ('All' | Resource['type'])[] = ['All', 'Video', 'PDF', 'Article'];

  // Memoize the filtering and sorting logic
  const filteredAndSortedResources = useMemo(() => {
    let result = [...resources];

    // Apply category filter
    if (categoryFilter !== 'All') {
      result = result.filter(r => r.category === categoryFilter);
    }

    // Apply type filter
    if (typeFilter !== 'All') {
      result = result.filter(r => r.type === typeFilter);
    }

    // Apply sorting by title (alphabetical)
    result.sort((a, b) => a.title.localeCompare(b.title));
    
    return result;
  }, [resources, categoryFilter, typeFilter]);


  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Resource Library</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Find study materials, past questions, and helpful videos to prepare for your competitions.</p>
      </div>

      {/* Filter and sort controls UI */}
      <div className="mb-12 flex flex-col md:flex-row items-center justify-center flex-wrap gap-6 bg-white dark:bg-gray-800 p-4 rounded-lg">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
            <label htmlFor="category-filter" className="font-semibold text-gray-700 dark:text-gray-300">Category:</label>
            <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                aria-label="Filter by category"
            >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Type:</span>
            <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
                {types.map(type => (
                    <button
                        key={type}
                        onClick={() => setTypeFilter(type)}
                        className={`px-4 py-1 rounded-md font-medium text-sm transition-colors duration-200 ${
                            typeFilter === type ? 'bg-white text-indigo-600 shadow dark:bg-gray-900 dark:text-indigo-400' : 'bg-transparent text-gray-600 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-white/10'
                        }`}
                        aria-pressed={typeFilter === type}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAndSortedResources.length > 0 ? (
          filteredAndSortedResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
           <div className="col-span-full text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No Resources Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibraryPage;