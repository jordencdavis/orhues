import React, { useState, useMemo } from 'react';
import {
  CULTIVATION_STAGES,
  BOTANICAL_IMAGE,
  PRODUCTS,
  SaffronProduct,
  ProductVariant
} from '../data/saffronData';
import { ResilientImage } from './ResilientImage';
import { ArrowRight, Check, Sprout, Thermometer, Droplets, Ruler } from 'lucide-react';

interface CultivationPlannerProps {
  onAddCormsToBag: (product: SaffronProduct, variant: ProductVariant, quantity: number) => void;
}

export const CultivationPlanner: React.FC<CultivationPlannerProps> = ({ onAddCormsToBag }) => {
  const [activeStageId, setActiveStageId] = useState<string>(CULTIVATION_STAGES[0].id);

  // Interactive Agronomic Yield Calculator State
  const [areaSqMeters, setAreaSqMeters] = useState<number>(10);
  const [densityPerSqM, setDensityPerSqM] = useState<number>(50);
  const [caliberChoice, setCaliberChoice] = useState<'caliber-10' | 'caliber-9'>('caliber-10');
  const [methodChoice, setMethodChoice] = useState<'raised-bed' | 'open-field' | 'indoor-tray'>('raised-bed');
  const [addedCalcFeedback, setAddedCalcFeedback] = useState<boolean>(false);

  const activeStage = useMemo(
    () => CULTIVATION_STAGES.find((s) => s.id === activeStageId) || CULTIVATION_STAGES[0],
    [activeStageId]
  );

  const metrics = useMemo(() => {
    const totalCorms = Math.round(areaSqMeters * densityPerSqM);
    // Caliber 10/+ averages 2.1 flowers per corm in Year 1; Caliber 9/10 averages 0.85 flowers in Year 1
    const baseFlowersPerCormY1 = caliberChoice === 'caliber-10' ? 2.1 : 0.85;
    const methodMultiplier =
      methodChoice === 'indoor-tray' ? 1.15 : methodChoice === 'raised-bed' ? 1.08 : 1.0;

    const year1Flowers = Math.round(totalCorms * baseFlowersPerCormY1 * methodMultiplier);
    // 155 fresh Crocus sativus flowers = 1.0g dry Super Negin saffron
    const year1DryGrams = +(year1Flowers / 155).toFixed(1);

    // By Year 3, each mother corm divides into ~3.8 flowering-size daughter corms averaging 2.4 flowers each
    const year3DaughterCorms = Math.round(totalCorms * (caliberChoice === 'caliber-10' ? 4.1 : 3.5));
    const year3Flowers = Math.round(year3DaughterCorms * 2.3 * methodMultiplier);
    const year3DryGrams = +(year3Flowers / 155).toFixed(1);

    // Retail value estimate at ₹950/g for estate-grown Super Negin in India
    const year1RetailValue = Math.round(year1DryGrams * 950);
    const year3RetailValue = Math.round(year3DryGrams * 950);

    return {
      totalCorms,
      year1Flowers,
      year1DryGrams,
      year3DaughterCorms,
      year3DryGrams,
      year1RetailValue,
      year3RetailValue
    };
  }, [areaSqMeters, densityPerSqM, caliberChoice, methodChoice]);

  const handleAddRecommendedCorms = () => {
    const product =
      PRODUCTS.find((p) => p.id === 'mother-corms-caliber-10') || PRODUCTS[4];

    // Pick best matching pack variant and quantity
    let selectedVariant = product.variants[0];
    let packQty = 1;

    if (metrics.totalCorms >= 800) {
      selectedVariant = product.variants[2]; // 1,000 crate
      packQty = Math.max(1, Math.ceil(metrics.totalCorms / 1000));
    } else if (metrics.totalCorms >= 200) {
      selectedVariant = product.variants[1]; // 250 pack
      packQty = Math.max(1, Math.ceil(metrics.totalCorms / 250));
    } else {
      selectedVariant = product.variants[0]; // 50 pack
      packQty = Math.max(1, Math.ceil(metrics.totalCorms / 50));
    }

    onAddCormsToBag(product, selectedVariant, packQty);
    setAddedCalcFeedback(true);
    setTimeout(() => setAddedCalcFeedback(false), 2200);
  };

  return (
    <section id="cultivation" className="py-20 border-t border-stone-200/80">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs text-[#635E59] mb-2">
            <span>Agronomic Protocol</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Crocus sativus L.</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>USDA Zones 5–9</span>
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Reverse-Season Phenology &amp; Field Cultivation Blueprint
          </h2>
          <p className="text-base text-[#524E4A] leading-relaxed">
            Saffron is a sterile triploid autumn-blooming crocus that aestivates through dry summer heat, wakes in crisp October air, and builds replacement daughter corms through winter foliage. Follow our four-stage agronomic cycle or calculate your plot yield below.
          </p>
        </div>

        {/* 4-Stage Interactive Phenology Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8" role="tablist" aria-label="Saffron cultivation stages">
          {CULTIVATION_STAGES.map((stage) => {
            const isSelected = stage.id === activeStage.id;
            return (
              <button
                key={stage.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveStageId(stage.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#181615] text-[#F9F8F6] border-[#181615] shadow-sm'
                    : 'bg-white text-[#181615] border-stone-200/90 hover:border-stone-400'
                }`}
              >
                <div className={`text-xs font-mono-tabular mb-2 ${isSelected ? 'text-stone-300' : 'text-[#635E59]'}`}>
                  <span>{stage.index}. {stage.months}</span>
                </div>
                <div className="font-display text-xl font-semibold leading-snug mb-1">
                  {stage.season}
                </div>
                <div className={`text-xs leading-relaxed ${isSelected ? 'text-stone-300' : 'text-[#635E59]'}`}>
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Agronomic View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 mb-16">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs text-[#9E1B1B] font-medium mb-2">
                <span>Stage {activeStage.index}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{activeStage.months}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#181615] mb-2">
                {activeStage.title}
              </h3>
              <p className="text-sm text-[#635E59] mb-5">{activeStage.subtitle}</p>
              <p className="text-sm sm:text-base text-[#2D2A27] leading-relaxed mb-6">
                {activeStage.summary}
              </p>

              {/* 3 Environmental Parameter Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-stone-200/80 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#635E59] mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#9E1B1B]" />
                    <span>Soil Temperature</span>
                  </div>
                  <div className="text-sm font-mono-tabular font-medium text-[#181615]">
                    {activeStage.soilTemp}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#635E59] mb-1">
                    <Droplets className="w-3.5 h-3.5 text-[#9E1B1B]" />
                    <span>Moisture Regimen</span>
                  </div>
                  <div className="text-sm font-medium text-[#181615]">
                    {activeStage.irrigation}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#635E59] mb-1">
                    <Ruler className="w-3.5 h-3.5 text-[#9E1B1B]" />
                    <span>Depth &amp; Benchmark</span>
                  </div>
                  <div className="text-sm font-mono-tabular font-medium text-[#181615]">
                    {activeStage.depthOrSpacing}
                  </div>
                </div>
              </div>

              {/* Field Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-[#181615] mb-3">
                  Field Execution Checklist
                </h4>
                <ul className="space-y-2.5">
                  {activeStage.fieldChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#3F3B37]">
                      <span className="font-mono-tabular text-xs text-[#9E1B1B] font-medium mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Agronomist Warning Box (Subtle all-around hairline border, no thick left bar) */}
            <div className="p-4 rounded-xl bg-[#F9F8F6] border border-stone-200/90 text-xs sm:text-sm text-[#3F3B37]">
              <span className="font-semibold text-[#9E1B1B]">Critical Agronomic Risk: </span>
              <span>{activeStage.criticalMistakeToAvoid}</span>
            </div>
          </div>

          {/* Right Column: Botanical Visual + Anatomy Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F9F8F6] rounded-xl p-5 border border-stone-200/70">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg mb-5 bg-stone-200">
              <ResilientImage
                src={BOTANICAL_IMAGE}
                alt="Freshly harvested Crocus sativus blossoms showing vivid crimson tripartite stigmas on a wooden sorting table"
                fallbackTitle="Crocus sativus Anthesis & Stigma Separation"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="text-xs text-[#635E59]">
                <span>Botanical Anatomy</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>Triploid Sterile Geophyte (2n = 3x = 24)</span>
              </div>
              <h4 className="font-display text-xl font-semibold text-[#181615]">
                Anatomy of a Single Harvested Blossom
              </h4>
              <div className="space-y-2 text-xs text-[#524E4A] pt-1">
                <div className="flex justify-between py-1.5 border-b border-stone-200/80">
                  <span className="font-medium text-[#181615]">3 Crimson Stigma Filaments</span>
                  <span className="font-mono-tabular">25–32 mg fresh · 5–7 mg dry</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200/80">
                  <span className="font-medium text-[#181615]">3 Golden Anther Stamens</span>
                  <span className="font-mono-tabular">Zero crocin (Separated at table)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200/80">
                  <span className="font-medium text-[#181615]">6 Lilac-Purple Tepals</span>
                  <span className="font-mono-tabular">Rich in kaempferol anthocyanins</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-[#181615]">Fresh-to-Dry Dehydration Ratio</span>
                  <span className="font-mono-tabular">5.0 kg fresh → 1.0 kg dry spice</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Yield & Corm Density Calculator */}
        <div id="calculator" className="bg-[#181615] text-[#F9F8F6] rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs text-stone-400 mb-2">
                  <span>Interactive Field &amp; Bed Estimator</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>4-Year Perennial Cycle</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-wide mb-2">
                  Saffron Corm &amp; Harvest Yield Calculator
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Configure your planting area, corm density, and mother bulb caliber to model first-autumn flower count, dried Super Negin thread yield, and Year 3 daughter corm multiplication.
                </p>
              </div>

              {/* Control 1: Area */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label htmlFor="area-slider" className="text-stone-200 font-medium">
                    Cultivation Bed Area
                  </label>
                  <span className="font-mono-tabular text-white font-semibold">
                    {areaSqMeters} m² ({Math.round(areaSqMeters * 10.764)} sq. ft.)
                  </span>
                </div>
                <input
                  id="area-slider"
                  type="range"
                  min={2}
                  max={100}
                  step={2}
                  value={areaSqMeters}
                  onChange={(e) => setAreaSqMeters(Number(e.target.value))}
                  className="w-full accent-[#9E1B1B] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-stone-400 font-mono-tabular">
                  <span>2 m² (Kitchen Bed)</span>
                  <span>25 m² (Market Plot)</span>
                  <span>100 m² (Micro-Estate)</span>
                </div>
              </div>

              {/* Control 2: Planting Density */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label htmlFor="density-slider" className="text-stone-200 font-medium">
                    Planting Density (Corms per m²)
                  </label>
                  <span className="font-mono-tabular text-white font-semibold">
                    {densityPerSqM} corms / m²
                  </span>
                </div>
                <input
                  id="density-slider"
                  type="range"
                  min={35}
                  max={75}
                  step={5}
                  value={densityPerSqM}
                  onChange={(e) => setDensityPerSqM(Number(e.target.value))}
                  className="w-full accent-[#9E1B1B] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-stone-400 font-mono-tabular">
                  <span>35/m² (Low Density)</span>
                  <span>50/m² (Standard Trench)</span>
                  <span>75/m² (Intensive Tray)</span>
                </div>
              </div>

              {/* Control 3: Corm Caliber */}
              <div className="space-y-2">
                <span className="block text-sm text-stone-200 font-medium">
                  Mother Corm Caliber Grade
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCaliberChoice('caliber-10')}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      caliberChoice === 'caliber-10'
                        ? 'bg-white/10 border-white text-white'
                        : 'bg-transparent border-stone-700 text-stone-400 hover:border-stone-500'
                    }`}
                  >
                    <div className="text-sm font-semibold">Caliber 10/+ Mother (18g+)</div>
                    <div className="text-xs text-stone-300 mt-0.5">
                      2–3 flowers in Year 1 · Highest immediate yield
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCaliberChoice('caliber-9')}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      caliberChoice === 'caliber-9'
                        ? 'bg-white/10 border-white text-white'
                        : 'bg-transparent border-stone-700 text-stone-400 hover:border-stone-500'
                    }`}
                  >
                    <div className="text-sm font-semibold">Caliber 9/10 Field (12–16g)</div>
                    <div className="text-xs text-stone-300 mt-0.5">
                      ~65% bloom Year 1 · Best cost for multi-year beds
                    </div>
                  </button>
                </div>
              </div>

              {/* Control 4: Cultivation Method */}
              <div className="space-y-2">
                <span className="block text-sm text-stone-200 font-medium">
                  Growing Architecture
                </span>
                <div className="grid grid-cols-3 gap-2 p-1 bg-stone-900 rounded-xl border border-stone-800">
                  {[
                    { id: 'raised-bed', label: 'Raised Bed' },
                    { id: 'open-field', label: 'Open Field' },
                    { id: 'indoor-tray', label: 'Indoor Tray' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setMethodChoice(mode.id as typeof methodChoice)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        methodChoice === mode.id
                          ? 'bg-[#9E1B1B] text-white'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output Panel */}
            <div className="lg:col-span-6 bg-stone-900/90 border border-stone-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
                  <div>
                    <div className="text-xs text-stone-400">Required Planting Stock</div>
                    <div className="font-mono-tabular text-3xl sm:text-4xl font-semibold text-white mt-1">
                      {metrics.totalCorms.toLocaleString()} Corms
                    </div>
                  </div>
                  <Sprout className="w-8 h-8 text-[#9E1B1B]" />
                </div>

                {/* 2x2 Yield Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80">
                    <div className="text-xs text-stone-400 mb-1">
                      Year 1 First-Autumn Harvest
                    </div>
                    <div className="font-mono-tabular text-2xl font-semibold text-white">
                      {metrics.year1DryGrams} g Dry Saffron
                    </div>
                    <div className="text-xs text-stone-400 font-mono-tabular mt-1">
                      From ~{metrics.year1Flowers.toLocaleString('en-IN')} fresh blossoms · Est. ₹{metrics.year1RetailValue.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80">
                    <div className="text-xs text-stone-400 mb-1">
                      Year 3 Multiplied Harvest
                    </div>
                    <div className="font-mono-tabular text-2xl font-semibold text-white">
                      {metrics.year3DryGrams} g Dry Saffron
                    </div>
                    <div className="text-xs text-stone-400 font-mono-tabular mt-1">
                      ~{metrics.year3DaughterCorms.toLocaleString('en-IN')} daughter corms · Est. ₹{metrics.year3RetailValue.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-300 mb-8">
                  <div className="flex justify-between py-1.5 border-b border-stone-800">
                    <span>Recommended Trench Spacing</span>
                    <span className="font-mono-tabular text-white">10 cm × 15 cm at 14 cm depth</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-800">
                    <span>Benchmark Conversion</span>
                    <span className="font-mono-tabular text-white">155 flowers = 1.0 g dry Super Negin</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>4-Year Lift &amp; Division Yield</span>
                    <span className="font-mono-tabular text-white">
                      ~{metrics.year3DaughterCorms.toLocaleString()} transplantable mother corms
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddRecommendedCorms}
                className="w-full py-3.5 px-6 rounded-xl bg-[#9E1B1B] hover:bg-[#7F1515] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {addedCalcFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added Recommended Corm Allocation to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add {metrics.totalCorms.toLocaleString()}-Corm Allocation to Bag</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
