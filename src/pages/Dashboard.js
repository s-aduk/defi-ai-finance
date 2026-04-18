import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import WalletBanner from '../components/WalletBanner';
import styles from './Dashboard.module.css';

const ACTIVITY_DATA = [
  { day: 'Mon', value: 35 }, { day: 'Tue', value: 55 }, { day: 'Wed', value: 42 },
  { day: 'Thu', value: 70 }, { day: 'Fri', value: 48 }, { day: 'Sat', value: 85 },
  { day: 'Sun', value: 62 },
];

const ASSETS = [
  { symbol: 'ETH', name: 'Ethereum',   value: '$11,234', change: '+3.4%',  up: true,  bg: 'rgba(98,126,234,0.18)',  color: '#c4b5fd' },
  { symbol: 'AIF', name: 'AI Finance', value: '$840',    change: '+12.1%', up: true,  bg: 'rgba(20,184,166,0.16)', color: '#5eead4' },
  { symbol: 'BTC', name: 'Bitcoin',    value: '$406',    change: '-1.2%',  up: false, bg: 'rgba(245,158,11,0.16)', color: '#fcd34d' },
];

const TRANSACTIONS = [
  { type: 'receive', label: 'Received ETH',      date: 'Apr 14, 2026 · 14:32', amount: '+0.5 ETH',  up: true  },
  { type: 'stake',   label: 'Staked AIF tokens', date: 'Apr 13, 2026 · 09:15', amount: '200 AIF',   up: null  },
  { type: 'send',    label: 'Sent ETH',           date: 'Apr 11, 2026 · 17:44', amount: '-0.2 ETH',  up: false },
  { type: 'reward',  label: 'Staking rewards',    date: 'Apr 10, 2026 · 00:00', amount: '+42 AIF',   up: true  },
];

const TX_ICONS = {
  receive: { stroke: '#4ade80', bg: 'rgba(34,197,94,0.13)',   d: 'M12 5v14M5 12l7 7 7-7' },
  send:    { stroke: '#f87171', bg: 'rgba(239,68,68,0.10)',   d: 'M12 19V5M5 12l7-7 7 7' },
  stake:   { stroke: '#c4b5fd', bg: 'rgba(124,58,237,0.13)',  d: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  reward:  { stroke: '#5eead4', bg: 'rgba(20,184,166,0.13)',  d: 'M22 12h-4l-3 9L9 3l-3 9H2' },
};

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-raised)', border: '0.5px solid var(--border-mid)', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}>
        {payload[0].value}
      </div>
    );
  }
  return null;
}

export default function Dashboard({ wallet, onConnect }) {
  return (
    <div className={styles.page}>
      {!wallet && <WalletBanner onConnect={onConnect} />}

      {wallet && (
        <div className={styles.walletInfo}>
          <div className={styles.walletAvatar}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2">
              <path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/>
              <path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
          </div>
          <div>
            <div className={styles.walletLabel}>Connected Wallet</div>
            <div className={styles.walletAddr}>{wallet} · Ethereum Mainnet</div>
          </div>
          <div className={styles.onlineDot} />
        </div>
      )}

      {/* Stats */}
      <div className={styles.statsGrid}>
        <StatCard label="Portfolio Value" value="$12,480" sub="+5.2% this week" subType="up" />
        <StatCard label="ETH Balance"     value="3.84 ETH" sub="$11,234 USD" />
        <StatCard label="Staked Tokens"   value="1,200 AIF" sub="+42 rewards" subType="up" />
        <StatCard label="Total Earned"    value="$386" sub="+$18 today" subType="up" />
      </div>

      {/* Charts row */}
      <div className={styles.midGrid}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Portfolio activity (7 days)</p>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart data={ACTIVITY_DATA} barSize={18}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="value" fill="var(--purple)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>Asset allocation</p>
          {ASSETS.map(a => (
            <div key={a.symbol} className={styles.assetRow}>
              <div className={styles.assetLeft}>
                <div className={styles.assetIcon} style={{ background: a.bg, color: a.color }}>{a.symbol}</div>
                <div>
                  <div className={styles.assetName}>{a.name}</div>
                  <div className={styles.assetSym}>{a.symbol}</div>
                </div>
              </div>
              <div className={styles.assetRight}>
                <div>{a.value}</div>
                <div className={a.up ? 'up' : 'down'} style={{ fontSize: 11 }}>{a.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className={`${styles.card} ${styles.fullCard}`}>
        <p className={styles.cardTitle}>Recent transactions</p>
        <div className={styles.txList}>
          {TRANSACTIONS.map((tx, i) => {
            const ico = TX_ICONS[tx.type];
            return (
              <div key={i} className={styles.txItem}>
                <div className={styles.txLeft}>
                  <div className={styles.txIcon} style={{ background: ico.bg }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ico.stroke} strokeWidth="2">
                      <path d={ico.d} />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.txName}>{tx.label}</div>
                    <div className={styles.txDate}>{tx.date}</div>
                  </div>
                </div>
                <div className={tx.up === true ? 'up' : tx.up === false ? 'down' : 'muted'} style={{ fontSize: 13 }}>
                  {tx.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
