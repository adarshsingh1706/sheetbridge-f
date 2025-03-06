'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { useAuth } from "@/context/AuthProvider"
import { Menu, LogOut } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  
  const navigationItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Sheets", path: "/dashboard/sheets" },
    { label: "Settings", path: "/dashboard/settings" }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Navigation */}
      <header className="sticky top-0 z-10 bg-background shadow-sm lg:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <nav className="flex flex-col gap-2 pt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4">
            <span className="text-sm">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[250px] border-r bg-muted/40">
          <div className="flex flex-col h-full">
            <nav className="flex flex-col gap-2 p-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between h-14 px-6 border-b">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-6 bg-muted/20">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
