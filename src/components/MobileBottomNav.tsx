import React from 'react';
import { FolderPlus, Camera, Wand2, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface MobileBottomNavProps {
  currentLang: Language;
  imagesCount: number;
  onPickFiles: () => void;
  onOpenCamera: () => void;
  onConvert: () => void;
  onOpenSettings: () => void;
  isConverting: boolean;
  hasApiKey: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentLang,
  imagesCount,
  onPickFiles,
  onOpenCamera,
  onConvert,
  onOpenSettings,
  isConverting,
  hasApiKey
}) => {
  const t = translations[currentLang];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 border-t border-cyan-500/20 backdrop-blur-2xl px-4 py-2.5 flex items-center justify-around sm:hidden shadow-2xl shadow-black">
      {/* Pick Files */}
      <button
        type="button"
        onClick={onPickFiles}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-400 active:scale-95 transition-all"
      >
        <FolderPlus className="w-5 h-5 text-cyan-400" />
        <span className="text-[10px] font-bold">
          {currentLang === 'ar' ? 'صور' : currentLang === 'fr' ? 'Photos' : 'Photos'}
        </span>
      </button>

      {/* Camera */}
      <button
        type="button"
        onClick={onOpenCamera}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-400 active:scale-95 transition-all"
      >
        <Camera className="w-5 h-5 text-cyan-400" />
        <span className="text-[10px] font-bold">
          {currentLang === 'ar' ? 'كاميرا' : currentLang === 'fr' ? 'Caméra' : 'Camera'}
        </span>
      </button>

      {/* Convert (Prominent center button) */}
      <button
        type="button"
        onClick={onConvert}
        disabled={isConverting || imagesCount === 0}
        className="relative -top-3 w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-cyan-500/40 active:scale-90 transition-transform disabled:opacity-50 disabled:cursor-not-allowed border-2 border-slate-950"
        title={t.controls.convertBtn}
      >
        {isConverting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Wand2 className="w-6 h-6 stroke-[2.3]" />
        )}
        {imagesCount > 0 && !isConverting && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-slate-900">
            {imagesCount}
          </span>
        )}
      </button>

      {/* AI Settings */}
      <button
        type="button"
        onClick={onOpenSettings}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-purple-400 active:scale-95 transition-all"
      >
        <Sparkles className={`w-5 h-5 ${hasApiKey ? 'text-purple-400 animate-pulse' : 'text-purple-400'}`} />
        <span className="text-[10px] font-bold">
          {currentLang === 'ar' ? 'ذكاء AI' : currentLang === 'fr' ? 'IA' : 'AI'}
        </span>
      </button>
    </div>
  );
};
