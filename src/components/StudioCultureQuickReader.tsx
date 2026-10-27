import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Sparkles,
  ShieldCheck,
  Check,
  AlertTriangle,
  Lightbulb,
  Palette,
  Layers,
  Crown,
  History,
  Compass,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { OutfitId, ColorId, OccasionId, StyleId } from '../types';
import {
  OUTFIT_CULTURE_NOTES,
  ACCESSORY_CULTURE_NOTES,
  COLOR_CULTURE_NOTES,
  CultureProprietyNote
} from '../data/cultureProprietyData';
import { COLORS_DATA } from '../data/colors';
import { OUTFITS_DATA } from '../data/outfits';

export interface StudioCultureQuickReaderProps {
  isOpen: boolean;
  onClose: () => void;
  outfitId: OutfitId;
  accessoryIds: string[];
  colorId: ColorId;
  occasionId?: OccasionId;
  styleId?: StyleId;
  gender?: 'female' | 'male';
  onToggleAccessory?: (accessoryId: string) => void;
  onSelectOutfit?: (outfitId: OutfitId) => void;
  initialTab?: 'outfit' | 'equipped-accessories' | 'all-accessories' | 'color';
}

const ACCESSORY_MAP: Record<string, string> = {
  'khan-dong': 'khan-dong',
  'vong-kieng-bac': 'kieng-bac',
  'kieng-bac': 'kieng-bac',
  'non-quai-thao': 'non-quai-thao',
  'chuoi-ngoc-trai': 'ngoc-trai',
  'ngoc-trai': 'ngoc-trai',
  'sandal-day-manh': 'sandal',
  'sandal': 'sandal',
  'sneakers-retro-trang': 'sneakers',
  'sneakers': 'sneakers'
};

const STUDIO_ALL_ACCESSORIES = [
  {
    id: 'khan-dong',
    noteKey: 'khan-dong',
    name: 'Khăn đóng lụa',
    category: 'Phụ kiện đầu',
    tag: 'Nghi thức đứng đắn'
  },
  {
    id: 'vong-kieng-bac',
    noteKey: 'kieng-bac',
    name: 'Vòng kiềng bạc nguyên khối',
    category: 'Trang sức cổ truyền',
    tag: 'Thanh bạch & tinh khiết'
  },
  {
    id: 'non-quai-thao',
    noteKey: 'non-quai-thao',
    name: 'Nón quai thao (Ba tầm)',
    category: 'Phụ kiện đầu',
    tag: 'Duyên dáng Quan họ'
  },
  {
    id: 'chuoi-ngoc-trai',
    noteKey: 'ngoc-trai',
    name: 'Chuỗi vòng ngọc trai',
    category: 'Trang sức quý phái',
    tag: 'Đài các & sang trọng'
  },
  {
    id: 'sandal-day-manh',
    noteKey: 'sandal',
    name: 'Guốc mộc / Sandal quai mảnh',
    category: 'Giày dép truyền thống',
    tag: 'Mộc mạc & thanh thoát'
  },
  {
    id: 'sneakers-retro-trang',
    noteKey: 'sneakers',
    name: 'Sneakers trắng tối giản',
    category: 'Giày dép hiện đại',
    tag: 'Năng động Gen Z'
  }
];

export const StudioCultureQuickReader: React.FC<StudioCultureQuickReaderProps> = ({
  isOpen,
  onClose,
  outfitId,
  accessoryIds,
  colorId,
  gender = 'female',
  onToggleAccessory,
  initialTab = 'outfit'
}) => {
  const [activeTab, setActiveTab] = useState<
    'outfit' | 'equipped-accessories' | 'all-accessories' | 'color'
  >(initialTab);

  if (!isOpen) return null;

  const currentOutfitData = OUTFITS_DATA.find((o) => o.id === outfitId);
  const outfitCultureNote: CultureProprietyNote | undefined = OUTFIT_CULTURE_NOTES[outfitId];
  const colorCultureNote: CultureProprietyNote | undefined = COLOR_CULTURE_NOTES[colorId];
  const colorOption = COLORS_DATA.find((c) => c.id === colorId);

  // Equipped accessories with mapped culture notes
  const equippedList = accessoryIds.map((accId) => {
    const mappedKey = ACCESSORY_MAP[accId] || accId;
    const note = ACCESSORY_CULTURE_NOTES[mappedKey];
    const catalogItem = STUDIO_ALL_ACCESSORIES.find((a) => a.id === accId);
    return {
      id: accId,
      name: catalogItem?.name || note?.name || accId,
      category: catalogItem?.category || 'Phụ kiện',
      note
    };
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Đọc nhanh thông tin văn hóa y phục và phụ kiện"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] bg-[#FFFDF9] border border-[#E2D5C3] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Royal Heritage Gradient */}
        <div className="bg-gradient-to-r from-[#991B1E] via-[#851619] to-[#6E1214] text-white p-5 sm:p-6 relative flex flex-col justify-between shrink-0 shadow-md">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F5D587] shadow-inner shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5D587]">
                    Tra Cứu Nhanh Tri Thức Văn Hóa
                  </span>
                  <span className="text-[10px] bg-white/20 text-white font-medium px-2 py-0.5 rounded-full">
                    Studio Context
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                  Ý Nghĩa Văn Hóa Y Phục & Phụ Kiện
                </h2>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Đóng cửa sổ tra cứu"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Context Summary Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/15 text-xs text-white/90">
            <span className="text-white/70">Đang phối trên người mẫu:</span>
            <span className="bg-white/15 px-2.5 py-0.5 rounded-full font-semibold text-white flex items-center gap-1">
              <Crown className="w-3 h-3 text-[#F5D587]" />
              {currentOutfitData?.name || outfitCultureNote?.name || outfitId}
            </span>
            <span className="bg-white/15 px-2.5 py-0.5 rounded-full font-semibold text-white flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#F5D587]" />
              {equippedList.length} phụ kiện
            </span>
            <span className="bg-white/15 px-2.5 py-0.5 rounded-full font-semibold text-white flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/50"
                style={{ backgroundColor: colorOption?.hex || '#C8973E' }}
              />
              {colorOption?.nameVi.split(' / ')[0] || colorId}
            </span>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-[#FAF7F2] border-b border-[#E5D7C3] px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto shrink-0 py-2">
          <button
            type="button"
            onClick={() => setActiveTab('outfit')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'outfit'
                ? 'bg-[#991B1E] text-white shadow-xs'
                : 'text-[#4A3B32] hover:bg-[#F2ECE0] hover:text-[#991B1E]'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Trang Phục ({currentOutfitData?.name || 'Y phục'})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('equipped-accessories')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'equipped-accessories'
                ? 'bg-[#991B1E] text-white shadow-xs'
                : 'text-[#4A3B32] hover:bg-[#F2ECE0] hover:text-[#991B1E]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Phụ Kiện Đang Mặc ({equippedList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('all-accessories')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'all-accessories'
                ? 'bg-[#991B1E] text-white shadow-xs'
                : 'text-[#4A3B32] hover:bg-[#F2ECE0] hover:text-[#991B1E]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kho Phụ Kiện Việt (6)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('color')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'color'
                ? 'bg-[#991B1E] text-white shadow-xs'
                : 'text-[#4A3B32] hover:bg-[#F2ECE0] hover:text-[#991B1E]'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Sắc Màu & Ngũ Hành</span>
          </button>
        </div>

        {/* Tab Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* ========================================================
              TAB 1: TRANG PHỤC ĐANG PHỐI
             ======================================================== */}
          {activeTab === 'outfit' && outfitCultureNote && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Garment Hero Card */}
              <div className="bg-[#FAF7F2] rounded-2xl border border-[#DECBB4] p-5 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#991B1E] text-white text-[11px] font-bold">
                      {outfitCultureNote.badge}
                    </span>
                    <span className="text-xs text-[#7A6B5F] font-medium flex items-center gap-1">
                      <History className="w-3.5 h-3.5 text-[#C8973E]" />
                      {outfitCultureNote.eraOrSource}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Bảo lưu chuẩn mực: {outfitCultureNote.integrityScore}%
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                    {outfitCultureNote.name}
                  </h3>
                  {currentOutfitData?.vietnameseName && (
                    <p className="text-xs text-[#8C7B6E] font-medium mt-0.5">
                      Tên định danh: {currentOutfitData.vietnameseName}
                    </p>
                  )}
                </div>

                <p className="text-sm text-[#4A3B32] leading-relaxed">
                  {outfitCultureNote.symbolicMeaning}
                </p>
              </div>

              {/* Core Standards & Garment Structure */}
              <div className="bg-white rounded-2xl border border-[#E2D5C3] p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#991B1E] font-serif font-bold text-base">
                  <ShieldCheck className="w-5 h-5" />
                  <h4>Cấu Trúc & Chuẩn Mực Cốt Lõi Không Được Làm Sai</h4>
                </div>

                <div className="bg-[#FAF5EB] rounded-xl p-4 border border-[#E8DAC7] text-xs sm:text-sm text-[#3D3128] font-medium leading-relaxed">
                  {outfitCultureNote.coreStandard}
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A6B5F]">
                    Quy chuẩn mực thước khi may & mặc:
                  </span>
                  <ul className="space-y-1.5">
                    {outfitCultureNote.proprietyRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A3B32]">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Do's & Don'ts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Do's */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <Check className="w-4 h-4 bg-emerald-600 text-white rounded-full p-0.5" />
                    <span>Nên Làm (Do's) & Dịp Mặc Phù Hợp</span>
                  </div>
                  <ul className="space-y-2">
                    {outfitCultureNote.dos.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-emerald-950 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Don'ts */}
                <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 bg-rose-600 text-white rounded-full p-0.5" />
                    <span>Điều Kiêng Kỵ Cần Tránh (Don'ts)</span>
                  </div>
                  <ul className="space-y-2">
                    {outfitCultureNote.donts.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-rose-950 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Safe Remix Guidelines */}
              <div className="bg-gradient-to-r from-[#FAF2EB] to-[#FFF9F2] rounded-2xl border border-[#DECBB4] p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#991B1E] font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-[#C8973E]" />
                  <span>Lời Khuyên Cách Tân Đương Đại Văn Minh</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A3B32] leading-relaxed">
                  {outfitCultureNote.safeRemixGuide}
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: PHỤ KIỆN ĐANG MẶC (EQUIPPED ACCESSORIES)
             ======================================================== */}
          {activeTab === 'equipped-accessories' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5D7C3]">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                    Ý Nghĩa Phụ Kiện Đang Phối Cùng Trang Phục
                  </h4>
                  <p className="text-xs text-[#7A6B5F] mt-0.5">
                    Mỗi phụ kiện cổ truyền đều gửi gắm nề nếp gia phong và tính thanh lịch của người Việt
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#991B1E]/10 text-[#991B1E] font-bold text-xs shrink-0">
                  {equippedList.length} món đã chọn
                </span>
              </div>

              {equippedList.length === 0 ? (
                <div className="text-center py-12 px-4 bg-[#FAF7F2] rounded-2xl border border-[#E2D5C3] space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center mx-auto">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-serif font-bold text-base text-[#1C1917]">
                      Chưa Chọn Phụ Kiện Nào
                    </h5>
                    <p className="text-xs text-[#66574C] max-w-md mx-auto">
                      Trang phục đang theo phong cách tối giản thanh khiết. Bạn có thể phối thêm phụ kiện truyền thống để tăng chiều sâu câu chuyện di sản!
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('all-accessories')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#991B1E] text-white text-xs font-bold hover:bg-[#781316] transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Xem Kho Phụ Kiện & Chọn Thử</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {equippedList.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#DECBB4] p-5 shadow-xs space-y-3 transition-all hover:border-[#991B1E]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E] bg-[#991B1E]/10 px-2 py-0.5 rounded-full">
                              {item.category}
                            </span>
                            {item.note?.badge && (
                              <span className="text-[10px] font-semibold text-[#8C7B6E] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E0D2C0]">
                                {item.note.badge}
                              </span>
                            )}
                          </div>
                          <h5 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">
                            {item.note?.name || item.name}
                          </h5>
                          {item.note?.eraOrSource && (
                            <p className="text-[11px] text-[#7A6B5F] flex items-center gap-1">
                              <History className="w-3 h-3 text-[#C8973E]" />
                              <span>{item.note.eraOrSource}</span>
                            </p>
                          )}
                        </div>

                        {onToggleAccessory && (
                          <button
                            type="button"
                            onClick={() => onToggleAccessory(item.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-medium border border-rose-200 transition-colors cursor-pointer shrink-0"
                            title="Bỏ phụ kiện này khỏi người mẫu"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Tháo bỏ</span>
                          </button>
                        )}
                      </div>

                      {/* Cultural Meaning & Symbolism */}
                      {item.note?.symbolicMeaning && (
                        <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DAC7] text-xs text-[#3D3128] leading-relaxed">
                          <strong className="text-[#991B1E] block mb-0.5">Ý nghĩa văn hóa & biểu tượng:</strong>
                          {item.note.symbolicMeaning}
                        </div>
                      )}

                      {/* Core rules & Remix advice */}
                      {item.note && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {item.note.coreStandard && (
                            <div className="p-2.5 rounded-xl bg-white border border-[#E5D7C3] space-y-1">
                              <span className="font-bold text-[#4A3B32] block">Quy chuẩn đeo chuẩn mực:</span>
                              <span className="text-[#66574C]">{item.note.coreStandard}</span>
                            </div>
                          )}
                          {item.note.safeRemixGuide && (
                            <div className="p-2.5 rounded-xl bg-[#FAF2EB] border border-[#F0DFCF] space-y-1">
                              <span className="font-bold text-[#991B1E] block">Gợi ý phối đương đại:</span>
                              <span className="text-[#4A3B32]">{item.note.safeRemixGuide}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 3: TOÀN BỘ KHO PHỤ KIỆN TRUYỀN THỐNG & Ý NGHĨA
             ======================================================== */}
          {activeTab === 'all-accessories' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="pb-2 border-b border-[#E5D7C3]">
                <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                  Từ Điển Văn Hóa 6 Món Phụ Kiện Y Phục Việt
                </h4>
                <p className="text-xs text-[#7A6B5F] mt-0.5">
                  Bấm để trang bị trực tiếp vào người mẫu hoặc tháo bỏ nhanh chóng
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STUDIO_ALL_ACCESSORIES.map((item) => {
                  const isEquipped = accessoryIds.includes(item.id);
                  const note = ACCESSORY_CULTURE_NOTES[item.noteKey];

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                        isEquipped
                          ? 'bg-[#FAF2EB] border-[#991B1E] shadow-xs'
                          : 'bg-white border-[#DECBB4] hover:border-[#C8973E]'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#7A6B5F] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E0D2C0]">
                            {item.category}
                          </span>
                          {isEquipped && (
                            <span className="text-[10px] font-bold text-white bg-[#991B1E] px-2 py-0.5 rounded-full">
                              Đang Mặc
                            </span>
                          )}
                        </div>

                        <h5 className="font-serif font-bold text-base text-[#1C1917]">
                          {item.name}
                        </h5>

                        <p className="text-xs text-[#524439] leading-relaxed line-clamp-3">
                          {note?.symbolicMeaning || 'Phụ kiện tôn vinh phong thái mực thước và duyên dáng của trang phục Việt.'}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#EAE0D2] flex items-center justify-between gap-2">
                        <span className="text-[11px] font-medium text-[#8C7B6E] italic">
                          {item.tag}
                        </span>

                        {onToggleAccessory && (
                          <button
                            type="button"
                            onClick={() => onToggleAccessory(item.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                              isEquipped
                                ? 'bg-white text-[#991B1E] border border-[#991B1E] hover:bg-rose-50'
                                : 'bg-[#991B1E] text-white hover:bg-[#781316] shadow-2xs'
                            }`}
                          >
                            {isEquipped ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Đang mặc</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Mặc thử</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: SẮC MÀU & TRIẾT LÝ NGŨ HÀNH
             ======================================================== */}
          {activeTab === 'color' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {colorCultureNote && colorOption && (
                <div className="bg-[#FAF7F2] rounded-2xl border border-[#DECBB4] p-5 sm:p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-full border border-black/15 shadow-sm shrink-0"
                        style={{ backgroundColor: colorOption.hex }}
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E]">
                          Sắc Màu Đang Chọn
                        </span>
                        <h4 className="font-serif text-xl font-bold text-[#1C1917]">
                          {colorCultureNote.name}
                        </h4>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-[#991B1E] text-white text-xs font-bold">
                      {colorCultureNote.badge}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2D5C3] text-xs sm:text-sm text-[#3D3128] leading-relaxed">
                    <strong className="text-[#991B1E] block mb-1">Ý nghĩa triết lý & văn hóa:</strong>
                    {colorCultureNote.symbolicMeaning}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#E5D7C3] space-y-1">
                      <span className="font-bold text-[#4A3B32] block">Quy chuẩn truyền thống:</span>
                      <span className="text-[#66574C]">{colorCultureNote.coreStandard}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF2EB] border border-[#F0DFCF] space-y-1">
                      <span className="font-bold text-[#991B1E] block">Gợi ý phối màu hài hòa:</span>
                      <span className="text-[#4A3B32]">{colorCultureNote.safeRemixGuide}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 8 Traditional Colors Cultural Overview */}
              <div className="space-y-3 pt-2">
                <h5 className="font-serif font-bold text-base text-[#1C1917]">
                  Tổng Quan Bảng Sắc Màu Ngũ Sắc Việt
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COLORS_DATA.map((c) => {
                    const isCurrent = c.id === colorId;
                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                          isCurrent
                            ? 'bg-[#FAF2EB] border-[#991B1E] ring-1 ring-[#991B1E]/30 font-bold'
                            : 'bg-white border-[#E2D5C3]'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/15 shadow-2xs shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[#1C1917] block">
                            {c.nameVi.split(' / ')[0]}
                          </span>
                          <span className="text-[11px] text-[#7A6B5F] line-clamp-1">
                            {c.culturalMeaning}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with action buttons */}
        <div className="bg-[#FAF7F2] border-t border-[#E5D7C3] px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#7A6B5F]">
            <ShieldCheck className="w-4 h-4 text-[#991B1E] shrink-0" />
            <span>Remix văn minh: Giữ cốt cách cổ truyền, mở rộng hơi thở đương đại</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Tiếp Tục Phối Đồ Trong Studio
          </button>
        </div>
      </div>
    </div>
  );
};
