/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
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

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      variant: PRODUCTS[0].variants[1],
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

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
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#E8C284] font-medium mb-3">
            <button
              type="button"
              onClick={() => handleNavigate('Home')}
              className="hover:underline text-white cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#E8C284] font-semibold">{title}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-200 font-normal">{kicker}</span>
          </div>
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
            <section className="py-14 sm:py-16">
              {renderProductCatalog(false)}
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

              <CultivationPlanner
                onAddCormsToBag={(product, variant, quantity) => {
                  handleAddToCart(product, variant, quantity);
                  setIsCartOpen(true);
                }}
              />
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
              'Controlled-Environment Agriculture & ISO 3632 Spectrophotometry',
              'Explore how Orhues combines IoT micro-climate engineering, photonics, and UV-Vis chemical assay testing to produce world-leading saffron in Kerala.'
            )}
            <section className="py-16 max-w-[1280px] mx-auto px-6 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2]">
                  <Cpu className="w-6 h-6 text-[#8B4500] mb-3" />
                  <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                    Thermoperiodic Diurnal Cycling
                  </h3>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    <em>Crocus sativus</em> anthesis is triggered by a precise differential between 16°C daytime warmth and 8°C night cooling. Our PLC controllers automate this transition smoothly to induce synchronized morning blooming.
                  </p>
                </div>
                <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2]">
                  <Sprout className="w-6 h-6 text-[#8B4500] mb-3" />
                  <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                    Targeted Photon Spectrum (PAR)
                  </h3>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    Custom 450nm blue and 660nm deep-red LED arrays stimulate carotenoid biosynthesis inside the developing stigma, boosting crocin and safranal concentrations above traditional sun-exposed crops.
                  </p>
                </div>
                <div className="p-7 rounded-2xl bg-white border border-[#EAE0D2]">
                  <FlaskConical className="w-6 h-6 text-[#8B4500] mb-3" />
                  <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                    UV-Vis Batch Assay Lab
                  </h3>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    Every harvest lot is analyzed at 440nm (Crocin), 257nm (Picrocrocin), and 330nm (Safranal) per ISO 3632-2 protocol to guarantee Category I pharmaceutical and culinary grade.
                  </p>
                </div>
              </div>

              {/* ISO 3632 Batch Inspector */}
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
                        ISO 3632 Category I Verified
                      </span>
                    </div>

                    <div className="overflow-x-auto mb-6">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#DFCBB2] text-[11px] text-[#635E59]">
                            <th className="py-2.5 pr-4 font-medium">Assay Parameter</th>
                            <th className="py-2.5 px-4 font-medium">Wavelength</th>
                            <th className="py-2.5 px-4 font-medium">ISO Grade I Min</th>
                            <th className="py-2.5 pl-4 font-medium text-right">Orhues Result</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs sm:text-sm divide-y divide-[#EAE0D2] font-mono-tabular">
                          <tr>
                            <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                              Crocin (Coloring Strength)
                            </td>
                            <td className="py-3 px-4 text-[#635E59]">440 nm</td>
                            <td className="py-3 px-4 text-[#635E59]">≥ 200</td>
                            <td className="py-3 pl-4 text-right font-semibold text-[#8B4500]">
                              {selectedBatch.crocin440nm}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                              Picrocrocin (Bitterness)
                            </td>
                            <td className="py-3 px-4 text-[#635E59]">257 nm</td>
                            <td className="py-3 px-4 text-[#635E59]">≥ 70</td>
                            <td className="py-3 pl-4 text-right font-semibold text-[#181615]">
                              {selectedBatch.picrocrocin257nm}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                              Safranal (Volatile Aroma)
                            </td>
                            <td className="py-3 px-4 text-[#635E59]">330 nm</td>
                            <td className="py-3 px-4 text-[#635E59]">20 – 50</td>
                            <td className="py-3 pl-4 text-right font-semibold text-[#181615]">
                              {selectedBatch.safranal330nm}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 font-sans font-medium text-[#181615]">
                              Moisture Content
                            </td>
                            <td className="py-3 px-4 text-[#635E59]">Gravimetric</td>
                            <td className="py-3 px-4 text-[#635E59]">≤ 12.0%</td>
                            <td className="py-3 pl-4 text-right font-semibold text-[#181615]">
                              {selectedBatch.moisturePercent}%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAE0D2] text-xs">
                      <div>
                        <span className="text-[#635E59]">Assay Lead: </span>
                        <span className="font-medium text-[#181615]">{selectedBatch.harvesterLead}</span>
                      </div>
                      <div>
                        <span className="text-[#635E59]">Protocol: </span>
                        <span className="font-medium text-[#181615]">{selectedBatch.dryingProtocol}</span>
                      </div>
                    </div>
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
      />
    </div>
  );
}
