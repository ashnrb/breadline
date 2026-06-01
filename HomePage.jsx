/* global React, C, serif, sans, Icon, Eyebrow, PrimaryBtn, OutlineBtn, TextLink, Stars, UberBtn */

const HOME_FEATURED = [
  { img: 'https://images.unsplash.com/photo-1710444448935-48ece3b2bd8a?w=700&h=500&fit=crop&auto=format', tag: 'The House Classic', title: 'Manoush', desc: "Freshly baked flatbread with za'atar, cheese, or your choice of toppings. Made to order, every time.", price: 'from $7.10' },
  { img: 'https://images.unsplash.com/photo-1683731507344-740ea99b6b0f?w=700&h=500&fit=crop&auto=format', tag: 'Customer Favourite', title: 'Foldovers', desc: 'Warm flatbread folded over fresh fillings — falafel, labneh veggie, or hearty marinated meats.', price: 'from $20.00' },
  { img: 'https://images.unsplash.com/photo-1761828122856-8703baac8e86?w=700&h=500&fit=crop&auto=format', tag: 'Sweet Finish', title: 'Baklava', desc: 'Classic walnut baklava — golden, flaky, and honey-drenched. Perfect with an unsweetened latte.', price: '$7.20' },
];

function FeaturedCard({ item }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: C.secondary }}>
        <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: h ? 'scale(1.05)' : 'scale(1)', transition: 'transform .7s' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(18,13,6,0.65) 100%)' }} />
        <span style={{ position: 'absolute', bottom: 16, right: 16, color: C.cream, fontSize: 12, padding: '6px 12px', letterSpacing: '0.05em', background: C.terracotta, fontFamily: sans }}>{item.price}</span>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Eyebrow track="0.35em" style={{ marginBottom: 8 }}>{item.tag}</Eyebrow>
        <h3 style={{ fontFamily: serif, fontSize: 24, color: C.cream, marginBottom: 12 }}>{item.title}</h3>
        <p style={{ fontFamily: sans, fontSize: 14, color: C.clay, lineHeight: 1.6 }}>{item.desc}</p>
      </div>
    </div>
  );
}

function HomePage({ go }) {
  const [scrollY, setScrollY] = React.useState(0);
  const heroRef = React.useRef(null);
  React.useEffect(() => {
    const scroller = heroRef.current && heroRef.current.closest('div[style*="overflow"]');
    if (!scroller) return;
    const onScroll = () => setScrollY(scroller.scrollTop);
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);
  // parallax: bg drifts down, copy drifts up + fades, scrim darkens
  const p = Math.min(scrollY, 800);
  const bgShift = p * 0.3;
  const textShift = -p * 0.18;
  const textFade = Math.max(0, 1 - p / 500);
  const scrimBoost = Math.min(0.4, p / 1600);

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: 640, height: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginTop: -73 }}>
        <div className="bl-hero-bg" style={{ position: 'absolute', inset: '-6% 0 0 0', height: '112%', backgroundImage: "url('https://images.unsplash.com/photo-1710444448930-85ce405eb20f?w=1800&h=1100&fit=crop&auto=format')", backgroundSize: 'cover', backgroundPosition: 'center', transform: `translateY(${bgShift}px)` }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(18,13,6,${0.85 + scrimBoost}) 0%, rgba(18,13,6,${0.35 + scrimBoost}) 35%, rgba(18,13,6,${0.35 + scrimBoost}) 60%, #120d06 100%)` }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 880, transform: `translateY(${textShift}px)`, opacity: textFade }}>
          <Eyebrow track="0.5em" style={{ fontSize: 12, marginBottom: 32 }}>Middle Eastern Street Food · North Hobart</Eyebrow>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(4rem,12vw,9rem)', lineHeight: 1, letterSpacing: '-0.01em', color: C.cream, marginBottom: 16 }}>
            BREAD<br /><span style={{ fontStyle: 'italic', color: C.terracotta }}>LINE</span>
          </h1>
          <p style={{ fontFamily: sans, color: C.cream65, fontSize: 18, maxWidth: 448, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Freshly baked manoush, flatbreads &amp; foldovers — made with love, served warm.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryBtn onClick={() => go('menu')}>View Menu <Icon name="arrow-right" size={14} /></PrimaryBtn>
            <OutlineBtn onClick={() => go('visit')}><Icon name="map-pin" size={14} /> Find Us</OutlineBtn>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <UberBtn size="lg">Order on Uber Eats</UberBtn>
          </div>
        </div>
        <div className="bl-scroll-cue" style={{ position: 'absolute', bottom: 40, left: '50%', width: 1, height: 56, background: 'linear-gradient(180deg, #c97a2f 0%, transparent 100%)', opacity: textFade }} />
      </section>

      {/* Freshness strip */}
      <section style={{ padding: '56px 0', background: C.raised, borderTop: `1px solid ${C.b18}`, borderBottom: `1px solid ${C.b18}` }}>
        <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <blockquote style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 24, color: C.cream90, lineHeight: 1.5 }}>
            "Come back in 20 minutes — we don't sell yesterday's bread."
          </blockquote>
          <p style={{ fontFamily: sans, color: C.clay, fontSize: 12, letterSpacing: '0.35em', textTransform: 'uppercase', marginTop: 20 }}>Our promise to every customer</p>
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding: '96px 24px', maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <Eyebrow style={{ marginBottom: 16 }}>Our Favourites</Eyebrow>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem,4vw,3rem)', color: C.cream, lineHeight: 1.1 }}>Crowd Pleasers</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 32 }}>
          {HOME_FEATURED.map((item) => <FeaturedCard key={item.title} item={item} />)}
        </div>
        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <TextLink onClick={() => go('menu')}>See Full Menu <Icon name="arrow-right" size={13} /></TextLink>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '96px 0', background: C.raised, borderTop: `1px solid ${C.b18}` }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 64, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: C.secondary }}>
              <img src="https://images.unsplash.com/photo-1613396874083-2d5fbe59ae79?w=800&h=1000&fit=crop&auto=format" alt="Artisan bread" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -24, right: -8, padding: 24, background: C.terracotta }}>
              <div style={{ fontFamily: serif, fontSize: 36, color: C.cream, lineHeight: 1 }}>4.8</div>
              <Stars count={5} size={10} color={C.cream} />
              <div style={{ color: 'rgba(240,230,210,0.7)', fontSize: 12, marginTop: 4, fontFamily: sans }}>170+ Reviews</div>
            </div>
          </div>
          <div>
            <Eyebrow style={{ marginBottom: 20 }}>Our Story</Eyebrow>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem,4vw,3rem)', color: C.cream, lineHeight: 1.1, marginBottom: 28 }}>
              Freshness isn't<br />a promise. <span style={{ fontStyle: 'italic', color: C.terracotta }}>It's a rule.</span>
            </h2>
            <p style={{ fontFamily: sans, color: C.clay, lineHeight: 1.7, marginBottom: 20 }}>
              Tucked into Elizabeth Street in North Hobart, Bread Line is where Middle Eastern tradition meets a great morning out. We bake everything fresh — and we mean it.
            </p>
            <p style={{ fontFamily: sans, color: C.clay, lineHeight: 1.7, marginBottom: 40 }}>
              Halal-certified, vegetarian-friendly, and proudly vegan-inclusive. Come for the manoush, stay for the baklava and a three-shot latte.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {['Halal Certified', 'Vegetarian Options', 'Vegan Options', 'Kids Menu'].map((l) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: C.cream65, fontFamily: sans }}>
                  <span style={{ color: C.terracotta, fontSize: 16 }}>✓</span>{l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews teaser */}
      <section style={{ padding: '80px 0', background: C.raised, borderTop: `1px solid ${C.b18}` }}>
        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}><Stars count={5} size={18} /></div>
          <blockquote style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.5rem,3vw,1.875rem)', color: C.cream90, lineHeight: 1.5, marginBottom: 24 }}>
            "The absolute BEST bakery in Hobart."
          </blockquote>
          <p style={{ fontFamily: sans, color: C.clay, fontSize: 14, marginBottom: 32 }}>— Samantha F. via Uber Eats</p>
          <TextLink onClick={() => go('reviews')}>Read All Reviews <Icon name="arrow-right" size={13} /></TextLink>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage });
