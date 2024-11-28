'use client'; // If interactivity is required

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#282c34', padding: '10px' }}>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li style={{ marginRight: '20px' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
