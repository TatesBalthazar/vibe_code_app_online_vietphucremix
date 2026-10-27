import React from 'react';
import { SkinToneId } from '../types';

export type CharacterGender = 'female' | 'male';

export interface CharacterDefaultAvatarProps {
  gender: CharacterGender;
  skinTone?: SkinToneId;
  outfitColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'responsive';
  showBadge?: boolean;
  showAttireLabel?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  active?: boolean;
}

interface SkinPalette {
  base: string;
  highlight: string;
  shade: string;
  deepShade: string;
  blush: string;
  lips: string;
  ears: string;
  neckShade: string;
  nameVi: string;
  undertoneLabel: string;
}

const SKIN_TONE_PALETTES: Record<SkinToneId, SkinPalette> = {
  fair: {
    base: '#FDE0CC',
    highlight: '#FFF5EE',
    shade: '#EDBFA0',
    deepShade: '#DDAA89',
    blush: '#FB7185',
    lips: '#E11D48',
    ears: '#F8C8B0',
    neckShade: '#DEAE8F',
    nameVi: 'Da Sáng Hồng',
    undertoneLabel: 'Sắc tố mát (Cool)'
  },
  neutral: {
    base: '#F5CCB0',
    highlight: '#FFE8D6',
    shade: '#DEAC8D',
    deepShade: '#C99372',
    blush: '#F472B6',
    lips: '#BE123C',
    ears: '#EBBFA3',
    neckShade: '#D69C7A',
    nameVi: 'Da Tự Nhiên',
    undertoneLabel: 'Trung tính (Neutral)'
  },
  warm: {
    base: '#EFC194',
    highlight: '#FCE3C5',
    shade: '#D49D6C',
    deepShade: '#BC8350',
    blush: '#FB923C',
    lips: '#9F1239',
    ears: '#E2B080',
    neckShade: '#C98C58',
    nameVi: 'Da Vàng Châu Á',
    undertoneLabel: 'Ấm Á Đông (Warm)'
  },
  tan: {
    base: '#C7956D',
    highlight: '#DEB088',
    shade: '#A36E46',
    deepShade: '#885630',
    blush: '#EA580C',
    lips: '#881337',
    ears: '#B57F57',
    neckShade: '#915934',
    nameVi: 'Da Bánh Mật',
    undertoneLabel: 'Rám nắng (Deep-Warm)'
  }
};

const SIZE_CLASSES = {
  xs: 'w-8 h-8',
  sm: 'w-11 h-11',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-36 h-36',
  hero: 'w-48 h-48 sm:w-56 sm:h-56',
  responsive: 'w-full h-full'
};

export const CharacterDefaultAvatar: React.FC<CharacterDefaultAvatarProps> = ({
  gender,
  skinTone = 'neutral',
  outfitColor,
  size = 'md',
  showBadge = false,
  showAttireLabel = false,
  className = '',
  onClick,
  interactive = false,
  active = false
}) => {
  const isFemale = gender === 'female';
  const skin = SKIN_TONE_PALETTES[skinTone] || SKIN_TONE_PALETTES.neutral;
  const sizeClass = SIZE_CLASSES[size];

  // SVG Unique clip & gradient ID generator based on props to prevent collisions
  const uid = `${gender}-${skinTone}-${size}-${outfitColor ? outfitColor.replace('#', '') : 'def'}`;

  // Custom outfit gradients if outfitColor is specified
  const customFemaleGrad = outfitColor
    ? {
        c1: outfitColor,
        c2: outfitColor,
        c3: '#181512',
        c4: '#0A0807'
      }
    : null;
  const customMaleGrad = outfitColor
    ? {
        c1: outfitColor,
        c2: outfitColor,
        c3: '#181512',
        c4: '#0A0807'
      }
    : null;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        interactive ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      <div
        className={`relative ${sizeClass} rounded-full overflow-hidden transition-all duration-300 ${
          active
            ? 'ring-3 ring-[#991B1E] shadow-md scale-[1.03]'
            : interactive
            ? 'hover:ring-2 hover:ring-[#C8973E] hover:scale-105 shadow-xs'
            : 'shadow-xs'
        }`}
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background Studio Radial Glow */}
            <radialGradient id={`bgGlow-${uid}`} cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="60%" stopColor="#F5EBDD" />
              <stop offset="100%" stopColor={isFemale ? '#E8D2C4' : '#D5C8BA'} />
            </radialGradient>

            {/* Cultural Halo Circular Ring */}
            <linearGradient id={`haloGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8973E" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#991B1E" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C8973E" stopOpacity="0.5" />
            </linearGradient>

            {/* Face Soft 3D Lighting Gradient */}
            <linearGradient id={`faceGrad-${uid}`} x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor={skin.highlight} />
              <stop offset="45%" stopColor={skin.base} />
              <stop offset="100%" stopColor={skin.shade} />
            </linearGradient>

            {/* Neck Shade Gradient */}
            <linearGradient id={`neckGrad-${uid}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor={skin.deepShade} />
              <stop offset="60%" stopColor={skin.neckShade} />
              <stop offset="100%" stopColor={skin.base} />
            </linearGradient>

            {/* Female Silk Ao Dai Gradient (Customized or Classic White) */}
            <linearGradient id={`femaleAoDaiGrad-${uid}`} x1="20%" y1="0%" x2="80%" y2="100%">
              {outfitColor ? (
                <>
                  <stop offset="0%" stopColor={outfitColor} />
                  <stop offset="60%" stopColor={outfitColor} />
                  <stop offset="100%" stopColor="#1C1917" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FAF7F2" />
                  <stop offset="85%" stopColor="#EADBCC" />
                  <stop offset="100%" stopColor="#DAC7B2" />
                </>
              )}
            </linearGradient>

            {/* Male Silk Ao Dai Gradient (Customized or Classic Black) */}
            <linearGradient id={`maleAoDaiGrad-${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
              {outfitColor ? (
                <>
                  <stop offset="0%" stopColor={outfitColor} />
                  <stop offset="60%" stopColor={outfitColor} />
                  <stop offset="100%" stopColor="#0B0908" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#352F2B" />
                  <stop offset="40%" stopColor="#1E1B18" />
                  <stop offset="85%" stopColor="#12100E" />
                  <stop offset="100%" stopColor="#0B0908" />
                </>
              )}
            </linearGradient>

            {/* Gold Accents Gradient */}
            <linearGradient id={`goldGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9DF98" />
              <stop offset="50%" stopColor="#C8973E" />
              <stop offset="100%" stopColor="#8E661C" />
            </linearGradient>

            {/* Hair Lustre */}
            <linearGradient id={`hairGrad-${uid}`} x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#2A2421" />
              <stop offset="50%" stopColor="#181412" />
              <stop offset="100%" stopColor="#0A0807" />
            </linearGradient>
          </defs>

          {/* 1. STUDIO BACKGROUND */}
          <rect width="240" height="240" fill={`url(#bgGlow-${uid})`} />

          {/* Heritage Circular Watermark (Trống đồng subtle ring) */}
          <circle
            cx="120"
            cy="115"
            r="82"
            fill="none"
            stroke={`url(#haloGrad-${uid})`}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <circle
            cx="120"
            cy="115"
            r="92"
            fill="none"
            stroke={`url(#haloGrad-${uid})`}
            strokeWidth="0.8"
            opacity="0.6"
          />

          {isFemale ? (
            /* ===============================================================
               FEMALE AVATAR: NỮ GIỚI DIỆN ÁO DÀI TRẮNG TINH KHÔI
               =============================================================== */
            <g id="female-model-avatar">
              {/* Back Hair Bun */}
              <ellipse cx="120" cy="82" rx="46" ry="44" fill={`url(#hairGrad-${uid})`} />
              <ellipse cx="120" cy="54" rx="28" ry="18" fill="#181412" />
              {/* Golden Hairpin (Trâm sen) */}
              <path
                d="M 138 48 L 162 38"
                stroke={`url(#goldGrad-${uid})`}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="164" cy="37" r="4.5" fill="#D4AF37" />
              <circle cx="164" cy="37" r="2" fill="#FFFFFF" />

              {/* Shoulders & White Silk Ao Dai Body */}
              <path
                d="M 52 240 C 56 182, 82 168, 102 162 L 138 162 C 158 168, 184 182, 188 240 Z"
                fill={`url(#femaleAoDaiGrad-${uid})`}
                stroke="#D8C8B4"
                strokeWidth="1"
              />

              {/* Silk Raglan Seams (Đường ráp lăng đặc trưng áo dài) */}
              <path
                d="M 104 162 C 96 182, 80 208, 62 236"
                stroke="#D2BEA7"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 136 162 C 144 182, 160 208, 178 236"
                stroke="#D2BEA7"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />

              {/* Pearl/Gold Necklace (Kiềng or Chuỗi Ngọc) */}
              <path
                d="M 106 166 Q 120 180 134 166"
                stroke="#FFFDF9"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 106 166 Q 120 180 134 166"
                stroke={`url(#goldGrad-${uid})`}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Elegant Neck */}
              <path
                d="M 110 128 L 110 162 C 114 165, 126 165, 130 162 L 130 128 Z"
                fill={`url(#neckGrad-${uid})`}
              />

              {/* High Mandarin Collar (Cổ Áo Dài Lập Lĩnh Trắng) */}
              <path
                d="M 106 148 C 106 142, 134 142, 134 148 L 136 164 C 130 167, 110 167, 104 164 Z"
                fill="#FFFFFF"
                stroke="#D8C7B2"
                strokeWidth="1"
              />
              {/* Collar V-opening slit and delicate golden toggle pin */}
              <path d="M 120 148 L 120 164" stroke="#D0BDA6" strokeWidth="1" />
              <circle cx="120" cy="156" r="2.2" fill="#D4AF37" />

              {/* Ears */}
              <ellipse cx="78" cy="108" rx="6" ry="11" fill={skin.ears} />
              <ellipse cx="162" cy="108" rx="6" ry="11" fill={skin.ears} />
              {/* Pearl Earrings */}
              <circle cx="77" cy="116" r="2.5" fill="#FFFDF8" stroke="#D6C4AD" strokeWidth="0.5" />
              <circle cx="163" cy="116" r="2.5" fill="#FFFDF8" stroke="#D6C4AD" strokeWidth="0.5" />

              {/* Face Shape (V-line duyên dáng Việt Nam) */}
              <path
                d="M 80 94 C 80 64, 160 64, 160 94 C 160 120, 142 144, 120 144 C 98 144, 80 120, 80 94 Z"
                fill={`url(#faceGrad-${uid})`}
              />

              {/* Soft Cheek Blush */}
              <ellipse cx="94" cy="112" rx="10" ry="5.5" fill={skin.blush} opacity="0.32" />
              <ellipse cx="146" cy="112" rx="10" ry="5.5" fill={skin.blush} opacity="0.32" />

              {/* Delicate Eyebrows (Lông mày lá liễu thanh tú) */}
              <path
                d="M 90 92 Q 101 88 111 92"
                stroke="#2B211D"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 129 92 Q 139 88 150 92"
                stroke="#2B211D"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Gentle Expressive Eyes */}
              <g id="female-eyes">
                {/* Left Eye */}
                <path
                  d="M 92 99 Q 102 95 111 99"
                  stroke="#1C1512"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="102" cy="101" r="3.2" fill="#201815" />
                <circle cx="103" cy="100" r="1.1" fill="#FFFFFF" />

                {/* Right Eye */}
                <path
                  d="M 129 99 Q 138 95 148 99"
                  stroke="#1C1512"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="138" cy="101" r="3.2" fill="#201815" />
                <circle cx="139" cy="100" r="1.1" fill="#FFFFFF" />
              </g>

              {/* Nose */}
              <path
                d="M 119 104 Q 120 114 122 116"
                stroke={skin.shade}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Lips (Môi hồng duyên dáng) */}
              <path
                d="M 112 126 Q 120 123 128 126 Q 120 132 112 126 Z"
                fill={skin.lips}
                opacity="0.88"
              />
              <path
                d="M 114 126 Q 120 128 126 126"
                stroke="#4A0516"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Hair Front Bangs / Side Parting */}
              <path
                d="M 79 92 C 82 60, 116 56, 120 74 C 124 56, 158 60, 161 92 C 152 74, 136 68, 120 76 C 104 68, 88 74, 79 92 Z"
                fill={`url(#hairGrad-${uid})`}
              />
              {/* Loose Strands for realism */}
              <path
                d="M 80 88 Q 78 116 80 128"
                stroke="#1B1513"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 160 88 Q 162 116 160 128"
                stroke="#1B1513"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : (
            /* ===============================================================
               MALE AVATAR: NAM GIỚI DIỆN ÁO DÀI ĐEN LẬP LĨNH NHO NHÃ
               =============================================================== */
            <g id="male-model-avatar">
              {/* Back Hair */}
              <ellipse cx="120" cy="80" rx="45" ry="43" fill={`url(#hairGrad-${uid})`} />

              {/* Shoulders & Black Silk Ao Dai Body */}
              <path
                d="M 44 240 C 48 178, 76 164, 98 158 L 142 158 C 164 164, 192 178, 196 240 Z"
                fill={`url(#maleAoDaiGrad-${uid})`}
                stroke="#2A2420"
                strokeWidth="1"
              />

              {/* Right Vạt Chéo (Tà áo ngũ thân lập lĩnh cài cúc bên hữu) */}
              <path
                d="M 126 160 L 148 184 L 144 240"
                stroke="#3E3630"
                strokeWidth="1.5"
                fill="none"
              />

              {/* 5 Traditional Brass/Gold Buttons (Ngũ thường cúc đồng) */}
              <circle cx="124" cy="156" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
              <circle cx="132" cy="168" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
              <circle cx="140" cy="182" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
              <circle cx="143" cy="204" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />
              <circle cx="143" cy="226" r="2.2" fill="#D4AF37" stroke="#3A280D" strokeWidth="0.5" />

              {/* Strong Masculine Neck */}
              <path
                d="M 107 126 L 107 160 C 112 163, 128 163, 133 160 L 133 126 Z"
                fill={`url(#neckGrad-${uid})`}
              />

              {/* Inner White Collar (Lót Cổ Trắng Tinh Tế của Áo Dài Nam) */}
              <path
                d="M 103 146 C 103 140, 137 140, 137 146 L 138 161 C 130 164, 110 164, 102 161 Z"
                fill="#FAF8F5"
                stroke="#D6C7B2"
                strokeWidth="0.8"
              />

              {/* Outer Black Standing Collar (Cổ Lập Lĩnh Đen Quyền Quý) */}
              <path
                d="M 103 149 C 103 144, 137 144, 137 149 L 138 163 C 130 166, 110 166, 102 163 Z"
                fill="#1C1816"
                stroke="#3E3630"
                strokeWidth="1"
              />

              {/* Ears */}
              <ellipse cx="76" cy="107" rx="7" ry="12" fill={skin.ears} />
              <ellipse cx="164" cy="107" rx="7" ry="12" fill={skin.ears} />

              {/* Masculine Jawline Face */}
              <path
                d="M 78 90 C 78 62, 162 62, 162 90 C 162 118, 146 142, 120 142 C 94 142, 78 118, 78 90 Z"
                fill={`url(#faceGrad-${uid})`}
              />

              {/* Subtle Natural Warmth on Cheeks */}
              <ellipse cx="94" cy="112" rx="9" ry="4.5" fill={skin.blush} opacity="0.20" />
              <ellipse cx="146" cy="112" rx="9" ry="4.5" fill={skin.blush} opacity="0.20" />

              {/* Strong Male Eyebrows (Kiếm mi đĩnh đạc) */}
              <path
                d="M 88 90 L 112 88"
                stroke="#1B1410"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M 128 88 L 152 90"
                stroke="#1B1410"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Confident Eyes */}
              <g id="male-eyes">
                {/* Left Eye */}
                <path
                  d="M 90 98 Q 100 95 111 98"
                  stroke="#18120F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="101" cy="99" r="3.2" fill="#1C1410" />
                <circle cx="102" cy="98.5" r="1.1" fill="#FFFFFF" />

                {/* Right Eye */}
                <path
                  d="M 129 98 Q 140 95 150 98"
                  stroke="#18120F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="139" cy="99" r="3.2" fill="#1C1410" />
                <circle cx="140" cy="98.5" r="1.1" fill="#FFFFFF" />
              </g>

              {/* Structured Male Nose */}
              <path
                d="M 119 100 L 120 114 L 123 115"
                stroke={skin.shade}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Male Lips */}
              <path
                d="M 112 125 Q 120 123 128 125 Q 120 129 112 125 Z"
                fill={skin.lips}
                opacity="0.80"
              />
              <line x1="113" y1="125" x2="127" y2="125" stroke="#3A1D16" strokeWidth="0.8" />

              {/* Groomed Modern / Traditional Side Hair Parting */}
              <path
                d="M 77 86 C 80 52, 114 50, 134 56 C 154 62, 163 76, 163 88 C 152 70, 134 65, 115 67 C 98 69, 86 76, 77 86 Z"
                fill={`url(#hairGrad-${uid})`}
              />
              {/* Sideburns */}
              <path d="M 78 86 L 79 104" stroke="#181412" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 162 86 L 161 104" stroke="#181412" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* Golden Outer Rim Ring */}
          <circle
            cx="120"
            cy="120"
            r="118.5"
            fill="none"
            stroke={isFemale ? '#D4AF37' : '#991B1E'}
            strokeWidth="2.5"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Optional Badge Indicator */}
      {showBadge && (
        <span
          className={`absolute -bottom-1 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs border ${
            isFemale
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-stone-800 text-stone-100 border-stone-600'
          }`}
        >
          {isFemale ? 'Nữ • Áo Dài Trắng' : 'Nam • Áo Dài Đen'}
        </span>
      )}

      {/* Optional Attire Label */}
      {showAttireLabel && (
        <div className="mt-1 text-center">
          <div className="text-[11px] font-bold text-[#1C1917]">
            {isFemale ? 'Nữ Giới' : 'Nam Giới'}
          </div>
          <div className="text-[10px] text-[#991B1E] font-medium">
            {isFemale ? 'Áo Dài Trắng' : 'Áo Dài Đen'}
          </div>
        </div>
      )}
    </div>
  );
};
