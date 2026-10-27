import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  Sliders,
  Sparkles,
  X,
  Wind,
  Disc,
  Info,
  Radio,
  Bell,
  Activity
} from 'lucide-react';
import {
  traditionalAudio,
  TRADITIONAL_TRACKS,
  TraditionalTrackId
} from '../services/traditionalAudioService';

interface TraditionalMusicControllerProps {
  variant?: 'compact' | 'floating' | 'full';
  dropDirection?: 'down' | 'up' | 'auto';
  className?: string;
}

export const TraditionalMusicController: React.FC<TraditionalMusicControllerProps> = ({
  variant = 'compact',
  dropDirection = 'auto',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(traditionalAudio.getIsPlaying());
  const [currentTrackId, setCurrentTrackId] = useState<TraditionalTrackId>(
    traditionalAudio.getCurrentTrack()
  );
  const [volume, setVolume] = useState(traditionalAudio.getVolume());
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [effectiveDirection, setEffectiveDirection] = useState<'down' | 'up'>(
    dropDirection === 'up' ? 'up' : 'down'
  );
  const [showToast, setShowToast] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Determine popover direction when opening
  useEffect(() => {
    if (isPanelOpen) {
      if (dropDirection === 'up') {
        setEffectiveDirection('up');
      } else if (dropDirection === 'down') {
        setEffectiveDirection('down');
      } else if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        // If within 460px of bottom, open upward
        if (window.innerHeight - rect.bottom < 460) {
          setEffectiveDirection('up');
        } else {
          setEffectiveDirection('down');
        }
      }
    }
  }, [isPanelOpen, dropDirection]);

  // Sync with audio engine singleton
  useEffect(() => {
    const unsubscribe = traditionalAudio.subscribe(() => {
      setIsPlaying(traditionalAudio.getIsPlaying());
      setCurrentTrackId(traditionalAudio.getCurrentTrack());
      setVolume(traditionalAudio.getVolume());
    });
    return unsubscribe;
  }, []);

  // Close panel on outside click
  useEffect(() => {
    if (!isPanelOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPanelOpen]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    traditionalAudio.toggle();
    if (!isPlaying) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const handleSelectTrack = (trackId: TraditionalTrackId) => {
    traditionalAudio.setTrack(trackId);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    traditionalAudio.setVolume(newVol);
  };

  const handleToggleMute = () => {
    if (volume > 0) {
      traditionalAudio.setVolume(0);
    } else {
      traditionalAudio.setVolume(0.65);
    }
  };

  const handlePreview = (type: 'trong-dong' | 'dan-bau' | 'dan-tranh' | 'sao-truc' | 'chime') => {
    traditionalAudio.previewInstrument(type);
    setActivePreview(type);
    setTimeout(() => setActivePreview(null), 600);
  };

  const currentTrack =
    TRADITIONAL_TRACKS.find((t) => t.id === currentTrackId) || TRADITIONAL_TRACKS[0];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Toast alert on play */}
      {showToast && isPlaying && (
        <div className="fixed top-20 right-6 z-50 bg-[#1C1917]/95 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs backdrop-blur-md border border-[#C8973E]/40 animate-in slide-in-from-top-3">
          <Sparkles className="w-4 h-4 text-[#F5D587] shrink-0" />
          <div>
            <div className="font-bold text-[#F5D587]">{currentTrack.title}</div>
            <div className="text-[10px] text-[#D8C7B2]">{currentTrack.subtitle}</div>
          </div>
        </div>
      )}

      {/* Main Interactive Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className={`group relative px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-2xs select-none ${
          isPlaying
            ? 'bg-[#FFFDF9] border-[#C8973E] text-[#991B1E] shadow-[0_2px_12px_rgba(200,151,62,0.25)] ring-1 ring-[#C8973E]/60'
            : 'bg-white/70 hover:bg-white border-[#DACBB7] text-[#594C42] hover:text-[#1C1917]'
        }`}
        title={
          isPlaying
            ? 'Đang phát nhạc cổ truyền (Bấm để chọn Sáo, Đàn Tranh, Đàn Bầu, Trống Đồng)'
            : 'Bật nhạc nền cổ truyền thư giãn'
        }
        aria-label="Điều khiển nhạc nền cổ truyền"
      >
        {/* Animated Equalizer Wave Bars or Music Icon */}
        <div className="flex items-center gap-0.5 h-3.5 w-4 justify-center shrink-0">
          {isPlaying ? (
            <>
              <span
                className="w-0.5 bg-[#991B1E] rounded-full animate-bounce h-3"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="w-0.5 bg-[#C8973E] rounded-full animate-bounce h-2"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="w-0.5 bg-[#991B1E] rounded-full animate-bounce h-3.5"
                style={{ animationDelay: '300ms' }}
              />
              <span
                className="w-0.5 bg-[#C8973E] rounded-full animate-bounce h-2.5"
                style={{ animationDelay: '75ms' }}
              />
            </>
          ) : (
            <Music className="w-3.5 h-3.5 text-[#8C7662] group-hover:text-[#991B1E] transition-colors" />
          )}
        </div>

        {/* Text label */}
        <div className="flex items-center gap-1.5 text-left">
          <span className="hidden sm:inline text-[11px] font-semibold">
            {isPlaying ? currentTrack.title : 'Nhạc Cổ Truyền'}
          </span>
          <span className="sm:hidden text-[11px]">
            {isPlaying ? 'Nhạc' : 'Nhạc Cổ'}
          </span>
        </div>

        {/* Quick Play/Pause Action Indicator on button */}
        <span
          onClick={handleTogglePlay}
          className={`p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer ml-0.5 ${
            isPlaying ? 'text-[#991B1E]' : 'text-[#8C7662] hover:text-[#991B1E]'
          }`}
          title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc cổ truyền'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
        </span>
      </button>

      {/* Expanded Control Popover Panel */}
      {isPanelOpen && (
        <div
          ref={panelRef}
          className={`absolute right-0 z-50 w-84 sm:w-92 bg-[#FFFDF9] rounded-2xl border border-[#D8C7B2] shadow-[0_16px_40px_rgba(28,25,23,0.2)] p-4 text-[#1C1917] animate-in fade-in zoom-in-95 duration-150 select-none max-h-[88vh] overflow-y-auto ${
            effectiveDirection === 'up' ? 'bottom-full mb-2.5' : 'top-full mt-2'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8DAC7]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#991B1E]/10 text-[#991B1E] flex items-center justify-center">
                <Disc
                  className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '8s' }}
                />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1C1917] leading-tight">
                  Nhạc Khí Dân Tộc Việt Nam
                </h4>
                <p className="text-[10px] text-[#7A695B]">
                  Đàn Bầu • Đàn Tranh • Trống Đồng • Sáo Trúc
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPanelOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#F2ECE0] text-[#7A695B] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Playing Track Banner */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#FAF5EC] to-[#F5EBDD] border border-[#E0D2BE] mb-3 flex items-center justify-between gap-3 shadow-2xs">
            <div className="min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#991B1E] flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#991B1E] shrink-0" />
                <span>{isPlaying ? 'ĐANG PHÁT • AMBIENT DI SẢN' : 'ĐÃ TẠM DỪNG'}</span>
              </span>
              <div className="font-serif text-sm font-bold text-[#1C1917] truncate mt-0.5">
                {currentTrack.title}
              </div>
              <div className="text-[10px] text-[#6E5D50] truncate">
                {currentTrack.subtitle}
              </div>
            </div>

            {/* Big Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={() => handleTogglePlay()}
              className="w-10 h-10 rounded-full bg-[#991B1E] hover:bg-[#781316] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc cổ truyền'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* INTERACTIVE SOUNDBOARD: GÕ & GẢY THỬ ÂM SẮC NHẠC CỤ */}
          <div className="mb-3.5 p-2.5 rounded-xl bg-[#FAF5EB] border border-[#E6DAC7]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1E] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C8973E]" />
                <span>GÕ THỬ ÂM THANH NHẠC CỤ</span>
              </span>
              <span className="text-[9px] text-[#7A695B]">Chạm để nghe nốt mẫu</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {/* Trống Đồng Button */}
              <button
                type="button"
                onClick={() => handlePreview('trong-dong')}
                className={`p-2 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-center border hover:scale-103 active:scale-95 ${
                  activePreview === 'trong-dong'
                    ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-sm animate-gentle-shake'
                    : 'bg-white hover:bg-[#FFFDF9] border-[#DECBB4] text-[#1C1917]'
                }`}
                title="Gõ tiếng Trống Đồng Đông Sơn trầm hùng"
              >
                <span className="text-base leading-none mb-1">🥁</span>
                <span className="text-[9px] font-bold truncate max-w-full">Trống Đồng</span>
                <span className={`text-[8px] truncate ${activePreview === 'trong-dong' ? 'text-[#F5D587]' : 'text-[#7A695B]'}`}>
                  Âm trầm
                </span>
              </button>

              {/* Đàn Bầu Button */}
              <button
                type="button"
                onClick={() => handlePreview('dan-bau')}
                className={`p-2 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-center border hover:scale-103 active:scale-95 ${
                  activePreview === 'dan-bau'
                    ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-sm animate-gentle-shake'
                    : 'bg-white hover:bg-[#FFFDF9] border-[#DECBB4] text-[#1C1917]'
                }`}
                title="Gảy tiếng Đàn Bầu ngân nga uốn nốt"
              >
                <span className="text-base leading-none mb-1">🪕</span>
                <span className="text-[9px] font-bold truncate max-w-full">Đàn Bầu</span>
                <span className={`text-[8px] truncate ${activePreview === 'dan-bau' ? 'text-[#F5D587]' : 'text-[#7A695B]'}`}>
                  Luyến láy
                </span>
              </button>

              {/* Đàn Tranh Button */}
              <button
                type="button"
                onClick={() => handlePreview('dan-tranh')}
                className={`p-2 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-center border hover:scale-103 active:scale-95 ${
                  activePreview === 'dan-tranh'
                    ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-sm animate-gentle-shake'
                    : 'bg-white hover:bg-[#FFFDF9] border-[#DECBB4] text-[#1C1917]'
                }`}
                title="Gảy tiếng Đàn Tranh trong vắt"
              >
                <span className="text-base leading-none mb-1">🎼</span>
                <span className="text-[9px] font-bold truncate max-w-full">Đàn Tranh</span>
                <span className={`text-[8px] truncate ${activePreview === 'dan-tranh' ? 'text-[#F5D587]' : 'text-[#7A695B]'}`}>
                  16 dây
                </span>
              </button>

              {/* Sáo Trúc Button */}
              <button
                type="button"
                onClick={() => handlePreview('sao-truc')}
                className={`p-2 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-center border hover:scale-103 active:scale-95 ${
                  activePreview === 'sao-truc'
                    ? 'bg-[#991B1E] text-white border-[#991B1E] shadow-sm animate-gentle-shake'
                    : 'bg-white hover:bg-[#FFFDF9] border-[#DECBB4] text-[#1C1917]'
                }`}
                title="Thổi tiếng Sáo Trúc thanh tao"
              >
                <span className="text-base leading-none mb-1">🎋</span>
                <span className="text-[9px] font-bold truncate max-w-full">Sáo Trúc</span>
                <span className={`text-[8px] truncate ${activePreview === 'sao-truc' ? 'text-[#F5D587]' : 'text-[#7A695B]'}`}>
                  Thanh thoát
                </span>
              </button>
            </div>
          </div>

          {/* Track Selection List */}
          <div className="space-y-1.5 mb-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A695B] block px-0.5">
              CHỌN BẢN NHẠC NỀN CỔ TRUYỀN ({TRADITIONAL_TRACKS.length}):
            </span>

            {TRADITIONAL_TRACKS.map((track) => {
              const isSelected = track.id === currentTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => handleSelectTrack(track.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-white border-[#C8973E] shadow-xs ring-1 ring-[#C8973E]/50'
                      : 'bg-white/50 border-[#E8DAC7] hover:bg-white hover:border-[#DACBB7]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#1C1917]">
                        {track.title}
                      </span>
                      {isSelected && isPlaying && (
                        <span className="w-2 h-2 rounded-full bg-[#991B1E] animate-ping" />
                      )}
                    </div>
                    <div className="text-[10px] text-[#7A695B] truncate mt-0.5">
                      {track.scaleDescription}
                    </div>
                  </div>

                  <span
                    className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      isSelected
                        ? 'bg-[#991B1E]/10 text-[#991B1E]'
                        : 'bg-[#EFE6D8] text-[#6E5D50]'
                    }`}
                  >
                    {track.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="p-2.5 rounded-xl bg-white border border-[#E5D7C5] mb-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#594C42] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>Âm lượng nhạc nền:</span>
              </span>
              <span className="font-bold text-[#991B1E]">
                {Math.round(volume * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2.5 pt-0.5">
              <button
                type="button"
                onClick={handleToggleMute}
                className="text-[#6E5D50] hover:text-[#1C1917] transition-colors p-1 cursor-pointer"
                title={volume === 0 ? 'Bật âm thanh' : 'Tắt tiếng'}
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-500" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#C8973E]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-[#EAE0D2] rounded-lg appearance-none cursor-pointer accent-[#991B1E]"
              />
            </div>
          </div>

          {/* Cultural Knowledge Note */}
          <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E8DAC7]/70 flex items-start gap-2 text-[10.5px] leading-relaxed text-[#6E5D50]">
            <Info className="w-3.5 h-3.5 text-[#991B1E] shrink-0 mt-0.5" />
            <p>
              Tứ đại nhạc khí truyền thống: <strong>Trống Đồng</strong> tạo nhịp trầm thiêng,{' '}
              <strong>Đàn Bầu</strong> luyến láy ru hồn, <strong>Đàn Tranh</strong> rải chuỗi ngọc đài các, và{' '}
              <strong>Sáo Trúc</strong> thanh tao đồng bằng Bắc Bộ.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
