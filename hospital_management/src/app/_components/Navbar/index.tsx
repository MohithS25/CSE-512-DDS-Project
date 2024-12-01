'use client'; // If interactivity is required

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#282c34', padding: '10px' }}>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
        {/* Home Link */}
        <li style={{ marginRight: '20px' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Link>
        </li>

        {/* Login Link */}
        <li style={{ marginRight: '20px' }}>
          <Link href="/loginPage" style={{ color: 'white', textDecoration: 'none' }}>
            Signup
          </Link>
        </li>

        {/* Signup Link */}
        <li>
          <Link href="/signup" style={{ color: 'white', textDecoration: 'none' }}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
