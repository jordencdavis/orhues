import React, { useState, useEffect } from 'react';
import { SaffronProduct, ProductVariant } from '../data/saffronData';
import { ResilientImage } from './ResilientImage';
import { X, Check, Plus, Minus, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: SaffronProduct | null;
  initialVariantId?: string;
  onClose: () => void;
  onAddToCart: (product: SaffronProduct, variant: ProductVariant, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialVariantId,
  onClose,
  onAddToCart
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(initialVariantId || product.variants[0].id);
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [product, initialVariantId]);

  if (!product) return null;

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const handleBuy = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F9F8F6] rounded-2xl border border-stone-300 shadow-xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product specification view"
          className="sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 rounded-full bg-white/90 border border-stone-200 flex items-center justify-center text-[#181615] hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Contiguous Purchase Module Grid (Gallery Left, Purchase Module Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 clear-both">
          {/* Left Sticky Gallery & Chemical Specs */}
          <div className="md:col-span-6 space-y-6">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-200 border border-stone-200/80">
              <ResilientImage
                src={product.image}
                alt={product.name}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Laboratory & Agronomic Spec Table */}
            <div className="bg-white rounded-xl p-5 border border-stone-200/90">
              <div className="text-xs font-semibold text-[#181615] mb-3">
                ISO 3632 &amp; Botanical Specifications ({product.sku})
              </div>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-200/70">
                  <dt className="text-[#635E59]">Crocin (Coloring Power)</dt>
                  <dd className="font-mono-tabular font-medium text-[#181615]">{product.specs.crocin}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200/70">
                  <dt className="text-[#635E59]">Safranal (Volatile Aroma)</dt>
                  <dd className="font-mono-tabular font-medium text-[#181615]">{product.specs.safranal}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200/70">
                  <dt className="text-[#635E59]">Picrocrocin (Bitterness)</dt>
                  <dd className="font-mono-tabular font-medium text-[#181615]">{product.specs.picrocrocin}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-200/70">
                  <dt className="text-[#635E59]">Moisture / Curing</dt>
                  <dd className="font-mono-tabular font-medium text-[#181615]">{product.specs.moisture}</dd>
                </div>
                <div className="flex justify-between py-1.5">
                  <dt className="text-[#635E59]">Caliber / Filament Cut</dt>
                  <dd className="font-mono-tabular font-medium text-[#181615]">{product.specs.caliberOrCut}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata */}
              <div className="text-xs text-[#635E59] mb-2">
                <span>{product.origin}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{product.harvestPeriod}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{product.gradeSummary}</span>
              </div>

              <h2 id="pdp-modal-title" className="font-display text-2xl sm:text-3xl font-semibold text-[#181615] mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-[#635E59] mb-4">{product.subtitle}</p>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 pb-5 mb-5 border-b border-stone-200/90">
                <span className="font-mono-tabular text-2xl font-semibold text-[#181615]">
                  ₹{(selectedVariant.price * quantity).toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-mono-tabular text-[#635E59]">
                  {selectedVariant.weightOrCount} · {selectedVariant.unitNote}
                </span>
              </div>

              <p className="text-sm text-[#2D2A27] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#181615] mb-2.5">
                  Select Allocation / Weight
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = variant.id === selectedVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#181615] text-white border-[#181615]'
                            : 'bg-white text-[#181615] border-stone-200/90 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span>{variant.label}</span>
                          <span className="font-mono-tabular">₹{variant.price.toLocaleString('en-IN')}</span>
                        </div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            isSelected ? 'text-stone-300' : 'text-[#635E59]'
                          }`}
                        >
                          {variant.weightOrCount}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity + Primary Buy CTA */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-stone-300 rounded-xl bg-white px-2 py-1.5">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#181615] hover:bg-stone-100 rounded-lg cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono-tabular text-sm font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#181615] hover:bg-stone-100 rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBuy}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-[#8B4500] hover:bg-[#6E3600] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Orhues Bag</span>
                    </>
                  ) : (
                    <span>
                      Add to Bag — ₹{(selectedVariant.price * quantity).toLocaleString('en-IN')}
                    </span>
                  )}
                </button>
              </div>

              {/* Culinary / Agronomic Notes */}
              <div className="space-y-2 pt-4 border-t border-stone-200/80">
                <div className="text-xs font-semibold text-[#181615]">
                  Usage &amp; Provenance Notes
                </div>
                <ul className="space-y-1.5 text-xs text-[#524E4A]">
                  {product.agronomicOrCulinaryNotes.map((note, idx) => (
                    <li key={idx} className="leading-relaxed">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center gap-2 text-xs text-[#635E59]">
              <ShieldCheck className="w-4 h-4 text-[#9E1B1B] shrink-0" />
              <span>
                Accompanied by ISO 3632-2 batch spectrophotometry certificate &amp; phytosanitary clearance.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
