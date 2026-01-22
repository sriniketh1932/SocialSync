import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { MOCK_USER, SUBSCRIPTION_PRICE, MOCK_EVENTS } from '../constants';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Settings, 
  CreditCard, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Edit3,
  Share2,
  Camera,
  Heart,
  Award,
  ArrowLeft,
  ShieldAlert,
  LogOut,
  LayoutDashboard,
  Users,
  UserPlus,
  Check,
  X,
  Grid,
  Image,
  PlusSquare,
  Calendar,
  History
} from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../services/localizationService';

const Profile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [friendStatus, setFriendStatus] = useState<'None' | 'Pending' | 'Friend'>('None');
  const [activeTab, setActiveTab] = useState<'PHOTOS' | 'BADGES'>('PHOTOS');
  
  const isMyProfile = !id || id === 'u1' || id === 'me';
  
  const [user, setUser] = useState(MOCK_USER);
  const [editedUser, setEditedUser] = useState(MOCK_USER);

  useEffect(() => {
    if (!isMyProfile) {
      const evt = MOCK_EVENTS.find(e => e.hostId === id);
      if (evt) {
        setUser({
           ...MOCK_USER,
           id: evt.hostId,
           name: evt.hostName,
           avatar: evt.hostAvatar,
           isVerified: evt.hostVerified,
           bio: "Verified Host on SocialSync. Join my events for good vibes! ✨",
           isSubscribed: true,
           connectionStatus: 'None' // Mock initial status
        });
      }
    } else {
      setUser(MOCK_USER);
    }
  }, [id, isMyProfile]);

  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditMode(false);
  };

  const handleFriendAction = () => {
    if (friendStatus === 'None') {
      setFriendStatus('Pending');
    } else if (friendStatus === 'Pending') {
      setFriendStatus('None'); // Cancel request
    }
  };

  return (
    <Layout>
      <div className="pb-20 bg-dark min-h-screen">
        {/* Navigation Header */}
        <div className="absolute top-0 left-0 w-full z-30 p-4 flex justify-between items-start">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {isMyProfile ? (
               <>
                 <button 
                   onClick={() => setShowSafety(true)}
                   className="p-2 bg-red-500/80 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-colors"
                 >
                   <ShieldAlert size={20} />
                 </button>
                 <button 
                   onClick={() => navigate('/settings')}
                   className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                 >
                   <Settings size={20} />
                 </button>
               </>
            ) : null}
          </div>
        </div>

        {/* Main Photo Container */}
        <div className="relative w-full h-[50vh] bg-gray-200">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-5 z-10 pb-12">
            <div className="flex items-end gap-2 mb-1">
              <h1 className="text-4xl font-bold text-white leading-none drop-shadow-md">
                {user.name}
              </h1>
              <span className="text-2xl font-normal text-white mb-0.5 drop-shadow-md">{user.age}</span>
              {user.isVerified && (
                <div className="mb-1 bg-white rounded-full p-1 shadow-lg">
                  <ShieldCheck size={18} className="text-blue-500 fill-blue-50" />
                </div>
              )}
            </div>

            <div className="space-y-1 text-sm text-gray-100 font-medium">
               <div className="flex items-center gap-2 drop-shadow-sm">
                 <Briefcase size={16} className="text-pink-300" />
                 <span>{user.job}</span>
               </div>
               <div className="flex items-center gap-2 drop-shadow-sm">
                 <GraduationCap size={16} className="text-pink-300" />
                 <span>{user.education}</span>
               </div>
               <div className="flex items-center gap-2 drop-shadow-sm">
                 <MapPin size={16} className="text-pink-300" />
                 <span>{user.location}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="relative -mt-8 flex justify-center gap-6 z-20 px-4">
           {isMyProfile ? (
             <>
               <button onClick={() => navigate('/history')} className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white border border-gray-100 text-gray-400 shadow-lg hover:text-primary transition-all">
                 <History size={22} />
               </button>
               <button 
                 onClick={() => setIsEditMode(true)}
                 className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-xl shadow-pink-300 transform -translate-y-2 hover:scale-105 transition-all"
               >
                 <Edit3 size={28} />
               </button>
               <button onClick={() => alert("Add to Story Clicked")} className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white border border-gray-100 text-gray-400 shadow-lg hover:text-primary transition-all">
                 <PlusSquare size={22} />
               </button>
             </>
           ) : (
             <div className="flex gap-4">
               <button 
                 onClick={() => setIsFollowing(!isFollowing)}
                 className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all ${isFollowing ? 'bg-white text-gray-600' : 'bg-primary text-white'}`}
               >
                  {isFollowing ? <Check size={24} /> : <UserPlus size={24} />}
               </button>
               <button 
                 onClick={handleFriendAction}
                 className={`px-6 h-14 rounded-full shadow-xl font-bold active:scale-95 transition-all flex items-center gap-2 ${friendStatus === 'Friend' ? 'bg-green-500 text-white' : friendStatus === 'Pending' ? 'bg-gray-200 text-gray-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'}`}
               >
                  {friendStatus === 'Friend' ? 'Friends' : friendStatus === 'Pending' ? t('friendRequestSent', language) : t('addFriend', language)}
               </button>
             </div>
           )}
        </div>

        {/* Profile Content */}
        <div className="px-5 mt-4 space-y-6">
          
          {/* Stats Row */}
          <div className="flex justify-around py-4 border-b border-pink-100">
             <div className="text-center">
               <div className="text-xl font-bold text-gray-800">{user.eventsHosted}</div>
               <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Hosted</div>
             </div>
             <div className="w-px bg-gray-100"></div>
             <div className="text-center">
               <div className="text-xl font-bold text-gray-800">{user.followers || 120}</div>
               <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Followers</div>
             </div>
             <div className="w-px bg-gray-100"></div>
             <div className="text-center">
               <div className="text-xl font-bold text-primary">
                 {user.isSubscribed ? 'PRO' : 'FREE'}
               </div>
               <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Plan</div>
             </div>
          </div>

          {/* Manager Actions (Host Only) */}
          {isMyProfile && user.isSubscribed && (
            <div className="grid grid-cols-2 gap-3">
               <button 
                 onClick={() => navigate('/dashboard')}
                 className="flex items-center justify-center gap-2 bg-gray-800 text-white p-3 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-transform"
               >
                  <LayoutDashboard size={16} /> {t('manageEvents', language)}
               </button>
               <button 
                 onClick={() => navigate('/create')}
                 className="flex items-center justify-center gap-2 bg-pink-100 text-primary p-3 rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-transform"
               >
                  <Calendar size={16} /> Host New Event
               </button>
            </div>
          )}

          {/* About Section */}
          <section>
             <h3 className="text-lg font-bold text-gray-800 mb-2">About Me</h3>
             <p className="text-gray-500 text-sm leading-relaxed">
               {user.bio}
             </p>
          </section>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
             <button 
               onClick={() => setActiveTab('PHOTOS')}
               className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'PHOTOS' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
             >
                <Grid size={18} /> {t('publicPhotos', language)}
             </button>
             <button 
               onClick={() => setActiveTab('BADGES')}
               className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'BADGES' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
             >
                <Award size={18} /> Badges
             </button>
          </div>

          {/* Grid Content */}
          {activeTab === 'PHOTOS' && (
             <div className="grid grid-cols-3 gap-1 pb-10">
                {user.publicPhotos?.map((photo, i) => (
                   <div key={i} className="aspect-square bg-gray-100 overflow-hidden relative group">
                      <img src={photo} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs">
                         <Heart size={16} fill="white" />
                      </div>
                   </div>
                ))}
                {isMyProfile && (
                   <button className="aspect-square bg-gray-50 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 text-gray-400">
                      <PlusSquare size={24} />
                      <span className="text-[10px] font-bold mt-1">Add</span>
                   </button>
                )}
             </div>
          )}

          {activeTab === 'BADGES' && (
             <div className="flex gap-3 flex-wrap pb-10">
               {user.badges.map((badge, i) => (
                 <div key={i} className="flex flex-col items-center gap-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-28 grow">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-2">
                      <Award size={20} />
                    </div>
                    <span className="text-xs font-bold text-center text-gray-600 leading-tight">{badge}</span>
                 </div>
               ))}
             </div>
          )}
          
          <div className="h-4"></div>
        </div>

        {/* Edit Profile Modal */}
        {isEditMode && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
            <div className="bg-white w-full max-w-md h-[90vh] sm:h-auto rounded-t-3xl sm:rounded-3xl p-6 overflow-y-auto animate-in slide-in-from-bottom">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <button onClick={() => setIsEditMode(false)} className="text-gray-500">Cancel</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Display Name</label>
                  <input 
                    value={editedUser.name} 
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Job Title</label>
                  <input 
                    value={editedUser.job} 
                    onChange={(e) => setEditedUser({...editedUser, job: e.target.value})}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Bio</label>
                  <textarea 
                    value={editedUser.bio} 
                    onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
                    rows={4}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100" 
                  />
                </div>
                <button onClick={handleSaveProfile} className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Safety Center Modal */}
        {showSafety && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 animate-in zoom-in-95">
              <div className="flex items-center gap-2 mb-4 text-red-500">
                <ShieldAlert size={28} />
                <h2 className="text-xl font-bold">{t('safetyCenter', language)}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Your safety is our priority. If you feel uncomfortable, use these tools immediately.
              </p>
              <div className="space-y-3">
                <button className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 border border-red-100">
                  <ShieldCheck size={18} /> Share Live Location
                </button>
                <button className="w-full py-3 bg-gray-50 text-gray-800 font-bold rounded-xl border border-gray-100">
                  Emergency Contacts
                </button>
                <button className="w-full py-3 bg-gray-50 text-gray-800 font-bold rounded-xl border border-gray-100">
                  Report a User / Event
                </button>
              </div>
              <button onClick={() => setShowSafety(false)} className="mt-6 w-full text-center text-gray-400 text-sm">Close</button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Profile;