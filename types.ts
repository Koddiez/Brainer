
// FIX: Removed circular import of 'View' from the file itself.
export enum View {
  LANDING_PAGE,
  COMPETITION_LIST,
  COMPETITION_DETAIL,
  MY_REGISTRATIONS,
  LOGIN,
  REGISTER,
  COURSE_LIST,
  COURSE_DETAIL,
  ABOUT,
  CONTACT,
  BLOG,
  PRIVACY_POLICY,
  TERMS_OF_USE,
  LEADERBOARD,
  RESOURCE_LIBRARY,
  SCHOOL_REGISTRATION,
  PRICING,
}

export type SubscriptionPlan = 'Free' | 'Basic' | 'Premium';

export interface Competition {
  id: number;
  title: string;
  category: 'Maths' | 'English' | 'Multi-Subject' | 'Interdisciplinary' | 'Social Impact' | 'Cultural Heritage' | 'Creative Arts' | 'Environment' | 'Technology' | 'Leadership' | 'Debate';
  date: string;
  deadline: string;
  description: string;
  eligibility: string;
  prizes: string[];
  region?: string;
  format: 'individual' | 'team-based' | 'inter-school';
  allowMultimedia: boolean;
  hasMentorship: boolean;
  participatingSchools?: {
      schoolId: number;
      students: { id: number; isDisqualified?: boolean }[];
  }[];
}

export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  description: string;
  modules: {
    title: string;
    content: string;
  }[];
}

export interface School {
    id: number;
    name: string;
    address: string;
    contactPerson: string;
    contactEmail: string;
    subscriptionPlan: SubscriptionPlan;
    logoUrl?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  badges: number[];
  role: 'student' | 'school_admin';
  schoolId?: number;
  isApprovedBySchool?: boolean;
  profilePictureUrl?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Resource {
  id: number;
  title: string;
  category: string;
  type: 'Video' | 'PDF' | 'Article';
  description: string;
  url: string;
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export interface Registration {
    competitionId: number;
    status: 'paid' | 'pending_payment';
    paymentId?: string;
}