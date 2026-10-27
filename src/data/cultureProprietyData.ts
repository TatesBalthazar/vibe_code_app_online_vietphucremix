import { OutfitId, OccasionId, StyleId, ColorId } from '../types';

export interface CultureProprietyNote {
  id: string;
  category: 'outfit' | 'occasion' | 'style' | 'color' | 'accessory';
  name: string;
  eraOrSource: string;
  badge: string;
  badgeType: 'strict' | 'ceremonial' | 'folk' | 'remix' | 'harmony';
  integrityScore: number; // 0 - 100%
  symbolicMeaning: string;
  coreStandard: string; // Chuẩn mực cốt lõi không được làm sai
  proprietyRules: string[]; // Các quy chuẩn mực thước
  dos: string[]; // Khi nào và nên mặc ra sao
  donts: string[]; // Điều kiêng kỵ / cần tránh để không lệch chuẩn
  safeRemixGuide: string; // Lời khuyên cách tân văn minh
}

export const OUTFIT_CULTURE_NOTES: Record<OutfitId, CultureProprietyNote> = {
  'ao-dai': {
    id: 'ao-dai',
    category: 'outfit',
    name: 'Áo Dài Truyền Thống',
    eraOrSource: 'Tiến hóa từ áo ngũ thân (Thế kỷ 18 đến nay)',
    badge: 'Quốc Phục Dân Tộc',
    badgeType: 'ceremonial',
    integrityScore: 98,
    symbolicMeaning: 'Biểu tượng của nét đẹp đoan trang, kín đáo mà tha thướt của người Việt; tôn vinh cốt cách tao nhã, nhu mì và thanh tao.',
    coreStandard: 'Hai tà áo trước sau buông rủ cân đối qua gối; cổ áo ôm vừa vặn khép kín; eo ôm nhẹ tạo độ thắt duyên dáng nhưng không bó thít phản cảm.',
    proprietyRules: [
      'Tà áo buông rủ thẳng thớm, độ dài lý tưởng từ bắp chân đến mắt cá chân.',
      'Cổ áo lập lĩnh hoặc cổ thuyền cách điệu nhẹ nhàng; nẹp tà may tinh tế giấu đường chỉ.',
      'Mặc cùng quần lụa ống suông rộng (trắng, đen hoặc đồng màu tà).'
    ],
    dos: [
      'Phù hợp mọi không gian trang trọng: Lễ tết, cưới hỏi, trường học, lễ hội truyền thống và sự kiện quốc tế.',
      'Phối cùng khăn đóng, kiềng bạc hoặc chuỗi ngọc trai để tăng vẻ quý phái.'
    ],
    donts: [
      'Không may tà áo quá ngắn cũn cỡn hoặc xẻ hông quá cao để lộ da thịt vùng bụng/eo.',
      'Tuyệt đối tránh mặc cùng quần cộc, váy đụp ngắn hoặc chất liệu mỏng tang nhìn thấu nội y.'
    ],
    safeRemixGuide: 'Có thể sáng tạo chất liệu linen, tơ tằm dệt tay hoặc họa tiết tranh dân gian Đông Hồ / Hàng Trống, kết hợp tay bồng nhẹ mà vẫn giữ hai tà áo buông tha thướt.'
  },
  'ao-tu-than': {
    id: 'ao-tu-than',
    category: 'outfit',
    name: 'Áo Tứ Thân Kinh Bắc',
    eraOrSource: 'Thế kỷ 12 - 20 (Cái nôi văn hóa Bắc Bộ)',
    badge: 'Di Sản Dân Gian Kinh Bắc',
    badgeType: 'folk',
    integrityScore: 96,
    symbolicMeaning: 'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ chồng/vợ); vạt yếm đào bên trong tượng trưng cho lòng mẹ chở che.',
    coreStandard: 'Phía sau gồm hai vạt áo khâu ghép lại thành đường sống lưng (đường trung phùng); phía trước hai vạt rời buông dài buộc mối eo duyên dáng; bên trong mặc yếm cổ xây/cổ nhạn.',
    proprietyRules: [
      'Áo không cài cúc phía trước mà mặc mở vạt để lộ yếm lụa đào và thắt lưng lụa ngũ sắc.',
      'Hai vạt trước buộc thắt nút nhẹ nhàng trước bụng, buông rủ ngang đùi.',
      'Mặc cùng váy lụa đen chấm gót mềm mại và thắt lưng vải bay bổng.'
    ],
    dos: [
      'Rất chuẩn mực khi đi hội Lim, lễ hội mùa xuân, diễn xướng quan họ, chụp ảnh không gian làng quê cổ.',
      'Phối cùng nón quai thao (nón ba tầm) và khăn mỏ quạ quấn tóc.'
    ],
    donts: [
      'Không bỏ quên áo yếm bên trong mà mặc trực tiếp áo tứ thân gây hở hang.',
      'Không thắt nút quá lỏng lẻo xộc xệch làm mất phong thái dịu dàng của thiếu nữ quan họ.'
    ],
    safeRemixGuide: 'Có thể phối yếm lụa gam màu pastel hiện đại, kết hợp áo khoác tứ thân chất liệu organza mờ ảo dạo phố nghệ thuật.'
  },
  'ao-ngu-than': {
    id: 'ao-ngu-than',
    category: 'outfit',
    name: 'Áo Ngũ Thân Lập Lĩnh',
    eraOrSource: 'Thời Nguyễn (Chúa Nguyễn Phúc Khoát 1744 & Vua Minh Mạng 1837)',
    badge: 'Chuẩn Mực Nho Giáo 100%',
    badgeType: 'strict',
    integrityScore: 100,
    symbolicMeaning: 'Năm thân áo tượng trưng cho Tứ thân phụ mẫu bao bọc lấy một thân con (người mặc); 5 hạt cúc đồng đại diện cho Ngũ Thường: Nhân, Lễ, Nghĩa, Trí, Tín.',
    coreStandard: 'Cổ áo lập lĩnh (cổ đứng) vuông vức, may viền lót trắng nghiêm cẩn; thân áo ghép từ 5 mảnh lụa; nẹp áo cài 5 cúc bên phải.',
    proprietyRules: [
      'Cổ áo cài kín đáo hoàn toàn, nẹp cổ lót trắng ôm khít chân cổ người mặc.',
      'Đường chỉ sống lưng Trung Phùng thẳng tắp chính giữa tượng trưng cho sự chính trực, quang minh chính đại.',
      'Phái nam mặc cùng quần thụng trắng và quấn khăn đóng gọn gàng.'
    ],
    dos: [
      'Lễ nghi dòng họ, cúng giỗ gia tiên, đại lễ triều đình/quốc gia, tốt nghiệp đại học, hội nghị văn hóa.',
      'Tạo phong thái đĩnh đạc, nho nhã và uyên bác của bậc trí thức quân tử.'
    ],
    donts: [
      'Không cởi phanh cúc cổ áo làm mất đi tính trang nghiêm của đạo lý lập lĩnh.',
      'Tránh may tay áo quá chật căng cứng làm mất độ thụng tự nhiên của tà áo.'
    ],
    safeRemixGuide: 'Ứng dụng chất liệu đũi thô, lanh tự nhiên với bảng màu kem ngà, xanh lam chàm nhẹ nhàng phối cùng giày tây hoặc sandal da thủ công tối giản.'
  },
  'ao-ba-ba': {
    id: 'ao-ba-ba',
    category: 'outfit',
    name: 'Áo Bà Ba Nam Bộ',
    eraOrSource: 'Đầu thế kỷ 19 (Vùng đồng bằng sông Cửu Long)',
    badge: 'Dân Dã Phóng Khoáng',
    badgeType: 'folk',
    integrityScore: 94,
    symbolicMeaning: 'Biểu tượng của vẻ đẹp mộc mạc, chân chất, phóng khoáng và đảm đang của người dân phương Nam hào sảng.',
    coreStandard: 'Thân áo xẻ tà hai bên hông tạo sự thoải mái khi di chuyển; cổ tròn hoặc cổ tim nhẹ; hàng cúc cài chính giữa; hai túi đắp tiện dụng ở hai vạt trước.',
    proprietyRules: [
      'Tà áo lượn cong nhẹ nhàng ôm nhẹ thân trên, không quá dài làm vướng víu.',
      'Hàng cúc cài ngay ngắn từ cổ xuống vạt dưới; túi đắp vuông vức.',
      'Mặc cùng quần lụa đen ống suông rộng mộc mạc.'
    ],
    dos: [
      'Dạo chơi miền sông nước, hội chợ quê, không gian miệt vườn, họp mặt bạn bè ấm cúng.',
      'Phối cùng khăn rằn Nam Bộ và nón lá chằm.'
    ],
    donts: [
      'Không may cổ áo khoét quá sâu hoặc khoét nách hở sườn làm mất vẻ thuần hậu.',
      'Tránh chọn chất liệu bóng nhẫy sặc sỡ kim sa phản cảm.'
    ],
    safeRemixGuide: 'Thiết kế bằng lụa satin mờ đơn sắc, kết hợp quần lụa ống đứng đương đại tạo nên outfit dạo phố thanh lịch và duyên dáng.'
  },
  'ao-nhat-binh': {
    id: 'ao-nhat-binh',
    category: 'outfit',
    name: 'Áo Nhật Bình Cung Đình',
    eraOrSource: 'Triều Nguyễn (1802–1945) - Y phục Hậu phi & Mệnh phụ',
    badge: 'Nghi Lễ Cung Đình Cao Quý',
    badgeType: 'strict',
    integrityScore: 99,
    symbolicMeaning: 'Cổ áo hình chữ nhật bản lớn (Nhật Bình) thêu hoa văn loan phượng, cúc vạn thọ; dải ngũ sắc nơi cổ tay tượng trưng cho Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) và phẩm trật hoàng gia.',
    coreStandard: 'Cổ áo đối khâm vuông vức thêu kim tuyến tinh xảo; hai vạt áo khép song song cài bằng chuỗi ngọc hoặc kim hoàn; cổ tay viền 5 dải màu ngũ sắc chuẩn mực.',
    proprietyRules: [
      'Phải mặc áo lót lập lĩnh lụa trắng hoặc ngũ thân bên trong trước khi khoác Nhật Bình.',
      'Dải ngũ sắc nơi cửa tay phải sắp xếp đúng thứ tự ngũ hành truyền thống.',
      'Đội khăn vành dây quấn nhiều vòng màu xanh hoặc màu vàng hoàng triều.'
    ],
    dos: [
      'Lễ đại hôn (cưới hỏi long trọng), tái hiện nghi lễ cung đình, triển lãm di sản văn hóa đỉnh cao.',
      'Tôn vinh khí chất quý tộc, quyền uy và sang trọng tột bậc.'
    ],
    donts: [
      'Tuyệt đối không mặc trần trực tiếp mà không có áo lót bên trong.',
      'Không tự ý đảo lộn thứ tự dải màu ngũ sắc hoặc thêu hình rồng 5 móng (vốn chỉ dành cho Hoàng đế).'
    ],
    safeRemixGuide: 'Lấy cảm hứng từ họa tiết thêu viền Nhật Bình đưa lên áo khoác cardigan dệt kim hoặc blazer hiện đại mang dấu ấn cung đình thanh nhã.'
  },
  'ao-tac': {
    id: 'ao-tac',
    category: 'outfit',
    name: 'Áo Tấc Ngũ Thân Tay Thụng',
    eraOrSource: 'Triều Nguyễn (Lễ phục truyền thống của mọi tầng lớp)',
    badge: 'Đại Lễ Phục Trang Nghiêm',
    badgeType: 'strict',
    integrityScore: 100,
    symbolicMeaning: 'Tay áo thụng dài rộng buông rủ bề thế thể hiện tâm thế điềm tĩnh, khiêm cung, hạ mình trước tổ tiên trời đất và kính cẩn trong giao tế.',
    coreStandard: 'Thuộc hệ ngũ thân lập lĩnh nhưng đôi tay áo may rộng thụng (rộng từ 30-40cm), buông dài quá bàn tay một tấc khi buông thõng.',
    proprietyRules: [
      'Khi hành lễ, người mặc chắp hai tay trước ngực để hai tà tay thụng rủ xuống trang nghiêm.',
      'Thân áo dài quá gối, vạt áo buông thẳng; cổ áo lập lĩnh cài 5 cúc.',
      'Phối cùng khăn đóng chữ Nhất hoặc khăn quấn chỉnh tề.'
    ],
    dos: [
      'Dâng hương miếu mạo, đại lễ giỗ tổ tiên, cưới hỏi rước dâu, tế tự đình làng trang trọng.',
      'Dành cho cả nam và nữ muốn thể hiện sự tôn kính tột bậc với tiền nhân.'
    ],
    donts: [
      'Không xắn ngược tay thụng lên vai cẩu thả trong lúc đang làm lễ.',
      'Tránh chọn màu sắc quá nhợt nhạt hoặc vải pha nilon nhăn nhúm.'
    ],
    safeRemixGuide: 'Sử dụng lụa tơ tằm dệt hoa văn chìm (gấm Vân / gấm Thượng Uyển) tạo nét sang trọng uy nghiêm cổ điển.'
  },
  'ao-tay-chen': {
    id: 'ao-tay-chen',
    category: 'outfit',
    name: 'Áo Tay Chẽn Ngũ Thân',
    eraOrSource: 'Thời Nguyễn (Thường phục trang nhã thế kỷ 19)',
    badge: 'Trí Thức Tao Nhã',
    badgeType: 'ceremonial',
    integrityScore: 97,
    symbolicMeaning: 'Ống tay áo ôm thon gọn vào cổ tay thuận tiện làm việc, đọc sách, viết thư pháp nhưng vẫn giữ trọn lễ nghi phong nhã của bậc sĩ phu.',
    coreStandard: 'Phom dáng ngũ thân lập lĩnh cổ điển, nhưng ống tay áo được thu nhỏ chẽn sát cổ tay.',
    proprietyRules: [
      'Ống tay vừa vặn với cánh tay, không lụng thụng cũng không bó sát cơ bắp.',
      'Nẹp áo 5 cúc đồng cài kín đáo bên phải; tà áo dài ngang bắp chân.'
    ],
    dos: [
      'Đi làm công sở, hội thảo văn hóa, giảng dạy, dạo phố, chụp ảnh thanh lịch.',
      'Cực kỳ phù hợp cho người trẻ muốn mặc cổ phục đi lại thuận tiện hàng ngày.'
    ],
    donts: [
      'Không may ống tay quá chật làm rách đường chỉ khi co gập khuỷu tay.',
      'Tránh phối cùng quần jeans rách gối làm lệch lạc phong thái nho nhã.'
    ],
    safeRemixGuide: 'Phối màu đơn sắc tối giản (monochrome) với quần vải âu ống suông và giày da oxford lịch lãm.'
  },
  'giao-linh': {
    id: 'giao-linh',
    category: 'outfit',
    name: 'Áo Giao Lĩnh (Trực Lĩnh Cổ Chéo)',
    eraOrSource: 'Thời Lý - Trần - Lê (Thế kỷ 11 - 18)',
    badge: 'Hào Khí Thăng Long Cổ Xưa',
    badgeType: 'ceremonial',
    integrityScore: 98,
    symbolicMeaning: 'Cổ áo vắt chéo chữ V tượng trưng cho sự giao hòa giữa âm dương, trời đất; khí chất tự tại, khoáng đạt của thời kỳ hào khí Đông A.',
    coreStandard: 'Cổ áo đắp chéo từ trái sang phải, buộc bằng dải lụa bên sườn phải; nẹp cổ áo thẳng dày dặn; vạt áo rộng buông rủ.',
    proprietyRules: [
      'Luôn vắt vạt áo bên trái đè lên vạt bên phải (tả nhậm/hữu nhậm theo chuẩn Hán Việt chính thống).',
      'Phía trong mặc áo lót cổ tròn hoặc cổ chéo màu trắng tương phản.'
    ],
    dos: [
      'Lễ hội di sản Thăng Long, chụp ảnh cổ phong hoàng gia, biểu diễn nghệ thuật cổ truyền.',
      'Tạo nên diện mạo tiên phong, thoát tục và khí phách quân tử.'
    ],
    donts: [
      'Tuyệt đối không vắt ngược vạt phải đè lên vạt trái (theo quan niệm cổ xưa đó là y phục của người đã khuất).',
      'Tránh buộc dải eo quá xiết chặt gây biến dạng độ rủ tự nhiên của tà áo.'
    ],
    safeRemixGuide: 'Cách tân thành áo khoác ngoài vạt chéo buông tự do (haori phong cách Việt) trên nền chất liệu dạ ép hoặc lụa đũi dệt thô.'
  },
  'vien-linh': {
    id: 'vien-linh',
    category: 'outfit',
    name: 'Áo Viên Lĩnh (Đoàn Lĩnh Cổ Tròn)',
    eraOrSource: 'Thời Lý - Trần - Lê - Nguyễn (Quan phục & Thường triều)',
    badge: 'Phẩm Cấp Uy Quyền',
    badgeType: 'strict',
    integrityScore: 99,
    symbolicMeaning: 'Cổ áo tròn khép kín ôm quanh chân cổ tượng trưng cho vòm trời (trời tròn đất vuông), thể hiện sự uy nghiêm, khuôn phép và cương trực của quan viên.',
    coreStandard: 'Cổ tròn khoét sát chân cổ cài cúc ở vai phải; thân áo rộng rãi; trước ngực thường đính bổ tử (tấm thêu chim muông hoặc thú biểu thị phẩm cấp).',
    proprietyRules: [
      'Cổ áo tròn phải khép khít sát cổ, không để hở lệch cổ áo.',
      'Hoa văn thêu trước ngực phải mang ý nghĩa cát tường, thanh liêm.'
    ],
    dos: [
      'Nghi lễ ngoại giao, tái hiện triều đình lịch sử, chụp ảnh phong cách vương triều bề thế.'
    ],
    donts: [
      'Tránh đính bổ tử tùy tiện không theo thứ tự phẩm hàm nếu tái hiện trang phục lịch sử nghiêm túc.'
    ],
    safeRemixGuide: 'Tối giản bỏ bớt bổ tử cầu kỳ, giữ lại đường nét cổ tròn ôm khít hiện đại như một chiếc áo tunic đương đại cao cấp.'
  },
  'doi-kham': {
    id: 'doi-kham',
    category: 'outfit',
    name: 'Áo Đối Khâm',
    eraOrSource: 'Thời Lý - Trần - Hậu Lê (Y phục hoàng thất & quý tộc)',
    badge: 'Khoáng Đạt Phong Lưu',
    badgeType: 'folk',
    integrityScore: 97,
    symbolicMeaning: 'Hai vạt áo mở song song buông thẳng đối xứng thể hiện tính cách ngay thẳng, cởi mở, phong lưu và hào sảng.',
    coreStandard: 'Hai nẹp cổ áo chạy song song từ cổ xuống gấu áo mà không chồng lên nhau; mặc buông mở hoặc thắt bằng dải dây buộc hờ.',
    proprietyRules: [
      'Bắt buộc mặc lót yếm đào hoặc áo giao lĩnh lụa trắng phía trong để tạo hiệu ứng tầng lớp (layering) tao nhã.',
      'Độ dài vạt ngoài thường bằng hoặc ngắn hơn áo lót một chút.'
    ],
    dos: [
      'Khoác ngoài trong các dịp lễ hội hoa xuân, dạ tiệc di sản, chụp ảnh nghệ thuật nhiều tầng lớp.',
      'Phù hợp cả nam lẫn nữ thích phong cách lãng tử tao nhã.'
    ],
    donts: [
      'Không mặc khoác phong phanh lộ nội y hiện đại bên trong.'
    ],
    safeRemixGuide: 'Ứng dụng làm áo choàng kimono cardigan phong cách Việt phối cùng quần linen và áo yếm cách tân dạo phố thanh thoát.'
  }
};

export const OCCASION_CULTURE_NOTES: Record<OccasionId, CultureProprietyNote> = {
  festival: {
    id: 'festival',
    category: 'occasion',
    name: 'Lễ Hội & Tết Cổ Truyền',
    eraOrSource: 'Phong tục nghìn năm của dân tộc Việt',
    badge: 'Tươi Vui & Cát Tường',
    badgeType: 'ceremonial',
    integrityScore: 98,
    symbolicMeaning: 'Khởi đầu năm mới và hội làng thiêng liêng, cầu chúc may mắn, thịnh vượng, sum vầy và tỏ lòng tri ân nguồn cội.',
    coreStandard: 'Ưu tiên sắc màu may mắn (đỏ, vàng, hồng sen), kiểu dáng trang nhã, đoan chính và vui tươi.',
    proprietyRules: [
      'Trang phục kín đáo khi vào đình, đền, chùa thắp hương đầu năm.',
      'Trang phục cần sạch sẽ, là lượt phẳng phiu thể hiện sự tôn trọng không gian thiêng liêng.'
    ],
    dos: [
      'Mặc Áo Dài, Áo Tấc, Áo Tứ Thân phối khăn đóng hoặc kiềng bạc đi chúc tết và trẩy hội.'
    ],
    donts: [
      'Tránh mặc cả cây đen ảm đạm hoặc trang phục xẻ tà quá trễ nải khi vào nơi cửa Phật.'
    ],
    safeRemixGuide: 'Phối màu đỏ rượu hoặc vàng hoàng gia với phụ kiện kiềng bạc sáng rực rỡ để mang lại sinh khí đầu xuân.'
  },
  wedding: {
    id: 'wedding',
    category: 'occasion',
    name: 'Đám Cưới Truyền Thống',
    eraOrSource: 'Nghi thức Hôn phối Đại lễ',
    badge: 'Gia Đình & Trang Trọng',
    badgeType: 'strict',
    integrityScore: 100,
    symbolicMeaning: 'Minh chứng cho sự gắn kết lứa đôi trước bàn thờ gia tiên và hai họ, đề cao sự chung thủy và gia phong mực thước.',
    coreStandard: 'Nghi lễ gia tiên bắt buộc mặc cổ phục chuẩn mực (Áo Nhật Bình cho cô dâu, Áo Tấc hoặc Áo Ngũ Thân cho chú rể).',
    proprietyRules: [
      'Trang phục phải nguyên vẹn, đầy đủ phụ kiện mũ khăn, không được cẩu thả thiếu sót.',
      'Khách mời nên chọn màu sắc nhã nhặn, tránh lấn át màu áo đại lễ của cô dâu chú rể.'
    ],
    dos: [
      'Cô dâu diện Áo Nhật Bình đỏ/hồng hoặc Áo Dài thêu hoa sen lộng lẫy; chú rể diện Áo Tấc xanh lam hoặc kem ngà.'
    ],
    donts: [
      'Không mặc trang phục hở ngực, hở eo trong lúc làm lễ gia tiên trước bàn thờ họ hàng.'
    ],
    safeRemixGuide: 'Tân thời hóa bằng cách thêu tên hai vợ chồng bằng chữ Hán/Nôm hoặc lồng ghép họa tiết đôi chim phượng hoàng tinh xảo.'
  },
  'cultural-event': {
    id: 'cultural-event',
    category: 'occasion',
    name: 'Sự Kiện Văn Hóa & Ngoại Giao',
    eraOrSource: 'Giao lưu văn hóa quốc tế & hội nghị',
    badge: 'Bản Sắc & Vị Thế Quốc Gia',
    badgeType: 'ceremonial',
    integrityScore: 99,
    symbolicMeaning: 'Khẳng định lòng tự hào dân tộc, truyền tải thông điệp hòa bình và chiều sâu lịch sử văn hiến nghìn năm của nước Việt.',
    coreStandard: 'Tính chuẩn xác lịch sử cao, chất liệu lụa tơ tằm dệt tay cao cấp, phom dáng đứng đắn mực thước.',
    proprietyRules: [
      'Đại diện cho hình ảnh quốc gia nên ưu tiên cổ phục nguyên bản hoặc cách tân có nghiên cứu bài bản.',
      'Phom dáng phải chuẩn mực từng đường kim mũi chỉ, không lai tạp chi tiết của trang phục nước khác.'
    ],
    dos: [
      'Diện Áo Dài truyền thống, Áo Tấc hoặc Ngũ Thân Lập Lĩnh với phong thái tự tin, đoan trang.'
    ],
    donts: [
      'Tránh chọn các thiết kế cách tân kỳ quái gây hiểu lầm về trang phục truyền thống Việt Nam.'
    ],
    safeRemixGuide: 'Đưa chất liệu thổ cẩm Tây Bắc hoặc lụa Vạn Phúc vào làm điểm nhấn viền cổ áo và tay áo.'
  },
  school: {
    id: 'school',
    category: 'occasion',
    name: 'Đi Học & Giảng Đường / Công Sở',
    eraOrSource: 'Môi trường giáo dục & trí thức',
    badge: 'Thanh Lịch & Chuẩn Mực',
    badgeType: 'ceremonial',
    integrityScore: 95,
    symbolicMeaning: 'Tôn vinh tinh thần hiếu học, sự khiêm tốn, nét thanh xuân trong sáng của thế hệ trẻ.',
    coreStandard: 'Gọn gàng, kín đáo, thuận tiện ghi chép và đi lại, màu sắc thanh nhã (trắng, kem, xanh pastel).',
    proprietyRules: [
      'Cổ áo không quá trễ, tà áo có độ dài vừa phải để không bị vướng vào bánh xe khi di chuyển.',
      'Chất liệu thấm hút mồ hôi tốt, nhẹ nhàng thoáng mát.'
    ],
    dos: [
      'Áo Dài trắng nữ sinh tinh khôi, Áo Ngũ Thân tay chẽn tối giản cho nam sinh/giảng viên.'
    ],
    donts: [
      'Tránh các loại vải quá mỏng nhìn rõ nội y hoặc đính kết hạt cườm lấp lánh phản quang rối mắt.'
    ],
    safeRemixGuide: 'Áo dài cổ tròn cách điệu nhẹ kèm tay lỡ thoải mái, phối với giày búp bê hoặc sandal bệt năng động.'
  },
  casual: {
    id: 'casual',
    category: 'occasion',
    name: 'Dạo Phố & Đời Thường',
    eraOrSource: 'Nhịp sống đương đại Gen Z',
    badge: 'Thoải Mái & Đầy Cá Tính',
    badgeType: 'remix',
    integrityScore: 90,
    symbolicMeaning: 'Đưa di sản vào hơi thở đời thường, giúp cổ phục sống động trong từng góc phố, quán cà phê và cuộc trò chuyện của người trẻ.',
    coreStandard: 'Tự do sáng tạo phom dáng rộng rãi, tiện dụng, phối hợp linh hoạt cùng phụ kiện hiện đại.',
    proprietyRules: [
      'Giữ nét nhận diện đặc trưng (cổ áo, vạt áo, hàng cúc) để không bị nhầm lẫn với âu phục thông thường.',
      'Tôn trọng tinh thần lịch sự nơi công cộng.'
    ],
    dos: [
      'Áo Bà Ba lụa mộc, Áo Đối Khâm khoác ngoài, Áo Dài dáng suông rộng rãi thoải mái.'
    ],
    donts: [
      'Không biến tấu quá đà thành trang phục cosplay hở hang mất thẩm mỹ.'
    ],
    safeRemixGuide: 'Phối Áo Bà Ba hoặc Áo Ngũ Thân dáng ngắn cùng quần âu ống rộng, đeo túi tote vải canvas và đi giày sneaker trắng năng động.'
  },
  photoshoot: {
    id: 'photoshoot',
    category: 'occasion',
    name: 'Chụp Ảnh Lookbook & Nghệ Thuật',
    eraOrSource: 'Nghệ thuật nhiếp ảnh thời trang',
    badge: 'Sáng Tạo Thị Giác',
    badgeType: 'remix',
    integrityScore: 92,
    symbolicMeaning: 'Tôn vinh góc nhìn mỹ thuật đương đại về di sản, kết hợp giữa ánh sáng điện ảnh và phom dáng cổ truyền.',
    coreStandard: 'Đạt hiệu ứng thẩm mỹ thị giác cao, hòa quyện ánh sáng, bối cảnh và chất liệu vải phong phú.',
    proprietyRules: [
      'Hiểu rõ bối cảnh chụp (kiến trúc cố đô, làng cổ, studio tối giản) để chọn trang phục hài hòa.',
      'Tạo dáng tôn nghiêm, thanh thoát, tránh những tư thế khêu gợi phản cảm làm hoen ố cổ phục.'
    ],
    dos: [
      'Thử nghiệm ánh sáng cinematic, phối khăn đóng, nón quai thao hoặc chuỗi ngọc trai làm điểm nhấn thị giác.'
    ],
    donts: [
      'Không lạm dụng phụ kiện lai căng của các nền văn hóa khác khi chủ đề là trang phục Việt.'
    ],
    safeRemixGuide: 'Tạo concept tương phản giữa phom áo cổ truyền mực thước và không gian kiến trúc brutalism hoặc gallery tối giản hiện đại.'
  }
};

export const STYLE_CULTURE_NOTES: Record<StyleId, CultureProprietyNote> = {
  traditional: {
    id: 'traditional',
    category: 'style',
    name: 'Cổ Điển Mực Thước',
    eraOrSource: 'Bảo tồn nguyên bản di sản',
    badge: 'Bảo Tồn Chuẩn 100%',
    badgeType: 'strict',
    integrityScore: 100,
    symbolicMeaning: 'Gìn giữ từng đường kim mũi chỉ, cấu trúc xương sống của di sản theo đúng sử liệu và hiện vật phục dựng bảo tàng.',
    coreStandard: 'Tuyệt đối tôn trọng tỉ lệ phom dáng gốc: đường trung phùng, cổ lập lĩnh viền trắng, hàng cúc ngũ thường, vải lụa tơ tằm dệt thủ công.',
    proprietyRules: ['Không thay đổi cấu trúc cắt rập', 'Giữ nguyên kỹ thuật khâu tay giấu chỉ'],
    dos: ['Dùng trong nghi lễ thiêng liêng, đại tiệc truyền thống và nghiên cứu di sản.'],
    donts: ['Tránh thêm thắt các chi tiết khóa kéo kim loại hiện đại lộ liễu.'],
    safeRemixGuide: 'Tập trung vào chất lượng dệt của sợi tơ tằm nguyên bản thay vì biến đổi phom dáng.'
  },
  modern: {
    id: 'modern',
    category: 'style',
    name: 'Cách Tân Hiện Đại',
    eraOrSource: 'Giao thoa thế kỷ 21',
    badge: 'Hơi Thở Đương Đại',
    badgeType: 'remix',
    integrityScore: 92,
    symbolicMeaning: 'Hòa nhịp cùng phong cách sống mới của thế hệ trẻ năng động, giúp trang phục Việt tiếp tục sống một đời sống mới rực rỡ.',
    coreStandard: 'Giữ lại tối thiểu 70% linh hồn nhận diện cổ truyền (cổ áo hoặc vạt áo hoặc cách phối màu), chỉ tinh chỉnh độ dài tà hoặc độ rộng ống tay.',
    proprietyRules: ['Ranh giới cách tân không được vượt qua chuẩn mực đạo đức và văn hóa dân tộc.'],
    dos: ['Ứng dụng mặc hàng ngày, sự kiện tiệc tùng trẻ trung, dạo phố.'],
    donts: ['Tránh cắt xẻ hở hang, mặc váy siêu ngắn hoặc phom dáng quái dị.'],
    safeRemixGuide: 'Tối ưu độ dài vạt áo ngang bắp chân để dễ bước lên xe và di chuyển trong đô thị.'
  },
  minimal: {
    id: 'minimal',
    category: 'style',
    name: 'Tối Giản Tinh Tế',
    eraOrSource: 'Triết lý Wabi-sabi & Thiền tông Á Đông',
    badge: 'Mộc Mạc & Thuần Khiết',
    badgeType: 'harmony',
    integrityScore: 96,
    symbolicMeaning: 'Lược bỏ mọi chi tiết rườm rà phô trương, quay về với bản chất mộc mạc của thớ vải lụa dệt tay và vẻ đẹp tự nhiên của người mặc.',
    coreStandard: 'Đường may phẳng phiu, giấu chỉ hoàn toàn, không đính đá kim sa, sử dụng bảng màu tự nhiên của lụa mộc, kem ngà, chàm.',
    proprietyRules: ['Đề cao chất liệu tự nhiên: lụa tơ tằm, đũi tơ tằm, vải gai, lanh dệt tay.'],
    dos: ['Dành cho người yêu thích sự tĩnh lặng, tao nhã, tinh tế và văn minh.'],
    donts: ['Tránh phối quá nhiều phụ kiện lòe loẹt làm phá vỡ không gian tĩnh tại.'],
    safeRemixGuide: 'Kết hợp cùng kiềng bạc nguyên khối trơn không chạm khắc để tôn nét đẹp hình khối thuần túy.'
  },
  elegant: {
    id: 'elegant',
    category: 'style',
    name: 'Thanh Lịch Quý Tộc',
    eraOrSource: 'Phong cách quyền quý cung đình & trí thức',
    badge: 'Đài Các & Sang Trọng',
    badgeType: 'ceremonial',
    integrityScore: 98,
    symbolicMeaning: 'Thể hiện phong thái thanh cao, quý phái của bậc mệnh phụ phu nhân và tao nhân mặc khách chốn kinh thành.',
    coreStandard: 'Đường cắt may sắc sảo, chất liệu gấm lụa thượng uyển gấm hoa chìm cao cấp, kết hợp trang sức ngọc ngà chuẩn mực.',
    proprietyRules: ['Tà áo thẳng tắp, phụ kiện kiềng bạc hoặc chuỗi ngọc nằm ngay ngắn trang nhã.'],
    dos: ['Dạ tiệc ngoại giao, lễ cưới thượng lưu, sự kiện tôn vinh di sản.'],
    donts: ['Tránh các chi tiết cắt xẻ lố lăng làm mất đi cốt cách đài các.'],
    safeRemixGuide: 'Phối màu đơn sắc quý tộc như đỏ rượu, vàng mật hoặc xanh ngọc cùng chuỗi ngọc trai tự nhiên.'
  },
  romantic: {
    id: 'romantic',
    category: 'style',
    name: 'Lãng Mạn Bay Bổng',
    eraOrSource: 'Cảm hứng thơ ca lãng mạn phương Đông',
    badge: 'Thơ Mộng & Duyên Dáng',
    badgeType: 'remix',
    integrityScore: 93,
    symbolicMeaning: 'Tôn vinh nét dịu dàng, e ấp như hoa sen đầu hạ của người con gái Việt qua những lớp tà áo mềm như mây.',
    coreStandard: 'Sử dụng chất liệu bay bổng (voan tơ tằm, tơ sen, organza lụa), tạo hiệu ứng nhiều tầng mờ ảo nhẹ tênh khi có gió thoảng.',
    proprietyRules: ['Các lớp lụa phải có lớp lót kín đáo, tạo độ bay bổng mà không lộ liễu.'],
    dos: ['Chụp ảnh nghệ thuật, lễ cưới lãng mạn ngoài trời, dạ tiệc thanh tao.'],
    donts: ['Tránh dùng vải nilon giả voan tích điện dính sát vào cơ thể mất thẩm mỹ.'],
    safeRemixGuide: 'Phối dải thắt lưng lụa đào mềm mại rủ nhẹ bên hông theo từng bước chân.'
  },
  street: {
    id: 'street',
    category: 'style',
    name: 'Đường Phố Đương Đại',
    eraOrSource: 'Văn hóa Urban Streetwear Gen Z',
    badge: 'Táo Bạo & Phá Cách Văn Minh',
    badgeType: 'remix',
    integrityScore: 88,
    symbolicMeaning: 'Tuyên ngôn cá tính độc đáo của người trẻ Việt: tự hào về gốc gác dân tộc trên sàn diễn thời trang đường phố toàn cầu.',
    coreStandard: 'Khoác áo cổ phục (Áo Đối Khâm, Áo Tấc ngắn) bên ngoài trang phục thường nhật, tạo sự tương phản mạnh mẽ giữa cổ điển và hiện đại.',
    proprietyRules: ['Trang phục nền bên trong phải lịch sự, không được nhếch nhác làm rẻ rúng áo cổ phục khoác ngoài.'],
    dos: ['Phối cùng sneaker tối giản, kính râm gọng cổ điển, túi đeo chéo cá tính.'],
    donts: ['Tránh viết vẽ bậy hoặc in logo phản cảm lên tà áo cổ truyền.'],
    safeRemixGuide: 'Chọn áo khoác Đối Khâm ngắn chất liệu denim hoặc vải đũi nhuộm chàm phối cùng áo thun trắng trơn và sneaker.'
  }
};

export const COLOR_CULTURE_NOTES: Record<ColorId, CultureProprietyNote> = {
  burgundy: {
    id: 'burgundy',
    category: 'color',
    name: 'Đỏ Rượu Quý Phái',
    eraOrSource: 'Màu đỏ sẫm cung đình truyền thống',
    badge: 'Sang Trọng & Hỷ Khí',
    badgeType: 'ceremonial',
    integrityScore: 99,
    symbolicMeaning: 'Tượng trưng cho may mắn viên mãn, hỷ sự trọn vẹn, quyền quý nhưng trầm ổn và sâu lắng, không chói gắt.',
    coreStandard: 'Màu nhuộm tự nhiên từ cánh kiến hoặc rễ thảo mộc, tạo độ bóng chìm trên thớ vải tơ tằm.',
    proprietyRules: ['Rất thích hợp cho cô dâu, mẹ chú rể hoặc bậc chủ hôn trong gia đình.'],
    dos: ['Lễ cưới hỏi, đón giao thừa Tết, tiệc tối hoàng gia.'],
    donts: ['Tránh đi đám tang hoặc nơi cần sự khiêm nhường u buồn.'],
    safeRemixGuide: 'Phối cùng phụ kiện kiềng bạc ánh trăng để cân bằng tông màu ấm nồng.'
  },
  red: {
    id: 'red',
    category: 'color',
    name: 'Đỏ Tươi May Mắn',
    eraOrSource: 'Sắc đỏ son / Đỏ điều truyền thống',
    badge: 'May Mắn & Hạnh Phúc',
    badgeType: 'ceremonial',
    integrityScore: 98,
    symbolicMeaning: 'Tượng trưng cho sinh khí, nhiệt huyết, xua đuổi tà khí và thu hút phước lành, thịnh vượng ngập tràn.',
    coreStandard: 'Màu đỏ son tươi tắn, đại diện cho niềm vui hoan hỷ lớn lao.',
    proprietyRules: ['Là màu sắc trung tâm trong mọi ngày cưới hỏi và lễ tết Việt Nam.'],
    dos: ['Lễ thành hôn, mùng một Tết Nguyên Đán, lễ hội lớn.'],
    donts: ['Không mặc trong các sự kiện mang tính chia buồn tang gia.'],
    safeRemixGuide: 'Chọn tà áo đỏ phối cùng quần lụa trắng hoặc vàng đồng để tạo tổng thể trang nhã.'
  },
  cream: {
    id: 'cream',
    category: 'color',
    name: 'Kem Ngà / Lụa Mộc',
    eraOrSource: 'Màu nguyên bản của sợi tơ tằm tự nhiên',
    badge: 'Thuần Khiết & Tao Nhã',
    badgeType: 'harmony',
    integrityScore: 100,
    symbolicMeaning: 'Màu sắc nguyên bản của kén tằm chưa qua tẩy nhuộm hóa chất, đại diện cho lòng thanh sạch, chân thành và khí chất quân tử.',
    coreStandard: 'Sắc trắng ngà ấm áp, có độ óng ả tự nhiên của sợi protein tơ tằm.',
    proprietyRules: ['Phù hợp với mọi giới tính và mọi lứa tuổi, mang tính phổ quát mực thước cao nhất.'],
    dos: ['Lễ chùa, văn phòng, lễ tốt nghiệp, sự kiện ngoại giao, dạo phố thiền tịnh.'],
    donts: ['Cần giữ gìn cẩn thận tránh làm ố bẩn tà áo mộc.'],
    safeRemixGuide: 'Dễ dàng kết hợp với bất kỳ loại phụ kiện nào từ kiềng bạc, chuỗi ngọc đến túi mây tre đan.'
  },
  yellow: {
    id: 'yellow',
    category: 'color',
    name: 'Vàng Hoàng Gia / Hoàng Yến',
    eraOrSource: 'Triều Nguyễn - Sắc màu đế vương & quý tộc',
    badge: 'Vương Triều & Thịnh Vượng',
    badgeType: 'strict',
    integrityScore: 97,
    symbolicMeaning: 'Thuộc hành Thổ (trung tâm vũ trụ trong ngũ hành), tượng trưng cho sự thịnh vượng, quyền uy tối thượng và ánh sáng mặt trời.',
    coreStandard: 'Màu vàng hoàng yến hoặc vàng kim tuyến dệt nổi hoa văn hoa sen, chữ Thọ.',
    proprietyRules: ['Thời xưa sắc chính hoàng chỉ dành cho Hoàng đế, ngày nay là biểu tượng của tài lộc phú quý.'],
    dos: ['Đại lễ mừng thọ, lễ hội festival di sản, sự kiện tôn vinh văn hóa truyền thống.'],
    donts: ['Tránh phối cùng quá nhiều phụ kiện vàng chói lóa gây cảm giác phô trương nặng nề.'],
    safeRemixGuide: 'Phối màu vàng mật ong với quần lụa đen hoặc xanh rêu để tạo chiều sâu thị giác đĩnh đạc.'
  },
  blue: {
    id: 'blue',
    category: 'color',
    name: 'Xanh Lam / Chàm Đại Dương',
    eraOrSource: 'Màu nhuộm từ lá chàm tự nhiên',
    badge: 'Bình Yên & Trí Tuệ',
    badgeType: 'harmony',
    integrityScore: 98,
    symbolicMeaning: 'Thuộc hành Thủy, tượng trưng cho trí tuệ sâu rộng, sự điềm đạm, khiêm nhường và sự gắn kết với non sông đất nước.',
    coreStandard: 'Sắc xanh chàm sâu thẳm, dịu mát và sang trọng.',
    proprietyRules: ['Đặc biệt được ưa chuộng bởi nam giới và bậc trí thức nho nhã xưa.'],
    dos: ['Công sở, sự kiện học thuật, đám cưới bạn bè, gặp gỡ ngoại giao.'],
    donts: ['Tránh chọn xanh neon quá gắt mắt làm mất vẻ trầm mặc của cổ phục.'],
    safeRemixGuide: 'Phối xanh lam đậm với nẹp cổ lót trắng muốt tạo nên hình tượng công tử nho nhã chuẩn mực.'
  },
  green: {
    id: 'green',
    category: 'color',
    name: 'Xanh Ngọc / Bích Ngọc',
    eraOrSource: 'Màu ngọc bích quý giá thời xưa',
    badge: 'Tươi Trẻ & Phồn Vinh',
    badgeType: 'harmony',
    integrityScore: 97,
    symbolicMeaning: 'Thuộc hành Mộc, tượng trưng cho mầm sống vươn lên, sức sống bền bỉ và sự thanh khiết như viên ngọc quý.',
    coreStandard: 'Xanh ngọc bích mềm dịu, tôn vinh làn da châu Á tươi sáng.',
    proprietyRules: ['Tạo cảm giác thân thiện, ôn hòa và tươi mát cho người đối diện.'],
    dos: ['Lễ hội mùa xuân, chụp ảnh thiên nhiên non nước, họp mặt gia đình.'],
    donts: ['Tránh chất liệu bóng trơn quá mức gây cảm giác giả tạo.'],
    safeRemixGuide: 'Phối cùng trang sức bạc chạm hoa lá để tôn thêm vẻ đẹp thanh tân tươi mát.'
  },
  black: {
    id: 'black',
    category: 'color',
    name: 'Đen Huyền Bí / Hắc Y',
    eraOrSource: 'Màu áo ngũ thân nam giới thế kỷ 19',
    badge: 'Uy Nghiêm & Trầm Mặc',
    badgeType: 'strict',
    integrityScore: 99,
    symbolicMeaning: 'Tượng trưng cho sự kiên định, thâm trầm, mực thước kỷ cương và sự tôn kính sâu sắc.',
    coreStandard: 'Màu the đen hoặc lụa đen huyền bí, dệt hoa văn chìm tinh xảo.',
    proprietyRules: ['Là trang phục chuẩn mực kinh điển của đàn ông Việt Nam thế kỷ 19-20 khi ra đường hoặc tham gia việc làng việc họ.'],
    dos: ['Đại lễ tưởng niệm, tế họ, hội nghị trang trọng, giảng dạy học thuật.'],
    donts: ['Không mặc cả cây đen đi đám cưới trẻ hoặc chúc tết đầu năm (trừ khi có phối nẹp màu rực rỡ).'],
    safeRemixGuide: 'Mặc áo the đen bên ngoài áo lót trắng bên trong (hiệu ứng "trong trắng ngoài đen" kinh điển của văn hóa Việt).'
  },
  pastel: {
    id: 'pastel',
    category: 'color',
    name: 'Hồng Sen / Phấn Nhạt',
    eraOrSource: 'Màu hoa sen thanh khiết sông Hồng',
    badge: 'Thanh Nhã & Tươi Sáng',
    badgeType: 'remix',
    integrityScore: 94,
    symbolicMeaning: 'Tượng trưng cho nét ngây thơ, dịu dàng, trong sáng và thanh tao như búp sen vừa hé nở trong đầm.',
    coreStandard: 'Màu hồng phớt êm dịu, không gắt, mang lại cảm giác ngọt ngào và nhẹ nhõm.',
    proprietyRules: ['Rất được lòng các bạn trẻ và thiếu nữ tuổi xuân thì.'],
    dos: ['Đi học, chụp kỷ yếu, dạo phố cuối tuần, dự tiệc cưới ngoài trời.'],
    donts: ['Tránh phối màu quá sến sẩm với các phụ kiện nhựa rẻ tiền.'],
    safeRemixGuide: 'Kết hợp cùng chuỗi ngọc trai trắng ngà tạo diện mạo nàng thơ Á Đông trong trẻo.'
  }
};

export const ACCESSORY_CULTURE_NOTES: Record<string, CultureProprietyNote> = {
  'khan-dong': {
    id: 'khan-dong',
    category: 'accessory',
    name: 'Khăn Đóng (Khăn Xếp Lụa)',
    eraOrSource: 'Phụ kiện kinh điển từ thời Chúa Nguyễn',
    badge: 'Nghi Thức Đứng Đắn',
    badgeType: 'strict',
    integrityScore: 100,
    symbolicMeaning: 'Gói trọn mái tóc gọn gàng thể hiện phong thái tôn nghiêm, gìn giữ nếp nhà và phong độ chỉn chu của người mặc.',
    coreStandard: 'Quấn thành các nếp lớp gấp đều đặn phía trước trán (chữ Nhất hoặc chữ Nhân), ôm vừa vặn quanh đầu.',
    proprietyRules: [
      'Khăn nam giới quấn chữ Nhất ngang bằng phẳng phiu.',
      'Khăn nữ giới quấn dày hơn tạo độ thanh thoát cho khuôn mặt.'
    ],
    dos: ['Bắt buộc trong các lễ nghi cưới hỏi truyền thống, cúng tế tổ tiên, chụp ảnh chuẩn cổ phục.'],
    donts: ['Không đội khăn lệch vẹo xộc xệch sang một bên mắt.'],
    safeRemixGuide: 'Chọn khăn đóng bọc lụa cùng tông màu với áo để tạo khối đồng điệu sang trọng.'
  },
  'kieng-bac': {
    id: 'kieng-bac',
    category: 'accessory',
    name: 'Kiềng Bạc Nguyên Khối',
    eraOrSource: 'Trang sức cổ truyền hàng trăm năm',
    badge: 'Thanh Bạch & Tinh Khiết',
    badgeType: 'ceremonial',
    integrityScore: 98,
    symbolicMeaning: 'Vòng tròn bạc tượng trưng cho sự trọn vẹn, tính thanh bạch, trừ tà và mang lại bình an, sức khỏe cho người đeo.',
    coreStandard: 'Làm bằng bạc ta chạm khắc thủ công hoặc đánh bóng trơn, ôm nhẹ quanh phần cổ áo.',
    proprietyRules: ['Kiềng nằm ngay ngắn phía ngoài cổ áo lập lĩnh hoặc trên ngực áo tứ thân.'],
    dos: ['Phối cùng Áo Dài, Áo Tứ Thân trong các ngày lễ trang trọng.'],
    donts: ['Tránh chọn kiềng quá rộng lủng lẳng dưới ngực hoặc méo mó.'],
    safeRemixGuide: 'Kiềng bạc trơn tối giản phối cùng áo dài cổ cao tạo điểm sáng kim loại đắt giá cho trang phục.'
  },
  'non-quai-thao': {
    id: 'non-quai-thao',
    category: 'accessory',
    name: 'Nón Quai Thao (Nón Ba Tầm)',
    eraOrSource: 'Đặc sản văn hóa phụ nữ Kinh Bắc',
    badge: 'Duyên Dáng Quan Họ',
    badgeType: 'folk',
    integrityScore: 99,
    symbolicMeaning: 'Chiếc nón tròn phẳng rộng vành với dải quai thao đỏ rủ mềm mại che chở cho người phụ nữ, tượng trưng cho nét duyên thầm e ấp.',
    coreStandard: 'Đan bằng lá cọ mỏng khâu chỉ cước tỉ mỉ; quai thao tết bằng tơ tằm buông dài hai bên vai.',
    proprietyRules: ['Cầm nón khéo léo bên hông hoặc nghiêng che mặt tạo dáng duyên dáng.'],
    dos: ['Đi hội Lim, lễ hội quan họ, múa cổ truyền, chụp ảnh chủ đề thôn quê Bắc Bộ.'],
    donts: ['Không đội nón che kín hết cả khuôn mặt trong lúc giao tiếp với người đối diện.'],
    safeRemixGuide: 'Sử dụng nón quai thao làm phụ kiện cầm tay nghệ thuật khi chụp ảnh lookbook thời trang.'
  },
  'ngoc-trai': {
    id: 'ngoc-trai',
    category: 'accessory',
    name: 'Chuỗi Vòng Ngọc Trai',
    eraOrSource: 'Trang sức quý phái phụ nữ Việt Nam thế kỷ 20',
    badge: 'Quý Tộc & Thanh Lịch',
    badgeType: 'ceremonial',
    integrityScore: 96,
    symbolicMeaning: 'Viên ngọc tôi luyện từ gian khó, tượng trưng cho đức hạnh vẹn toàn, lòng thủy chung và nét đài các của phụ nữ Á Đông.',
    coreStandard: 'Hạt ngọc tròn đều, ánh sắc xà cừ tự nhiên rạng rỡ.',
    proprietyRules: ['Độ dài chuỗi ngọc vừa vặn trên ngực áo, không che mất hàng cúc cổ áo.'],
    dos: ['Dạ tiệc, lễ cưới, sự kiện ngoại giao, chụp ảnh phong cách cô Ba Sài Gòn hoài niệm.'],
    donts: ['Tránh đeo quá nhiều chuỗi rườm rà như chuỗi hạt trang trí giáng sinh.'],
    safeRemixGuide: 'Một chuỗi ngọc trai đơn sợi tối giản phối cùng Áo Dài nhung the hoặc lụa đen huyền thoại.'
  },
  'sandal': {
    id: 'sandal',
    category: 'accessory',
    name: 'Guốc Mộc / Sandal Quai Mảnh',
    eraOrSource: 'Dấu ấn sinh hoạt dân gian',
    badge: 'Mộc Mạc & Dân Dã',
    badgeType: 'harmony',
    integrityScore: 95,
    symbolicMeaning: 'Tiếng guốc mộc gõ nhịp trên ngõ gạch làng quê, biểu trưng cho sự thanh thoát, gần gũi và mộc mạc.',
    coreStandard: 'Đế gỗ chạm hoặc quai da mảnh thanh thoát, bước đi uyển chuyển êm ái.',
    proprietyRules: ['Bước đi nhẹ nhàng, giữ tà áo buông rủ thẳng thớm.'],
    dos: ['Mặc cùng Áo Bà Ba, Áo Tứ Thân, Áo Dài lụa mộc dạo phố.'],
    donts: ['Tránh mang dép lê nhựa xộc xệch làm mất đi sự tôn nghiêm của trang phục.'],
    safeRemixGuide: 'Sandal quai mảnh màu da hoặc be nhạt tiệp màu với da chân giúp tôn dáng cao ráo.'
  },
  'sneakers': {
    id: 'sneakers',
    category: 'accessory',
    name: 'Sneakers Trắng Tối Giản',
    eraOrSource: 'Phong cách đường phố Gen Z thế kỷ 21',
    badge: 'Năng Động & Hiện Đại',
    badgeType: 'remix',
    integrityScore: 85,
    symbolicMeaning: 'Nhịp bước năng động, tự tin của thế hệ trẻ mang di sản dân tộc bước ra thế giới hiện đại.',
    coreStandard: 'Giày thể thao trắng sạch sẽ, phom dáng thon gọn, không hầm hố gồ ghề.',
    proprietyRules: ['Chỉ phối trong các bối cảnh đời thường, dạo phố, chụp ảnh lookbook nghệ thuật.'],
    dos: ['Phối cùng Áo Dài cách tân dáng suông ngắn hoặc Áo Đối Khâm khoác ngoài trẻ trung.'],
    donts: ['Tuyệt đối KHÔNG mang sneakers khi làm lễ dâng hương gia tiên hoặc lễ cưới trang nghiêm trước bàn thờ.'],
    safeRemixGuide: 'Chọn sneaker đế phẳng da trắng tinh tế (classic white tennis shoes) để tạo sự tương phản văn minh hài hòa.'
  }
};
