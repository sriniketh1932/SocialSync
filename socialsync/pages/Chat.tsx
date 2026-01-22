import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowLeft, Send, MoreVertical, ShieldCheck, Lock, Mic, Image, Smile } from '../components/Icons';
import { MOCK_EVENTS } from '../constants';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = MOCK_EVENTS.find(e => e.id === eventId) || MOCK_EVENTS[0];

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey! Thanks for joining.', sender: 'host', time: '10:00 AM' },
    { id: '2', text: 'Hi! Really excited for this.', sender: 'me', time: '10:05 AM' },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { 
      id: Date.now().toString(), 
      text: message, 
      sender: 'me', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setMessage('');
  };

  const quickReplies = ["I'm on my way!", "Where is parking?", "Running 5 mins late"];

  return (
    <Layout showNav={false}>
      <div className="flex flex-col h-screen bg-gray-50">
        
        {/* Chat Header */}
        <div className="bg-white p-4 shadow-sm border-b border-gray-100 flex items-center justify-between z-10 pt-safe-top">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:bg-gray-50 p-2 rounded-full -ml-2">
              <ArrowLeft size={24} />
            </button>
            <div className="relative">
              <img src={event.hostAvatar} alt="Host" className="w-10 h-10 rounded-full border border-gray-100 object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-bold text-sm text-gray-800 flex items-center gap-1">
                {event.hostName} <ShieldCheck size={12} className="text-primary" />
              </h2>
              <p className="text-xs text-gray-500 truncate max-w-[150px]">{event.title}</p>
            </div>
          </div>
          <button className="text-gray-400 p-2">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Safety Notice */}
        <div className="bg-amber-50 px-4 py-2 flex items-center justify-center gap-2 border-b border-amber-100">
           <Lock size={10} className="text-amber-600" />
           <p className="text-[10px] text-amber-700 text-center font-medium">
             End-to-end encrypted. Payments held secure.
           </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider my-4">Today</div>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm text-sm ${
                  msg.sender === 'me' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                {msg.text}
                <div className={`text-[9px] mt-1 text-right ${msg.sender === 'me' ? 'text-pink-100' : 'text-gray-400'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
           {quickReplies.map((reply, i) => (
              <button 
                key={i} 
                onClick={() => setMessage(reply)}
                className="whitespace-nowrap bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full hover:bg-gray-50 active:scale-95 transition-transform"
              >
                {reply}
              </button>
           ))}
        </div>

        {/* Input Area */}
        <div className="bg-white p-3 border-t border-gray-100 pb-safe-bottom">
          <div className="bg-gray-50 rounded-[24px] flex items-center px-2 py-2 border border-gray-200 focus-within:border-primary transition-colors">
            <button className="p-2 text-gray-400 hover:text-gray-600">
               <Image size={20} />
            </button>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 px-2"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            {message.trim() ? (
              <button 
                onClick={handleSend}
                className="p-2 bg-primary text-white rounded-full shadow-md animate-in zoom-in"
              >
                <Send size={18} />
              </button>
            ) : (
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Chat;