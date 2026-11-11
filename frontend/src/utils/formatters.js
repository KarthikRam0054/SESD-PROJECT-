// Formats numbers into Indian Lakhs / Crores or thousands cleanly
export const formatPrice = (price, listingType = 'sale') => {
  if (price === undefined || price === null || isNaN(price)) return '₹ --';

  const num = Number(price);

  if (listingType === 'rent') {
    return `₹${num.toLocaleString('en-IN')}/mo`;
  }

  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${cr} Cr`;
  }
  if (num >= 100000) {
    const lk = (num / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹${lk} Lakh`;
  }

  return `₹${num.toLocaleString('en-IN')}`;
};

export const formatFullPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '₹0';
  return `₹${Number(price).toLocaleString('en-IN')}`;
};

export const formatSize = (size, unit = 'sq ft') => {
  if (!size) return '--';
  return `${Number(size).toLocaleString('en-IN')} ${unit}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

