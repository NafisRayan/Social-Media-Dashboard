import { Platform, Post, AnalyticsData, Comment, DashboardStats } from '../types/dashboard';

export const platforms: Platform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    followers: 45230,
    engagement: 3.2,
    posts: 156
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
    followers: 28540,
    engagement: 4.8,
    posts: 234
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    color: '#E4405F',
    followers: 278534,
    engagement: 5.6,
    posts: 189
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
    followers: 12450,
    engagement: 2.4,
    posts: 89
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    followers: 85670,
    engagement: 6.2,
    posts: 45
  }
];

export const generateAnalyticsData = (): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  for (let i = 0; i < 180; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      followers: 250000 + Math.random() * 50000 + i * 200,
      engagement: 3000 + Math.random() * 2000,
      reach: 80000 + Math.random() * 40000,
      impressions: 150000 + Math.random() * 80000
    });
  }
  
  return data;
};

export const samplePosts: Post[] = [
  {
    id: '1',
    content: 'Sometimes we forget about the most important things in life. Take time to appreciate what you have! 🌟',
    platform: 'instagram',
    scheduledTime: new Date('2024-12-20T09:15:00'),
    status: 'scheduled',
    engagement: { likes: 1240, comments: 89, shares: 156, reach: 15600 }
  },
  {
    id: '2',
    content: 'Quick reminder to having proper lunch and you can back to your work 🍱',
    platform: 'twitter',
    scheduledTime: new Date('2024-12-20T12:30:00'),
    status: 'scheduled',
    engagement: { likes: 456, comments: 23, shares: 67, reach: 5600 }
  },
  {
    id: '3',
    content: 'Exciting news about our upcoming product launch! Stay tuned for more details.',
    platform: 'linkedin',
    scheduledTime: new Date('2024-12-20T15:00:00'),
    status: 'draft',
    engagement: { likes: 0, comments: 0, shares: 0, reach: 0 }
  }
];

export const sampleComments: Comment[] = [
  {
    id: '1',
    platform: 'instagram',
    author: 'john_doe',
    content: 'Amazing content! Keep it up!',
    sentiment: 'positive',
    timestamp: new Date('2024-12-20T10:30:00'),
    replied: false
  },
  {
    id: '2',
    platform: 'twitter',
    author: 'jane_smith',
    content: 'This really helped me today, thank you!',
    sentiment: 'positive',
    timestamp: new Date('2024-12-20T11:15:00'),
    replied: true
  },
  {
    id: '3',
    platform: 'facebook',
    author: 'mike_wilson',
    content: 'Could you provide more information about this?',
    sentiment: 'neutral',
    timestamp: new Date('2024-12-20T12:45:00'),
    replied: false
  }
];

export const dashboardStats: DashboardStats = {
  totalFollowers: 450424,
  totalEngagement: 98234,
  totalReach: 5192879,
  growthRate: 2953,
  responseTime: 2.5,
  sentimentScore: 85
};

export const locationData = [
  { country: 'United States', followers: 197520, percentage: 44 },
  { country: 'Brazil', followers: 32985, percentage: 7 },
  { country: 'Switzerland', followers: 10254, percentage: 2 },
  { country: 'Canada', followers: 25600, percentage: 6 },
  { country: 'United Kingdom', followers: 31200, percentage: 7 }
];