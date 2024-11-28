import React from 'react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Welcome to My App</h1>
      <p>Navigate through the app using the links in the navbar.</p>
    </div>
  );
}
