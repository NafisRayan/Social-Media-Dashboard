"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const engagementDemo = [
  { id: 1, type: "Like", user: "Alice", post: "Launching our new product next week! 🚀", time: "2025-06-11T09:00:00Z" },
  { id: 2, type: "Comment", user: "Bob", post: "Thank you for 10k followers! 🎉", time: "2025-06-10T15:00:00Z" },
  { id: 3, type: "Share", user: "Charlie", post: "Launching our new product next week! 🚀", time: "2025-06-10T16:00:00Z" },
  { id: 4, type: "Like", user: "Dana", post: "Our servers will be down for maintenance tonight.", time: "2025-06-09T23:00:00Z" },
];

export function EngagementSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Recent Engagement</h2>
      <div className="grid gap-4">
        {engagementDemo.map((e) => (
          <Card key={e.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{e.type}</span>
                <span className="text-xs text-muted-foreground">{new Date(e.time).toLocaleString()}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <span className="font-semibold">{e.user}</span> {e.type.toLowerCase()}d on post: <span className="italic">&quot;{e.post}&quot;</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
