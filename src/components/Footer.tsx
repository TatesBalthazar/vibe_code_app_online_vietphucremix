import React from 'react';
import { Sparkles, Heart, Music, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { TraditionalMusicController } from './TraditionalMusicController';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="border-t border-[#E4D7C5] bg-[#F5EFE6] text-[#4A3E34] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-3 cursor-pointer group"
            >
              <Logo size="sm" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#1C1917] group-hover:text-[#991B1E] transition-colors">
                  {t('footer.brandTitle')}
                </span>
                <span className="text-xs font-medium text-[#7A6B5F] italic">
                  {t('footer.tagline')}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#594C42] max-w-md">
              {t('footer.mission')}
            </p>
            <div className="pt-2 text-xs text-[#827163]">
              {t('footer.openData')}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif font-bold text-[#1C1917] text-base mb-4 tracking-wide">
              {t('footer.navHeader')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#991B1E] transition-colors cursor-pointer"
                >
                  {t('footer.navHome')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#991B1E] transition-colors cursor-pointer"
                >
                  {t('footer.navExplore')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="hover:text-[#991B1E] transition-colors font-medium text-[#991B1E] cursor-pointer"
                >
                  {t('footer.navStudio')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lookbook')}
                  className="hover:text-[#991B1E] transition-colors cursor-pointer"
                >
                  {t('footer.navLookbook')}
                </button>
              </li>
            </ul>
          </div>

          {/* Cultural Philosophy */}
          <div>
            <h4 className="font-serif font-bold text-[#1C1917] text-base mb-4 tracking-wide">
              {t('footer.cultureHeader')}
            </h4>
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E4D7C5] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#991B1E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Culture Check Engine</span>
              </div>
              <p className="text-xs text-[#5C4F45] leading-relaxed">
                {t('footer.cultureMsg')}
              </p>
            </div>
          </div>
        </div>

        {/* Traditional Vietnamese Music Atmosphere Player in Footer */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF5EC] via-[#FFFDF9] to-[#F5EBDD] border border-[#DFCDB7] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center shrink-0 shadow-2xs">
              <Music className="w-5 h-5 text-[#991B1E]" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h4 className="font-serif text-sm font-bold text-[#1C1917]">
                  {t('footer.musicTitle')}
                </h4>
                <span className="text-[10px] font-bold text-[#991B1E] bg-[#991B1E]/10 px-2 py-0.5 rounded-full hidden sm:inline">
                  {t('footer.musicInstruments')}
                </span>
              </div>
              <p className="text-xs text-[#7A695B] mt-0.5">
                {t('footer.musicDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <TraditionalMusicController dropDirection="up" />
          </div>
        </div>

        {/* Bottom Bar: Copyright, Language Switcher Control, and Made with Love */}
        <div className="border-t border-[#DECDBB] mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#7A695B] gap-4">
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>

          {/* Prominent Language Switcher Control in Footer */}
          <div className="flex items-center gap-2.5 bg-[#FAF7F2] border border-[#DFCBB5] px-3.5 py-1.5 rounded-full shadow-2xs">
            <Globe className="w-4 h-4 text-[#991B1E]" />
            <span className="text-[11px] font-medium text-[#615247]">
              {t('footer.langLabel')}
            </span>
            <div className="flex items-center bg-[#EFE5D6] p-0.5 rounded-full">
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  language === 'vi'
                    ? 'bg-[#991B1E] text-white shadow-2xs font-bold'
                    : 'text-[#615247] hover:text-[#1C1917]'
                }`}
                aria-pressed={language === 'vi'}
                title="Chuyển sang Tiếng Việt"
              >
                <span>🇻🇳</span>
                <span>Tiếng Việt</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  language === 'en'
                    ? 'bg-[#991B1E] text-white shadow-2xs font-bold'
                    : 'text-[#615247] hover:text-[#1C1917]'
                }`}
                aria-pressed={language === 'en'}
                title="Switch to English"
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span>{t('footer.love')}</span>
            <Heart className="w-3.5 h-3.5 text-[#991B1E] fill-[#991B1E]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
