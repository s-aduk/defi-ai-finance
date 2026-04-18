import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Staking from './pages/Staking';
import Predict from './pages/Predict';
import styles from './styles/App.module.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [wallet, setWallet] = useState(null); // null = disconnected
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const connectWallet = useCallback(() => {
    if (wallet) return;
    // TODO: Replace with real MetaMask call:
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const mockAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    setWallet(mockAddress);
    showToast('Wallet connected successfully', 'success');
  }, [wallet, showToast]);

  const pages = { home: Home, dashboard: Dashboard, staking: Staking, predict: Predict };
  const PageComponent = pages[page] || Home;

  return (
    <div className={styles.app}>
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        wallet={wallet}
        onConnect={connectWallet}
      />
      <main className={styles.main}>
        <PageComponent
          wallet={wallet}
          onConnect={connectWallet}
          onNavigate={setPage}
          showToast={showToast}
        />
      </main>
      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  );
}
