import { GoogleGenAI, Type, Schema } from '@google/genai';
import {
  OccasionId,
  OutfitId,
  StyleId,
  ColorId,
  OutfitLookState
} from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import { ACCESSORIES_DATA } from '../data/accessories';

export interface StyleSuggestionResult {
  outfit: OutfitId;
  occasion: OccasionId;
  style: StyleId;
  color: ColorId;
  accessories: string[];
  stylistRationale: string;
}

export interface AIStyleRecommendation {
  id: string;
  title: string;
  subtitle: string;
  themePill: string;
  colorId: ColorId;
  colorName: string;
  colorHex: string;
  styleId: StyleId;
  styleName: string;
  occasionId: OccasionId;
  occasionName: string;
  accessories: string[];
  accessoryNames: string[];
  stylingPhilosophy: string;
  culturalRespectNote: string;
  confidenceScore: number;
}

const COLOR_MAP: Record<ColorId, { name: string; hex: string }> = {
  red: { name: 'Đỏ son truyền thống', hex: '#991B1E' },
  burgundy: { name: 'Đỏ rượu quý tộc', hex: '#781316' },
  cream: { name: 'Kem ngà lụa tơ', hex: '#FFFBF2' },
  yellow: { name: 'Hoàng thổ cung đình', hex: '#C58B35' },
  blue: { name: 'Xanh chàm đại dương', hex: '#1E3A8A' },
  green: { name: 'Xanh ngọc bích', hex: '#065F46' },
  black: { name: 'Đen tuyền nho nhã', hex: '#1C1917' },
  pastel: { name: 'Hồng phấn mơ màng', hex: '#FBCFE8' }
};

const STYLE_NAME_MAP: Record<StyleId, string> = {
  traditional: 'Cổ điển thuần khiết',
  modern: 'Hiện đại thanh thoát',
  minimal: 'Tối giản tinh tế',
  elegant: 'Thanh lịch quý phái',
  street: 'Streetwear năng động',
  romantic: 'Nàng thơ bay bổng'
};

const OCCASION_NAME_MAP: Record<OccasionId, string> = {
  school: 'Học đường & Kỷ yếu',
  festival: 'Lễ hội & Tết cổ truyền',
  photoshoot: 'Chụp hình Lookbook',
  wedding: 'Lễ cưới trang trọng',
  casual: 'Dạo phố cuối tuần',
  'cultural-event': 'Sự kiện ngoại giao & Di sản'
};

// Fallback high-fidelity stylist matrix for all 10 garments
const FALLBACK_STYLIST_MATRIX: Record<OutfitId, AIStyleRecommendation[]> = {
  'ao-dai': [
    {
      id: 'ad-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Nét đài các cung đình quyện hòa phẩm hạnh Việt',
      themePill: 'Quý Phái Chuẩn Mực',
      colorId: 'red',
      colorName: 'Đỏ son truyền thống',
      colorHex: '#991B1E',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'wedding',
      occasionName: 'Lễ cưới trang trọng',
      accessories: ['vong-kieng-bac', 'tram-cai-toc', 'sandal-day-manh'],
      accessoryNames: ['Vòng kiềng bạc nguyên khối', 'Trâm cài tóc khảm xà cừ', 'Sandal quai mảnh thanh thoát'],
      stylingPhilosophy: 'Tôn vinh vóc dáng thanh tú trong sắc đỏ son may mắn, kết hợp trâm xà cừ cài búi tóc cao cùng kiềng bạc nguyên khối ôm sát cổ áo lập lĩnh kín đáo.',
      culturalRespectNote: 'Giữ chuẩn mực tà áo dài qua gối, xẻ tà ngang eo vừa phải, mang lại phong thái đoan trang, quyền quý trong các đại lễ.',
      confidenceScore: 98
    },
    {
      id: 'ad-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Hơi thở Gen Z giao thoa giữa di sản và streetwear',
      themePill: 'Phá Cách Năng Động',
      colorId: 'black',
      colorName: 'Đen tuyền nho nhã',
      colorHex: '#1C1917',
      styleId: 'street',
      styleName: 'Streetwear năng động',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['boots-da-thap-co', 'tui-kep-nach-mini', 'khuyen-tai-kim-loai'],
      accessoryNames: ['Boots da thấp cổ', 'Túi kẹp nách da tối giản', 'Khuyên tai hình học tối giản'],
      stylingPhilosophy: 'Phá vỡ khuôn mẫu với áo dài lụa đen huyền bí phối cùng boots da thấp cổ và khuyên tai kim loại hình học, tạo phong thái high-fashion sắc lạnh.',
      culturalRespectNote: 'Vẫn gìn giữ phom dáng áo dài nguyên bản, sử dụng phụ kiện hiện đại ở chân và tay để tạo nét tương phản mà không làm biến dạng cấu trúc áo.',
      confidenceScore: 95
    },
    {
      id: 'ad-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Phong vị tối giản thuần khiết cho nhịp sống thường nhật',
      themePill: 'Tối Giản Tinh Tế',
      colorId: 'cream',
      colorName: 'Kem ngà lụa tơ',
      colorHex: '#FFFBF2',
      styleId: 'minimal',
      styleName: 'Tối giản tinh tế',
      occasionId: 'school',
      occasionName: 'Học đường & Kỷ yếu',
      accessories: ['tui-tote-canvas', 'sneakers-retro-trang', 'non-bucket-linen'],
      accessoryNames: ['Túi tote canvas chữ Việt', 'Sneakers trắng cổ điển', 'Nón bucket linen thêu tay'],
      stylingPhilosophy: 'Sắc kem ngà mềm mại kết hợp túi tote canvas thêu chữ Nôm và giày sneakers trắng giúp người mặc tự do sải bước trong khuôn viên trường hoặc dạo phố.',
      culturalRespectNote: 'Tôn vinh vẻ đẹp mộc mạc của lụa tơ tằm nguyên bản, không đính kết rườm rà, đưa tà áo dài trở lại gần gũi với đời sống trẻ.',
      confidenceScore: 96
    }
  ],

  'ao-ngu-than': [
    {
      id: 'nt-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Phong thái vương giả Nguyễn triều với lập lĩnh ngũ thường',
      themePill: 'Vương Giả Đĩnh Đạc',
      colorId: 'burgundy',
      colorName: 'Đỏ rượu quý tộc',
      colorHex: '#781316',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'festival',
      occasionName: 'Lễ hội & Tết cổ truyền',
      accessories: ['khan-dong', 'chuoi-ngoc-trai', 'guoc-moc-quai-nhung'],
      accessoryNames: ['Khăn đóng lụa', 'Chuỗi vòng ngọc trai', 'Guốc mộc quai nhung'],
      stylingPhilosophy: 'Áo ngũ thân sắc đỏ rượu kết hợp khăn đóng lụa xếp nếp chữ Nhất và chuỗi ngọc trai cao quý, tái hiện hình ảnh bậc vương gia xưa du xuân trẩy hội.',
      culturalRespectNote: 'Năm thân áo tượng trưng tứ thân phụ mẫu và bản thân, năm nút tượng trưng Nhân-Lễ-Nghĩa-Trí-Tín luôn được cài kín đáo, trang nghiêm.',
      confidenceScore: 99
    },
    {
      id: 'nt-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Chiến binh di sản với phong thái Indochine đương đại',
      themePill: 'Đột Phá Cá Tính',
      colorId: 'blue',
      colorName: 'Xanh chàm đại dương',
      colorHex: '#1E3A8A',
      styleId: 'street',
      styleName: 'Streetwear năng động',
      occasionId: 'cultural-event',
      occasionName: 'Sự kiện ngoại giao & Di sản',
      accessories: ['boots-da-thap-co', 'non-beret-da', 'khuyen-tai-kim-loai'],
      accessoryNames: ['Boots da thấp cổ', 'Nón beret cổ điển', 'Khuyên tai hình học tối giản'],
      stylingPhilosophy: 'Tà áo ngũ thân xanh chàm uyển chuyển đối trọng với boots da bóng và nón beret mang phong cách họa sĩ Đông Dương, tôn vẻ lãng tử kiêu hãnh.',
      culturalRespectNote: 'Giữ cấu trúc lập lĩnh và hàng cúc đồng nguyên bản, tạo điểm nhấn qua phụ kiện chân và đầu để hòa hợp hai nền thẩm mỹ Đông-Tây.',
      confidenceScore: 94
    },
    {
      id: 'nt-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Sự tao nhã nho gia trong hơi thở cuộc sống đô thị',
      themePill: 'Nho Nhã Hiện Đại',
      colorId: 'cream',
      colorName: 'Kem ngà lụa tơ',
      colorHex: '#FFFBF2',
      styleId: 'elegant',
      styleName: 'Thanh lịch quý phái',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['vong-kieng-bac', 'tui-kep-nach-mini', 'sandal-day-manh'],
      accessoryNames: ['Vòng kiềng bạc nguyên khối', 'Túi kẹp nách da tối giản', 'Sandal quai mảnh thanh thoát'],
      stylingPhilosophy: 'Chất liệu lụa tơ tằm tự nhiên màu kem kết hợp kiềng bạc và sandal quai mảnh, tạo nên bộ trang phục thanh tao cho các buổi triển lãm nghệ thuật.',
      culturalRespectNote: 'Đường may giấu chỉ tinh xảo của áo ngũ thân mang lại phom dáng suông rộng phóng khoáng mà vẫn giữ được sự chỉn chu văn hóa.',
      confidenceScore: 97
    }
  ],

  'ao-tu-than': [
    {
      id: 'tt-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Nét duyên quan họ Kinh Bắc rực rỡ sắc màu đa tầng',
      themePill: 'Kinh Bắc Duyên Dáng',
      colorId: 'yellow',
      colorName: 'Hoàng thổ cung đình',
      colorHex: '#C58B35',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'festival',
      occasionName: 'Lễ hội & Tết cổ truyền',
      accessories: ['non-quai-thao', 'vong-kieng-bac', 'guoc-moc-quai-nhung'],
      accessoryNames: ['Nón quai thao thu nhỏ', 'Vòng kiềng bạc nguyên khối', 'Guốc mộc quai nhung'],
      stylingPhilosophy: 'Bốn vạt áo hoàng thổ buông lướt để lộ yếm đào lụa và dải thắt lưng xanh xuyến, phối cùng nón quai thao thu nhỏ tạo nên nét đẹp thuần hậu trứ danh.',
      culturalRespectNote: 'Hai thân trước buộc vạt rủ trước bụng khéo léo, kiềng bạc ánh trăng ôm trọn cổ yếm đào thể hiện sự tinh tế của người phụ nữ Bắc Bộ.',
      confidenceScore: 98
    },
    {
      id: 'tt-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Dân gian nổi loạn với phong cách bohochic độc bản',
      themePill: 'Bohemian Dân Gian',
      colorId: 'red',
      colorName: 'Đỏ son truyền thống',
      colorHex: '#991B1E',
      styleId: 'modern',
      styleName: 'Hiện đại thanh thoát',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['bandana-cach-tan', 'boots-da-thap-co', 'khuyen-tai-kim-loai'],
      accessoryNames: ['Bandana lụa hoa văn Việt', 'Boots da thấp cổ', 'Khuyên tai hình học tối giản'],
      stylingPhilosophy: 'Thay thế khăn mỏ quạ bằng bandana lụa thắt lệch, kết hợp boots da mũi nhọn giúp tà áo tứ thân đỏ son trở nên bay bổng và đầy cá tính nghệ thuật.',
      culturalRespectNote: 'Không cắt xén tà áo hay hở hang quá mức, duy trì vẻ đẹp đa tầng nhiều lớp vải lụa truyền thống.',
      confidenceScore: 93
    },
    {
      id: 'tt-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Nàng thơ đồng nội trong diện mạo thanh khiết tối giản',
      themePill: 'Thơ Mộng Tinh Khôi',
      colorId: 'pastel',
      colorName: 'Hồng phấn mơ màng',
      colorHex: '#FBCFE8',
      styleId: 'romantic',
      styleName: 'Nàng thơ bay bổng',
      occasionId: 'casual',
      occasionName: 'Dạo phố cuối tuần',
      accessories: ['tui-coi-quai-tre', 'sandal-day-manh', 'tram-cai-toc'],
      accessoryNames: ['Túi cói đan thủ công', 'Sandal quai mảnh thanh thoát', 'Trâm cài tóc khảm xà cừ'],
      stylingPhilosophy: 'Gam màu hồng phấn mềm dịu kết hợp túi cói đan mộc mạc và trâm xà cừ nhẹ nhàng, lý tưởng cho những buổi chiều hẹn hò cà phê cuối tuần.',
      culturalRespectNote: 'Tôn trọng quy tắc phối màu tương hỗ của áo tứ thân, tạo cảm giác nhẹ nhàng, dễ chịu trong không gian đương đại.',
      confidenceScore: 96
    }
  ],

  'ao-nhat-binh': [
    {
      id: 'nb-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Hoàng tộc triều Nguyễn uy nghiêm với hoa văn ngũ sắc',
      themePill: 'Hoàng Hậu Quý Tộc',
      colorId: 'red',
      colorName: 'Đỏ son truyền thống',
      colorHex: '#991B1E',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'wedding',
      occasionName: 'Lễ cưới trang trọng',
      accessories: ['khan-dong', 'tram-cai-toc', 'vong-kieng-bac'],
      accessoryNames: ['Khăn đóng lụa', 'Trâm cài tóc khảm xà cừ', 'Vòng kiềng bạc nguyên khối'],
      stylingPhilosophy: 'Cổ áo hình chữ nhật viền chỉ ngũ sắc lộng lẫy, phối cùng khăn đóng và trâm phượng xà cừ tái hiện vẻ đẹp hoàng hậu, công chúa trong ngày trọng đại.',
      culturalRespectNote: 'Áo Nhật Bình là trang phục hoàng gia trang trọng bậc nhất, cần cài trọn vẹn dải ngũ sắc và mặc cùng quần trắng tơ tằm để đảm bảo tôn nghiêm.',
      confidenceScore: 99
    },
    {
      id: 'nb-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Editorial hoàng gia phá cách mang tính thị giác cao',
      themePill: 'High Fashion Hoàng Cung',
      colorId: 'blue',
      colorName: 'Xanh chàm đại dương',
      colorHex: '#1E3A8A',
      styleId: 'modern',
      styleName: 'Hiện đại thanh thoát',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['khuyen-tai-kim-loai', 'tui-kep-nach-mini', 'sandal-day-manh'],
      accessoryNames: ['Khuyên tai hình học tối giản', 'Túi kẹp nách da tối giản', 'Sandal quai mảnh thanh thoát'],
      stylingPhilosophy: 'Sắc xanh chàm kết hợp dải ngũ hành tương phản cao, phụ kiện túi da tối giản mang lại phong thái nữ quyền tự tin trên các tạp chí thời trang.',
      culturalRespectNote: 'Giữ trọn vẹn dải cổ nhật bình và hai dải kết nút trước ngực, phối phụ kiện tinh giản để tôn vinh hoa văn thêu tay.',
      confidenceScore: 95
    },
    {
      id: 'nb-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Nét quý phái nhẹ nhàng cho sự kiện văn hóa nghệ thuật',
      themePill: 'Đài Các Nhã Nhặn',
      colorId: 'cream',
      colorName: 'Kem ngà lụa tơ',
      colorHex: '#FFFBF2',
      styleId: 'elegant',
      styleName: 'Thanh lịch quý phái',
      occasionId: 'cultural-event',
      occasionName: 'Sự kiện ngoại giao & Di sản',
      accessories: ['chuoi-ngoc-trai', 'tram-cai-toc', 'sandal-day-manh'],
      accessoryNames: ['Chuỗi vòng ngọc trai', 'Trâm cài tóc khảm xà cừ', 'Sandal quai mảnh thanh thoát'],
      stylingPhilosophy: 'Phiên bản Nhật Bình kem ngà dịu mắt điểm xuyết chuỗi ngọc trai thanh mảnh, hoàn hảo cho những dịp gặp gỡ giao lưu văn hóa quốc tế.',
      culturalRespectNote: 'Không mặc Nhật Bình ở nơi xô bồ, đảm bảo trang phục phẳng phiu và thái độ tôn kính di sản cung đình.',
      confidenceScore: 97
    }
  ],

  'ao-tac': [
    {
      id: 'at-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Quốc phục đại lễ với tay thụng dài quá gối uy nghi',
      themePill: 'Đại Lễ Nghi Chuẩn',
      colorId: 'burgundy',
      colorName: 'Đỏ rượu quý tộc',
      colorHex: '#781316',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'cultural-event',
      occasionName: 'Sự kiện ngoại giao & Di sản',
      accessories: ['khan-dong', 'vong-kieng-bac', 'guoc-moc-quai-nhung'],
      accessoryNames: ['Khăn đóng lụa', 'Vòng kiềng bạc nguyên khối', 'Guốc mộc quai nhung'],
      stylingPhilosophy: 'Áo Tấc tay thụng buông dài quá đầu gối kết hợp khăn đóng chữ Nhất trang nghiêm, thể hiện lễ giáo và lòng thành kính trong nghi lễ tổ tiên.',
      culturalRespectNote: 'Khi đứng làm lễ, hai tay chắp phía trước che giấu lòng bàn tay trong tay thụng rộng, biểu trưng cho sự khiêm nhường và kính cẩn.',
      confidenceScore: 99
    },
    {
      id: 'at-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Phong cách Avant-Garde với tỷ lệ tay áo phóng khoáng',
      themePill: 'Dung Hòa Đông Tây',
      colorId: 'black',
      colorName: 'Đen tuyền nho nhã',
      colorHex: '#1C1917',
      styleId: 'modern',
      styleName: 'Hiện đại thanh thoát',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['boots-da-thap-co', 'khuyen-tai-kim-loai', 'non-beret-da'],
      accessoryNames: ['Boots da thấp cổ', 'Khuyên tai hình học tối giản', 'Nón beret cổ điển'],
      stylingPhilosophy: 'Tận dụng độ rủ mềm mại của tay áo thụng đen tuyền cùng boots da sắc lạnh, tạo nên concept chụp hình mang tính biểu tượng văn hóa đương đại.',
      culturalRespectNote: 'Không cắt ngắn tay thụng hay thắt lưng sai cách, giữ nguyên phom dáng rộng chuẩn cổ truyền.',
      confidenceScore: 94
    },
    {
      id: 'at-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Nét trang nhã cho lễ cưới và sự kiện gia đình',
      themePill: 'Hỷ Sự Sum Vầy',
      colorId: 'red',
      colorName: 'Đỏ son truyền thống',
      colorHex: '#991B1E',
      styleId: 'elegant',
      styleName: 'Thanh lịch quý phái',
      occasionId: 'wedding',
      occasionName: 'Lễ cưới trang trọng',
      accessories: ['tram-cai-toc', 'vong-kieng-bac', 'sandal-day-manh'],
      accessoryNames: ['Trâm cài tóc khảm xà cừ', 'Vòng kiềng bạc nguyên khối', 'Sandal quai mảnh thanh thoát'],
      stylingPhilosophy: 'Áo Tấc sắc đỏ son rực rỡ với trâm xà cừ tinh tế, mang lại không khí hân hoan may mắn cho cô dâu chú rể hoặc quan viên hai họ.',
      culturalRespectNote: 'Trang phục chuẩn mực tuyệt đối cho nghi thức gia tiên, tạo sự gắn kết thiêng liêng qua nhiều thế hệ.',
      confidenceScore: 98
    }
  ],

  'ao-ba-ba': [
    {
      id: 'bb-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Hồn quê Nam Bộ thăng hoa cùng lụa Tân Châu trứ danh',
      themePill: 'Lãnh Mỹ A Quý Tộc',
      colorId: 'black',
      colorName: 'Đen tuyền nho nhã',
      colorHex: '#1C1917',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'cultural-event',
      occasionName: 'Sự kiện ngoại giao & Di sản',
      accessories: ['khan-ran', 'guoc-moc-quai-nhung', 'chuoi-ngoc-trai'],
      accessoryNames: ['Khăn rằn Nam Bộ', 'Guốc mộc quai nhung', 'Chuỗi vòng ngọc trai'],
      stylingPhilosophy: 'Áo bà ba may bằng lụa Lãnh Mỹ A đen tuyền óng ả phối chuỗi ngọc trai và guốc mộc, gợi nhớ hình ảnh nữ chủ điền trang Nam Kỳ lục tỉnh xưa.',
      culturalRespectNote: 'Đường xẻ tà hai bên hông vừa chạm eo, cổ tròn hoặc cổ tim kín đáo, mang lại sự đĩnh đạc và cốt cách thanh cao.',
      confidenceScore: 97
    },
    {
      id: 'bb-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Phong cách dạo phố miền sông nước kết hợp sneakers',
      themePill: 'Street Sông Nước',
      colorId: 'green',
      colorName: 'Xanh ngọc bích',
      colorHex: '#065F46',
      styleId: 'street',
      styleName: 'Streetwear năng động',
      occasionId: 'casual',
      occasionName: 'Dạo phố cuối tuần',
      accessories: ['sneakers-retro-trang', 'khan-ran', 'tui-tote-canvas'],
      accessoryNames: ['Sneakers trắng cổ điển', 'Khăn rằn Nam Bộ', 'Túi tote canvas chữ Việt'],
      stylingPhilosophy: 'Áo bà ba sắc xanh ngọc trẻ trung quấn khăn rằn sọc ca-rô phối giày sneakers trắng năng động, cực kỳ thích hợp cho các chuyến du lịch trải nghiệm.',
      culturalRespectNote: 'Không xẻ ngực sâu hay bó sát biến dạng áo, giữ được nét phóng khoáng nghĩa tình của người phương Nam.',
      confidenceScore: 96
    },
    {
      id: 'bb-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Giai điệu đồng quê ngọt ngào với sắc màu pastel',
      themePill: 'Mộc Mạc Dịu Dàng',
      colorId: 'pastel',
      colorName: 'Hồng phấn mơ màng',
      colorHex: '#FBCFE8',
      styleId: 'romantic',
      styleName: 'Nàng thơ bay bổng',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['non-la-truyen-thong', 'tui-coi-quai-tre', 'sandal-day-manh'],
      accessoryNames: ['Nón lá chóp truyền thống', 'Túi cói đan thủ công', 'Sandal quai mảnh thanh thoát'],
      stylingPhilosophy: 'Áo bà ba hồng phấn kết hợp nón lá nghiêng che và túi cói mộc tự nhiên, tạo nên những khung hình lookbook trong trẻo tựa bài ca dao.',
      culturalRespectNote: 'Vẻ đẹp chân chất tự nhiên của chiếc áo bà ba chính là thông điệp yêu thương môi trường và nguồn cội.',
      confidenceScore: 95
    }
  ],

  'giao-linh': [
    {
      id: 'gl-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Cổ y phục Lý - Trần với vạt áo vắt chéo thâm trầm',
      themePill: 'Cổ Phong Thâm Trầm',
      colorId: 'burgundy',
      colorName: 'Đỏ rượu quý tộc',
      colorHex: '#781316',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'cultural-event',
      occasionName: 'Sự kiện ngoại giao & Di sản',
      accessories: ['vong-kieng-bac', 'tram-cai-toc', 'guoc-moc-quai-nhung'],
      accessoryNames: ['Vòng kiềng bạc nguyên khối', 'Trâm cài tóc khảm xà cừ', 'Guốc mộc quai nhung'],
      stylingPhilosophy: 'Áo giao lĩnh vạt chéo vạt trái đè lên vạt phải trang trọng, sắc đỏ rượu cổ kính kết hợp thắt lưng lụa to bản và kiềng bạc nguyên khối.',
      culturalRespectNote: 'Quy tắc vạt chéo trái đè phải (hữu nhậm) là quy chuẩn văn hóa ngàn đời của trang phục người Việt, không được mặc ngược.',
      confidenceScore: 98
    },
    {
      id: 'gl-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Phong cách hiệp khách cổ trang mang tinh thần kiếm hiệp Việt',
      themePill: 'Hiệp Khách Cổ Điển',
      colorId: 'black',
      colorName: 'Đen tuyền nho nhã',
      colorHex: '#1C1917',
      styleId: 'modern',
      styleName: 'Hiện đại thanh thoát',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['boots-da-thap-co', 'khuyen-tai-kim-loai', 'bandana-cach-tan'],
      accessoryNames: ['Boots da thấp cổ', 'Khuyên tai hình học tối giản', 'Bandana lụa hoa văn Việt'],
      stylingPhilosophy: 'Sắc đen tuyền phối cùng boots da cổ cao và đai lưng da cá tính, mang lại diện mạo kiên cường của những chiến binh di sản thời đại mới.',
      culturalRespectNote: 'Đường nét giao lĩnh cổ trang đòi hỏi sự kín đáo ở phần ngực, giữ nguyên vạt lót trắng bên trong.',
      confidenceScore: 94
    },
    {
      id: 'gl-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Nét thiền tịnh Á Đông trong nhịp sống thiền định tĩnh tại',
      themePill: 'Thiền Tịnh An Nhiên',
      colorId: 'cream',
      colorName: 'Kem ngà lụa tơ',
      colorHex: '#FFFBF2',
      styleId: 'minimal',
      styleName: 'Tối giản tinh tế',
      occasionId: 'casual',
      occasionName: 'Dạo phố cuối tuần',
      accessories: ['tui-coi-quai-tre', 'sandal-day-manh', 'tram-cai-toc'],
      accessoryNames: ['Túi cói đan thủ công', 'Sandal quai mảnh thanh thoát', 'Trâm cài tóc khảm xà cừ'],
      stylingPhilosophy: 'Giao lĩnh màu kem nhẹ nhàng như một chiếc áo choàng yukata/kimono phong vị Việt, phối túi cói mộc cho những ngày thư giãn an yên.',
      culturalRespectNote: 'Chất liệu lanh hoặc đũi mộc tự nhiên giữ cho form áo mềm rũ thanh thoát, chuẩn mực nét tao nhã phương Đông.',
      confidenceScore: 96
    }
  ],

  'vien-linh': [
    {
      id: 'vl-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Cổ tròn bồi lụa vương triều với bổ tử thêu rồng phượng',
      themePill: 'Vương Quyền Cung Đình',
      colorId: 'red',
      colorName: 'Đỏ son truyền thống',
      colorHex: '#991B1E',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'cultural-event',
      occasionName: 'Sự kiện ngoại giao & Di sản',
      accessories: ['khan-dong', 'tram-cai-toc', 'vong-kieng-bac'],
      accessoryNames: ['Khăn đóng lụa', 'Trâm cài tóc khảm xà cừ', 'Vòng kiềng bạc nguyên khối'],
      stylingPhilosophy: 'Cổ tròn viên lĩnh ôm sát cổ trang nghiêm, đai lưng ngọc và khăn đóng chữ Nhất tôn vinh vị thế tôn quý trong các dịp đại lễ.',
      culturalRespectNote: 'Viên lĩnh là triều phục của quan lại và hoàng tộc thời Lê-Nguyễn, luôn được cài khuy bên vai phải cẩn trọng.',
      confidenceScore: 99
    },
    {
      id: 'vl-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Thời trang vị lai giao thoa cùng di sản triều đình',
      themePill: 'Neo-Heritage Sắc Lạnh',
      colorId: 'yellow',
      colorName: 'Hoàng thổ cung đình',
      colorHex: '#C58B35',
      styleId: 'street',
      styleName: 'Streetwear năng động',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['boots-da-thap-co', 'khuyen-tai-kim-loai', 'tui-kep-nach-mini'],
      accessoryNames: ['Boots da thấp cổ', 'Khuyên tai hình học tối giản', 'Túi kẹp nách da tối giản'],
      stylingPhilosophy: 'Cổ tròn viên lĩnh màu vàng hoàng thổ phối khuyên tai kim loại bất đối xứng và boots da bóng, tạo nên dấu ấn thị giác mạnh mẽ.',
      culturalRespectNote: 'Không thay đổi độ khít của cổ tròn, giữ hình dáng tròn vẹn biểu trưng cho trời tròn đất vuông.',
      confidenceScore: 94
    },
    {
      id: 'vl-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Chiếc áo khoác cổ tròn sang trọng cho dạ tiệc đương đại',
      themePill: 'Dạ Tiệc Tinh Tế',
      colorId: 'blue',
      colorName: 'Xanh chàm đại dương',
      colorHex: '#1E3A8A',
      styleId: 'elegant',
      styleName: 'Thanh lịch quý phái',
      occasionId: 'wedding',
      occasionName: 'Lễ cưới trang trọng',
      accessories: ['chuoi-ngoc-trai', 'tram-cai-toc', 'sandal-day-manh'],
      accessoryNames: ['Chuỗi vòng ngọc trai', 'Trâm cài tóc khảm xà cừ', 'Sandal quai mảnh thanh thoát'],
      stylingPhilosophy: 'Sắc xanh chàm quý phái kết hợp ngọc trai trắng ngà đem đến vẻ ngoài đài các cho người tham dự tiệc cưới cao cấp.',
      culturalRespectNote: 'Đường viền cổ tròn tinh xảo giúp gương mặt người mặc thêm phần phúc hậu, đoan trang.',
      confidenceScore: 97
    }
  ],

  'doi-kham': [
    {
      id: 'dk-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Vạt áo xẻ giữa khoác ngoài lộng lẫy thời Lý - Trần',
      themePill: 'Lý Trần Huy Hoàng',
      colorId: 'yellow',
      colorName: 'Hoàng thổ cung đình',
      colorHex: '#C58B35',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'cultural-event',
      occasionName: 'Sự kiện ngoại giao & Di sản',
      accessories: ['vong-kieng-bac', 'tram-cai-toc', 'guoc-moc-quai-nhung'],
      accessoryNames: ['Vòng kiềng bạc nguyên khối', 'Trâm cài tóc khảm xà cừ', 'Guốc mộc quai nhung'],
      stylingPhilosophy: 'Hai vạt áo đối khâm song song để lộ lớp yếm lụa hoặc áo giao lĩnh bên trong, thắt đai lụa dài thướt tha tôn vinh vẻ đẹp vương giả.',
      culturalRespectNote: 'Áo khoác đối khâm luôn có dải thắt ngang ngực hoặc eo, tạo sự cân xứng âm dương hài hòa.',
      confidenceScore: 98
    },
    {
      id: 'dk-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Cardigan di sản khoác ngoài phong cách Gen Z năng động',
      themePill: 'Cardigan Di Sản',
      colorId: 'green',
      colorName: 'Xanh ngọc bích',
      colorHex: '#065F46',
      styleId: 'modern',
      styleName: 'Hiện đại thanh thoát',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['sneakers-retro-trang', 'khuyen-tai-kim-loai', 'tui-tote-canvas'],
      accessoryNames: ['Sneakers trắng cổ điển', 'Khuyên tai hình học tối giản', 'Túi tote canvas chữ Việt'],
      stylingPhilosophy: 'Sử dụng áo đối khâm như một chiếc kimono cardigan khoác hờ ngoài váy suông hoặc trang phục tối giản, đi cùng giày sneakers trắng trẻ trung.',
      culturalRespectNote: 'Tà áo buông thả tự nhiên không gò bó, mang lại sự tiện dụng cho thế hệ trẻ mà vẫn đậm nét truyền thống.',
      confidenceScore: 95
    },
    {
      id: 'dk-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Nét thơ mộng nhẹ nhàng cho những buổi trà chiều thanh nhã',
      themePill: 'Trà Chiều Thư Thái',
      colorId: 'pastel',
      colorName: 'Hồng phấn mơ màng',
      colorHex: '#FBCFE8',
      styleId: 'romantic',
      styleName: 'Nàng thơ bay bổng',
      occasionId: 'casual',
      occasionName: 'Dạo phố cuối tuần',
      accessories: ['tui-coi-quai-tre', 'tram-cai-toc', 'sandal-day-manh'],
      accessoryNames: ['Túi cói đan thủ công', 'Trâm cài tóc khảm xà cừ', 'Sandal quai mảnh thanh thoát'],
      stylingPhilosophy: 'Sắc hồng phấn mơ màng cùng trâm cài khảm ốc và túi cói đan tay tạo nên diện mạo nàng thơ Á Đông trong trẻo, yêu kiều.',
      culturalRespectNote: 'Giữ độ dài áo qua hông hoặc chấm gối duyên dáng, tránh chất liệu xuyên thấu phản cảm.',
      confidenceScore: 96
    }
  ],

  'ao-tay-chen': [
    {
      id: 'tc-regal',
      title: 'Truyền Thống Sang Trọng',
      subtitle: 'Ống tay bó chẽn năng động gọn gàng chuẩn quan lại xưa',
      themePill: 'Gọn Gàng Nghiêm Cẩn',
      colorId: 'blue',
      colorName: 'Xanh chàm đại dương',
      colorHex: '#1E3A8A',
      styleId: 'traditional',
      styleName: 'Cổ điển thuần khiết',
      occasionId: 'festival',
      occasionName: 'Lễ hội & Tết cổ truyền',
      accessories: ['khan-dong', 'vong-kieng-bac', 'guoc-moc-quai-nhung'],
      accessoryNames: ['Khăn đóng lụa', 'Vòng kiềng bạc nguyên khối', 'Guốc mộc quai nhung'],
      stylingPhilosophy: 'Ống tay áo ôm gọn từ khuỷu tay đến cổ tay giúp cử động linh hoạt, màu xanh chàm kết hợp khăn đóng lụa mang lại phong thái đĩnh đạc.',
      culturalRespectNote: 'Áo tay chẽn là biến thể thiết thực cho hoạt động thường nhật và lễ nghi của người Việt, cổ lập lĩnh đứng thẳng kín đáo.',
      confidenceScore: 97
    },
    {
      id: 'tc-edgy',
      title: 'Cổ Điển Phá Cách',
      subtitle: 'Phong cách Urban Ninja kết hợp boots da dũng mãnh',
      themePill: 'Urban Warrior',
      colorId: 'black',
      colorName: 'Đen tuyền nho nhã',
      colorHex: '#1C1917',
      styleId: 'street',
      styleName: 'Streetwear năng động',
      occasionId: 'photoshoot',
      occasionName: 'Chụp hình Lookbook',
      accessories: ['boots-da-thap-co', 'khuyen-tai-kim-loai', 'tui-kep-nach-mini'],
      accessoryNames: ['Boots da thấp cổ', 'Khuyên tai hình học tối giản', 'Túi kẹp nách da tối giản'],
      stylingPhilosophy: 'Cổ áo lập lĩnh đen tuyền kết hợp tay chẽn ôm sát và boots da hầm hố, tạo nên hình mẫu anh hùng di sản trong các khung hình thời trang.',
      culturalRespectNote: 'Vẫn tuân thủ năm thân áo và cài cúc bên sườn phải, giữ vững tinh thần trang nhã của y phục truyền thống.',
      confidenceScore: 95
    },
    {
      id: 'tc-modern',
      title: 'Thanh Lịch Đương Đại',
      subtitle: 'Trang phục công sở và giảng đường thanh lịch tinh tế',
      themePill: 'Thanh Niên Tri Thức',
      colorId: 'cream',
      colorName: 'Kem ngà lụa tơ',
      colorHex: '#FFFBF2',
      styleId: 'minimal',
      styleName: 'Tối giản tinh tế',
      occasionId: 'school',
      occasionName: 'Học đường & Kỷ yếu',
      accessories: ['tui-tote-canvas', 'sneakers-retro-trang', 'non-bucket-linen'],
      accessoryNames: ['Túi tote canvas chữ Việt', 'Sneakers trắng cổ điển', 'Nón bucket linen thêu tay'],
      stylingPhilosophy: 'Màu kem ngà nhẹ nhõm kết hợp tay chẽn gọn gàng, vừa lịch thiệp vừa tiện lợi khi ghi chép bài vở hoặc sử dụng máy tính.',
      culturalRespectNote: 'Sự tối giản trong thiết kế tôn vinh vẻ đẹp tự nhiên của lụa tơ tằm và phong thái tự tin của trí thức trẻ.',
      confidenceScore: 96
    }
  ]
};

/**
 * Main AI function: Generates 3 unique styling concepts based on the current outfit.
 * Prioritizes Gemini API with model 'gemini-3.8-flash'. Falls back gracefully to expert matrix if offline.
 */
export async function generateThreeAISuggestions(
  outfitId: OutfitId,
  gender: 'female' | 'male' = 'female',
  skinTone: string = 'neutral'
): Promise<AIStyleRecommendation[]> {
  const outfitData = OUTFITS_DATA.find((o) => o.id === outfitId) || OUTFITS_DATA[0];
  const apiKey =
    process.env.GEMINI_API_KEY ||
    (typeof window !== 'undefined' && (window as any).__GEMINI_API_KEY__) ||
    '';

  // If Gemini API Key is available, attempt real AI generation
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
Bạn là Giám đốc Sáng tạo và Cố vấn Thời trang Cổ phục Việt Nam (Vietnamese Heritage Fashion Stylist) hàng đầu cho giới trẻ Gen Z.
Nhiệm vụ: Dựa trên trang phục truyền thống đang chọn: "${outfitData.vietnameseName || outfitData.name}" (${outfitData.subtitle}), hãy gợi ý chính xác 3 phong cách kết hợp độc đáo, tinh tế và chuẩn mực văn hóa cho người mặc (${gender === 'female' ? 'Nữ' : 'Nam'}, tông da ${skinTone}).

3 phong cách bắt buộc phải theo 3 hướng tiếp cận khác nhau:
1. "Truyền thống sang trọng": Tôn vinh vẻ đẹp chuẩn mực cung đình, trang nghiêm hoặc hoàng gia quý phái.
2. "Cổ điển phá cách": Giao thoa di sản với hơi thở đương đại, mix-match phụ kiện độc đáo (như boots da hoặc sneakers) nhưng tuyệt đối không phá hoại phom dáng cổ áo và tà áo.
3. "Thanh lịch đương đại": Nhẹ nhàng, tối giản, ứng dụng cao trong đời sống thường nhật (học đường, dạo phố, chụp lookbook).

Danh sách colorId hợp lệ: "red", "burgundy", "cream", "yellow", "blue", "green", "black", "pastel".
Danh sách styleId hợp lệ: "traditional", "modern", "minimal", "elegant", "street", "romantic".
Danh sách occasionId hợp lệ: "school", "festival", "photoshoot", "wedding", "casual", "cultural-event".
Danh sách accessoryId hợp lệ: "khan-dong", "khan-ran", "khan-lua-to-tam", "bandana-cach-tan", "non-la-truyen-thong", "non-quai-thao", "non-beret-da", "non-bucket-linen", "tui-coi-quai-tre", "tui-tote-canvas", "tui-kep-nach-mini", "vong-kieng-bac", "chuoi-ngoc-trai", "khuyen-tai-kim-loai", "tram-cai-toc", "guoc-moc-quai-nhung", "sneakers-retro-trang", "boots-da-thap-co", "sandal-day-manh".

Trả về kết quả bằng định dạng JSON hợp lệ tuân thủ schema quy định.
      `.trim();

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: 'Danh sách 3 gợi ý phong cách kết hợp AI',
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: 'Tên phong cách, ví dụ: "Truyền thống sang trọng" hoặc "Cổ điển phá cách"' },
                subtitle: { type: Type.STRING, description: 'Dòng mô tả ngắn gọn truyền cảm hứng' },
                themePill: { type: Type.STRING, description: 'Huy hiệu phong cách, ví dụ: "Quý Phái Chuẩn Mực"' },
                colorId: { type: Type.STRING, description: 'ID màu sắc hợp lệ' },
                styleId: { type: Type.STRING, description: 'ID phong cách hợp lệ' },
                occasionId: { type: Type.STRING, description: 'ID dịp mặc hợp lệ' },
                accessories: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '2-3 ID phụ kiện hợp lệ'
                },
                stylingPhilosophy: { type: Type.STRING, description: 'Lời khuyên chuyên sâu từ stylist AI' },
                culturalRespectNote: { type: Type.STRING, description: 'Lưu ý tôn trọng chuẩn mực văn hóa' },
                confidenceScore: { type: Type.INTEGER, description: 'Điểm tương thích từ 90 đến 99' }
              },
              required: [
                'title',
                'subtitle',
                'themePill',
                'colorId',
                'styleId',
                'occasionId',
                'accessories',
                'stylingPhilosophy',
                'culturalRespectNote'
              ]
            }
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text) as Array<{
          title: string;
          subtitle: string;
          themePill: string;
          colorId: ColorId;
          styleId: StyleId;
          occasionId: OccasionId;
          accessories: string[];
          stylingPhilosophy: string;
          culturalRespectNote: string;
          confidenceScore?: number;
        }>;

        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed.slice(0, 3).map((item, idx) => {
            const col = COLOR_MAP[item.colorId] || COLOR_MAP.burgundy;
            const styleName = STYLE_NAME_MAP[item.styleId] || 'Cổ điển thuần khiết';
            const occName = OCCASION_NAME_MAP[item.occasionId] || 'Lễ hội & Tết cổ truyền';
            const accNames = item.accessories.map((aid) => {
              const accObj = ACCESSORIES_DATA.find((a) => a.id === aid);
              return accObj ? accObj.name : aid;
            });

            return {
              id: `gemini-${outfitId}-${idx}`,
              title: item.title,
              subtitle: item.subtitle,
              themePill: item.themePill,
              colorId: item.colorId in COLOR_MAP ? item.colorId : 'burgundy',
              colorName: col.name,
              colorHex: col.hex,
              styleId: item.styleId in STYLE_NAME_MAP ? item.styleId : 'traditional',
              styleName,
              occasionId: item.occasionId in OCCASION_NAME_MAP ? item.occasionId : 'festival',
              occasionName: occName,
              accessories: item.accessories,
              accessoryNames: accNames,
              stylingPhilosophy: item.stylingPhilosophy,
              culturalRespectNote: item.culturalRespectNote,
              confidenceScore: item.confidenceScore || 96
            };
          });
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, using expert stylist matrix fallback:', err);
    }
  }

  // Graceful simulation delay for realistic AI stylist reasoning
  await new Promise((resolve) => setTimeout(resolve, 600));

  const fallbackList = FALLBACK_STYLIST_MATRIX[outfitId] || FALLBACK_STYLIST_MATRIX['ao-dai'];
  return fallbackList;
}

/**
 * Legacy rule-based suggestion for quick remix
 */
export async function generateOutfitSuggestion(
  occasion: OccasionId = 'festival',
  preferredStyle?: StyleId
): Promise<StyleSuggestionResult> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return {
    occasion,
    outfit: 'ao-dai',
    style: preferredStyle || 'minimal',
    color: 'cream',
    accessories: ['tui-tote-canvas', 'sneakers-retro-trang'],
    stylistRationale: 'Combo thanh xuân học đường năng động và thuần khiết.'
  };
}

export interface StyleDrivenSuggestion {
  id: string;
  title: string;
  concept: string;
  themeBadge: string;
  targetOutfit: OutfitId;
  targetOccasion: OccasionId;
  targetStyle: StyleId;
  targetColor: ColorId;
  targetAccessories: string[];
  outfitName: string;
  styleName: string;
  occasionName: string;
  colorName: string;
  colorHex: string;
  accessoryNames: string[];
  stylistRationale: string;
  culturalNote: string;
  matchScore: number;
}

/**
 * Generates curated AI styling suggestions specifically focused on the user's selected style,
 * allowing instant outfit experimentation directly from ResultPage.
 */
export async function generateStyleDrivenSuggestions(
  lookState: OutfitLookState
): Promise<StyleDrivenSuggestion[]> {
  const currentOutfitId = (lookState.outfit || 'ao-dai') as OutfitId;
  const currentStyleId = (lookState.style || 'modern') as StyleId;
  const currentOccasionId = (lookState.occasion || 'festival') as OccasionId;
  const currentColorId = (lookState.color || 'burgundy') as ColorId;

  const currentOutfitObj = OUTFITS_DATA.find((o) => o.id === currentOutfitId) || OUTFITS_DATA[0];
  const outfitName = currentOutfitObj.name;
  const styleName = STYLE_NAME_MAP[currentStyleId] || 'Cách tân hiện đại';
  const occasionName = OCCASION_NAME_MAP[currentOccasionId] || 'Lễ hội & Sự kiện';

  const helperBuildSuggestion = (
    idSuffix: string,
    title: string,
    concept: string,
    themeBadge: string,
    targetOutfit: OutfitId,
    targetColor: ColorId,
    targetAccessories: string[],
    targetStyle: StyleId,
    targetOccasion: OccasionId,
    rationale: string,
    culturalNote: string,
    score: number
  ): StyleDrivenSuggestion => {
    const outObj = OUTFITS_DATA.find((o) => o.id === targetOutfit) || currentOutfitObj;
    const colObj = COLOR_MAP[targetColor] || COLOR_MAP.burgundy;
    const accNames = targetAccessories.map((aid) => {
      const a = ACCESSORIES_DATA.find((item) => item.id === aid);
      return a ? a.name : aid;
    });

    return {
      id: `ai-style-dock-${currentStyleId}-${idSuffix}`,
      title,
      concept,
      themeBadge,
      targetOutfit,
      targetOccasion,
      targetStyle,
      targetColor,
      targetAccessories,
      outfitName: outObj.name,
      styleName: STYLE_NAME_MAP[targetStyle] || 'Hiện đại',
      occasionName: OCCASION_NAME_MAP[targetOccasion] || 'Lễ hội',
      colorName: colObj.name,
      colorHex: colObj.hex,
      accessoryNames: accNames,
      stylistRationale: rationale,
      culturalNote,
      matchScore: score
    };
  };

  // Base suggestions customized according to selected style
  switch (currentStyleId) {
    case 'modern':
      return [
        helperBuildSuggestion(
          'mod-core',
          `Cách Tân Tối Giản Đương Đại`,
          `Phối ${outfitName} cùng lụa kem ngà thanh thoát và giày sandal thanh mảnh`,
          '✦ Gợi Ý Tối Ưu',
          currentOutfitId,
          currentColorId === 'cream' ? 'blue' : 'cream',
          ['khan-lua-to-tam', 'sandal-day-manh', 'khuyen-tai-kim-loai'],
          'modern',
          currentOccasionId,
          `Tận dụng đường nét thanh mảnh của ${outfitName}, lược bớt phụ kiện nặng nề để tạo vẻ ngoài phóng khoáng, trẻ trung trong không gian đô thị.`,
          `Giữ trọn cấu trúc cổ áo và độ rủ tự nhiên của tà áo, tạo sự thoải mái khi di chuyển mà vẫn chỉn chu.`,
          98
        ),
        helperBuildSuggestion(
          'mod-urban-commute',
          `Năng Động Thành Thị (City Casual)`,
          `Kết hợp túi tote canvas thêu chữ Nôm và giày sneakers trắng dạo phố`,
          '⚡ Năng Động Gen Z',
          currentOutfitId,
          'pastel',
          ['tui-tote-canvas', 'sneakers-retro-trang'],
          'modern',
          'casual',
          `Công thức phối đồ được yêu thích nhất: ${outfitName} sắc pastel nhẹ nhàng đối thoại cùng sneakers trắng cổ điển, giúp bạn tự tin sải bước suốt ngày dài.`,
          `Sử dụng phụ kiện hiện đại ở chân và túi xách để tạo nét năng động mà không làm biến dạng tỷ lệ trang phục.`,
          95
        ),
        helperBuildSuggestion(
          'mod-monochrome-edge',
          `Sắc Lạnh Đơn Sắc (Monochrome Edge)`,
          `Tông đen tuyền nho nhã phối boots da thấp cổ và túi kẹp nách mini`,
          '🔥 Sắc Sảo High-Fashion',
          currentOutfitId,
          'black',
          ['boots-da-thap-co', 'tui-kep-nach-mini', 'khuyen-tai-kim-loai'],
          'modern',
          'photoshoot',
          `Biến ${outfitName} thành tác phẩm thời trang sắc lạnh bằng cách phối toàn bộ gam màu đen tuyền huyền bí với boots da bóng và phụ kiện hình học kim loại.`,
          `Tôn vinh sự sắc sảo của phom dáng cắt may đương đại, phù hợp cho triển lãm hoặc chụp hình lookbook nghệ thuật.`,
          96
        ),
        helperBuildSuggestion(
          'mod-companion-nguthan',
          currentOutfitId === 'ao-ngu-than' ? 'Biến Thể Áo Dài Suông' : 'Thử Dáng Áo Ngũ Thân Lập Lĩnh',
          currentOutfitId === 'ao-ngu-than'
            ? 'Đổi sang Áo Dài form suông phóng khoáng mang tinh thần cách tân'
            : 'Đổi sang Áo Ngũ Thân phom rộng thoải mái với 5 khuy cài đặc trưng',
          '🔄 Thử Kiểu Áo Khác',
          currentOutfitId === 'ao-ngu-than' ? 'ao-dai' : 'ao-ngu-than',
          'blue',
          ['vong-kieng-bac', 'sandal-day-manh'],
          'modern',
          currentOccasionId,
          `Trải nghiệm một phom dáng Việt phục song hành mang cùng tinh thần cách tân hiện đại, tạo cảm giác mới lạ tức thì.`,
          `Cả hai kiểu áo đều có lịch sử phát triển hài hòa, tôn vinh nét đẹp văn minh và đĩnh đạc của văn hóa mặc Việt.`,
          93
        )
      ];

    case 'street':
      return [
        helperBuildSuggestion(
          'str-darkwear',
          `Streetwear Di Sản Sắc Lạnh`,
          `Boots da thấp cổ, túi kẹp nách da và khuyên tai kim loại hình học`,
          '✦ Phá Cách Độc Bản',
          currentOutfitId,
          currentColorId === 'black' ? 'burgundy' : 'black',
          ['boots-da-thap-co', 'tui-kep-nach-mini', 'khuyen-tai-kim-loai'],
          'street',
          'photoshoot',
          `Đem tinh thần thời trang đường phố đương đại vào ${outfitName} qua sự kết hợp của chất liệu da cá tính và kim loại sắc sảo.`,
          `Giữ phom dáng áo nguyên vẹn, sử dụng phụ kiện hiện đại tạo điểm nhấn đối lập thị giác đầy thu hút.`,
          97
        ),
        helperBuildSuggestion(
          'str-sneakerhead',
          `Gen Z Sneakerhead Heritage`,
          `Bandana lụa hoa văn Việt quấn cổ phối cùng sneakers retro trắng`,
          '⚡ Trẻ Trung Phố Thị',
          currentOutfitId,
          'blue',
          ['bandana-cach-tan', 'sneakers-retro-trang', 'tui-tote-canvas'],
          'street',
          'casual',
          `Biến tấu khăn lụa thành phụ kiện streetwear thắt cổ hoặc cổ tay, mang lại vẻ ngẫu hứng và tràn đầy năng lượng tươi trẻ.`,
          `Đưa di sản vào thói quen ăn mặc thường nhật của giới trẻ một cách tự nhiên và văn minh.`,
          96
        ),
        helperBuildSuggestion(
          'str-beret-indochine',
          `Lãng Tử Đông Dương Đương Đại`,
          `Mũ beret cổ điển kết hợp dải lụa vắt vai tạo chất nghệ sĩ đường phố`,
          '🎨 Phong Vị Nghệ Sĩ',
          currentOutfitId,
          'yellow',
          ['non-beret-da', 'khan-lua-to-tam', 'boots-da-thap-co'],
          'street',
          'cultural-event',
          `Phong cách giao thoa mỹ thuật Đông Dương đầu thế kỷ 20, gợi nhắc vẻ hào hoa, tự do của các trí thức nghệ sĩ trẻ xưa.`,
          `Hài hòa giữa thẩm mỹ phương Tây và linh hồn áo truyền thống Việt Nam.`,
          94
        ),
        helperBuildSuggestion(
          'str-companion-tuthan',
          currentOutfitId === 'ao-tu-than' ? 'Thử Ngũ Thân Dạo Phố' : 'Thử Dáng Áo Tứ Thân Buộc Vạt',
          currentOutfitId === 'ao-tu-than'
            ? 'Chuyển sang Áo Ngũ Thân phối boots da cực ngầu'
            : 'Đổi sang Áo Tứ Thân với 2 vạt trước buộc rủ cá tính kiểu boho-chic',
          '🔄 Thử Kiểu Áo Khác',
          currentOutfitId === 'ao-tu-than' ? 'ao-ngu-than' : 'ao-tu-than',
          'red',
          ['boots-da-thap-co', 'khuyen-tai-kim-loai'],
          'street',
          'photoshoot',
          `Thử nghiệm một phom áo dân gian Bắc Bộ với phong cách mix phụ kiện hầm hố hiện đại, tạo nên bản phối đột phá.`,
          `Hai vạt áo buộc eo tự nhiên của Áo Tứ Thân mang sẵn tinh thần phóng khoáng, rất hợp với gu thời trang đường phố.`,
          92
        )
      ];

    case 'minimal':
      return [
        helperBuildSuggestion(
          'min-pure-silk',
          `Lụa Tơ Tằm Mộc Thuần Khiết`,
          `Sắc kem ngà tự nhiên, kiềng bạc thanh mảnh và sandal quai mảnh`,
          '✦ Tối Giản Tuyệt Đối',
          currentOutfitId,
          'cream',
          ['vong-kieng-bac', 'sandal-day-manh'],
          'minimal',
          'school',
          `Lược bỏ mọi chi tiết rườm rà, để chất liệu lụa tơ tằm mộc và đường may tinh xảo của ${outfitName} tự cất lên tiếng nói thanh tao.`,
          `Vẻ đẹp nguyên bản của vải dệt thủ công Việt Nam tôn vinh sự khiêm nhường, tĩnh tại và chiều sâu nhân cách.`,
          99
        ),
        helperBuildSuggestion(
          'min-zen-indigo',
          `Zen Lam Cổ Tĩnh Tại`,
          `Sắc xanh chàm mộc mạc kết hợp túi cói đan quai tre thủ công`,
          '🌿 Hơi Thở Tự Nhiên',
          currentOutfitId,
          'blue',
          ['tui-coi-quai-tre', 'guoc-moc-quai-nhung'],
          'minimal',
          'casual',
          `Hòa quyện sắc chàm tự nhiên với chất liệu mây tre đan dân gian, tạo cảm giác thư thái, an yên trong từng nhịp bước.`,
          `Sử dụng chất liệu thuần tự nhiên, thân thiện với môi trường theo lối sống bền vững của người trẻ.`,
          96
        ),
        helperBuildSuggestion(
          'min-monochrome-green',
          `Diệp Lục Thanh Nhã`,
          `Xanh ngọc bích êm dịu phối khuyên tai hình học tối giản`,
          '✨ Tươi Mới Thanh Lịch',
          currentOutfitId,
          'green',
          ['khuyen-tai-kim-loai', 'sandal-day-manh'],
          'minimal',
          'cultural-event',
          `Tông màu xanh lá mát dịu giúp trang phục nổi bật một cách êm đềm, không phô trương mà vẫn thu hút mọi ánh nhìn.`,
          `Biểu trưng cho chồi non lộc biếc và hy vọng, thích hợp cho các buổi gặp gỡ trà đạo hoặc triển lãm văn hóa.`,
          95
        ),
        helperBuildSuggestion(
          'min-companion-baba',
          currentOutfitId === 'ao-ba-ba' ? 'Thử Áo Dài Tối Giản' : 'Thử Áo Bà Ba Lụa Đơn Sắc',
          currentOutfitId === 'ao-ba-ba'
            ? 'Đổi sang Áo Dài tối giản đơn sắc'
            : 'Đổi sang Áo Bà Ba lụa mềm mại Nam Bộ với đường xẻ tà phóng khoáng',
          '🔄 Thử Kiểu Áo Khác',
          currentOutfitId === 'ao-ba-ba' ? 'ao-dai' : 'ao-ba-ba',
          'cream',
          ['tui-coi-quai-tre', 'guoc-moc-quai-nhung'],
          'minimal',
          'casual',
          `Áo bà ba với phom dáng suông ôm nhẹ là một trong những thiết kế tối giản đỉnh cao của văn hóa trang phục Nam Bộ.`,
          `Đơn sơ, chân phương, mộc mạc nhưng ẩn chứa nét duyên ngầm đằm thắm.`,
          93
        )
      ];

    case 'elegant':
      return [
        helperBuildSuggestion(
          'ele-regal-gold',
          `Hoàng Thổ Cung Đình Quý Phái`,
          `Chuỗi ngọc trai quý phái kết hợp trâm cài tóc khảm xà cừ tinh xảo`,
          '✦ Quý Tộc Chuẩn Mực',
          currentOutfitId,
          currentColorId === 'yellow' ? 'burgundy' : 'yellow',
          ['chuoi-ngoc-trai', 'tram-cai-toc', 'sandal-day-manh'],
          'elegant',
          'wedding',
          `Sự phối hợp đỉnh cao giữa sắc vàng hoàng tộc ấm áp và ánh xà cừ ngọc trai, tạo nên phong thái vương giả cao nhã cho ${outfitName}.`,
          `Tôn vinh chuẩn mực lễ nghi truyền thống, phù hợp cho các buổi tiệc đại lễ, cưới hỏi và sự kiện ngoại giao.`,
          99
        ),
        helperBuildSuggestion(
          'ele-crimson-velvet',
          `Đỏ Rượu Dạ Tiệc Đài Các`,
          `Sắc đỏ rượu đĩnh đạc đi cùng kiềng bạc nguyên khối và túi kẹp nách sang trọng`,
          '👑 Sang Trọng Kiêu Sa',
          currentOutfitId,
          'burgundy',
          ['vong-kieng-bac', 'tui-kep-nach-mini', 'sandal-day-manh'],
          'elegant',
          'photoshoot',
          `Màu đỏ thẫm đem lại chiều sâu bí ẩn và quyền lực mềm mại, kết hợp kiềng bạc sáng rực tôn trọn nét đài các của cần cổ người mặc.`,
          `Màu đỏ rượu thể hiện sự thành đạt, chững chạc và gu thẩm mỹ tinh tế của người thưởng thức văn hóa.`,
          97
        ),
        helperBuildSuggestion(
          'ele-pure-pearl',
          `Bạch Ngọc Tơ Tằm`,
          `Sắc kem ngà ánh kim kết hợp dải lụa vắt vai và trâm cài tóc`,
          '🕊️ Đài Các Nhẹ Nhàng',
          currentOutfitId,
          'cream',
          ['khan-lua-to-tam', 'tram-cai-toc', 'chuoi-ngoc-trai'],
          'elegant',
          'cultural-event',
          `Gam màu bạch ngọc thanh khiết mang lại vẻ đẹp quý phái như bước ra từ tranh lụa cung đình, mềm mại và siêu thực.`,
          `Trang phục toát lên sự đôn hậu, đoan trang, phản chiếu phẩm giá cao quý của người mặc.`,
          96
        ),
        helperBuildSuggestion(
          'ele-companion-nhatbinh',
          currentOutfitId === 'ao-nhat-binh' ? 'Thử Áo Tấc Cung Đình' : 'Thử Áo Nhật Bình Hoàng Gia',
          currentOutfitId === 'ao-nhat-binh'
            ? 'Đổi sang Áo Tấc tay thụng trang trọng'
            : 'Đổi sang Áo Nhật Bình vạt chữ nhật với hoa văn ngũ sắc hoàng tộc',
          '🔄 Thử Kiểu Áo Khác',
          currentOutfitId === 'ao-nhat-binh' ? 'ao-tac' : 'ao-nhat-binh',
          'burgundy',
          ['tram-cai-toc', 'chuoi-ngoc-trai'],
          'elegant',
          'wedding',
          `Trải nghiệm trang phục cao cấp nhất của hoàng hậu và công chúa triều Nguyễn để đạt đến đỉnh cao của sự vương giả.`,
          `Dải cổ áo Nhật Bình thêu hoa văn ngũ hành tượng trưng cho vũ trụ quan và đạo lý vương triều.`,
          95
        )
      ];

    case 'traditional':
      return [
        helperBuildSuggestion(
          'trad-orthodox',
          `Khuôn Thước Đại Triều Cổ Kính`,
          `Khăn đóng lụa nếp chữ Nhất, kiềng bạc nguyên khối và guốc mộc truyền thống`,
          '✦ Chuẩn Mực Cổ Truyền',
          currentOutfitId,
          currentColorId === 'red' ? 'burgundy' : 'red',
          ['khan-dong', 'vong-kieng-bac', 'guoc-moc-quai-nhung'],
          'traditional',
          'festival',
          `Tái hiện chuẩn xác phong thái nho nhã của tổ tiên trong các nghi lễ trang trọng, gìn giữ trọn vẹn từng đường nét nguyên bản.`,
          `Tuân thủ tỷ lệ cổ lập lĩnh, hàng khuy cài kín đáo và nếp khăn gọn gàng theo tinh thần lễ giáo Á Đông.`,
          99
        ),
        helperBuildSuggestion(
          'trad-kinhbac-folk',
          `Hương Sắc Quan Họ Kinh Bắc`,
          `Nón quai thao thu nhỏ phối dải thắt lưng lụa và guốc mộc quai nhung`,
          '🌾 Duyên Dáng Dân Gian',
          currentOutfitId,
          'yellow',
          ['non-quai-thao', 'guoc-moc-quai-nhung', 'vong-kieng-bac'],
          'traditional',
          'cultural-event',
          `Gợi nhớ hình ảnh liền chị quan họ Kinh Bắc duyên dáng bên giếng nước sân đình, mang đậm tình tự dân tộc Việt.`,
          `Nón quai thao và kiềng bạc là biểu tượng trường tồn của sự dịu dàng, thủy chung trong ca dao dân ca.`,
          97
        ),
        helperBuildSuggestion(
          'trad-royal-son',
          `Son Đỏ Phúc Lộc Sum Vầy`,
          `Sắc đỏ son may mắn kết hợp trâm xà cừ và chuỗi ngọc trai cổ điển`,
          '🧧 Khởi Sắc May Mắn',
          currentOutfitId,
          'red',
          ['tram-cai-toc', 'chuoi-ngoc-trai', 'guoc-moc-quai-nhung'],
          'traditional',
          'wedding',
          `Sắc đỏ son tượng trưng cho hỷ sự và năng lượng sinh sôi, đem lại niềm vui và may mắn trong ngày đại hỷ hoặc dịp tết đến xuân về.`,
          `Màu đỏ son kết hợp trang sức ngọc trai là cặp đôi chuẩn mực trong văn hóa phục sức Việt nhiều thế hệ.`,
          98
        ),
        helperBuildSuggestion(
          'trad-companion-aotac',
          currentOutfitId === 'ao-tac' ? 'Thử Áo Ngũ Thân Truyền Thống' : 'Thử Áo Tấc Tay Thụng Trang Trọng',
          currentOutfitId === 'ao-tac'
            ? 'Đổi sang Áo Ngũ Thân gọn gàng linh hoạt'
            : 'Đổi sang Áo Tấc tay thụng rộng chuẩn mực cho các nghi lễ quan trọng',
          '🔄 Thử Kiểu Áo Khác',
          currentOutfitId === 'ao-tac' ? 'ao-ngu-than' : 'ao-tac',
          'burgundy',
          ['khan-dong', 'vong-kieng-bac'],
          'traditional',
          'festival',
          `Áo tấc với đôi tay thụng dài là trang phục lễ nghi tiêu biểu của mọi tầng lớp người Việt trong các dịp đại lễ xưa.`,
          `Khi hai tay chắp trước ngực trong dáng áo tấc, người mặc thể hiện lòng khiêm cung và sự kính trọng đối với tiền nhân.`,
          96
        )
      ];

    case 'romantic':
    default:
      return [
        helperBuildSuggestion(
          'rom-spring-blossom',
          `Nàng Thơ Dạo Vườn Xuân`,
          `Sắc hồng phấn mơ màng, túi cói đan mộc mạc và sandal quai mảnh`,
          '✦ Thơ Mộng Tinh Khôi',
          currentOutfitId,
          'pastel',
          ['tui-coi-quai-tre', 'sandal-day-manh', 'tram-cai-toc'],
          'romantic',
          'photoshoot',
          `Tựa như đóa sen hồng đầu hạ, bản phối mang lại nét dịu dàng, thơ ngây và bay bổng cho người mặc trong những buổi chiều lộng gió.`,
          `Chất liệu lụa mềm buông lơi tự nhiên tạo nhịp chuyển động êm ả, tôn lên nét duyên thầm e ấp.`,
          98
        ),
        helperBuildSuggestion(
          'rom-hoian-sunset',
          `Hoàng Hôn Phố Cổ Hoài Niệm`,
          `Gam vàng ấm áp phối dải lụa tơ tằm vắt vai bồng bềnh`,
          '🏮 Lãng Mạn Phố Cổ',
          currentOutfitId,
          'yellow',
          ['khan-lua-to-tam', 'chuoi-ngoc-trai', 'sandal-day-manh'],
          'romantic',
          'casual',
          `Lấy cảm hứng từ ánh đèn lồng Hội An lung linh bên dòng sông Hoài, tạo nên diện mạo vừa hoài niệm vừa ngọt ngào.`,
          `Sắc vàng ấm áp như nắng chiều buông trên tường vôi cổ, rất tôn da người Việt.`,
          96
        ),
        helperBuildSuggestion(
          'rom-lotus-cream',
          `Búp Sen Trắng Sương Mai`,
          `Lụa kem ngà mềm mại kết hợp trâm cài xà cừ và nón lá chóp truyền thống`,
          '🪷 Thuần Khiết Mong Manh',
          currentOutfitId,
          'cream',
          ['non-la-truyen-thong', 'tram-cai-toc', 'sandal-day-manh'],
          'romantic',
          'school',
          `Hình ảnh người con gái Việt trong tà áo sáng màu cùng nón lá chóp che nghiêng vành luôn là nguồn cảm hứng bất tận của thi ca.`,
          `Vẻ đẹp trong trẻo, mộc mạc làm xao xuyến lòng người mà không cần bất kỳ sự cầu kỳ phô trương nào.`,
          97
        ),
        helperBuildSuggestion(
          'rom-companion-tuthan',
          currentOutfitId === 'ao-tu-than' ? 'Thử Áo Dài Thướt Tha' : 'Thử Dáng Áo Tứ Thân Bay Bổng',
          currentOutfitId === 'ao-tu-than'
            ? 'Đổi sang Áo Dài lụa mềm hai tà thướt tha'
            : 'Đổi sang Áo Tứ Thân với dải lụa bay bổng thắt eo đậm chất nàng thơ',
          '🔄 Thử Kiểu Áo Khác',
          currentOutfitId === 'ao-tu-than' ? 'ao-dai' : 'ao-tu-than',
          'pastel',
          ['khan-lua-to-tam', 'sandal-day-manh'],
          'romantic',
          'photoshoot',
          `Áo tứ thân với các tầng vạt áo xao động trong gió là định nghĩa hoàn hảo cho vẻ đẹp lãng mạn dân gian Kinh Bắc.`,
          `Dải thắt lưng xuyến bay phất phơ theo bước chân đem lại cảm xúc thơ mộng cho từng khung hình.`,
          94
        )
      ];
  }
}

