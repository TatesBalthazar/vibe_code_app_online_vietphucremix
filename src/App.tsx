import React, { useState, useEffect } from 'react';
import { OutfitLookState, SavedLook, OutfitId, OccasionId, StyleId, ColorId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { RemixStudioPage } from './pages/RemixStudioPage';
import { ResultPage } from './pages/ResultPage';
import { LookbookPage } from './pages/LookbookPage';
import { evaluateCultureCheck } from './data/cultureNotes';
import { OUTFITS_DATA } from './data/outfits';

// Initial starter look for instant interactivity: Mặc định Nữ mặc áo dài trắng chưa phối đồ
const INITIAL_LOOK: OutfitLookState = {
  gender: 'female',
  skinTone: 'neutral',
  occasion: 'festival',
  outfit: 'ao-dai',
  style: 'traditional',
  color: 'cream',
  accessories: []
};

const STORAGE_KEY = 'viet_phuc_remix_saved_looks';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentLook, setCurrentLook] = useState<OutfitLookState>(INITIAL_LOOK);
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load saved looks from localStorage', e);
    }

    // Default curated starter looks for initial demo experience
    const starterCheckA = evaluateCultureCheck({
      outfitId: 'ao-dai',
      occasionId: 'festival',
      styleId: 'modern',
      colorId: 'burgundy',
      accessoryIds: ['khan-dong', 'chuoi-ngoc-trai']
    });

    const starterCheckB = evaluateCultureCheck({
      outfitId: 'ao-ngu-than',
      occasionId: 'photoshoot',
      styleId: 'minimal',
      colorId: 'cream',
      accessoryIds: ['vong-kieng-bac', 'sandal-day-manh']
    });

    return [
      {
        id: 'look-seed-1',
        createdAt: '15 Thg 9, 2026',
        gender: 'female',
        skinTone: 'neutral',
        title: 'MODERN ÁO DÀI',
        subtitle: 'Festival × Modern',
        occasion: 'festival' as OccasionId,
        occasionName: 'Lễ hội & Tết cổ truyền',
        outfit: 'ao-dai' as OutfitId,
        outfitName: 'Áo dài',
        style: 'modern' as StyleId,
        styleName: 'Cách Tân Hiện Đại',
        color: 'burgundy' as ColorId,
        colorName: 'Đỏ Rượu Quý Phái',
        colorHex: '#5E1B24',
        accessories: ['Khăn đóng lụa', 'Chuỗi vòng ngọc trai thanh lịch'],
        cultureCheck: starterCheckA,
        image: ''
      },
      {
        id: 'look-seed-2',
        createdAt: '16 Thg 9, 2026',
        gender: 'male',
        skinTone: 'warm',
        title: 'MINIMAL ÁO NGŨ THÂN',
        subtitle: 'Photoshoot × Minimal',
        occasion: 'photoshoot' as OccasionId,
        occasionName: 'Chụp ảnh & Lookbook',
        outfit: 'ao-ngu-than' as OutfitId,
        outfitName: 'Áo ngũ thân',
        style: 'minimal' as StyleId,
        styleName: 'Tối Giản Tinh Tế',
        color: 'cream' as ColorId,
        colorName: 'Kem Ngà / Lụa Mộc',
        colorHex: '#F5EFE6',
        accessories: ['Vòng kiềng bạc nguyên khối', 'Sandal quai mảnh thanh thoát'],
        cultureCheck: starterCheckB,
        image: ''
      }
    ];
  });

  const [exploreTargetOutfit, setExploreTargetOutfit] = useState<string | null>(null);

  // Sync saved looks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLooks));
    } catch (e) {
      console.warn('Could not persist looks to localStorage', e);
    }
  }, [savedLooks]);

  // Navigation helper
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick Start Remix from Home or Explore
  const handleQuickStartRemix = (outfitId?: string) => {
    if (outfitId) {
      setCurrentLook((prev) => ({
        ...prev,
        outfit: outfitId as OutfitId
      }));
    }
    handleNavigate('studio');
  };

  // Select Outfit to explore details in Explore page
  const handleSelectOutfitToExplore = (outfitId: string) => {
    setExploreTargetOutfit(outfitId);
    handleNavigate('explore');
  };

  // Create look from Studio -> Result
  const handleCreateLook = () => {
    handleNavigate('result');
  };

  // Save look handler
  const handleSaveLook = (newLook: SavedLook) => {
    setSavedLooks((prev) => {
      // Check if already exists
      const existingIndex = prev.findIndex(
        (l) =>
          l.outfit === newLook.outfit &&
          l.occasion === newLook.occasion &&
          l.style === newLook.style &&
          l.color === newLook.color
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newLook;
        return updated;
      }
      return [newLook, ...prev];
    });
  };

  // Remove look handler
  const handleRemoveLook = (id: string) => {
    setSavedLooks((prev) => prev.filter((look) => look.id !== id));
  };

  // Update look with realistic AI-generated illustration
  const handleUpdateLookImage = (
    lookId: string,
    newImageDataUrl: string,
    aiStyle: any,
    prompt: string
  ) => {
    setSavedLooks((prev) =>
      prev.map((look) =>
        look.id === lookId
          ? {
              ...look,
              image: newImageDataUrl,
              isAiGenerated: true,
              aiStyle,
              aiPrompt: prompt
            }
          : look
      )
    );
  };

  const isCurrentLookSaved = savedLooks.some(
    (l) =>
      l.outfit === currentLook.outfit &&
      l.occasion === currentLook.occasion &&
      l.style === currentLook.style &&
      l.color === currentLook.color
  );

  const handleStartRemixFromLookbook = (colorId?: ColorId) => {
    if (colorId) {
      setCurrentLook((prev) => ({
        ...prev,
        color: colorId
      }));
    }
    handleNavigate('studio');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#991B1E] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        savedLooksCount={savedLooks.length}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectOutfitToExplore={handleSelectOutfitToExplore}
            onQuickStartRemix={handleQuickStartRemix}
          />
        )}

        {currentPage === 'explore' && (
          <ExplorePage
            onStartRemix={handleQuickStartRemix}
            initialSelectedOutfitId={exploreTargetOutfit}
          />
        )}

        {currentPage === 'studio' && (
          <RemixStudioPage
            currentLook={currentLook}
            onChangeLook={setCurrentLook}
            onCreateLook={handleCreateLook}
            onSaveLook={handleSaveLook}
            isAlreadySaved={isCurrentLookSaved}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'result' && (
          <ResultPage
            currentLook={currentLook}
            onRemixAgain={() => handleNavigate('studio')}
            onSaveLook={handleSaveLook}
            onNavigateToLookbook={() => handleNavigate('lookbook')}
            isAlreadySaved={isCurrentLookSaved}
            onChangeLook={setCurrentLook}
          />
        )}

        {currentPage === 'lookbook' && (
          <LookbookPage
            savedLooks={savedLooks}
            onRemoveLook={handleRemoveLook}
            onStartRemix={handleStartRemixFromLookbook}
            onUpdateLookImage={handleUpdateLookImage}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
