/* ==========================================================
   Task 8 — JS OOP with inheritance + SCSS + CSS Theming
   - Base class Product
   - Subclasses BookProduct, ElectronicProduct override behavior
   - Factory builds proper subclass
   - DOM built dynamically; theming via [data-theme]
   ========================================================== */

// ---------- Theme toggle ----------
const root = document.documentElement; // <html>
const tbtn = document.getElementById('themeToggle');
function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  tbtn.setAttribute('aria-pressed', String(theme === 'dark'));
  localStorage.setItem('t8-theme', theme);
}
(function initTheme(){
  const s = localStorage.getItem('t8-theme');
  if (s) return applyTheme(s);
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(dark ? 'dark' : 'light');
})();
tbtn.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

// ---------- Utilities ----------
const Rs = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

function coverSVG(title = "Item") {
  const letter = (title.trim()[0] || 'I').toUpperCase();
  const palette = [
    ['#2563eb','#00c2ff'], ['#6a5cff','#ff7ad9'], ['#00c896','#82eaff'],
    ['#ff7a7a','#ffd6a5'], ['#ffa500','#ffed4a'],
  ];
  const [c1, c2] = palette[letter.charCodeAt(0) % palette.length];
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
          font-family="system-ui,-apple-system,Segoe UI,Roboto,Arial" font-size="260"
          fill="rgba(255,255,255,.94)" font-weight="800">${letter}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function stars(r) {
  const full = Math.floor(r), half = r - full >= 0.5 ? 1 : 0, empty = 5 - full - half;
  return "★".repeat(full) + (half ? "☆" : "") + "☆".repeat(empty);
}

// ---------- OOP Model ----------
class Product {
  #id; // private field (encapsulation)
  constructor({ id, title, price, category = 'General', rating = 0, stock = 0, cover = '' }) {
    this.#id = id ?? crypto.randomUUID();
    this.title = title;
    this.price = Number(price);
    this.category = category;
    this.rating = Number(rating);
    this.stock = Number(stock);
    this.cover = cover || coverSVG(title);
    this.type = 'Product';
  }
  get id(){ return this.#id; }
  getBadge(){ return this.type; }          // intended to be overridden
  getOldPrice(){ return null; }            // overridden if discounted
  finalPrice(){ return this.price; }       // overridden by subclasses
  // Polymorphic renderer
  render(){
    const root = document.createElement('article');
    root.className = "card product";

    // media
    const media = document.createElement('div');
    media.className = "product-media";
    const img = document.createElement('img'); img.src = this.cover; img.alt = `${this.title} image`;
    const badge = document.createElement('span'); badge.className = "badge"; badge.textContent = this.getBadge();
    media.append(img, badge);

    // content
    const title = document.createElement('h3'); title.className = "product-title"; title.textContent = this.title;
    const meta  = document.createElement('div'); meta.className = "product-meta"; meta.textContent = `${this.category} • ${this.stock} in stock`;
    const rating= document.createElement('div'); rating.className = "product-rating"; rating.textContent = `${stars(this.rating)}  ${this.rating.toFixed(1)}`;

    // footer
    const footer = document.createElement('div'); footer.className = "product-footer";
    const priceWrap = document.createElement('div');
    const price = document.createElement('span'); price.className = "price"; price.textContent = Rs.format(this.finalPrice());
    const old = this.getOldPrice();
    if (old) { const s = document.createElement('span'); s.className = "old"; s.textContent = Rs.format(old); priceWrap.append(price, s); }
    else priceWrap.append(price);

    const btn = document.createElement('button'); btn.className = "btn"; btn.textContent = "Details";
    btn.addEventListener('click', () => {
      alert(`${this.title}\nType: ${this.getBadge()}\nCategory: ${this.category}\nPrice: ${Rs.format(this.finalPrice())}\nRating: ${this.rating}\nStock: ${this.stock}`);
    });

    footer.append(priceWrap, btn);
    root.append(media, title, meta, rating, footer);
    return root;
  }
}

class BookProduct extends Product {
  constructor(opts){ super(opts); this.type = 'Book'; }
  getBadge(){ return 'Book'; }
  // Example: 10% discount for "Programming" books
  finalPrice(){
    if ((this.category || '').toLowerCase() === 'programming') return this.price * 0.9;
    return this.price;
  }
  getOldPrice(){
    if ((this.category || '').toLowerCase() === 'programming') return this.price;
    return null;
  }
}

class ElectronicProduct extends Product {
  constructor(opts){ super(opts); this.type = 'Electronic'; this.warrantyYears = opts.warrantyYears ?? 1; }
  getBadge(){ return `Electronic • ${this.warrantyYears}y`;}
  // Example: electronics add 3% env. fee
  finalPrice(){ return Math.round(this.price * 1.03); }
  getOldPrice(){ return null; }
}

// Factory — decides subclass based on `type`
function createProduct(data){
  switch ((data.type || '').toLowerCase()) {
    case 'book': return new BookProduct(data);
    case 'electronic': return new ElectronicProduct(data);
    default: return new Product(data);
  }
}

// ---------- Data / Controller ----------
const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const q = document.getElementById('q');
const sort = document.getElementById('sort');
const seed = document.getElementById('seed');

const store = []; // holds instances (polymorphic)

const samples = [
  { type:'book', title:'Clean Code', price:589, rating:4.7, stock:12, category:'Programming' },
  { type:'book', title:'Sapiens', price:529, rating:4.5, stock:7, category:'History' },
  { type:'electronic', title:'Noise Smartwatch', price:2499, rating:4.2, stock:18, category:'Wearables', warrantyYears:2 },
  { type:'electronic', title:'Bluetooth Speaker', price:1499, rating:4.1, stock:30, category:'Audio' },
  { type:'book', title:'Atomic Habits', price:399, rating:4.6, stock:20, category:'Self-help' },
  { type:'electronic', title:'USB-C Hub', price:999, rating:4.0, stock:14, category:'Accessories' }
];

function refresh(){
  grid.innerHTML = '';
  const query = (q.value || '').toLowerCase().trim();

  let list = store.filter(p =>
    p.title.toLowerCase().includes(query) ||
    (p.category || '').toLowerCase().includes(query) ||
    (p.type || '').toLowerCase().includes(query)
  );

  switch (sort.value) {
    case 'price-asc':  list.sort((a,b)=> a.finalPrice() - b.finalPrice()); break;
    case 'price-desc': list.sort((a,b)=> b.finalPrice() - a.finalPrice()); break;
    case 'rating-asc': list.sort((a,b)=> a.rating - b.rating); break;
    case 'rating-desc':list.sort((a,b)=> b.rating - a.rating); break;
    default: /* insertion order */ break;
  }

  if (!list.length){ empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  for (const p of list) grid.append(p.render()); // polymorphic render
}

// Events
q.addEventListener('input', refresh);
sort.addEventListener('change', refresh);
seed.addEventListener('click', () => {
  if (!store.length) samples.forEach(s => store.push(createProduct(s)));
  refresh();
});

// Initial
refresh();