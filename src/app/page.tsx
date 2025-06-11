"use client";

// Social Media Management Dashboard Main Page

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "../components/ThemeToggler";
import { Sidebar } from "../components/Sidebar";
import { DashboardHome } from "../components/DashboardHome";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors">
      <Sidebar 
        selected={selectedSection} 
        onSelect={setSelectedSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col lg:ml-0 min-w-0">
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-card">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold truncate">Social Media Dashboard</h1>
          </div>
          <ThemeToggler />
        </header>
        <section className="flex-1 overflow-y-auto p-4 sm:p-6">
          <DashboardHome section={selectedSection} />
        </section>
      </main>
    </div>
  );
}
