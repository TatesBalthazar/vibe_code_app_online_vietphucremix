import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass, Heart, Shield, Layers, Eye, Wand2, Wind } from 'lucide-react';
import { OUTFITS_DATA } from '../data/outfits';
import { EXPLORE_VIET_PHUC_TRANSLATIONS_EN } from '../data/exploreVietPhucTranslations';
import heroImg from '../assets/images/viet_phuc_hero.svg';
import { TraditionalWindAtmosphere } from '../components/TraditionalWindAtmosphere';
import { CulturalDailyTip } from '../components/CulturalDailyTip';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectOutfitToExplore: (outfitId: string) => void;
  onQuickStartRemix: (outfitId?: string) => void;
}

type OutfitCategoryFilter = 'all' | 'classic' | 'court' | 'ancient';

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectOutfitToExplore,
  onQuickStartRemix
}) => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<OutfitCategoryFilter>('all');
  const [hoveredOutfitId, setHoveredOutfitId] = useState<string | null>(null);

  const localizedOutfitsData = useMemo(() => {
    return OUTFITS_DATA.map((outfit) => {
      if (language !== 'en') return outfit;
      const en = EXPLORE_VIET_PHUC_TRANSLATIONS_EN[outfit.id];
      if (!en) return outfit;
      return {
        ...outfit,
        name: en.name || outfit.name,
        subtitle: en.subtitle || outfit.subtitle,
        description: en.description || outfit.description
      };
    });
  }, [language]);

  // Categorize the 10 outfits for intuitive browsing
  const filteredOutfits = localizedOutfitsData.filter((outfit) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'classic') {
      return ['ao-dai', 'ao-tu-than', 'ao-ngu-than', 'ao-ba-ba'].includes(outfit.id);
    }
    if (activeCategory === 'court') {
      return ['ao-nhat-binh', 'ao-tac', 'vien-linh', 'doi-kham'].includes(outfit.id);
    }
    if (activeCategory === 'ancient') {
      return ['giao-linh', 'ao-tay-chen'].includes(outfit.id);
    }
    return true;
  });

  return (
    <div className="relative w-full overflow-hidden space-y-24 sm:space-y-32">
      {/* Gentle Traditional Wind & Seasonal Petals Background Canvas Effect */}
      <TraditionalWindAtmosphere />

      {/* Subtle traditional auspicious cloud & wind wave vector curves in background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] overflow-hidden opacity-30 -z-10 select-none">
        <svg
          className="w-full h-full text-[#C8973E]/20"
          viewBox="0 0 1440 680"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flowing wind curve 1 */}
          <path
            d="M-100,180 C300,120 500,280 900,160 C1200,80 1400,220 1600,180"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          {/* Flowing wind curve 2 */}
          <path
            d="M-50,260 C250,210 600,340 1000,240 C1300,170 1500,290 1650,260"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.7"
          />
          {/* Flowing wind curve 3 */}
          <path
            d="M-120,380 C320,340 650,450 1050,360 C1350,300 1550,410 1700,380"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Text Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#991B1E]/10 text-[#991B1E] text-xs font-semibold uppercase tracking-widest border border-[#991B1E]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('hero.badge')}</span>
              </div>

              <div className="space-y-2">
                <span className="block text-xs uppercase tracking-[0.25em] text-[#7A6B5F] font-bold">
                  {t('hero.kicker')}
                </span>
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1C1917] leading-[1.08]">
                  {t('hero.titleLine1')} <br />
                  <span className="text-[#991B1E]">{t('hero.titleLine2')}</span> <br />
                  {t('hero.titleLine3')}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#52453B] leading-relaxed max-w-xl">
                {t('hero.desc')}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="hero-start-remix-btn"
                  onClick={() => onQuickStartRemix()}
                  className="group inline-flex items-center justify-center gap-3 bg-[#991B1E] hover:bg-[#781316] text-white px-8 py-4 rounded-full font-medium text-base shadow-sm hover:shadow-lg transition-all hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>{t('hero.startRemix')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-explore-btn"
                  onClick={() => onNavigate('explore')}
                  className="inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#3A2E24] px-6 py-4 rounded-full font-medium text-base border border-[#DACBBA] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#991B1E]" />
                  <span>{t('hero.explore')}</span>
                </button>
              </div>

              {/* Cultural Trust Points */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8DEC7] text-xs text-[#6B5C50]">
                <div>
                  <div className="font-serif font-bold text-base text-[#1C1917]">{t('hero.trustPoint1Title')}</div>
                  <span>{t('hero.trustPoint1Sub')}</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#1C1917]">{t('hero.trustPoint2Title')}</div>
                  <span>{t('hero.trustPoint2Sub')}</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#1C1917]">{t('hero.trustPoint3Title')}</div>
                  <span>{t('hero.trustPoint3Sub')}</span>
                </div>
              </div>
            </div>

            {/* Hero Right Fashion Editorial Image with Gentle Hover Animation */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                {/* Decorative glowing background halo */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#991B1E]/20 via-[#C8973E]/20 to-transparent blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E2D4C2] group-hover:border-[#C8973E]/50 bg-[#FAF7F2] aspect-[4/5] transform transition-all duration-700 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_25px_50px_-12px_rgba(153,27,30,0.25)]">
                  <img
                    src={heroImg}
                    alt="Người trẻ mặc Việt phục remix phong cách hiện đại"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Gentle silk light sheen on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                    <div className="absolute -inset-full h-[200%] w-[60%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-silk-shimmer" />
                  </div>

                  {/* Editorial Tag Overlay */}
                  <div className="absolute top-4 right-4 bg-black/45 backdrop-blur-md text-[#F5D587] text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/25 shadow-sm flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
                    <Sparkles className="w-3 h-3 text-[#F5D587]" />
                    <span>Gen Z Heritage Edition</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#FAF7F2]/95 backdrop-blur-md border border-white/70 shadow-lg transition-all duration-500 group-hover:border-[#C8973E]/40 group-hover:shadow-xl">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#991B1E] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C8973E]" />
                          Lookbook Spotlight
                        </span>
                        <h4 className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#991B1E] transition-colors">
                          Áo Dài & Áo Ngũ Thân
                        </h4>
                        <p className="text-xs text-[#6B5D52]">
                          Phối phong cách đương đại cùng bảng màu son & kem ngà
                        </p>
                      </div>
                      <button
                        onClick={() => onQuickStartRemix('ao-dai')}
                        className="p-3 rounded-full bg-[#991B1E] text-white hover:bg-[#781316] transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer shrink-0"
                        title="Remix ngay"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CULTURAL DAILY TIP (MẸO VĂN HÓA DI SẢN HÔM NAY) */}
      <CulturalDailyTip
        onQuickStartRemix={onQuickStartRemix}
        onSelectOutfitToExplore={onSelectOutfitToExplore}
      />

      {/* 3. EXPLORE VIỆT PHỤC SECTION WITH GENTLE HOVER ANIMATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#991B1E] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
            {t('explore.badge')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917]">
            {t('explore.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#594C42]">
            {t('explore.desc')}
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: t('explore.filterAll') },
              { id: 'classic', label: t('explore.filterClassic') },
              { id: 'court', label: t('explore.filterCourt') },
              { id: 'ancient', label: t('explore.filterAncient') }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as OutfitCategoryFilter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#991B1E] text-white shadow-sm ring-1 ring-[#991B1E]'
                    : 'bg-[#F2ECE0] text-[#594C42] hover:bg-[#E7DDCF] hover:text-[#1C1917]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Garment Cards Grid with Gentle, Interactive Hover Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOutfits.map((outfit) => {
            const isHovered = hoveredOutfitId === outfit.id;
            return (
              <div
                key={outfit.id}
                onMouseEnter={() => setHoveredOutfitId(outfit.id)}
                onMouseLeave={() => setHoveredOutfitId(null)}
                className="group relative rounded-2xl bg-[#FFFDF9] border border-[#E2D5C3] overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-[0_22px_40px_-12px_rgba(153,27,30,0.18),0_10px_20px_-6px_rgba(40,30,20,0.06)] hover:border-[#991B1E]/40"
              >
                {/* Top Garment Image Container with Gentle Zoom & Silk Sheen */}
                <div
                  onClick={() => onSelectOutfitToExplore(outfit.id)}
                  className="relative aspect-[4/5] overflow-hidden bg-[#ECE1D2] select-none"
                >
                  <img
                    src={outfit.image}
                    alt={outfit.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-[1.02]"
                  />

                  {/* Soft Silk Shimmer Highlight Sweep on Hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div className="absolute -inset-full h-[200%] w-[50%] -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-silk-shimmer" />
                  </div>

                  {/* Subtle Top Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Garment Name Badge with Gentle Elevation */}
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs text-[#1C1917] text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs border border-[#E2D5C3]/80 group-hover:bg-white group-hover:text-[#991B1E] group-hover:border-[#991B1E]/30 group-hover:shadow-sm group-hover:scale-105 transition-all duration-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#991B1E] opacity-75 group-hover:scale-125 transition-transform" />
                    <span>{outfit.name}</span>
                  </div>

                  {/* Gentle Floating Quick-Action Bar that slides up on Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center justify-between gap-2 bg-[#1C1917]/85 backdrop-blur-md text-white text-[11px] font-medium px-3 py-2 rounded-xl border border-white/20 shadow-lg">
                    <span className="flex items-center gap-1.5 truncate text-[#F5D587]">
                      <Sparkles className="w-3.5 h-3.5 text-[#F5D587] shrink-0 animate-pulse" />
                      <span className="truncate text-white font-medium">
                        {language === 'en'
                          ? 'Click to explore details'
                          : 'Bấm để khám phá chi tiết'}
                      </span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F5D587] shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        onClick={() => onSelectOutfitToExplore(outfit.id)}
                        className="font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#991B1E] transition-colors duration-300 cursor-pointer"
                      >
                        {outfit.name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold text-[#991B1E]/80 bg-[#991B1E]/8 px-2 py-0.5 rounded-full border border-[#991B1E]/15 shrink-0">
                        {language === 'en' ? 'Heritage' : 'Di Sản'}
                      </span>
                    </div>

                    <p className="text-xs text-[#7A6B5F] font-medium line-clamp-1 group-hover:text-[#594C42] transition-colors">
                      {outfit.subtitle}
                    </p>
                    <p className="text-xs text-[#4A3E35] line-clamp-2 leading-relaxed pt-1">
                      {outfit.description}
                    </p>
                  </div>

                  {/* Micro-interactive Action Buttons */}
                  <div className="pt-3 border-t border-[#EFE5D6] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectOutfitToExplore(outfit.id)}
                      className="flex-1 py-2 px-3 rounded-full text-xs font-semibold text-[#1C1917] bg-[#F2ECE0] hover:bg-[#E6DBCC] hover:text-[#991B1E] border border-transparent hover:border-[#991B1E]/20 transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7A6B5F] group-hover:text-[#991B1E] transition-colors" />
                      <span>{t('explore.learnMore')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickStartRemix(outfit.id)}
                      className="py-2 px-4 rounded-full text-xs font-semibold text-white bg-[#991B1E] hover:bg-[#781316] shadow-2xs hover:shadow-md transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer hover:scale-103 active:scale-95"
                      title={`Phối đồ ngay với ${outfit.name}`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F5D587]" />
                      <span>{t('explore.remix')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F5EFE6] border border-[#E4D7C5] p-8 sm:p-12 lg:p-16">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#991B1E]">
              {t('how.kicker')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-2">
              {t('how.title')}
            </h2>
            <p className="text-sm text-[#615247] mt-2">
              {t('how.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Step 01 */}
            <div className="relative bg-[#FFFDF9] p-7 rounded-2xl border border-[#E0D2C0] shadow-xs space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="font-serif text-3xl font-bold text-[#991B1E]">
                {t('how.step1Title')}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                {t('how.step1Head')}
              </h3>
              <p className="text-xs sm:text-sm text-[#54473D] leading-relaxed">
                {t('how.step1Desc')}
              </p>
            </div>

            {/* Step 02 */}
            <div className="relative bg-[#FFFDF9] p-7 rounded-2xl border border-[#E0D2C0] shadow-xs space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="font-serif text-3xl font-bold text-[#991B1E]">
                {t('how.step2Title')}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                {t('how.step2Head')}
              </h3>
              <p className="text-xs sm:text-sm text-[#54473D] leading-relaxed">
                {t('how.step2Desc')}
              </p>
            </div>

            {/* Step 03 */}
            <div className="relative bg-[#FFFDF9] p-7 rounded-2xl border border-[#E0D2C0] shadow-xs space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="font-serif text-3xl font-bold text-[#991B1E]">
                  {t('how.step3Title')}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  {t('how.step3Head')}
                </h3>
                <p className="text-xs sm:text-sm text-[#54473D] leading-relaxed">
                  {t('how.step3Desc')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#991B1E] hover:underline cursor-pointer pt-2 self-start"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('how.step3Action')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#781316] via-[#991B1E] to-[#59151A] text-white p-10 sm:p-16 overflow-hidden shadow-xl text-center space-y-6">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-[#F5E6CC]">
            {t('cta.kicker')}
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold max-w-2xl mx-auto tracking-tight">
            {t('cta.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#F7ECE1]/90 max-w-lg mx-auto leading-relaxed">
            {t('cta.desc')}
          </p>

          <div className="pt-2">
            <button
              id="cta-create-look-btn"
              onClick={() => onQuickStartRemix()}
              className="inline-flex items-center gap-3 bg-[#FAF7F2] hover:bg-white text-[#991B1E] font-bold px-8 py-4 rounded-full text-base shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t('cta.btn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
