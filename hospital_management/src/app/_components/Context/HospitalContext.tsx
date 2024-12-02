// app/_components/Context/HospitalContext.tsx

"use client"; // <-- This tells Next.js that this file is a client-side component

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the hospital type
interface Hospital {
  name: string;
  location: string;
  address: string;
}

// Create a context with default value of null
const HospitalContext = createContext<{
  hospital: Hospital | null;
  setHospital: (hospital: Hospital) => void;
} | null>(null);

// Create a provider component
export const HospitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hospital, setHospital] = useState<Hospital | null>(null);

  return (
    <HospitalContext.Provider value={{ hospital, setHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

// Custom hook to use the context
export const useHospitalContext = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospitalContext must be used within a HospitalProvider');
  }
  return context;
};
