import React from 'react';
import Layout from '../components/Layout';
import { Gift, ArrowLeft, Share2, Users } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const Referral: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="p-4 pt-8 bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen text-white">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/20 backdrop-blur-md rounded-full shadow-sm text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">{t('referral', language)}</h1>
        </div>

        <div className="flex flex-col items-center text-center mt-8">
           <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 shadow-2xl relative">
              <Gift size={64} className="text-yellow-300" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</div>
           </div>
           
           <h2 className="text-3xl font-bold mb-2">Invite Friends</h2>
           <p className="text-indigo-100 mb-8 max-w-[250px]">Earn ₹50 for every friend who joins and hosts their first event.</p>

           <div className="bg-white text-gray-800 rounded-2xl p-6 w-full shadow-lg mb-6">
              <p className="text-xs text-gray-500 uppercase font-bold mb-2">Your Code</p>
              <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center border-dashed border-2 border-gray-300">
                 <span className="text-2xl font-mono font-bold tracking-widest text-indigo-600">ALEX24</span>
                 <button className="text-xs font-bold text-gray-500 hover:text-indigo-600">COPY</button>
              </div>
           </div>

           <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Share2 size={20} /> Share Link
           </button>
           
           <div className="mt-8 flex items-center gap-2 text-indigo-200 text-sm">
             <Users size={16} /> 12 friends joined so far
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default Referral;