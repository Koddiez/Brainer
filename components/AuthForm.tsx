import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, User, School } from '../types';
import { User as UserIcon, Building, Ticket } from 'lucide-react';
import { cn } from '../lib/utils';
import Input from './ui/Input';

interface AuthFormProps {
  onLogin: (user: Partial<User>) => void;
  onNavigate: (view: View) => void;
  schools: School[];
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, schools }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'student' | 'school'>('student');
  
  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Student fields
  const [studentName, setStudentName] = useState('');
  const [schoolId, setSchoolId] = useState<number | undefined>();
  const [schoolSearch, setSchoolSearch] = useState('');
  const [isSchoolListOpen, setIsSchoolListOpen] = useState(false);
  const schoolDropdownRef = useRef<HTMLDivElement>(null);

  const [isIndividual, setIsIndividual] = useState(false);
  
  // School fields
  const [schoolName, setSchoolName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [numStudents, setNumStudents] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');

  const generateDiscountCode = (sName: string, studentCount: number, pCode: string) => {
    if (studentCount >= 20) {
      // Mock validation for promo code
      const discountPercent = pCode.toUpperCase() === 'BRAINERVIP' ? 20 : 10;
      const code = `SCHOOL${sName.replace(/[^A-Z0-9]/ig, "").toUpperCase().slice(0, 5)}-${discountPercent}`;
      setDiscountCode(code);
    } else {
      setDiscountCode(null);
    }
  };
  
  // Effect to update discount code when inputs change
  useEffect(() => {
    if (userType === 'school') {
        generateDiscountCode(schoolName, numStudents, promoCode);
    }
  }, [schoolName, numStudents, promoCode, userType]);
  
  // Effect to close school dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (schoolDropdownRef.current && !schoolDropdownRef.current.contains(event.target as Node)) {
        setIsSchoolListOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredSchools = useMemo(() => {
    if (!schoolSearch) return schools;
    return schools.filter(school => school.name.toLowerCase().includes(schoolSearch.toLowerCase()));
  }, [schools, schoolSearch]);

  const handleSchoolSelect = (school: School) => {
    setSchoolId(school.id);
    setSchoolSearch(school.name);
    setIsSchoolListOpen(false);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, API calls with validation would happen here.
    let user: Partial<User> = {};

    if (authMode === 'login') {
      // API_CALL: await api.login({ email, password });
      // For simulation, we find a user by email, but we don't know their role yet.
      // The `onLogin` handler in App.tsx will find the full user object.
       user = { email };

    } else { // Signup
      if (userType === 'student') {
        if (!isIndividual && !schoolId) {
          alert('Please select your school from the list.');
          return;
        }
        // API_CALL: await api.registerStudent({ name: studentName, email, password, schoolId });
        if (isIndividual) {
             user = { name: studentName, email, role: 'student' };
        } else {
             user = { name: studentName, email, role: 'student', schoolId };
        }
      } else { // School
        // API_CALL: await api.registerSchool({ name: schoolName, email, password, contactPerson });
        user = { name: schoolName, email, role: 'school_admin' };
      }
    }
    
    onLogin(user);
  };

  const isSignup = authMode === 'signup';

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
        {authMode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        {authMode === 'login' ? 'Sign in to continue your journey' : 'Join the Brainer community'}
      </p>

      {isSignup && (
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <button onClick={() => setUserType('student')} className={cn("px-4 py-2 text-sm font-semibold rounded-md transition-colors", userType === 'student' ? 'bg-white dark:bg-gray-900 text-indigo-600 shadow' : 'text-gray-600 dark:text-gray-300')}>I am a Student</button>
            <button onClick={() => setUserType('school')} className={cn("px-4 py-2 text-sm font-semibold rounded-md transition-colors", userType === 'school' ? 'bg-white dark:bg-gray-900 text-indigo-600 shadow' : 'text-gray-600 dark:text-gray-300')}>I am a School</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignup && userType === 'student' && (
          <>
            <Input id="studentName" label="Full Name" type="text" value={studentName} onChange={setStudentName} placeholder="John Doe" icon={<UserIcon />} required />
            
            {!isIndividual && (
                <div ref={schoolDropdownRef}>
                    <label htmlFor="school-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">School</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            id="school-search"
                            type="text"
                            value={schoolSearch}
                            onChange={(e) => {
                                setSchoolSearch(e.target.value);
                                if (schoolId) setSchoolId(undefined); // Clear selected ID if user types again
                                setIsSchoolListOpen(true);
                            }}
                            onFocus={() => setIsSchoolListOpen(true)}
                            placeholder="Search and select your school"
                            autoComplete="off"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                        {isSchoolListOpen && (
                            <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-52 overflow-y-auto">
                                {filteredSchools.length > 0 ? (
                                    filteredSchools.map(school => (
                                        <li
                                            key={school.id}
                                            onClick={() => handleSchoolSelect(school)}
                                            className="px-3 py-2 cursor-pointer text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-900 dark:text-gray-200 flex items-center gap-3"
                                        >
                                            {school.logoUrl ? (
                                                <img src={school.logoUrl} alt={`${school.name} logo`} className="h-6 w-6 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                    <Building className="h-4 w-4 text-gray-500" />
                                                </div>
                                            )}
                                            <span>{school.name}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-3 py-2 text-sm text-gray-500">No schools found.</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            )}
            <div className="flex items-center">
                <input id="isIndividual" type="checkbox" checked={isIndividual} onChange={(e) => setIsIndividual(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="isIndividual" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Sign up as an individual</label>
            </div>
          </>
        )}
        
        {isSignup && userType === 'school' && (
            <>
                <Input id="schoolName" label="School Name" type="text" value={schoolName} onChange={setSchoolName} placeholder="Sunshine High School" icon={<Building />} required />
                <Input id="contactPerson" label="Contact Person" type="text" value={contactPerson} onChange={setContactPerson} placeholder="Mr. John Doe" icon={<UserIcon />} required />
                <Input id="numStudents" label="Estimated Students (20+ for discount)" type="number" value={numStudents} onChange={(val) => setNumStudents(parseInt(val, 10) || 0)} placeholder="e.g., 25" />
                <Input id="promoCode" label="Promo Code (Optional)" type="text" value={promoCode} onChange={setPromoCode} placeholder="e.g., BRAINERVIP" icon={<Ticket />} />
                {discountCode && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-lg text-center">
                        <p className="text-sm text-green-800 dark:text-green-200">Your volume discount code for students:</p>
                        <p className="font-bold text-lg text-green-600 dark:text-green-300 tracking-widest bg-white dark:bg-gray-800 rounded py-1 mt-1">{discountCode}</p>
                    </div>
                )}
            </>
        )}

        <Input id="email" label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
        <Input id="password" label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-500"
        >
          {authMode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;