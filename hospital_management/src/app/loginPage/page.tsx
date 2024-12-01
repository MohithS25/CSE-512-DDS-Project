import React from 'react';
import Login from '@/app/_components/Login';
import styles from '../page.module.css'; 

const LoginPage: React.FC = () => {
  return (
    <main className={styles.container}>
      <Login />
      </main>);
};

export default LoginPage;
