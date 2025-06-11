"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggler } from "../ThemeToggler";

export function SettingsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span>Theme</span>
            <ThemeToggler />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-muted-foreground">Account settings and integrations coming soon.</span>
        </CardContent>
      </Card>
    </div>
  );
}
