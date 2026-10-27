import { OutfitId } from '../types';

export interface CulturalTipItem {
  id: string;
  category: 'accessory' | 'outfit' | 'symbolism' | 'craft';
  categoryLabel: string;
  categoryColor: string;
  title: string;
  itemFocus: string;
  era: string;
  didYouKnow: string;
  historicalStory: string;
  stylingInspiration: string;
  relatedOutfitId: OutfitId;
  relatedOutfitName: string;
  relatedAccessoryName?: string;
  culturalTag: string;
  badge: string;
}

export const CULTURAL_DAILY_TIPS: CulturalTipItem[] = [
  {
    id: 'tip-5-buttons-ngu-than',
    category: 'symbolism',
    categoryLabel: 'Triết Học Phục Sức',
    categoryColor: '#991B1E',
    title: 'Bí Mật 5 Chiếc Cúc Cài Trên Áo Ngũ Thân',
    itemFocus: 'Hàng Cúc Áo Ngũ Thân',
    era: 'Thế kỷ 18 · Chúa Nguyễn Phúc Khoát quy định',
    didYouKnow: 'Năm chiếc khuy cài trên áo ngũ thân không chỉ để cố định vạt áo, mà chính là hiện thân của đạo lý "Ngũ Thường" trong Nho gia: Nhân, Lễ, Nghĩa, Trí, Tín.',
    historicalStory: 'Khi cài đủ năm cúc, người xưa tự nhắc nhở bản thân sống có chuẩn mực, đối đãi khoan hòa với mọi người và giữ trọn chữ tín. Năm thân áo cũng tượng trưng cho tứ thân phụ mẫu (cha mẹ hai bên) ôm bọc lấy bản thân mình.',
    stylingInspiration: 'Khi remix áo ngũ thân với phong cách đường phố (streetwear), hãy luôn cài đủ 5 cúc cổ và sườn để giữ phom lập lĩnh đĩnh đạc, sau đó tự do phối cùng boots da hoặc sneakers.',
    relatedOutfitId: 'ao-ngu-than',
    relatedOutfitName: 'Áo Ngũ Thân Lập Lĩnh',
    culturalTag: 'Nhân · Lễ · Nghĩa · Trí · Tín',
    badge: 'Mẹo Triết Học'
  },
  {
    id: 'tip-kieng-bac-co-dien',
    category: 'accessory',
    categoryLabel: 'Phụ Kiện Di Sản',
    categoryColor: '#C8973E',
    title: 'Chiếc Kiềng Bạc Và Vóc Dáng Cần Cổ Thiên Nga',
    itemFocus: 'Vòng Kiềng Bạc Nguyên Khối',
    era: 'Từ thời Đông Sơn qua các triều đại phong kiến',
    didYouKnow: 'Vòng kiềng bạc tròn trơn ôm sát cổ được người Việt cổ coi như vật phẩm phong thủy tượng trưng cho "Trời Tròn" (Thiên Viên), có khả năng kỵ gió độc và xua đuổi tà khí.',
    historicalStory: 'Chiếc kiềng bạc ánh trăng khi phối cùng cổ áo lập lĩnh kín đáo sẽ tạo nên một khoảng hở thị giác hoàn hảo, tôn vinh chiếc cổ cao thanh tú và bờ vai mềm của người phụ nữ Việt Nam.',
    stylingInspiration: 'Kiềng bạc là phụ kiện "hack" phong cách đỉnh nhất: bạn có thể đeo kiềng bạc cùng áo dài lụa truyền thống hoặc phối nổi bật trên nền áo thun cổ lọ tối giản hay áo blazer hiện đại.',
    relatedOutfitId: 'ao-dai',
    relatedOutfitName: 'Áo Dài',
    relatedAccessoryName: 'Vòng kiềng bạc nguyên khối',
    culturalTag: 'Trời Tròn · Kỵ Gió Độc',
    badge: 'Phụ Kiện Kinh Điển'
  },
  {
    id: 'tip-khan-dong-chu-nhat',
    category: 'accessory',
    categoryLabel: 'Nghi Lễ Đầu Tóc',
    categoryColor: '#315643',
    title: 'Khăn Đóng Chữ "Nhất": Nho Nhã & Quang Minh',
    itemFocus: 'Khăn Đóng Lụa',
    era: 'Thời Nguyễn · Chuẩn mực phục sức khoa bảng',
    didYouKnow: 'Khăn đóng của người Việt được xếp nhiều nếp tạo thành hình chữ "Nhất" (一) ở chính giữa trán, tượng trưng cho đức tính chính trực, nhất quán và lòng dạ ngay thẳng.',
    historicalStory: 'Khác với khăn xếp lỏng lẻo của một số nước lân cận, khăn đóng Việt Nam được quấn tỉ mỉ theo cấu trúc "trong cứng ngoài mềm", thể hiện cốt cách người quân tử: bên trong giữ vững nguyên tắc, bên ngoài cư xử nhã nhặn.',
    stylingInspiration: 'Thử kết hợp khăn đóng màu đen hoặc xanh thẫm cùng áo ngũ thân cách tân phom suông rộng và mắt kính gọng kim loại tròn retro để tạo diện mạo học giả Đông Dương cực chất.',
    relatedOutfitId: 'ao-ngu-than',
    relatedOutfitName: 'Áo Ngũ Thân',
    relatedAccessoryName: 'Khăn đóng lụa',
    culturalTag: 'Chính Trực · Nhất Quán',
    badge: 'Cốt Cách Nho Gia'
  },
  {
    id: 'tip-non-quai-thao-kinh-bac',
    category: 'accessory',
    categoryLabel: 'Dân Gian Kinh Bắc',
    categoryColor: '#A3262A',
    title: 'Nón Quai Thao: "Phương Tiện Tỏ Tình" Của Liền Chị',
    itemFocus: 'Nón Quai Thao & Dải Quai Thao',
    era: 'Thế kỷ 12 đến thế kỷ 20 · Vùng quan họ Bắc Ninh',
    didYouKnow: 'Nón quai thao với vành tròn phẳng rộng không chỉ để che nắng mưa, mà dải quai thao đan bằng tơ tằm buông dài chấm ngực từng là cách để liền chị e ấp giấu nụ cười duyên khi hát đối đáp.',
    historicalStory: 'Dải quai thao gồm nhiều tao tơ bện chặt, hai đầu đính quả cầu chỉ màu rực rỡ. Khi gặp người thương, các cô gái nhẹ nhàng nghiêng vành nón che nửa khuôn mặt, tạo nên nét duyên thầm xao xuyến ca dao.',
    stylingInspiration: 'Trong các buổi chụp hình kỷ yếu hoặc lễ hội, một chiếc nón quai thao thu nhỏ cầm tay sẽ tạo điểm nhấn thị giác đậm chất dân tộc mà không làm nặng nề set đồ.',
    relatedOutfitId: 'ao-tu-than',
    relatedOutfitName: 'Áo Tứ Thân',
    relatedAccessoryName: 'Nón quai thao thu nhỏ',
    culturalTag: 'Duyên Thầm Quan Họ',
    badge: 'Nghệ Thuật Dân Gian'
  },
  {
    id: 'tip-ao-tu-than-vat-ao',
    category: 'outfit',
    categoryLabel: 'Trang Phục Truyền Thống',
    categoryColor: '#C8973E',
    title: 'Ý Nghĩa Bốn Vạt Áo Tứ Thân & Tình Mẫu Tử',
    itemFocus: 'Bốn Vạt Áo & Dải Thắt Lưng Xuyến',
    era: 'Thế kỷ 12 · Trang phục phụ nữ Bắc Bộ',
    didYouKnow: 'Áo tứ thân gồm bốn thân áo tượng trưng cho "Tứ Thân Phụ Mẫu": cha mẹ mình và cha mẹ người bạn đời. Hai vạt trước buộc rủ trước bụng tượng trưng cho sự gắn kết vợ chồng thủy chung.',
    historicalStory: 'Phía trong áo tứ thân luôn có dải thắt lưng xanh xuyến ôm gọn eo và chiếc yếm đào. Màu xanh của dải lụa gặp sắc hồng của yếm và sắc nâu trầm của thân áo tạo nên bức tranh hòa sắc ngũ hành tuyệt mỹ của người nông dân cần lao.',
    stylingInspiration: 'Hãy thử diện áo tứ thân mở tà phối cùng áo yếm cách tân chất liệu lụa satin mỏng bên trong, dạo bước cùng một chiếc túi cói đan mộc để tái hiện phong cách nàng thơ đồng nội.',
    relatedOutfitId: 'ao-tu-than',
    relatedOutfitName: 'Áo Tứ Thân Kinh Bắc',
    culturalTag: 'Đạo Hiếu · Vợ Chồng Son Sắt',
    badge: 'Nét Đẹp Mộc Mạc'
  },
  {
    id: 'tip-sac-do-chu-sa',
    category: 'craft',
    categoryLabel: 'Màu Sắc & Chất Liệu',
    categoryColor: '#991B1E',
    title: 'Màu Đỏ Son (Chu Sa): Sắc Hỷ Của Văn Hóa Việt',
    itemFocus: 'Màu Nhuộm Đỏ Son Truyền Thống',
    era: 'Hàng ngàn năm văn hiến',
    didYouKnow: 'Màu đỏ son trong phục sức Việt không chói gắt như đỏ neon hiện đại, mà có ánh trầm ấm từ khoáng vật chu sa và lá sen, củ nâu tự nhiên.',
    historicalStory: 'Trong phong thủy Á Đông, màu đỏ son mang năng lượng Dương thuần khiết, tượng trưng cho sinh sôi nảy nở, ánh mặt trời và lời chúc phúc viên mãn. Chính vì vậy, áo dài đỏ luôn là lựa chọn số một cho ngày trọng đại.',
    stylingInspiration: 'Khi chọn áo màu đỏ son, hãy kết hợp cùng phụ kiện kim loại vàng (gold) hoặc ngọc trai trắng để tạo sự cân bằng thị giác sang trọng, tránh phối cùng quá nhiều màu nóng cạnh tranh.',
    relatedOutfitId: 'ao-dai',
    relatedOutfitName: 'Áo Dài Đỏ Son',
    culturalTag: 'Hỷ Sự · Vượng Khí',
    badge: 'Nghệ Thuật Sắc Tộc'
  },
  {
    id: 'tip-nhat-binh-ngu-sac',
    category: 'outfit',
    categoryLabel: 'Cung Đình Triều Nguyễn',
    categoryColor: '#5E1B24',
    title: 'Dải Hoa Văn Ngũ Hành Trên Cổ Áo Nhật Bình',
    itemFocus: 'Cổ Áo Hình Chữ Nhật & Ngũ Sắc',
    era: 'Năm 1807 · Thời vua Gia Long định điển lễ',
    didYouKnow: 'Áo Nhật Bình có cổ áo dạng hình chữ nhật bản to buông thẳng xuống ngực. Trên viền cổ thêu các dải hoa văn ngũ sắc tượng trưng cho ngũ hành: Kim, Mộc, Thủy, Hỏa, Thổ.',
    historicalStory: 'Áo Nhật Bình là thường phục của Hoàng hậu, Công chúa và quý phi triều Nguyễn. Màu sắc của thân áo quy định phẩm cấp nghiêm ngặt: Hoàng hậu mặc áo màu vàng chính sắc hoặc cam, Công chúa mặc màu đỏ, Cung tần mặc màu tím hoặc xanh.',
    stylingInspiration: 'Nhật Bình cách tân hiện nay được các bạn trẻ diện rất đẹp như một chiếc áo khoác overcoat dáng dài thời thượng bên ngoài đầm lụa trơn hoặc quần ống rộng thanh lịch.',
    relatedOutfitId: 'ao-nhat-binh',
    relatedOutfitName: 'Áo Nhật Bình Hoàng Cung',
    culturalTag: 'Quyền Quý · Vũ Trụ Quan',
    badge: 'Vương Triều Tri thức'
  },
  {
    id: 'tip-guoc-moc-quai-nhung',
    category: 'accessory',
    categoryLabel: 'Nếp Sống Tràng An',
    categoryColor: '#6B5D52',
    title: 'Âm Thanh Lộc Cộc Của Chiếc Guốc Mộc',
    itemFocus: 'Guốc Gỗ & Quai Nhung',
    era: 'Thế kỷ 19 - đầu thế kỷ 20 tại Hà Nội và Huế',
    didYouKnow: 'Tiếng gõ lộc cộc của guốc mộc trên sân gạch hay phố cổ từng là "âm thanh nhận diện" của người Tràng An tao nhã, biểu đạt bước đi khoan thai, không bao giờ vội vã.',
    historicalStory: 'Guốc mộc được đẽo từ gỗ xoan hoặc gỗ mỡ nhẹ êm, quai guốc bọc vải nhung êm ái. Người xưa quan niệm người phụ nữ nết na có bước chân thanh nhẹ, tiếng guốc đều đặn thể hiện sự trầm tĩnh trong tính cách.',
    stylingInspiration: 'Guốc mộc quai nhung đỏ hoặc đen khi đi cùng áo dài tà suông hay áo bà ba mang lại một nét hoài niệm mộc mạc không một đôi giày cao gót phương Tây nào thay thế được.',
    relatedOutfitId: 'ao-ba-ba',
    relatedOutfitName: 'Áo Bà Ba Nam Bộ',
    relatedAccessoryName: 'Guốc mộc quai nhung',
    culturalTag: 'Khoan Thai · Cốt Cách Xưa',
    badge: 'Hồn Quê Dân Dã'
  },
  {
    id: 'tip-ao-tac-tay-thung',
    category: 'outfit',
    categoryLabel: 'Lễ Phục Quốc Dân',
    categoryColor: '#315643',
    title: 'Áo Tấc Và Phong Thái Chắp Tay Khiêm Cung',
    itemFocus: 'Ống Tay Thụng Rộng (Tay Tấc)',
    era: 'Lễ phục bình đẳng của mọi tầng lớp thời Nguyễn',
    didYouKnow: 'Áo tấc thực chất là áo ngũ thân nhưng có phần ống tay may thụng dài và rộng (khoảng 30-40cm). Khi buông tay, tà tay rủ xuống tạo dáng đứng trang nghiêm, uy nghi.',
    historicalStory: 'Đặc điểm thiêng liêng nhất của áo tấc là khi hai tay chắp trước ngực hình chữ "V" để vái chào tiền nhân, hai ống tay áo ghép lại thành một đường thẳng trang trọng, biểu thị lòng tôn kính và đức khiêm tốn tối thượng.',
    stylingInspiration: 'Áo tấc hiện nay là lựa chọn hàng đầu cho các bạn trẻ trong lễ tốt nghiệp đại học, chụp ảnh cưới hay các lễ hội đình làng vì phom áo vừa bề thế, vừa tôn vinh truyền thống hiếu kính.',
    relatedOutfitId: 'ao-tac',
    relatedOutfitName: 'Áo Tấc Tay Thụng',
    culturalTag: 'Khiêm Cung · Lễ Giáo',
    badge: 'Lễ Nghi Trang Trọng'
  },
  {
    id: 'tip-khan-ran-nam-bo',
    category: 'accessory',
    categoryLabel: 'Sông Nước Phương Nam',
    categoryColor: '#2B4A6F',
    title: 'Khăn Rằn & Tinh Thần Khai Phá Miền Đất Mới',
    itemFocus: 'Họa Tiết Ca-Rô Khăn Rằn',
    era: 'Thế kỷ 17 đến nay · Văn hóa sông nước Đồng bằng Sông Cửu Long',
    didYouKnow: 'Khăn rằn đen trắng hoặc đỏ trắng là minh chứng sống động cho tinh thần dung hòa văn hóa Việt - Khmer - Hoa trong quá trình khai phá vùng đất phương Nam trù phú.',
    historicalStory: 'Chiếc khăn đa năng của người Nam Bộ: quấn đầu che nắng, quàng cổ thấm mồ hôi, vắt vai tạo nét duyên khi chèo ghe, hay buộc ngang lưng khi lao động. Nó là biểu tượng của sự hào sảng, phóng khoáng và bền bỉ.',
    stylingInspiration: 'Biến tấu khăn rằn thành dải băng đô thắt tóc cá tính, hoặc quấn lệch cổ như khăn skinny scarf khi mặc áo bà ba cách tân hoặc áo thun trắng để tạo vẻ đẹp trẻ trung, gần gũi.',
    relatedOutfitId: 'ao-ba-ba',
    relatedOutfitName: 'Áo Bà Ba',
    relatedAccessoryName: 'Khăn rằn Nam Bộ',
    culturalTag: 'Hào Sảng · Phương Nam',
    badge: 'Hơi Thở Sông Nước'
  }
];
