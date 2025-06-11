export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'manager' | 'editor';
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  followers: number;
  engagement: number;
  posts: number;
}

export interface Post {
  id: string;
  content: string;
  platform: string;
  scheduledTime: Date;
  status: 'draft' | 'scheduled' | 'published';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  };
  media?: string[];
}

export interface AnalyticsData {
  date: string;
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
}

export interface Comment {
  id: string;
  platform: string;
  author: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  replied: boolean;
}

export interface DashboardStats {
  totalFollowers: number;
  totalEngagement: number;
  totalReach: number;
  growthRate: number;
  responseTime: number;
  sentimentScore: number;
}