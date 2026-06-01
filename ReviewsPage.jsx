/* global React, C, serif, sans, Eyebrow, Stars */

const REVIEWS = [
  { name: 'Tahlia W.', date: '18 Nov 2023', stars: 5, text: 'Always great! Consistently good food. One of our favourite places to order from.', platform: 'Uber Eats' },
  { name: 'Rahul Manikanta G.', date: '18 Dec 2025', stars: 5, text: 'I love it, absolutely delicious.', platform: 'Uber Eats' },
  { name: 'Syeda H.', date: '10 Mar 2026', stars: 4, text: 'Always the best.', platform: 'Uber Eats' },
  { name: 'Reddit User (r/Hobart)', date: 'Community', stars: 5, text: "Went in to grab some flatbread and was told they didn't have any left from the batch — staff asked me to come back in 20 minutes for fresh ones. That's the kind of place this is.", platform: 'Reddit' },
  { name: 'HappyCow Reviewer', date: '2025', stars: 4, text: 'Solid vegan options available. The foldovers are great. Would love to see vegan cheese alternatives on the menu — but still a lovely spot.', platform: 'HappyCow' },
];
const PLATFORM = { 'Uber Eats': '#06C167', Reddit: '#FF4500', HappyCow: '#7CB342', Facebook: '#1877F2' };
const FEATURED = { name: 'Samantha F.', date: '1 Dec 2024', stars: 5, platform: 'Uber Eats', text: "The absolute BEST bakery in Hobart. This is our favourite pick for delivery food every time — you have to try it. Try the baklava and the foldovers, it's unreal! My recommendation is to get an unsweetened latte and eat the baklava with that. Amazing!" };

function ReviewsPage() {
  return (
    <div>
      <div style={{ paddingTop: 128, paddingBottom: 80, padding: '128px 24px 80px', textAlign: 'center', background: C.raised, borderBottom: `1px solid ${C.b18}`, marginTop: -73 }}>
        <Eyebrow style={{ marginBottom: 20 }}>What People Are Saying</Eyebrow>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.75rem,6vw,3.75rem)', color: C.cream, marginBottom: 32 }}>Reviews</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
          {[{ platform: 'Uber Eats', score: '4.8', count: '170+ reviews' }, { platform: 'Facebook', score: '5.0', count: '14 votes' }].map((p) => (
            <div key={p.platform} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 32px', border: `1px solid ${C.b18}`, background: 'rgba(18,13,6,0.5)' }}>
              <span style={{ fontFamily: sans, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, color: PLATFORM[p.platform] }}>{p.platform}</span>
              <span style={{ fontFamily: serif, fontSize: 36, color: C.cream, lineHeight: 1 }}>{p.score}</span>
              <span style={{ fontFamily: sans, color: C.clay, fontSize: 12, marginBottom: 6 }}>/ 5</span>
              <Stars count={5} size={12} />
              <span style={{ fontFamily: sans, color: C.clay, fontSize: 12, marginTop: 6 }}>{p.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
        {/* Featured */}
        <div style={{ position: 'relative', marginBottom: 64, padding: '48px', background: C.raised, border: `1px solid ${C.b30}` }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #c97a2f, #e8a84b, #c97a2f)' }} />
          <div style={{ fontFamily: serif, fontSize: 60, color: 'rgba(201,122,47,0.2)', lineHeight: 1, marginBottom: 16, userSelect: 'none' }}>"</div>
          <Stars count={FEATURED.stars} size={16} />
          <blockquote style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.25rem,2.5vw,1.5rem)', color: C.cream90, lineHeight: 1.5, margin: '24px 0' }}>{FEATURED.text}</blockquote>
          <p style={{ fontFamily: sans, color: C.cream, fontSize: 14 }}>{FEATURED.name}
            <span style={{ color: C.clay }}> · {FEATURED.date} · <span style={{ color: PLATFORM[FEATURED.platform] }}>{FEATURED.platform}</span></span></p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginBottom: 64 }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{ padding: 24, background: C.raised, border: `1px solid ${C.b15}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <p style={{ fontFamily: sans, color: C.cream, fontSize: 14 }}>{r.name}</p>
                  <p style={{ fontFamily: sans, color: C.clay, fontSize: 12, marginTop: 2 }}>{r.date} · <span style={{ color: PLATFORM[r.platform] }}>{r.platform}</span></p>
                </div>
                <Stars count={r.stars} size={12} />
              </div>
              <p style={{ fontFamily: sans, color: C.clay, fontSize: 14, lineHeight: 1.6 }}>{r.text}</p>
            </div>
          ))}
        </div>

        {/* Screenshot */}
        <p style={{ fontFamily: sans, color: C.clay, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>As seen on Uber Eats</p>
        <div style={{ border: `1px solid ${C.b15}`, overflow: 'hidden', background: '#fff' }}>
          <img src="../../assets/uber-eats-reviews.png" alt="Bread Line reviews on Uber Eats" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ReviewsPage });
