import React, { useState } from 'react';
import { Sparkles, Camera, Heart, X, Share2, ZoomIn, Check, SlidersHorizontal, Zap, SunMedium, Flame } from 'lucide-react';

export interface MirrorSelfieItem {
  id: string;
  title: string;
  category: 'Pink Baby Doll' | 'Cyber Y2K' | 'Frosted 2000s' | 'Fairy Grunge';
  categoryEmoji: string;
  image: string;
  date: string;
  caption: string;
  outfitDetails: string[];
  makeupDetails: string[];
  likes: number;
  tags: string[];
}

export const MIRROR_SELFIES: MirrorSelfieItem[] = [
  {
    id: 'selfie-1',
    title: 'Bubblegum Baby Tee & Star Clips 🎀',
    category: 'Pink Baby Doll',
    categoryEmoji: '💖',
    image: '/src/assets/images/selfie_cyber_pink_1791187140649.jpg',
    date: 'OCT 04, 2026',
    caption: '“Rhinestone baby tee, pink gloss & flip phone charms forever.”',
    outfitDetails: [
      'Pink Rhinestone Star Crop Baby Tee',
      'Pleated White Y2K Tennis Skirt',
      'Beaded Pastel Flip Phone Charm Lanyard',
      'Platform Chunky White Sneakers',
    ],
    makeupDetails: [
      'GlowDrop Berry Glaze Hydrating Lip Oil',
      'Strawberry Milk Liquid Cream Blush',
      'Inner-eye Silver Starlight Highlighter',
      'Star Gem Face Stickers',
    ],
    likes: 428,
    tags: ['#PinkY2K', '#BabyTee', '#LipGloss', '#OOTD'],
  },
  {
    id: 'selfie-2',
    title: 'Metallic Cargo & Glazed 90s Nude 💿',
    category: 'Cyber Y2K',
    categoryEmoji: '💿',
    image: '/src/assets/images/selfie_denim_glam_1791187153820.jpg',
    date: 'OCT 01, 2026',
    caption: '“Puffer vest + low-rise cargos for late night iced chai runs.”',
    outfitDetails: [
      'Silver Metallic Cropped Puffer Vest',
      'Multi-pocket Low-Rise Skate Cargo Pants',
      'Chunky Belt with Chrome Hardware',
      'Butterfly Hair Claw Clips',
    ],
    makeupDetails: [
      '90s Spice Defined Brown Lip Liner',
      'Mirror Glass Clear Topcoat Lip Gloss',
      'Chrome Body Shimmer Stick',
      'Subtle Winged Liquid Ink Eyeliner',
    ],
    likes: 389,
    tags: ['#CyberY2K', '#CargoPants', '#90sLips', '#Streetwear'],
  },
  {
    id: 'selfie-3',
    title: 'Frosted Blue Shimmer & Retro Cans 🦋',
    category: 'Frosted 2000s',
    categoryEmoji: '🦋',
    image: '/src/assets/images/selfie_baby_blue_1791187173118.jpg',
    date: 'SEP 28, 2026',
    caption: '“Baby blue shimmer lids inspired by Britney & Lizzie McGuire!”',
    outfitDetails: [
      'Oversized Heather Grey Zip-Up Hoodie',
      'Retro Pastel Over-Ear DJ Headphones',
      'Ribbed Pastel Baby Tank Top',
      'Star Die-Cut Mirrored Phone Case',
    ],
    makeupDetails: [
      'Cyber Ice Duo Frosted Baby Blue Eyeshadow',
      'Tubing Curling Doll-Lash Mascara',
      'Watermelon Peptide Hydrating Lip Balm',
      'Dewy Skin Glaze Illuminator Drops',
    ],
    likes: 512,
    tags: ['#BabyBlue', '#FrostedEyes', '#Digicam', '#Y2KBeauty'],
  },
  {
    id: 'selfie-4',
    title: 'Lace Off-Shoulder & Berry Stained Lip 🖤',
    category: 'Fairy Grunge',
    categoryEmoji: '🖤',
    image: '/src/assets/images/selfie_fairy_grunge_1791187195577.jpg',
    date: 'SEP 24, 2026',
    caption: '“Cozy lace layers, layered silver star chokers & moody berry lips.”',
    outfitDetails: [
      'Distressed Lace Knit Off-Shoulder Top',
      'Layered Star & Moon Silver Chokers',
      'Flared Low-Rise Washed Denim',
      'Vintage Studded Leather Tote Bag',
    ],
    makeupDetails: [
      'Crushed Blackberry Tinted Lip Oil',
      'Smudgy Brown Kohl Pencil Under-Eye Line',
      'Champagne Twinkle Cheek Highlighter',
      'Naturally Fluffed Feathered Eyebrows',
    ],
    likes: 476,
    tags: ['#FairyGrunge', '#BerryLips', '#LaceTop', '#CozyVibes'],
  },
];

type DigicamMode = 'cyber' | 'bubblegum' | 'sepia';

export const MirrorSelfieGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<MirrorSelfieItem | null>(null);
  
  // Y2K Digicam Filter State
  const [isDigicamFilterActive, setIsDigicamFilterActive] = useState<boolean>(true);
  const [digicamMode, setDigicamMode] = useState<DigicamMode>('cyber');

  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    MIRROR_SELFIES.forEach((s) => {
      initial[s.id] = s.likes;
    });
    return initial;
  });
  const [userLikedMap, setUserLikedMap] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Pink Baby Doll', 'Cyber Y2K', 'Frosted 2000s', 'Fairy Grunge'];

  const filteredItems = selectedCategory === 'All'
    ? MIRROR_SELFIES
    : MIRROR_SELFIES.filter((item) => item.category === selectedCategory);

  const playShutterSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Audio autoplay policy
    }
  };

  const handleToggleFilter = () => {
    playShutterSound();
    setIsDigicamFilterActive((prev) => !prev);
  };

  const handleSelectMode = (mode: DigicamMode, e: React.MouseEvent) => {
    e.stopPropagation();
    playShutterSound();
    setIsDigicamFilterActive(true);
    setDigicamMode(mode);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasLiked = userLikedMap[id];
    setUserLikedMap((prev) => ({ ...prev, [id]: !hasLiked }));
    setLikesMap((prev) => ({
      ...prev,
      [id]: hasLiked ? prev[id] - 1 : prev[id] + 1,
    }));
  };

  const handleCopyInspo = (item: MirrorSelfieItem) => {
    const text = `Y2K Mirror Look: "${item.title}"\nOutfit: ${item.outfitDetails.join(', ')}\nMakeup: ${item.makeupDetails.join(', ')}\n✨ From Allie's Glam Diary!`;
    navigator.clipboard?.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Compute CSS filter styling based on mode
  const getImageFilterStyle = () => {
    if (!isDigicamFilterActive) return 'none';
    switch (digicamMode) {
      case 'bubblegum':
        return 'contrast(118%) saturate(145%) brightness(108%) hue-rotate(330deg)';
      case 'sepia':
        return 'contrast(120%) saturate(110%) sepia(35%) brightness(104%)';
      case 'cyber':
      default:
        return 'contrast(126%) saturate(132%) brightness(106%) hue-rotate(-3deg)';
    }
  };

  // Render authentic Digicam Viewfinder HUD Overlay
  const renderDigicamHUD = (item: MirrorSelfieItem, isModal: boolean = false) => {
    if (!isDigicamFilterActive) return null;

    return (
      <>
        {/* CRT Scanline Stripes */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* Vintage Flash Vignette Bloom */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              digicamMode === 'bubblegum'
                ? 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.3) 0%, rgba(255,182,193,0.15) 45%, rgba(60,10,40,0.4) 100%)'
                : 'radial-gradient(circle at 48% 38%, rgba(255,255,255,0.28) 0%, rgba(255,240,245,0.1) 40%, rgba(15,5,15,0.45) 100%)',
            mixBlendMode: 'soft-light',
          }}
        />

        {/* Top Left: REC with Blinking Red Dot */}
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-black/65 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20 text-[10px] font-mono text-white select-none pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-red-400 font-bold">REC</span>
          <span className="text-stone-300 text-[9px]">RAW 60fps</span>
        </div>

        {/* Top Right: Megapixels & Battery Status */}
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-black/65 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20 text-[10px] font-mono text-emerald-400 select-none pointer-events-none">
          <span>12.1 MP</span>
          <span className="text-yellow-300">⚡</span>
          <div className="flex items-center gap-0.5 border border-emerald-400 px-0.5 py-0.5 rounded-xs">
            <div className="w-1 h-2 bg-emerald-400" />
            <div className="w-1 h-2 bg-emerald-400" />
            <div className="w-1 h-2 bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Center: Autofocus Viewfinder Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 select-none">
          <div
            className={`border-2 rounded-sm relative flex items-center justify-center animate-pulse ${
              isModal ? 'w-24 h-24' : 'w-16 h-16'
            } ${digicamMode === 'bubblegum' ? 'border-[#FF1493]/80' : 'border-[#39FF14]/80'}`}
          >
            <span
              className={`font-mono font-bold ${
                isModal ? 'text-sm' : 'text-xs'
              } ${digicamMode === 'bubblegum' ? 'text-[#FF1493]' : 'text-[#39FF14]'}`}
            >
              +
            </span>
            {/* Corner Ticks */}
            <div
              className={`absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 ${
                digicamMode === 'bubblegum' ? 'border-[#FF1493]' : 'border-[#39FF14]'
              }`}
            />
            <div
              className={`absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 ${
                digicamMode === 'bubblegum' ? 'border-[#FF1493]' : 'border-[#39FF14]'
              }`}
            />
            <div
              className={`absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 ${
                digicamMode === 'bubblegum' ? 'border-[#FF1493]' : 'border-[#39FF14]'
              }`}
            />
            <div
              className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 ${
                digicamMode === 'bubblegum' ? 'border-[#FF1493]' : 'border-[#39FF14]'
              }`}
            />
          </div>
        </div>

        {/* Bottom Left: Authentic 2000s Orange LED Timestamp */}
        <div className="absolute bottom-9 left-2 sm:left-3 z-20 font-mono font-black text-xs sm:text-sm tracking-widest text-[#FF7A00] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none pointer-events-none">
          '06 10 05 <span className="animate-pulse">14:32</span>
        </div>

        {/* Bottom Right: Exposure & White Balance */}
        <div className="absolute bottom-9 right-2 sm:right-3 z-20 font-mono text-[9px] text-white/90 bg-black/60 px-1.5 py-0.5 rounded-sm select-none pointer-events-none">
          ISO 400 • WB: AUTO
        </div>
      </>
    );
  };

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b-2 border-pink-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border border-yellow-400 mb-1.5 shadow-sticker-sm">
            <Camera className="w-3.5 h-3.5 text-[#FF1493]" />
            <span>📸 DIGICAM OOTD VAULT</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-current" />
          </div>
          <h2 className="font-bubbly text-2xl sm:text-4xl font-bold text-[#FF1493] tracking-tight">
            Mirror Selfie Gallery 🪞✨
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-body max-w-xl mt-1">
            Tap any mirror snap to inspect outfit pieces & makeup formulas, or toggle the 2000s digicam lens overlay!
          </p>
        </div>

        {/* Controls: Filter Button & Category Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          
          {/* PHOTO FILTER TOGGLE BUTTON */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border-2 border-[#FF2A85] shadow-sticker-sm">
            <button
              onClick={handleToggleFilter}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bubbly font-bold transition-all cursor-pointer ${
                isDigicamFilterActive
                  ? 'bg-gradient-to-r from-[#FF2A85] to-[#9333EA] text-white shadow-xs scale-102'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
              title="Toggle Y2K Digital Cam Filter Effect"
            >
              <Zap className={`w-3.5 h-3.5 ${isDigicamFilterActive ? 'text-yellow-300 fill-yellow-300 animate-bounce' : 'text-stone-400'}`} />
              <span>Y2K Digital Cam:</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                isDigicamFilterActive ? 'bg-white text-[#FF2A85]' : 'bg-stone-300 text-stone-700'
              }`}>
                {isDigicamFilterActive ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Mode Presets (when filter is active) */}
            {isDigicamFilterActive && (
              <div className="hidden sm:flex items-center gap-1 pr-1">
                <button
                  onClick={(e) => handleSelectMode('cyber', e)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold font-bubbly cursor-pointer transition-all ${
                    digicamMode === 'cyber'
                      ? 'bg-[#FEF08A] text-[#854D0E] border border-yellow-400'
                      : 'text-stone-500 hover:bg-pink-50'
                  }`}
                  title="Flash & Autofocus HUD"
                >
                  ⚡ Flash
                </button>
                <button
                  onClick={(e) => handleSelectMode('bubblegum', e)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold font-bubbly cursor-pointer transition-all ${
                    digicamMode === 'bubblegum'
                      ? 'bg-pink-200 text-[#FF1493] border border-pink-300'
                      : 'text-stone-500 hover:bg-pink-50'
                  }`}
                  title="Pink Dreamy Bloom"
                >
                  🌸 Pink
                </button>
                <button
                  onClick={(e) => handleSelectMode('sepia', e)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold font-bubbly cursor-pointer transition-all ${
                    digicamMode === 'sepia'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'text-stone-500 hover:bg-pink-50'
                  }`}
                  title="Sepia Warmth"
                >
                  🎞️ '06
                </button>
              </div>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bubbly font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'theme-accent-bg text-white shadow-sticker-sm scale-103'
                    : 'bg-white text-stone-700 hover:bg-pink-100 border border-pink-200'
                }`}
              >
                {cat === 'All' ? 'All Snaps 🪞' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const isLiked = userLikedMap[item.id];
          const currentLikes = likesMap[item.id] || item.likes;

          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-white rounded-3xl border-3 border-[#FF2A85] p-3.5 sm:p-4 shadow-sticker hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_#FF2A85] transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Digicam Mirror Frame */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-pink-100 border-2 border-pink-200 mb-3 shadow-inner">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-all duration-300"
                  style={{ filter: getImageFilterStyle() }}
                  referrerPolicy="no-referrer"
                />

                {/* Y2K Digicam HUD Overlay */}
                {renderDigicamHUD(item, false)}

                {/* Default Non-filtered HUD when filter is OFF */}
                {!isDigicamFilterActive && (
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none select-none">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-stone-300" />
                      <span>STANDBY</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full text-yellow-300">
                      {item.date}
                    </div>
                  </div>
                )}

                {/* Bottom Digicam Badge & Quick Inspect Trigger */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-20">
                  <span className="text-[10px] font-bubbly font-bold bg-white/95 text-[#FF1493] px-2.5 py-1 rounded-full border border-pink-300 shadow-xs flex items-center gap-1">
                    <span>{item.categoryEmoji}</span>
                    <span>{item.category}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItem(item);
                    }}
                    className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#FF2A85] transition-colors shadow-xs"
                    title="Zoom in look details"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Meta & Heart Button */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bubbly text-base font-bold text-[#2D1226] group-hover:text-[#FF1493] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-transform hover:scale-110 cursor-pointer border ${
                      isLiked
                        ? 'bg-[#FF2A85] text-white border-[#FF2A85]'
                        : 'bg-[#FFF0F5] text-[#FF1493] border-pink-300 hover:bg-pink-100'
                    }`}
                    title={isLiked ? 'Unlike look' : 'Heart this look!'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : 'fill-[#FF1493]'}`} />
                    <span className="text-[11px] tabular-nums">{currentLikes}</span>
                  </button>
                </div>

                <p className="text-xs text-stone-600 font-handwriting text-sm leading-tight italic line-clamp-1">
                  {item.caption}
                </p>

                {/* Micro tags */}
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold text-stone-500 bg-[#FFF0F5] border border-pink-200 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border-4 border-[#FF2A85] shadow-[8px_8px_0px_#FF2A85] rounded-3xl p-5 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 text-stone-600 hover:text-black bg-pink-100 hover:bg-pink-200 rounded-full border border-pink-300 shadow-sm cursor-pointer z-30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              {/* Left Column: Digicam Mirror Photo with Frame */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-pink-100 border-3 border-pink-300 shadow-sticker-sm">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: getImageFilterStyle() }}
                  referrerPolicy="no-referrer"
                />

                {/* Y2K Digicam HUD Overlay in Modal */}
                {renderDigicamHUD(activeItem, true)}

                {/* Nostalgic Polaroid Tape Sticker */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#FEF08A]/90 border border-yellow-400 px-3 py-1 rounded-sm text-[10px] font-handwriting font-bold text-stone-800 -rotate-2 shadow-xs z-20">
                  MIRROR CHECK 🪞✨
                </div>

                <div className="absolute bottom-2 left-3 right-3 bg-black/65 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1.5 rounded-xl flex items-center justify-between z-20">
                  <span>{isDigicamFilterActive ? 'Y2K FILTER ON ⚡' : 'RAW PREVIEW'}</span>
                  <span className="text-yellow-300 font-bold">{activeItem.date}</span>
                </div>
              </div>

              {/* Right Column: Breakdown & Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-100 border border-purple-300 px-2.5 py-0.5 rounded-full">
                      <span>{activeItem.categoryEmoji}</span>
                      <span>{activeItem.category}</span>
                    </span>

                    {/* Filter Toggle Inside Modal */}
                    <button
                      onClick={handleToggleFilter}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bubbly font-bold border transition-all cursor-pointer ${
                        isDigicamFilterActive
                          ? 'bg-[#FF2A85] text-white border-[#FF2A85]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      <Zap className="w-3 h-3 text-yellow-300" />
                      <span>Digicam: {isDigicamFilterActive ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>

                  <h3 className="font-bubbly text-2xl font-bold text-[#FF1493] leading-tight">
                    {activeItem.title}
                  </h3>
                  <p className="font-handwriting text-lg text-stone-700 mt-1">
                    {activeItem.caption}
                  </p>
                </div>

                {/* Outfit Items Breakdown */}
                <div className="bg-[#FFF0F5] border-2 border-pink-200 rounded-2xl p-3.5 space-y-1.5">
                  <span className="font-bubbly text-xs font-bold text-[#FF1493] flex items-center gap-1.5">
                    <span>👗 Outfit Pieces:</span>
                  </span>
                  <ul className="text-xs text-stone-700 space-y-1 font-body">
                    {activeItem.outfitDetails.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-pink-400 text-xs">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Makeup Items Breakdown */}
                <div className="bg-[#FEF08A]/30 border-2 border-yellow-300 rounded-2xl p-3.5 space-y-1.5">
                  <span className="font-bubbly text-xs font-bold text-[#854D0E] flex items-center gap-1.5">
                    <span>💄 Makeup Formula:</span>
                  </span>
                  <ul className="text-xs text-stone-700 space-y-1 font-body">
                    {activeItem.makeupDetails.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-amber-500 text-xs">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleCopyInspo(activeItem)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full theme-accent-bg text-white font-bubbly text-xs font-bold shadow-sticker-sm hover:scale-102 transition-transform cursor-pointer"
                  >
                    {copiedId === activeItem.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Look Inspo Copied! 💖</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Copy Look Inspo ✨</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => handleLike(activeItem.id, e)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bubbly font-bold border-2 transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5 ${
                      userLikedMap[activeItem.id]
                        ? 'bg-[#FF2A85] text-white border-[#FF2A85]'
                        : 'bg-white text-[#FF1493] border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${userLikedMap[activeItem.id] ? 'fill-white' : 'fill-[#FF1493]'}`} />
                    <span>{likesMap[activeItem.id] || activeItem.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
