# Mavuno Pantry

**A storefront concept for a small-batch Kenyan food brand.**

Mavuno Pantry is a fictional artisanal pantry from Nairobi that sells marinated olives, pestos, spreads, crackers and cheese at weekend farmers' markets, online, and wholesale to delis and cafés. This repository is a design and front-end concept: a reference build that shows how a small food business could present itself online with real personality instead of a template.

> *Mavuno* means "harvest" in Swahili. *Karibu mezani* means "welcome to the table".

**Status:** concept project. The brand, products, prices, markets, phone number and social handles are all invented, and no orders, payments or sign-ups are sent anywhere.

---

## The idea

Most small food brands end up on a generic grid-of-products theme. This concept goes the other way: the site should feel like the market stall itself, with things scattered across a table rather than lined up in rows.

- **Bold, pantry-coloured palette.** Brine green, olive, tomato red, mustard and kraft brown, taken from the jars and the stall.
- **Big condensed type.** Oversized Anton headlines set against handwritten notes in Caveat.
- **Real objects, not boxes.** Content sits on paper you would actually find at a market: tickets, a clipboard, a shipping tag and a till receipt.
- **Restraint with motion.** A few hover tilts and a small pop as ingredients land on the board. No scroll-jacking and no heavy effects.

## What's on the page

| Section | What it does |
| --- | --- |
| **Hero** | "Something Salty" headline with three product jars sitting on a curved arc that stays at the bottom of the first screen on every size. |
| **Manifesto** | Sticky-note shopping list and a kraft-paper card with the brand's voice. |
| **The pantry** | Ten products scattered at slight angles with price stickers, one-line taglines, category filters and add-to-basket. |
| **Build your board** | Pick a board size (Picnic, Gathering, Party), tick up to 9 ingredients, and watch them appear on an olive-wood board with a live price. |
| **Catch us at the market** | Upcoming market days printed on worn paper admission tickets, each with a tear-off "Admit one" stub and a stamped pre-order button. |
| **Stock Mavuno** | Wholesale enquiry form written onto an order sheet on an old wooden clipboard. |
| **Where's my jar from?** | Batch trace on a kraft shipping tag: enter the code from a lid (try `OL-2611` or `PB-2608`) to see harvest, brining, jarring and best-before dates. |
| **Footer** | An end-of-day stall receipt with the site's links as line items, opening hours, contact, a newsletter sign-up and a "Paid · Asante" stamp. |
| **Basket** | Slide-out basket with a demo M-Pesa payment prompt. |

On phones the navigation collapses into a **Menu** button, and every section was checked from 375px up to 2560px wide.

## Imagery

All product and texture imagery was generated for this concept with [Magnific](https://www.magnific.ai/) and cut out to transparent PNGs:

- **Product renders**: Mavuno-labelled jars, a cracker box and a gift hamper, generated from one style reference so the lids, labels and lighting match.
- **Board ingredients**: top-down shots of each ingredient plus the olive-wood board.
- **Paper props**: worn tickets, the clipboard, the shipping tag and the till receipt, generated blank so the site's own text can be laid on top.

The text on the paper props uses `mix-blend-mode: multiply`, so the stains and creases show through and it reads as printed.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) with React 19 and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) for the base layer, with hand-written CSS for the collage layout
- `next/font` for Anton, Caveat, Instrument Sans and JetBrains Mono
- `next/image` for the product and ingredient imagery

There is no backend: the products, boards, markets and batch codes live in one typed data file.

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project structure

```
src/
  app/
    layout.tsx        Fonts and page metadata
    page.tsx          Renders the storefront
    globals.css       Palette, collage layout and responsive rules
  components/
    Storefront.tsx    Every section, the basket, board builder and phone menu
    Jar.tsx           Product image with a CSS-drawn fallback jar
  data/
    pantry.ts         Products, board sizes and ingredients, markets, batch codes
public/
  renders/            Product renders
  board/              Board and ingredient cut-outs
  tickets/            Worn market tickets
  props/              Clipboard, shipping tag and receipt
```

To change products, prices, market dates or batch codes, edit `src/data/pantry.ts`. Each product can point at an image in `public/renders/`; without one, a CSS-drawn jar in the product's colour is shown instead.

## Taking it further

The concept stops at the front end. A production version would add:

- **Checkout:** M-Pesa STK push (Safaricom Daraja) and card payments, plus delivery zones and fees.
- **Admin:** a back office for orders, stock, batches and expiry, market-day sales and wholesale accounts.
- **Content:** a CMS for products, recipes and market dates.
- **Forms:** real handling for the wholesale form and the newsletter sign-up.

## Credits

Design and development as a portfolio concept. Imagery generated with Magnific. Fonts from Google Fonts.

Mavuno Pantry is a fictional brand. Any resemblance to a real business is coincidental.
