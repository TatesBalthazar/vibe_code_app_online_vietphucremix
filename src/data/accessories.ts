import { Accessory } from '../types';

export const ACCESSORIES_DATA: Accessory[] = [
  // Khăn
  {
    id: 'khan-dong',
    category: 'khan',
    categoryName: 'Khăn',
    name: 'Khăn đóng lụa',
    type: 'traditional',
    description: 'Khăn quấn xếp nếp chữ Nhất gọn gàng trên đầu, chuẩn mực phong thái nho nhã cổ truyền.'
  },
  {
    id: 'khan-ran',
    category: 'khan',
    categoryName: 'Khăn',
    name: 'Khăn rằn Nam Bộ',
    type: 'traditional',
    description: 'Họa tiết ca-rô đen trắng hoặc đỏ trắng mộc mạc, đậm hơi thở sông nước miền Tây.'
  },
  {
    id: 'khan-lua-to-tam',
    category: 'khan',
    categoryName: 'Khăn',
    name: 'Khăn lụa tơ tằm vắt vai',
    type: 'modern',
    description: 'Dải lụa mỏng buông lơi tạo điểm nhấn mềm mại, bay bổng theo từng bước đi.'
  },
  {
    id: 'bandana-cach-tan',
    category: 'khan',
    categoryName: 'Khăn',
    name: 'Bandana lụa hoa văn Việt',
    type: 'hybrid',
    description: 'Quấn cổ hoặc thắt tóc năng động mang phong cách đường phố trẻ trung.'
  },

  // Nón
  {
    id: 'non-la-truyen-thong',
    category: 'non',
    categoryName: 'Nón',
    name: 'Nón lá chóp truyền thống',
    type: 'traditional',
    description: 'Làm từ lá cọ phơi sương, quai nón lụa mềm mang vẻ đẹp thuần khiết Việt Nam.'
  },
  {
    id: 'non-quai-thao',
    category: 'non',
    categoryName: 'Nón',
    name: 'Nón quai thao thu nhỏ',
    type: 'traditional',
    description: 'Vành tròn phẳng dẹt với quai thao tua rua, điểm nhấn độc đáo của liền chị Kinh Bắc.'
  },
  {
    id: 'non-beret-da',
    category: 'non',
    categoryName: 'Nón',
    name: 'Nón beret cổ điển',
    type: 'modern',
    description: 'Hòa quyện nét thanh lịch phong cách Đông Dương (Indochine) và thời trang Tây phương.'
  },
  {
    id: 'non-bucket-linen',
    category: 'non',
    categoryName: 'Nón',
    name: 'Nón bucket linen thêu tay',
    type: 'hybrid',
    description: 'Trẻ trung, che nắng tốt, tạo phong cách dạo phố thoải mái cho các bạn trẻ.'
  },

  // Túi
  {
    id: 'tui-coi-quai-tre',
    category: 'tui',
    categoryName: 'Túi',
    name: 'Túi cói đan thủ công',
    type: 'traditional',
    description: 'Chất liệu lục bình hoặc cói mộc tự nhiên, mang lại cảm giác thân thiện với môi trường.'
  },
  {
    id: 'tui-tote-canvas',
    category: 'tui',
    categoryName: 'Túi',
    name: 'Túi tote canvas chữ Việt cách điệu',
    type: 'modern',
    description: 'Tiện lợi để tập vở hoặc laptop đi học, vừa thời trang vừa đậm tinh thần sinh viên.'
  },
  {
    id: 'tui-kep-nach-mini',
    category: 'tui',
    categoryName: 'Túi',
    name: 'Túi kẹp nách da tối giản',
    type: 'modern',
    description: 'Phom dáng gọn gàng, tăng vẻ thời thượng high-fashion khi diện áo dài hay ngũ thân.'
  },

  // Trang sức
  {
    id: 'vong-kieng-bac',
    category: 'trang-suc',
    categoryName: 'Trang sức',
    name: 'Vòng kiềng bạc nguyên khối',
    type: 'traditional',
    description: 'Chiếc kiềng tròn ôm sát cổ, tôn trọn vẹn đường nét thanh tú của cổ áo dài và ngũ thân.'
  },
  {
    id: 'chuoi-ngoc-trai',
    category: 'trang-suc',
    categoryName: 'Trang sức',
    name: 'Chuỗi vòng ngọc trai thanh lịch',
    type: 'modern',
    description: 'Ánh xà cừ ngọc trai đem đến vẻ đẹp đài các, dịu dàng chuẩn quý cô hiện đại.'
  },
  {
    id: 'khuyen-tai-kim-loai',
    category: 'trang-suc',
    categoryName: 'Trang sức',
    name: 'Khuyên tai hình học tối giản',
    type: 'hybrid',
    description: 'Điểm xuyết cá tính hiện đại, tạo sự tương phản thị giác thú vị với trang phục truyền thống.'
  },
  {
    id: 'tram-cai-toc',
    category: 'trang-suc',
    categoryName: 'Trang sức',
    name: 'Trâm cài tóc khảm xà cừ',
    type: 'traditional',
    description: 'Cố định búi tóc cao kiêu hãnh, vừa tao nhã vừa gợi nhớ nét quyền quý xưa.'
  },

  // Giày
  {
    id: 'guoc-moc-quai-nhung',
    category: 'giay',
    categoryName: 'Giày',
    name: 'Guốc mộc quai nhung',
    type: 'traditional',
    description: 'Âm thanh gõ lộc cộc đặc trưng trên sân gạch, gợi nhớ phong thái thong dong mộc mạc.'
  },
  {
    id: 'sneakers-retro-trang',
    category: 'giay',
    categoryName: 'Giày',
    name: 'Sneakers trắng cổ điển',
    type: 'hybrid',
    description: 'Công thức phối đồ ưa thích của Gen Z: năng động, tự tin sải bước suốt cả ngày dài.'
  },
  {
    id: 'boots-da-thap-co',
    category: 'giay',
    categoryName: 'Giày',
    name: 'Boots da thấp cổ',
    type: 'modern',
    description: 'Tạo diện mạo cá tính, góc cạnh và mạnh mẽ khi kết hợp cùng áo ngũ thân hay áo dài suông.'
  },
  {
    id: 'sandal-day-manh',
    category: 'giay',
    categoryName: 'Giày',
    name: 'Sandal quai mảnh thanh thoát',
    type: 'modern',
    description: 'Nhẹ nhàng tôn dáng chân, giúp các bước chuyển động trong tà áo dài thêm mềm mại.'
  }
];
