import React from 'react';
import Layout from '../components/Layout';
import { BellRing, CheckCircle2, CreditCard, UserPlus, ArrowLeft } from '../components/Icons';
import { MOCK_NOTIFICATIONS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case 'FRIEND_REQ': return <UserPlus size={20} className="text-blue-500" />;
      case 'PAYOUT': return <CreditCard size={20} className="text-green-500" />;
      default: return <BellRing size={20} className="text-primary" />;
    }
  };

  return (
    <Layout>
      <div className="p-4 pt-8 bg-white min-h-screen pb-24">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('notifications', language)}</h1>
        </div>

        <div className="space-y-3">
          {MOCK_NOTIFICATIONS.map(notif => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-2xl flex gap-3 items-start border ${notif.read ? 'bg-white border-gray-100' : 'bg-blue-50/50 border-blue-100'}`}
            >
              <div className={`p-2 rounded-full shrink-0 ${notif.read ? 'bg-gray-100' : 'bg-white shadow-sm'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                 <p className={`text-sm ${notif.read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                   {notif.text}
                 </p>
                 <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              )}
            </div>
          ))}

          {MOCK_NOTIFICATIONS.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <BellRing size={48} className="mx-auto mb-4 opacity-20" />
              <p>No new notifications</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;