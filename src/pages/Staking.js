import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import styles from './Staking.module.css';

const STAKING_HISTORY = [
  { type: 'stake',  label: 'Staked 1,000 AIF',  date: 'Apr 1, 2026',  amount: null,     status: 'Active' },
  { type: 'reward', label: 'Rewards claimed',    date: 'Mar 31, 2026', amount: '+38 AIF', status: null     },
  { type: 'stake',  label: 'Staked 200 AIF',     date: 'Mar 15, 2026', amount: null,     status: 'Completed' },
];

const APY = 0.124;

export default function Staking({ wallet, onConnect, showToast }) {
  const [amount, setAmount] = useState('');

  const parsed   = parseFloat(amount) || 0;
  const daily    = (parsed * APY / 365).toFixed(2);
  const yearly   = (parsed * APY).toFixed(2);

  function handleStake() {
    if (!wallet)         { showToast('Please connect your wallet first', 'error'); return; }
    if (parsed <= 0)     { showToast('Enter a valid amount', 'error'); return; }
    showToast('Staking transaction submitted to blockchain', 'success');
    setAmount('');
  }

  function handleUnstake() {
    if (!wallet) { showToast('Please connect your wallet first', 'error'); return; }
    showToast('Unstaking request submitted', 'info');
  }

  function handleClaim() {
    if (!wallet) { showToast('Please connect your wallet first', 'error'); return; }
    showToast('Rewards claimed successfully!', 'success');
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>Staking</h2>

      {/* Main stake card */}
      <div className={styles.stakeCard}>
        <div className={styles.stakeHeader}>
          <div>
            <div className={styles.poolName}>AIF Staking Pool</div>
            <div className={styles.poolSub}>Stake AIF tokens to earn rewards</div>
          </div>
          <div className={styles.apyBadge}>12.4% APY</div>
        </div>

        <div className={styles.divider} />

        <label className={styles.inputLabel}>Amount to stake</label>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="number"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <button className={styles.maxBtn} onClick={() => setAmount('1000')}>MAX</button>
        </div>

        <button className={styles.stakeBtn} onClick={handleStake}>
          Stake tokens
        </button>

        {/* Live preview */}
        <div className={styles.previewGrid}>
          <div className={styles.previewItem}>
            <div className={styles.previewVal}>{parsed.toFixed(2)}</div>
            <div className={styles.previewLbl}>Tokens to stake</div>
          </div>
          <div className={styles.previewItem}>
            <div className={styles.previewVal}>{daily}</div>
            <div className={styles.previewLbl}>Est. daily reward</div>
          </div>
          <div className={styles.previewItem}>
            <div className={styles.previewVal}>{yearly}</div>
            <div className={styles.previewLbl}>Est. yearly return</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <StatCard label="Your staked balance" value="1,200 AIF" sub="Since Apr 1, 2026" />
        <StatCard label="Pending rewards"     value="42 AIF"    sub="+0.3 AIF / hr" subType="up" />
        <StatCard label="Total pool size"     value="8.4M AIF"  sub="Pool utilization 84%" />
        <StatCard label="Lock period"         value="30 days"   sub="Flexible unstaking" />
      </div>

      {/* Actions */}
      <div className={styles.actionsRow}>
        <button className={styles.actionBtn} onClick={handleClaim}>
          Claim rewards
          <span className={styles.rewardBadge}>42 AIF</span>
        </button>
        <button className={`${styles.actionBtn} ${styles.outlineBtn}`} onClick={handleUnstake}>
          Unstake tokens
        </button>
      </div>

      {/* History */}
      <div className={styles.historyCard}>
        <p className={styles.cardTitle}>Staking history</p>
        <div className={styles.txList}>
          {STAKING_HISTORY.map((tx, i) => (
            <div key={i} className={styles.txItem}>
              <div className={styles.txLeft}>
                <div
                  className={styles.txIcon}
                  style={{
                    background: tx.type === 'reward'
                      ? 'rgba(20,184,166,0.13)'
                      : 'rgba(124,58,237,0.13)',
                  }}
                >
                  {tx.type === 'reward' ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className={styles.txName}>{tx.label}</div>
                  <div className={styles.txDate}>{tx.date}</div>
                </div>
              </div>
              <div>
                {tx.amount && <span className="up" style={{ fontSize: 13 }}>{tx.amount}</span>}
                {tx.status  && <span className={styles.statusTag}>{tx.status}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
