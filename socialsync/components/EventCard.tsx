import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ShieldCheck, Users, Bookmark, Heart } from './Icons';
import { Event } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { language } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);

  const capacityPercentage = Math.min((event.attendees / event.maxAttendees) * 100, 100);
  let progressColor = 'bg-green-500';
  if (capacityPercentage > 50) progressColor = 'bg-yellow-500';
  if (capacityPercentage > 85) progressColor = 'bg-red-500';

  return (
    <div className="block mb-6 group px-1 relative">
      <div className="bg-surface rounded-[24px] overflow-hidden border border-gray-100 shadow-soft relative transition-all active:scale-[0.99] hover:shadow-lg">
        
        {/* Bookmark Button */}
        <button 
           onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
           className="absolute top-4 right-4 z-20 bg-white/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/50 transition-colors"
        >
           <Bookmark size={18} className={isSaved ? "fill-white" : ""} />
        </button>

        <Link to={`/event/${event.id}`}>
        {/* Image */}
        <div className="h-56 w-full relative overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">{event.type}</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
             <div>
                <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md mb-1">{event.title}</h3>
                <div className="flex items-center gap-1 text-gray-200 text-xs font-medium">
                  <MapPin size={12} className="text-pink-400" />
                  <span className="truncate max-w-[200px]">{event.location}</span>
                </div>
             </div>
             <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg">
                <span className="text-sm font-bold text-gray-900">₹{event.price}</span>
             </div>
          </div>
        </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          
          {/* Social Row: Host & Mutuals */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src={event.hostAvatar} alt={event.hostName} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                    {event.hostName} {event.hostVerified && <ShieldCheck size={12} className="text-blue-500 fill-blue-50" />}
                 </span>
                 {event.mutualFriends && event.mutualFriends > 0 ? (
                   <span className="text-[10px] text-gray-500 flex items-center gap-1">
                     <Users size={10} /> {event.mutualFriends} {t('mutualFriends', language)}
                   </span>
                 ) : (
                   <span className="text-[10px] text-gray-400">Host</span>
                 )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
               {event.vibe && (
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-bold border border-gray-200">
                    {event.vibe}
                  </span>
                )}
            </div>
          </div>

          <Link to={`/event/${event.id}`}>
            {/* Capacity Progress Bar */}
            <div className="mb-2 bg-gray-50 rounded-xl p-3 border border-gray-100">
               <div className="flex justify-between text-[10px] font-bold mb-1.5">
                 <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={12} />
                    <span>{event.date}</span>
                 </div>
                 <span className={`${capacityPercentage > 90 ? 'text-red-500' : 'text-green-600'}`}>
                   {event.attendees}/{event.maxAttendees} {t('going', language)}
                 </span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${progressColor}`} 
                    style={{ width: `${capacityPercentage}%` }}
                  ></div>
               </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;