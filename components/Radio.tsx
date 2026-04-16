'use client';

import React, { useState } from 'react';
import { Radio as RadioIcon, ChevronDown, ExternalLink } from 'lucide-react';

const STATIONS = [
  { id: 'jfKfPfyJRdk', name: 'Lofi Girl — Hip Hop' },
  { id: '5yx6BWlEVcY', name: 'Coffee Shop Lofi' },
  { id: '4xDzrJKXOOY', name: 'Synthwave Radio' },
  { id: 'uH3YV9pP6nQ', name: 'Jazz Hop Cafe' },
];

export default function Radio() {
  const [station, setStation] = useState(STATIONS[0]);
  const [open, setOpen]       = useState(false);

  return (
    <div className="glass-card" style={{ gap: 20 }}>
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl text-indigo-400"
            style={{ width: 42, height: 42, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <RadioIcon size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-black text-white leading-none">Atmosphere</p>
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold mt-1">Live Radio</p>
          </div>
        </div>

        {/* Station picker */}
        <div className="relative">
          <button
            className="btn btn-ghost text-xs"
            style={{ height: 38, padding: '0 16px', gap: 8 }}
            onClick={() => setOpen(v => !v)}
          >
            Switch
            <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
          </button>

          {open && (
            <div className="scene-dropdown" style={{ minWidth: 220 }}>
              {STATIONS.map(s => (
                <button
                  key={s.id}
                  className={`scene-item ${s.id === station.id ? 'active' : ''}`}
                  onClick={() => { setStation(s); setOpen(false); }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video embed */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.08)', background: '#000', aspectRatio: '16/9' }}
      >
        <iframe
          width="100%" height="100%"
          src={`https://www.youtube.com/embed/${station.id}?autoplay=0&controls=1&modestbranding=1&rel=0`}
          title="Radio"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'block' }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.4em]">Now playing</p>
          <p className="text-xs font-black text-indigo-300 mt-0.5 truncate max-w-[180px]">{station.name}</p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${station.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-icon"
          style={{ width: 38, height: 38 }}
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
