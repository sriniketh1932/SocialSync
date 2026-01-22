import React from 'react';
import Layout from '../components/Layout';
import { Users2, ArrowLeft } from '../components/Icons';
import { MOCK_COMMUNITIES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const Communities: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="p-4 pt-8 bg-gray-50 min-h-screen">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('communities', language)}</h1>
        </div>

        <div className="space-y-4">
          {MOCK_COMMUNITIES.map(comm => (
            <div key={comm.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
              <div className="h-24 bg-gray-200 relative">
                <img src={comm.image} alt={comm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30"></div>
                <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-md">{comm.name}</h3>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                   <p className="text-xs text-gray-500 mb-1">{comm.description}</p>
                   <div className="flex items-center gap-1 text-xs text-gray-400">
                     <Users2 size={12} /> {comm.members} members
                   </div>
                </div>
                <button className="bg-gray-100 hover:bg-pink-50 hover:text-primary text-gray-700 text-xs font-bold px-4 py-2 rounded-full transition-colors">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Communities;