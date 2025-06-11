"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Calendar, Eye, Heart, MessageCircle, Share, BarChart3, Clock } from "lucide-react";

type Post = {
  id: string;
  content: string;
  platforms: ("Facebook" | "Instagram" | "Twitter" | "LinkedIn" | "TikTok")[];
  scheduledAt: string;
  status: "scheduled" | "posted" | "failed" | "draft";
  mediaType: "text" | "image" | "video" | "carousel";
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  tags: string[];
  campaign?: string;
};

const demoPosts: Post[] = [
  {
    id: "1",
    content: "🚀 Exciting news! Our new summer collection is launching next week. Get ready for vibrant colors and sustainable materials that will transform your wardrobe! #SummerFashion #Sustainable #NewCollection",
    platforms: ["Instagram", "Facebook", "Twitter"],
    scheduledAt: "2025-06-12T10:00:00Z",
    status: "scheduled",
    mediaType: "carousel",
    tags: ["summer", "fashion", "sustainable", "launch"],
    campaign: "Summer Product Launch",
  },
  {
    id: "2",
    content: "🎉 Milestone alert! We've just hit 10,000 amazing followers! Thank you for being part of our incredible journey. Here's to the next 10K! 💪 #Milestone #ThankYou #Community",
    platforms: ["Instagram", "Facebook", "LinkedIn"],
    scheduledAt: "2025-06-10T14:00:00Z",
    status: "posted",
    mediaType: "image",
    engagement: {
      likes: 2847,
      comments: 156,
      shares: 89,
      views: 15420,
    },
    tags: ["milestone", "community", "thankyou"],
    campaign: "Brand Awareness Q2",
  },
  {
    id: "3",
    content: "⚠️ Maintenance Notice: Our servers will be undergoing scheduled maintenance tonight from 11 PM to 3 AM EST. We apologize for any inconvenience. #Maintenance #ServerUpdate",
    platforms: ["Twitter", "LinkedIn"],
    scheduledAt: "2025-06-09T22:00:00Z",
    status: "failed",
    mediaType: "text",
    tags: ["maintenance", "notice", "server"],
  },
  {
    id: "4",
    content: "💡 Behind the scenes: Ever wondered how we create our products? Take a peek into our design studio where innovation meets creativity! #BehindTheScenes #Design #Innovation",
    platforms: ["TikTok", "Instagram"],
    scheduledAt: "2025-06-13T16:00:00Z",
    status: "scheduled",
    mediaType: "video",
    tags: ["behindthescenes", "design", "innovation"],
    campaign: "Gen Z Engagement",
  },
  {
    id: "5",
    content: "📊 Industry Insight: The future of social media marketing lies in authentic storytelling and genuine community building. What's your take? #MarketingTips #Industry #SocialMedia",
    platforms: ["LinkedIn"],
    scheduledAt: "2025-06-11T09:00:00Z",
    status: "posted",
    mediaType: "text",
    engagement: {
      likes: 234,
      comments: 67,
      shares: 45,
      views: 3420,
    },
    tags: ["marketing", "industry", "insights"],
    campaign: "B2B Lead Generation",
  },
  {
    id: "6",
    content: "🌟 Customer Spotlight: Meet Sarah, who transformed her style with our pieces! Share your transformation story in the comments. #CustomerSpotlight #Transformation #Style",
    platforms: ["Instagram", "Facebook"],
    scheduledAt: "2025-06-14T12:00:00Z",
    status: "draft",
    mediaType: "image",
    tags: ["customer", "spotlight", "transformation"],
  },
];

export function PostsSection() {
  const [posts] = useState<Post[]>(demoPosts);

  // Placeholder CRUD handlers
  const handleAdd = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      Facebook: "#1877f2",
      Instagram: "#e4405f",
      Twitter: "#1da1f2",
      LinkedIn: "#0077b5",
      TikTok: "#000000",
    };
    return colors[platform] || "#6366f1";
  };

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "🎥";
      case "image": return "📷";
      case "carousel": return "🖼️";
      default: return "📝";
    }
  };

  const totalPosts = posts.length;
  const scheduledPosts = posts.filter(p => p.status === "scheduled").length;
  const postedPosts = posts.filter(p => p.status === "posted").length;
  const draftPosts = posts.filter(p => p.status === "draft").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Content Management</h2>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">All content pieces</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledPosts}</div>
            <p className="text-xs text-muted-foreground">Ready to publish</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postedPosts}</div>
            <p className="text-xs text-muted-foreground">Live content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPosts}</div>
            <p className="text-xs text-muted-foreground">Work in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getMediaTypeIcon(post.mediaType)}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{new Date(post.scheduledAt).toLocaleString()}</span>
                    </div>
                    {post.campaign && (
                      <p className="text-xs text-muted-foreground">Campaign: {post.campaign}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      post.status === "scheduled"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : post.status === "posted"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : post.status === "failed"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content Preview */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm line-clamp-3">{post.content}</p>
              </div>

              {/* Platforms & Tags */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-2">Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="text-xs px-2 py-1 rounded-full text-white font-medium"
                        style={{ backgroundColor: getPlatformColor(platform) }}
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Engagement Stats (for posted content) */}
              {post.engagement && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Performance</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="font-medium">{post.engagement.likes.toLocaleString()}</span>
                      <span className="text-muted-foreground">likes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{post.engagement.comments.toLocaleString()}</span>
                      <span className="text-muted-foreground">comments</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Share className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{post.engagement.shares.toLocaleString()}</span>
                      <span className="text-muted-foreground">shares</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">{post.engagement.views.toLocaleString()}</span>
                      <span className="text-muted-foreground">views</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
