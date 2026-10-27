import React, { useState, useRef, useEffect } from 'react';
import {
  Info,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BookOpen,
  X
} from 'lucide-react';
import { CultureProprietyNote } from '../data/cultureProprietyData';

export interface CultureOptionTooltipProps {
  note: CultureProprietyNote;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  showInfoButton?: boolean;
  className?: string;
}

export const CultureOptionTooltip: React.FC<CultureOptionTooltipProps> = ({
  note,
  children,
  position = 'auto',
  showInfoButton = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number; placeAbove: boolean }>({
    top: 0,
    left: 0,
    placeAbove: true
  });

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    if (!isPinned) {
      setIsVisible(false);
    }
  };

  const togglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPinned((prev) => {
      const next = !prev;
      setIsVisible(next);
      return next;
    });
  };

  // Recalculate smart viewport positioning
  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popoverWidth = 340;
      const popoverHeight = 380;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Decide whether to place above or below
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;
      const placeAbove = spaceAbove > popoverHeight || spaceAbove > spaceBelow;

      let left = rect.left + rect.width / 2 - popoverWidth / 2;
      // Clamp horizontally inside viewport
      if (left < 16) left = 16;
      if (left + popoverWidth > windowWidth - 16) {
        left = windowWidth - popoverWidth - 16;
      }

      let top = placeAbove
        ? rect.top - 8
        : rect.bottom + 8;

      setCoords({ top, left, placeAbove });
    }
  }, [isVisible]);

  // Click outside to close pinned tooltip
  useEffect(() => {
    if (!isPinned) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsPinned(false);
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPinned]);

  // Badge color mapping
  const badgeStyles = {
    strict: 'bg-[#991B1E] text-white border-[#7A1417]',
    ceremonial: 'bg-[#C8973E] text-white border-[#9E7328]',
    folk: 'bg-[#2E5A44] text-white border-[#1F3D2E]',
    remix: 'bg-[#5B3E8C] text-white border-[#442E69]',
    harmony: 'bg-[#D97706] text-white border-[#B45309]'
  }[note.badgeType] || 'bg-[#991B1E] text-white border-[#7A1417]';

  return (
    <div
      ref={triggerRef}
      className={`relative group/culture inline-block w-full ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {/* Target Children */}
      {children}

      {/* Floating Info Button for Mobile / Touch Accessibility */}
      {showInfoButton && (
        <button
          type="button"
          onClick={togglePin}
          className={`absolute top-1.5 right-1.5 z-20 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer ${
            isPinned || isVisible
              ? 'bg-[#991B1E] text-white scale-110 ring-2 ring-[#C8973E]'
              : 'bg-[#1C1917]/60 hover:bg-[#991B1E] text-white/90 hover:text-white backdrop-blur-xs opacity-75 hover:opacity-100 hover:scale-105'
          }`}
          title="Xem lưu ý văn hóa & tính chuẩn mực"
          aria-label={`Lưu ý văn hóa cho ${note.name}`}
        >
          <Info className="w-3 h-3" />
        </button>
      )}

      {/* Rich Culture Note Tooltip Popover (Rendered with fixed portal positioning) */}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: `${coords.left}px`,
            top: coords.placeAbove ? 'auto' : `${coords.top}px`,
            bottom: coords.placeAbove ? `${window.innerHeight - coords.top}px` : 'auto',
            zIndex: 9999
          }}
          className="w-[340px] max-w-[calc(100vw-32px)] bg-[#FFFDF9] rounded-2xl border border-[#D5C2AA] shadow-[0_16px_40px_rgba(28,25,23,0.22)] p-4 text-[#1C1917] pointer-events-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-3 select-text"
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="flex items-start justify-between gap-2 border-b border-[#E8DAC7] pb-2.5">
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs flex items-center gap-1 ${badgeStyles}`}>
                  <ShieldCheck className="w-3 h-3" />
                  <span>{note.badge}</span>
                </span>
                <span className="text-[10px] font-semibold text-[#8C7662] bg-[#EFE6D8] px-1.5 py-0.5 rounded">
                  Độ Chuẩn Mực: {note.integrityScore}%
                </span>
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1C1917] leading-snug truncate pt-1">
                {note.name}
              </h4>
              <p className="text-[11px] text-[#7A6755] italic">
                {note.eraOrSource}
              </p>
            </div>

            {/* Close / Pin indicator */}
            <button
              type="button"
              onClick={() => {
                setIsPinned(false);
                setIsVisible(false);
              }}
              className="text-[#8C7B6E] hover:text-[#1C1917] hover:bg-[#F2ECE0] p-1 rounded-full transition-colors cursor-pointer shrink-0"
              title="Đóng bảng ghi chú"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body Content - Scrollable if long */}
          <div className="max-h-[280px] overflow-y-auto pr-1 space-y-3 text-xs leading-relaxed">
            {/* 1. Ý Nghĩa Biểu Tượng & Lịch Sử */}
            <div className="bg-[#FAF6EF] p-2.5 rounded-xl border border-[#E8DAC7]/70 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#991B1E] uppercase tracking-wide">
                <BookOpen className="w-3 h-3" />
                <span>Ý Nghĩa Biểu Tượng</span>
              </div>
              <p className="text-[#4A3D33] text-[11.5px]">
                {note.symbolicMeaning}
              </p>
            </div>

            {/* 2. Chuẩn Mực Cốt Lõi */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#1C1917] uppercase tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>Chuẩn Mực Nhận Diện</span>
              </div>
              <p className="text-[#594C42] text-[11px] bg-white p-2 rounded-lg border border-[#DECBB4]/60">
                {note.coreStandard}
              </p>
            </div>

            {/* 3. Do's & Don'ts (Nên làm & Điều kiêng kỵ) */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              {/* Do's */}
              <div className="bg-[#F0FDF4] border border-[#DCFCE7] p-2 rounded-lg space-y-1">
                <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#15803D]">
                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                  <span>Quy Chuẩn Nên Mặc:</span>
                </div>
                <ul className="list-disc list-inside text-[10.5px] text-[#166534] space-y-0.5">
                  {note.dos.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div className="bg-[#FEF2F2] border border-[#FEE2E2] p-2 rounded-lg space-y-1">
                <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#B91C1C]">
                  <AlertTriangle className="w-3 h-3 text-[#DC2626]" />
                  <span>Điều Kiêng Kỵ / Cần Tránh:</span>
                </div>
                <ul className="list-disc list-inside text-[10.5px] text-[#991B1B] space-y-0.5">
                  {note.donts.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Safe Remix Guide */}
            {note.safeRemixGuide && (
              <div className="bg-[#FFF8E7] border border-[#FCE6B3] p-2 rounded-lg flex items-start gap-1.5 text-[10.5px] text-[#92400E]">
                <Lightbulb className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Gợi ý cách tân văn minh: </span>
                  <span>{note.safeRemixGuide}</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Pin Tip */}
          <div className="border-t border-[#E8DAC7] pt-2 flex items-center justify-between text-[10px] text-[#8C7662]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C8973E]" />
              <span>Nhấn biểu tượng (i) để ghim thẻ</span>
            </span>
            <span className="font-semibold text-[#991B1E]">
              Việt Phục Remix
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
