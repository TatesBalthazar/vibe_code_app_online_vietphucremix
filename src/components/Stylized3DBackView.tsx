import React from 'react';
import { OutfitId, ColorId, SkinToneId } from '../types';
import { CharacterGender } from './Stylized3DCharacter';

export interface Stylized3DBackViewProps {
  gender: CharacterGender;
  skinTone?: SkinToneId;
  outfitId?: OutfitId;
  colorId: ColorId;
  accessories?: string[];
  shader: {
    primary: string;
    shade: string;
    highlight: string;
    accent: string;
    trim: string;
  };
  skinShader: {
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
  };
}

export const Stylized3DBackView: React.FC<Stylized3DBackViewProps> = ({
  gender = 'female',
  outfitId = 'ao-dai',
  accessories = [],
  shader,
  skinShader
}) => {
  const isFemale = gender === 'female';
  const hasKhanDong = accessories.includes('khan-dong');
  const hasNonQuaiThao = accessories.includes('non-quai-thao');
  const hasSneakers = accessories.includes('sneakers-retro-trang');
  const hasSandal = accessories.includes('sandal-day-manh');

  return (
    <svg
      viewBox="0 0 240 380"
      className="w-full h-full overflow-visible drop-shadow-[0_18px_28px_rgba(28,25,23,0.16)]"
      aria-label={`Mặt sau nhân vật ${isFemale ? 'Nữ' : 'Nam'}`}
    >
      <defs>
        <radialGradient id="skinFace3DBack" cx="45%" cy="38%" r="60%">
          <stop offset="0%" stopColor={skinShader.faceHighlight} />
          <stop offset="65%" stopColor={skinShader.faceMid} />
          <stop offset="100%" stopColor={skinShader.faceShade} />
        </radialGradient>

        <linearGradient id="skinNeck3DBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={skinShader.neckHighlight} />
          <stop offset="50%" stopColor={skinShader.neckMid} />
          <stop offset="100%" stopColor={skinShader.neckShade} />
        </linearGradient>

        <linearGradient id="skinBody3DBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={skinShader.bodyHighlight} />
          <stop offset="70%" stopColor={skinShader.bodyMid} />
          <stop offset="100%" stopColor={skinShader.bodyShade} />
        </linearGradient>

        <linearGradient id="hairShaderBack" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#2B211D" />
          <stop offset="40%" stopColor="#4A3B34" />
          <stop offset="80%" stopColor="#1C1410" />
          <stop offset="100%" stopColor="#0E0B0A" />
        </linearGradient>

        <linearGradient id="dynamicTunicShaderBack" x1="15%" y1="5%" x2="85%" y2="95%">
          <stop offset="0%" stopColor={shader.highlight} />
          <stop offset="50%" stopColor={shader.primary} />
          <stop offset="100%" stopColor={shader.shade} />
        </linearGradient>

        <linearGradient id="pedestalTopBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="60%" stopColor="#EFE5D5" />
          <stop offset="100%" stopColor="#DECBB2" />
        </linearGradient>
        <linearGradient id="pedestalSideBack" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BBA68E" />
          <stop offset="50%" stopColor="#E6D7C3" />
          <stop offset="100%" stopColor="#A89279" />
        </linearGradient>
      </defs>

      {/* LAYER 0: PEDESTAL */}
      <g id="back-pedestal">
        <ellipse cx="120" cy="358" rx="78" ry="16" fill="rgba(28, 25, 23, 0.14)" />
        <path d="M 48 340 L 48 350 A 72 14 0 0 0 192 350 L 192 340 Z" fill="url(#pedestalSideBack)" />
        <ellipse cx="120" cy="340" rx="72" ry="14" fill="url(#pedestalTopBack)" stroke="#C8973E" strokeWidth="1.5" />
        <ellipse cx="120" cy="340" rx="58" ry="10.5" fill="none" stroke="#C8973E" strokeWidth="0.75" strokeDasharray="4 3" opacity="0.65" />
      </g>

      {/* LAYER 1: BACK ARMS & LEGS SILHOUETTE */}
      <g id="back-bare-body">
        {/* Neck */}
        <rect
          x={isFemale ? '111' : '108'}
          y="76"
          width={isFemale ? '18' : '24'}
          height="24"
          rx="8"
          fill="url(#skinNeck3DBack)"
        />
        {/* Arms */}
        {isFemale ? (
          <g id="female-back-arms">
            <path d="M 88 100 C 82 125, 76 160, 72 205 L 78 206 C 82 165, 88 135, 94 110 Z" fill="url(#skinBody3DBack)" />
            <path d="M 152 100 C 158 125, 164 160, 168 205 L 162 206 C 158 165, 152 135, 146 110 Z" fill="url(#skinBody3DBack)" />
          </g>
        ) : (
          <g id="male-back-arms">
            <path d="M 76 96 C 68 128, 64 165, 62 202 L 72 204 C 74 170, 78 138, 86 112 Z" fill="url(#skinBody3DBack)" />
            <path d="M 164 96 C 172 128, 176 165, 178 202 L 168 204 C 166 170, 162 138, 154 112 Z" fill="url(#skinBody3DBack)" />
          </g>
        )}
      </g>

      {/* LAYER 2: SILK TROUSERS FROM BACK */}
      <g id="back-mesh-trousers">
        {isFemale ? (
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

      {/* LAYER 3: BACK TUNIC / GARMENT DRAPE (TAILORED FOR ALL VIETNAMESE OUTFITS) */}
      <g id="back-garment">
        {/* Sleeves from Back */}
        {isFemale ? (
          <>
            {outfitId === 'ao-tac' ? (
              /* Áo Tấc Wide Ceremonial Sleeves */
              <>
                <path
                  d="M 90 100 C 76 128, 58 175, 48 226 L 68 228 C 76 182, 85 142, 97 114 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1.2"
                />
                <path
                  d="M 150 100 C 164 128, 182 175, 192 226 L 172 228 C 164 182, 155 142, 143 114 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1.2"
                />
              </>
            ) : outfitId === 'ao-ba-ba' ? (
              /* Áo Bà Ba 3/4 Sleeves */
              <>
                <path
                  d="M 90 100 C 82 122, 77 155, 72 190 L 81 192 C 86 160, 91 132, 97 112 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1"
                />
                <path
                  d="M 150 100 C 158 122, 163 155, 168 190 L 159 192 C 154 160, 149 132, 143 112 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1"
                />
              </>
            ) : (
              /* Regular Tailored Long Sleeves */
              <>
                <path
                  d="M 90 100 C 81 124, 75 162, 69 200 L 79 202 C 85 168, 91 136, 97 114 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1"
                />
                <path
                  d="M 150 100 C 159 124, 165 162, 171 200 L 161 202 C 155 168, 149 136, 143 114 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1"
                />
              </>
            )}
          </>
        ) : (
          <>
            {outfitId === 'ao-tac' ? (
              /* Áo Tấc Male Sweeping Sleeves */
              <>
                <path
                  d="M 78 96 C 65 128, 48 175, 40 228 L 60 230 C 68 184, 78 144, 88 114 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1.3"
                />
                <path
                  d="M 162 96 C 175 128, 192 175, 200 228 L 180 230 C 172 184, 162 144, 152 114 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1.3"
                />
              </>
            ) : outfitId === 'ao-ba-ba' ? (
              /* Áo Bà Ba Male Sleeves */
              <>
                <path
                  d="M 78 96 C 71 124, 66 158, 64 194 L 74 196 C 76 164, 81 134, 88 112 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1"
                />
                <path
                  d="M 162 96 C 169 124, 174 158, 176 194 L 166 196 C 164 164, 159 134, 152 112 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1"
                />
              </>
            ) : (
              /* Broad Male Fitted Sleeves */
              <>
                <path
                  d="M 78 96 C 70 126, 64 165, 61 202 L 72 204 C 75 168, 80 138, 88 114 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1"
                />
                <path
                  d="M 162 96 C 170 126, 176 165, 179 202 L 168 204 C 165 168, 160 138, 152 114 Z"
                  fill="url(#dynamicTunicShaderBack)"
                  stroke={shader.shade}
                  strokeWidth="1"
                />
              </>
            )}
          </>
        )}

        {/* Back Bodice & Tunic Panel with Iconic Central Seam (Đường Trung Phùng) */}
        {outfitId === 'ao-ba-ba' ? (
          /* ÁO BÀ BA BACK DRAPE (Hips length, gentle side slits) */
          isFemale ? (
            <>
              <path
                d="M 90 100 C 102 96, 138 96, 150 100 L 144 185 C 138 198, 138 214, 142 225 L 98 225 C 102 214, 102 198, 96 185 Z"
                fill="url(#dynamicTunicShaderBack)"
                stroke={shader.shade}
                strokeWidth="1.1"
              />
              <line x1="120" y1="100" x2="120" y2="225" stroke={shader.shade} strokeWidth="1.2" opacity="0.75" />
            </>
          ) : (
            <>
              <path
                d="M 76 96 C 92 90, 148 90, 164 96 L 156 185 C 152 202, 152 216, 154 228 L 86 228 C 88 216, 88 202, 84 185 Z"
                fill="url(#dynamicTunicShaderBack)"
                stroke={shader.shade}
                strokeWidth="1.2"
              />
              <line x1="120" y1="96" x2="120" y2="228" stroke={shader.shade} strokeWidth="1.4" opacity="0.8" />
            </>
          )
        ) : outfitId === 'ao-tu-than' ? (
          /* ÁO TỨ THÂN BACK DRAPE (Thân sau ghép đôi trung phùng, dải thắt lưng sau) */
          isFemale ? (
            <>
              <path
                d="M 90 100 C 102 94, 138 94, 150 100 L 146 170 L 144 324 L 96 324 L 94 170 Z"
                fill="url(#dynamicTunicShaderBack)"
                stroke={shader.shade}
                strokeWidth="1.1"
              />
              {/* Back sash band */}
              <rect x="94" y="162" width="52" height="8" rx="2" fill="#C8973E" stroke="#8A631E" strokeWidth="1" />
              <line x1="120" y1="96" x2="120" y2="324" stroke={shader.shade} strokeWidth="1.5" />
            </>
          ) : (
            <>
              <path
                d="M 76 96 C 92 88, 148 88, 164 96 L 154 172 L 150 324 L 90 324 L 86 172 Z"
                fill="url(#dynamicTunicShaderBack)"
                stroke={shader.shade}
                strokeWidth="1.2"
              />
              <rect x="86" y="165" width="68" height="8" rx="2" fill="#C8973E" stroke="#8A631E" strokeWidth="1" />
              <line x1="120" y1="92" x2="120" y2="324" stroke={shader.shade} strokeWidth="1.6" />
            </>
          )
        ) : outfitId === 'ao-nhat-binh' ? (
          /* ÁO NHẬT BÌNH ROYAL BACK VIEW (Rectangular collar wrapping back, Ngũ hành stripes) */
          isFemale ? (
            <>
              <path
                d="M 88 100 C 102 94, 138 94, 152 100 L 146 172 L 142 316 C 128 322, 112 322, 98 316 L 94 172 Z"
                fill="url(#dynamicTunicShaderBack)"
                stroke={shader.shade}
                strokeWidth="1.2"
              />
              {/* Back Rectangular Collar Panel with Gold Embroidery */}
              <rect x="100" y="85" width="40" height="18" rx="2" fill="#C8973E" stroke="#991B1E" strokeWidth="1.2" />
              <line x1="102" y1="89" x2="138" y2="89" stroke="#991B1E" strokeWidth="1.5" />
              <line x1="102" y1="93" x2="138" y2="93" stroke="#2B4A6F" strokeWidth="1.5" />
              <line x1="102" y1="97" x2="138" y2="97" stroke="#315643" strokeWidth="1.5" />
              <line x1="120" y1="103" x2="120" y2="316" stroke={shader.shade} strokeWidth="1.5" />
            </>
          ) : (
            <>
              <path
                d="M 76 96 C 92 88, 148 88, 164 96 L 154 180 L 148 316 C 132 321, 108 321, 92 316 L 86 180 Z"
                fill="url(#dynamicTunicShaderBack)"
                stroke={shader.shade}
                strokeWidth="1.3"
              />
              <rect x="96" y="82" width="48" height="20" rx="2" fill="#C8973E" stroke="#991B1E" strokeWidth="1.2" />
              <line x1="98" y1="86" x2="142" y2="86" stroke="#991B1E" strokeWidth="1.5" />
              <line x1="98" y1="91" x2="142" y2="91" stroke="#2B4A6F" strokeWidth="1.5" />
              <line x1="98" y1="96" x2="142" y2="96" stroke="#315643" strokeWidth="1.5" />
              <line x1="120" y1="102" x2="120" y2="316" stroke={shader.shade} strokeWidth="1.6" />
            </>
          )
        ) : (
          /* ÁO DÀI, ÁO NGŨ THÂN, ÁO TẤC, GIAO LĨNH, VIÊN LĨNH, ĐỐI KHÂM BACK DRAPE */
          isFemale ? (
            <>
              <path
                d="M 90 100 C 102 94, 138 94, 150 100 L 144 172 C 142 195, 142 270, 138 318 C 126 322, 114 322, 102 318 C 98 270, 98 195, 96 172 Z"
                fill="url(#dynamicTunicShaderBack)"
                stroke={shader.shade}
                strokeWidth="1.1"
              />
              {/* Back Collar */}
              <path
                d="M 108 87 Q 120 84 132 87 L 134 97 Q 120 94 106 97 Z"
                fill={shader.primary}
                stroke={shader.accent}
                strokeWidth="1.2"
              />
              {/* Iconic Central Seam (Đường sống lưng trung phùng) */}
              <line x1="120" y1="87" x2="120" y2="318" stroke={shader.shade} strokeWidth="1.4" opacity="0.8" />
              <path d="M 112 180 L 110 314" stroke="#FFFFFF" strokeWidth="2" opacity="0.3" />
            </>
          ) : (
            <>
              <path
                d="M 76 96 C 92 88, 148 88, 164 96 L 154 180 C 152 205, 152 270, 148 316 C 132 321, 108 321, 92 316 C 88 270, 88 205, 86 180 Z"
                fill="url(#dynamicTunicShaderBack)"
                stroke={shader.shade}
                strokeWidth="1.2"
              />
              {/* Back Collar Male */}
              <path d="M 105 82 Q 120 79 135 82 L 136 87 Q 120 85 104 87 Z" fill="#FAF8F5" />
              <path
                d="M 104 84 Q 120 81 136 84 L 137 96 Q 120 94 103 96 Z"
                fill={shader.primary}
                stroke={shader.accent}
                strokeWidth="1.2"
              />
              {/* Central Seam (Đường trung phùng nam) */}
              <line x1="120" y1="84" x2="120" y2="316" stroke={shader.shade} strokeWidth="1.6" opacity="0.85" />
              <path d="M 112 180 L 110 314" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.25" />
            </>
          )
        )}
      </g>

      {/* LAYER 4: BACK HAIR */}
      <g id="back-hair">
        {hasKhanDong ? (
          <g id="back-khan-dong">
            <ellipse cx="120" cy={isFemale ? 38 : 35} rx={isFemale ? 27 : 31} ry="14" fill="#1E1B18" stroke="#D4AF37" strokeWidth="1" />
            <path d={isFemale ? "M 93 38 Q 120 46 147 38" : "M 89 35 Q 120 44 151 35"} stroke="#D4AF37" strokeWidth="1.4" fill="none" />
          </g>
        ) : isFemale ? (
          <g id="back-female-hair">
            {/* Long silk hair cascading down back */}
            <path
              d="M 88 44 C 76 70, 74 120, 82 168 C 96 174, 144 174, 158 168 C 166 120, 164 70, 152 44 Z"
              fill="url(#hairShaderBack)"
            />
            {/* Elegant Hair Bun (Búi tóc sau) */}
            <ellipse cx="120" cy="54" rx="26" ry="16" fill="#1C1410" stroke="#3A2D26" strokeWidth="1" />
            {/* Golden Hairpin (Trâm cài sen vàng) */}
            <line x1="104" y1="52" x2="136" y2="48" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="137" cy="48" r="3.5" fill="#D4AF37" />
            <circle cx="137" cy="48" r="1.5" fill="#FFFFFF" />
          </g>
        ) : (
          <g id="back-male-hair">
            {/* Styled masculine back hairline */}
            <path
              d="M 90 44 C 88 22, 152 22, 150 44 C 146 58, 140 76, 134 82 C 120 84, 106 82, 98 76 C 94 68, 92 56, 90 44 Z"
              fill="url(#hairShaderBack)"
            />
            {/* Clean neck taper */}
            <path d="M 108 80 L 120 84 L 132 80" stroke="#181311" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}
      </g>

      {/* LAYER 5: BACK ACCESSORIES (NÓN QUAI THAO) */}
      {hasNonQuaiThao && (
        <g id="back-non-quai-thao" transform={isFemale ? "translate(144, 160) rotate(-16)" : "translate(156, 154) rotate(-16)"}>
          <ellipse cx="40" cy="40" rx="34" ry="12" fill="#EADCC8" stroke="#B89B77" strokeWidth="1.5" />
          <ellipse cx="40" cy="38" rx="22" ry="7" fill="#DFCCA8" />
          <path d="M 16 44 Q 28 85 36 110" stroke="#991B1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 64 44 Q 52 85 44 110" stroke="#991B1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* LAYER 6: BACK FOOTWEAR */}
      <g id="back-footwear">
        {hasSneakers ? (
          <g id="back-sneakers">
            {isFemale ? (
              <>
                <path d="M 92 328 L 115 328 L 116 339 C 109 342, 92 342, 88 338 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
                <path d="M 125 328 L 148 328 L 152 339 C 148 342, 131 342, 124 338 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
              </>
            ) : (
              <>
                <path d="M 86 328 L 115 328 L 116 339 C 108 342, 86 342, 82 338 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
                <path d="M 125 328 L 154 328 L 158 339 C 154 342, 132 342, 124 338 Z" fill="#FFFFFF" stroke="#D1C3B0" strokeWidth="1" />
              </>
            )}
          </g>
        ) : isFemale ? (
          <g id="back-female-heels">
            <path d="M 95 326 L 113 326 L 115 339 C 109 342, 97 342, 93 338 Z" fill="#FAF8F5" stroke="#D0C4B2" strokeWidth="1" />
            <path d="M 127 326 L 145 326 L 147 339 C 143 342, 131 342, 125 338 Z" fill="#FAF8F5" stroke="#D0C4B2" strokeWidth="1" />
            {/* Heel stems */}
            <rect x="103" y="338" width="3" height="4" fill="#C8973E" />
            <rect x="135" y="338" width="3" height="4" fill="#C8973E" />
          </g>
        ) : (
          <g id="back-male-shoes">
            <path d="M 86 325 L 115 325 L 116 339 C 106 343, 87 343, 83 338 Z" fill="#181512" />
            <path d="M 125 325 L 154 325 L 157 339 C 153 343, 134 343, 124 338 Z" fill="#181512" />
          </g>
        )}
      </g>
    </svg>
  );
};
