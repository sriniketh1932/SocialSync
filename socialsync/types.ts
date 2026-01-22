export type Language = 'EN' | 'HI' | 'MAR' | 'BEN' | 'TAM' | 'TEL' | 'GUJ' | 'KAN' | 'MAL' | 'PUN';

export interface PayoutMethod {
  type: 'UPI' | 'BANK';
  value: string; // UPI ID or Account Number
  isVerified: boolean;
}

export interface Transaction {
  id: string;
  eventId: string;
  eventTitle: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Deducted';
  type: 'Credit' | 'Debit';
}

export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string; // Main profile photo
  photos: string[]; // Profile Carousel
  publicPhotos?: string[]; // Social Feed/Gallery
  job: string;
  education: string;
  bio: string;
  interests: string[];
  location: string;
  isVerified: boolean;
  isSubscribed: boolean;
  rating: number;
  eventsHosted: number;
  badges: string[]; // Gamification
  safetyScore?: number; // 0-100
  earnings?: number;
  reviews?: number;
  followers?: number;
  following?: number;
  friendRequests?: number;
  payoutDetails?: PayoutMethod;
  connectionStatus?: 'None' | 'Friend' | 'Pending' | 'Received';
}

export interface Event {
  id: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  hostVerified: boolean;
  title: string;
  description: string;
  type: 'Coffee' | 'Trip' | 'Movie' | 'Party' | 'Dating' | 'Stay' | 'Other';
  vibe: 'Chill' | 'Energetic' | 'Romantic' | 'Focused' | 'Adventure'; // Vibe Check
  price: number;
  location: string; // Public vague location
  secureAddress?: string; // Private exact location
  distanceKm: number;
  date: string;
  image: string; // Cover
  gallery?: string[]; // Extra event images
  attendees: number;
  maxAttendees: number;
  coordinates?: { lat: number; lng: number };
  videoUrl?: string; // Host Reel
  hostOtp?: string; // 4 digit code for host to see
  checkInCode?: string; // Code attendee must enter
  isBoosted?: boolean;
  hostCheckedIn?: boolean;
  mutualFriends?: number; // Social Connectivity
  requiresApproval?: boolean;
  pendingRequests?: number;
  genderPreference?: 'Any' | 'Male' | 'Female';
  ticketTiers?: TicketTier[];
}

export interface TicketTier {
  name: string;
  price: number;
  slots: number;
}

export interface Poll {
  id: string;
  question: string;
  location: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatSession {
  id: string;
  eventId: string;
  eventName: string;
  eventImage: string;
  lastMessage: string;
  unread: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  isJoined?: boolean;
}

export interface Notification {
  id: string;
  type: 'FRIEND_REQ' | 'EVENT_UPDATE' | 'PAYOUT';
  text: string;
  time: string;
  read: boolean;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  videoUrl: string; // In real app, this would be a stream
  thumbnail: string;
  seen?: boolean;
}

export enum AppRoute {
  LOGIN = '/login',
  HOME = '/',
  EXPLORE = '/explore',
  CREATE = '/create',
  PROFILE = '/profile',
  PUBLIC_PROFILE = '/user/:id',
  EVENT_DETAILS = '/event/:id',
  HOST_DASHBOARD = '/dashboard',
  CHAT = '/chat/:eventId',
  CHAT_LIST = '/chats',
  SETTINGS = '/settings',
  COMMUNITIES = '/communities',
  REFERRAL = '/referral',
  NOTIFICATIONS = '/notifications'
}