import React from 'react';

export const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-card animate-pulse flex flex-col h-[460px]">
      {/* Image skeleton */}
      <div className="w-full h-56 bg-slate-200" />
      {/* Body skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-200 rounded-full w-24" />
            <div className="h-4 bg-slate-200 rounded-full w-16" />
          </div>
          <div className="h-6 bg-slate-200 rounded-lg w-4/5" />
          <div className="h-4 bg-slate-200 rounded-lg w-3/5" />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="h-7 bg-slate-200 rounded-lg w-28" />
          <div className="h-9 bg-slate-200 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
};

export const PropertyDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse space-y-8">
      <div className="h-8 bg-slate-200 rounded-xl w-2/3" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="w-full h-96 bg-slate-200 rounded-3xl" />
          <div className="h-32 bg-slate-200 rounded-2xl" />
          <div className="h-60 bg-slate-200 rounded-2xl" />
        </div>
        <div className="space-y-6">
          <div className="h-64 bg-slate-200 rounded-3xl" />
          <div className="h-64 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;

