import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, MessageCircle, LifeBuoy, ShieldCheck, AlertCircle, Navigation, KeyRound, X } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';
import { MOCK_EVENTS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNav = true }) => {
  const location = useLocation();
  const { language } = useLanguage();
  const [showSafety, setShowSafety] = useState(false);
  const [showTracker, setShowTracker] = useState(true);
  
  const isActive = (path: string) => location.pathname === path;

  // Active Event Tracking (Simulation)
  const activeEvent = MOCK_EVENTS[0]; // Tracking the first event for demo

  return (
    <div className="flex flex-col h-screen bg-dark text-textMain overflow-hidden max-w-md mx-auto shadow-2xl relative border-x border-gray-100">
      <main className={`flex-1 overflow-y-auto no-scrollbar ${showNav ? 'pb-28' : ''} relative`}>
        {children}
        
        {/* Global Support Button */}
        <button 
          onClick={() => setShowSafety(true)}
          className="absolute bottom-32 right-4 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-red-500 z-40 active:scale-95 transition-transform opacity-90 hover:opacity-100 hover:scale-110"
        >
          <LifeBuoy size={24} />
        </button>
      </main>

      {/* Active Event / OTP Tracker - Hover Type */}
      {showNav && showTracker && (
        <div className="absolute bottom-[90px] w-full px-4 z-40 pointer-events-none">
          <div className="flex overflow-x-auto no-scrollbar gap-2 pointer-events-auto relative">
             <div className="bg-white/95 backdrop-blur-md p-3 pr-8 rounded-2xl shadow-xl border border-green-100 flex items-center justify-between gap-3 w-full animate-in slide-in-from-bottom duration-500">
                {/* Close Button */}
                <button 
                  onClick={() => setShowTracker(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full p-1"
                >
                  <X size={14} />
                </button>

                <div className="flex items-center gap-3">
                   <div className="bg-green-100 p-2.5 rounded-xl text-green-600 shadow-inner">
                      <KeyRound size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Upcoming • Today 6PM</p>
                      <p className="font-bold text-sm text-gray-800 truncate max-w-[120px]">{activeEvent.title}</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   <Link to={`/event/${activeEvent.id}`} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-gray-200">
                      OTP
                   </Link>
                   <Link to={`/event/${activeEvent.id}`} className="bg-black text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md hover:bg-gray-800">
                      <Navigation size={12} /> Track
                   </Link>
                </div>
             </div>
          </div>
        </div>
      )}

      {showNav && (
        <nav className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-xl border border-gray-100 h-16 rounded-[2rem] flex items-center justify-between px-6 z-50 shadow-2xl shadow-pink-100/50">
          <Link to="/" className={`flex flex-col items-center justify-center transition-all ${isActive('/') ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
            <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
          </Link>
          
          <Link to="/explore" className={`flex flex-col items-center justify-center transition-all ${isActive('/explore') ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
            <Search size={24} strokeWidth={isActive('/explore') ? 2.5 : 2} />
          </Link>
          
          {/* Center Floating Action */}
          <Link to="/create" className="flex flex-col items-center justify-center -mt-8">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-pink-300 transition-transform active:scale-95 border-4 border-white bg-gradient-to-tr from-primary to-secondary text-white`}>
              <PlusSquare size={26} />
            </div>
          </Link>

          <Link to="/chats" className={`flex flex-col items-center justify-center transition-all ${isActive('/chats') ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
            <MessageCircle size={24} strokeWidth={isActive('/chats') ? 2.5 : 2} />
          </Link>
          
          <Link to="/profile" className={`flex flex-col items-center justify-center transition-all ${isActive('/profile') ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
            <div className={`w-7 h-7 rounded-full overflow-hidden border-2 ${isActive('/profile') ? 'border-primary' : 'border-transparent'}`}>
               <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop" alt="me" className="w-full h-full object-cover" />
            </div>
          </Link>
        </nav>
      )}

      {/* Safety Modal */}
      {showSafety && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 text-red-500">
              <ShieldCheck size={28} />
              <h2 className="text-xl font-bold">{t('safetyCenter', language)}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Your safety is our priority. Use these tools in case of emergency.
            </p>
            <div className="space-y-3">
              <button className="w-full py-4 bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-red-700 transition-colors animate-pulse">
                <ShieldCheck size={20} /> EMERGENCY SOS (Police)
              </button>
              <button className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 border border-red-100 hover:bg-red-100 transition-colors">
                <ShieldCheck size={18} /> Share Live Location
              </button>
              <button className="w-full py-3 bg-gray-50 text-gray-800 font-bold rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                 <AlertCircle size={18} /> Report an Issue
              </button>
            </div>
            <button onClick={() => setShowSafety(false)} className="mt-6 w-full text-center text-gray-400 text-sm font-medium p-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;