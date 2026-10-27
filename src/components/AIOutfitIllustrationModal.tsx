import React, { useState, useRef } from 'react';
import {
  X,
  Sparkles,
  Camera,
  Download,
  Copy,
  Check,
  Wand2,
  RefreshCw,
  Sliders,
  Eye,
  Info
} from 'lucide-react';
import { SavedLook } from '../types';
import {
  RealisticOutfitVisualizer,
  AIPhotoStyle,
  generateAIFashionPrompt
} from './RealisticOutfitVisualizer';

interface AIOutfitIllustrationModalProps {
  look: SavedLook;
  isOpen: boolean;
  onClose: () => void;
  onSaveToLookbook: (lookId: string, newImageDataUrl: string, aiStyle: AIPhotoStyle, prompt: string) => void;
}

export const AIOutfitIllustrationModal: React.FC<AIOutfitIllustrationModalProps> = ({
  look,
  isOpen,
  onClose,
  onSaveToLookbook
}) => {
  const [selectedStyle, setSelectedStyle] = useState<AIPhotoStyle>(look.aiStyle || 'editorial-studio');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const currentPrompt = generateAIFashionPrompt({
    gender: look.gender || 'female',
    skinTone: look.skinTone || 'neutral',
    outfitId: look.outfit,
    colorId: look.color,
    occasionId: look.occasion,
    styleId: look.style,
    accessories: look.accessories,
    photoStyle: selectedStyle
  });

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenStep(1);
    setSaveSuccess(false);

    // Realistic multi-step AI synthesis progression
    setTimeout(() => setGenStep(2), 700);
    setTimeout(() => setGenStep(3), 1400);
    setTimeout(() => {
      setGenStep(4);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2100);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png', 0.95);
      onSaveToLookbook(look.id, dataUrl, selectedStyle, currentPrompt);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1200);
    } catch (e) {
      console.error('Error saving generated canvas', e);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `viet_phuc_ai_${look.outfit}_${selectedStyle}.png`;
      a.click();
    } catch (e) {
      console.error('Error downloading canvas', e);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const STYLES_LIST: { id: AIPhotoStyle; title: string; desc: string; icon: string }[] = [
    {
      id: 'editorial-studio',
      title: 'Studio Chuyên Nghiệp',
      desc: 'Ánh sáng studio mềm, tôn vinh chất liệu lụa mộc & phom dáng',
      icon: '📸'
    },
    {
      id: 'cinematic-heritage',
      title: 'Điện Ảnh Di Sản',
      desc: 'Phối cảnh Hoàng thành/Hội An với ánh nắng chiều vàng ấm áp',
      icon: '🏮'
    },
    {
      id: 'magazine-cover',
      title: 'Bìa Tạp Chí Lookbook',
      desc: 'Bố cục tạp chí thời trang cao cấp với typography VIỆT COUTURE',
      icon: '📰'
    },
    {
      id: 'couture-sketch',
      title: 'Bản Vẽ Thiết Kế Couture',
      desc: 'Phong cách phác thảo màu nước nghệ thuật trên giấy xuyến chỉ',
      icon: '🎨'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#FAF6EE] rounded-3xl border border-[#D5C6B3] shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2D5C3] bg-white/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#991B1E]">
                IMAGE GENERATION STUDIO
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                Tạo Hình Ảnh Minh Họa Trang Phục AI
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#7A6B5F] hover:text-[#1C1917] hover:bg-[#EFE4D4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split View (Canvas on Left, Controls on Right) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Visualizer Canvas Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[#D5C6B3] bg-[#ECE0D0]">
              <RealisticOutfitVisualizer
                gender={look.gender || 'female'}
                skinTone={look.skinTone || 'neutral'}
                outfitId={look.outfit}
                colorId={look.color}
                occasionId={look.occasion}
                styleId={look.style}
                accessories={look.accessories}
                photoStyle={selectedStyle}
                lookTitle={look.title}
                onCanvasReady={(c) => (canvasRef.current = c)}
              />

              {/* Generating Overlay Animation */}
              {isGenerating && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-3 animate-in fade-in duration-300">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-[#C8973E] animate-spin" />
                    <Sparkles className="w-6 h-6 text-[#F5D587] absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F5D587]">
                      Đang xử lý hình ảnh AI...
                    </p>
                    <p className="text-xs text-stone-200">
                      {genStep === 1 && 'Phân tích phom dáng áo & tỷ lệ người mẫu...'}
                      {genStep === 2 && 'Mô phỏng vân lụa tơ tằm & ánh sáng studio...'}
                      {genStep === 3 && 'Tinh chỉnh trang sức, nón & nét mặt chân thực...'}
                      {genStep === 4 && 'Đang hoàn tất bức ảnh minh họa thời trang!'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick status below canvas */}
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#7A6B5F]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
              <span>Độ phân giải: 800 × 1000 px • Phong cách: {STYLES_LIST.find((s) => s.id === selectedStyle)?.title}</span>
            </div>
          </div>

          {/* Right Column: Controls, Style Selector & Prompt Inspector (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Look Summary Chip */}
              <div className="p-3.5 rounded-2xl bg-white/80 border border-[#E2D5C3] shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E]">
                    Bản Phối Hiện Tại
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#1C1917]">
                    {look.title} • {look.outfitName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#7A6B5F] mt-0.5">
                    <span>Màu: <strong className="text-[#1C1917]">{look.colorName}</strong></span>
                    <span>·</span>
                    <span>Người mẫu: <strong className="text-[#1C1917]">{look.gender === 'male' ? 'Nam' : 'Nữ'}</strong></span>
                  </div>
                </div>
                <div
                  className="w-7 h-7 rounded-full border border-black/10 shadow-xs shrink-0"
                  style={{ backgroundColor: look.colorHex }}
                />
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">
                  1. Chọn Phong Cách Chụp Ảnh Minh Họa AI:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STYLES_LIST.map((sty) => (
                    <button
                      key={sty.id}
                      type="button"
                      onClick={() => {
                        setSelectedStyle(sty.id);
                        setHasGenerated(true);
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-2.5 ${
                        selectedStyle === sty.id
                          ? 'bg-white border-[#991B1E] shadow-sm ring-1 ring-[#991B1E]/30'
                          : 'bg-white/50 border-[#E2D5C3] hover:bg-white hover:border-[#D5C6B3]'
                      }`}
                    >
                      <span className="text-xl shrink-0">{sty.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
                          <span>{sty.title}</span>
                          {selectedStyle === sty.id && (
                            <Check className="w-3.5 h-3.5 text-[#991B1E]" />
                          )}
                        </div>
                        <div className="text-[10px] text-[#7A6B5F] line-clamp-2 mt-0.5">
                          {sty.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action: Trigger Generation */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleStartGeneration}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#991B1E] via-[#B91C1C] to-[#C8973E] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>
                    {isGenerating ? 'Đang Tạo Ảnh Minh Họa Thực Tế...' : 'Tạo Lại Hình Ảnh Minh Họa Thực Tế'}
                  </span>
                </button>
              </div>

              {/* Prompt Inspector Toggle */}
              <div className="rounded-2xl border border-[#E2D5C3] bg-white/60 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowPrompt(!showPrompt)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#7A6B5F] hover:text-[#1C1917]"
                  >
                    <Info className="w-3.5 h-3.5 text-[#991B1E]" />
                    <span>Xem Prompt AI Image Generation</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1 text-[11px] text-[#991B1E] font-medium hover:underline cursor-pointer"
                  >
                    {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPrompt ? 'Đã sao chép' : 'Sao chép prompt'}</span>
                  </button>
                </div>

                {showPrompt && (
                  <p className="text-[11px] text-[#55473E] bg-[#F7F2E9] p-2.5 rounded-xl font-mono leading-relaxed max-h-28 overflow-y-auto">
                    {currentPrompt}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-[#E2D5C3] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2.5 rounded-xl border border-[#D5C6B3] bg-white text-[#55473E] hover:text-[#1C1917] hover:bg-[#F2ECE0] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                title="Tải ảnh minh họa PNG chất lượng cao"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Tải Về Máy</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#7A6B5F] hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Đóng
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saveSuccess}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
                    saveSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#991B1E] hover:bg-[#781316] text-white active:scale-95'
                  }`}
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã Lưu Vào Lookbook!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Lưu Ảnh Vào Bộ Đồ Này</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
