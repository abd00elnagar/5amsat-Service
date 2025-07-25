'use client';

import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
} 