import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Login from './pages/Login';
import HostDashboard from './pages/HostDashboard';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import Settings from './pages/Settings';
import Communities from './pages/Communities';
import Referral from './pages/Referral';
import Notifications from './pages/Notifications';
import History from './pages/History';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/dashboard" element={<HostDashboard />} />
          <Route path="/chat/:eventId" element={<Chat />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;