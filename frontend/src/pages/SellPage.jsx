import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import Step1Basic from '../components/sell/Step1Basic';
import Step2Details from '../components/sell/Step2Details';
import Step3Location from '../components/sell/Step3Location';
import Step4Images from '../components/sell/Step4Images';
import Step5OwnerInfo from '../components/sell/Step5OwnerInfo';
import Step6Preview from '../components/sell/Step6Preview';
import { propertyService } from '../services/propertyService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const STEPS = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Details' },
  { id: 3, title: 'Location' },
  { id: 4, title: 'Images' },
  { id: 5, title: 'Owner' },
  { id: 6, title: 'Publish' }
];

const SellPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { success, error, warning } = useToast();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Individual Houses',
    listingType: 'sale',
    description: '',
    price: '',
    size: '',
    sizeUnit: 'sq ft',
    bedrooms: 3,
    bathrooms: 3,
    floors: 2,
    communityType: 'Individual Property',
    furnishedStatus: 'Unfurnished',
    propertyCondition: 'New',
    parking: true,
    amenities: ['24/7 Security', 'Power Backup'],
    location: {
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      area: '',
      address: '',
      coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    images: [],
    coverImage: '',
    ownerName: user?.fullName || '',
    ownerPhone: user?.phone || '',
    ownerEmail: user?.email || '',
    hidePhone: user?.hidePhone || false,
    hideEmail: user?.hideEmail || false
  });

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.title.trim()) {
        warning('Please enter a property title');
        return false;
      }
      if (!formData.description.trim()) {
        warning('Please provide a description of the property');
        return false;
      }
    } else if (step === 2) {
      if (!formData.price || Number(formData.price) <= 0) {
        warning('Please enter a valid property price');
        return false;
      }
      if (!formData.size || Number(formData.size) <= 0) {
        warning('Please enter the property size');
        return false;
      }
    } else if (step === 3) {
      if (!formData.location.city) {
        warning('Please select a city');
        return false;
      }
      if (!formData.location.area.trim()) {
        warning('Please specify the area/locality');
        return false;
      }
      if (!formData.location.address.trim()) {
        warning('Please provide the complete address');
        return false;
      }
    } else if (step === 4) {
      if (!formData.images || formData.images.length === 0) {
        warning('Please upload or select at least 1 image');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      warning('Please sign in to publish your property listing');
      navigate('/login');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await propertyService.createProperty(formData);
      success('Property published successfully!');
      navigate(`/properties/${res.property._id}`);
    } catch (err) {
      error(err.customMessage || 'Failed to publish property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
          Direct Owner Listing
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#142B4A]">
          List Your Property on REALTOR
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Reach genuine buyers directly with zero brokerage commissions and integrated real-time chat.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between relative">
          {/* Background Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-0" />

          {STEPS.map((s) => {
            const isCompleted = currentStep > s.id;
            const isCurrent = currentStep === s.id;

            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => s.id < currentStep && setCurrentStep(s.id)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-sm ${
                    isCompleted
                      ? 'bg-[#14B8A6] text-white'
                      : isCurrent
                      ? 'bg-[#142B4A] text-white ring-4 ring-[#14B8A6]/20'
                      : 'bg-white border-2 border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : s.id}
                </button>
                <span
                  className={`mt-2 text-[10px] sm:text-xs font-bold hidden sm:block ${
                    isCurrent ? 'text-[#142B4A]' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-card">
        <form onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <Step1Basic formData={formData} updateFormData={updateFormData} />
              )}
              {currentStep === 2 && (
                <Step2Details formData={formData} updateFormData={updateFormData} />
              )}
              {currentStep === 3 && (
                <Step3Location formData={formData} updateFormData={updateFormData} />
              )}
              {currentStep === 4 && (
                <Step4Images formData={formData} updateFormData={updateFormData} />
              )}
              {currentStep === 5 && (
                <Step5OwnerInfo
                  formData={formData}
                  updateFormData={updateFormData}
                  user={user}
                />
              )}
              {currentStep === 6 && (
                <Step6Preview formData={formData} isSubmitting={isSubmitting} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons Bottom Row */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 rounded-2xl border border-slate-200 hover:border-slate-300 font-bold text-sm text-slate-700 flex items-center gap-2 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : <div />}

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 rounded-2xl bg-[#142B4A] hover:bg-[#14B8A6] text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-2xl bg-[#14B8A6] hover:bg-[#0d9488] text-white font-black text-sm shadow-lg hover:shadow-xl flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Publishing...' : 'Publish Property'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;

