import React from 'react';
import { PageId } from '../data/saffronData';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (
    page: PageId,
    shopCategory?: 'all' | 'threads' | 'honey' | 'tea' | 'corms' | 'kits'
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (
    page: PageId,
    shopCategory?: 'all' | 'threads' | 'honey' | 'tea' | 'corms' | 'kits'
  ) => {
    onNavigate(page, shopCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FCF9F4] text-[#4A4540] pt-12 pb-10 border-t border-[#EFE5D8] relative">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Top Centered Social Icons Row */}
        <div className="flex items-center justify-center gap-3.5 pb-10">
          {/* YouTube */}
          <button
            type="button"
            onClick={() => handleLink('Media')}
            aria-label="Orhues YouTube Channel"
            className="w-11 h-11 rounded-full border border-[#DFCBB2] text-[#8B4500] hover:bg-[#8B4500] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M21.8 8.001a2.75 2.75 0 0 0-1.936-1.948C18.144 5.6 12 5.6 12 5.6s-6.144 0-7.864.453A2.75 2.75 0 0 0 2.2 8.001C1.75 9.73 1.75 12 1.75 12s0 2.27.45 3.999a2.75 2.75 0 0 0 1.936 1.948C5.856 18.4 12 18.4 12 18.4s6.144 0 7.864-.453a2.75 2.75 0 0 0 1.936-1.948C22.25 14.27 22.25 12 22.25 12s0-2.27-.45-3.999ZM9.95 14.85V9.15L15.2 12l-5.25 2.85Z" />
            </svg>
          </button>

          {/* Instagram */}
          <button
            type="button"
            onClick={() => handleLink('Gallery')}
            aria-label="Orhues Instagram"
            className="w-11 h-11 rounded-full border border-[#DFCBB2] text-[#8B4500] hover:bg-[#8B4500] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={() => handleLink('Our Story')}
            aria-label="Orhues Facebook"
            className="w-11 h-11 rounded-full border border-[#DFCBB2] text-[#8B4500] hover:bg-[#8B4500] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10Z" />
            </svg>
          </button>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => handleLink('Contact')}
            aria-label="Orhues WhatsApp +91 8089964529"
            className="w-11 h-11 rounded-full border border-[#DFCBB2] text-[#8B4500] hover:bg-[#8B4500] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
          </button>
        </div>

        {/* Top Divider */}
        <div className="border-t border-[#EFE5D8] pt-12 pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Column 1: SHOP */}
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-[#9A5B13] uppercase mb-5">
                SHOP
              </h3>
              <ul className="space-y-3.5 text-[15px] text-[#4A4540]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('Shop', 'threads')}
                    className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                  >
                    SAFFRON THREADS
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('Shop', 'honey')}
                    className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                  >
                    Saffron Infused Honey
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('Shop', 'tea')}
                    className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                  >
                    Luxury Saffron Tea
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: OUR SERVICES */}
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-[#9A5B13] uppercase mb-5">
                OUR SERVICES
              </h3>
              <ul className="space-y-3.5 text-[15px] text-[#4A4540]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('Training')}
                    className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                  >
                    Training
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('Infrastructure')}
                    className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                  >
                    Infrastructure
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: DISCOVER */}
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-[#9A5B13] uppercase mb-5">
                DISCOVER
              </h3>
              <ul className="space-y-3.5 text-[15px] text-[#4A4540]">
                {(
                  [
                    'Home',
                    'Shop',
                    'Our Story',
                    'Our Services',
                    'Technology',
                    'Blog',
                    'Press Release',
                    'Gallery',
                    'Contact'
                  ] as PageId[]
                ).map((page) => (
                  <li key={page}>
                    <button
                      type="button"
                      onClick={() => handleLink(page)}
                      className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                    >
                      {page}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: LEGAL */}
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-[#9A5B13] uppercase mb-5">
                LEGAL
              </h3>
              <ul className="space-y-3.5 text-[15px] text-[#4A4540]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('Privacy Policy')}
                    className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('Terms of Service')}
                    className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('Shipping')}
                    className="hover:text-[#8B4500] transition-colors cursor-pointer text-left"
                  >
                    Shipping
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: CONTACT */}
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-[#9A5B13] uppercase mb-5">
                CONTACT
              </h3>
              <ul className="space-y-4 text-[15px] text-[#4A4540]">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C29B6B] shrink-0 mt-1" />
                  <button
                    type="button"
                    onClick={() => handleLink('Contact')}
                    className="text-left hover:text-[#8B4500] transition-colors leading-snug cursor-pointer"
                  >
                    Thrissur, Kerala,
                    <br />
                    India
                  </button>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C29B6B] shrink-0" />
                  <a
                    href="tel:+918089964529"
                    className="hover:text-[#8B4500] transition-colors font-mono-tabular"
                  >
                    +91 8089964529
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C29B6B] shrink-0" />
                  <a
                    href="mailto:orhuessaffron@gmail.com"
                    className="hover:text-[#8B4500] transition-colors break-all"
                  >
                    orhuessaffron@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#C29B6B] shrink-0" />
                  <span>Mon-Sat, 9AM-6PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-[#EFE5D8] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6F63]">
          <span>© 2026 orhues. All Rights Reserved.</span>
          <span>Crafted with Passion in Kerala</span>
        </div>
      </div>

      {/* Floating Bottom-Right WhatsApp Action Button */}
      <button
        type="button"
        onClick={() => handleLink('Contact')}
        aria-label="Connect with Orhues on WhatsApp (+91 8089964529)"
        title="Connect with Orhues (+91 8089964529)"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#8B4500] hover:bg-[#6E3600] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      </button>
    </footer>
  );
};
