import React, { useState } from 'react';
import Layout from '../components/Layout';
import { MOCK_EVENTS, TEXTS } from '../constants';
import { MapPin, Search, User, Navigation, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const Explore: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'FRIENDS'>('ALL');
  const { language } = useLanguage();

  // Pseudo-random logic to place pins
  const getCoordinates = (id: string) => {
    const seed = id.charCodeAt(id.length - 1);
    const top = (seed * 17) % 70 + 15; 
    const left = (seed * 31) % 80 + 10;
    return { top: `${top}%`, left: `${left}%` };
  };

  const selectedEvent = MOCK_EVENTS.find(e => e.id === selectedEventId);

  // Filter events if needed
  const visibleEvents = MOCK_EVENTS.filter(e => {
    if (filterType === 'FRIENDS') return (e.mutualFriends || 0) > 0;
    return true;
  });

  return (
    <Layout>
      <div className="relative h-full w-full bg-[#e5e7eb] overflow-hidden">
        {/* Real Map Simulation - iframe background */}
        <iframe 
           title="map"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.803194574977!2d72.825833!3d19.018231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8256a94775%3A0x6b16703551d74623!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1697541234567!5m2!1sen!2sin" 
           width="100%" 
           height="110%" 
           style={{ border: 0, position: 'absolute', top: '-10%', left: 0, opacity: 0.8, filter: 'grayscale(0.1)' }} 
           loading="lazy" 
           allowFullScreen
        ></iframe>

        {/* Map UI Overlay */}
        <div className="absolute top-0 w-full p-4 z-20 bg-gradient-to-b from-white/90 via-white/50 to-transparent pb-10">
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full p-3 flex items-center gap-2 shadow-lg mb-3">
             <Search className="text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder={t('discover', language)}
               className="bg-transparent border-none outline-none text-gray-800 text-sm w-full placeholder-gray-400"
             />
          </div>
          {/* Social Filter Buttons */}
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => setFilterType('ALL')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-md transition-colors ${filterType === 'ALL' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
            >
              All Events
            </button>
            <button 
              onClick={() => setFilterType('FRIENDS')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-md transition-colors flex items-center gap-1 ${filterType === 'FRIENDS' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              <Users size={12} /> Friends Near
            </button>
          </div>
        </div>

        {/* Pins with Profile Pictures */}
        <div className="absolute inset-0 z-10">
          {visibleEvents.map(event => {
            const coords = getCoordinates(event.id);
            const isSelected = selectedEventId === event.id;
            const hasFriends = (event.mutualFriends || 0) > 0;

            return (
              <button
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 group ${isSelected ? 'z-30 scale-125' : 'z-10 hover:scale-110'}`}
                style={{ top: coords.top, left: coords.left }}
              >
                <div className="relative flex flex-col items-center">
                   {/* Friend Badge */}
                   {hasFriends && (
                     <div className="absolute -top-2 -right-2 z-20 bg-blue-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-white flex items-center gap-0.5 animate-bounce">
                       <Users size={8} /> {event.mutualFriends}
                     </div>
                   )}

                   {/* Profile Bubble */}
                   <div className={`w-12 h-12 rounded-full border-4 overflow-hidden shadow-xl transition-colors bg-white ${isSelected ? 'border-primary' : hasFriends ? 'border-blue-400' : 'border-white'}`}>
                      <img src={event.hostAvatar} alt="host" className="w-full h-full object-cover" />
                   </div>
                   
                   {/* Triangle Pointer */}
                   <div className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] -mt-1 ${isSelected ? 'border-t-primary' : hasFriends ? 'border-t-blue-400' : 'border-t-white'}`}></div>
                   
                   {/* Label */}
                   {!isSelected && (
                     <div className="absolute -bottom-8 bg-black/70 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm">
                        {event.title}
                     </div>
                   )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Event Preview Card */}
        {selectedEvent && (
          <div className="absolute bottom-20 left-4 right-4 z-30 animate-in slide-in-from-bottom duration-300">
            <Link to={`/event/${selectedEvent.id}`}>
              <div className="bg-white p-4 rounded-2xl shadow-2xl flex gap-3 items-center border border-gray-100 relative">
                 <button 
                    onClick={(e) => {e.preventDefault(); setSelectedEventId(null)}} 
                    className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md text-gray-400 hover:text-red-500"
                 >
                   <Navigation size={16} className="rotate-45" />
                 </button>
                 <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
                   <img src={selectedEvent.image} alt="event" className="w-full h-full object-cover" />
                   {selectedEvent.mutualFriends && selectedEvent.mutualFriends > 0 && (
                     <div className="absolute bottom-0 left-0 w-full bg-blue-500/80 text-white text-[8px] text-center font-bold py-0.5">
                       {selectedEvent.mutualFriends} Friends
                     </div>
                   )}
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-1 mb-1">
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">{selectedEvent.type}</span>
                      <span className="text-[10px] text-gray-400">• {selectedEvent.distanceKm}km away</span>
                   </div>
                   <h3 className="font-bold text-gray-900 truncate">{selectedEvent.title}</h3>
                   <div className="flex items-center gap-1 mt-1">
                      <img src={selectedEvent.hostAvatar} className="w-4 h-4 rounded-full"/>
                      <p className="text-xs text-gray-500 truncate">{selectedEvent.hostName}</p>
                   </div>
                 </div>
                 <div className="flex flex-col items-end gap-1">
                   <span className="font-bold text-white bg-primary px-3 py-1 rounded-lg text-sm shadow-md shadow-pink-200">₹{selectedEvent.price}</span>
                   <span className="text-[10px] text-primary font-bold">Details &rarr;</span>
                 </div>
              </div>
            </Link>
          </div>
        )}

        {/* Floating My Location Button */}
        <button className="absolute bottom-24 right-4 bg-white p-3 rounded-full shadow-lg text-gray-700 z-20 hover:bg-gray-50">
           <Navigation size={20} className="fill-current" />
        </button>
      </div>
    </Layout>
  );
};

export default Explore;