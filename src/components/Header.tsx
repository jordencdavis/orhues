import React, { useState } from 'react';
import { PageId, ORHUES_LOGO } from '../data/saffronData';
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
  const [openDropdown, setOpenDropdown] = useState<'story' | 'services' | 'media' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStoryGroup =
    activePage === 'Our Story' ||
    activePage === 'Indoor Cultivation' ||
    activePage === 'About Us';

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
        {/* Left: ORHUES Logo Image */}
        <button
          type="button"
          onClick={() => handleNavClick('Home')}
          className="flex items-center justify-center group cursor-pointer shrink-0 focus:outline-none"
          aria-label="ORHUES — Go to Home page"
        >
          <img
            src={ORHUES_LOGO}
            alt="ORHUES — Rare. Redefined. Revered."
            className="h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
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

          {/* Our Story (Clickable + Dropdown for Indoor Cultivation & About Us) */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('story')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => handleNavClick('Our Story')}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 flex items-center gap-1.5 ${
                isStoryGroup
                  ? 'text-[#8B4500] border-[#8B4500] font-semibold'
                  : 'border-transparent hover:text-[#8B4500]'
              }`}
            >
              <span>Our Story</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  openDropdown === 'story' ? 'rotate-180 text-[#8B4500]' : ''
                }`}
              />
            </button>

            {openDropdown === 'story' && (
              <div className="absolute left-0 top-full pt-2 w-56 z-50">
                <div className="bg-white rounded-xl border border-[#EAE0D2] shadow-lg py-2 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleNavClick('Indoor Cultivation')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'Indoor Cultivation'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    Indoor Cultivation
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('About Us')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activePage === 'About Us'
                        ? 'bg-[#FCF8F2] text-[#8B4500] font-semibold'
                        : 'text-[#4A4540] hover:bg-[#FCF8F2] hover:text-[#8B4500]'
                    }`}
                  >
                    About Us
                  </button>
                </div>
              </div>
            )}
          </div>

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
              'Indoor Cultivation',
              'About Us',
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
