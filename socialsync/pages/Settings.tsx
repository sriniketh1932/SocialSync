import React from 'react';
import Layout from '../components/Layout';
import { Globe, ArrowLeft, Lock, ShieldCheck, LogOut, BellRing, UserCog, HelpCircle, ChevronRight, Shield } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';
import { Language } from '../types';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const LANGUAGES: {code: Language, label: string}[] = [
    { code: 'EN', label: 'English' },
    { code: 'HI', label: 'Hindi (हिंदी)' },
    { code: 'TEL', label: 'Telugu (తెలుగు)' },
    { code: 'MAR', label: 'Marathi (मराठी)' },
    { code: 'TAM', label: 'Tamil (தமிழ்)' },
    { code: 'KAN', label: 'Kannada (ಕನ್ನಡ)' },
    { code: 'MAL', label: 'Malayalam (മലയാളം)' },
    { code: 'PUN', label: 'Punjabi (ਪੰਜਾਬੀ)' },
    { code: 'GUJ', label: 'Gujarati (ગુજરાતી)' },
    { code: 'BEN', label: 'Bengali (বাংলা)' },
  ];

  const SettingSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
       <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h2>
       </div>
       <div className="divide-y divide-gray-50">
          {children}
       </div>
    </div>
  );

  const SettingItem = ({ icon: Icon, label, onClick, value, toggle }: any) => (
     <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-400">
              <Icon size={20} />
           </div>
           <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <div className="flex items-center gap-2">
           {value && <span className="text-xs text-gray-400 font-medium">{value}</span>}
           {toggle !== undefined ? (
              <div className={`w-10 h-6 rounded-full relative transition-colors ${toggle ? 'bg-primary' : 'bg-gray-200'}`}>
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${toggle ? 'left-5' : 'left-1'}`}></div>
              </div>
           ) : (
              <ChevronRight size={16} className="text-gray-300" />
           )}
        </div>
     </button>
  );

  return (
    <Layout>
      <div className="p-4 pt-8 bg-gray-50 min-h-screen pb-24">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t('settings', language)}</h1>
        </div>

        <SettingSection title="Preferences">
           <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('language', language)}</label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              >
                 {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
           </div>
        </SettingSection>

        <SettingSection title="Account & Security">
           <SettingItem icon={UserCog} label="Edit Profile" onClick={() => navigate('/profile')} />
           <SettingItem icon={Lock} label="Change Password" />
           <SettingItem icon={Shield} label="Two-Factor Authentication" toggle={true} />
           <SettingItem icon={Lock} label="Privacy Settings" value="Friends Only" />
        </SettingSection>

        <SettingSection title="Notifications">
           <SettingItem icon={BellRing} label="Push Notifications" toggle={true} />
           <SettingItem icon={BellRing} label="Email Alerts" toggle={false} />
           <SettingItem icon={BellRing} label="Event Reminders" toggle={true} />
        </SettingSection>

        <SettingSection title="Support">
           <SettingItem icon={HelpCircle} label="Help Center" />
           <SettingItem icon={ShieldCheck} label="Safety Center" />
           <SettingItem icon={Globe} label="Community Guidelines" />
        </SettingSection>

        <button onClick={() => navigate('/login')} className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-red-500 font-bold flex items-center justify-center gap-2 mt-4 mb-8 hover:bg-red-50 transition-colors">
          <LogOut size={20} /> {t('logout', language)}
        </button>
        
        <div className="text-center text-[10px] text-gray-400">
           SocialSync v1.2.0 • Hyderabad
        </div>
      </div>
    </Layout>
  );
};

export default Settings;