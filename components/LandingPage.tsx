import React from 'react';
import { View } from '../types';
import { BookOpen, Award, Users, Globe, Zap, Puzzle, UserPlus, Search, Trophy } from 'lucide-react';
import { Vortex } from './ui/vortex';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, type Variants } from 'framer-motion';

// FIX: Explicitly type with Variants to ensure correct type inference for 'ease'.
const sectionTitleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// FIX: Explicitly type with Variants.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// FIX: Explicitly type with Variants to ensure correct type inference for 'ease'.
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
};

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md text-center transform hover:-translate-y-1 transition-transform duration-300 border border-gray-200 dark:border-gray-800 h-full"
    >
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mx-auto">
            {icon}
        </div>
        <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{children}</p>
    </motion.div>
);

const HowItWorksCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg text-center h-full border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mx-auto">
            {icon}
        </div>
        <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{children}</p>
    </div>
);

const LandingPage = ({ onNavigate }: { onNavigate: (view: View) => void }) => {
    return (
        <div>
            <Vortex
                backgroundColor="transparent"
                rangeY={800}
                particleCount={500}
                baseHue={200}
                className="flex items-center flex-col justify-center px-4 md:px-8 py-20 w-full h-screen -mt-[80px]"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center z-10"
                >
                     <div className="mb-8 inline-block rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
                        Brainer: The Nigerian Student’s Path to Greatness
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                        Train. Compete.
                    </h1>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400 mt-2 tracking-tight">
                        Rise.
                    </h2>
                     <p className="mt-8 text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
                        The AI-integrated educational platform for Nigerian secondary schools. Discover competitions, take skill-building courses, and climb the national leaderboard. Your journey to academic excellence starts here.
                    </p>
                    <div className="mt-10 flex justify-center items-center gap-4 flex-wrap">
                        <button
                            onClick={() => onNavigate(View.REGISTER)}
                            className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-105 duration-300 shadow-lg text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => onNavigate(View.COMPETITION_LIST)}
                            className="bg-transparent text-white border-2 border-gray-500 font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-black transition-colors duration-300 text-lg"
                        >
                            Explore Competitions
                        </button>
                    </div>
                </motion.div>
            </Vortex>


            {/* Features Section */}
            <div className="py-24 bg-slate-100 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionTitleVariants}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-900 dark:text-gray-100">Why Choose Brainer?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">A platform built for the next generation of Nigerian leaders and innovators.</p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        <FeatureCard
                            icon={<Globe className="h-8 w-8" />}
                            title="Hybrid Competitions"
                        >
                            Experience the best of both worlds with a mix of online and physical competition formats.
                        </FeatureCard>
                        <FeatureCard
                            icon={<Puzzle className="h-8 w-8" />}
                            title="Culturally Relevant Challenges"
                        >
                            Engage with creative challenges that resonate with our Nigerian heritage and context.
                        </FeatureCard>
                        <FeatureCard
                            icon={<Users className="h-8 w-8" />}
                            title="Mentorship & Skills"
                        >
                            Gain valuable skills and connect with mentors to guide your academic and career journey.
                        </FeatureCard>
                        <FeatureCard
                            icon={<Award className="h-8 w-8" />}
                            title="Scholarships & Awards"
                        >
                            Win amazing prizes, including scholarships, internships, and national recognition for your talent.
                        </FeatureCard>
                        <FeatureCard
                            icon={<Zap className="h-8 w-8" />}
                            title="Real-World Problems"
                        >
                            Collaborate in teams to tackle real-world challenges and develop innovative solutions.
                        </FeatureCard>
                         <FeatureCard
                            icon={<BookOpen className="h-8 w-8" />}
                            title="Curated Learning Courses"
                        >
                           Prepare for competitions with expert-led courses designed to give you an edge.
                        </FeatureCard>
                    </motion.div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-24 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionTitleVariants}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-900 dark:text-gray-100">Get Started in 3 Simple Steps</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">Your journey to academic excellence starts here.</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                        className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20"
                    >
                        {/* Dashed line for desktop */}
                        <div aria-hidden="true" className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-8">
                             <svg width="100%" height="2" className="overflow-visible">
                                <line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" strokeDasharray="8 8" className="stroke-gray-300 dark:stroke-gray-700"/>
                            </svg>
                        </div>

                        <motion.div variants={itemVariants} className="relative z-10">
                            <HowItWorksCard icon={<UserPlus className="h-8 w-8" />} title="1. Register Account">
                                Sign up as a student or school to create your profile and join our growing community.
                            </HowItWorksCard>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="relative z-10">
                            <HowItWorksCard icon={<Search className="h-8 w-8" />} title="2. Explore & Enroll">
                                Browse our diverse list of competitions and courses. Find the perfect challenge for you.
                            </HowItWorksCard>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative z-10">
                             <HowItWorksCard icon={<Trophy className="h-8 w-8" />} title="3. Compete & Grow">
                                Participate in events, earn points, collect badges, and climb the leaderboard to success.
                            </HowItWorksCard>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;