import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_COUNSELLORS, INITIAL_STUDENT_USER } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('counselling_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_STUDENT_USER;
  });

  const [role, setRole] = useState(() => currentUser?.role || 'STUDENT');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('counselling_auth_user', JSON.stringify(currentUser));
      setRole(currentUser.role);
    } else {
      localStorage.removeItem('counselling_auth_user');
    }
  }, [currentUser]);

  // Demo toggle function for switching between Student, Counsellor, and Admin
  const switchRole = (targetRole) => {
    if (targetRole === 'COUNSELLOR') {
      const counsellorUser = {
        id: MOCK_COUNSELLORS[0].id,
        email: MOCK_COUNSELLORS[0].contact.email,
        role: 'COUNSELLOR',
        fullName: MOCK_COUNSELLORS[0].fullName,
        avatarUrl: MOCK_COUNSELLORS[0].photoUrl,
        title: MOCK_COUNSELLORS[0].title
      };
      setCurrentUser(counsellorUser);
      setRole('COUNSELLOR');
    } else if (targetRole === 'ADMIN') {
      const adminUser = {
        id: "admin_001",
        email: "admin@counsellor-marketplace.com",
        role: "ADMIN",
        fullName: "Platform Admin",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        title: "Marketplace Verification Officer"
      };
      setCurrentUser(adminUser);
      setRole('ADMIN');
    } else {
      setCurrentUser(INITIAL_STUDENT_USER);
      setRole('STUDENT');
    }
  };

  const login = (email, password, selectedRole = 'STUDENT') => {
    if (selectedRole === 'COUNSELLOR' || email.includes('arti') || email.includes('counsellor')) {
      const counsellorUser = {
        id: MOCK_COUNSELLORS[0].id,
        email: email || MOCK_COUNSELLORS[0].contact.email,
        role: 'COUNSELLOR',
        fullName: MOCK_COUNSELLORS[0].fullName,
        avatarUrl: MOCK_COUNSELLORS[0].photoUrl,
        title: MOCK_COUNSELLORS[0].title
      };
      setCurrentUser(counsellorUser);
      setRole('COUNSELLOR');
      return { success: true, role: 'COUNSELLOR', redirect: '/counsellor' };
    } else if (selectedRole === 'ADMIN' || email.includes('admin')) {
      const adminUser = {
        id: "admin_001",
        email: email || "admin@counsellor-marketplace.com",
        role: "ADMIN",
        fullName: "Platform Admin",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        title: "Marketplace Verification Officer"
      };
      setCurrentUser(adminUser);
      setRole('ADMIN');
      return { success: true, role: 'ADMIN', redirect: '/admin' };
    } else {
      const studentUser = {
        ...INITIAL_STUDENT_USER,
        email: email || INITIAL_STUDENT_USER.email
      };
      setCurrentUser(studentUser);
      setRole('STUDENT');
      return { success: true, role: 'STUDENT', redirect: '/dashboard' };
    }
  };

  const register = (studentData) => {
    const newUser = {
      id: `std_${Date.now()}`,
      email: studentData.email,
      role: 'STUDENT',
      fullName: studentData.fullName,
      phone: studentData.phone || '',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      createdAt: new Date().toISOString().split('T')[0],
      profileCompletion: 30,
      targetGoal: {
        degree: studentData.targetDegree || 'Undergraduate / Postgraduate',
        targetIntake: studentData.targetIntake || 'Fall 2027',
        targetCountries: studentData.targetCountries ? [studentData.targetCountries] : ['Global'],
        budgetAnnualUSD: '$30,000 - $50,000'
      }
    };
    setCurrentUser(newUser);
    setRole('STUDENT');
    return { success: true, redirect: '/dashboard/profile' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('counselling_auth_user');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      role,
      isAuthenticated: !!currentUser,
      isAdmin: role === 'ADMIN',
      isCounsellor: role === 'COUNSELLOR',
      isStudent: role === 'STUDENT',
      login,
      register,
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
