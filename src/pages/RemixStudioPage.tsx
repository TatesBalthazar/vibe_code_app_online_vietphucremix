import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  RotateCcw,
  Heart,
  ArrowRight,
  BookOpen,
  User,
  ShieldCheck,
  Palette,
  Eye,
  AlertCircle,
  X,
  Layers,
  GraduationCap,
  HeartHandshake,
  Camera,
  Coffee,
  Landmark,
  Compass,
  Sun,
  CloudSun,
  Calendar,
  SlidersHorizontal,
  Wand2,
  Info
} from 'lucide-react';
import {
  OutfitLookState,
  OutfitId,
  OccasionId,
  StyleId,
  ColorId,
  SkinToneId,
  SavedLook,
  CultureCheckData
} from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import { OCCASIONS_DATA } from '../data/occasions';
import { STYLES_DATA } from '../data/styles';
import {
  COLORS_DATA,
  SKIN_TONES_DATA,
  evaluateColorHarmony,
  COLOR_HARMONY_PRESETS,
  ColorHarmonyPreset
} from '../data/colors';
import { evaluateCultureCheck } from '../data/cultureNotes';
import { CulturalInsightPopover } from '../components/CulturalInsightPopover';
import { CultureCheckCard } from '../components/CultureCheckCard';
import { Stylized3DCharacter, CharacterGender } from '../components/Stylized3DCharacter';
import { CharacterDefaultAvatar } from '../components/CharacterDefaultAvatar';
import { CultureOptionTooltip } from '../components/CultureOptionTooltip';
import { TraditionalMusicController } from '../components/TraditionalMusicController';
import { AIOutfitStylistModal } from '../components/AIOutfitStylistModal';
import { StudioCultureQuickReader } from '../components/StudioCultureQuickReader';
import { WeatherOccasionStylingModal } from '../components/WeatherOccasionStylingModal';
import { triggerCelebrationConfetti } from '../utils/confetti';
import {
  OUTFIT_CULTURE_NOTES,
  OCCASION_CULTURE_NOTES,
  STYLE_CULTURE_NOTES,
  COLOR_CULTURE_NOTES,
  ACCESSORY_CULTURE_NOTES
} from '../data/cultureProprietyData';

interface RemixStudioPageProps {
  currentLook: OutfitLookState;
  onChangeLook: (look: OutfitLookState) => void;
  onCreateLook: () => void;
  onSaveLook?: (look: SavedLook) => void;
  isAlreadySaved?: boolean;
  onNavigate?: (page: string) => void;
}

export interface StudioOutfitItem {
  id: OutfitId;
  name: string;
  shortLabel: string;
  vietnameseName: string;
  era: string;
  image: string;
  desc: string;
  highlightTag: string;
  occasions: OccasionId[];
  styles: StyleId[];
}

interface StudioAccessoryItem {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  iconType:
    | 'khan-dong'
    | 'kieng-bac'
    | 'non-quai-thao'
    | 'ngoc-trai'
    | 'sandal'
    | 'sneakers';
}

// 10 Full Historical and Traditional Garments from Data
const ALL_STUDIO_OUTFITS: StudioOutfitItem[] = [
  {
    id: 'ao-dai',
    name: 'Áo dài',
    shortLabel: 'Áo dài',
    vietnameseName: 'Áo Dài Truyền Thống & Cách Tân',
    era: 'Thế kỷ 18 đến nay',
    image: OUTFITS_DATA[0].image,
    desc: 'Cổ cao, hai tà buông tha thướt qua gối',
    highlightTag: 'Quốc phục thanh lịch',
    occasions: ['school', 'festival', 'photoshoot', 'wedding', 'cultural-event', 'casual'],
    styles: ['modern', 'elegant', 'minimal', 'romantic', 'traditional']
  },
  {
    id: 'ao-tu-than',
    name: 'Áo tứ thân',
    shortLabel: 'Tứ thân',
    vietnameseName: 'Áo Tứ Thân Kinh Bắc',
    era: 'Thế kỷ 12 - 20 (Miền Bắc)',
    image: OUTFITS_DATA[1].image,
    desc: '4 vạt mở buộc eo, lộ yếm lụa đào duyên dáng',
    highlightTag: 'Kinh Bắc duyên dáng',
    occasions: ['festival', 'photoshoot', 'cultural-event'],
    styles: ['traditional', 'romantic', 'modern', 'street']
  },
  {
    id: 'ao-ngu-than',
    name: 'Áo ngũ thân',
    shortLabel: 'Ngũ thân',
    vietnameseName: 'Áo Ngũ Thân Lập Lĩnh',
    era: 'Thời Nguyễn (Thế kỷ 18–20)',
    image: OUTFITS_DATA[2].image,
    desc: '5 thân lập lĩnh, vạt cài 5 cúc đồng ngũ thường',
    highlightTag: 'Đạo lý ngũ thường',
    occasions: ['wedding', 'cultural-event', 'photoshoot', 'festival'],
    styles: ['traditional', 'elegant', 'modern', 'minimal']
  },
  {
    id: 'ao-ba-ba',
    name: 'Áo bà ba',
    shortLabel: 'Bà ba',
    vietnameseName: 'Áo Bà Ba Nam Bộ',
    era: 'Thế kỷ 19 (Nam Bộ)',
    image: OUTFITS_DATA[3].image,
    desc: 'Cổ tròn xẻ tà hai bên hông, túi đắp tiện dụng',
    highlightTag: 'Nam Bộ phóng khoáng',
    occasions: ['casual', 'school', 'photoshoot', 'festival'],
    styles: ['minimal', 'modern', 'street', 'romantic', 'traditional']
  },
  {
    id: 'ao-nhat-binh',
    name: 'Áo Nhật Bình',
    shortLabel: 'Nhật Bình',
    vietnameseName: 'Áo Nhật Bình Cung Đình Triều Nguyễn',
    era: 'Triều Nguyễn (1802–1945)',
    image: OUTFITS_DATA[4]?.image || OUTFITS_DATA[0].image,
    desc: 'Cổ chữ nhật thêu chỉ kim tuyến, dải ngũ sắc cổ tay',
    highlightTag: 'Cung đình quý phái',
    occasions: ['wedding', 'cultural-event', 'photoshoot', 'festival'],
    styles: ['elegant', 'traditional', 'romantic']
  },
  {
    id: 'ao-tac',
    name: 'Áo Tấc',
    shortLabel: 'Áo Tấc',
    vietnameseName: 'Áo Tấc Ngũ Thân Tay Thụng',
    era: 'Thời Nguyễn (Đại lễ phục)',
    image: OUTFITS_DATA[5]?.image || OUTFITS_DATA[2].image,
    desc: 'Đôi tay thụng dài rộng bề thế, mặc cùng quần trắng',
    highlightTag: 'Tay thụng đại lễ',
    occasions: ['wedding', 'cultural-event', 'festival'],
    styles: ['traditional', 'elegant', 'minimal']
  },
  {
    id: 'ao-tay-chen',
    name: 'Áo Tay Chẽn',
    shortLabel: 'Tay Chẽn',
    vietnameseName: 'Áo Ngũ Thân Tay Chẽn',
    era: 'Thời Nguyễn (Thế kỷ 18–19)',
    image: OUTFITS_DATA[6]?.image || OUTFITS_DATA[2].image,
    desc: 'Tay ôm gọn gàng, phom suông lịch thiệp nho nhã',
    highlightTag: 'Nho nhã & Tân thời',
    occasions: ['school', 'cultural-event', 'casual', 'photoshoot'],
    styles: ['modern', 'minimal', 'traditional', 'street']
  },
  {
    id: 'giao-linh',
    name: 'Áo Giao Lĩnh',
    shortLabel: 'Giao Lĩnh',
    vietnameseName: 'Áo Giao Lĩnh Cổ Chéo Thời Lý - Trần - Lê',
    era: 'Thế kỷ 11–18 (Lý - Trần - Lê)',
    image: OUTFITS_DATA[7]?.image || OUTFITS_DATA[1].image,
    desc: 'Cổ đắp chéo chữ V phóng khoáng, dải thắt lưng lụa',
    highlightTag: 'Hào khí Đại Việt',
    occasions: ['festival', 'cultural-event', 'photoshoot'],
    styles: ['traditional', 'romantic', 'minimal']
  },
  {
    id: 'vien-linh',
    name: 'Áo Viên Lĩnh',
    shortLabel: 'Viên Lĩnh',
    vietnameseName: 'Áo Viên Lĩnh Cổ Tròn Quan Phục',
    era: 'Thế kỷ 15–19 (Lê Sơ – Nguyễn)',
    image: OUTFITS_DATA[8]?.image || OUTFITS_DATA[2].image,
    desc: 'Cổ tròn ôm sát chân cổ, khuy vai phải bệ vệ',
    highlightTag: 'Quan phục uy nghiêm',
    occasions: ['cultural-event', 'wedding', 'festival'],
    styles: ['traditional', 'elegant', 'minimal']
  },
  {
    id: 'doi-kham',
    name: 'Áo Đối Khâm',
    shortLabel: 'Đối Khâm',
    vietnameseName: 'Áo Đối Khâm Khoác Ngoài',
    era: 'Thời Lý - Trần - Lê - Nguyễn',
    image: OUTFITS_DATA[9]?.image || OUTFITS_DATA[1].image,
    desc: 'Hai vạt song song buông mở, lộ yếm lụa bên trong',
    highlightTag: 'Hai vạt song song',
    occasions: ['photoshoot', 'casual', 'festival', 'cultural-event'],
    styles: ['modern', 'romantic', 'street', 'elegant']
  }
];

const STUDIO_ACCESSORIES: StudioAccessoryItem[] = [
  {
    id: 'khan-dong',
    name: 'Khăn đóng',
    shortLabel: 'Khăn đóng',
    category: 'Phụ kiện đầu',
    iconType: 'khan-dong'
  },
  {
    id: 'vong-kieng-bac',
    name: 'Kiềng bạc',
    shortLabel: 'Kiềng bạc',
    category: 'Trang sức',
    iconType: 'kieng-bac'
  },
  {
    id: 'non-quai-thao',
    name: 'Nón quai thao',
    shortLabel: 'Nón quai thao',
    category: 'Phụ kiện đầu',
    iconType: 'non-quai-thao'
  },
  {
    id: 'chuoi-ngoc-trai',
    name: 'Chuỗi ngọc trai',
    shortLabel: 'Ngọc trai',
    category: 'Trang sức',
    iconType: 'ngoc-trai'
  },
  {
    id: 'sandal-day-manh',
    name: 'Sandal quai mảnh',
    shortLabel: 'Sandal',
    category: 'Giày dép',
    iconType: 'sandal'
  },
  {
    id: 'sneakers-retro-trang',
    name: 'Sneakers retro',
    shortLabel: 'Sneakers',
    category: 'Giày dép',
    iconType: 'sneakers'
  }
];

/**
 * Line-art thumbnail for accessory items
 */
const AccessoryMiniGraphic: React.FC<{
  type: StudioAccessoryItem['iconType'];
  isSelected: boolean;
}> = ({ type, isSelected }) => {
  const strokeColor = isSelected ? '#991B1E' : '#45362E';
  const accentColor = '#C8973E';

  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" fill="none">
      {type === 'khan-dong' && (
        <g>
          <path d="M10 26C10 17 38 17 38 26C38 30 32 32 24 32C16 32 10 30 10 26Z" stroke={strokeColor} strokeWidth="2" />
          <path d="M14 22L24 28L34 22" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {type === 'kieng-bac' && (
        <g>
          <circle cx="24" cy="25" r="11" stroke={strokeColor} strokeWidth="2.2" />
          <path d="M19 15C22 13.5 26 13.5 29 15" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {type === 'non-quai-thao' && (
        <g>
          <ellipse cx="24" cy="22" rx="16" ry="5" stroke={strokeColor} strokeWidth="2" />
          <path d="M15 20C18 16 30 16 33 20" stroke={accentColor} strokeWidth="1.6" />
          <path d="M13 25V34C13 36 16 36 16 34V26" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M35 25V34C35 36 32 36 32 34V26" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
      {type === 'ngoc-trai' && (
        <g>
          <circle cx="24" cy="14" r="2.2" fill={strokeColor} />
          <circle cx="17" cy="17" r="2.2" fill={strokeColor} />
          <circle cx="31" cy="17" r="2.2" fill={strokeColor} />
          <circle cx="14" cy="24" r="2.4" fill={strokeColor} />
          <circle cx="34" cy="24" r="2.4" fill={strokeColor} />
          <circle cx="24" cy="34" r="3" fill={accentColor} />
        </g>
      )}
      {type === 'sandal' && (
        <g>
          <path d="M11 32H37C38 32 39 34 37 35H11C9 35 9 32 11 32Z" stroke={strokeColor} strokeWidth="2" />
          <path d="M15 32V37M18 32C20 26 28 26 33 32" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {type === 'sneakers' && (
        <g>
          <path d="M10 33H38V36H10V33Z" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M11 33V23L19 23L26 28L36 29C38 29 38 33 38 33" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
          <path d="M18 29L25 31" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

export const RemixStudioPage: React.FC<RemixStudioPageProps> = ({
  currentLook,
  onChangeLook,
  onCreateLook,
  onSaveLook,
  isAlreadySaved = false,
  onNavigate
}) => {
  // Gender State: 'female' | 'male'
  const [gender, setGender] = useState<CharacterGender>(() => {
    return currentLook.gender || 'female';
  });

  // Skin Tone State: 'fair' | 'neutral' | 'warm' | 'tan'
  const [skinTone, setSkinTone] = useState<SkinToneId>(() => {
    return currentLook.skinTone || 'neutral';
  });

  // Filter Flattering Colors only toggle
  const [filterFlatteringOnly, setFilterFlatteringOnly] = useState<boolean>(false);

  // Flag to ask for gender & skin tone in an onboarding modal if user wants or on fresh start
  const [showGenderModal, setShowGenderModal] = useState<boolean>(() => {
    return !currentLook.gender;
  });

  // Active selection states
  const selectedOutfitId: OutfitId = (currentLook.outfit || 'ao-dai') as OutfitId;
  const selectedColorId: ColorId = (currentLook.color || (gender === 'male' ? 'black' : 'cream')) as ColorId;
  const selectedAccessories: string[] = currentLook.accessories || [];
  const selectedOccasionId: OccasionId = (currentLook.occasion || 'festival') as OccasionId;
  const selectedStyleId: StyleId = (currentLook.style || 'traditional') as StyleId;

  // Active Left Panel Tab: 'outfit' | 'color' | 'context'
  const [activeLeftTab, setActiveLeftTab] = useState<'outfit' | 'color' | 'context'>('outfit');

  // Organization mode for Outfits: 'by-occasion' | 'by-style' | 'all'
  const [outfitViewMode, setOutfitViewMode] = useState<'by-occasion' | 'by-style' | 'all'>('by-occasion');

  // Center display mode: '3d-canvas' | 'avatar-portrait'
  const [centerViewMode, setCenterViewMode] = useState<'3d-canvas' | 'avatar-portrait'>('3d-canvas');

  // Filter chips
  const [activeOccasionFilter, setActiveOccasionFilter] = useState<OccasionId | 'all'>('all');
  const [activeStyleFilter, setActiveStyleFilter] = useState<StyleId | 'all'>('all');

  // Modals
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isAIStylistModalOpen, setIsAIStylistModalOpen] = useState(false);
  const [isWeatherWizardOpen, setIsWeatherWizardOpen] = useState(false);
  const [isQuickCultureOpen, setIsQuickCultureOpen] = useState(false);
  const [quickCultureTab, setQuickCultureTab] = useState<
    'outfit' | 'equipped-accessories' | 'all-accessories' | 'color'
  >('outfit');
  const [aiAppliedToast, setAiAppliedToast] = useState<string | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  // Animation states for newly added accessory shake feedback
  const [shakingAccessoryId, setShakingAccessoryId] = useState<string | null>(null);
  const [isAccessoryBadgeShaking, setIsAccessoryBadgeShaking] = useState<boolean>(false);
  const [recentlyEquippedName, setRecentlyEquippedName] = useState<string | null>(null);

  const handleOpenQuickCulture = (
    tab: 'outfit' | 'equipped-accessories' | 'all-accessories' | 'color' = 'outfit'
  ) => {
    setQuickCultureTab(tab);
    setIsQuickCultureOpen(true);
  };

  // Apply Weather & Occasion Wizard Suggestion Handler
  const handleApplyWeatherWizardStyling = (styling: {
    outfitId: OutfitId;
    colorId: ColorId;
    styleId: StyleId;
    occasionId: OccasionId;
    accessories: string[];
    title: string;
  }) => {
    setSavedToast(false);
    onChangeLook({
      ...currentLook,
      gender,
      skinTone,
      outfit: styling.outfitId,
      color: styling.colorId,
      style: styling.styleId,
      occasion: styling.occasionId,
      accessories: styling.accessories
    });

    setAiAppliedToast(`Gợi ý thời tiết & dịp: "${styling.title}"`);
    triggerCelebrationConfetti({ originX: 0.5, originY: 0.5 });
    setTimeout(() => {
      setAiAppliedToast(null);
    }, 4500);
  };

  // Apply AI Outfit Suggestion Handler
  const handleApplyAISuggestion = (suggestion: {
    colorId: ColorId;
    styleId: StyleId;
    occasionId: OccasionId;
    accessories: string[];
    title: string;
  }) => {
    setSavedToast(false);
    onChangeLook({
      ...currentLook,
      gender,
      skinTone,
      outfit: selectedOutfitId,
      color: suggestion.colorId,
      style: suggestion.styleId,
      occasion: suggestion.occasionId,
      accessories: suggestion.accessories
    });

    setAiAppliedToast(`Phong cách "${suggestion.title}"`);
    setTimeout(() => {
      setAiAppliedToast(null);
    }, 4000);
  };

  // Sync gender changes: Mặc định Nam chưa phối đồ mặc Áo Dài Đen, Nữ chưa phối đồ mặc Áo Dài Trắng
  const handleSelectGender = (selectedGen: CharacterGender) => {
    setGender(selectedGen);
    setShowGenderModal(false);

    // If currently on default unstyled ao-dai or no accessories chosen yet:
    // Nam chưa phối đồ mặc Áo Dài Đen, Nữ chưa phối đồ mặc Áo Dài Trắng
    const isCurrentAoDai = selectedOutfitId === 'ao-dai';
    const isDefaultUnstyled = selectedAccessories.length === 0;
    const nextColor: ColorId = (isCurrentAoDai && isDefaultUnstyled)
      ? (selectedGen === 'male' ? 'black' : 'cream')
      : selectedColorId;

    onChangeLook({
      ...currentLook,
      gender: selectedGen,
      skinTone,
      outfit: selectedOutfitId,
      color: nextColor
    });
  };

  // Sync skin tone changes
  const handleSelectSkinTone = (selectedSkin: SkinToneId) => {
    setSkinTone(selectedSkin);
    setSavedToast(false);
    onChangeLook({
      ...currentLook,
      gender,
      skinTone: selectedSkin
    });
  };

  // Toggle or select outfit
  const handleSelectOutfit = (outfitId: OutfitId, suggestedOccasion?: OccasionId, suggestedStyle?: StyleId) => {
    setSavedToast(false);
    onChangeLook({
      ...currentLook,
      gender,
      skinTone,
      outfit: outfitId,
      occasion: suggestedOccasion || selectedOccasionId,
      style: suggestedStyle || selectedStyleId,
      color: selectedColorId,
      accessories: selectedAccessories
    });
  };

  // Select color
  const handleSelectColor = (colorId: ColorId) => {
    setSavedToast(false);
    onChangeLook({
      ...currentLook,
      gender,
      skinTone,
      color: colorId
    });
  };

  // Apply 1-Click Color Harmony Preset
  const handleApplyColorPreset = (preset: ColorHarmonyPreset) => {
    setSavedToast(false);
    onChangeLook({
      ...currentLook,
      gender,
      skinTone,
      color: preset.colorId,
      accessories: preset.suggestedAccessories
    });
  };

  // Toggle accessories with gentle shake feedback on adding new accessory
  const handleToggleAccessory = (accId: string) => {
    setSavedToast(false);
    const exists = selectedAccessories.includes(accId);

    if (!exists) {
      // Trigger gentle shake animation
      setShakingAccessoryId(accId);
      setIsAccessoryBadgeShaking(true);
      const accItem = STUDIO_ACCESSORIES.find((a) => a.id === accId);
      if (accItem) {
        setRecentlyEquippedName(accItem.shortLabel);
      }
      setTimeout(() => {
        setShakingAccessoryId(null);
        setIsAccessoryBadgeShaking(false);
      }, 650);

      setTimeout(() => {
        setRecentlyEquippedName(null);
      }, 1800);
    }

    const nextAcc = exists
      ? selectedAccessories.filter((id) => id !== accId)
      : [...selectedAccessories, accId];

    onChangeLook({
      ...currentLook,
      gender,
      skinTone,
      accessories: nextAcc
    });
  };

  // Select Occasion & Style
  const handleSelectOccasion = (occId: OccasionId) => {
    onChangeLook({
      ...currentLook,
      occasion: occId
    });
  };

  const handleSelectStyle = (styId: StyleId) => {
    onChangeLook({
      ...currentLook,
      style: styId
    });
  };

  // Reset Studio to default: Nam mặc Áo Dài Đen, Nữ mặc Áo Dài Trắng
  const handleResetStudio = () => {
    setSavedToast(false);
    const defaultColor: ColorId = gender === 'male' ? 'black' : 'cream';
    onChangeLook({
      gender,
      skinTone,
      outfit: 'ao-dai',
      color: defaultColor,
      style: 'traditional',
      occasion: 'festival',
      accessories: []
    });
  };

  // Current Evaluation Object based on active settings
  const currentCultureCheck: CultureCheckData = evaluateCultureCheck({
    outfitId: selectedOutfitId,
    occasionId: selectedOccasionId,
    styleId: selectedStyleId,
    colorId: selectedColorId,
    accessoryIds: selectedAccessories
  });

  // Real-time Color Harmony & Skin Tone Rules Evaluation
  const colorHarmony = evaluateColorHarmony({
    skinTone,
    colorId: selectedColorId,
    outfitId: selectedOutfitId,
    accessories: selectedAccessories
  });

  // Prepare full SavedLook
  const buildSavedLook = (): SavedLook => {
    const fullOutfit =
      OUTFITS_DATA.find((o) => o.id === selectedOutfitId) || OUTFITS_DATA[0];
    const fullOccasion =
      OCCASIONS_DATA.find((o) => o.id === selectedOccasionId) || OCCASIONS_DATA[0];
    const fullStyle =
      STYLES_DATA.find((s) => s.id === selectedStyleId) || STYLES_DATA[0];
    const fullColor =
      COLORS_DATA.find((c) => c.id === selectedColorId) || COLORS_DATA[0];

    const equippedNames = selectedAccessories.map((id) => {
      const item = STUDIO_ACCESSORIES.find((a) => a.id === id);
      return item ? item.name : id;
    });

    return {
      id: `look-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      gender,
      skinTone,
      title: `${fullStyle.name.toUpperCase()} ${fullOutfit.name.toUpperCase()}`,
      subtitle: `${fullOccasion.name} × ${fullStyle.name}`,
      occasion: fullOccasion.id,
      occasionName: fullOccasion.name,
      outfit: selectedOutfitId,
      outfitName: fullOutfit.name,
      style: fullStyle.id,
      styleName: fullStyle.name,
      color: fullColor.id,
      colorName: fullColor.nameVi,
      colorHex: fullColor.hex,
      accessories: equippedNames,
      cultureCheck: currentCultureCheck,
      image: ''
    };
  };

  // Open Submit Confirmation Modal
  const handleOpenSubmitModal = () => {
    setIsConfirmModalOpen(true);
  };

  // Confirm and Save Look with Confetti Celebration
  const handleConfirmSave = (e?: React.MouseEvent) => {
    let originX = 0.5;
    let originY = 0.5;
    if (e?.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      originX = (rect.left + rect.width / 2) / window.innerWidth;
      originY = (rect.top + rect.height / 2) / window.innerHeight;
    }

    const newLook = buildSavedLook();
    if (onSaveLook) {
      onSaveLook(newLook);
    }
    setIsConfirmModalOpen(false);
    setSavedToast(true);
    setIsEvaluationModalOpen(true);
    triggerCelebrationConfetti({ originX, originY });
  };

  const activeColorObj = COLORS_DATA.find((c) => c.id === selectedColorId) || COLORS_DATA[0];
  const activeOutfitObj = ALL_STUDIO_OUTFITS.find((o) => o.id === selectedOutfitId) || ALL_STUDIO_OUTFITS[0];
  const activeSkinToneObj = SKIN_TONES_DATA.find((s) => s.id === skinTone) || SKIN_TONES_DATA[1];

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-[#FAF7F2] select-none">
      {/* =====================================================================
          STUDIO TOP TOOLBAR: GENDER & STATUS CONTROLS
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 pb-2 flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DAC7]/60">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#991B1E] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            REMIX STUDIO
          </span>
          <span className="text-[#D0C0AC]">/</span>
          <span className="text-xs text-[#594C42] font-medium hidden sm:inline">
            Kho 10 Cổ Phục & Trang Phục Việt Đầy Đủ
          </span>
        </div>

        {/* Traditional Background Music & Avatar Controls */}
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {/* Weather & Occasion Styling Assistant Button */}
          <button
            type="button"
            id="btn-weather-occasion-wizard"
            onClick={() => setIsWeatherWizardOpen(true)}
            className="group relative px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#92400E] hover:from-[#B45309] hover:to-[#78350F] text-white text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md hover:scale-102 cursor-pointer ring-1 ring-[#FCD34D]/60 active:scale-98"
            title="Gợi ý phối đồ dựa trên thời tiết vùng miền và dịp mặc"
            aria-label="Gợi ý thời tiết & dịp mặc"
          >
            <CloudSun className="w-3.5 h-3.5 text-[#FEF3C7] group-hover:rotate-12 transition-transform" />
            <span className="font-serif tracking-wide">Gợi Ý Thời Tiết & Dịp</span>
            <span className="text-[9px] uppercase tracking-wider bg-white/20 text-[#FEF3C7] px-1.5 py-0.5 rounded-full font-extrabold hidden md:inline">
              Mới
            </span>
          </button>

          {/* AI Outfit Stylist Suggestion Button */}
          <button
            type="button"
            id="btn-ai-stylist-suggest"
            onClick={() => setIsAIStylistModalOpen(true)}
            className="group relative px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#991B1E] via-[#82171A] to-[#6A1215] hover:from-[#781316] hover:to-[#550E10] text-white text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md hover:scale-102 cursor-pointer ring-1 ring-[#F5D587]/50 active:scale-98"
            title={`Sử dụng AI để gợi ý 3 phong cách kết hợp độc đáo cho ${activeOutfitObj.name}`}
            aria-label="Gợi ý phối đồ AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5D587] group-hover:rotate-12 transition-transform animate-pulse" />
            <span className="font-serif tracking-wide">Gợi Ý Phối Đồ</span>
            <span className="text-[9px] uppercase tracking-wider bg-white/20 text-[#F5D587] px-1.5 py-0.5 rounded-full font-extrabold hidden sm:inline">
              AI
            </span>
          </button>

          {/* Quick Cultural Reader Button */}
          <button
            type="button"
            id="btn-quick-culture-reader"
            onClick={() => handleOpenQuickCulture('outfit')}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FAF5EB] to-[#FFFDF9] hover:from-[#F2ECE0] hover:to-[#FAF5EB] text-[#7A1E20] hover:text-[#581215] border border-[#DACBB7] text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs hover:shadow-xs cursor-pointer active:scale-98"
            title="Đọc nhanh thông tin văn hóa về trang phục & phụ kiện bạn đang phối"
            aria-label="Đọc nhanh văn hóa"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#991B1E]" />
            <span className="font-serif tracking-wide hidden sm:inline">Đọc Nhanh Văn Hóa</span>
            <span className="text-[10px] text-[#991B1E] bg-[#991B1E]/10 px-1.5 py-0.2 rounded-full font-bold hidden md:inline">
              {activeOutfitObj.shortLabel}
            </span>
          </button>

          {/* Traditional Vietnamese Music Toggle Controller */}
          <TraditionalMusicController />

          {/* Skin Tone Filter Switcher */}
          <div className="inline-flex items-center gap-1 rounded-xl p-1 bg-[#EFE6D8]/80 border border-[#DACBB7]">
            <span className="text-[10px] font-bold text-[#7A695B] px-1.5 flex items-center gap-1 hidden sm:inline-flex">
              <Sun className="w-3 h-3 text-[#C8973E]" />
              <span>Tông da:</span>
            </span>
            <div className="flex items-center gap-0.5">
              {SKIN_TONES_DATA.map((st) => {
                const isSelected = skinTone === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectSkinTone(st.id)}
                    className={`relative p-1 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#991B1E] shadow-xs ring-1 ring-[#991B1E]/30'
                        : 'text-[#68584B] hover:text-[#1C1917] hover:bg-white/50'
                    }`}
                    title={`${st.nameVi}: ${st.description}`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs shrink-0"
                      style={{ backgroundColor: st.sampleHex }}
                    />
                    <span className="hidden md:inline">{st.name.split(' / ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gender Switcher Button with Default Character Avatars */}
          <div className="inline-flex rounded-xl p-1 bg-[#EFE6D8]/80 border border-[#DACBB7]">
            <button
              type="button"
              onClick={() => handleSelectGender('female')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                gender === 'female'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#594C42] hover:text-[#1C1917]'
              }`}
              title="Nữ mặc định Áo Dài Trắng lụa mộc tinh khôi"
            >
              <CharacterDefaultAvatar gender="female" skinTone={skinTone} size="xs" />
              <span className="hidden sm:inline">NỮ (Áo dài trắng)</span>
              <span className="sm:hidden">NỮ</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectGender('male')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                gender === 'male'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#594C42] hover:text-[#1C1917]'
              }`}
              title="Nam mặc định Áo Dài Đen lập lĩnh nho nhã"
            >
              <CharacterDefaultAvatar gender="male" skinTone={skinTone} size="xs" />
              <span className="hidden sm:inline">NAM (Áo dài đen)</span>
              <span className="sm:hidden">NAM</span>
            </button>
          </div>

          {/* Quick Avatar Re-initialization Button */}
          <button
            type="button"
            onClick={() => setShowGenderModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-[#DACBB7] hover:border-[#991B1E] text-[#991B1E] text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs hover:shadow-xs cursor-pointer"
            title="Đổi Avatar nhân vật hoặc tông da"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
            <span className="hidden sm:inline">Đổi Avatar</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          MAIN 3-ZONE STUDIO WORKSPACE
          - Left Panel: Kho Trang Phục (Sắp xếp theo Dịp & Phong Cách) + Màu Sắc
          - Center Section: 3D Character Mannequin Canvas
          - Right Panel: Kho Phụ Kiện
         ===================================================================== */}
      <div className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-5 lg:gap-6">
        {/* -------------------------------------------------------------------
            LEFT GLASS PANEL: KHO TRANG PHỤC & MÀU SẮC
           ------------------------------------------------------------------- */}
        <aside
          aria-label="Kho trang phục và màu sắc"
          className="w-full lg:w-[28%] lg:min-w-[285px] lg:max-w-[340px] order-2 lg:order-1 h-fit max-h-[720px] flex flex-col rounded-2xl bg-[#FAF7F2]/75 backdrop-blur-md border border-[#D8C7B2]/80 shadow-[0_8px_24px_rgba(28,25,23,0.05)] p-4 transition-all"
        >
          {/* Quick Weather & Occasion Suggestion Banner */}
          <div className="mb-3 p-2.5 rounded-xl bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EB] to-[#F5ECE0] border border-[#DECBB3] shadow-2xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#991B1E]/10 border border-[#991B1E]/20 flex items-center justify-center shrink-0">
                <CloudSun className="w-4 h-4 text-[#D97706]" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-[#1C1917] leading-tight flex items-center gap-1">
                  <span>Gợi Ý Thời Tiết & Dịp</span>
                  <span className="text-[8px] uppercase tracking-wider bg-[#991B1E] text-white px-1.5 py-0.2 rounded-full font-extrabold">Hot</span>
                </div>
                <div className="text-[10px] text-[#7A6B5F] leading-tight">3 Vùng miền · 4 Thời điểm</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsWeatherWizardOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-[#991B1E] hover:bg-[#781316] text-white text-[11px] font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Xem Gợi Ý
            </button>
          </div>

          {/* Main Left Tabs: Trang Phục / Màu Sắc / Bối Cảnh */}
          <div className="flex items-center gap-1 p-1 bg-[#EFE6D8]/70 rounded-xl mb-3 border border-[#E0D2BF] shrink-0">
            <button
              type="button"
              onClick={() => setActiveLeftTab('outfit')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLeftTab === 'outfit'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              Trang Phục ({ALL_STUDIO_OUTFITS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveLeftTab('color')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeLeftTab === 'color'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              <Palette className="w-3 h-3 text-[#C8973E]" />
              <span>Màu Sắc</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLeftTab('context')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLeftTab === 'context'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              Bối Cảnh
            </button>
          </div>

          {/* TAB 1: KHO TRANG PHỤC VỚI PHÂN MỤC "DỊP SỰ KIỆN" & "PHONG CÁCH REMIX" */}
          {activeLeftTab === 'outfit' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Categorization Switcher Header */}
              <div className="mb-2.5 pb-2 border-b border-[#E5D7C5]">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#7A695B] uppercase tracking-wider mb-1.5">
                  <span>SẮP XẾP THEO:</span>
                  <span className="text-[#991B1E] font-bold">10 Trang phục</span>
                </div>
                {/* 3 View Mode Segment Buttons */}
                <div className="grid grid-cols-3 gap-1 p-0.5 bg-[#EAE0D2]/70 rounded-lg text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setOutfitViewMode('by-occasion')}
                    className={`py-1 rounded-md transition-all cursor-pointer truncate px-1 ${
                      outfitViewMode === 'by-occasion'
                        ? 'bg-white text-[#991B1E] shadow-xs'
                        : 'text-[#5E5045] hover:text-black'
                    }`}
                    title="Phân loại theo Dịp Sự Kiện"
                  >
                    Dịp Sự Kiện
                  </button>
                  <button
                    type="button"
                    onClick={() => setOutfitViewMode('by-style')}
                    className={`py-1 rounded-md transition-all cursor-pointer truncate px-1 ${
                      outfitViewMode === 'by-style'
                        ? 'bg-white text-[#991B1E] shadow-xs'
                        : 'text-[#5E5045] hover:text-black'
                    }`}
                    title="Phân loại theo Phong Cách Remix"
                  >
                    Phong Cách
                  </button>
                  <button
                    type="button"
                    onClick={() => setOutfitViewMode('all')}
                    className={`py-1 rounded-md transition-all cursor-pointer truncate px-1 ${
                      outfitViewMode === 'all'
                        ? 'bg-white text-[#991B1E] shadow-xs'
                        : 'text-[#5E5045] hover:text-black'
                    }`}
                    title="Xem tất cả trang phục"
                  >
                    Tất Cả (10)
                  </button>
                </div>
              </div>

              {/* AI Stylist Callout Bar */}
              <div className="mb-2.5 p-2.5 rounded-xl bg-gradient-to-r from-[#FAF3E8] to-[#F5ECE0] border border-[#E2D4BE] flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-[#1C1917] truncate">
                      Cần gợi ý cho {activeOutfitObj.name}?
                    </div>
                    <div className="text-[9.5px] text-[#7A695B] truncate">
                      3 phong cách: Sang trọng, Phá cách & Đương đại
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAIStylistModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-[#991B1E] hover:bg-[#781316] text-white text-[10.5px] font-bold shrink-0 transition-all flex items-center gap-1 shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  <Wand2 className="w-3 h-3 text-[#F5D587]" />
                  <span>Gợi Ý AI</span>
                </button>
              </div>

              {/* Cultural Knowledge Quick Link Bar */}
              <div className="mb-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#FAF5EB] to-[#FFFDF9] border border-[#E2D4BE] flex items-center justify-between text-xs text-[#524439] shadow-2xs">
                <span className="flex items-center gap-1.5 font-medium truncate">
                  <BookOpen className="w-3.5 h-3.5 text-[#991B1E] shrink-0" />
                  <span>Ý nghĩa văn hóa: <strong className="text-[#991B1E]">{activeOutfitObj.name}</strong></span>
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenQuickCulture('outfit')}
                  className="text-[#991B1E] font-bold hover:underline shrink-0 flex items-center gap-0.5 cursor-pointer ml-1"
                >
                  <span>Đọc nhanh</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Scrollable Outfits Container */}
              <div className="flex-1 overflow-y-auto max-h-[460px] pr-1 space-y-4">
                {/* -------------------------------------------------------------
                    VIEW MODE 1: SẮP XẾP THEO "DỊP SỰ KIỆN" (BY OCCASION)
                   ------------------------------------------------------------- */}
                {outfitViewMode === 'by-occasion' && (
                  <div className="space-y-4">
                    {OCCASIONS_DATA.map((occ) => {
                      const matchingOutfits = ALL_STUDIO_OUTFITS.filter((o) =>
                        o.occasions.includes(occ.id)
                      );
                      if (matchingOutfits.length === 0) return null;

                      return (
                        <div key={occ.id} className="space-y-2">
                          {/* Occasion Section Header */}
                          <div className="flex items-center justify-between pb-1 border-b border-[#EADFCF]/80">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                              <span className="w-2 h-2 rounded-full bg-[#991B1E]" />
                              <span>{occ.nameVi}</span>
                            </div>
                            <span className="text-[10px] text-[#7A695B] font-medium">
                              {matchingOutfits.length} áo
                            </span>
                          </div>

                          {/* Outfits in this Occasion */}
                          <div className="grid grid-cols-2 gap-2">
                            {matchingOutfits.map((item) => {
                              const isSelected = selectedOutfitId === item.id;
                              const note = OUTFIT_CULTURE_NOTES[item.id];
                              return (
                                <CultureOptionTooltip
                                  key={`${occ.id}-${item.id}`}
                                  note={note}
                                >
                                  <button
                                    type="button"
                                    onClick={() => handleSelectOutfit(item.id, occ.id)}
                                    className={`group relative w-full rounded-xl p-2 text-center transition-all duration-200 ease-out cursor-pointer flex flex-col items-center border hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 ${
                                      isSelected
                                        ? 'bg-[#FFFDF9] border-[#991B1E] shadow-[0_6px_16px_rgba(153,27,30,0.18)] ring-1 ring-[#C8973E]/60'
                                        : 'bg-white/40 border-[#DECBB3]/70 hover:bg-white hover:border-[#991B1E] hover:shadow-md'
                                    }`}
                                  >
                                    {/* Thumbnail */}
                                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#EFE6D8]/70 mb-1 border border-[#E5D8C6]/70">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className={`w-full h-full object-cover transition-transform duration-300 ${
                                          isSelected ? 'scale-105' : 'group-hover:scale-105 opacity-90 group-hover:opacity-100'
                                        }`}
                                      />
                                      {isSelected && (
                                        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#991B1E] text-white flex items-center justify-center shadow-xs">
                                          <Check className="w-2.5 h-2.5" />
                                        </span>
                                      )}
                                    </div>

                                    <span
                                      className={`font-serif text-xs font-bold leading-tight truncate max-w-full ${
                                        isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'
                                      }`}
                                    >
                                      {item.shortLabel}
                                    </span>
                                    <span className="text-[9px] text-[#7A695B] bg-[#EFE7DC] px-1.5 py-0.5 rounded-sm mt-1 truncate max-w-full">
                                      {item.highlightTag}
                                    </span>
                                  </button>
                                </CultureOptionTooltip>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* -------------------------------------------------------------
                    VIEW MODE 2: SẮP XẾP THEO "PHONG CÁCH REMIX" (BY STYLE)
                   ------------------------------------------------------------- */}
                {outfitViewMode === 'by-style' && (
                  <div className="space-y-4">
                    {STYLES_DATA.map((sty) => {
                      const matchingOutfits = ALL_STUDIO_OUTFITS.filter((o) =>
                        o.styles.includes(sty.id)
                      );
                      if (matchingOutfits.length === 0) return null;

                      return (
                        <div key={sty.id} className="space-y-2">
                          {/* Style Section Header */}
                          <div className="flex items-center justify-between pb-1 border-b border-[#EADFCF]/80">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                              <span className="w-2 h-2 rounded-full bg-[#C8973E]" />
                              <span>{sty.nameVi}</span>
                            </div>
                            <span className="text-[10px] text-[#7A695B] font-medium">
                              {matchingOutfits.length} áo
                            </span>
                          </div>

                          {/* Outfits in this Style */}
                          <div className="grid grid-cols-2 gap-2">
                            {matchingOutfits.map((item) => {
                              const isSelected = selectedOutfitId === item.id;
                              const note = OUTFIT_CULTURE_NOTES[item.id];
                              return (
                                <CultureOptionTooltip
                                  key={`${sty.id}-${item.id}`}
                                  note={note}
                                >
                                  <button
                                    type="button"
                                    onClick={() => handleSelectOutfit(item.id, undefined, sty.id)}
                                    className={`group relative w-full rounded-xl p-2 text-center transition-all duration-200 ease-out cursor-pointer flex flex-col items-center border hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 ${
                                      isSelected
                                        ? 'bg-[#FFFDF9] border-[#991B1E] shadow-[0_6px_16px_rgba(153,27,30,0.18)] ring-1 ring-[#C8973E]/60'
                                        : 'bg-white/40 border-[#DECBB3]/70 hover:bg-white hover:border-[#991B1E] hover:shadow-md'
                                    }`}
                                  >
                                    {/* Thumbnail */}
                                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#EFE6D8]/70 mb-1 border border-[#E5D8C6]/70">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className={`w-full h-full object-cover transition-transform duration-300 ${
                                          isSelected ? 'scale-105' : 'group-hover:scale-105 opacity-90 group-hover:opacity-100'
                                        }`}
                                      />
                                      {isSelected && (
                                        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#991B1E] text-white flex items-center justify-center shadow-xs">
                                          <Check className="w-2.5 h-2.5" />
                                        </span>
                                      )}
                                    </div>

                                    <span
                                      className={`font-serif text-xs font-bold leading-tight truncate max-w-full ${
                                        isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'
                                      }`}
                                    >
                                      {item.shortLabel}
                                    </span>
                                    <span className="text-[9px] text-[#7A695B] bg-[#EFE7DC] px-1.5 py-0.5 rounded-sm mt-1 truncate max-w-full">
                                      {item.highlightTag}
                                    </span>
                                  </button>
                                </CultureOptionTooltip>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* -------------------------------------------------------------
                    VIEW MODE 3: TẤT CẢ 10 TRANG PHỤC (ALL 10 GARMENTS GRID)
                   ------------------------------------------------------------- */}
                {outfitViewMode === 'all' && (
                  <div className="grid grid-cols-2 gap-2">
                    {ALL_STUDIO_OUTFITS.map((item) => {
                      const isSelected = selectedOutfitId === item.id;
                      const note = OUTFIT_CULTURE_NOTES[item.id];
                      return (
                        <CultureOptionTooltip
                          key={item.id}
                          note={note}
                        >
                          <button
                            type="button"
                            onClick={() => handleSelectOutfit(item.id)}
                            className={`group relative w-full rounded-xl p-2.5 text-center transition-all duration-200 ease-out cursor-pointer flex flex-col items-center border hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 ${
                              isSelected
                                ? 'bg-[#FFFDF9] border-[#991B1E] shadow-[0_6px_18px_rgba(153,27,30,0.18)] ring-1 ring-[#C8973E]/60'
                                : 'bg-[#FFFDF9]/40 border-[#DECBB3]/70 hover:bg-[#FFFDF9] hover:border-[#991B1E] hover:shadow-md'
                            }`}
                          >
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#EFE6D8]/70 mb-1.5 border border-[#E5D8C6]/70">
                              <img
                                src={item.image}
                                alt={item.name}
                                className={`w-full h-full object-cover transition-transform duration-300 ${
                                  isSelected ? 'scale-105' : 'group-hover:scale-105 opacity-90 group-hover:opacity-100'
                                }`}
                              />
                              {isSelected && (
                                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#991B1E] text-white flex items-center justify-center shadow-xs">
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>

                            <span
                              className={`font-serif text-xs font-bold leading-tight ${
                                isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'
                              }`}
                            >
                              {item.shortLabel}
                            </span>
                            <span className="text-[9px] text-[#7A695B] bg-[#EFE7DC] px-1.5 py-0.5 rounded-sm mt-1 truncate max-w-full">
                              {item.highlightTag}
                            </span>
                          </button>
                        </CultureOptionTooltip>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: KHO MÀU SẮC, BỘ LỌC TÔNG DA & QUY LUẬT PHỐI MÀU */}
          {activeLeftTab === 'color' && (
            <div className="space-y-3.5 flex-1 overflow-y-auto pr-1">
              {/* SECTION 1: BỘ LỌC TÔNG DA CỦA NGƯỜI DÙNG */}
              <div className="p-3 rounded-2xl bg-white/70 border border-[#E2D5C3] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                    <Sun className="w-3.5 h-3.5 text-[#C8973E]" />
                    <span>BỘ LỌC TÔNG DA</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#991B1E] bg-[#991B1E]/10 px-2 py-0.5 rounded-full">
                    {activeSkinToneObj.nameVi.split(' / ')[0]}
                  </span>
                </div>

                {/* 4 Skin Tone Choice Buttons */}
                <div className="grid grid-cols-2 gap-1.5">
                  {SKIN_TONES_DATA.map((st) => {
                    const isSelected = skinTone === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handleSelectSkinTone(st.id)}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#FFFDF9] border-[#991B1E] shadow-2xs ring-1 ring-[#991B1E]/30'
                            : 'bg-white/40 border-[#DECBB3]/70 hover:bg-white'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/15 shadow-inner shrink-0"
                          style={{ backgroundColor: st.sampleHex }}
                        />
                        <div className="min-w-0">
                          <div className={`text-[11px] font-bold truncate ${isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'}`}>
                            {st.nameVi.split(' / ')[0]}
                          </div>
                          <div className="text-[9px] text-[#7A695B] truncate">
                            {st.undertone === 'cool'
                              ? 'Sắc mát hồng'
                              : st.undertone === 'neutral'
                              ? 'Trung tính'
                              : st.undertone === 'warm'
                              ? 'Vàng ấm'
                              : 'Bánh mật'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Filter toggle: All Colors vs Flattering only */}
                <div className="flex items-center justify-between pt-1 border-t border-[#F0E5D5] text-[10px]">
                  <span className="text-[#6E5D50] font-medium">Lọc bảng màu:</span>
                  <div className="inline-flex rounded-lg p-0.5 bg-[#EAE0D2]">
                    <button
                      type="button"
                      onClick={() => setFilterFlatteringOnly(false)}
                      className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                        !filterFlatteringOnly ? 'bg-white text-[#991B1E] shadow-2xs' : 'text-[#6E5D50]'
                      }`}
                    >
                      Tất cả (8)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterFlatteringOnly(true)}
                      className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        filterFlatteringOnly ? 'bg-white text-[#991B1E] shadow-2xs' : 'text-[#6E5D50]'
                      }`}
                    >
                      <span>★ Tôn da</span>
                      <span className="text-[9px] text-[#991B1E]">
                        ({activeSkinToneObj.recommendedColors.length})
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 2: QUY LUẬT PHỐI MÀU — GIỚI HẠN 3 MÀU (60-30-10) */}
              <div className="p-3 rounded-2xl bg-[#FAF5EB] border border-[#E5D7C3] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#991B1E]" />
                    <span>QUY TẮC 3 MÀU THỜI TRANG</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      colorHarmony.isWithinLimit
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {colorHarmony.isWithinLimit ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    <span>{colorHarmony.totalColorCount} / 3 màu</span>
                  </span>
                </div>

                {/* 60-30-10 Ratio Visualization Bar */}
                <div className="space-y-1">
                  <div className="h-2 w-full rounded-full overflow-hidden flex bg-black/10">
                    <div
                      style={{ width: '60%', backgroundColor: activeColorObj.hex }}
                      className="h-full transition-all"
                      title="60% Màu áo chính"
                    />
                    <div
                      style={{ width: '30%', backgroundColor: colorHarmony.palette[1]?.hex || '#FAF8F5' }}
                      className="h-full border-x border-black/10 transition-all"
                      title="30% Màu nền quần/cổ"
                    />
                    <div
                      style={{ width: '10%', backgroundColor: colorHarmony.palette[2]?.hex || '#C8973E' }}
                      className="h-full transition-all"
                      title="10% Phụ kiện điểm nhấn"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-[#7A695B]">
                    <span>60% Áo chính</span>
                    <span>30% Quần & Cổ</span>
                    <span>10% Phụ kiện</span>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-1 pt-1 border-t border-[#EAE0D2]">
                  {colorHarmony.palette.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 truncate">
                        <span
                          className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: item.hex }}
                        />
                        <span className="text-[#1C1917] font-medium truncate">{item.name}</span>
                      </div>
                      <span className="text-[#7A695B] text-[9px] shrink-0">{item.role}</span>
                    </div>
                  ))}
                </div>

                {/* Advice text */}
                <p className="text-[10px] leading-relaxed text-[#6E5D50] italic pt-1">
                  "{colorHarmony.limitAdvice}"
                </p>
              </div>

              {/* SECTION 3: BẢNG MÀU MẶC ĐỊNH VỚI HUY HIỆU TÔN DA */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#7A695B]">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-[#991B1E]">
                    BẢNG MÀU TRUYỀN THỐNG
                  </span>
                  <span className="font-bold text-[#1C1917]">{activeColorObj.nameVi}</span>
                </div>

                {/* Color Swatches Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {COLORS_DATA.filter((col) => {
                    if (!filterFlatteringOnly) return true;
                    return activeSkinToneObj.recommendedColors.includes(col.id);
                  }).map((col) => {
                    const isSelected = selectedColorId === col.id;
                    const isFlattering = activeSkinToneObj.recommendedColors.includes(col.id);
                    const isDiscouraged = activeSkinToneObj.discouragedColors?.includes(col.id);
                    const note = COLOR_CULTURE_NOTES[col.id];

                    const buttonElement = (
                      <button
                        type="button"
                        onClick={() => handleSelectColor(col.id)}
                        className={`group relative w-full rounded-xl p-2 flex flex-col items-center justify-center transition-all duration-200 ease-out cursor-pointer border hover:scale-105 hover:-translate-y-0.5 hover:shadow-md active:scale-95 ${
                          isSelected
                            ? 'border-[#991B1E] ring-2 ring-[#C8973E]/70 shadow-sm bg-white'
                            : 'border-[#DECBB3]/70 hover:border-[#991B1E] bg-white/40 hover:bg-white'
                        }`}
                      >
                        {/* Flattering Star Badge */}
                        {isFlattering && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C8973E] text-white flex items-center justify-center text-[8px] font-bold shadow-2xs">
                            ★
                          </span>
                        )}
                        {isDiscouraged && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px] font-bold shadow-2xs">
                            !
                          </span>
                        )}

                        <span
                          className="w-7 h-7 rounded-full shadow-inner flex items-center justify-center border border-black/10 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: col.hex }}
                        >
                          {isSelected && (
                            <Check
                              className="w-3.5 h-3.5 drop-shadow-sm"
                              style={{ color: col.textColor || '#FFFFFF' }}
                            />
                          )}
                        </span>
                        <span className="text-[10px] font-medium text-[#45362E] mt-1 truncate max-w-full">
                          {col.name}
                        </span>
                      </button>
                    );

                    return note ? (
                      <CultureOptionTooltip key={col.id} note={note}>
                        {buttonElement}
                      </CultureOptionTooltip>
                    ) : (
                      <div key={col.id}>{buttonElement}</div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: PHÂN TÍCH TƯƠNG THÍCH MÀU & TÔNG DA */}
              <div className="p-3 rounded-2xl bg-white border border-[#E0D2BF] text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-[#991B1E] text-xs">
                    Hòa sắc với {activeSkinToneObj.nameVi.split(' / ')[0]}
                  </span>
                  <span className="text-[10px] font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {colorHarmony.harmonyScore}/10 • {colorHarmony.harmonyRuleName}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#594C42]">
                  {colorHarmony.skinToneFeedback}
                </p>
                <div className="pt-1.5 border-t border-[#F0E5D5] flex items-center justify-between text-[10px] text-[#7A695B]">
                  <span>Ý nghĩa văn hóa:</span>
                  <span className="italic font-serif truncate max-w-[170px]">{activeColorObj.nameVi}</span>
                </div>
              </div>

              {/* SECTION 5: GỢI Ý PHỐI MÀU TỰ ĐỘNG (1-CLICK COLOR PRESETS) */}
              <div className="space-y-2 pt-1 border-t border-[#E5D7C3]">
                <div className="flex items-center justify-between text-xs text-[#7A695B]">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-[#991B1E] flex items-center gap-1">
                    <Wand2 className="w-3 h-3 text-[#C8973E]" />
                    <span>GỢI Ý PHỐI MÀU TỰ ĐỘNG</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {COLOR_HARMONY_PRESETS.map((preset) => {
                    const presetColor = COLORS_DATA.find((c) => c.id === preset.colorId);
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplyColorPreset(preset)}
                        className="p-2 rounded-xl text-left border border-[#DECBB3]/70 bg-white/60 hover:bg-white hover:border-[#991B1E] hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 ease-out cursor-pointer group flex flex-col justify-between active:scale-98"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: presetColor?.hex }}
                          />
                          <span className="text-[8px] font-bold text-[#991B1E] group-hover:translate-x-0.5 transition-transform">
                            Áp dụng →
                          </span>
                        </div>
                        <div className="text-[10px] font-bold text-[#1C1917] truncate leading-tight">
                          {preset.title}
                        </div>
                        <div className="text-[9px] text-[#7A695B] line-clamp-1 mt-0.5">
                          {preset.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BỐI CẢNH & PHONG CÁCH */}
          {activeLeftTab === 'context' && (
            <div className="space-y-3.5 flex-1 overflow-y-auto pr-1">
              <div>
                <span className="font-semibold uppercase tracking-wider text-[10px] text-[#991B1E] block mb-1.5">
                  DỊP SỰ KIỆN (OCCASION)
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {OCCASIONS_DATA.map((occ) => {
                    const note = OCCASION_CULTURE_NOTES[occ.id];
                    const btn = (
                      <button
                        type="button"
                        onClick={() => handleSelectOccasion(occ.id)}
                        className={`w-full p-2 rounded-xl text-left text-xs border transition-all duration-200 ease-out cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98 ${
                          selectedOccasionId === occ.id
                            ? 'bg-[#991B1E]/10 border-[#991B1E] text-[#991B1E] font-bold shadow-2xs'
                            : 'bg-white/40 border-[#DECBB3]/70 text-[#45362E] hover:bg-white hover:border-[#991B1E] hover:shadow-xs'
                        }`}
                      >
                        <div className="truncate font-semibold">{occ.nameVi}</div>
                        <div className="text-[9px] text-[#7A695B] line-clamp-1 mt-0.5">{occ.description}</div>
                      </button>
                    );
                    return note ? (
                      <CultureOptionTooltip key={occ.id} note={note}>
                        {btn}
                      </CultureOptionTooltip>
                    ) : (
                      <div key={occ.id}>{btn}</div>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="font-semibold uppercase tracking-wider text-[10px] text-[#991B1E] block mb-1.5">
                  PHONG CÁCH REMIX (STYLE)
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {STYLES_DATA.map((sty) => {
                    const note = STYLE_CULTURE_NOTES[sty.id];
                    const btn = (
                      <button
                        type="button"
                        onClick={() => handleSelectStyle(sty.id)}
                        className={`w-full p-2 rounded-xl text-left text-xs border transition-all duration-200 ease-out cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98 ${
                          selectedStyleId === sty.id
                            ? 'bg-[#991B1E]/10 border-[#991B1E] text-[#991B1E] font-bold shadow-2xs'
                            : 'bg-white/40 border-[#DECBB3]/70 text-[#45362E] hover:bg-white hover:border-[#991B1E] hover:shadow-xs'
                        }`}
                      >
                        <div className="truncate font-semibold">{sty.nameVi}</div>
                        <div className="text-[9px] text-[#7A695B] line-clamp-1 mt-0.5">{sty.description}</div>
                      </button>
                    );
                    return note ? (
                      <CultureOptionTooltip key={sty.id} note={note}>
                        {btn}
                      </CultureOptionTooltip>
                    ) : (
                      <div key={sty.id}>{btn}</div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* -------------------------------------------------------------------
            CENTER MODEL CHARACTER SECTION: DYNAMIC 3D CANVAS & AVATAR
           ------------------------------------------------------------------- */}
        <div className="w-full lg:w-[46%] flex-1 order-1 lg:order-2 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[540px] relative px-2">
          {/* Mode Switcher: 3D Canvas vs Default Character Avatar Portrait */}
          <div className="mb-2.5 inline-flex items-center gap-1 p-1 bg-[#EFE6D8]/80 rounded-xl border border-[#DACBB7] shadow-2xs z-10">
            <button
              type="button"
              onClick={() => setCenterViewMode('3d-canvas')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                centerViewMode === '3d-canvas'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              <span>Mô hình 3D Toàn thân</span>
            </button>
            <button
              type="button"
              onClick={() => setCenterViewMode('avatar-portrait')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                centerViewMode === 'avatar-portrait'
                  ? 'bg-white text-[#991B1E] shadow-xs'
                  : 'text-[#68584B] hover:text-[#1C1917]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
              <span>Avatar Chân dung ({gender === 'female' ? 'Nữ • Áo Trắng' : 'Nam • Áo Đen'})</span>
            </button>

            {/* Quick Weather & Occasion Suggestion in Center Controls */}
            <button
              type="button"
              onClick={() => setIsWeatherWizardOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-[#FAF4EA] hover:bg-white text-[#B45309] hover:text-[#92400E] border border-[#F59E0B]/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs hover:shadow-xs ml-1"
              title="Gợi ý phối đồ dựa trên thời tiết vùng miền và dịp mặc"
            >
              <CloudSun className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Gợi ý Thời tiết</span>
            </button>

            {/* Quick AI Stylist Button in Center */}
            <button
              type="button"
              onClick={() => setIsAIStylistModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-[#FAF4EA] hover:bg-white text-[#991B1E] border border-[#C8973E]/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs hover:shadow-xs ml-1"
              title="Nhấn để AI gợi ý 3 phong cách phối đồ độc đáo"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#C8973E]" />
              <span>Gợi ý AI</span>
            </button>

            {/* Quick Cultural Reader in Center Controls */}
            <button
              type="button"
              onClick={() => handleOpenQuickCulture('outfit')}
              className="px-2.5 py-1 rounded-lg bg-[#FAF4EA] hover:bg-white text-[#991B1E] border border-[#C8973E]/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs hover:shadow-xs"
              title="Đọc nhanh thông tin văn hóa về trang phục & phụ kiện bạn đang phối"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#991B1E]" />
              <span>Đọc Văn Hóa</span>
            </button>
          </div>

          {/* Gentle Floating Notification when adding an accessory */}
          {recentlyEquippedName && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1917]/90 text-white text-xs font-bold shadow-lg backdrop-blur-xs animate-gentle-shake border border-[#C8973E]/60">
                <Sparkles className="w-3.5 h-3.5 text-[#F5D587]" />
                <span>+ Đã thêm phụ kiện: {recentlyEquippedName}</span>
              </div>
            </div>
          )}

          {/* Character Container with reactive gentle shake on accessory equip */}
          <div className={`w-full flex flex-col items-center justify-center transition-transform duration-300 ${shakingAccessoryId ? 'animate-gentle-shake' : ''}`}>
            {centerViewMode === '3d-canvas' ? (
              /* Main 3D Stylized Character Engine */
              <Stylized3DCharacter
                gender={gender}
                skinTone={skinTone}
                outfitId={selectedOutfitId}
                colorId={selectedColorId}
                accessories={selectedAccessories}
              />
            ) : (
              /* High-fidelity Close-up Default Character Avatar Portrait */
              <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-white/95 to-[#FAF5EE]/95 border border-[#DECBB3] shadow-lg p-5 sm:p-6 flex flex-col items-center text-center animate-in fade-in duration-300">
                <div className="relative mb-3">
                  <CharacterDefaultAvatar
                    gender={gender}
                    skinTone={skinTone}
                    size="hero"
                    className="drop-shadow-md"
                  />
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#991B1E] text-white shadow-xs whitespace-nowrap">
                    {gender === 'female' ? 'Áo Dài Trắng Lụa Mộc' : 'Áo Dài Đen Lập Lĩnh'}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                    {gender === 'female' ? 'Người Mẫu Nữ Truyền Thống' : 'Người Mẫu Nam Nho Nhã'}
                  </h3>
                  <p className="text-xs text-[#7A695B]">
                    Tông da: <span className="font-bold text-[#991B1E]">{activeSkinToneObj.nameVi}</span>
                  </p>
                  <p className="text-[11px] text-[#6E5D50] leading-relaxed max-w-xs mx-auto pt-1">
                    {gender === 'female'
                      ? 'Diện Áo Dài Trắng lụa tơ tằm thanh khiết với cổ cao lập lĩnh duyên dáng, tóc búi cài trâm sen vàng tôn vinh nét dịu dàng thuần Việt.'
                      : 'Diện Áo Dài Đen ngũ thân cổ lập lĩnh cài cúc đồng ngũ thường, lót cổ trắng trang nghiêm và phong thái nho nhã đĩnh đạc.'}
                  </p>
                </div>

                {/* Quick Cultural Highlight Bar */}
                <div className="mt-4 w-full grid grid-cols-2 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-[#F5EFE6]/70 border border-[#E5D7C5]">
                    <span className="text-[9px] font-bold uppercase text-[#991B1E] block">Sắc độ & Làn da</span>
                    <span className="text-xs font-semibold text-[#1C1917]">
                      {skinTone === 'fair' ? 'Sáng hồng tương phản' : skinTone === 'neutral' ? 'Hài hòa tự nhiên' : skinTone === 'warm' ? 'Ấm áp Á Đông' : 'Bánh mật khỏe khoắn'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F5EFE6]/70 border border-[#E5D7C5]">
                    <span className="text-[9px] font-bold uppercase text-[#C8973E] block">Trang phục gốc</span>
                    <span className="text-xs font-semibold text-[#1C1917]">
                      {gender === 'female' ? 'Áo Dài Trắng' : 'Áo Dài Đen'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGenderModal(true)}
                  className="mt-4 text-xs font-bold text-[#991B1E] hover:text-[#781316] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
                  <span>Khởi tạo lại Avatar & Tông da →</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Cultural & Color Score Floating Pills */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D5C6B3] shadow-xs text-xs">
              <ShieldCheck className="w-4 h-4 text-[#166534]" />
              <span className="text-[#45362E] font-medium">Văn hóa:</span>
              <span className="font-bold text-[#991B1E]">{currentCultureCheck.indicatorScore}/10</span>
              <span className="text-[#C8973E]">✦</span>
              <span className="text-[11px] text-[#6E5D50] truncate max-w-[140px] sm:max-w-none">
                {currentCultureCheck.statusText}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D5C6B3] shadow-xs text-xs">
              <Palette className="w-3.5 h-3.5 text-[#C8973E]" />
              <span className="text-[#45362E] font-medium">Hòa sắc:</span>
              <span className="font-bold text-[#991B1E]">{colorHarmony.harmonyScore}/10</span>
              <span className="text-[#C8973E]">✦</span>
              <span className="text-[11px] text-[#6E5D50] truncate max-w-[150px] sm:max-w-none">
                {colorHarmony.isWithinLimit ? '✓ Chuẩn 3 màu' : '⚠️ Quá 3 màu'} • {activeSkinToneObj.nameVi.split(' / ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            RIGHT GLASS PANEL: KHO PHỤ KIỆN
           ------------------------------------------------------------------- */}
        <aside
          aria-label="Kho phụ kiện"
          className="w-full lg:w-[26%] lg:min-w-[270px] lg:max-w-[320px] order-3 h-fit rounded-2xl bg-[#FAF7F2]/65 backdrop-blur-md border border-[#D8C7B2]/80 shadow-[0_8px_24px_rgba(28,25,23,0.05)] p-4 transition-all"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E2D4C0]/70">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#991B1E] block">
                KHO PHỤ KIỆN
              </span>
              <h2 className="font-serif text-sm sm:text-base font-bold text-[#1C1917] tracking-wide">
                TRANG SỨC & NÓN
              </h2>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full transition-all duration-300 ${
                isAccessoryBadgeShaking
                  ? 'animate-gentle-shake bg-[#991B1E] text-white scale-110 shadow-xs ring-2 ring-[#C8973E]/60'
                  : 'text-[#991B1E] bg-[#991B1E]/10'
              }`}
            >
              {selectedAccessories.length} đã mặc
            </span>
          </div>

          {/* Quick Cultural Info Bar for Accessories */}
          <button
            type="button"
            onClick={() => handleOpenQuickCulture('equipped-accessories')}
            className="mb-3 w-full p-2.5 rounded-xl bg-gradient-to-r from-[#FAF3E8] to-[#FFFDF9] border border-[#E0D0BC] flex items-center justify-between text-xs text-[#524439] hover:border-[#991B1E] transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98"
          >
            <span className="flex items-center gap-1.5 font-medium truncate text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-[#991B1E] shrink-0" />
              <span>Ý nghĩa văn hóa {selectedAccessories.length} phụ kiện</span>
            </span>
            <span className="text-[10.5px] font-bold text-[#991B1E] shrink-0 flex items-center gap-0.5">
              <span>Đọc nhanh</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          {/* Accessories 2-Column Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 gap-2">
            {STUDIO_ACCESSORIES.map((acc) => {
              const isSelected = selectedAccessories.includes(acc.id);
              const isShaking = shakingAccessoryId === acc.id;
              const note = ACCESSORY_CULTURE_NOTES[acc.id];
              const btn = (
                <button
                  type="button"
                  onClick={() => handleToggleAccessory(acc.id)}
                  className={`group relative w-full rounded-xl p-2 text-center transition-all duration-200 ease-out cursor-pointer flex flex-col items-center justify-between border hover:scale-[1.04] hover:-translate-y-0.5 active:scale-95 ${
                    isShaking ? 'animate-gentle-shake ring-2 ring-[#991B1E] shadow-lg z-10' : ''
                  } ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-[#991B1E] shadow-[0_6px_16px_rgba(153,27,30,0.16)] ring-1 ring-[#C8973E]/60'
                      : 'bg-[#FFFDF9]/40 border-[#DECBB3]/70 hover:bg-white hover:border-[#991B1E] hover:shadow-md'
                  }`}
                >
                  <div className="w-full flex items-center justify-between mb-0.5">
                    <span className="text-[8px] text-[#7A695B] truncate">
                      {acc.category}
                    </span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                        isShaking
                          ? 'animate-accessory-pop bg-[#991B1E] text-white ring-2 ring-[#C8973E]'
                          : isSelected
                          ? 'bg-[#991B1E] text-white'
                          : 'border border-[#D0C2B0] bg-white/60 text-transparent'
                      }`}
                    >
                      <Check className="w-2 h-2" />
                    </span>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-lg bg-[#EFE6D8]/60 border border-[#E5D8C6]/60 flex items-center justify-center my-0.5 transition-transform ${
                      isShaking ? 'animate-accessory-pop scale-110' : ''
                    }`}
                  >
                    <AccessoryMiniGraphic type={acc.iconType} isSelected={isSelected} />
                  </div>

                  <span
                    className={`font-serif text-xs font-bold leading-tight mt-1 truncate max-w-full ${
                      isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'
                    }`}
                  >
                    {acc.shortLabel}
                  </span>
                </button>
              );

              return note ? (
                <CultureOptionTooltip key={acc.id} note={note}>
                  {btn}
                </CultureOptionTooltip>
              ) : (
                <div key={acc.id}>{btn}</div>
              );
            })}
          </div>

          {/* Quick Cultural Insight Card Link */}
          <div className="mt-3 pt-3 border-t border-[#E8DAC7]/70">
            <button
              type="button"
              onClick={() => setIsInsightOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-white/60 hover:bg-white border border-[#D8C7B2] text-xs font-semibold text-[#991B1E] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Xem Di Sản & Điển Tích</span>
            </button>
          </div>
        </aside>
      </div>

      {/* =====================================================================
          BOTTOM ACTION BAR: RESET, SUBMIT & EVALUATION
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-5 pt-1">
        <div className="rounded-2xl bg-[#FAF7F2]/80 backdrop-blur-md border border-[#D8C7B2]/80 shadow-[0_4px_20px_rgba(28,25,23,0.06)] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left Actions: Reset & Change Gender */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGenderModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 hover:bg-white text-[#45362E] border border-[#DECBB3] text-xs font-semibold transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#991B1E]" />
              <span>Đổi giới tính</span>
            </button>

            <button
              type="button"
              onClick={handleResetStudio}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 hover:bg-white text-[#45362E] border border-[#DECBB3] text-xs font-semibold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mặc định</span>
            </button>
          </div>

          {/* Right Actions: View Evaluation & Submit Look */}
          <div className="flex items-center gap-3 ml-auto">
            {/* View Evaluation Button */}
            <button
              type="button"
              onClick={() => setIsEvaluationModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/90 hover:bg-white text-[#1C1917] border border-[#D5C6B3] text-xs font-bold transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#166534]" />
              <span className="hidden sm:inline">Xem Đánh Giá Văn Hóa</span>
              <span className="sm:hidden">Đánh Giá</span>
            </button>

            {/* Submit Selection (Pop-up Confirmation) */}
            <button
              type="button"
              onClick={handleOpenSubmitModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#C8973E]" />
              <span>Nộp Phối Đồ</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          POP-UP 1: HỎI GIỚI TÍNH & TÔNG DA KHỞI TẠO HÌNH ẢNH NGƯỜI MẪU (MẶC ĐỊNH NAM ÁO DÀI ĐEN, NỮ ÁO DÀI TRẮNG)
         ===================================================================== */}
      {showGenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] overflow-y-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8973E]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center mb-4">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#991B1E] bg-[#991B1E]/10 px-3 py-1 rounded-full mb-2">
                BƯỚC 1: KHỞI TẠO HÌNH ẢNH NGƯỜI MẪU
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                Chọn Giới Tính & Tông Da
              </h3>
              <p className="text-xs sm:text-sm text-[#68584B] mt-1.5 max-w-md mx-auto leading-relaxed">
                Hệ thống khởi tạo avatar người mẫu văn hóa: Nữ mặc định Áo Dài Trắng tinh khôi, Nam mặc định Áo Dài Đen nho nhã theo đúng tông da bạn chọn.
              </p>
            </div>

            {/* Live Interactive Avatar Preview Card */}
            <div className="mb-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#D8C7B2] shadow-sm flex items-center gap-3.5 sm:gap-4 transition-all">
              <CharacterDefaultAvatar
                gender={gender}
                skinTone={skinTone}
                size="lg"
                className="shrink-0 drop-shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#991B1E]/10 text-[#991B1E]">
                    Avatar Người Mẫu Hiện Tại
                  </span>
                  <span className="text-[11px] text-[#7A695B] font-semibold">
                    {gender === 'female' ? 'Nữ giới' : 'Nam giới'} • {activeSkinToneObj.nameVi.split(' / ')[0]}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#1C1917] mt-0.5">
                  {gender === 'female' ? 'Áo Dài Trắng Lụa Mộc Tinh Khôi' : 'Áo Dài Đen Lập Lĩnh Nho Nhã'}
                </h4>
                <p className="text-[11px] text-[#6E5D50] leading-snug mt-1">
                  {gender === 'female'
                    ? 'Tà lụa trắng tơ tằm thanh khiết, cổ áo lập lĩnh truyền thống, tóc búi cài trâm sen vàng tôn vẻ duyên dáng dịu dàng.'
                    : 'Áo ngũ thân cài cúc đồng ngũ thường, lót cổ trắng trang nghiêm, thể hiện phong thái trí thức đĩnh đạc và thâm trầm.'}
                </p>
              </div>
            </div>

            {/* 1. Chọn Giới Tính */}
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E] block mb-2">
                1. GIỚI TÍNH & TRANG PHỤC MẶC ĐỊNH
              </span>
              <div className="grid grid-cols-2 gap-3">
                {/* Option Nữ */}
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center group ${
                    gender === 'female'
                      ? 'bg-white border-[#991B1E] shadow-md ring-2 ring-[#991B1E]/20'
                      : 'bg-white/60 border-[#DECBB3] hover:bg-white hover:border-[#C8973E]'
                  }`}
                >
                  <CharacterDefaultAvatar
                    gender="female"
                    skinTone={skinTone}
                    size="md"
                    className="mb-2 group-hover:scale-105 transition-transform drop-shadow-2xs"
                  />
                  <div className="font-serif text-base font-bold text-[#1C1917]">NỮ</div>
                  <div className="text-[11px] text-[#991B1E] font-bold mt-0.5">Áo Dài Trắng</div>
                  <p className="text-[10px] text-[#7A695B] mt-1 leading-snug">
                    Áo dài trắng lụa mộc tinh khôi, duyên dáng và thanh lịch.
                  </p>
                </button>

                {/* Option Nam */}
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center group ${
                    gender === 'male'
                      ? 'bg-white border-[#991B1E] shadow-md ring-2 ring-[#991B1E]/20'
                      : 'bg-white/60 border-[#DECBB3] hover:bg-white hover:border-[#C8973E]'
                  }`}
                >
                  <CharacterDefaultAvatar
                    gender="male"
                    skinTone={skinTone}
                    size="md"
                    className="mb-2 group-hover:scale-105 transition-transform drop-shadow-2xs"
                  />
                  <div className="font-serif text-base font-bold text-[#1C1917]">NAM</div>
                  <div className="text-[11px] text-[#2563EB] font-bold mt-0.5">Áo Dài Đen</div>
                  <p className="text-[10px] text-[#7A695B] mt-1 leading-snug">
                    Áo dài đen lập lĩnh nho nhã, lịch thiệp và đĩnh đạc.
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Chọn Tông Da */}
            <div className="mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E] block mb-2">
                2. TÔNG DA CỦA BẠN (SKIN TONE)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SKIN_TONES_DATA.map((st) => {
                  const isSelected = skinTone === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSkinTone(st.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-white border-[#991B1E] shadow-xs ring-2 ring-[#991B1E]/20'
                          : 'bg-white/60 border-[#DECBB3] hover:bg-white hover:border-[#C8973E]'
                      }`}
                    >
                      <CharacterDefaultAvatar
                        gender={gender}
                        skinTone={st.id}
                        size="xs"
                        className="shrink-0 drop-shadow-2xs"
                      />
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-[#991B1E]' : 'text-[#1C1917]'}`}>
                          {st.nameVi.split(' / ')[0]}
                        </div>
                        <div className="text-[10px] text-[#7A695B] truncate">
                          {st.undertone === 'cool'
                            ? 'Sắc mát hồng'
                            : st.undertone === 'neutral'
                            ? 'Trung tính'
                            : st.undertone === 'warm'
                            ? 'Vàng ấm Á Đông'
                            : 'Bánh mật rám nắng'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const defaultColor: ColorId = gender === 'male' ? 'black' : 'cream';
                  onChangeLook({
                    ...currentLook,
                    gender,
                    skinTone,
                    outfit: 'ao-dai',
                    color: defaultColor,
                    accessories: []
                  });
                  setShowGenderModal(false);
                }}
                className="w-full py-3 rounded-xl bg-[#991B1E] hover:bg-[#781316] text-white text-sm font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Khởi tạo người mẫu ({gender === 'female' ? 'NỮ • Áo Dài Trắng' : 'NAM • Áo Dài Đen'} • {activeSkinToneObj.nameVi.split(' / ')[0]}) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          POP-UP 2: XÁC NHẬN NỘP PHỐI ĐỒ (CONFIRMATION MODAL)
         ===================================================================== */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EAE0D2] text-[#6E5D50] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#991B1E]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                Xác Nhận Nộp Bộ Phối Đồ?
              </h3>
              <p className="text-xs text-[#68584B] mt-1">
                Bạn có chắc chắn muốn nộp và lưu lại bộ trang phục này vào Lookbook cá nhân không?
              </p>
            </div>

            {/* Recap Summary Box */}
            <div className="rounded-2xl bg-white border border-[#E0D2BF] p-4 mb-6 space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Giới tính & Tông da:</span>
                <span className="font-bold text-[#1C1917] flex items-center gap-2">
                  <CharacterDefaultAvatar gender={gender} skinTone={skinTone} size="xs" />
                  <span>{gender === 'female' ? 'Nữ' : 'Nam'}</span>
                  <span className="text-[#C8973E]">✦</span>
                  <span
                    className="w-3 h-3 rounded-full inline-block border border-black/10"
                    style={{ backgroundColor: activeSkinToneObj.sampleHex }}
                  />
                  <span>{activeSkinToneObj.nameVi.split(' / ')[0]}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Trang phục đã chọn:</span>
                <span className="font-serif font-bold text-[#991B1E]">
                  {activeOutfitObj.vietnameseName}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Màu sắc chủ đạo:</span>
                <span className="font-bold flex items-center gap-1.5 text-[#1C1917]">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-black/10"
                    style={{ backgroundColor: activeColorObj.hex }}
                  />
                  {activeColorObj.nameVi}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Phụ kiện đi kèm:</span>
                <span className="font-medium text-[#1C1917]">
                  {selectedAccessories.length > 0
                    ? `${selectedAccessories.length} món (${selectedAccessories.join(', ')})`
                    : 'Không đeo phụ kiện (Tối giản)'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0E5D5]">
                <span className="text-[#6E5D50]">Hòa sắc thời trang:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {colorHarmony.harmonyScore}/10 • {colorHarmony.isWithinLimit ? 'Chuẩn 3 màu' : 'Quá 3 màu'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#6E5D50]">Điểm văn hóa sơ bộ:</span>
                <span className="font-bold text-[#166534] bg-[#166534]/10 px-2 py-0.5 rounded-md">
                  {currentCultureCheck.indicatorScore}/10 — {currentCultureCheck.statusText}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="py-3 rounded-xl border border-[#D5C6B3] bg-white text-[#4A3E34] text-xs sm:text-sm font-bold transition-all hover:bg-[#F5EFE6] cursor-pointer"
              >
                Chỉnh sửa thêm
              </button>
              <button
                type="button"
                onClick={handleConfirmSave}
                className="py-3 rounded-xl bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Xác nhận & Lưu lại ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          POP-UP 3: ĐÁNH GIÁ CÁCH PHỐI ĐỒ (EVALUATION MODAL)
         ===================================================================== */}
      {isEvaluationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] rounded-3xl border border-[#D8C7B2] shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setIsEvaluationModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EAE0D2] text-[#6E5D50] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Evaluation Header */}
            <div className="text-center mb-6">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#166534] bg-[#166534]/10 px-3 py-1 rounded-full mb-2">
                KẾT QUẢ ĐÁNH GIÁ PHỐI ĐỒ
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                Bản Đánh Giá Di Sản & Hòa Sắc
              </h3>
              <p className="text-xs sm:text-sm text-[#68584B] mt-1">
                Phân tích dựa trên chuẩn mực di sản Việt Nam, quy luật phối màu thời trang và độ tôn da
              </p>
            </div>

            {/* Celebratory Achievement Banner */}
            {savedToast && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-[#FFFDF9] to-emerald-50 border border-emerald-300 text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </span>
                  <div>
                    <div className="font-bold text-emerald-950 text-xs sm:text-sm">
                      🎉 Chúc mừng! Đã lưu thành công vào Tủ Đồ (Lookbook)
                    </div>
                    <div className="text-[11px] text-[#594C42]">
                      Trang phục và bảng màu đã được lưu trữ vào bộ sưu tập cá nhân của bạn.
                    </div>
                  </div>
                </div>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEvaluationModalOpen(false);
                      onNavigate('lookbook');
                    }}
                    className="self-end sm:self-center px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 cursor-pointer shadow-2xs transition-all hover:scale-102"
                  >
                    Xem Tủ Đồ →
                  </button>
                )}
              </div>
            )}

            {/* Color Harmony Assessment Card */}
            <div className="mb-6 p-4 rounded-2xl bg-white border border-[#E0D2BF] shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D5]">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#991B1E]" />
                  <span className="font-serif font-bold text-sm text-[#1C1917]">Đánh Giá Hòa Sắc & Tông Da</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {colorHarmony.harmonyScore}/10 Điểm
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${colorHarmony.isWithinLimit ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {colorHarmony.isWithinLimit ? '✓ Chuẩn 3 màu' : `⚠️ ${colorHarmony.totalColorCount} màu`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF5EB] border border-[#EBE0D2]">
                  <span className="text-[10px] font-bold text-[#7A695B] uppercase block mb-1">
                    Tương thích Tông Da ({activeSkinToneObj.nameVi.split(' / ')[0]}):
                  </span>
                  <p className="text-[#594C42] leading-relaxed">
                    {colorHarmony.skinToneFeedback}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF5EB] border border-[#EBE0D2]">
                  <span className="text-[10px] font-bold text-[#7A695B] uppercase block mb-1">
                    Quy Tắc 3 Màu & Phân Bổ (60-30-10):
                  </span>
                  <p className="text-[#594C42] leading-relaxed">
                    {colorHarmony.limitAdvice}
                  </p>
                </div>
              </div>
            </div>

            {/* Culture Check Card Integration */}
            <CultureCheckCard data={currentCultureCheck} className="mb-6" />

            {/* Action Bottom */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E5D7C5]">
              <button
                type="button"
                onClick={() => setIsEvaluationModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-[#D5C6B3] bg-white text-[#4A3E34] text-xs font-bold transition-all hover:bg-[#F5EFE6] cursor-pointer"
              >
                Tiếp tục chỉnh sửa
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEvaluationModalOpen(false);
                  onCreateLook();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#991B1E] hover:bg-[#781316] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Xem Tổng Thể Kết Quả (Lookbook) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Insight Popover */}
      <CulturalInsightPopover
        isOpen={isInsightOpen}
        onClose={() => setIsInsightOpen(false)}
        lookState={currentLook}
        initialTab="outfit"
      />

      {/* Quick Culture Reader Modal for Outfit & Accessories */}
      <StudioCultureQuickReader
        isOpen={isQuickCultureOpen}
        onClose={() => setIsQuickCultureOpen(false)}
        outfitId={selectedOutfitId}
        accessoryIds={selectedAccessories}
        colorId={selectedColorId}
        occasionId={selectedOccasionId}
        styleId={selectedStyleId}
        gender={gender}
        onToggleAccessory={handleToggleAccessory}
        onSelectOutfit={handleSelectOutfit}
        initialTab={quickCultureTab}
      />

      {/* AI Outfit Stylist Modal - 3 Unique Styles */}
      <AIOutfitStylistModal
        isOpen={isAIStylistModalOpen}
        onClose={() => setIsAIStylistModalOpen(false)}
        outfitId={selectedOutfitId}
        gender={gender}
        skinTone={skinTone}
        onApplySuggestion={handleApplyAISuggestion}
      />

      {/* Weather & Occasion Styling Suggestion Modal */}
      <WeatherOccasionStylingModal
        isOpen={isWeatherWizardOpen}
        onClose={() => setIsWeatherWizardOpen(false)}
        gender={gender}
        onApplyStyling={handleApplyWeatherWizardStyling}
        onSkipToManual={() => setIsWeatherWizardOpen(false)}
      />

      {/* Toast Alert when AI Style is Applied */}
      {aiAppliedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1C1917]/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md border border-[#F5D587]/40 animate-in slide-in-from-top-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#991B1E] to-[#C8973E] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#F5D587]" />
          </div>
          <div>
            <div className="font-bold text-[#F5D587] flex items-center gap-1.5">
              <span>Đã Áp Dụng Gợi Ý AI Thành Công</span>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-[11px] text-[#E8DCCB] mt-0.5">{aiAppliedToast}</div>
          </div>
        </div>
      )}
    </section>
  );
};
