import heroImg from '../assets/images/hero.jpeg';
import botanicalImg from '../assets/images/cultivation_botanical_closeup_1791656883136.jpg';
import indoorImg from '../assets/images/indoor_aeroponic_saffron_1791657645029.jpg';
import honeyImg from '../assets/images/product_saffron_honey_1791657619300.jpg';
import teaImg from '../assets/images/product_saffron_tea_1791657631464.jpg';
import cormsImg from '../assets/images/product_saffron_corms_1791656873174.jpg';
import mongraImg from '../assets/images/product_kashmiri_mongra_1791656861311.jpg';
import neginImg from '../assets/images/product_super_negin_jar_1791656850551.jpg';
import trainingImg from '../assets/images/bg_training_academy_1791658774822.jpg';
import techImg from '../assets/images/bg_technology_iot_1791658787855.jpg';
import mediaImg from '../assets/images/bg_media_editorial_1791658801024.jpg';
import orhuesLogoImg from '../assets/images/orhues-logo.webp';
import babyOilImg from '../assets/images/saffron_baby_oil_1792051769028.jpg';
import kashmiriBoxImg from '../assets/images/kashmiri_saffron_box_1792051769522.jpg';
import almondOilImg from '../assets/images/saffron_almond_oil_1792051769781.jpg';

export type PageId =
  | 'Home'
  | 'Shop'
  | 'Our Story'
  | 'Indoor Cultivation'
  | 'About Us'
  | 'Our Services'
  | 'Training'
  | 'Infrastructure'
  | 'Technology'
  | 'Media'
  | 'Blog'
  | 'Press Release'
  | 'Gallery'
  | 'Contact'
  | 'Privacy Policy'
  | 'Terms of Service'
  | 'Shipping';

export interface ProductVariant {
  id: string;
  label: string;
  weightOrCount: string;
  price: number;
  unitNote: string;
  inStock: boolean;
}

export interface SaffronProduct {
  id: string;
  sku: string;
  category: 'threads' | 'honey' | 'tea' | 'corms' | 'kits' | 'baby-oil' | 'almond-oil';
  categoryLabel: string;
  name: string;
  subtitle: string;
  origin: string;
  harvestPeriod: string;
  gradeSummary: string;
  image: string;
  description: string;
  agronomicOrCulinaryNotes: string[];
  specs: {
    crocin: string;
    safranal: string;
    picrocrocin: string;
    moisture: string;
    caliberOrCut: string;
  };
  variants: ProductVariant[];
}

export interface CultivationStage {
  id: string;
  index: string;
  season: string;
  months: string;
  title: string;
  subtitle: string;
  soilTemp: string;
  irrigation: string;
  depthOrSpacing: string;
  summary: string;
  fieldChecklist: string[];
  criticalMistakeToAvoid: string;
}

export interface LabBatchRecord {
  lotId: string;
  cultivar: string;
  region: string;
  altitude: string;
  harvestDate: string;
  crocin440nm: number;
  picrocrocin257nm: number;
  safranal330nm: number;
  moisturePercent: number;
  floralWastePercent: number;
  harvesterLead: string;
  dryingProtocol: string;
}

export const HERO_IMAGE = heroImg;
export const BOTANICAL_IMAGE = botanicalImg;
export const INDOOR_TECH_IMAGE = indoorImg;
export const HONEY_IMAGE = honeyImg;
export const TEA_IMAGE = teaImg;
export const CORMS_IMAGE = cormsImg;
export const MONGRA_IMAGE = mongraImg;
export const NEGIN_IMAGE = neginImg;
export const TRAINING_BG_IMAGE = trainingImg;
export const TECH_BG_IMAGE = techImg;
export const MEDIA_BG_IMAGE = mediaImg;
export const ORHUES_LOGO = orhuesLogoImg;
export const BABY_OIL_IMAGE = babyOilImg;
export const KASHMIRI_BOX_IMAGE = kashmiriBoxImg;
export const ALMOND_OIL_IMAGE = almondOilImg;

export const PAGE_HERO_BACKGROUNDS: Record<PageId, string> = {
  Home: HERO_IMAGE,
  Shop: NEGIN_IMAGE,
  'Our Story': HERO_IMAGE,
  'Indoor Cultivation': BOTANICAL_IMAGE,
  'About Us': HERO_IMAGE,
  'Our Services': INDOOR_TECH_IMAGE,
  Training: TRAINING_BG_IMAGE,
  Infrastructure: INDOOR_TECH_IMAGE,
  Technology: TECH_BG_IMAGE,
  Media: MEDIA_BG_IMAGE,
  Blog: BOTANICAL_IMAGE,
  'Press Release': MEDIA_BG_IMAGE,
  Gallery: MONGRA_IMAGE,
  Contact: CORMS_IMAGE,
  'Privacy Policy': HERO_IMAGE,
  'Terms of Service': HERO_IMAGE,
  Shipping: CORMS_IMAGE
};

export const PRODUCTS: SaffronProduct[] = [
  {
    id: 'orhues-kashmiri-mongra-threads',
    sku: 'OR-KS-101',
    category: 'threads',
    categoryLabel: 'PURE KASHMIRI SAFFRON',
    name: 'Orhues Pure Kashmiri Saffron (1g Luxury Box & Jar)',
    subtitle: 'പ്രകൃതിയുടെ മാന്ത്രികത — 1g certified Grade I Kashmiri saffron threads with gift box, glass jar & wooden spoon',
    origin: 'Heritage Pampore Terraces · Supported by Keralagro',
    harvestPeriod: '2026 Golden Hour Harvest',
    gradeSummary: 'ISO 3632 Grade I · 292 Crocin',
    image: KASHMIRI_BOX_IMAGE,
    description:
      'Supported by Keralagro. Authentic Kashmiri Mongra crimson stigmas with high crocin coloring power, presented in an ornate purple floral gift box and crystal glass jar with gold screw lid and handcrafted wooden spice spoon.',
    agronomicOrCulinaryNotes: [
      'Infuse 8–10 threads in warm water or milk (65°C) for 20 minutes to release deep crimson crocin pigments.',
      'Includes handcrafted wooden spice spoon and airtight gold-accented preservation jar.',
      'Certified zero synthetic dyes (Tartrazine, Sunset Yellow free) with QR lot verification.'
    ],
    specs: {
      crocin: '292 (ISO I threshold ≥ 200)',
      safranal: '42.8 (ISO I range 20–50)',
      picrocrocin: '99.5 (ISO I threshold ≥ 70)',
      moisture: '7.6% (Max 12.0%)',
      caliberOrCut: '1g Pure Mongra tri-filaments + wooden spoon'
    },
    variants: [
      { id: 'km-1g', label: '1g Luxury Box', weightOrCount: '1g Jar + Box + Wooden Spoon', price: 1350, unitNote: '₹1,350 / box', inStock: true },
      { id: 'km-2g', label: '2g Vault Pack', weightOrCount: '2g Jar + Box + Wooden Spoon', price: 2450, unitNote: '₹1,225 / g', inStock: true },
      { id: 'km-5g', label: '5g Collector Box', weightOrCount: '5g Jar + Box + Wooden Spoon', price: 5700, unitNote: '₹1,140 / g', inStock: true }
    ]
  },
  {
    id: 'orhues-super-negin-threads',
    sku: 'OR-BO-101',
    category: 'baby-oil',
    categoryLabel: 'SAFFRON BABY OIL',
    name: 'Orhues Saffron Baby Oil',
    subtitle: 'Tradition in Every Gentle Touch — Infused with Premium Saffron & Almond Oil',
    origin: 'Thrissur Atelier, Kerala',
    harvestPeriod: '2026 Small-Batch Formulation',
    gradeSummary: 'Ayurvedic Saffron Infusion · 100ml Pump',
    image: BABY_OIL_IMAGE,
    description:
      'Formulated with authentic Orhues Grade I saffron threads and gentle cold-pressed botanical almond and coconut oils. Crafted for delicate infant skin, providing calming warmth, gentle nourishment, and radiant skin health with Kerala heritage care.',
    agronomicOrCulinaryNotes: [
      'Dispense 2–3 pumps into palms, warm gently between hands, and massage in soothing rhythmic strokes.',
      'Formulated according to authentic Ayurvedic traditions with 0% mineral oils, parabens, or synthetic perfumes.',
      'Dermatologically tested and enriched with natural crocin bioactives.'
    ],
    specs: {
      crocin: 'Pure Saffron Crocin Active Infusion',
      safranal: 'Natural delicate botanical warmth',
      picrocrocin: 'Zero synthetic perfumes or dyes',
      moisture: '100% Water-Free Pure Oil Elixir',
      caliberOrCut: '100ml UV-Protected Pump Dispenser'
    },
    variants: [
      { id: 'bo-100ml', label: '100 ml Pump Bottle', weightOrCount: '100ml Pump Bottle', price: 1250, unitNote: '₹1,250 / bottle', inStock: true },
      { id: 'bo-200ml', label: '200 ml Duo Set', weightOrCount: '2 × 100ml Pack', price: 2200, unitNote: '₹1,100 / bottle', inStock: true }
    ]
  },
  {
    id: 'saffron-infused-honey',
    sku: 'OR-AO-201',
    category: 'almond-oil',
    categoryLabel: 'SAFFRON-INFUSED ALMOND OIL',
    name: 'Orhues Saffron-Infused Almond Oil',
    subtitle: 'A touch of saffron. A ritual of nourishment — 100ml amber dropper pump bottle',
    origin: 'Kerala Estate & Western Ghats Botanical Reserve',
    harvestPeriod: 'Small-Batch Cold Maceration',
    gradeSummary: 'Cold-Pressed Sweet Almond · Whole Saffron Stigmas',
    image: ALMOND_OIL_IMAGE,
    description:
      'Cold-pressed sweet almond oil slow-macerated with whole Orhues Grade I crimson saffron filaments. A luxurious daily ritual for radiant facial glow, cellular rejuvenation, and deep hair nourishment.',
    agronomicOrCulinaryNotes: [
      'Apply 3–4 drops to cleansed face as a nighttime botanical elixir, or massage gently into scalp and hair tips.',
      'Rich in Vitamin E, oleic acids, and active crocin antioxidant compounds.',
      'Housed in amber apothecary glass with metallic gold pump collar dispenser.'
    ],
    specs: {
      crocin: 'Grade I whole saffron stigma maceration',
      safranal: 'Delicate warm nutty & floral bouquet',
      picrocrocin: '100% virgin cold-pressed sweet almond base',
      moisture: 'Zero preservatives or chemical stabilizers',
      caliberOrCut: '100ml / 3.4 fl oz Amber Bottle'
    },
    variants: [
      { id: 'ao-100ml', label: '100 ml Bottle', weightOrCount: '100ml (~3.4 fl oz)', price: 1450, unitNote: '₹1,450 / bottle', inStock: true },
      { id: 'ao-200ml', label: '200 ml Duo', weightOrCount: '2 × 100ml Duo', price: 2600, unitNote: '₹1,300 / bottle', inStock: true }
    ]
  },
  {
    id: 'luxury-saffron-tea',
    sku: 'OR-KS-102',
    category: 'threads',
    categoryLabel: 'PURE KASHMIRI SAFFRON',
    name: 'Orhues Imperial Kashmiri Saffron (2g Connoisseur Gift Box)',
    subtitle: 'Supported by Keralagro — Certified ISO 3632 Grade I crimson threads in luxury packaging',
    origin: 'Heritage Pampore Terraces · Supported by Keralagro',
    harvestPeriod: '2026 Golden Hour Harvest',
    gradeSummary: 'Grade I · 2g Glass Jar + Box',
    image: KASHMIRI_BOX_IMAGE,
    description:
      'Packaged under partnership standards supported by Keralagro. Authentic Kashmiri Mongra crimson stigmas with high crocin coloring power, presented in an illustrated purple floral gift box and crystal glass jar with wooden sampling spoon.',
    agronomicOrCulinaryNotes: [
      'Perfect for festive gifting, culinary royalty, golden milk, and daily health.',
      'Lab verified zero synthetic dyes (tartrazine, sunset yellow free).',
      'Includes authenticated QR batch trace code on package.'
    ],
    specs: {
      crocin: '292 Category I coloring power',
      safranal: '41.5 rich safranal aroma',
      picrocrocin: '98.0 natural bitter-tonic bioactive',
      moisture: '8.2% optimal curing standard',
      caliberOrCut: '2g Pure whole crimson filaments'
    },
    variants: [
      { id: 'ks-2g', label: '2 Grams Box', weightOrCount: '2g Jar + Spoon + Box', price: 2550, unitNote: '₹1,275 / g', inStock: true },
      { id: 'ks-5g', label: '5 Grams Box', weightOrCount: '5g Jar + Box', price: 5900, unitNote: '₹1,180 / g', inStock: true }
    ]
  },
  {
    id: 'mother-corms-caliber-10',
    sku: 'OR-BO-102',
    category: 'baby-oil',
    categoryLabel: 'SAFFRON BABY OIL',
    name: 'Orhues Saffron Baby Oil — Deluxe Infant Massage Pack',
    subtitle: 'Tradition in Every Gentle Touch — Ultra-gentle calming formula for newborn & toddler wellness',
    origin: 'Thrissur, Kerala',
    harvestPeriod: 'Artisanal Botanical Cure',
    gradeSummary: '200ml Family Value Pack · Pump Bottle',
    image: BABY_OIL_IMAGE,
    description:
      'Enriched with Kerala saffron extracts, cold-pressed almond oil, and pure botanical emollients. Soothes sensitive infant skin, supports restful sleep, and preserves natural skin moisture barrier.',
    agronomicOrCulinaryNotes: [
      'Hypoallergenic, non-comedogenic, and pediatrician approved formulation.',
      'Can be used daily before warm bath or after as a protective moisture sealant.',
      'Easy-dispense locking pump prevents accidental spills.'
    ],
    specs: {
      crocin: 'Natural Crocin skin-calming compounds',
      safranal: 'Mild natural saffron aroma',
      picrocrocin: 'No artificial fragrance or essential oil irritants',
      moisture: 'Water-free cold-infused oil',
      caliberOrCut: '200ml High-Capacity Bottle'
    },
    variants: [
      { id: 'bo-200ml-deluxe', label: '200 ml Pack', weightOrCount: '200ml Pump Bottle', price: 2150, unitNote: '₹2,150 / pack', inStock: true },
      { id: 'bo-trio', label: '3 × 100ml Nursery Set', weightOrCount: '300ml Total', price: 3100, unitNote: '₹1,033 / bottle', inStock: true }
    ]
  },
  {
    id: 'aeroponic-starter-kit',
    sku: 'OR-AO-202',
    category: 'almond-oil',
    categoryLabel: 'SAFFRON-INFUSED ALMOND OIL',
    name: 'Orhues Saffron-Infused Almond Oil — Connoisseur Ritual',
    subtitle: 'A touch of saffron. A ritual of nourishment — Dual-pack intensive Ayurvedic restoration',
    origin: 'Western Ghats Botanical Nursery',
    harvestPeriod: 'Cold Maceration Release',
    gradeSummary: 'High Potency Saffron Infusion · 200ml Duo',
    image: ALMOND_OIL_IMAGE,
    description:
      'Our master-batch cold-macerated almond oil infused with selected high-crocin saffron filaments. Recommended for intensive Ayurvedic facial massage (Kumkumadi ritual) and hair revitalization.',
    agronomicOrCulinaryNotes: [
      'Use with Kansa wand or jade roller for lymphatic stimulation and collagen support.',
      'Provides deep non-greasy hydration and helps even skin tone and hyperpigmentation.',
      'Sealed in twin UV-resistant amber apothecary glass bottles.'
    ],
    specs: {
      crocin: 'High-density active saffron bioactives',
      safranal: 'Warm soothing terpene profile',
      picrocrocin: 'Unrefined cold-pressed California sweet almond',
      moisture: '100% pure botanical lipids',
      caliberOrCut: '2 × 100ml Presentation Box'
    },
    variants: [
      { id: 'ao-trio', label: '2 × 100ml Duo Set', weightOrCount: '200ml Total Set', price: 2750, unitNote: '₹1,375 / bottle', inStock: true },
      { id: 'ao-vault', label: '3 × 100ml Grand Box', weightOrCount: '300ml Total Set', price: 3850, unitNote: '₹1,283 / bottle', inStock: true }
    ]
  }
];

export const CULTIVATION_STAGES: CultivationStage[] = [
  {
    id: 'dormancy-prep',
    index: '01',
    season: 'Summer Dormancy & Incubation',
    months: 'June – Mid August',
    title: 'Floral Bud Differentiation in Dry Rest',
    subtitle: 'Inside Orhues climate chambers or dry raised beds, corms form flower primordia while dormant',
    soilTemp: '23°C – 27°C (65% RH)',
    irrigation: 'Zero liquid water · Strict dry airflow',
    depthOrSpacing: '700–900 corms per m² (Indoor Tray) · 50/m² (Field)',
    summary:
      'Saffron corms undergo internal cell division to create floral buds during warm summer dormancy. In Orhues indoor CEA facilities in Kerala, we maintain exact 25°C incubation with UV-C sanitized airflow to maximize flower count per bulb.',
    fieldChecklist: [
      'Sort corms by weight (Caliber 10/+ exceeding 18g) and remove loose outer tunics.',
      'Sanitize modular vertical trays and maintain 65% relative humidity.',
      'For soil growers: prepare 20 cm raised sandy-loam beds (pH 6.3–7.8).'
    ],
    criticalMistakeToAvoid:
      'Exposing dormant corms to high humidity (>80%) or wet soil in July triggers fungal rot and aborts floral bud formation.'
  },
  {
    id: 'planting-rooting',
    index: '02',
    season: 'Tray Loading & Root Initiation',
    months: 'Late August – September',
    title: 'Thermoperiodic Step-Down & Apical Shoot Awakening',
    subtitle: 'Gradual cooling signals autumn arrival and initiates vigorous root & shoot elongation',
    soilTemp: '16°C – 18°C',
    irrigation: 'Controlled ultrasonic misting (75% RH) or 1 light field soak',
    depthOrSpacing: 'Vertical rack tier spacing: 35 cm height per level',
    summary:
      'As chamber temperatures step down to 17°C, white protective spathes (cataphylls) emerge from the corm apex. Full-spectrum horticultural LEDs deliver targeted blue-red wavelengths to guide sturdy upright shoots.',
    fieldChecklist: [
      'Position corms upright in perforated aeroponic pins or 14 cm deep soil trenches.',
      'Engage automated diurnal temperature cycling (17°C day / 11°C night).',
      'Monitor apical shoot emergence to 4–6 cm height prior to bloom trigger.'
    ],
    criticalMistakeToAvoid:
      'Sudden thermal shock or uneven airflow across vertical rack tiers causes asynchronous flowering.'
  },
  {
    id: 'anthesis-harvest',
    index: '03',
    season: 'Dawn Anthesis & Precision Stigma Curing',
    months: 'Mid October – Mid November',
    title: 'The Purple Flush & ISO 3632 Grade I Dehydration',
    subtitle: 'Blossoms open at dawn and are hand-stripped in cleanroom conditions within 3 hours',
    soilTemp: '15°C Day / 8°C Night',
    irrigation: '80% RH mist paused during picking hours',
    depthOrSpacing: '150–160 fresh blossoms yield 1.0g Super Negin',
    summary:
      'Triggered by crisp 8°C night cycles, violet-purple blossoms unfurl each morning. Harvesters pluck whole flowers into sterile trays, separate the crimson tripartite stigma above the yellow style, and cure them in precision dehydrators.',
    fieldChecklist: [
      'Harvest blossoms within 3 hours of opening to lock in peak crocin and safranal levels.',
      'Sever the three crimson filaments cleanly without yellow floral style (Super Negin / Mongra).',
      'Dehydrate at 48°C–50°C for 38 minutes to reach 8% moisture content.'
    ],
    criticalMistakeToAvoid:
      'Over-drying above 60°C volatilizes safranal aroma, while slow room drying reduces coloring strength by up to 40%.'
  },
  {
    id: 'foliation-multiplication',
    index: '04',
    season: 'Vegetative Recharge & Daughter Corm Multiplication',
    months: 'December – May',
    title: 'Corm Transplanting & 4x Daughter Bulb Swelling',
    subtitle: 'Post-bloom corms are transferred to nutrient-rich beds to multiply for next season',
    soilTemp: '10°C – 18°C',
    irrigation: 'Balanced Potassium-Phosphorus fertigation until April',
    depthOrSpacing: '3.5x to 4.5x daughter corm multiplication per cycle',
    summary:
      'Once indoor flowering concludes in November, corms are transplanted into prepared soil beds or hydroponic nutrient troughs where their green foliage photosynthesizes all winter, swelling 3 to 5 new daughter corms per mother bulb.',
    fieldChecklist: [
      'Apply low-nitrogen, high-potassium organic nutrition during active leaf growth.',
      'Maintain clean weed-free beds until foliage naturally senesces in May.',
      'Lift, cure, and grade newly multiplied daughter corms in June for the next cycle.'
    ],
    criticalMistakeToAvoid:
      'Cutting green leaves prematurely in spring prevents daughter corms from reaching flowering weight (≥15g).'
  }
];

export const LAB_BATCHES: LabBatchRecord[] = [
  {
    lotId: 'OR-LOT-2610',
    cultivar: 'Orhues Imperial Mongra',
    region: 'Thrissur CEA Chamber #02 & Pampore Stock',
    altitude: 'Controlled 1,850m Equivalent Pressure/Temp',
    harvestDate: '2026-10-19',
    crocin440nm: 292,
    picrocrocin257nm: 99.5,
    safranal330nm: 42.8,
    moisturePercent: 7.6,
    floralWastePercent: 0.1,
    harvesterLead: 'Orhues Agronomy Lab, Thrissur',
    dryingProtocol: 'Precision cleanroom sieve at 49°C for 38 mins'
  },
  {
    lotId: 'OR-LOT-2614',
    cultivar: 'Orhues Super Negin Reserve',
    region: 'Thrissur Vertical Aeroponic Unit A',
    altitude: 'CEA Climate-Controlled Facility',
    harvestDate: '2026-10-27',
    crocin440nm: 284,
    picrocrocin257nm: 96.2,
    safranal330nm: 39.4,
    moisturePercent: 8.1,
    floralWastePercent: 0.1,
    harvesterLead: 'Orhues Quality Assurance Team',
    dryingProtocol: 'Forced-air silk sieve at 50°C for 36 mins'
  },
  {
    lotId: 'OR-LOT-2619',
    cultivar: 'Saffron Infused Honey Infusion Lot',
    region: 'Western Ghats Apiary & Thrissur Atelier',
    altitude: '1,200m Forest Belt',
    harvestDate: '2026-11-04',
    crocin440nm: 280,
    picrocrocin257nm: 92.0,
    safranal330nm: 41.0,
    moisturePercent: 8.0,
    floralWastePercent: 0.0,
    harvesterLead: 'Orhues Culinary Division',
    dryingProtocol: '28-day cold raw honey maceration at 24°C'
  }
];

export const BLOG_POSTS = [
  {
    id: 'aeroponic-saffron-kerala',
    date: 'October 4, 2026',
    category: 'CEA Agronomy',
    readTime: '6 min read',
    title: 'How Controlled-Environment Agriculture Brings Kashmiri-Grade Saffron to Kerala',
    excerpt:
      'By replicating the exact diurnal temperature drops, photon spectra, and atmospheric humidity of 1,800-meter alpine terraces inside insulated vertical rooms in Thrissur, Orhues achieves 290+ Crocin potency without pesticides or weather risk.',
    image: INDOOR_TECH_IMAGE
  },
  {
    id: 'crocin-safranal-science',
    date: 'September 18, 2026',
    category: 'Phytochemistry',
    readTime: '5 min read',
    title: 'Understanding ISO 3632: Why Crocin, Picrocrocin & Safranal Define True Red Gold',
    excerpt:
      'A deep dive into UV-Vis spectrophotometry and how post-harvest dehydration temperature determines whether saffron threads retain their golden coloring power and honeyed terpene bouquet.',
    image: BOTANICAL_IMAGE
  },
  {
    id: 'saffron-honey-culinary-wellness',
    date: 'August 29, 2026',
    category: 'Wellness & Gastronomy',
    readTime: '4 min read',
    title: 'The Alchemy of Raw Western Ghats Honey and Super Negin Saffron Filaments',
    excerpt:
      'Why cold-macerating whole crimson stigma threads in unheated multifloral honey creates a bioavailable daily elixir for immunity, mood balance, and culinary finishing.',
    image: HONEY_IMAGE
  }
];

export const PRESS_RELEASES = [
  {
    id: 'pr-thrissur-cea-expansion',
    date: 'October 2026',
    outlet: 'AgriTech India & Kerala Business Chronicle',
    title: 'Orhues Expands Turnkey Indoor Saffron Infrastructure & Grower Training Center in Thrissur',
    summary:
      'Orhues announced the commissioning of its latest IoT-automated vertical saffron cultivation demonstration modules in Thrissur, Kerala, enabling entrepreneurs and progressive farmers across South India to establish high-margin indoor saffron units.'
  },
  {
    id: 'pr-luxury-honey-tea-launch',
    date: 'September 2026',
    outlet: 'Luxury Gastronomy Journal',
    title: 'Orhues Unveils Single-Origin Saffron Infused Honey and Royal Saffron Tea Collection',
    summary:
      'Combining laboratory-verified 284+ Crocin saffron harvested from controlled cleanrooms with artisanal Kerala botanicals, the new culinary line sets a new benchmark for traceable luxury wellness products.'
  },
  {
    id: 'pr-iso-certification',
    date: 'July 2026',
    outlet: 'Spices & Phytochemistry Review',
    title: 'Orhues 2026 Harvest Lots Surpass ISO 3632-2 Category I Benchmarks by 45%',
    summary:
      'Independent laboratory assays confirm Orhues indoor-cultivated stigmas achieved 292 Crocin coloring strength and zero floral waste or pesticide residue.'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Vertical Aeroponic Anthesis in Thrissur',
    category: 'Infrastructure & CEA',
    caption: 'Multi-tier modular saffron trays blooming simultaneously under precision spectrum LEDs.',
    image: INDOOR_TECH_IMAGE
  },
  {
    id: 'gal-2',
    title: 'Highland & Terrace Harvest Heritage',
    category: 'Botanical Origins',
    caption: 'Dawn blossom gathering during the 18-day autumn flush.',
    image: HERO_IMAGE
  },
  {
    id: 'gal-3',
    title: 'Cleanroom Stigma Separation',
    category: 'Craftsmanship',
    caption: 'Hand-stripping the three crimson filaments from freshly opened Crocus sativus blossoms.',
    image: BOTANICAL_IMAGE
  },
  {
    id: 'gal-4',
    title: 'Imperial Mongra Apothecary Packaging',
    category: 'Product Showcase',
    caption: 'Brushed brass canisters and porcelain micro-mortars preserving volatile safranal.',
    image: MONGRA_IMAGE
  },
  {
    id: 'gal-5',
    title: 'Saffron Infused Raw Honey',
    category: 'Gastronomy',
    caption: 'Golden Western Ghats nectar infused with whole Super Negin filaments.',
    image: HONEY_IMAGE
  },
  {
    id: 'gal-6',
    title: 'Caliber 10/+ Mother Corm Stock',
    category: 'Corm Nursery',
    caption: 'Healthy, fibrous-tuniced mother bulbs exceeding 18g ready for tray loading.',
    image: CORMS_IMAGE
  }
];
