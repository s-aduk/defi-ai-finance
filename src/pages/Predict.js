import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import StatCard from '../components/StatCard';
import styles from './Predict.module.css';

const ASSETS = [
  { value: 'eth', label: 'Ethereum (ETH)' },
  { value: 'btc', label: 'Bitcoin (BTC)'  },
  { value: 'aif', label: 'AI Finance (AIF)' },
  { value: 'bnb', label: 'Binance Coin (BNB)' },
];

const TIMEFRAMES = [
  { value: '1d',  label: '24 hours' },
  { value: '7d',  label: '7 days'   },
  { value: '30d', label: '30 days'  },
];

const ASSET_DATA = {
  eth: { name: 'ETH', current: 2920,   delta: 3.4,  analysis: 'Strong bullish momentum detected. On-chain activity is up 18% this week. The AI model forecasts continued upside driven by institutional accumulation signals and ETF inflow data.' },
  btc: { name: 'BTC', current: 64800,  delta: 2.1,  analysis: 'Consolidation phase near key resistance at $65k. Sentiment indicators lean moderately bullish. Whale wallet inflows suggest quiet accumulation before the next leg up.' },
  aif: { name: 'AIF', current: 0.42,   delta: 12.1, analysis: 'High-volatility token. Staking volume increased sharply over the past 72 hours. Momentum indicators suggest a short-term breakout potential, though with elevated risk.' },
  bnb: { name: 'BNB', current: 580,    delta: 1.8,  analysis: 'Stable trend with low volatility. Exchange volumes remain steady. AI model suggests modest upside with low downside risk in the forecast window.' },
};

function generateSparkline(current, delta, points = 14) {
  const target = current * (1 + delta / 100);
  return Array.from({ length: points }, (_, i) => {
    const progress = i / (points - 1);
    const noise    = (Math.random() - 0.42) * current * 0.018;
    const val      = current + (target - current) * progress * 0.85 + noise;
    return { t: `T${i + 1}`, price: parseFloat(val.toFixed(4)) };
  });
}

function fmt(val) {
  if (val < 1)   return '$' + val.toFixed(3);
  if (val < 100) return '$' + val.toFixed(2);
  return '$' + Math.round(val).toLocaleString();
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-raised)', border: '0.5px solid var(--border-mid)', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
        {fmt(payload[0].value)}
      </div>
    );
  }
  return null;
}

export default function Predict({ showToast }) {
  const [asset,     setAsset]     = useState('eth');
  const [timeframe, setTimeframe] = useState('1d');
  const [result,    setResult]    = useState(null);
  const [loading,   setLoading]   = useState(false);

  const TF_LABELS = { '1d': '24h', '7d': '7-day', '30d': '30-day' };

  function runPrediction() {
    setLoading(true);
    setResult(null);
    // Simulate API latency — replace with real AI model API call:
    // const res = await fetch('/api/predict', { method:'POST', body: JSON.stringify({ asset, timeframe }) });
    setTimeout(() => {
      const d         = ASSET_DATA[asset];
      const predicted = d.current * (1 + d.delta / 100);
      const sparkData = generateSparkline(d.current, d.delta);
      setResult({ d, predicted, sparkData, tfLabel: TF_LABELS[timeframe] });
      setLoading(false);
      showToast('AI prediction generated', 'success');
    }, 900);
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>AI Price Prediction</h2>

      {/* Form */}
      <div className={styles.formCard}>
        <p className={styles.formHint}>
          Select an asset and timeframe to generate an AI-powered price forecast.
        </p>
        <div className={styles.formGrid}>
          <select
            className={styles.select}
            value={asset}
            onChange={e => setAsset(e.target.value)}
          >
            {ASSETS.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>

          <select
            className={styles.select}
            value={timeframe}
            onChange={e => setTimeframe(e.target.value)}
          >
            {TIMEFRAMES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <button
            className={styles.predictBtn}
            onClick={runPrediction}
            disabled={loading}
          >
            {loading ? 'Analysing...' : 'Run AI prediction'}
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <span className={styles.resultTitle}>
              {result.d.name} — {result.tfLabel} Forecast
            </span>
            <span className={styles.confidenceBadge}>89% confidence</span>
          </div>

          <div className={styles.priceGrid}>
            <div className={styles.priceItem}>
              <div className={`${styles.priceVal} muted`}>{fmt(result.d.current)}</div>
              <div className={styles.priceLbl}>Current price</div>
            </div>
            <div className={styles.priceItem}>
              <div className={`${styles.priceVal} up`}>{fmt(result.predicted)}</div>
              <div className={styles.priceLbl}>Predicted price</div>
            </div>
            <div className={styles.priceItem}>
              <div className={`${styles.priceVal} up`}>+{result.d.delta}%</div>
              <div className={styles.priceLbl}>Expected change</div>
            </div>
          </div>

          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={110}>
              <AreaChart data={result.sparkData}>
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" hide />
                <YAxis domain={['auto','auto']} hide />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#9d5ff5"
                  strokeWidth={2}
                  fill="url(#sparkGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.analysisBox}>
            <div className={styles.analysisLabel}>AI Analysis</div>
            <p className={styles.analysisText}>{result.d.analysis}</p>
          </div>
        </div>
      )}

      {/* Platform stats */}
      <div className={styles.statsGrid}>
        <StatCard label="Model accuracy"    value="89%"   sub="30-day avg" subType="up" />
        <StatCard label="Predictions made"  value="2,841" sub="All time" />
        <StatCard label="Market sentiment"  value="Bullish" sub="+4.1% 24h" subType="up" />
      </div>

      {/* Disclaimer */}
      <p className={styles.disclaimer}>
        AI predictions are for informational purposes only and do not constitute financial advice.
        Past model accuracy does not guarantee future results.
      </p>
    </div>
  );
}
