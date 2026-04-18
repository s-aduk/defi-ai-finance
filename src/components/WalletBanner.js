import React from 'react';
import styles from './WalletBanner.module.css';

export default function WalletBanner({ onConnect }) {
  return (
    <div className={styles.banner}>
      <span>Connect your wallet to see live data</span>
      <button className={styles.btn} onClick={onConnect}>Connect Wallet</button>
    </div>
  );
}
