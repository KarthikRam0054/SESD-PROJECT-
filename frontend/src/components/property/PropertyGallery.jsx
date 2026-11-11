import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

const PropertyGallery = ({ images = [], title = 'Property Image' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryList = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ];

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % galleryList.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Feature Image Container */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 group shadow-md border border-slate-200">
        <img
          src={galleryList[selectedIndex]}
          alt={`${title} - view ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#142B4A]/80 backdrop-blur-md text-white text-xs font-bold tracking-wider">
          {selectedIndex + 1} / {galleryList.length} Photos
        </div>

        {/* Fullscreen Trigger */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#142B4A] hover:bg-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
          aria-label="View Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>

        {/* Navigation Arrows */}
        {galleryList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-[#142B4A] hover:bg-white hover:scale-105 flex items-center justify-center shadow-lg transition-all active:scale-90 opacity-90 group-hover:opacity-100"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-[#142B4A] hover:bg-white hover:scale-105 flex items-center justify-center shadow-lg transition-all active:scale-90 opacity-90 group-hover:opacity-100"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {galleryList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {galleryList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative flex-shrink-0 w-24 sm:w-28 aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-[#14B8A6] ring-2 ring-[#14B8A6]/30 scale-95'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={galleryList[selectedIndex]}
                alt="Enlarged view"
                className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />

              {galleryList.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute -left-4 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center shadow-lg transition-transform active:scale-90"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute -right-4 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center shadow-lg transition-transform active:scale-90"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyGallery;

