/* global React */
const { useState, useEffect, useRef } = React;

// ─── Brand tokens ────────────────────────────────────────────────────────────
const C = {
  base: '#120d06', deep: '#0d0904', raised: '#1c1509', secondary: '#2a1a0a',
  terracotta: '#c97a2f', amber: '#e8a84b', cream: '#f0e6d2', clay: '#9a856e',
  uber: '#06C167', open: '#2ea043',
  b08: 'rgba(201,122,47,0.08)', b15: 'rgba(201,122,47,0.15)',
  b18: 'rgba(201,122,47,0.18)', b30: 'rgba(201,122,47,0.30)',
  cream65: 'rgba(240,230,210,0.65)', cream90: 'rgba(240,230,210,0.90)',
  cream60: 'rgba(240,230,210,0.6)', cream25: 'rgba(240,230,210,0.25)',
};
const serif = "'Playfair Display', serif";
const sans = "'DM Sans', sans-serif";

// ─── Lucide icon wrapper ─────────────────────────────────────────────────────
function Icon({ name, size = 16, color = 'currentColor', fill = 'none', style = {} }) {
  return (
    <span
      className="licon"
      data-lucide={name}
      data-fill={fill}
      style={{ display: 'inline-flex', width: size, height: size, color, ...style }}
    />
  );
}
function refreshIcons() {
  if (!window.lucide) return;
  document.querySelectorAll('.licon[data-lucide]').forEach((el) => {
    if (el.querySelector('svg')) return;
    const name = el.getAttribute('data-lucide');
    const node = window.lucide.icons?.[toPascal(name)];
    if (!node) return;
    const svg = node.toSvg
      ? node.toSvg({ width: '100%', height: '100%', fill: el.getAttribute('data-fill') || 'none' })
      : null;
    if (svg) el.innerHTML = svg;
  });
}
function toPascal(s) { return s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(''); }

// Fallback: use the simple global createIcons if available
function useLucide(dep) {
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      try {
        window.lucide.createIcons({ attrs: { width: '100%', height: '100%' }, nameAttr: 'data-lucide' });
      } catch (e) { refreshIcons(); }
    } else { refreshIcons(); }
  });
}

// ─── Primitives ──────────────────────────────────────────────────────────────
function Eyebrow({ children, track = '0.4em', style = {} }) {
  return (
    <p style={{ fontFamily: sans, fontSize: 12, textTransform: 'uppercase', letterSpacing: track, color: C.terracotta, ...style }}>
      {children}
    </p>
  );
}

function PrimaryBtn({ children, onClick, style = {} }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: h ? C.amber : C.terracotta, color: C.cream, border: 'none', cursor: 'pointer',
        padding: '15px 34px', fontFamily: sans, fontSize: 12, fontWeight: 500, borderRadius: 8,
        textTransform: 'uppercase', letterSpacing: '0.25em', transition: 'all .25s ease',
        transform: h ? 'translateY(-1px)' : 'none',
        boxShadow: h ? '0 8px 20px -6px rgba(201,122,47,0.55)' : 'none', ...style,
      }}
    >{children}</button>
  );
}

function OutlineBtn({ children, onClick, borderColor = C.cream25, style = {} }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: h ? C.terracotta : 'transparent', color: C.cream, cursor: 'pointer',
        border: `1px solid ${h ? C.terracotta : borderColor}`, borderRadius: 8,
        padding: '15px 34px', fontFamily: sans, fontSize: 12, fontWeight: 500,
        textTransform: 'uppercase', letterSpacing: '0.25em', transition: 'all .25s ease',
        transform: h ? 'translateY(-1px)' : 'none',
        boxShadow: h ? '0 8px 20px -6px rgba(201,122,47,0.45)' : 'none', ...style,
      }}
    >{children}</button>
  );
}

const UBER_EATS_URL = 'https://www.ubereats.com/au/store/bread-line/UTw7YZimWVaaQeMfEu6oHw?diningMode=DELIVERY';

function UberBtn({ children = 'Order', small = false, size }) {
  const [h, setH] = useState(false);
  const big = size === 'lg';
  return (
    <a
      href={UBER_EATS_URL} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none',
        background: big ? (h ? C.uber : 'rgba(6,193,103,0.10)') : (h ? C.uber : 'transparent'),
        color: big ? (h ? '#fff' : C.uber) : (h ? '#fff' : C.uber),
        border: `1px solid ${h ? C.uber : (big ? 'rgba(6,193,103,0.55)' : 'rgba(6,193,103,0.5)')}`,
        fontWeight: h ? 700 : (big ? 600 : 400), borderRadius: 8,
        padding: big ? '12px 26px' : (small ? '8px 16px' : '14px 32px'),
        fontFamily: sans, fontSize: big ? 11.5 : 12,
        textTransform: 'uppercase', letterSpacing: big ? '0.22em' : '0.2em',
        backdropFilter: big ? 'blur(6px)' : 'none',
        transform: h ? 'translateY(-1px) scale(1.05)' : 'scale(1)',
        boxShadow: h ? '0 9px 24px -8px rgba(6,193,103,0.5)' : 'none',
        transition: 'all .25s ease', whiteSpace: 'nowrap',
      }}
    >🛵 {children}</a>
  );
}

function TextLink({ children, onClick, style = {} }) {
  const [h, setH] = useState(false);
  return (
    <a
      href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
        color: h ? C.amber : C.terracotta, fontFamily: sans, fontSize: 12,
        textTransform: 'uppercase', letterSpacing: '0.25em', paddingBottom: 4,
        borderBottom: `1px solid ${C.terracotta}`, transition: 'color .2s', ...style,
      }}
    >{children}</a>
  );
}

function Stars({ count = 5, max = 5, size = 14, color = C.terracotta }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <Icon key={i} name="star" size={size} color={i < count ? color : 'rgba(154,133,110,0.25)'} fill={i < count ? color : 'none'} />
      ))}
    </div>
  );
}

// ─── Brand logo: bread mascot + Archivo-italic wordmark + heartbeat pulse ────
function Logo({ size = 22, color = C.cream, tagline = false, mascot = false, onClick }) {
  const pulseH = size * 1.15;
  const pulseW = pulseH * 2.0;
  const lockup = (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: size * 0.12, lineHeight: 1 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.08 }}>
        <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontStyle: 'italic', fontSize: size, letterSpacing: '-0.01em', textTransform: 'uppercase', color, whiteSpace: 'nowrap' }}>Bread&nbsp;Line</span>
        <svg width={pulseW} height={pulseH} viewBox="0 0 108 52" fill="none" style={{ marginLeft: -size * 0.1, marginBottom: size * 0.08, flexShrink: 0 }}>
          <path d="M0 30 H50 L59 30 L67 12 L77 46 L85 22 L92 30 H108" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {tagline && (
        <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontStyle: 'italic', fontSize: size * 0.26, letterSpacing: '0.4em', textTransform: 'uppercase', color, opacity: 0.92 }}>Middle Eastern Bakery</span>
      )}
    </span>
  );
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.45, textDecoration: 'none' }}>
      {mascot && <img src="../../assets/bread-mascot.png" alt="Bread Line mascot" style={{ height: size * 1.7, width: 'auto', flexShrink: 0 }} />}
      {lockup}
    </a>
  );
}

Object.assign(window, {
  C, serif, sans, Icon, useLucide, refreshIcons,
  Eyebrow, PrimaryBtn, OutlineBtn, UberBtn, TextLink, Stars, Logo, UBER_EATS_URL,
});
