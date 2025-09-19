import React from 'react';
import { View, User } from '../types';
import Logo from './Logo';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, type Variants } from 'framer-motion';

interface FooterProps {
  currentUser: User | null;
  onNavigate: (view: View) => void;
}

const footerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const finalRowVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            delay: 0.8,
            ease: 'easeOut'
        }
    }
}

const Footer: React.FC<FooterProps> = ({ currentUser, onNavigate }) => {
  return (
    <motion.footer 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white dark:bg-black mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
            variants={footerContainerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <motion.div variants={columnVariants}>
            <div 
              className="cursor-pointer inline-block mb-4"
              onClick={() => onNavigate(View.LANDING_PAGE)}
            >
              <Logo className="h-10 w-auto" />
            </div>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Empowering Nigeria’s Youth.</p>
          </motion.div>

          <motion.div variants={columnVariants}>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate(View.COMPETITION_LIST)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Competitions</button></li>
              <li><button onClick={() => onNavigate(View.COURSE_LIST)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Courses</button></li>
              <li><button onClick={() => onNavigate(View.RESOURCE_LIBRARY)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Resources</button></li>
              <li><button onClick={() => onNavigate(View.LEADERBOARD)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Leaderboard</button></li>
              <li><button onClick={() => onNavigate(View.BLOG)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Blog</button></li>
              {currentUser && (
                <li><button onClick={() => onNavigate(View.MY_REGISTRATIONS)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Dashboard</button></li>
              )}
            </ul>
          </motion.div>

          <motion.div variants={columnVariants}>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">About</h3>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate(View.ABOUT)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">About Us</button></li>
              <li><button onClick={() => onNavigate(View.CONTACT)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Contact</button></li>
              <li><button onClick={() => onNavigate(View.SCHOOL_REGISTRATION)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Register Your School</button></li>
            </ul>
          </motion.div>
          
          <motion.div variants={columnVariants}>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">Legal</h3>
            <ul className="space-y-2">
               <li><button onClick={() => onNavigate(View.TERMS_OF_USE)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Terms of Use</button></li>
               <li><button onClick={() => onNavigate(View.PRIVACY_POLICY)} className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Privacy Policy</button></li>
            </ul>
          </motion.div>

        </motion.div>
        <motion.div 
            variants={finalRowVariants}
            className="mt-12 border-t dark:border-gray-800 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Brainer. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
