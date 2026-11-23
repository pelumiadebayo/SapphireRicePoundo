import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Instagram, Menu, MessageCircle, X, MapPin, Phone } from 'lucide-react';
import Buy from './Buy';
import './index.css';

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/images/${name}`;
const logo = `${import.meta.env.BASE_URL}sapphire-logo-approved.png`;
const pack = asset('onericeflourtransparent.png');
const onepack = asset('onericeflour.jpeg');
const phone = 'tel:+2349036600814';
const salesEmail = 'mailto:sales@sapphirefoods.ng';
const instagramUrl = 'https://www.instagram.com/sapphirericepoundo/';
const tiktokUrl = 'https://www.tiktok.com/@sapphirericepoundo';
const whatsappUrl = 'https://wa.me/2349036600814';
const socialHandle = '@sapphirericepoundo';
const rootHash = (hash: string) => `${import.meta.env.BASE_URL}${hash}`;
const buyUrl = rootHash('#riceflour');
const buyPath = `${import.meta.env.BASE_URL}buy`.replace(/\/+$/, '');
const isBuyLocation = () => window.location.pathname.replace(/\/+$/, '') === buyPath;
const pairings = [
  { name: 'Egusi', image: 'rice_swallow_egusi_1789394113825.jpg', text: 'Rich melon seed soup for a comforting meal.' },
  { name: 'Efo riro', image: 'rice_swallow_eforiro_1789394125809.jpg', text: 'Peppery greens bring colour and depth to the table.' },
  { name: 'Ogbono', image: 'rice_swallow_ogbono_1789394136136.jpg', text: 'A classic draw soup with a savoury finish.' },
];

function Header({ wholesale, buyPage }: { wholesale: boolean; buyPage: boolean }) {
  const [open, setOpen] = useState(false);
  const links = wholesale || buyPage
    ? [{ label: 'Home', href: rootHash('#home') }, { label: 'Product', href: rootHash('#home-product') }, { label: 'Where to Buy', href: rootHash('#home-stockists') }]
    : [{ label: 'Product', href: rootHash('#product') }, { label: 'Recipes', href: rootHash('#recipes') }, { label: 'Where to Buy', href: rootHash('#stockists') }, { label: 'Wholesale', href: rootHash('#wholesale') }];
  return <header className="site-header"><div className="container header-inner">
    <a className="brand" href={rootHash('#home')} aria-label="Sapphire Foods home" onClick={() => setOpen(false)}><img src={logo} alt="" /><span>Sapphire <small>FOODS</small></span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}</nav>
    <a className="button button-small header-order" href={buyUrl}>Order Now <ArrowRight size={16} /></a>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <a key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}<a className="button" href={buyUrl} onClick={() => setOpen(false)}>Order Now <ArrowRight size={16} /></a></nav>}</header>;
}

function Heading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function Home() {
  const stockistForm = useRef<HTMLDialogElement>(null);

  return <>
    <section className="hero" id="hero"><div className="container hero-grid">
      <div className="hero-copy"><p className="eyebrow">SAPPHIRE RICE FLOUR MIX</p><h1>Smooth rice swallow for every soup.</h1><p className="hero-lead">Finely milled rice flour for preparing swallow. Serve it with egusi, efo riro, ogbono and the soups you love.</p><div className="actions"><a className="button" href={buyUrl}>Order Now <ArrowRight size={18} /></a><a className="text-link" href={rootHash('#stockists')}>Find a Stockist <ArrowRight size={17} /></a></div><p className="hero-note">Questions about order? Call/Whatsapp <a href={phone}>0903 660 0814</a>.</p></div>
      <div className="hero-visual"><img className="hero-food" src={asset('rice_swallow_egusi_1789394113825.jpg')} alt="Rice swallow served with Nigerian soup" /><div className="pack-frame"><img src={pack} alt="Sapphire Rice Flour Mix 1 kg pack artwork" /></div></div>
    </div></section>

    <section className="section" id="product"><div className="container"><Heading eyebrow="THE PRODUCT" title="Find the right pack for you">The current site shows a 1 kg pack. Ask our sales team for the current price and delivery options.</Heading><div className="product-layout"><div className="product-image"><img src={onepack} alt="Sapphire Rice Flour Mix 1 kg packaging artwork" loading="lazy" /></div><div className="product-details"><span className="product-kicker">RICE FLOUR FOR SWALLOW</span><h3>Sapphire Rice Flour Mix</h3><p className="weight">1 kg pack</p><p>For preparing rice swallow to enjoy with your favourite Nigerian soups.</p><div className="fact-line"><span>Price</span><strong>Request current wholesales price</strong></div><div className="fact-line"><span>Availability</span><strong>Confirm with Sapphire Foods</strong></div><a className="button" href={buyUrl}>Enquire and order <ArrowRight size={17} /></a></div></div></div></section>

    <section className="section section-cream" id="prepare"><div className="container prepare-grid"><div><Heading eyebrow="IN THE KITCHEN" title="Delicious swallow, made simple">A straightforward way to get started with Sapphire Rice Flour Mix.</Heading></div><ol className="steps"><li><span>01</span><div><h3>Bring water to a boil</h3><p>Start with clean water in a sturdy pot.</p></div></li><li><span>02</span><div><h3>Add flour gradually</h3><p>Stir continuously as you add the flour and it begins to thicken.</p></div></li><li><span>01</span><div><h3>Let It Cook</h3><p>Add a little water and steam for 5 minutes.</p></div></li><li><span>04</span><div><h3>Turn and serve</h3><p>Continue turning until the swallow reaches your preferred consistency. Serve warm with soup.</p></div></li></ol></div></section>

    <section className="section" id="recipes"><div className="container"><Heading eyebrow="MEAL INSPIRATION" title="Made for the soups you love">Three familiar ways to bring rice swallow to your table.</Heading><div className="recipe-grid">{pairings.map(pairing => <article className="recipe-card" key={pairing.name}><img src={asset(pairing.image)} alt={`Rice swallow served with ${pairing.name} soup`} loading="lazy" /><div><h3>{pairing.name}</h3><p>{pairing.text}</p></div></article>)}</div></div></section>

    <section className="section section-cream" id="facts"><div className="container facts-grid"><Heading eyebrow="PRODUCT FACTS" title="The details that matter"></Heading><div className="facts-list"><div><span>Product</span><strong>Sapphire Rice Flour Mix</strong></div><div><span>Pack shown, shelf life</span><strong>1 kg, 6M</strong></div><div><span>Used for</span><strong>Preparing rice swallow</strong></div><div><span>Ingredients</span><strong>Rice Granule & Cassava starch</strong></div><div><span>NAFDAC Number</span><strong>A8-121009L</strong></div></div></div></section>

    <section className="section" id="stockists"><div className="container stockist-panel"><div><p className="eyebrow">WHERE TO BUY</p><h2>Find Sapphire near you</h2><p>We are constantly working on bringing sapphire Rice Flour to your nearest store. For availability in Lagos or delivery to your area, contact our sales team directly.</p><div className="actions"><a className="button" href={phone}><Phone size={17} /> Call about availability</a><a className="text-link" href={salesEmail}>Email sales <ArrowRight size={17} /></a><button className="button stockist-form-button" type="button" onClick={() => stockistForm.current?.showModal()}>Tell us a store near you</button></div></div><div className="stockist-icon" aria-hidden="true"><MapPin size={76} strokeWidth={1.2} /></div></div></section>
    <dialog className="stockist-dialog" ref={stockistForm} aria-labelledby="stockist-dialog-title" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="stockist-dialog-header">
        <h2 id="stockist-dialog-title">Tell us the store nearest to you</h2>
        <button className="stockist-dialog-close" type="button" aria-label="Close form" onClick={() => stockistForm.current?.close()}><X size={22} /></button>
      </div>
      <iframe
        className="stockist-form-frame"
        title="Tell us the store nearest to you"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfTvI5yT4BaMKbntfS0E5GjNjNvm-dhKHAAnoeMmDH9htk1tQ/viewform?embedded=true"
        width="640"
        height="1144"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      >Loading…</iframe>
    </dialog>

    <section className="wholesale-teaser"><div className="container teaser-inner"><div><p className="eyebrow">FOR TRADE</p><h2>Partner with Sapphire Foods</h2><p>Interested in stocking Sapphire Rice Flour Mix in your supermarket, retail store, restaurant or distribution business? Let’s grow together.</p></div><a className="button button-light" href={rootHash('#wholesale')}>Become a Stockist <ArrowRight size={17} /></a></div></section>

    <section className="section faq" id="faq"><div className="container"><Heading eyebrow="GOOD TO KNOW" title="Frequently asked questions" /><div className="faq-list"><details><summary>What is Sapphire Rice Flour Mix used for?</summary><p>It is rice flour for preparing swallow to serve with Nigerian soups.</p></details><details><summary>Which pack size can I enquire about?</summary><p>The current site shows a 1 kg pack. Contact sales to confirm all available sizes and current pricing.</p></details><details><summary>How long does it take to prepare?</summary><p>We are confirming a single cooking time and the full preparation time from the approved cooking method.</p></details><details><summary>Where can I buy it?</summary><p>Contact Sapphire Foods for an order or current stockist information. Verified branch listings will appear here once confirmed.</p></details></div></div></section>
  </>;
}

function Wholesale() {
  return <div className="wholesale-page"><div className="container"><a href={rootHash('#home')} className="back-link">← Back to home</a><p className="eyebrow">WHOLESALE & DISTRIBUTION</p><h1>Grow with Sapphire Foods.</h1><p className="wholesale-lead">We welcome enquiries from supermarkets, food retailers, restaurants, caterers and distributors interested in Sapphire Rice Flour Mix.</p><div className="wholesale-grid"><div className="trade-card"><h2>Request a supply proposal</h2><p>Tell our sales team your business name, location, channel and expected order volume. We’ll discuss available packs, current trade pricing and delivery terms with you.</p><a className="button" href="mailto:sales@sapphirefoods.ng?subject=Sapphire%20Foods%20trade%20supply%20enquiry">Email the sales team <ArrowRight size={17} /></a><a className="trade-phone" href={phone}>Or call 0903 660 0814</a></div><div className="trade-card trade-facts"><h2>Commercial details</h2><dl><div><dt>Pack sizes and units per carton</dt><dd>Confirm with sales</dd></div><div><dt>Minimum order quantity</dt><dd>Confirm with sales</dd></div><div><dt>Pricing tiers</dt><dd>Quotation on request</dd></div><div><dt>Delivery coverage and charges</dt><dd>Confirm by destination</dd></div></dl><p>The previous estimator included unverified carton values, prices and discounts. These have been removed until current terms are approved.</p></div></div></div></div>;
}

function TikTokIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v11.5a4.5 4.5 0 1 1-4-4.47" /><path d="M14 3c.4 2.5 2.2 4.5 5 5" /></svg>;
}

function WhatsAppIcon() {
  return <span className="whatsapp-mark" aria-hidden="true"><MessageCircle size={21} /><Phone size={10} className="whatsapp-mark-phone" /></span>;
}

function SocialLinks({ floating = false }: { floating?: boolean }) {
  const links = [
    { name: 'Instagram', href: instagramUrl, label: `Instagram ${socialHandle}`, icon: <Instagram size={20} /> },
    { name: 'TikTok', href: tiktokUrl, label: `TikTok ${socialHandle}`, icon: <TikTokIcon /> },
    { name: 'WhatsApp', href: whatsappUrl, label: 'WhatsApp 0903 660 0814', icon: <WhatsAppIcon /> },
  ];

  return <nav className={floating ? 'social-links floating-socials' : 'social-links footer-socials'} aria-label={floating ? 'Social media links' : 'Follow Sapphire Foods'}>
    {links.map(link => <a key={link.name} className="social-link" href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
      {link.icon}
      {!floating && <span>{link.name === 'WhatsApp' ? 'WhatsApp 0903 660 0814' : `${link.name} ${socialHandle}`}</span>}
    </a>)}
  </nav>;
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><a className="brand" href={rootHash('#home')}><img src={logo} alt="" /><span>Sapphire <small>FOODS</small></span></a><p>Rice flour for the soups you love.</p></div>
      <div><h2>Explore</h2><a href={rootHash('#home-product')}>Product</a><a href={rootHash('#home-recipes')}>Recipes</a><a href={rootHash('#home-stockists')}>Where to Buy</a><a href={rootHash('#wholesale')}>Wholesale</a></div>
      <div><h2>Contact</h2><a href={phone}>0903 660 0814</a><a href={salesEmail}>sales@sapphirefoods.ng</a><a href="mailto:info@sapphirefoods.ng">info@sapphirefoods.ng</a></div>
      <div><h2>Follow us</h2><SocialLinks /></div>
    </div>
    <div className="container footer-bottom">© {new Date().getFullYear()} Sapphire Foods</div>
  </footer>;
}

export default function App() {
  const [wholesale, setWholesale] = useState(() => window.location.hash === '#wholesale');
  const [buyPage, setBuyPage] = useState(() => isBuyLocation() || window.location.hash === '#riceflour');
  useEffect(() => { const sync = () => {
    const hash = window.location.hash;
    const isWholesale = hash === '#wholesale';
    const isBuyPage = isBuyLocation() || hash === '#riceflour';
    setWholesale(isWholesale);
    setBuyPage(isBuyPage);
    document.title = isWholesale ? 'Wholesale & Distribution | Sapphire Foods' : isBuyPage ? 'Buy | Sapphire Foods' : 'Sapphire Rice Flour Mix | Rice Flour for Swallow in Nigeria';
    document.querySelector('meta[name="description"]')?.setAttribute('content', isWholesale ? 'Enquire about stocking Sapphire Rice Flour Mix. Contact Sapphire Foods for current trade packs, pricing and delivery terms.' : isBuyPage ? 'Order Sapphire Rice Flour Mix from Sapphire Foods.' : 'Discover Sapphire Rice Flour Mix for Nigerian rice swallow. Explore the 1 kg pack, soup pairings and how to enquire or order.');
    if (hash.startsWith('#home-')) { window.history.replaceState(null, '', '#'+hash.slice(6)); setWholesale(false); setBuyPage(false); setTimeout(() => document.getElementById(hash.slice(6))?.scrollIntoView(), 30); }
    if (hash === '#home') { window.history.replaceState(null, '', window.location.pathname); setWholesale(false); setBuyPage(false); window.scrollTo(0, 0); }
  }; window.addEventListener('hashchange', sync); sync(); return () => window.removeEventListener('hashchange', sync); }, []);
  return <><a className="skip-link" href={rootHash('#main')}>Skip to content</a><Header wholesale={wholesale} buyPage={buyPage} /><main id="main">{wholesale ? <Wholesale /> : buyPage ? <Buy /> : <Home />}</main><Footer />{!wholesale && !buyPage && <SocialLinks floating />}</>;
}
