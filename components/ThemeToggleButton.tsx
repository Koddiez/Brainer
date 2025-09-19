import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleButtonProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors relative w-9 h-9 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false}>
        <motion.div
// FIX: Correctly pass framer-motion props to resolve type errors.
          key={theme === 'dark' ? 'moon' : 'sun'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggleButton;
