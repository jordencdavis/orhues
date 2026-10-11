/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  PRODUCTS,
  LAB_BATCHES,
  BLOG_POSTS,
  PRESS_RELEASES,
  GALLERY_ITEMS,
  HERO_IMAGE,
  INDOOR_TECH_IMAGE,
  BOTANICAL_IMAGE,
  CORMS_IMAGE,
  HONEY_IMAGE,
  TEA_IMAGE,
  TECH_BG_IMAGE,
  TRAINING_BG_IMAGE,
  PAGE_HERO_BACKGROUNDS,
  PageId,
  SaffronProduct,
  ProductVariant
} from './data/saffronData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ResilientImage } from './components/ResilientImage';
import { CultivationPlanner } from './components/CultivationPlanner';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import {
  ArrowRight,
  Search,
  Check,
  SlidersHorizontal,
  FlaskConical,
  Sprout,
  Cpu,
  GraduationCap,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  X
} from 'lucide-react';

export default function App() {
  // Active separate page state
  const [activePage, setActivePage] = useState<PageId>('Home');

  // Catalog filter & search state
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | 'threads' | 'honey' | 'tea' | 'corms' | 'kits'
  >('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Track selected variant per product card in the grid
  const [cardVariants, setCardVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = p.variants[0].id;
    });
    return initial;
  });

  // Track recent quick-add feedback per product card
  const [addedCardId, setAddedCardId] = useState<string | null>(null);

  // PDP Modal state
  const [activeProductModal, setActiveProductModal] = useState<{
    product: SaffronProduct;
    variantId: string;
  } | null>(null);

  // Help / Question Modal state
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Cart state — initialized empty so items are only added when explicitly clicked by the user
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Sync browser tab title with ORHUES branding and active page
  useEffect(() => {
    document.title =
      activePage === 'Home'
        ? 'ORHUES — Rare. Redefined. Revered. | Saffron Cultivation & Apothecary'
        : `${activePage} | ORHUES — Rare. Redefined. Revered.`;
  }, [activePage]);

  // ISO 3632 Laboratory Batch Inspector State
  const [selectedLotId, setSelectedLotId] = useState<string>(LAB_BATCHES[0].lotId);

  // Contact / Service Inquiry Form State
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryPhone, setInquiryPhone] = useState<string>('');
  const [inquiryEmail, setInquiryEmail] = useState<string>('');
  const [inquiryTopic, setInquiryTopic] = useState<string>(
    'Turnkey Indoor Saffron Infrastructure Setup'
  );
  const [inquiryMessage, setInquiryMessage] = useState<string>('');

  // Technology Page Cultivation Requirement Form State
  const [techFormSubmitted, setTechFormSubmitted] = useState<boolean>(false);
  const [techName, setTechName] = useState<string>('');
  const [techPhone, setTechPhone] = useState<string>('');
  const [techEmail, setTechEmail] = useState<string>('');
  const [techCategory, setTechCategory] = useState<string>('Commercial Saffron Grower');
  const [techRoomArea, setTechRoomArea] = useState<string>('');
  const [techStageFocus, setTechStageFocus] = useState<string>(
    'Both Flowering & Corm Multiplication Stages'
  );
  const [techNotes, setTechNotes] = useState<string>('');

  const selectedBatch = useMemo(
    () => LAB_BATCHES.find((b) => b.lotId === selectedLotId) || LAB_BATCHES[0],
    [selectedLotId]
  );

  // Navigation handler that also supports deep-filtering into Shop categories
  const handleNavigate = (
    page: PageId,
    shopCategory?: 'all' | 'threads' | 'honey' | 'tea' | 'corms' | 'kits'
  ) => {
    setActivePage(page);
    if (shopCategory) {
      setCategoryFilter(shopCategory);
    }
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        product.gradeSummary.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  // Cart handlers
  const handleAddToCart = (
    product: SaffronProduct,
    variant: ProductVariant,
    quantity: number
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant.id === variant.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, variant, quantity }];
    });
  };

  const handleQuickAddFromCard = (product: SaffronProduct) => {
    const chosenVariantId = cardVariants[product.id] || product.variants[0].id;
    const variant =
      product.variants.find((v) => v.id === chosenVariantId) || product.variants[0];
    handleAddToCart(product, variant, 1);
    setAddedCardId(product.id);
    setTimeout(() => {
      setAddedCardId((prev) => (prev === product.id ? null : prev));
    }, 1600);
  };

  const handleUpdateCartQuantity = (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variant.id === variantId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variant.id === variant.id)
      )
    );
  };

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Reusable Product Grid Section
  const renderProductCatalog = (showHeading = true) => (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        {showHeading ? (
          <div>
            <div className="text-xs text-[#8B4500] font-medium mb-2">
              <span>ORHUES APOTHECARY &amp; NURSERY</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>ISO 3632 Grade I Verified</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Saffron Threads, Infused Honey, Luxury Tea &amp; Mother Corms
            </h2>
          </div>
        ) : (
          <div>
            <div className="text-xs text-[#635E59]">
              Showing {filteredProducts.length} of {PRODUCTS.length} Orhues offerings
            </div>
          </div>
        )}

        {/* Filter Bar + Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div
            className="flex flex-wrap items-center gap-1 p-1 bg-[#F4ECE1] rounded-xl border border-[#E5D7C5]"
            role="tablist"
            aria-label="Filter Orhues products by category"
          >
            {[
              { id: 'all', label: 'All' },
              { id: 'threads', label: 'Saffron Threads' },
              { id: 'honey', label: 'Saffron Honey' },
              { id: 'tea', label: 'Luxury Tea' },
              { id: 'corms', label: 'Mother Corms' },
              { id: 'kits', label: 'CEA Kits' }
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={categoryFilter === tab.id}
                onClick={() => setCategoryFilter(tab.id as typeof categoryFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-[#8B4500] text-white shadow-xs'
                    : 'text-[#5C4932] hover:text-[#8B4500]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#635E59] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saffron, honey, tea..."
              aria-label="Search Orhues offerings"
              className="w-full sm:w-52 pl-9 pr-3.5 py-2 rounded-xl bg-white border border-[#E5D7C5] text-xs text-[#181615] placeholder:text-[#635E59] focus:outline-none focus:border-[#8B4500]"
            />
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-[#EAE0D2] text-center">
          <p className="font-display text-2xl text-[#181615] mb-2">
            No matching offerings found for &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('all');
              setSearchQuery('');
            }}
            className="mt-3 py-2.5 px-5 rounded-full bg-[#8B4500] text-white text-xs font-semibold cursor-pointer"
          >
            Show All Offerings
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => {
            const selectedVarId = cardVariants[product.id] || product.variants[0].id;
            const activeVariant =
              product.variants.find((v) => v.id === selectedVarId) ||
              product.variants[0];
            const isRecentlyAdded = addedCardId === product.id;

            return (
              <article
                key={product.id}
                className="group bg-white rounded-2xl border border-[#EAE0D2] overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <div
                    onClick={() =>
                      setActiveProductModal({
                        product,
                        variantId: activeVariant.id
                      })
                    }
                    className="aspect-[4/3] w-full bg-[#F4ECE1] overflow-hidden cursor-pointer relative"
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6 pb-4">
                    <div className="text-xs text-[#8B4500] font-medium mb-1.5">
                      <span>{product.categoryLabel}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span className="text-[#635E59] font-normal">{product.gradeSummary}</span>
                    </div>

                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <h3
                        onClick={() =>
                          setActiveProductModal({
                            product,
                            variantId: activeVariant.id
                          })
                        }
                        className="font-display text-2xl font-semibold text-[#181615] group-hover:text-[#8B4500] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <span className="font-mono-tabular text-base font-semibold text-[#181615] shrink-0">
                        ₹{activeVariant.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <p className="text-xs text-[#524E4A] leading-relaxed mb-4">
                      {product.subtitle}
                    </p>

                    <div className="mb-2">
                      <div className="flex items-center justify-between text-[11px] text-[#635E59] mb-1.5">
                        <span>Select Pack</span>
                        <span className="font-mono-tabular">{activeVariant.unitNote}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.variants.map((variant) => {
                          const isVarSelected = variant.id === activeVariant.id;
                          return (
                            <button
                              key={variant.id}
                              type="button"
                              onClick={() =>
                                setCardVariants((prev) => ({
                                  ...prev,
                                  [product.id]: variant.id
                                }))
                              }
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                isVarSelected
                                  ? 'bg-[#8B4500] text-white border-[#8B4500]'
                                  : 'bg-[#FCF9F4] text-[#524E4A] border-[#E5D7C5] hover:border-[#8B4500]'
                              }`}
                            >
                              {variant.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveProductModal({
                        product,
                        variantId: activeVariant.id
                      })
                    }
                    className="py-2.5 px-3.5 rounded-xl border border-[#E5D7C5] hover:border-[#8B4500] text-xs font-medium text-[#181615] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B4500]" />
                    <span>Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAddFromCard(product)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isRecentlyAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added ({activeVariant.label})</span>
                      </>
                    ) : (
                      <span>Add to Bag — ₹{activeVariant.price.toLocaleString('en-IN')}</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );

  // Page Banner Header for Separate Pages (including all dropdown pages) with Full Background Image
  const renderPageHeader = (title: string, kicker: string, description: string) => {
    const bgImage =
      PAGE_HERO_BACKGROUNDS[title as PageId] ||
      PAGE_HERO_BACKGROUNDS[activePage] ||
      HERO_IMAGE;

    return (
      <div
        className="relative w-full min-h-[340px] sm:min-h-[420px] flex items-center border-b border-[#EAE0D2] py-16 sm:py-24 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <ResilientImage
          src={bgImage}
          alt={`${title} — Orhues Saffron`}
          fallbackTitle={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181615]/85 via-[#181615]/70 to-[#181615]/40" />

        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6">
          <h1
            className="font-display text-4xl sm:text-6xl font-semibold text-white tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h1>
          <p className="text-base sm:text-lg text-stone-200 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#181615]">
      {/* Exact ORHUES Header */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={totalBagCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Dynamic Page View */}
      <main className="flex-1">
        {/* ================= PAGE: HOME ================= */}
        {activePage === 'Home' && (
          <>
            {/* Hero Section as Full-Background div (main > div:nth-of-type(1)) */}
            <div
              className="relative w-full pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#EAE0D2] bg-cover bg-center bg-no-repeat overflow-hidden"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            >
              <ResilientImage
                src={HERO_IMAGE}
                alt="Purple Crocus sativus saffron blossoms and freshly harvested crimson stigmas at dawn"
                fallbackTitle="Orhues Saffron Harvest & Cultivation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#181615]/90 via-[#181615]/75 to-[#181615]/45" />

              <div className="relative z-10 max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-12">
                  <div className="lg:col-span-8 py-2">
                    <div className="text-xs text-[#E8C284] font-semibold tracking-wider uppercase mb-4">
                      <span>ORHUES — RARE. REDEFINED. REVERED.</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>Thrissur, Kerala</span>
                    </div>

                    <h1
                      className="font-display font-semibold text-white tracking-tight leading-[1.08] mb-6"
                      style={{
                        fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                        textWrap: 'balance'
                      }}
                    >
                      Precision Saffron Cultivation &amp; Pure Single-Origin Harvest
                    </h1>

                    <p className="text-base sm:text-lg text-stone-200 leading-relaxed mb-8 max-w-2xl">
                      From Controlled-Environment Agriculture (CEA) vertical saffron rooms in Thrissur, Kerala to heritage Pampore terraces—discover ISO 3632 Grade I Saffron Threads, Saffron Infused Raw Honey, Luxury Saffron Tea, and turnkey grower infrastructure.
                    </p>

                    <div className="flex flex-wrap items-center gap-3.5 mb-8">
                      <button
                        type="button"
                        onClick={() => handleNavigate('Shop', 'all')}
                        className="py-3.5 px-7 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold tracking-[0.14em] uppercase inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Explore Shop</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate('Our Services')}
                        className="py-3.5 px-7 rounded-full bg-white/95 hover:bg-white text-[#8B4500] text-xs font-bold tracking-[0.14em] uppercase inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Sprout className="w-4 h-4 text-[#8B4500]" />
                        <span>Training &amp; Infrastructure</span>
                      </button>
                    </div>

                    <div className="pt-6 border-t border-white/20 max-w-2xl">
                      <p className="font-display italic text-lg text-stone-100 leading-snug mb-2">
                        &ldquo;With Orhues’s turnkey 250 sq. ft. controlled-environment saffron module and hands-on training in Thrissur, our first November harvest achieved 288 Crocin coloring power without a single drop of chemical pesticide.&rdquo;
                      </p>
                      <div className="text-xs text-stone-300">
                        <span className="font-semibold text-white">Aravind Menon</span>
                        <span className="mx-2" aria-hidden="true">·</span>
                        <span>CEA Saffron Partner, Cochin</span>
                        <span className="mx-2" aria-hidden="true">·</span>
                        <span>Verified Orhues Grower</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="p-6 rounded-2xl bg-black/55 backdrop-blur-xs border border-white/15 text-white">
                      <div className="text-xs text-[#E8C284] mb-1">
                        <span>ISO 3632 Category I (292 Crocin)</span>
                        <span className="mx-2" aria-hidden="true">·</span>
                        <span>Kerala CEA</span>
                      </div>
                      <p className="font-display text-xl sm:text-2xl text-white font-medium">
                        155 freshly opened Crocus sativus blossoms are hand-stripped to cure a single gram of Orhues Imperial Saffron.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4-Column Proof Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                  <div
                    onClick={() => handleNavigate('Shop', 'threads')}
                    className="p-5 rounded-xl bg-white/95 hover:bg-white border border-[#EAE0D2] transition-colors cursor-pointer"
                  >
                    <div className="font-mono-tabular text-2xl font-semibold text-[#8B4500] mb-1">
                      292 Crocin Grade I
                    </div>
                    <div className="text-xs text-[#635E59] leading-relaxed">
                      Pure crimson stigma threads, Saffron Infused Honey &amp; Luxury Saffron Tea.
                    </div>
                  </div>
                  <div
                    onClick={() => handleNavigate('Training')}
                    className="p-5 rounded-xl bg-white/95 hover:bg-white border border-[#EAE0D2] transition-colors cursor-pointer"
                  >
                    <div className="font-mono-tabular text-2xl font-semibold text-[#8B4500] mb-1">
                      Grower Training
                    </div>
                    <div className="text-xs text-[#635E59] leading-relaxed">
                      Hands-on aeroponic &amp; indoor saffron masterclasses at our Thrissur, Kerala facility.
                    </div>
                  </div>
                  <div
                    onClick={() => handleNavigate('Infrastructure')}
                    className="p-5 rounded-xl bg-white/95 hover:bg-white border border-[#EAE0D2] transition-colors cursor-pointer"
                  >
                    <div className="font-mono-tabular text-2xl font-semibold text-[#8B4500] mb-1">
                      CEA Infrastructure
                    </div>
                    <div className="text-xs text-[#635E59] leading-relaxed">
                      Turnkey insulated cleanrooms, HVAC chillers, ultrasonic misting &amp; vertical trays.
                    </div>
                  </div>
                  <div
                    onClick={() => handleNavigate('Technology')}
                    className="p-5 rounded-xl bg-white/95 hover:bg-white border border-[#EAE0D2] transition-colors cursor-pointer"
                  >
                    <div className="font-mono-tabular text-2xl font-semibold text-[#8B4500] mb-1">
                      IoT Precision Tech
                    </div>
                    <div className="text-xs text-[#635E59] leading-relaxed">
                      Automated alpine climate replication &amp; ISO 3632 spectrophotometric testing.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Catalog Section */}
            <section className="py-16 sm:py-20">
              {renderProductCatalog(true)}
            </section>

            {/* Interactive Cultivation Blueprint & Yield Calculator */}
            <CultivationPlanner
              onAddCormsToBag={(product, variant, quantity) => {
                handleAddToCart(product, variant, quantity);
                setIsCartOpen(true);
              }}
            />
          </>
        )}

        {/* ================= PAGE: SHOP ================= */}
        {activePage === 'Shop' && (
          <>
            {renderPageHeader(
              'Shop',
              'Direct from Orhues Apothecary & Corm Nursery',
              'Acquire ISO 3632 Category I Saffron Threads, Raw Saffron Infused Honey, Luxury Saffron Tea, and pre-vernalized Caliber 10/+ Crocus sativus mother corms.'
            )}
            <section className="py-14 sm:py-16 space-y-16">
              {renderProductCatalog(false)}

              {/* Moved Sections: Multi-Stage Quality & Purity Tests + Live Batch Certificate Verification */}
              <div className="max-w-[1280px] mx-auto px-6 space-y-16 pt-8 border-t border-[#EAE0D2]">
                {/* Multi-Stage Quality & Laboratory Tests */}
                <div className="space-y-8">
                  <div className="max-w-3xl">
                    <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                      Multi-Stage Quality &amp; Purity Tests
                    </div>
                    <h2 className="font-display text-3xl font-semibold text-[#181615] mb-2">
                      Four Mandatory Tests Performed on Every Orhues Batch
                    </h2>
                    <p className="text-sm text-[#4A4540] leading-relaxed">
                      Before any jar of saffron threads, infused honey, luxury saffron tea, or crate of mother corms leaves our Thrissur facility, it must pass four rigorous physical, biological, and chemical verification protocols.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-white border border-[#EAE0D2] space-y-3">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold">
                        TEST 01 · ISO 3632-2 UV-VIS
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Spectrophotometric Assay
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed">
                        Aqueous extracts are scanned at <strong>440 nm</strong> (Crocin coloring ≥ 280), <strong>257 nm</strong> (Picrocrocin ≥ 94), and <strong>330 nm</strong> (Safranal 38–45) to verify Category I pharmaceutical potency.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#EAE0D2] space-y-3">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold">
                        TEST 02 · GRAVIMETRIC DRYING
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Moisture &amp; Volatile Matter
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed">
                        Tested in a 103°C halogen moisture analyzer. While ISO Category I permits up to 12% moisture, Orhues cures all threads to <strong>8.4% – 9.2%</strong> so you pay for pure spice, not water weight.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#EAE0D2] space-y-3">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold">
                        TEST 03 · CHROMATOGRAPHY
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Zero-Dye &amp; Cold-Water Test
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed">
                        Screened against Tartrazine, Sunset Yellow, and Red-40 synthetic dyes. In tepid water, authentic Orhues threads slowly diffuse a luminous golden halo while the stigma itself stays deep crimson.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#EAE0D2] space-y-3">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold">
                        TEST 04 · PHYTOSANITARY
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Pathogen &amp; Rot Screening
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed">
                        Mother corm lots are random-sampled and incubated to guarantee 0% <em>Fusarium oxysporum</em>, <em>Rhizoctonia violacea</em>, or bulb mite infestation prior to grower dispatch.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive ISO 3632-2 Batch Assay Inspector (Moved from Technology) */}
                <div className="bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5">
                      <div className="text-xs text-[#8B4500] font-semibold uppercase mb-2">
                        Live Laboratory Verification
                      </div>
                      <h2 className="font-display text-3xl font-semibold text-[#181615] mb-3">
                        ISO 3632-2 Batch Assay Inspector
                      </h2>
                      <p className="text-sm text-[#4A4540] leading-relaxed mb-6">
                        Select an active Orhues batch below to inspect its spectrophotometric absorbance readings against international Grade I thresholds.
                      </p>
                      <div className="space-y-2.5">
                        {LAB_BATCHES.map((batch) => {
                          const isSelected = batch.lotId === selectedBatch.lotId;
                          return (
                            <button
                              key={batch.lotId}
                              type="button"
                              onClick={() => setSelectedLotId(batch.lotId)}
                              className={`w-full p-4 rounded-xl border text-left transition-colors flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-[#8B4500] text-white border-[#8B4500]'
                                  : 'bg-[#FCF9F4] text-[#181615] border-[#EAE0D2] hover:border-[#8B4500]'
                              }`}
                            >
                              <div>
                                <div className="font-mono-tabular text-xs font-semibold">
                                  {batch.lotId} · {batch.cultivar}
                                </div>
                                <div
                                  className={`text-xs mt-0.5 ${
                                    isSelected ? 'text-stone-100' : 'text-[#635E59]'
                                  }`}
                                >
                                  {batch.region}
                                </div>
                              </div>
                              <span className="font-mono-tabular text-xs font-medium shrink-0">
                                {batch.crocin440nm} Crocin
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="lg:col-span-7 bg-[#FCF9F4] rounded-2xl border border-[#EAE0D2] p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-[#EAE0D2]">
                        <div>
                          <div className="text-xs text-[#635E59] font-mono-tabular">
                            CERTIFICATE OF ANALYSIS · {selectedBatch.lotId}
                          </div>
                          <h3 className="font-display text-2xl font-semibold text-[#181615]">
                            {selectedBatch.cultivar}
                          </h3>
                        </div>
                        <span className="text-xs font-semibold text-[#8B4500]">
                          ISO 3632 Category I Passed
                        </span>
                      </div>

                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#DFCBB2] text-[11px] text-[#635E59]">
                              <th className="py-2.5 pr-4 font-medium">Assay Parameter</th>
                              <th className="py-2.5 px-4 font-medium">Method / Wavelength</th>
                              <th className="py-2.5 px-4 font-medium">ISO Grade I Standard</th>
                              <th className="py-2.5 pl-4 font-medium text-right">Orhues Result</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs sm:text-sm divide-y divide-[#EAE0D2] font-mono-tabular">
                            <tr>
                              <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                                Crocin (Coloring Strength)
                              </td>
                              <td className="py-3 px-4 text-[#635E59]">440 nm UV-Vis</td>
                              <td className="py-3 px-4 text-[#635E59]">≥ 200</td>
                              <td className="py-3 pl-4 text-right font-semibold text-[#8B4500]">
                                {selectedBatch.crocin440nm}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                                Picrocrocin (Bitterness)
                              </td>
                              <td className="py-3 px-4 text-[#635E59]">257 nm UV-Vis</td>
                              <td className="py-3 px-4 text-[#635E59]">≥ 70</td>
                              <td className="py-3 pl-4 text-right font-semibold text-[#181615]">
                                {selectedBatch.picrocrocin257nm}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                                Safranal (Volatile Aroma)
                              </td>
                              <td className="py-3 px-4 text-[#635E59]">330 nm UV-Vis</td>
                              <td className="py-3 px-4 text-[#635E59]">20 – 50</td>
                              <td className="py-3 pl-4 text-right font-semibold text-[#181615]">
                                {selectedBatch.safranal330nm}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                                Moisture &amp; Volatile Matter
                              </td>
                              <td className="py-3 px-4 text-[#635E59]">ISO 3632 Gravimetric</td>
                              <td className="py-3 px-4 text-[#635E59]">≤ 12.0%</td>
                              <td className="py-3 pl-4 text-right font-semibold text-[#181615]">
                                {selectedBatch.moisturePercent}%
                              </td>
                            </tr>
                            <tr>
                              <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                                Floral Waste / Yellow Style
                              </td>
                              <td className="py-3 px-4 text-[#635E59]">Physical Gravimetric</td>
                              <td className="py-3 px-4 text-[#635E59]">≤ 0.5%</td>
                              <td className="py-3 pl-4 text-right font-semibold text-[#181615]">
                                {selectedBatch.floralWastePercent}%
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAE0D2] text-xs">
                        <div>
                          <span className="text-[#635E59]">Quality Lead: </span>
                          <span className="font-medium text-[#181615]">{selectedBatch.harvesterLead}</span>
                        </div>
                        <div>
                          <span className="text-[#635E59]">Dehydration Protocol: </span>
                          <span className="font-medium text-[#181615]">{selectedBatch.dryingProtocol}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: OUR STORY ================= */}
        {activePage === 'Our Story' && (
          <>
            {renderPageHeader(
              'Our Story',
              'Rare. Redefined. Revered.',
              'Founded in Thrissur, Kerala, Orhues bridges centuries-old Kashmiri and Khorasan saffron heritage with precision Controlled-Environment Agriculture.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6 space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider">
                    Genesis in Thrissur, Kerala
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                    Redefining Where and How the World’s Most Precious Spice Blooms
                  </h2>
                  <p className="text-base text-[#4A4540] leading-relaxed">
                    For centuries, authentic <em>Crocus sativus</em> cultivation was restricted to narrow high-altitude belts vulnerable to unseasonal rainfall, soil pathogens, and climate volatility. Furthermore, retail spice markets remained plagued by dyed fillers and degraded crocin potency.
                  </p>
                  <p className="text-base text-[#4A4540] leading-relaxed">
                    At <strong>Orhues</strong> in Thrissur, Kerala, our agronomists and climate engineers developed proprietary indoor vertical aeroponic chambers that recreate the exact crisp 8°C night temperatures, morning mist, and solar spectrum of 1,850-meter alpine terraces—right in the heart of Kerala.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleNavigate('Technology')}
                      className="px-6 py-3 rounded-full bg-[#8B4500] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Explore Our Technology
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate('Shop')}
                      className="px-6 py-3 rounded-full border border-[#8B4500] text-[#8B4500] text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Visit the Shop
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-[#EAE0D2]">
                    <ResilientImage
                      src={INDOOR_TECH_IMAGE}
                      alt="Orhues indoor vertical saffron cultivation facility in Thrissur, Kerala"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2]">
                  <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">01. RARE</div>
                  <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                    Uncompromising Purity
                  </h3>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    Every gram of Orhues saffron is harvested from 155+ hand-plucked blossoms, stripped solely of the crimson tripartite stigma, and tested to exceed 284–292 Crocin coloring units.
                  </p>
                </div>
                <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2]">
                  <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">02. REDEFINED</div>
                  <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                    Precision CEA Agronomy
                  </h3>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    Our vertical climate chambers eliminate soil-borne Fusarium rot and erratic weather, empowering growers across India with predictable, pesticide-free harvests.
                  </p>
                </div>
                <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2]">
                  <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">03. REVERED</div>
                  <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                    Gastronomy &amp; Wellness
                  </h3>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    From pure Imperial Mongra threads to Western Ghats Saffron Infused Honey and Royal Saffron Tea, every creation honors Ayurvedic wellness and fine culinary craft.
                  </p>
                </div>
              </div>

              {/* Explore Our Story Sub-Pages (Dropdown Pages) */}
              <div className="pt-6 border-t border-[#EAE0D2]">
                <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                  Deep Dive Into Orhues
                </div>
                <h3 className="font-display text-3xl font-semibold text-[#181615] mb-8">
                  Explore Our Story Chapters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">
                        CHAPTER 01 · BOTANY, CORM QUALITY &amp; CEA AGRONOMY
                      </div>
                      <h4 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                        Indoor Cultivation
                      </h4>
                      <p className="text-sm text-[#4A4540] leading-relaxed mb-6">
                        Discover the botanical anatomy of <em>Crocus sativus</em>, how precision indoor aeroponics transforms cultivation, mother corm quality standards, and corm caliber sizing.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('Indoor Cultivation')}
                      className="w-full py-3 px-5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore Indoor Cultivation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">
                        CHAPTER 02 · PEOPLE &amp; MISSION
                      </div>
                      <h4 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                        About Us
                      </h4>
                      <p className="text-sm text-[#4A4540] leading-relaxed mb-6">
                        Meet the Orhues leadership, multidisciplinary agronomy and engineering teams in Thrissur, our founding story, and what we do.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('About Us')}
                      className="w-full py-3 px-5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore About Us</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: INDOOR CULTIVATION ================= */}
        {activePage === 'Indoor Cultivation' && (
          <>
            {renderPageHeader(
              'Indoor Cultivation',
              'The Botany, Phytochemistry & Precision Cultivation of Crocus Sativus',
              'Understand why saffron is revered as Red Gold, how each blossom forms its three crimson stigmas, mother corm quality & caliber sizing, and how Orhues cultivates heritage stock through indoor aeroponic systems.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6 space-y-16">
              {/* Section 1: Botanical Anatomy & Triploid Biology */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10">
                <div className="lg:col-span-6 space-y-5">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider">
                    01 · Botanical Anatomy &amp; Heritage
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                    The Miracle of the Triploid Autumn Crocus
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    True saffron derives from <em>Crocus sativus L.</em>, an autumn-flowering perennial geophyte of the family <em>Iridaceae</em>. Because it is a sterile triploid plant (3n = 24 chromosomes), it produces no viable seeds—meaning every single saffron flower on earth must be propagated vegetatively from underground mother corms.
                  </p>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    Each lilac-purple blossom opens at dawn to reveal three golden stamens and a single central pistil that divides into <strong>three vivid crimson stigma filaments</strong> (25–32 mm long). Only these three crimson stigmas contain the prized apocarotenoids—requiring <strong>150 to 170 hand-picked flowers</strong> to cure a single gram of dry Orhues saffron.
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2]">
                      <div className="font-mono-tabular text-lg sm:text-xl font-semibold text-[#8B4500]">
                        Crocin
                      </div>
                      <div className="text-xs text-[#635E59] mt-1">
                        Water-soluble carotenoid delivering luminous golden-crimson color (440 nm)
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2]">
                      <div className="font-mono-tabular text-lg sm:text-xl font-semibold text-[#8B4500]">
                        Picrocrocin
                      </div>
                      <div className="text-xs text-[#635E59] mt-1">
                        Monoterpene glycoside responsible for saffron’s noble earthy bitterness (257 nm)
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2]">
                      <div className="font-mono-tabular text-lg sm:text-xl font-semibold text-[#8B4500]">
                        Safranal
                      </div>
                      <div className="text-xs text-[#635E59] mt-1">
                        Volatile essential oil formed during precision curing, creating honeyed aroma (330 nm)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#EAE0D2]">
                    <ResilientImage
                      src={BOTANICAL_IMAGE}
                      alt="Macro close-up of Crocus sativus saffron blossoms and crimson stigmas"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Saffron Cultivation Architecture (Traditional vs CEA Aeroponics) */}
              <div className="space-y-8">
                <div className="max-w-3xl">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                    02 · Saffron Cultivation Methodologies
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] mb-3">
                    How Saffron Is Cultivated: Highland Terraces vs. Indoor CEA Chambers
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    <em>Crocus sativus</em> follows an inverted phenological calendar: it aestivates (sleeps) during hot dry summers, wakes to flower in cool autumn mornings, and grows vegetative leaves and daughter corms through winter. Orhues supports both highland raised-bed growers and controlled-environment indoor cultivators.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl border border-[#EAE0D2] p-8 space-y-4">
                    <div className="text-xs font-mono-tabular text-[#8B4500] uppercase">
                      METHOD A · CONTROLLED-ENVIRONMENT AEROPONICS (CEA)
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#181615]">
                      Precision Vertical Indoor Cultivation
                    </h3>
                    <p className="text-sm text-[#4A4540] leading-relaxed">
                      During the summer dormancy and autumn flowering phases, mother corms draw 100% of their energy from internal starch reserves rather than soil. By arranging Caliber 10/+ corms in perforated vertical trays inside thermally insulated rooms, we trigger dense, synchronized blooming anywhere in India.
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4540] pt-2">
                      <li>• <strong>Summer Floral Incubation (Jun–Aug):</strong> 25°C–27°C at 65% RH initiates floral meristem differentiation inside the dormant corm.</li>
                      <li>• <strong>Autumn Anthesis Induction (Oct–Nov):</strong> Stepping down to 16°C day / 8°C night with 80% ultrasonic mist and targeted PAR light stimulates 2–3 blossoms per corm.</li>
                      <li>• <strong>Zero Soil Contamination:</strong> Blossoms open in a cleanroom environment free of dust, unseasonal rain damage, or rodents.</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#EAE0D2] p-8 space-y-4">
                    <div className="text-xs font-mono-tabular text-[#8B4500] uppercase">
                      METHOD B · RAISED-BED &amp; HYBRID SOIL MULTIPLICATION
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#181615]">
                      Friable Loam &amp; Post-Harvest Corm Propagation
                    </h3>
                    <p className="text-sm text-[#4A4540] leading-relaxed">
                      Following the November indoor flower harvest, mother corms are transplanted into well-drained friable sandy-loam beds (pH 6.5–7.5) or chilled nutrient media so their grass-like leaves can photosynthesize and form 4 to 7 new daughter corms per mother bulb.
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4540] pt-2">
                      <li>• <strong>Planting Depth &amp; Spacing:</strong> 12–15 cm deep on 20 cm raised ridges to prevent waterlogging and corm asphyxiation.</li>
                      <li>• <strong>Organic Mineral Nutrition:</strong> Composted farmyard manure, wood ash potassium, and beneficial <em>Trichoderma viride</em> bio-shield.</li>
                      <li>• <strong>Spring Tunic Curing (Apr–May):</strong> Foliage naturally senesces as soil warms; plump replacement corms are lifted, cleaned, and graded for the next cycle.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 (Moved from Quality Checks): Saffron Corm Quality & Anatomical Inspection */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10">
                <div className="lg:col-span-6 space-y-5">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider">
                    03 · Saffron Corm Quality Standards
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                    What Defines a High-Yielding Mother Corm
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    In saffron cultivation, harvest success is determined months before blooming by the physiological health and starch density of the <em>Crocus sativus</em> corm. At Orhues, every bulb is individually hand-inspected across five strict anatomical criteria before approval.
                  </p>
                  <div className="space-y-3 text-xs sm:text-sm text-[#4A4540]">
                    <div className="p-4 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2]">
                      <strong className="text-[#181615] block mb-0.5">
                        1. Intact Fibrous Brown Tunic Coat
                      </strong>
                      Protects the fleshy starch core from desiccation during summer incubation and shields against airborne fungal spores.
                    </div>
                    <div className="p-4 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2]">
                      <strong className="text-[#181615] block mb-0.5">
                        2. Dominant Apical Meristem Buds (1–3 Primary Shoots)
                      </strong>
                      Verified under stereomicroscopy during late July to confirm healthy floral primordia formation prior to dispatch.
                    </div>
                    <div className="p-4 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2]">
                      <strong className="text-[#181615] block mb-0.5">
                        3. Clean, Unscarred Basal Root Plate
                      </strong>
                      Must be completely free of dark sunken lesions, soft spots, mechanical cuts, or remnants of decayed mother plates.
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#EAE0D2]">
                    <ResilientImage
                      src={CORMS_IMAGE}
                      alt="Graded Caliber 10/+ Crocus sativus saffron mother corms"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4 (Moved from Quality Checks): Saffron Corm Size & Caliber Grading Matrix */}
              <div className="bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10 space-y-6">
                <div className="max-w-3xl">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                    04 · Corm Size &amp; Weight Classification
                  </div>
                  <h2 className="font-display text-3xl font-semibold text-[#181615] mb-2">
                    Saffron Corm Size vs. First-Year Flowering Potential
                  </h2>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    Corm weight and equatorial diameter directly dictate whether a bulb will flower in its very first autumn or only produce vegetative leaves. Orhues precision-sieves all corms into four standardized calibers:
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#DFCBB2] text-xs uppercase tracking-wider text-[#635E59] bg-[#FCF9F4]">
                        <th className="py-3.5 px-4 font-semibold">Corm Grade / Caliber</th>
                        <th className="py-3.5 px-4 font-semibold">Equatorial Diameter</th>
                        <th className="py-3.5 px-4 font-semibold">Individual Corm Weight</th>
                        <th className="py-3.5 px-4 font-semibold">Year-1 Bloom Output</th>
                        <th className="py-3.5 px-4 font-semibold">Recommended Application</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm divide-y divide-[#EAE0D2] font-mono-tabular">
                      <tr>
                        <td className="py-4 px-4 font-sans font-semibold text-[#8B4500]">
                          Caliber 10/+ (Jumbo Elite)
                        </td>
                        <td className="py-4 px-4 text-[#181615]">3.5 cm – 4.5+ cm</td>
                        <td className="py-4 px-4 text-[#181615]">14.0 g – 22.0 g</td>
                        <td className="py-4 px-4 font-semibold text-[#8B4500]">
                          2.2 – 3.0 Flowers / Corm
                        </td>
                        <td className="py-4 px-4 font-sans text-[#4A4540]">
                          Indoor CEA Aeroponic Trays &amp; Immediate Commercial Yield
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-sans font-semibold text-[#181615]">
                          Caliber 9/10 (Commercial Grade A)
                        </td>
                        <td className="py-4 px-4 text-[#181615]">2.8 cm – 3.4 cm</td>
                        <td className="py-4 px-4 text-[#181615]">10.0 g – 13.5 g</td>
                        <td className="py-4 px-4 font-semibold text-[#181615]">
                          1.2 – 1.8 Flowers / Corm
                        </td>
                        <td className="py-4 px-4 font-sans text-[#4A4540]">
                          Multi-Year Raised-Bed Estates &amp; Hybrid Soil Plots
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-sans font-semibold text-[#181615]">
                          Caliber 8/9 (Standard Nursery)
                        </td>
                        <td className="py-4 px-4 text-[#181615]">2.3 cm – 2.7 cm</td>
                        <td className="py-4 px-4 text-[#181615]">8.0 g – 9.8 g</td>
                        <td className="py-4 px-4 text-[#635E59]">
                          0.4 – 0.8 Flowers / Corm
                        </td>
                        <td className="py-4 px-4 font-sans text-[#4A4540]">
                          Field Bulking for Year-2 &amp; Year-3 Harvest Expansion
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-sans font-medium text-[#635E59]">
                          Under Caliber 8 (Feeder Cormlets)
                        </td>
                        <td className="py-4 px-4 text-[#635E59]">&lt; 2.2 cm</td>
                        <td className="py-4 px-4 text-[#635E59]">2.0 g – 7.5 g</td>
                        <td className="py-4 px-4 text-[#635E59]">
                          Non-Flowering in Year 1
                        </td>
                        <td className="py-4 px-4 font-sans text-[#635E59]">
                          Never sold as flowering stock; retained in nursery beds to fatten
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 5: Interactive 4-Stage Cultivation Blueprint & Yield Calculator */}
              <div className="pt-4">
                <CultivationPlanner
                  onAddCormsToBag={(product, variant, quantity) => {
                    handleAddToCart(product, variant, quantity);
                    setIsCartOpen(true);
                  }}
                />
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: ABOUT US ================= */}
        {activePage === 'About Us' && (
          <>
            {renderPageHeader(
              'About Us',
              'Our Story, Leadership, Multidisciplinary Team & What We Do at Orhues',
              'Headquartered in Thrissur, Kerala, Orhues unites agricultural biotechnology, precision climate engineering, and luxury botanical craftsmanship.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6 space-y-16">
              {/* Section 1: Our Story */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10">
                <div className="lg:col-span-6 space-y-5">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider">
                    01 · Our Story
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                    Pioneering Precision Saffron Agronomy in Kerala
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    Orhues began in Thrissur, Kerala with a bold scientific question: <em>Can the exact micro-climate of a 1,850-meter Himalayan saffron terrace be engineered inside a zero-pesticide indoor sanctuary in South India?</em>
                  </p>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    After multi-cycle trials calibrating diurnal chiller curves, ultrasonic misting profiles, and custom photon spectra on high-caliber Kashmiri mother corms, our chambers achieved consistent Grade I harvests reaching 292 Crocin units. Today, Orhues serves both discerning culinary households and aspiring saffron entrepreneurs across India.
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-[#EAE0D2]">
                    <ResilientImage
                      src={INDOOR_TECH_IMAGE}
                      alt="Orhues Controlled-Environment Saffron Facility in Thrissur, Kerala"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: What We Do */}
              <div className="space-y-8">
                <div className="max-w-3xl">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                    02 · What We Do
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] mb-2">
                    Four Integrated Pillars of the Orhues Ecosystem
                  </h2>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    We operate across the complete value chain of <em>Crocus sativus</em>—from mother corm genetics and turnkey chamber engineering to luxury consumer creations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">PILLAR 01</div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                        Cleanroom Saffron Cultivation
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed mb-5">
                        Year-round management of dormant and flowering <em>Crocus sativus</em> mother corms inside our sterile Thrissur vertical aeroponic chambers.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('Technology')}
                      className="text-xs font-bold uppercase tracking-wider text-[#8B4500] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Technology</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">PILLAR 02</div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                        Luxury Saffron Apothecary
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed mb-5">
                        Direct-to-consumer single-estate Saffron Threads, Raw Saffron Infused Honey, Luxury Saffron Tea, and certified Caliber 10/+ mother corms.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('Shop')}
                      className="text-xs font-bold uppercase tracking-wider text-[#8B4500] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Shop</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">PILLAR 03</div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                        Turnkey CEA Infrastructure
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed mb-5">
                        Custom design, PUF thermal insulation, HVAC chiller integration, and IoT automation for 100 to 1,000+ sq. ft. commercial grow rooms.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('Infrastructure')}
                      className="text-xs font-bold uppercase tracking-wider text-[#8B4500] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Infrastructure</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">PILLAR 04</div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                        Grower Training Academy
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed mb-5">
                        Hands-on workshops and 12-month agronomic mentorship equipping farmers, agri-entrepreneurs, and researchers across India.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('Training')}
                      className="text-xs font-bold uppercase tracking-wider text-[#8B4500] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Training</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Leadership */}
              <div className="space-y-8">
                <div className="max-w-3xl">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                    03 · Leadership
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] mb-2">
                    Guided by Agronomy, Engineering &amp; Quality Stewardship
                  </h2>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    Our leadership team in Thrissur brings together decades of expertise in controlled-environment horticulture, HVAC thermal systems, and analytical food chemistry.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                  {[
                    {
                      role: 'FOUNDER & MANAGING DIRECTOR',
                      name: 'Aravind Menon',
                      focus: 'Vision, Turnkey CEA Strategy & Grower Partnerships',
                      bio: 'Spearheaded Orhues’s indoor saffron initiative in Thrissur, bridging precision vertical farming architecture with direct-to-consumer luxury spice traceability across India.'
                    },
                    {
                      role: 'DIRECTOR OF AGRONOMY & PHYTOPATHOLOGY',
                      name: 'Dr. Meera Krishnan, Ph.D.',
                      focus: 'Corm Vernalization, Floral Meristem Biology & Training',
                      bio: 'Leads mother corm caliber grading, dormancy incubation protocols, and post-harvest daughter corm multiplication trials for both aeroponic and raised-bed growers.'
                    },
                    {
                      role: 'HEAD OF CEA SYSTEMS & QUALITY ASSURANCE',
                      name: 'Siddharth Varma',
                      focus: 'IoT Micro-Climate Engineering & ISO 3632-2 Lab Assays',
                      bio: 'Architects Orhues’s automated HVAC chiller and ultrasonic misting loops while overseeing UV-Vis spectrophotometric testing of every harvest lot.'
                    }
                  ].map((leader, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-[#EAE0D2] p-7 space-y-3"
                    >
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold">
                        {leader.role}
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        {leader.name}
                      </h3>
                      <div className="text-xs font-medium text-[#635E59] pb-3 border-b border-[#EAE0D2]">
                        {leader.focus}
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Our Team */}
              <div className="bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10 space-y-8">
                <div className="max-w-3xl">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                    04 · Our Team
                  </div>
                  <h2 className="font-display text-3xl font-semibold text-[#181615] mb-2">
                    The Specialist Divisions Behind Every Bloom
                  </h2>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    Every gram of Orhues saffron and every commissioned grow room is supported by four dedicated specialist teams working in concert at our Thrissur facility.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-5 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2] space-y-2">
                    <div className="font-mono-tabular text-xs font-semibold text-[#8B4500]">
                      DIVISION 01
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#181615]">
                      Corm Nursery &amp; Pathology Team
                    </h3>
                    <p className="text-xs text-[#4A4540] leading-relaxed">
                      Inspects, grades, and bio-shields thousands of Caliber 10/+ mother corms, monitoring apical shoot development through summer dormancy.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2] space-y-2">
                    <div className="font-mono-tabular text-xs font-semibold text-[#8B4500]">
                      DIVISION 02
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#181615]">
                      Climate &amp; IoT Engineering Team
                    </h3>
                    <p className="text-xs text-[#4A4540] leading-relaxed">
                      Fabricates insulated PUF chambers, calibrates redundant chillers, and monitors 24/7 sensor telemetry for Orhues and partner farms.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2] space-y-2">
                    <div className="font-mono-tabular text-xs font-semibold text-[#8B4500]">
                      DIVISION 03
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#181615]">
                      Cleanroom Harvest &amp; Assay Team
                    </h3>
                    <p className="text-xs text-[#4A4540] leading-relaxed">
                      Performs dawn flower picking, surgical tripartite stigma separation, silk-sieve dehydration, and ISO 3632 UV-Vis batch certification.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2] space-y-2">
                    <div className="font-mono-tabular text-xs font-semibold text-[#8B4500]">
                      DIVISION 04
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#181615]">
                      Grower Academy &amp; Apothecary Concierge
                    </h3>
                    <p className="text-xs text-[#4A4540] leading-relaxed">
                      Conducts hands-on workshops in Thrissur, guides trainees through their first harvest, and fulfills nationwide apothecary dispatches.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}


        {/* ================= PAGE: OUR SERVICES ================= */}
        {activePage === 'Our Services' && (
          <>
            {renderPageHeader(
              'Our Services',
              'Empowering Commercial & Home Saffron Cultivators',
              'Orhues provides end-to-end knowledge transfer, hands-on grower training in Thrissur, and turnkey Controlled-Environment Agriculture (CEA) infrastructure.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {/* Service Card 1: Training */}
                <div className="bg-white rounded-2xl border border-[#EAE0D2] overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-[#F4ECE1]">
                      <ResilientImage
                        src={BOTANICAL_IMAGE}
                        alt="Orhues hands-on saffron cultivation training"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>Academy &amp; Mentorship</span>
                      </div>
                      <h2 className="font-display text-3xl font-semibold text-[#181615] mb-3">
                        Training
                      </h2>
                      <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed mb-5">
                        Comprehensive practical workshops held at our Thrissur facility and online. Master corm grading, dormancy incubation, thermoperiodic bloom induction, cleanroom stigma separation, dehydrator curing, and post-harvest soil multiplication.
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#4A4540] mb-6">
                        <li>• 2-Day Intensive On-Site Workshop in Thrissur, Kerala</li>
                        <li>• Complete 12-Month Agronomic SOP Manual &amp; Climate Charts</li>
                        <li>• 1-on-1 Post-Training Harvest Support &amp; Buyback Guidance</li>
                      </ul>
                    </div>
                  </div>
                  <div className="px-8 pb-8">
                    <button
                      type="button"
                      onClick={() => handleNavigate('Training')}
                      className="w-full py-3.5 px-6 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Go to Training Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Service Card 2: Infrastructure */}
                <div className="bg-white rounded-2xl border border-[#EAE0D2] overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-[#F4ECE1]">
                      <ResilientImage
                        src={INDOOR_TECH_IMAGE}
                        alt="Orhues turnkey indoor vertical saffron farming infrastructure"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                        <Building2 className="w-4 h-4" />
                        <span>Turnkey Engineering</span>
                      </div>
                      <h2 className="font-display text-3xl font-semibold text-[#181615] mb-3">
                        Infrastructure
                      </h2>
                      <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed mb-5">
                        Custom-engineered indoor aeroponic saffron chambers from 100 sq. ft. pilot units to 1,000+ sq. ft. commercial estates. Includes PUF insulated panels, precision HVAC chillers, ultrasonic humidifiers, full-spectrum LEDs, and modular vertical racking.
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#4A4540] mb-6">
                        <li>• Food-Grade Multi-Tier Vertical Aeroponic Racks &amp; Trays</li>
                        <li>• Automated IoT Temperature, Humidity, CO₂ &amp; Lux Controllers</li>
                        <li>• Certified Caliber 10/+ Mother Corm Supply &amp; Commissioning</li>
                      </ul>
                    </div>
                  </div>
                  <div className="px-8 pb-8">
                    <button
                      type="button"
                      onClick={() => handleNavigate('Infrastructure')}
                      className="w-full py-3.5 px-6 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Go to Infrastructure Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: TRAINING ================= */}
        {activePage === 'Training' && (
          <>
            {renderPageHeader(
              'Training',
              'Orhues Saffron Cultivation Academy — Thrissur, Kerala',
              'Master the science and economics of indoor aeroponic and raised-bed saffron cultivation through hands-on chamber immersion with our lead agronomists.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6 space-y-14">
              {/* Single Section: Training at a Glance */}
              <div className="bg-white rounded-2xl border border-[#EAE0D2] p-8 sm:p-10 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#181615]">
                        Training at a Glance
                      </h3>
                    </div>
                    <span className="text-xs font-mono-tabular text-[#635E59]">
                      100% Practical Cleanroom &amp; Agronomy Curriculum
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed max-w-3xl">
                    Learn to grow saffron indoors with the team behind Orhues. Our practical training covers everything from understanding the crop and setting up a controlled grow room to automation, harvest and the business side — so you leave ready to plan your own cultivation setup.
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        label: 'TRAINING FORMAT',
                        value: 'Hands-On Chamber Immersion',
                        detail: 'Live practice inside active aeroponic saffron grow rooms in Thrissur.'
                      },
                      {
                        label: 'CORE CURRICULUM',
                        value: 'Crop, Room Setup & Automation',
                        detail: 'Corm biology, PUF insulation, HVAC chillers, VPD/CO₂ sensors & 365-day scheduling.'
                      },
                      {
                        label: 'HARVEST & BUSINESS',
                        value: 'ISO 3632 Grading & ROI Model',
                        detail: 'Dawn stigma separation, precision dehydration, CAPEX/OPEX & market linkage.'
                      },
                      {
                        label: 'POST-TRAINING SUPPORT',
                        value: 'Certificate & Grower Mentorship',
                        detail: 'Official Orhues certificate, stage parameter recipes & mother corm access.'
                      }
                    ].map((glance, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2] space-y-1.5"
                      >
                        <div className="text-[10px] font-mono-tabular text-[#8B4500] font-semibold uppercase">
                          {glance.label}
                        </div>
                        <div className="font-display text-xl font-semibold text-[#181615]">
                          {glance.value}
                        </div>
                        <p className="text-xs text-[#4A4540] leading-relaxed">
                          {glance.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {[
                  {
                    tier: 'Batch 01 · Foundation',
                    title: '1-Day Indoor Aeroponic Masterclass',
                    price: '₹4,500 / Trainee',
                    duration: 'Full Day (9:00 AM – 5:30 PM) · Thrissur',
                    topics: [
                      'Crocus sativus biology & reverse-season phenology',
                      'Selecting Caliber 10/+ mother corms vs non-blooming bulbs',
                      'Chamber temperature, RH% & lux scheduling from June to November',
                      'Live cleanroom tour & hands-on stigma stripping practice'
                    ]
                  },
                  {
                    tier: 'Batch 02 · Commercial Pro',
                    title: '3-Day Commercial CEA Residency',
                    price: '₹14,500 / Trainee',
                    duration: '3 Days Intensive · Includes Starter Corm Kit',
                    topics: [
                      'Complete HVAC chiller, PUF insulation & airflow engineering',
                      'Preventing Fusarium & Penicillium corm rot during dormancy',
                      'ISO 3632 Grade I dehydration curves & packaging compliance',
                      'Post-harvest winter soil transplanting for 4x corm multiplication'
                    ]
                  },
                  {
                    tier: 'Batch 03 · Institutional',
                    title: '12-Month Farm Mentorship & Audit',
                    price: 'Custom Retainer',
                    duration: 'Year-Round Remote + On-Site Commissioning',
                    topics: [
                      'Custom site blueprint for your existing room or agricultural plot',
                      'Bi-weekly video inspection of apical shoots and root primordia',
                      'Quality assay testing at Orhues Lab in Thrissur',
                      'Direct harvest grading & B2B market linkage support'
                    ]
                  }
                ].map((prog, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#EAE0D2] p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">
                        {prog.tier}
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615] mb-1">
                        {prog.title}
                      </h3>
                      <div className="text-xs text-[#635E59] mb-4">{prog.duration}</div>
                      <div className="font-mono-tabular text-xl font-semibold text-[#8B4500] pb-4 mb-4 border-b border-[#EAE0D2]">
                        {prog.price}
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4540] mb-6">
                        {prog.topics.map((t, i) => (
                          <li key={i} className="leading-relaxed">
                            • {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setInquiryTopic(`Training Enrollment: ${prog.title}`);
                        handleNavigate('Contact');
                      }}
                      className="w-full py-3 px-5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Enroll / Reserve Seat
                    </button>
                  </div>
                ))}
              </div>

              {/* Section: Upcoming Batches */}
              <div className="bg-white rounded-2xl border border-[#EAE0D2] p-7 sm:p-10 space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-2xl space-y-2">
                    <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider">
                      Orhues Academy Schedule · Thrissur, Kerala
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                      Upcoming Batches
                    </h2>
                    <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                      Small-cohort, hands-on indoor saffron cultivation sessions conducted inside our active Controlled-Environment Agriculture (CEA) chambers in Thrissur.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/918089964529?text=Hello%20Orhues%2C%20I%20would%20like%20to%20check%20seat%20availability%20for%20your%20Upcoming%20Training%20Batches."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border border-[#8B4500] text-[#8B4500] hover:bg-[#FCF8F2] text-xs font-bold uppercase tracking-wider transition-colors self-start md:self-auto"
                  >
                    Inquire via WhatsApp →
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      batchCode: 'BATCH ORH-T11 · THRISSUR',
                      dates: '15 – 17 November 2026',
                      program: '3-Day Commercial CEA Residency',
                      timing: '9:00 AM – 5:30 PM IST',
                      seats: '4 Seats Remaining (Max 12)',
                      status: 'Registration Open'
                    },
                    {
                      batchCode: 'BATCH ORH-T12 · THRISSUR',
                      dates: '29 November 2026',
                      program: '1-Day Indoor Aeroponic Masterclass',
                      timing: '9:00 AM – 5:30 PM IST',
                      seats: '6 Seats Remaining (Max 15)',
                      status: 'Registration Open'
                    },
                    {
                      batchCode: 'BATCH ORH-T13 · THRISSUR',
                      dates: '12 – 14 December 2026',
                      program: '3-Day Commercial CEA Residency',
                      timing: '9:00 AM – 5:30 PM IST',
                      seats: 'Early Bird Open (Max 12)',
                      status: 'Filling Fast'
                    }
                  ].map((batch, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#FCF9F4] border border-[#EAE0D2] flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono-tabular font-semibold text-[#8B4500]">
                            {batch.batchCode}
                          </span>
                          <span className="text-[11px] font-semibold text-[#2E6B3E] bg-[#E9F5EC] px-2.5 py-0.5 rounded-full">
                            {batch.status}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#181615]">
                          {batch.dates}
                        </h3>
                        <div className="text-sm font-semibold text-[#4A4540]">
                          {batch.program}
                        </div>
                        <div className="text-xs text-[#635E59] space-y-1 pt-2 border-t border-[#EAE0D2]">
                          <div>Schedule: {batch.timing}</div>
                          <div>Availability: {batch.seats}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setInquiryTopic(`Batch Registration: ${batch.batchCode} (${batch.dates})`);
                          handleNavigate('Contact');
                        }}
                        className="w-full py-3 px-4 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Book This Batch
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Previous Batches (Moments From Our Training Photos + Embedded Student Testimonial Videos) */}
              <div className="bg-white rounded-2xl border border-[#EAE0D2] p-7 sm:p-10 space-y-12">
                <div className="max-w-3xl space-y-2">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider">
                    Alumni &amp; Past Cohorts · Thrissur Facility
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                    Previous Batches
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    Explore moments from our completed indoor saffron cultivation cohorts in Thrissur and watch direct video testimonials from trainees who have launched their own controlled-environment saffron setups.
                  </p>
                </div>

                {/* Sub-section 1: Moments From Our Training (Photos) */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        Training Photo Archive
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#181615]">
                        Moments From Our Training
                      </h3>
                    </div>
                    <span className="text-xs text-[#635E59]">
                      Batches ORH-T01 through ORH-T10 · Thrissur, Kerala
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        img: TRAINING_BG_IMAGE,
                        batch: 'BATCH ORH-T10 · OCT 2026',
                        title: 'Cleanroom Walkthrough & Rack Inspection',
                        caption: 'Trainees examining multi-tier vertical airflow and misting nozzles inside Chamber A.'
                      },
                      {
                        img: CORMS_IMAGE,
                        batch: 'BATCH ORH-T09 · SEP 2026',
                        title: 'Mother Corm Caliber Grading Workshop',
                        caption: 'Hands-on sorting of Caliber 10/+ dormant corms and apical shoot inspection.'
                      },
                      {
                        img: TECH_BG_IMAGE,
                        batch: 'BATCH ORH-T08 · AUG 2026',
                        title: 'AI Parameter & 365-Day Schedule Setup',
                        caption: 'Configuring flowering and corm multiplication stage recipes on the Orhues controller.'
                      },
                      {
                        img: BOTANICAL_IMAGE,
                        batch: 'BATCH ORH-T07 · JUL 2026',
                        title: 'Dawn Anthesis & Stigma Stripping Practice',
                        caption: 'Practicing hygienic Super Negin crimson filament separation and silk-sieve drying.'
                      }
                    ].map((moment, idx) => (
                      <figure
                        key={idx}
                        className="rounded-2xl bg-[#FCF9F4] border border-[#EAE0D2] overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[4/3] w-full bg-[#F4ECE1] overflow-hidden">
                            <ResilientImage
                              src={moment.img}
                              alt={moment.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <figcaption className="p-5 space-y-1.5">
                            <div className="text-[10px] font-mono-tabular text-[#8B4500] font-semibold">
                              {moment.batch}
                            </div>
                            <h4 className="font-display text-xl font-semibold text-[#181615]">
                              {moment.title}
                            </h4>
                            <p className="text-xs text-[#4A4540] leading-relaxed">
                              {moment.caption}
                            </p>
                          </figcaption>
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>

                {/* Sub-section 2: Embedded Student Testimonial Videos (Native HTML5 Video — Not YouTube) */}
                <div className="pt-8 border-t border-[#EAE0D2] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        Direct Trainee Feedback
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#181615]">
                        Student Testimonial Videos
                      </h3>
                    </div>
                    <span className="text-xs text-[#635E59]">
                      Native Embedded Video Testimonials
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        student: 'Arun Krishnan',
                        location: 'Kochi, Kerala · Batch ORH-T09',
                        title: 'Converted a 180 sq. ft. Room into an Indoor Saffron Unit',
                        quote: '“The 3-day residency in Thrissur gave me the exact chiller, humidity, and corm grading blueprint I needed to start my own chamber without trial-and-error.”',
                        poster: TRAINING_BG_IMAGE,
                        videoSrc: '/videos/student-testimonial-1.mp4'
                      },
                      {
                        student: 'Dr. Meera Nandakumar',
                        location: 'Coimbatore, Tamil Nadu · Batch ORH-T08',
                        title: 'Precision Automation & Stage-Specific Recipes',
                        quote: '“Seeing the live flowering chamber and learning how to program separate parameters for flowering vs. corm multiplication gave our research team complete clarity.”',
                        poster: INDOOR_TECH_IMAGE,
                        videoSrc: '/videos/student-testimonial-2.mp4'
                      },
                      {
                        student: 'Faisal Rahman',
                        location: 'Kozhikode, Kerala · Batch ORH-T10',
                        title: 'From Zero Agriculture Background to Commercial Setup',
                        quote: '“Orhues covered the entire business side—from room insulation and mother corm sourcing to ISO 3632 drying and market pricing.”',
                        poster: HERO_IMAGE,
                        videoSrc: '/videos/student-testimonial-3.mp4'
                      }
                    ].map((vid, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-[#FCF9F4] border border-[#EAE0D2] overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-video w-full bg-[#181615] relative overflow-hidden">
                            <video
                              controls
                              playsInline
                              preload="metadata"
                              poster={vid.poster}
                              className="w-full h-full object-cover"
                            >
                              <source src={vid.videoSrc} type="video/mp4" />
                              Your browser does not support native HTML5 video playback.
                            </video>
                          </div>
                          <div className="p-6 space-y-2.5">
                            <div className="text-[11px] font-mono-tabular text-[#8B4500] font-semibold">
                              {vid.location}
                            </div>
                            <h4 className="font-display text-xl font-semibold text-[#181615]">
                              {vid.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#4A4540] italic leading-relaxed">
                              {vid.quote}
                            </p>
                          </div>
                        </div>
                        <div className="px-6 pb-5 pt-3 border-t border-[#EAE0D2] flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#181615]">{vid.student}</span>
                          <span className="text-[#8B4500] font-mono-tabular">Verified Trainee</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section: Certificate — Earn Your Training Certificate */}
              <div className="bg-white rounded-2xl border border-[#EAE0D2] p-7 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider">
                      Certificate
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                      Earn Your Training Certificate
                    </h2>
                    <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                      Every participant who completes our hands-on training in Thrissur receives an official <strong>Orhues Indoor Saffron Cultivation Certificate</strong>—verifying practical competency in Controlled-Environment Agriculture (CEA) room setup, stage-specific parameter control, harvest handling, and commercial crop planning.
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#4A4540] pt-1">
                      <li>• Signed by Orhues Lead Agronomists &amp; CEA Engineering Division</li>
                      <li>• Includes lifetime access to updated cultivation parameter recipes</li>
                      <li>• Priority eligibility for certified Caliber 10/+ mother corm allocation</li>
                    </ul>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setInquiryTopic('Certified Indoor Saffron Training Enrollment');
                          handleNavigate('Contact');
                        }}
                        className="px-7 py-3.5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Enroll to Earn Your Certificate →
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#EAE0D2] bg-[#F4ECE1]">
                      <ResilientImage
                        src={TRAINING_BG_IMAGE}
                        alt="Earn Your Orhues Indoor Saffron Cultivation Training Certificate"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: INFRASTRUCTURE ================= */}
        {activePage === 'Infrastructure' && (
          <>
            {renderPageHeader(
              'Infrastructure',
              'Turnkey Controlled-Environment Saffron Chambers',
              'We design, fabricate, and commission precision vertical saffron cultivation rooms across India—complete with thermal insulation, climate automation, and certified mother corms.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6 space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10">
                <div className="lg:col-span-6 space-y-5">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider">
                    Modular Vertical Engineering
                  </div>
                  <h2 className="font-display text-3xl font-semibold text-[#181615]">
                    Built for Maximum Blossom Density per Square Foot
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    By stacking 7 to 9 levels of perforated food-grade aeroponic trays inside a thermally sealed room, a single 200 sq. ft. Orhues chamber holds as many flowering <em>Crocus sativus</em> corms as a quarter-acre traditional open field.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2]">
                      <div className="font-mono-tabular text-xl font-semibold text-[#8B4500]">
                        100 mm PUF
                      </div>
                      <div className="text-xs text-[#635E59] mt-1">
                        High-density thermal wall &amp; ceiling insulation panels
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2]">
                      <div className="font-mono-tabular text-xl font-semibold text-[#8B4500]">
                        ±0.4°C Precision
                      </div>
                      <div className="text-xs text-[#635E59] mt-1">
                        Automated diurnal chiller &amp; ultrasonic misting loop
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#EAE0D2]">
                    <ResilientImage
                      src={INDOOR_TECH_IMAGE}
                      alt="Orhues multi-tier vertical saffron infrastructure"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* 3 Turnkey Chamber Configurations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {[
                  {
                    code: 'MODULE A · 100 SQ. FT.',
                    name: 'Micro-Enterprise Chamber',
                    capacity: '3,500 – 4,500 Mother Corms',
                    specs: [
                      '4 Vertical Rack Units (7 Tiers high)',
                      '1.5 TR Precision Split Chiller + Dehumidifier',
                      'Full-Spectrum Horticultural LED Array',
                      'Ultrasonic Mist Generator & CO₂ Exhaust',
                      'Includes On-Site Installation & 2-Day Training'
                    ]
                  },
                  {
                    code: 'MODULE B · 250 SQ. FT.',
                    name: 'Commercial Estate Chamber',
                    capacity: '10,000 – 12,500 Mother Corms',
                    specs: [
                      '10 Vertical Rack Units (8 Tiers high)',
                      'Dual Redundant Commercial HVAC Chiller System',
                      'IoT Smartphone App Monitoring & Alarm Suite',
                      'Cleanroom Stigma Sorting & Silk Sieve Dehydrator',
                      'Includes 12-Month Agronomic Support'
                    ]
                  },
                  {
                    code: 'MODULE C · 500+ SQ. FT.',
                    name: 'Industrial Agro-Park Facility',
                    capacity: '25,000+ Mother Corms',
                    specs: [
                      'Custom Multi-Room Zoning & Airlock Entry',
                      'Industrial Ducted Laminar Airflow Architecture',
                      'ISO 3632 In-House Spectrophotometer Lab Kit',
                      'Dedicated Corm Dormancy & Vernalization Vault',
                      'Complete Turnkey Civil, MEP & Agronomy Delivery'
                    ]
                  }
                ].map((mod, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#EAE0D2] p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono-tabular text-[#8B4500] mb-2">
                        {mod.code}
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615] mb-1">
                        {mod.name}
                      </h3>
                      <div className="text-xs font-mono-tabular text-[#635E59] pb-4 mb-4 border-b border-[#EAE0D2]">
                        Capacity: {mod.capacity}
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4540] mb-6">
                        {mod.specs.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setInquiryTopic(`Infrastructure Quote: ${mod.name} (${mod.code})`);
                        handleNavigate('Contact');
                      }}
                      className="w-full py-3 px-5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Request Turnkey Proposal
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: TECHNOLOGY ================= */}
        {activePage === 'Technology' && (
          <>
            {renderPageHeader(
              'Technology',
              'AI-assisted precision cultivation',
              'Control the environment. Monitor every parameter. Automate cultivation. Track every stage. A tailor-made AI-assisted control and monitoring system designed specifically for precision indoor saffron cultivation.'
            )}

            <section className="py-16 max-w-[1280px] mx-auto px-6 space-y-20">
              {/* Top Quick Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:px-8">
                <div>
                  <p className="font-display text-2xl font-semibold text-[#181615] mt-0.5">
                    Purpose-Built Hardware, Sensor Telemetry &amp; 365-Day Crop Automation
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('tech-requirement-form');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-6 py-3.5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Talk to Us About Your Cultivation Requirement →
                  </button>
                  <a
                    href="https://wa.me/918089964529?text=Hello%20Orhues%2C%20I%20would%20like%20to%20discuss%20our%20indoor%20saffron%20cultivation%20technology%20requirements."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-full border border-[#8B4500] text-[#8B4500] hover:bg-[#FCF8F2] text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                  >
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>

              {/* Section: Saffron Indoor Cultivation Requirements */}
              <div className="bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10 space-y-8">
                <div className="max-w-3xl">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                    Environmental &amp; Facility Prerequisites
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] mb-3">
                    Saffron Indoor Cultivation Requirements
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    Successful indoor <em>Crocus sativus</em> cultivation requires a tightly sealed, hygienic micro-climate where every environmental variable can be independently controlled across both the flowering and corm multiplication stages.
                  </p>
                </div>
              </div>

              {/* Visual Gallery / Placeholder Images Section (Easy to replace later) */}
              <div className="space-y-8">
                <div className="max-w-3xl">
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] mb-2">
                    Inside the Orhues Precision Cultivation Environment
                  </h2>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    Visual overview of our climate-controlled vertical racks, IoT sensor nodes, flowering trays, and root-zone corm multiplication setups.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      img: TECH_BG_IMAGE,
                      tag: 'IMAGE SLOT 01 · AI CONTROLLER & SENSORS',
                      title: 'Centralized Climate & VPD Monitoring Node',
                      caption: 'Real-time temperature, humidity, CO₂, and light spectrum telemetry inside the grow room.'
                    },
                    {
                      img: INDOOR_TECH_IMAGE,
                      tag: 'IMAGE SLOT 02 · VERTICAL AEROPONIC RACKS',
                      title: 'Multi-Tier Indoor Saffron Flowering Chamber',
                      caption: 'Perforated food-grade vertical trays engineered for laminar airflow and uniform mist distribution.'
                    },
                    {
                      img: BOTANICAL_IMAGE,
                      tag: 'IMAGE SLOT 03 · FLOWERING STAGE',
                      title: 'Synchronized Dawn Anthesis Induction',
                      caption: 'Precision 16°C day / 8°C night diurnal cycling triggering high-crocin crimson stigmas.'
                    },
                    {
                      img: CORMS_IMAGE,
                      tag: 'IMAGE SLOT 04 · CORM MULTIPLICATION',
                      title: 'Root-Zone pH & EC Corm Bulking Protocol',
                      caption: 'Separate stage parameters tuned for vigorous daughter corm division and starch accumulation.'
                    }
                  ].map((slot, idx) => (
                    <figure
                      key={idx}
                      className="bg-white rounded-2xl border border-[#EAE0D2] overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[4/3] w-full bg-[#F4ECE1] overflow-hidden">
                          <ResilientImage
                            src={slot.img}
                            alt={slot.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <figcaption className="p-5 space-y-1.5">
                          <div className="text-[10px] font-mono-tabular text-[#8B4500] font-semibold">
                            {slot.tag}
                          </div>
                          <h3 className="font-display text-xl font-semibold text-[#181615]">
                            {slot.title}
                          </h3>
                          <p className="text-xs text-[#4A4540] leading-relaxed">
                            {slot.caption}
                          </p>
                        </figcaption>
                      </div>
                    </figure>
                  ))}
                </div>
              </div>

              {/* 3 x 4 Card Grid (12 Cards Total) */}
              <div className="space-y-8">
                <div className="max-w-3xl">
                  <div className="text-xs text-[#8B4500] font-semibold uppercase tracking-wider mb-2">
                    Integrated System Architecture
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                    12 Core Capabilities of the Orhues Cultivation OS
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1: Our Technology */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        01 · Our Technology
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Purpose-Built for Saffron.
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        Our technology combines environmental monitoring, automated control, scheduling and data tracking into one integrated cultivation system.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      Unified Hardware + Cloud Telemetry
                    </div>
                  </div>

                  {/* Card 2: Resource Management */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        02 · Resource Management
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Grow Better. Use Resources Better.
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        Precision control helps manage energy, water, environmental conditions and operating time according to crop requirements.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      Optimized Power, Water &amp; HVAC Runtime
                    </div>
                  </div>

                  {/* Card 3: Data Driven Agriculture */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        03 · Data-Driven Agriculture — Trace Back to Source
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Every Crop Has a Data Trail
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        Capture cultivation data throughout the production cycle — creating a traceable record from environmental conditions to crop outcome.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      End-to-End Batch Provenance
                    </div>
                  </div>

                  {/* Card 4: Traceability / Crop History */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        04 · Traceability / Crop History
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        From Cultivation to Crop History
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        Maintain a digital history of cultivation conditions, events, interventions and outcomes — giving you a clearer picture of how each crop was produced.
                      </p>
                      <p className="text-xs text-[#635E59] leading-relaxed">
                        Especially valuable for commercial growers, hospitals/research facilities, or regulated and high-value agriculture.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      Audit-Ready Digital Crop Ledger
                    </div>
                  </div>

                  {/* Card 5: Categories We Serve */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        05 · Categories We Serve
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Built for Different Cultivation Needs
                      </h3>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#4A4540] pt-1">
                        <li>• Commercial Saffron Growers</li>
                        <li>• Indoor Farms</li>
                        <li>• Research &amp; Experimental Cultivation</li>
                        <li>• Controlled Environment Agriculture</li>
                        <li>• Agricultural Institutions</li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      Scalable from Pilot Rooms to Agro-Parks
                    </div>
                  </div>

                  {/* Card 6: Set the Parameters */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        06 · Set the Parameters
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Stage-Specific Parameter Recipes
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        We set parameters separately for each distinct biological stage:
                      </p>
                      <div className="space-y-2 pt-1">
                        <div className="p-3 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2] text-xs">
                          <strong className="text-[#8B4500] block">1. Saffron Flowering Stage</strong>
                          Precision aeroponic chamber temp, RH%, VPD, CO₂ &amp; photon recipes for peak bloom induction.
                        </div>
                        <div className="p-3 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2] text-xs">
                          <strong className="text-[#8B4500] block">2. Saffron Corm Multiplication Stage</strong>
                          Separate root-zone moisture, EC, pH &amp; winter thermal targets for daughter corm division.
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      Dual-Phase Phenology Profiles
                    </div>
                  </div>

                  {/* Card 7: Monitoring */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        07 · Monitoring
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Know What Is Happening — In Real Time
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        Monitor critical cultivation parameters continuously from a centralized interface.
                      </p>
                      <div className="p-3 rounded-xl bg-[#FCF9F4] border border-[#EAE0D2] text-xs font-mono-tabular text-[#8B4500] leading-relaxed">
                        Temperature · Humidity · CO₂ · Light · VPD · Soil/Root Zone · pH · EC
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      24/7 Centralized Sensor Dashboard
                    </div>
                  </div>

                  {/* Card 8: Automated Control */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        08 · Automated Control
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        From Monitoring to Action
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        The system doesn&apos;t just tell you what is happening. It can automatically respond to defined conditions and control connected equipment.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      Closed-Loop Chiller, Mist &amp; LED Actuation
                    </div>
                  </div>

                  {/* Card 9: Smart Scheduling */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        09 · Smart Scheduling
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Plan the Crop. Automate the Process.
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        Create cultivation schedules up to 365 days, save multiple schedules and run them according to your production requirements.
                      </p>
                      <ul className="space-y-1 text-xs text-[#635E59]">
                        <li>• Schedule up to 365 days in advance</li>
                        <li>• Create, save &amp; run multiple schedules</li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      365-Day Multi-Recipe Sequencer
                    </div>
                  </div>

                  {/* Card 10: Alert and Notifications */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        10 · Alert and Notifications
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Know Before It Becomes a Problem
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        Receive alerts when important cultivation conditions move outside defined limits or when system events require attention.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      Instant Threshold &amp; Equipment Alerts
                    </div>
                  </div>

                  {/* Card 11: Result */}
                  <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold uppercase">
                        11 · Result
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Designed for Consistency
                      </h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">
                        Our system is designed to maintain precise cultivation conditions, reduce environmental variability and help growers achieve more consistent results.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#F4ECE1] text-[11px] font-mono-tabular text-[#635E59]">
                      Repeatable Grade I Harvest Outcomes
                    </div>
                  </div>

                  {/* Card 12: Empty Card */}
                  <div
                    className="p-7 rounded-2xl bg-[#FCF9F4] border border-dashed border-[#DFCBB2] min-h-[220px] flex flex-col justify-between"
                    aria-label="Reserved slot 12"
                  >
                    <div className="text-xs font-mono-tabular text-[#C29B6B] font-semibold uppercase">
                      12 ·
                    </div>
                    <div />
                  </div>
                </div>
              </div>

              {/* 4. Section: How to Adapt Our Technology for Your Cultivation Requirement */}
              <div className="space-y-8">
                <div className="max-w-3xl">
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] mb-3">
                    How to Adapt Our Technology for Your Cultivation Requirement
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                    Whether you are converting a spare room into a 100 sq. ft. pilot unit, retrofitting an existing cold-storage facility, or building a multi-room commercial saffron farm, our modular control system adapts seamlessly to your layout.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      step: 'STEP 01 · SITE & ROOM AUDIT',
                      title: 'Assess Your Space & Scale',
                      desc: 'Share your room dimensions, ambient climate zone, and target corm capacity. We calculate thermal loads, rack geometry, and sensor placement.'
                    },
                    {
                      step: 'STEP 02 · HARDWARE & SENSOR MAPPING',
                      title: 'Configure Nodes & Actuators',
                      desc: 'We match our AI controller relays to your chillers, humidifiers, CO₂ valves, LED drivers, and root-zone pH/EC probes—for new or existing equipment.'
                    },
                    {
                      step: 'STEP 03 · STAGE RECIPE PROGRAMMING',
                      title: 'Load Flowering & Corm Profiles',
                      desc: 'We pre-load separate parameter profiles for the Saffron Flowering Stage and the Saffron Corm Multiplication Stage, up to 365 days in advance.'
                    },
                    {
                      step: 'STEP 04 · COMMISSIONING & ALERTS',
                      title: 'Go Live with Full Traceability',
                      desc: 'Activate real-time monitoring, automated equipment responses, threshold notifications, and digital crop history logging from day one.'
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-7 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="text-xs font-mono-tabular text-[#8B4500] font-semibold">
                          {item.step}
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#181615]">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="text-xs font-mono-tabular text-[#8B4500]">
                        Tailored to Your Facility →
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. CTA & Interactive Cultivation Requirement Form + WhatsApp Button */}
              <div
                id="tech-requirement-form"
                className="bg-white rounded-2xl border border-[#EAE0D2] p-6 sm:p-10 scroll-mt-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left Column: Direct Consultation Info */}
                  <div className="lg:col-span-5 space-y-6">
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181615]">
                      Talk to Us About Your Cultivation Requirement →
                    </h2>
                    <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed">
                      Tell our CEA engineers and agronomists in Thrissur about your facility, target crop stage, and automation goals. We will prepare a tailored technology and parameter blueprint for your project.
                    </p>
                  </div>

                  {/* Right Column: Cultivation Requirement Form */}
                  <div className="lg:col-span-7 bg-[#FCF9F4] rounded-2xl border border-[#EAE0D2] p-6 sm:p-8">
                    {techFormSubmitted ? (
                      <div className="py-10 text-center space-y-4">
                        <CheckCircle2 className="w-12 h-12 text-[#8B4500] mx-auto" />
                        <h3 className="font-display text-3xl font-semibold text-[#181615]">
                          Cultivation Requirement Received
                        </h3>
                        <p className="text-sm text-[#4A4540] max-w-md mx-auto leading-relaxed">
                          Thank you, <strong>{techName}</strong>. Our CEA technology team in Thrissur has logged your <strong>{techCategory}</strong> requirement ({techStageFocus}) and will contact you at <strong>{techPhone || techEmail}</strong>.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setTechFormSubmitted(false);
                              setTechNotes('');
                            }}
                            className="px-6 py-3 rounded-full bg-[#8B4500] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Submit Another Requirement
                          </button>
                          <a
                            href="https://wa.me/918089964529?text=Hello%20Orhues%2C%20I%20just%20submitted%20my%20cultivation%20requirement%20on%20the%20Technology%20page."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                          >
                            <span>Continue on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setTechFormSubmitted(true);
                        }}
                        className="space-y-4"
                      >
                        <h3 className="font-display text-2xl font-semibold text-[#181615] mb-1">
                          Submit Your Cultivation Requirement
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={techName}
                              onChange={(e) => setTechName(e.target.value)}
                              placeholder="e.g., Vivek Menon"
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                              Phone / WhatsApp Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={techPhone}
                              onChange={(e) => setTechPhone(e.target.value)}
                              placeholder="+91 98470 XXXXX"
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={techEmail}
                              onChange={(e) => setTechEmail(e.target.value)}
                              placeholder="you@organization.com"
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                              Grower / Institution Category
                            </label>
                            <select
                              value={techCategory}
                              onChange={(e) => setTechCategory(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                            >
                              <option value="Commercial Saffron Grower">
                                Commercial Saffron Grower
                              </option>
                              <option value="Indoor Farm">Indoor Farm</option>
                              <option value="Research & Experimental Cultivation">
                                Research &amp; Experimental Cultivation
                              </option>
                              <option value="Controlled Environment Agriculture">
                                Controlled Environment Agriculture
                              </option>
                              <option value="Agricultural Institution">
                                Agricultural Institution
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                              Room Size / Planned Area (sq. ft.)
                            </label>
                            <input
                              type="text"
                              value={techRoomArea}
                              onChange={(e) => setTechRoomArea(e.target.value)}
                              placeholder="e.g., 250 sq. ft. indoor room"
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                              Stage Parameter Focus
                            </label>
                            <select
                              value={techStageFocus}
                              onChange={(e) => setTechStageFocus(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                            >
                              <option value="Both Flowering & Corm Multiplication Stages">
                                Both Flowering &amp; Corm Multiplication Stages
                              </option>
                              <option value="Saffron Flowering Stage Only">
                                Saffron Flowering Stage Only
                              </option>
                              <option value="Saffron Corm Multiplication Stage Only">
                                Saffron Corm Multiplication Stage Only
                              </option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                            Your Cultivation &amp; Automation Requirements
                          </label>
                          <textarea
                            rows={4}
                            value={techNotes}
                            onChange={(e) => setTechNotes(e.target.value)}
                            placeholder="Describe your existing room/equipment, required monitoring parameters (Temp, RH, CO2, Light, VPD, pH, EC), or 365-day scheduling goals..."
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <button
                            type="submit"
                            className="px-7 py-3.5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Talk to Us About Your Cultivation Requirement →
                          </button>
                          <a
                            href="https://wa.me/918089964529?text=Hello%20Orhues%2C%20I%20would%20like%20to%20discuss%20my%20saffron%20cultivation%20requirements."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                          >
                            <span>WhatsApp Direct</span>
                          </a>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: MEDIA ================= */}
        {activePage === 'Media' && (
          <>
            {renderPageHeader(
              'Media',
              'Orhues Publications, Press Releases & Visual Archive',
              'Explore our latest agronomy articles, official press announcements, and visual documentation from our Thrissur facility.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6 space-y-14">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                <div className="p-8 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#8B4500] font-semibold uppercase mb-2">
                      Agronomy &amp; Culinary Journal
                    </div>
                    <h2 className="font-display text-3xl font-semibold text-[#181615] mb-3">
                      Blog
                    </h2>
                    <p className="text-sm text-[#4A4540] leading-relaxed mb-6">
                      Deep dives into Controlled-Environment Agriculture, ISO 3632 phytochemistry, and culinary saffron infusions.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('Blog')}
                    className="py-3 px-6 rounded-full bg-[#8B4500] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Open Blog Page
                  </button>
                </div>

                <div className="p-8 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#8B4500] font-semibold uppercase mb-2">
                      Newsroom &amp; Announcements
                    </div>
                    <h2 className="font-display text-3xl font-semibold text-[#181615] mb-3">
                      Press Release
                    </h2>
                    <p className="text-sm text-[#4A4540] leading-relaxed mb-6">
                      Official coverage of Orhues’s indoor saffron expansion in Kerala, new luxury product launches, and certification milestones.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('Press Release')}
                    className="py-3 px-6 rounded-full bg-[#8B4500] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Open Press Release Page
                  </button>
                </div>

                <div className="p-8 rounded-2xl bg-white border border-[#EAE0D2] flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#8B4500] font-semibold uppercase mb-2">
                      Visual Documentation
                    </div>
                    <h2 className="font-display text-3xl font-semibold text-[#181615] mb-3">
                      Gallery
                    </h2>
                    <p className="text-sm text-[#4A4540] leading-relaxed mb-6">
                      High-resolution photography of our vertical aeroponic chambers, dawn harvests, and apothecary packaging.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('Gallery')}
                    className="py-3 px-6 rounded-full bg-[#8B4500] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Open Gallery Page
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: BLOG ================= */}
        {activePage === 'Blog' && (
          <>
            {renderPageHeader(
              'Blog',
              'Orhues Agronomy & Gastronomy Dispatches',
              'Research notes and field guides authored by our Thrissur agronomy and culinary teams.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-[#EAE0D2] overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] w-full bg-[#F4ECE1]">
                        <ResilientImage
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-xs text-[#635E59] mb-2">
                          <span className="text-[#8B4500] font-medium">{post.category}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span>{post.date}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h2 className="font-display text-2xl font-semibold text-[#181615] mb-3">
                          {post.title}
                        </h2>
                        <p className="text-sm text-[#4A4540] leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <button
                        type="button"
                        onClick={() => handleNavigate('Technology')}
                        className="text-xs font-bold uppercase tracking-wider text-[#8B4500] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Read Technical Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: PRESS RELEASE ================= */}
        {activePage === 'Press Release' && (
          <>
            {renderPageHeader(
              'Press Release',
              'Official Statements & Media Coverage',
              'Press dispatches and institutional milestones from Orhues headquarters in Thrissur, Kerala.'
            )}
            <section className="py-16 max-w-[1000px] mx-auto px-6 space-y-6">
              {PRESS_RELEASES.map((pr) => (
                <article
                  key={pr.id}
                  className="bg-white rounded-2xl border border-[#EAE0D2] p-7 sm:p-8"
                >
                  <div className="text-xs text-[#635E59] mb-2">
                    <span className="text-[#8B4500] font-semibold">{pr.date}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{pr.outlet}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#181615] mb-3">
                    {pr.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4540] leading-relaxed mb-4">
                    {pr.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleNavigate('Contact')}
                    className="text-xs font-bold uppercase tracking-wider text-[#8B4500] hover:underline cursor-pointer"
                  >
                    Request Press Kit &amp; Media Credentials →
                  </button>
                </article>
              ))}
            </section>
          </>
        )}

        {/* ================= PAGE: GALLERY ================= */}
        {activePage === 'Gallery' && (
          <>
            {renderPageHeader(
              'Gallery',
              'Inside Orhues — From CEA Chiller Rooms to Apothecary Jars',
              'Visual documentation of our indoor vertical saffron blooms, mother corm grading, and artisanal packaging.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {GALLERY_ITEMS.map((item) => (
                  <figure
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#EAE0D2] overflow-hidden"
                  >
                    <div className="aspect-[4/3] w-full bg-[#F4ECE1]">
                      <ResilientImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <figcaption className="p-6">
                      <div className="text-xs text-[#8B4500] font-medium mb-1">
                        {item.category}
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#181615] mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#4A4540] leading-relaxed">
                        {item.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ================= PAGE: CONTACT ================= */}
        {activePage === 'Contact' && (
          <>
            {renderPageHeader(
              'Contact',
              'Thrissur, Kerala, India · Mon–Sat, 9AM–6PM',
              'Connect with Orhues for wholesale saffron orders, grower training registration, or turnkey indoor saffron cultivation infrastructure.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Contact Coordinates */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white rounded-2xl border border-[#EAE0D2] p-8 space-y-6">
                    <h2 className="font-display text-3xl font-semibold text-[#181615]">
                      Orhues Headquarters &amp; CEA Demonstration Center
                    </h2>
                    <div className="space-y-4 text-sm text-[#4A4540]">
                      <div className="flex items-start gap-3.5">
                        <MapPin className="w-5 h-5 text-[#8B4500] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#181615]">Location</div>
                          <div>Thrissur, Kerala, India</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <Phone className="w-5 h-5 text-[#8B4500] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#181615]">Phone &amp; WhatsApp</div>
                          <a
                            href="tel:+918089964529"
                            className="font-mono-tabular text-[#8B4500] hover:underline"
                          >
                            +91 8089964529
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <Mail className="w-5 h-5 text-[#8B4500] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#181615]">Electronic Mail</div>
                          <a
                            href="mailto:orhuessaffron@gmail.com"
                            className="text-[#8B4500] hover:underline"
                          >
                            orhuessaffron@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <Clock className="w-5 h-5 text-[#8B4500] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#181615]">Visiting &amp; Support Hours</div>
                          <div>Mon-Sat, 9AM-6PM IST</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Inquiry Form */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE0D2] p-8">
                  {inquirySubmitted ? (
                    <div className="py-12 text-center space-y-4">
                      <CheckCircle2 className="w-12 h-12 text-[#8B4500] mx-auto" />
                      <h3 className="font-display text-3xl font-semibold text-[#181615]">
                        Inquiry Received by Orhues Thrissur
                      </h3>
                      <p className="text-sm text-[#4A4540] max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{inquiryName}</strong>. Our agronomy and client relations team in Thrissur will reach out via <strong>{inquiryPhone || inquiryEmail}</strong> within 1 business day regarding <em>{inquiryTopic}</em>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setInquirySubmitted(false);
                          setInquiryMessage('');
                        }}
                        className="px-6 py-3 rounded-full bg-[#8B4500] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setInquirySubmitted(true);
                      }}
                      className="space-y-5"
                    >
                      <h3 className="font-display text-2xl font-semibold text-[#181615]">
                        Schedule a Consultation or Order Inquiry
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            placeholder="e.g., Rahul Nair"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FCF9F4] border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                            Phone / WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={inquiryPhone}
                            onChange={(e) => setInquiryPhone(e.target.value)}
                            placeholder="+91 98470 XXXXX"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FCF9F4] border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={inquiryEmail}
                            onChange={(e) => setInquiryEmail(e.target.value)}
                            placeholder="you@domain.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FCF9F4] border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                            Subject / Service Interest
                          </label>
                          <select
                            value={inquiryTopic}
                            onChange={(e) => setInquiryTopic(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FCF9F4] border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                          >
                            <option value="Turnkey Indoor Saffron Infrastructure Setup">
                              Turnkey Indoor Saffron Infrastructure Setup
                            </option>
                            <option value="Saffron Cultivation Training in Thrissur">
                              Saffron Cultivation Training in Thrissur
                            </option>
                            <option value="Bulk Saffron Threads / Honey / Tea Order">
                              Bulk Saffron Threads / Honey / Tea Order
                            </option>
                            <option value="Mother Corms Reservation (Caliber 10/+)">
                              Mother Corms Reservation (Caliber 10/+)
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                          Project Details or Order Notes
                        </label>
                        <textarea
                          rows={4}
                          value={inquiryMessage}
                          onChange={(e) => setInquiryMessage(e.target.value)}
                          placeholder="Tell us about your available room dimensions, desired corm quantity, or retail order inquiry..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FCF9F4] border border-[#DFCBB2] text-sm focus:outline-none focus:border-[#8B4500]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-8 py-3.5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer"
                      >
                        Submit Inquiry to Orhues
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================= PAGES: LEGAL (Privacy Policy, Terms of Service, Shipping) ================= */}
        {(activePage === 'Privacy Policy' ||
          activePage === 'Terms of Service' ||
          activePage === 'Shipping') && (
          <>
            {renderPageHeader(
              activePage,
              'Orhues Legal & Dispatch Governance',
              `Official ${activePage} documentation for Orhues customers, trainees, and infrastructure partners.`
            )}
            <section className="py-16 max-w-[900px] mx-auto px-6">
              <div className="bg-white rounded-2xl border border-[#EAE0D2] p-8 space-y-6 text-sm text-[#4A4540] leading-relaxed">
                {activePage === 'Privacy Policy' && (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-[#181615]">
                      1. Data Stewardship &amp; Client Confidentiality
                    </h2>
                    <p>
                      Orhues (located in Thrissur, Kerala, India) respects your privacy. Personal details collected during apothecary orders, corm reservations, or CEA infrastructure consultations—including name, delivery address, phone number (+91), and email—are used strictly to fulfill orders, issue phytosanitary certificates, and provide agronomic support.
                    </p>
                    <h2 className="font-display text-2xl font-semibold text-[#181615]">
                      2. Security &amp; Zero Third-Party Brokerage
                    </h2>
                    <p>
                      We never sell, rent, or trade client or grower contact records. For questions regarding your data records, contact <strong>orhuessaffron@gmail.com</strong> or call <strong>+91 8089964529</strong>.
                    </p>
                  </>
                )}

                {activePage === 'Terms of Service' && (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-[#181615]">
                      1. Product Authenticity &amp; ISO 3632 Grading
                    </h2>
                    <p>
                      All Orhues Saffron Threads, Saffron Infused Honey, and Luxury Saffron Tea lots are guaranteed free of artificial dyes and adulterants and are accompanied by batch-specific ISO 3632-2 laboratory metrics.
                    </p>
                    <h2 className="font-display text-2xl font-semibold text-[#181615]">
                      2. Live Corm Stock &amp; Turnkey Infrastructure Terms
                    </h2>
                    <p>
                      <em>Crocus sativus</em> mother corms are living biological geophytes inspected prior to dispatch. Growers must adhere to the Orhues temperature and humidity SOPs provided during Training to achieve projected bloom yields.
                    </p>
                  </>
                )}

                {activePage === 'Shipping' && (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-[#181615]">
                      1. Climate-Insulated Apothecary &amp; Corm Dispatch
                    </h2>
                    <p>
                      Apothecary orders (Saffron Threads, Saffron Infused Honey, Luxury Saffron Tea) ship within 24–48 hours from Thrissur, Kerala via express courier across India. Orders above ₹5,000 qualify for complimentary shipping.
                    </p>
                    <h2 className="font-display text-2xl font-semibold text-[#181615]">
                      2. Live Mother Corm Delivery Windows
                    </h2>
                    <p>
                      Dormant Caliber 10/+ mother corms are dispatched in ventilated, moisture-regulated crates with phytosanitary documentation prior to the autumn bloom window.
                    </p>
                  </>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Exact ORHUES Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Contiguous Product Detail Modal */}
      <ProductDetailModal
        product={activeProductModal?.product || null}
        initialVariantId={activeProductModal?.variantId}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Quick Help / Question Concierge Modal (triggered by ? button in Header) */}
      {isHelpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Orhues Quick Help & Agronomy Support"
        >
          <div className="bg-white rounded-2xl border border-[#EAE0D2] max-w-lg w-full p-6 sm:p-8 shadow-xl relative">
            <button
              type="button"
              onClick={() => setIsHelpOpen(false)}
              aria-label="Close help modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#EAE0D2] flex items-center justify-center text-[#4A4540] hover:bg-[#FCF9F4] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#8B4500] mb-1">
              ORHUES CONCIERGE · THRISSUR, KERALA
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#181615] mb-3">
              How Can We Assist Your Saffron Journey?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed mb-5">
              Direct assistance available Mon–Sat, 9AM–6PM at <strong>+91 8089964529</strong> or <strong>orhuessaffron@gmail.com</strong>.
            </p>
            <div className="space-y-2.5 mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsHelpOpen(false);
                  handleNavigate('Shop');
                }}
                className="w-full p-3.5 rounded-xl bg-[#FCF9F4] hover:bg-[#F4ECE1] border border-[#EAE0D2] text-left text-xs font-semibold text-[#181615] flex items-center justify-between cursor-pointer"
              >
                <span>Shop Saffron Threads, Infused Honey &amp; Luxury Tea</span>
                <ArrowRight className="w-4 h-4 text-[#8B4500]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsHelpOpen(false);
                  handleNavigate('Training');
                }}
                className="w-full p-3.5 rounded-xl bg-[#FCF9F4] hover:bg-[#F4ECE1] border border-[#EAE0D2] text-left text-xs font-semibold text-[#181615] flex items-center justify-between cursor-pointer"
              >
                <span>Enroll in Saffron Cultivation Training (Thrissur)</span>
                <ArrowRight className="w-4 h-4 text-[#8B4500]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsHelpOpen(false);
                  handleNavigate('Infrastructure');
                }}
                className="w-full p-3.5 rounded-xl bg-[#FCF9F4] hover:bg-[#F4ECE1] border border-[#EAE0D2] text-left text-xs font-semibold text-[#181615] flex items-center justify-between cursor-pointer"
              >
                <span>Request Turnkey CEA Indoor Farm Infrastructure</span>
                <ArrowRight className="w-4 h-4 text-[#8B4500]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onExploreShop={() => handleNavigate('Shop', 'all')}
      />
    </div>
  );
}
