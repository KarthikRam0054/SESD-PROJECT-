import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, SearchX } from 'lucide-react';

const EmptyState = ({
  icon: Icon = SearchX,
  title = 'No Properties Found',
  description = 'We couldn’t find any properties matching your current search criteria. Try adjusting or clearing your filters.',
  actionText = 'Browse All Properties',
  actionLink = '/buy',
  onActionClick
}) => {
  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-lg mx-auto my-8">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center mb-6 shadow-inner">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-extrabold text-[#142B4A] mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
      {actionLink ? (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#142B4A] hover:bg-[#14B8A6] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          {actionText}
        </Link>
      ) : onActionClick ? (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#142B4A] hover:bg-[#14B8A6] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;

