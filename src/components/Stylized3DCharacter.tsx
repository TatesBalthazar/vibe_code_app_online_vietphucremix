import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Pause, Play, Sparkles, Compass, Eye, RefreshCw } from 'lucide-react';
import { OutfitId, ColorId, SkinToneId } from '../types';
import { COLORS_DATA } from '../data/colors';
import { Stylized3DBackView } from './Stylized3DBackView';

export type CharacterGender = 'female' | 'male';

export interface Stylized3DCharacterProps {
  gender: CharacterGender;
  skinTone?: SkinToneId;
  outfitId?: OutfitId;
  colorId: ColorId;
  accessories?: string[];
  isTransitioning?: boolean;
  className?: string;
}

interface ColorPaletteShader {
  primary: string;
  shade: string;
  highlight: string;
  accent: string;
  trim: string;
}

interface SkinShaderPalette {
  faceHighlight: string;
  faceMid: string;
  faceShade: string;
  neckHighlight: string;
  neckMid: string;
  neckShade: string;
  bodyHighlight: string;
  bodyMid: string;
  bodyShade: string;
  blush: string;
  chinShadow: string;
}

const SKIN_SHADERS: Record<SkinToneId, SkinShaderPalette> = {
  fair: {
    faceHighlight: '#FFF3EB',
    faceMid: '#FDE0CC',
    faceShade: '#EBBFA3',
    neckHighlight: '#F5CCA9',
    neckMid: '#FDE0CC',
    neckShade: '#DEAE8F',
    bodyHighlight: '#FFF0E5',
    bodyMid: '#FAD9C3',
    bodyShade: '#E2B295',
    blush: '#F87171',
    chinShadow: 'rgba(180, 115, 85, 0.28)'
  },
  neutral: {
    faceHighlight: '#FFE8D6',
    faceMid: '#F5CCB0',
    faceShade: '#DFA887',
    neckHighlight: '#EBC0A2',
    neckMid: '#F5CCB0',
    neckShade: '#D69C7A',
    bodyHighlight: '#FFE4D0',
    bodyMid: '#F5C8A8',
    bodyShade: '#D99E7C',
    blush: '#E88D84',
    chinShadow: 'rgba(166, 110, 82, 0.35)'
  },
  warm: {
    faceHighlight: '#FDE8CE',
    faceMid: '#EFC194',
    faceShade: '#D49D6C',
    neckHighlight: '#E2B080',
    neckMid: '#EFC194',
    neckShade: '#C98C58',
    bodyHighlight: '#FCE3C5',
    bodyMid: '#EAB98B',
    bodyShade: '#CD905E',
    blush: '#EA580C',
    chinShadow: 'rgba(155, 95, 55, 0.40)'
  },
  tan: {
    faceHighlight: '#E8BE96',
    faceMid: '#C7956D',
    faceShade: '#A06C47',
    neckHighlight: '#B57F57',
    neckMid: '#C7956D',
    neckShade: '#915934',
    bodyHighlight: '#E2B388',
    bodyMid: '#BF8A60',
    bodyShade: '#99633D',
    blush: '#B45309',
    chinShadow: 'rgba(120, 65, 30, 0.48)'
  }
};

const COLOR_SHADERS: Record<ColorId, ColorPaletteShader> = {
  red: {
    primary: '#A3262A',
    shade: '#6B1417',
    highlight: '#D6454A',
    accent: '#C8973E',
    trim: '#F5EFE6'
  },
  burgundy: {
    primary: '#5E1B24',
    shade: '#380B12',
    highlight: '#8A2E3B',
    accent: '#D4AF37',
    trim: '#FAF8F5'
  },
  cream: {
    primary: '#F5EFE6',
    shade: '#D6C8B4',
    highlight: '#FFFFFF',
    accent: '#A3262A',
    trim: '#C8973E'
  },
  yellow: {
    primary: '#C8973E',
    shade: '#8A631E',
    highlight: '#F0B84D',
    accent: '#5E1B24',
    trim: '#FAF8F5'
  },
  blue: {
    primary: '#2B4A6F',
    shade: '#182C44',
    highlight: '#4872A3',
    accent: '#C8973E',
    trim: '#F5EFE6'
  },
  green: {
    primary: '#315643',
    shade: '#1A3326',
    highlight: '#4D8065',
    accent: '#C8973E',
    trim: '#F5EFE6'
  },
  black: {
    primary: '#1E1B18',
    shade: '#0E0C0B',
    highlight: '#3D3630',
    accent: '#D4AF37',
    trim: '#FAF8F5'
  },
  pastel: {
    primary: '#E8C5C8',
    shade: '#BD969A',
    highlight: '#FFF0F2',
    accent: '#A3262A',
    trim: '#5E1B24'
  }
};

export const Stylized3DCharacter: React.FC<Stylized3DCharacterProps> = ({
  gender = 'female',
  skinTone = 'neutral',
  outfitId = 'ao-dai',
  colorId = 'cream',
  accessories = [],
  isTransitioning = false,
  className = ''
}) => {
  const isFemale = gender === 'female';
  const isUnderwearOnly = false;
  const shader = COLOR_SHADERS[colorId] || COLOR_SHADERS.burgundy;
  const skinShader = SKIN_SHADERS[skinTone] || SKIN_SHADERS.neutral;

  // Accessory toggles
  const hasKhanDong = accessories.includes('khan-dong');
  const hasKiengBac = accessories.includes('vong-kieng-bac');
  const hasNgocTrai = accessories.includes('chuoi-ngoc-trai');
  const hasNonQuaiThao = accessories.includes('non-quai-thao');
  const hasSneakers = accessories.includes('sneakers-retro-trang');
  const hasSandal = accessories.includes('sandal-day-manh');

  // 360 Rotation State & Interactivity
  const [rotationY, setRotationY] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [is360Spinning, setIs360Spinning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showClickHint, setShowClickHint] = useState(true);
  const dragStartXRef = useRef(0);
  const initialAngleRef = useRef(0);
  const hasMovedRef = useRef(false);
  const spinAnimRef = useRef<number | null>(null);
  const autoAnimRef = useRef<number | null>(null);

  // Easing function for smooth 360 rotation (EaseInOutCubic)
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Trigger a full, ultra-smooth 360-degree rotation showcase on click
  const triggerSmooth360Spin = useCallback((durationMs = 2800) => {
    if (spinAnimRef.current) cancelAnimationFrame(spinAnimRef.current);
    if (autoAnimRef.current) cancelAnimationFrame(autoAnimRef.current);
    setIsAutoRotating(false);
    setIs360Spinning(true);
    setShowClickHint(false);

    const startAngle = rotationY;
    const startTime = performance.now();

    const animateSpin = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeInOutCubic(progress);

      const nextAngle = startAngle + easedProgress * 360;
      setRotationY(nextAngle);

      if (progress < 1) {
        spinAnimRef.current = requestAnimationFrame(animateSpin);
      } else {
        setIs360Spinning(false);
        setRotationY((startAngle + 360) % 360);
        spinAnimRef.current = null;
      }
    };

    spinAnimRef.current = requestAnimationFrame(animateSpin);
  }, [rotationY]);

  // Snap to specific angle smoothly (e.g., 0° front, 180° back)
  const snapToAngle = useCallback((targetDeg: number, durationMs = 700) => {
    if (spinAnimRef.current) cancelAnimationFrame(spinAnimRef.current);
    if (autoAnimRef.current) cancelAnimationFrame(autoAnimRef.current);
    setIsAutoRotating(false);
    setIs360Spinning(true);

    const startAngle = rotationY;
    // Calculate shortest angular path
    let diff = (targetDeg - (startAngle % 360)) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const startTime = performance.now();

    const animateSnap = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeInOutCubic(progress);
      setRotationY(startAngle + diff * eased);

      if (progress < 1) {
        spinAnimRef.current = requestAnimationFrame(animateSnap);
      } else {
        setIs360Spinning(false);
        setRotationY(((startAngle + diff) % 360 + 360) % 360);
        spinAnimRef.current = null;
      }
    };
    spinAnimRef.current = requestAnimationFrame(animateSnap);
  }, [rotationY]);

  // Auto-rotation animation loop (smooth 360 continuous spin)
  useEffect(() => {
    if (isAutoRotating && !isDragging && !is360Spinning) {
      let lastTime = performance.now();
      const step = (time: number) => {
        const dt = (time - lastTime) / 1000;
        lastTime = time;
        setRotationY((prev) => (prev + dt * 38) % 360);
        autoAnimRef.current = requestAnimationFrame(step);
      };
      autoAnimRef.current = requestAnimationFrame(step);
    }
    return () => {
      if (autoAnimRef.current) cancelAnimationFrame(autoAnimRef.current);
    };
  }, [isAutoRotating, isDragging, is360Spinning]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (spinAnimRef.current) cancelAnimationFrame(spinAnimRef.current);
      if (autoAnimRef.current) cancelAnimationFrame(autoAnimRef.current);
    };
  }, []);

  // Handle Drag interactions with Mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (spinAnimRef.current) cancelAnimationFrame(spinAnimRef.current);
    setIs360Spinning(false);
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    initialAngleRef.current = rotationY;
    hasMovedRef.current = false;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartXRef.current;
      if (Math.abs(dx) > 4) {
        hasMovedRef.current = true;
      }
      const newAngle = ((initialAngleRef.current + dx * 0.75) % 360 + 360) % 360;
      setRotationY(newAngle);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch support for mobile / tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if (spinAnimRef.current) cancelAnimationFrame(spinAnimRef.current);
      setIs360Spinning(false);
      setIsDragging(true);
      dragStartXRef.current = e.touches[0].clientX;
      initialAngleRef.current = rotationY;
      hasMovedRef.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) {
      hasMovedRef.current = true;
    }
    const newAngle = ((initialAngleRef.current + dx * 0.75) % 360 + 360) % 360;
    setRotationY(newAngle);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Clicking model triggers smooth 360 spin effect
  const handleModelClick = () => {
    if (hasMovedRef.current) return;
    if (is360Spinning) {
      // If currently in a 360 spin, switch to continuous auto-turntable
      if (spinAnimRef.current) cancelAnimationFrame(spinAnimRef.current);
      setIs360Spinning(false);
      setIsAutoRotating(true);
    } else if (isAutoRotating) {
      setIsAutoRotating(false);
    } else {
      triggerSmooth360Spin(3000);
    }
  };

  // Normalized angle between 0 and 359
  const normalizedAngle = ((Math.round(rotationY) % 360) + 360) % 360;

  // Real-time detail perspective description based on current angle
  const getPerspectiveInfo = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) {
      return { angleName: 'Mặt trước (0°)', detailName: 'Cổ áo lập lĩnh, ngực áo & khuy cúc đồng' };
    }
    if (deg >= 22.5 && deg < 67.5) {
      return { angleName: 'Nghiêng trước (45°)', detailName: 'Dáng tay áo, độ rủ tà lụa & kiềng bạc' };
    }
    if (deg >= 67.5 && deg < 112.5) {
      return { angleName: 'Nhìn ngang phải (90°)', detailName: 'Nón quai thao & đường lượn eo thon thả' };
    }
    if (deg >= 112.5 && deg < 157.5) {
      return { angleName: 'Nghiêng sau phải (135°)', detailName: 'Tà áo sau mềm mại & dáng đứng thanh thoát' };
    }
    if (deg >= 157.5 && deg < 202.5) {
      return { angleName: 'Mặt sau (180°)', detailName: 'Đường sống lưng Trung Phùng & búi tóc cài trâm sen' };
    }
    if (deg >= 202.5 && deg < 247.5) {
      return { angleName: 'Nghiêng sau trái (225°)', detailName: 'Đường may sống lưng & ống quần lụa mộc' };
    }
    if (deg >= 247.5 && deg < 292.5) {
      return { angleName: 'Nhìn ngang trái (270°)', detailName: 'Dáng đứng nho nhã & đường xẻ tà tơ tằm' };
    }
    return { angleName: 'Nghiêng trước trái (315°)', detailName: 'Toàn cảnh sắc màu di sản & phụ kiện' };
  };

  const perspectiveInfo = getPerspectiveInfo(normalizedAngle);

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center select-none transition-all duration-300 ease-out ${
        isTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
      } ${className}`}
    >
      {/* 3D Ambient Spotlight Halo */}
      <div
        className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
        style={{
          background: isFemale
            ? 'radial-gradient(circle, rgba(255,253,249,0.95) 0%, rgba(200,151,62,0.18) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(200,151,62,0.22) 0%, rgba(153,27,30,0.12) 60%, transparent 100%)'
        }}
      />

      {/* Main 360 Rotation Model Container with Perspective */}
      <div
        className="relative w-64 h-[420px] sm:w-80 sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing group touch-none"
        style={{ perspective: 1200 }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleModelClick}
        title="Nhấn vào mô hình để xoay 360° mượt mà xem chi tiết trang phục, hoặc kéo ngang để xoay tự do"
      >
        {/* Floating 360 Indicator Badge */}
        <div className="absolute top-2 right-2 z-30 flex items-center gap-1.5 bg-[#FFFDF9]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D5C6B3] text-[11px] font-bold text-[#7A5B3E] shadow-xs group-hover:border-[#991B1E] transition-all">
          <RotateCcw className={`w-3.5 h-3.5 text-[#991B1E] ${is360Spinning || isAutoRotating ? 'animate-spin' : ''}`} />
          {is360Spinning ? (
            <span className="text-[#991B1E] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C8973E] animate-pulse" />
              Đang xoay 360° • {normalizedAngle}°
            </span>
          ) : (
            <span>360° • {normalizedAngle}°</span>
          )}
        </div>

        {/* Floating Click Hint Prompt on Hover/Initial state */}
        {showClickHint && !is360Spinning && !isAutoRotating && (
          <div className="absolute top-3 left-3 z-30 pointer-events-none hidden sm:flex items-center gap-1.5 bg-[#991B1E]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md animate-pulse">
            <Sparkles className="w-3 h-3 text-[#F5D587]" />
            <span>Nhấn mô hình để xoay 360°</span>
          </div>
        )}

        {/* 3D Turntable Wrapper with transformStyle preserve-3d */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotationY}deg)`,
            transition: isDragging || is360Spinning || isAutoRotating ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* FRONT SIDE (rotateY 0deg) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)'
            }}
          >
            <svg
              viewBox="0 0 240 380"
              className="w-full h-full overflow-visible drop-shadow-[0_18px_28px_rgba(28,25,23,0.16)]"
              aria-label={`Nhân vật ${isFemale ? 'Nữ' : 'Nam'} trong trang phục ${outfitId}`}
            >
          <defs>
            {/* Skin Shaders - Dynamically matching chosen SkinTone */}
            <radialGradient id="skinFace3D" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stopColor={skinShader.faceHighlight} />
              <stop offset="65%" stopColor={skinShader.faceMid} />
              <stop offset="100%" stopColor={skinShader.faceShade} />
            </radialGradient>

            <linearGradient id="skinNeck3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skinShader.neckHighlight} />
              <stop offset="50%" stopColor={skinShader.neckMid} />
              <stop offset="100%" stopColor={skinShader.neckShade} />
            </linearGradient>

            <linearGradient id="skinBody3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skinShader.bodyHighlight} />
              <stop offset="70%" stopColor={skinShader.bodyMid} />
              <stop offset="100%" stopColor={skinShader.bodyShade} />
            </linearGradient>

            {/* Hair Shader */}
            <linearGradient id="hairShader" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#2B211D" />
              <stop offset="40%" stopColor="#4A3B34" />
              <stop offset="80%" stopColor="#1C1410" />
              <stop offset="100%" stopColor="#0E0B0A" />
            </linearGradient>

            {/* Dynamic Outfit Tunic Shader */}
            <linearGradient id="dynamicTunicShader" x1="15%" y1="5%" x2="85%" y2="95%">
              <stop offset="0%" stopColor={shader.highlight} />
              <stop offset="50%" stopColor={shader.primary} />
              <stop offset="100%" stopColor={shader.shade} />
            </linearGradient>

            <linearGradient id="dynamicTunicFold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={shader.shade} />
              <stop offset="50%" stopColor={shader.primary} />
              <stop offset="100%" stopColor={shader.shade} />
            </linearGradient>

            {/* Undergarment Silk Shader */}
            <linearGradient id="undergarmentSilk" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="45%" stopColor="#F5EFE6" />
              <stop offset="100%" stopColor="#E0D4C3" />
            </linearGradient>

            {/* Silver Torque (Kiềng Bạc) Shader */}
            <linearGradient id="silverKiengShader" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E2E8F0" />
              <stop offset="80%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Gold Accents */}
            <linearGradient id="goldAccentShader" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9E7225" />
              <stop offset="50%" stopColor="#F5D587" />
              <stop offset="100%" stopColor="#9E7225" />
            </linearGradient>

            {/* Pedestal Shaders */}
            <linearGradient id="pedestalTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="60%" stopColor="#EFE5D5" />
              <stop offset="100%" stopColor="#DECBB2" />
            </linearGradient>
            <linearGradient id="pedestalSide" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BBA68E" />
              <stop offset="50%" stopColor="#E6D7C3" />
              <stop offset="100%" stopColor="#A89279" />
            </linearGradient>
          </defs>

          {/* =================================================================
              LAYER 0: 3D TURNTABLE PEDESTAL
             ================================================================= */}
          <g id="pedestal">
            <ellipse cx="120" cy="358" rx="78" ry="16" fill="rgba(28, 25, 23, 0.14)" />
            <path d="M 48 340 L 48 350 A 72 14 0 0 0 192 350 L 192 340 Z" fill="url(#pedestalSide)" />
            <ellipse cx="120" cy="340" rx="72" ry="14" fill="url(#pedestalTop)" stroke="url(#goldAccentShader)" strokeWidth="1.5" />
            <ellipse cx="120" cy="340" rx="58" ry="10.5" fill="none" stroke="#C8973E" strokeWidth="0.75" strokeDasharray="4 3" opacity="0.65" />
            <ellipse cx="120" cy="341" rx="34" ry="7" fill="rgba(28, 25, 23, 0.22)" />
          </g>

          {/* =================================================================
              LAYER 1: BACK HAIR (FEMALE LONG HAIR)
             ================================================================= */}
          {isFemale && !hasKhanDong && (
            <g id="hair-back">
              <path
                d="M 88 46 C 78 72, 76 118, 82 162 C 95 168, 145 168, 158 162 C 164 118, 162 72, 152 46 Z"
                fill="url(#hairShader)"
              />
            </g>
          )}

          {/* =================================================================
              LAYER 2: BARE BODY & UNDERWEAR FOUNDATION
             ================================================================= */}
          <g id="bare-human-body">
            {/* Neck */}
            <rect
              x={isFemale ? '111' : '108'}
              y="76"
              width={isFemale ? '18' : '24'}
              height="24"
              rx="8"
              fill="url(#skinNeck3D)"
            />
            {/* Chin shadow on neck */}
            <ellipse cx="120" cy="82" rx={isFemale ? '9' : '11'} ry="4" fill={skinShader.chinShadow} />

            {/* Torso & Shoulders (Base anatomy) */}
            {isFemale ? (
              <path
                d="M 88 100 C 95 94, 145 94, 152 100 C 145 130, 142 160, 140 190 L 100 190 C 98 160, 95 130, 88 100 Z"
                fill="url(#skinBody3D)"
              />
            ) : (
              <path
                d="M 76 96 C 90 88, 150 88, 164 96 C 158 135, 155 165, 152 195 L 88 195 C 85 165, 82 135, 76 96 Z"
                fill="url(#skinBody3D)"
              />
            )}

            {/* Arms & Hands */}
            {isFemale ? (
              <g id="female-arms">
                {/* Left arm */}
                <path d="M 88 100 C 82 125, 76 160, 72 205 L 78 206 C 82 165, 88 135, 94 110 Z" fill="url(#skinBody3D)" />
                <ellipse cx="73" cy="208" rx="6.5" ry="9.5" transform="rotate(8 73 208)" fill="url(#skinFace3D)" />
                {/* Right arm */}
                <path d="M 152 100 C 158 125, 164 160, 168 205 L 162 206 C 158 165, 152 135, 146 110 Z" fill="url(#skinBody3D)" />
                <ellipse cx="167" cy="208" rx="6.5" ry="9.5" transform="rotate(-8 167 208)" fill="url(#skinFace3D)" />
              </g>
            ) : (
              <g id="male-arms">
                {/* Left arm */}
                <path d="M 76 96 C 68 128, 64 165, 62 202 L 72 204 C 74 170, 78 138, 86 112 Z" fill="url(#skinBody3D)" />
                <rect x="62" y="202" width="14" height="19" rx="6.5" fill="url(#skinFace3D)" />
                {/* Right arm */}
                <path d="M 164 96 C 172 128, 176 165, 178 202 L 168 204 C 166 170, 162 138, 154 112 Z" fill="url(#skinBody3D)" />
                <rect x="164" y="202" width="14" height="19" rx="6.5" fill="url(#skinFace3D)" />
              </g>
            )}

            {/* ===============================================================
                UNDERGARMENTS (ĐỒ LÓT MỘC TRUYỀN THỐNG - CULTURALLY RESPECTFUL)
                - Nữ: Áo yếm lụa thắt dây + Quần lụa lót / xà cạp mộc
                - Nam: Áo may ô lót mộc + Quần đùi lụa mộc
               =============================================================== */}
            {isFemale ? (
              /* FEMALE UNDERGARMENT: ÁO YẾM LỤA MỘC */
              <g id="undergarment-female-yem">
                {/* Neck ribbon string */}
                <path d="M 112 88 Q 120 94 128 88" stroke="#D1C3B0" strokeWidth="1.8" fill="none" />
                <circle cx="120" cy="94" r="1.5" fill="#C8973E" />
                {/* Diamond/curved silk Yếm bodice */}
                <path
                  d="M 106 100 Q 120 106 134 100 L 138 160 Q 120 166 102 160 Z"
                  fill={isUnderwearOnly ? 'url(#undergarmentSilk)' : '#FAF5ED'}
                  stroke="#D8CEBE"
                  strokeWidth="1.2"
                />
                {/* Yếm side contour & waist tie ribbon */}
                <path d="M 102 160 Q 120 164 138 160" stroke="#C8973E" strokeWidth="1.5" fill="none" />
                <path d="M 120 162 L 118 182" stroke="#C8973E" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 120 162 L 123 180" stroke="#C8973E" strokeWidth="1.5" strokeLinecap="round" />

                {/* Quần lót lụa / Xà cạp mộc (Silk briefs / inner culottes) */}
                <path
                  d="M 96 160 L 144 160 L 146 242 C 138 248, 124 246, 120 236 C 116 246, 102 248, 94 242 Z"
                  fill="url(#undergarmentSilk)"
                  stroke="#D8CEBE"
                  strokeWidth="1.2"
                />
                {/* Silk folds */}
                <path d="M 108 175 Q 120 182 132 175" stroke="#E2D7C5" strokeWidth="1.2" fill="none" />
              </g>
            ) : (
              /* MALE UNDERGARMENT: ÁO CÁNH LÓT MAY-Ô MỘC & QUẦN ĐÙI LỤA MỘC */
              <g id="undergarment-male">
                {/* May-ô / Áo cánh lót mộc */}
                <path
                  d="M 90 98 C 100 93, 140 93, 150 98 L 148 185 L 92 185 Z"
                  fill="url(#undergarmentSilk)"
                  stroke="#D8CEBE"
                  strokeWidth="1.2"
                />
                {/* Tank top scoops */}
                <path d="M 106 95 Q 120 112 134 95" fill="url(#skinNeck3D)" stroke="#D8CEBE" strokeWidth="1.2" />
                {/* Ribbed lines */}
                <line x1="110" y1="120" x2="110" y2="180" stroke="#E6DCCF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="120" y1="120" x2="120" y2="180" stroke="#E6DCCF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="130" y1="120" x2="130" y2="180" stroke="#E6DCCF" strokeWidth="1" strokeDasharray="3 3" />

                {/* Quần đùi lụa mộc nam */}
                <path
                  d="M 88 180 L 152 180 L 150 248 C 140 252, 126 250, 120 240 C 114 250, 100 252, 90 248 Z"
                  fill="url(#undergarmentSilk)"
                  stroke="#D8CEBE"
                  strokeWidth="1.2"
                />
                {/* Elastic drawstring */}
                <rect x="92" y="180" width="56" height="6" rx="2" fill="#E6DCCF" />
                <line x1="120" y1="184" x2="120" y2="198" stroke="#C8973E" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            )}

            {/* Head & Facial Features */}
            <g id="head-mesh">
              {/* Ears */}
              <ellipse cx={isFemale ? '94' : '91'} cy="56" rx="4.5" ry="7.5" fill="url(#skinNeck3D)" />
              <ellipse cx={isFemale ? '146' : '149'} cy="56" rx="4.5" ry="7.5" fill="url(#skinNeck3D)" />

              {/* Face Shape */}
              {isFemale ? (
                <path
                  d="M 95 46 C 95 26, 145 26, 145 46 C 145 66, 134 81, 120 82 C 106 81, 95 66, 95 46 Z"
                  fill="url(#skinFace3D)"
                />
              ) : (
                <path
                  d="M 92 44 C 92 23, 148 23, 148 44 C 148 63, 142 75, 131 81 C 124 84, 116 84, 109 81 C 98 75, 92 63, 92 44 Z"
                  fill="url(#skinFace3D)"
                />
              )}

              {/* Cheeks Blush */}
              <ellipse cx="105" cy="61" rx="5.5" ry="3" fill={skinShader.blush} opacity={isFemale ? 0.42 : 0.2} />
              <ellipse cx="135" cy="61" rx="5.5" ry="3" fill={skinShader.blush} opacity={isFemale ? 0.42 : 0.2} />

              {/* Eyebrows */}
              {isFemale ? (
                <>
                  <path d="M 102 47 Q 108 44.5 114 47" stroke="#2E221D" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 126 47 Q 132 44.5 138 47" stroke="#2E221D" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <path d="M 100 46.5 L 114 48" stroke="#231A16" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M 140 46.5 L 126 48" stroke="#231A16" strokeWidth="2.8" strokeLinecap="round" />
                </>
              )}

              {/* Eyes */}
              <g id="eyes">
                <ellipse cx="108" cy="54" rx="5" ry="3.8" fill="#FFFFFF" />
                <circle cx="108" cy="54" r="3.2" fill="#291D18" />
                <circle cx="109.2" cy="52.8" r="1.1" fill="#FFFFFF" />
                <path d="M 102.5 53 Q 108 49.5 113.5 53.5" stroke="#1C1411" strokeWidth={isFemale ? 2.2 : 1.8} strokeLinecap="round" fill="none" />

                <ellipse cx="132" cy="54" rx="5" ry="3.8" fill="#FFFFFF" />
                <circle cx="132" cy="54" r="3.2" fill="#291D18" />
                <circle cx="133.2" cy="52.8" r="1.1" fill="#FFFFFF" />
                <path d="M 126.5 53.5 Q 132 49.5 137.5 53" stroke="#1C1411" strokeWidth={isFemale ? 2.2 : 1.8} strokeLinecap="round" fill="none" />
              </g>

              {/* Nose */}
              <path d="M 119.5 53 L 118.5 62 Q 120 63.5 121.5 62" stroke="#D49572" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <circle cx="120" cy="61" r="1" fill="#FFF5ED" opacity="0.7" />

              {/* Lips */}
              {isFemale ? (
                <g id="female-lips">
                  <path d="M 114.5 69 Q 120 67.5 125.5 69 Q 120 73.5 114.5 69 Z" fill="#C84B4E" />
                  <ellipse cx="120" cy="70.5" rx="2.5" ry="0.7" fill="#FFE3E3" opacity="0.65" />
                </g>
              ) : (
                <g id="male-lips">
                  <path d="M 114 69.5 Q 120 71 126 69.5" stroke="#B56E5B" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              )}
            </g>
          </g>

          {/* =================================================================
              LAYER 3: SILK TROUSERS / PANTS (WHEN OUTER OUTFIT IS EQUIPPED)
             ================================================================= */}
          {!isUnderwearOnly && (
            <g id="mesh-trousers">
              {isFemale ? (
                /* Female silk trousers fitted to feminine hips */
                <>
                  <path
                    d="M 94 185 L 118 185 L 116 330 C 107 334, 95 334, 88 330 Z"
                    fill="#FAF8F5"
                    stroke="#D8CEBE"
                    strokeWidth="1"
                  />
                  <path
                    d="M 122 185 L 146 185 L 152 330 C 145 334, 133 334, 124 330 Z"
                    fill="#FAF8F5"
                    stroke="#D8CEBE"
                    strokeWidth="1"
                  />
                  <line x1="102" y1="220" x2="100" y2="326" stroke="#DFD5C5" strokeWidth="1.2" />
                  <line x1="138" y1="220" x2="140" y2="326" stroke="#DFD5C5" strokeWidth="1.2" />
                </>
              ) : (
                /* Male silk trousers fitted to broader masculine waist & hips */
                <>
                  <path
                    d="M 86 185 L 118 185 L 116 330 C 106 334, 92 334, 84 330 Z"
                    fill="#FAF8F5"
                    stroke="#D8CEBE"
                    strokeWidth="1"
                  />
                  <path
                    d="M 122 185 L 154 185 L 156 330 C 148 334, 134 334, 124 330 Z"
                    fill="#FAF8F5"
                    stroke="#D8CEBE"
                    strokeWidth="1"
                  />
                  <line x1="100" y1="210" x2="98" y2="326" stroke="#DFD5C5" strokeWidth="1.2" />
                  <line x1="140" y1="210" x2="142" y2="326" stroke="#DFD5C5" strokeWidth="1.2" />
                </>
              )}
            </g>
          )}

          {/* =================================================================
              LAYER 4: OUTER OUTFIT GARMENTS (SWAPPABLE BASED ON OUTFIT ID)
             ================================================================= */}
          {!isUnderwearOnly && (
            <g id="mesh-outer-outfit">
              {/* ----------------- [1] ÁO DÀI (TRUYỀN THỐNG / CÁCH TÂN) ----------------- */}
              {outfitId === 'ao-dai' && (
                <g id="garment-ao-dai">
                  {isFemale ? (
                    /* NỮ: Áo Dài ôm vừa vặn đường cong, eo thon, tà tha thướt */
                    <>
                      <path d="M 92 170 L 148 170 L 144 316 L 96 316 Z" fill={shader.shade} />
                      <path
                        d="M 90 100 C 81 124, 75 162, 69 200 L 79 202 C 85 168, 91 136, 97 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 150 100 C 159 124, 165 162, 171 200 L 161 202 C 155 168, 149 136, 143 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 90 100 C 102 95, 138 95, 150 100 L 143 136 C 140 150, 138 160, 141 172 L 99 172 C 102 160, 100 150, 97 136 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 108 87 Q 120 91 132 87 L 134 98 Q 120 103 106 98 Z"
                        fill={shader.primary}
                        stroke={shader.accent}
                        strokeWidth="1.2"
                      />
                      <path d="M 120 99 Q 134 104 141 128" stroke={shader.shade} strokeWidth="1.3" fill="none" />
                      <circle cx="125" cy="101" r="1.5" fill={shader.accent} />
                      <circle cx="133" cy="108" r="1.5" fill={shader.accent} />
                      <circle cx="138" cy="118" r="1.5" fill={shader.accent} />
                      <path
                        d="M 99 170 Q 120 173 141 170 L 138 318 C 126 322, 114 322, 102 318 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1.1"
                      />
                      <path d="M 114 180 L 112 314" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.35" />
                    </>
                  ) : (
                    /* NAM: Áo Dài Ngũ Thân Lập Lĩnh ôm vừa vặn vai rộng, ngực nở, cổ lập lĩnh đứng */
                    <>
                      <path d="M 86 175 L 154 175 L 150 316 L 90 316 Z" fill={shader.shade} />
                      {/* Fitted Sleeves for broad male shoulders & arms */}
                      <path
                        d="M 78 96 C 70 126, 64 165, 61 202 L 72 204 C 75 168, 80 138, 88 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 162 96 C 170 126, 176 165, 179 202 L 168 204 C 165 168, 160 138, 152 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      {/* Broad masculine torso drape */}
                      <path
                        d="M 76 96 C 92 89, 148 89, 164 96 L 154 180 L 86 180 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      {/* Inner white collar trim */}
                      <path d="M 105 82 Q 120 87 135 82 L 136 87 Q 120 92 104 87 Z" fill="#FAF8F5" />
                      {/* Upright Mandarin Collar (Cổ Lập Lĩnh) */}
                      <path
                        d="M 104 84 Q 120 89 136 84 L 138 97 Q 120 102 102 97 Z"
                        fill={shader.primary}
                        stroke={shader.accent}
                        strokeWidth="1.2"
                      />
                      {/* Right overlapping lapel with traditional buttons */}
                      <path d="M 120 98 L 146 116 L 146 182" stroke={shader.shade} strokeWidth="1.5" fill="none" />
                      <circle cx="124" cy="100" r="2.2" fill="#D4AF37" />
                      <circle cx="135" cy="110" r="2.2" fill="#D4AF37" />
                      <circle cx="146" cy="122" r="2.2" fill="#D4AF37" />
                      <circle cx="146" cy="146" r="2.2" fill="#D4AF37" />
                      <circle cx="146" cy="170" r="2.2" fill="#D4AF37" />
                      {/* Stately front panel */}
                      <path
                        d="M 88 180 Q 120 183 152 180 L 148 316 C 132 321, 108 321, 92 316 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1.1"
                      />
                      <line x1="120" y1="99" x2="120" y2="316" stroke={shader.shade} strokeWidth="1.2" />
                      <path d="M 112 180 L 110 314" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.3" />
                    </>
                  )}
                </g>
              )}

              {/* ----------------- [2] ÁO TỨ THÂN (KINH BẮC TRUYỀN THỐNG) ----------------- */}
              {outfitId === 'ao-tu-than' && (
                <g id="garment-ao-tu-than">
                  {isFemale ? (
                    <>
                      <path d="M 90 170 L 150 170 L 146 324 L 94 324 Z" fill={shader.shade} opacity="0.85" />
                      <path
                        d="M 90 100 C 78 126, 72 165, 66 204 L 78 206 C 84 170, 90 136, 97 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 150 100 C 162 126, 168 165, 174 204 L 162 206 C 156 170, 150 136, 143 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path d="M 90 100 L 108 100 L 102 168 L 96 168 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                      <path d="M 150 100 L 132 100 L 138 168 L 144 168 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                      <rect x="98" y="162" width="44" height="8" rx="2" fill="#C8973E" stroke="#8A631E" strokeWidth="1" />
                      <path d="M 116 170 L 110 240 L 118 242 L 120 170 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                      <path d="M 124 170 L 130 236 L 122 238 L 120 170 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                    </>
                  ) : (
                    <>
                      <path d="M 86 175 L 154 175 L 150 324 L 90 324 Z" fill={shader.shade} opacity="0.85" />
                      <path
                        d="M 78 96 C 70 126, 64 165, 60 204 L 72 206 C 76 170, 80 136, 88 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 162 96 C 170 126, 176 165, 180 204 L 168 206 C 164 170, 160 136, 152 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path d="M 78 96 L 104 96 L 98 172 L 86 172 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                      <path d="M 162 96 L 136 96 L 142 172 L 154 172 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                      <rect x="88" y="165" width="64" height="8" rx="2" fill="#C8973E" stroke="#8A631E" strokeWidth="1" />
                      <path d="M 116 173 L 112 242 L 120 244 L 120 173 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                      <path d="M 124 173 L 128 238 L 120 240 L 120 173 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                    </>
                  )}
                </g>
              )}

              {/* ----------------- [3] ÁO NGŨ THÂN (CỔ PHONG LẬP LĨNH) ----------------- */}
              {outfitId === 'ao-ngu-than' && (
                <g id="garment-ao-ngu-than">
                  {isFemale ? (
                    <>
                      <path d="M 88 175 L 152 175 L 148 292 L 92 292 Z" fill={shader.shade} />
                      <path
                        d="M 90 100 C 80 126, 74 164, 68 202 L 80 204 C 85 170, 89 138, 95 116 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 150 100 C 160 126, 166 164, 172 202 L 160 204 C 155 170, 151 138, 145 116 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path d="M 68 201 L 80 203" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 160 203 L 172 201" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 90 100 C 102 94, 138 94, 150 100 L 144 180 L 96 180 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                      <path d="M 108 85 Q 120 89 132 85 L 133 91 Q 120 95 107 91 Z" fill="#FAF8F5" />
                      <path d="M 107 87 Q 120 91 133 87 L 135 98 Q 120 103 105 98 Z" fill={shader.primary} stroke={shader.accent} strokeWidth="1.2" />
                      <path d="M 96 178 L 144 178 L 142 288 C 128 292, 112 292, 98 288 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1.1" />
                      <line x1="120" y1="99" x2="120" y2="288" stroke={shader.shade} strokeWidth="1.3" />
                      <path d="M 120 98 L 140 116 L 140 178" stroke={shader.shade} strokeWidth="1.3" fill="none" />
                      <circle cx="123" cy="100" r="2.2" fill="#D4AF37" />
                      <circle cx="132" cy="109" r="2.2" fill="#D4AF37" />
                      <circle cx="140" cy="122" r="2.2" fill="#D4AF37" />
                      <circle cx="140" cy="146" r="2.2" fill="#D4AF37" />
                      <circle cx="140" cy="170" r="2.2" fill="#D4AF37" />
                    </>
                  ) : (
                    <>
                      <path d="M 84 180 L 156 180 L 152 294 L 88 294 Z" fill={shader.shade} />
                      <path
                        d="M 80 96 C 72 126, 66 164, 61 202 L 77 204 C 82 170, 86 138, 90 116 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 160 96 C 168 126, 174 164, 179 202 L 163 204 C 158 170, 154 138, 150 116 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path d="M 61 201 L 77 203" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 163 203 L 179 201" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 80 96 C 96 90, 144 90, 160 96 L 154 185 L 86 185 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1" />
                      <path d="M 106 83 Q 120 88 134 83 L 135 89 Q 120 94 105 89 Z" fill="#FAF8F5" />
                      <path d="M 105 86 Q 120 91 135 86 L 137 97 Q 120 102 103 97 Z" fill={shader.primary} stroke={shader.accent} strokeWidth="1.2" />
                      <path d="M 86 182 L 154 182 L 150 288 C 132 293, 108 293, 90 288 Z" fill="url(#dynamicTunicShader)" stroke={shader.shade} strokeWidth="1.1" />
                      <line x1="120" y1="99" x2="120" y2="288" stroke={shader.shade} strokeWidth="1.5" />
                      <path d="M 120 98 L 146 116 L 146 184" stroke={shader.shade} strokeWidth="1.5" fill="none" />
                      <circle cx="123" cy="100" r="2.3" fill="#D4AF37" />
                      <circle cx="136" cy="109" r="2.3" fill="#D4AF37" />
                      <circle cx="146" cy="122" r="2.3" fill="#D4AF37" />
                      <circle cx="146" cy="146" r="2.3" fill="#D4AF37" />
                      <circle cx="146" cy="170" r="2.3" fill="#D4AF37" />
                    </>
                  )}
                </g>
              )}

              {/* ----------------- [4] ÁO BÀ BA (NAM BỘ PHÓNG KHOÁNG) ----------------- */}
              {outfitId === 'ao-ba-ba' && (
                <g id="garment-ao-ba-ba">
                  {isFemale ? (
                    <>
                      <path
                        d="M 90 100 C 81 124, 75 162, 70 198 L 80 200 C 85 168, 91 136, 97 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 150 100 C 159 124, 165 162, 170 198 L 160 200 C 155 168, 149 136, 143 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 90 100 C 102 96, 138 96, 150 100 L 144 185 C 136 198, 136 215, 142 225 L 98 225 C 104 215, 104 198, 96 185 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path d="M 108 96 Q 120 110 132 96" fill="url(#skinNeck3D)" stroke={shader.shade} strokeWidth="1.2" />
                      <line x1="120" y1="108" x2="120" y2="225" stroke={shader.shade} strokeWidth="1.2" />
                      <circle cx="120" cy="120" r="1.8" fill="#FAF8F5" />
                      <circle cx="120" cy="140" r="1.8" fill="#FAF8F5" />
                      <circle cx="120" cy="160" r="1.8" fill="#FAF8F5" />
                      <circle cx="120" cy="180" r="1.8" fill="#FAF8F5" />
                      <circle cx="120" cy="200" r="1.8" fill="#FAF8F5" />
                      <rect x="102" y="185" width="12" height="15" rx="1.5" fill="none" stroke={shader.shade} strokeWidth="1" />
                      <rect x="126" y="185" width="12" height="15" rx="1.5" fill="none" stroke={shader.shade} strokeWidth="1" />
                    </>
                  ) : (
                    <>
                      <path
                        d="M 78 96 C 70 124, 64 162, 60 200 L 72 202 C 76 168, 80 136, 88 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 162 96 C 170 124, 176 162, 180 200 L 168 202 C 164 168, 160 136, 152 114 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path
                        d="M 76 96 C 92 90, 148 90, 164 96 L 156 185 C 150 196, 150 215, 154 226 L 86 226 C 90 215, 90 196, 84 185 Z"
                        fill="url(#dynamicTunicShader)"
                        stroke={shader.shade}
                        strokeWidth="1"
                      />
                      <path d="M 105 92 Q 120 108 135 92" fill="url(#skinNeck3D)" stroke={shader.shade} strokeWidth="1.2" />
                      <line x1="120" y1="104" x2="120" y2="226" stroke={shader.shade} strokeWidth="1.2" />
                      <circle cx="120" cy="116" r="2" fill="#FAF8F5" />
                      <circle cx="120" cy="138" r="2" fill="#FAF8F5" />
                      <circle cx="120" cy="160" r="2" fill="#FAF8F5" />
                      <circle cx="120" cy="182" r="2" fill="#FAF8F5" />
                      <circle cx="120" cy="204" r="2" fill="#FAF8F5" />
                      <rect x="94" y="185" width="15" height="17" rx="1.5" fill="none" stroke={shader.shade} strokeWidth="1" />
                      <rect x="131" y="185" width="15" height="17" rx="1.5" fill="none" stroke={shader.shade} strokeWidth="1" />
                    </>
                  )}
                </g>
              )}

              {/* ----------------- [5] ÁO NHẬT BÌNH (CUNG ĐÌNH TRIỀU NGUYỄN) ----------------- */}
              {outfitId === 'ao-nhat-binh' && (
                <g id="garment-ao-nhat-binh">
                  <path d={isFemale ? "M 88 175 L 152 175 L 148 315 L 92 315 Z" : "M 86 175 L 154 175 L 150 315 L 90 315 Z"} fill={shader.shade} />
                  {/* Sleeves with Ngũ Sắc Bands */}
                  <path
                    d={isFemale
                      ? "M 90 100 C 80 124, 73 162, 68 200 L 80 202 C 85 168, 91 136, 97 114 Z"
                      : "M 78 96 C 68 124, 62 162, 58 200 L 70 202 C 75 168, 80 136, 88 114 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 150 100 C 160 124, 167 162, 172 200 L 160 202 C 155 168, 149 136, 143 114 Z"
                      : "M 162 96 C 172 124, 178 162, 182 200 L 170 202 C 165 168, 160 136, 152 114 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  {/* 5-Color Wrist Cuffs */}
                  <g id="nhat-binh-cuffs-left">
                    <line x1={isFemale ? 68 : 58} y1="190" x2={isFemale ? 80 : 70} y2="192" stroke="#E11D48" strokeWidth="2.5" />
                    <line x1={isFemale ? 68 : 58} y1="193" x2={isFemale ? 80 : 70} y2="195" stroke="#F59E0B" strokeWidth="2.5" />
                    <line x1={isFemale ? 68 : 58} y1="196" x2={isFemale ? 80 : 70} y2="198" stroke="#2563EB" strokeWidth="2.5" />
                    <line x1={isFemale ? 68 : 58} y1="199" x2={isFemale ? 80 : 70} y2="201" stroke="#FAF8F5" strokeWidth="2.5" />
                    <line x1={isFemale ? 68 : 58} y1="202" x2={isFemale ? 80 : 70} y2="204" stroke="#10B981" strokeWidth="2.5" />
                  </g>
                  <g id="nhat-binh-cuffs-right">
                    <line x1={isFemale ? 160 : 170} y1="192" x2={isFemale ? 172 : 182} y2="190" stroke="#E11D48" strokeWidth="2.5" />
                    <line x1={isFemale ? 160 : 170} y1="195" x2={isFemale ? 172 : 182} y2="193" stroke="#F59E0B" strokeWidth="2.5" />
                    <line x1={isFemale ? 160 : 170} y1="198" x2={isFemale ? 172 : 182} y2="196" stroke="#2563EB" strokeWidth="2.5" />
                    <line x1={isFemale ? 160 : 170} y1="201" x2={isFemale ? 172 : 182} y2="199" stroke="#FAF8F5" strokeWidth="2.5" />
                    <line x1={isFemale ? 160 : 170} y1="204" x2={isFemale ? 172 : 182} y2="202" stroke="#10B981" strokeWidth="2.5" />
                  </g>
                  {/* Outer Robe Body */}
                  <path
                    d={isFemale
                      ? "M 90 100 C 102 96, 138 96, 150 100 L 144 314 C 130 318, 110 318, 96 314 Z"
                      : "M 76 96 C 92 90, 148 90, 164 96 L 154 314 C 136 318, 104 318, 86 314 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  {/* Rectangular Collar */}
                  <rect x={isFemale ? "105" : "103"} y={isFemale ? "86" : "84"} width={isFemale ? "30" : "34"} height="42" rx="2" fill="none" stroke="#D4AF37" strokeWidth="4.5" />
                  <rect x={isFemale ? "107" : "105"} y={isFemale ? "88" : "86"} width={isFemale ? "26" : "30"} height="38" rx="1.5" fill="none" stroke="#B45309" strokeWidth="1" />
                  <circle cx="120" cy="138" r="8" fill="#D4AF37" opacity="0.9" />
                  <circle cx="120" cy="138" r="6" fill={shader.primary} />
                  <path d="M 118 146 L 115 185" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 122 146 L 125 185" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                </g>
              )}

              {/* ----------------- [6] ÁO TẤC (NGŨ THÂN TAY THỤNG ĐẠI LỄ) ----------------- */}
              {outfitId === 'ao-tac' && (
                <g id="garment-ao-tac">
                  <path d={isFemale ? "M 86 175 L 154 175 L 150 300 L 90 300 Z" : "M 82 175 L 158 175 L 154 300 L 86 300 Z"} fill={shader.shade} />
                  {/* Flowing Tay Thụng Sleeves */}
                  <path
                    d={isFemale
                      ? "M 88 98 C 72 120, 60 165, 54 220 L 76 224 C 80 178, 86 138, 92 116 Z"
                      : "M 80 96 C 63 120, 50 165, 44 220 L 70 224 C 74 178, 82 138, 90 116 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />
                  <path
                    d={isFemale
                      ? "M 152 98 C 168 120, 180 165, 186 220 L 164 224 C 160 178, 154 138, 148 116 Z"
                      : "M 160 96 C 177 120, 190 165, 196 220 L 170 224 C 166 178, 158 138, 150 116 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />
                  <path
                    d={isFemale
                      ? "M 88 98 C 100 92, 140 92, 152 98 L 148 296 C 132 300, 108 300, 92 296 Z"
                      : "M 76 96 C 94 90, 146 90, 164 96 L 154 296 C 136 300, 104 300, 86 296 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1.2"
                  />
                  <path d="M 106 83 Q 120 88 134 83 L 135 89 Q 120 94 105 89 Z" fill="#FAF8F5" />
                  <path d="M 105 86 Q 120 91 135 86 L 137 97 Q 120 102 103 97 Z" fill={shader.primary} stroke={shader.accent} strokeWidth="1.2" />
                  <circle cx="123" cy="100" r="2.3" fill="#D4AF37" />
                  <circle cx="136" cy="109" r="2.3" fill="#D4AF37" />
                  <circle cx="146" cy="122" r="2.3" fill="#D4AF37" />
                  <circle cx="146" cy="146" r="2.3" fill="#D4AF37" />
                  <circle cx="146" cy="170" r="2.3" fill="#D4AF37" />
                </g>
              )}

              {/* ----------------- [7] ÁO TAY CHẼN (NGŨ THÂN TAY CHẼN GỌN GÀNG) ----------------- */}
              {outfitId === 'ao-tay-chen' && (
                <g id="garment-ao-tay-chen">
                  <path d={isFemale ? "M 88 178 L 152 178 L 148 290 L 92 290 Z" : "M 86 178 L 154 178 L 150 290 L 90 290 Z"} fill={shader.shade} />
                  <path
                    d={isFemale
                      ? "M 90 100 C 82 124, 76 162, 72 200 L 80 202 C 84 168, 89 136, 95 114 Z"
                      : "M 78 96 C 70 124, 64 162, 60 200 L 72 202 C 76 168, 80 136, 88 114 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 150 100 C 158 124, 164 162, 168 200 L 160 202 C 156 168, 151 136, 145 114 Z"
                      : "M 162 96 C 170 124, 176 162, 180 200 L 168 202 C 164 168, 160 136, 152 114 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 90 100 C 102 94, 138 94, 150 100 L 146 288 C 132 292, 108 292, 94 288 Z"
                      : "M 76 96 C 92 90, 148 90, 164 96 L 152 288 C 134 292, 106 292, 88 288 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path d="M 106 84 Q 120 89 134 84 L 135 90 Q 120 95 105 90 Z" fill="#FAF8F5" />
                  <path d="M 105 87 Q 120 92 135 87 L 136 97 Q 120 102 104 97 Z" fill={shader.primary} stroke={shader.accent} strokeWidth="1.2" />
                  <line x1="120" y1="99" x2="120" y2="288" stroke={shader.shade} strokeWidth="1.2" />
                  <circle cx="123" cy="100" r="2.2" fill="#D4AF37" />
                  <circle cx="136" cy="109" r="2.2" fill="#D4AF37" />
                  <circle cx="145" cy="122" r="2.2" fill="#D4AF37" />
                </g>
              )}

              {/* ----------------- [8] ÁO GIAO LĨNH (CỔ CHÉO CHỮ V LÝ - TRẦN - LÊ) ----------------- */}
              {outfitId === 'giao-linh' && (
                <g id="garment-giao-linh">
                  <path d={isFemale ? "M 88 170 L 152 170 L 148 318 L 92 318 Z" : "M 86 170 L 154 170 L 150 318 L 90 318 Z"} fill={shader.shade} />
                  <path
                    d={isFemale
                      ? "M 88 100 C 76 122, 68 165, 62 208 L 76 210 C 82 172, 88 138, 94 114 Z"
                      : "M 76 96 C 66 122, 60 165, 54 208 L 68 210 C 74 172, 80 138, 88 114 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 152 100 C 164 122, 172 165, 178 208 L 164 210 C 158 172, 152 138, 146 114 Z"
                      : "M 164 96 C 174 122, 180 165, 186 208 L 172 210 C 166 172, 160 138, 152 114 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 88 100 C 100 94, 140 94, 152 100 L 146 316 C 130 320, 110 320, 94 316 Z"
                      : "M 76 96 C 92 90, 148 90, 164 96 L 152 316 C 134 320, 106 320, 88 316 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path d="M 112 85 L 126 125 L 122 127 L 108 87 Z" fill="#FAF8F5" stroke="#DFD5C5" strokeWidth="1" />
                  <path d="M 108 86 L 136 142 L 144 142 L 132 86 Z" fill={shader.primary} stroke={shader.shade} strokeWidth="1.2" />
                  <path d="M 132 86 L 118 122" stroke={shader.accent} strokeWidth="1.5" />
                  <rect x={isFemale ? "96" : "88"} y="165" width={isFemale ? "48" : "64"} height="8" rx="2" fill="#C8973E" stroke="#8A631E" strokeWidth="1" />
                  <line x1="120" y1="173" x2="116" y2="240" stroke="#C8973E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="120" y1="173" x2="124" y2="236" stroke="#C8973E" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}

              {/* ----------------- [9] ÁO VIÊN LĨNH (CỔ TRÒN BỆ VỆ) ----------------- */}
              {outfitId === 'vien-linh' && (
                <g id="garment-vien-linh">
                  <path d={isFemale ? "M 88 178 L 152 178 L 148 295 L 92 295 Z" : "M 86 178 L 154 178 L 150 295 L 90 295 Z"} fill={shader.shade} />
                  <path
                    d={isFemale
                      ? "M 88 100 C 78 126, 72 164, 66 202 L 78 204 C 83 170, 88 138, 93 116 Z"
                      : "M 78 96 C 70 126, 64 164, 59 202 L 73 204 C 78 170, 84 138, 90 116 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 152 100 C 162 126, 168 164, 174 202 L 162 204 C 157 170, 152 138, 147 116 Z"
                      : "M 162 96 C 170 126, 176 164, 181 202 L 167 204 C 162 170, 156 138, 150 116 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 88 100 C 100 94, 140 94, 152 100 L 148 292 C 132 296, 108 296, 92 292 Z"
                      : "M 76 96 C 92 90, 148 90, 164 96 L 154 292 C 136 296, 104 296, 86 292 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <ellipse cx="120" cy="91" rx={isFemale ? "13" : "16"} ry={isFemale ? "6.5" : "8"} fill={shader.primary} stroke={shader.accent} strokeWidth="1.8" />
                  <path d={isFemale ? "M 107 91 Q 120 97 133 91" : "M 104 91 Q 120 99 136 91"} fill="none" stroke={shader.shade} strokeWidth="1.2" />
                  <circle cx={isFemale ? "133" : "136"} cy="91" r="2" fill="#D4AF37" />
                  <rect x="108" y="120" width="24" height="24" rx="2" fill="#D4AF37" opacity="0.85" stroke="#8A631E" strokeWidth="1" />
                  <rect x="111" y="123" width="18" height="18" rx="1" fill={shader.primary} />
                </g>
              )}

              {/* ----------------- [10] ÁO ĐỐI KHÂM (HAI VẠT MỞ SONG SONG) ----------------- */}
              {outfitId === 'doi-kham' && (
                <g id="garment-doi-kham">
                  <path d={isFemale ? "M 88 170 L 152 170 L 148 318 L 92 318 Z" : "M 86 170 L 154 170 L 150 318 L 90 318 Z"} fill={shader.shade} opacity="0.85" />
                  <path
                    d={isFemale
                      ? "M 88 100 C 76 122, 68 165, 62 208 L 76 210 C 82 172, 88 138, 94 114 Z"
                      : "M 76 96 C 66 122, 60 165, 54 208 L 68 210 C 74 172, 80 138, 88 114 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 152 100 C 164 122, 172 165, 178 208 L 164 210 C 158 172, 152 138, 146 114 Z"
                      : "M 164 96 C 174 122, 180 165, 186 208 L 172 210 C 166 172, 160 138, 152 114 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  {/* Two Parallel Open Front Lapels */}
                  <path
                    d={isFemale
                      ? "M 88 100 L 106 100 L 104 316 L 90 316 Z"
                      : "M 76 96 L 102 96 L 100 316 L 86 316 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <path
                    d={isFemale
                      ? "M 152 100 L 134 100 L 136 316 L 150 316 Z"
                      : "M 164 96 L 138 96 L 140 316 L 154 316 Z"}
                    fill="url(#dynamicTunicShader)"
                    stroke={shader.shade}
                    strokeWidth="1"
                  />
                  <line x1={isFemale ? "106" : "102"} y1={isFemale ? "100" : "96"} x2={isFemale ? "104" : "100"} y2="316" stroke={shader.accent} strokeWidth="1.8" />
                  <line x1={isFemale ? "134" : "138"} y1={isFemale ? "100" : "96"} x2={isFemale ? "136" : "140"} y2="316" stroke={shader.accent} strokeWidth="1.8" />
                  <path d={isFemale ? "M 106 120 Q 120 125 134 120" : "M 102 120 Q 120 125 138 120"} stroke="#C8973E" strokeWidth="1.5" fill="none" />
                  <circle cx="120" cy="122" r="2" fill="#C8973E" />
                </g>
              )}
            </g>
          )}

          {/* =================================================================
              LAYER 5: FRONT HAIR & HEAD ACCESSORIES
             ================================================================= */}
          {/* Front Sculpted Hair */}
          {!hasKhanDong && (
            <g id="hair-front">
              {isFemale ? (
                <g id="hair-female-bangs">
                  <path d="M 93 48 C 92 24, 148 24, 147 48 C 142 36, 128 33, 120 36 C 112 33, 98 36, 93 48 Z" fill="url(#hairShader)" />
                  <path d="M 95 42 C 92 58, 93 78, 97 96 C 99 80, 98 60, 99 45 Z" fill="url(#hairShader)" />
                  <path d="M 145 42 C 148 58, 147 78, 143 96 C 141 80, 142 60, 141 45 Z" fill="url(#hairShader)" />
                  <path d="M 103 33 Q 120 29 137 33" stroke="#57443B" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.75" />
                </g>
              ) : (
                <g id="hair-male-parted">
                  <path d="M 90 48 C 88 21, 152 21, 150 48 C 146 35, 134 33, 125 38 C 116 31, 98 34, 90 48 Z" fill="url(#hairShader)" />
                  <path d="M 92 44 L 94 56 L 91 54 Z" fill="#181311" />
                  <path d="M 148 44 L 146 56 L 149 54 Z" fill="#181311" />
                  <path d="M 102 31 Q 120 26 138 32" stroke="#544239" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
                </g>
              )}
            </g>
          )}

          {/* ACCESSORY: KHĂN ĐÓNG (TRADITIONAL HEAD TURBAN) */}
          {hasKhanDong && (
            <g id="acc-khan-dong">
              {isFemale ? (
                <>
                  <ellipse cx="120" cy="38" rx="27" ry="13" fill="#1E1B18" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M 93 38 C 95 24, 145 24, 147 38 C 145 45, 95 45, 93 38 Z" fill="#2A2420" />
                  <path d="M 95 34 Q 120 27 145 34" stroke="#D4AF37" strokeWidth="1.4" fill="none" />
                  <path d="M 97 39 Q 120 33 143 39" stroke="#14110F" strokeWidth="1.4" fill="none" />
                </>
              ) : (
                <>
                  <ellipse cx="120" cy="35" rx="31" ry="14" fill="#1E1B18" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M 89 35 C 91 19, 149 19, 151 35 C 149 43, 91 43, 89 35 Z" fill="#2A2420" />
                  <path d="M 91 31 Q 120 23 149 31" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                  <path d="M 93 37 Q 120 29 147 37" stroke="#14110F" strokeWidth="1.5" fill="none" />
                </>
              )}
            </g>
          )}

          {/* ACCESSORY: KIỀNG BẠC (SILVER TORQUE COLLAR) */}
          {hasKiengBac && (
            <g id="acc-kieng-bac">
              <path
                d={isFemale ? "M 111 93 C 109 105, 131 105, 129 93" : "M 106 94 C 104 108, 136 108, 134 94"}
                stroke="url(#silverKiengShader)"
                strokeWidth={isFemale ? "3" : "3.6"}
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="120" cy={isFemale ? "102" : "105"} r={isFemale ? "1.8" : "2.2"} fill="#FFFFFF" />
            </g>
          )}

          {/* ACCESSORY: CHUỖI NGỌC TRAI (PEARL STRAND) */}
          {hasNgocTrai && (
            <g id="acc-chuoi-ngoc-trai">
              {isFemale ? (
                <>
                  <path d="M 109 92 C 105 122, 135 122, 131 92" stroke="#E2D4C3" strokeWidth="1" strokeDasharray="1 3" fill="none" />
                  <circle cx="109" cy="95" r="1.8" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="112" cy="102" r="1.9" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="115" cy="110" r="2.1" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="120" cy="114" r="2.3" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="125" cy="110" r="2.1" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="128" cy="102" r="1.9" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="131" cy="95" r="1.8" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                </>
              ) : (
                <>
                  <path d="M 105 92 C 101 126, 139 126, 135 92" stroke="#E2D4C3" strokeWidth="1" strokeDasharray="1 3" fill="none" />
                  <circle cx="105" cy="95" r="2" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="109" cy="103" r="2.1" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="114" cy="112" r="2.3" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="120" cy="117" r="2.5" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="126" cy="112" r="2.3" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="131" cy="103" r="2.1" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                  <circle cx="135" cy="95" r="2" fill="#FFFDF9" stroke="#E2D4C3" strokeWidth="0.5" />
                </>
              )}
            </g>
          )}

          {/* ACCESSORY: NÓN QUAI THAO (HELD ELEGANTLY AT SIDE) */}
          {hasNonQuaiThao && (
            <g id="acc-non-quai-thao" transform={isFemale ? "translate(144, 160) rotate(-16)" : "translate(156, 154) rotate(-16)"}>
              {/* Hat dome */}
              <ellipse cx="40" cy="40" rx="34" ry="12" fill="#EADCC8" stroke="#B89B77" strokeWidth="1.5" />
              <ellipse cx="40" cy="38" rx="22" ry="7" fill="#DFCCA8" />
              <circle cx="40" cy="36" r="3" fill="#991B1E" />
              {/* Ribbon strap (quai thao) */}
              <path d="M 16 44 Q 28 85 36 110" stroke="#991B1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 64 44 Q 52 85 44 110" stroke="#991B1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* =================================================================
              LAYER 6: FOOTWEAR
             ================================================================= */}
          <g id="footwear">
            {hasSneakers ? (
              /* MODERN RETRO SNEAKERS */
              <g id="acc-sneakers">
                {isFemale ? (
                  <>
                    <path d="M 92 326 L 115 326 L 116 339 C 109 342, 92 342, 88 338 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
                    <path d="M 90 335 L 116 335" stroke="#991B1E" strokeWidth="2" />
                    <path d="M 125 326 L 148 326 L 152 338 C 148 342, 131 342, 124 339 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
                    <path d="M 124 335 L 150 335" stroke="#991B1E" strokeWidth="2" />
                  </>
                ) : (
                  <>
                    <path d="M 86 326 L 115 326 L 116 339 C 108 342, 86 342, 82 338 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
                    <path d="M 84 335 L 116 335" stroke="#991B1E" strokeWidth="2" />
                    <path d="M 125 326 L 154 326 L 158 338 C 154 342, 132 342, 124 339 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
                    <path d="M 124 335 L 156 335" stroke="#991B1E" strokeWidth="2" />
                  </>
                )}
              </g>
            ) : hasSandal ? (
              /* SANDAL QUAI MẢNH / GUỐC */
              <g id="acc-sandal">
                {isFemale ? (
                  <>
                    <path d="M 94 328 L 114 328 L 115 338 C 108 341, 96 341, 92 338 Z" fill="#C8973E" />
                    <line x1="96" y1="332" x2="112" y2="332" stroke="#5E1B24" strokeWidth="1.5" />
                    <path d="M 126 328 L 146 328 L 148 338 C 144 341, 132 341, 124 338 Z" fill="#C8973E" />
                    <line x1="128" y1="332" x2="144" y2="332" stroke="#5E1B24" strokeWidth="1.5" />
                  </>
                ) : (
                  <>
                    <path d="M 88 328 L 115 328 L 116 338 C 108 341, 92 341, 86 338 Z" fill="#C8973E" />
                    <line x1="90" y1="332" x2="113" y2="332" stroke="#5E1B24" strokeWidth="1.5" />
                    <path d="M 125 328 L 152 328 L 154 338 C 148 341, 132 341, 124 338 Z" fill="#C8973E" />
                    <line x1="127" y1="332" x2="150" y2="332" stroke="#5E1B24" strokeWidth="1.5" />
                  </>
                )}
              </g>
            ) : isFemale ? (
              /* DEFAULT CLASSIC SHOES */
              <g id="female-default-heels">
                <path d="M 95 326 L 113 326 L 115 339 C 109 342, 97 342, 93 338 Z" fill="#FAF8F5" stroke="#D0C4B2" strokeWidth="1" />
                <path d="M 127 326 L 145 326 L 147 338 C 143 342, 131 342, 125 339 Z" fill="#FAF8F5" stroke="#D0C4B2" strokeWidth="1" />
              </g>
            ) : (
              <g id="male-default-shoes">
                <path d="M 86 325 L 115 325 L 116 339 C 106 343, 87 343, 83 338 Z" fill="#181512" />
                <path d="M 125 325 L 154 325 L 157 339 C 153 343, 134 343, 124 339 Z" fill="#181512" />
              </g>
            )}
          </g>
        </svg>
      </div>

          {/* BACK SIDE (rotateY 180deg) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <Stylized3DBackView
              gender={gender}
              skinTone={skinTone}
              outfitId={outfitId}
              colorId={colorId}
              accessories={accessories}
              shader={shader}
              skinShader={skinShader}
            />
          </div>
        </div>
      </div>

      {/* 360-Degree Interactive Toolbar & Angle Controls */}
      <div className="mt-3 w-full max-w-md flex flex-col items-center gap-2.5 px-2">
        {/* Main 360 Controls Row */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#FAF6F0]/90 backdrop-blur-md rounded-2xl border border-[#D5C6B3] shadow-xs">
          {/* Smooth 360 Spin Action Button */}
          <button
            type="button"
            onClick={() => triggerSmooth360Spin(3200)}
            disabled={is360Spinning}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
              is360Spinning
                ? 'bg-[#991B1E] text-white animate-pulse'
                : 'bg-gradient-to-r from-[#991B1E] to-[#B91C1C] text-white hover:brightness-110 active:scale-95'
            }`}
            title="Nhấn để kích hoạt hiệu ứng xoay 360° mượt mà xem toàn diện bộ trang phục"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${is360Spinning ? 'animate-spin' : ''}`} />
            <span>{is360Spinning ? 'Đang xoay 360°...' : 'Xoay 360° Mượt Mà'}</span>
          </button>

          {/* Continuous Auto-Rotate Toggle */}
          <button
            type="button"
            onClick={() => {
              if (is360Spinning && spinAnimRef.current) cancelAnimationFrame(spinAnimRef.current);
              setIs360Spinning(false);
              setIsAutoRotating((prev) => !prev);
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 border ${
              isAutoRotating
                ? 'bg-[#C8973E]/15 border-[#C8973E] text-[#7A5416] font-bold'
                : 'bg-white/70 border-[#DACBB7] text-[#5C4A3E] hover:bg-white'
            }`}
            title="Bật/Tắt tự động xoay liên tục quanh trục"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoRotating ? 'Tạm dừng' : 'Tự xoay'}</span>
          </button>

          {/* Angle Presets Snapping */}
          <div className="flex items-center gap-1 pl-1 border-l border-[#DECBB3]">
            <button
              type="button"
              onClick={() => snapToAngle(0)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                normalizedAngle <= 15 || normalizedAngle >= 345
                  ? 'bg-white text-[#991B1E] shadow-2xs font-bold border border-[#991B1E]/30'
                  : 'text-[#685648] hover:text-[#1C1917] hover:bg-white/60'
              }`}
              title="Xem góc chính diện mặt trước (0°)"
            >
              Trước (0°)
            </button>
            <button
              type="button"
              onClick={() => snapToAngle(45)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                normalizedAngle >= 30 && normalizedAngle <= 60
                  ? 'bg-white text-[#991B1E] shadow-2xs font-bold border border-[#991B1E]/30'
                  : 'text-[#685648] hover:text-[#1C1917] hover:bg-white/60'
              }`}
              title="Xem góc nghiêng 3/4 (45°)"
            >
              Nghiêng (45°)
            </button>
            <button
              type="button"
              onClick={() => snapToAngle(180)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                normalizedAngle >= 165 && normalizedAngle <= 195
                  ? 'bg-white text-[#991B1E] shadow-2xs font-bold border border-[#991B1E]/30'
                  : 'text-[#685648] hover:text-[#1C1917] hover:bg-white/60'
              }`}
              title="Xem chi tiết sống lưng & mặt sau (180°)"
            >
              Sau (180°)
            </button>
            <button
              type="button"
              onClick={() => snapToAngle(270)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                normalizedAngle >= 255 && normalizedAngle <= 285
                  ? 'bg-white text-[#991B1E] shadow-2xs font-bold border border-[#991B1E]/30'
                  : 'text-[#685648] hover:text-[#1C1917] hover:bg-white/60'
              }`}
              title="Xem góc cạnh bên hông (270°)"
            >
              Hông (270°)
            </button>
          </div>
        </div>

        {/* Real-time Perspective & Costume Detail Showcase Tag */}
        <div className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-white/70 border border-[#E2D5C3] text-xs shadow-2xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <Compass className="w-3.5 h-3.5 text-[#991B1E] shrink-0" />
            <span className="font-bold text-[#1C1917] shrink-0">{perspectiveInfo.angleName}:</span>
            <span className="text-[#6D5A4D] truncate text-[11px]">{perspectiveInfo.detailName}</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[#F2EAE0] text-[#7A5B3E] shrink-0">
            {normalizedAngle}°
          </span>
        </div>

        {/* Dynamic Angle Slider for fine manual adjustment */}
        <div className="w-full flex items-center gap-2 px-1">
          <span className="text-[10px] font-medium text-[#8A7968]">0°</span>
          <input
            type="range"
            min={0}
            max={359}
            value={normalizedAngle}
            onChange={(e) => {
              if (spinAnimRef.current) cancelAnimationFrame(spinAnimRef.current);
              setIs360Spinning(false);
              setIsAutoRotating(false);
              setRotationY(Number(e.target.value));
            }}
            className="flex-1 h-1.5 bg-[#E2D5C3] rounded-lg appearance-none cursor-pointer accent-[#991B1E]"
            title="Kéo trượt để xoay góc nhìn 360° chính xác từng độ"
          />
          <span className="text-[10px] font-medium text-[#8A7968]">360°</span>
        </div>
      </div>

      {/* Floating Status Tag Under Canvas */}
      <div className="mt-2 flex items-center gap-2 bg-[#FFFDF9]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E0D3C1] shadow-xs text-xs">
        <span className="w-2 h-2 rounded-full bg-[#166534] animate-pulse" />
        <span className="font-semibold text-[#1C1917]">
          {isFemale ? 'Người mẫu Nữ' : 'Người mẫu Nam'}
        </span>
        <span className="text-[#8A7968]">·</span>
        <span className="text-[#991B1E] font-medium">
          {outfitId === 'ao-dai'
            ? (colorId === 'black' ? 'Áo Dài Đen (Nho nhã)' : colorId === 'cream' ? 'Áo Dài Trắng (Tinh khôi)' : 'Áo Dài Truyền Thống')
            : outfitId.toUpperCase()}
        </span>
        {accessories.length > 0 && (
          <>
            <span className="text-[#8A7968]">·</span>
            <span className="text-[#594C42]">{accessories.length} phụ kiện</span>
          </>
        )}
      </div>
    </div>
  );
};
