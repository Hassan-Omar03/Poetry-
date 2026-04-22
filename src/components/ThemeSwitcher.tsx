import React, { useRef, useState } from 'react';
import { Palette, X, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ── Preset swatches ─────────────────────────────────────── */
const PRESETS = [
  { label: 'Sky Mist',      color: '#CFECF3' },
  { label: 'Lavender',      color: '#E9E3F5' },
  { label: 'Mint',          color: '#D4F5E9' },
  { label: 'Peach',         color: '#FCE8D8' },
  { label: 'Blush Rose',    color: '#F9DFDF' },
  { label: 'Lemon',         color: '#FDF6C3' },
  { label: 'Periwinkle',    color: '#DDE4F5' },
  { label: 'Sage',          color: '#DDF0E0' },
  { label: 'Coral',         color: '#FDDDD5' },
  { label: 'Lilac',         color: '#F0E0F8' },
];

const DEFAULT = '#CFECF3';

export const ThemeSwitcher: React.FC = () => {
  const { accentBg, setAccentBg } = useTheme();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* ── Floating toggle button ─────────────────────── */}
      <button
        onClick={() => setOpen(v => !v)}
        title="Change accent color"
        className="fixed bottom-6 right-6 z-[9999] flex h-12 w-12 items-center justify-center rounded-full shadow-xl border border-white/40 transition-all hover:scale-110 active:scale-95"
        style={{ background: accentBg }}
      >
        {open
          ? <X className="h-5 w-5 text-slate-700" />
          : <Palette className="h-5 w-5 text-slate-700" />
        }
      </button>

      {/* ── Panel ─────────────────────────────────────── */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-[9999] w-64 rounded-2xl border border-slate-200 bg-white shadow-2xl p-4"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.13)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Accent Color
            </span>
            <button
              onClick={() => setAccentBg(DEFAULT)}
              title="Reset to default"
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          {/* Current preview */}
          <div
            className="mb-3 h-10 w-full rounded-xl border border-slate-100 flex items-center justify-center text-xs font-mono text-slate-600 font-semibold"
            style={{ background: accentBg }}
          >
            {accentBg.toUpperCase()}
          </div>

          {/* Preset swatches */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {PRESETS.map(p => (
              <button
                key={p.color}
                title={p.label}
                onClick={() => setAccentBg(p.color)}
                className="group relative h-9 w-full rounded-xl border-2 transition-all hover:scale-110 active:scale-95"
                style={{
                  background: p.color,
                  borderColor: accentBg === p.color ? '#334155' : 'transparent',
                  boxShadow: accentBg === p.color ? '0 0 0 2px #334155' : 'none',
                }}
              >
                {/* tooltip */}
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-0.5 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.label}
                </span>
              </button>
            ))}
          </div>

          {/* Custom color picker */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="custom-accent"
              className="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0"
            >
              Custom
            </label>
            <div className="relative flex-1">
              <input
                id="custom-accent"
                ref={inputRef}
                type="color"
                value={accentBg}
                onChange={e => setAccentBg(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <div
                className="w-full h-9 rounded-xl border border-slate-200 flex items-center justify-center text-xs font-mono text-slate-600 cursor-pointer hover:border-slate-400 transition-colors"
                style={{ background: accentBg }}
                onClick={() => inputRef.current?.click()}
              >
                Pick any color →
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
