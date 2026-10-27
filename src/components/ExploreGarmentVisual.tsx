import React, { useState } from 'react';
import { ExploreVietPhucItem } from '../data/exploreVietPhucData';
import { Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExploreGarmentVisualProps {
  outfit: ExploreVietPhucItem & { collarTag?: string; dynastySeal?: string };
  index: number;
  onInspect?: () => void;
}

/**
 * Museum-Grade Editorial Garment Plate & Lookbook Visual
 * Gives each of the 10+ Viet Phuc / Co Phuc entries a distinct, tailored visual identity
 * showing its exact collar cut, sleeve proportion, and traditional motifs.
 */
export const ExploreGarmentVisual: React.FC<ExploreGarmentVisualProps> = ({
  outfit,
  index,
  onInspect
}) => {
  const { language } = useLanguage();
  const [showPhoto, setShowPhoto] = useState<boolean>(
    // Default to photo for the 4 core modern lookbook items, and bespoke archival plate for the specialized historical garments (with instant 1-click toggle)
    ['ao-dai', 'ao-tu-than', 'ao-ba-ba'].includes(outfit.id)
  );

  const formattedIndex = String(index + 1).padStart(2, '0');

  // Curated heritage background palettes per garment type
  const plateThemes: Record<
    ExploreVietPhucItem['diagramType'],
    {
      bgTop: string;
      bgBottom: string;
      garmentFill: string;
      garmentSecondary: string;
      accent: string;
      collarTag: string;
      dynastySeal: string;
    }
  > = {
    'nhat-binh': {
      bgTop: '#2B1112',
      bgBottom: '#4A181B',
      garmentFill: '#991B1E',
      garmentSecondary: '#F7EFE4',
      accent: '#D4A548',
      collarTag: 'Cổ Nhật Bình (Phương Lĩnh)',
      dynastySeal: 'CUNG ĐÌNH TRIỀU NGUYỄN'
    },
    'ao-tac': {
      bgTop: '#162436',
      bgBottom: '#233952',
      garmentFill: '#1D3B5C',
      garmentSecondary: '#F5EFE6',
      accent: '#C8973E',
      collarTag: 'Cổ Lập Lĩnh · Tay Thụng',
      dynastySeal: 'QUỐC LỄ PHỤC'
    },
    'ngu-than': {
      bgTop: '#2A211B',
      bgBottom: '#42332A',
      garmentFill: '#6E1D20',
      garmentSecondary: '#F6EFE6',
      accent: '#C8973E',
      collarTag: '5 Thân · 5 Khuy · Lập Lĩnh',
      dynastySeal: 'NGŨ THƯỜNG ĐẠO LÝ'
    },
    'tay-chen': {
      bgTop: '#23201E',
      bgBottom: '#38322E',
      garmentFill: '#292524',
      garmentSecondary: '#F5EFE6',
      accent: '#C8973E',
      collarTag: 'Cổ Lập Lĩnh · Tay Chẽn',
      dynastySeal: 'THƯỜNG PHỤC LINH HOẠT'
    },
    'giao-linh': {
      bgTop: '#2F1B15',
      bgBottom: '#4D2B20',
      garmentFill: '#7C2321',
      garmentSecondary: '#E8D8C3',
      accent: '#D4A548',
      collarTag: 'Cổ Giao Lĩnh (Chữ Y)',
      dynastySeal: 'LÝ · TRẦN · LÊ ĐẠI VIỆT'
    },
    'vien-linh': {
      bgTop: '#1C2621',
      bgBottom: '#293B32',
      garmentFill: '#204235',
      garmentSecondary: '#F3ECE0',
      accent: '#D4A548',
      collarTag: 'Cổ Viên Lĩnh · Bổ Tử',
      dynastySeal: 'TRIỀU NGHI ĐẠI VIỆT'
    },
    'doi-kham': {
      bgTop: '#331E22',
      bgBottom: '#522E35',
      garmentFill: '#8A3037',
      garmentSecondary: '#F6EFE4',
      accent: '#D4A548',
      collarTag: 'Trực Lĩnh Đối Khâm',
      dynastySeal: 'ĐA LỚP LAYERING'
    },
    'viet-phuc': {
      bgTop: '#3B1416',
      bgBottom: '#611E21',
      garmentFill: '#991B1E',
      garmentSecondary: '#FAF7F2',
      accent: '#D4A548',
      collarTag: 'Bản Sắc Y Phục Việt',
      dynastySeal: 'CỔ ĐẠI ĐẾN ĐƯƠNG ĐẠI'
    },
    'viet-co-phuc': {
      bgTop: '#261D17',
      bgBottom: '#3D2E24',
      garmentFill: '#5C3A28',
      garmentSecondary: '#F3E9DC',
      accent: '#D4A548',
      collarTag: 'Hệ Thống Cắt Phẳng Cổ Truyền',
      dynastySeal: 'VĂN HIẾN CHI BANG'
    },
    'nguyen-trieu': {
      bgTop: '#33220F',
      bgBottom: '#523718',
      garmentFill: '#B37A22',
      garmentSecondary: '#FAF4E8',
      accent: '#F3C66F',
      collarTag: 'Điển Chế Phú Xuân – Huế',
      dynastySeal: 'NGUYỄN TRIỀU (1802–1945)'
    },
    'ao-dai': {
      bgTop: '#381618',
      bgBottom: '#5E2226',
      garmentFill: '#991B1E',
      garmentSecondary: '#FAF7F2',
      accent: '#C8973E',
      collarTag: 'Lập Lĩnh · Chiết Eo · 2 Tà',
      dynastySeal: 'DI SẢN ĐƯƠNG ĐẠI'
    },
    'tu-than': {
      bgTop: '#362319',
      bgBottom: '#543728',
      garmentFill: '#6E4732',
      garmentSecondary: '#991B1E',
      accent: '#C8973E',
      collarTag: '4 Vạt · Yếm Đào · Dải Lụa',
      dynastySeal: 'DÂN GIAN KINH BẮC'
    },
    'ba-ba': {
      bgTop: '#1F2924',
      bgBottom: '#32423A',
      garmentFill: '#3B5247',
      garmentSecondary: '#F5EFE6',
      accent: '#C8973E',
      collarTag: 'Cổ Tròn · Xẻ Tà · Khăn Rằn',
      dynastySeal: 'PHƯƠNG NAM SÔNG NƯỚC'
    }
  };

  const theme = plateThemes[outfit.diagramType] || plateThemes['ngu-than'];

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[320px] overflow-hidden select-none bg-[#1C1917]">
      {showPhoto ? (
        /* PHOTOGRAPHIC LOOKBOOK VIEW */
        <div
          onClick={onInspect}
          className="relative w-full h-full cursor-pointer group/img"
        >
          <img
            src={outfit.image}
            alt={outfit.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-[#1C1917]/15 to-transparent" />
        </div>
      ) : (
        /* BESPOKE ARCHIVAL ANATOMY PLATE VIEW */
        <div
          onClick={onInspect}
          className="relative w-full h-full flex flex-col items-center justify-center p-5 cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
          style={{
            background: `linear-gradient(160deg, ${theme.bgTop} 0%, ${theme.bgBottom} 100%)`
          }}
        >
          {/* Subtle Archival Silk Grid Frame */}
          <div
            className="pointer-events-none absolute inset-3 rounded-xl border opacity-25"
            style={{ borderColor: theme.accent }}
          />

          {/* Detailed Garment Silhouette SVG Plate */}
          <svg
            viewBox="0 0 240 260"
            className="w-44 h-48 sm:w-48 sm:h-52 drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
            fill="none"
            aria-label={`Minh họa cấu trúc ${outfit.name}`}
          >
            {/* Subtle Golden Halo */}
            <circle
              cx="120"
              cy="126"
              r="86"
              stroke={theme.accent}
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.4"
            />

            {/* 1. ÁO NHẬT BÌNH */}
            {outfit.diagramType === 'nhat-binh' && (
              <g>
                {/* Inner white under-robe & trousers */}
                <path
                  d="M90 205L86 242H116L118 205H122L124 242H154L150 205H90Z"
                  fill={theme.garmentSecondary}
                  opacity="0.92"
                />
                {/* Wide-sleeved Nhat Binh outer robe */}
                <path
                  d="M28 86L84 52H156L212 86L194 150L160 132L168 214H72L80 132L46 150L28 86Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* 5-color Ngũ Hành bands on both sleeves */}
                <path d="M37 118L66 104" stroke="#2E7D32" strokeWidth="3.5" />
                <path d="M40 125L69 111" stroke="#EAB308" strokeWidth="3.5" />
                <path d="M43 132L72 118" stroke="#2563EB" strokeWidth="3.5" />
                <path d="M46 139L75 125" stroke="#FAF7F2" strokeWidth="3.5" />
                <path d="M203 118L174 104" stroke="#2E7D32" strokeWidth="3.5" />
                <path d="M200 125L171 111" stroke="#EAB308" strokeWidth="3.5" />
                <path d="M197 132L168 118" stroke="#2563EB" strokeWidth="3.5" />
                <path d="M194 139L165 125" stroke="#FAF7F2" strokeWidth="3.5" />
                {/* Rectangular Nhật Bình Collar */}
                <rect
                  x="92"
                  y="52"
                  width="56"
                  height="64"
                  fill={theme.garmentSecondary}
                  stroke={theme.accent}
                  strokeWidth="2.5"
                />
                {/* Parallel front opening line & gold cord tie */}
                <line
                  x1="120"
                  y1="52"
                  x2="120"
                  y2="214"
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* Phoenix Roundels (Loan Phượng ổ) */}
                <circle cx="96" cy="148" r="11" stroke={theme.accent} strokeWidth="1.5" />
                <circle cx="144" cy="148" r="11" stroke={theme.accent} strokeWidth="1.5" />
                <circle cx="96" cy="182" r="9" stroke={theme.accent} strokeWidth="1.3" />
                <circle cx="144" cy="182" r="9" stroke={theme.accent} strokeWidth="1.3" />
                {/* Hem Thủy Ba waves */}
                <path
                  d="M73 206Q96 198 120 206Q144 198 167 206"
                  stroke={theme.accent}
                  strokeWidth="2"
                />
              </g>
            )}

            {/* 2. ÁO TẤC (TAY THỤNG) */}
            {outfit.diagramType === 'ao-tac' && (
              <g>
                {/* Wide white trousers */}
                <path
                  d="M92 208L88 242H116L118 208H122L124 242H152L148 208H92Z"
                  fill={theme.garmentSecondary}
                />
                {/* Ceremonial wide-sleeved robe */}
                <path
                  d="M20 88L88 54H152L220 88L204 166L158 140L168 214H72L82 140L36 166L20 88Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* White inner collar rim + Standing Lập Lĩnh collar */}
                <rect
                  x="100"
                  y="39"
                  width="40"
                  height="15"
                  rx="3"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* Center seam (Trung phùng) */}
                <line
                  x1="120"
                  y1="54"
                  x2="120"
                  y2="214"
                  stroke={theme.accent}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.65"
                />
                {/* 5-button right placket */}
                <path
                  d="M120 54L156 96L158 208"
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                <circle cx="122" cy="54" r="3" fill={theme.accent} />
                <circle cx="136" cy="72" r="3" fill={theme.accent} />
                <circle cx="152" cy="92" r="3" fill={theme.accent} />
                <circle cx="156" cy="122" r="3" fill={theme.accent} />
                <circle cx="157" cy="154" r="3" fill={theme.accent} />
              </g>
            )}

            {/* 3. ÁO NGŨ THÂN / 10. CỔ PHỤC NGUYỄN TRIỀU */}
            {(outfit.diagramType === 'ngu-than' ||
              outfit.diagramType === 'nguyen-trieu') && (
              <g>
                {/* Khăn đóng crown silhouette at top */}
                <path
                  d="M98 28C98 18 142 18 142 28L138 35H102L98 28Z"
                  fill="#1C1917"
                  stroke={theme.accent}
                  strokeWidth="1.5"
                />
                <path d="M106 24L120 33L134 24" stroke={theme.accent} strokeWidth="1.4" />
                {/* Trousers */}
                <path
                  d="M92 208L88 242H116L118 208H122L124 242H152L148 208H92Z"
                  fill={theme.garmentSecondary}
                />
                {/* 5-panel robe */}
                <path
                  d="M36 96L88 54H152L204 96L190 144L156 124L166 212H74L84 124L50 144L36 96Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* Standing collar */}
                <rect
                  x="101"
                  y="40"
                  width="38"
                  height="14"
                  rx="2.5"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* Highlighted Trung Phùng center vertical seam + 5 buttons */}
                <line
                  x1="120"
                  y1="54"
                  x2="120"
                  y2="212"
                  stroke={theme.garmentSecondary}
                  strokeWidth="1.3"
                  strokeDasharray="4 3"
                  opacity="0.75"
                />
                <path
                  d="M120 54L154 94L156 196"
                  stroke={theme.accent}
                  strokeWidth="2"
                />
                <circle cx="122" cy="54" r="3" fill={theme.accent} />
                <circle cx="136" cy="70" r="3" fill={theme.accent} />
                <circle cx="151" cy="90" r="3" fill={theme.accent} />
                <circle cx="154" cy="118" r="3" fill={theme.accent} />
                <circle cx="155" cy="148" r="3" fill={theme.accent} />
              </g>
            )}

            {/* 4. ÁO TAY CHẼN */}
            {outfit.diagramType === 'tay-chen' && (
              <g>
                {/* White trousers */}
                <path
                  d="M94 206L90 242H116L118 206H122L124 242H150L146 206H94Z"
                  fill={theme.garmentSecondary}
                />
                {/* Fitted narrow sleeves (Tay chẽn) */}
                <path
                  d="M46 124L90 54H150L194 124L180 133L152 92L162 210H78L88 92L60 133L46 124Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* Inner white collar trim */}
                <rect
                  x="102"
                  y="40"
                  width="36"
                  height="14"
                  rx="2.5"
                  fill={theme.garmentFill}
                  stroke={theme.garmentSecondary}
                  strokeWidth="1.8"
                />
                {/* 5-button placket */}
                <path
                  d="M120 54L150 90V178"
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                <circle cx="121" cy="55" r="2.8" fill={theme.accent} />
                <circle cx="134" cy="70" r="2.8" fill={theme.accent} />
                <circle cx="147" cy="86" r="2.8" fill={theme.accent} />
                <circle cx="150" cy="112" r="2.8" fill={theme.accent} />
                <circle cx="150" cy="138" r="2.8" fill={theme.accent} />
              </g>
            )}

            {/* 5. GIAO LĨNH (CỔ CHÉO CHỮ Y) */}
            {outfit.diagramType === 'giao-linh' && (
              <g>
                {/* Pleated lower skirt (Thường) */}
                <path
                  d="M74 176H166L176 238H64L74 176Z"
                  fill={theme.garmentSecondary}
                  stroke={theme.accent}
                  strokeWidth="1.5"
                />
                <line x1="92" y1="176" x2="86" y2="238" stroke="#8C7A6B" strokeWidth="1" />
                <line x1="110" y1="176" x2="108" y2="238" stroke="#8C7A6B" strokeWidth="1" />
                <line x1="130" y1="176" x2="132" y2="238" stroke="#8C7A6B" strokeWidth="1" />
                <line x1="148" y1="176" x2="154" y2="238" stroke="#8C7A6B" strokeWidth="1" />
                {/* Crossed-collar Giao Linh upper robe */}
                <path
                  d="M24 88L86 50H154L216 88L198 152L160 130L166 184H74L80 130L42 152L24 88Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* Y-shaped Crossed Collar (Left lapel overlapping right) */}
                <path
                  d="M92 50L156 126"
                  stroke={theme.garmentSecondary}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M148 50L120 83"
                  stroke={theme.garmentSecondary}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Waist sash (Đại đới) */}
                <rect
                  x="75"
                  y="134"
                  width="90"
                  height="10"
                  fill={theme.accent}
                />
              </g>
            )}

            {/* 6. VIÊN LĨNH (CỔ TRÒN + BỔ TỬ) */}
            {outfit.diagramType === 'vien-linh' && (
              <g>
                {/* Ceremonial wide-sleeved round-collar robe */}
                <path
                  d="M22 86L86 50H154L218 86L200 158L160 134L168 226H72L80 134L40 158L22 86Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                {/* Round Viên Lĩnh Collar */}
                <path
                  d="M96 50C96 68 144 68 144 50"
                  fill="#1C1917"
                  stroke={theme.accent}
                  strokeWidth="3"
                />
                {/* Side right fastening line */}
                <path
                  d="M144 52L158 88V220"
                  stroke={theme.accent}
                  strokeWidth="1.4"
                  strokeDasharray="3 2"
                />
                {/* Mandarin Square (Bổ Tử) in center chest */}
                <rect
                  x="96"
                  y="82"
                  width="48"
                  height="48"
                  rx="3"
                  fill="#1C1917"
                  stroke={theme.accent}
                  strokeWidth="2.2"
                />
                <circle
                  cx="120"
                  cy="106"
                  r="14"
                  stroke={theme.accent}
                  strokeWidth="1.5"
                />
                {/* Ceremonial Belt (Đai Ngọc) */}
                <rect
                  x="73"
                  y="144"
                  width="94"
                  height="9"
                  rx="2"
                  fill={theme.accent}
                />
              </g>
            )}

            {/* 7. ĐỐI KHÂM / 12. ÁO TỨ THÂN */}
            {(outfit.diagramType === 'doi-kham' ||
              outfit.diagramType === 'tu-than') && (
              <g>
                {/* Inner skirt (Thường / Váy) */}
                <path
                  d="M76 142H164L172 236H68L76 142Z"
                  fill={theme.garmentSecondary}
                  stroke={theme.accent}
                  strokeWidth="1.5"
                />
                {/* Inner Yếm Đào bodice */}
                <polygon
                  points="120,62 144,98 120,136 96,98"
                  fill="#991B1E"
                  stroke={theme.accent}
                  strokeWidth="1.5"
                />
                {/* Parallel open-front Đối Khâm outer robe */}
                <path
                  d="M28 88L86 50H104V216H70L78 128L44 148L28 88Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                <path
                  d="M212 88L154 50H136V216H170L162 128L196 148L212 88Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
              </g>
            )}

            {/* 8. VIỆT PHỤC & 9. VIỆT CỔ PHỤC & 11. ÁO DÀI & 13. ÁO BÀ BA */}
            {(outfit.diagramType === 'viet-phuc' ||
              outfit.diagramType === 'viet-co-phuc' ||
              outfit.diagramType === 'ao-dai' ||
              outfit.diagramType === 'ba-ba') && (
              <g>
                <path
                  d="M92 190L88 240H116L118 190H122L124 240H152L148 190H92Z"
                  fill={theme.garmentSecondary}
                />
                <path
                  d="M36 94L88 52H152L204 94L190 138L154 116L164 212H76L86 116L50 138L36 94Z"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                <rect
                  x="102"
                  y="39"
                  width="36"
                  height="13"
                  rx="2.5"
                  fill={theme.garmentFill}
                  stroke={theme.accent}
                  strokeWidth="1.8"
                />
                <circle
                  cx="120"
                  cy="118"
                  r="22"
                  stroke={theme.accent}
                  strokeWidth="1.6"
                />
                <path
                  d="M120 102L125 113L136 118L125 123L120 134L115 123L104 118L115 113Z"
                  fill={theme.accent}
                />
              </g>
            )}
          </svg>

          {/* Bottom Structural Label inside Plate */}
          <div className="mt-2 text-center">
            <div
              className="text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ color: theme.accent }}
            >
              {language === 'en' && outfit.dynastySeal ? outfit.dynastySeal : theme.dynastySeal}
            </div>
            <div className="text-xs text-[#FAF7F2]/90 font-serif mt-0.5">
              {language === 'en' && outfit.collarTag ? outfit.collarTag : theme.collarTag}
            </div>
          </div>
        </div>
      )}

      {/* Top Left Editorial Index Number */}
      <div className="pointer-events-none absolute top-3.5 left-4 flex items-center gap-2">
        <span className="font-mono text-xs font-semibold text-[#FAF7F2] bg-[#1C1917]/65 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/15">
          {formattedIndex}
        </span>
      </div>

      {/* Top Right View Switcher Button (Plate <-> Photo) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowPhoto((prev) => !prev);
        }}
        className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1C1917]/70 hover:bg-[#991B1E] text-[#FAF7F2] text-[11px] font-medium backdrop-blur-xs border border-white/15 transition-colors cursor-pointer"
        title={
          showPhoto
            ? (language === 'en' ? 'View structural costume diagram' : 'Xem bản vẽ cấu trúc cổ phục')
            : (language === 'en' ? 'View real lookbook photo' : 'Xem ảnh thực tế Lookbook')
        }
      >
        {showPhoto ? (
          <>
            <Sparkles className="w-3 h-3 text-[#D4A548]" />
            <span>{language === 'en' ? 'Diagram' : 'Bản vẽ cấu trúc'}</span>
          </>
        ) : (
          <>
            <Eye className="w-3 h-3 text-[#D4A548]" />
            <span>{language === 'en' ? 'Lookbook' : 'Ảnh mẫu'}</span>
          </>
        )}
      </button>
    </div>
  );
};
