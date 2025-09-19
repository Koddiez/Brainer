import React, { useState, useCallback, useEffect } from 'react';
import { View, User } from '../types';
import ThemeToggleButton from './ThemeToggleButton';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, type Variants } from 'framer-motion';

interface HeaderProps {
  currentUser: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const headerVariants: Variants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const navItemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Header: React.FC<HeaderProps> = ({ currentUser, onNavigate, onLogout, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleNav = useCallback((view: View) => {
    onNavigate(view);
    setIsMenuOpen(false);
  }, [onNavigate]);

  const navLinks = (
    <>
      <motion.button variants={navItemVariants} onClick={() => handleNav(View.COMPETITION_LIST)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium">Competitions</motion.button>
      <motion.button variants={navItemVariants} onClick={() => handleNav(View.COURSE_LIST)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium">Courses</motion.button>
      <motion.button variants={navItemVariants} onClick={() => handleNav(View.RESOURCE_LIBRARY)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium">Resources</motion.button>
      <motion.button variants={navItemVariants} onClick={() => handleNav(View.LEADERBOARD)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium">Leaderboard</motion.button>
      { currentUser?.role === 'school_admin' && <motion.button variants={navItemVariants} onClick={() => handleNav(View.PRICING)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium">Pricing</motion.button>}
      <motion.button variants={navItemVariants} onClick={() => handleNav(View.BLOG)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium">Blog</motion.button>
      <motion.button variants={navItemVariants} onClick={() => handleNav(View.ABOUT)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium">About Us</motion.button>
      <motion.button variants={navItemVariants} onClick={() => handleNav(View.CONTACT)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium">Contact</motion.button>
    </>
  );

  const authSection = (
    <>
      {currentUser ? (
        <div className="flex items-center flex-wrap justify-start gap-4">
          <button 
            onClick={() => handleNav(View.MY_REGISTRATIONS)}
            className="flex items-center gap-2 border border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500 pl-2 pr-4 py-1.5 rounded-full hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-colors text-sm font-semibold"
          >
             {currentUser.profilePictureUrl ? (
                <img src={currentUser.profilePictureUrl} alt="My profile" className="h-6 w-6 rounded-full object-cover" />
            ) : (
                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                    {currentUser.name.charAt(0).toUpperCase()}
                </div>
            )}
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => { onLogout(); setIsMenuOpen(false); }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <button 
          onClick={() => handleNav(View.LOGIN)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors font-semibold"
        >
          Login / Sign Up
        </button>
      )}
    </>
  );

  return (
    <motion.header 
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
        "backdrop-blur-sm sticky top-0 z-40 transition-all duration-300",
        isScrolled 
          ? "bg-slate-50/95 dark:bg-black/80 shadow-md dark:border-b dark:border-gray-800"
          : "bg-slate-50/80 dark:bg-black/50"
      )}>
      <motion.div 
        variants={navContainerVariants}
        className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            variants={navItemVariants}
            className="cursor-pointer"
            onClick={() => handleNav(currentUser ? View.MY_REGISTRATIONS : View.LANDING_PAGE)}
          >
            <Logo className="h-8 w-auto" />
          </motion.div>
          
          <motion.nav 
            variants={navContainerVariants}
            className="hidden md:flex items-center gap-6">
            {navLinks}
          </motion.nav>

          <motion.div 
            variants={navItemVariants}
            className="hidden md:flex items-center gap-4">
            <ThemeToggleButton theme={theme} onToggle={onToggleTheme} />
            {authSection}
          </motion.div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggleButton theme={theme} onToggle={onToggleTheme} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-50/95 dark:bg-black/95 backdrop-blur-md shadow-lg">
          <nav className="container mx-auto px-4 pt-2 pb-6 flex flex-col items-start gap-4">
            {navLinks}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 w-full">
              {authSection}
            </div>
          </nav>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
