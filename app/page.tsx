'use client';

import React, { useState, useEffect } from 'react';
import Timer from '@/components/Timer';
import SoundGrid from '@/components/SoundGrid';
import Radio from '@/components/Radio';
import DonationModal from '@/components/DonationModal';
import TaskManager from '@/components/TaskManager';
import { Settings, Coffee, Image as ImageIcon, Zap, Users } from 'lucide-react';
import Image from 'next/image';

const backgrounds = [
  { id: 'default', url: '/background.png', name: 'Cyber City' },
  { id: 'forest',  url: '/bg2.png',        name: 'Secret Garden' },
  { id: 'cafe',    url: '/bg3.png',         name: 'Midnight Cafe' },
];

export default function Home() {
  const [currentBg, setCurrentBg]     = useState(backgrounds[0]);
  const [isDonationOpen, setDonation] = useState(false);
  const [showBgMenu, setShowBgMenu]   = useState(false);
  const [visitors, setVisitors]       = useState(438);

  const [focusSeconds, setFocusSeconds] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    const savedFocus = localStorage.getItem('LOGICNODE_focus_secs');
    const savedSessions = localStorage.getItem('LOGICNODE_sessions');
    if (savedFocus) setFocusSeconds(parseInt(savedFocus, 10));
    if (savedSessions) setSessionsCompleted(parseInt(savedSessions, 10));

    const visitorInterval = setInterval(() => {
      setVisitors(prev => prev + (Math.random() > 0.6 ? Math.floor(Math.random() * 2) + 1 : 0));
    }, 7000);
    return () => clearInterval(visitorInterval);
  }, []);

  const handleTick = (mode: 'focus' | 'break') => {
    if (mode === 'focus') {
      setFocusSeconds(prev => {
        const newVal = prev + 1;
        localStorage.setItem('LOGICNODE_focus_secs', newVal.toString());
        return newVal;
      });
    }
  };

  const handleSessionComplete = (mode: 'focus' | 'break') => {
    if (mode === 'focus') {
      setSessionsCompleted(prev => {
        const newVal = prev + 1;
        localStorage.setItem('LOGICNODE_sessions', newVal.toString());
        return newVal;
      });
    }
  };

  const dailyGoalSeconds = 14400; // 4 hours
  const progressPercent = Math.min(100, Math.round((focusSeconds / dailyGoalSeconds) * 100));
  const focusTimeHr = (focusSeconds / 3600).toFixed(1);

  return (
    <>
      {/* ── Background ── */}
      <div className="bg-image" style={{ backgroundImage: `url('${currentBg.url}')` }} />

      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="site-header-inner">
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src="/logo.png" alt="LOGICNODE" width={34} height={34} priority className="logo-img" />
            </div>
            <div>
              <h1 style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                LOGICNODE <Zap size={13} style={{ color: '#ccff00', fill: '#ccff00' }} />
              </h1>
              <p style={{ fontSize: 10, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, marginTop: 3 }}>
                Systems Architecture
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Scene */}
            <div style={{ position: 'relative' }}>
              <button className="btn btn-ghost" onClick={() => setShowBgMenu(v => !v)}>
                <ImageIcon size={15} style={{ color: '#ccfc03' }} /> Scene
              </button>
              {showBgMenu && (
                <div className="scene-dropdown">
                  {backgrounds.map(bg => (
                    <button
                      key={bg.id}
                      className={`scene-item ${currentBg.id === bg.id ? 'active' : ''}`}
                      onClick={() => { setCurrentBg(bg); setShowBgMenu(false); }}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', color: '#d4d4d8', fontSize: 12, fontWeight: 700, background: 'rgba(255,255,255,0.06)', borderRadius: 999, height: 34, border: '1px solid rgba(255,255,255,0.1)' }}>
              <Users size={14} style={{ color: '#ccfc03' }} />
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{visitors}</span>
            </div>

            <button className="btn-icon"><Settings size={17} /></button>

            <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />

            <button className="btn-coffee" onClick={() => setDonation(true)}>
              <Coffee size={15} /> Support
            </button>
          </nav>
        </div>
      </header>

      {/* ── SHADOW BRIDGE — visually detaches header from body ── */}
      <div className="header-shadow-bridge" />

      {/* ── MAIN ── */}
      <main style={{ height: 'calc(100vh - 68px)', overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="main-container" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr 320px', gap: 20, alignItems: 'start' }}>

              {/* ── LEFT — Timer + Stats + Tasks ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Timer onTick={handleTick} onSessionComplete={handleSessionComplete} />

                {/* Flow Analytics ── stats */}
                <div className="glass-card" style={{ gap: 0 }}>
                  {/* Section heading */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                    <div style={{ width: 22, height: 4, background: '#e6ff00', borderRadius: 999 }} />
                    <span style={{ fontSize: 11, fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
                      Flow Analytics
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="card-section" style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Daily Goal
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 900, color: '#ccff00' }}>{progressPercent}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progressPercent}%`, borderRadius: 999, background: 'linear-gradient(90deg,#e6ff00,#ccfc03)', transition: 'width 1s linear' }} />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { label: 'Focus Time', value: focusTimeHr, unit: 'hr' },
                      { label: 'Sessions',   value: sessionsCompleted.toString(), unit: '' },
                    ].map(s => (
                      <div key={s.label} className="card-section" style={{ textAlign: 'center', padding: '14px 10px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>
                          {s.label}
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                          {s.value}
                          {s.unit && <small style={{ fontSize: 13, color: '#52525b', fontWeight: 500, marginLeft: 4 }}>{s.unit}</small>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task Manager */}
                <div className="glass-card">
                  <TaskManager />
                </div>
              </div>

              {/* ── CENTER — Ambient Sounds ── */}
              <div>
                <SoundGrid />
              </div>

              {/* ── RIGHT — Radio + Inspiration ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Radio />

                <div className="glass-card" style={{ padding: 24, gap: 0 }}>
                  <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.05 }}>
                    <Zap size={100} />
                  </div>
                  <p style={{ fontSize: 10, fontWeight: 900, color: '#3f3f46', textTransform: 'uppercase', letterSpacing: '0.35em', marginBottom: 14 }}>
                    Inspiration
                  </p>
                  <p style={{ fontStyle: 'italic', fontSize: 14, color: '#d4d4d8', lineHeight: 1.7, fontWeight: 500 }}>
                    "Focus is a matter of deciding what things you're not going to do."
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#e6ff00', marginTop: 14, letterSpacing: '0.1em' }}>
                    — John Carmack
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="main-container" style={{ paddingBottom: 24 }}>
          <p style={{ textAlign: 'center', fontSize: 10, color: '#27272a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6em' }}>
            LOGICNODE v2.0 — Made with ♥
          </p>
        </div>
      </main>

      <DonationModal isOpen={isDonationOpen} onClose={() => setDonation(false)} />
    </>
  );
}
