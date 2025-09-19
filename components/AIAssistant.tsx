
import React, { useState, useEffect, useCallback } from 'react';
import { Competition } from '../types';
import { getStudyTips } from '../services/geminiService';

interface AIAssistantProps {
  competition: Competition;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ competition, onClose }) => {
  const [tips, setTips] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchTips = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await getStudyTips(competition.title, competition.category);
      setTips(result);
    } catch (err) {
      setError('Failed to load study tips. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [competition.title, competition.category]);

  useEffect(() => {
    fetchTips();
  }, [fetchTips]);
  
  // Basic markdown to HTML conversion for display
  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
        if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(3)}</h2>;
        if (line.startsWith('# ')) return <h1 key={index} className="text-2xl font-extrabold mt-4 mb-2">{line.substring(2)}</h1>;
        if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) return <li key={index} className="ml-5 list-decimal">{line.substring(3)}</li>;
        if (line.trim() === '') return <br key={index} />;
        return <p key={index} className="mb-2">{line}</p>;
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <span role="img" aria-label="brain" className="mr-2 text-2xl">🧠</span>
            AI Coach for {competition.title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 text-2xl">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isLoading && (
            <div className="text-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Generating your personalized study plan...</p>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && (
            <div className="prose dark:prose-invert max-w-none">
                {renderMarkdown(tips)}
            </div>
          )}
        </div>
         <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600 text-right">
            <button 
                onClick={onClose} 
                className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;