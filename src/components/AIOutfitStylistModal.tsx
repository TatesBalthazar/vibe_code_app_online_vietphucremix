import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Check,
  RefreshCw,
  Wand2,
  Crown,
  Zap,
  Feather,
  ShieldCheck,
  Heart,
  ArrowRight,
  Info,
  Layers,
  Palette,
  Compass
} from 'lucide-react';
import { OutfitId, ColorId, StyleId, OccasionId } from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import {
  generateThreeAISuggestions,
  AIStyleRecommendation
} from '../services/aiSuggestion';

interface AIOutfitStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfitId: OutfitId;
  gender: 'female' | 'male';
  skinTone: string;
  onApplySuggestion: (suggestion: {
    colorId: ColorId;
    styleId: StyleId;
    occasionId: OccasionId;
    accessories: string[];
    title: string;
  }) => void;
}

export const AIOutfitStylistModal: React.FC<AIOutfitStylistModalProps> = ({
  isOpen,
  onClose,
  outfitId,
  gender,
  skinTone,
  onApplySuggestion
}) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AIStyleRecommendation[]>([]);
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const outfit = OUTFITS_DATA.find((o) => o.id === outfitId) || OUTFITS_DATA[0];

  const fetchSuggestions = async () => {
    setLoading(true);
    setLoadingStep(1);
    setAppliedId(null);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 300);

    try {
      const results = await generateThreeAISuggestions(outfitId, gender, skinTone);
      setSuggestions(results);
    } catch (err) {
      console.error('Error fetching AI suggestions:', err);
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen, outfitId, gender, skinTone]);

  if (!isOpen) return null;

  const handleApply = (sug: AIStyleRecommendation) => {
    setAppliedId(sug.id);
    onApplySuggestion({
      colorId: sug.colorId,
      styleId: sug.styleId,
      occasionId: sug.occasionId,
      accessories: sug.accessories,
      title: sug.title
    });

    setTimeout(() => {
      onClose();
    }, 600);
  };

  const getStyleIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-4 h-4 text-[#C8973E]" />;
      case 1:
        return <Zap className="w-4 h-4 text-[#991B1E]" />;
      case 2:
      default:
        return <Feather className="w-4 h-4 text-[#065F46]" />;
    }
  };

  const getCardHeaderColor = (index: number) => {
    switch (index) {
      case 0:
        return 'border-[#C8973E]/40 bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EA] to-[#F5ECE0]';
      case 1:
        return 'border-[#991B1E]/30 bg-gradient-to-br from-[#FFFDF9] via-[#FDF0EE] to-[#F7E5E3]';
      case 2:
      default:
        return 'border-[#065F46]/30 bg-gradient-to-br from-[#FFFDF9] via-[#F0F7F4] to-[#E2EFE9]';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-stylist-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =====================================================================
            HEADER BANNER
           ===================================================================== */}
        <div className="relative px-6 py-5 border-b border-[#E8DAC7] bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EE] to-[#F5EBDD] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#991B1E] to-[#C8973E] text-white flex items-center justify-center shadow-md shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#991B1E] bg-[#991B1E]/10 px-2 py-0.5 rounded-full">
                  AI Fashion Stylist • Trợ Lý Phối Đồ
                </span>
                <span className="text-[10px] text-[#7A695B] hidden sm:inline">
                  • Gemini Powered
                </span>
              </div>
              <h2
                id="ai-stylist-modal-title"
                className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] truncate mt-0.5"
              >
                3 Gợi Ý Phối Đồ Độc Bản Cho {outfit.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={fetchSuggestions}
              disabled={loading}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#594C42] bg-white/80 hover:bg-white border border-[#DACBB7] hover:border-[#991B1E]/40 hover:text-[#991B1E] transition-all cursor-pointer disabled:opacity-50"
              title="Yêu cầu AI tạo 3 phong cách phối đồ mới"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Gợi ý mới</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-[#7A695B] hover:text-[#1C1917] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Đóng bảng gợi ý"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Selected Garment Context Bar */}
        <div className="px-6 py-2.5 bg-[#F0E6D8]/80 border-b border-[#E2D5C3] flex flex-wrap items-center justify-between gap-3 text-xs text-[#594C42]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1C1917]">Trang phục gốc:</span>
            <span className="px-2 py-0.5 rounded-md bg-white text-[#991B1E] font-bold shadow-2xs">
              {outfit.vietnameseName || outfit.name}
            </span>
            <span className="text-[#8C7662] hidden md:inline">({outfit.era})</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="text-[#8C7662]">Mẫu:</span>
              <strong className="text-[#1C1917]">{gender === 'female' ? 'Nữ giới' : 'Nam giới'}</strong>
            </span>
            <span className="text-[#8C7662]">•</span>
            <span className="flex items-center gap-1">
              <span className="text-[#8C7662]">Tông da:</span>
              <strong className="text-[#1C1917] capitalize">{skinTone}</strong>
            </span>
          </div>
        </div>

        {/* =====================================================================
            BODY CONTENT: 3 AI RECOMMENDATION CARDS
           ===================================================================== */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {loading ? (
            /* Loading State */
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-3 border-[#C8973E]/30 border-t-[#991B1E] animate-spin" />
                <Sparkles className="w-6 h-6 text-[#C8973E] absolute inset-0 m-auto animate-pulse" />
              </div>

              <div className="space-y-1.5 max-w-sm">
                <h3 className="font-serif text-base font-bold text-[#1C1917]">
                  Gemini AI Đang Phối Đồ Cho Bạn...
                </h3>
                <p className="text-xs text-[#7A695B]">
                  {loadingStep === 1 && 'Đang phân tích cấu trúc vạt áo, hoa văn và bối cảnh lịch sử...'}
                  {loadingStep === 2 && 'Tính toán phối thức ngũ hành, bảng màu và phụ kiện tôn dáng...'}
                  {loadingStep >= 3 && 'Hoàn thiện 3 concept: Truyền thống sang trọng, Cổ điển phá cách & Đương đại...'}
                </p>
              </div>
            </div>
          ) : (
            /* 3 Unique Style Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {suggestions.map((sug, idx) => {
                const isApplied = appliedId === sug.id;
                return (
                  <div
                    key={sug.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${getCardHeaderColor(
                      idx
                    )}`}
                  >
                    <div className="space-y-4">
                      {/* Top Theme Badge & Confidence */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 shadow-2xs border border-black/5 text-[11px] font-bold text-[#1C1917]">
                          {getStyleIcon(idx)}
                          <span>{sug.themePill}</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#991B1E] bg-[#991B1E]/10 px-2 py-0.5 rounded-full">
                          {sug.confidenceScore}% Phù Hợp
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#1C1917] leading-snug">
                          {sug.title}
                        </h4>
                        <p className="text-xs text-[#6B5D52] mt-0.5 line-clamp-2">
                          {sug.subtitle}
                        </p>
                      </div>

                      {/* Outfit Palette & Style Badges */}
                      <div className="p-3 rounded-xl bg-white/80 border border-[#E2D5C3] space-y-2">
                        {/* Color */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#7A695B] flex items-center gap-1">
                            <Palette className="w-3.5 h-3.5 text-[#C8973E]" />
                            Màu sắc:
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-bold text-[#1C1917]">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                              style={{ backgroundColor: sug.colorHex }}
                            />
                            <span>{sug.colorName}</span>
                          </span>
                        </div>

                        {/* Occasion */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#7A695B] flex items-center gap-1">
                            <Compass className="w-3.5 h-3.5 text-[#991B1E]" />
                            Dịp mặc:
                          </span>
                          <span className="font-bold text-[#1C1917]">
                            {sug.occasionName}
                          </span>
                        </div>

                        {/* Style Vibe */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#7A695B] flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-[#065F46]" />
                            Phong thái:
                          </span>
                          <span className="font-semibold text-[#594C42]">
                            {sug.styleName}
                          </span>
                        </div>
                      </div>

                      {/* Recommended Accessories */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A695B] block">
                          Phụ kiện đề xuất:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sug.accessoryNames.map((acc, aIdx) => (
                            <span
                              key={aIdx}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-white/90 text-[#3A2E24] border border-[#DACBB7]/60 shadow-2xs"
                            >
                              • {acc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stylist Philosophy Quote */}
                      <div className="p-3 rounded-xl bg-black/3 border border-black/5 text-[11px] text-[#4A3E35] leading-relaxed">
                        <strong className="text-[#991B1E] block mb-0.5">Lời khuyên Stylist AI:</strong>
                        {sug.stylingPhilosophy}
                      </div>

                      {/* Cultural Respect Note */}
                      <div className="flex items-start gap-1.5 text-[10.5px] text-[#065F46] bg-[#065F46]/8 p-2.5 rounded-xl border border-[#065F46]/15 leading-relaxed">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#065F46]" />
                        <span>
                          <strong>Bản sắc:</strong> {sug.culturalRespectNote}
                        </span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-4 mt-2 border-t border-black/5">
                      <button
                        type="button"
                        onClick={() => handleApply(sug)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                          isApplied
                            ? 'bg-[#065F46] text-white shadow-md'
                            : 'bg-[#991B1E] hover:bg-[#781316] text-white hover:shadow-md hover:scale-102 active:scale-98'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Đã Áp Dụng Thành Công!</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 text-[#F5D587]" />
                            <span>Áp Dụng Phong Cách Này</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 bg-[#FAF5EE] border-t border-[#E8DAC7] flex flex-wrap items-center justify-between gap-3 text-xs text-[#7A695B]">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C8973E]" />
            <span>
              Khi bấm áp dụng, toàn bộ màu sắc, dịp mặc và phụ kiện trong Remix Studio sẽ tự động cập nhật.
            </span>
          </div>

          <button
            type="button"
            onClick={fetchSuggestions}
            disabled={loading}
            className="sm:hidden text-xs font-bold text-[#991B1E] flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Đổi gợi ý khác</span>
          </button>
        </div>
      </div>
    </div>
  );
};
