/* global React, C, serif, sans, Icon, Eyebrow, UberBtn */
const { useState: useStateMenu } = React;

const MENU_DATA = [
  { id: 'manoush', icon: '🫓', label: 'Manoush & Flatbreads', items: [
    { name: "Za'atar", desc: 'Herb mix of oregano, thyme, sumac, and sesame seeds', price: 7.1, tags: ['vegan'] },
    { name: 'Cheese Manoush', desc: 'Melted mozzarella', price: 12.8, tags: [] },
    { name: 'Halloumi Manoush', desc: '', price: 13.9, tags: [] },
    { name: 'Sujuk and Cheese Manoush', desc: 'Spiced sausage', price: 15.7, tags: [] },
    { name: 'Falafel Foldover', desc: '', price: 20.0, tags: ['vegan', 'vegetarian'] },
    { name: 'Labneh Veggie Foldover', desc: 'Red onion, capsicum, olives, spinach, cucumber, tomato & dressing', price: 20.0, tags: ['vegetarian'] },
    { name: 'BBQ Chicken Flatbread', desc: 'Marinated chicken, red onion, mushroom, olives', price: 21.4, tags: [] },
    { name: 'Meat Lovers Flatbread', desc: 'Pepperoni, shredded beef, marinated chicken, and cheese', price: 22.9, tags: [] },
    { name: 'Supreme Flatbread', desc: 'Pepperoni, shredded beef, marinated chicken, red onion, capsicum, mushroom', price: 25.7, tags: [] },
  ]},
  { id: 'sweets', icon: '🍰', label: 'Sweets & Desserts', items: [
    { name: 'Classic Walnut Baklava', desc: '', price: 7.2, tags: [] },
    { name: 'Nutella & Banana Flatbread', desc: '', price: 16.71, tags: [] },
  ]},
  { id: 'hot', icon: '☕', label: 'Hot Drinks & Tea', items: [
    { name: 'Piccolo', desc: '', price: 4.0, tags: [] },
    { name: 'Lemon and Ginger Tea', desc: '', price: 5.2, tags: ['vegan'] },
    { name: 'Large Latte', desc: '3 shots', price: 6.4, tags: [] },
    { name: 'Large Nutella Latte', desc: '2 shots', price: 7.3, tags: [] },
  ]},
  { id: 'cold', icon: '🥤', label: 'Cold Drinks & Smoothies', items: [
    { name: 'Iced Long Black', desc: '4 shots', price: 10.0, tags: [] },
    { name: 'Acai Smoothie', desc: 'Brazilian berries, coconut water, banana', price: 12.2, tags: ['vegan', 'vegetarian'] },
    { name: 'Gym Junky Smoothie', desc: 'Smooth peanut butter and vanilla ice cream', price: 12.2, tags: [] },
    { name: 'Iced Mocha', desc: '3 shots', price: 12.5, tags: [] },
  ]},
];
const TAG_COLOR = { vegan: '#2d6a4f', vegetarian: '#52796f' };
const TAG_LABEL = { vegan: 'VG', vegetarian: 'V' };

function MenuRow({ item }) {
  const [h, setH] = useStateMenu(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, padding: '16px 0', borderBottom: `1px solid ${C.b08}` }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span style={{ fontFamily: sans, color: h ? C.terracotta : C.cream, fontSize: 14, transition: 'color .2s' }}>{item.name}</span>
          {item.tags.map((t) => (
            <span key={t} style={{ fontSize: 10, padding: '2px 6px', letterSpacing: '0.12em', textTransform: 'uppercase', background: TAG_COLOR[t], color: C.cream, opacity: 0.9 }}>{TAG_LABEL[t]}</span>
          ))}
        </div>
        {item.desc && <p style={{ fontFamily: sans, fontSize: 12, color: C.clay, lineHeight: 1.5 }}>{item.desc}</p>}
      </div>
      <span style={{ fontFamily: serif, color: C.terracotta, fontSize: 14, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>${item.price.toFixed(2)}</span>
    </div>
  );
}

function MenuPage() {
  const [active, setActive] = useStateMenu('all');
  const tabs = [{ id: 'all', icon: '✦', label: 'All' }, ...MENU_DATA.map((c) => ({ id: c.id, icon: c.icon, label: c.label }))];
  const visible = active === 'all' ? MENU_DATA : MENU_DATA.filter((c) => c.id === active);

  return (
    <div>
      <div style={{ position: 'relative', paddingTop: 128, paddingBottom: 64, paddingLeft: 24, paddingRight: 24, textAlign: 'center', background: C.raised, borderBottom: `1px solid ${C.b18}`, marginTop: -73 }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 640, margin: '0 auto' }}>
          <Eyebrow style={{ marginBottom: 16 }}>356 Elizabeth Street, North Hobart</Eyebrow>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.75rem,6vw,3.75rem)', color: C.cream, marginBottom: 16 }}>Our Menu</h1>
          <p style={{ fontFamily: sans, color: C.clay, fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
            Everything baked fresh to order. Halal · Vegetarian · Vegan options available.
          </p>
          <UberBtn>Order on Uber Eats</UberBtn>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ position: 'sticky', top: 72, zIndex: 40, padding: '16px 24px', overflowX: 'auto', background: 'rgba(18,13,6,0.97)', borderBottom: `1px solid ${C.b15}`, backdropFilter: 'blur(8px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 'max-content', maxWidth: 1152, margin: '0 auto' }}>
          {tabs.map((cat) => {
            const on = active === cat.id;
            return (
              <button key={cat.id} onClick={() => setActive(cat.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', fontFamily: sans, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all .2s',
                  background: on ? C.terracotta : 'transparent', color: on ? C.cream : C.clay, border: `1px solid ${on ? C.terracotta : 'rgba(201,122,47,0.2)'}` }}>
                <span>{cat.icon}</span>{cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
        {visible.map((category) => (
          <section key={category.id} style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <span style={{ fontSize: 24 }}>{category.icon}</span>
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.5rem,3vw,1.875rem)', color: C.cream }}>{category.label}</h2>
              <div style={{ flex: 1, height: 1, background: C.b18 }} />
            </div>
            {category.items.map((item) => <MenuRow key={item.name} item={item} />)}
          </section>
        ))}
        <div style={{ marginTop: 32, paddingTop: 32, display: 'flex', flexWrap: 'wrap', gap: 24, borderTop: `1px solid ${C.b12 || 'rgba(201,122,47,0.12)'}`, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.clay, fontFamily: sans }}>
            <span style={{ padding: '2px 6px', fontSize: 10, letterSpacing: '0.12em', background: '#2d6a4f', color: C.cream }}>VG</span> Vegan
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.clay, fontFamily: sans }}>
            <span style={{ padding: '2px 6px', fontSize: 10, letterSpacing: '0.12em', background: '#52796f', color: C.cream }}>V</span> Vegetarian
          </div>
          <p style={{ fontFamily: sans, fontSize: 12, color: 'rgba(154,133,110,0.6)', marginLeft: 'auto' }}>All items are halal unless noted otherwise.</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MenuPage });
