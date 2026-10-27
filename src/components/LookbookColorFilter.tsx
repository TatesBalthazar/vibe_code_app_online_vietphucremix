import React from 'react';
import { Palette, Check, RotateCcw, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import { ColorId, SavedLook } from '../types';
import { COLORS_DATA } from '../data/colors';

export type ColorToneCategory = 'all' | 'warm' | 'cool' | 'neutral';

export interface LookbookColorFilterProps {
  savedLooks: SavedLook[];
  selectedColor: ColorId | 'all';
  selectedTone: ColorToneCategory;
  onSelectColor: (colorId: ColorId | 'all') => void;
  onSelectTone: (tone: ColorToneCategory) => void;
  onResetFilter: () => void;
  filteredCount: number;
}

export const TONE_MAPPINGS: Record<ColorToneCategory, ColorId[]> = {
  all: ['red', 'burgundy', 'cream', 'yellow', 'blue', 'green', 'black', 'pastel'],
  warm: ['red', 'burgundy', 'yellow'],
  cool: ['blue', 'green', 'black'],
  neutral: ['cream', 'pastel']
};

export const TONE_LABELS: Record<ColorToneCategory, { label: string; desc: string; colors: string }> = {
  all: {
    label: 'Tất Cả Sắc Màu',
    desc: 'Trọn vẹn 8 gam màu truyền thống',
    colors: 'Toàn bộ'
  },
  warm: {
    label: 'Tông Ấm Nồng',
    desc: 'Hỷ sự, phú quý & vượng khí',
    colors: 'Đỏ Son, Đỏ Rượu, Hoàng Thổ'
  },
  cool: {
    label: 'Tông Mát & Trầm',
    desc: 'Tĩnh tại, chiều sâu & uy nghiêm',
    colors: 'Chàm Cổ, Diệp Lục, Thạch Mặc'
  },
  neutral: {
    label: 'Tông Nhã & Sáng',
    desc: 'Thuần khiết, dịu mắt & thanh tân',
    colors: 'Kem Ngà, Hồng Phấn'
  }
};

export const LookbookColorFilter: React.FC<LookbookColorFilterProps> = ({
  savedLooks,
  selectedColor,
  selectedTone,
  onSelectColor,
  onSelectTone,
  onResetFilter,
  filteredCount
}) => {
  // Count outfits per color
  const colorCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    COLORS_DATA.forEach((c) => {
      counts[c.id] = 0;
    });
    savedLooks.forEach((look) => {
      if (look.color && counts[look.color] !== undefined) {
        counts[look.color] += 1;
      }
    });
    return counts;
  }, [savedLooks]);

  // Color distribution in user's saved looks
  const colorDistribution = React.useMemo(() => {
    if (savedLooks.length === 0) return [];
    const usedColors: { colorId: ColorId; hex: string; nameVi: string; count: number; percentage: number }[] = [];
    COLORS_DATA.forEach((c) => {
      const count = colorCounts[c.id] || 0;
      if (count > 0) {
        usedColors.push({
          colorId: c.id,
          hex: c.hex,
          nameVi: c.nameVi,
          count,
          percentage: Math.round((count / savedLooks.length) * 100)
        });
      }
    });
    return usedColors;
  }, [savedLooks, colorCounts]);

  const isFilterActive = selectedColor !== 'all' || selectedTone !== 'all';

  return (
    <div className="bg-[#FFFDF9] rounded-2xl border border-[#E2D5C3] p-5 sm:p-6 shadow-xs space-y-5 transition-all">
      {/* Top Bar: Title & Filter Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EFE5D6]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center shrink-0">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">
                Bộ Lọc Tông Màu Chủ Đạo
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF2EB] text-[#991B1E] border border-[#F0DFCF]">
                {filteredCount} / {savedLooks.length} outfit
              </span>
            </div>
            <p className="text-xs text-[#7A6B5F] mt-0.5">
              Phân loại trang phục đã lưu theo gam màu truyền thống và phong cách ngũ hành
            </p>
          </div>
        </div>

        {/* Reset Filter Button */}
        {isFilterActive && (
          <button
            type="button"
            onClick={onResetFilter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#7A6B5F] hover:text-[#991B1E] border border-[#DECBB4] text-xs font-semibold transition-all cursor-pointer self-start sm:self-auto active:scale-95"
            title="Xem lại tất cả trang phục"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa bộ lọc ({filteredCount} kết quả)</span>
          </button>
        )}
      </div>

      {/* Tone Presets Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C7B6E] flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#991B1E]" />
            <span>Phân nhóm tông màu:</span>
          </span>
          {selectedTone !== 'all' && (
            <span className="text-[11px] text-[#991B1E] font-medium">
              {TONE_LABELS[selectedTone].colors}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['all', 'warm', 'cool', 'neutral'] as ColorToneCategory[]).map((tone) => {
            const isToneActive = selectedTone === tone && selectedColor === 'all';
            const toneData = TONE_LABELS[tone];
            // Calculate count of looks matching this tone
            const matchCount = tone === 'all'
              ? savedLooks.length
              : savedLooks.filter((l) => TONE_MAPPINGS[tone].includes(l.color)).length;

            return (
              <button
                key={tone}
                type="button"
                onClick={() => onSelectTone(tone)}
                className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isToneActive
                    ? 'bg-[#991B1E] text-white border-[#781316] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#3A2E24] border-[#DECBB4] hover:bg-[#F2ECE0] hover:border-[#C8973E]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold ${isToneActive ? 'text-white' : 'text-[#1C1917]'}`}>
                    {toneData.label}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isToneActive
                        ? 'bg-white/20 text-white'
                        : matchCount > 0
                        ? 'bg-[#EFE5D6] text-[#66574C]'
                        : 'bg-transparent text-[#A39284]'
                    }`}
                  >
                    {matchCount}
                  </span>
                </div>
                <span
                  className={`text-[10.5px] mt-1 line-clamp-1 ${
                    isToneActive ? 'text-white/80' : 'text-[#8C7B6E]'
                  }`}
                >
                  {toneData.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Individual Traditional Color Swatch Chips */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C7B6E] flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#991B1E]" />
          <span>Lọc theo sắc màu độc bản (Nhấp chọn màu):</span>
        </span>

        <div className="flex flex-wrap gap-2">
          {COLORS_DATA.map((color) => {
            const isSelected = selectedColor === color.id;
            const count = colorCounts[color.id] || 0;
            const hasLooks = count > 0;

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectColor(isSelected ? 'all' : color.id)}
                className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF2EB] border-[#991B1E] text-[#991B1E] ring-2 ring-[#991B1E]/20 shadow-xs font-bold'
                    : hasLooks
                    ? 'bg-white border-[#E2D5C3] text-[#2D2621] hover:border-[#C8973E] hover:bg-[#FAF7F2]'
                    : 'bg-[#FAF7F2]/60 border-[#ECE0D0] text-[#998B7F] hover:bg-white hover:text-[#4A3B32]'
                }`}
                title={`${color.nameVi} - ${color.culturalMeaning} (${count} outfit đã lưu)`}
              >
                {/* Color Swatch Dot */}
                <span
                  className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: color.borderHex || 'rgba(0,0,0,0.15)'
                  }}
                >
                  {isSelected && (
                    <Check
                      className="w-2.5 h-2.5"
                      style={{
                        color: ['cream', 'yellow', 'pastel'].includes(color.id) ? '#1A1612' : '#FFFFFF'
                      }}
                    />
                  )}
                </span>

                {/* Color Name */}
                <span>{color.nameVi.split(' / ')[0]}</span>

                {/* Outfits Count Badge */}
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#991B1E] text-white'
                      : hasLooks
                      ? 'bg-[#EFE5D6] text-[#4A3B32]'
                      : 'bg-[#F2ECE0] text-[#A8988B]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wardrobe Palette Distribution Bar (if saved looks exist) */}
      {colorDistribution.length > 0 && (
        <div className="pt-3 border-t border-[#EFE5D6] space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#7A6B5F]">
            <span className="font-semibold text-[#4A3B32]">
              Tỷ Lệ Bảng Màu Tủ Đồ Của Bạn (Wardrobe Palette Spectrum):
            </span>
            <span>Nhấp vào dải màu để lọc nhanh</span>
          </div>

          {/* Stacked Progress Bar */}
          <div className="h-3 w-full rounded-full overflow-hidden flex border border-[#E0D2C0] shadow-inner bg-[#EAE0D2]">
            {colorDistribution.map((item) => (
              <button
                key={item.colorId}
                type="button"
                onClick={() => onSelectColor(selectedColor === item.colorId ? 'all' : item.colorId)}
                className="h-full transition-opacity hover:opacity-85 focus:outline-none cursor-pointer relative group"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.hex
                }}
                title={`${item.nameVi}: ${item.count} outfit (${item.percentage}%)`}
              />
            ))}
          </div>

          {/* Legend dots */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#66574C]">
            {colorDistribution.map((item) => (
              <button
                key={item.colorId}
                type="button"
                onClick={() => onSelectColor(selectedColor === item.colorId ? 'all' : item.colorId)}
                className={`inline-flex items-center gap-1.5 hover:text-[#991B1E] transition-colors cursor-pointer ${
                  selectedColor === item.colorId ? 'font-bold text-[#991B1E]' : ''
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: item.hex }}
                />
                <span>
                  {item.nameVi.split(' / ')[0]} ({item.percentage}%)
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
