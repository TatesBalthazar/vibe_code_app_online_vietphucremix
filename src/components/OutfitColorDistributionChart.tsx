import React, { useState } from 'react';
import {
  Palette,
  PieChart,
  BarChart3,
  SlidersHorizontal,
  Info,
  Check,
  Sparkles,
  X,
  ArrowRight,
  Flame,
  Droplets,
  Leaf,
  Mountain,
  ShieldCheck,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SavedLook, ColorId } from '../types';
import {
  COLORS_DATA,
  SKIN_TONES_DATA,
  evaluateColorHarmony,
  ColorHarmonyEvaluation,
  ColorHarmonyPaletteItem
} from '../data/colors';

// Cultural Five Elements mapping for Vietnamese Traditional Chromatics
export interface ElementInfo {
  element: 'Hỏa' | 'Kim' | 'Thổ' | 'Thủy' | 'Mộc' | 'Hòa Hợp';
  elementEn: string;
  icon: React.ReactNode;
  badgeBg: string;
  badgeText: string;
  meaning: string;
  fabricRecommendation: string;
}

export const COLOR_ELEMENT_MAP: Record<string, ElementInfo> = {
  red: {
    element: 'Hỏa',
    elementEn: 'Fire',
    icon: <Flame className="w-3.5 h-3.5 text-red-600" />,
    badgeBg: 'bg-red-50 border-red-200',
    badgeText: 'text-red-700',
    meaning: 'Năng lượng dương vượng, hỷ khánh, vinh hiển và may mắn viên mãn.',
    fabricRecommendation: 'Lụa Vạn Phúc dệt vân rồng phượng, Gấm Sa thêu chỉ vàng.'
  },
  burgundy: {
    element: 'Hỏa',
    elementEn: 'Deep Fire',
    icon: <Flame className="w-3.5 h-3.5 text-rose-700" />,
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-800',
    meaning: 'Hỏa trầm lắng, phong vị cung đình Huế, quý phái, quyền uy thâm sâu.',
    fabricRecommendation: 'Gấm Thái Tuấn bóng mờ, Nhung the cổ truyền thêu tay.'
  },
  cream: {
    element: 'Kim',
    elementEn: 'Metal / Silk',
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-600" />,
    badgeBg: 'bg-amber-50 border-amber-200',
    badgeText: 'text-amber-800',
    meaning: 'Kim thuần khiết, thanh tịnh, biểu trưng lòng chính trực và nho nhã.',
    fabricRecommendation: 'Lụa tơ tằm mộc Bảo Lộc, Đũi tơ tằm dệt thủ công.'
  },
  yellow: {
    element: 'Thổ',
    elementEn: 'Earth',
    icon: <Mountain className="w-3.5 h-3.5 text-yellow-600" />,
    badgeBg: 'bg-yellow-50 border-yellow-200',
    badgeText: 'text-yellow-800',
    meaning: 'Thổ trung tâm, đất mẹ bao dung, mùa màng bội thu, phúc thọ trường tồn.',
    fabricRecommendation: 'Gấm hoa cúc hoàng triều, Sa tơ mỏng nhuộm củ nâu và hoàng đằng.'
  },
  blue: {
    element: 'Thủy',
    elementEn: 'Water',
    icon: <Droplets className="w-3.5 h-3.5 text-blue-600" />,
    badgeBg: 'bg-blue-50 border-blue-200',
    badgeText: 'text-blue-800',
    meaning: 'Thủy tĩnh tại, màu chàm sông núi, tượng trưng trí tuệ và sự kiên định.',
    fabricRecommendation: 'Vải lanh nhuộm chàm cổ truyền, Lụa Hà Đông dệt trơn.'
  },
  green: {
    element: 'Mộc',
    elementEn: 'Wood',
    icon: <Leaf className="w-3.5 h-3.5 text-emerald-600" />,
    badgeBg: 'bg-emerald-50 border-emerald-200',
    badgeText: 'text-emerald-800',
    meaning: 'Mộc sinh sôi, sắc ngọc bích tươi tốt, tượng trưng nhân ái và hy vọng.',
    fabricRecommendation: 'Lụa the nõn chuối, Tơ sen cao cấp mềm rủ nhẹ tênh.'
  },
  black: {
    element: 'Thủy',
    elementEn: 'Deep Water',
    icon: <Droplets className="w-3.5 h-3.5 text-stone-700" />,
    badgeBg: 'bg-stone-100 border-stone-300',
    badgeText: 'text-stone-800',
    meaning: 'Thủy thâm trầm, sắc mực tàu nho sĩ, khí tiết đĩnh đạc và bản lĩnh.',
    fabricRecommendation: 'The dệt thủ công, Lụa the bóng mờ xứ Quảng.'
  },
  pastel: {
    element: 'Hòa Hợp',
    elementEn: 'Harmony',
    icon: <Sparkles className="w-3.5 h-3.5 text-pink-600" />,
    badgeBg: 'bg-pink-50 border-pink-200',
    badgeText: 'text-pink-800',
    meaning: 'Âm dương dung hòa, nét dịu ngọt giao thoa giữa truyền thống và tân thời.',
    fabricRecommendation: 'Lụa Chiffon tơ tằm bay bổng, Sa dệt hoa ẩn hiện đại.'
  }
};

interface OutfitColorDistributionChartProps {
  look: SavedLook;
  onStartRemix?: (colorId?: ColorId) => void;
  className?: string;
}

export const OutfitColorDistributionChart: React.FC<OutfitColorDistributionChartProps> = ({
  look,
  onStartRemix,
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Evaluate harmony and palette distribution
  const harmony: ColorHarmonyEvaluation = evaluateColorHarmony({
    skinTone: look.skinTone || 'neutral',
    colorId: look.color || 'burgundy',
    outfitId: look.outfit || 'ao-dai',
    accessories: look.accessories || []
  });

  const mainColorData = COLORS_DATA.find((c) => c.id === look.color) || COLORS_DATA[0];
  const elementInfo = COLOR_ELEMENT_MAP[look.color] || COLOR_ELEMENT_MAP.burgundy;

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Chart Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#991B1E]" />
          <span>Phân Bổ Bảng Màu</span>
          <span className="text-[10px] font-medium text-[#7A6B5F] bg-[#F2ECE0] px-1.5 py-0.2 rounded">
            60-30-10
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#991B1E] hover:text-[#781316] hover:underline cursor-pointer transition-colors"
          title="Xem biểu đồ chi tiết và phân tích ngũ hành hòa sắc"
        >
          <PieChart className="w-3 h-3" />
          <span>Biểu đồ chi tiết</span>
        </button>
      </div>

      {/* Proportional Segmented Color Distribution Bar */}
      <div className="relative">
        <div className="h-3 w-full rounded-full overflow-hidden flex bg-black/10 shadow-inner p-0.5 border border-[#DECBB4]">
          {harmony.palette.map((item, idx) => {
            const isHovered = activeTooltip === idx;
            return (
              <div
                key={idx}
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.hex
                }}
                onMouseEnter={() => setActiveTooltip(idx)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setIsModalOpen(true)}
                className={`h-full relative cursor-pointer transition-all duration-300 first:rounded-l-full last:rounded-r-full ${
                  idx > 0 ? 'border-l border-black/15' : ''
                } ${isHovered ? 'brightness-110 scale-y-110 z-10 shadow-xs' : ''}`}
                title={`${item.role}: ${item.name} (${item.percentage}%)`}
              />
            );
          })}
        </div>

        {/* Hover Tooltip Floating Banner */}
        {activeTooltip !== null && harmony.palette[activeTooltip] && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#1C1917] text-white text-[10px] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
            <span
              className="w-2 h-2 rounded-full border border-white/40 shrink-0"
              style={{ backgroundColor: harmony.palette[activeTooltip].hex }}
            />
            <span className="font-bold">{harmony.palette[activeTooltip].percentage}%</span>
            <span>{harmony.palette[activeTooltip].name}</span>
            <span className="text-[#D6C5B3]">({harmony.palette[activeTooltip].source})</span>
          </div>
        )}
      </div>

      {/* Mini Color Palette Chips Row */}
      <div className="grid grid-cols-3 gap-1.5 pt-0.5">
        {harmony.palette.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => setIsModalOpen(true)}
              className="group p-1.5 rounded-lg bg-[#FAF5EB] hover:bg-[#F3EAD9] border border-[#E8DEC9] hover:border-[#991B1E]/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="w-3 h-3 rounded-full border border-black/15 shadow-2xs shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: item.hex }}
                />
                <span className="text-[9px] font-bold text-[#991B1E]">
                  {item.percentage}%
                </span>
              </div>
              <div className="text-[10px] font-semibold text-[#1C1917] truncate leading-tight">
                {item.name.split(' / ')[0]}
              </div>
              <div className="text-[8.5px] text-[#7A6B5F] truncate mt-0.5">
                {item.source}
              </div>
            </div>
          );
        })}
      </div>

      {/* Harmony Rule Pill */}
      <div className="flex items-center justify-between text-[10.5px] bg-[#FAF3E8] border border-[#F0E4D2] px-2.5 py-1.5 rounded-lg">
        <div className="flex items-center gap-1.5 text-[#5A4B40] truncate">
          <Sparkles className="w-3 h-3 text-[#C8973E] shrink-0" />
          <span className="font-semibold text-[#1C1917] truncate">
            {harmony.harmonyRuleName}
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#166534] bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300 shrink-0">
          {harmony.harmonyScore}/10
        </span>
      </div>

      {/* =========================================================================
          DETAILED COLOR DISTRIBUTION & FIVE ELEMENTS MODAL
         ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50 duration-200">
          <div
            className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border border-[#D8C7B2] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4.5 bg-gradient-to-r from-[#991B1E] via-[#851619] to-[#6E1012] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                  <PieChart className="w-5 h-5 text-[#F5D587]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight flex items-center gap-2">
                    <span>Biểu Đồ Phân Bổ Màu Sắc</span>
                    <span className="text-xs font-normal text-[#F2D7B1] bg-white/15 px-2 py-0.5 rounded-full">
                      Tỷ lệ vàng 60 - 30 - 10
                    </span>
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1">
                    Trang phục: <strong className="text-white">{look.title}</strong> ({look.outfitName})
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Đóng bảng màu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-[#1C1917]">
              {/* SECTION 1: VISUAL DONUT & PROPORTIONAL PALETTE DISPLAY */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-2xl bg-[#FAF5EB] border border-[#E6DAC7] shadow-xs">
                {/* Visual Donut Chart SVG */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Donut Segments using stroke-dasharray */}
                      {/* Circumference = 2 * PI * r = 2 * 3.14159 * 36 ~= 226.2 */}
                      {/* Dominant: 60% = 135.7 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="transparent"
                        stroke={harmony.palette[0]?.hex || mainColorData.hex}
                        strokeWidth="14"
                        strokeDasharray="135.7 226.2"
                        strokeDashoffset="0"
                        className="transition-all duration-500 hover:opacity-90"
                      />
                      {/* Secondary: 30% = 67.86 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="transparent"
                        stroke={harmony.palette[1]?.hex || '#FAF8F5'}
                        strokeWidth="14"
                        strokeDasharray="67.86 226.2"
                        strokeDashoffset="-135.7"
                        className="transition-all duration-500 hover:opacity-90"
                      />
                      {/* Accent: 10% = 22.62 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="36"
                        fill="transparent"
                        stroke={harmony.palette[2]?.hex || '#C8973E'}
                        strokeWidth="14"
                        strokeDasharray="22.62 226.2"
                        strokeDashoffset="-203.56"
                        className="transition-all duration-500 hover:opacity-90"
                      />
                    </svg>

                    {/* Donut Center Info */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs mb-0.5"
                        style={{ backgroundColor: mainColorData.hex }}
                      />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6B5F]">
                        Chủ đạo
                      </span>
                      <span className="font-serif text-sm font-bold text-[#1C1917] leading-tight line-clamp-1">
                        {mainColorData.nameVi.split(' / ')[0]}
                      </span>
                      <span className="text-[10px] font-mono text-[#991B1E] font-semibold">
                        {mainColorData.hex}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#7A6B5F] font-medium mt-2">
                    Biểu đồ tỉ lệ phân bổ sắc thái quang học
                  </span>
                </div>

                {/* Right Breakdown: 60 - 30 - 10 Rules and Items */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-[#E0D2C0]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#991B1E]">
                      Cơ Cấu Bảng Màu (Palette Breakdown)
                    </span>
                    <span className="text-xs font-bold text-[#166534] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Hòa sắc: {harmony.harmonyScore}/10
                    </span>
                  </div>

                  <div className="space-y-2">
                    {harmony.palette.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-[#E5DAC8] flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-6 h-6 rounded-full border border-black/15 shadow-inner shrink-0"
                            style={{ backgroundColor: item.hex }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-[#1C1917] truncate">
                                {item.name}
                              </span>
                              <span className="text-[10px] font-mono text-[#7A6B5F]">
                                {item.hex}
                              </span>
                            </div>
                            <div className="text-[10px] text-[#7A6B5F] truncate">
                              Áp dụng: <strong className="text-[#4A3B32]">{item.source}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-[#991B1E]">
                            {item.percentage}%
                          </span>
                          <span className="block text-[9px] text-[#8C7A6E]">
                            {idx === 0 ? 'Màu chủ đạo' : idx === 1 ? 'Màu thứ cấp' : 'Điểm nhấn'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-[#594C42] italic leading-relaxed pt-1">
                    "{harmony.limitAdvice}"
                  </p>
                </div>
              </div>

              {/* SECTION 2: NGŨ HÀNH & TRIẾT LÝ MÀU SẮC VIỆT */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#991B1E]" />
                  <h4 className="font-serif text-base font-bold text-[#1C1917]">
                    Triết Lý Ngũ Hành & Ý Nghĩa Văn Hóa
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Card 1: Element & Meaning */}
                  <div className="p-4 rounded-2xl bg-white border border-[#DECBB4] space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#7A6B5F]">BẢN NGUYÊN NGŨ HÀNH</span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${elementInfo.badgeBg} ${elementInfo.badgeText}`}
                      >
                        {elementInfo.icon}
                        <span>Hành {elementInfo.element} ({elementInfo.elementEn})</span>
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-[#4A3B32]">
                      {elementInfo.meaning}
                    </p>

                    <div className="pt-2 border-t border-[#F2E8DC] text-[11px] text-[#7A6B5F]">
                      <strong className="text-[#1C1917]">Ý nghĩa sắc thái: </strong>
                      {mainColorData.culturalMeaning}
                    </div>
                  </div>

                  {/* Card 2: Fabric & Weaving Craft */}
                  <div className="p-4 rounded-2xl bg-white border border-[#DECBB4] space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#7A6B5F]">CHẤT LIỆU VẢI TRUYỀN THỐNG</span>
                      <span className="text-xs font-bold text-[#991B1E] bg-[#991B1E]/10 px-2 py-0.5 rounded-full">
                        Dệt May Di Sản
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-[#4A3B32]">
                      {elementInfo.fabricRecommendation}
                    </p>

                    <div className="pt-2 border-t border-[#F2E8DC] text-[11px] text-[#7A6B5F]">
                      <strong className="text-[#1C1917]">Quy tắc hòa hợp: </strong>
                      {harmony.harmonyRuleDescription}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: TƯƠNG QUAN HÒA SẮC THEO TÔNG DA */}
              <div className="p-4 rounded-2xl bg-[#FAF5EB] border border-[#E5DAC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#1C1917]">
                    <ShieldCheck className="w-4 h-4 text-[#991B1E]" />
                    <span>Đánh Giá Tương Thích Với Tông Da</span>
                  </div>
                  <p className="text-[#594C42] text-xs leading-relaxed">
                    {harmony.skinToneFeedback}
                  </p>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-[#991B1E] border border-[#DECBB4] shadow-2xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{harmony.limitStatusText}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#DECBB4] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#F2ECE0] text-[#4A3B32] border border-[#DECBB4] text-xs font-semibold cursor-pointer transition-colors"
              >
                Đóng
              </button>

              {onStartRemix && (
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    onStartRemix(look.color);
                  }}
                  className="inline-flex items-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:scale-102 active:scale-95 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#F5D587]" />
                  <span>Phối Lại Sắc Màu Này Trong Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
