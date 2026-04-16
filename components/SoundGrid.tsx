'use client';

import React, { useState, useRef } from 'react';
import { CloudRain, Waves, Wind, Flame, Coffee, Trees, Volume2, StopCircle } from 'lucide-react';

const SOUNDS = [
  { id: 'rain',   name: 'Rain',   Icon: CloudRain, url: 'https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg' },
  { id: 'waves',  name: 'Ocean',  Icon: Waves,     url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg' },
  { id: 'wind',   name: 'Wind',   Icon: Wind,      url: 'https://actions.google.com/sounds/v1/weather/strong_wind.ogg' },
  { id: 'fire',   name: 'Fire',   Icon: Flame,     url: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg' },
  { id: 'cafe',   name: 'Cafe',   Icon: Coffee,    url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg' },
  { id: 'forest', name: 'Forest', Icon: Trees,     url: 'https://actioncall.github.io/actioncall/assets/audio/forest.mp3' },
];

type SoundState = Record<string, { volume: number; playing: boolean }>;

export default function SoundGrid() {
  const [states, setStates]       = useState<SoundState>({});
  const audioRefs                 = useRef<Record<string, HTMLAudioElement>>({});

  const toggle = (id: string, url: string) => {
    const isPlaying = states[id]?.playing ?? false;
    const currentVol = states[id]?.volume ?? 0.6;

    if (!audioRefs.current[id]) {
      const a = new Audio(url);
      a.loop = true;
      a.volume = currentVol;
      audioRefs.current[id] = a;
    }

    if (isPlaying) {
      audioRefs.current[id].pause();
    } else {
      // Đảm bảo volume được set trước khi play
      audioRefs.current[id].volume = currentVol;
      audioRefs.current[id].play().catch(err => console.error("Audio play failed:", err));
    }

    setStates(prev => ({ 
      ...prev, 
      [id]: { volume: currentVol, playing: !isPlaying } 
    }));
  };

  const setVol = (id: string, v: number) => {
    if (audioRefs.current[id]) {
      audioRefs.current[id].volume = v;
    }
    setStates(prev => ({ 
      ...prev, 
      [id]: { ...prev[id], volume: v } 
    }));
  };

  const stopAll = () => {
    Object.values(audioRefs.current).forEach(a => {
      a.pause();
      a.currentTime = 0;
    });
    setStates(prev => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach(key => {
        newStates[key] = { ...newStates[key], playing: false };
      });
      return newStates;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-indigo-500 rounded-full" />
          <h2 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.25em]">Ambient Sounds</h2>
        </div>
        <button
          onClick={stopAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-500 hover:text-white text-[11px] font-bold transition-all"
        >
          <StopCircle size={13} /> Stop All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {SOUNDS.map(({ id, name, Icon, url }) => {
          const on  = states[id]?.playing ?? false;
          const vol = states[id]?.volume  ?? 0.6;

          return (
            <div key={id} className={`sound-card ${on ? 'active' : ''}`}>
              <button
                className={`sound-icon-btn ${on ? 'active' : ''}`}
                onClick={() => toggle(id, url)}
              >
                <Icon size={26} strokeWidth={on ? 2 : 1.5} />
              </button>

              <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${on ? 'text-purple-300' : 'text-zinc-600'}`}>
                {name}
              </span>

              <div
                className="flex items-center gap-2 w-full"
                style={{ opacity: on ? 1 : 0, pointerEvents: on ? 'auto' : 'none', transition: 'opacity 0.2s' }}
              >
                <Volume2 size={12} className="text-zinc-600 flex-shrink-0" />
                <input
                  type="range" min="0" max="1" step="0.01" value={vol}
                  onChange={e => setVol(id, parseFloat(e.target.value))}
                  className="w-full h-[3px] cursor-pointer appearance-none rounded-full"
                  style={{ accentColor: '#9333ea' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
