import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Phone, ArrowLeft, ShieldCheck } from '../components/Icons';

type AuthStep = 'INIT' | 'PHONE' | 'OTP';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<AuthStep>('INIT');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleGoogleLogin = () => {
    // Simulate Google Login success, move to phone verification
    setStep('PHONE');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setStep('OTP');
    } else {
      alert("Please enter a valid 10-digit number");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') { // Mock OTP
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      alert("Invalid OTP (Use 1234)");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-500 to-rose-600 flex flex-col items-center justify-center p-8 text-white max-w-md mx-auto relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      {step !== 'INIT' && (
        <button onClick={() => setStep('INIT')} className="absolute top-6 left-6 p-2 bg-white/10 rounded-full">
           <ArrowLeft />
        </button>
      )}

      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8 relative z-10">
        <Sparkles size={40} className="text-primary" />
      </div>

      <h1 className="text-4xl font-bold mb-2 text-center">SocialSync</h1>
      <p className="text-pink-100 text-center mb-10 text-lg">Connect. Vibe. Experience.</p>

      {step === 'INIT' && (
        <div className="w-full space-y-4 max-w-xs z-10 animate-in fade-in slide-in-from-bottom">
          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white text-primary font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <img src="https://www.google.com/favicon.ico" alt="G" className="w-5 h-5" />
            Continue with Google
          </button>
          
          <button 
            onClick={() => setStep('PHONE')}
            className="w-full bg-black/20 hover:bg-black/30 text-white font-bold py-4 rounded-xl backdrop-blur-md border border-white/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            Continue with Phone
          </button>
        </div>
      )}

      {step === 'PHONE' && (
        <form onSubmit={handleSendOtp} className="w-full max-w-xs z-10 animate-in slide-in-from-right">
           <h3 className="text-xl font-bold text-center mb-4">Verify Number</h3>
           <p className="text-xs text-center text-pink-100 mb-6">We use this to verify real users.</p>
           <div className="bg-white/20 rounded-xl p-1 border border-white/30 flex items-center mb-6">
             <span className="pl-4 pr-2 font-bold">+91</span>
             <input 
               type="number" 
               className="bg-transparent w-full p-3 outline-none text-white font-bold placeholder-pink-200"
               placeholder="98765 43210"
               value={phoneNumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
               autoFocus
             />
           </div>
           <button type="submit" className="w-full bg-white text-primary font-bold py-4 rounded-xl shadow-lg">
             Send OTP
           </button>
        </form>
      )}

      {step === 'OTP' && (
        <form onSubmit={handleVerifyOtp} className="w-full max-w-xs z-10 animate-in slide-in-from-right">
           <h3 className="text-xl font-bold text-center mb-4">Enter OTP</h3>
           <p className="text-xs text-center text-pink-100 mb-6">Sent to +91 {phoneNumber}</p>
           <input 
             type="number" 
             className="bg-white/20 w-full p-4 rounded-xl outline-none text-center text-3xl font-bold tracking-[1em] text-white border border-white/30 mb-6 placeholder-pink-200/50"
             placeholder="0000"
             maxLength={4}
             value={otp}
             onChange={(e) => setOtp(e.target.value)}
             autoFocus
           />
           <button type="submit" className="w-full bg-white text-primary font-bold py-4 rounded-xl shadow-lg">
             Verify & Login
           </button>
           <p className="text-center mt-4 text-xs font-medium">Auto-verifying<span className="animate-pulse">...</span></p>
        </form>
      )}

      <div className="mt-8 flex items-center gap-2 text-xs text-pink-200 opacity-80">
        <ShieldCheck size={14} /> 100% Secure Login
      </div>
    </div>
  );
};

export default Login;