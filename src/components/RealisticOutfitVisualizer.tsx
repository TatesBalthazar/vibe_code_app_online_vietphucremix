import React, { useRef, useEffect } from 'react';
import { OutfitId, ColorId, SkinToneId, OccasionId, StyleId } from '../types';
import { COLORS_DATA } from '../data/colors';

// Color adjustment helpers
function lighten(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, ((num >> 16) & 0xff) + amt);
  const G = Math.min(255, ((num >> 8) & 0xff) + amt);
  const B = Math.min(255, (num & 0xff) + amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

function darken(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, ((num >> 16) & 0xff) - amt);
  const G = Math.max(0, ((num >> 8) & 0xff) - amt);
  const B = Math.max(0, (num & 0xff) - amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

export type AIPhotoStyle = 'editorial-studio' | 'cinematic-heritage' | 'magazine-cover' | 'couture-sketch';

export interface RealisticOutfitVisualizerProps {
  gender: 'female' | 'male';
  skinTone?: SkinToneId;
  outfitId: OutfitId;
  colorId: ColorId;
  occasionId?: OccasionId;
  styleId?: StyleId;
  accessories?: string[];
  photoStyle?: AIPhotoStyle;
  lookTitle?: string;
  className?: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

// Generate photorealistic prompt description based on outfit configuration
export function generateAIFashionPrompt(params: {
  gender: 'female' | 'male';
  skinTone?: SkinToneId;
  outfitId: OutfitId;
  colorId: ColorId;
  occasionId?: OccasionId;
  styleId?: StyleId;
  accessories?: string[];
  photoStyle?: AIPhotoStyle;
}): string {
  const { gender, skinTone = 'neutral', outfitId, colorId, occasionId = 'festival', styleId = 'modern', accessories = [], photoStyle = 'editorial-studio' } = params;

  const outfitMap: Record<OutfitId, string> = {
    'ao-dai': 'modern tailored Vietnamese Ao Dai with delicate high mandarin collar and graceful flowing silk panels',
    'ao-tu-than': 'traditional Northern Vietnamese Ao Tu Than (four-panel tunic) with silk yem bodice and contrasting waist sash',
    'ao-ngu-than': 'aristocratic five-panel Vietnamese Ao Ngu Than robe with crisp standing collar and noble drape',
    'ao-ba-ba': 'authentic Southern Vietnamese Ao Ba Ba silk blouse with mother-of-pearl buttons and curved hemline',
    'ao-nhat-binh': 'imperial Nguyen Dynasty Ao Nhat Binh royal court tunic featuring iconic wide rectangular embroidered collar with five-element rainbow ribbon borders and gold dragon thread',
    'ao-tac': 'ceremonial Ao Tac with sweeping wide floating sleeves (tay thung) and stately silk fabric',
    'ao-tay-chen': 'refined Ao Tay Chen with elegant fitted cuffs and minimalist silhouette',
    'giao-linh': 'early Le Dynasty cross-collar robe (Ao Giao Linh) with overlapping V-lapel and silk inner lining',
    'vien-linh': 'historical round-collar Vietnamese robe (Ao Vien Linh) with imperial medallion',
    'doi-kham': 'symmetrical open-lapel robe (Ao Doi Kham) with long vertical front bands'
  };

  const colorMap: Record<ColorId, string> = {
    red: 'crimson lacquer red (#A3262A) premium mulberry silk',
    burgundy: 'rich imperial burgundy wine (#5E1B24) damask silk with subtle jacquard sheen',
    cream: 'pristine ivory raw silk (#F5EFE6) with natural texture and subtle golden reflections',
    yellow: 'royal imperial golden honey yellow (#C8973E) silk brocade',
    blue: 'deep indigo night blue (#2B4A6F) silk satin',
    green: 'emerald jade forest green (#315643) silk crepe',
    black: 'noble charcoal obsidian black (#1E1B18) silk with subtle luster',
    pastel: 'delicate lotus blossom pastel pink (#E8C5C8) organza silk'
  };

  const skinMap: Record<SkinToneId, string> = {
    fair: 'fair radiant porcelain skin tone',
    neutral: 'natural glowing warm beige Vietnamese skin tone',
    warm: 'warm golden honey Asian skin tone',
    tan: 'sun-kissed bronze tan complexion'
  };

  const accessoryDescriptions = accessories.map((acc) => {
    if (acc.includes('khan-dong')) return 'hand-pleated traditional silk head turban (Khan Dong)';
    if (acc.includes('kieng-bac') || acc.includes('vong-kieng')) return 'sculpted solid sterling silver torque collar necklace (Kieng Bac)';
    if (acc.includes('ngoc-trai') || acc.includes('chuoi-ngoc')) return 'luminous Akoya natural pearl strand necklace';
    if (acc.includes('non-quai-thao')) return 'authentic woven palm-leaf Non Quai Thao flat hat with dangling crimson silk ribbons';
    if (acc.includes('sneakers')) return 'clean minimalist contemporary sneakers creating a high-fashion streetwear contrast';
    if (acc.includes('sandal')) return 'slender traditional cord strap sandals';
    return acc;
  });

  const styleContext = photoStyle === 'cinematic-heritage'
    ? 'shot on location in an atmospheric Hue Imperial Citadel courtyard with ancient brick walls, diffused afternoon golden light, cinematic 35mm film still'
    : photoStyle === 'magazine-cover'
    ? 'high-fashion magazine editorial cover photography, bold minimalist framing, top lighting, luxury Vogue Vietnam aesthetic'
    : photoStyle === 'couture-sketch'
    ? 'haute couture fashion design illustration, delicate ink outlines, watercolor silk wash, golden leaf foil accents, artistic museum sketchbook'
    : 'shot in a high-end minimalist architectural studio, softbox key lighting with warm rim light on silk edges, clean aesthetic backdrop';

  const modelDesc = gender === 'female'
    ? `An elegant 24-year-old Vietnamese female model with ${skinMap[skinTone]}, serene poised expression, neat traditional hair bun adorned with a gold lotus hairpin`
    : `A dignified handsome 25-year-old Vietnamese male model with ${skinMap[skinTone]}, intellectual noble posture, neatly groomed classic haircut`;

  const accText = accessoryDescriptions.length > 0 ? `, accessorized with ${accessoryDescriptions.join(', ')}` : '';

  return `High-end editorial fashion photography of ${modelDesc}, wearing ${outfitMap[outfitId] || 'Vietnamese heritage garment'} crafted from ${colorMap[colorId] || 'silk'}${accText}. ${styleContext}, photorealistic, Hasselblad H6D-100c medium format, 85mm f/1.4 lens, 8k resolution, impeccable cultural authenticity.`;
}

export const RealisticOutfitVisualizer: React.FC<RealisticOutfitVisualizerProps> = ({
  gender = 'female',
  skinTone = 'neutral',
  outfitId = 'ao-dai',
  colorId = 'cream',
  occasionId = 'festival',
  styleId = 'modern',
  accessories = [],
  photoStyle = 'editorial-studio',
  lookTitle,
  className = '',
  onCanvasReady
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isFemale = gender === 'female';
  const norm = (s: string) =>
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const hasKhanDong = accessories.some((a) => {
    const n = norm(a);
    return n.includes('khan-dong') || n.includes('khan dong');
  });
  const hasKiengBac = accessories.some((a) => {
    const n = norm(a);
    return (
      n.includes('kieng-bac') ||
      n.includes('vong-kieng') ||
      n.includes('kieng') ||
      n.includes('vong kieng')
    );
  });
  const hasNgocTrai = accessories.some((a) => {
    const n = norm(a);
    return (
      n.includes('ngoc-trai') ||
      n.includes('chuoi-ngoc') ||
      n.includes('ngoc trai') ||
      n.includes('chuoi ngoc')
    );
  });
  const hasNonQuaiThao = accessories.some((a) => {
    const n = norm(a);
    return n.includes('non-quai-thao') || n.includes('quai thao');
  });

  // Color values
  const activeColorObj = COLORS_DATA.find((c) => c.id === colorId) || COLORS_DATA[0];
  const primaryHex = activeColorObj.hex;

  // Skin tone hexes
  const skinColors = {
    fair: { highlight: '#FFF5EC', mid: '#FDE1CC', shadow: '#E2B192', blush: '#F87171' },
    neutral: { highlight: '#FFEBD9', mid: '#F5CCA8', shadow: '#D69B73', blush: '#E88D84' },
    warm: { highlight: '#FDE5CB', mid: '#ECC091', shadow: '#C88D56', blush: '#EA580C' },
    tan: { highlight: '#E5BD92', mid: '#C6946A', shadow: '#965E37', blush: '#B45309' }
  }[skinTone] || { highlight: '#FFEBD9', mid: '#F5CCA8', shadow: '#D69B73', blush: '#E88D84' };

  // Render high-res realistic editorial canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution: 800 x 1000 (aspect 4:5)
    const W = 800;
    const H = 1000;
    canvas.width = W;
    canvas.height = H;

    // -------------------------------------------------------------
    // 1. BACKGROUND RENDER BASED ON PHOTO STYLE
    // -------------------------------------------------------------
    if (photoStyle === 'cinematic-heritage') {
      // Atmospheric courtyard gradient with warm sunlight & vignette
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#2D1B18');
      bgGrad.addColorStop(0.35, '#482B24');
      bgGrad.addColorStop(0.7, '#241714');
      bgGrad.addColorStop(1, '#150E0C');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Ancient architecture silhouette / golden bokeh
      const sunBeam = ctx.createRadialGradient(W * 0.75, H * 0.2, 50, W * 0.75, H * 0.2, 500);
      sunBeam.addColorStop(0, 'rgba(234, 179, 8, 0.25)');
      sunBeam.addColorStop(0.5, 'rgba(194, 65, 12, 0.12)');
      sunBeam.addColorStop(1, 'transparent');
      ctx.fillStyle = sunBeam;
      ctx.fillRect(0, 0, W, H);
    } else if (photoStyle === 'magazine-cover') {
      // Luxury editorial studio with bold contrast
      const bgGrad = ctx.createRadialGradient(W * 0.5, H * 0.45, 100, W * 0.5, H * 0.45, 650);
      bgGrad.addColorStop(0, '#ECE4D8');
      bgGrad.addColorStop(0.6, '#D6C6B0');
      bgGrad.addColorStop(1, '#9C8872');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);
    } else if (photoStyle === 'couture-sketch') {
      // Hand-made parchment paper with soft vignette
      const bgGrad = ctx.createRadialGradient(W * 0.5, H * 0.5, 200, W * 0.5, H * 0.5, 600);
      bgGrad.addColorStop(0, '#FAF6EE');
      bgGrad.addColorStop(0.7, '#F2E8D8');
      bgGrad.addColorStop(1, '#DECBB2');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle grid watermark
      ctx.strokeStyle = 'rgba(180, 150, 110, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 40; x < W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
    } else {
      // Default: Editorial Studio (warm aesthetic studio gradient with rim spotlight)
      const bgGrad = ctx.createRadialGradient(W * 0.5, H * 0.4, 80, W * 0.5, H * 0.5, 580);
      bgGrad.addColorStop(0, '#F9F5ED');
      bgGrad.addColorStop(0.5, '#EFE4D2');
      bgGrad.addColorStop(1, '#D8C7AF');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Soft rim glow
      const rimGlow = ctx.createLinearGradient(0, H, W, 0);
      rimGlow.addColorStop(0, 'rgba(200, 151, 62, 0.15)');
      rimGlow.addColorStop(1, 'rgba(153, 27, 30, 0.08)');
      ctx.fillStyle = rimGlow;
      ctx.fillRect(0, 0, W, H);
    }

    // -------------------------------------------------------------
    // 2. MODEL SILHOUETTE & REALISTIC SHADING
    // -------------------------------------------------------------
    ctx.save();

    // Studio ground shadow
    const groundShadow = ctx.createRadialGradient(W * 0.5, H * 0.94, 20, W * 0.5, H * 0.94, 240);
    groundShadow.addColorStop(0, 'rgba(28, 25, 23, 0.45)');
    groundShadow.addColorStop(0.6, 'rgba(28, 25, 23, 0.18)');
    groundShadow.addColorStop(1, 'transparent');
    ctx.fillStyle = groundShadow;
    ctx.beginPath();
    ctx.ellipse(W * 0.5, H * 0.93, 220, 36, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fabric Gradient generator
    const getFabricGradient = (x1: number, y1: number, x2: number, y2: number) => {
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, lighten(primaryHex, 24));
      grad.addColorStop(0.3, primaryHex);
      grad.addColorStop(0.7, darken(primaryHex, 18));
      grad.addColorStop(1, darken(primaryHex, 36));
      return grad;
    };

    // Body proportions
    const centerX = W * 0.5;

    // --- LEGS & SILK TROUSERS ---
    const pantsGrad = ctx.createLinearGradient(centerX - 100, 480, centerX + 100, 880);
    pantsGrad.addColorStop(0, '#FFFDF9');
    pantsGrad.addColorStop(0.4, '#F3ECE0');
    pantsGrad.addColorStop(0.8, '#DED3C1');
    pantsGrad.addColorStop(1, '#C6B8A2');
    ctx.fillStyle = pantsGrad;

    // Left pant leg
    ctx.beginPath();
    ctx.moveTo(centerX - 90, 520);
    ctx.lineTo(centerX - 15, 520);
    ctx.lineTo(centerX - 25, 880);
    ctx.bezierCurveTo(centerX - 60, 892, centerX - 100, 892, centerX - 120, 880);
    ctx.closePath();
    ctx.fill();

    // Right pant leg
    ctx.beginPath();
    ctx.moveTo(centerX + 15, 520);
    ctx.lineTo(centerX + 90, 520);
    ctx.lineTo(centerX + 120, 880);
    ctx.bezierCurveTo(centerX + 100, 892, centerX + 60, 892, centerX + 25, 880);
    ctx.closePath();
    ctx.fill();

    // Pant silk crease shadows
    ctx.strokeStyle = 'rgba(160, 140, 120, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 70, 560);
    ctx.lineTo(centerX - 80, 870);
    ctx.moveTo(centerX + 70, 560);
    ctx.lineTo(centerX + 80, 870);
    ctx.stroke();

    // --- SHOES ---
    ctx.fillStyle = isFemale ? '#FAF8F5' : '#181512';
    ctx.beginPath();
    ctx.roundRect(centerX - 110, 872, 70, 24, 8);
    ctx.roundRect(centerX + 40, 872, 70, 24, 8);
    ctx.fill();
    ctx.strokeStyle = '#C8973E';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // --- MAIN OUTFIT BODY & TUNIC (TAILORED FOR ALL 10 VIETNAMESE GARMENTS) ---
    const tunicGrad = getFabricGradient(centerX - 140, 240, centerX + 140, 840);
    ctx.fillStyle = tunicGrad;
    ctx.shadowColor = 'rgba(28, 25, 23, 0.22)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 10;

    if (outfitId === 'ao-tu-than') {
      // -------------------------------------------------------------
      // ÁO TỨ THÂN KINH BẮC (4 PANELS, TIED SASH & EXPOSED YẾM)
      // -------------------------------------------------------------
      // 1. Inner Yếm (Silk Halter Bodice)
      const yemGrad = ctx.createLinearGradient(centerX - 40, 260, centerX + 40, 420);
      yemGrad.addColorStop(0, '#FB7185'); // Lotus peach pink
      yemGrad.addColorStop(1, '#BE123C'); // Deep rose
      ctx.fillStyle = yemGrad;
      ctx.beginPath();
      ctx.moveTo(centerX, 250);
      ctx.lineTo(centerX + 48, 320);
      ctx.lineTo(centerX + 38, 420);
      ctx.lineTo(centerX - 38, 420);
      ctx.lineTo(centerX - 48, 320);
      ctx.closePath();
      ctx.fill();

      // Yếm neck string
      ctx.strokeStyle = '#BE123C';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(centerX - 14, 250);
      ctx.lineTo(centerX - 24, 210);
      ctx.moveTo(centerX + 14, 250);
      ctx.lineTo(centerX + 24, 210);
      ctx.stroke();

      // 2. Outer 4-Panel Robe (Left & Right open panels)
      ctx.fillStyle = tunicGrad;
      // Left panel
      ctx.beginPath();
      ctx.moveTo(centerX - 95, 270);
      ctx.bezierCurveTo(centerX - 70, 252, centerX - 25, 252, centerX - 18, 270);
      ctx.lineTo(centerX - 32, 420);
      ctx.lineTo(centerX - 75, 420);
      ctx.closePath();
      ctx.fill();

      // Right panel
      ctx.beginPath();
      ctx.moveTo(centerX + 95, 270);
      ctx.bezierCurveTo(centerX + 70, 252, centerX + 25, 252, centerX + 18, 270);
      ctx.lineTo(centerX + 32, 420);
      ctx.lineTo(centerX + 75, 420);
      ctx.closePath();
      ctx.fill();

      // Back lower panels flowing
      ctx.beginPath();
      ctx.moveTo(centerX - 75, 420);
      ctx.lineTo(centerX - 82, 820);
      ctx.bezierCurveTo(centerX - 40, 835, centerX + 40, 835, centerX + 82, 820);
      ctx.lineTo(centerX + 75, 420);
      ctx.closePath();
      ctx.fill();

      // Tied front flaps at waist (Dải buộc vạt trước)
      ctx.fillStyle = tunicGrad;
      ctx.beginPath();
      ctx.ellipse(centerX, 425, 22, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      // Flowing tied ribbon sash
      ctx.beginPath();
      ctx.moveTo(centerX - 12, 430);
      ctx.bezierCurveTo(centerX - 28, 480, centerX - 35, 540, centerX - 42, 600);
      ctx.lineTo(centerX - 24, 605);
      ctx.bezierCurveTo(centerX - 16, 545, centerX - 6, 485, centerX, 435);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX + 12, 430);
      ctx.bezierCurveTo(centerX + 28, 480, centerX + 35, 540, centerX + 42, 600);
      ctx.lineTo(centerX + 24, 605);
      ctx.bezierCurveTo(centerX + 16, 545, centerX + 6, 485, centerX, 435);
      ctx.closePath();
      ctx.fill();

      // Colorful silk belt (Ruột tượng ngũ sắc)
      ctx.fillStyle = '#C8973E';
      ctx.fillRect(centerX - 68, 412, 136, 12);

      // Sleeves
      ctx.fillStyle = tunicGrad;
      ctx.beginPath();
      ctx.moveTo(centerX - 95, 270);
      ctx.bezierCurveTo(centerX - 120, 340, centerX - 142, 420, centerX - 156, 520);
      ctx.lineTo(centerX - 128, 525);
      ctx.bezierCurveTo(centerX - 115, 435, centerX - 92, 360, centerX - 75, 290);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX + 95, 270);
      ctx.bezierCurveTo(centerX + 120, 340, centerX + 142, 420, centerX + 156, 520);
      ctx.lineTo(centerX + 128, 525);
      ctx.bezierCurveTo(centerX + 115, 435, centerX + 92, 360, centerX + 75, 290);
      ctx.closePath();
      ctx.fill();
    } else if (outfitId === 'ao-ba-ba') {
      // -------------------------------------------------------------
      // ÁO BÀ BA NAM BỘ (CURVED HEM, CENTER BUTTONS & 2 PATCH POCKETS)
      // -------------------------------------------------------------
      ctx.beginPath();
      ctx.moveTo(centerX - 105, 265);
      ctx.bezierCurveTo(centerX - 60, 250, centerX + 60, 250, centerX + 105, 265);
      ctx.lineTo(centerX + 85, 420);
      // Curved scalloped hemline ending at mid-thigh
      ctx.bezierCurveTo(centerX + 85, 580, centerX + 50, 610, centerX, 615);
      ctx.bezierCurveTo(centerX - 50, 610, centerX - 85, 580, centerX - 85, 420);
      ctx.closePath();
      ctx.fill();

      // Center front button placket
      ctx.strokeStyle = darken(primaryHex, 20);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, 255);
      ctx.lineTo(centerX, 615);
      ctx.stroke();

      // Mother-of-pearl buttons
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1;
      for (let by = 280; by <= 580; by += 48) {
        ctx.beginPath();
        ctx.arc(centerX, by, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // 2 Front Patch Pockets (Túi đắp vuông vức)
      ctx.strokeStyle = darken(primaryHex, 25);
      ctx.lineWidth = 2;
      ctx.fillStyle = lighten(primaryHex, 8);
      // Left pocket
      ctx.beginPath();
      ctx.roundRect(centerX - 72, 510, 32, 36, 4);
      ctx.fill();
      ctx.stroke();
      // Right pocket
      ctx.beginPath();
      ctx.roundRect(centerX + 40, 510, 32, 36, 4);
      ctx.fill();
      ctx.stroke();

      // Sleeves
      ctx.fillStyle = tunicGrad;
      ctx.beginPath();
      ctx.moveTo(centerX - 105, 265);
      ctx.bezierCurveTo(centerX - 125, 335, centerX - 145, 410, centerX - 156, 500);
      ctx.lineTo(centerX - 130, 505);
      ctx.bezierCurveTo(centerX - 120, 425, centerX - 100, 355, centerX - 85, 285);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX + 105, 265);
      ctx.bezierCurveTo(centerX + 125, 335, centerX + 145, 410, centerX + 156, 500);
      ctx.lineTo(centerX + 130, 505);
      ctx.bezierCurveTo(centerX + 120, 425, centerX + 100, 355, centerX + 85, 285);
      ctx.closePath();
      ctx.fill();
    } else if (outfitId === 'ao-nhat-binh') {
      // -------------------------------------------------------------
      // ÁO NHẬT BÌNH CUNG ĐÌNH (RECTANGULAR EMBROIDERED COLLAR & NGŨ SẮC CUFFS)
      // -------------------------------------------------------------
      ctx.beginPath();
      ctx.moveTo(centerX - 120, 260);
      ctx.bezierCurveTo(centerX - 60, 245, centerX + 60, 245, centerX + 120, 260);
      ctx.lineTo(centerX + 100, 480);
      ctx.lineTo(centerX + 95, 835);
      ctx.bezierCurveTo(centerX + 45, 846, centerX - 45, 846, centerX - 95, 835);
      ctx.lineTo(centerX - 100, 480);
      ctx.closePath();
      ctx.fill();

      // Sleeves
      ctx.beginPath();
      ctx.moveTo(centerX - 120, 260);
      ctx.bezierCurveTo(centerX - 145, 340, centerX - 165, 430, centerX - 175, 520);
      ctx.lineTo(centerX - 135, 525);
      ctx.bezierCurveTo(centerX - 125, 440, centerX - 110, 360, centerX - 95, 280);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX + 120, 260);
      ctx.bezierCurveTo(centerX + 145, 340, centerX + 165, 430, centerX + 175, 520);
      ctx.lineTo(centerX + 135, 525);
      ctx.bezierCurveTo(centerX + 125, 440, centerX + 110, 360, centerX + 95, 280);
      ctx.closePath();
      ctx.fill();

      // Iconic Rectangular Embroidered Chest Collar (Khung Thêu Nhật Bình)
      ctx.fillStyle = '#C8973E';
      ctx.fillRect(centerX - 45, 245, 90, 160);
      ctx.fillStyle = '#991B1E';
      ctx.fillRect(centerX - 38, 252, 76, 146);
      // Gold thread embroidered motifs inside
      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, 320, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(centerX - 18, 320);
      ctx.lineTo(centerX + 18, 320);
      ctx.moveTo(centerX, 302);
      ctx.lineTo(centerX, 338);
      ctx.stroke();

      // Ngũ Sắc Rainbow Stripes at Cuffs (Vàng, Xanh, Trắng, Đỏ, Tím)
      const cuffColors = ['#EAB308', '#22C55E', '#FFFFFF', '#EF4444', '#8B5CF6'];
      cuffColors.forEach((col, idx) => {
        ctx.fillStyle = col;
        // Left cuff stripe
        ctx.fillRect(centerX - 170 + idx * 7, 510, 6, 16);
        // Right cuff stripe
        ctx.fillRect(centerX + 140 + idx * 7, 510, 6, 16);
      });
    } else if (outfitId === 'ao-tac') {
      // -------------------------------------------------------------
      // ÁO TẤC TAY THỤNG (WIDE BILLOWING CEREMONIAL SLEEVES)
      // -------------------------------------------------------------
      // Extra Wide Tay Thụng Sleeves
      ctx.fillStyle = tunicGrad;
      // Left wide tay thụng
      ctx.beginPath();
      ctx.moveTo(centerX - 120, 260);
      ctx.bezierCurveTo(centerX - 160, 330, centerX - 210, 420, centerX - 225, 560);
      ctx.bezierCurveTo(centerX - 190, 585, centerX - 140, 570, centerX - 120, 530);
      ctx.bezierCurveTo(centerX - 110, 450, centerX - 95, 360, centerX - 85, 280);
      ctx.closePath();
      ctx.fill();

      // Right wide tay thụng
      ctx.beginPath();
      ctx.moveTo(centerX + 120, 260);
      ctx.bezierCurveTo(centerX + 160, 330, centerX + 210, 420, centerX + 225, 560);
      ctx.bezierCurveTo(centerX + 190, 585, centerX + 140, 570, centerX + 120, 530);
      ctx.bezierCurveTo(centerX + 110, 450, centerX + 95, 360, centerX + 85, 280);
      ctx.closePath();
      ctx.fill();

      // Long formal stately robe body
      ctx.beginPath();
      ctx.moveTo(centerX - 120, 260);
      ctx.bezierCurveTo(centerX - 60, 242, centerX + 60, 242, centerX + 120, 260);
      ctx.lineTo(centerX + 115, 480);
      ctx.lineTo(centerX + 110, 845);
      ctx.bezierCurveTo(centerX + 55, 856, centerX - 55, 856, centerX - 110, 845);
      ctx.lineTo(centerX - 115, 480);
      ctx.closePath();
      ctx.fill();
    } else {
      // -------------------------------------------------------------
      // ÁO DÀI / ÁO NGŨ THÂN / GIAO LĨNH / ĐỐI KHÂM / VIÊN LĨNH
      // -------------------------------------------------------------
      if (isFemale) {
        // Female Elegant Silhouette (Fitted waist, flowing tà flaps)
        ctx.beginPath();
        ctx.moveTo(centerX - 95, 270);
        ctx.bezierCurveTo(centerX - 50, 252, centerX + 50, 252, centerX + 95, 270);
        ctx.bezierCurveTo(centerX + 76, 350, centerX + 68, 420, centerX + 74, 470);
        ctx.lineTo(centerX + 85, 835);
        ctx.bezierCurveTo(centerX + 40, 848, centerX - 40, 848, centerX - 85, 835);
        ctx.lineTo(centerX - 74, 470);
        ctx.bezierCurveTo(centerX - 68, 420, centerX - 76, 350, centerX - 95, 270);
        ctx.closePath();
        ctx.fill();

        // Sleeves
        ctx.beginPath();
        ctx.moveTo(centerX - 95, 270);
        ctx.bezierCurveTo(centerX - 120, 340, centerX - 142, 420, centerX - 156, 520);
        ctx.lineTo(centerX - 128, 525);
        ctx.bezierCurveTo(centerX - 115, 435, centerX - 92, 360, centerX - 75, 290);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(centerX + 95, 270);
        ctx.bezierCurveTo(centerX + 120, 340, centerX + 142, 420, centerX + 156, 520);
        ctx.lineTo(centerX + 128, 525);
        ctx.bezierCurveTo(centerX + 115, 435, centerX + 92, 360, centerX + 75, 290);
        ctx.closePath();
        ctx.fill();
      } else {
        // Male Stately Silhouette (Broad shoulders, authoritative drape)
        ctx.beginPath();
        ctx.moveTo(centerX - 130, 260);
        ctx.bezierCurveTo(centerX - 70, 240, centerX + 70, 240, centerX + 130, 260);
        ctx.lineTo(centerX + 110, 480);
        ctx.lineTo(centerX + 105, 835);
        ctx.bezierCurveTo(centerX + 50, 846, centerX - 50, 846, centerX - 105, 835);
        ctx.lineTo(centerX - 110, 480);
        ctx.closePath();
        ctx.fill();

        // Male sleeves
        ctx.beginPath();
        ctx.moveTo(centerX - 130, 260);
        ctx.bezierCurveTo(centerX - 150, 340, centerX - 165, 430, centerX - 175, 525);
        ctx.lineTo(centerX - 145, 530);
        ctx.bezierCurveTo(centerX - 135, 445, centerX - 118, 365, centerX - 105, 280);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(centerX + 130, 260);
        ctx.bezierCurveTo(centerX + 150, 340, centerX + 165, 430, centerX + 175, 525);
        ctx.lineTo(centerX + 145, 530);
        ctx.bezierCurveTo(centerX + 135, 445, centerX + 118, 365, centerX + 105, 280);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Central silk fold & sheen highlight
    const silkSheen = ctx.createLinearGradient(centerX - 25, 270, centerX + 35, 830);
    silkSheen.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    silkSheen.addColorStop(0.3, 'rgba(255, 255, 255, 0.15)');
    silkSheen.addColorStop(0.7, 'rgba(255, 255, 255, 0.35)');
    silkSheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = silkSheen;
    ctx.beginPath();
    ctx.ellipse(centerX - 10, 520, 20, 280, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Traditional Collar Tailored for Specific Garment
    if (outfitId === 'giao-linh') {
      // Cross-collar Giao Lĩnh (V-neck lapels left over right)
      ctx.fillStyle = '#FFFFFF'; // Inner white lining
      ctx.beginPath();
      ctx.moveTo(centerX - 35, 230);
      ctx.lineTo(centerX + 35, 230);
      ctx.lineTo(centerX, 290);
      ctx.closePath();
      ctx.fill();

      // Overlapping outer lapel (Left over right)
      ctx.strokeStyle = primaryHex;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(centerX - 48, 235);
      ctx.lineTo(centerX + 36, 310);
      ctx.stroke();

      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (outfitId === 'vien-linh') {
      // Circular Round Collar Viên Lĩnh with Imperial Rank Crest (Bổ tử)
      ctx.fillStyle = primaryHex;
      ctx.beginPath();
      ctx.arc(centerX, 240, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Imperial Chest Rank Crest (Bổ tử vuông/tròn đính ngực)
      ctx.fillStyle = '#C8973E';
      ctx.fillRect(centerX - 34, 305, 68, 68);
      ctx.fillStyle = '#991B1E';
      ctx.fillRect(centerX - 28, 311, 56, 56);
      // Lotus / dragon crest center
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.arc(centerX, 339, 16, 0, Math.PI * 2);
      ctx.fill();
    } else if (outfitId === 'doi-kham') {
      // Đối Khâm (Parallel vertical open collar bands)
      ctx.strokeStyle = '#C8973E';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(centerX - 22, 235);
      ctx.lineTo(centerX - 22, 420);
      ctx.moveTo(centerX + 22, 235);
      ctx.lineTo(centerX + 22, 420);
      ctx.stroke();
    } else if (outfitId !== 'ao-ba-ba' && outfitId !== 'ao-tu-than' && outfitId !== 'ao-nhat-binh') {
      // Classic Standing Collar (Lập Lĩnh) & 5 Buttons
      ctx.fillStyle = primaryHex;
      ctx.beginPath();
      ctx.roundRect(centerX - 35, 225, 70, 38, 12);
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Inner collar crisp white lining
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(centerX - 28, 222, 56, 12, 6);
      ctx.fill();

      // Traditional gold buttons down diagonal chest line (5 buttons for Ngũ Thường)
      ctx.fillStyle = '#E5C068';
      ctx.strokeStyle = '#8A631E';
      ctx.lineWidth = 1;
      const buttonPoints = isFemale
        ? [[centerX + 5, 258], [centerX + 26, 278], [centerX + 42, 310], [centerX + 52, 350], [centerX + 58, 395]]
        : [[centerX + 8, 258], [centerX + 32, 282], [centerX + 55, 315], [centerX + 62, 360], [centerX + 65, 410]];
      buttonPoints.forEach(([bx, by]) => {
        ctx.beginPath();
        ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    }

    // --- NECK & FACE ---
    // Neck
    ctx.fillStyle = skinColors.mid;
    ctx.beginPath();
    ctx.roundRect(centerX - 24, 185, 48, 55, 14);
    ctx.fill();

    // Neck shadow under chin
    ctx.fillStyle = skinColors.shadow;
    ctx.beginPath();
    ctx.ellipse(centerX, 202, 22, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Face oval
    const faceGrad = ctx.createRadialGradient(centerX - 10, 140, 10, centerX, 150, 70);
    faceGrad.addColorStop(0, skinColors.highlight);
    faceGrad.addColorStop(0.65, skinColors.mid);
    faceGrad.addColorStop(1, skinColors.shadow);
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.ellipse(centerX, 150, isFemale ? 54 : 58, isFemale ? 68 : 72, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cheeks soft blush
    ctx.fillStyle = skinColors.blush;
    ctx.globalAlpha = isFemale ? 0.35 : 0.18;
    ctx.beginPath();
    ctx.ellipse(centerX - 28, 160, 16, 10, -0.1, 0, Math.PI * 2);
    ctx.ellipse(centerX + 28, 160, 16, 10, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Eyebrows
    ctx.strokeStyle = '#281C16';
    ctx.lineWidth = isFemale ? 2.5 : 3.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(centerX - 40, 134);
    ctx.quadraticCurveTo(centerX - 24, 126, centerX - 10, 133);
    ctx.moveTo(centerX + 10, 133);
    ctx.quadraticCurveTo(centerX + 24, 126, centerX + 40, 134);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(centerX - 25, 145, 10, 6.5, 0, 0, Math.PI * 2);
    ctx.ellipse(centerX + 25, 145, 10, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Irises
    ctx.fillStyle = '#22150F';
    ctx.beginPath();
    ctx.arc(centerX - 24, 145, 4.8, 0, Math.PI * 2);
    ctx.arc(centerX + 26, 145, 4.8, 0, Math.PI * 2);
    ctx.fill();

    // Eye catchlights (realistic sparkle)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX - 22, 143, 1.8, 0, Math.PI * 2);
    ctx.arc(centerX + 28, 143, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Eyelids
    ctx.strokeStyle = '#1F1510';
    ctx.lineWidth = isFemale ? 2.8 : 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 35, 144);
    ctx.quadraticCurveTo(centerX - 24, 138, centerX - 14, 145);
    ctx.moveTo(centerX + 14, 145);
    ctx.quadraticCurveTo(centerX + 24, 138, centerX + 35, 144);
    ctx.stroke();

    // Nose
    ctx.strokeStyle = skinColors.shadow;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, 142);
    ctx.lineTo(centerX - 2, 164);
    ctx.quadraticCurveTo(centerX, 168, centerX + 3, 164);
    ctx.stroke();

    // Lips
    ctx.fillStyle = isFemale ? '#C84B4E' : '#B56E5B';
    ctx.beginPath();
    ctx.ellipse(centerX, 182, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // Lip highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.beginPath();
    ctx.ellipse(centerX, 180, 5, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- HAIR ---
    ctx.fillStyle = '#181310';
    if (isFemale) {
      // Elegant traditional updo with hairpin
      ctx.beginPath();
      ctx.moveTo(centerX - 54, 145);
      ctx.bezierCurveTo(centerX - 55, 80, centerX + 55, 80, centerX + 54, 145);
      ctx.bezierCurveTo(centerX + 35, 115, centerX - 35, 115, centerX - 54, 145);
      ctx.closePath();
      ctx.fill();

      // Hair Bun
      ctx.beginPath();
      ctx.arc(centerX, 85, 35, 0, Math.PI * 2);
      ctx.fill();

      // Golden Lotus Hairpin (Trâm cài hoa sen vàng)
      ctx.strokeStyle = '#E5C068';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(centerX - 45, 82);
      ctx.lineTo(centerX + 45, 78);
      ctx.stroke();
      ctx.fillStyle = '#F5D587';
      ctx.beginPath();
      ctx.arc(centerX + 46, 78, 6.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Styled scholarly masculine parting
      ctx.beginPath();
      ctx.moveTo(centerX - 58, 145);
      ctx.bezierCurveTo(centerX - 55, 75, centerX + 55, 75, centerX + 58, 145);
      ctx.bezierCurveTo(centerX + 35, 118, centerX - 35, 118, centerX - 58, 145);
      ctx.closePath();
      ctx.fill();
    }

    // --- ACCESSORIES RENDERING ---
    // 1. Khăn Đóng (Silk Turban)
    if (hasKhanDong) {
      ctx.fillStyle = '#1C1815';
      ctx.beginPath();
      ctx.ellipse(centerX, 102, 64, 28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      // Ribbed folds
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.ellipse(centerX, 102 + i * 8, 62 - Math.abs(i) * 4, 24, 0, 0, Math.PI);
        ctx.stroke();
      }
    }

    // 2. Kiềng Bạc (Silver Torque Collar)
    if (hasKiengBac) {
      const silverGrad = ctx.createLinearGradient(centerX - 40, 230, centerX + 40, 260);
      silverGrad.addColorStop(0, '#FFFFFF');
      silverGrad.addColorStop(0.3, '#E2E8F0');
      silverGrad.addColorStop(0.7, '#94A3B8');
      silverGrad.addColorStop(1, '#CBD5E1');
      ctx.strokeStyle = silverGrad;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(centerX, 238, 38, 0.25, Math.PI - 0.25);
      ctx.stroke();
      // Torque center clasp
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(centerX, 276, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Chuỗi Ngọc Trai (Pearl Necklace)
    if (hasNgocTrai) {
      for (let i = 0; i <= 14; i++) {
        const angle = Math.PI * 0.2 + (i / 14) * Math.PI * 0.6;
        const px = centerX + Math.cos(angle) * 44;
        const py = 236 + Math.sin(angle) * 44;
        const pearlGrad = ctx.createRadialGradient(px - 1.5, py - 1.5, 1, px, py, 4);
        pearlGrad.addColorStop(0, '#FFFFFF');
        pearlGrad.addColorStop(0.7, '#F8FAFC');
        pearlGrad.addColorStop(1, '#CBD5E1');
        ctx.fillStyle = pearlGrad;
        ctx.beginPath();
        ctx.arc(px, py, 3.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 4. Nón Quai Thao (Held at side)
    if (hasNonQuaiThao) {
      const hatX = centerX + 180;
      const hatY = 480;
      ctx.fillStyle = '#E8D8C0';
      ctx.beginPath();
      ctx.ellipse(hatX, hatY, 75, 24, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#B89B77';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      // Red ribbons (Quai thao)
      ctx.strokeStyle = '#991B1E';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(hatX - 35, hatY);
      ctx.bezierCurveTo(hatX - 40, hatY + 80, hatX - 25, hatY + 140, hatX - 30, hatY + 200);
      ctx.moveTo(hatX + 35, hatY);
      ctx.bezierCurveTo(hatX + 30, hatY + 80, hatX + 45, hatY + 140, hatX + 40, hatY + 200);
      ctx.stroke();
    }

    // -------------------------------------------------------------
    // 3. EDITORIAL MAGAZINE & COUTURE OVERLAYS
    // -------------------------------------------------------------
    if (photoStyle === 'magazine-cover') {
      // Top luxury fashion header
      ctx.fillStyle = '#1C1917';
      ctx.font = '900 68px "Cinzel", "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('VIỆT COUTURE', centerX, 95);

      ctx.font = '600 13px sans-serif';
      ctx.letterSpacing = '0.4em';
      ctx.fillStyle = '#991B1E';
      ctx.fillText('THE HERITAGE REMIX ISSUE • THÁNG 10, 2026', centerX, 125);
      ctx.letterSpacing = 'normal';

      // Barcode & magazine tagline in bottom left
      ctx.fillStyle = 'rgba(28, 25, 23, 0.85)';
      ctx.font = 'bold 22px "Playfair Display", serif';
      ctx.textAlign = 'left';
      ctx.fillText(lookTitle ? lookTitle.toUpperCase() : 'BẢN PHỐI DI SẢN', 45, H - 75);
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#655345';
      ctx.fillText('VẺ ĐẸP ÁO DÀI & CỔ PHỤC THỜI ĐẠI MỚI', 45, H - 54);
    } else {
      // Subtle elegant watermark seal
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.strokeStyle = 'rgba(153, 27, 30, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(W - 210, H - 65, 185, 45, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#991B1E';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('✨ AI FASHION ILLUSTRATION', W - 198, H - 42);
      ctx.fillStyle = '#7A685A';
      ctx.font = '9px sans-serif';
      ctx.fillText('Phối đồ thực tế • Độ phân giải cao', W - 198, H - 28);
    }

    ctx.restore();

    // Callback with canvas instance
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [gender, skinTone, outfitId, colorId, occasionId, styleId, accessories, photoStyle, lookTitle, primaryHex, skinColors, onCanvasReady]);

  return (
    <div className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-[#EAE0D2] ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
      />
    </div>
  );
};
