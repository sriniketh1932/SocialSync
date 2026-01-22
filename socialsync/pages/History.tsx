import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowLeft, Calendar, MapPin, Navigation, KeyRound, CheckCircle2, XCircle } from '../components/Icons';
import { MOCK_EVENTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const History: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');

  const upcomingEvents = MOCK_EVENTS.slice(0, 2); // Simulating upcoming
  const pastEvents = MOCK_EVENTS.slice(2, 5); // Simulating past

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pb-24 pt-8 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-gray-500 border border-gray-100">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('history', language)}</h1>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-white rounded-xl border border-gray-100 mb-6">
          <button 
            onClick={() => setActiveTab('UPCOMING')}
            className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${activeTab === 'UPCOMING' ? 'bg-primary text-white shadow-md' : 'text-gray-500'}`}
          >
            Upcoming / Active
          </button>
          <button 
            onClick={() => setActiveTab('PAST')}
            className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${activeTab === 'PAST' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-500'}`}
          >
            Past Events
          </button>
        </div>

        {/* List */}
        <div className="space-y-4">
          {activeTab === 'UPCOMING' && upcomingEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
               <div className="flex gap-4 mb-4">
                 <img src={event.image} className="w-20 h-20 rounded-xl object-cover" alt={event.title} />
                 <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start">
                     <h3 className="font-bold text-gray-900 truncate pr-2">{event.title}</h3>
                     <span className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full border border-green-100">CONFIRMED</span>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                     <Calendar size={12} /> {event.date}
                   </div>
                   <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                     <MapPin size={12} /> {event.location}
                   </div>
                 </div>
               </div>

               {/* Action Buttons for Tracking */}
               <div className="flex gap-3">
                 <Link to={`/event/${event.id}`} className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-colors">
                    <Navigation size={14} /> Track & Details
                 </Link>
                 <Link to={`/event/${event.id}`} className="flex-1 bg-green-50 text-green-700 border border-green-200 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-green-100 transition-colors">
                    <KeyRound size={14} /> Enter OTP
                 </Link>
               </div>
            </div>
          ))}

          {activeTab === 'PAST' && pastEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 opacity-75 hover:opacity-100 transition-opacity">
               <img src={event.image} className="w-16 h-16 rounded-xl object-cover grayscale" alt={event.title} />
               <div className="flex-1">
                 <h3 className="font-bold text-gray-800 text-sm">{event.title}</h3>
                 <p className="text-xs text-gray-500 mt-1">Completed on Oct 12</p>
                 <div className="flex items-center gap-1 mt-2 text-xs font-bold text-gray-400">
                    <CheckCircle2 size={12} /> Attended
                 </div>
               </div>
               <div className="flex flex-col justify-center">
                 <button className="text-xs font-bold text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                   Rebook
                 </button>
               </div>
            </div>
          ))}

          {activeTab === 'PAST' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 opacity-75">
               <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center text-red-300">
                 <XCircle size={24} />
               </div>
               <div className="flex-1">
                 <h3 className="font-bold text-gray-800 text-sm line-through">Cancelled: Goa Trip</h3>
                 <p className="text-xs text-gray-500 mt-1">Refund Processed</p>
                 <div className="flex items-center gap-1 mt-2 text-xs font-bold text-red-400">
                    <XCircle size={12} /> Cancelled
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;