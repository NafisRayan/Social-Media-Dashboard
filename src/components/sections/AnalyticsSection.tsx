"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Eye, MessageCircle, BarChart3, Target, Globe, Clock } from "lucide-react";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

const followerGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Facebook",
      data: [42000, 43200, 44100, 44800, 45000, 45200],
      borderColor: "#1877f2",
      backgroundColor: "rgba(24,119,242,0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Instagram",
      data: [58000, 61000, 63500, 65200, 66800, 67800],
      borderColor: "#e4405f",
      backgroundColor: "rgba(228,64,95,0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "TikTok",
      data: [120000, 135000, 145000, 150000, 155000, 156700],
      borderColor: "#000000",
      backgroundColor: "rgba(0,0,0,0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const engagementRateData = {
  labels: ["Facebook", "Instagram", "Twitter", "LinkedIn", "TikTok"],
  datasets: [
    {
      label: "Engagement Rate (%)",
      data: [3.8, 5.2, 2.9, 4.1, 8.7],
      backgroundColor: ["#1877f2", "#e4405f", "#1da1f2", "#0077b5", "#000000"],
    },
  ],
};

const reachData = {
  labels: ["Organic", "Paid", "Viral", "Other"],
  datasets: [
    {
      label: "Reach Distribution",
      data: [320000, 180000, 44000, 12000],
      backgroundColor: ["#10b981", "#f59e42", "#6366f1", "#ef4444"],
    },
  ],
};

const demographicsData = {
  labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
  datasets: [
    {
      label: "Age Distribution",
      data: [25, 35, 22, 12, 6],
      backgroundColor: "#6366f1",
    },
  ],
};

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Insights</h2>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">556K</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21.5K</div>
            <p className="text-xs text-muted-foreground">+12.7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Follower Growth Trends</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-56">
              <Line data={followerGrowthData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { 
                  legend: { 
                    position: 'bottom',
                    labels: { boxWidth: 12, padding: 8, font: { size: 11 } }
                  }
                },
                scales: {
                  y: { beginAtZero: false, grid: { color: 'rgba(0,0,0,0.1)' } },
                  x: { grid: { display: false } }
                }
              }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Platform Engagement Rates</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-56">
              <Bar data={engagementRateData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.1)' } },
                  x: { grid: { display: false } }
                }
              }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Reach Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-56">
              <Doughnut data={reachData} options={{ 
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
            <CardTitle className="text-lg">Audience Demographics</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-56">
              <Bar data={demographicsData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.1)' } },
                  x: { grid: { display: false } }
                }
              }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Top Performing Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { country: "United States", percentage: 45, followers: "137.3K" },
                { country: "United Kingdom", percentage: 18, followers: "54.9K" },
                { country: "Canada", percentage: 12, followers: "36.6K" },
                { country: "Australia", percentage: 8, followers: "24.4K" },
                { country: "Germany", percentage: 6, followers: "18.3K" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.country}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-secondary rounded-full h-2">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                    <span className="text-sm font-medium w-16 text-right">{item.followers}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Peak Engagement Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "9:00 AM - 11:00 AM", platform: "LinkedIn", engagement: "High" },
                { time: "12:00 PM - 2:00 PM", platform: "Facebook", engagement: "Medium" },
                { time: "6:00 PM - 8:00 PM", platform: "Instagram", engagement: "Very High" },
                { time: "8:00 PM - 10:00 PM", platform: "TikTok", engagement: "High" },
                { time: "10:00 AM - 12:00 PM", platform: "Twitter", engagement: "Medium" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.time}</p>
                    <p className="text-xs text-muted-foreground">{item.platform}</p>
                  </div>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.engagement === "Very High" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : item.engagement === "High"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {item.engagement}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
