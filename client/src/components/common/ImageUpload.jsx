import React, { useState, useRef } from 'react';
import { Plus, Upload, Image as ImageIcon, Link as LinkIcon, X, Check, RefreshCw } from 'lucide-react';

const ImageUpload = ({
  value = '',
  onChange,
  label = 'Upload Image',
  helpText = 'Select an image photo from your system device',
  required = false,
  aspectRatio = 'banner' // 'banner' | 'card' | 'square'
}) => {
  const [mode, setMode] = useState('file'); // 'file' | 'url'
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  // Compress & resize image to standard WebP/JPEG data URL for optimum DB storage
  const processAndSetFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to web optimized jpeg / webp
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        onChange(compressedDataUrl);
        setIsProcessing(false);
      };

      img.onerror = () => {
        // Fallback to raw result if canvas compression fails (e.g. SVG)
        onChange(e.target.result);
        setIsProcessing(false);
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      alert('Failed to read image file from system.');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndSetFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const openSystemFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      {/* Label Header */}
      <div className="flex items-center justify-between">
        <label className="block text-slate-800 font-extrabold text-xs flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-orange-500" />
          <span>{label} {required && <span className="text-red-500">*</span>}</span>
        </label>

        {/* Upload Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode('file')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              mode === 'file'
                ? 'bg-white text-orange-600 shadow-sm font-extrabold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-white text-orange-600 shadow-sm font-extrabold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Web Link</span>
          </button>
        </div>
      </div>

      {helpText && <p className="text-[11px] text-slate-500 font-medium">{helpText}</p>}

      {/* Hidden system file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Zone */}
      {mode === 'file' ? (
        value ? (
          /* Preview Mode with system upload option */
          <div className="relative group rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-900 shadow-md">
            <img
              src={value}
              alt="Uploaded Preview"
              className={`w-full object-cover transition-opacity ${
                aspectRatio === 'banner' ? 'h-48' : aspectRatio === 'square' ? 'h-36' : 'h-40'
              }`}
            />
            
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3 p-4">
              <button
                type="button"
                onClick={openSystemFilePicker}
                className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Upload New Photo</span>
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-all"
              >
                <X className="w-4 h-4 stroke-[3]" />
                <span>Remove</span>
              </button>
            </div>

            <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Check className="w-3 h-3" /> System Image Loaded
            </div>
          </div>
        ) : (
          /* Dropzone with Plus Icon */
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openSystemFilePicker}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-orange-500 bg-orange-50/80 scale-[0.99]'
                : 'border-slate-300 hover:border-orange-500 bg-slate-50/70 hover:bg-orange-50/30'
            }`}
          >
            {isProcessing ? (
              <div className="py-4 flex flex-col items-center justify-center space-y-2">
                <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
                <span className="text-xs font-bold text-slate-700">Processing & Optimizing Image...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                {/* Prominent Plus Upload Icon */}
                <div className="w-12 h-12 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm group-hover:scale-110 transition-transform">
                  <Plus className="w-7 h-7 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-800 block">
                    Click here or Drag & Drop photo from system
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    Supports PNG, JPG, JPEG, WEBP (Auto-optimized for web)
                  </span>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        /* Direct Web URL Mode */
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
          {value && (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 h-36 bg-slate-100">
              <img src={value} alt="URL Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
