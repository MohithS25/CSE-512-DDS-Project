import React from 'react';
import Navbar from './_components/Navbar';
import './globals.css';
import { HospitalProvider } from './_components/Context/HospitalContext';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <HospitalProvider> {/* Wrap the entire body with HospitalProvider */}
          <Navbar /> {/* Include Navbar */}
          <main>{children}</main> {/* Include the children */}
        </HospitalProvider>
      </body>
    </html>
  );
};

export default RootLayout;
