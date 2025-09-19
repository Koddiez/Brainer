import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Course, Message } from '../types';
import { getCourseHelp } from '../services/geminiService';

interface AIAssistantCourseProps {
  course: Course;
  onClose: () => void;
}

const AIAssistantCourse: React.FC<AIAssistantCourseProps> = ({ course, onClose }) => {
  const [userInput, setUserInput] = useState<string>('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const suggestedPrompts = [
      `Summarize Module 1 for me.`,
      `Give me a practice problem for "${course.modules[course.modules.length - 1].title}".`,
      `Explain the main goal of this course in simple terms.`
  ];

  useEffect(() => {
    // Scroll to the bottom of the chat on new message
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = useCallback(async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: prompt };
    const newConversation = [...conversation, userMessage];

    setConversation(newConversation); // Update UI with user's new message
    setUserInput('');
    setIsLoading(true);

    try {
      // Pass the entire new conversation to the service
      const aiResponse = await getCourseHelp(course, newConversation);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setConversation(prev => [...prev, aiMessage]); // Add AI response
    } catch (err) {
      const errorMessage: Message = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, course, conversation]);

  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
        if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(3)}</h2>;
        if (line.startsWith('# ')) return <h1 key={index} className="text-2xl font-extrabold mt-4 mb-2">{line.substring(2)}</h1>;
        if (line.startsWith('* ')) return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        if (/^\d+\./.test(line)) return <li key={index} className="ml-5 list-decimal">{line.substring(line.indexOf('.') + 1)}</li>;
        if (line.trim() === '') return <br key={index} />;
        return <p key={index} className="mb-2">{line}</p>;
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <span role="img" aria-label="teacher" className="mr-2 text-2xl">👩‍🏫</span>
            AI Tutor for {course.title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 text-2xl" aria-label="Close">&times;</button>
        </div>
        <div ref={chatContainerRef} className="p-6 overflow-y-auto flex-grow bg-gray-50 dark:bg-gray-900">
            {conversation.length === 0 && (
                <div className="text-center text-gray-600 dark:text-gray-400">
                    <p className="mb-4">Welcome! How can I help you with this course today?</p>
                    <div className="space-y-2">
                        {suggestedPrompts.map((prompt, i) => (
                           <button key={i} onClick={() => handleSubmit(prompt)} className="text-sm w-full text-left bg-white dark:bg-gray-800 dark:hover:bg-gray-700 p-3 rounded-lg border dark:border-gray-600 hover:bg-gray-100 transition-colors">
                               {prompt}
                           </button>
                        ))}
                    </div>
                </div>
            )}
          <div className="space-y-4">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                  <div className="prose prose-sm max-w-none dark:prose-invert">{renderMarkdown(msg.text)}</div>
                </div>
              </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-gray-200"></div>
                            <span>Thinking...</span>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(userInput); }}>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question about the course..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isLoading}
                aria-label="Your question"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
                disabled={isLoading || !userInput.trim()}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantCourse;
