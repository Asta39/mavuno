"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Jar from "./Jar";
import { batches, boardItems, boardSizes, kes, markets, products } from "@/data/pantry";

type Line = { name: string; price: number; qty: number };

const sections = ["shop", "boards", "markets", "wholesale"];

const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Storefront() {
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [sizeIdx, setSizeIdx] = useState(1);
  const [picks, setPicks] = useState<number[]>([0, 2, 5, 7, 8]);
  const [code, setCode] = useState("OL-2611");
  const [traced, setTraced] = useState("OL-2611");
  const [leadSent, setLeadSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  const cats = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], []);
  const shown = products.filter((p) => cat === "All" || p.category === cat);
  const size = boardSizes[sizeIdx];
  const boardPrice = size.base + picks.reduce((a, i) => a + boardItems[i].price * size.mult, 0);
  const count = cart.reduce((a, l) => a + l.qty, 0);
  const total = cart.reduce((a, l) => a + l.price * l.qty, 0);
  const hero = ["tomato-pesto", "kalamata-rosemary", "basil-pesto"].map((slug) => products.find((p) => p.slug === slug)!);
  const trail = batches[traced.trim().toUpperCase()];

  const add = (name: string, price: number) =>
    setCart((c) => (c.some((l) => l.name === name) ? c.map((l) => (l.name === name ? { ...l, qty: l.qty + 1 } : l)) : [...c, { name, price, qty: 1 }]));

  const pickSize = (i: number) => {
    setSizeIdx(i);
    setPicks((p) => p.slice(0, boardSizes[i].max));
  };
  const toggle = (i: number) =>
    setPicks((p) => (p.includes(i) ? p.filter((x) => x !== i) : p.length >= size.max ? p : [...p, i]));

  // Fixed slots around the board, filled in pick order. Fewer picks = bigger portions.
  const slots: [number, number][] = [[50, 50], [27, 30], [72, 28], [76, 66], [30, 72], [50, 18], [18, 52], [82, 46], [52, 82]];
  const portion = picks.length <= 4 ? 34 : picks.length <= 6 ? 29 : 25;
  const placed = picks.map((i, n) => ({ ...boardItems[i], left: slots[n][0], top: slots[n][1], rot: (n * 47) % 40 - 20 }));

  return (
    <main className="store">
      <div className="sv-hero grain" id="hero">
        <div className="sv-in">
          <nav className="sv-nav" aria-label="Store">
            <span className="sv-logo">Mavuno</span>
            {sections.map((s) => (
              <a key={s} href={`#${s}`}>{s}</a>
            ))}
            <button className="sv-menu-btn" aria-expanded={menuOpen} aria-controls="phone-menu" onClick={() => setMenuOpen((o) => !o)}>
              {menuOpen ? "Close" : "Menu"}
            </button>
            <button className="sv-cart" onClick={() => setOpen(true)}>
              Basket<span className="n">{count}</span>
            </button>
          </nav>
        </div>
        <div id="phone-menu" className={`sv-menu${menuOpen ? " open" : ""}`} hidden={!menuOpen}>
          {sections.map((s) => (
            <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}>{s}</a>
          ))}
        </div>
        <p className="eyb">Small-batch pantry · Nairobi · brined, blended &amp; jarred by hand</p>
        <div className="sv-sticker s1">Made<br />this<br />week</div>
        <h1>
          <span className="sm">Good food needs</span>Something <span className="tw">Salty</span>
        </h1>
        <div className="curve">
          {hero.map((p) => (
            <Jar key={p.slug} color={p.color} label={p.label} size={p.size} image={p.image} alt={p.name} />
          ))}
        </div>
      </div>
      <div className="sv-cta">
        <button className="sv-btn" onClick={() => jump("shop")}>Shop the pantry</button>
        <button className="sv-btn y" onClick={() => jump("boards")}>Build a board</button>
      </div>

      <section className="sv-sec sv-in sv-manifesto">
        <div className="left">
          <div className="note-y">
            <span className="tape" style={{ left: 70, top: -14, transform: "rotate(-4deg)" }} />
            Saturday list:
            <ul><li>pick up feta</li><li>olives for the bar</li><li>pesto, lots</li></ul>
          </div>
          <p className="scribble">brined 21 days, not 21 minutes</p>
        </div>
        <div className="kraft">
          <span className="tape" style={{ right: 40, top: -14, transform: "rotate(6deg)" }} />
          <p className="sv-big">Picnics, potlucks, midnight crackers, last-minute guests. We fill the board.</p>
        </div>
      </section>

      <section className="sv-sec sv-in" id="shop">
        <div className="sv-head">
          <h2 className="sv-big">The<br />pantry</h2>
          <div className="filters">
            {cats.map((c) => (
              <button key={c} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="scatter">
          {shown.map((p) => (
            <article className="pcard" key={p.id}>
              <span className="pr">{p.price.toLocaleString("en-KE")}/-</span>
              <Jar color={p.color} label={p.label} size={p.size} image={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <span className="tagline">{p.tagline}</span>
              <button className="add" onClick={() => add(p.name, p.price)}>Add to basket</button>
            </article>
          ))}
        </div>
      </section>

      <section className="sv-band grain" id="boards">
        <div className="sv-in sv-sec bb">
          <div>
            <h2 className="sv-big">Build<br />your<br />board</h2>
            <div className="recipe">
              <h4>pick a size…</h4>
              <div className="sizes">
                {boardSizes.map((s, i) => (
                  <button key={s.name} aria-pressed={i === sizeIdx} onClick={() => pickSize(i)}>
                    {s.name}
                    <small>serves {s.serves} · up to {s.max} picks</small>
                  </button>
                ))}
              </div>
              <h4>…then the good stuff</h4>
              <div className="picks">
                {boardItems.map((it, i) => (
                  <label key={it.name}>
                    <input type="checkbox" checked={picks.includes(i)} onChange={() => toggle(i)} /> {it.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="boardwrap">
            <div className="board" aria-label={`Board with ${placed.map((p) => p.name).join(", ")}`}>
              <Image src="/board/board.png" alt="" fill sizes="420px" className="board-wood" priority={false} />
              {placed.map((p) => (
                <Image
                  key={p.img}
                  src={`/board/${p.img}.png`}
                  alt=""
                  width={400}
                  height={400}
                  className="board-item"
                  style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${portion}%`, transform: `translate(-50%,-50%) rotate(${p.rot}deg)` }}
                />
              ))}
            </div>
            <div className="price-tag">
              <small>SERVES {size.serves}</small>
              {kes(boardPrice)}
            </div>
            <button
              className="sv-btn y"
              onClick={() => {
                add(`${size.name} board (${picks.length} picks)`, boardPrice);
                setOpen(true);
              }}
            >
              Add board to basket
            </button>
            <p className="note">24h notice · delivered across Nairobi</p>
          </div>
        </div>
      </section>

      <section className="sv-sec sv-in" id="markets">
        <div className="sv-head">
          <h2 className="sv-big">Catch us<br />at the market</h2>
          <p className="scribble">pre-order, skip the queue</p>
        </div>
        <div className="tickets">
          {markets.map((m, i) => (
            <div
              className="ticket"
              key={m.date}
              style={{ backgroundImage: `url(/tickets/ticket-${m.ticket}.png)`, aspectRatio: m.ratio, ["--stub" as string]: `${m.stub * 100}%` }}
            >
              <div className="t-main">
                <span className="t-kicker">Mavuno Pantry presents</span>
                <span className="d">{m.date}</span>
                <b>{m.name}</b>
                <small>{m.detail}</small>
                <button onClick={() => jump("shop")}>Pre-order</button>
              </div>
              <div className="t-stub" aria-hidden="true">
                <span>Admit one</span>
                <span className="num">Nº 00{41 + i}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sv-sec sv-in duo" id="wholesale">
        <div className="clip">
          <h2 className="sv-big">Stock<br />Mavuno</h2>
          <p style={{ marginBlock: "10px 18px" }}>
            Delis, cafés &amp; hotels. Tiered pricing from 12 jars, standing weekly orders, 30-day terms.
          </p>
          <form className="form" onSubmit={(e) => { e.preventDefault(); setLeadSent(true); }}>
            <label>Business name<input required name="business" /></label>
            <label>Type
              <select name="type"><option>Deli</option><option>Café</option><option>Hotel</option><option>Supermarket</option></select>
            </label>
            <label>Jars per month<input type="number" min={12} defaultValue={48} name="volume" /></label>
            <button className="sv-btn">Get the price list</button>
            {leadSent && <p className="ok-msg">Got it. Not sent anywhere yet: the backend comes later.</p>}
          </form>
        </div>
        <div className="tagcard">
          <h2 className="sv-big">Where&apos;s my jar from?</h2>
          <p>Every lid has a code. Try <span className="num">OL-2611</span> or <span className="num">PB-2608</span>.</p>
          <div className="trace">
            <input value={code} onChange={(e) => setCode(e.target.value)} aria-label="Batch code" />
            <button className="sv-btn" onClick={() => setTraced(code)}>Trace</button>
          </div>
          <div className="trail">
            {trail ? (
              trail.map(([k, v]) => (<div key={k}><b>{k}</b><span>{v}</span></div>))
            ) : (
              <div><b>Not found</b><span>Check the code on the lid. Format is two letters, dash, four digits.</span></div>
            )}
          </div>
        </div>
      </section>

      <footer className="sv-foot grain">
        <div className="sv-in foot-stage">
          <p className="sv-big foot-word" aria-hidden="true">Karibu<br />mezani.</p>
          <div className="receipt">
            <header className="r-head">
              <b>Mavuno Pantry</b>
              <span>Stall 14 · Karura Forest Market</span>
              <span>Nairobi, Kenya</span>
            </header>
            <p className="r-row r-meta"><span>SAT 15 NOV</span><span>09:41</span><span>TILL 02</span></p>
            <nav className="r-block" aria-label="Footer">
              {[["Shop the pantry", "shop"], ["Build a board", "boards"], ["Market days", "markets"], ["Wholesale", "wholesale"]].map(([label, id]) => (
                <a key={id} className="r-row r-line" href={`#${id}`}><span>{label}</span><i /><span>→</span></a>
              ))}
            </nav>
            <div className="r-block">
              <p className="r-row r-line"><span>Open</span><i /><span>Sat–Sun 9–4</span></p>
              <p className="r-row r-line"><span>Orders</span><i /><span>Tue–Fri</span></p>
              <p className="r-row r-line"><span>WhatsApp</span><i /><span>0712 000 000</span></p>
              <p className="r-row r-line"><span>Instagram</span><i /><span>@mavuno.pantry</span></p>
            </div>
            <form className="r-block r-join" onSubmit={(e) => { e.preventDefault(); setJoined(true); }}>
              <label htmlFor="join-email">Join the Saturday list</label>
              <div>
                <input id="join-email" type="email" required placeholder="you@email.com" />
                <button>Add</button>
              </div>
              {joined && <span className="r-ok">Added. Not sent anywhere yet: this is a demo.</span>}
            </form>
            <div className="r-block r-total">
              <p className="r-row"><span>TOTAL</span><span>GOOD FOOD</span></p>
              <p className="r-row"><span>PAID VIA</span><span>M-PESA</span></p>
            </div>
            <span className="r-stamp" aria-hidden="true">Paid<br />Asante</span>
            <div className="r-barcode" aria-hidden="true" />
            <p className="r-fine">Concept project · fictional brand · example details</p>
          </div>
        </div>
      </footer>

      <aside className={`drawer${open ? " open" : ""}`} aria-label="Basket" aria-hidden={!open}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 28 }}>Your basket</h3>
          <button className="sv-cart" onClick={() => setOpen(false)}>Close</button>
        </div>
        <div className="items">
          {cart.length === 0 && <p className="note">Basket is empty. Add a jar or build a board.</p>}
          {cart.map((l) => (
            <div className="it" key={l.name}>
              <span>{l.qty} × {l.name}</span>
              <b className="num">{kes(l.price * l.qty)}</b>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Total</span><b className="num">{kes(total)}</b>
        </div>
        <div className="mpesa">
          <b>Pay with M-Pesa</b>
          <label className="note" htmlFor="phone">Phone number for the payment prompt</label>
          <input id="phone" placeholder="07XX XXX XXX" />
          <button className="sv-btn" onClick={() => setPaid(true)}>Send payment prompt</button>
          {paid && <span className="note">Demo only. No payment is sent until checkout is connected.</span>}
        </div>
      </aside>
    </main>
  );
}
