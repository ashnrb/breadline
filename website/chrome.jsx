/* global React, C, serif, sans, Icon, UberBtn, Logo */
const { useState: useStateChrome, useEffect: useEffectChrome } = React;

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'visit', label: 'Visit Us' },
];

function Nav({ page, go, scrolled }) {
  const [mobileOpen, setMobileOpen] = useStateChrome(false);
  return (
    <header
      style={{
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(18,13,6,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${scrolled ? C.b18 : 'transparent'}`,
        transition: 'all .5s',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo size={22} color={C.cream} mascot onClick={() => go('home')} />
        <nav className="bl-desktop-nav" style={{ alignItems: 'center', gap: 40 }}>
          {NAV_LINKS.map((l) => (
            <a key={l.id} href="#" onClick={(e) => { e.preventDefault(); go(l.id); }}
              style={{
                fontFamily: sans, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em',
                textDecoration: 'none', transition: 'color .2s', whiteSpace: 'nowrap',
                color: page === l.id ? C.terracotta : C.cream60,
              }}
              onMouseEnter={(e) => { if (page !== l.id) e.currentTarget.style.color = C.cream; }}
              onMouseLeave={(e) => { if (page !== l.id) e.currentTarget.style.color = C.cream60; }}
            >{l.label}</a>
          ))}
          <UberBtn small>Order</UberBtn>
        </nav>
        <button className="bl-mobile-toggle" aria-label="Menu" onClick={() => setMobileOpen((v) => !v)}
          style={{ background: 'none', border: 'none', color: C.cream, cursor: 'pointer', padding: 4 }}>
          <Icon name={mobileOpen ? 'x' : 'menu'} size={22} />
        </button>
      </div>
      {mobileOpen && (
        <div className="bl-mobile-drawer" style={{ background: 'rgba(18,13,6,0.98)', borderBottom: `1px solid ${C.b18}` }}>
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 24px' }}>
            {NAV_LINKS.map((l) => (
              <a key={l.id} href="#" onClick={(e) => { e.preventDefault(); go(l.id); setMobileOpen(false); }}
                style={{
                  padding: '12px 0', fontFamily: sans, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em',
                  textDecoration: 'none', borderBottom: `1px solid ${C.b08}`,
                  color: page === l.id ? C.terracotta : C.cream60,
                }}>{l.label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer style={{ padding: '64px 0', background: C.deep, borderTop: `1px solid ${C.b18}` }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 48 }}>
        <div>
          <div style={{ marginBottom: 16 }}><Logo size={20} color={C.cream} tagline onClick={() => go('home')} /></div>
          <p style={{ fontFamily: sans, fontSize: 14, color: C.clay, lineHeight: 1.6, maxWidth: 280 }}>
            Freshly baked manoush, flatbreads &amp; foldovers. Middle Eastern street food made with care in North Hobart.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: sans, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.terracotta, marginBottom: 20 }}>Hours</p>
          {[['Tuesday – Friday', '8:00 AM – 3:00 PM'], ['Saturday', '8:00 AM – 3:30 PM'], ['Sunday', '8:30 AM – 3:00 PM'], ['Monday', 'Closed']].map(([d, h], i) => (
            <div key={d} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontFamily: sans, marginBottom: 8, opacity: i === 3 ? 0.4 : 1 }}>
              <span style={{ color: C.clay }}>{d}</span><span style={{ color: 'rgba(240,230,210,0.7)' }}>{h}</span>
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: sans, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.terracotta, marginBottom: 20 }}>Find Us</p>
          <div style={{ display: 'flex', gap: 12, fontSize: 14, fontFamily: sans, color: C.clay, marginBottom: 16 }}>
            <Icon name="map-pin" size={14} color={C.terracotta} />
            <span>356 Elizabeth Street<br />North Hobart TAS 7000</span>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 14, fontFamily: sans, color: C.clay, alignItems: 'center' }}>
            <Icon name="phone" size={14} color={C.terracotta} /><span>0412 489 941</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1152, margin: '48px auto 0', padding: '32px 24px 0', borderTop: `1px solid ${C.b08}` }}>
        <p style={{ fontFamily: sans, fontSize: 12, textAlign: 'center', color: 'rgba(154,133,110,0.3)' }}>© 2026 Bread Line. All rights reserved.</p>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Footer, NAV_LINKS });
