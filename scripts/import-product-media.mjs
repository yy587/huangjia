import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve(process.argv[2] || "work/media-import");
const publicRoot = path.resolve("public/product-media/2026-08");
const catalogPath = path.resolve("app/data/catalog.json");
const slugPrefix = "catalog-2026-08-";
const imagePattern = /\.(?:jpe?g|png|webp|tiff?|bmp)$/i;

await fs.mkdir(publicRoot, { recursive: true });

const natural = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const sortNatural = (items) => [...items].sort((a, b) => natural.compare(a, b));
const sortEntries = (items) => [...items].sort((a, b) => natural.compare(a.name, b.name));
const cleanName = (value) => value
  .normalize("NFKD")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .toLowerCase() || "image";

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (imagePattern.test(entry.name)) files.push(full);
  }
  return files;
}

const processed = new Map();
async function publishImage(source, collection) {
  const absolute = path.resolve(source);
  if (processed.has(absolute)) return processed.get(absolute);
  const digest = crypto.createHash("sha1").update(absolute).digest("hex").slice(0, 8);
  const filename = `${cleanName(collection)}-${cleanName(path.parse(source).name)}-${digest}.webp`;
  const destination = path.join(publicRoot, filename);
  const sourceStat = await fs.stat(source);
  const destinationStat = await fs.stat(destination).catch(() => null);
  if (!destinationStat || sourceStat.mtimeMs > destinationStat.mtimeMs) {
    await sharp(source)
      .rotate()
      .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84, effort: 5, smartSubsample: true })
      .toFile(destination);
  }
  const url = `/product-media/2026-08/${filename}`;
  processed.set(absolute, url);
  return url;
}

async function publishMany(files, collection) {
  const urls = [];
  for (const file of files) urls.push(await publishImage(file, collection));
  return urls;
}

const product = ({ slug, name, category, summary, description, images }) => ({
  slug: `${slugPrefix}${slug}`,
  name,
  categories: ["Products", "CERAMIC TILE", category],
  category,
  description,
  summary,
  images,
  sourceUrl: ""
});

const imported = [];

// JIHUA ultra-flat marble series: each folder is one coordinated model family.
const jihuaRoot = path.join(sourceRoot, "jihua", "JIHUA CERAMICS");
for (const entry of sortEntries(await fs.readdir(jihuaRoot, { withFileTypes: true }))) {
  if (!entry.isDirectory() || !/^JH48A\d+$/i.test(entry.name)) continue;
  const model = entry.name.toUpperCase();
  const files = (await walk(path.join(jihuaRoot, entry.name)))
    .filter((file) => !/-00\.jpg$/i.test(file) && !/二维码|(?:^|\\)(?:BA|KC)\.png$/i.test(file))
    .sort((a, b) => {
      const rank = (file) => /客厅/.test(file) ? 0 : /厨房/.test(file) ? 1 : /卫生/.test(file) ? 2 : /餐厅/.test(file) ? 3 : 4;
      return rank(a) - rank(b) || natural.compare(a, b);
    });
  imported.push(product({
    slug: model.toLowerCase(),
    name: `${model}, ULTRA-FLAT MARBLE TILE`,
    category: "POLISHED TILE",
    summary: "Ultra-flat marble-effect porcelain tile with coordinated room applications and multiple faces.",
    description: "Surface: ultra-flat polished marble effect\nFormats: 400×800, 600×1200, 750×1500 and 800×800 mm coordinated series\nApplications: living room, kitchen, bathroom, dining room and feature wall",
    images: await publishMany(files, `jihua-${model}`)
  }));
}

// Fine-grain carved and brushed travertine collection.
const travertineRoot = path.join(sourceRoot, "travertine");
const travertineFiles = await walk(travertineRoot);
const travertineScenes = sortNatural(travertineFiles.filter((file) => /微信图片/.test(file)));
const travertineModels = [...new Set(travertineFiles.map((file) => path.basename(file).match(/^(BNF\d+)/i)?.[1]).filter(Boolean))];
for (const [index, model] of sortNatural(travertineModels).entries()) {
  const faces = sortNatural(travertineFiles.filter((file) => path.basename(file).startsWith(model) && !/微信图片/.test(file)));
  const overview = faces.filter((file) => /3面1\.jpg$/i.test(file));
  const singles = faces.filter((file) => !/3面1\.jpg$/i.test(file));
  const coverScene = index > 0 ? travertineScenes[index - 1] : null;
  const otherScenes = travertineScenes.filter((scene) => scene !== coverScene);
  imported.push(product({
    slug: model.toLowerCase(),
    name: `${model}, FINE-CARVED TRAVERTINE TILE`,
    category: "POLISHED TILE",
    summary: "Travertine-effect porcelain tile with fine-grain carving, brushed polish and three coordinated faces.",
    description: "Surface: fine-grain carved and brushed polish\nDesign: three coordinated travertine faces\nApplications: living room, bathroom, hospitality and feature wall",
    images: await publishMany([...(coverScene ? [coverScene] : []), ...overview, ...singles, ...otherScenes], `travertine-${model}`)
  }));
}

// Sandstone collection with three coordinated faces per model.
const sandstoneRoot = path.join(sourceRoot, "sandstone");
const sandstoneFiles = await walk(sandstoneRoot);
const sandstoneScenes = sortNatural(sandstoneFiles.filter((file) => /微信图片/.test(file)));
const sandstoneModels = [...new Set(sandstoneFiles.map((file) => path.basename(file).match(/^(JH\d+)/i)?.[1]).filter(Boolean))];
for (const [index, model] of sortNatural(sandstoneModels).entries()) {
  const faces = sortNatural(sandstoneFiles.filter((file) => path.basename(file).startsWith(model)));
  const overview = faces.filter((file) => /-三面\.jpg$/i.test(file));
  const singles = faces.filter((file) => !/-三面\.jpg$/i.test(file));
  const coverScene = sandstoneScenes[index] || null;
  const otherScenes = sandstoneScenes.filter((scene) => scene !== coverScene);
  imported.push(product({
    slug: `${model.toLowerCase()}-sandstone`,
    name: `${model}, SANDSTONE PORCELAIN TILE`,
    category: "RUSTIC TILE",
    summary: "Natural sandstone-effect porcelain tile with a soft matt texture and three coordinated faces.",
    description: "Surface: natural sandstone matt texture\nDesign: three coordinated faces\nApplications: living room, open-plan interior, commercial space and floor",
    images: await publishMany([...(coverScene ? [coverScene] : []), ...overview, ...singles, ...otherScenes], `sandstone-${model}`)
  }));
}

// Cement-effect 600×1200 tile series.
const cementRoot = path.join(sourceRoot, "cement");
for (const file of sortNatural(await walk(cementRoot))) {
  const model = path.basename(file).match(/^(JH\d+)/i)?.[1];
  if (!model) continue;
  imported.push(product({
    slug: `${model.toLowerCase()}-cement`,
    name: `${model}, CEMENT-EFFECT TILE`,
    category: "RUSTIC TILE",
    summary: "Minimal cement-effect porcelain tile in a restrained architectural colour palette.",
    description: "Format: 600×1200 mm\nSurface: cement-effect matt finish\nApplications: residential floor, commercial interior, kitchen and bathroom",
    images: await publishMany([file], `cement-${model}`)
  }));
}

// Panda White collection; effect images are distributed across related models.
const pandaRoot = path.join(sourceRoot, "panda");
const pandaFiles = await walk(pandaRoot);
const pandaEffects = sortNatural(pandaFiles.filter((file) => file.includes(`${path.sep}效果图${path.sep}`)));
const pandaModels = [...new Set(pandaFiles.map((file) => path.basename(file).match(/^(BNF\d+)/i)?.[1]).filter(Boolean))];
for (const [index, model] of sortNatural(pandaModels).entries()) {
  const faces = sortNatural(pandaFiles.filter((file) => path.basename(file).startsWith(model) && !/副本/.test(file)));
  const assignedEffects = pandaEffects.filter((_, effectIndex) => effectIndex % pandaModels.length === index);
  imported.push(product({
    slug: `${model.toLowerCase()}-panda-white`,
    name: `${model}, PANDA WHITE MARBLE TILE`,
    category: "POLISHED TILE",
    summary: "High-contrast Panda White marble-effect porcelain tile with fine-grain brushed polish.",
    description: "Surface: fine-grain brushed polish\nDesign: coordinated high-contrast marble faces\nApplications: statement wall, living room, dining room and luxury commercial interior",
    images: await publishMany([...assignedEffects, ...faces], `panda-white-${model}`)
  }));
}

// 200×1200 wood-look plank series, including texture, installation and room images.
const woodRoot = path.join(sourceRoot, "wood");
const woodFiles = await walk(woodRoot);
const woodModels = [...new Set(woodFiles.map((file) => path.basename(file).match(/^(DK\d+)/i)?.[1]).filter(Boolean))];
for (const model of sortNatural(woodModels)) {
  const modelFiles = woodFiles
    .filter((file) => path.basename(file).startsWith(model) && !new RegExp(`^${model}效果\\.jpg$`, "i").test(path.basename(file)))
    .sort((a, b) => {
      const rank = (file) => /效果图-1/.test(file) ? 0 : /效果图-2/.test(file) ? 1 : /效果图-3/.test(file) ? 2 : /效果图\.jpg$/i.test(file) ? 3 : /实拍图/.test(file) ? 4 : /细节/.test(file) ? 5 : /展示/.test(file) ? 6 : 7;
      return rank(a) - rank(b) || natural.compare(a, b);
    });
  imported.push(product({
    slug: `${model.toLowerCase()}-wood`,
    name: `${model}, 200×1200 WOOD-LOOK TILE`,
    category: "RUSTIC TILE",
    summary: "Warm wood-look porcelain plank with coordinated faces for natural floor layouts.",
    description: "Format: 200×1200 mm\nSurface: natural wood-grain matt finish\nApplications: living room, bedroom, dining room and hospitality interior",
    images: await publishMany(modelFiles, `wood-${model}`)
  }));
}

// 600×600 indoor and outdoor matt tile families.
const squareRoot = path.join(sourceRoot, "square", "600X600");
for (const folder of sortEntries(await fs.readdir(squareRoot, { withFileTypes: true }))) {
  if (!folder.isDirectory()) continue;
  const groupFiles = await walk(path.join(squareRoot, folder.name));
  const textures = sortNatural(groupFiles.filter((file) => /\.jpg$/i.test(file)));
  const scenes = sortNatural(groupFiles.filter((file) => /\.png$/i.test(file)));
  const usedSceneCovers = new Set();
  for (const texture of textures) {
    const model = path.parse(texture).name.toUpperCase();
    const matchingScenes = scenes.filter((scene) => path.parse(scene).name.toUpperCase().includes(model));
    const coverScene = matchingScenes.find((scene) => !usedSceneCovers.has(scene)) || null;
    if (coverScene) usedSceneCovers.add(coverScene);
    const otherScenes = scenes.filter((scene) => scene !== coverScene);
    imported.push(product({
      slug: `${model.toLowerCase()}-600x600`,
      name: `${model}, 600×600 MATT TILE`,
      category: "RUSTIC TILE",
      summary: "Versatile 600×600 matt porcelain tile for coordinated indoor and outdoor surfaces.",
      description: "Format: 600×600 mm\nSurface: durable matt finish\nApplications: kitchen, bathroom, terrace, courtyard and commercial floor",
      images: await publishMany([...(coverScene ? [coverScene] : []), texture, ...otherScenes], `square-${model}`)
    }));
  }
}

const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
catalog.products = [
  ...imported,
  ...catalog.products.filter((item) => !item.slug.startsWith(slugPrefix))
];
await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

const totalBytes = (await Promise.all((await fs.readdir(publicRoot)).map(async (name) => (await fs.stat(path.join(publicRoot, name))).size)))
  .reduce((sum, value) => sum + value, 0);
console.log(JSON.stringify({ products: imported.length, images: processed.size, megabytes: Math.round(totalBytes / 1024 / 1024 * 10) / 10 }, null, 2));
