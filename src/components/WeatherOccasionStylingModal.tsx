import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  X,
  Sun,
  CloudSun,
  CloudRain,
  Wind,
  Thermometer,
  Calendar,
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  Check,
  CheckCircle2,
  Coffee,
  GraduationCap,
  Landmark,
  Camera,
  HeartHandshake,
  Flame,
  Shirt,
  Palette,
  ShieldCheck,
  ChevronRight,
  Info,
  RefreshCw,
  Eye,
  Layers,
  Wand2
} from 'lucide-react';
import {
  OutfitId,
  ColorId,
  StyleId,
  OccasionId
} from '../types';
import { OUTFITS_DATA } from '../data/outfits';
import { COLORS_DATA } from '../data/colors';
import { useLanguage } from '../context/LanguageContext';
import {
  DayOption,
  RegionId,
  TimeOfDay,
  REGIONS_DATA,
  TIME_OF_DAY_DATA,
  OCCASIONS_SELECTION,
  getWeatherForecast,
  generateWeatherOccasionOutfits,
  StylingSuggestionResult
} from '../data/weatherStylingData';

interface WeatherOccasionStylingModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: 'female' | 'male';
  onApplyStyling: (styling: {
    outfitId: OutfitId;
    colorId: ColorId;
    styleId: StyleId;
    occasionId: OccasionId;
    accessories: string[];
    title: string;
  }) => void;
  onSkipToManual: () => void;
}

export const WeatherOccasionStylingModal: React.FC<WeatherOccasionStylingModalProps> = ({
  isOpen,
  onClose,
  gender,
  onApplyStyling,
  onSkipToManual
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  // Section I: Date & Weather State
  const [dayOption, setDayOption] = useState<DayOption>('today');
  const [customDate, setCustomDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedRegion, setSelectedRegion] = useState<RegionId>('bac');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<TimeOfDay>('sang');

  // Section II: Occasion State
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionId>('casual');

  // Applied animation feedback
  const [appliedSuggestionId, setAppliedSuggestionId] = useState<string | null>(null);

  // Active step view tab: 'wizard' (Step by step selection) | 'results' (View recommendations)
  const [activeStepTab, setActiveStepTab] = useState<'params' | 'results'>('params');

  // Compute live weather forecast
  const forecast = useMemo(() => {
    return getWeatherForecast(selectedRegion, selectedTimeOfDay, dayOption, customDate);
  }, [selectedRegion, selectedTimeOfDay, dayOption, customDate]);

  // Compute 3 recommended outfits
  const { suggestions } = useMemo(() => {
    return generateWeatherOccasionOutfits({
      region: selectedRegion,
      timeOfDay: selectedTimeOfDay,
      dayOption,
      customDate,
      occasion: selectedOccasion,
      gender
    });
  }, [selectedRegion, selectedTimeOfDay, dayOption, customDate, selectedOccasion, gender]);

  if (!isOpen) return null;

  // Format display string for selected date
  const getDisplayDateString = () => {
    const now = new Date();
    if (dayOption === 'today') {
      const weekdaysVi = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const weekdaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dateNum = String(now.getDate()).padStart(2, '0');
      const monthNum = String(now.getMonth() + 1).padStart(2, '0');
      return isEn
        ? `Today (${weekdaysEn[now.getDay()]}, ${dateNum}/${monthNum})`
        : `Hôm nay (${weekdaysVi[now.getDay()]}, ${dateNum}/${monthNum})`;
    }
    if (dayOption === 'tomorrow') {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      const weekdaysVi = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const weekdaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dateNum = String(tomorrow.getDate()).padStart(2, '0');
      const monthNum = String(tomorrow.getMonth() + 1).padStart(2, '0');
      return isEn
        ? `Tomorrow (${weekdaysEn[tomorrow.getDay()]}, ${dateNum}/${monthNum})`
        : `Ngày mai (${weekdaysVi[tomorrow.getDay()]}, ${dateNum}/${monthNum})`;
    }
    if (customDate) {
      const parts = customDate.split('-');
      if (parts.length === 3) {
        return isEn
          ? `Date ${parts[2]}/${parts[1]}/${parts[0]}`
          : `Ngày ${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    return isEn ? 'Custom Date' : 'Ngày tùy chọn';
  };

  const handleApplyPreset = (sug: StylingSuggestionResult) => {
    setAppliedSuggestionId(sug.id);
    onApplyStyling({
      outfitId: sug.outfitId,
      colorId: sug.colorId,
      styleId: sug.styleId,
      occasionId: sug.occasionId,
      accessories: sug.accessories,
      title: sug.title
    });
    setTimeout(() => {
      onClose();
    }, 550);
  };

  // Weather icon renderer
  const renderWeatherIcon = (type: string, className = 'w-5 h-5') => {
    switch (type) {
      case 'sunny':
        return <Sun className={`${className} text-[#D97706] animate-spin-slow`} />;
      case 'warm':
        return <Sun className={`${className} text-[#DC2626]`} />;
      case 'cool':
        return <Thermometer className={`${className} text-[#2563EB]`} />;
      case 'breezy':
        return <Wind className={`${className} text-[#0D9488]`} />;
      case 'rain-shower':
        return <CloudRain className={`${className} text-[#0284C7]`} />;
      default:
        return <CloudSun className={`${className} text-[#D97706]`} />;
    }
  };

  const getOccasionIcon = (id: string) => {
    switch (id) {
      case 'casual':
        return <Coffee className="w-4 h-4 text-[#C8973E]" />;
      case 'school':
        return <GraduationCap className="w-4 h-4 text-[#2563EB]" />;
      case 'office':
        return <Landmark className="w-4 h-4 text-[#475569]" />;
      case 'festival':
        return <Flame className="w-4 h-4 text-[#DC2626]" />;
      case 'photoshoot':
        return <Camera className="w-4 h-4 text-[#9333EA]" />;
      case 'wedding':
        return <HeartHandshake className="w-4 h-4 text-[#E11D48]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#991B1E]" />;
    }
  };

  // Outfit image lookup
  const getOutfitImage = (id: string) => {
    const item = OUTFITS_DATA.find((o) => o.id === id);
    return item?.image || OUTFITS_DATA[0].image;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DECBB3] overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =====================================================================
            MODAL HEADER: EDITORIAL BRANDING & SKIP BUTTON
           ===================================================================== */}
        <div className="px-6 sm:px-8 pt-6 pb-4 bg-gradient-to-r from-[#FFFDF9] via-[#FAF6ED] to-[#F5ECE0] border-b border-[#E6DAC8] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#991B1E]/10 text-[#991B1E] border border-[#991B1E]/20">
                <Sparkles className="w-3 h-3 text-[#C8973E] animate-pulse" />
                {isEn ? 'Smart Outfit Suggestion' : 'Gợi Ý Phối Đồ Thông Minh'}
              </span>
              <span className="text-xs text-[#8C7A6B] hidden sm:inline">
                {isEn ? 'Weather & Occasion' : 'Thời Tiết & Dịp Mặc'}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {isEn ? 'Wearing Date, Weather & Occasion' : 'Chọn Ngày Mặc, Thời Tiết & Dịp'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4F45]">
              {isEn
                ? 'Discover tailored Vietnamese heritage attires matched with regional climate patterns and event decorum.'
                : 'Hệ thống sẽ tra cứu khí hậu vùng miền và đề xuất các set Việt phục chuẩn mực, thoáng mát và thanh lịch nhất.'}
            </p>
          </div>

          {/* Action buttons: Skip & Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSkipToManual}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#7A6B5F] hover:text-[#991B1E] hover:bg-[#EFE5D6] border border-[#DDCDBB] transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs active:scale-95"
              title={isEn ? 'Skip suggestion and go directly to manual styling' : 'Bỏ qua phần gợi ý và đến ngay giao diện tự phối đồ'}
            >
              <span>{isEn ? 'Skip & Style Manually' : 'Bỏ qua & Tự phối đồ'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#5C4F45] hover:text-[#991B1E] flex items-center justify-center shadow-xs transition-colors cursor-pointer border border-[#E6DAC8]"
              aria-label={isEn ? 'Close suggestion modal' : 'Đóng cửa sổ gợi ý'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Navigation Pill Indicator */}
        <div className="px-6 sm:px-8 py-2.5 bg-[#F2ECE0] border-b border-[#E6DAC8] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveStepTab('params')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeStepTab === 'params'
                  ? 'bg-[#991B1E] text-white shadow-2xs'
                  : 'text-[#68584B] hover:text-[#1C1917] hover:bg-white/60'
              }`}
            >
              <span>{isEn ? '1. Date, Region & Occasion' : '1. Ngày, Vùng Miền & Dịp Mặc'}</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-[#B8A793]" />

            <button
              type="button"
              onClick={() => setActiveStepTab('results')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeStepTab === 'results'
                  ? 'bg-[#991B1E] text-white shadow-2xs'
                  : 'text-[#68584B] hover:text-[#1C1917] hover:bg-white/60'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-[#C8973E]" />
              <span>
                {isEn
                  ? `2. Recommended Outfits (${suggestions.length})`
                  : `2. Kết Quả Phối Đồ Gợi Ý (${suggestions.length})`}
              </span>
            </button>
          </div>

          <div className="text-xs text-[#7A6B5F] font-medium hidden md:flex items-center gap-2">
            <span>{isEn ? 'Forecast:' : 'Dự báo:'}</span>
            <span className="font-bold text-[#1C1917] flex items-center gap-1">
              {renderWeatherIcon(forecast.weatherType, 'w-3.5 h-3.5')}
              {forecast.temperature}°C · {forecast.condition}
            </span>
          </div>
        </div>

        {/* =====================================================================
            MODAL CONTENT BODY (Scrollable)
           ===================================================================== */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {activeStepTab === 'params' ? (
            <div className="space-y-8">
              {/* =================================================================
                  PHẦN I: NGÀY MẶC & THỜI TIẾT
                 ================================================================= */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#E8DAC7] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#991B1E] text-white text-xs font-bold flex items-center justify-center">
                      I
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                      {isEn ? 'Wearing Date & Regional Weather' : 'Ngày Mặc & Thời Tiết'}
                    </h3>
                  </div>
                  <span className="text-xs text-[#8C7A6B] italic hidden sm:inline">
                    {isEn ? 'Accurate weather tailored to Vietnamese climates' : 'Xác định thời tiết chính xác theo vùng miền'}
                  </span>
                </div>

                {/* 1. Ngày dự định mặc */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#991B1E]" />
                    <span>{isEn ? '1. Planned Wearing Date:' : '1. Ngày dự định mặc:'}</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDayOption('today')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        dayOption === 'today'
                          ? 'bg-[#FFFDF9] border-[#991B1E] ring-2 ring-[#991B1E]/20 shadow-xs'
                          : 'bg-white/60 border-[#DECBB3] hover:bg-white hover:border-[#991B1E]/40 text-[#4A3B32]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#1C1917]">{isEn ? 'Today' : 'Hôm nay'}</div>
                        <div className="text-[11px] text-[#7A6B5F]">{isEn ? 'Wear right away' : 'Mặc liền trong ngày'}</div>
                      </div>
                      {dayOption === 'today' && (
                        <CheckCircle2 className="w-4 h-4 text-[#991B1E]" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDayOption('tomorrow')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        dayOption === 'tomorrow'
                          ? 'bg-[#FFFDF9] border-[#991B1E] ring-2 ring-[#991B1E]/20 shadow-xs'
                          : 'bg-white/60 border-[#DECBB3] hover:bg-white hover:border-[#991B1E]/40 text-[#4A3B32]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#1C1917]">{isEn ? 'Tomorrow' : 'Ngày mai'}</div>
                        <div className="text-[11px] text-[#7A6B5F]">{isEn ? 'Plan outfit in advance' : 'Chuẩn bị trước trang phục'}</div>
                      </div>
                      {dayOption === 'tomorrow' && (
                        <CheckCircle2 className="w-4 h-4 text-[#991B1E]" />
                      )}
                    </button>

                    <div
                      className={`p-2.5 rounded-xl border transition-all flex flex-col justify-center ${
                        dayOption === 'custom'
                          ? 'bg-[#FFFDF9] border-[#991B1E] ring-2 ring-[#991B1E]/20 shadow-xs'
                          : 'bg-white/60 border-[#DECBB3] hover:bg-white text-[#4A3B32]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#1C1917]">
                          {isEn ? 'Pick another date:' : 'Chọn ngày khác:'}
                        </span>
                        {dayOption === 'custom' && (
                          <CheckCircle2 className="w-4 h-4 text-[#991B1E]" />
                        )}
                      </div>
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => {
                          setCustomDate(e.target.value);
                          setDayOption('custom');
                        }}
                        onFocus={() => setDayOption('custom')}
                        className="w-full text-xs bg-white px-2 py-1 rounded-md border border-[#D5C4AF] text-[#1C1917] focus:outline-none focus:border-[#991B1E]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Địa điểm (Vùng miền) */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#991B1E]" />
                    <span>{isEn ? '2. Location (Region):' : '2. Địa điểm (Vùng miền):'}</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {REGIONS_DATA.map((reg) => {
                      const isSelected = selectedRegion === reg.id;
                      const localizedRegionName = isEn
                        ? reg.id === 'bac'
                          ? 'Northern Vietnam'
                          : reg.id === 'trung'
                          ? 'Central Vietnam'
                          : 'Southern Vietnam'
                        : reg.name;

                      return (
                        <button
                          key={reg.id}
                          type="button"
                          onClick={() => setSelectedRegion(reg.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#FFFDF9] border-[#991B1E] ring-2 ring-[#991B1E]/25 shadow-sm'
                              : 'bg-white/60 border-[#DECBB3] hover:bg-white hover:border-[#991B1E]/40'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-serif font-bold text-sm text-[#1C1917]">
                                {localizedRegionName}
                              </span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-[#991B1E]" />
                              )}
                            </div>
                            <div className="text-xs font-medium text-[#991B1E] mb-0.5">
                              {reg.subLabel}
                            </div>
                            <div className="text-[11px] text-[#7A6B5F] line-clamp-1">
                              {reg.landmark}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Thời điểm mặc trong ngày */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#991B1E]" />
                    <span>{isEn ? '3. Time of Day:' : '3. Thời điểm mặc trong ngày:'}</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {TIME_OF_DAY_DATA.map((tod) => {
                      const isSelected = selectedTimeOfDay === tod.id;
                      const localizedLabel = isEn
                        ? tod.id === 'sang'
                          ? 'Morning'
                          : tod.id === 'trua'
                          ? 'Noon'
                          : tod.id === 'chieu'
                          ? 'Afternoon'
                          : 'Evening'
                        : tod.label;

                      return (
                        <button
                          key={tod.id}
                          type="button"
                          onClick={() => setSelectedTimeOfDay(tod.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FFFDF9] border-[#991B1E] ring-2 ring-[#991B1E]/20 shadow-xs'
                              : 'bg-white/60 border-[#DECBB3] hover:bg-white hover:border-[#991B1E]/40'
                          }`}
                        >
                          <div className="text-xs font-bold text-[#1C1917] mb-0.5 flex items-center justify-between">
                            <span>{localizedLabel}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#991B1E]" />}
                          </div>
                          <div className="text-[10px] text-[#991B1E] font-mono">
                            {tod.timeRange}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* =================================================================
                    LIVE WEATHER FORECAST CARD & CLOTHING ADVICE
                   ================================================================= */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F3E8D8] border border-[#DFCBB5] shadow-xs space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DAC7] pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs border border-[#E5D7C3] flex items-center justify-center shrink-0">
                        {renderWeatherIcon(forecast.weatherType, 'w-6 h-6')}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#8C7A6B] flex items-center gap-1.5">
                          <span>{isEn ? 'Weather Forecast:' : 'Dự Báo Thời Tiết:'}</span>
                          <span className="font-bold text-[#991B1E]">
                            {isEn
                              ? selectedRegion === 'bac'
                                ? 'Northern Vietnam'
                                : selectedRegion === 'trung'
                                ? 'Central Vietnam'
                                : 'Southern Vietnam'
                              : REGIONS_DATA.find((r) => r.id === selectedRegion)?.name}{' '}
                            · {getDisplayDateString()}
                          </span>
                        </div>
                        <div className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] flex items-baseline gap-2">
                          <span>{forecast.temperature}°C</span>
                          <span className="text-xs font-normal text-[#5C4F45]">
                            ({isEn ? 'Feels like' : 'Cảm giác như'} {forecast.feelsLike}°C) · {forecast.condition}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[#5C4F45] bg-white/70 px-3 py-1.5 rounded-xl border border-[#E8DAC7]">
                      <div>
                        <span className="text-[#8C7A6B] block text-[10px]">{isEn ? 'Humidity' : 'Độ ẩm'}</span>
                        <span className="font-bold">{forecast.humidity}%</span>
                      </div>
                      <div className="w-px h-6 bg-[#E0D0BE]" />
                      <div>
                        <span className="text-[#8C7A6B] block text-[10px]">{isEn ? 'Wind' : 'Gió'}</span>
                        <span className="font-bold">{forecast.windSpeed}</span>
                      </div>
                      <div className="w-px h-6 bg-[#E0D0BE]" />
                      <div>
                        <span className="text-[#8C7A6B] block text-[10px]">{isEn ? 'UV' : 'Tia UV'}</span>
                        <span className="font-bold">{forecast.uvIndex}</span>
                      </div>
                    </div>
                  </div>

                  {/* Weather-based Clothing Guidance */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#991B1E] uppercase tracking-wider">
                      <Shirt className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Clothing & fabric advice for this weather:' : 'Gợi ý loại trang phục & chất liệu theo thời tiết này:'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#3E342B] leading-relaxed">
                      {forecast.clothingAdvice}
                    </p>

                    {/* Recommended Fabrics Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-[#7A6B5F] font-semibold">
                        {isEn ? 'Recommended fabrics:' : 'Chất liệu khuyên dùng:'}
                      </span>
                      {forecast.recommendedFabrics.map((fabric, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white text-[#7A1E20] border border-[#DECBB3]"
                        >
                          ✦ {fabric}
                        </span>
                      ))}
                    </div>

                    {forecast.weatherAlert && (
                      <div className="text-xs text-[#B45309] bg-[#FEF3C7]/80 px-3 py-1.5 rounded-lg border border-[#FCD34D] flex items-center gap-1.5 mt-2">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>{forecast.weatherAlert}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* =================================================================
                  PHẦN II: DỊP MẶC
                 ================================================================= */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-[#E8DAC7] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#991B1E] text-white text-xs font-bold flex items-center justify-center">
                      II
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                      {isEn ? 'Select Occasion' : 'Chọn Dịp Mặc'}
                    </h3>
                  </div>
                  <span className="text-xs text-[#8C7A6B] italic hidden sm:inline">
                    {isEn ? 'Define style and cultural decorum' : 'Định hình phong cách và chuẩn mực văn hóa'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {OCCASIONS_SELECTION.map((occ) => {
                    const isSelected = selectedOccasion === occ.id;
                    const localizedLabel = isEn
                      ? occ.id === 'casual'
                        ? 'Everyday & Cafe'
                        : occ.id === 'school'
                        ? 'School & Academy'
                        : occ.id === 'cultural-event'
                        ? 'Work & Formal Events'
                        : occ.id === 'festival'
                        ? 'Festivals & Holidays'
                        : occ.id === 'photoshoot'
                        ? 'Photoshoot & Lookbook'
                        : 'Wedding & Engagement'
                      : occ.label;

                    const localizedSub = isEn
                      ? occ.id === 'casual'
                        ? 'Street stroll, meeting friends, coffee, youthful heritage'
                        : occ.id === 'school'
                        ? 'Ceremonies, university seminars, cultural presentations'
                        : occ.id === 'cultural-event'
                        ? 'Cultural workplace, diplomacy, heritage symposium'
                        : occ.id === 'festival'
                        ? 'Spring festivals, temple visits, ancestor celebrations'
                        : occ.id === 'photoshoot'
                        ? 'Yearbook, cinematic nostalgia concept, artistic shoot'
                        : 'Bridal party, wedding ceremony, traditional solemnity'
                      : occ.sub;

                    return (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => setSelectedOccasion(occ.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FFFDF9] border-[#991B1E] ring-2 ring-[#991B1E]/20 shadow-xs'
                            : 'bg-white/70 border-[#DECBB3] hover:bg-white hover:border-[#991B1E]/40'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-serif font-bold text-sm text-[#1C1917] flex items-center gap-1.5">
                              {getOccasionIcon(occ.iconName)}
                              <span>{localizedLabel}</span>
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-[#991B1E]" />
                            )}
                          </div>
                          <p className="text-xs text-[#6B5A4D] line-clamp-2 leading-relaxed">
                            {localizedSub}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Next to Step 2 (View Recommendations) */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E8DAC7]">
                <button
                  type="button"
                  onClick={onSkipToManual}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-[#5C4F45] hover:bg-[#EFE5D6] transition-colors cursor-pointer"
                >
                  {isEn ? 'Skip suggestion — Style manually now' : 'Bỏ qua gợi ý — Tự phối đồ ngay'}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStepTab('results')}
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-bold text-white bg-[#991B1E] hover:bg-[#781316] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>
                    {isEn
                      ? `View Suggested Outfits (${suggestions.length} Options)`
                      : `Xem Kết Quả Phối Đồ Gợi Ý (${suggestions.length} Phương Án)`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* =================================================================
                PHẦN III: KẾT QUẢ PHỐI ĐỒ DỰA TRÊN THỜI TIẾT & DỊP
               ================================================================= */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DAC7] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#991B1E] text-white text-xs font-bold flex items-center justify-center">
                    III
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                      {isEn
                        ? `Suggested Outfits (${suggestions.length} Curated Options)`
                        : `Kết Quả Phối Đồ Phù Hợp (${suggestions.length} Phương Án)`}
                    </h3>
                    <p className="text-xs text-[#7A6B5F]">
                      {isEn ? 'Tailored for: ' : 'Dành cho: '}
                      <strong className="text-[#991B1E]">
                        {isEn
                          ? selectedRegion === 'bac'
                            ? 'Northern Vietnam'
                            : selectedRegion === 'trung'
                            ? 'Central Vietnam'
                            : 'Southern Vietnam'
                          : REGIONS_DATA.find((r) => r.id === selectedRegion)?.name}
                      </strong>{' '}
                      · {getDisplayDateString()} ·{' '}
                      {isEn
                        ? selectedTimeOfDay === 'sang'
                          ? 'Morning'
                          : selectedTimeOfDay === 'trua'
                          ? 'Noon'
                          : selectedTimeOfDay === 'chieu'
                          ? 'Afternoon'
                          : 'Evening'
                        : TIME_OF_DAY_DATA.find((t) => t.id === selectedTimeOfDay)?.label}{' '}
                      ({forecast.temperature}°C) ·{' '}
                      {isEn ? 'Occasion: ' : 'Dịp '}
                      <strong className="text-[#1C1917]">
                        {isEn
                          ? selectedOccasion === 'casual'
                            ? 'Everyday & Cafe'
                            : selectedOccasion === 'school'
                            ? 'School & Academy'
                            : selectedOccasion === 'cultural-event'
                            ? 'Work & Formal Events'
                            : selectedOccasion === 'festival'
                            ? 'Festivals & Holidays'
                            : selectedOccasion === 'photoshoot'
                            ? 'Photoshoot & Lookbook'
                            : 'Wedding & Engagement'
                          : OCCASIONS_SELECTION.find((o) => o.id === selectedOccasion)?.label}
                      </strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStepTab('params')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#7A6B5F] hover:text-[#1C1917] bg-white border border-[#DACBB7] hover:bg-[#F2ECE0] transition-colors cursor-pointer inline-flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Change weather / occasion' : 'Đổi thời tiết / dịp khác'}</span>
                </button>
              </div>

              {/* 3 Suggestion Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {suggestions.map((sug, idx) => {
                  const isApplying = appliedSuggestionId === sug.id;
                  const outfitImg = getOutfitImage(sug.outfitId);

                  return (
                    <div
                      key={sug.id}
                      className="rounded-2xl bg-white border border-[#E0D2C0] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#991B1E]/50"
                    >
                      {/* Top Visual Plate & Badge */}
                      <div className="relative aspect-[16/11] bg-[#221A15] overflow-hidden">
                        <img
                          src={outfitImg}
                          alt={sug.outfitName}
                          className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                        {/* Top Badge */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#991B1E] shadow-sm border border-black/10">
                            {sug.badge}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1C1917]/80 text-[#F5D587] backdrop-blur-xs border border-white/20">
                            {sug.weatherScore}% {isEn ? 'Recommended' : 'Khuyên dùng'}
                          </span>
                        </div>

                        {/* Bottom Overlay Title on Image */}
                        <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                          <div className="font-serif text-lg font-bold leading-tight drop-shadow-sm">
                            {sug.title}
                          </div>
                          <div className="text-xs text-[#F2ECE0] font-medium line-clamp-1 opacity-90">
                            {sug.outfitName} · {sug.colorName}
                          </div>
                        </div>
                      </div>

                      {/* Card Body Details */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <p className="text-xs text-[#5C4F45] leading-relaxed">
                            {sug.subtitle}
                          </p>

                          {/* Color, Style & Accessories Spec Bar */}
                          <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#EBE0CF] space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[#7A6B5F] font-medium">{isEn ? 'Color:' : 'Màu sắc:'}</span>
                              <div className="flex items-center gap-1.5 font-bold text-[#1C1917]">
                                <span
                                  className="w-3 h-3 rounded-full border border-black/20"
                                  style={{ backgroundColor: sug.colorHex }}
                                />
                                <span>{sug.colorName}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[#7A6B5F] font-medium">{isEn ? 'Style:' : 'Phong cách:'}</span>
                              <span className="font-bold text-[#991B1E]">{sug.styleName}</span>
                            </div>

                            <div>
                              <span className="text-[#7A6B5F] font-medium block mb-1">
                                {isEn ? 'Paired accessories:' : 'Phụ kiện phối kèm:'}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {sug.accessoryNames.map((acc, aIdx) => (
                                  <span
                                    key={aIdx}
                                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white text-[#4A3B32] border border-[#DECBB3]"
                                  >
                                    + {acc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Weather & Occasion Reasons */}
                          <div className="space-y-2 text-xs">
                            <div className="p-2.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] leading-relaxed">
                              <strong className="block text-[11px] text-[#1D4ED8] mb-0.5">
                                {isEn ? '🌤️ Why it matches this weather?' : '🌤️ Tại sao hợp thời tiết này?'}
                              </strong>
                              {sug.weatherReason}
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[#991B1E] leading-relaxed">
                              <strong className="block text-[11px] text-[#B91C1C] mb-0.5">
                                {isEn ? `🏛️ Why it matches this occasion?` : `🏛️ Tại sao hợp dịp ${sug.occasionName}?`}
                              </strong>
                              {sug.occasionReason}
                            </div>
                          </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => handleApplyPreset(sug)}
                            disabled={isApplying}
                            className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                              isApplying
                                ? 'bg-[#15803D] text-white'
                                : 'bg-[#991B1E] hover:bg-[#781316] text-white hover:shadow-md active:scale-98'
                            }`}
                          >
                            {isApplying ? (
                              <>
                                <Check className="w-4 h-4 animate-bounce" />
                                <span>{isEn ? 'APPLIED TO STUDIO!' : 'ĐÃ ÁP DỤNG VÀO STUDIO!'}</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5 text-[#F5D587]" />
                                <span>{isEn ? 'APPLY THIS OUTFIT TO STUDIO' : 'ÁP DỤNG PHỐI ĐỒ NÀY VÀO STUDIO'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Skip Action Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E8DAC7]">
                <p className="text-xs text-[#7A6B5F]">
                  {isEn
                    ? 'Want to try something different? You can freely customize from scratch in the studio.'
                    : 'Chưa ưng ý các phương án trên? Bạn có thể tự do sáng tạo từ đầu trong phòng phối đồ.'}
                </p>

                <button
                  type="button"
                  onClick={onSkipToManual}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-[#1C1917] bg-[#EFE5D6] hover:bg-[#E3D4C0] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{isEn ? 'Skip suggestion — Style manually now' : 'Bỏ qua gợi ý — Tự phối đồ ngay'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
