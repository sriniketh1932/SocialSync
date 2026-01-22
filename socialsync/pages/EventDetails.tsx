import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_EVENTS, PLATFORM_FEE_FLAT, GST_RATE } from '../constants';
import { ChevronLeft, MapPin, Clock, ShieldCheck, CheckCircle2, AlertCircle, MessageCircle, Send, Lock, Map, Play, KeyRound, Star, Phone, CreditCard, FileText, Users, Image, X } from '../components/Icons';
import { generateSafetyTips } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';
import Layout from '../components/Layout';

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const event = MOCK_EVENTS.find(e => e.id === id);
  
  const [showPayment, setShowPayment] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [safetyTips, setSafetyTips] = useState<string[]>([]);
  const [loadingTips, setLoadingTips] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'WALLET' | null>(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);
  
  // Gallery Lightbox State
  const [viewingImage, setViewingImage] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setLoadingTips(true);
      generateSafetyTips(event.type).then(tips => {
        setSafetyTips(tips);
        setLoadingTips(false);
      });
    }
  }, [event]);

  if (!event) return <div className="p-10 text-center text-gray-500">Event not found</div>;

  const ticketPrice = event.price;
  const platformFee = PLATFORM_FEE_FLAT;
  const gstAmount = platformFee * GST_RATE;
  const totalPayable = ticketPrice + platformFee + gstAmount;

  const handlePaymentSuccess = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    alert(`Payment Successful via ${paymentMethod}! Details Unlocked.`);
    setHasPaid(true);
    setShowPayment(false);
  };

  const handleCheckIn = () => {
    if (otpInput === event.checkInCode) {
      setIsCheckedIn(true);
      setShowCheckIn(false);
      alert("Check-in Successful! Enjoy the event.");
      setTimeout(() => setShowReview(true), 5000); 
    } else {
      alert("Incorrect OTP");
    }
  };

  const handleMapClick = () => {
    if (hasPaid && event.secureAddress) {
      // Open Google Maps externally if paid
      const query = encodeURIComponent(event.secureAddress);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    } else {
      // Show vague internal map if not paid
      setShowMap(true);
    }
  };

  // Force navigation to Home instead of -1 to prevent preventing getting stuck
  const handleBack = () => {
    navigate('/');
  };

  return (
    <Layout showNav={true}>
      <div className="bg-white min-h-screen text-gray-800 relative flex flex-col pb-24">
        {/* Hero Image */}
        <div className="h-72 w-full relative shrink-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          <button 
            onClick={handleBack} 
            className="absolute top-6 left-4 bg-white/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/60 shadow-lg z-20"
          >
            <ChevronLeft size={24} />
          </button>
          {event.videoUrl && (
            <button 
              onClick={() => setShowReel(true)}
              className="absolute bottom-16 right-4 bg-white/20 backdrop-blur-xl border border-white/50 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg animate-bounce z-10"
            >
              <Play size={16} fill="currentColor" /> {t('watchReel', language)}
            </button>
          )}
        </div>

        {/* Content */}
        <div className="-mt-12 relative px-5 flex-1 rounded-t-3xl bg-white/80 backdrop-blur-sm border-t border-white/40 z-10">
          <div className="flex justify-between items-start mb-4 mt-6">
            <div>
               <span className="inline-block px-2 py-1 bg-pink-50 text-primary text-xs font-bold rounded-md mb-2 border border-pink-100 uppercase tracking-wide">
                 {event.type}
               </span>
               <h1 className="text-2xl font-bold leading-tight mb-1 text-gray-900">{event.title}</h1>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-2 text-center min-w-[70px] shadow-sm">
              <span className="block text-xs text-gray-400">Price</span>
              <span className="block text-lg font-bold text-primary">₹{event.price}</span>
            </div>
          </div>

          {/* Gallery Section */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide flex items-center gap-1">
                <Image size={12} /> Event Gallery
              </h3>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {event.gallery.map((img, i) => (
                   <button 
                    key={i} 
                    onClick={() => setViewingImage(img)}
                    className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-transform active:scale-95 group"
                   >
                     <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                   </button>
                ))}
              </div>
            </div>
          )}

          {/* Host Info & Mutual Friends */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-gray-100 mb-6 shadow-sm">
            <img src={event.hostAvatar} alt={event.hostName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="flex-1">
              <h3 className="font-semibold flex items-center gap-1 text-gray-900">
                {event.hostName} 
                {event.hostVerified && <ShieldCheck size={16} className="text-primary" fill="#fce7f3" />}
              </h3>
              {event.mutualFriends && event.mutualFriends > 0 ? (
                 <p className="text-xs text-primary font-medium flex items-center gap-1">
                   <Users size={12} /> {event.mutualFriends} {t('mutualFriends', language)}
                 </p>
              ) : (
                 <p className="text-xs text-gray-500">Verified Host • 4.8 ★</p>
              )}
            </div>
            <Link to={`/user/${event.hostId}`} className="text-xs font-bold text-primary bg-pink-50 px-3 py-1.5 rounded-lg hover:bg-pink-100 transition-colors">
              View Profile
            </Link>
          </div>

          {/* Details Grid (Interactive Map) */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <Clock size={18} className="text-primary mb-2" />
              <p className="text-xs text-gray-400">Time</p>
              <p className="text-sm font-semibold text-gray-800">{event.date}</p>
            </div>
            <button 
              onClick={handleMapClick}
              className={`bg-white p-3 rounded-xl border shadow-sm text-left transition-all active:scale-95 relative overflow-hidden ${hasPaid ? 'border-green-200 bg-green-50 ring-2 ring-green-100' : 'border-gray-100'}`}
            >
              <Map size={18} className={`mb-2 ${hasPaid ? 'text-green-600' : 'text-primary'}`} />
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                 {hasPaid ? event.secureAddress : event.location}
              </p>
              {!hasPaid ? (
                 <div className="absolute top-2 right-2 text-gray-300">
                    <Lock size={14} />
                 </div>
              ) : (
                 <div className="absolute top-2 right-2 text-green-500">
                    <MapPin size={14} />
                 </div>
              )}
            </button>
          </div>

          {/* Safety & Chat Actions */}
          <div className="flex gap-3 mb-6">
             <button className="flex-1 py-3 border border-indigo-100 bg-indigo-50 rounded-xl flex items-center justify-center gap-2 text-indigo-600 font-semibold text-xs hover:bg-indigo-100">
                <Send size={16} /> Share w/ Guardian
             </button>
             
             <button 
               onClick={() => hasPaid ? navigate(`/chat/${event.id}`) : alert("Join the event to chat!")}
               className={`flex-1 py-3 border rounded-xl flex items-center justify-center gap-2 font-semibold text-xs transition-colors ${hasPaid ? 'bg-primary text-white border-primary shadow-lg' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
             >
                {hasPaid ? <MessageCircle size={16} /> : <Lock size={14} />} 
                {hasPaid ? t('secureChat', language) : t('secureChat', language)}
             </button>
          </div>

          {/* Safety Tips */}
          <div className="mb-24 bg-green-50 border border-green-100 p-4 rounded-xl">
             <h4 className="flex items-center gap-2 text-green-700 font-bold mb-2">
               <ShieldCheck size={18} /> Safety First
             </h4>
             {loadingTips ? (
               <p className="text-xs text-gray-500 animate-pulse">Analysing safety guidelines...</p>
             ) : (
               <ul className="space-y-2">
                 {safetyTips.map((tip, idx) => (
                   <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                     <CheckCircle2 size={12} className="mt-0.5 text-green-500 shrink-0" />
                     {tip}
                   </li>
                 ))}
               </ul>
             )}
          </div>
        </div>

        {/* Sticky Bottom Action - Positioned above Nav Bar */}
        <div className="fixed bottom-[5.5rem] w-full max-w-md left-0 right-0 mx-auto px-4 z-40">
          {!hasPaid ? (
            <button 
              onClick={() => setShowPayment(true)}
              className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl shadow-2xl shadow-pink-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {t('payToJoin', language)}
            </button>
          ) : !isCheckedIn ? (
            <button 
               onClick={() => setShowCheckIn(true)}
               className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-2xl flex items-center justify-center gap-2 animate-pulse"
            >
               <KeyRound size={20} /> {t('checkIn', language)} w/ OTP
            </button>
          ) : (
            <div className="w-full bg-gray-100 text-gray-500 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg">
               <CheckCircle2 size={20} className="text-green-500" /> You are checked in
            </div>
          )}
        </div>

        {/* Map Modal (Internal - Only shown if NOT paid) */}
        {showMap && (
          <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-right">
            <div className="p-4 flex items-center gap-3 border-b border-gray-100">
              <button onClick={() => setShowMap(false)} className="p-2 bg-gray-100 rounded-full"><ChevronLeft size={20}/></button>
              <h3 className="font-bold">Approximate Location</h3>
            </div>
            <div className="flex-1 bg-gray-200 relative">
               <iframe 
                 title="map-details"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: 'blur(5px)' }} 
                 loading="lazy" 
                 allowFullScreen 
                 src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
               ></iframe>
               <div className="absolute bottom-10 left-4 right-4 bg-white p-4 rounded-xl shadow-lg">
                  <p className="font-bold text-gray-800">{event.location}</p>
                  <p className="text-xs text-red-500 font-bold mt-1 flex items-center gap-1"><Lock size={10}/> Exact location locked until payment</p>
               </div>
            </div>
          </div>
        )}

        {/* Reel/Video Modal */}
        {showReel && (
          <div className="fixed inset-0 z-[60] bg-black flex flex-col animate-in fade-in">
             <button onClick={() => setShowReel(false)} className="absolute top-4 left-4 text-white z-10 p-2 bg-white/20 rounded-full backdrop-blur-md"><ChevronLeft/></button>
             <div className="flex-1 flex items-center justify-center">
               <video src={event.videoUrl} autoPlay loop controls className="max-h-full max-w-full" />
             </div>
          </div>
        )}

        {/* Image Gallery Lightbox */}
        {viewingImage && (
          <div className="fixed inset-0 z-[60] bg-black flex flex-col animate-in fade-in">
             <button onClick={() => setViewingImage(null)} className="absolute top-4 right-4 text-white z-10 p-2 bg-black/50 rounded-full backdrop-blur-md"><X size={24}/></button>
             <div className="flex-1 flex items-center justify-center p-2">
               <img src={viewingImage} alt="Full view" className="max-h-full max-w-full object-contain rounded-lg" />
             </div>
          </div>
        )}

        {/* Check In Modal */}
        {showCheckIn && (
          <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-xs rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-center mb-2">{t('enterOtp', language)}</h3>
                <p className="text-xs text-center text-gray-500 mb-6 px-4">
                  Please ask the host for the 4-digit code <strong>when you arrive</strong> at the venue.
                </p>
                
                <input 
                  type="text" 
                  maxLength={4}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full text-center text-3xl font-mono tracking-widest border-b-2 border-gray-200 focus:border-primary outline-none py-2 mb-6"
                  placeholder="0 0 0 0"
                />
                
                <button 
                  onClick={handleCheckIn} 
                  className="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-700 transition-colors"
                >
                  Verify & Enter
                </button>
                <button onClick={() => setShowCheckIn(false)} className="w-full mt-4 text-xs text-gray-400">Cancel</button>
             </div>
          </div>
        )}

        {/* Review Modal */}
        {showReview && (
           <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end justify-center">
              <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-in slide-in-from-bottom">
                 <h3 className="text-lg font-bold text-center mb-4">{t('reviewHost', language)}</h3>
                 <p className="text-sm text-center text-gray-500 mb-6">{t('writeReview', language)}</p>
                 <div className="flex justify-center gap-2 mb-6">
                   {[1,2,3,4,5].map(s => (
                     <Star key={s} size={32} className="text-yellow-400 fill-yellow-400" />
                   ))}
                 </div>
                 <textarea className="w-full bg-gray-50 p-3 rounded-xl border border-gray-100 text-sm mb-4" rows={3} placeholder="How was the safety?"></textarea>
                 <button onClick={() => setShowReview(false)} className="w-full bg-primary text-white font-bold py-3 rounded-xl">{t('submit', language)}</button>
              </div>
           </div>
        )}

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{t('paymentGateway', language)}</h2>
                <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-gray-600">Close</button>
              </div>
              
              <div className="mb-6">
                 <p className="text-3xl font-bold text-primary mb-1">₹{totalPayable.toFixed(2)}</p>
                 <p className="text-xs text-gray-400">Includes taxes & fees</p>
              </div>

              <div className="space-y-3 mb-6">
                <button 
                   onClick={() => setPaymentMethod('UPI')}
                   className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-colors ${paymentMethod === 'UPI' ? 'border-primary bg-pink-50' : 'border-gray-200'}`}
                >
                   <Phone className="text-green-600"/>
                   <span className="font-bold text-gray-700">{t('upi', language)} (GPay/PhonePe)</span>
                </button>
                <button 
                   onClick={() => setPaymentMethod('CARD')}
                   className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-colors ${paymentMethod === 'CARD' ? 'border-primary bg-pink-50' : 'border-gray-200'}`}
                >
                   <CreditCard className="text-blue-600"/>
                   <span className="font-bold text-gray-700">{t('card', language)}</span>
                </button>
              </div>
              
              <button 
                onClick={() => setShowRefundPolicy(true)}
                className="text-xs text-gray-500 flex items-center gap-1 mb-4 hover:text-primary transition-colors"
              >
                <FileText size={12} /> {t('refundPolicy', language)}
              </button>

              <button 
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-colors disabled:opacity-50"
                onClick={handlePaymentSuccess}
                disabled={!paymentMethod}
              >
                Pay ₹{totalPayable.toFixed(2)}
              </button>
            </div>
          </div>
        )}

        {/* Refund Policy Modal */}
        {showRefundPolicy && (
          <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
               <div className="flex items-center gap-2 mb-4 text-primary">
                  <AlertCircle size={24} />
                  <h3 className="font-bold text-lg">{t('refundPolicy', language)}</h3>
               </div>
               <div className="text-sm text-gray-600 space-y-3 mb-6">
                 <p>1. <strong>Full Refund:</strong> If cancelled 24 hours before the event.</p>
                 <p>2. <strong>50% Refund:</strong> If cancelled between 24 and 4 hours before.</p>
                 <p>3. <strong>No Refund:</strong> For last minute cancellations or no-shows.</p>
                 <p>4. <strong>Host Cancellation:</strong> 100% refund processed instantly to source.</p>
               </div>
               <button onClick={() => setShowRefundPolicy(false)} className="w-full bg-gray-100 text-gray-800 font-bold py-3 rounded-xl hover:bg-gray-200">
                 Understood
               </button>
             </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventDetails;