import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@trustdoc.com',
    name: 'Sarah Johnson',
    role: 'super-admin',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    status: 'active'
  },
  {
    id: '2',
    email: 'admin@university.edu',
    name: 'Dr. Michael Brown',
    role: 'institution-admin',
    institutionId: 'inst-1',
    institutionName: 'University of Sciences',
    avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
    status: 'active'
  },
  {
    id: '3',
    email: 'editor@university.edu',
    name: 'Emma Davis',
    role: 'editor',
    institutionId: 'inst-1',
    institutionName: 'University of Sciences',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?w=100&h=100&fit=crop&crop=face',
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date(),
    status: 'active'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('trustdoc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser && password === 'demo123') {
      const userWithUpdatedLogin = { ...foundUser, lastLogin: new Date() };
      setUser(userWithUpdatedLogin);
      localStorage.setItem('trustdoc_user', JSON.stringify(userWithUpdatedLogin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trustdoc_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}