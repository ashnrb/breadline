// ============================================================
//  BREAD LINE — Shared code (loaded by every page)
//  bl-shared.js
// ============================================================
const { useState, useEffect, useRef, useCallback } = React;

// ─── Config ──────────────────────────────────────────────────
// ⬇ ONLY LINE YOU EVER NEED TO EDIT
const GOOGLE_SHEET_ID = '1QVuFL7Du-JT32qg6gHqNDzluv-Fu7vHUBs5wa9dGW-M';

const UBER_EATS_URL = 'https://www.ubereats.com/au/store/bread-line/UTw7YZimWVaaQeMfEu6oHw?diningMode=DELIVERY';

// ─── Nav page detection (reads filename) ─────────────────────
function getCurrentPage() {
  const p = window.location.pathname.split('/').pop().replace('.html','');
  if (!p || p === 'index') return 'home';
  return p; // 'menu' | 'reviews' | 'visit'
}

function navTo(page) {
  if (page === 'home') { window.location.href = 'index.html'; return; }
  window.location.href = page + '.html';
}

// ─── Brand tokens ────────────────────────────────────────────
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
const sans  = "'DM Sans', sans-serif";

// ─── Google Sheets CSV fetch & parse ─────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const cols = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    cols.push(cur.trim());
    const row = {};
    headers.forEach((h, i) => row[h] = (cols[i] || '').replace(/^"|"$/g, ''));
    return row;
  });
}

function csvToMenuData(rows) {
  const categoryMap = {};
  const categoryOrder = [];
  rows.forEach(row => {
    const cat   = row['Category'] || '';
    const icon  = row['Icon'] || '';
    const name  = row['Item Name'] || '';
    const desc  = row['Description'] || '';
    const price = parseFloat(row['Price']) || 0;
    const vegan = (row['Vegan'] || '').toLowerCase() === 'yes';
    const veg   = (row['Vegetarian'] || '').toLowerCase() === 'yes';
    if (!cat || !name) return;
    if (!categoryMap[cat]) {
      categoryMap[cat] = { id: cat.toLowerCase().replace(/\W+/g, '-'), icon, label: cat, items: [] };
      categoryOrder.push(cat);
    }
    const tags = [];
    if (vegan) tags.push('vegan');
    if (veg)   tags.push('vegetarian');
    categoryMap[cat].items.push({ name, desc, price, tags });
  });
  return categoryOrder.map(k => categoryMap[k]);
}

function useMenuData() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const load = useCallback(() => {
    if (!GOOGLE_SHEET_ID) { setError('No Sheet ID configured.'); setLoading(false); return; }
    setLoading(true); setError(null);
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&cachebust=${Date.now()}`;
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then(text => { setMenuData(csvToMenuData(parseCSV(text))); setLoading(false); })
      .catch(err => { setError('Could not load menu. Check your Sheet ID and make sure the sheet is published.'); setLoading(false); console.error(err); });
  }, []);
  useEffect(() => { load(); }, [load]);
  return { menuData, loading, error, reload: load };
}

// ─── Lucide icon wrapper ──────────────────────────────────────
function Icon({ name, size = 16, color = 'currentColor', fill = 'none', style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || ref.current.querySelector('svg')) return;
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { width: size, height: size }, nameAttr: 'data-lucide' });
  });
  return <span ref={ref} data-lucide={name} data-fill={fill} style={{ display: 'inline-flex', width: size, height: size, color, flexShrink: 0, ...style }} />;
}

// ─── Primitives ──────────────────────────────────────────────
function Eyebrow({ children, track = '0.4em', style = {} }) {
  return <p style={{ fontFamily: sans, fontSize: 12, textTransform: 'uppercase', letterSpacing: track, color: C.terracotta, ...style }}>{children}</p>;
}

function PrimaryBtn({ children, onClick, style = {} }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, background: h ? C.amber : C.terracotta, color:C.cream, border:'none', cursor:'pointer', padding:'15px 34px', fontFamily:sans, fontSize:12, fontWeight:500, borderRadius:8, textTransform:'uppercase', letterSpacing:'0.25em', transition:'all .25s ease', transform: h ? 'translateY(-1px)' : 'none', boxShadow: h ? '0 8px 20px -6px rgba(201,122,47,0.55)' : 'none', ...style }}
    >{children}</button>
  );
}

function OutlineBtn({ children, onClick, borderColor = C.cream25, style = {} }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, background: h ? C.terracotta : 'transparent', color:C.cream, cursor:'pointer', border:`1px solid ${h ? C.terracotta : borderColor}`, borderRadius:8, padding:'15px 34px', fontFamily:sans, fontSize:12, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.25em', transition:'all .25s ease', transform: h ? 'translateY(-1px)' : 'none', boxShadow: h ? '0 8px 20px -6px rgba(201,122,47,0.45)' : 'none', ...style }}
    >{children}</button>
  );
}

function UberBtn({ children = 'Order', small = false, size }) {
  const [h, setH] = useState(false);
  const big = size === 'lg';
  const handleClick = (e) => {
    e.preventDefault();
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) { window.location.href = UBER_EATS_URL; }
    else { window.open(UBER_EATS_URL, '_blank', 'noopener,noreferrer'); }
  };
  return (
    <a href={UBER_EATS_URL} onClick={handleClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, textDecoration:'none', background: big ? (h ? C.uber : 'rgba(6,193,103,0.10)') : (h ? C.uber : 'transparent'), color: big ? (h ? '#fff' : C.uber) : (h ? '#fff' : C.uber), border:`1px solid ${h ? C.uber : (big ? 'rgba(6,193,103,0.55)' : 'rgba(6,193,103,0.5)')}`, fontWeight: h ? 700 : (big ? 600 : 400), borderRadius:8, padding: big ? '12px 26px' : (small ? '8px 16px' : '14px 32px'), fontFamily:sans, fontSize: big ? 11.5 : 12, textTransform:'uppercase', letterSpacing: big ? '0.22em' : '0.2em', backdropFilter: big ? 'blur(6px)' : 'none', transform: h ? 'translateY(-1px) scale(1.05)' : 'scale(1)', boxShadow: h ? '0 9px 24px -8px rgba(6,193,103,0.5)' : 'none', transition:'all .25s ease', whiteSpace:'nowrap' }}
    >🛵 {children}</a>
  );
}

function TextLink({ children, onClick, style = {} }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:'inline-flex', alignItems:'center', gap:8, textDecoration:'none', color: h ? C.amber : C.terracotta, fontFamily:sans, fontSize:12, textTransform:'uppercase', letterSpacing:'0.25em', paddingBottom:4, borderBottom:`1px solid ${C.terracotta}`, transition:'color .2s', ...style }}
    >{children}</a>
  );
}

function Stars({ count = 5, max = 5, size = 14, color = C.terracotta }) {
  return (
    <div style={{ display:'flex', gap:2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <Icon key={i} name="star" size={size} color={i < count ? color : 'rgba(154,133,110,0.25)'} fill={i < count ? color : 'none'} />
      ))}
    </div>
  );
}

// ─── Logo ────────────────────────────────────────────────────
function Logo({ size = 22, color = C.cream, tagline = false, mascot = false }) {
  const pulseH = size * 1.15, pulseW = pulseH * 2.0;
  return (
    <a href="index.html" style={{ display:'inline-flex', alignItems:'center', gap: size * 0.45, textDecoration:'none' }}>
      {mascot && <img src="bread-mascot.png" alt="Bread Line mascot" style={{ height: size * 1.7, width:'auto', flexShrink:0 }} />}
      <span style={{ display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap: size * 0.12, lineHeight:1 }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap: size * 0.08 }}>
          <span style={{ fontFamily:"'Archivo', sans-serif", fontWeight:900, fontStyle:'italic', fontSize:size, letterSpacing:'-0.01em', textTransform:'uppercase', color, whiteSpace:'nowrap' }}>Bread&nbsp;Line</span>
          <svg width={pulseW} height={pulseH} viewBox="0 0 108 52" fill="none" style={{ marginLeft: -size*0.1, marginBottom: size*0.08, flexShrink:0 }}>
            <path d="M0 30 H50 L59 30 L67 12 L77 46 L85 22 L92 30 H108" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {tagline && <span style={{ fontFamily:"'Archivo', sans-serif", fontWeight:800, fontStyle:'italic', fontSize: size*0.26, letterSpacing:'0.4em', textTransform:'uppercase', color, opacity:0.92 }}>Middle Eastern Bakery</span>}
      </span>
    </a>
  );
}

// ─── Nav ─────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: 'home',    label: 'Home',     href: 'index.html'   },
  { id: 'menu',    label: 'Menu',     href: 'menu.html'    },
  { id: 'reviews', label: 'Reviews',  href: 'reviews.html' },
  { id: 'visit',   label: 'Visit Us', href: 'visit.html'   },
];

function Nav({ scrolled }) {
  const page = getCurrentPage();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { if (window.lucide?.createIcons) window.lucide.createIcons({ attrs:{ width:'100%', height:'100%' } }); });
  return (
    <header style={{ position:'sticky', top:0, left:0, right:0, zIndex:50, background: scrolled ? 'rgba(18,13,6,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(8px)' : 'none', borderBottom:`1px solid ${scrolled ? C.b18 : 'transparent'}`, transition:'all .5s' }}>
      <div style={{ maxWidth:1152, margin:'0 auto', padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Logo size={22} color={C.cream} mascot />
        <nav className="bl-desktop-nav" style={{ alignItems:'center', gap:40 }}>
          {NAV_LINKS.map(l => (
            <a key={l.id} href={l.href}
              style={{ fontFamily:sans, fontSize:12, textTransform:'uppercase', letterSpacing:'0.2em', textDecoration:'none', transition:'color .2s', whiteSpace:'nowrap', color: page === l.id ? C.terracotta : C.cream60 }}
              onMouseEnter={e => { if (page !== l.id) e.currentTarget.style.color = C.cream; }}
              onMouseLeave={e => { if (page !== l.id) e.currentTarget.style.color = C.cream60; }}
            >{l.label}</a>
          ))}
          <UberBtn small>Order</UberBtn>
        </nav>
        <button className="bl-mobile-toggle" aria-label="Menu" onClick={() => setMobileOpen(v => !v)}
          style={{ background:'none', border:'none', color:C.cream, cursor:'pointer', padding:4 }}>
          <Icon name={mobileOpen ? 'x' : 'menu'} size={22} />
        </button>
      </div>
      {mobileOpen && (
        <div style={{ background:'rgba(18,13,6,0.98)', borderBottom:`1px solid ${C.b18}` }}>
          <nav style={{ display:'flex', flexDirection:'column', padding:'8px 24px' }}>
            {NAV_LINKS.map(l => (
              <a key={l.id} href={l.href} style={{ padding:'12px 0', fontFamily:sans, fontSize:12, textTransform:'uppercase', letterSpacing:'0.2em', textDecoration:'none', borderBottom:`1px solid ${C.b08}`, color: page === l.id ? C.terracotta : C.cream60 }}>{l.label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
  useEffect(() => { if (window.lucide?.createIcons) window.lucide.createIcons({ attrs:{ width:'100%', height:'100%' } }); });
  return (
    <footer style={{ padding:'64px 0', background:C.deep, borderTop:`1px solid ${C.b18}` }}>
      <div style={{ maxWidth:1152, margin:'0 auto', padding:'0 24px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:48 }}>
        <div>
          <div style={{ marginBottom:16 }}><Logo size={20} color={C.cream} tagline /></div>
          <p style={{ fontFamily:sans, fontSize:14, color:C.clay, lineHeight:1.6, maxWidth:280 }}>Freshly baked manoush, flatbreads &amp; foldovers. Middle Eastern street food made with care in North Hobart.</p>
        </div>
        <div>
          <p style={{ fontFamily:sans, fontSize:12, letterSpacing:'0.3em', textTransform:'uppercase', color:C.terracotta, marginBottom:20 }}>Hours</p>
          {[['Tuesday – Friday','8:00 AM – 3:00 PM'],['Saturday','8:00 AM – 3:30 PM'],['Sunday','8:30 AM – 3:00 PM'],['Monday','Closed']].map(([d,h],i) => (
            <div key={d} style={{ display:'flex', justifyContent:'space-between', fontSize:14, fontFamily:sans, marginBottom:8, opacity: i===3 ? 0.4 : 1 }}>
              <span style={{ color:C.clay }}>{d}</span>
              <span style={{ color:'rgba(240,230,210,0.7)' }}>{h}</span>
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontFamily:sans, fontSize:12, letterSpacing:'0.3em', textTransform:'uppercase', color:C.terracotta, marginBottom:20 }}>Find Us</p>
          <div style={{ display:'flex', gap:12, fontSize:14, fontFamily:sans, color:C.clay, marginBottom:16 }}>
            <Icon name="map-pin" size={14} color={C.terracotta} />
            <span>356 Elizabeth Street<br />North Hobart TAS 7000</span>
          </div>
          <div style={{ display:'flex', gap:12, fontSize:14, fontFamily:sans, color:C.clay, alignItems:'center' }}>
            <Icon name="phone" size={14} color={C.terracotta} />
            <span>0412 489 941</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1152, margin:'48px auto 0', padding:'32px 24px 0', borderTop:`1px solid ${C.b08}` }}>
        <p style={{ fontFamily:sans, fontSize:12, textAlign:'center', color:'rgba(154,133,110,0.3)' }}>© 2026 Bread Line. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Page shell (wraps Nav + children + Footer) ───────────────
function PageShell({ children, alwaysScrolled = false }) {
  const [scrolled, setScrolled] = useState(alwaysScrolled);
  const ref = useRef(null);
  const onScroll = e => setScrolled(alwaysScrolled || e.target.scrollTop > 30);
  useEffect(() => { if (window.lucide?.createIcons) window.lucide.createIcons({ attrs:{ width:'100%', height:'100%' } }); });
  return (
    <div ref={ref} onScroll={onScroll} style={{ height:'100vh', overflowY:'auto', overflowX:'hidden', background:'#120d06' }}>
      <Nav scrolled={scrolled} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
