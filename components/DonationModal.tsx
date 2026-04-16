'use client';

import React from 'react';
import { X, Coffee, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Props { isOpen: boolean; onClose: () => void; }

export default function DonationModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', textAlign: 'center' }}
      >
        {/* Close button — anchored inside the box */}
        <button
          onClick={onClose}
          className="btn-icon"
          style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: 12 }}
        >
          <X size={17} />
        </button>

        {/* Coffee icon */}
        <div style={{
          width: 60, height: 60, borderRadius: 18,
          background: 'rgba(234,179,8,0.15)',
          border: '1px solid rgba(234,179,8,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <Coffee size={28} style={{ color: '#facc15' }} />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 10 }}>
          Buy me a coffee
        </h2>
        <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.7, marginBottom: 24 }}>
          ScriptFlow is free. If you find it useful, a small tip keeps the project alive. Thank you! ☕
        </p>

        {/* QR Code */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 12,
          display: 'inline-block', marginBottom: 24,
        }}>
          <Image
            src="/qr.jpg"
            alt="Donation QR"
            width={168}
            height={168}
            style={{ borderRadius: 8, display: 'block' }}
          />
        </div>

        {/* Donate button */}
        <a
          href="https://buymeacoffee.com/logicnode"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-coffee"
          style={{
            display: 'flex', width: '100%', justifyContent: 'center',
            height: 50, borderRadius: 14, fontSize: 14,
            marginBottom: 14, textDecoration: 'none',
          }}
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink size={16} /> Donate via Link
        </a>

        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, color: '#52525b', display: 'block', width: '100%',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
          onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
