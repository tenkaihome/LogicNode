'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, CheckCheck } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks]   = useState<Task[]>([
    { id: 1, text: 'Read 20 pages', done: false },
    { id: 2, text: 'Write summary notes', done: true },
  ]);
  const [input, setInput]   = useState('');
  const [showDone, setShowDone] = useState(false);

  const add = () => {
    const text = input.trim();
    if (!text) return;
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const toggle = (id: number) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const remove = (id: number) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  const clearDone = () =>
    setTasks(prev => prev.filter(t => !t.done));

  const pending = tasks.filter(t => !t.done);
  const done    = tasks.filter(t =>  t.done);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 24, height: 4, background: '#7c3aed', borderRadius: 999 }} />
          <span style={{ fontSize: 11, fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
            Tasks
          </span>
          {pending.length > 0 && (
            <span style={{
              fontSize: 10, fontWeight: 900, background: 'rgba(124,58,237,0.3)',
              color: '#c084fc', borderRadius: 999, padding: '2px 8px',
              border: '1px solid rgba(192,132,252,0.25)',
            }}>
              {pending.length}
            </span>
          )}
        </div>
        {done.length > 0 && (
          <button
            onClick={clearDone}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, fontWeight: 700, color: '#52525b',
              background: 'transparent', border: 'none', cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#d4d4d8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
          >
            <Trash2 size={13} /> Clear done
          </button>
        )}
      </div>

      {/* Add input */}
      <div style={{
        display: 'flex', gap: 8,
        background: 'rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14, padding: '8px 8px 8px 14px',
      }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a task…"
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#e4e4e7', fontSize: 13, fontWeight: 500,
          }}
        />
        <button
          onClick={add}
          style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: input.trim() ? '#7c3aed' : 'rgba(255,255,255,0.05)',
            border: '1px solid ' + (input.trim() ? 'transparent' : 'rgba(255,255,255,0.08)'),
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Pending tasks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {pending.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '20px 0',
            fontSize: 12, color: '#3f3f46', fontStyle: 'italic',
          }}>
            No pending tasks — enjoy your flow! 🎧
          </div>
        )}
        {pending.map(task => (
          <TaskRow key={task.id} task={task} onToggle={toggle} onRemove={remove} />
        ))}
      </div>

      {/* Done section */}
      {done.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button
            onClick={() => setShowDone(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 700, color: '#3f3f46',
              textTransform: 'uppercase', letterSpacing: '0.2em',
              padding: '4px 0',
            }}
          >
            <CheckCheck size={13} className="text-green-600" />
            Completed ({done.length})
          </button>

          {showDone && done.map(task => (
            <TaskRow key={task.id} task={task} onToggle={toggle} onRemove={remove} />
          ))}
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, onToggle, onRemove }: {
  task: Task;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px',
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: '1px solid ' + (hovered ? 'rgba(255,255,255,0.08)' : 'transparent'),
        borderRadius: 12,
        transition: 'all 0.15s',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
      >
        {task.done
          ? <CheckCircle2 size={20} style={{ color: '#4ade80' }} />
          : <Circle      size={20} style={{ color: '#3f3f46' }} />
        }
      </button>

      {/* Text */}
      <span style={{
        flex: 1, fontSize: 13, fontWeight: 500,
        color: task.done ? '#52525b' : '#e4e4e7',
        textDecoration: task.done ? 'line-through' : 'none',
        transition: 'color 0.2s',
      }}>
        {task.text}
      </span>

      {/* Remove */}
      {hovered && (
        <button
          onClick={() => onRemove(task.id)}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 2,
            color: '#3f3f46', display: 'flex', alignItems: 'center',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
          onMouseLeave={e => (e.currentTarget.style.color = '#3f3f46')}
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
