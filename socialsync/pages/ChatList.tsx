import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { MOCK_EVENTS, TEXTS } from '../constants';
import { MessageCircle, ShieldCheck } from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Mocking active chats based on events
  const chats = MOCK_EVENTS.slice(0, 3).map((e, i) => ({
    id: e.id,
    eventId: e.id,
    hostName: e.hostName,
    avatar: e.hostAvatar,
    eventName: e.title,
    lastMsg: i === 0 ? "See you there!" : "Is parking available?",
    time: "10:00 AM",
    unread: i === 0 ? 2 : 0
  }));

  return (
    <Layout>
      <div className="p-4 pt-8 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('chats', language)}</h1>
        
        <div className="space-y-2">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => navigate(`/chat/${chat.eventId}`)}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-3 items-center active:scale-[0.98] transition-transform"
            >
              <div className="relative">
                <img src={chat.avatar} alt={chat.hostName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 text-sm truncate">{chat.eventName}</h3>
                  <span className="text-[10px] text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-0.5">
                  Host: {chat.hostName} <ShieldCheck size={10} className="text-primary" />
                </p>
                <p className="text-xs text-gray-600 truncate font-medium">{chat.lastMsg}</p>
              </div>

              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
          
          {chats.length === 0 && (
             <div className="text-center py-20 text-gray-400">
               <MessageCircle size={40} className="mx-auto mb-2 opacity-50" />
               <p>No active chats. Join an event!</p>
             </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChatList;