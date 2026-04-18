import React from 'react';
import styles from './StatCard.module.css';

export default function StatCard({ label, value, sub, subType }) {
  const subClass = subType === 'up' ? 'up' : subType === 'down' ? 'down' : 'muted';
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {sub && <p className={`${styles.sub} ${subClass}`}>{sub}</p>}
    </div>
  );
}
