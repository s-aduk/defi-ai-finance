import React from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, type }) {
  return (
    <div className={`${styles.toast} ${styles[type] || ''}`}>
      <span className={styles.icon}>
        {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
      </span>
      {message}
    </div>
  );
}
