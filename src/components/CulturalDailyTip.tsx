import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  History,
  Compass,
  Bookmark
} from 'lucide-react';
import { CULTURAL_DAILY_TIPS, CulturalTipItem } from '../data/culturalTips';
import { OutfitId } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CulturalDailyTipProps {
  onQuickStartRemix: (outfitId?: string) => void;
  onSelectOutfitToExplore: (outfitId: string) => void;
  className?: string;
}

export const CulturalDailyTip: React.FC<CulturalDailyTipProps> = ({
  onQuickStartRemix,
  onSelectOutfitToExplore,
  className = ''
}) => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isExpandedStory, setIsExpandedStory] = useState<boolean>(false);

  // Filter tips based on category
  const filteredTips = CULTURAL_DAILY_TIPS.filter((tip) => {
    if (selectedCategory === 'all') return true;
    return tip.category === selectedCategory;
  });

  // Ensure currentIndex stays within bounds of filtered tips
  const safeIndex = currentIndex % Math.max(1, filteredTips.length);
  const currentTip: CulturalTipItem = filteredTips[safeIndex] || CULTURAL_DAILY_TIPS[0];

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTips.length);
      setIsAnimating(false);
      setIsExpandedStory(false);
    }, 150);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredTips.length) % filteredTips.length);
      setIsAnimating(false);
      setIsExpandedStory(false);
    }, 150);
  };

  const handleRandomTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredTips.length);
      setCurrentIndex(randomIndex);
      setIsAnimating(false);
      setIsExpandedStory(false);
    }, 150);
  };

  const handleCopyTip = () => {
    const textToCopy = `[CULTURAL DAILY TIP · ${currentTip.title}]\n\n💡 Bạn có biết: ${currentTip.didYouKnow}\n\n📜 Nguồn gốc: ${currentTip.era}\n✨ Gợi ý phối đồ: ${currentTip.stylingInspiration}\n\n#VietPhucRemix #GiaiThoaiCoPhuc #MacVietTheoCachCuaBan`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const currentDateFormatted = new Date().toLocaleDateString(
    language === 'en' ? 'en-US' : 'vi-VN',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  return (
    <section
      id="cultural-daily-tip-section"
      aria-label="Mẹo và giai thoại văn hóa hằng ngày"
      className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {/* Toast Alert */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs sm:text-sm animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{t('dailyTip.copiedToast')}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] border border-[#DECDB8] shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12 transition-all">
        {/* Subtle Decorative Background Seal / Calligraphy Ring */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 rounded-full border-[18px] border-[#C8973E]/10 -z-0 opacity-40 select-none" />
        <div className="pointer-events-none absolute -right-6 -top-6 w-52 h-52 rounded-full border-2 border-dashed border-[#991B1E]/15 -z-0 opacity-40 select-none" />

        {/* Section Top Header & Filters Bar */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EADBC8] pb-5 mb-6 sm:mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#991B1E] animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#991B1E]">
                {t('dailyTip.badge')}
              </span>
              <span className="text-xs text-[#8C7A6B]">·</span>
              <span className="text-xs font-serif text-[#6B5C50] capitalize">
                {currentDateFormatted}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {t('dailyTip.title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#66574C]">
              {t('dailyTip.desc')}
            </p>
          </div>

          {/* Interactive Navigation & Random Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={handleRandomTip}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFDF9] hover:bg-white text-[#991B1E] border border-[#DECDB8] hover:border-[#991B1E]/40 text-xs font-semibold transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Đổi mẩu tin ngẫu nhiên khác"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('dailyTip.refresh')}</span>
            </button>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1 bg-[#FFFDF9] border border-[#DECDB8] rounded-full p-1">
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 rounded-full hover:bg-[#F2ECE0] text-[#615247] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Mẩu tin trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs font-semibold px-2 text-[#7A6B5F]">
                {safeIndex + 1}/{filteredTips.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 rounded-full hover:bg-[#F2ECE0] text-[#615247] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Mẩu tin tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
          {[
            { id: 'all', label: 'Tất Cả Mẹo' },
            { id: 'symbolism', label: 'Triết Học & Ý Nghĩa' },
            { id: 'accessory', label: 'Phụ Kiện Kinh Điển' },
            { id: 'outfit', label: 'Cổ Phục & Phom Dáng' },
            { id: 'craft', label: 'Màu Sắc & Chất Liệu' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#991B1E] text-white shadow-2xs font-bold'
                  : 'bg-[#FFFDF9] text-[#615247] hover:bg-[#F2ECE0] border border-[#DECDB8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* The Tip Spotlight Content Card */}
        <div
          className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-opacity duration-200 ${
            isAnimating ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
          }`}
        >
          {/* Left Column: Headline, Did You Know & Historical Lore */}
          <div className="lg:col-span-8 space-y-5">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white shadow-2xs"
                style={{ backgroundColor: currentTip.categoryColor }}
              >
                {currentTip.badge}
              </span>
              <span className="text-xs font-semibold text-[#8A631E] bg-[#C8973E]/15 px-2.5 py-0.5 rounded-full border border-[#C8973E]/30">
                {currentTip.culturalTag}
              </span>
              <span className="text-xs text-[#7A6B5F] flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-[#991B1E]" />
                <span>{currentTip.era}</span>
              </span>
            </div>

            {/* Main Title */}
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
              {currentTip.title}
            </h4>

            {/* Did You Know Quote Callout */}
            <div className="relative p-5 rounded-2xl bg-white/85 border border-[#DECDB8] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#991B1E]">
                <Lightbulb className="w-4 h-4 text-[#C8973E]" />
                <span>{t('dailyTip.didYouKnow')}</span>
              </div>
              <p className="font-serif text-base sm:text-lg text-[#2D241E] leading-relaxed italic">
                "{currentTip.didYouKnow}"
              </p>
              <div className="text-xs font-semibold text-[#8C7A6B] pt-1">
                {t('dailyTip.focusItem')} <span className="text-[#991B1E]">{currentTip.itemFocus}</span>
              </div>
            </div>

            {/* Historical Lore Accordion */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsExpandedStory(!isExpandedStory)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#7A6B5F] hover:text-[#991B1E] transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isExpandedStory ? t('dailyTip.collapse') : t('dailyTip.readMore')}</span>
              </button>

              {isExpandedStory && (
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5D7C3] text-xs sm:text-sm text-[#4A3B32] leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                  {currentTip.historicalStory}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Styling Inspiration for Today & Instant Actions */}
          <div className="lg:col-span-4 bg-[#FFFDF9] rounded-2xl p-6 border border-[#DECDB8] shadow-xs space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8A631E]">
                <Sparkles className="w-4 h-4 text-[#C8973E]" />
                <span>{t('dailyTip.modernInspo')}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#54463C] leading-relaxed">
                {currentTip.stylingInspiration}
              </p>
            </div>

            <div className="pt-2 border-t border-[#EFE5D6] space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[#7A6B5F]">
                <span>{t('dailyTip.relatedOutfit')}</span>
                <strong className="text-[#1C1917] font-serif">{currentTip.relatedOutfitName}</strong>
              </div>
              {currentTip.relatedAccessoryName && (
                <div className="flex items-center justify-between text-[#7A6B5F]">
                  <span>{t('dailyTip.recommendedAccessory')}</span>
                  <strong className="text-[#991B1E]">{currentTip.relatedAccessoryName}</strong>
                </div>
              )}
            </div>

            {/* Action Buttons: Jump to Studio, Explore, Copy */}
            <div className="pt-3 border-t border-[#EFE5D6] space-y-2.5">
              <button
                type="button"
                onClick={() => onQuickStartRemix(currentTip.relatedOutfitId)}
                className="w-full py-3 px-4 rounded-xl bg-[#991B1E] hover:bg-[#781316] text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-97"
              >
                <Sparkles className="w-4 h-4 text-[#F5D587]" />
                <span>{t('dailyTip.tryLook')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectOutfitToExplore(currentTip.relatedOutfitId)}
                  className="py-2 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#3D3128] border border-[#DECDB8] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Tìm hiểu sâu hơn về loại trang phục này"
                >
                  <Compass className="w-3.5 h-3.5 text-[#991B1E]" />
                  <span>{t('dailyTip.exploreBtn')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyTip}
                  className="py-2 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#3D3128] border border-[#DECDB8] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Sao chép mẩu tin để chia sẻ bạn bè"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('dailyTip.copyBtn')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
