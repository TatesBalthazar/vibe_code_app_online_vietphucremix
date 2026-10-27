import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Check,
  ArrowRight,
  Palette,
  Layers,
  SlidersHorizontal,
  ChevronLeft,
  X
} from 'lucide-react';
import { OutfitLookState, StyleId, OutfitId, ColorId } from '../types';
import { STYLES_DATA } from '../data/styles';
import {
  StyleDrivenSuggestion,
  generateStyleDrivenSuggestions
} from '../services/aiSuggestion';

interface AiStylingFloatingDockProps {
  currentLook: OutfitLookState;
  onApplyLook: (newLook: OutfitLookState) => void;
  originalLook?: OutfitLookState;
  onRestoreOriginal?: () => void;
  isModifiedFromOriginal?: boolean;
}

export const AiStylingFloatingDock: React.FC<AiStylingFloatingDockProps> = ({
  currentLook,
  onApplyLook,
  originalLook,
  onRestoreOriginal,
  isModifiedFromOriginal = false
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [suggestions, setSuggestions] = useState<StyleDrivenSuggestion[]>([]);
  const [activeFilterStyle, setActiveFilterStyle] = useState<StyleId>(
    (currentLook.style as StyleId) || 'modern'
  );
  const [appliedToast, setAppliedToast] = useState<string | null>(null);
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync activeFilterStyle with currentLook.style when currentLook changes externally
  useEffect(() => {
    if (currentLook.style) {
      setActiveFilterStyle(currentLook.style as StyleId);
    }
  }, [currentLook.style]);

  // Load suggestions whenever look or activeFilterStyle changes
  useEffect(() => {
    let isCancelled = false;
    const loadSuggestions = async () => {
      // Generate suggestions using the active filter style
      const suggestionsData = await generateStyleDrivenSuggestions({
        ...currentLook,
        style: activeFilterStyle
      });
      if (!isCancelled) {
        setSuggestions(suggestionsData);
      }
    };

    loadSuggestions();
    return () => {
      isCancelled = true;
    };
  }, [currentLook.outfit, currentLook.occasion, activeFilterStyle]);

  const currentStyleObj =
    STYLES_DATA.find((s) => s.id === activeFilterStyle) || STYLES_DATA[1];

  const handleApply = (suggestion: StyleDrivenSuggestion) => {
    const updatedLook: OutfitLookState = {
      ...currentLook,
      outfit: suggestion.targetOutfit,
      style: suggestion.targetStyle,
      occasion: suggestion.targetOccasion,
      color: suggestion.targetColor,
      accessories: suggestion.targetAccessories
    };

    onApplyLook(updatedLook);
    setAppliedId(suggestion.id);
    setAppliedToast(`Đã áp dụng "${suggestion.title}" vào bản phối của bạn!`);

    setTimeout(() => {
      setAppliedToast(null);
    }, 3000);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Check if a suggestion matches the current look exactly
  const isSuggestionActive = (s: StyleDrivenSuggestion) => {
    if (appliedId === s.id) return true;
    const sameOutfit = currentLook.outfit === s.targetOutfit;
    const sameColor = currentLook.color === s.targetColor;
    const sameStyle = currentLook.style === s.targetStyle;
    return sameOutfit && sameColor && sameStyle;
  };

  return (
    <>
      {/* Toast Notification when Look is Applied */}
      {appliedToast && (
        <div className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-50 bg-[#1C1917]/95 text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#C8973E]/40 flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-[#C8973E] animate-spin" />
          <span className="font-medium">{appliedToast}</span>
        </div>
      )}

      {/* MINIMIZED STATE: Floating Island Button */}
      {!isExpanded && (
        <aside
          aria-label="Bảng điều khiển gợi ý phối đồ AI thu gọn"
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto"
        >
          <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFCBB5] hover:border-[#991B1E] text-[#1C1917] px-4 sm:px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex items-center justify-between gap-3 sm:gap-4 transition-all duration-200 hover:shadow-2xl">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <span className="w-7 h-7 rounded-full bg-[#991B1E] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                <Sparkles className="w-3.5 h-3.5 text-[#F5D587]" />
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E]">
                    AI Styling Co-Pilot
                  </span>
                  <span className="text-[10px] text-[#8C7A6B]">·</span>
                  <span className="text-[11px] font-bold text-[#1C1917]">
                    {currentStyleObj.nameVi}
                  </span>
                </div>
                <span className="text-[11px] text-[#615247]">
                  {suggestions.length} gợi ý phối đồ độc đáo · Thử thay đổi ngay
                </span>
              </div>
            </button>

            <div className="flex items-center gap-2">
              {isModifiedFromOriginal && onRestoreOriginal && (
                <button
                  onClick={onRestoreOriginal}
                  title="Khôi phục bản phối gốc"
                  className="px-2.5 py-1 text-[11px] font-medium text-[#7A6B5F] hover:text-[#991B1E] hover:bg-[#F2ECE0] rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Khôi phục gốc</span>
                </button>
              )}
              <button
                onClick={() => setIsExpanded(true)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EFE5D6] text-[#7A6B5F] hover:text-[#1C1917] flex items-center justify-center transition-colors cursor-pointer border border-[#E5D7C4]"
                aria-label="Mở rộng bảng gợi ý phối đồ AI"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* EXPANDED STATE: Full Bottom Floating Dock */}
      {isExpanded && (
        <aside
          aria-label="Bảng điều khiển gợi ý phối đồ AI"
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/98 backdrop-blur-xl border-t border-[#DFCBB5] shadow-[0_-12px_40px_rgba(0,0,0,0.14)] animate-in slide-in-from-bottom duration-300"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-4 space-y-3">
            {/* Top Bar: Title, Style Filter Tabs & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE5D6] pb-2.5">
              {/* Left Title & Status */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#991B1E] to-[#781316] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Sparkles className="w-4 h-4 text-[#F5D587]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#991B1E]">
                      AI Styling Co-Pilot
                    </span>
                    <span className="text-[11px] font-serif font-bold text-[#1C1917]">
                      Gợi Ý Phối Đồ Theo Phong Cách
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#C8973E]/15 text-[#8A631E] border border-[#C8973E]/30">
                      Thử trực tiếp trên người mẫu
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A6B5F]">
                    Dựa trên phong cách{' '}
                    <strong className="text-[#991B1E] font-semibold">
                      {currentStyleObj.nameVi} ({currentStyleObj.name})
                    </strong>
                    . Nhấn để thử ngay thay đổi diện mạo tức thời.
                  </p>
                </div>
              </div>

              {/* Style Switcher Filter Controls */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
                <span className="text-[10px] text-[#7A6B5F] uppercase font-bold tracking-wider hidden lg:inline mr-1">
                  Đổi phong cách:
                </span>
                {STYLES_DATA.map((styleOption) => {
                  const isSelected = activeFilterStyle === styleOption.id;
                  return (
                    <button
                      key={styleOption.id}
                      onClick={() => setActiveFilterStyle(styleOption.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#991B1E] text-white shadow-xs font-bold'
                          : 'bg-[#FAF7F2] text-[#615247] hover:bg-[#F0E6D8] border border-[#E5D7C4]'
                      }`}
                    >
                      {styleOption.nameVi.split('/')[0]}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Carousel Navigation, Restore & Minimize */}
              <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                {/* Carousel Nav Arrows */}
                <div className="hidden sm:flex items-center gap-1 mr-1">
                  <button
                    onClick={() => handleScroll('left')}
                    className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-[#EFE5D6] text-[#615247] flex items-center justify-center border border-[#E5D7C4] transition-colors cursor-pointer"
                    aria-label="Xem gợi ý trước"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleScroll('right')}
                    className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-[#EFE5D6] text-[#615247] flex items-center justify-center border border-[#E5D7C4] transition-colors cursor-pointer"
                    aria-label="Xem gợi ý tiếp theo"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isModifiedFromOriginal && onRestoreOriginal && (
                  <button
                    onClick={onRestoreOriginal}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#7A6B5F] hover:text-[#991B1E] bg-[#FAF7F2] hover:bg-[#F2ECE0] border border-[#E5D7C4] transition-colors cursor-pointer"
                    title="Khôi phục trang phục ban đầu bạn tạo trong Studio"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Khôi phục bản gốc</span>
                  </button>
                )}

                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-[#EFE5D6] text-[#7A6B5F] hover:text-[#1C1917] flex items-center justify-center transition-colors cursor-pointer border border-[#E5D7C4]"
                  aria-label="Thu gọn bảng gợi ý"
                  title="Thu gọn"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggestions Horizontal Carousel */}
            <div
              ref={scrollContainerRef}
              className="flex items-stretch gap-3.5 overflow-x-auto pb-1 pt-1 scroll-smooth snap-x snap-mandatory focus:outline-hidden"
              tabIndex={0}
              role="region"
              aria-label="Danh sách gợi ý phối đồ AI"
            >
              {suggestions.map((suggestion) => {
                const isActive = isSuggestionActive(suggestion);
                return (
                  <div
                    key={suggestion.id}
                    className={`min-w-[270px] sm:min-w-[305px] max-w-[325px] rounded-2xl p-3.5 flex flex-col justify-between transition-all duration-200 snap-start border shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-b from-[#FFF9F2] to-[#FAF3E8] border-[#C8973E] shadow-md ring-2 ring-[#C8973E]/50'
                        : 'bg-[#FAF7F2] hover:bg-[#FFFDF9] border-[#E8DCCB] hover:border-[#D0BEAA] shadow-2xs hover:shadow-md'
                    }`}
                  >
                    {/* Header: Theme Badge & Match Score */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold uppercase tracking-wider text-[#991B1E] bg-[#991B1E]/10 px-2 py-0.5 rounded-full">
                          {suggestion.themeBadge}
                        </span>
                        <span className="font-mono font-bold text-[#8A631E] flex items-center gap-1">
                          <span className="text-[#C8973E]">✦</span>
                          <span>{suggestion.matchScore}% Phù hợp</span>
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#1C1917] leading-snug">
                          {suggestion.title}
                        </h4>
                        <p className="text-[11px] text-[#615247] line-clamp-2 mt-0.5">
                          {suggestion.concept}
                        </p>
                      </div>

                      {/* Specs Row: Outfit, Color & Accessories */}
                      <div className="pt-2 border-t border-[#EFE5D6] space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between text-[#4A3B32]">
                          <span className="text-[#7A6B5F]">Trang phục:</span>
                          <span className="font-semibold">{suggestion.outfitName}</span>
                        </div>

                        <div className="flex items-center justify-between text-[#4A3B32]">
                          <span className="text-[#7A6B5F]">Màu sắc:</span>
                          <div className="flex items-center gap-1.5 font-medium">
                            <span
                              className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                              style={{ backgroundColor: suggestion.colorHex }}
                            />
                            <span>{suggestion.colorName.split('/')[0]}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-[#7A6B5F]">Phụ kiện gợi ý:</span>
                          <div className="flex flex-wrap gap-1">
                            {suggestion.accessoryNames.slice(0, 3).map((accName, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-[#EFE5D6]/70 text-[#4A3E35] px-1.5 py-0.5 rounded-md truncate max-w-[140px]"
                                title={accName}
                              >
                                {accName}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Stylist Rationale Snippet */}
                        <p className="text-[10px] text-[#6B5D52] italic line-clamp-2 bg-[#FFFDF9] p-1.5 rounded-lg border border-[#EDE0CE]/60">
                          "{suggestion.stylistRationale}"
                        </p>
                      </div>
                    </div>

                    {/* Action Button: Try Look Now or Active Status */}
                    <div className="pt-3 mt-1">
                      {isActive ? (
                        <div className="w-full py-2 px-3 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>ĐANG ÁP DỤNG TRÊN HÌNH MẪU</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApply(suggestion)}
                          className="w-full py-2 px-3 rounded-xl bg-[#991B1E] hover:bg-[#781316] active:scale-97 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer group"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#F5D587] group-hover:rotate-12 transition-transform" />
                          <span>THỬ BẢN PHỐI NÀY NGAY</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
