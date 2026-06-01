/* global React, C, serif, sans, Icon, Eyebrow */

const VISIT_HOURS = [
  { day: 'Monday', hours: 'Closed', closed: true },
  { day: 'Tuesday', hours: '8:00 AM – 3:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 3:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 3:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 3:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 3:30 PM' },
  { day: 'Sunday', hours: '8:30 AM – 3:00 PM' },
];

const MAPS_URL = 'https://maps.app.goo.gl/XqxxGN3CnCmFWaFo9';
const MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.939049518577!2d147.31637849999998!3d-42.8741306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa6e752e6194a341%3A0x4e005d26e775b890!2sBread%20Line!5e0!3m2!1sen!2sau!4v1780283018409!5m2!1sen!2sau';

function panel(extra = {}) { return { padding: 32, background: C.raised, border: `1px solid ${C.b18}`, borderRadius: 16, ...extra }; }

function VisitPage() {
  const status = { open: true, label: 'Open · closes in 2h 14m' };
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <div>
      <div style={{ padding: '128px 24px 80px', textAlign: 'center', background: C.raised, borderBottom: `1px solid ${C.b18}`, marginTop: -73 }}>
        <Eyebrow style={{ marginBottom: 20 }}>Find Us</Eyebrow>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.75rem,6vw,3.75rem)', color: C.cream, marginBottom: 20 }}>Visit Us</h1>
        <p style={{ fontFamily: sans, color: C.clay, fontSize: 14 }}>356 Elizabeth Street, North Hobart TAS 7000</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, padding: '8px 16px', borderRadius: 999, fontFamily: sans, fontSize: 12, letterSpacing: '0.05em',
          border: `1px solid ${status.open ? 'rgba(46,160,67,0.4)' : 'rgba(201,122,47,0.25)'}`, background: status.open ? 'rgba(46,160,67,0.08)' : 'rgba(201,122,47,0.06)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: status.open ? C.open : C.clay }} />
          <span style={{ color: status.open ? C.open : C.clay }}>{status.label}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1024, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 48 }}>
          {/* Live Google Map */}
          <div>
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: C.raised, border: `1px solid ${C.b18}`, borderRadius: 16 }}>
              <iframe
                title="Bread Line on Google Maps"
                src={MAPS_EMBED}
                style={{ width: '100%', height: '100%', border: 0, borderRadius: 16, filter: 'saturate(0.85) contrast(0.95)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                style={{ position: 'absolute', bottom: 16, right: 16, display: 'inline-flex', alignItems: 'center', gap: 8, color: C.cream, fontFamily: sans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', padding: '11px 20px', borderRadius: 999, background: 'rgba(18,13,6,0.92)', border: `1px solid ${C.terracotta}`, backdropFilter: 'blur(4px)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.terracotta; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(18,13,6,0.92)'; }}>
                Open in Maps <Icon name="arrow-up-right" size={13} color={C.cream} />
              </a>
            </div>
            <div style={{ marginTop: 24, ...panel({ padding: 24 }) }}>
              <h3 style={{ fontFamily: serif, fontSize: 18, color: C.cream, marginBottom: 16 }}>Getting There</h3>
              {['Located on Elizabeth Street in North Hobart, easily accessible from the CBD.', 'Street parking available along Elizabeth Street and surrounding roads.', 'Approximately 8 minutes by car from Hobart CBD.'].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, fontFamily: sans, fontSize: 14, color: C.clay, marginBottom: 12 }}>
                  <span style={{ color: C.terracotta }}>→</span><p>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={panel()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Icon name="clock" size={16} color={C.terracotta} />
                <h2 style={{ fontFamily: serif, fontSize: 20, color: C.cream }}>Opening Hours</h2>
              </div>
              {VISIT_HOURS.map((item, i) => {
                const isToday = i === todayIdx;
                return (
                  <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', margin: isToday ? '0 -8px' : 0, borderRadius: isToday ? 10 : 0,
                    borderBottom: i < VISIT_HOURS.length - 1 && !isToday ? `1px solid ${C.b08}` : 'none', background: isToday ? 'rgba(201,122,47,0.06)' : 'transparent' }}>
                    <span style={{ fontFamily: sans, fontSize: 14, color: item.closed ? 'rgba(154,133,110,0.4)' : isToday ? C.terracotta : C.clay }}>
                      {item.day}{isToday && <span style={{ color: C.terracotta, fontSize: 12 }}> · today</span>}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: 14, color: item.closed ? 'rgba(154,133,110,0.4)' : isToday ? C.cream : 'rgba(240,230,210,0.7)' }}>{item.hours}</span>
                  </div>
                );
              })}
            </div>

            <div style={panel()}>
              <h2 style={{ fontFamily: serif, fontSize: 20, color: C.cream, marginBottom: 24 }}>Service Options</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['Dine In', '🪑'], ['Takeaway', '🥡'], ['Delivery', '🛵'], ['Kids Menu', '👶'], ['Vegan Options', '🌿'], ['Halal', '✦']].map(([l, e]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, fontFamily: sans, fontSize: 14, color: C.clay, border: `1px solid rgba(201,122,47,0.1)` }}>
                    <span>{e}</span>{l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VisitPage });
