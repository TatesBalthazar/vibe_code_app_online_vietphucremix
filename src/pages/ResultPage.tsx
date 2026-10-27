import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Share2,
  RotateCcw,
  Check,
  ArrowLeft,
  Copy
} from 'lucide-react';
import { OutfitLookState, SavedLook, CultureCheckData } from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import { OCCASIONS_DATA } from '../data/occasions';
import { STYLES_DATA } from '../data/styles';
import { COLORS_DATA, SKIN_TONES_DATA } from '../data/colors';
import { ACCESSORIES_DATA } from '../data/accessories';
import { evaluateCultureCheck } from '../data/cultureNotes';
import { CultureCheckCard } from '../components/CultureCheckCard';
import { SmartSuggestions } from '../components/SmartSuggestions';
import { OutfitPreview } from '../components/OutfitPreview';
import { CharacterDefaultAvatar } from '../components/CharacterDefaultAvatar';
import { triggerCelebrationConfetti } from '../utils/confetti';
import { AiStylingFloatingDock } from '../components/AiStylingFloatingDock';
import { SocialShareCardModal } from '../components/SocialShareCardModal';

interface ResultPageProps {
  currentLook: OutfitLookState;
  onRemixAgain: () => void;
  onSaveLook: (look: SavedLook) => void;
  onNavigateToLookbook: () => void;
  isAlreadySaved: boolean;
  onChangeLook?: (newLook: OutfitLookState) => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  currentLook,
  onRemixAgain,
  onSaveLook,
  onNavigateToLookbook,
  isAlreadySaved,
  onChangeLook
}) => {
  const [copiedToast, setCopiedToast] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(isAlreadySaved);

  // Preserve the initial look that entered the page
  const originalLookRef = React.useRef<OutfitLookState>({ ...currentLook });
  const [isModifiedFromOriginal, setIsModifiedFromOriginal] = useState(false);

  const handleApplySuggestionLook = (newLook: OutfitLookState) => {
    if (onChangeLook) {
      onChangeLook(newLook);
      setIsModifiedFromOriginal(true);
      setSavedSuccess(false);
    }
  };

  const handleRestoreOriginal = () => {
    if (onChangeLook && originalLookRef.current) {
      onChangeLook(originalLookRef.current);
      setIsModifiedFromOriginal(false);
      setSavedSuccess(isAlreadySaved);
    }
  };

  const outfit = OUTFITS_DATA.find((o) => o.id === currentLook.outfit) || OUTFITS_DATA[0];
  const occasion = OCCASIONS_DATA.find((o) => o.id === currentLook.occasion) || OCCASIONS_DATA[0];
  const style = STYLES_DATA.find((s) => s.id === currentLook.style) || STYLES_DATA[0];
  const color = COLORS_DATA.find((c) => c.id === currentLook.color) || COLORS_DATA[0];

  const selectedAccessories = ACCESSORIES_DATA.filter((a) =>
    currentLook.accessories.includes(a.id)
  );

  const accessoriesNames =
    selectedAccessories.length > 0
      ? selectedAccessories.map((a) => a.name).join(' + ')
      : 'Không phối phụ kiện';

  // Evaluate Culture Check
  const cultureCheck: CultureCheckData = evaluateCultureCheck({
    outfitId: (currentLook.outfit || 'ao-dai') as any,
    occasionId: (currentLook.occasion || 'festival') as any,
    styleId: (currentLook.style || 'modern') as any,
    colorId: (currentLook.color || 'burgundy') as any,
    accessoryIds: currentLook.accessories
  });

  const lookTitle = `${style.name.toUpperCase()} ${outfit.name.toUpperCase()}`;
  const lookSubtitle = `${occasion.name} × ${style.name}`;

  const skinToneObj = SKIN_TONES_DATA.find((s) => s.id === currentLook.skinTone) || SKIN_TONES_DATA[1];

  const handleSave = (e?: React.MouseEvent<HTMLButtonElement>) => {
    let originX = 0.5;
    let originY = 0.6;
    if (e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      originX = (rect.left + rect.width / 2) / window.innerWidth;
      originY = (rect.top + rect.height / 2) / window.innerHeight;
    }

    const newSavedLook: SavedLook = {
      id: `look-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      gender: currentLook.gender || 'female',
      skinTone: currentLook.skinTone || 'neutral',
      title: lookTitle,
      subtitle: lookSubtitle,
      occasion: (currentLook.occasion || 'festival') as any,
      occasionName: occasion.name,
      outfit: (currentLook.outfit || 'ao-dai') as any,
      outfitName: outfit.name,
      style: (currentLook.style || 'modern') as any,
      styleName: style.name,
      color: (currentLook.color || 'burgundy') as any,
      colorName: color.name,
      colorHex: color.hex,
      accessories: selectedAccessories.map((a) => a.name),
      cultureCheck,
      image: ''
    };

    onSaveLook(newSavedLook);
    setSavedSuccess(true);
    triggerCelebrationConfetti({ originX, originY });
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-52 sm:pb-60 space-y-12">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Đã sao chép link outfit vào bộ nhớ tạm!</span>
        </div>
      )}

      {/* Header Back & Title */}
      <div className="space-y-4">
        <button
          onClick={onRemixAgain}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A6B5F] hover:text-[#991B1E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Remix Studio</span>
        </button>

        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#991B1E]">
            Styling Complete
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">
            YOUR VIỆT LOOK
          </h1>
          <p className="text-sm sm:text-base text-[#615247]">
            You created something uniquely yours. Bản phối mang dấu ấn cá nhân của riêng bạn.
          </p>
        </div>
      </div>

      {/* Hero Showcase of the Outfit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E2D5C3] shadow-sm">
        {/* Left: Preview Render */}
        <div className="lg:col-span-6 w-full">
          <OutfitPreview lookState={currentLook} showDetails={false} />
        </div>

        {/* Right: Outfit Spec Sheet & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2 border-b border-[#EFE5D6] pb-6">
            <span className="inline-block bg-[#991B1E] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {lookSubtitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
              {lookTitle}
            </h2>
            <p className="text-xs text-[#7A6B5F] italic">
              "{outfit.subtitle}"
            </p>
          </div>

          {/* Details Table */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-[#F2ECE0]">
              <span className="text-[#7A6B5F]">Người mẫu & Tông da:</span>
              <span className="font-serif font-bold text-[#1C1917] flex items-center gap-2">
                <CharacterDefaultAvatar
                  gender={currentLook.gender || 'female'}
                  skinTone={currentLook.skinTone || 'neutral'}
                  size="xs"
                />
                <span>{currentLook.gender === 'male' ? 'Nam' : 'Nữ'}</span>
                <span className="text-[#C8973E]">✦</span>
                <span
                  className="w-3.5 h-3.5 rounded-full inline-block border border-black/15 shadow-2xs"
                  style={{ backgroundColor: skinToneObj.sampleHex }}
                />
                <span>{skinToneObj.nameVi.split(' / ')[0]}</span>
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F2ECE0]">
              <span className="text-[#7A6B5F]">Occasion (Dịp):</span>
              <span className="font-serif font-bold text-[#1C1917]">
                {occasion.name} ({occasion.nameVi.split('&')[0]})
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F2ECE0]">
              <span className="text-[#7A6B5F]">Việt phục:</span>
              <span className="font-serif font-bold text-[#1C1917]">
                {outfit.name}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F2ECE0]">
              <span className="text-[#7A6B5F]">Style (Phong cách):</span>
              <span className="font-serif font-bold text-[#1C1917]">
                {style.name} ({style.nameVi})
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F2ECE0]">
              <span className="text-[#7A6B5F]">Color (Màu sắc):</span>
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-serif font-bold text-[#1C1917]">
                  {color.name} ({color.nameVi.split('/')[0]})
                </span>
              </div>
            </div>

            <div className="flex flex-col py-2 border-b border-[#F2ECE0] gap-1">
              <span className="text-[#7A6B5F]">Accessories (Phụ kiện):</span>
              <span className="font-medium text-[#2E251E] text-xs leading-relaxed">
                {accessoriesNames}
              </span>
            </div>
          </div>

          {/* Action Buttons: SAVE LOOK, SHARE, REMIX AGAIN */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              id="save-look-btn"
              type="button"
              onClick={handleSave}
              className={`flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all shadow-sm active:scale-95 cursor-pointer ${
                savedSuccess
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800 ring-2 ring-emerald-400/60 shadow-md'
                  : 'bg-[#991B1E] hover:bg-[#781316] text-white hover:scale-102 hover:shadow-md'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${savedSuccess ? 'fill-white text-white animate-accessory-pop' : ''}`}
              />
              <span>{savedSuccess ? '✓ ĐÃ LƯU TRANG PHỤC' : '♡ LƯU TRANG PHỤC (SAVE LOOK)'}</span>
            </button>

            <button
              id="share-look-btn"
              type="button"
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-medium text-sm bg-[#FAF7F2] hover:bg-[#F0E8DC] text-[#3D3228] border border-[#D8C7B5] hover:border-[#991B1E] transition-colors active:scale-95 cursor-pointer shadow-xs group"
              title="Tạo thiệp kỹ thuật số và xuất ảnh chia sẻ mạng xã hội"
            >
              <Share2 className="w-4 h-4 text-[#991B1E] group-hover:scale-110 transition-transform" />
              <span>↗ XUẤT THIỆP SOCIAL SHARE</span>
            </button>

            <button
              id="remix-again-btn"
              type="button"
              onClick={onRemixAgain}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-medium text-sm text-[#7A6B5F] hover:text-[#1C1917] hover:bg-[#F2ECE0] transition-colors active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>↻ REMIX AGAIN</span>
            </button>
          </div>

          {/* Shortcut to Lookbook */}
          {savedSuccess && (
            <div className="pt-2 flex items-center justify-between text-xs text-[#166534] bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl shadow-2xs animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>🎉 Đã lưu thành công vào bộ sưu tập cá nhân!</span>
              </span>
              <button
                onClick={onNavigateToLookbook}
                className="underline hover:text-emerald-900 font-bold cursor-pointer transition-colors"
              >
                Xem Tủ Đồ (Lookbook) →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 12: CULTURE CHECK */}
      <CultureCheckCard data={cultureCheck} />

      {/* SECTION 13: SMART SUGGESTIONS */}
      <SmartSuggestions whyThisWorks={cultureCheck.whyThisWorks} />

      {/* Cultural Heritage Social Share Card Modal */}
      <SocialShareCardModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        currentLook={currentLook}
        lookTitle={lookTitle}
        lookSubtitle={lookSubtitle}
        outfitName={outfit.name}
        occasionName={occasion.name}
        styleName={style.name}
        colorName={color.name}
        colorHex={color.hex}
        accessoriesNames={accessoriesNames}
        culturalNote={cultureCheck.culturalNote}
        outfitImage={outfit.image}
      />

      {/* Floating Bottom Panel: AI Styling Suggestions */}
      {onChangeLook && (
        <AiStylingFloatingDock
          currentLook={currentLook}
          onApplyLook={handleApplySuggestionLook}
          originalLook={originalLookRef.current}
          onRestoreOriginal={handleRestoreOriginal}
          isModifiedFromOriginal={isModifiedFromOriginal}
        />
      )}
    </div>
  );
};
