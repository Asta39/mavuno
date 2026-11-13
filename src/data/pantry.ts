export type Product = {
  id: number; slug: string; name: string; category: string; price: number;
  size: string; color: string; label: string; tagline: string;
  /** Optional cut-out render in /public/renders/<slug>.png. Falls back to the CSS jar. */
  image?: string;
};

export const products: Product[] = [
  { id: 1, slug: "kalamata-rosemary", image: "/renders/kalamata-rosemary.png", name: "Kalamata in Rosemary", category: "Olives", price: 850, size: "250g", color: "#3B2A3A", label: "Kalamata", tagline: "on everything, honestly" },
  { id: 2, slug: "chili-green-olives", image: "/renders/chili-green-olives.png", name: "Green Olives, Chili & Lemon", category: "Olives", price: 750, size: "250g", color: "#6B7A2A", label: "Chili Green", tagline: "the bar's best seller" },
  { id: 3, slug: "basil-pesto", image: "/renders/basil-pesto.png", name: "Basil Pesto", category: "Pestos", price: 690, size: "180g", color: "#4E7A2A", label: "Basil", tagline: "Sunday pasta, sorted" },
  { id: 4, slug: "tomato-pesto", image: "/renders/tomato-pesto.png", name: "Sun-dried Tomato Pesto", category: "Pestos", price: 720, size: "180g", color: "#A3341C", label: "Tomato", tagline: "ask for a taste first" },
  { id: 5, slug: "hot-pesto", image: "/renders/hot-pesto.png", name: "Hot Pesto", category: "Pestos", price: 720, size: "180g", color: "#C9541E", label: "Hot", tagline: "not for the shy" },
  { id: 6, slug: "onion-jam", image: "/renders/onion-jam.png", name: "Red Onion Jam", category: "Spreads", price: 650, size: "220g", color: "#5A1E2C", label: "Onion Jam", tagline: "with any cheese ever" },
  { id: 7, slug: "artichokes", image: "/renders/artichokes.png", name: "Marinated Artichokes", category: "Spreads", price: 980, size: "280g", color: "#7C8A4A", label: "Artichoke", tagline: "dip it, stuff it, pile it" },
  { id: 8, slug: "chilli-crackers", image: "/renders/chilli-crackers.png", name: "Sweet Chilli Crackers", category: "Crackers", price: 450, size: "120g box", color: "#D9A441", label: "Crackers", tagline: "the board's backbone" },
  { id: 9, slug: "marinated-feta", image: "/renders/marinated-feta.png", name: "Marinated Feta Cubes", category: "Cheese", price: 1100, size: "250g", color: "#B9B08A", label: "Feta", tagline: "salad's new best friend" },
  { id: 10, slug: "pantry-hamper", image: "/renders/pantry-hamper.png", name: "Pantry Hamper", category: "Hampers", price: 4800, size: "6 jars + crackers", color: "#2F3A1A", label: "Hamper", tagline: "the December gift" },
];

export const boardSizes = [
  { name: "Picnic", serves: "2–4", base: 2500, max: 4, mult: 1 },
  { name: "Gathering", serves: "8–10", base: 5500, max: 6, mult: 2 },
  { name: "Party", serves: "20–25", base: 11000, max: 9, mult: 4 },
];

/** `img` is a top-down cut-out in /public/board/<img>.png */
export const boardItems: { name: string; color: string; price: number; img: string }[] = [
  { name: "Kalamata", color: "#3B2A3A", price: 300, img: "kalamata" }, { name: "Chili greens", color: "#6B7A2A", price: 300, img: "chili-greens" },
  { name: "Basil pesto", color: "#4E7A2A", price: 250, img: "basil-pesto" }, { name: "Tomato pesto", color: "#A3341C", price: 250, img: "tomato-pesto" },
  { name: "Onion jam", color: "#5A1E2C", price: 250, img: "onion-jam" }, { name: "Feta", color: "#EDE7CF", price: 400, img: "feta" },
  { name: "Aged cheddar", color: "#E1B54A", price: 450, img: "aged-cheddar" }, { name: "Crackers", color: "#D9A441", price: 200, img: "crackers" },
  { name: "Grapes", color: "#6E3A6B", price: 200, img: "grapes" }, { name: "Salami", color: "#9C2F2A", price: 500, img: "salami" },
  { name: "Cucumber", color: "#9DBB6B", price: 150, img: "cucumber" }, { name: "Artichoke", color: "#7C8A4A", price: 350, img: "artichoke" },
];

/** `ticket` is a worn blank ticket in /public/tickets; `stub` is where its perforation sits (0–1 of width), `ratio` its width/height. */
export const markets = [
  { date: "Sat 15", name: "Karura Forest Market", detail: "9am–3pm · Stall 14", ticket: 1, stub: 0.766, ratio: 900 / 404 },
  { date: "Sun 16", name: "Village Farmers' Market", detail: "10am–4pm · Olive bar", ticket: 2, stub: 0.752, ratio: 900 / 419 },
  { date: "Sat 22", name: "Lavington Green Pop-up", detail: "9am–2pm", ticket: 3, stub: 0.73, ratio: 900 / 447 },
  { date: "Sat 29", name: "Christmas Food Fair", detail: "10am–6pm · Hampers on site", ticket: 4, stub: 0.757, ratio: 900 / 395 },
];

export const batches: Record<string, [string, string][]> = {
  "OL-2611": [["Harvest", "Laikipia grove, 28 Oct"], ["Brined", "21 days in sea-salt brine"], ["Marinated", "Rosemary, lemon, garlic · 18 Nov"], ["Jarred", "20 Nov · pH 3.9 logged"], ["Best before", "20 May 2027"]],
  "PB-2608": [["Basil picked", "Limuru farm, 6 Nov"], ["Blended", "7 Nov · cold-pressed oil"], ["Jarred", "7 Nov · sealed 85°C"], ["Best before", "7 Feb 2027"]],
};

export const kes = (n: number) => "KES " + n.toLocaleString("en-KE");
