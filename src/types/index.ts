export type OutfitId =
  | 'ao-dai'
  | 'ao-tu-than'
  | 'ao-ngu-than'
  | 'ao-ba-ba'
  | 'ao-nhat-binh'
  | 'ao-tac'
  | 'ao-tay-chen'
  | 'giao-linh'
  | 'vien-linh'
  | 'doi-kham';

export type OccasionId =
  | 'school'
  | 'festival'
  | 'photoshoot'
  | 'wedding'
  | 'casual'
  | 'cultural-event';

export type StyleId =
  | 'traditional'
  | 'modern'
  | 'minimal'
  | 'elegant'
  | 'street'
  | 'romantic';

export type ColorId =
  | 'red'
  | 'burgundy'
  | 'cream'
  | 'yellow'
  | 'blue'
  | 'green'
  | 'black'
  | 'pastel';

export type AccessoryCategory = 'khan' | 'non' | 'tui' | 'trang-suc' | 'giay';

export interface Outfit {
  id: OutfitId;
  name: string;
  vietnameseName: string;
  subtitle: string;
  era: string;
  description: string;
  context: string;
  features: string[];
  significance: string;
  whenAppropriate: string;
  image: string;
  placeholderComment: string;
  styles: StyleId[];
  colors: ColorId[];
  occasions: OccasionId[];
  cultureNote: string;
}

export interface Occasion {
  id: OccasionId;
  name: string;
  nameVi: string;
  description: string;
  vibe: string;
  icon: string;
}

export interface StyleOption {
  id: StyleId;
  name: string;
  nameVi: string;
  description: string;
  keywords: string[];
}

export interface ColorOption {
  id: ColorId;
  name: string;
  nameVi: string;
  hex: string;
  borderHex?: string;
  textColor: string;
  culturalMeaning: string;
}

export interface Accessory {
  id: string;
  category: AccessoryCategory;
  categoryName: string;
  name: string;
  type: 'traditional' | 'modern' | 'hybrid';
  description: string;
}

export type SkinToneId = 'fair' | 'neutral' | 'warm' | 'tan';

export interface SkinToneOption {
  id: SkinToneId;
  name: string;
  nameVi: string;
  description: string;
  undertone: 'cool' | 'neutral' | 'warm' | 'deep-warm';
  sampleHex: string;
  recommendedColors: ColorId[];
  discouragedColors?: ColorId[];
  harmonyTip: string;
}

export interface OutfitLookState {
  gender?: 'female' | 'male';
  skinTone?: SkinToneId;
  occasion: OccasionId | '';
  outfit: OutfitId | '';
  style: StyleId | '';
  color: ColorId | '';
  accessories: string[];
}

export interface CultureCheckData {
  outfitName: string;
  retainedPoints: string[];
  modernRemixPoints: string[];
  culturalNote: string;
  indicatorScore: number; // e.g. 8 or 9 out of 10
  statusText: string; // e.g. "Respectful Remix"
  contextSuitability: string;
  whyThisWorks: {
    colorHarmony: string;
    traditionalIdentity: string;
    modernTouch: string;
  };
}

export interface SavedLook {
  id: string;
  createdAt: string;
  gender?: 'female' | 'male';
  skinTone?: SkinToneId;
  title: string;
  subtitle: string;
  occasion: OccasionId;
  occasionName: string;
  outfit: OutfitId;
  outfitName: string;
  style: StyleId;
  styleName: string;
  color: ColorId;
  colorName: string;
  colorHex: string;
  accessories: string[];
  cultureCheck: CultureCheckData;
  image: string;
  isAiGenerated?: boolean;
  aiPrompt?: string;
  aiStyle?: 'editorial-studio' | 'cinematic-heritage' | 'magazine-cover' | 'couture-sketch';
}
