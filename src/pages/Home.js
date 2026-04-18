import React from 'react';
import styles from './Home.module.css';

const FEATURES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
    color: 'purple',
    title: 'Smart Dashboard',
    desc: 'View your assets, transaction history, and real-time portfolio updates in one place.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: 'teal',
    title: 'AI Price Prediction',
    desc: 'Leverage trained AI models to forecast crypto asset prices and make informed decisions.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    color: 'amber',
    title: 'Token Staking',
    desc: 'Stake your tokens in smart contracts and earn passive rewards automatically.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: 'red',
    title: 'Secure by Design',
    desc: 'Your funds stay in your MetaMask wallet. We never store your private keys.',
  },
];

const STATS = [
  { value: '$4.2B',  label: 'Total Value Locked',     color: 'var(--purple-light)' },
  { value: '12.4%',  label: 'Average APY',             color: 'var(--teal-light)'   },
  { value: '89%',    label: 'AI Prediction Accuracy',  color: 'var(--amber-light)'  },
  { value: '24,800+',label: 'Active Users',            color: 'var(--green-light)'  },
];

export default function Home({ onNavigate }) {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.badge}>Powered by Ethereum + AI</div>
        <h1 className={styles.h1}>
          The future of <span className={styles.accent}>decentralized</span> finance is here
        </h1>
        <p className={styles.subtitle}>
          AI Finance combines blockchain technology with artificial intelligence to give you smarter
          DeFi tools — stake, predict, and manage your assets with confidence.
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.btnPrimary} onClick={() => onNavigate('dashboard')}>
            Open Dashboard
          </button>
          <button className={styles.btnSecondary} onClick={() => onNavigate('staking')}>
            Start Staking
          </button>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresGrid}>
        {FEATURES.map(f => (
          <div key={f.title} className={`${styles.featureCard} ${styles[f.color]}`}>
            <div className={styles.featureIcon}>{f.icon}</div>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Platform stats */}
      <section className={styles.statsBar}>
        {STATS.map(s => (
          <div key={s.label} className={styles.statItem}>
            <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
