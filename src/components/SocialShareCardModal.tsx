import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Sparkles,
  Palette,
  Image as ImageIcon,
  MessageSquareQuote,
  Feather,
  RefreshCw,
  QrCode,
  Heart
} from 'lucide-react';
import { toPng, toBlob } from 'html-to-image';
import { OutfitLookState } from '../types';

export const CULTURAL_CARD_QUOTES = [
  {
    id: 'heritage-pride',
    title: 'Hồn Cốt Tiền Nhân',
    quote: 'Mặc Việt theo cách của bạn: Gìn giữ hồn cốt tiền nhân trong từng nhịp thở đương đại.',
    author: 'Tự hào Di sản Việt'
  },
  {
    id: 'thousand-years',
    title: 'Văn Hiến Ngàn Năm',
    quote: 'Văn hiến ngàn năm kết đọng trong nếp áo; nét đẹp cổ truyền bừng nở rực rỡ giữa phố thị hôm nay.',
    author: 'Cốt cách ngàn năm'
  },
  {
    id: 'living-heritage',
    title: 'Di Sản Sống',
    quote: 'Di sản không nằm lại trong tủ kính bảo tàng, mà sống động trên từng bước chân người trẻ.',
    author: 'Thế hệ tiếp nối'
  },
  {
    id: 'harmony-earth',
    title: 'Hòa Sắc Tự Nhiên',
    quote: 'Hòa sắc đất trời, gửi gắm tấm lòng trân quý tinh hoa dân tộc vào từng sợi tơ tà áo.',
    author: 'Văn hóa mặc Việt'
  },
  {
    id: 'timeless-grace',
    title: 'Thanh Cao Tự Tại',
    quote: 'Tà áo bay qua thăng trầm thời gian, vẹn nguyên phong thái đĩnh đạc và đoan trang của người Việt.',
    author: 'Cổ phong đương đại'
  }
];

export type CardThemeId = 'royal' | 'parchment' | 'indochine' | 'lotus';
export type CardAspectFormat = 'postcard' | 'square' | 'story';

interface SocialShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLook: OutfitLookState;
  lookTitle: string;
  lookSubtitle: string;
  outfitName: string;
  occasionName: string;
  styleName: string;
  colorName: string;
  colorHex: string;
  accessoriesNames: string;
  culturalNote?: string;
  outfitImage: string;
}

export const SocialShareCardModal: React.FC<SocialShareCardModalProps> = ({
  isOpen,
  onClose,
  currentLook,
  lookTitle,
  lookSubtitle,
  outfitName,
  occasionName,
  styleName,
  colorName,
  colorHex,
  accessoriesNames,
  culturalNote,
  outfitImage
}) => {
  const [selectedTheme, setSelectedTheme] = useState<CardThemeId>('royal');
  const [selectedFormat, setSelectedFormat] = useState<CardAspectFormat>('postcard');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('heritage-pride');
  const [customQuote, setCustomQuote] = useState<string>('');
  const [isCustomQuoteActive, setIsCustomQuoteActive] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState<string>('Gen Z Yêu Cổ Phục');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentQuoteObj =
    CULTURAL_CARD_QUOTES.find((q) => q.id === selectedQuoteId) || CULTURAL_CARD_QUOTES[0];

  const activeMessage = isCustomQuoteActive && customQuote.trim()
    ? customQuote.trim()
    : currentQuoteObj.quote;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Theme styling definitions
  const themeStyles: Record<
    CardThemeId,
    {
      name: string;
      wrapperBg: string;
      cardBorder: string;
      innerBorder: string;
      textColor: string;
      headingColor: string;
      accentBg: string;
      accentText: string;
      quoteBg: string;
      sealColor: string;
      watermarkColor: string;
    }
  > = {
    royal: {
      name: 'Hoàng Cung (Royal Red & Gold)',
      wrapperBg: 'bg-gradient-to-br from-[#781316] via-[#5C0F12] to-[#3B0709] text-[#FAF4EA]',
      cardBorder: 'border-[#C8973E]/70',
      innerBorder: 'border-[#C8973E]/40',
      textColor: 'text-[#EFE5D6]',
      headingColor: 'text-[#F5D587]',
      accentBg: 'bg-[#C8973E]',
      accentText: 'text-[#3B0709]',
      quoteBg: 'bg-black/35 border-[#C8973E]/30',
      sealColor: 'border-[#C8973E] text-[#F5D587]',
      watermarkColor: 'text-[#C8973E]/70'
    },
    parchment: {
      name: 'Giấy Dó (Dó Parchment)',
      wrapperBg: 'bg-[#FAF6EE] text-[#1C1917]',
      cardBorder: 'border-[#DEC8B0]',
      innerBorder: 'border-[#EADBC8]',
      textColor: 'text-[#5A4B40]',
      headingColor: 'text-[#991B1E]',
      accentBg: 'bg-[#991B1E]',
      accentText: 'text-white',
      quoteBg: 'bg-[#F2ECE0] border-[#DEC8B0]',
      sealColor: 'border-[#991B1E] text-[#991B1E]',
      watermarkColor: 'text-[#8A631E]'
    },
    indochine: {
      name: 'Lam Cổ (Indochine Indigo)',
      wrapperBg: 'bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-[#FAF7F2]',
      cardBorder: 'border-[#94A3B8]/40',
      innerBorder: 'border-[#94A3B8]/20',
      textColor: 'text-[#CBD5E1]',
      headingColor: 'text-[#F1F5F9]',
      accentBg: 'bg-[#C8973E]',
      accentText: 'text-[#0F172A]',
      quoteBg: 'bg-white/10 border-white/15',
      sealColor: 'border-[#C8973E] text-[#F5D587]',
      watermarkColor: 'text-[#94A3B8]'
    },
    lotus: {
      name: 'Sen Hồng (Lotus Blossom)',
      wrapperBg: 'bg-gradient-to-br from-[#FFF5F6] via-[#FDF0F2] to-[#FCE8EB] text-[#2D2426]',
      cardBorder: 'border-[#E8C2C8]',
      innerBorder: 'border-[#F0D5DA]',
      textColor: 'text-[#5C4549]',
      headingColor: 'text-[#991B1E]',
      accentBg: 'bg-[#991B1E]',
      accentText: 'text-white',
      quoteBg: 'bg-white/80 border-[#E8C2C8]',
      sealColor: 'border-[#991B1E] text-[#991B1E]',
      watermarkColor: 'text-[#991B1E]'
    }
  };

  const currentTheme = themeStyles[selectedTheme];

  // Aspect ratio classes for responsive display
  const formatClasses = {
    postcard: 'w-full max-w-[420px] aspect-[4/5]',
    square: 'w-full max-w-[420px] aspect-square',
    story: 'w-full max-w-[360px] aspect-[9/16]'
  };

  // Export card as PNG using html-to-image
  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      // Small pause to allow all styles and images to settle
      await new Promise((r) => setTimeout(r, 100));

      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 2.5, // Crisp 2.5x resolution for print/social
        cacheBust: true,
        style: {
          transform: 'none',
          boxShadow: 'none'
        }
      });

      const filename = `viet-phuc-remix-${selectedFormat}-${Date.now()}.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      showToast('🎉 Đã xuất thành công tấm thiệp kỹ thuật số!');
    } catch (err) {
      console.error('Lỗi khi xuất hình ảnh thiệp:', err);
      showToast('⚠️ Không thể xuất trực tiếp, vui lòng thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  // Direct Web Share API (Mobile native share sheet)
  const handleShareCard = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const blob = await toBlob(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2
      });

      if (blob && navigator.share && navigator.canShare) {
        const file = new File(
          [blob],
          `viet-phuc-remix-${selectedFormat}.png`,
          { type: 'image/png' }
        );

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Việt Phục Remix: ${lookTitle}`,
            text: `${activeMessage}\n\n#VietPhucRemix #MacVietTheoCachCuaBan`,
            files: [file]
          });
          showToast('✓ Đã mở trình chia sẻ trên thiết bị!');
          return;
        }
      }

      // Fallback: Copy link and quote text
      const shareText = `[VIỆT PHỤC REMIX - ${lookTitle}]\n\n"${activeMessage}"\n\n— ${authorName}\nKhám phá tại: ${window.location.href}`;
      await navigator.clipboard.writeText(shareText);
      showToast('✓ Đã sao chép thông điệp và link vào bộ nhớ tạm!');
    } catch (err) {
      console.warn('Share API error or cancelled:', err);
      showToast('Đã sao chép nội dung thiệp vào clipboard!');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCaption = () => {
    const caption = `[VIỆT PHỤC REMIX: ${lookTitle}]\n\n"${activeMessage}"\n\n👘 Trang phục: ${outfitName}\n🎨 Màu sắc: ${colorName}\n✨ Phong cách: ${styleName}\n🌟 Dịp: ${occasionName}\n\n#VietPhucRemix #GenZMacViet #DiSanDuongDai`;
    navigator.clipboard.writeText(caption);
    showToast('✓ Đã sao chép bài đăng mạng xã hội (Caption)!');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tấm thiệp kỹ thuật số Social Share"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 bg-[#1C1917]/95 text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#C8973E]/50 flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top-3">
          <Sparkles className="w-4 h-4 text-[#F5D587]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Dialog Modal Window */}
      <div
        className="bg-[#FFFDF9] rounded-3xl max-w-5xl w-full border border-[#DECDB8] shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#EFE5D6] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#991B1E] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#F5D587]" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#991B1E]">
                Thẻ Chia Sẻ Mạng Xã Hội · Social Share Card
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                Tấm Thiệp Kỹ Thuật Số Di Sản
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F2ECE0] hover:bg-[#E5D7C3] text-[#615247] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng bảng chia sẻ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns (Left: Card Live Preview; Right: Customization Controls) */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Live Postcard Canvas (Target of html-to-image) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-[#F7F1E7]/70 p-4 sm:p-6 rounded-2xl border border-[#E5D7C4]">
            <div className="text-[11px] font-semibold text-[#7A6B5F] mb-3 flex items-center gap-1.5 uppercase tracking-wider">
              <span>Bản xem trước tấm thiệp</span>
              <span className="text-[#C8973E]">✦</span>
              <span className="capitalize">{selectedFormat}</span>
            </div>

            {/* THE EXPORTABLE DIGITAL CARD */}
            <div
              ref={cardRef}
              id="viet-phuc-digital-card"
              className={`relative ${formatClasses[selectedFormat]} ${currentTheme.wrapperBg} rounded-2xl p-5 sm:p-6 shadow-xl border-2 ${currentTheme.cardBorder} flex flex-col justify-between overflow-hidden select-none transition-all duration-300`}
            >
              {/* Outer Decorative Border Ring */}
              <div
                className={`absolute inset-2.5 rounded-xl border pointer-events-none ${currentTheme.innerBorder}`}
              />

              {/* Card Header: Brand & Vintage Postage Stamp */}
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8973E]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C8973E]">
                      Việt Phục Remix
                    </span>
                  </div>
                  <h4 className={`font-serif text-sm sm:text-base font-bold tracking-wide ${currentTheme.headingColor}`}>
                    {lookTitle}
                  </h4>
                  <div className={`text-[10px] ${currentTheme.textColor} opacity-90`}>
                    {lookSubtitle}
                  </div>
                </div>

                {/* Traditional Vietnamese Postage Stamp Visual */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="relative w-12 h-14 bg-[#FFFDF9] border border-dashed border-[#C8973E] rounded p-1 flex flex-col items-center justify-between shadow-xs">
                    <span className="text-[7px] font-bold uppercase tracking-tighter text-[#991B1E]">
                      VIỆT NAM
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#991B1E]/10 flex items-center justify-center text-[10px]">
                      👑
                    </div>
                    <span className="text-[6px] font-mono text-[#8C7A6B]">
                      {new Date().getFullYear()} · 10K
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Center: Outfit Image & Visual Spec */}
              <div className="relative z-10 my-3 flex items-center gap-3">
                {/* Image Showcase */}
                <div className="w-24 sm:w-28 aspect-[3/4] rounded-lg overflow-hidden border border-white/40 shadow-md shrink-0 relative bg-black/20">
                  <img
                    src={outfitImage}
                    alt={outfitName}
                    className="w-full h-full object-cover object-center"
                    crossOrigin="anonymous"
                  />
                  {/* Color tint matching outfit */}
                  <div
                    className="absolute inset-0 mix-blend-color opacity-25"
                    style={{ backgroundColor: colorHex }}
                  />
                </div>

                {/* Outfit Highlights Metadata */}
                <div className="flex-1 space-y-1 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-75">Trang phục:</span>
                    <strong className="font-semibold">{outfitName}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-75">Sắc lụa:</span>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-white/60 shadow-2xs"
                        style={{ backgroundColor: colorHex }}
                      />
                      <span>{colorName.split('/')[0]}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-75">Phong cách:</span>
                    <span>{styleName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-75">Dịp mặc:</span>
                    <span>{occasionName}</span>
                  </div>
                  <div className="pt-1 text-[9px] opacity-80 line-clamp-2 italic">
                    Phụ kiện: {accessoriesNames}
                  </div>
                </div>
              </div>

              {/* Cultural Quote Container */}
              <div className={`relative z-10 p-3 rounded-xl border ${currentTheme.quoteBg} space-y-1.5`}>
                <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#C8973E] font-bold">
                  <MessageSquareQuote className="w-3 h-3" />
                  <span>Thông Điệp Văn Hóa</span>
                </div>
                <p className={`font-serif text-xs sm:text-sm italic leading-relaxed ${currentTheme.textColor}`}>
                  "{activeMessage}"
                </p>
                <div className="flex items-center justify-between text-[9px] opacity-80 pt-1">
                  <span>— {authorName}</span>
                  <span className="text-[#C8973E]">✦ Di Sản Trong Tim ✦</span>
                </div>
              </div>

              {/* Card Footer: Traditional Seal & Authenticity Mark */}
              <div className="relative z-10 pt-2.5 mt-2 flex items-center justify-between border-t border-current/15 text-[9px]">
                <div className="flex items-center gap-2">
                  {/* Traditional Red Seal Stamp */}
                  <div className={`w-8 h-8 rounded-full border-2 ${currentTheme.sealColor} flex flex-col items-center justify-center font-serif text-[7px] font-bold leading-none`}>
                    <span>VIỆT</span>
                    <span>PHỤC</span>
                  </div>
                  <div>
                    <div className="font-bold tracking-wider">#VietPhucRemix</div>
                    <div className="opacity-70 text-[8px]">
                      {new Date().toLocaleDateString('vi-VN')} · Văn Hiến Việt
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[8px] opacity-75">CERTIFIED LOOK</div>
                  <div className="font-semibold text-[8px] text-[#C8973E]">
                    Mặc Việt Theo Cách Của Bạn
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Customization Controls & Action Buttons */}
          <div className="lg:col-span-6 space-y-5">
            {/* Step 1: Format Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6B5F] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#991B1E]" />
                <span>1. Tỉ lệ khung hình (Format)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFormat('postcard')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                    selectedFormat === 'postcard'
                      ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#4A3B32] border-[#DFCBB5] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <div className="font-bold">4:5 Bưu Thiếp</div>
                  <div className="text-[10px] opacity-80">Postcard / Feed</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('square')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                    selectedFormat === 'square'
                      ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#4A3B32] border-[#DFCBB5] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <div className="font-bold">1:1 Vuông</div>
                  <div className="text-[10px] opacity-80">Avatar / Grid</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('story')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                    selectedFormat === 'story'
                      ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#4A3B32] border-[#DFCBB5] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <div className="font-bold">9:16 Dọc</div>
                  <div className="text-[10px] opacity-80">Story / TikTok</div>
                </button>
              </div>
            </div>

            {/* Step 2: Theme Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6B5F] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#991B1E]" />
                <span>2. Phong cách thẩm mỹ tấm thiệp (Theme)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(themeStyles) as CardThemeId[]).map((themeKey) => {
                  const t = themeStyles[themeKey];
                  const isSelected = selectedTheme === themeKey;
                  return (
                    <button
                      key={themeKey}
                      type="button"
                      onClick={() => setSelectedTheme(themeKey)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-[#991B1E] bg-[#991B1E]/5 ring-2 ring-[#991B1E]/30 font-semibold'
                          : 'border-[#DEC8B0] bg-[#FAF7F2] hover:bg-[#F5EFE6]'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border border-black/20 shrink-0 ${
                          themeKey === 'royal'
                            ? 'bg-[#781316]'
                            : themeKey === 'parchment'
                            ? 'bg-[#FAF6EE]'
                            : themeKey === 'indochine'
                            ? 'bg-[#1E293B]'
                            : 'bg-[#FCE8EB]'
                        }`}
                      />
                      <span className="text-xs text-[#2E251E] truncate">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Cultural Message Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6B5F] flex items-center gap-1.5">
                <MessageSquareQuote className="w-3.5 h-3.5 text-[#991B1E]" />
                <span>3. Chọn thông điệp văn hóa ý nghĩa</span>
              </label>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {CULTURAL_CARD_QUOTES.map((q) => {
                  const isSelected = !isCustomQuoteActive && selectedQuoteId === q.id;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setSelectedQuoteId(q.id);
                        setIsCustomQuoteActive(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-2xs font-medium'
                          : 'bg-[#FAF7F2] text-[#4A3E35] border-[#E2D5C3] hover:bg-[#F2ECE0]'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{q.title}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <p className="text-[11px] opacity-90 line-clamp-2 mt-0.5 italic">
                        "{q.quote}"
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Custom Quote Option */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsCustomQuoteActive(true)}
                  className={`text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isCustomQuoteActive ? 'text-[#991B1E]' : 'text-[#7A6B5F] hover:text-[#991B1E]'
                  }`}
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Hoặc tự viết lời đề tựa / lời chúc của riêng bạn</span>
                </button>
                {isCustomQuoteActive && (
                  <textarea
                    value={customQuote}
                    onChange={(e) => setCustomQuote(e.target.value)}
                    placeholder="Nhập thông điệp văn hóa hoặc lời chúc gửi đến bạn bè..."
                    rows={2}
                    className="w-full mt-2 p-2.5 rounded-xl bg-white border border-[#C8973E] text-xs text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#991B1E]/40"
                  />
                )}
              </div>
            </div>

            {/* Step 4: Sender / Author Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7A6B5F]">
                Tên người gửi / Nhà thiết kế:
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={40}
                placeholder="VD: Nguyễn Hồng Nhật / Gen Z Yêu Cổ Phục"
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DFCBB5] text-xs text-[#1C1917] focus:bg-white focus:outline-hidden focus:border-[#991B1E]"
              />
            </div>

            {/* Action Buttons: Export Image, Share, Copy Caption */}
            <div className="pt-3 border-t border-[#EFE5D6] space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={isExporting}
                  className="flex-1 min-w-[170px] py-3 px-4 rounded-xl bg-[#991B1E] hover:bg-[#781316] active:scale-98 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isExporting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang tạo ảnh chất lượng cao...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>TẢI ẢNH THIỆP (PNG HD)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShareCard}
                  disabled={isExporting}
                  className="py-3 px-4 rounded-xl bg-[#C8973E] hover:bg-[#B3832E] active:scale-98 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  title="Chia sẻ lên mạng xã hội hoặc gửi tin nhắn"
                >
                  <Share2 className="w-4 h-4" />
                  <span>CHIA SẺ NGAY</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE5D6] text-[#615247] hover:text-[#1C1917] border border-[#DEC8B0] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép Caption mạng xã hội</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 rounded-lg text-xs font-medium text-[#7A6B5F] hover:bg-[#EFE7DC] transition-colors cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
