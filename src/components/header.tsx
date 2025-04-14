'use client';

import { Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-end px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
