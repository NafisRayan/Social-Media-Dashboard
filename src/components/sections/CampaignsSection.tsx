"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, TrendingUp, Users, DollarSign, Eye } from "lucide-react";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

type Campaign = {
  id: string;
  name: string;
  platform: "Facebook" | "Instagram" | "Twitter" | "LinkedIn" | "TikTok";
  status: "active" | "paused" | "completed" | "draft";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
  ctr: number;
  cpc: number;
  roas: number;
};

const demoCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Product Launch",
    platform: "Facebook",
    status: "active",
    budget: 5000,
    spent: 3200,
    impressions: 125000,
    clicks: 3850,
    conversions: 127,
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    ctr: 3.08,
    cpc: 0.83,
    roas: 4.2,
  },
  {
    id: "2",
    name: "Brand Awareness Q2",
    platform: "Instagram",
    status: "active",
    budget: 3000,
    spent: 2100,
    impressions: 89000,
    clicks: 2670,
    conversions: 89,
    startDate: "2025-05-15",
    endDate: "2025-07-15",
    ctr: 3.0,
    cpc: 0.79,
    roas: 3.8,
  },
  {
    id: "3",
    name: "Holiday Promotion",
    platform: "Twitter",
    status: "completed",
    budget: 2000,
    spent: 1950,
    impressions: 67000,
    clicks: 2010,
    conversions: 56,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    ctr: 3.0,
    cpc: 0.97,
    roas: 3.1,
  },
  {
    id: "4",
    name: "B2B Lead Generation",
    platform: "LinkedIn",
    status: "active",
    budget: 4000,
    spent: 1800,
    impressions: 45000,
    clicks: 1350,
    conversions: 78,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    ctr: 3.0,
    cpc: 1.33,
    roas: 5.2,
  },
  {
    id: "5",
    name: "Gen Z Engagement",
    platform: "TikTok",
    status: "paused",
    budget: 1500,
    spent: 890,
    impressions: 156000,
    clicks: 4680,
    conversions: 234,
    startDate: "2025-05-01",
    endDate: "2025-06-15",
    ctr: 3.0,
    cpc: 0.19,
    roas: 2.8,
  },
];

const platformData = {
  labels: ["Facebook", "Instagram", "Twitter", "LinkedIn", "TikTok"],
  datasets: [
    {
      label: "Budget Allocation",
      data: [5000, 3000, 2000, 4000, 1500],
      backgroundColor: ["#1877f2", "#e4405f", "#1da1f2", "#0077b5", "#000000"],
    },
  ],
};

const performanceData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Conversions",
      data: [45, 67, 89, 127],
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "ROAS",
      data: [3.2, 3.8, 4.1, 4.2],
      borderColor: "#6366f1",
      backgroundColor: "rgba(99,102,241,0.1)",
      tension: 0.4,
      fill: true,
      yAxisID: "y1",
    },
  ],
};

const performanceOptions = {
  responsive: true,
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export function CampaignsSection() {
  const [campaigns] = useState<Campaign[]>(demoCampaigns);

  const handleAdd = () => {
    // TODO: Add new campaign functionality
  };

  const handleEdit = () => {
    // TODO: Edit campaign functionality
  };

  const handleDelete = () => {
    // TODO: Delete campaign functionality
  };

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgROAS = campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Campaign Management</h2>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalSpent/totalBudget)*100).toFixed(1)}% of budget used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions}</div>
            <p className="text-xs text-muted-foreground">Total conversions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ROAS</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgROAS.toFixed(1)}x</div>
            <p className="text-xs text-muted-foreground">Return on ad spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Budget by Platform</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-56">
              <Doughnut data={platformData} options={{ 
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
            <CardTitle className="text-lg">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-56">
              <Line data={performanceData} options={{
                ...performanceOptions,
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                  legend: { 
                    position: 'bottom',
                    labels: { boxWidth: 12, padding: 8, font: { size: 11 } }
                  }
                },
                scales: {
                  ...performanceOptions.scales,
                  y: { 
                    ...performanceOptions.scales.y,
                    grid: { color: 'rgba(0,0,0,0.1)' }
                  },
                  y1: { 
                    ...performanceOptions.scales.y1,
                    grid: { drawOnChartArea: false }
                  }
                }
              }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg space-y-4 lg:space-y-0">
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {campaign.platform}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          campaign.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : campaign.status === "paused"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : campaign.status === "completed"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>Budget: ${campaign.budget.toLocaleString()}</div>
                    <div>Spent: ${campaign.spent.toLocaleString()}</div>
                    <div>Conversions: {campaign.conversions}</div>
                    <div>ROAS: {campaign.roas}x</div>
                  </div>
                </div>                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleEdit}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
