import React, { useState } from 'react';
import {
  FileSignature,
  Sliders,
  Wand2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Hash,
  Stamp,
  Type,
  Presentation,
  Archive,
  FileText
} from 'lucide-react';
import { Language, PageOrientation, PageSize, MarginSize, PDFSettings, ExportFormat } from '../types';
import { translations } from '../translations';

interface ControlsBarProps {
  currentLang: Language;
  settings: PDFSettings;
  onSettingsChange: (settings: PDFSettings) => void;
  onConvert: () => void;
  onExportPptx: () => void;
  onExportZip: () => void;
  isConverting: boolean;
  isExportingPptx: boolean;
  isExportingZip: boolean;
  onSmartRename?: () => void;
  isAnalyzingAI?: boolean;
  hasApiKey: boolean;
  selectedFormat: ExportFormat;
  onSelectFormat: (format: ExportFormat) => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  currentLang,
  settings,
  onSettingsChange,
  onConvert,
  onExportPptx,
  onExportZip,
  isConverting,
  isExportingPptx,
  isExportingZip,
  onSmartRename,
  isAnalyzingAI = false,
  hasApiKey,
  selectedFormat,
  onSelectFormat
}) => {
  const t = translations[currentLang];
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="w-full glass-panel rounded-3xl p-5 sm:p-7 mb-8 shadow-2xl shadow-black/50">
      {/* Format Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs sm:text-sm font-extrabold text-white">
            {t.exports.format}:
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
          {/* PDF Tab */}
          <button
            type="button"
            onClick={() => onSelectFormat('pdf')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedFormat === 'pdf'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF (الأساسي)</span>
          </button>

          {/* PowerPoint Tab */}
          <button
            type="button"
            onClick={() => onSelectFormat('pptx')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedFormat === 'pptx'
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Presentation className="w-3.5 h-3.5 text-orange-400" />
            <span>PowerPoint (PPTX)</span>
          </button>

          {/* ZIP Archive Tab */}
          <button
            type="button"
            onClick={() => onSelectFormat('zip')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedFormat === 'zip'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Archive className="w-3.5 h-3.5 text-purple-400" />
            <span>أرشيف صور (ZIP)</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-5 sm:gap-6">
        {/* File Name Input */}
        <div className="flex-1 min-w-[240px]">
          <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileSignature className="w-4 h-4 text-cyan-400" />
              {t.controls.finalName}
            </span>
            {hasApiKey && onSmartRename && (
              <button
                type="button"
                onClick={onSmartRename}
                disabled={isAnalyzingAI}
                className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 bg-purple-500/15 hover:bg-purple-500/25 px-2.5 py-1 rounded-lg border border-purple-500/30 transition-all font-semibold"
                title={t.ai.smartRenameBtn}
              >
                <Sparkles className={`w-3.5 h-3.5 text-purple-400 ${isAnalyzingAI ? 'animate-spin' : ''}`} />
                <span>{isAnalyzingAI ? t.ai.analyzingImage : t.ai.smartRenameBtn}</span>
              </button>
            )}
          </label>
          <div className="relative">
            <input
              type="text"
              value={settings.fileName}
              onChange={(e) => onSettingsChange({ ...settings, fileName: e.target.value })}
              placeholder={t.controls.namePlaceholder}
              className={`w-full bg-slate-950/70 border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-3 px-4 text-sm text-white font-medium outline-none transition-all focus:ring-2 focus:ring-cyan-500/20 shadow-inner ${
                currentLang === 'ar' ? 'pr-4 pl-10 text-right' : 'pl-4 pr-10 text-left'
              }`}
            />
            <FileSignature
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60 pointer-events-none ${
                currentLang === 'ar' ? 'left-3.5' : 'right-3.5'
              }`}
            />
          </div>
        </div>

        {/* Layout Selects (Only relevant for PDF mode, or simplified for PPTX) */}
        {selectedFormat === 'pdf' ? (
          <div className="flex-[1.6] flex flex-wrap sm:flex-nowrap gap-3">
            {/* Quality */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                {t.controls.imageQuality}
              </label>
              <select
                value={settings.quality.toString()}
                onChange={(e) => onSettingsChange({ ...settings, quality: parseFloat(e.target.value) })}
                className="w-full bg-slate-950/70 border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white outline-none cursor-pointer transition-all font-medium"
              >
                <option value="1.0">{t.controls.qualityVeryHigh}</option>
                <option value="0.9">{t.controls.qualityHigh}</option>
                <option value="0.7">{t.controls.qualityMedium}</option>
              </select>
            </div>

            {/* Orientation */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                {t.controls.orientation}
              </label>
              <select
                value={settings.orientation}
                onChange={(e) => onSettingsChange({ ...settings, orientation: e.target.value as PageOrientation })}
                className="w-full bg-slate-950/70 border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white outline-none cursor-pointer transition-all font-medium"
              >
                <option value="auto">{t.controls.orientationAuto}</option>
                <option value="p">{t.controls.orientationPortrait}</option>
                <option value="l">{t.controls.orientationLandscape}</option>
              </select>
            </div>

            {/* Page Size */}
            <div className="flex-1 min-w-[110px]">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                {t.controls.pageSize}
              </label>
              <select
                value={settings.pageSize}
                onChange={(e) => onSettingsChange({ ...settings, pageSize: e.target.value as PageSize })}
                className="w-full bg-slate-950/70 border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white outline-none cursor-pointer transition-all font-medium"
              >
                <option value="a4">A4 (Standard)</option>
                <option value="a3">A3 (Large)</option>
                <option value="a5">A5 (Booklet)</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
                <option value="fit">{currentLang === 'ar' ? 'ملء الصورة' : currentLang === 'fr' ? 'Ajusté' : 'Fit Image'}</option>
              </select>
            </div>

            {/* Margins */}
            <div className="flex-1 min-w-[110px]">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                {t.controls.margins}
              </label>
              <select
                value={settings.margins}
                onChange={(e) => onSettingsChange({ ...settings, margins: e.target.value as MarginSize })}
                className="w-full bg-slate-950/70 border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white outline-none cursor-pointer transition-all font-medium"
              >
                <option value="none">{t.controls.marginNone}</option>
                <option value="small">{t.controls.marginSmall}</option>
                <option value="normal">{t.controls.marginNormal}</option>
                <option value="large">{t.controls.marginLarge}</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="flex-[1.6] flex items-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
            {selectedFormat === 'pptx' ? (
              <span className="leading-relaxed">
                {t.exports.pptxDesc} • تخطيط عريض شاشة 16:9 بنقاء فائق لكل شريحة.
              </span>
            ) : (
              <span className="leading-relaxed">
                {t.exports.zipDesc} • تجميع الصور بجودتها الكاملة بعد الفلاتر والتعديلات.
              </span>
            )}
          </div>
        )}

        {/* Convert / Export Button according to selected format */}
        <div className="flex-shrink-0">
          {selectedFormat === 'pdf' ? (
            <button
              onClick={onConvert}
              disabled={isConverting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isConverting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t.controls.converting}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{t.controls.convertBtn}</span>
                </>
              )}
            </button>
          ) : selectedFormat === 'pptx' ? (
            <button
              onClick={onExportPptx}
              disabled={isExportingPptx}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isExportingPptx ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t.exports.generatingPptx}</span>
                </>
              ) : (
                <>
                  <Presentation className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>{t.exports.downloadPptx}</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onExportZip}
              disabled={isExportingZip}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isExportingZip ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t.exports.generatingZip}</span>
                </>
              ) : (
                <>
                  <Archive className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>{t.exports.downloadZip}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Advanced Options Toggle (For PDF mode) */}
      {selectedFormat === 'pdf' && (
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.controls.advancedSettings}</span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {/* Page Numbers */}
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-cyan-500/30 transition-colors">
                <input
                  type="checkbox"
                  checked={settings.addPageNumbers}
                  onChange={(e) => onSettingsChange({ ...settings, addPageNumbers: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-0"
                />
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan-400" />
                  {t.controls.pageNumbers}
                </span>
              </label>

              {/* Header Title */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Type className="w-3.5 h-3.5 text-cyan-400" />
                  {t.controls.headerTitle}
                </span>
                <input
                  type="text"
                  value={settings.headerTitle}
                  onChange={(e) => onSettingsChange({ ...settings, headerTitle: e.target.value })}
                  placeholder={t.controls.headerTitlePlaceholder}
                  className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-2.5 py-1 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              {/* Watermark */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Stamp className="w-3.5 h-3.5 text-cyan-400" />
                  {t.controls.watermark}
                </span>
                <input
                  type="text"
                  value={settings.watermarkText}
                  onChange={(e) => onSettingsChange({ ...settings, watermarkText: e.target.value })}
                  placeholder={t.controls.watermarkPlaceholder}
                  className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-2.5 py-1 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
