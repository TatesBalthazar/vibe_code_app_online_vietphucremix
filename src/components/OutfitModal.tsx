import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Clock,
  Check,
  ArrowRight,
  Users,
  Scissors,
  Palette,
  BookOpen,
  Layers,
  Info,
  HelpCircle
} from 'lucide-react';
import { Outfit } from '../types';
import { ExploreVietPhucItem } from '../data/exploreVietPhucData';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedExploreItem } from '../data/exploreVietPhucTranslations';

interface OutfitModalProps {
  outfit: (Outfit & Partial<ExploreVietPhucItem>) | ExploreVietPhucItem | null;
  onClose: () => void;
  onRemix: (outfitId: string) => void;
}

type ModalSectionTab = 'all' | 'history' | 'structure' | 'culture';

export const OutfitModal: React.FC<OutfitModalProps> = ({
  outfit: rawOutfit,
  onClose,
  onRemix
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ModalSectionTab>('all');

  if (!rawOutfit) return null;

  // Localize outfit if it's an ExploreVietPhucItem
  const outfit =
    'groupCategory' in rawOutfit
      ? getLocalizedExploreItem(rawOutfit as ExploreVietPhucItem, language)
      : rawOutfit;

  const targetStudioId =
    'studioOutfitId' in outfit && outfit.studioOutfitId
      ? outfit.studioOutfitId
      : outfit.id;

  const isEn = language === 'en';

  const modalTabs: { id: ModalSectionTab; label: string }[] = isEn
    ? [
        { id: 'all', label: 'All 14 Criteria' },
        { id: 'history', label: 'History & Wearers' },
        { id: 'structure', label: 'Structure & Materials' },
        { id: 'culture', label: 'Significance & Lore' }
      ]
    : [
        { id: 'all', label: 'Tất cả 14 tiêu chí' },
        { id: 'history', label: 'Lịch sử & Đối tượng' },
        { id: 'structure', label: 'Cấu trúc & Chất liệu' },
        { id: 'culture', label: 'Ý nghĩa & Thuật ngữ' }
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E2D5C3] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2]/90 hover:bg-white text-[#4A3B32] hover:text-[#991B1E] flex items-center justify-center shadow-sm transition-all cursor-pointer"
          aria-label={isEn ? 'Close details' : 'Đóng chi tiết'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Header */}
        <div className="relative h-60 sm:h-68 w-full overflow-hidden bg-[#231C18]">
          <img
            src={outfit.image}
            alt={outfit.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/45 to-black/25" />

          <div className="absolute bottom-4 left-6 right-6 space-y-1">
            {/* Unboxed Clean Editorial Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#991B1E]">
              <span>
                {outfit.groupCategoryLabel ||
                  (isEn ? 'Vietnamese Costume Heritage' : 'Di Sản Y Phục Việt')}
              </span>
              {outfit.alternativeNames && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#4A3B32] font-normal">
                    {isEn ? 'Also known as:' : 'Tên gọi khác:'} {outfit.alternativeNames}
                  </span>
                </>
              )}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
              {outfit.name}
            </h2>
            <p className="text-sm text-[#5C4D41] font-medium">
              {outfit.vietnameseName}
            </p>
          </div>
        </div>

        {/* Segmented Filter Bar inside Modal for Effortless Reading */}
        <div className="px-6 sm:px-8 pt-3 pb-3 bg-[#F3ECE0]/70 border-y border-[#E5D7C3] flex flex-wrap items-center gap-1.5">
          {modalTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#991B1E] text-white shadow-2xs'
                    : 'text-[#5C4D41] hover:text-[#1C1917] hover:bg-[#EAE0D0]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body: Structured Archival Sheet */}
        <div className="p-6 sm:p-8 space-y-7 max-h-[58vh] overflow-y-auto divide-y divide-[#E8DEC8]">
          {/* SECTION 1: LỊCH SỬ, TRIỀU ĐẠI & ĐỐI TƯỢNG SỬ DỤNG */}
          {(activeTab === 'all' || activeTab === 'history') && (
            <div className="space-y-5 first:pt-0 pt-5">
              {/* 1, 2 & 3. Tên gọi & Thời kỳ / Triều đại */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-semibold text-[#8C7A6B] block mb-1">
                    {isEn
                      ? '01. Garment Name & Alternate Titles'
                      : '01. Tên trang phục & Tên gọi khác'}
                  </span>
                  <div className="font-serif font-bold text-base text-[#1C1917]">
                    {outfit.name} — {outfit.vietnameseName}
                  </div>
                  {outfit.alternativeNames && (
                    <p className="text-xs text-[#5C4D41] mt-1 leading-relaxed">
                      {isEn ? 'Also known as:' : 'Tên gọi khác:'} {outfit.alternativeNames}
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#991B1E] flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {isEn ? '02. Historical Era & Dynasty' : '02. Thời kỳ / Triều đại'}
                    </span>
                  </span>
                  <p className="text-sm font-medium text-[#2E251F] leading-relaxed">
                    {outfit.era}
                  </p>
                </div>
              </div>

              {/* 4. Bối cảnh lịch sử */}
              <div>
                <h4 className="text-xs font-semibold text-[#991B1E] flex items-center gap-1.5 mb-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {isEn ? '03. Historical Context' : '03. Bối cảnh lịch sử'}
                  </span>
                </h4>
                <p className="text-sm text-[#382F28] leading-relaxed">
                  {outfit.context}
                </p>
              </div>

              {/* 5. Đối tượng sử dụng */}
              {outfit.wearers && (
                <div>
                  <h4 className="text-xs font-semibold text-[#4A3B32] flex items-center gap-1.5 mb-1.5">
                    <Users className="w-4 h-4 text-[#991B1E]" />
                    <span>
                      {isEn ? '04. Wearers & Social Status' : '04. Đối tượng sử dụng'}
                    </span>
                  </h4>
                  <p className="text-sm text-[#382F28] leading-relaxed">
                    {outfit.wearers}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: CẤU TRÚC CẮT MAY, THIẾT KẾ, CHẤT LIỆU & HOA VĂN */}
          {(activeTab === 'all' || activeTab === 'structure') && (
            <div className="space-y-5 first:pt-0 pt-5">
              {/* 7, 8 & 9. Kiểu cổ áo, Kiểu tay áo, Phom dáng / cấu trúc */}
              {(outfit.collarStyle ||
                outfit.sleeveStyle ||
                outfit.silhouetteStructure) && (
                <div>
                  <h4 className="text-xs font-semibold text-[#4A3B32] flex items-center gap-1.5 mb-3">
                    <Scissors className="w-4 h-4 text-[#991B1E]" />
                    <span>
                      {isEn
                        ? '05. Structural Anatomy: Collar · Sleeves · Silhouette'
                        : '05. Giải phẫu cấu trúc: Cổ áo · Tay áo · Phom dáng'}
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-y border-[#E5D7C3] py-4">
                    {outfit.collarStyle && (
                      <div>
                        <span className="text-xs font-semibold text-[#991B1E] block mb-1">
                          {isEn ? 'Collar Style' : 'Kiểu cổ áo'}
                        </span>
                        <p className="text-xs text-[#382F28] leading-relaxed">
                          {outfit.collarStyle}
                        </p>
                      </div>
                    )}

                    {outfit.sleeveStyle && (
                      <div className="sm:border-l sm:border-[#E5D7C3] sm:pl-4">
                        <span className="text-xs font-semibold text-[#991B1E] block mb-1">
                          {isEn ? 'Sleeve Style' : 'Kiểu tay áo'}
                        </span>
                        <p className="text-xs text-[#382F28] leading-relaxed">
                          {outfit.sleeveStyle}
                        </p>
                      </div>
                    )}

                    {outfit.silhouetteStructure && (
                      <div className="sm:border-l sm:border-[#E5D7C3] sm:pl-4">
                        <span className="text-xs font-semibold text-[#991B1E] block mb-1">
                          {isEn ? 'Silhouette & Structure' : 'Phom dáng / Cấu trúc'}
                        </span>
                        <p className="text-xs text-[#382F28] leading-relaxed">
                          {outfit.silhouetteStructure}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 6. Đặc điểm thiết kế */}
              <div>
                <h4 className="text-xs font-semibold text-[#4A3B32] flex items-center gap-1.5 mb-2.5">
                  <Check className="w-4 h-4 text-[#2E7D32]" />
                  <span>
                    {isEn
                      ? '06. Signature Design Features'
                      : '06. Đặc điểm thiết kế nổi bật'}
                  </span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#3E342B]">
                  {outfit.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#991B1E] mt-2 shrink-0" />
                      <span className="text-xs sm:text-sm leading-relaxed">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 10 & 11. Chất liệu thường gặp & Màu sắc / Hoa văn đặc trưng */}
              {(outfit.commonMaterials || outfit.colorsAndMotifs) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {outfit.commonMaterials && (
                    <div>
                      <h4 className="text-xs font-semibold text-[#4A3B32] flex items-center gap-1.5 mb-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#991B1E]" />
                        <span>
                          {isEn ? '07. Common Textiles & Fabrics' : '07. Chất liệu thường gặp'}
                        </span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#382F28] leading-relaxed">
                        {outfit.commonMaterials}
                      </p>
                    </div>
                  )}

                  {outfit.colorsAndMotifs && (
                    <div>
                      <h4 className="text-xs font-semibold text-[#4A3B32] flex items-center gap-1.5 mb-1.5">
                        <Palette className="w-3.5 h-3.5 text-[#C8973E]" />
                        <span>
                          {isEn ? '08. Distinctive Colors & Motifs' : '08. Màu sắc & Hoa văn đặc trưng'}
                        </span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#382F28] leading-relaxed">
                        {outfit.colorsAndMotifs}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: DỊP SỬ DỤNG, Ý NGHĨA VĂN HÓA & GHI CHÚ THUẬT NGỮ */}
          {(activeTab === 'all' || activeTab === 'culture') && (
            <div className="space-y-5 first:pt-0 pt-5">
              {/* 12. Dịp sử dụng / bối cảnh mặc */}
              <div>
                <h4 className="text-xs font-semibold text-[#2B4A6F] flex items-center gap-1.5 mb-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>
                    {isEn
                      ? '09. Occasions & Etiquette Context'
                      : '09. Dịp sử dụng / Bối cảnh mặc'}
                  </span>
                </h4>
                <p className="text-sm text-[#382F28] leading-relaxed">
                  {outfit.whenAppropriate}
                </p>
              </div>

              {/* 13. Ý nghĩa văn hóa */}
              <div>
                <h4 className="text-xs font-semibold text-[#8A631E] flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isEn ? '10. Cultural Significance' : '10. Ý nghĩa văn hóa'}
                  </span>
                </h4>
                <p className="text-sm text-[#382F28] leading-relaxed">
                  {outfit.significance}
                </p>
              </div>

              {/* 14. Ghi chú về cách gọi hoặc phạm vi sử dụng */}
              {outfit.terminologyAndScopeNote && (
                <div className="pt-2">
                  <div className="text-xs font-semibold text-[#991B1E] flex items-center gap-1.5 mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>
                      {isEn
                        ? '11. Terminology & Usage Scope Notes'
                        : '11. Ghi chú về cách gọi & Phạm vi sử dụng'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3E332A] leading-relaxed">
                    {outfit.terminologyAndScopeNote}
                  </p>
                </div>
              )}

              {/* Cultural Note Guidance */}
              {outfit.cultureNote && (
                <div className="pt-2 text-xs text-[#6B5542] leading-relaxed">
                  <strong className="text-[#1C1917]">
                    {isEn
                      ? 'Gen Z Styling & Modern Wear Advice:'
                      : 'Gợi ý ứng dụng & phối đồ Gen Z:'}
                  </strong>{' '}
                  {outfit.cultureNote}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 sm:px-8 bg-[#F3ECE0] border-t border-[#E5D7C3] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm font-medium text-[#594C42] hover:bg-[#EAE0D0] transition-colors cursor-pointer"
          >
            {isEn ? 'Close' : 'Đóng'}
          </button>

          <button
            type="button"
            onClick={() => {
              onRemix(targetStudioId);
              onClose();
            }}
            className="inline-flex items-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span>{isEn ? 'Remix this attire' : 'Remix trang phục này'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
