"use client";

import { Calendar, TrendingUp, Users, Eye, Activity, AlertTriangle, BarChart, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function OverviewSection() {
  // Calendar data for Post Activity
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const hasActivity = Math.random() > 0.6;
    const activityLevel = hasActivity ? Math.floor(Math.random() * 4) + 1 : 0;
    return { day: i + 1, activityLevel };
  });

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return "bg-muted";
      case 1: return "bg-blue-200 dark:bg-blue-900";
      case 2: return "bg-blue-400 dark:bg-blue-700";
      case 3: return "bg-blue-600 dark:bg-blue-500";
      case 4: return "bg-blue-800 dark:bg-blue-400";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Row - Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold">278,534</p>
                <p className="text-xs text-green-600 dark:text-green-400">+2.1% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold">5,192,879</p>
                <p className="text-xs text-green-600 dark:text-green-400">+2,953 today</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">98.2%</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Above average</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Posts</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">This month</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row - Post Activity & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Post Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Post Activity</CardTitle>
            <Badge variant="secondary">687 in May 2024</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Less</span>
                <span>More</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(day.activityLevel)}`}
                    title={`${day.activityLevel} posts`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">189 this month</span>
                <span className="text-muted-foreground">24 today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Post Schedule</CardTitle>
            <Badge variant="outline">5 posts scheduled</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Competition win bigger engagement boost</p>
                  <p className="text-xs text-muted-foreground">10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Technology innovation topic</p>
                  <p className="text-xs text-muted-foreground">2:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Weekly brand story and industry focus</p>
                  <p className="text-xs text-muted-foreground">4:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Third Row - Anomaly Detection & Post Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Anomaly Detection */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Anomaly Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  Your followers saw a 15% page change out something unusual out of your posts.
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    May 14, 2024
                  </Badge>
                  <button className="text-xs text-orange-600 hover:text-orange-800 font-medium">
                    See Details
                  </button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">98.2%</p>
                <p className="text-sm text-muted-foreground">Detection Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Insights */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Post Insights</CardTitle>
            <Badge variant="secondary">Based on May 15, 2024</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Followers</span>
                  <span className="text-sm text-muted-foreground">+2,953</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Unique Posting</span>
                  <span className="text-sm text-muted-foreground">Activity Level</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                    <div
                      key={bar}
                      className={`flex-1 rounded-sm ${
                        bar <= 5 ? 'bg-blue-500' : 'bg-muted'
                      }`}
                      style={{ height: `${Math.random() * 40 + 20}px` }}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold">5,192,879</p>
                <p className="text-sm text-muted-foreground">Total Reach</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                <p className="text-lg font-bold">United States: 32,580</p>
                <p className="text-lg font-bold">Brazil: 10,354</p>
              </div>
              <BarChart className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Your Accounts</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                  <span className="text-sm">@UniversalBiz</span>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Update</p>
                <p className="text-lg font-bold">2 hours</p>
                <p className="text-xs text-muted-foreground">Auto refresh enabled</p>
              </div>
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
