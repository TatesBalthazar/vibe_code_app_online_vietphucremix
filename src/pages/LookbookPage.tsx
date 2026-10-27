import React, { useState, useMemo } from 'react';
import {
  Heart,
  Trash2,
  Share2,
  Sparkles,
  Calendar,
  ArrowRight,
  Check,
  Wand2,
  Camera,
  BookOpen,
  ShieldCheck,
  Palette,
  RotateCcw,
  SlidersHorizontal,
  Filter
} from 'lucide-react';
import { SavedLook, OutfitLookState, ColorId } from '../types';
import { CharacterDefaultAvatar } from '../components/CharacterDefaultAvatar';
import { AIOutfitIllustrationModal } from '../components/AIOutfitIllustrationModal';
import { RealisticOutfitVisualizer, AIPhotoStyle } from '../components/RealisticOutfitVisualizer';
import { CulturalInsightPopover } from '../components/CulturalInsightPopover';
import {
  LookbookColorFilter,
  ColorToneCategory,
  TONE_MAPPINGS,
  TONE_LABELS
} from '../components/LookbookColorFilter';
import { OutfitColorDistributionChart } from '../components/OutfitColorDistributionChart';
import { COLORS_DATA } from '../data/colors';
import { OUTFITS_DATA } from '../data/outfits';
import { SocialShareCardModal } from '../components/SocialShareCardModal';

interface LookbookPageProps {
  savedLooks: SavedLook[];
  onRemoveLook: (id: string) => void;
  onStartRemix: (colorId?: ColorId) => void;
  onUpdateLookImage?: (lookId: string, newImageDataUrl: string, aiStyle: AIPhotoStyle, prompt: string) => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({
  savedLooks,
  onRemoveLook,
  onStartRemix,
  onUpdateLookImage
}) => {
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [activeAIModalLook, setActiveAIModalLook] = useState<SavedLook | null>(null);
  const [inspectCultureLook, setInspectCultureLook] = useState<SavedLook | null>(null);
  const [shareCardLook, setShareCardLook] = useState<SavedLook | null>(null);

  // Color Filter State
  const [selectedColor, setSelectedColor] = useState<ColorId | 'all'>('all');
  const [selectedTone, setSelectedTone] = useState<ColorToneCategory>('all');

  const handleSelectColor = (colorId: ColorId | 'all') => {
    setSelectedColor(colorId);
    if (colorId !== 'all') {
      setSelectedTone('all');
    }
  };

  const handleSelectTone = (tone: ColorToneCategory) => {
    setSelectedTone(tone);
    setSelectedColor('all');
  };

  const handleResetFilter = () => {
    setSelectedColor('all');
    setSelectedTone('all');
  };

  // Filtered Looks
  const filteredLooks = useMemo(() => {
    return savedLooks.filter((look) => {
      if (selectedColor !== 'all') {
        return look.color === selectedColor;
      }
      if (selectedTone !== 'all') {
        return TONE_MAPPINGS[selectedTone].includes(look.color);
      }
      return true;
    });
  }, [savedLooks, selectedColor, selectedTone]);

  const activeColorData = useMemo(() => {
    if (selectedColor === 'all') return null;
    return COLORS_DATA.find((c) => c.id === selectedColor) || null;
  }, [selectedColor]);

  const handleShare = (look: SavedLook) => {
    setShareCardLook(look);
  };

  const handleSaveAIImage = (lookId: string, newImageDataUrl: string, aiStyle: AIPhotoStyle, prompt: string) => {
    if (onUpdateLookImage) {
      onUpdateLookImage(lookId, newImageDataUrl, aiStyle, prompt);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Toast */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5D7C3] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#991B1E]">
            Bộ Sưu Tập Cá Nhân
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917]">
            MY LOOKBOOK
          </h1>
          <p className="text-sm sm:text-base text-[#66574C]">
            Your collection of Việt-inspired looks. Lưu giữ những bản phối Việt phục độc bản.
          </p>
        </div>

        {savedLooks.length > 0 && (
          <button
            onClick={onStartRemix}
            className="inline-flex items-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo Thêm Look Mới</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {savedLooks.length === 0 ? (
        <div className="text-center py-20 px-4 bg-[#FFFDF9] rounded-3xl border border-[#E2D5C3] max-w-xl mx-auto space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 opacity-75" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              YOUR LOOKBOOK IS EMPTY
            </h3>
            <p className="text-sm text-[#66574C] max-w-md mx-auto leading-relaxed">
              Bạn chưa lưu outfit nào. Hãy vào Remix Studio để thỏa sức sáng tạo diện mạo Việt phục đầu tiên của mình!
            </p>
          </div>

          <div>
            <button
              id="empty-start-remix-btn"
              onClick={onStartRemix}
              className="inline-flex items-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-md transition-transform hover:scale-103 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>START REMIXING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Color Filters Panel */}
          <LookbookColorFilter
            savedLooks={savedLooks}
            selectedColor={selectedColor}
            selectedTone={selectedTone}
            onSelectColor={handleSelectColor}
            onSelectTone={handleSelectTone}
            onResetFilter={handleResetFilter}
            filteredCount={filteredLooks.length}
          />

          {/* If no outfits match the selected color filter */}
          {filteredLooks.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#FFFDF9] rounded-3xl border border-[#E2D5C3] max-w-xl mx-auto space-y-5 shadow-xs animate-in fade-in-50">
              <div className="w-16 h-16 rounded-full bg-[#FAF2EB] border border-[#DECBB4] text-[#991B1E] flex items-center justify-center mx-auto shadow-xs">
                <Palette className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                  Chưa Có Trang Phục Phù Hợp
                </h3>

                {activeColorData ? (
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E0D2C0] text-xs font-semibold text-[#1C1917]">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: activeColorData.hex }}
                      />
                      <span>Tông màu: {activeColorData.nameVi}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#66574C] max-w-md mx-auto leading-relaxed">
                      {activeColorData.culturalMeaning} Bạn chưa lưu outfit nào mang sắc thái này trong Lookbook.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-[#66574C] max-w-md mx-auto leading-relaxed">
                    Không có trang phục nào phù hợp với nhóm tông màu{' '}
                    <span className="font-bold text-[#991B1E]">
                      {TONE_LABELS[selectedTone]?.label}
                    </span>{' '}
                    trong bộ sưu tập cá nhân của bạn.
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#3A2E24] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-[#DECBB4] transition-all cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 text-[#7A6B5F]" />
                  <span>Xem Tất Cả ({savedLooks.length} outfit)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStartRemix(selectedColor !== 'all' ? selectedColor : undefined)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#991B1E] hover:bg-[#781316] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-transform hover:scale-102 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#F5D587]" />
                  <span>
                    {selectedColor !== 'all'
                      ? `Phối Màu Này Ngay (${activeColorData?.nameVi.split(' / ')[0]})`
                      : 'Vào Studio Phối Đồ'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Saved Outfits Grid */
            <div className="space-y-6">
              {/* Filter Active Indicator Banner */}
              {(selectedColor !== 'all' || selectedTone !== 'all') && (
                <div className="flex items-center justify-between bg-[#FAF2EB] border border-[#F0DFCF] px-4 py-2.5 rounded-xl text-xs text-[#7A6B5F]">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-[#991B1E]" />
                    <span>
                      Đang hiển thị{' '}
                      <strong className="text-[#991B1E]">{filteredLooks.length}</strong> /{' '}
                      {savedLooks.length} outfit theo:{' '}
                      <strong className="text-[#1C1917]">
                        {selectedColor !== 'all'
                          ? activeColorData?.nameVi
                          : TONE_LABELS[selectedTone]?.label}
                      </strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetFilter}
                    className="text-[#991B1E] hover:underline font-semibold cursor-pointer text-xs"
                  >
                    Xem tất cả
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLooks.map((look) => {
                  return (
                    <div
                      key={look.id}
                      id={`lookbook-card-${look.id}`}
                      className="group rounded-2xl bg-[#FFFDF9] border border-[#E2D5C3] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Header */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE0D0]">
                        {look.image && look.image.startsWith('data:image') ? (
                          <img
                            src={look.image}
                            alt={look.title}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <RealisticOutfitVisualizer
                            gender={look.gender || 'female'}
                            skinTone={look.skinTone || 'neutral'}
                            outfitId={look.outfit}
                            colorId={look.color}
                            occasionId={look.occasion}
                            styleId={look.style}
                            accessories={look.accessories}
                            photoStyle={look.aiStyle || 'editorial-studio'}
                            lookTitle={look.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#1C1917] text-xs font-semibold px-2 py-0.5 rounded-full shadow-xs">
                            <CharacterDefaultAvatar
                              gender={look.gender || 'female'}
                              skinTone={look.skinTone || 'neutral'}
                              outfitColor={look.colorHex}
                              size="xs"
                            />
                            <span>{look.outfitName}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {look.isAiGenerated && (
                              <div className="flex items-center gap-1 bg-[#991B1E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                                <Sparkles className="w-3 h-3 text-[#F5D587]" />
                                <span>Ảnh AI Thực Tế</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full">
                              <Calendar className="w-3 h-3 text-[#C8973E]" />
                              <span>{look.createdAt}</span>
                            </div>
                          </div>
                        </div>

                        {/* Hover Quick Action: AI Generator */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <button
                            type="button"
                            onClick={() => setActiveAIModalLook(look)}
                            className="pointer-events-auto px-4 py-2 rounded-full bg-[#1C1917]/80 hover:bg-[#991B1E] text-white text-xs font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
                          >
                            <Wand2 className="w-3.5 h-3.5 text-[#F5D587]" />
                            <span>{look.isAiGenerated ? 'Tạo Lại Ảnh AI' : 'Tạo Ảnh Minh Họa AI'}</span>
                          </button>
                        </div>

                        {/* Bottom Image title */}
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <div className="text-[10px] uppercase font-bold tracking-widest text-[#E5D2BA]">
                            {look.occasionName} × {look.styleName}
                          </div>
                          <h3 className="font-serif text-xl font-bold">
                            {look.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-3 text-xs">
                          {/* Style & Details */}
                          <div className="flex items-center justify-between">
                            <span className="text-[#7A6B5F]">Phong cách:</span>
                            <span className="font-semibold text-[#1C1917]">
                              {look.styleName}
                            </span>
                          </div>

                          <div className="pt-0.5">
                            <span className="text-[#7A6B5F] block mb-1">Phụ kiện kết hợp:</span>
                            <div className="flex flex-wrap gap-1">
                              {look.accessories.length > 0 ? (
                                look.accessories.map((acc, i) => (
                                  <span
                                    key={i}
                                    className="bg-[#F2ECE0] text-[#4A3B32] text-[10px] px-2 py-0.5 rounded font-medium"
                                  >
                                    {acc}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[#8C7B6E] text-[11px] italic">
                                  Tối giản không phụ kiện
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Color Distribution Chart (60-30-10 & Five Elements) */}
                          <div className="pt-2.5 border-t border-[#EFE5D6]">
                            <OutfitColorDistributionChart
                              look={look}
                              onStartRemix={onStartRemix}
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-[#EFE5D6] flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() => setActiveAIModalLook(look)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#991B1E]/10 hover:bg-[#991B1E] text-[#991B1E] hover:text-white text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer"
                              title="Tạo hình ảnh minh họa phối đồ thực tế bằng AI"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
                              <span>{look.isAiGenerated ? 'Đổi Ảnh AI' : 'Tạo Ảnh AI'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setInspectCultureLook(look)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white hover:bg-[#F2ECE0] border border-[#DECBB4] text-[#4A3B32] text-xs font-medium transition-all shadow-2xs active:scale-95 cursor-pointer"
                              title="Xem chi tiết các lưu ý văn hóa và chuẩn mực cho bộ đồ này"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-[#991B1E]" />
                              <span className="hidden sm:inline">Lưu ý văn hóa</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleShare(look)}
                              className="p-2 rounded-full text-[#594C42] hover:text-[#1C1917] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
                              title="Chia sẻ outfit"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onRemoveLook(look.id)}
                              className="p-2 rounded-full text-[#8C4E34] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Xóa khỏi Lookbook"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Outfit Illustration Studio Modal */}
      {activeAIModalLook && (
        <AIOutfitIllustrationModal
          look={activeAIModalLook}
          isOpen={true}
          onClose={() => setActiveAIModalLook(null)}
          onSaveToLookbook={handleSaveAIImage}
        />
      )}

      {/* Cultural Insight & Propriety Popover Modal */}
      {inspectCultureLook && (
        <CulturalInsightPopover
          isOpen={true}
          onClose={() => setInspectCultureLook(null)}
          lookState={{
            gender: inspectCultureLook.gender || 'female',
            skinTone: inspectCultureLook.skinTone || 'neutral',
            outfit: inspectCultureLook.outfit,
            occasion: inspectCultureLook.occasion,
            style: inspectCultureLook.style,
            color: inspectCultureLook.color,
            accessories: inspectCultureLook.accessories
          }}
          initialTab="outfit"
        />
      )}

      {/* Social Share Postcard Modal */}
      {shareCardLook && (
        <SocialShareCardModal
          isOpen={true}
          onClose={() => setShareCardLook(null)}
          currentLook={{
            gender: shareCardLook.gender || 'female',
            skinTone: shareCardLook.skinTone || 'neutral',
            outfit: shareCardLook.outfit,
            occasion: shareCardLook.occasion,
            style: shareCardLook.style,
            color: shareCardLook.color,
            accessories: shareCardLook.accessories
          }}
          lookTitle={shareCardLook.title}
          lookSubtitle={shareCardLook.subtitle}
          outfitName={shareCardLook.outfitName}
          occasionName={shareCardLook.occasionName}
          styleName={shareCardLook.styleName}
          colorName={shareCardLook.colorName}
          colorHex={shareCardLook.colorHex}
          accessoriesNames={shareCardLook.accessories.join(' + ') || 'Không phối phụ kiện'}
          culturalNote={shareCardLook.cultureCheck?.culturalNote}
          outfitImage={
            shareCardLook.image ||
            (OUTFITS_DATA.find((o) => o.id === shareCardLook.outfit)?.image || '')
          }
        />
      )}
    </div>
  );
};
