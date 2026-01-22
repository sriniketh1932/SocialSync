import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  ShieldCheck, Landmark, History, UserPlus, Check, X, Copy, Eye, EyeOff, AlertTriangle, MapPin, Trash2
} from '../components/Icons';
import { MOCK_USER, MOCK_EVENTS, MOCK_TRANSACTIONS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const HostDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState<'UPI' | 'BANK'>('UPI');
  
  // Track which event's OTP is currently visible
  const [visibleOtpId, setVisibleOtpId] = useState<string | null>(null);

  const pendingRequests = MOCK_EVENTS.filter(e => e.pendingRequests && e.pendingRequests > 0);

  const handleDuplicate = (eventId: string) => {
    const confirm = window.confirm("Duplicate this event listing?");
    if (confirm) {
      alert("Event duplicated to draft! Redirecting to edit...");
      navigate('/create');
    }
  };

  const toggleOtp = (id: string) => {
    if (visibleOtpId === id) {
      setVisibleOtpId(null);
    } else {
      setVisibleOtpId(id);
    }
  };

  return (
    <Layout showNav={true}> 
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Modern Header */}
        <div className="relative bg-gradient-to-br from-primary via-secondary to-purple-600 pt-12 pb-16 px-6 rounded-b-[3rem] shadow-2xl overflow-hidden">
          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full p-1 bg-white/20 backdrop-blur-md mb-3">
              <img src={MOCK_USER.avatar} alt="Me" className="w-full h-full object-cover rounded-full border-2 border-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Host Dashboard</h1>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10">
               <ShieldCheck size={12} />
               <span>Top Rated Host</span>
            </div>
          </div>

          {/* Stats Cards - Floating */}
          <div className="absolute -bottom-8 left-6 right-6 flex justify-between gap-2 z-20">
             <div className="flex-1 bg-white rounded-2xl p-3 shadow-lg text-center flex flex-col items-center">
                <span className="text-xl font-extrabold text-gray-800">{MOCK_USER.rating}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Rating</span>
             </div>
             <div className="flex-1 bg-white rounded-2xl p-3 shadow-lg text-center flex flex-col items-center border-t-4 border-green-500">
                <span className="text-xl font-extrabold text-green-600">₹{MOCK_USER.earnings}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Earnings</span>
             </div>
             <div className="flex-1 bg-white rounded-2xl p-3 shadow-lg text-center flex flex-col items-center">
                <span className="text-xl font-extrabold text-blue-500">98%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Score</span>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 mt-14 space-y-6">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={() => setShowPayoutModal(true)}
               className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-all active:scale-95 group"
             >
               <div className="w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors">
                 <Landmark size={20} />
               </div>
               <span className="text-xs font-bold text-gray-700">Payout Details</span>
             </button>
             <button 
               onClick={() => navigate('/history')}
               className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-all active:scale-95 group"
             >
               <div className="w-10 h-10 rounded-full bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center text-purple-600 transition-colors">
                 <History size={20} />
               </div>
               <span className="text-xs font-bold text-gray-700">{t('history', language)}</span>
             </button>
          </div>

          {/* Pending Guest Requests */}
          {pendingRequests.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
               <div className="flex items-center gap-2 mb-4">
                 <UserPlus size={20} className="text-orange-500" />
                 <h3 className="font-bold text-gray-800">{t('pendingRequests', language)}</h3>
               </div>
               {pendingRequests.map(event => (
                 <div key={event.id} className="border-t border-gray-100 pt-3 mt-2 first:mt-0 first:border-0 first:pt-0">
                    <p className="text-xs text-gray-500 mb-2">Request for <span className="font-bold text-gray-800">{event.title}</span></p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <img src="https://picsum.photos/50/50" className="w-8 h-8 rounded-full" alt="User"/>
                          <span className="text-sm font-bold">Rohan D.</span>
                       </div>
                       <div className="flex gap-2">
                          <button className="bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-100"><X size={16}/></button>
                          <button className="bg-green-50 text-green-500 p-2 rounded-full hover:bg-green-100"><Check size={16}/></button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}

          {/* Live Events & Secure OTPs */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 pl-1">Live Events & OTPs</h3>
            <div className="space-y-4">
              {MOCK_EVENTS.slice(0, 2).map((event, i) => (
                <div key={event.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative group overflow-hidden">
                   
                   <div className="flex justify-between items-start mb-4">
                     <div className="flex gap-3">
                        <img src={event.image} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                        <div>
                           <h4 className="font-bold text-gray-800 text-sm truncate max-w-[150px]">{event.title}</h4>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold border border-green-100">Active</span>
                             <span className="text-[10px] text-gray-400">{event.date}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex gap-1">
                       <button onClick={() => handleDuplicate(event.id)} className="text-gray-400 p-2 hover:bg-gray-50 rounded-full transition-colors"><Copy size={16}/></button>
                       <button className="text-red-400 p-2 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={16}/></button>
                     </div>
                   </div>
                   
                   {/* Secure OTP Section */}
                   <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                           <ShieldCheck size={12} /> Guest OTP Code
                        </span>
                        <button onClick={() => toggleOtp(event.id)} className="text-slate-400 hover:text-slate-600">
                           {visibleOtpId === event.id ? <EyeOff size={16}/> : <Eye size={16}/>}
                        </button>
                      </div>

                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100 shadow-inner">
                         <p className="text-2xl font-mono font-bold text-slate-800 tracking-[0.5em] text-center w-full">
                            {visibleOtpId === event.id ? (event.hostOtp || '----') : '••••'}
                         </p>
                      </div>

                      {visibleOtpId === event.id && (
                        <div className="mt-2 bg-red-50 border border-red-100 rounded-lg p-2 flex gap-2 animate-in fade-in slide-in-from-top-1">
                           <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                           <p className="text-[10px] text-red-600 font-medium leading-tight">
                              <strong>Do not share digitally.</strong> Only verify this code when the guest is physically present at the venue.
                           </p>
                        </div>
                      )}
                   </div>

                   <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg shadow-gray-200">
                     <MapPin size={14} /> GPS Check-In
                   </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payout Modal */}
        {showPayoutModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center sm:items-center">
            <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t('payoutSettings', language)}</h2>
                <button onClick={() => setShowPayoutModal(false)} className="text-gray-400">Close</button>
              </div>
              <div className="space-y-4">
                 <div className="flex gap-4 mb-4">
                    <button 
                      onClick={() => setPayoutMethod('UPI')}
                      className={`flex-1 py-3 rounded-xl border font-bold text-sm ${payoutMethod === 'UPI' ? 'border-primary bg-pink-50 text-primary' : 'border-gray-200'}`}
                    >
                      UPI ID
                    </button>
                    <button 
                      onClick={() => setPayoutMethod('BANK')}
                      className={`flex-1 py-3 rounded-xl border font-bold text-sm ${payoutMethod === 'BANK' ? 'border-primary bg-pink-50 text-primary' : 'border-gray-200'}`}
                    >
                      Bank Account
                    </button>
                 </div>
                 
                 {payoutMethod === 'UPI' ? (
                   <input type="text" placeholder="example@okhdfcbank" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 outline-none" />
                 ) : (
                   <div className="space-y-3">
                     <input type="text" placeholder="Account Number" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 outline-none" />
                     <input type="text" placeholder="IFSC Code" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 outline-none" />
                   </div>
                 )}

                 <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg mt-4">Save Details</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default HostDashboard;