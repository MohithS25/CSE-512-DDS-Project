import React from 'react';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={`${styles.heading} ${styles.fadeIn}`}>GROUP X</h1>
      <h2 className={`${styles.description} ${styles.zoomIn}`}>
        Healthcare Information Systems
      </h2>
      
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
