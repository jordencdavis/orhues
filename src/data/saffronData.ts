import heroImg from '../assets/images/hero_saffron_harvest_1791656835444.jpg';
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
import orhuesLogoImg from '../assets/images/orhues-logo.svg';

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
  category: 'threads' | 'honey' | 'tea' | 'corms' | 'kits';
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
    sku: 'OR-TH-101',
    category: 'threads',
    categoryLabel: 'SAFFRON THREADS',
    name: 'Orhues Imperial Mongra Saffron Threads',
    subtitle: 'All-crimson tripartite stigma filaments harvested at peak anthesis',
    origin: 'Thrissur CEA Chamber & Pampore Terraces',
    harvestPeriod: '2026 Precision Harvest',
    gradeSummary: 'ISO 3632 Grade I · 292 Crocin',
    image: MONGRA_IMAGE,
    description:
      'Cultivated using Orhues precision Controlled-Environment Agriculture (CEA) and heritage Pampore Karewa stock. Our Imperial Mongra threads contain zero yellow style, delivering extraordinary golden-crimson coloring power and rich safranal aroma.',
    agronomicOrCulinaryNotes: [
      'Infuse 10–12 threads in warm milk or water (65°C) for 20 minutes to unlock full crocin pigments.',
      'Accompanied by a brushed brass UV-protective canister and glazed porcelain micro-mortar.',
      'Lab-certified free of artificial colorants, safflower, or moisture adulteration.'
    ],
    specs: {
      crocin: '292 (ISO I threshold ≥ 200)',
      safranal: '42.8 (ISO I range 20–50)',
      picrocrocin: '99.5 (ISO I threshold ≥ 70)',
      moisture: '7.6% (Max 12.0%)',
      caliberOrCut: '18–22 mm detached dark crimson Mongra tips'
    },
    variants: [
      { id: 'km-1g', label: '1 Gram', weightOrCount: '1g Brass Tin (~450 threads)', price: 1350, unitNote: '₹1,350 / g', inStock: true },
      { id: 'km-2g', label: '2 Grams', weightOrCount: '2g Brass Tin', price: 2450, unitNote: '₹1,225 / g', inStock: true },
      { id: 'km-5g', label: '5 Grams + Mortar', weightOrCount: '5g + Porcelain Mortar', price: 5700, unitNote: '₹1,140 / g', inStock: true },
      { id: 'km-10g', label: '10 Grams Reserve', weightOrCount: '10g + Porcelain Mortar', price: 10500, unitNote: '₹1,050 / g', inStock: true }
    ]
  },
  {
    id: 'orhues-super-negin-threads',
    sku: 'OR-TH-102',
    category: 'threads',
    categoryLabel: 'SAFFRON THREADS',
    name: 'Orhues Super Negin Reserve Threads',
    subtitle: 'Long unbroken crimson trumpet filaments cured in low-temp silk sieves',
    origin: 'Orhues Indoor Aeroponic Estate, Kerala',
    harvestPeriod: 'Autumn 2026',
    gradeSummary: 'ISO 3632 Grade I · 284 Crocin',
    image: NEGIN_IMAGE,
    description:
      'Grown in sterile, pesticide-free vertical aeroponic chambers in Thrissur, Kerala, where temperature, humidity, and photon flux are tuned to replicate highland autumn mornings.',
    agronomicOrCulinaryNotes: [
      'Ideal for daily wellness elixirs, artisanal desserts, biryanis, and skincare infusions.',
      'Hand-picked within 3 hours of blossom opening to preserve delicate volatile terpenes.',
      'Sealed in UV-shielded amber apothecary glass.'
    ],
    specs: {
      crocin: '284 (ISO I threshold ≥ 200)',
      safranal: '39.4 (ISO I range 20–50)',
      picrocrocin: '96.2 (ISO I threshold ≥ 70)',
      moisture: '8.1% (Max 12.0%)',
      caliberOrCut: '20 mm unbroken crimson trumpet filaments'
    },
    variants: [
      { id: 'sn-2g', label: '2 Grams', weightOrCount: '2g Amber Jar', price: 2000, unitNote: '₹1,000 / g', inStock: true },
      { id: 'sn-5g', label: '5 Grams', weightOrCount: '5g Amber Jar', price: 4500, unitNote: '₹900 / g', inStock: true },
      { id: 'sn-15g', label: '15 Grams', weightOrCount: '15g Estate Vault', price: 12100, unitNote: '₹807 / g', inStock: true }
    ]
  },
  {
    id: 'saffron-infused-honey',
    sku: 'OR-HN-201',
    category: 'honey',
    categoryLabel: 'Saffron Infused Honey',
    name: 'Orhues Artisanal Saffron Infused Honey',
    subtitle: 'Raw Western Ghats multifloral nectar slow-macerated with Super Negin filaments',
    origin: 'Thrissur, Kerala, India',
    harvestPeriod: 'Small-Batch Cold Infusion',
    gradeSummary: '1.5g Grade I Saffron per 250g Jar',
    image: HONEY_IMAGE,
    description:
      'Unheated, raw forest and wildflower honey sourced from ethical apiaries in Kerala, cold-macerated for 28 days with Orhues Grade I crimson saffron threads. Rich in natural enzymes, antioxidants, and golden crocin bioactives.',
    agronomicOrCulinaryNotes: [
      'Stir one warm spoonful into herbal teas, drizzle over aged cheeses, charcuterie, or morning yogurt.',
      'Never heated above 35°C—preserves both raw bee pollen diastase and saffron safranal.',
      'Includes handcrafted wooden honey dipper.'
    ],
    specs: {
      crocin: '280+ Crocin threads suspended',
      safranal: 'High-aroma cold extraction',
      picrocrocin: 'Balanced floral-honeyed finish',
      moisture: '17.2% Raw Honey Standard',
      caliberOrCut: 'Whole Super Negin threads in raw nectar'
    },
    variants: [
      { id: 'hn-150g', label: '150g Faceted Jar', weightOrCount: '150g + Honey Dipper', price: 1850, unitNote: '₹1,850 / jar', inStock: true },
      { id: 'hn-250g', label: '250g Reserve Jar', weightOrCount: '250g + Honey Dipper', price: 2850, unitNote: '₹2,850 / jar', inStock: true },
      { id: 'hn-500g', label: '500g Gift Duo', weightOrCount: '2 × 250g Presentation Box', price: 5200, unitNote: '₹2,600 / jar', inStock: true }
    ]
  },
  {
    id: 'luxury-saffron-tea',
    sku: 'OR-TE-301',
    category: 'tea',
    categoryLabel: 'Luxury Saffron Tea',
    name: 'Orhues Royal Kashmiri Kahwa & Luxury Saffron Tea',
    subtitle: 'High-elevation whole green tea leaves, crushed green cardamom, cinnamon & pure saffron',
    origin: 'Munnar High-Grown & Thrissur Atelier',
    harvestPeriod: '2026 Botanical Blend',
    gradeSummary: 'Whole-Leaf Blend · Pure Crimson Stigmas',
    image: TEA_IMAGE,
    description:
      'An opulent ceremonial tea uniting high-grown Western Ghats whole-leaf tea, aromatic Kerala green cardamom pods, Ceylon cinnamon bark, rose petals, and generous threads of Orhues Grade I saffron inside a porcelain-and-gold keepsake caddy.',
    agronomicOrCulinaryNotes: [
      'Steep 2.5 grams in 200 ml water at 85°C for 4 minutes; garnish with slivered almonds.',
      'Naturally caffeine-moderate and soothing for evening relaxation and digestive wellness.',
      'Presented in a reusable ornate gold-accented ceramic caddy.'
    ],
    specs: {
      crocin: 'Pure Grade I Saffron threads (3.5% w/w)',
      safranal: 'Aromatic cardamom & safranal bouquet',
      picrocrocin: 'Zero artificial flavoring oils',
      moisture: '4.2% nitrogen-sealed freshness',
      caliberOrCut: 'Whole leaf + whole crimson stigma threads'
    },
    variants: [
      { id: 'te-100g', label: '100g Royal Caddy', weightOrCount: '100g (~45 cups)', price: 2650, unitNote: '₹2,650 / caddy', inStock: true },
      { id: 'te-250g', label: '250g Connoisseur Vault', weightOrCount: '250g (~110 cups)', price: 5700, unitNote: '₹5,700 / vault', inStock: true }
    ]
  },
  {
    id: 'mother-corms-caliber-10',
    sku: 'OR-CM-401',
    category: 'corms',
    categoryLabel: 'Certified Planting Corms',
    name: 'Crocus Sativus Mother Corms (Caliber 10/+)',
    subtitle: 'Vernalized, pathogen-screened high-yield bulbs for indoor aeroponics or raised beds',
    origin: 'Orhues Propagating Nursery',
    harvestPeriod: 'Pre-Chilled & Ready for Tray/Bed',
    gradeSummary: '32–38mm Diameter · 18g+ Weight',
    image: CORMS_IMAGE,
    description:
      'Specially graded for both indoor vertical aeroponic farming and outdoor well-drained raised beds. Each Caliber 10/+ mother corm weighs over 18 grams and initiates 2 to 3 blossoms in its very first flowering cycle.',
    agronomicOrCulinaryNotes: [
      'Pre-screened against Fusarium rot and viral mosaic; ideal for CEA chiller rooms.',
      'Includes Orhues temperature-humidity schedule and post-harvest corm multiplication guide.',
      'Accompanied by phytosanitary dispatch clearance across India.'
    ],
    specs: {
      crocin: 'Genetic potential ≥ 285 Crocin',
      safranal: 'High-terpene clonal lineage',
      picrocrocin: 'Certified pathogen-free stock',
      moisture: 'Cured tunic at 65% RH',
      caliberOrCut: 'Caliber 10/11+ (18g–24g per corm)'
    },
    variants: [
      { id: 'cm-50', label: '50 Mother Corms', weightOrCount: '1 Aeroponic Tray / 1 m²', price: 3200, unitNote: '₹64 / corm', inStock: true },
      { id: 'cm-250', label: '250 Mother Corms', weightOrCount: '5 Trays / 5 m² Plot', price: 13800, unitNote: '₹55 / corm', inStock: true },
      { id: 'cm-1000', label: '1,000 Commercial Crate', weightOrCount: '20 Trays / Commercial Starter', price: 45000, unitNote: '₹45 / corm', inStock: true }
    ]
  },
  {
    id: 'aeroponic-starter-kit',
    sku: 'OR-KT-501',
    category: 'kits',
    categoryLabel: 'Indoor Cultivation Kit',
    name: 'Orhues Indoor Vertical Saffron Starter System',
    subtitle: '100 Caliber 10/+ corms, food-grade aeroponic rooting trays, lux sensor & stigma tweezers',
    origin: 'Orhues R&D Lab, Thrissur',
    harvestPeriod: 'Year-Round Indoor Setup',
    gradeSummary: '100 Corms + Modular Tray Hardware',
    image: INDOOR_TECH_IMAGE,
    description:
      'Designed by Orhues engineers in Thrissur for aspiring indoor saffron growers and trainees. Allows you to test soilless controlled-environment saffron flowering before scaling to a commercial 100 sq. ft. or 500 sq. ft. chamber.',
    agronomicOrCulinaryNotes: [
      'Includes 100 Caliber 10/+ mother corms and 2 stackable food-grade perforated rooting trays.',
      'Contains surgical bent-tip stigma forceps, digital thermo-hygrometer, and Orhues SOP manual.',
      'Includes 1-on-1 virtual agronomy check-in with our Thrissur technical team.'
    ],
    specs: {
      crocin: 'Calibrated for 48°C dehydrator cure',
      safranal: 'Includes amber curing jar',
      picrocrocin: 'Soilless aeroponic protocol',
      moisture: 'Digital hygrometer included',
      caliberOrCut: '100x Caliber 10/+ Corms + 2 Trays'
    },
    variants: [
      { id: 'kt-100', label: '100-Corm Starter Kit', weightOrCount: '2 Trays + Tooling', price: 9800, unitNote: '₹9,800 Complete Kit', inStock: true },
      { id: 'kt-300', label: '300-Corm Pilot Rack', weightOrCount: '6 Trays + LED Bar', price: 23800, unitNote: '₹23,800 Bundle', inStock: true }
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
