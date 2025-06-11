import React from 'react';
import { Users, MessageSquare, Eye, TrendingUp, Clock, Heart } from 'lucide-react';
import StatCard from '../Cards/StatCard';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import { dashboardStats, generateAnalyticsData, platforms, locationData } from '../../data/sampleData';

const Overview: React.FC = () => {
  const analyticsData = generateAnalyticsData().slice(-30);
  const chartData = analyticsData.map(d => ({
    date: d.date,
    value: d.followers
  }));

  const platformData = platforms.map(p => ({
    label: p.name,
    value: p.followers,
    color: p.color
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Followers"
          value={dashboardStats.totalFollowers}
          change={12.5}
          icon={Users}
          color="blue"
          description="Across all platforms"
        />
        <StatCard
          title="Total Engagement"
          value={dashboardStats.totalEngagement}
          change={8.2}
          icon={Heart}
          color="purple"
          description="Last 30 days"
        />
        <StatCard
          title="Total Reach"
          value={dashboardStats.totalReach}
          change={-2.1}
          icon={Eye}
          color="green"
          description="Monthly reach"
        />
        <StatCard
          title="Growth Rate"
          value={`+${dashboardStats.growthRate}`}
          change={15.3}
          icon={TrendingUp}
          color="orange"
          description="New followers/month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Follower Growth (Last 30 Days)
          </h3>
          <LineChart data={chartData} height={250} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Platform Distribution
          </h3>
          <BarChart data={platformData} height={250} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Locations
          </h3>
          <div className="space-y-4">
            {locationData.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs">{location.country.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {location.country}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                    {location.followers.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Response Time</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {dashboardStats.responseTime}h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sentiment Score</span>
              <span className="text-sm font-medium text-green-600">
                {dashboardStats.sentimentScore}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Scheduled Posts</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;