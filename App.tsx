import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Competition, User, Course, Badge, Resource, School, Registration, SubscriptionPlan } from './types';
import { competitions as initialCompetitions, courses as initialCourses, badges as allBadges, resources as allResources, mockUsers, mockSchools } from './constants';
import Header from './components/Header';
import CompetitionList from './components/CompetitionList';
import CompetitionDetail from './components/CompetitionDetail';
import StudentDashboard from './components/MyRegistrations';
import SchoolDashboard from './components/SchoolDashboard';
import AuthForm from './components/AuthForm';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfUsePage from './components/TermsOfUsePage';
import LeaderboardPage from './components/LeaderboardPage';
import ResourceLibraryPage from './components/ResourceLibraryPage';
import LandingPage from './components/LandingPage';
import PaymentModal from './components/PaymentModal';
import Modal from './components/ui/Modal';
import PricingPage from './components/PricingPage';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import InterSchoolCompetitionBoard from './components/InterSchoolCompetitionBoard';


// Defined Notification component here to adhere to file constraints
const Notification: React.FC<{
  notification: { message: string; type: 'success' | 'error'; } | null;
  onClose: () => void;
}> = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  const typeStyles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/50',
      border: 'border-green-400 dark:border-green-600',
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      text: 'text-green-800 dark:text-green-200',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/50',
      border: 'border-red-400 dark:border-red-600',
      icon: <XCircle className="h-6 w-6 text-red-500" />,
      text: 'text-red-800 dark:text-red-200',
    }
  };
  const styles = notification ? typeStyles[notification.type] : typeStyles.success;

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
// FIX: Correctly pass framer-motion props to resolve type errors. Standardizing React imports across the app fixes this type resolution issue.
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md p-4 rounded-lg shadow-2xl border ${styles.bg} ${styles.border}`}
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">{styles.icon}</div>
            <div className={`ml-3 flex-1 pt-0.5 ${styles.text}`}>
              <p className="text-sm font-semibold">{notification.type === 'success' ? 'Success!' : 'Error!'}</p>
              <p className="text-sm">{notification.message}</p>
            </div>
            <button onClick={onClose} className={`p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.text}`} aria-label="Close notification" >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BulkPaymentModal: React.FC<{
  details: { competition: Competition; students: User[]; discountCode: string; plan: SubscriptionPlan; };
  onClose: () => void;
  onPaymentSuccess: (competitionId: number, studentIds: number[]) => void;
}> = ({ details, onClose, onPaymentSuccess }) => {
    const { competition, students, discountCode, plan } = details;
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');
    
    const getBasePricePerStudent = (p: SubscriptionPlan) => {
        const SCHOOL_BASE_FEE = 5000;
        switch (p) {
            case 'Basic': return SCHOOL_BASE_FEE * 0.8; // 20% discount
            case 'Premium': return SCHOOL_BASE_FEE * 0.5; // 50% discount
            default: return SCHOOL_BASE_FEE;
        }
    };
    const basePricePerStudent = getBasePricePerStudent(plan);
    
    useEffect(() => {
        if (discountCode) {
            const codeUpper = discountCode.toUpperCase();
            const parts = codeUpper.split('-');
            if (parts.length === 2 && parts[0].startsWith('SCHOOL')) {
                const percentage = parseInt(parts[1], 10);
                if (!isNaN(percentage) && percentage >= 10 && percentage <= 50) {
                    setDiscount(percentage / 100);
                    setError('');
                    return;
                }
            }
            setError('Invalid discount code provided.');
        }
    }, [discountCode]);

    const totalPrice = students.length * basePricePerStudent;
    const finalPrice = totalPrice - (totalPrice * discount);

    const handlePayment = async () => {
        setPaymentStatus('processing');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setPaymentStatus('success');
        await new Promise(resolve => setTimeout(resolve, 1500));
        onPaymentSuccess(competition.id, students.map(s => s.id));
    };

    const renderContent = () => {
        if (paymentStatus !== 'idle') {
            return (
                <div className="text-center py-12">
                    {paymentStatus === 'processing' ? (
                        <>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                            <p className="text-lg text-gray-600 dark:text-gray-400">Processing payment for {students.length} students...</p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Payment Successful!</p>
                            <p className="text-gray-600 dark:text-gray-400">Your students are now registered.</p>
                        </>
                    )}
                </div>
            );
        }

        return (
            <>
                <div className="p-6">
                    <div className="text-center mb-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                            Bulk Registration Summary
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">{students.length} student(s) for "{competition.title}"</p>
                        <p className="mt-4 text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                            ₦{finalPrice.toLocaleString()}
                        </p>
                        {discount > 0 && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                                (Original: ₦{totalPrice.toLocaleString()}, {(discount * 100).toFixed(0)}% off applied)
                            </p>
                        )}
                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                    </div>
                     <button onClick={handlePayment} className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 duration-300 shadow-lg text-lg">
                        Confirm and Pay
                    </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 text-right">
                    <button type="button" onClick={onClose} className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                        Cancel
                    </button>
                </div>
            </>
        );
    };

    return (
        <Modal title="Confirm Bulk Registration" isOpen={true} onClose={paymentStatus === 'idle' ? onClose : () => {}}>
            {renderContent()}
        </Modal>
    );
};


export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return 'dark';
    }
    return 'light';
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [competitionToRegister, setCompetitionToRegister] = useState<Competition | null>(null);
  
  const [isBulkPaymentModalOpen, setIsBulkPaymentModalOpen] = useState(false);
  const [bulkRegistrationDetails, setBulkRegistrationDetails] = useState<{
    competition: Competition;
    students: User[];
    discountCode: string;
    plan: SubscriptionPlan;
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const [currentView, setCurrentView] = useState<View>(View.LANDING_PAGE);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [competitions] = useState<Competition[]>(initialCompetitions);
  const [courses] = useState<Course[]>(initialCourses);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [schools, setSchools] = useState<School[]>(mockSchools);

  const [registrations, setRegistrations] = useState<Map<number, Registration[]>>(new Map()); // userId -> [Registration]
  const [enrollments, setEnrollments] = useState<Map<number, number[]>>(new Map()); // userId -> [courseId]

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate a 1.5 second loading time
    return () => clearTimeout(timer);
  }, []);
  
  const handleNavigate = useCallback((view: View, itemId?: number) => {
    setCurrentView(view);
    if (view === View.COMPETITION_DETAIL && itemId !== undefined) {
      setSelectedCompetitionId(itemId);
    }
    if (view === View.COURSE_DETAIL && itemId !== undefined) {
      setSelectedCourseId(itemId);
    }
    window.scrollTo(0, 0);
  }, []);
  
  const handleLogin = (user: Partial<User>) => {
    // This is a simulation. In a real app, you'd get the full user object from your backend.
    const existingUser = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());

    if (existingUser) {
        setCurrentUser(existingUser);
    } else {
        // Create new user/school
        if (user.role === 'school_admin') {
            const newSchool: School = { id: Date.now(), name: user.name as string, address: 'N/A', contactPerson: user.name as string, contactEmail: user.email as string, subscriptionPlan: 'Free' };
            setSchools(prev => [...prev, newSchool]);
            const newSchoolAdmin: User = { ...(user as User), id: Date.now(), points: 0, badges: [], schoolId: newSchool.id };
            setUsers(prev => [...prev, newSchoolAdmin]);
            setCurrentUser(newSchoolAdmin);
        } else { // Student
            const newUser: User = { 
                ...(user as User), 
                id: Date.now(), 
                points: 0, 
                badges: [],
                // Students selecting a school are marked as pending approval (isApprovedBySchool: false).
                // Individuals (no schoolId) are auto-approved (isApprovedBySchool: true).
                isApprovedBySchool: !user.schoolId,
            };
            setUsers(prev => [...prev, newUser]);
            setCurrentUser(newUser);
        }
    }
    handleNavigate(View.MY_REGISTRATIONS);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate(View.LANDING_PAGE);
  };

  const awardPoints = (amount: number, targetUser: User) => {
    const updatedUser = { ...targetUser, points: targetUser.points + amount };
    if (currentUser?.id === targetUser.id) {
        setCurrentUser(updatedUser);
    }
    setUsers(prevUsers => prevUsers.map(u => u.id === targetUser.id ? updatedUser : u));
  };
  
  const awardBadge = (badgeId: number, targetUser: User) => {
    if (targetUser.badges.includes(badgeId)) return;

    const updatedUser = { ...targetUser, badges: [...targetUser.badges, badgeId] };
     if (currentUser?.id === targetUser.id) {
        setCurrentUser(updatedUser);
    }
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    
    if (currentUser?.id === targetUser.id) {
      const badge = allBadges.find(b => b.id === badgeId);
      if (badge) {
          showNotification(`Congratulations! You've earned the "${badge.name}" badge!`);
      }
    }
  };

  const handleInitiateRegistration = (competitionId: number) => {
    if (!currentUser) {
      handleNavigate(View.LOGIN);
      return;
    }
    const competition = competitions.find(c => c.id === competitionId);
    if (competition) {
        setCompetitionToRegister(competition);
        setIsPaymentModalOpen(true);
    }
  };
  
  const handleInitiateBulkRegistration = (competitionId: number, studentIds: number[], discountCode: string) => {
    const competition = competitions.find(c => c.id === competitionId);
    const studentsToRegister = users.filter(u => studentIds.includes(u.id));
    const adminSchool = schools.find(s => s.id === currentUser?.schoolId);

    if (competition && studentsToRegister.length > 0 && adminSchool) {
        setBulkRegistrationDetails({
            competition,
            students: studentsToRegister,
            discountCode,
            plan: adminSchool.subscriptionPlan,
        });
        setIsBulkPaymentModalOpen(true);
    }
  };

  const handlePaymentSuccess = (competitionId: number) => {
    if (!currentUser) return;
    
    const competition = competitions.find(c => c.id === competitionId);

    setRegistrations(prev => {
      const newRegistrations = new Map(prev);
      const userRegistrations = newRegistrations.get(currentUser.id) || [];
      const isAlreadyRegistered = userRegistrations.some(reg => reg.competitionId === competitionId && reg.status === 'paid');
      
      if (!isAlreadyRegistered) {
        const newReg: Registration = { competitionId, status: 'paid', paymentId: `mock_${Date.now()}`};
        newRegistrations.set(currentUser.id, [...userRegistrations, newReg]);
        
        awardPoints(50, currentUser);
        const paidRegistrationsCount = userRegistrations.filter(r => r.status === 'paid').length;
        // Award 'First Steps' badge (ID 1) on a student's first successful competition registration.
        if (paidRegistrationsCount === 0) awardBadge(1, currentUser);
        if (paidRegistrationsCount === 2) awardBadge(3, currentUser);
      }
      return newRegistrations;
    });

    setIsPaymentModalOpen(false);
    setCompetitionToRegister(null);
    if (competition) {
        showNotification(`Successfully registered for "${competition.title}"!`);
    } else {
        showNotification('Successfully registered for the competition!');
    }
  };

  const handleBulkPaymentSuccess = (competitionId: number, studentIds: number[]) => {
      setRegistrations(prev => {
          const newRegistrations = new Map(prev);
          studentIds.forEach(studentId => {
              const student = users.find(u => u.id === studentId);
              if (!student) return;
              
              const userRegistrations = newRegistrations.get(studentId) || [];
              const isAlreadyRegistered = userRegistrations.some(reg => reg.competitionId === competitionId && reg.status === 'paid');
              if (!isAlreadyRegistered) {
                  const newReg: Registration = { competitionId, status: 'paid', paymentId: `mock_bulk_${Date.now()}`};
                  newRegistrations.set(studentId, [...userRegistrations, newReg]);
                  awardPoints(50, student);
                  const paidRegistrationsCount = userRegistrations.filter(r => r.status === 'paid').length;
                  if (paidRegistrationsCount === 0) awardBadge(1, student);
                  if (paidRegistrationsCount === 2) awardBadge(3, student);
              }
          });
          return newRegistrations;
      });

      setIsBulkPaymentModalOpen(false);
      setBulkRegistrationDetails(null);
      showNotification(`${studentIds.length} students successfully registered!`);
  };
  
  const handleStudentApproval = (studentId: number, isApproved: boolean) => {
    setUsers(prevUsers => prevUsers.map(u => {
        if (u.id === studentId) {
            if (isApproved) {
                showNotification(`'${u.name}' has been approved.`, 'success');
                return { ...u, isApprovedBySchool: true };
            } else {
                showNotification(`'${u.name}' has been rejected.`, 'error');
                // On rejection, we remove their school affiliation, making them an individual.
                return { ...u, isApprovedBySchool: undefined, schoolId: undefined };
            }
        }
        return u;
    }));
};

const handleUpgradePlan = (schoolId: number, newPlan: SubscriptionPlan) => {
    setSchools(prevSchools => prevSchools.map(s => 
        s.id === schoolId ? { ...s, subscriptionPlan: newPlan } : s
    ));
    showNotification(`Successfully upgraded to the ${newPlan} plan!`, 'success');
};

const handleSchoolLogoUpload = (schoolId: number, logoUrl: string) => {
    setSchools(prev => prev.map(s => s.id === schoolId ? { ...s, logoUrl } : s));
    showNotification('School logo updated successfully!');
};

const handleProfilePictureUpload = (userId: number, pictureUrl: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, profilePictureUrl: pictureUrl } : u));
    if (currentUser?.id === userId) {
        setCurrentUser(prev => prev ? { ...prev, profilePictureUrl: pictureUrl } : null);
    }
    showNotification('Profile picture updated successfully!');
};


  const handleEnrollInCourse = (courseId: number) => {
    if (!currentUser) return;
    setEnrollments(prev => {
      const newEnrollments = new Map(prev);
      const userEnrollments = newEnrollments.get(currentUser.id) || [];
      if (!userEnrollments.includes(courseId)) {
        newEnrollments.set(currentUser.id, [...userEnrollments, courseId]);
        awardPoints(25, currentUser);
        if (userEnrollments.length === 0) awardBadge(2, currentUser);
      }
      return newEnrollments;
    });
    showNotification('Successfully enrolled in the course!');
  };

  const selectedCompetition = competitions.find(c => c.id === selectedCompetitionId);
  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const userRegistrations = (currentUser && registrations.get(currentUser.id)?.filter(r => r.status === 'paid').map(r => r.competitionId)) || [];
  const userEnrollments = (currentUser && enrollments.get(currentUser.id)) || [];
  
  const renderContent = () => {
    const school = schools.find(s => s.id === currentUser?.schoolId);

    switch (currentView) {
      case View.LANDING_PAGE:
        return <LandingPage onNavigate={handleNavigate} />;
      case View.COMPETITION_LIST:
        return <CompetitionList competitions={competitions} onNavigate={handleNavigate} isLoading={isLoading} />;
      case View.COMPETITION_DETAIL:
        if (!selectedCompetition) return <p>Competition not found.</p>;

        if (selectedCompetition.format === 'inter-school') {
          return <InterSchoolCompetitionBoard 
            competition={selectedCompetition} 
            onNavigate={handleNavigate} 
            schools={schools} 
            users={users} 
          />;
        }
        
        return (
          <CompetitionDetail 
            competition={selectedCompetition}
            currentUser={currentUser}
            isRegistered={userRegistrations.includes(selectedCompetition.id)}
            onRegister={handleInitiateRegistration}
            onNavigate={handleNavigate}
            subscriptionPlan={school?.subscriptionPlan}
          />
        );
      case View.COURSE_LIST:
        return <CourseList courses={courses} onNavigate={handleNavigate} isLoading={isLoading} />;
      case View.COURSE_DETAIL:
        if (!selectedCourse) return <p>Course not found.</p>;
        return (
          <CourseDetail
            course={selectedCourse}
            currentUser={currentUser}
            isEnrolled={userEnrollments.includes(selectedCourse.id)}
            onEnroll={handleEnrollInCourse}
            onNavigate={handleNavigate}
          />
        );
      case View.MY_REGISTRATIONS:
         if (!currentUser) {
            return <AuthForm onLogin={handleLogin} onNavigate={handleNavigate} schools={schools} />;
         }
         if (currentUser.role === 'school_admin') {
             if (!school) return <p>School not found.</p>;
             return (
                 <SchoolDashboard
                    currentUser={currentUser}
                    school={school}
                    students={users.filter(u => u.schoolId === currentUser.schoolId && u.role === 'student')}
                    registrations={registrations}
                    competitions={competitions}
                    onNavigate={handleNavigate}
                    onBulkRegister={handleInitiateBulkRegistration}
                    onApproveStudent={handleStudentApproval}
                    onUpgradePlan={(newPlan) => handleUpgradePlan(school.id, newPlan)}
                    onUploadLogo={handleSchoolLogoUpload}
                 />
             );
         }
        return (
            <StudentDashboard 
                currentUser={currentUser}
                registeredCompetitions={competitions.filter(c => userRegistrations.includes(c.id))}
                enrolledCourses={courses.filter(c => userEnrollments.includes(c.id))}
                allBadges={allBadges}
                onNavigate={handleNavigate}
                onUploadProfilePicture={handleProfilePictureUpload}
            />
        );
      case View.LOGIN:
      case View.REGISTER:
      case View.SCHOOL_REGISTRATION:
        return <AuthForm onLogin={handleLogin} onNavigate={handleNavigate} schools={schools} />;
      case View.ABOUT:
        return <AboutPage />;
      case View.CONTACT:
        return <ContactPage />;
      case View.BLOG:
        return <BlogPage />;
      case View.PRIVACY_POLICY:
        return <PrivacyPolicyPage />;
      case View.TERMS_OF_USE:
        return <TermsOfUsePage />;
      case View.LEADERBOARD:
        return <LeaderboardPage users={users.filter(u => u.role === 'student')} isLoading={isLoading} />;
      case View.RESOURCE_LIBRARY:
        return <ResourceLibraryPage resources={allResources} />;
      case View.PRICING:
        return <PricingPage onUpgradePlan={(newPlan) => school && handleUpgradePlan(school.id, newPlan)} currentPlan={school?.subscriptionPlan} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  const isLandingPage = currentView === View.LANDING_PAGE;
  const school = schools.find(s => s.id === currentUser?.schoolId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030303] font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <Notification notification={notification} onClose={() => setNotification(null)} />
      {isPaymentModalOpen && competitionToRegister && currentUser && (
        <PaymentModal
            competition={competitionToRegister}
            user={currentUser}
            subscriptionPlan={school?.subscriptionPlan}
            onClose={() => setIsPaymentModalOpen(false)}
            onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      {isBulkPaymentModalOpen && bulkRegistrationDetails && (
        <BulkPaymentModal
            details={bulkRegistrationDetails}
            onClose={() => setIsBulkPaymentModalOpen(false)}
            onPaymentSuccess={handleBulkPaymentSuccess}
        />
      )}
      <Header 
        currentUser={currentUser} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout} 
        theme={theme}
        onToggleTheme={handleThemeToggle}
      />
      <main className={!isLandingPage ? "container mx-auto px-4 py-8 flex-grow" : "flex-grow"}>
        {renderContent()}
      </main>
      <Footer currentUser={currentUser} onNavigate={handleNavigate} />
    </div>
  );
}