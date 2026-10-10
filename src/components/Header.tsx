import React, { useState } from 'react';
import { PageId } from '../data/saffronData';
import { ChevronDown, ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId, shopCategory?: 'all' | 'threads' | 'honey' | 'tea' | 'corms' | 'kits') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenHelp
}) => {
  const [openDropdown, setOpenDropdown] = useState<'services' | 'media' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServicesGroup =
    activePage === 'Our Services' ||
    activePage === 'Training' ||
    activePage === 'Infrastructure';

  const isMediaGroup =
    activePage === 'Media' ||
    activePage === 'Blog' ||
    activePage === 'Press Release' ||
    activePage === 'Gallery';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAE0D2]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between gap-6">
        {/* Left: ORHUES Emblem & Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('Home')}
          className="flex flex-col items-center justify-center group cursor-pointer shrink-0 focus:outline-none"
          aria-label="ORHUES — Go to Home page"
        >
          {/* Golden Saffron Blossom Emblem */}
          <svg
            viewBox="0 0 80 48"
            className="w-14 h-9 mb-0.5 transition-transform duration-200 group-hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="orhuesGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D8AE5E" />
                <stop offset="50%" stopColor="#9E6A21" />
                <stop offset="100%" stopColor="#72460D" />
              </linearGradient>
            </defs>
            {/* Outer Left & Right Golden Petals */}
            <path
              d="M38 42C24 40 12 31 10 20C18 19 29 26 38 42Z"
              fill="url(#orhuesGold)"
              opacity="0.88"
            />
            <path
              d="M42 42C56 40 68 31 70 20C62 19 51 26 42 42Z"
              fill="url(#orhuesGold)"
              opacity="0.88"
            />
            {/* Mid Left & Right Golden Petals */}
            <path
              d="M39 41C27 33 21 20 24 9C32 13 37 25 39 41Z"
              fill="url(#orhuesGold)"
            />
            <path
              d="M41 41C53 33 59 20 56 9C48 13 43 25 41 41Z"
              fill="url(#orhuesGold)"
            />
            {/* Center Upright Golden Petal */}
            <path
              d="M40 41C34 27 34 12 40 2C46 12 46 27 40 41Z"
              fill="url(#orhuesGold)"
            />
            {/* Inner Light Highlights */}
            <path
              d="M40 37C37 26 37 15 40 7C43 15 43 26 40 37Z"
              fill="#F8E5B8"
              opacity="0.65"
            />
            {/* 3 Crimson Saffron Stigmas */}
            <path
              d="M40 39C38 30 35 23 33 19"
              stroke="#A91D1D"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="33" cy="19" r="1.5" fill="#A91D1D" />
            <path
              d="M40 39V16"
              stroke="#A91D1D"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="40" cy="16" r="1.6" fill="#A91D1D" />
            <path
              d="M40 39C42 30 45 23 47 19"
              stroke="#A91D1D"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="47" cy="19" r="1.5" fill="#A91D1D" />
          </svg>

          <span className="font-display text-2xl font-bold tracking-[0.14em] text-[#8A5A1E] leading-none">
            ORHUES
          </span>
          <span className="text-[7px] font-semibold tracking-[0.18em] text-[#5C4932] uppercase mt-1">
            RARE. REDEFINED. REVERED.
          </span>
          {/* Ornamental Flourish Line */}
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-6 h-[1px] bg-[#C5A478]" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#9E6A21]" />
            <span className="w-6 h-[1px] bg-[#C5A478]" />
          </div>
        </button>

        {/* Center: Primary Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-9 text-[16px] font-medium text-[#4A4540]"
          aria-label="Primary Navigation"
        >
          {/* Home */}
          <button
            type="button"
            onClick={() => handleNavClick('Home')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activePage === 'Home'
                ? 'text-[#8B4500] border-[#8B4500] font-semibold'
                : 'border-transparent hover:text-[#8B4500]'
            }`}
          >
            Home
          </button>

          {/* Shop */}
          <button
            type="button"
            onClick={() => handleNavClick('Shop')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activePage === 'Shop'
                ? 'text-[#8B4500] border-[#8B4500] font-semibold'
                : 'border-transparent hover:text-[#8B4500]'
            }`}
          >
            Shop
          </button>

          {/* Our Story */}
          <button
            type="button"
            onClick={() => handleNavClick('Our Story')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activePage === 'Our Story'
                ? 'text-[#8B4500] border-[#8B4500] font-semibold'
                : 'border-transparent hover:text-[#8B4500]'
            }`}
          >
            Our Story
          </button>

          {/* Our Services (Clickable + Dropdown for Training & Infrastructure) */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('services')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleNavClick('Our Services')}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 flex items-center gap-1.5 ${
                  isServicesGroup
                    ? 'text-[#8B4500] border-[#8B4500] font-semibold'
                    : 'border-transparent hover:text-[#8B4500]'
                }`}
              >
                <span>Our Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    openDropdown === 'services' ? 'rotate-180 text-[#8B4500]' : ''
                  }`}
                />
              </button>
            </div>

            {openDropdown === 'services' && (
              <div className="absolute left-0 top-full pt-2 w-52 z-50">
                <div className="bg-white rounded-xl border border-[#EAE0D2] shadow-lg py-2 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleNavClick('Our Services')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'Our Services'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    Our Services Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('Training')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'Training'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    Training
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('Infrastructure')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'Infrastructure'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    Infrastructure
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Technology */}
          <button
            type="button"
            onClick={() => handleNavClick('Technology')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activePage === 'Technology'
                ? 'text-[#8B4500] border-[#8B4500] font-semibold'
                : 'border-transparent hover:text-[#8B4500]'
            }`}
          >
            Technology
          </button>

          {/* Media (Clickable + Dropdown for Blog, Press Release, Gallery) */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('media')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => handleNavClick('Media')}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 flex items-center gap-1.5 ${
                isMediaGroup
                  ? 'text-[#8B4500] border-[#8B4500] font-semibold'
                  : 'border-transparent hover:text-[#8B4500]'
              }`}
            >
              <span>Media</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  openDropdown === 'media' ? 'rotate-180 text-[#8B4500]' : ''
                }`}
              />
            </button>

            {openDropdown === 'media' && (
              <div className="absolute left-0 top-full pt-2 w-52 z-50">
                <div className="bg-white rounded-xl border border-[#EAE0D2] shadow-lg py-2 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleNavClick('Media')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'Media'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    Media Hub
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('Blog')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'Blog'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    Blog
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('Press Release')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'Press Release'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    Press Release
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('Gallery')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'Gallery'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    Gallery
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right: CONTACT Button + Question Bubble Icon + Shopping Bag Icon */}
        <div className="flex items-center gap-3.5 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('Contact')}
            className="hidden sm:inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white text-xs font-bold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            CONTACT
          </button>

          {/* Circular Help / Question Bubble Icon Button */}
          <button
            type="button"
            onClick={onOpenHelp}
            aria-label="Agronomy & Order Help"
            title="Quick Help & Consultation"
            className="w-11 h-11 rounded-full border border-[#DEC8AE] hover:border-[#8B4500] bg-white hover:bg-[#FCF8F2] text-[#8B4500] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.64 2.64 1 4.127 1Z" />
              <path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" />
              <circle cx="12" cy="17" r="0.6" fill="currentColor" />
            </svg>
          </button>

          {/* Circular Shopping Bag Icon Button */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            title="Open Shopping Bag"
            className="w-11 h-11 rounded-full border border-[#DEC8AE] hover:border-[#8B4500] bg-white hover:bg-[#FCF8F2] text-[#8B4500] flex items-center justify-center transition-colors relative cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.9]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8B4500] text-white text-[10px] font-mono-tabular font-semibold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-11 h-11 rounded-full border border-[#DEC8AE] text-[#8B4500] flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#EAE0D2] px-6 py-5 space-y-2">
          {(
            [
              'Home',
              'Shop',
              'Our Story',
              'Our Services',
              'Training',
              'Infrastructure',
              'Technology',
              'Media',
              'Blog',
              'Press Release',
              'Gallery',
              'Contact'
            ] as PageId[]
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handleNavClick(page)}
              className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium cursor-pointer ${
                activePage === page
                  ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                  : 'text-[#4A4540] hover:bg-[#FCF8F2]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
