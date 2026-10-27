import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, Layers, Heart, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { TraditionalMusicController } from './TraditionalMusicController';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  savedLooksCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  savedLooksCount = 0
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'explore', label: t('nav.explore'), icon: BookOpen },
    { id: 'studio', label: t('nav.studio'), icon: Layers },
    { id: 'lookbook', label: t('nav.lookbook'), icon: Heart, count: savedLooksCount }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EADFCF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo (Far Left, Vertically Centered) */}
          <div
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex items-center select-none transition-all py-1"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('home');
              }
            }}
            aria-label="VIỆT PHỤC REMIX - Về trang chủ"
          >
            {/* Logo Image/Vector with preserved aspect ratio & brand title */}
            <Logo
              size="md"
              showText={true}
              className="h-11 sm:h-12 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#991B1E] bg-[#991B1E]/10 font-semibold'
                      : 'text-[#4A4036] hover:text-[#1C1917] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-[#991B1E] text-white text-[10px] font-bold rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA & Music Action Button */}
          <div className="hidden md:flex items-center gap-2.5">
            <TraditionalMusicController dropDirection="down" />

            {/* Quick Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#F2ECE0] border border-[#DECDB8] text-xs font-semibold text-[#5A4B3F] hover:text-[#991B1E] transition-all cursor-pointer shadow-2xs"
              title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#991B1E]" />
              <span>{language === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            <button
              id="header-start-remix-btn"
              onClick={() => handleNavClick('studio')}
              className="group relative inline-flex items-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>{language === 'vi' ? 'Bắt Đầu Remix' : 'Start Remix'}</span>
            </button>
          </div>

          {/* Mobile controls & hamburger toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2 py-1 rounded-full bg-[#FAF7F2] border border-[#DECDB8] text-[11px] font-bold text-[#5A4B3F]"
              title="Chuyển đổi ngôn ngữ"
            >
              {language === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
            </button>

            <TraditionalMusicController dropDirection="down" />

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#4A4036] hover:text-[#1C1917] hover:bg-[#F0E8DC] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2D5C3] bg-[#FAF7F2] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#991B1E]/10 text-[#991B1E] font-semibold'
                    : 'text-[#3E342B] hover:bg-[#F2ECE0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 opacity-75" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-2 py-0.5 bg-[#991B1E] text-white text-xs font-bold rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#E8DCB8]">
            <button
              id="mobile-start-remix-btn"
              onClick={() => handleNavClick('studio')}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#991B1E] text-white font-medium py-3 rounded-xl shadow-sm"
            >
              <Home className="w-5 h-5" />
              <span>Bắt đầu Remix Outfit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
