import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inventoryPath = path.resolve(process.argv[2] || "work/sanitary-review/inventory.json");
const x10Path = path.resolve(process.argv[3] || "C:/Users/qeeyou/Downloads/X10.jpg");
const publicRoot = path.resolve("public/product-media/2026-08-sanitary");
const catalogPath = path.resolve("app/data/catalog.json");
const slugPrefix = "sanitary-2026-08-";

await fs.mkdir(publicRoot, { recursive: true });

const cleanName = (value) => value
  .normalize("NFKD")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .toLowerCase() || "image";

const inventory = JSON.parse(await fs.readFile(inventoryPath, "utf8"));
const indexed = new Map(
  Object.values(inventory).flat().map((image) => [image.id.toUpperCase(), image.path]),
);

function sourceFor(id) {
  const source = indexed.get(id.toUpperCase());
  if (!source) throw new Error(`Missing selected source image: ${id}`);
  return source;
}

async function publishImage(source, collection, index) {
  const digest = crypto.createHash("sha1").update(`${source}:${collection}:${index}`).digest("hex").slice(0, 8);
  const filename = `${cleanName(collection)}-${String(index + 1).padStart(2, "0")}-${digest}.webp`;
  const destination = path.join(publicRoot, filename);
  await sharp(source, { limitInputPixels: false })
    .rotate()
    .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84, effort: 5, smartSubsample: true })
    .toFile(destination);
  return `/product-media/2026-08-sanitary/${filename}`;
}

async function publishSelection(collection, ids) {
  const urls = [];
  for (let index = 0; index < ids.length; index += 1) {
    urls.push(await publishImage(sourceFor(ids[index]), collection, index));
  }
  return urls;
}

async function publishX10() {
  const coverFilename = "x10-smart-seat-cover-01.webp";
  const coverDestination = path.join(publicRoot, coverFilename);
  const source = sharp(x10Path, { limitInputPixels: false }).rotate();
  const cropped = await source
    .clone()
    .extract({ left: 0, top: 18, width: 800, height: 1110 })
    .resize(1400, 1400, { fit: "contain", background: "#8db5ed" })
    .webp({ quality: 86, effort: 5 })
    .toBuffer();
  await fs.writeFile(coverDestination, cropped);
  const detail = await publishImage(x10Path, "x10-smart-seat-cover", 1);
  return [`/product-media/2026-08-sanitary/${coverFilename}`, detail];
}

const product = ({ slug, name, category = "TOILET BOWL", summary, description, images }) => ({
  slug: `${slugPrefix}${slug}`,
  name,
  categories: ["Products", "SANITARY", category],
  category,
  description,
  summary,
  images,
  sourceUrl: "",
});

const products = [
  product({
    slug: "v6-intelligent-toilet",
    name: "V6, INTELLIGENT TOILET",
    summary: "Minimal intelligent toilet with an architectural profile, automatic operation and integrated ambient lighting.",
    description: "Series: V6 intelligent toilet\nDesign: rimless integrated body with digital display and ambient light\nFunctions: automatic lid and flush, heated seat, washing and warm-air drying",
    images: await publishSelection("v6-intelligent-toilet", ["V6-09", "V6-08", "V6-11", "V6-13", "V6-17", "V6-20", "V6-26", "V6-29"]),
  }),
  product({
    slug: "815-silver-intelligent-toilet",
    name: "815, SILVER INTELLIGENT TOILET",
    summary: "Silver intelligent toilet with a wide comfort bowl and a refined brushed-metal appearance.",
    description: "Series: 815 silver intelligent toilet\nDesign: wide bowl with silver exterior finish\nFunctions: heated seat, deodorisation, bubble shield, instant heating and automatic cleaning",
    images: await publishSelection("815-silver-intelligent-toilet", ["815-03", "815-13", "815-07", "815-09", "815-10", "815-12"]),
  }),
  product({
    slug: "future-egg-intelligent-toilet",
    name: "FUTURE EGG, INTELLIGENT TOILET",
    summary: "Sculptural intelligent toilet with a rounded shell, interactive lighting and smart voice control.",
    description: "Series: Future Egg intelligent toilet\nDesign: compact rounded body with circular light interface\nFunctions: smart voice control, pressure-independent flushing, UV care, heated seat and multi-mode washing",
    images: await publishSelection("future-egg-intelligent-toilet", ["FUTURE-EGG-27", "FUTURE-EGG-01", "FUTURE-EGG-26", "FUTURE-EGG-06", "FUTURE-EGG-08", "FUTURE-EGG-20"]),
  }),
  product({
    slug: "801-intelligent-toilet",
    name: "801, INTELLIGENT TOILET",
    summary: "Clean-lined intelligent toilet with an integrated display, AI voice control and comfort functions.",
    description: "Series: 801 intelligent toilet\nDesign: compact one-piece form with LED status display\nFunctions: AI voice control, antimicrobial glaze, heated seat, remote control and instant hot-water washing",
    images: await publishSelection("801-intelligent-toilet", ["801-01", "801-05", "801-06", "801-10", "801-14", "801-18", "801-23"]),
  }),
  product({
    slug: "k9-intelligent-toilet",
    name: "K9, INTELLIGENT TOILET",
    summary: "Rounded egg-form intelligent toilet designed for compact contemporary bathrooms.",
    description: "Series: K9 intelligent toilet\nDesign: compact rounded body with top-mounted controls\nFunctions: pressure-independent flushing, heated seat, washing, drying and automatic operation",
    images: await publishSelection("k9-intelligent-toilet", ["K9-06", "K9-02", "K9-03", "K9-04", "K9-05", "K9-01"]),
  }),
  product({
    slug: "m205-intelligent-toilet",
    name: "M205, INTELLIGENT TOILET",
    summary: "Architectural intelligent toilet with soft ambient lighting and touch-free operation.",
    description: "Series: M205 intelligent toilet\nDesign: low-profile integrated body with colour ambient light\nFunctions: voice and foot sensing, UV and infrared care, instant heating and automatic flushing",
    images: await publishSelection("m205-intelligent-toilet", ["M205-01", "M205-05", "M205-08", "M205-12", "M205-13", "M205-14", "M205-21"]),
  }),
  product({
    slug: "m8-intelligent-toilet",
    name: "M8, INTELLIGENT TOILET",
    summary: "Premium intelligent toilet with an integrated top control centre and advanced hygiene system.",
    description: "Series: M8 intelligent toilet\nDesign: refined one-piece form with integrated display and controls\nFunctions: automatic lid, water-path sterilisation, UV care, washing, drying and maintenance access",
    images: await publishSelection("m8-intelligent-toilet", ["M8-21", "M8-05", "M8-07", "M8-12", "M8-14", "M8-23", "M8-24"]),
  }),
  product({
    slug: "x1-x2-x3-intelligent-toilet-series",
    name: "X1 / X2 / X3, INTELLIGENT TOILET SERIES",
    summary: "Coordinated intelligent toilet series offered in three streamlined body and control configurations.",
    description: "Series: X1, X2 and X3 intelligent toilets\nDesign: coordinated F-type, U-type and V-type forms\nFunctions: digital display, heated seat, automatic operation, washing and warm-air drying",
    images: await publishSelection("x1-x2-x3-intelligent-toilet-series", ["X1-X2-X3-22", "X1-X2-X3-01", "X1-X2-X3-05", "X1-X2-X3-13", "X1-X2-X3-17", "X1-X2-X3-25", "X1-X2-X3-30"]),
  }),
  product({
    slug: "x7-smart-toilet-seat",
    name: "X7, SMART TOILET SEAT",
    category: "SMART TOILET SEAT",
    summary: "Smart toilet seat available in U-type and V-type profiles for flexible retrofit installation.",
    description: "Series: X7 smart toilet seat\nFit: U-type and V-type seat profiles\nFunctions: LED display, heated seat, adjustable washing, warm-air drying and easy retrofit installation",
    images: await publishSelection("x7-smart-toilet-seat", ["X7-01", "X7-03", "X7-05", "X7-06", "X7-07", "X7-10", "X7-14"]),
  }),
  product({
    slug: "x9-smart-toilet-seat",
    name: "X9, SMART TOILET SEAT",
    category: "SMART TOILET SEAT",
    summary: "Slim smart toilet seat with a clear digital display and comprehensive washing functions.",
    description: "Series: X9 smart toilet seat\nDesign: slim profile with digital temperature display\nFunctions: instant heating, adjustable washing, heated seat, warm-air drying, night light and IPX4 protection",
    images: await publishSelection("x9-smart-toilet-seat", ["X9-08", "X9-02", "X9-09", "X9-10", "X9-13", "X9-17", "X9-31"]),
  }),
  product({
    slug: "x10-smart-toilet-seat",
    name: "X10, SMART TOILET SEAT",
    category: "SMART TOILET SEAT",
    summary: "Standard-version integrated smart toilet seat with instant heating and comprehensive comfort controls.",
    description: "Series: X10 smart toilet seat\nSize: 508×380×138 mm\nFunctions: front and rear washing, deodorisation, heated seat, instant heating, warm-air adjustment, nozzle memory and IPX4 protection",
    images: await publishX10(),
  }),
];

const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
catalog.products = [
  ...products,
  ...catalog.products.filter((item) => !item.slug.startsWith(slugPrefix)),
];
await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");

const generatedFiles = await fs.readdir(publicRoot);
const totalBytes = (await Promise.all(generatedFiles.map(async (name) => (await fs.stat(path.join(publicRoot, name))).size)))
  .reduce((sum, value) => sum + value, 0);
console.log(JSON.stringify({ products: products.length, images: generatedFiles.length, megabytes: Math.round(totalBytes / 1024 / 1024 * 10) / 10 }, null, 2));
