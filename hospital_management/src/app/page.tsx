import React from 'react';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Welcome to My App</h1>
      <p className={styles.description}>Navigate through the app using the links below.</p>

      <div className={styles.buttonContainer}>
        <a href="/signup" className={`${styles.button} ${styles.loginButton}`}>
          Login
        </a>
        <a href="/loginPage" className={`${styles.button} ${styles.signupButton}`}>
          Signup
        </a>
      </div>
    </main>
  );
}

