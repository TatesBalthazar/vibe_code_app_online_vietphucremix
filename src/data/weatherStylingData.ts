import { OutfitId, ColorId, StyleId, OccasionId } from '../types';

export type DayOption = 'today' | 'tomorrow' | 'custom';
export type RegionId = 'bac' | 'trung' | 'nam';
export type TimeOfDay = 'sang' | 'trua' | 'chieu' | 'toi';

export interface WeatherForecastResult {
  temperature: number;
  feelsLike: number;
  condition: string;
  weatherType: 'sunny' | 'partly-cloudy' | 'cool' | 'breezy' | 'warm' | 'rain-shower';
  humidity: number;
  windSpeed: string;
  uvIndex: string;
  weatherSummary: string;
  clothingAdvice: string;
  recommendedFabrics: string[];
  weatherAlert?: string;
}

export interface StylingSuggestionResult {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  outfitId: OutfitId;
  outfitName: string;
  outfitImgKey: string;
  colorId: ColorId;
  colorName: string;
  colorHex: string;
  styleId: StyleId;
  styleName: string;
  occasionId: OccasionId;
  occasionName: string;
  accessories: string[];
  accessoryNames: string[];
  weatherScore: number;
  weatherReason: string;
  occasionReason: string;
  stylistTip: string;
}

export interface RegionInfo {
  id: RegionId;
  name: string;
  subLabel: string;
  landmark: string;
  climateNote: string;
}

export const REGIONS_DATA: RegionInfo[] = [
  {
    id: 'bac',
    name: 'Miền Bắc',
    subLabel: 'Hà Nội · Ninh Bình · Sa Pa',
    landmark: 'Hồ Gươm & Phố cổ',
    climateNote: 'Khí hậu 4 mùa đặc trưng, thu đông se lạnh lãng mạn, hè nắng hanh'
  },
  {
    id: 'trung',
    name: 'Miền Trung',
    subLabel: 'Huế · Đà Nẵng · Hội An',
    landmark: 'Cố đô Huế & Sông Hương',
    climateNote: 'Nắng gió duyên hải, ban ngày ấm rực rỡ, chiều tối lộng gió biển mát'
  },
  {
    id: 'nam',
    name: 'Miền Nam',
    subLabel: 'TP.HCM · Cần Thơ · Tây Nam Bộ',
    landmark: 'Sài Gòn & Kênh rạch miền Tây',
    climateNote: 'Khí hậu nhiệt đới nắng ấm quanh năm, gió sông mát lành'
  }
];

export const TIME_OF_DAY_DATA: {
  id: TimeOfDay;
  label: string;
  timeRange: string;
  desc: string;
}[] = [
  {
    id: 'sang',
    label: 'Buổi Sáng',
    timeRange: '06:00 – 11:00',
    desc: 'Không khí trong lành, sương mai mát mẻ, nắng sớm dịu dàng'
  },
  {
    id: 'trua',
    label: 'Buổi Trưa',
    timeRange: '11:00 – 14:00',
    desc: 'Nhiệt độ cao nhất trong ngày, nắng rực rỡ, cần trang phục thoáng'
  },
  {
    id: 'chieu',
    label: 'Buổi Chiều',
    timeRange: '14:00 – 18:00',
    desc: 'Nắng vàng xiên êm dịu, gió thoang thoảng, hoàng hôn lãng mạn'
  },
  {
    id: 'toi',
    label: 'Buổi Tối',
    timeRange: '18:00 – 22:00',
    desc: 'Trời dịu mát hoặc se se lạnh, phố lên đèn, lý tưởng dạo chơi'
  }
];

export const OCCASIONS_SELECTION: {
  id: OccasionId;
  label: string;
  sub: string;
  iconName: 'casual' | 'school' | 'office' | 'festival' | 'photoshoot' | 'wedding';
}[] = [
  {
    id: 'casual',
    label: 'Ngày thường & Cà phê',
    sub: 'Dạo phố, gặp gỡ bạn bè, dạo bảo tàng, phong cách trẻ trung',
    iconName: 'casual'
  },
  {
    id: 'school',
    label: 'Đi học & Giảng đường',
    sub: 'Khai giảng, hội thảo sinh viên, thuyết trình lịch sử văn hóa',
    iconName: 'school'
  },
  {
    id: 'cultural-event',
    label: 'Đi làm & Sự kiện trang trọng',
    sub: 'Công sở văn hóa, giao lưu đối ngoại, tọa đàm di sản',
    iconName: 'office'
  },
  {
    id: 'festival',
    label: 'Lễ hội & Đi chùa / Tết',
    sub: 'Du xuân đầu năm, lễ hội đền chùa, tế tự cội nguồn',
    iconName: 'festival'
  },
  {
    id: 'photoshoot',
    label: 'Chụp ảnh & Lookbook',
    sub: 'Kỷ yếu thanh xuân, concept hoài niệm điện ảnh, nghệ thuật',
    iconName: 'photoshoot'
  },
  {
    id: 'wedding',
    label: 'Đám cưới & Lễ ăn hỏi',
    sub: 'Bưng quả, dự tiệc hỷ, hôn lễ truyền thống trang nghiêm',
    iconName: 'wedding'
  }
];

/**
 * Intelligent Weather Forecast Simulator based on Vietnamese Regional Met Patterns
 */
export function getWeatherForecast(
  region: RegionId,
  timeOfDay: TimeOfDay,
  dayOption: DayOption,
  customDate?: string
): WeatherForecastResult {
  // Slight pseudo-random variance based on custom date or day
  const dayOffset =
    dayOption === 'today'
      ? 0
      : dayOption === 'tomorrow'
      ? 1
      : customDate
      ? Math.abs(customDate.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 3)
      : 0;

  if (region === 'bac') {
    switch (timeOfDay) {
      case 'sang':
        return {
          temperature: 22 + (dayOffset % 2),
          feelsLike: 21,
          condition: 'Se lạnh, sương sớm trong lành, gió heo may nhẹ',
          weatherType: 'cool',
          humidity: 78,
          windSpeed: 'Gió nhẹ 11 km/h',
          uvIndex: 'Thấp (2/10)',
          weatherSummary: 'Thời tiết thu Hà Nội mát mẻ dễ chịu, se lạnh đầu ngày',
          clothingAdvice:
            'Nên chọn trang phục có lớp lót kín đáo như Áo Ngũ Thân hoặc Áo Dài tơ tằm hai lớp. Chất liệu the hoặc gấm mỏng giúp cản gió nhẹ và giữ ấm vừa vặn.',
          recommendedFabrics: ['Lụa tơ tằm 2 lớp', 'Gấm hoa mỏng', 'The La Khê lót trắng', 'Đũi tơ tằm'],
          weatherAlert: 'Sáng sớm hơi se lạnh, nên quàng khăn đóng hoặc khăn lụa mỏng vắt vai.'
        };
      case 'trua':
        return {
          temperature: 29 + (dayOffset % 2),
          feelsLike: 30,
          condition: 'Nắng vàng ấm áp, trời quang đãng, khô ráo',
          weatherType: 'sunny',
          humidity: 60,
          windSpeed: 'Gió thoảng 9 km/h',
          uvIndex: 'Trung bình (6/10)',
          weatherSummary: 'Nắng ấm hanh vàng, không khí khô ráo rất đẹp để diện đồ dạo phố',
          clothingAdvice:
            'Chất liệu lụa tơ tằm mềm mát hoặc vải bông thoáng khí. Tránh chất liệu quá dày gây bức bí khi di chuyển ngoài trời.',
          recommendedFabrics: ['Lụa Vạn Phúc mềm', 'Linen tơ', 'Vải sa mỏng', 'Đũi dệt thưa'],
          weatherAlert: 'Nắng trưa hơi chói, nón quai thao hoặc quạt lụa sẽ là điểm nhấn vừa che mát vừa duyên.'
        };
      case 'chieu':
        return {
          temperature: 26 + (dayOffset % 2),
          feelsLike: 26,
          condition: 'Nắng xiên êm dịu, gió mát lộng, trời trong xanh',
          weatherType: 'partly-cloudy',
          humidity: 68,
          windSpeed: 'Gió mát 14 km/h',
          uvIndex: 'Thấp (3/10)',
          weatherSummary: 'Khoảng thời gian đẹp nhất trong ngày: trời dịu, ánh sáng vàng êm',
          clothingAdvice:
            'Hoàn hảo cho Áo Tứ Thân thắt vạt lả lướt hoặc Áo Tay Chẽn thanh lịch. Màu đỏ son hoặc vàng hoàng thổ bắt sáng hoàng hôn cực kỳ ấn tượng.',
          recommendedFabrics: ['Lụa satin rủ nhẹ', 'The lụa', 'Tơ sống mềm', 'Brocade hoa chìm'],
          weatherAlert: 'Gió chiều làm tà áo bay rất đẹp, phù hợp chụp lookbook ngoài trời.'
        };
      case 'toi':
        return {
          temperature: 20 + (dayOffset % 2),
          feelsLike: 19,
          condition: 'Gió se se lạnh, trời thu se sắt mát lành, phố lên đèn',
          weatherType: 'cool',
          humidity: 82,
          windSpeed: 'Gió đêm 13 km/h',
          uvIndex: 'Không có (0/10)',
          weatherSummary: 'Se lạnh đặc trưng phương Bắc, rất thi vị khi thưởng ngoạn trà và cà phê',
          clothingAdvice:
            'Nên mặc Áo Ngũ Thân hoặc Áo Tấc có lót trong, phối cùng kiềng bạc và khăn đóng để giữ ấm phần cổ. Tránh áo sát nách hay tà xẻ quá cao.',
          recommendedFabrics: ['Gấm tơ tằm dệt dày', 'Nhung the', 'Lụa tơ tằm lót đôi', 'Đoạn tơ'],
          weatherAlert: 'Nhiệt độ hạ thấp về khuya (dưới 20°C), cần giữ ấm cổ và ngực.'
        };
    }
  }

  if (region === 'trung') {
    switch (timeOfDay) {
      case 'sang':
        return {
          temperature: 25 + (dayOffset % 2),
          feelsLike: 25,
          condition: 'Nắng sớm chan hòa bên dòng sông Hương, gió biển thoang thoảng',
          weatherType: 'partly-cloudy',
          humidity: 74,
          windSpeed: 'Gió biển nhẹ 12 km/h',
          uvIndex: 'Thấp (3/10)',
          weatherSummary: 'Thanh bình, êm đềm, không khí cố đô mát mẻ dễ chịu',
          clothingAdvice:
            'Rất hợp sắc lam ngọc hoặc kem ngà trên nền Áo Dài truyền thống hoặc Áo Tấc tay thụng thanh thoát. Chất liệu lụa rũ bay bổng theo nhịp bước chân.',
          recommendedFabrics: ['Lụa Mã Châu Quảng Nam', 'Sa mỏng dệt hoa', 'Vóc tơ tằm', 'Tơ tằm thêu tay']
        };
      case 'trua':
        return {
          temperature: 31 + (dayOffset % 2),
          feelsLike: 33,
          condition: 'Nắng rực rỡ, biển biếc trời trong, nhiệt độ ấm áp',
          weatherType: 'sunny',
          humidity: 62,
          windSpeed: 'Gió biển 15 km/h',
          uvIndex: 'Cao (8/10)',
          weatherSummary: 'Nắng vàng rực rỡ miền duyên hải, cần che chắn nắng cẩn thận',
          clothingAdvice:
            'Ưu tiên chất liệu tơ tằm tự nhiên thoáng khí, thấm hút mồ hôi. Nên phối thêm nón bài thơ hoặc nón quai thao truyền thống để che nắng duyên dáng.',
          recommendedFabrics: ['Lụa tơ sống thoáng mát', 'Đũi dệt mộc', 'Linen tự nhiên', 'Vải bông dệt thoi'],
          weatherAlert: 'Chỉ số tia UV cao vào buổi trưa, nên mang nón hoặc ô lụa.'
        };
      case 'chieu':
        return {
          temperature: 28 + (dayOffset % 2),
          feelsLike: 28,
          condition: 'Hoàng hôn cố đô êm dịu, gió mát lộng từ sông và biển',
          weatherType: 'breezy',
          humidity: 70,
          windSpeed: 'Gió mát 18 km/h',
          uvIndex: 'Thấp (2/10)',
          weatherSummary: 'Trời dịu mắt, gió mát lộng, phố cổ đèn lồng bắt đầu thắp sáng',
          clothingAdvice:
            'Áo Nhật Bình hoặc Áo Đối Khâm khoác ngoài cực kỳ tôn dáng dưới ánh đèn lồng Hội An. Gam màu đỏ son, hoàng thổ hay tím hoa cà tạo cảm giác quý phái cổ kính.',
          recommendedFabrics: ['Gấm thêu kim tuyến', 'Lụa tơ tằm rủ', 'Đoạn dệt hoa', 'Sa lót the']
        };
      case 'toi':
        return {
          temperature: 24 + (dayOffset % 2),
          feelsLike: 24,
          condition: 'Mát mẻ, lộng gió sông mát lành, không khí hoài niệm êm ả',
          weatherType: 'breezy',
          humidity: 78,
          windSpeed: 'Gió lộng 16 km/h',
          uvIndex: 'Không có (0/10)',
          weatherSummary: 'Thời tiết mát mẻ tuyệt vời để dạo phố đêm sông Hương hay phố cổ',
          clothingAdvice:
            'Áo Ngũ Thân Lập Lĩnh kết hợp kiềng bạc cổ hoặc Áo Dài đôi cùng bạn bè. Phom dáng suông đĩnh đạc tạo phong thái thanh tao trong gió đêm.',
          recommendedFabrics: ['Lụa tơ tằm mềm', 'Gấm nhẹ', 'Vải đũi tơ', 'Lương tơ tằm']
        };
    }
  }

  // Region: Nam
  switch (timeOfDay) {
    case 'sang':
      return {
        temperature: 27 + (dayOffset % 2),
        feelsLike: 28,
        condition: 'Nắng ấm nhiệt đới chan hòa, không khí nhộn nhịp trong trẻo',
        weatherType: 'sunny',
        humidity: 75,
        windSpeed: 'Gió nhẹ 10 km/h',
        uvIndex: 'Vừa phải (5/10)',
        weatherSummary: 'Buổi sáng phương Nam tràn đầy sức sống và ánh nắng vàng ấm',
        clothingAdvice:
          'Áo Bà Ba Nam Bộ với hai túi trước hoặc Áo Dài cách tân tay raglan thoáng mát. Vải lụa mỏng nhẹ giúp vận động tự do, linh hoạt suốt ngày dài.',
        recommendedFabrics: ['Lãnh Mỹ A trơn láng', 'Lụa Nha Xá mát lạnh', 'Linen tơ', 'Vải xô đũi']
      };
    case 'trua':
      return {
        temperature: 33 + (dayOffset % 2),
        feelsLike: 36,
        condition: 'Nắng gắt nhiệt đới oi ả, trời cao xanh biếc',
        weatherType: 'warm',
        humidity: 65,
        windSpeed: 'Gió thoảng 11 km/h',
        uvIndex: 'Rất cao (9/10)',
        weatherSummary: 'Trưa nắng rực rỡ đặc trưng miền Nam, cần trang phục mát mẻ tối đa',
        clothingAdvice:
          'Chất liệu mỏng nhẹ, thoát nhiệt tuyệt đối là ưu tiên số một. Rất khuyên dùng Áo Bà Ba hoặc Áo Dài linen xẻ tà cao vừa phải, tránh cổ áo quá chật hoặc chất liệu bí nhiệt.',
        recommendedFabrics: ['Lãnh Mỹ A Tân Châu', 'Lụa dệt thưa mát', 'Đũi tơ mộc mạc', 'Linen tưng cao cấp'],
        weatherAlert: 'Nắng gắt nhiệt đới, ưu tiên mang khăn rằn che gáy và nón lá chóp nhọn.'
      };
    case 'chieu':
      return {
        temperature: 28 + (dayOffset % 2),
        feelsLike: 29,
        condition: 'Mây mát, có thể có mưa rào nhiệt đới thoáng qua rồi tạnh ngay',
        weatherType: 'rain-shower',
        humidity: 80,
        windSpeed: 'Gió mát 17 km/h',
        uvIndex: 'Thấp (2/10)',
        weatherSummary: 'Cơn mưa chiều Sài Gòn làm dịu mát phố thị, không khí sau mưa sảng khoái',
        clothingAdvice:
          'Trang phục có độ dài tà vừa phải tránh chạm đất ẩm ướt (như Áo Tay Chẽn hoặc Áo Bà Ba). Kết hợp cùng sandal quai mảnh chống nước hoặc sneakers retro.',
        recommendedFabrics: ['Lụa tơ tằm mau khô', 'Linen đanh sợi', 'Vải bông dệt', 'Vải đũi'],
        weatherAlert: 'Có thể có mưa rào bất chợt, nên chuẩn bị ô dù hoặc chọn tà áo cao gọn gàng.'
      };
    case 'toi':
      return {
        temperature: 26 + (dayOffset % 2),
        feelsLike: 27,
        condition: 'Gió sông Sài Gòn mát rượi, phố xá lung linh nhộn nhịp',
        weatherType: 'breezy',
        humidity: 78,
        windSpeed: 'Gió lộng 15 km/h',
        uvIndex: 'Không có (0/10)',
        weatherSummary: 'Khí trời mát dịu tuyệt vời của phương Nam về đêm, rất hợp tụ họp cà phê',
        clothingAdvice:
          'Phong cách Gen Z Remix: Áo Bà Ba phối sneakers trắng, hoặc Áo Dài hiện đại tông màu pastel lãng mạn. Trẻ trung, thoải mái và đầy cá tính.',
        recommendedFabrics: ['Lụa tơ tằm bóng nhẹ', 'Lãnh Mỹ A sang trọng', 'Linen pha tơ', 'Satin lụa mềm']
      };
  }
}

/**
 * Generate 3 Intelligent Stylist Outfits Based on Weather + Occasion + Gender
 */
export function generateWeatherOccasionOutfits(params: {
  region: RegionId;
  timeOfDay: TimeOfDay;
  dayOption: DayOption;
  customDate?: string;
  occasion: OccasionId;
  gender: 'female' | 'male';
}): {
  forecast: WeatherForecastResult;
  suggestions: StylingSuggestionResult[];
} {
  const { region, timeOfDay, dayOption, customDate, occasion, gender } = params;
  const forecast = getWeatherForecast(region, timeOfDay, dayOption, customDate);

  const isCool = forecast.temperature <= 23;
  const isHot = forecast.temperature >= 31;
  const isNight = timeOfDay === 'toi';
  const isRainRisk = forecast.weatherType === 'rain-shower';

  // 1. PRIMARY TOP RECOMMENDATION (Best Harmony of Weather + Occasion Etiquette)
  let topOutfit: OutfitId = 'ao-dai';
  let topColor: ColorId = 'cream';
  let topStyle: StyleId = 'traditional';
  let topAccessories: string[] = ['vong-kieng-bac', 'sandal-day-manh'];
  let topTitle = 'Thanh Lịch Chuẩn Mực';
  let topSubtitle = 'Tôn vinh cốt cách đoan trang, cân bằng hoàn hảo nhiệt độ';
  let topWeatherReason = '';
  let topOccasionReason = '';

  if (occasion === 'school') {
    topOutfit = isCool ? 'ao-ngu-than' : 'ao-dai';
    topColor = gender === 'male' ? 'black' : 'cream';
    topStyle = 'minimal';
    topAccessories = gender === 'male' ? ['khan-dong'] : ['vong-kieng-bac'];
    topTitle = 'Học Đường Trí Thức';
    topSubtitle = 'Phong thái nho nhã, nền nã tuyệt đối tại giảng đường';
    topWeatherReason = isCool
      ? `Buổi ${TIME_OF_DAY_DATA.find((t) => t.id === timeOfDay)?.label.toLowerCase()} ${forecast.temperature}°C se lạnh, cổ đứng khép kín giữ ấm cổ thanh lịch.`
      : `Chất liệu lụa mộc kem ngà thoáng mát, dễ chịu cho giờ học và thuyết trình.`;
    topOccasionReason = 'Phù hợp thuần phong mỹ tục giảng đường, thể hiện sự khiêm cung và học vấn thanh nhã.';
  } else if (occasion === 'casual') {
    topOutfit = region === 'nam' || isHot ? 'ao-ba-ba' : 'ao-tay-chen';
    topColor = isCool ? 'burgundy' : 'cream';
    topStyle = 'modern';
    topAccessories = ['sneakers-retro-trang'];
    topTitle = 'Dạo Phố & Cà Phê Năng Động';
    topSubtitle = 'Gọn gàng, thoáng khí, cực hợp gặp gỡ bạn bè cuối tuần';
    topWeatherReason = `Thời tiết ${forecast.temperature}°C, thiết kế xẻ tà hông giúp cử động thoải mái và thoáng mát.`;
    topOccasionReason = 'Tính ứng dụng đời thường cao, phối cùng sneakers mang đậm hơi thở thời trang Gen Z.';
  } else if (occasion === 'cultural-event') {
    topOutfit = 'ao-ngu-than';
    topColor = isCool ? 'burgundy' : 'blue';
    topStyle = 'traditional';
    topAccessories = ['khan-dong', 'vong-kieng-bac'];
    topTitle = 'Trang Trọng Ngoại Giao';
    topSubtitle = 'Đĩnh đạc, mực thước, xứng tầm không gian văn hóa trang nghiêm';
    topWeatherReason = `Chất liệu gấm lụa 2 lớp giữ phom áo đứng gãy gọn trong không gian điều hòa hoặc ngoài trời ${forecast.temperature}°C.`;
    topOccasionReason = 'Cấu trúc 5 thân tượng trưng cho Ngũ thường, chuẩn mực cao nhất cho sự kiện trang trọng.';
  } else if (occasion === 'festival') {
    topOutfit = region === 'bac' ? 'ao-tu-than' : region === 'trung' ? 'ao-tac' : 'ao-dai';
    topColor = 'red';
    topStyle = 'traditional';
    topAccessories = region === 'bac' ? ['non-quai-thao', 'vong-kieng-bac'] : ['khan-dong', 'vong-kieng-bac'];
    topTitle = 'Sắc Xuân Lễ Hội Trẩy Hội';
    topSubtitle = 'Rực rỡ sắc son di sản, mang lại may mắn và bình an';
    topWeatherReason = `Nhiệt độ ${forecast.temperature}°C lý tưởng để diện nhiều lớp áo truyền thống hòa vào dòng người trẩy hội.`;
    topOccasionReason = 'Sắc đỏ son đại cát kết hợp nón quai thao / khăn đóng tạo diện mạo lễ hội truyền thống trọn vẹn.';
  } else if (occasion === 'photoshoot') {
    topOutfit = region === 'trung' ? 'ao-nhat-binh' : isCool ? 'doi-kham' : 'ao-tu-than';
    topColor = 'burgundy';
    topStyle = 'romantic';
    topAccessories = ['vong-kieng-bac', 'non-quai-thao'];
    topTitle = 'Điện Ảnh Hoài Niệm';
    topSubtitle = 'Hiệu ứng lớp lang bay bổng, thị giác nghệ thuật đỉnh cao';
    topWeatherReason = `Ánh sáng ${TIME_OF_DAY_DATA.find((t) => t.id === timeOfDay)?.label.toLowerCase()} và gió ${forecast.windSpeed} làm tà áo rủ bay bổng tự nhiên.`;
    topOccasionReason = 'Các chi tiết thêu viền và hoa văn tạo điểm nhấn đắt giá trên khung hình nghệ thuật.';
  } else if (occasion === 'wedding') {
    topOutfit = 'ao-tac';
    topColor = 'red';
    topStyle = 'traditional';
    topAccessories = ['khan-dong', 'vong-kieng-bac', 'chuoi-ngoc-trai'];
    topTitle = 'Đại Lễ Cung Đình & Hỷ Sự';
    topSubtitle = 'Tay thụng uy nghi bề thế, tôn vinh đạo hiếu và gia phong';
    topWeatherReason = `Chất liệu gấm dệt hoa văn chữ Hỷ / chữ Thọ sang trọng, thích hợp nhiệt độ ${forecast.temperature}°C.`;
    topOccasionReason = 'Lễ phục quốc gia thời Nguyễn, trang nghiêm và tôn kính tổ tiên đôi bên gia đình.';
  }

  // 2. SECOND RECOMMENDATION: Modern Gen Z Remix (Youthful, Active, Creative)
  let genzOutfit: OutfitId = 'ao-tay-chen';
  let genzColor: ColorId = isHot ? 'cream' : 'blue';
  let genzStyle: StyleId = 'modern';
  let genzAccessories: string[] = ['sneakers-retro-trang'];
  let genzTitle = 'Gen Z Street Heritage';
  let genzSubtitle = 'Giao thoa giữa cổ phong nghìn năm và nhịp đập đương đại';

  if (occasion === 'school') {
    genzOutfit = 'ao-tay-chen';
    genzColor = 'pastel';
    genzStyle = 'minimal';
    genzAccessories = ['sneakers-retro-trang'];
    genzTitle = 'Thanh Xuân Giảng Đường';
    genzSubtitle = 'Tone pastel trong trẻo, ống tay chẽn gọn gàng viết bài';
  } else if (occasion === 'casual') {
    genzOutfit = 'ao-ba-ba';
    genzColor = 'pastel';
    genzStyle = 'street';
    genzAccessories = ['sneakers-retro-trang'];
    genzTitle = 'Retro Y2K Miền Sông Nước';
    genzSubtitle = 'Mix Áo Bà Ba cùng sneakers trắng năng động, tối giản phá cách';
  } else if (occasion === 'photoshoot') {
    genzOutfit = 'doi-kham';
    genzColor = 'yellow';
    genzStyle = 'romantic';
    genzAccessories = ['vong-kieng-bac', 'sandal-day-manh'];
    genzTitle = 'Nắng Hoàng Kim Editorial';
    genzSubtitle = 'Hai vạt song song buông lơi, hiệu ứng layering bắt trọn visual';
  } else if (occasion === 'festival') {
    genzOutfit = 'giao-linh';
    genzColor = 'yellow';
    genzStyle = 'modern';
    genzAccessories = ['khan-dong', 'sneakers-retro-trang'];
    genzTitle = 'Đại Việt Cổ Phong Đương Đại';
    genzSubtitle = 'Cổ chéo chữ Y phong khoáng, bước đi tự tin giữa phố hoa';
  } else if (occasion === 'wedding') {
    genzOutfit = 'ao-dai';
    genzColor = 'pastel';
    genzStyle = 'romantic';
    genzAccessories = ['chuoi-ngoc-trai', 'sandal-day-manh'];
    genzTitle = 'Ngọt Ngào Thanh Nhã Dự Tiệc';
    genzSubtitle = 'Tông hồng đào nhã nhặn, tôn trọn vẻ dịu dàng chúc phúc cô dâu chú rể';
  } else {
    genzOutfit = 'ao-tay-chen';
    genzColor = 'green';
    genzStyle = 'modern';
    genzAccessories = ['vong-kieng-bac', 'sneakers-retro-trang'];
    genzTitle = 'Xanh Rêu Tinh Tế';
    genzSubtitle = 'Sắc màu điềm đạm hiện đại, dễ mặc trong mọi hoàn cảnh';
  }

  // 3. THIRD RECOMMENDATION: Artful Heritage & Poise (Aristocratic, High Culture, Serene)
  let artOutfit: OutfitId = isCool ? 'vien-linh' : 'ao-ngu-than';
  let artColor: ColorId = isCool ? 'green' : 'yellow';
  let artStyle: StyleId = 'traditional';
  let artAccessories: string[] = ['khan-dong', 'vong-kieng-bac'];
  let artTitle = 'Cổ Kính & Trầm Mặc';
  let artSubtitle = 'Phong thái đài các, hoài cổ sâu lắng và đậm chất nghệ thuật';

  if (occasion === 'photoshoot' || occasion === 'festival') {
    artOutfit = 'ao-nhat-binh';
    artColor = 'yellow';
    artStyle = 'traditional';
    artAccessories = ['khan-dong', 'vong-kieng-bac', 'chuoi-ngoc-trai'];
    artTitle = 'Hoàng Triều Kim Sắc';
    artSubtitle = 'Đồ án Loan Phượng cung đình uy nghiêm, dải ngũ sắc cổ tay lộng lẫy';
  } else if (occasion === 'school' || occasion === 'cultural-event') {
    artOutfit = 'vien-linh';
    artColor = 'blue';
    artStyle = 'traditional';
    artAccessories = ['khan-dong'];
    artTitle = 'Đoàn Lĩnh Sĩ Phu';
    artSubtitle = 'Cổ tròn quan phục uy nghiêm, tôn vinh truyền thống hiếu học';
  } else if (occasion === 'wedding') {
    artOutfit = 'ao-nhat-binh';
    artColor = 'red';
    artStyle = 'traditional';
    artAccessories = ['khan-dong', 'vong-kieng-bac', 'chuoi-ngoc-trai'];
    artTitle = 'Hỷ Lễ Hoàng Triều';
    artSubtitle = 'Lễ phục cưới cao quý nhất thời Nguyễn, rạng ngời ngày trọng đại';
  } else {
    artOutfit = 'giao-linh';
    artColor = 'green';
    artStyle = 'romantic';
    artAccessories = ['vong-kieng-bac', 'non-quai-thao'];
    artTitle = 'Giao Lĩnh Rừng Trúc';
    artSubtitle = 'Sắc xanh rêu an yên, cổ đắp chéo thanh tao thời Lý – Trần';
  }

  const helperBuildSuggestion = (
    id: string,
    badge: string,
    title: string,
    subtitle: string,
    outfitId: OutfitId,
    colorId: ColorId,
    styleId: StyleId,
    accessories: string[],
    weatherReason: string,
    occasionReason: string,
    stylistTip: string,
    score: number
  ): StylingSuggestionResult => {
    const outfitNames: Record<OutfitId, string> = {
      'ao-dai': 'Áo dài',
      'ao-tu-than': 'Áo tứ thân',
      'ao-ngu-than': 'Áo ngũ thân',
      'ao-ba-ba': 'Áo bà ba',
      'ao-nhat-binh': 'Áo Nhật Bình',
      'ao-tac': 'Áo Tấc',
      'ao-tay-chen': 'Áo Tay Chẽn',
      'giao-linh': 'Áo Giao Lĩnh',
      'vien-linh': 'Áo Viên Lĩnh',
      'doi-kham': 'Áo Đối Khâm'
    };

    const colorNames: Record<ColorId, { name: string; hex: string }> = {
      red: { name: 'Đỏ son (Hồng hỏa)', hex: '#C23B22' },
      burgundy: { name: 'Đỏ đô / Đỏ trầm', hex: '#6A1A24' },
      yellow: { name: 'Hoàng thổ (Vàng mơ)', hex: '#D4A017' },
      cream: { name: 'Kem ngà (Bạch ngọc)', hex: '#FDFBF7' },
      blue: { name: 'Xanh lam (Thủy thanh)', hex: '#2A52BE' },
      green: { name: 'Xanh lục / Rêu', hex: '#2E6F40' },
      black: { name: 'Đen tuyền (Hắc sắc)', hex: '#1C1917' },
      pastel: { name: 'Hồng phấn (Cánh đào)', hex: '#E8A598' }
    };

    const styleNames: Record<StyleId, string> = {
      traditional: 'Truyền thống thuần túy',
      modern: 'Hiện đại cách tân',
      minimal: 'Tối giản thanh tao',
      romantic: 'Lãng mạn bay bổng',
      street: 'Đường phố phá cách',
      elegant: 'Thanh lịch quý phái'
    };

    const occasionNames: Record<OccasionId, string> = {
      casual: 'Ngày thường & Cà phê',
      school: 'Trường học & Giảng đường',
      'cultural-event': 'Đi làm & Sự kiện trang trọng',
      festival: 'Lễ hội & Tết cổ truyền',
      photoshoot: 'Chụp ảnh & Lookbook',
      wedding: 'Đám cưới & Hôn lễ'
    };

    const accessoryLabels: Record<string, string> = {
      'khan-dong': 'Khăn đóng lụa',
      'vong-kieng-bac': 'Kiềng bạc nguyên khối',
      'non-quai-thao': 'Nón quai thao Kinh Bắc',
      'chuoi-ngoc-trai': 'Chuỗi ngọc trai thanh nhã',
      'sandal-day-manh': 'Sandal quai mảnh',
      'sneakers-retro-trang': 'Sneakers retro trắng'
    };

    return {
      id,
      badge,
      title,
      subtitle,
      outfitId,
      outfitName: outfitNames[outfitId] || outfitId,
      outfitImgKey: outfitId,
      colorId,
      colorName: colorNames[colorId]?.name || colorId,
      colorHex: colorNames[colorId]?.hex || '#991B1E',
      styleId,
      styleName: styleNames[styleId] || styleId,
      occasionId: occasion,
      occasionName: occasionNames[occasion] || occasion,
      accessories,
      accessoryNames: accessories.map((a) => accessoryLabels[a] || a),
      weatherScore: score,
      weatherReason,
      occasionReason,
      stylistTip
    };
  };

  const suggestions: StylingSuggestionResult[] = [
    helperBuildSuggestion(
      'sug-top-pick',
      'Khuyên Dùng Hàng Đầu (Top Pick)',
      topTitle,
      topSubtitle,
      topOutfit,
      topColor,
      topStyle,
      topAccessories,
      topWeatherReason || `Phù hợp nhiệt độ ${forecast.temperature}°C của ${REGIONS_DATA.find((r) => r.id === region)?.name}, chất liệu thoáng ấm vừa phải.`,
      topOccasionReason || 'Chuẩn mực văn hóa và lễ nghi cho dịp này.',
      'Nên đứng thẳng lưng, buông tay tự nhiên để nếp vải rũ phẳng phiu tôn dáng.',
      99
    ),
    helperBuildSuggestion(
      'sug-genz-remix',
      'Gen Z Remix (Năng Động & Cá Tính)',
      genzTitle,
      genzSubtitle,
      genzOutfit,
      genzColor,
      genzStyle,
      genzAccessories,
      `Thiết kế linh hoạt, cử động nhẹ nhàng trong điều kiện ${forecast.condition.toLowerCase()}.`,
      'Phối đồ trẻ trung, phá cách vừa vặn mà vẫn giữ trọn linh hồn di sản.',
      'Kết hợp sneakers trắng giúp bước đi tự tin và tràn đầy năng lượng thanh xuân.',
      96
    ),
    helperBuildSuggestion(
      'sug-heritage-art',
      'Nghệ Thuật Cổ Phong (Quý Phái Đài Các)',
      artTitle,
      artSubtitle,
      artOutfit,
      artColor,
      artStyle,
      artAccessories,
      `Chất liệu dệt truyền thống dày dặn, cản gió nhẹ và giữ phom áo trang trọng trong tiết trời ${forecast.temperature}°C.`,
      'Đậm nét mỹ thuật cổ truyền cung đình và điển chế Đại Việt.',
      'Mang kèm kiềng bạc hoặc chuỗi ngọc trai để tạo điểm nhấn cổ điển quý phái.',
      94
    )
  ];

  return { forecast, suggestions };
}
