import React from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'home',      label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'staking',   label: 'Staking' },
  { id: 'predict',   label: 'AI Predict' },
];

function shortAddress(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
}

export default function Navbar({ currentPage, onNavigate, wallet, onConnect }) {
  return (
    <nav className={styles.nav}>
      <button className={styles.logo} onClick={() => onNavigate('home')}>
        <span className={styles.logoDot} />
        AI Finance
      </button>

      <div className={styles.links}>
        {NAV_LINKS.map(link => (
          <button
            key={link.id}
            className={`${styles.link} ${currentPage === link.id ? styles.active : ''}`}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </div>

      <button
        className={`${styles.walletBtn} ${wallet ? styles.connected : ''}`}
        onClick={onConnect}
      >
        {wallet ? (
          <>
            <span className={styles.dot} />
            {shortAddress(wallet)}
          </>
        ) : (
          'Connect Wallet'
        )}
      </button>
    </nav>
  );
}
