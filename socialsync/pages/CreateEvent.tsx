import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ChevronLeft, Sparkles, AlertCircle, Zap, Map, MapPin, Lock, Award, Image, Camera } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import { enhanceDescription } from '../services/geminiService';
import { MOCK_USER, TEXTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [loadingAi, setLoadingAi] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);
  
  // Gatekeeping Logic
  useEffect(() => {
    if (!MOCK_USER.isSubscribed) {
       setIsGateOpen(false);
    } else {
       setIsGateOpen(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Coffee',
    price: '',
    location: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEnhanceDescription = async () => {
    if (!formData.description) return;
    setLoadingAi(true);
    const improved = await enhanceDescription(formData.description, formData.type);
    setFormData(prev => ({ ...prev, description: improved }));
    setLoadingAi(false);
  };

  const suggestPrice = () => {
    const prices: any = { 'Coffee': 499, 'Trip': 3500, 'Movie': 350, 'Party': 999, 'Dating': 850 };
    const base = prices[formData.type] || 500;
    setFormData(prev => ({ ...prev, price: base }));
  };

  const handleLocationPick = (pickedLocation: string) => {
    setFormData(prev => ({ ...prev, location: pickedLocation }));
    setShowMapPicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Event Created! (Simulation)");
    navigate('/');
  };

  if (!isGateOpen) {
    return (
      <Layout>
        <div className="p-6 pt-20 flex flex-col items-center justify-center min-h-[80vh] text-center">
           <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl mb-6 animate-pulse">
             <Award size={48} className="text-white" />
           </div>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Premium Feature</h2>
           <p className="text-gray-500 mb-8 max-w-[250px]">
             Only Verified Premium Hosts can organize events. This ensures safety and quality.
           </p>
           <button 
             onClick={() => navigate('/profile')}
             className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
           >
             {t('upgradeToHost', language)}
           </button>
           <button 
             onClick={() => navigate('/')}
             className="mt-4 text-gray-400 font-medium text-sm"
           >
             Back to Home
           </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 pt-8 min-h-full">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-white shadow-sm border border-gray-100 rounded-full text-gray-500">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Host an Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Image Upload Mock */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Event Photos</label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                 <div className="w-24 h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 shrink-0">
                    <Camera size={24} />
                    <span className="text-[10px] font-bold mt-1">Cover</span>
                 </div>
                 <div className="w-24 h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 shrink-0">
                    <Image size={24} />
                    <span className="text-[10px] font-bold mt-1">Gallery</span>
                 </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Event Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:border-primary transition-colors appearance-none shadow-sm"
              >
                <option value="Coffee">☕ Coffee Meetup</option>
                <option value="Trip">✈️ Travel/Trip</option>
                <option value="Movie">🎬 Movie Night</option>
                <option value="Party">🎉 House Party</option>
                <option value="Dating">❤️ Social Date</option>
                <option value="Stay">🏠 Flat/Room Share</option>
                <option value="Other">✨ Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                placeholder="Ex: Evening Coffee at Starbs" 
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
              <div className="flex gap-2">
                 <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange}
                  placeholder="Where are we meeting?" 
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors shadow-sm"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowMapPicker(true)}
                  className="bg-white border border-gray-200 rounded-xl px-4 text-primary hover:bg-pink-50"
                >
                  <Map size={20} />
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-gray-500">Ticket Price (₹)</label>
                <button type="button" onClick={suggestPrice} className="text-[10px] text-primary flex items-center gap-1 font-medium bg-pink-50 px-2 py-0.5 rounded-full">
                  <Zap size={10} /> AI Suggestion
                </button>
              </div>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange}
                placeholder="499" 
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors shadow-sm"
                required
              />
              <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                <AlertCircle size={10} />
                You will receive 92% of this amount. 8% commission applies.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-gray-500">Description</label>
                <button 
                  type="button" 
                  onClick={handleEnhanceDescription}
                  disabled={loadingAi || !formData.description}
                  className="text-[10px] flex items-center gap-1 text-primary font-medium disabled:opacity-50"
                >
                  <Sparkles size={10} />
                  {loadingAi ? 'Enhancing...' : 'AI Enhance'}
                </button>
              </div>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                rows={4}
                placeholder="Describe the vibe..." 
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors shadow-sm"
                required
              />
            </div>
          </div>

          <div className="pt-4 pb-20">
             <button 
               type="submit" 
               className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 transition-all active:scale-95"
             >
               Publish Event
             </button>
          </div>
        </form>

        {/* Map Picker Modal (Mock) */}
        {showMapPicker && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom">
            <div className="p-4 flex items-center justify-between border-b border-gray-100 shadow-sm z-10 bg-white">
              <h3 className="font-bold">Pick Location</h3>
              <button onClick={() => setShowMapPicker(false)} className="text-gray-500 font-medium">Cancel</button>
            </div>
            <div className="flex-1 bg-gray-100 relative">
              {/* Fake Map Background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="flex flex-col items-center">
                    <MapPin size={40} className="text-primary mb-2 drop-shadow-lg" fill="white" />
                    <div className="bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold">
                      Drag to move
                    </div>
                 </div>
              </div>
              
              {/* Simulate clickable areas */}
              <button 
                onClick={() => handleLocationPick("Jubilee Hills, Hyderabad")}
                className="absolute top-1/4 left-1/4 p-2 bg-white rounded-full shadow-md text-xs font-bold"
              >
                📍 Jubilee
              </button>
              <button 
                onClick={() => handleLocationPick("Hitech City, Hyderabad")}
                className="absolute bottom-1/4 right-1/4 p-2 bg-white rounded-full shadow-md text-xs font-bold"
              >
                📍 Hitech
              </button>
            </div>
            <div className="p-4 bg-white border-t border-gray-100">
               <button 
                 onClick={() => handleLocationPick("Custom Pin Location, Hyderabad")}
                 className="w-full bg-primary text-white font-bold py-3 rounded-xl"
               >
                 Confirm Location
               </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateEvent;