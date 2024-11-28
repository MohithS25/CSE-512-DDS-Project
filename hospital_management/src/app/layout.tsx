import React from 'react';
import Navbar from './_components/Navbar';
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'An awesome app built with Next.js',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
