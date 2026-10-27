import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'vi' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  vi: {
    // Navigation
    'nav.home': 'Trang Chủ',
    'nav.explore': 'Khám Phá',
    'nav.studio': 'Remix Studio',
    'nav.lookbook': 'Tủ Đồ',
    'nav.tagline': 'Mặc Việt, theo cách của bạn.',

    // Footer
    'footer.brandTitle': 'VIỆT PHỤC REMIX',
    'footer.tagline': '"Mặc Việt, theo cách của bạn."',
    'footer.mission':
      'Dự án sáng tạo dự thi Audition với chủ đề "Phối trang phục truyền thống theo phong cách Gen Z". Mục tiêu kết nối giới trẻ với di sản áo dài, ngũ thân, tứ thân và bà ba qua lăng kính thời trang đương đại tinh tế và chuẩn mực văn hóa.',
    'footer.openData':
      '✦ Dữ liệu hình ảnh và nội dung văn hóa mở, dễ dàng tùy biến cho học sinh & sinh viên.',
    'footer.navHeader': 'Điều Hướng',
    'footer.navHome': 'Trang chủ (Home)',
    'footer.navExplore': 'Khám phá Việt phục (Explore)',
    'footer.navStudio': 'Phòng Phối Đồ (Remix Studio)',
    'footer.navLookbook': 'Tủ Đồ Đã Lưu (Lookbook)',
    'footer.cultureHeader': 'Thông Điệp Văn Hóa',
    'footer.cultureMsg':
      'Remix trang phục truyền thống không phải là làm biến dạng di sản, mà là làm cho di sản tiếp tục được sống, được yêu và tự hào sải bước trên phố cùng thế hệ hôm nay.',
    'footer.musicTitle': 'Nhạc Nền Cổ Phong • Nhạc Cụ Truyền Thống Việt',
    'footer.musicInstruments': 'Sáo Trúc, Đàn Tranh, Đàn Bầu, Trống Đồng',
    'footer.musicDesc':
      'Thư giãn cùng thanh âm ngũ cung truyền thống (Sáo Trúc, Đàn Tranh, Đàn Bầu và Trống Đồng âm vang).',
    'footer.copyright': 'VIỆT PHỤC REMIX — Audition Project.',
    'footer.love': 'Thiết kế vì tình yêu di sản văn hóa Việt Nam',
    'footer.langLabel': 'Ngôn ngữ hiển thị:',
    'footer.langVi': 'Tiếng Việt',
    'footer.langEn': 'English',

    // Hero Section
    'hero.badge': 'Audition Project • Gen Z Fashion Heritage',
    'hero.kicker': 'VIỆT PHỤC REMIX',
    'hero.titleLine1': 'MẶC VIỆT',
    'hero.titleLine2': 'THEO CÁCH',
    'hero.titleLine3': 'CỦA BẠN.',
    'hero.desc':
      'Khám phá Việt phục. Remix phong cách. Hiểu câu chuyện phía sau mỗi trang phục.',
    'hero.startRemix': 'BẮT ĐẦU REMIX',
    'hero.explore': 'Khám Phá Việt Phục',
    'hero.trustPoint1Title': '10 Loại',
    'hero.trustPoint1Sub': 'Việt phục kinh điển',
    'hero.trustPoint2Title': '100%',
    'hero.trustPoint2Sub': 'Tôn trọng bản sắc',
    'hero.trustPoint3Title': 'Culture Check',
    'hero.trustPoint3Sub': 'Gợi ý văn hóa tức thì',
    'hero.spotlightTitle': 'Áo Dài & Áo Ngũ Thân',
    'hero.spotlightDesc': 'Phối phong cách đương đại cùng bảng màu son & kem ngà',

    // Daily Tip Section
    'dailyTip.badge': 'Cultural Daily Tip · Giai Thoại Cổ Phục',
    'dailyTip.title': 'Mẹo Văn Hóa & Tri Thức Di Sản',
    'dailyTip.desc':
      'Mỗi ngày một mẩu tin thú vị về lịch sử, triết học và cách người xưa gửi gắm tâm hồn vào trang phục.',
    'dailyTip.refresh': 'Đổi Mẹo Khác',
    'dailyTip.didYouKnow': 'Bạn Có Biết?',
    'dailyTip.focusItem': 'Vật phẩm trọng tâm:',
    'dailyTip.readMore': 'Đọc thêm giai thoại lịch sử chi tiết →',
    'dailyTip.collapse': 'Thu gọn điển tích',
    'dailyTip.modernInspo': 'Cảm Hứng Phối Đồ Hiện Đại',
    'dailyTip.relatedOutfit': 'Trang phục liên quan:',
    'dailyTip.recommendedAccessory': 'Phụ kiện khuyên dùng:',
    'dailyTip.tryLook': 'THỬ PHỐI VỚI GỢI Ý NÀY',
    'dailyTip.exploreBtn': 'Khám Phá',
    'dailyTip.copyBtn': 'Sao Chép',
    'dailyTip.copiedToast': 'Đã sao chép mẩu tin văn hóa vào bộ nhớ tạm!',

    // Explore Section
    'explore.badge': 'Di Sản Thời Trang Dân Tộc',
    'explore.title': 'EXPLORE VIỆT PHỤC',
    'explore.desc':
      'Khám phá 10 bộ trang phục cổ truyền Việt Nam. Rê chuột vào từng trang phục để cảm nhận vẻ đẹp di sản.',
    'explore.filterAll': 'Tất Cả (10)',
    'explore.filterClassic': 'Kinh Điển & Đời Sống',
    'explore.filterCourt': 'Cung Đình & Quý Tộc',
    'explore.filterAncient': 'Cổ Đại & Đặc Sắc',
    'explore.learnMore': 'Tìm Hiểu',
    'explore.remix': 'Remix',

    // How it works
    'how.kicker': 'Quy Trình Sáng Tạo',
    'how.title': 'HOW IT WORKS',
    'how.desc':
      'Chỉ 3 bước đơn giản để biến di sản nghìn năm thành phong cách độc bản của bạn.',
    'how.step1Title': '01 — CHOOSE',
    'how.step1Head': 'Chọn dịp bạn muốn mặc.',
    'how.step1Desc':
      'Khai giảng, festival, dạo phố, chụp lookbook hay đám cưới bạn thân. Bối cảnh sẽ định hình phom dáng và sự thoải mái khi diện đồ.',
    'how.step2Title': '02 — REMIX',
    'how.step2Head': 'Chọn Việt phục, màu sắc và phụ kiện.',
    'how.step2Desc':
      'Tự do kết hợp giữa Áo dài, Áo tứ thân, Ngũ thân, Bà ba với sắc đỏ son, kem ngà, hoàng thổ, cùng phụ kiện khăn đóng, kiềng bạc, sneakers hay nón quai thao.',
    'how.step3Title': '03 — DISCOVER',
    'how.step3Head': 'Tạo outfit và hiểu sâu tri thức văn hóa.',
    'how.step3Desc':
      'Hiểu rõ ý nghĩa lịch sử của Áo dài, Áo ngũ thân, Áo nhật bình và nhận tư vấn Culture Check để gìn giữ trọn vẹn bản sắc.',
    'how.step3Action': 'Khám Phá Di Sản',

    // Bottom CTA
    'cta.kicker': 'Tự Do Sáng Tạo • Tôn Trọng Bản Sắc',
    'cta.title': 'READY TO REMIX VIỆT?',
    'cta.desc':
      'Học sinh, sinh viên hãy cùng nhau đưa Việt phục ra khỏi trang sách và bảo tàng, hòa nhịp cùng phong cách Gen Z thời thượng.',
    'cta.btn': 'CREATE YOUR LOOK',

    // Result Page Buttons
    'result.saveLook': '♡ LƯU TRANG PHỤC (SAVE LOOK)',
    'result.saved': '✓ ĐÃ LƯU TRANG PHỤC',
    'result.socialShare': '↗ XUẤT THIỆP SOCIAL SHARE',
    'result.remixAgain': '↻ REMIX AGAIN'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.studio': 'Remix Studio',
    'nav.lookbook': 'Lookbook',
    'nav.tagline': 'Wear Vietnamese Heritage, Your Way.',

    // Footer
    'footer.brandTitle': 'VIỆT PHỤC REMIX',
    'footer.tagline': '"Wear Vietnamese Heritage, Your Way."',
    'footer.mission':
      'An Audition submission project themed "Styling Traditional Vietnamese Attire with Gen Z Flair". Our goal is connecting modern youth with the living legacy of Áo Dài, Áo Ngũ Thân, Áo Tứ Thân, and Áo Bà Ba through contemporary fashion and cultural propriety.',
    'footer.openData':
      '✦ Open cultural insights and curated imagery, tailored for students and heritage lovers.',
    'footer.navHeader': 'Navigation',
    'footer.navHome': 'Home',
    'footer.navExplore': 'Explore Heritage Attire',
    'footer.navStudio': 'Remix Studio',
    'footer.navLookbook': 'Saved Lookbook',
    'footer.cultureHeader': 'Cultural Philosophy',
    'footer.cultureMsg':
      'Remixing traditional garments is not about diluting heritage, but keeping it vibrant, beloved, and proudly walking the streets alongside today’s generation.',
    'footer.musicTitle': 'Traditional Background Music • Vietnamese Acoustic Instruments',
    'footer.musicInstruments': 'Bamboo Flute, Zither, Monochord, Bronze Drum',
    'footer.musicDesc':
      'Relax with traditional pentatonic melodies performed on Vietnamese Sáo Trúc, Đàn Tranh, Đàn Bầu, and resonating Bronze Drums.',
    'footer.copyright': 'VIỆT PHỤC REMIX — Audition Project.',
    'footer.love': 'Crafted with deep love for Vietnamese cultural heritage',
    'footer.langLabel': 'Select Language:',
    'footer.langVi': 'Tiếng Việt',
    'footer.langEn': 'English',

    // Hero Section
    'hero.badge': 'Audition Project • Gen Z Fashion Heritage',
    'hero.kicker': 'VIỆT PHỤC REMIX',
    'hero.titleLine1': 'WEAR VIỆT',
    'hero.titleLine2': 'HERITAGE',
    'hero.titleLine3': 'YOUR WAY.',
    'hero.desc':
      'Explore Vietnamese traditional attire. Remix modern styles. Discover the sacred stories woven into every seam.',
    'hero.startRemix': 'START REMIXING',
    'hero.explore': 'Explore Attire',
    'hero.trustPoint1Title': '10 Styles',
    'hero.trustPoint1Sub': 'Classic Vietnamese Garments',
    'hero.trustPoint2Title': '100%',
    'hero.trustPoint2Sub': 'Respect for Heritage',
    'hero.trustPoint3Title': 'Culture Check',
    'hero.trustPoint3Sub': 'Real-Time Propriety Advice',
    'hero.spotlightTitle': 'Áo Dài & Áo Ngũ Thân',
    'hero.spotlightDesc': 'Contemporary silhouettes paired with cinnabar red & ivory silk',

    // Daily Tip Section
    'dailyTip.badge': 'Cultural Daily Tip · Heritage Chronicles',
    'dailyTip.title': 'Cultural Daily Tips & Lore',
    'dailyTip.desc':
      'A daily dose of fascinating history, philosophy, and how our ancestors expressed their soul through clothing.',
    'dailyTip.refresh': 'Shuffle Tip',
    'dailyTip.didYouKnow': 'Did You Know?',
    'dailyTip.focusItem': 'Featured Item:',
    'dailyTip.readMore': 'Read full historical chronicles →',
    'dailyTip.collapse': 'Collapse story',
    'dailyTip.modernInspo': 'Modern Styling Inspiration',
    'dailyTip.relatedOutfit': 'Related Garment:',
    'dailyTip.recommendedAccessory': 'Recommended Accessory:',
    'dailyTip.tryLook': 'TRY THIS STYLING TIP',
    'dailyTip.exploreBtn': 'Explore',
    'dailyTip.copyBtn': 'Copy',
    'dailyTip.copiedToast': 'Cultural tip copied to clipboard!',

    // Explore Section
    'explore.badge': 'National Fashion Heritage',
    'explore.title': 'EXPLORE VIỆT PHỤC',
    'explore.desc':
      'Discover 10 classic Vietnamese traditional garments. Hover over each attire to feel the timeless beauty of our heritage.',
    'explore.filterAll': 'All (10)',
    'explore.filterClassic': 'Classic & Everyday',
    'explore.filterCourt': 'Royal & Aristocratic',
    'explore.filterAncient': 'Ancient & Iconic',
    'explore.learnMore': 'Discover',
    'explore.remix': 'Remix',

    // How it works
    'how.kicker': 'Creative Workflow',
    'how.title': 'HOW IT WORKS',
    'how.desc':
      'Three simple steps to transform thousand-year heritage into your unique personal fashion statement.',
    'how.step1Title': '01 — CHOOSE',
    'how.step1Head': 'Select the occasion you are dressing for.',
    'how.step1Desc':
      'School opening, festival, urban stroll, editorial lookbook, or wedding ceremony. The context shapes comfort and posture.',
    'how.step2Title': '02 — REMIX',
    'how.step2Head': 'Pick your traditional garment, palette, and accessories.',
    'how.step2Desc':
      'Freely combine Áo Dài, Áo Tứ Thân, Ngũ Thân, Bà Ba with cinnabar red, raw cream, imperial ochre, paired with turbans, silver torques, sneakers, or flat palm hats.',
    'how.step3Title': '03 — DISCOVER',
    'how.step3Head': 'Generate your look and understand deep cultural lore.',
    'how.step3Desc':
      'Uncover historical meanings of Áo Dài, Áo Ngũ Thân, Áo Nhật Bình and receive Culture Check advice to preserve authentic heritage values.',
    'how.step3Action': 'Explore Heritage Lore',

    // Bottom CTA
    'cta.kicker': 'Creative Freedom • Rooted in Identity',
    'cta.title': 'READY TO REMIX VIETNAMESE ATTIRE?',
    'cta.desc':
      'Join fellow youth and students in bringing Vietnamese attire out of textbooks and museums, striding proudly into modern street fashion.',
    'cta.btn': 'CREATE YOUR LOOK',

    // Result Page Buttons
    'result.saveLook': '♡ SAVE LOOK',
    'result.saved': '✓ SAVED TO LOOKBOOK',
    'result.socialShare': '↗ EXPORT SOCIAL SHARE CARD',
    'result.remixAgain': '↻ REMIX AGAIN'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'vi',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('viet_phuc_lang');
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('viet_phuc_lang', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.vi?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
