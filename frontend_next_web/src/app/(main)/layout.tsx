import "../globals.css";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main className="w-full">
              <Navbar />
              <div className="px-4 lg:px-6 py-4 md:py-6">{children}</div>
            </main>
          </SidebarProvider>
  );
}