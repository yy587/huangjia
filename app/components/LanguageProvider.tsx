"use client";

import { Languages } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "zh";
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const textOriginals = new WeakMap<Text, string>();

const zh: Record<string, string> = {
  "Foshan · China": "中国 · 佛山",
  "Tile & building material solutions for global projects": "面向全球项目的瓷砖与建材解决方案",
  "Huangjia surfaces": "皇家建材",
  "Huangjia\nsurfaces": "皇家建材",
  "Home": "首页",
  "About": "关于我们",
  "About us": "关于我们",
  "Products": "产品中心",
  "Projects": "空间案例",
  "Capabilities": "服务能力",
  "Company": "公司",
  "News": "新闻资讯",
  "Contact": "联系我们",
  "Contact Us": "联系我们",
  "Search": "搜索",
  "Selection": "选品单",
  "Request quote": "获取报价",
  "Request samples": "索取样品",
  "Explore Huangjia": "探索皇家建材",
  "Complete catalogue": "完整产品目录",
  "Materials for the whole space.": "覆盖完整空间的材料方案。",
  "Explore 7 product families and the full Huangjia collection.": "探索 7 大产品系列与皇家建材完整产品目录。",
  "View all products": "查看全部产品",
  "Ceramic Tile": "陶瓷砖",
  "Polished Tile": "抛光砖",
  "Rustic Tile": "仿古砖",
  "Small Glaze Tile": "小规格釉面砖",
  "Exterior Wall Brick": "外墙砖",
  "Slab": "岩板",
  "Glossy High-Grade Art Rock Panel": "高光艺术岩板",
  "Starry Sky Series": "星空系列",
  "Mosaic": "马赛克",
  "Stone Mosaic": "石材马赛克",
  "Ceramic Mosaic": "陶瓷马赛克",
  "Glass Mosaic": "玻璃马赛克",
  "Wall Panel": "墙板",
  "Wood Series": "木纹系列",
  "High Gloss PET Marble Pattern": "高光 PET 大理石纹",
  "3D Continuous Pattern High Gloss PET Marble Pattern": "3D 连纹高光 PET 大理石纹",
  "Water Ripple": "水波纹系列",
  "Sanitary": "卫浴洁具",
  "Toilet Bowl": "坐便器",
  "Pedestal Basins": "立柱盆",
  "Urinal": "小便器",
  "Cabinet Basin": "浴室柜盆",
  "Mirror": "浴室镜",
  "Shower Head": "花洒",
  "Faucet": "水龙头",
  "Hardware Accessories": "五金配件",
  "Stainless Steel Sink": "不锈钢水槽",
  "Fittings": "管件",
  "Floor Drainer": "地漏",
  "Shower Room": "淋浴房",
  "Roofing Tile": "屋面瓦",
  "Tile Accessories": "瓷砖辅材",
  "Begin a conversation": "开启合作",
  "Let’s build the right material package.": "一起打造合适的材料组合方案。",
  "Start a project": "发起项目",
  "Surface and building material solutions, made in Foshan for projects worldwide.": "源自佛山，为全球项目提供表面材料与建材解决方案。",
  "Explore": "探索",
  "Product families": "产品系列",
  "Foshan, Guangdong, China": "中国广东佛山",
  "International trade · OEM / ODM · Project supply": "国际贸易 · OEM / ODM · 工程供货",
  "Complete collection · 60 product groups": "完整产品系列 · 60 个产品组",
  "Complete collection ·": "完整产品系列 ·",
  "product groups": "个产品组",
  "Materials for every": "覆盖空间每一处的",
  "part of the space.": "材料方案。",
  "Browse Huangjia’s complete online catalogue—from exterior ceramic tile to coordinated sanitaryware and fittings.": "浏览皇家建材完整线上目录，从外墙砖到配套卫浴洁具与五金产品。",
  "Product families": "产品系列",
  "All products": "全部产品",
  "Selected collection": "当前系列",
  "Search model or product": "搜索型号或产品",
  "Filters": "筛选",
  "Catalogue order": "目录顺序",
  "Load more products": "加载更多产品",
  "This collection is ready for content.": "该系列正在完善产品内容。",
  "The category exists on the current Huangjia website, but no individual product records are published in its sitemap yet.": "现有皇家网站已包含此分类，但 sitemap 中暂未发布独立产品资料。",
  "Browse all available products": "浏览全部已发布产品",
  "View details": "查看详情",
  "Add to selection": "加入选品",
  "Add another": "再加一个",
  "Huangjia building material collection": "皇家建材产品系列",
  "Product information": "产品信息",
  "Specifications": "规格参数",
  "& model details": "与型号详情",
  "Continue exploring": "继续探索",
  "Related products": "相关产品",
  "View collection": "查看系列",
  "Export-ready project supply": "支持出口工程供货",
  "Samples and specifications available": "可提供样品与规格资料",
  "OEM / ODM enquiry supported": "支持 OEM / ODM 询价",
  "Added to selection": "已加入选品",
  "Product group": "产品组",
  "Share": "分享",
  "Products /": "产品 /",
  "About Huangjia": "关于皇家建材",
  "A practical partner": "值得信赖的",
  "for complete spaces.": "完整空间合作伙伴。",
  "Foshan product knowledge, coordinated sourcing and responsive project support—under one roof.": "以佛山产业经验、协同采购与高效项目支持，为您提供一站式服务。",
  "Since Foshan, China": "源自中国佛山",
  "One source.": "一个供应源。",
  "More possibilities.": "更多可能。",
  "Who we are": "我们是谁",
  "Materials backed by": "以真实制造经验",
  "real manufacturing insight.": "支撑材料选择。",
  "HUANGJIA is a building material company dedicated to providing high-quality products for distributors, designers and project teams. We specialize in developing and sourcing advanced building materials around specific customer needs.": "皇家建材致力于为经销商、设计师与项目团队提供高品质建材产品，并根据客户的具体需求开发与整合先进的建筑材料。",
  "We combine current technology, consistent quality standards and responsive after-sales support. Our aim is simple: reliable products, clear communication and a long-term win-win relationship with every customer.": "我们结合先进技术、稳定品质标准与及时售后支持。我们的目标很简单：以可靠产品、清晰沟通，与每位客户建立长期共赢关系。",
  "Talk to our team": "联系我们的团队",
  "Complete range": "完整品类",
  "Tile, slabs, mosaics, wall panels, sanitaryware and coordinated accessories.": "覆盖瓷砖、岩板、马赛克、墙板、卫浴洁具及配套辅材。",
  "Quality focus": "品质为先",
  "Product selection and supply guided by consistent specifications and project requirements.": "依据统一规格与项目需求进行产品选型和供货。",
  "Export experience": "出口经验",
  "Clear communication, sampling and shipment support for customers around the world.": "为全球客户提供清晰沟通、样品与出货支持。",
  "Project service": "项目服务",
  "One coordinated selection and enquiry process from early specification to delivery.": "从前期选型到交付，提供统一协调的选品与询价流程。",
  "News & journal": "新闻与资讯",
  "Updates from": "来自",
  "Huangjia.": "皇家建材的动态。",
  "Company notes, product information and practical updates for our customers.": "为客户提供公司动态、产品信息与实用通知。",
  "Notice": "通知",
  "Blog": "博客",
  "Read article": "阅读文章",
  "Back to news": "返回新闻列表",
  "Contact our Foshan team": "联系佛山团队",
  "Tell us what": "告诉我们您正在",
  "you’re": "打造",
  "building.": "的项目。",
  "you’re building.": "打造什么项目。",
  "Share a product, quantity or project brief. We’ll help coordinate the right specifications, samples and next steps.": "告诉我们产品、数量或项目需求，我们将协助确认合适规格、样品与后续安排。",
  "Direct contact": "直接联系",
  "Sales email": "销售邮箱",
  "Telephone / WhatsApp": "电话 / WhatsApp",
  "Location": "所在地",
  "For the fastest response, include product model, quantity, destination country and required delivery date.": "为便于快速回复，请注明产品型号、数量、目的国及期望交付日期。",
  "Project enquiry": "项目询盘",
  "Start a conversation": "发起咨询",
  "Fields marked * are required.": "标有 * 的项目为必填项。",
  "Name *": "姓名 *",
  "Company": "公司",
  "Email *": "邮箱 *",
  "Phone / WhatsApp": "电话 / WhatsApp",
  "Country / market": "国家 / 市场",
  "Project details *": "项目详情 *",
  "Your name": "您的姓名",
  "Company name": "公司名称",
  "Where is your project?": "您的项目位于哪里？",
  "Tell us about the products, quantities and timeline you need…": "请告诉我们所需产品、数量及时间安排……",
  "Send project enquiry": "发送项目询盘",
  "Opening your email…": "正在打开邮箱……",
  "Search the Huangjia catalogue": "搜索皇家建材目录",
  "What are you looking for?": "您正在寻找什么？",
  "Try “faucet”, “HJ-JH”, or “rustic tile”": "试试“水龙头”、“HJ-JH”或“仿古砖”",
  "Search results": "搜索结果",
  "Nothing found": "未找到结果",
  "Try a product family or model number.": "请尝试产品系列或型号。",
  "Popular searches include sanitary, shower head, rustic tile and HJ-JH.": "热门搜索包括卫浴、花洒、仿古砖和 HJ-JH。",
  "Browse the complete catalogue": "浏览完整产品目录",
  "Popular searches": "热门搜索",
  "B2B product selection": "B2B 产品选品",
  "Your enquiry": "您的询价",
  "selection.": "选品单。",
  "Add products as you browse, adjust quantities, then send the complete list to our Foshan sales team for specifications, samples and pricing.": "浏览时加入产品并调整数量，再将完整清单发送给佛山销售团队，获取规格、样品和报价。",
  "Clear selection": "清空选品",
  "Request a quote": "申请报价",
  "Ready to enquire?": "准备好询价了吗？",
  "Total quantity": "总数量",
  "Project notes": "项目备注",
  "Sizes, destination, timeline or other requirements…": "尺寸、目的地、时间安排或其他要求……",
  "Email this selection": "邮件发送选品单",
  "No payment is taken online. Our team will confirm availability, specifications, shipping and pricing directly.": "网站不会在线收款。我们的团队将直接确认库存、规格、运输与价格。",
  "Your selection is empty.": "您的选品单还是空的。",
  "Browse the full catalogue and add any products you would like us to quote.": "浏览完整目录，并加入希望我们报价的产品。",
  "Explore products": "浏览产品",
  "Surfaces for considered spaces": "为理想空间而生的表面材料",
  "Material": "材料",
  "shapes": "塑造",
  "space.": "空间。",
  "shapes space.": "塑造空间。",
  "Ceramic tile and complete building material systems, curated in Foshan for ambitious spaces around the world.": "精选佛山瓷砖与完整建材系统，服务全球高品质空间。",
  "Explore collections": "探索产品系列",
  "Scroll to discover": "向下探索",
  "Designed around how": "围绕真实生活方式",
  "people really live.": "进行设计。",
  "From a single surface to a complete space, we make material selection": "从单一表面到完整空间，我们让材料选择",
  "simpler, sharper,": "更简单、更精准，",
  "and more dependable.": "也更可靠。",
  "One sourcing partner for distributors, designers and project teams—supported by flexible specifications, coordinated sampling and export experience.": "为经销商、设计师与项目团队提供一站式采购支持，包括灵活规格、协同打样与出口经验。",
  "How we work": "我们的合作方式",
  "Explore by material": "按材料探索",
  "A focused collection across the surfaces and fixtures that shape a space.": "覆盖塑造空间所需的表面材料与配套产品。",
  "View all product categories": "查看全部产品分类",
  "One-stop sourcing": "一站式采购",
  "One partner.": "一个合作伙伴。",
  "More possibility.": "更多可能。",
  "Build a more coherent collection and move faster from selection to shipment with one experienced sourcing team.": "由经验丰富的采购团队统一协调，让产品组合更完整，从选型到出货更高效。",
  "Curated product direction": "精选产品方向",
  "Market-aware ranges selected for colour, finish and commercial fit.": "根据市场需求筛选颜色、质感与商业适配度。",
  "Coordinated samples & loading": "协同样品与装柜",
  "Consolidated decisions and practical mixed-product shipment planning.": "统一决策并规划切实可行的混装运输方案。",
  "Quality follow-through": "全程品质跟进",
  "Specification checks and clear progress updates from order to dispatch.": "从订单到发运进行规格检查并提供清晰进度更新。",
  "Talk to the team": "联系团队",
  "Start a project": "启动项目",
  "Request samples or a quotation.": "索取样品或报价。",
  "Name / Company": "姓名 / 公司",
  "I’m interested in": "感兴趣的产品",
  "Select a product category": "选择产品分类",
  "Mixed collection": "混合产品组合",
  "Send enquiry": "发送询盘",
  "Visit": "地址",
  "Thoughtful surfaces and building material systems for global spaces.": "为全球空间提供精心规划的表面材料与建材系统。",
  "Large Format Slab": "大规格岩板",
  "Polished · Rustic · Glazed": "抛光 · 仿古 · 釉面",
  "Statement-scale surfaces": "大尺度空间表面",
  "Texture in every detail": "细节中的丰富质感",
  "Wood · PET · Ripple": "木纹 · PET · 水波纹",
  "Bathroom": "卫浴空间",
  "Sanitary & hardware systems": "洁具与五金系统",
  "Featured finish": "精选表面",
  "Mineral Grey / Soft Matt": "矿物灰 / 柔光哑面",
  "Discuss your specification": "沟通规格需求",
  "02 / Collections": "02 / 产品系列",
  "03 / One-stop sourcing": "03 / 一站式采购",
  "04 / Spaces": "04 / 空间案例",
  "05 / Why Huangjia": "05 / 为什么选择皇家",
  "Explore SHIE": "探索 SHIE",
  "Spaces": "空间案例",
  "See materials in context": "在真实空间中感受材料",
  "Move beyond the product sheet. Explore how finish, proportion and scale work together.": "跳出产品参数表，在空间中感受质感、比例与尺度如何协同。",
  "View project details": "查看项目详情",
  "Living": "客厅",
  "Dining": "餐厅",
  "Quiet luxury, built from the ground up.": "从地面开始营造低调奢华。",
  "Warm-veined porcelain creates a continuous visual plane while balancing daily durability with a refined residential feel.": "暖色纹理瓷砖形成连续视觉界面，在日常耐用性与精致居住质感之间取得平衡。",
  "Residential · Porcelain slab · 1200 × 2400 mm": "住宅 · 瓷质岩板 · 1200 × 2400 mm",
  "Material warmth for social spaces.": "为社交空间注入材料温度。",
  "A composed palette of tactile wall panels and neutral flooring gives hospitality-inspired depth to an everyday dining room.": "富有触感的墙板与中性地面，为日常餐厅带来酒店空间般的层次感。",
  "Residential · Wall panel + tile system": "住宅 · 墙板 + 瓷砖系统",
  "A complete room, one coordinated source.": "完整空间，一体化供应。",
  "Surfaces, sanitaryware and fittings are developed as one practical specification—easier to select, sample and deliver.": "将表面材料、洁具与配件整合为实用规格体系，使选型、打样和交付更轻松。",
  "Hospitality · Tile + sanitary system": "酒店 · 瓷砖 + 卫浴系统",
  "Why Huangjia": "为什么选择皇家",
  "Made to travel.": "为全球交付而生。",
  "Built to perform.": "以可靠性能为本。",
  "Years in building materials": "年建材行业经验",
  "Export markets served": "服务出口市场",
  "Coordinated product categories": "协同产品类别",
  "Project support from enquiry to load": "从询盘到装柜的项目支持",
  "Foshan-based sourcing expertise · Custom specifications · Consolidated export support": "佛山采购经验 · 定制规格 · 整合出口支持",
  "Let's build something considered.": "一起打造经过深思熟虑的空间。",
  "Tell us the material, quantity and market. We'll help shape the next step.": "告诉我们材料、数量和目标市场，我们将协助推进下一步。",
  "or a quotation.": "或获取报价。",
  "Your name and company": "您的姓名和公司",
  "Ceramic tile": "陶瓷砖",
  "Wall panel": "墙板",
  "Bathroom & sanitary": "卫浴洁具",
  "Project details": "项目详情",
  "Market, quantity, preferred size or finish...": "市场、数量、偏好尺寸或表面……",
  "Foshan, Guangdong": "中国广东佛山",
  "China": "中国",
  "Enquire": "询盘",
  "Foshan building material supplier": "佛山建材供应商",
  "Tile, sanitaryware": "瓷砖、卫浴洁具",
  "& complete materials.": "与完整建材方案。",
  "Browse Huangjia’s product catalogue, add the models you need to your selection, and send one clear enquiry to our Foshan team.": "浏览皇家建材产品目录，将所需型号加入选品单，再向佛山团队发送一份清晰的询价需求。",
  "Browse all products": "浏览全部产品",
  "Contact our sales team": "联系销售团队",
  "Search by product, category or model number": "按产品、分类或型号搜索",
  "Search catalogue": "搜索产品目录",
  "One coordinated source": "一站式协同供应",
  "7 product families": "7 大产品系列",
  "60 published product groups": "已发布 60 个产品组",
  "How this website works": "网站使用流程",
  "From product search to quotation.": "从查找产品到获取报价。",
  "Find a product": "查找产品",
  "Browse categories or search a model number.": "浏览产品分类或直接搜索型号。",
  "Build your selection": "建立选品单",
  "Open product details and add the models you need.": "查看产品详情并加入所需型号。",
  "Send one enquiry": "发送统一询价",
  "Add quantities and send the complete selection to sales.": "填写数量并将完整选品单发送给销售。",
  "Confirm & deliver": "确认并交付",
  "We confirm specifications, samples, price and shipping.": "我们确认规格、样品、价格与运输方式。",
  "Product categories": "产品分类",
  "Start with what you need.": "从您需要的产品开始。",
  "The same product structure as the original Huangjia website, presented as a faster, clearer catalogue.": "沿用皇家原网站的产品结构，以更快速、更清晰的目录方式呈现。",
  "View all categories": "查看全部分类",
  "Polished, rustic, glazed and exterior wall tile": "抛光砖、仿古砖、釉面砖与外墙砖",
  "Large-format architectural surfaces": "大规格建筑表面材料",
  "Stone, ceramic and glass mosaic": "石材、陶瓷与玻璃马赛克",
  "Sanitaryware, faucets, showers and fittings": "洁具、水龙头、花洒与配件",
  "Wood, PET marble and water-ripple panels": "木纹、PET 大理石纹与水波纹墙板",
  "Trending products": "热门产品",
  "Recently added products.": "近期新增产品。",
  "Open a product to view every published image, model and specification.": "打开产品详情即可查看已发布的全部图片、型号与规格。",
  "Complete catalogue": "完整产品目录",
  "One Foshan team.": "一个佛山团队。",
  "A complete material package.": "一套完整材料方案。",
  "Huangjia supports distributors, designers and project teams with a coordinated range of tile, slabs, mosaics, wall panels, sanitaryware and accessories.": "皇家建材为经销商、设计师和项目团队提供瓷砖、岩板、马赛克、墙板、卫浴洁具与辅材的协同供应。",
  "Direct product and specification support": "直接提供产品与规格支持",
  "Mixed-category sourcing and sample coordination": "跨品类采购与样品协调",
  "Export packing and shipment communication": "出口包装与运输沟通",
  "OEM / ODM and project enquiries": "OEM / ODM 与工程询价",
  "Learn about Huangjia": "了解皇家建材",
  "Featured products": "精选产品",
  "Explore more of the range.": "探索更多产品系列。",
  "Add any model to your selection—there is no online payment or fake $0 price.": "将任意型号加入选品单，网站不在线收款，也不显示无意义的 0 美元价格。",
  "View my selection": "查看我的选品单",
  "Recent updates": "最新动态",
  "News from Huangjia.": "皇家建材新闻。",
  "View all news": "查看全部新闻",
  "Read more": "阅读更多",
  "Ready to source?": "准备采购？",
  "Tell us what products you need.": "告诉我们您需要哪些产品。",
  "Send a product model, quantity and destination. Our team will reply with specifications, availability and quotation details.": "发送产品型号、数量和目的地，我们的团队将回复规格、供应情况与报价详情。",
  "Start an enquiry": "开始询价",
  "for": "面向",
  "complete spaces.": "完整空间。",
  "Note: New clients pls check the shipping info before purchase!": "提示：新客户购买前请确认运输信息！",
  "Foshan Huangjia Building Material Co., Ltd.": "佛山市皇家建材有限公司",
  "ATOC (Asynchronous Transmitting and On-Chip Charging) and \"CTOC\" (Constant Transmitting and On-Chip Charging) are two \"different\" \"charging\" protocols used for charging functions on data cables. Here are the differences between them:": "ATOC（异步传输与芯片充电）和 CTOC（恒定传输与芯片充电）是数据线充电功能采用的两种不同协议，主要区别如下：",
  "1. Charging method: ATOC and CTOC use different charging methods. ATOC charging method is asynchronous transmission and on-chip charging, which allows data and charging to take place at the same time without interfering with each other. CTOC charging method is constant transmission and on-chip charging, which will prioritize the stability of charging, and may reduce the data transmission speed.": "1. 充电方式：ATOC 采用异步传输与芯片充电，可同时进行数据传输和充电且互不干扰；CTOC 采用恒定传输与芯片充电，优先保证充电稳定性，可能会降低数据传输速度。",
  "2. Charging speed: ATOC charging method usually has higher charging speed and can charge the device faster, while CTOC charging method pays more attention to charging stability and safety, and the charging speed may be slower.": "2. 充电速度：ATOC 通常具有更高的充电速度；CTOC 更注重充电稳定性和安全性，因此速度可能较慢。",
  "3. Compatibility: ATOC and CTOC charging methods also differ in terms of compatibility; ATOC charging methods are usually compatible with a wider range of devices, while CTOC charging methods may only work with specific devices or brands.": "3. 兼容性：ATOC 通常兼容更广泛的设备；CTOC 可能仅适用于特定设备或品牌。",
  "It is important to note that ATOC and CTOC are two different charging protocols and require both the device and cable to support the corresponding protocol in order to realize the corresponding charging method. When purchasing a data cable, you can choose the appropriate charging protocol based on your device and personal needs.": "需要注意的是，ATOC 与 CTOC 是两种不同的充电协议，设备与线缆都必须支持相应协议才能使用。购买数据线时，可根据设备和个人需求选择合适的协议。",
  "We are not an agent, we are the founding company of the HUANGJIA brand! We don't have any iconsign we": "我们并非代理商，而是 HUANGJIA 品牌的创立公司！",
  "read more": "阅读更多"
};

const zhCaseInsensitive = Object.fromEntries(
  Object.entries(zh).map(([key, value]) => [key.toLowerCase(), value])
);

function translatedText(original: string): string {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  const core = original.trim();
  if (!core) return original;
  let translated = zh[core] || zhCaseInsensitive[core.toLowerCase()];
  if (!translated) {
    const productGroups = core.match(/^(\d+) product groups?$/i);
    const matches = core.match(/^(\d+) matches for “(.+)”$/i);
    const selection = core.match(/^Selection \((\d+)\)$/i);
    if (productGroups) translated = `${productGroups[1]} 个产品组`;
    if (matches) translated = `找到 ${matches[1]} 个与“${matches[2]}”相关的结果`;
    if (selection) translated = `选品单（${selection[1]}）`;
  }
  if (!translated) {
    translated = core
      .replace(/^Suitable space:/i, "适用空间：")
      .replace(/^SUITABLE SPACE:/, "适用空间：")
      .replace(/^Product Size:/i, "产品尺寸：")
      .replace(/^Packing Size:/i, "包装尺寸：")
      .replace(/^Size:/i, "尺寸：")
      .replace(/^Integrated cylinder$/i, "一体缸")
      .replace(/\bRESTROOMS, WC, BATHROOM\b/i, "洗手间、卫生间、浴室")
      .replace(/\bExterior wall, living room, dining room, villa, supermarket, recreation and other places\b/i, "外墙、客厅、餐厅、别墅、超市、休闲场所等")
      .replace(/\bRUSTIC TILE\b/g, "仿古砖")
      .replace(/\bEXTERIOR WALL BRICK\b/g, "外墙砖")
      .replace(/\bINTELLIGENT TOILET\b/g, "智能坐便器")
      .replace(/\bPEDESTAL BASIN\b/g, "立柱盆")
      .replace(/\bVERTICAL INDUCTION URINAL\b/g, "立式感应小便器")
      .replace(/\bSOLID WOOD CABINET BASIN\b/g, "实木浴室柜盆")
      .replace(/\bSTAINLESS STEEL CABINET BASIN\b/g, "不锈钢浴室柜盆")
      .replace(/\bCABINET BASIN\b/g, "浴室柜盆")
      .replace(/\bSHOWER HEAD\b/g, "花洒")
      .replace(/\bBASIN FAUCET\b/g, "面盆龙头")
      .replace(/\bFAUCET\b/g, "水龙头")
      .replace(/\bHARDWARE ACCESSORIES\b/g, "五金配件")
      .replace(/\bSTAINLESS STEEL SINK\b/g, "不锈钢水槽")
      .replace(/\bFITTINGS\b/g, "管件")
      .replace(/\bFLOOR DRAINER\b/g, "地漏")
      .replace(/\bSHOWER ROOM\b/g, "淋浴房");
  }
  return `${leading}${translated}${trailing}`;
}

function walkText(root: ParentNode, language: Language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node) {
    const parent = node.parentElement;
    if (
      parent &&
      !parent.closest(".language-toggle") &&
      !["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)
    ) {
      const original = textOriginals.get(node) ?? node.nodeValue ?? "";
      if (!textOriginals.has(node)) textOriginals.set(node, original);
      const next = language === "zh" ? translatedText(original) : original;
      if (node.nodeValue !== next) node.nodeValue = next;
    }
    node = walker.nextNode() as Text | null;
  }

  root.querySelectorAll?.("input[placeholder], textarea[placeholder]").forEach((element) => {
    const field = element as HTMLInputElement | HTMLTextAreaElement;
    const original = field.dataset.i18nPlaceholder || field.placeholder;
    if (!field.dataset.i18nPlaceholder) field.dataset.i18nPlaceholder = original;
    field.placeholder = language === "zh" ? translatedText(original).trim() : original;
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("shie-language");
    if (saved === "zh" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("shie-language", language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    let observer: MutationObserver;
    const apply = (root: ParentNode = document.body) => {
      observer?.disconnect();
      walkText(root, language);
      observer?.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    };
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target.parentNode) {
          textOriginals.set(mutation.target as Text, mutation.target.nodeValue || "");
          apply(mutation.target.parentNode);
          return;
        }
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            apply(node as Element);
            return;
          }
          if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
            apply(node.parentNode);
            return;
          }
        }
      }
    });
    apply();
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "zh" : "en"))
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      type="button"
      className={`language-toggle ${compact ? "is-compact" : ""}`}
      onClick={toggleLanguage}
      aria-label={language === "en" ? "切换到中文" : "Switch to English"}
    >
      <Languages size={compact ? 13 : 15} />
      <span>{language === "en" ? "中文" : "EN"}</span>
    </button>
  );
}
