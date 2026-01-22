import React, { useState } from 'react';
import Layout from '../components/Layout';
import EventCard from '../components/EventCard';
import { MOCK_EVENTS, CATEGORIES, VIBES, MOCK_STORIES, MOCK_POLLS } from '../constants';
import { Sparkles, MapPin, Zap, Bell, PlusSquare, Calendar, Filter, BarChart2, X, ChevronRight, ChevronLeft, Heart, HelpCircle, Award, Search, Mic } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);
  const [viewingStory, setViewingStory] = useState<string | null>(null);

  const filteredEvents = MOCK_EVENTS.filter(e => {
    const catMatch = selectedCategory === 'all' || e.type === selectedCategory;
    const vibeMatch = !selectedVibe || e.vibe === selectedVibe;
    return catMatch && vibeMatch;
  });

  const activeStory = MOCK_STORIES.find(s => s.id === viewingStory);

  return (
    <Layout>
      <div className="p-4 pt-6 bg-dark min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-1 text-gray-500 text-xs mb-0.5 font-medium uppercase tracking-wide">
              <MapPin size={10} className="text-primary" />
              <span>Hyderabad, India</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Social<span className="text-primary">Sync</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/notifications')}
              className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center relative border border-gray-100 hover:scale-105 transition-transform"
            >
               <Bell size={20} className="text-gray-700" />
               <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
            </button>
          </div>
        </div>

        {/* Stories Rail */}
        <div className="mb-6 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
           <div className="flex gap-4">
             <div className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0">
                <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-white shadow-sm">
                   <PlusSquare size={28} className="text-primary" />
                </div>
                <span className="text-[11px] font-bold text-gray-600">{t('addStory', language)}</span>
             </div>
             {MOCK_STORIES.map(story => (
               <div key={story.id} className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group" onClick={() => setViewingStory(story.id)}>
                  <div className="w-[72px] h-[72px] rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 group-hover:scale-105 transition-transform">
                     <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                        <img src={story.thumbnail} alt={story.userName} className="w-full h-full object-cover" />
                     </div>
                  </div>
                  <span className="text-[11px] font-medium text-gray-700">{story.userName}</span>
               </div>
             ))}
           </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
           <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
           </div>
           <input 
             type="text" 
             placeholder="Find coffee, parties, people..." 
             className="w-full bg-white border-none py-3.5 pl-10 pr-10 rounded-2xl shadow-sm text-sm font-medium focus:ring-2 focus:ring-pink-100 outline-none"
           />
           <div className="absolute inset-y-0 right-3 flex items-center">
              <button className="bg-gray-100 p-1.5 rounded-lg text-gray-500">
                 <Filter size={14} />
              </button>
           </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                selectedCategory === cat.id 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                  : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Date Filter & Vibes */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
           <button 
             onClick={() => setShowDatePicker(!showDatePicker)}
             className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-bold whitespace-nowrap ${showDatePicker ? 'bg-pink-100 text-primary border-pink-200' : 'bg-white border-gray-200 text-gray-600'}`}
           >
             <Calendar size={14} /> This Week
           </button>
           <div className="h-6 w-px bg-gray-200 mx-1"></div>
           {VIBES.map(vibe => (
            <button
              key={vibe.id}
              onClick={() => setSelectedVibe(selectedVibe === vibe.id ? null : vibe.id)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all border whitespace-nowrap ${
                 selectedVibe === vibe.id 
                 ? 'bg-primary/10 text-primary border-primary/20' 
                 : 'bg-white text-gray-400 border-transparent hover:bg-white hover:border-gray-200'
              }`}
            >
              #{vibe.name}
            </button>
          ))}
        </div>
        
        {/* Date Picker Expanded */}
        {showDatePicker && (
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-lg mb-6 animate-in slide-in-from-top-2">
             <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-3 tracking-wider">
               <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
             </div>
             <div className="flex justify-between font-bold text-sm text-gray-800">
               <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">12</span>
               <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full shadow-md shadow-pink-200 cursor-pointer">13</span>
               <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">14</span>
               <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">15</span>
               <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">16</span>
               <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">17</span>
               <span className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">18</span>
             </div>
          </div>
        )}

        {/* City Pulse (Polls) */}
        <div className="mb-8 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-4 shadow-lg text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
           <div className="flex items-center gap-2 mb-4 relative z-10">
             <BarChart2 size={16} className="text-violet-200" />
             <h3 className="font-bold text-sm tracking-wide uppercase opacity-90">{t('geoPolls', language)}</h3>
             <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-bold ml-auto flex items-center gap-1">
               <Zap size={10} className="fill-yellow-400 text-yellow-400" /> Earn 50 pts
             </span>
           </div>
           
           <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 relative z-10">
             <h4 className="text-sm font-bold mb-3">{MOCK_POLLS[0].question}</h4>
             <div className="space-y-2">
               {MOCK_POLLS[0].options.map(opt => {
                 const percent = Math.round((opt.votes / MOCK_POLLS[0].totalVotes) * 100);
                 const isSelected = selectedPollOption === opt.id;
                 return (
                   <div 
                     key={opt.id} 
                     onClick={() => setSelectedPollOption(opt.id)}
                     className={`relative h-9 rounded-lg overflow-hidden cursor-pointer transition-all ${isSelected ? 'ring-2 ring-white' : 'hover:bg-white/5'}`}
                   >
                      <div className="absolute inset-0 bg-black/20 z-0"></div>
                      <div className="absolute top-0 left-0 h-full bg-white/30 z-10 transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3 z-20 text-xs font-bold">
                        <span>{opt.text}</span>
                        <span>{percent}%</span>
                      </div>
                   </div>
                 );
               })}
             </div>
           </div>
        </div>

        {/* Feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-900">{t('nearby', language)}</h2>
             <button className="text-xs font-bold text-primary">See All</button>
          </div>
          <div className="pb-10">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer Overlay */}
      {viewingStory && activeStory && (
        <div className="fixed inset-0 z-[70] bg-black flex flex-col items-center justify-center animate-in fade-in duration-200">
           {/* Progress */}
           <div className="absolute top-4 left-0 w-full px-2 flex gap-1 z-20">
              <div className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-[width_5s_linear_forwards] w-full origin-left" style={{animationDuration: '10s'}}></div>
              </div>
           </div>

           {/* User Info */}
           <div className="absolute top-8 left-0 w-full px-4 flex justify-between items-center z-20">
             <div className="flex items-center gap-3">
               <img src={activeStory.userAvatar} className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
               <span className="text-white font-bold text-sm shadow-black/50 drop-shadow-md">{activeStory.userName}</span>
               <span className="text-white/80 text-xs">2h ago</span>
             </div>
             <button onClick={() => setViewingStory(null)} className="text-white bg-black/20 p-2 rounded-full backdrop-blur-xl">
               <X size={24} />
             </button>
           </div>
           
           {/* Video */}
           <div className="w-full h-full relative">
              <video 
                src={activeStory.videoUrl} 
                className="w-full h-full object-cover" 
                autoPlay 
                playsInline
                loop
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
           </div>

           {/* Input */}
           <div className="absolute bottom-8 w-full px-4 z-20 pb-safe">
             <div className="flex gap-3">
               <input 
                 type="text" 
                 placeholder="Send message..." 
                 className="flex-1 bg-transparent border border-white/40 rounded-full px-5 py-3 text-white placeholder-white/70 outline-none focus:border-white backdrop-blur-md"
               />
               <button className="p-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-md text-white active:scale-95 transition-transform">
                  <Heart size={24} />
               </button>
             </div>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;