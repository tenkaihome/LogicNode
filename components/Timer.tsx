'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

interface TimerProps {
  onTick?: (mode: 'focus' | 'break') => void;
  onSessionComplete?: (mode: 'focus' | 'break') => void;
}

export default function Timer({ onTick, onSessionComplete }: TimerProps) {
  const [timeLeft, setTimeLeft]       = useState(25 * 60);
  const [isActive, setIsActive]       = useState(false);
  const [mode, setMode]               = useState<'focus' | 'break'>('focus');
  const [totalSeconds, setTotal]      = useState(25 * 60);
  const timerRef                      = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(p => p - 1);
        if (onTick) onTick(mode);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeLeft === 0 && isActive) {
        setIsActive(false);
        if (onSessionComplete) onSessionComplete(mode);
      }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft, mode, onTick, onSessionComplete]);

  const switchMode = (m: 'focus' | 'break') => {
    setMode(m);
    setIsActive(false);
    const t = m === 'focus' ? 25 * 60 : 5 * 60;
    setTimeLeft(t);
    setTotal(t);
  };

  const resetTimer = () => {
    setIsActive(false);
    const t = mode === 'focus' ? 25 * 60 : 5 * 60;
    setTimeLeft(t);
    setTotal(t);
  };

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const R             = 96;
  const circ          = 2 * Math.PI * R;          // ≈ 603.2
  const progress      = (totalSeconds - timeLeft) / totalSeconds;
  const dashOffset    = circ - progress * circ;
  const strokeColor   = mode === 'focus' ? '#c084fc' : '#34d399';

  return (
    <div className="glass-card items-center" style={{ gap: 24 }}>

      {/* Mode tabs */}
      <div className="mode-tabs w-full">
        <button
          className={`mode-tab ${mode === 'focus' ? 'active' : ''}`}
          onClick={() => switchMode('focus')}
        >
          <Brain size={15} /> Focus
        </button>
        <button
          className={`mode-tab ${mode === 'break' ? 'active' : ''}`}
          onClick={() => switchMode('break')}
        >
          <Coffee size={15} /> Break
        </button>
      </div>

      {/* Ring */}
      <div className="timer-ring" style={{ width: 210, height: 210 }}>
        <svg className="timer-svg" viewBox="0 0 220 220">
          <circle className="timer-circle-bg" cx="110" cy="110" r={R} />
          <circle
            className="timer-circle-progress"
            cx="110" cy="110" r={R}
            style={{ strokeDasharray: circ, strokeDashoffset: dashOffset, stroke: strokeColor }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black tabular-nums text-white tracking-tight">
            {fmt(timeLeft)}
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mt-2 font-bold">
            {mode === 'focus' ? 'Flow state' : 'Rest'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 w-full">
        <button
          className={`timer-start ${isActive ? 'running' : 'idle'}`}
          onClick={() => setIsActive(a => !a)}
        >
          {isActive
            ? <><Pause size={22} fill="white" /> PAUSE</>
            : <><Play  size={22} fill="white" /> START</>
          }
        </button>
        <button className="timer-reset" onClick={resetTimer} aria-label="Reset">
          <RotateCcw size={22} />
        </button>
      </div>

    </div>
  );
}
