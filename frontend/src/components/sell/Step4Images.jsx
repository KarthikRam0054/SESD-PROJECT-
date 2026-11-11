import React, { useState } from 'react';
import { UploadCloud, X, Star, Plus, Image as ImageIcon } from 'lucide-react';
import { SAMPLE_GALLERY_IMAGES } from '../../utils/constants';
import { propertyService } from '../../services/propertyService';
import { useToast } from '../../context/ToastContext';

const Step4Images = ({ formData, updateFormData }) => {
  const { success, error, info } = useToast();
  const [uploading, setUploading] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');

  const images = formData.images || [];

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const res = await propertyService.uploadMultipleImages(files);
      if (res.success && res.urls) {
        const updated = [...images, ...res.urls];
        updateFormData({
          images: updated,
          coverImage: formData.coverImage || updated[0]
        });
        success(`Successfully uploaded ${res.urls.length} image(s)!`);
      }
    } catch (err) {
      error(err.customMessage || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleAddSampleImage = (url) => {
    if (images.includes(url)) {
      info('Image already added');
      return;
    }
    const updated = [...images, url];
    updateFormData({
      images: updated,
      coverImage: formData.coverImage || updated[0]
    });
  };

  const handleAddCustomUrl = (e) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    const url = customUrlInput.trim();
    if (images.includes(url)) {
      info('Image already in list');
      return;
    }
    const updated = [...images, url];
    updateFormData({
      images: updated,
      coverImage: formData.coverImage || updated[0]
    });
    setCustomUrlInput('');
    success('Image URL added');
  };

  const handleRemoveImage = (indexToRemove) => {
    const removedUrl = images[indexToRemove];
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    let newCover = formData.coverImage;
    if (newCover === removedUrl) {
      newCover = updated.length > 0 ? updated[0] : '';
    }
    updateFormData({
      images: updated,
      coverImage: newCover
    });
  };

  const handleSetCover = (url) => {
    updateFormData({ coverImage: url });
    success('Cover image updated');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-[#142B4A]">Step 4: Property Images</h3>
        <p className="text-sm text-slate-500">
          Upload real photos of your property or pick from our curated architectural gallery. High quality images increase buyer inquiries by over 300%.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="relative border-2 border-dashed border-slate-300 hover:border-[#14B8A6] rounded-3xl p-8 text-center bg-slate-50/50 hover:bg-white transition-all cursor-pointer group">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div className="w-16 h-16 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#142B4A]">
              {uploading ? 'Uploading images to server...' : 'Drag & drop photos here, or click to browse'}
            </p>
            <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP up to 10MB each</p>
          </div>
        </div>
      </div>

      {/* Add via direct Image URL */}
      <form onSubmit={handleAddCustomUrl} className="flex gap-2">
        <input
          type="url"
          placeholder="Paste image web URL (e.g. https://...)"
          value={customUrlInput}
          onChange={(e) => setCustomUrlInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#14B8A6]"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-[#14B8A6] transition-colors"
        >
          Add URL
        </button>
      </form>

      {/* Uploaded Images Preview Grid */}
      {images.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-[#142B4A]">
              Selected Photos ({images.length})
            </h4>
            <span className="text-xs text-slate-400">Click star to set as main cover photo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((imgUrl, idx) => {
              const isCover = formData.coverImage === imgUrl;
              return (
                <div
                  key={idx}
                  className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border-2 shadow-sm ${
                    isCover ? 'border-[#14B8A6] ring-2 ring-[#14B8A6]/20' : 'border-slate-200'
                  }`}
                >
                  <img src={imgUrl} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />

                  {/* Badges / Controls Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSetCover(imgUrl)}
                      className={`p-2 rounded-full text-white shadow-md transition-transform hover:scale-110 ${
                        isCover ? 'bg-[#14B8A6]' : 'bg-white/30 hover:bg-[#14B8A6]'
                      }`}
                      title="Set as Cover"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-2 rounded-full bg-rose-600 text-white shadow-md hover:scale-110 transition-transform"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {isCover && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#14B8A6] text-white text-[10px] font-bold shadow-sm">
                      Cover
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          ⚠️ Please add at least 1 property photo or select from the sample gallery below to proceed.
        </div>
      )}

      {/* Curated Sample Gallery for Quick Demo */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <ImageIcon className="w-4 h-4 text-[#14B8A6]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Or Pick Sample High-Resolution Photos
          </h4>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {SAMPLE_GALLERY_IMAGES.map((sampleUrl, sIdx) => {
            const isAlreadyAdded = images.includes(sampleUrl);
            return (
              <button
                key={sIdx}
                type="button"
                onClick={() => handleAddSampleImage(sampleUrl)}
                className={`relative flex-shrink-0 w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                  isAlreadyAdded ? 'opacity-40 border-slate-300' : 'border-transparent hover:border-[#14B8A6]'
                }`}
              >
                <img src={sampleUrl} alt="Sample" className="w-full h-full object-cover" />
                {!isAlreadyAdded && (
                  <div className="absolute inset-0 bg-[#142B4A]/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Step4Images;

