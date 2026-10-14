import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  ChevronDown, ChevronUp, X, Disc3, Sparkles, Music, GripHorizontal, Move 
} from 'lucide-react';

export interface FullSong {
  id: string;
  title: string;
  artist: string;
  vibe: string;
  duration: string;
  url: string;
  coverImage: string;
}

export const VANITY_PLAYLIST: FullSong[] = [
  {
    id: 'track-1',
    title: 'Glow (Strawberry Glaze)',
    artist: 'Evan Schaeffer',
    vibe: 'Dreamy Bedroom Pop 🍓',
    duration: '2:34',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Evan_Schaeffer_-_01_-_Glow.ogg',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'track-2',
    title: 'Bright Side (Sunny Morning)',
    artist: 'Evan Schaeffer',
    vibe: 'Upbeat Sunshine Pop ☀️',
    duration: '2:45',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Evan_Schaeffer_-_02_-_Bright_Side.ogg',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'track-3',
    title: 'Blink (Glazed Synthpop)',
    artist: 'Evan Schaeffer',
    vibe: 'Retro Glitter Wave ✨',
    duration: '3:10',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Evan_Schaeffer_-_02_-_Blink.ogg',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'track-4',
    title: 'Mantra (Vanity Chill)',
    artist: 'Evan Schaeffer',
    vibe: 'Skincare & GRWM Mood 🌸',
    duration: '3:05',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Evan_Schaeffer_-_04_-_Mantra.ogg',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'track-5',
    title: 'Portal (Midnight Glam)',
    artist: 'Evan Schaeffer',
    vibe: 'Party Starlight Shimmer 💖',
    duration: '3:20',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Evan_Schaeffer_-_05_-_Portal.ogg',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80'
  }
];

interface VanityAudioPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VanityAudioPlayer: React.FC<VanityAudioPlayerProps> = ({ isOpen, onClose }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Drag & Move state (Ultra-smooth 60/120fps GPU accelerated)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 336, height: 160 });
  const animFrameIdRef = useRef<number | null>(null);
  const targetPosRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = VANITY_PLAYLIST[currentTrackIndex];

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  // Play a specific track
  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => console.warn(err));
      }
    }, 50);
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % VANITY_PLAYLIST.length;
    handleSelectTrack(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + VANITY_PLAYLIST.length) % VANITY_PLAYLIST.length;
    handleSelectTrack(prevIdx);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  // Auto-advance to next full song when track finishes
  const handleSongEnded = () => {
    handleNext();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // DRAG AND MOVE LOGIC FOR MINIMISED / EXPANDED PLAYER (Hardware accelerated & butter-smooth)
  const startDrag = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dimensionsRef.current = {
      width: rect.width,
      height: rect.height,
    };
    dragOffsetRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    targetPosRef.current = { x: rect.left, y: rect.top };
    setPosition({ x: rect.left, y: rect.top });
    setIsDragging(true);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('a')) {
      return;
    }
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('a')) {
      return;
    }
    if (e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Global smooth mousemove / touchmove listeners using requestAnimationFrame
  useEffect(() => {
    if (!isDragging) return;

    const updatePosition = (clientX: number, clientY: number) => {
      const { width, height } = dimensionsRef.current;
      const newX = clientX - dragOffsetRef.current.x;
      const newY = clientY - dragOffsetRef.current.y;

      // Clamp within screen boundaries
      const clampedX = Math.max(8, Math.min(window.innerWidth - width - 8, newX));
      const clampedY = Math.max(8, Math.min(window.innerHeight - height - 8, newY));

      targetPosRef.current = { x: clampedX, y: clampedY };

      if (animFrameIdRef.current === null) {
        animFrameIdRef.current = requestAnimationFrame(() => {
          if (targetPosRef.current) {
            setPosition(targetPosRef.current);
          }
          animFrameIdRef.current = null;
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updatePosition(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onStopDrag = () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: false });
    window.addEventListener('mouseup', onStopDrag);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onStopDrag);

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onStopDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onStopDrag);
    };
  }, [isDragging]);

  // Adjust on window resize to ensure player doesn't get clipped
  useEffect(() => {
    const handleResize = () => {
      if (!position || !containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      setPosition((prev) => {
        if (!prev) return null;
        return {
          x: Math.max(8, Math.min(window.innerWidth - width - 8, prev.x)),
          y: Math.max(8, Math.min(window.innerHeight - height - 8, prev.y)),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  // Double click header to reset position to default bottom-right dock
  const handleResetPosition = () => {
    setPosition(null);
  };

  if (!isOpen) {
    // Keep audio element active even if closed/hidden so music never resets
    return (
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnded}
        preload="auto"
      />
    );
  }

  // Positioning style: custom coords if dragged, or default pinned corner
  const positionStyle: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        bottom: 'auto',
        right: 'auto',
        zIndex: 50,
        transform: 'translate3d(0, 0, 0)',
        willChange: isDragging ? 'left, top' : 'auto',
        touchAction: 'none',
      }
    : {
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 50,
        transform: 'translate3d(0, 0, 0)',
        touchAction: 'none',
      };

  return (
    <>
      {/* Native HTML5 Audio Engine - never unmounts so playback continues across entire blog */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnded}
        preload="auto"
      />

      <div 
        ref={containerRef}
        style={positionStyle}
        className={`select-none ${isDragging ? 'transition-none cursor-grabbing opacity-98 shadow-2xl' : 'transition-[width,height,opacity,box-shadow] duration-200 ease-out'} ${
          isMinimized 
            ? 'w-[calc(100vw-2rem)] sm:w-84' 
            : 'w-[calc(100vw-2rem)] sm:w-96 max-w-full'
        }`}
      >
        <div className={`bg-white border-4 border-[#FF2A85] rounded-3xl shadow-[6px_6px_0px_#FF2A85] overflow-hidden flex flex-col ${isDragging ? 'transition-none' : 'transition-transform duration-200 ease-out'}`}>
          
          {/* Draggable Header Bar */}
          <div 
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onDoubleClick={handleResetPosition}
            className="bg-gradient-to-r from-[#FF2A85] to-[#A855F7] px-3.5 py-2.5 text-white flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
            title="Click and drag to move player anywhere! Double-click to snap back to corner."
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <span className={`p-1 bg-white text-[#FF2A85] rounded-full text-xs font-bold ${isPlaying ? 'animate-spin' : ''}`}>
                <Disc3 className="w-3.5 h-3.5" />
              </span>
              <div>
                <div className="font-bubbly text-xs font-bold leading-tight flex items-center gap-1">
                  <span>ALLIE'S VANITY TUNES</span>
                  <span className="text-yellow-300">🎧</span>
                </div>
                <span className="text-[10px] opacity-90 block font-body">
                  {isPlaying ? 'Full Song Streaming 🎶' : 'Full Song Player (Movable ✋)'}
                </span>
              </div>
            </div>

            {/* Drag Handle & Action Buttons */}
            <div className="flex items-center gap-1.5">
              
              {/* Drag Grip Icon indicator */}
              <div 
                className="p-1 text-white/70 hover:text-white rounded-md cursor-grab active:cursor-grabbing" 
                title="Drag to reposition player"
              >
                <GripHorizontal className="w-4 h-4" />
              </div>

              {/* Minimize / Expand Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-full text-[11px] font-bubbly font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title={isMinimized ? 'Expand full playlist' : 'Minimise player (music keeps playing!)'}
              >
                {isMinimized ? (
                  <>
                    <span>Expand</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Minimise</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (audioRef.current) audioRef.current.pause();
                  setIsPlaying(false);
                  onClose();
                }}
                className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                title="Pause and Close Player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MINIMIZED VIEW: Sleek Movable Compact Mini-Player */}
          {isMinimized ? (
            <div className="p-3 bg-[#FFF0F5] space-y-2">
              
              {/* Mini Info & Controls */}
              <div className="flex items-center justify-between gap-2">
                <div 
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  className="flex items-center gap-2.5 min-w-0 flex-1 cursor-grab active:cursor-grabbing"
                  title="Drag anywhere here to move the mini player!"
                >
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-pink-300 shrink-0">
                    <img 
                      src={currentTrack.coverImage} 
                      alt={currentTrack.title} 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bubbly font-bold text-[#FF1493] block truncate">
                      {currentTrack.title}
                    </span>
                    <span className="text-[10px] text-stone-500 font-body truncate block">
                      {currentTrack.artist} • {formatTime(currentTime)} / {formatTime(duration || 154)}
                    </span>
                  </div>
                </div>

                {/* Mini Buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 text-stone-600 hover:text-[#FF2A85] rounded-full hover:bg-pink-100 cursor-pointer"
                    title="Previous Song"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white flex items-center justify-center shadow-sticker-sm transition-transform hover:scale-105 cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-1.5 text-stone-600 hover:text-[#FF2A85] rounded-full hover:bg-pink-100 cursor-pointer"
                    title="Next Song"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mini Scrubber Bar */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 154}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-[#FF2A85]"
                />
              </div>

              {/* Status Ribbon & Drag Tip */}
              <div className="flex items-center justify-between text-[10px] text-stone-500 px-1 font-body">
                <span className="flex items-center gap-1 text-[#FF1493] font-bold truncate">
                  <Move className="w-2.5 h-2.5 text-[#FF2A85]" />
                  <span>Drag header to move</span>
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {position && (
                    <button
                      onClick={handleResetPosition}
                      className="text-[9px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
                      title="Snap player back to bottom corner"
                    >
                      Reset dock
                    </button>
                  )}
                  <button
                    onClick={() => setIsMinimized(false)}
                    className="text-[#A855F7] font-bold hover:underline cursor-pointer"
                  >
                    Playlist (5) →
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* EXPANDED VIEW: Full Vanity Cassette & Tracklist */
            <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto bg-[#FFF0F5]/50">
              
              {/* Current Track Showcase Card */}
              <div className="bg-white rounded-3xl p-4 border-2 border-pink-200 shadow-sticker-sm flex items-center gap-4">
                
                {/* Vinyl Cover with spin effect */}
                <div className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-sm shrink-0 ${isPlaying ? 'ring-2 ring-[#FF2A85]' : ''}`}>
                  <img
                    src={currentTrack.coverImage}
                    alt={currentTrack.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-1">
                    <span className="text-[9px] font-bold text-white bg-[#FF2A85]/80 px-1.5 py-0.5 rounded-full">
                      Full Track
                    </span>
                  </div>
                </div>

                {/* Track Details */}
                <div className="min-w-0 flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-[#A855F7] bg-purple-100 px-2 py-0.5 rounded-full inline-block">
                    {currentTrack.vibe}
                  </span>
                  <h3 className="font-bubbly text-base font-bold text-[#2D1226] truncate">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-body truncate">
                    {currentTrack.artist}
                  </p>
                </div>

              </div>

              {/* Progress Scrubber & Timing */}
              <div className="space-y-1.5 bg-white p-3 rounded-2xl border border-pink-200 shadow-xs">
                <input
                  type="range"
                  min="0"
                  max={duration || 154}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-[#FF2A85]"
                />
                <div className="flex items-center justify-between text-[11px] font-body text-stone-500 font-bold px-1">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-pink-600">Full Song</span>
                  <span>{formatTime(duration || 154)}</span>
                </div>
              </div>

              {/* Playback Controls & Volume */}
              <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-pink-200 shadow-xs">
                
                {/* Volume toggle */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 text-stone-500 hover:text-[#FF2A85] cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-16 h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-[#FF2A85]"
                  />
                </div>

                {/* Primary Play/Pause & Skip Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full text-stone-700 hover:text-[#FF2A85] hover:bg-pink-50 cursor-pointer"
                    title="Previous Song"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-11 h-11 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white flex items-center justify-center shadow-sticker transition-transform hover:scale-105 cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play Full Song'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full text-stone-700 hover:text-[#FF2A85] hover:bg-pink-50 cursor-pointer"
                    title="Next Song"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                  No limits ✨
                </div>

              </div>

              {/* Playlist Queue (Tap any song to play full audio) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bubbly font-bold text-[#FF1493]">
                  <span>Vanity Playlist Queue (Full Tracks) 🎀</span>
                  <span className="text-[10px] bg-[#FEF08A] text-[#854D0E] px-2 py-0.5 rounded-full border border-yellow-300">
                    5 Songs
                  </span>
                </div>

                <div className="space-y-1.5">
                  {VANITY_PLAYLIST.map((song, idx) => {
                    const isCurrent = idx === currentTrackIndex;
                    return (
                      <button
                        key={song.id}
                        onClick={() => handleSelectTrack(idx)}
                        className={`w-full text-left p-2.5 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer ${
                          isCurrent
                            ? 'bg-white border-[#FF2A85] shadow-sticker-sm scale-101'
                            : 'bg-white/80 border-pink-100 hover:border-pink-300 hover:bg-white'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCurrent ? 'bg-[#FF2A85] text-white animate-pulse' : 'bg-pink-100 text-[#FF1493]'
                        }`}>
                          {isCurrent && isPlaying ? '▶' : idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bubbly font-bold text-[#2D1226] truncate flex items-center gap-1.5">
                            <span>{song.title}</span>
                            {isCurrent && <span className="text-[#FF2A85] text-[10px]">Now Playing</span>}
                          </div>
                          <div className="text-[10px] text-stone-500 font-body truncate">
                            {song.vibe}
                          </div>
                        </div>
                        <span className="text-[11px] font-body text-stone-400 font-bold shrink-0">
                          {song.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Movable tip & note */}
              <div className="p-2.5 bg-white border border-pink-200 rounded-2xl text-[10px] text-stone-500 font-body leading-relaxed flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                <span>
                  Tip: You can drag this player anywhere on the screen! Double-click the header to snap it back to the bottom-right corner.
                </span>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
};
