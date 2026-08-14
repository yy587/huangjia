import rawCatalog from "../data/catalog.json";

export type Product = {
  slug: string;
  name: string;
  categories: string[];
  category: string;
  description: string;
  summary: string;
  images: string[];
  sourceUrl: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  content: string;
  image: string;
  sourceUrl: string;
};

export const catalog = rawCatalog as {
  generatedFrom: string;
  products: Product[];
  news: NewsArticle[];
  contact: {
    company: string;
    phone: string;
    email: string;
    sourceUrl: string;
  };
};

export const categoryGroups = [
  {
    name: "Ceramic Tile",
    children: ["Polished Tile", "Rustic Tile", "Small Glaze Tile", "Exterior Wall Brick"]
  },
  {
    name: "Slab",
    children: ["Glossy High-Grade Art Rock Panel", "Starry Sky Series"]
  },
  {
    name: "Mosaic",
    children: ["Stone Mosaic", "Ceramic Mosaic", "Glass Mosaic"]
  },
  {
    name: "Wall Panel",
    children: [
      "Wood Series",
      "High Gloss PET Marble Pattern",
      "3D Continuous Pattern High Gloss PET Marble Pattern",
      "Water Ripple"
    ]
  },
  {
    name: "Sanitary",
    children: [
      "Toilet Bowl",
      "Smart Toilet Seat",
      "Pedestal Basins",
      "Urinal",
      "Cabinet Basin",
      "Mirror",
      "Shower Head",
      "Faucet",
      "Hardware Accessories",
      "Stainless Steel Sink",
      "Fittings",
      "Floor Drainer",
      "Shower Room"
    ]
  },
  { name: "Roofing Tile", children: [] },
  { name: "Tile Accessories", children: [] }
];

export const normalizeCategory = (value: string) =>
  value.trim().replace(/\s+/g, " ").replace(/BASIR/gi, "BASIN").toUpperCase();

export const productTitle = (name: string) =>
  name
    .replace(/бнбн/g, " ")
    .replace(/……/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/,+/g, ", ")
    .replace(/\s+/g, " ")
    .trim();

export const primaryModel = (name: string) => {
  const cleaned = productTitle(name);
  return cleaned.split(",")[0] || cleaned;
};

export const categoryCount = (category: string) => {
  const target = normalizeCategory(category);
  return catalog.products.filter((product) =>
    product.categories.some((item) => normalizeCategory(item) === target)
  ).length;
};

export const filterProducts = (query: string, category?: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCategory = category ? normalizeCategory(category) : "";
  return catalog.products.filter((product) => {
    const categoryMatch =
      !normalizedCategory ||
      product.categories.some((item) => normalizeCategory(item) === normalizedCategory) ||
      normalizeCategory(product.category) === normalizedCategory;
    const searchMatch =
      !normalizedQuery ||
      [product.name, product.summary, product.description, ...product.categories]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    return categoryMatch && searchMatch;
  });
};
