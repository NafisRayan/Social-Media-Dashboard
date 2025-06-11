"use client";

import { DashboardSection } from "./sections/DashboardSection";
import { OverviewSection } from "./sections/OverviewSection";
import { PostsSection } from "./sections/PostsSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { EngagementSection } from "./sections/EngagementSection";
import { CampaignsSection } from "./sections/CampaignsSection";
import { CustomersSection } from "./sections/CustomersSection";
import { UsersSection } from "./sections/UsersSection";
import { SettingsSection } from "./sections/SettingsSection";

export function DashboardHome({ section }: { section: string }) {
  switch (section) {
    case "overview":
      return <OverviewSection />;
    case "posts":
      return <PostsSection />;
    case "analytics":
      return <AnalyticsSection />;
    case "engagement":
      return <EngagementSection />;
    case "campaigns":
      return <CampaignsSection />;
    case "customers":
      return <CustomersSection />;
    case "users":
      return <UsersSection />;
    case "settings":
      return <SettingsSection />;
    default:
      return <DashboardSection />;
  }
}
