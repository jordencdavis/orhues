import React, { useState, useEffect } from 'react';
import { SaffronProduct, ProductVariant } from '../data/saffronData';
import { ResilientImage } from './ResilientImage';
import { X, Plus, Minus, Trash2, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';

export interface CartItem {
  product: SaffronProduct;
  variant: ProductVariant;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
  onExploreShop?: () => void;
}

interface ConfirmedOrder {
  orderNumber: string;
  customerName: string;
  emailOrPhone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'card-settlement' | 'cod';
  climateZone: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  timestamp: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreShop
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card-settlement' | 'cod'>('card-settlement');
  const [customerName, setCustomerName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [climateZone, setClimateZone] = useState('Kerala / South India (Indoor CEA)');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const safeItems = Array.isArray(items)
    ? items.filter((item) => item && item.product && item.variant && item.quantity > 0)
    : [];

  // Ensure if all items are removed while in checkout, we safely return to the empty cart view
  useEffect(() => {
    if (safeItems.length === 0 && step === 'checkout') {
      setStep('cart');
    }
  }, [safeItems.length, step]);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const subtotal = safeItems.reduce(
    (sum, item) => sum + Number(item.variant?.price ?? 0) * Number(item.quantity ?? 1),
    0
  );
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 250;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
    if (safeItems.length === 0) return;
    setFormError('');
    setStep('checkout');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !emailOrPhone.trim() || !address.trim() || !postalCode.trim()) {
      setFormError('Please complete your recipient name, contact phone/email, delivery address, and PIN code.');
      return;
    }

    const orderNum = `OR-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      customerName: customerName.trim(),
      emailOrPhone: emailOrPhone.trim(),
      address: address.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
      climateZone,
      items: [...safeItems],
      subtotal,
      shipping,
      total,
      timestamp: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    });
    onClearCart();
    setStep('confirmed');
  };

  const handleResetAndClose = () => {
    setStep('cart');
    setFormError('');
    onClose();
  };

  const handleBrowseShop = () => {
    setStep('cart');
    setFormError('');
    if (onExploreShop) {
      onExploreShop();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Orhues Shopping Bag and Dispatch Checkout"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleResetAndClose();
        }
      }}
    >
      <div className="w-full max-w-md bg-[#F9F8F6] h-full flex flex-col justify-between border-l border-[#EAE0D2] shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-[#EAE0D2] flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#181615]">
              {step === 'cart' && 'Orhues Shopping Bag'}
              {step === 'checkout' && 'Phytosanitary & Delivery Verification'}
              {step === 'confirmed' && 'Allocation Confirmed'}
            </h2>
            <p className="text-xs text-[#635E59]">
              {step === 'cart' &&
                (safeItems.length === 0
                  ? 'Complimentary All-India dispatch on orders above ₹5,000'
                  : subtotal >= FREE_SHIPPING_THRESHOLD
                    ? 'Complimentary climate-controlled dispatch unlocked'
                    : `Add ₹${Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more for complimentary dispatch`)}
              {step === 'checkout' && 'Direct from Orhues Thrissur, Kerala'}
              {step === 'confirmed' && `Order #${confirmedOrder?.orderNumber} — Preparing Shipment`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close bag drawer"
            className="w-9 h-9 rounded-full border border-[#EAE0D2] flex items-center justify-center text-[#181615] hover:bg-[#FCF9F4] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' && (
            <>
              {safeItems.length === 0 ? (
                <div className="min-h-[320px] flex flex-col items-center justify-center text-center py-12 px-4 bg-white rounded-2xl border border-[#EAE0D2]">
                  <div className="w-14 h-14 rounded-full bg-[#FCF9F4] border border-[#EAE0D2] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-[#8B4500] stroke-[1.6]" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#181615] mb-2">
                    Your Orhues Bag is Empty
                  </h3>
                  <p className="text-xs sm:text-sm text-[#635E59] max-w-xs mb-6 leading-relaxed">
                    You have no items in your shopping bag yet. Explore single-origin ISO 3632 Grade I Saffron Threads, Saffron Infused Honey, Luxury Saffron Tea, or Caliber 10/+ Mother Corms.
                  </p>
                  <button
                    type="button"
                    onClick={handleBrowseShop}
                    className="py-3 px-6 rounded-full bg-[#8B4500] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6E3600] transition-colors cursor-pointer"
                  >
                    Explore Orhues Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {safeItems.map((item) => {
                    const unitPrice = Number(item.variant?.price ?? 0);
                    const itemQty = Number(item.quantity ?? 1);
                    const lineTotal = unitPrice * itemQty;

                    return (
                      <div
                        key={`${item.product.id}-${item.variant.id}`}
                        className="p-4 rounded-xl bg-white border border-[#EAE0D2] flex gap-4"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F4ECE1] shrink-0">
                          <ResilientImage
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-[#181615] truncate">
                              {item.product.name}
                            </h3>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveItem(item.product.id, item.variant.id);
                              }}
                              aria-label={`Remove ${item.product.name}`}
                              title="Remove item"
                              className="p-1 text-stone-400 hover:text-[#9E1B1B] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-xs text-[#635E59] mt-0.5">
                            {item.variant.label} · {item.variant.weightOrCount}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-[#EAE0D2] rounded-lg bg-[#FCF9F4]">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUpdateQuantity(item.product.id, item.variant.id, -1);
                                }}
                                className="w-7 h-7 flex items-center justify-center text-[#181615] hover:bg-[#F4ECE1] rounded-l-lg cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-mono-tabular text-xs font-semibold">
                                {itemQty}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUpdateQuantity(item.product.id, item.variant.id, 1);
                                }}
                                className="w-7 h-7 flex items-center justify-center text-[#181615] hover:bg-[#F4ECE1] rounded-r-lg cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-mono-tabular text-sm font-semibold text-[#181615]">
                              ₹{lineTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && safeItems.length > 0 && (
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#9E1B1B]">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                  Full Name or Farm / Kitchen Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rahul Nair / Malabar Spice Kitchen"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-[#181615] focus:outline-none focus:border-[#8B4500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                  Phone Number &amp; Dispatch Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., +91 98470 12345 · rahul@domain.in"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-[#181615] focus:outline-none focus:border-[#8B4500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="MG Road, Thrissur, Kerala"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-[#181615] focus:outline-none focus:border-[#8B4500]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="680001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-sm font-mono-tabular text-[#181615] focus:outline-none focus:border-[#8B4500]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                    Cultivation Region
                  </label>
                  <select
                    value={climateZone}
                    onChange={(e) => setClimateZone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-[#181615] focus:outline-none focus:border-[#8B4500]"
                  >
                    <option value="Kerala / South India (Indoor CEA)">Kerala / South India (CEA)</option>
                    <option value="North / Central India">North / Central India</option>
                    <option value="Western Ghats / Hill Station">Hill Station / Terrace</option>
                    <option value="Culinary / Home Use Only">Culinary / Home Use</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#181615] mb-2">
                  Settlement Method
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card-settlement')}
                    className={`p-3 rounded-xl border text-left text-xs cursor-pointer ${
                      paymentMethod === 'card-settlement'
                        ? 'bg-[#8B4500] text-white border-[#8B4500]'
                        : 'bg-white text-[#181615] border-stone-300'
                    }`}
                  >
                    <div className="font-semibold">UPI / Direct Invoice</div>
                    <div className={paymentMethod === 'card-settlement' ? 'text-stone-200 mt-0.5' : 'text-[#635E59] mt-0.5'}>
                      Immediate lot reservation
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left text-xs cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-[#8B4500] text-white border-[#8B4500]'
                        : 'bg-white text-[#181615] border-stone-300'
                    }`}
                  >
                    <div className="font-semibold">Cash on Delivery (COD)</div>
                    <div className={paymentMethod === 'cod' ? 'text-stone-200 mt-0.5' : 'text-[#635E59] mt-0.5'}>
                      Pay upon courier verification
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-white border border-[#EAE0D2]">
                <div className="flex items-center gap-2.5 text-[#181615] mb-2">
                  <CheckCircle2 className="w-5 h-5 text-[#8B4500] shrink-0" />
                  <span className="font-display text-xl font-semibold">
                    Order #{confirmedOrder.orderNumber} Confirmed — Preparing Shipment
                  </span>
                </div>
                <p className="text-xs text-[#635E59] leading-relaxed">
                  Your ISO 3632 batch certificate and phytosanitary dispatch dossier have been assigned to{' '}
                  <span className="text-[#181615] font-medium">{confirmedOrder.customerName}</span>.
                </p>

                <div className="mt-4 pt-4 border-t border-[#EAE0D2] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#635E59]">Dispatch Destination</span>
                    <span className="font-medium text-[#181615] text-right">
                      {confirmedOrder.address} - {confirmedOrder.postalCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#635E59]">Region Tag</span>
                    <span className="font-medium text-[#181615]">{confirmedOrder.climateZone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#635E59]">Settlement</span>
                    <span className="font-medium text-[#181615]">
                      {confirmedOrder.paymentMethod === 'cod'
                        ? 'Cash on Delivery (Verified)'
                        : 'UPI / Direct Invoice'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EAE0D2]">
                <h4 className="text-xs font-semibold text-[#181615] mb-3">
                  Reserved Lot Summary
                </h4>
                <div className="space-y-2.5 text-xs">
                  {confirmedOrder.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.variant.id}`}
                      className="flex justify-between py-1 border-b border-stone-100"
                    >
                      <span className="text-[#2D2A27]">
                        {item.quantity}× {item.product.name} ({item.variant.label})
                      </span>
                      <span className="font-mono-tabular font-medium text-[#181615]">
                        ₹{(Number(item.variant?.price ?? 0) * Number(item.quantity ?? 1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 font-semibold text-sm text-[#181615]">
                    <span>Total Settlement</span>
                    <span className="font-mono-tabular">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== 'confirmed' && safeItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#EAE0D2] space-y-4 shrink-0">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#635E59]">
                <span>Subtotal</span>
                <span className="font-mono-tabular">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#635E59]">
                <span>Climate-Insulated Courier (All India)</span>
                <span className="font-mono-tabular">
                  {shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#181615] pt-2 border-t border-[#EAE0D2]">
                <span>Total</span>
                <span className="font-mono-tabular">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Dispatch Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="py-3 px-4 rounded-full border border-stone-300 text-xs font-medium text-[#181615] hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 px-5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Confirm Allocation — ₹{total.toLocaleString('en-IN')}
                </button>
              </div>
            )}
          </div>
        )}

        {step !== 'confirmed' && safeItems.length === 0 && (
          <div className="p-5 bg-white border-t border-[#EAE0D2] text-center text-xs text-[#635E59] shrink-0">
            ORHUES · Thrissur, Kerala · ISO 3632 Grade I Verified
          </div>
        )}

        {step === 'confirmed' && (
          <div className="p-6 bg-white border-t border-[#EAE0D2] shrink-0">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3.5 px-6 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Return to Orhues
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
