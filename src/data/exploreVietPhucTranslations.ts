import { ExploreGroupCategory, ExploreVietPhucItem } from './exploreVietPhucData';

export interface ExploreGarmentTranslation {
  name: string;
  vietnameseName: string;
  alternativeNames: string;
  groupCategoryLabel: string;
  subtitle: string;
  era: string;
  description: string;
  context: string;
  wearers: string;
  features: string[];
  collarStyle: string;
  sleeveStyle: string;
  silhouetteStructure: string;
  commonMaterials: string;
  colorsAndMotifs: string;
  whenAppropriate: string;
  significance: string;
  terminologyAndScopeNote: string;
  cultureNote?: string;
  collarTag?: string;
  dynastySeal?: string;
}

export const EXPLORE_GROUP_TABS_EN: Record<ExploreGroupCategory, string> = {
  all: 'All Attires',
  'cung-dinh-le-phuc': 'Court & Ceremonial',
  'he-ngu-than': 'Five-Panel (Ngũ Thân) System',
  'co-phuc-cac-trieu-dai': 'Cross, Round & Parallel Collars',
  'khai-niem-he-thong': 'Heritage Concepts & Systems',
  'truyen-thong-can-dai': 'Áo Dài · Tứ Thân · Bà Ba'
};

export const EXPLORE_VIET_PHUC_TRANSLATIONS_EN: Record<string, ExploreGarmentTranslation> = {
  'ao-nhat-binh': {
    name: 'Áo Nhật Bình',
    vietnameseName: 'Nguyễn Dynasty Imperial Nhật Bình Robe',
    alternativeNames: 'Nhật Bình y (日平衣), Huế Court Phi Phong Robe',
    groupCategoryLabel: 'Imperial Court & Ceremonial Robe',
    subtitle: 'An imperial artistic masterpiece for empresses, princesses, and noblewomen of the Nguyễn Dynasty',
    era: 'Nguyễn Dynasty (1802–1945), inherited and evolved from the Phi Phong robe of the Revival Lê – Nguyễn Lords era',
    description:
      'Prestigious ceremonial and court gown of Nguyễn Dynasty royal women, characterized by a prominent rectangular collar adorned with metallic embroidery and five-colored bands on the cuffs.',
    context:
      'Officially codified in the "Khâm định Đại Nam hội điển sự lệ" under Emperors Gia Long and Minh Mạng. Originally restricted to the Queen Mother, Empress, Princesses, and Consorts inside Huế Forbidden City; by the late 19th and early 20th century, it expanded beyond the palace to become high-status wedding attire for aristocratic families.',
    wearers:
      'Empress Dowagers, Empresses, Imperial Princesses, Royal Consorts, Noblewomen according to royal rank; today cherished by Vietnamese women for engagements, traditional weddings, and cultural celebrations.',
    features: [
      'Broad rectangular embroidered band across the chest bearing intricate royal motifs',
      'Two front symmetrical panels fastened with ties or buttons forming the character "Nhật" (日)',
      'Loose flowing sleeves ending with five-colored elemental bands (Green, Yellow, Blue, White, Red)',
      'Medallions of paired phoenixes (Loan Phượng), eight Buddhist treasures, and stylized wavy waters (thủy ba) at the hem'
    ],
    collarStyle:
      'Nhật Bình rectangular collar (Phương lĩnh / broad rectangular band draped down the chest, meeting to form the Chinese character "Nhật" 日).',
    sleeveStyle:
      'Moderately wide loose flowing sleeves; cuffs trimmed with 5 colored silk bands representing the mutual generation of the Five Elements.',
    silhouetteStructure:
      'A-line wide loose robe adapted from parallel-collar robes, with side hip slits; traditionally worn layered over an inner white five-panel robe, accompanied by white or red silk trousers and a royal pleated turban (khăn vành).',
    commonMaterials:
      'Fine silk gauze (sa), brocade (gấm), satin (đoạn), damask (vóc), combined with gold/silver thread embroidery and handcrafted sequins.',
    colorsAndMotifs:
      'Strictly hierarchical: Empress Dowager and Empress wore brilliant yellow/amber embroidered with Dragons and Phoenixes; Princesses and Consorts wore peach red, violet, and sapphire blue with phoenix medallions, peonies, longevity symbols, and tidal waves.',
    whenAppropriate:
      'Grand imperial court ceremonies in history, royal titles investiture; today ideally worn for traditional weddings, vow renewals, cultural exhibitions, and art photoshoots.',
    significance:
      'Crystallizes the pinnacle of Huế imperial embroidery craftsmanship and portrays the dignified, virtuous, and stately grace of Vietnamese women.',
    terminologyAndScopeNote:
      'The name "Nhật Bình" derives from the collar panels that join at the front to form the rectangular shape of the character "Nhật" (日). Distinguish imperial Nhật Bình (strictly regulated colors and embroidery count) from late-Nguyễn folk bridal Nhật Bình.',
    cultureNote:
      'When wearing Áo Nhật Bình, always wear a white standing-collar inner robe underneath so the rectangular collar sits smoothly flat, accentuating its solemn elegance.',
    collarTag: 'Nhật Bình Collar (Square)',
    dynastySeal: 'NGUYỄN DYNASTY COURT'
  },

  'ao-tac': {
    name: 'Áo Tấc',
    vietnameseName: 'Ngũ Thân Wide-Sleeved Ceremonial Robe (Áo Lễ)',
    alternativeNames: 'Wide-Sleeved Five-Panel Robe, Áo Lễ, Áo Thụng',
    groupCategoryLabel: 'Imperial Court & Ceremonial Robe',
    subtitle: 'Solemn traditional national ceremonial attire for all social strata across Vietnam',
    era: 'Established under Lord Nguyễn Phúc Khoát (1744), standardized nationwide under the Nguyễn Dynasty (1802–1945)',
    description:
      'The most formal ceremonial variant of the five-panel standing-collar robe, renowned for its long, majestic loose sleeves and dignified A-line silhouette.',
    context:
      'Born from the costume reformation of 1744 in Đàng Trong and standardized nationwide by Emperor Minh Mạng between 1828 and 1837. Under the Nguyễn Dynasty, Áo Tấc was the mandatory ceremonial garment for grand rituals, ancestral worship, and weddings for both men and women, regardless of nobility or commoner status.',
    wearers:
      'Both men and women across all social classes (from royals, mandarins, and scholars to common citizens when performing ceremonies).',
    features: [
      'Majestic wide, long sleeves extending past the hands to conceal the hands when clasped in greeting or worship',
      'Five-panel structure (4 outer panels, 1 inner chest panel) aligned with straight central dorsal seams',
      'Standing collar (lập lĩnh) secured with 5 right-hand buttons symbolizing the Five Virtues',
      'Hem and seam borders measure approximately 1 "tấc" (roughly 4 cm, origin of the name Áo Tấc)'
    ],
    collarStyle:
      'Lập lĩnh standing collar (approximately 3.5–4.5 cm in height, squared or gently rounded at the collar tips, enclosing the neck modestly).',
    sleeveStyle:
      'Wide loose sleeves (tay thụng, measuring 40–60 cm in width and draping past the wrists, creating regal folds when arms are lowered and covering hands in salutation).',
    silhouetteStructure:
      'Generous A-line silhouette draping past the knees, uncinched at the waist with side hip slits; worn over a white inner robe with wide trousers and a folded turban (khăn đóng).',
    commonMaterials:
      'Brocade, satin, silk gauze, La Khê tussah silk, mulberry silk (breathable thin gauze with lining for summer; heavy floral brocade for winter rituals).',
    colorsAndMotifs:
      'Men traditionally chose deep indigo, teal, midnight black, and navy; women favored cinnabar red, peach pink, apricot yellow, and jade green; adorned with Shou (longevity) and Fu (blessing) characters, clouds, eight treasures, or elegant plain weaves.',
    whenAppropriate:
      'Traditional wedding ceremonies, ancestral memorials, temple festivals, university commencements, diplomatic cultural events, and heritage photoshoots.',
    significance:
      'Embodies modesty, courtesy, and the ethos of "drinking water, remembering the source" through its 5 panels (four parents) and 5 buttons (Benevolence, Propriety, Righteousness, Wisdom, Integrity).',
    terminologyAndScopeNote:
      '"Áo Tấc" is colloquial for "Áo Ngũ Thân Tay Thụng". It should be distinguished from "Áo Tay Chẽn", which has fitted narrow sleeves for daily life.',
    cultureNote:
      'When wearing Áo Tấc during rituals or portraits, the most graceful posture is clasping hands gently in front of the abdomen, letting the draped sleeves fall naturally.',
    collarTag: 'Standing Collar · Wide Sleeves',
    dynastySeal: 'NATIONAL CEREMONIAL ROBE'
  },

  'ao-ngu-than': {
    name: 'Áo Ngũ Thân',
    vietnameseName: 'Áo Ngũ Thân Lập Lĩnh (Standing-Collar Five-Panel Robe)',
    alternativeNames: 'Five-Panel Robe, Standing-Collar Five-Panel Robe, Ancestor of Modern Áo Dài',
    groupCategoryLabel: 'Five-Panel (Ngũ Thân) System',
    subtitle: 'The zenith of scholarly poise, rectitude, and the direct ancestor of modern Vietnamese Áo Dài',
    era: 'Codified formally under Lord Nguyễn Phúc Khoát (1744) and Emperor Minh Mạng (1837) to the present day',
    description:
      'Constructed from five panels of fabric symbolizing four parents and the wearer, fastened with 5 right-side buttons representing the Five Constant Virtues.',
    context:
      'Served as the standard national garment for all Vietnamese people throughout the Nguyễn Dynasty for both men and women. In the 1930s, based on the Áo Ngũ Thân structure, artist Cát Tường (Le Mur) and tailors in Hanoi and Saigon modified the silhouette to form the modern fitted Áo Dài.',
    wearers:
      'Men and women of all ages and walks of life from the 18th to mid-20th century; currently the most enthusiastically revitalized heritage garment among Vietnamese youth.',
    features: [
      'Five panels joined together: 2 front panels, 2 back panels, and 1 inner panel hidden on the right',
      '5 buttons (copper, silver, jade, or knotted fabric) fastening diagonally from collar across right chest to the side rib',
      'Straight dorsal and chest seam (đường trung phùng) symbolizing upright rectitude',
      'Comprises two primary branches: Tay Chẽn (fitted sleeves for everyday) and Tay Thụng / Áo Tấc (loose sleeves for ceremonies)'
    ],
    collarStyle:
      'Lập lĩnh standing collar (3–4 cm tall, keeping the neck and head posture upright and dignified).',
    sleeveStyle:
      'Two variations according to function: Tay chẽn (narrow sleeves for daily movement) and Tay thụng (wide sleeves for ceremonial occasions).',
    silhouetteStructure:
      'Flat-cut pattern without bust or waist darts; garment gently flares from armpits to hem in an isosceles trapezoid, concealing imperfections while imparting serenity.',
    commonMaterials:
      'Mulberry silk, thin gauze (the, sa), damask, brocade, satin, raw silk (đũi), and handwoven cotton.',
    colorsAndMotifs:
      'Subtle and understated for daily wear (brown, black, indigo, ivory, deep blue); vibrant festive brocades featuring Longevity characters, Four Seasons, lotuses, and clouds in cinnabar red, gold, and jade.',
    whenAppropriate:
      'Diplomatic ceremonies, traditional weddings, cultural academic symposia, New Year temple visits, heritage street walks, and contemporary styling.',
    significance:
      'Reflects filial piety (the four outer panels represent both sets of parents safeguarding the inner panel/wearer) and noble character embracing Benevolence, Propriety, Righteousness, Wisdom, and Faith.',
    terminologyAndScopeNote:
      '"Áo Ngũ Thân" is the overarching umbrella term for all 5-panel standing-collar garments (including both Áo Tấc and Áo Tay Chẽn). It is the direct precursor to contemporary Áo Dài.',
    cultureNote:
      'Áo Ngũ Thân emphasizes crisp straight silhouettes and pristine buttons. When styling in Gen Z streetwear (paired with boots or tailored trousers), keep the standing collar neat and upright.',
    collarTag: '5 Panels · 5 Buttons · Standing Collar',
    dynastySeal: 'FIVE VIRTUES DOCTRINE'
  },

  'ao-tay-chen': {
    name: 'Áo Tay Chẽn',
    vietnameseName: 'Áo Ngũ Thân Tay Chẽn (Narrow-Sleeved Five-Panel Robe)',
    alternativeNames: 'Áo Chẽn, Everyday Five-Panel Robe',
    groupCategoryLabel: 'Five-Panel (Ngũ Thân) System',
    subtitle: 'The sleekest, most functional, and everyday-friendly silhouette of the five-panel family',
    era: '18th to mid-20th century (Nguyễn Lords and Nguyễn Dynasty), experiencing a vibrant modern renaissance',
    description:
      'Retains the complete 5-panel and 5-button heritage structure of the ngũ thân lineage but features fitted sleeves along the arms, allowing dynamic movement in daily life.',
    context:
      'Born alongside the dress reforms of Lord Nguyễn Phúc Khoát (1744) and Emperor Minh Mạng. While Áo Tấc was reserved for grand ceremonies, Áo Tay Chẽn was the ubiquitous everyday dress from palaces to markets and rural villages.',
    wearers:
      'Both men and women of all social strata: officials at work, scholars studying, merchants trading, artisans, and common citizens.',
    features: [
      'Narrow sleeves tapering smoothly from upper arm to wrist (tay chẽn), exceptionally practical',
      'Preserves 5-panel construction with center seam and 5 right-hand buttons',
      'Moderately relaxed straight silhouette with more restrained hem flare than Áo Tấc',
      'Typically layered double: colored outer silk or gauze over a white inner lining revealing a clean white collar border'
    ],
    collarStyle:
      'Lập lĩnh standing collar (3–4 cm straight collar, fastening discreetly at the right collarbone).',
    sleeveStyle:
      'Tay chẽn (narrow sleeve contouring arm and wrist, terminating at the wrist bone to prevent hindrance when working or writing).',
    silhouetteStructure:
      'Gentle A-line straight silhouette, relaxed at the waist yet sleeker than Áo Tấc; 5 flat-cut panels with side hip slits, paired with silk or wide trousers.',
    commonMaterials:
      'La Khê sheer gauze, plain mulberry silk, tussah silk, thin brocade, handwoven cotton.',
    colorsAndMotifs:
      'Favors understated, calm tones: black sheer gauze, light earthen brown, indigo blue, ivory, moss green, deep burgundy; woven subtle patterns or rustic plain textures.',
    whenAppropriate:
      'Everyday street wear, school, cafes, spring outings, museum visits, heritage lookbooks, and daily wear.',
    significance:
      'Demonstrates the practical ingenuity of Vietnamese heritage fashion: harmonizing strict propriety (5 panels, 5 virtues) with active daily life.',
    terminologyAndScopeNote:
      'In the modern Vietnamese heritage community, "Áo Tay Chẽn" usually denotes "Áo Ngũ Thân Tay Chẽn" in contrast to "Áo Tấc" (wide sleeves). In tailoring terms, "tay chẽn" also describes narrow sleeves on tứ thân or folk giao lĩnh garments.',
    cultureNote:
      'Áo Tay Chẽn is the prime choice for Gen Z wishing to incorporate heritage into casual life — easily styled with loafers, white sneakers, and minimalist crossbody bags.',
    collarTag: 'Standing Collar · Fitted Sleeves',
    dynastySeal: 'ACTIVE EVERYDAY WEAR'
  },

  'giao-linh': {
    name: 'Áo Giao Lĩnh',
    vietnameseName: 'Áo Giao Lĩnh (Cross-Collar Robe)',
    alternativeNames: 'Áo Cổ Giao, Cross-Panel Robe (交領)',
    groupCategoryLabel: 'Historical Dynastic Costumes',
    subtitle: 'Classic attire spanning nearly a millennium of civilization through the Lý, Trần, and Lê dynasties',
    era: 'Prevalent throughout Lý, Trần, Hồ, Early Lê, Mạc, and Revival Lê dynasties, and preserved in Nguyễn sacrificial rites',
    description:
      'Ancient garment featuring two front panels crossing over the chest to create a graceful Y-shaped neckline, fastened with side ties on the right rib.',
    context:
      'Before the 18th-century shift toward standing collars (lập lĩnh), Giao Lĩnh was the predominant garment style in Vietnam from court to countryside. Historical annals and Buddhist statues from the Lý, Trần, and Lê eras confirm its ubiquitous role.',
    wearers:
      'Emperors, nobility, mandarins, scholars, monks, and ordinary men and women throughout the Lý, Trần, and Lê dynasties; later preserved as ceremonial sacrificial robes during the Nguyễn era.',
    features: [
      'Two front panels crossing over the chest to form a Y-shaped collar (left panel wrapping over the right – youren)',
      'Secured with side fabric ribbons rather than vertical rows of metal buttons',
      'Collar borders often accented with contrasting hues or woven with intricate brocade',
      'Men wore trousers or wrap-skirts; women paired with an inner yếm halter, pleated skirt (thường), and wide sash (đại đới)'
    ],
    collarStyle:
      'Giao lĩnh cross collar (two flat collar bands overlapping in a gentle Y-neckline over the chest, accentuating a graceful neck).',
    sleeveStyle:
      'Varied by social class: broad flowing sleeves (quảng tụ / đại tụ) for ceremonial and noble wear; narrow sleeves (tiểu tụ) for soldiers and commoners.',
    silhouetteStructure:
      'Flat T-shaped pattern with a deep diagonal front crossover to the right hip; loose and flowing, creating an ethereal layered aesthetic when paired with pleated skirts underneath.',
    commonMaterials:
      'Mulberry silk, gossamer silk (sa, la), damask, gold-woven brocade (for nobility), and raw silk, ramie, or cotton (for commoners).',
    colorsAndMotifs:
      'Lý–Trần eras favored black, white, imperial yellow, deep crimson, and forest green with dragon medallions, phoenixes, and scrolling chrysanthemums; Lê era expanded clouds, floral medallions, and insignia squares.',
    whenAppropriate:
      'Lý–Trần–Lê historical reenactments, heritage festivals, traditional performance arts, and ancient Đại Việt photoshoots.',
    significance:
      'A proud emblem of independent Đại Việt civilization during its golden ages, showcasing an expansive, poetic aesthetic.',
    terminologyAndScopeNote:
      '"Giao lĩnh" (交領) literally means "overlapping collar". It refers to a collar structural category rather than a single uniform style: Lý–Trần Giao Lĩnh differs from Revival Lê Giao Lĩnh or Nguyễn sacrificial robes.',
    cultureNote:
      'When wearing Áo Giao Lĩnh in authentic traditional spirit, ensure the left collar panel overlaps over the right (forming the correct Y-angle).',
    collarTag: 'Cross-Collar (Y-Neck)',
    dynastySeal: 'LÝ · TRẦN · LÊ ĐẠI VIỆT'
  },

  'vien-linh': {
    name: 'Áo Viên Lĩnh',
    vietnameseName: 'Áo Viên Lĩnh (Round-Collar Court Robe)',
    alternativeNames: 'Đoàn Lĩnh (團領), Bàn Lĩnh (盤領), Round-Collar Robe',
    groupCategoryLabel: 'Historical Dynastic Costumes',
    subtitle: 'Imposing court ceremonial and bureaucratic robe featuring a close-fitting circular collar',
    era: 'Lý, Trần, Early Lê, Revival Lê, Tây Sơn, and Nguyễn dynasties',
    description:
      'Historical garment with a circular neckline fitting snugly at the base of the neck, buttoned at the right shoulder, providing a broad front canvas for embroidered rank badges or dragon medallions.',
    context:
      'Appeared as early as the Lý and Trần dynasties and reached full codification in the mandarin official dress system of the Lê and Nguyễn courts. Beyond court attire, noblewomen during the Lê era also wore it as an elaborate ceremonial over-robe.',
    wearers:
      'Emperors, princes, civil and military mandarins (with insignia badges), palace guards, and noblewomen.',
    features: [
      'Circular neckline cut smoothly around the neck base without a raised standing band',
      'Large front panel covering the entire chest, fastening with buttons or ties at the right shoulder/armpit',
      'Provides flat front and back surfaces to affix rank insignia badges (Bổ tử) or dragon/phoenix medallions',
      'Long robe with side hip slits, traditionally cinched with an ornate belt (jade, horn, or silk sash)'
    ],
    collarStyle:
      'Viên lĩnh / đoàn lĩnh round collar (circular flat neckline fitting closely around the neck, often revealing the cross-collar undergarment beneath).',
    sleeveStyle:
      'Typically broad sleeves (đại tụ) for civil mandarins and ceremonial robes; narrower sleeves for military officials and active duties.',
    silhouetteStructure:
      'Imposing T-shaped or A-shaped silhouette; wide front panel covering the chest, center back seam, paired with trousers or skirts and winged caps or turbans.',
    commonMaterials:
      'Damask, brocade, satin, silk gauze with woven tonal floral motifs, paired with gold-thread embroidery on rank badges.',
    colorsAndMotifs:
      'Governed by bureaucratic rank colors (yellow for emperor, purple/red for high officials, blue/green for junior ranks); civil ranks embroidered with birds (crane, golden pheasant), military ranks with beasts (qilin, lion, tiger).',
    whenAppropriate:
      'Đại Việt court ritual reconstructions, costume exhibitions, traditional weddings, historical theater, and fine art photography.',
    significance:
      'Symbolizes institutional order, upright dignity, and the civilized administrative heritage of Đại Việt across dynasties.',
    terminologyAndScopeNote:
      '"Viên lĩnh" (圓領) and "Đoàn lĩnh" (團領) both denote round collars. Do not confuse Viên Lĩnh with standing-collar Áo Tấc (which has a 3–4 cm vertical collar band).',
    cultureNote:
      'Áo Viên Lĩnh possesses balanced authority and looks striking when worn over a white inner cross-collar shirt that peeks out subtly at the neck hollow.',
    collarTag: 'Round Collar · Rank Badge',
    dynastySeal: 'ĐẠI VIỆT COURT PROTOCOL'
  },

  'doi-kham': {
    name: 'Áo Đối Khâm',
    vietnameseName: 'Áo Đối Khâm (Parallel-Collar Robe)',
    alternativeNames: 'Trực Lĩnh Đối Khâm (直領對襟), Parallel-Opening Robe',
    groupCategoryLabel: 'Historical Dynastic Costumes',
    subtitle: 'The refined art of multilayered dressing with two parallel front panels hanging straight',
    era: 'Lý, Trần, Lê, and Nguyễn dynasties (especially flourishing in the Revival Lê and Nguyễn eras)',
    description:
      'Garment with two front panels running parallel and straight down the chest without overlapping, typically worn open as an overcoat to showcase the inner yếm halter, tunic, and skirt.',
    context:
      'One of the most essential outerwear structures in Vietnamese costume history. From the Lê–Nguyễn era Phi Phong parallel-collar coat evolved the imperial Áo Nhật Bình, and it also informed the unfastened drape of Northern Áo Tứ Thân.',
    wearers:
      'Royal women, noble ladies, scholars, and everyday women across multiple historical centuries.',
    features: [
      'Two front panels hang symmetrically parallel, left naturally open or fastened with ties/clasps at mid-chest',
      'Frames the chest vertically to subtly display the inner silk halter (yếm) or inner robe',
      'Side hip slits (or split into 4 panels like tứ thân) creating ethereal movement while walking',
      'Structural foundation for both Lê Dynasty Phi Phong and Nguyễn Dynasty Nhật Bình robes'
    ],
    collarStyle:
      'Trực lĩnh đối khâm straight parallel collar (two collar bands run vertically from nape down both sides without crossing).',
    sleeveStyle:
      'Often wide flowing sleeves on ceremonial and noble coats, or moderate/narrow sleeves on folk variants.',
    silhouetteStructure:
      'H-line or gentle A-line outer robe silhouette, honoring the layered dressing aesthetic quintessential to classical Vietnamese beauty.',
    commonMaterials:
      'Silk gauze, sheer the, lightweight drape mulberry silk for spring/summer; embroidered brocade and satin for autumn/winter.',
    colorsAndMotifs:
      'Multilayer contrast: outer coat in cinnabar, sapphire, violet, apricot yellow, or emerald layered over a scarlet/rose yếm and ivory inner robe.',
    whenAppropriate:
      'Spring festivals, multi-layered heritage lookbooks, cultural performances, and contemporary fashion layering.',
    significance:
      'Reflects the delicate aesthetic wisdom of our ancestors: modest yet unrestrained, flowing effortlessly through airy silk layers.',
    terminologyAndScopeNote:
      '"Đối khâm" (對襟) indicates parallel front edges (contrasting with "Giao lĩnh" cross collars). Iconic garments such as Áo Nhật Bình and unknotted Áo Tứ Thân belong to the Đối Khâm structural family.',
    cultureNote:
      'The Đối Khâm cut mirrors modern cardigans, kimonos, and open trench coats, making it effortless to layer with Gen Z contemporary wardrobe pieces.',
    collarTag: 'Parallel Collar · Outerwear',
    dynastySeal: 'CLASSICAL ART OF LAYERING'
  },

  'viet-phuc': {
    name: 'Việt Phục',
    vietnameseName: 'Hệ Thống Trang Phục Dân Tộc Việt Nam (Vietnamese National Attire System)',
    alternativeNames: 'Traditional Vietnamese Costumes, National & Cultural Dress of Vietnam',
    groupCategoryLabel: 'Heritage Concepts & Classification',
    subtitle: 'The comprehensive continuum of Vietnamese ethnic and national attire from antiquity to modern times',
    era: 'Across all Vietnamese history: Hùng Kings & Đông Sơn, imperial dynasties, to modern & contemporary periods',
    description:
      'The overarching umbrella term covering all traditional clothing forms of the Vietnamese people across historical eras, spanning both ancient heritage costumes and modern folk garments like Áo Dài, Áo Bà Ba, and Áo Tứ Thân.',
    context:
      'Evolved continuously alongside Vietnam’s history of nation-building and defense. Reflects the tropical monsoon climate, ancient sericulture and silk-weaving heritage, and the cultural autonomy of the Vietnamese people through each century.',
    wearers:
      'All Vietnamese people across all ages, genders, and regions, as well as the global Vietnamese diaspora.',
    features: [
      'Encompasses both the ancient branch (Giao Lĩnh, Viên Lĩnh, Đối Khâm, Ngũ Thân...) and modern heritage branch (modern Áo Dài, Áo Bà Ba...)',
      'Balances modest, graceful aesthetics with breezy comfort suited to tropical living',
      'Inherits silk weaving, hand embroidery, and natural dyeing traditions from heritage craft villages',
      'Continuously reimagined by younger generations (Gen Z) and woven into modern urban life'
    ],
    collarStyle:
      'Varied across eras: cross collar (Y-shape), round collar, parallel collar, rectangular Nhật Bình collar, standing collar (lập lĩnh), and modern variations.',
    sleeveStyle:
      'From majestic ceremonial loose sleeves (đại tụ) to narrow practical sleeves and sleek raglan sleeves on modern Áo Dài.',
    silhouetteStructure:
      'Two distinct tailoring philosophies: traditional flat-cutting assembling standard fabric widths honoring modesty, and modern 3D darted silhouettes celebrating the body’s contours.',
    commonMaterials:
      'Mulberry silks (Vạn Phúc, Nha Xá, Mã Châu, Bảo Lộc), La Khê gauze, Tân Châu Lãnh Mỹ A, brocade, damask, raw silk, linen, and eco-friendly cottons.',
    colorsAndMotifs:
      'Rich indigenous palette (cinnabar red, imperial ochre, earthen brown, indigo blue, ivory) alongside lotus flowers, lạc birds, bronze drums, dragons, phoenixes, and longevity symbols.',
    whenAppropriate:
      'National holidays, diplomatic occasions, Lunar New Year, weddings, school ceremonies, cultural festivals, graduation portraits, and daily creative styling.',
    significance:
      'Serves as the visual cultural identity card of the Vietnamese people, asserting cultural independence and bridging generations.',
    terminologyAndScopeNote:
      'Note scope distinction: "Việt Phục" is the largest superset (including modern Áo Dài, Áo Bà Ba, and all ancient attire), whereas "Việt Cổ Phục" specifically designates pre-Westernization garments prior to the 1930s.',
    cultureNote:
      'Understanding the complete Việt Phục system empowers youth to remix styles creatively while maintaining genuine respect for historical origins.',
    collarTag: 'All Eras · Living Legacy',
    dynastySeal: 'VIETNAMESE COSTUME SYSTEM'
  },

  'viet-co-phuc': {
    name: 'Việt Cổ Phục',
    vietnameseName: 'Hệ Thống Cổ Phục Việt Nam (Vietnamese Ancient Costumes System)',
    alternativeNames: 'Historical Costumes of Đại Việt – Vietnam, Pre-20th Century Heritage Attire',
    groupCategoryLabel: 'Heritage Concepts & Classification',
    subtitle: 'Traditional Vietnamese dress heritage prior to the 1930s Westernization reforms',
    era: 'From Ancient Era (Đông Sơn) through Đinh, Early Lê, Lý, Trần, Hồ, Later Lê, Mạc, Tây Sơn, and Nguyễn dynasties',
    description:
      'The system of classical Vietnamese garments crafted with traditional flat-cutting methods and Eastern etiquette principles before the adoption of Western pattern-making techniques.',
    context:
      'Across thousands of years, Vietnamese monarchies established distinct, refined sumptuary codes ("country of civilized culture"). After a period of decline during 20th-century upheavals, since the 2010s, historical research, reproduction, and revival of Việt Cổ Phục have flourished among youth.',
    wearers:
      'Historically worn by royals, mandarins, scholars, and citizens; today worn by cultural communities, scholars, artists, and youth during festivals, weddings, and heritage events.',
    features: [
      'Flat-pattern tailoring: no curved armholes or bust/waist darts like Western tailoring',
      'Joined from handwoven cloth widths creating central dorsal seams (trung phùng) imbued with ethical symbolism',
      'Multilayered system: undergarments (trung y / yếm), outer robe, two-legged trousers or skirts (thường), and waist sashes',
      'Paired with historic headwear, turbans, clogs, and traditional goldsmith accessories'
    ],
    collarStyle:
      '5 fundamental historical collar archetypes: Giao lĩnh (cross), Viên lĩnh (round), Trực lĩnh / Đối khâm (parallel), Phương lĩnh / Nhật Bình (rectangular), and Lập lĩnh (standing).',
    sleeveStyle:
      'Loose ceremonial sleeves (đại tụ / quảng tụ) and narrow practical sleeves (tiểu tụ / tay chẽn).',
    silhouetteStructure:
      'T-shaped or A-shaped loose silhouettes, defining beauty through modesty, humility, and the dimensional depth of layered cloth rather than body contours.',
    commonMaterials:
      'Brocade, damask, satin, silk gauze, tussah silk, raw silk, and handwoven cottons woven on traditional looms.',
    colorsAndMotifs:
      'Conformed to dynastic regulations and classical aesthetics: Lý, Trần, Lê, and Nguyễn dragon motifs, phoenixes, lotuses, chrysanthemums, fiery clouds, and tidal waves.',
    whenAppropriate:
      'Lunar New Year festivals, heritage weddings, temple celebrations, cultural-academic conventions, historical cinema, and fine art photography.',
    significance:
      'Kindles pride in Đại Việt civilization, allowing modern generations to understand the dignified, intricate sartorial heritage of their ancestors.',
    terminologyAndScopeNote:
      '"Việt Cổ Phục" is a historical subset of "Việt Phục". Garments that preserve original classical structures like Áo Tấc, Áo Giao Lĩnh, and Áo Nhật Bình are Việt Cổ Phục; modern fitted raglan Áo Dài belongs to modern Việt Phục.',
    cultureNote:
      'When studying Việt Cổ Phục, mastering the names of the five core collar cuts (Giao lĩnh, Viên lĩnh, Đối khâm, Lập lĩnh, Nhật Bình) is the simplest key to identifying any garment.',
    collarTag: 'Pre-1930s · Ancient Forms',
    dynastySeal: 'ĐẠI VIỆT ANCIENT DRESS'
  },

  'co-phuc-nguyen-trieu': {
    name: 'Cổ Phục Nguyễn Triều',
    vietnameseName: 'Nguyễn Dynasty Heritage Costumes (1802–1945)',
    alternativeNames: 'Nguyễn Dynasty Attire, Huế Imperial Heritage Costumes',
    groupCategoryLabel: 'Heritage Concepts & Classification',
    subtitle: 'The most documented and tangible ancient costume system, intimately linked to contemporary Vietnamese life',
    era: 'Nguyễn Dynasty (1802–1945), inheriting Đàng Trong costume reforms of 1744',
    description:
      'The comprehensive system of court robes, ceremonial dress, and everyday attire codified under the Nguyễn emperors, exemplified by Áo Nhật Bình, Áo Tấc, Áo Tay Chẽn, and Imperial Dragon Robes.',
    context:
      'As Vietnam’s final imperial dynasty, the Nguyễn Dynasty left abundant preserved artifacts, official court annals ("Khâm định Đại Nam hội điển sự lệ"), paintings, and authentic 19th–20th century photographs. This makes Nguyễn heritage the most accessible bridge between ancient dress and modern Vietnamese fashion.',
    wearers:
      'The Emperor, Empress Dowagers, Empresses, Princes, civil and military mandarins in Huế, as well as scholars, farmers, artisans, and merchants across the North, Center, and South.',
    features: [
      'Standardized the standing-collar five-panel robe (Áo Tấc, Áo Tay Chẽn) as universal national dress',
      'Distinctive imperial court ceremonial attire: Dragon Robes, Empress Nhật Bình, Mandarin Insignia Robes, Sacrificial Giao Lĩnh',
      'Exquisite fastening buttons (gold, silver, brass, jade, amber) and turbans folded into "Nhân" (人) or "Nhất" (一) patterns',
      'Prioritizes solemnity and modesty, always layered with white inner garments'
    ],
    collarStyle:
      'Most characteristically Lập lĩnh standing collar (on Áo Tấc, Áo Tay Chẽn) and rectangular Nhật Bình collar, alongside Viên lĩnh round collar on official robes and Giao lĩnh in sacrificial rites.',
    sleeveStyle:
      'Both loose flowing sleeves (on court dragon robes, Áo Tấc, Áo Nhật Bình) and narrow fitted sleeves (on daily Áo Ngũ Thân).',
    silhouetteStructure:
      'Stately A-line silhouette with 5 panels joined along vertical dorsal seams, paired with loose silk trousers, folded turban, paper fan, and embroidered shoes or wooden clogs.',
    commonMaterials:
      'Silk gauze, brocade, damask, satin, mulberry silks from Phú Xuân – Huế, Vạn Phúc – Hà Đông, and Mã Châu – Quảng Nam.',
    colorsAndMotifs:
      'Distinct hierarchy in court (Imperial Yellow, Amber, Scarlet, Violet, Blue, Green) and serene earth tones for commoners; Eight Treasures, 5-claw/4-claw Dragons, Phoenixes, Three Mountains & Water Waves, Longevity, and Lotuses.',
    whenAppropriate:
      'Huế Festival, traditional weddings, graduation ceremonies, Lunar New Year celebrations, diplomatic engagements, and heritage showcases.',
    significance:
      'Laid the direct aesthetic foundation for modern Vietnamese attire and remains the most accessible, wearable heritage costume for today’s youth.',
    terminologyAndScopeNote:
      '"Cổ Phục Nguyễn Triều" is a dynastic classification within "Việt Cổ Phục". Iconic garments such as Áo Nhật Bình, Áo Tấc, and Áo Ngũ Thân Tay Chẽn belong to the Nguyễn Dynasty heritage system.',
    cultureNote:
      'When wearing Nguyễn Dynasty heritage attire (such as Áo Tấc or Áo Tay Chẽn), head turbans should feature folds aligned in an upright "Nhân" (人) character at the center of the forehead.',
    collarTag: 'Imperial Codification · 1802-1945',
    dynastySeal: 'NGUYỄN DYNASTY ATTIRE'
  },

  'ao-dai': {
    name: 'Áo dài',
    vietnameseName: 'Áo Dài Truyền Thống & Cách Tân (Traditional & Modern Áo Dài)',
    alternativeNames: 'Modern Áo Dài, Le Mur Áo Dài / Contemporary Standing-Collar Áo Dài',
    groupCategoryLabel: 'Traditional & Modern Attire',
    subtitle: 'An icon of grace, fluid elegance, and the international pride of Vietnamese culture',
    era: 'Originating from Áo Ngũ Thân (1744), modernized from the 1930s–1960s to the present day',
    description:
      'A tailored silhouette accentuating natural body contours with two flowing front and back panels split from the waist, worn over full-length wide-leg silk trousers.',
    context:
      'Directly inherited from the Nguyễn Dynasty Áo Ngũ Thân Tay Chẽn. In the early 1930s, artists Cát Tường (Le Mur) and Lê Phổ initiated tailoring reforms for a sleeker fit; in the 1950s–1960s in Saigon and Hanoi, diagonal raglan sleeves and waist darts perfected the contemporary silhouette of Vietnamese Áo Dài.',
    wearers:
      'Vietnamese women and men of all ages during Lunar New Year, school ceremonies, weddings, diplomatic summits, and grand celebrations.',
    features: [
      'Traditional standing collar (lập lĩnh) or graceful modern rounded/boat necklines',
      'Two flowing panels (front and back) split from the waist, draping gracefully with each step',
      'Raglan sleeve construction (seam running from collar to armpit) ensuring smooth shoulder fit without bunching',
      'Paired with long flowing silk trousers accentuating height and gentle elegance'
    ],
    collarStyle:
      'Traditional standing collar (2–4 cm tall) or stylized round, boat, or sweetheart necklines on modernized designs.',
    sleeveStyle:
      'Long tailored sleeves attached along diagonal raglan shoulder lines, or three-quarter sleeves in youthful contemporary styles.',
    silhouetteStructure:
      'Two-panel structure (omitting the inner flap of ancient ngũ thân), with bust and waist darts following natural body curves, split at the waist.',
    commonMaterials:
      'Mulberry silk, brocade, velvet, silk chiffon, organza, raw silk, and premium linen.',
    colorsAndMotifs:
      'From pristine white (schoolgirls’ Áo Dài), cinnabar red and imperial gold (bridal Áo Dài) to modern pastel palettes with lotus embroidery, scenic landscapes, or silk painting.',
    whenAppropriate:
      'Lunar New Year, school opening, graduation photos, weddings, diplomatic conferences, cultural festivals, and festive strolls.',
    significance:
      'Symbolizes poise, virtue, gentle resilience, and the timeless vitality of Vietnamese culture.',
    terminologyAndScopeNote:
      'Modern Áo Dài belongs to "Việt Phục" (traditional Vietnamese attire), evolved from the "Áo Ngũ Thân" branch of historical Việt Cổ Phục.',
    cultureNote:
      'When remixing Áo Dài for youthful aesthetics, maintain balanced panel lengths and avoid excessively sheer fabrics lacking thoughtful lining.',
    collarTag: 'Two Panels · Raglan Cut',
    dynastySeal: 'ICON OF VIETNAMESE GRACE'
  },

  'ao-tu-than': {
    name: 'Áo tứ thân',
    vietnameseName: 'Áo Tứ Thân Kinh Bắc (Northern Four-Panel Robe)',
    alternativeNames: 'Four-Panel Robe, Quan Họ Folk Singers’ Attire',
    groupCategoryLabel: 'Traditional & Modern Attire',
    subtitle: 'Rustic charm, vibrant multi-layered grace of Northern Delta women',
    era: 'Evolved from the Lý, Trần, and Lê dynasties, crystallizing distinctly between the 17th and 20th centuries in the Northern Delta',
    description:
      'Composed of four panels: two back panels sewn into a center seam, two front panels left unfastened to tie in a knot before the abdomen or hang freely, worn over a silk halter (yếm) and skirt.',
    context:
      'Intimately tied to the wet-rice agrarian civilization of the Red River Delta and the UNESCO-recognized Quan Họ folk song heritage of Bắc Ninh. Highly functional for manual labor yet radiant and romantic during springtime village festivals.',
    wearers:
      'Historically worn by women of the Northern Delta and midlands; today beloved in folk performing arts, cultural festivals, and heritage photography.',
    features: [
      'Four fabric panels symbolizing four parents (one’s own parents and in-laws)',
      'Two front panels split at the waist, commonly knotted gracefully before the waist to reveal the scarlet silk halter (yếm) beneath',
      'Multi-tonal folk layering: muted outer robe (earthen brown/black), bright inner halter, and vibrant green/pink silk waist sash (bao tượng)',
      'Complemented by iconic accessories: flat palm hat (nón quai thao) and crow-beak kerchief (khăn mỏ quạ)'
    ],
    collarStyle:
      'Trực lĩnh / đối khâm parallel open collar without a raised neckband, revealing the neckline of the inner yếm halter.',
    sleeveStyle:
      'Tay chẽn (narrow sleeves fitting along the arms, enabling northern women to work and dance with agility).',
    silhouetteStructure:
      'Constructed from 4 joined fabric widths, worn over a silk yếm halter and black flared skirt (váy đụp), secured at the waist with an elongated silk sash knotted in front.',
    commonMaterials:
      'Mulberry silk, sheer gauze, tussah silk, raw silk dyed with Dioscorea cirrhosa root (củ nâu) or indigo, paired with satin silk halters.',
    colorsAndMotifs:
      'Exemplifies traditional Northern folk color theory ("brown earth – lotus petal – pond water – corn silk"): brown or apricot outer robe over a peach-pink yếm and jade-green sash.',
    whenAppropriate:
      'Spring festivals, Lim Festival – Quan Họ folk singing, folk cultural showcases, artistic performances, and Northern heritage photoshoots.',
    significance:
      'Honors filial piety toward parents, diligent beauty, modesty, and the cultural richness of Kinh Bắc folklore.',
    terminologyAndScopeNote:
      'Áo Tứ Thân preserves the original four-panel parallel-opening (Đối Khâm) structure within traditional Vietnamese costume history.',
    cultureNote:
      'The heart of Áo Tứ Thân lies in the harmony between the halter color, silk sash, and front panels. Keep the halter neckline modest and refined when remixing.',
    collarTag: '4 Panels · Silk Halter (Yếm)',
    dynastySeal: 'KINH BẮC FOLK HARMONY'
  },

  'ao-ba-ba': {
    name: 'Áo bà ba',
    vietnameseName: 'Áo Bà Ba Nam Bộ (Southern Vietnamese Ao Ba Ba)',
    alternativeNames: 'Southern Tunic, Áo Cánh Nam Bộ',
    groupCategoryLabel: 'Traditional & Modern Attire',
    subtitle: 'The generous, rustic, and warm-hearted soul of the Southern riverways',
    era: 'Emerged in the late 19th and early 20th century in the Mekong Delta to the present',
    description:
      'Collarless tunic (round or sweetheart neckline), hip-length, buttoned down the center front, with side hip slits and two convenient front pockets.',
    context:
      'Born amid the pioneer reclamation of Southern orchard lands and waterways. Renowned for its lightweight, breathable, and durable cut, Áo Bà Ba became a cultural emblem tied to the genial spirit of Southern Vietnamese people.',
    wearers:
      'Both men and women across the Southern Delta in daily labor, everyday life, and riverway cultural festivals.',
    features: [
      'Short tunic hitting just past the hips, with gentle side slits for effortless movement',
      'Straight row of center buttons from neck to hemline',
      'Two generous front lower patch pockets combining utility with visual balance',
      'Invariably paired with the iconic checkered scarf (khăn rằn), black silk trousers (lãnh Mỹ A), and conical palm hat (nón lá)'
    ],
    collarStyle:
      'Collarless design: typically a snug rounded neckline, subtle sweetheart dip, or gentle bà lai cut.',
    sleeveStyle:
      'Long fitted sleeves (or modern raglan cut), with clean cuffs easily rolled up during work.',
    silhouetteStructure:
      'Short hip-slit tunic, seamless single back panel, two front panels with central buttons, gently contouring the torso while granting complete freedom of motion.',
    commonMaterials:
      'Lãnh Mỹ A (Tân Châu silk), mulberry silk, raw silk, linen, breathable handwoven cotton.',
    colorsAndMotifs:
      'Historically natural black, brown, and ivory; today expanded into gentle pastels, corn yellow, water hyacinth blue, and lilac on plain or jacquard woven silks.',
    whenAppropriate:
      'City walks, cafes, Mekong ecotourism trips, Southern cultural festivals, youth extracurriculars, and casual photoshoots.',
    significance:
      'Embodies the open-hearted, loyal, hardworking, and resilient nature of the Southern people.',
    terminologyAndScopeNote:
      'Áo Bà Ba is the signature folk attire of the Mekong Delta, categorized within modern traditional "Việt Phục".',
    cultureNote:
      'An Áo Bà Ba crafted from breathable linen or raw silk, paired with wide-leg trousers and a checkered scarf, creates a look that is deeply Vietnamese yet wonderfully aligned with modern Gen Z minimalism.',
    collarTag: 'Round Collar · Two Pockets',
    dynastySeal: 'SOUTHERN RIVERWAYS SPIRIT'
  }
};

/**
 * Helper to get localized ExploreVietPhucItem based on active language ('vi' | 'en')
 */
export function getLocalizedExploreItem(
  item: ExploreVietPhucItem,
  lang: 'vi' | 'en'
): ExploreVietPhucItem & { collarTag?: string; dynastySeal?: string } {
  if (lang !== 'en') {
    return item;
  }
  const en = EXPLORE_VIET_PHUC_TRANSLATIONS_EN[item.id];
  if (!en) {
    return item;
  }
  return {
    ...item,
    name: en.name || item.name,
    vietnameseName: en.vietnameseName || item.vietnameseName,
    alternativeNames: en.alternativeNames || item.alternativeNames,
    groupCategoryLabel: en.groupCategoryLabel || item.groupCategoryLabel,
    subtitle: en.subtitle || item.subtitle,
    era: en.era || item.era,
    description: en.description || item.description,
    context: en.context || item.context,
    wearers: en.wearers || item.wearers,
    features: en.features || item.features,
    collarStyle: en.collarStyle || item.collarStyle,
    sleeveStyle: en.sleeveStyle || item.sleeveStyle,
    silhouetteStructure: en.silhouetteStructure || item.silhouetteStructure,
    commonMaterials: en.commonMaterials || item.commonMaterials,
    colorsAndMotifs: en.colorsAndMotifs || item.colorsAndMotifs,
    whenAppropriate: en.whenAppropriate || item.whenAppropriate,
    significance: en.significance || item.significance,
    terminologyAndScopeNote: en.terminologyAndScopeNote || item.terminologyAndScopeNote,
    cultureNote: en.cultureNote || item.cultureNote,
    collarTag: en.collarTag,
    dynastySeal: en.dynastySeal
  };
}
