import { sitePath } from "./site-path";

const upload = "https://www.huangjia-tiles.com/upload/photo";

export const originalMedia = {
  logo: `${upload}/172137324403473800110.png`,
  productBanner: `${upload}/172301541689848900100.jpg`,
  heroes: [
    sitePath("/product-media/2026-08/jihua-jh48a04-image-a31c4b83.webp"),
    sitePath("/product-media/2026-08/jihua-jh48a020-02-0adc98d5.webp"),
    sitePath("/product-media/2026-08/jihua-jh48a01-01-40ef469b.webp"),
    sitePath("/product-media/2026-08/jihua-jh48a05-image-9b1d59a0.webp")
  ],
  categories: [
    `${upload}/172345141743994900100.jpg`,
    `${upload}/172343549442327000100.jpg`,
    `${upload}/172345109579859100100.jpg`,
    `${upload}/172355037629223300100.jpg`,
    `${upload}/172345412216416900100.jpg`
  ],
  homeProducts: [
    `${upload}/173136385536781600200.jpg`,
    `${upload}/173133189283686400200.jpg`,
    `${upload}/173131297182995000200.jpg`,
    `${upload}/173131231502728100200.jpg`,
    `${upload}/173124655511992500200.jpg`,
    `${upload}/173120329637804300100.jpg`,
    `${upload}/173114604193566800100.jpg`,
    `${upload}/173107369537348200200.jpg`
  ],
  collectionStrip: [
    `${upload}/168897219149668000100.png`,
    `${upload}/168897221963775300100.png`,
    `${upload}/168897223486391100100.png`,
    `${upload}/168897225186823500100.png`,
    `${upload}/168897228607356600200.png`,
    `${upload}/168897230941571500200.png`,
    `${upload}/168897232037931400200.png`,
    `${upload}/168897233984790500200.png`
  ],
  story: `${upload}/172345566651442800100.jpg`,
  news: [
    `${upload}/168924968587638800200.jpeg`,
    `${upload}/172699298348921300100.jpg`
  ],
  services: [
    `${upload}/168892135981040100100.png`,
    `${upload}/168892140296615100100.png`,
    `${upload}/168892144415287500100.png`,
    `${upload}/168892150545229200200.png`
  ],
  social: [
    `${upload}/172481683104589400100.jpg`,
    `${upload}/172483579681579100100.jpg`,
    `${upload}/172483727219793600100.jpg`,
    `${upload}/172483584871742900100.jpg`
  ],
  footerIcons: [
    `${upload}/170875916729541500100.svg`,
    `${upload}/170875929359694100200.svg`,
    `${upload}/170875939805853600200.svg`,
    `${upload}/170875943409163300200.svg`,
    `${upload}/170875949430305700200.svg`,
    `${upload}/170875952740400200200.svg`,
    `${upload}/170875957396547700200.svg`,
    `${upload}/170875963671050800200.svg`,
    `${upload}/170875967108454400200.svg`,
    `${upload}/170875971921842900200.svg`,
    `${upload}/170875980921242300200.svg`
  ]
} as const;
