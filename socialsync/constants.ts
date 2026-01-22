import { Event, User, Community, Transaction, Notification, Story, Poll } from './types';

export const SUBSCRIPTION_PRICE = 49;
export const COMMISSION_RATE = 0.08; // 8%
export const PLATFORM_FEE_FLAT = 15; // Rs 15 flat fee
export const GST_RATE = 0.18; // 18% GST on fees

export const TEXTS = {
  EN: {
    home: "Home",
    explore: "Near Me",
    host: "Host",
    profile: "Profile",
    chats: "Chats",
    communities: "Tribes",
    settings: "Settings",
    referral: "Refer & Earn",
    discover: "Discover Socials",
    nearby: "Nearby Events",
    hostYourOwn: "Host your own vibe",
    hostSub: "Earn money by hosting coffee chats, movie nights, or city tours.",
    startHosting: "Start Hosting",
    vibeCheck: "Vibe Check",
    login: "Login",
    logout: "Logout",
    safetyCenter: "Safety Center",
    secureChat: "Secure Chat",
    secureDetails: "Access Secure Details",
    checkIn: "Check-In",
    hostCheckIn: "Host Check-In",
    payout: "Request Payout",
    boost: "Boost Event",
    follow: "Follow",
    following: "Following",
    unfollow: "Unfollow",
    watchReel: "Watch Host Reel",
    payToJoin: "Pay to Join",
    paymentGateway: "Select Payment Method",
    upi: "UPI",
    card: "Card",
    wallet: "Wallet",
    needHelp: "Need Help?",
    enterOtp: "Enter Host OTP",
    otpLabel: "Ask host for 4-digit code",
    reviewHost: "Rate Host",
    writeReview: "How was the safety & vibe?",
    submit: "Submit",
    language: "Language",
    privacy: "Privacy",
    notifications: "Notifications",
    deleteEvent: "Delete",
    manageEvents: "Manage Events",
    mutualFriends: "Mutual Friends",
    refundPolicy: "Refund Policy",
    pendingRequests: "Guest Requests",
    approve: "Approve",
    reject: "Reject",
    payoutSettings: "Payout Settings",
    history: "History",
    upgradeToHost: "Upgrade to Host",
    duplicate: "Duplicate",
    capacity: "Capacity",
    details: "Details",
    price: "Price",
    going: "going",
    geoPolls: "City Pulse",
    addFriend: "Add Friend",
    friendRequestSent: "Request Sent",
    accept: "Accept",
    publicPhotos: "Photos",
    addStory: "Add Story"
  },
  HI: {
    home: "होम",
    explore: "आसपास",
    host: "होस्ट",
    profile: "प्रोफाइल",
    chats: "चैट्स",
    communities: "समुदाय",
    settings: "सेटिंग्स",
    referral: "रेफर करें",
    discover: "सोशल इवेंट्स",
    nearby: "आसपास",
    hostYourOwn: "होस्ट बनें",
    hostSub: "इवेंट होस्ट करें और पैसे कमाएं।",
    startHosting: "होस्टिंग शुरू करें",
    vibeCheck: "वाइब चेक",
    login: "लॉग इन",
    logout: "लॉग आउट",
    safetyCenter: "सुरक्षा केंद्र",
    secureChat: "सुरक्षित चैट",
    secureDetails: "सुरक्षित विवरण",
    checkIn: "चेक-इन",
    hostCheckIn: "होस्ट चेक-इन",
    payout: "पेआउट अनुरोध",
    boost: "बूस्ट करें",
    follow: "फॉलो",
    following: "फॉलोइंग",
    unfollow: "अनफॉलो",
    watchReel: "रील देखें",
    payToJoin: "भुगतान करें",
    paymentGateway: "भुगतान विधि",
    upi: "यूपीआई",
    card: "कार्ड",
    wallet: "वॉलेट",
    needHelp: "मदद?",
    enterOtp: "ओटीपी दर्ज करें",
    otpLabel: "होस्ट से कोड मांगें",
    reviewHost: "रेट करें",
    writeReview: "वाइब कैसा था?",
    submit: "जमा करें",
    language: "भाषा",
    privacy: "गोपनीयता",
    notifications: "सूचनाएं",
    deleteEvent: "हटाएं",
    manageEvents: "प्रबंधन करें",
    mutualFriends: "म्यूचुअल दोस्त",
    refundPolicy: "धनवापसी नीति",
    pendingRequests: "लंबित अनुरोध",
    approve: "स्वीकारें",
    reject: "अस्वीकारें",
    payoutSettings: "पेआउट सेटिंग्स",
    history: "इतिहास",
    upgradeToHost: "होस्ट बनें",
    duplicate: "डुप्लिकेट",
    capacity: "क्षमता",
    details: "विवरण",
    price: "मूल्य",
    going: "जा रहे हैं",
    geoPolls: "सिटी पल्स",
    addFriend: "मित्र जोड़ें",
    friendRequestSent: "अनुरোধ भेजा",
    accept: "स्वीकार",
    publicPhotos: "तस्वीरें",
    addStory: "स्टोरी जोड़ें"
  },
  MAR: { home: "होम", explore: "नकाशा", host: "होस्ट", profile: "प्रोफाइल", chats: "चॅट्स", communities: "कम्युनिटी", settings: "सेटिंग्ज", referral: "आमंत्रित करा", discover: "कार्यक्रम शोधा", nearby: "जवळपासचे कार्यक्रम", hostYourOwn: "होस्ट करा", hostSub: "कार्यक्रम होस्ट करा आणि कमवा.", startHosting: "सुरू करा", vibeCheck: "वाइब चेक", login: "लॉग इन", logout: "बाहेर पडा", safetyCenter: "सुरक्षा केंद्र", secureChat: "सुरक्षित चॅट", secureDetails: "तपशील पहा", checkIn: "चेक-इन", hostCheckIn: "होस्ट चेक-इन", payout: "पेआउट", boost: "बूस्ट", follow: "फॉलो", following: "फॉलोइंग", unfollow: "अनफॉलो", watchReel: "रील पहा", payToJoin: "पैसे भरा", paymentGateway: "पेमेंट पद्धत", upi: "यूपीआय", card: "कार्ड", wallet: "वॉलेट", needHelp: "मदत हवी आहे?", enterOtp: "ओटीपी टाका", otpLabel: "होस्टकडून कोड घ्या", reviewHost: "रेटिंग द्या", writeReview: "कसं वाटलं?", submit: "सादर करा", language: "भाषा", privacy: "गोपनीयता", notifications: "सूचना", deleteEvent: "काढून टाका", manageEvents: "व्यवस्थापन", mutualFriends: "सामायिक मित्र", refundPolicy: "परतावा धोरण", pendingRequests: "विनंत्या", approve: "मान्य करा", reject: "नाकारा", payoutSettings: "पेआउट", history: "इतिहास", upgradeToHost: "होस्ट व्हा", duplicate: "प्रत", capacity: "क्षमता", details: "तपशील", price: "किंमत", going: "जात आहेत", geoPolls: "सिटी पल्स", addFriend: "मित्र जोडा", friendRequestSent: "विनंती पाठवली", accept: "स्वीकारा", publicPhotos: "फोटो", addStory: "स्टोरी" },
  BEN: { home: "হোম", explore: "মানচিত্র", host: "হোস্ট", profile: "প্রোফাইল", chats: "চ্যাট", communities: "গোষ্ঠী", settings: "সেটিংস", referral: "রেফার করুন", discover: "ইভেন্ট খুঁজুন", nearby: "কাছাকাছি", hostYourOwn: "হোস্ট করুন", hostSub: "ইভেন্ট হোস্ট করে আয় করুন।", startHosting: "শুরু করুন", vibeCheck: "ভাইব চেক", login: "লগ ইন", logout: "লগ আউট", safetyCenter: "সুরক্ষা কেন্দ্র", secureChat: "নিরাপদ চ্যাট", secureDetails: "বিবরণ দেখুন", checkIn: "চেক-ইন", hostCheckIn: "হোস্ট চেক-ইন", payout: "পেআউট", boost: "বুস্ট", follow: "ফলো", following: "ফলোয়িং", unfollow: "আনফলো", watchReel: "রিল দেখুন", payToJoin: "পেমেন্ট করুন", paymentGateway: "পেমেন্ট পদ্ধতি", upi: "ইউপিআই", card: "কার্ড", wallet: "ওয়ালেট", needHelp: "সাহায্য?", enterOtp: "ওটিপি দিন", otpLabel: "কোডটি দিন", reviewHost: "রেট করুন", writeReview: "কেমন লাগল?", submit: "জমা দিন", language: "ভাষা", privacy: "গোপনীয়তা", notifications: "নোটিফিকেশন", deleteEvent: "মুছুন", manageEvents: "ম্যানেজ", mutualFriends: "মিউচুয়াল ফ্রেন্ড", refundPolicy: "ফেরত নীতি", pendingRequests: "অনুরোধ", approve: "অনুমোদন", reject: "বাতিল", payoutSettings: "পেআউট সেটিংস", history: "ইতিহাস", upgradeToHost: "আপগ্রেড করুন", duplicate: "ডুপ্লিকেট", capacity: "ক্ষমতা", details: "বিবরণ", price: "মূল্য", going: "যাচ্ছে", geoPolls: "সিটি পালস", addFriend: "বন্ধু যোগ করুন", friendRequestSent: "অনুরোধ পাঠানো হয়েছে", accept: "গ্রহণ করুন", publicPhotos: "ছবি", addStory: "গল্প যোগ করুন" },
  GUJ: { home: "હોમ", explore: "નકશો", host: "હોસ્ટ", profile: "પ્રોફાઇલ", chats: "ચેટ્સ", communities: "સમુદાયો", settings: "સેટિંગ્સ", referral: "રેફર કરો", discover: "શોધો", nearby: "નજીકની ઇવેન્ટ્સ", hostYourOwn: "હોસ્ટ બનો", hostSub: "ઇવેન્ટ હોસ્ટ કરો અને કમાઓ.", startHosting: "શરૂ કરો", vibeCheck: "વાઇબ ચેક", login: "લોગ ઇન", logout: "લોગ આઉટ", safetyCenter: "સુરક્ષા કેન્દ્ર", secureChat: "સુરક્ષિત ચેટ", secureDetails: "વિગતો જુઓ", checkIn: "ચેક-ઇન", hostCheckIn: "હોસ્ટ ચેક-ઇન", payout: "પેઆઉટ", boost: "બૂસ્ટ", follow: "ફોલો", following: "ફોલોઇંગ", unfollow: "અનફોલો", watchReel: "રીલ જુઓ", payToJoin: "ચુકવણી કરો", paymentGateway: "ચુકવણી પદ્ધતિ", upi: "UPI", card: "કાર્ડ", wallet: "વોલેટ", needHelp: "મદદ?", enterOtp: "OTP દાખલ કરો", otpLabel: "હોસ્ટ કોડ", reviewHost: "રેટ કરો", writeReview: "કેવું લાગ્યું?", submit: "સબમિટ", language: "ભાષા", privacy: "ગોપનીયતા", notifications: "સૂચનાઓ", deleteEvent: "કાઢી નાખો", manageEvents: "મેનેજ કરો", mutualFriends: "મ્યુચ્યુઅલ મિત્રો", refundPolicy: "રિફંડ નીતિ", pendingRequests: "વિનંતીઓ", approve: "મંજૂર", reject: "નકારો", payoutSettings: "સેટિંગ્સ", history: "ઇતિહાસ", upgradeToHost: "અપગ્રેડ", duplicate: "ડુપ્લિકેટ", capacity: "ક્ષમતા", details: "વિગતો", price: "કિંમત", going: "જઈ રહ્યા છે", geoPolls: "સિટી પલ્સ", addFriend: "મિત્ર ઉમેરો", friendRequestSent: "વિનંતી મોકલી", accept: "સ્વીકારો", publicPhotos: "ફોટા", addStory: "સ્ટોરી" },
  KAN: { home: "ಮುಖಪುಟ", explore: "ನಕ್ಷೆ", host: "ಹೋಸ್ಟ್", profile: "ಪ್ರೊಫೈಲ್", chats: "ಚಾಟ್ಸ್", communities: "ಸಮುದಾಯಗಳು", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", referral: "ರೆಫರ್ ಮಾಡಿ", discover: "ಅನ್ವೇಷಿಸಿ", nearby: "ಹತ್ತಿರದ", hostYourOwn: "ಹೋಸ್ಟ್ ಮಾಡಿ", hostSub: "ಹೋಸ್ಟ್ ಮಾಡಿ ಮತ್ತು ಸಂಪಾದಿಸಿ.", startHosting: "ಪ್ರಾರಂಭಿಸಿ", vibeCheck: "ವೈಬ್ ಚೆಕ್", login: "ಲಾಗಿನ್", logout: "ಲಾಗ್ ಔಟ್", safetyCenter: "ಸುರಕ್ಷತೆ", secureChat: "ಸುರಕ್ಷಿತ ಚಾಟ್", secureDetails: "ವಿವರಗಳು", checkIn: "ಚೆಕ್-ಇನ್", hostCheckIn: "ಹೋಸ್ಟ್ ಚೆಕ್-ಇನ್", payout: "ಪಾವತಿ", boost: "ಬೂಸ್ಟ್", follow: "ಫಾಲೋ", following: "ಫಾಲೋಯಿಂಗ್", unfollow: "ಅನ್‍ಫಾಲೋ", watchReel: "ರೀಲ್ ನೋಡಿ", payToJoin: "ಪಾವತಿಸಿ", paymentGateway: "ಪಾವತಿ ವಿಧಾನ", upi: "UPI", card: "ಕಾರ್ಡ್", wallet: "ವಾಲೆಟ್", needHelp: "ಸಹಾಯ?", enterOtp: "OTP ಹಾಕಿ", otpLabel: "ಕೋಡ್", reviewHost: "ರೇಟ್ ಮಾಡಿ", writeReview: "ವಿಮರ್ಶೆ", submit: "ಸಲ್ಲಿಸಿ", language: "ಭಾಷೆ", privacy: "ಗೌಪ್ಯತೆ", notifications: "ಸೂಚನೆಗಳು", deleteEvent: "ಅಳಿಸಿ", manageEvents: "ನಿರ್ವಹಿಸಿ", mutualFriends: "ಸ್ನೇಹಿತರು", refundPolicy: "ಮರುಪಾವತಿ", pendingRequests: "ವಿನಂತಿಗಳು", approve: "ಅನುಮೋದಿಸಿ", reject: "ತಿರಸ್ಕರಿಸಿ", payoutSettings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", history: "ಇತಿಹಾಸ", upgradeToHost: "ಅಪ್‌ಗ್ರೇಡ್", duplicate: "ನಕಲು", capacity: "ಸಾಮರ್ಥ್ಯ", details: "ವಿವರಗಳು", price: "ಬೆಲೆ", going: "ಹೋಗುತ್ತಿದ್ದಾರೆ", geoPolls: "ಸಿಟಿ ಪಲ್ಸ್", addFriend: "ಸ್ನೇಹಿತರನ್ನಾಗಿ ಸೇರಿಸಿ", friendRequestSent: "ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ", accept: "ಒಪ್ಪಿಕೊಳ್ಳಿ", publicPhotos: "ಚಿತ್ರಗಳು", addStory: "ಕಥೆ" },
  MAL: { home: "ഹോം", explore: "മാപ്പ്", host: "ഹോസ്റ്റ്", profile: "പ്രൊഫൈൽ", chats: "ചാറ്റുകൾ", communities: "കമ്മ്യൂണിറ്റികൾ", settings: "ക്രമീകരണങ്ങൾ", referral: "റഫർ ചെയ്യൂ", discover: "കണ്ടെത്തൂ", nearby: "അടുത്തുള്ളവ", hostYourOwn: "ഹോസ്റ്റ് ചെയ്യൂ", hostSub: "ഹോസ്റ്റ് ചെയ്ത് വരുമാനം നേടൂ.", startHosting: "തുടങ്ങാം", vibeCheck: "വൈബ് ചെക്ക്", login: "ലോഗിൻ", logout: "ലോഗ് ഔട്ട്", safetyCenter: "സുരക്ഷാ കേന്ദ്രം", secureChat: "സുരക്ഷിത ചാറ്റ്", secureDetails: "വിശദാംശങ്ങൾ", checkIn: "ചെക്ക്-ഇൻ", hostCheckIn: "ഹോസ്റ്റ് ചെക്ക്-ഇൻ", payout: "പേഔട്ട്", boost: "ബൂസ്റ്റ്", follow: "ഫോളോ", following: "ഫോളോയിംഗ്", unfollow: "അൺഫോളോ", watchReel: "റീൽ കാണുക", payToJoin: "പണമടയ്ക്കുക", paymentGateway: "പേയ്മെന്റ് രീതി", upi: "UPI", card: "കാർഡ്", wallet: "വാലറ്റ്", needHelp: "സഹായം?", enterOtp: "OTP നൽകുക", otpLabel: "കോഡ്", reviewHost: "റേറ്റ് ചെയ്യൂ", writeReview: "അഭിപ്രായം", submit: "സമർപ്പിക്കുക", language: "ഭാഷ", privacy: "സ്വകാര്യത", notifications: "അറിയിപ്പുകൾ", deleteEvent: "നീക്കം ചെയ്യുക", manageEvents: "നിയന്ത്രിക്കുക", mutualFriends: "സുഹൃത്തുക്കൾ", refundPolicy: "റീഫണ്ട്", pendingRequests: "അപേക്ഷകൾ", approve: "അംഗീകരിക്കുക", reject: "നിരസിക്കുക", payoutSettings: "ക്രമീകരണങ്ങൾ", history: "ചരിത്രം", upgradeToHost: "അപ്ഗ്രേഡ്", duplicate: "ഡ്യൂപ്ലിക്കേറ്റ്", capacity: "ശേഷി", details: "വിശദാംശങ്ങൾ", price: "വില", going: "പോകുന്നു", geoPolls: "സിറ്റി പൾസ്", addFriend: "സുഹൃത്തിനെ ചേർക്കുക", friendRequestSent: "അഭ്യർത്ഥന അയച്ചു", accept: "സ്വീകരിക്കുക", publicPhotos: "ഫോട്ടോകൾ", addStory: "കഥ" },
  PUN: { home: "ਘਰ", explore: "ਨਕਸ਼ਾ", host: "ਮੇਜ਼ਬਾਨ", profile: "ਪ੍ਰੋਫਾਈਲ", chats: "ਗੱਲਬਾਤ", communities: "ਭਾਈਚਾਰੇ", settings: "ਸੈਟਿੰਗਾਂ", referral: "ਰੈਫਰ ਕਰੋ", discover: "ਖੋਜੋ", nearby: "ਨੇੜੇ", hostYourOwn: "ਮੇਜ਼ਬਾਨੀ ਕਰੋ", hostSub: "ਮੇਜ਼ਬਾਨੀ ਕਰੋ ਅਤੇ ਕਮਾਓ.", startHosting: "ਸ਼ੁਰੂ ਕਰੋ", vibeCheck: "ਵਾਈਬ ਚੈੱਕ", login: "ਲੌਗ ਇਨ", logout: "ਲੌਗ ਆਉਟ", safetyCenter: "ਸੁਰੱਖਿਆ ਕੇਂਦਰ", secureChat: "ਸੁਰੱਖਿਅਤ ਗੱਲਬਾਤ", secureDetails: "ਵੇਰਵੇ", checkIn: "ਚੈੱਕ-ਇਨ", hostCheckIn: "ਮੇਜ਼ਬਾਨ ਚੈੱਕ-ਇਨ", payout: "ਭੁਗਤਾਨ", boost: "ਬੂਸਟ", follow: "ਫਾਲੋ", following: "ਫਾਲੋਇੰਗ", unfollow: "ਅਨਫਾਲੋ", watchReel: "ਰੀਲ ਦੇਖੋ", payToJoin: "ਭੁਗਤਾਨ ਕਰੋ", paymentGateway: "ਭੁਗਤਾਨ ਵਿਧੀ", upi: "UPI", card: "ਕਾਰਡ", wallet: "ਵਾਲਿਟ", needHelp: "ਮਦਦ?", enterOtp: "OTP ਦਰਜ ਕਰੋ", otpLabel: "ਕੋਡ", reviewHost: "ਰੇਟ ਕਰੋ", writeReview: "ਸਮੀਖਿਆ", submit: "ਜਮ੍ਹਾਂ ਕਰੋ", language: "ਭਾਸ਼ਾ", privacy: "ਪਰਦੇਦਾਰੀ", notifications: "ਸੂਚਨਾਵਾਂ", deleteEvent: "ਹਟਾਓ", manageEvents: "ਪ੍ਰਬੰਧਿਤ ਕਰੋ", mutualFriends: "ਸਾਂਝੇ ਦੋਸਤ", refundPolicy: "ਵਾਪਸੀ ਨੀਤੀ", pendingRequests: "ਬੇਨਤੀਆਂ", approve: "ਮਨਜ਼ੂਰ", reject: "ਰੱਦ ਕਰੋ", payoutSettings: "ਸੈਟਿੰਗਾਂ", history: "ਇਤਿਹਾਸ", upgradeToHost: "ਅਪਗ੍ਰੇਡ", duplicate: "ਡੁਪਲੀਕੇਟ", capacity: "ਸਮਰੱਥਾ", details: "ਵੇਰਵੇ", price: "ਕੀਮਤ", going: "ਜਾ ਰਹੇ ਹਨ", geoPolls: "ਸ਼ਹਿਰ ਦੀ ਨਬਜ਼", addFriend: "ਦੋਸਤ ਸ਼ਾਮਲ ਕਰੋ", friendRequestSent: "ਬੇਨਤੀ ਭੇਜੀ ਗਈ", accept: "ਸਵੀਕਾਰ ਕਰੋ", publicPhotos: "ਫੋਟੋਆਂ", addStory: "ਕਹਾਣੀ" },
  TAM: { home: "முகப்பு", explore: "வரைபடம்", host: "ஹோஸ்ட்", profile: "சுயவிவரம்", chats: "அரட்டை", communities: "சமூகங்கள்", settings: "அமைப்புகள்", referral: "பரிந்துரை", discover: "நிகழ்வுகள்", nearby: "அருகில்", hostYourOwn: "ஹோஸ்ட் செய்ய", hostSub: "நிகழ்வுகளை நடத்தி சம்பாதிக்கவும்.", startHosting: "தொடங்கவும்", vibeCheck: "வைப் செக்", login: "உள்நுழைய", logout: "வெளியேறு", safetyCenter: "பாதுகாப்பு", secureChat: "பாதுகாப்பான அரட்டை", secureDetails: "விவரங்கள்", checkIn: "செக்-இன்", hostCheckIn: "ஹோஸ்ட் செக்-இன்", payout: "பேஅவுட்", boost: "பூஸ்ட்", follow: "பின்பற்று", following: "பின்பற்றப்படுகிறது", unfollow: "பின்பற்றாதே", watchReel: "ரீல் பார்", payToJoin: "செலுத்தவும்", paymentGateway: "கட்டண முறை", upi: "யுபிஐ", card: "கார்டு", wallet: "வாலட்", needHelp: "உதவி?", enterOtp: "ஓடிபி", otpLabel: "குறியீடு", reviewHost: "மதிப்பீடு", writeReview: "விமர்சனம்", submit: "சமர்ப்பிக்கவும்", language: "மொழி", privacy: "தனியுரிமை", notifications: "அறிவிப்புகள்", deleteEvent: "நீக்கு", manageEvents: "நிர்வகி", mutualFriends: "நண்பர்கள்", refundPolicy: "திரும்பப் பெறுதல்", pendingRequests: "கோரிக்கைகள்", approve: "ஏற்றுக்கொள்", reject: "நிராகரி", payoutSettings: "அமைப்புகள்", history: "வரலாறு", upgradeToHost: "மேம்படுத்தவும்", duplicate: "நகல்", capacity: "கொள்ளளவு", details: "விவரங்கள்", price: "விலை", going: "செல்கிறார்கள்", geoPolls: "சிட்டி பல்ஸ்", addFriend: "நண்பரைச் சேர்", friendRequestSent: "கோரிக்கை அனுப்பப்பட்டது", accept: "ஏற்றுக்கொள்", publicPhotos: "புகைப்படங்கள்", addStory: "கதை" },
  TEL: { home: "హోమ్", explore: "మ్యాప్", host: "హోస్ట్", profile: "ప్రొఫైల్", chats: "చాట్స్", communities: "కమ్యూనిటీలు", settings: "సెట్టింగ్స్", referral: "రెఫర్", discover: "కనుగొనండి", nearby: "దగ్గర్లో", hostYourOwn: "హోస్ట్ చేయండి", hostSub: "ఈవెంట్స్ హోస్ట్ చేసి సంపాదించండి.", startHosting: "ప్రారంభించండి", vibeCheck: "వైబ్ చెక్", login: "లాగిన్", logout: "లాగౌట్", safetyCenter: "రక్షణ", secureChat: "సురక్షిత చాట్", secureDetails: "వివరాలు", checkIn: "చెక్-ఇన్", hostCheckIn: "హోస్ట్ చెక్-ఇన్", payout: "పేఅవుట్", boost: "బూస్ట్", follow: "ఫాలో", following: "ఫాలోయింగ్", unfollow: "అన్‍ఫాలో", watchReel: "రీల్", payToJoin: "చెల్లించండి", paymentGateway: "చెల్లింపు", upi: "యుపిఐ", card: "కార్డ్", wallet: "వాలెట్", needHelp: "సహాయం?", enterOtp: "ఓటిపి", otpLabel: "కోడ్", reviewHost: "రేటింగ్", writeReview: "రివ్యూ", submit: "సమర్పించు", language: "భాష", privacy: "గోప్యత", notifications: "నోటిఫికేషన్లు", deleteEvent: "తొలగించు", manageEvents: "నిర్వహించు", mutualFriends: "కామన్ ఫ్రెండ్స్", refundPolicy: "వాపసు", pendingRequests: "అభ్యర్థనలు", approve: "ఆమోదించు", reject: "తిరస్కరించు", payoutSettings: "సెట్టింగ్స్", history: "చరిత్ర", upgradeToHost: "అప్‌గ్రేడ్", duplicate: "కాపీ", capacity: "కెపాసిటీ", details: "వివరాలు", price: "ధర", going: "వెళ్తున్నారు", geoPolls: "సిటీ పల్స్", addFriend: "ఫ్రెండ్‌ని యాడ్ చేయండి", friendRequestSent: "రిక్వెస్ట్ పంపబడింది", accept: "అంగీకరించు", publicPhotos: "ఫోటోలు", addStory: "కథను జోడించు" }
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Reddy',
  age: 24,
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop',
  photos: [
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1000&auto=format&fit=crop',
  ],
  publicPhotos: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500', // Concert
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500', // Coffee
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500', // Group
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500', // Yoga
    'https://images.unsplash.com/photo-1519671482538-518b5c2bf1c6?w=500', // Travel
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500', // Party
  ],
  job: 'Tech Lead at Google',
  education: 'IIIT Hyderabad',
  bio: 'Hyderabadi | Biryani Lover | Techie. Hosting events to meet cool people in Hitech City. 🍗💻',
  interests: ['Coding', 'Biryani', 'Badminton', 'Startups', 'Tollywood'],
  location: 'Gachibowli, Hyderabad',
  isVerified: true,
  isSubscribed: true,
  rating: 4.8,
  eventsHosted: 12,
  badges: ['Trusted Host', 'Early Adopter', 'Social Butterfly'],
  safetyScore: 98,
  earnings: 12400,
  followers: 128,
  following: 45,
  friendRequests: 3,
  payoutDetails: {
    type: 'UPI',
    value: 'alex@okhdfcbank',
    isVerified: true
  },
  connectionStatus: 'None'
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', eventId: 'e1', eventTitle: 'Sunset Coffee', amount: 460, date: '2023-10-15', status: 'Completed', type: 'Credit' },
  { id: 't2', eventId: 'e2', eventTitle: 'Goa Trip', amount: 4200, date: '2023-10-10', status: 'Completed', type: 'Credit' },
  { id: 't3', eventId: 'sub1', eventTitle: 'Subscription Fee', amount: 49, date: '2023-10-01', status: 'Deducted', type: 'Debit' },
];

export const MOCK_COMMUNITIES: Community[] = [
  { id: 'c1', name: 'Hyd Foodies', description: 'Best Biryani spots hunt', members: 1240, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' },
  { id: 'c2', name: 'Startups Hyd', description: 'T-Hub Networkers', members: 850, image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400' },
  { id: 'c3', name: 'Weekend Trekkers', description: 'Ananthagiri Hills & more', members: 320, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400' },
  { id: 'c4', name: 'Telugu Movies', description: 'FDFS Gang', members: 2100, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400' },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    hostId: 'h1',
    hostName: 'Sneha R.',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    hostVerified: true,
    title: 'Sunset Coffee at Durgam Cheruvu',
    description: 'Looking for a verified person to share a conversation over coffee by the lake. I love philosophy and tech.',
    type: 'Coffee',
    vibe: 'Chill',
    price: 499,
    location: 'Jubilee Hills, Hyderabad',
    secureAddress: 'Starbucks, Cable Bridge View, Jubilee Hills',
    distanceKm: 2.5,
    date: 'Today, 6:00 PM',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800'
    ],
    attendees: 1,
    maxAttendees: 2,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    hostOtp: '8821',
    checkInCode: '8821',
    isBoosted: false,
    mutualFriends: 2,
    pendingRequests: 0,
    genderPreference: 'Any'
  },
  {
    id: 'e2',
    hostId: 'h2',
    hostName: 'Vikram & Priya',
    hostAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200',
    hostVerified: true,
    title: 'Weekend Drive to Srisailam',
    description: 'Planning a drive to Srisailam this weekend. Need 2 more fun people to join. Split costs + small hosting fee.',
    type: 'Trip',
    vibe: 'Adventure',
    price: 2500,
    location: 'Srisailam Highway',
    secureAddress: 'Meeting Point: ORR Exit 14',
    distanceKm: 210,
    date: 'Fri, 6:00 AM',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800',
    attendees: 3,
    maxAttendees: 5,
    hostOtp: '9901',
    checkInCode: '9901',
    mutualFriends: 0,
    pendingRequests: 2,
    genderPreference: 'Any'
  },
  {
    id: 'e3',
    hostId: 'h3',
    hostName: 'Cinephiles Club',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    hostVerified: true,
    title: 'Private Screening: Interstellar',
    description: 'Hosting a movie night at my place in Manikonda with a projector setup. Popcorn and drinks included.',
    type: 'Movie',
    vibe: 'Chill',
    price: 299,
    location: 'Manikonda',
    secureAddress: 'Lanco Hills, Tower 4, Manikonda',
    distanceKm: 5.2,
    date: 'Sat, 8:00 PM',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800',
    attendees: 4,
    maxAttendees: 8,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    hostOtp: '1122',
    checkInCode: '1122',
    isBoosted: true,
    mutualFriends: 5,
    genderPreference: 'Any'
  },
  {
    id: 'e4',
    hostId: 'h4',
    hostName: 'Kavya G.',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    hostVerified: true,
    title: 'Social Mixer @ Hitech City',
    description: 'A classy evening for singles to mingle. No pressure, just good vibes and cocktails. Dress code: Smart Casual.',
    type: 'Dating',
    vibe: 'Romantic',
    price: 999,
    location: 'Mindspace, Hyderabad',
    secureAddress: 'Social, Mindspace, Hitech City',
    distanceKm: 0.8,
    date: 'Sun, 7:00 PM',
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=800',
    attendees: 12,
    maxAttendees: 20,
    mutualFriends: 1,
    genderPreference: 'Any'
  },
  {
    id: 'e5',
    hostId: 'h5',
    hostName: 'Rahul V.',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    hostVerified: true,
    title: 'Spare Room in Gachibowli',
    description: 'Looking for a chill flatmate for my spare room. Fully furnished, AC, Wi-Fi included. Short term stays allowed.',
    type: 'Stay',
    vibe: 'Focused',
    price: 15000,
    location: 'Gachibowli',
    secureAddress: 'My Home Avatar, Gachibowli',
    distanceKm: 1.5,
    date: 'Available Now',
    image: 'https://images.unsplash.com/photo-1522771753037-6333616235df?auto=format&fit=crop&w=800',
    attendees: 0,
    maxAttendees: 1,
    hostOtp: '3344',
    checkInCode: '3344',
    mutualFriends: 0,
    genderPreference: 'Any'
  }
];

export const MOCK_POLLS: Poll[] = [
  {
    id: 'p1',
    question: "Best Biryani in Hyderabad?",
    location: "Hyderabad",
    totalVotes: 545,
    options: [
      { id: 'o1', text: "Paradise", votes: 85 },
      { id: 'o2', text: "Bawarchi", votes: 240 },
      { id: 'o3', text: "Shadab", votes: 220 }
    ]
  },
  {
    id: 'p2',
    question: "Weekend Hangout Spot?",
    location: "Hyderabad",
    totalVotes: 320,
    options: [
      { id: 'o1', text: "IKEA", votes: 120 },
      { id: 'o2', text: "Tank Bund", votes: 150 },
      { id: 'o3', text: "Sarath City Mall", votes: 50 }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: '✨' },
  { id: 'Coffee', name: 'Coffee', icon: '☕' },
  { id: 'Trip', name: 'Trips', icon: '✈️' },
  { id: 'Movie', name: 'Movies', icon: '🎬' },
  { id: 'Party', name: 'Party', icon: '🎉' },
  { id: 'Dating', name: 'Dating', icon: '❤️' },
  { id: 'Stay', name: 'Stays', icon: '🏠' },
];

export const VIBES = [
  { id: 'Chill', name: 'Chill' },
  { id: 'Energetic', name: 'High Energy' },
  { id: 'Romantic', name: 'Romantic' },
  { id: 'Focused', name: 'Focused' },
  { id: 'Adventure', name: 'Adventure' },
];

export const COMMUNICATION_TEMPLATES = [
  { title: "Welcome", body: "Hey! Thanks for booking. Excited to host you! Let me know if you need help with directions." },
  { title: "Reminder", body: "Hi everyone! Just a reminder that our event is starting in 2 hours. See you soon!" },
  { title: "Delay", body: "Running 10 mins late due to traffic, apologies! See you shortly." },
  { title: "Thanks", body: "Thanks for coming today! It was great meeting you all. Please leave a review!" }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'FRIEND_REQ', text: 'Rohan sent you a friend request', time: '2m ago', read: false },
  { id: 'n2', type: 'EVENT_UPDATE', text: 'Sunset Coffee: Host changed the time to 6:30 PM', time: '1h ago', read: false },
  { id: 'n3', type: 'PAYOUT', text: 'Payout of ₹4,200 processed successfully', time: '1d ago', read: true }
];

export const MOCK_STORIES: Story[] = [
  { id: 's1', userId: 'u2', userName: 'Sarah', userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400' },
  { id: 's2', userId: 'u3', userName: 'Raj', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400' },
  { id: 's3', userId: 'u4', userName: 'Elena', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400' },
];