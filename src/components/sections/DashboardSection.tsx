"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { TrendingUp, Users, Eye, MessageCircle, Share, Heart, DollarSign, Target } from "lucide-react";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

const platformPostsData = {
  labels: ["Facebook", "Instagram", "Twitter", "LinkedIn", "TikTok"],
  datasets: [
    {
      label: "Posts This Week",
      data: [15, 22, 18, 8, 12],
      backgroundColor: ["#1877f2", "#e4405f", "#1da1f2", "#0077b5", "#000000"],
    },
  ],
};

const engagementData = {
  labels: ["Likes", "Comments", "Shares", "Saves"],
  datasets: [
    {
      label: "Total Engagement",
      data: [15420, 3280, 1950, 870],
      backgroundColor: ["#ef4444", "#f59e42", "#10b981", "#6366f1"],
    },
  ],
};

const weeklyTrendsData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Followers Growth",
      data: [1250, 1890, 2340, 2890],
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Impressions (000s)",
      data: [245, 289, 334, 398],
      borderColor: "#6366f1",
      backgroundColor: "rgba(99,102,241,0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const platformMetrics = [
  { platform: "Facebook", followers: "45.2K", engagement: "3.8%", reach: "120K", color: "#1877f2" },
  { platform: "Instagram", followers: "67.8K", engagement: "5.2%", reach: "89K", color: "#e4405f" },
  { platform: "Twitter", followers: "23.1K", engagement: "2.9%", reach: "67K", color: "#1da1f2" },
  { platform: "LinkedIn", followers: "12.4K", engagement: "4.1%", reach: "34K", color: "#0077b5" },
  { platform: "TikTok", followers: "156.7K", engagement: "8.7%", reach: "234K", color: "#000000" },
];

export function DashboardSection() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">305.2K</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">544K</div>
            <p className="text-xs text-muted-foreground">+8.7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8%</div>
            <p className="text-xs text-muted-foreground">+0.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2x</div>
            <p className="text-xs text-muted-foreground">+0.4x from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Posts by Platform</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-48">
              <Bar data={platformPostsData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { display: false } },
                  x: { grid: { display: false } }
                }
              }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Engagement Mix</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-48">
              <Doughnut data={engagementData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { 
                  legend: { 
                    position: 'bottom',
                    labels: { boxWidth: 12, padding: 8, font: { size: 11 } }
                  }
                }
              }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Growth Trends</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-48">
              <Line data={weeklyTrendsData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { 
                  legend: { 
                    position: 'bottom',
                    labels: { boxWidth: 12, padding: 8, font: { size: 11 } }
                  }
                },
                scales: {
                  y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.1)' } },
                  x: { grid: { display: false } }
                }
              }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {platformMetrics.map((platform) => (
              <div key={platform.platform} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: platform.color }}
                  />
                  <span className="font-semibold">{platform.platform}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Followers:</span>
                    <span className="font-medium">{platform.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engagement:</span>
                    <span className="font-medium">{platform.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reach:</span>
                    <span className="font-medium">{platform.reach}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { platform: "Instagram", content: "Summer collection launch 🌞", engagement: "2.3K", color: "#e4405f" },
                { platform: "TikTok", content: "Behind the scenes video", engagement: "5.7K", color: "#000000" },
                { platform: "Facebook", content: "Customer testimonial feature", engagement: "1.8K", color: "#1877f2" },
                { platform: "LinkedIn", content: "Industry insights article", engagement: "892", color: "#0077b5" },
              ].map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: post.color }}
                    />
                    <div>
                      <p className="font-medium text-sm">{post.content}</p>
                      <p className="text-xs text-muted-foreground">{post.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Heart className="h-3 w-3" />
                    {post.engagement}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <MessageCircle className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Create Post</span>
              </button>
              <button className="p-4 border rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Target className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">New Campaign</span>
              </button>
              <button className="p-4 border rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">View Analytics</span>
              </button>
              <button className="p-4 border rounded-lg text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Manage Users</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
