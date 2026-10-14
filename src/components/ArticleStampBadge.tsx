import React from 'react';
import { StampDefinition, Y2K_STAMPS } from '../types/stamps';

interface ArticleStampBadgeProps {
  stampId: string;
  size?: 'sm' | 'md' | 'lg';
  date?: string;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const ArticleStampBadge: React.FC<ArticleStampBadgeProps> = ({
  stampId,
  size = 'md',
  date,
  className = '',
  interactive = false,
  onClick,
}) => {
  const stamp = Y2K_STAMPS.find((s) => s.id === stampId);
  if (!stamp) return null;

  if (size === 'sm') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border-2 font-bubbly text-[10px] font-black uppercase tracking-wider shadow-sticker-sm select-none transition-transform ${
          interactive ? 'hover:scale-105 cursor-pointer' : ''
        } ${className}`}
        style={{
          borderColor: stamp.borderColor,
          backgroundColor: stamp.textColor === '#FFFFFF' ? stamp.inkColor : '#FEF08A',
          color: stamp.textColor,
          transform: `rotate(${stamp.rotation})`,
        }}
      >
        <span>{stamp.emoji}</span>
        <span>{stamp.badgeText}</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div
        onClick={onClick}
        className={`relative inline-block select-none group transition-all duration-300 ${
          interactive ? 'cursor-pointer hover:scale-105' : ''
        } ${className}`}
        style={{
          transform: `rotate(${stamp.rotation})`,
        }}
      >
        {/* Rubber Stamp Double Border Container */}
        <div
          className={`relative p-3 rounded-2xl border-3 border-dashed shadow-sticker bg-gradient-to-r ${stamp.bgGradient} flex flex-col items-center justify-center text-center`}
          style={{
            borderColor: stamp.borderColor,
            color: stamp.textColor,
          }}
        >
          {/* Top Stamp Header */}
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest opacity-90 border-b border-current pb-1 mb-1">
            <span>★ ALLIE'S GLAM DIARY ★</span>
          </div>

          {/* Main Stamp Core */}
          <div className="flex items-center gap-2 py-0.5">
            <span className="text-2xl filter drop-shadow-xs animate-bounce">{stamp.emoji}</span>
            <span className="font-bubbly text-base sm:text-lg font-black tracking-tight drop-shadow-xs">
              {stamp.badgeText}
            </span>
          </div>

          {/* Bottom Tagline / Date */}
          <div className="flex items-center gap-2 text-[10px] font-bold font-body opacity-95 pt-1">
            <span>{date ? `Stamped: ${date}` : stamp.tagline}</span>
          </div>
        </div>
      </div>
    );
  }

  // Default 'md' size
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border-2.5 shadow-sticker-sm select-none font-bubbly text-xs font-black uppercase tracking-wider bg-gradient-to-r ${stamp.bgGradient} transition-transform ${
        interactive ? 'hover:scale-105 cursor-pointer' : ''
      } ${className}`}
      style={{
        borderColor: stamp.borderColor,
        color: stamp.textColor,
        transform: `rotate(${stamp.rotation})`,
      }}
    >
      <span className="text-sm">{stamp.emoji}</span>
      <span>{stamp.badgeText}</span>
      {date && <span className="text-[10px] opacity-80 font-normal font-body">({date})</span>}
    </div>
  );
};
