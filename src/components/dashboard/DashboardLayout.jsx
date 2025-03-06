'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem 
} from "@/components/ui/menubar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthProvider"
import { Menu, LogOut, User, Settings, LayoutDashboard, Sheet as SheetIcon } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  
  const navigationItems = [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Sheets", path: "/dashboard/sheets", icon: <SheetIcon className="h-4 w-4" /> },
    { label: "Settings", path: "/dashboard/settings", icon: <Settings className="h-4 w-4" /> }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Mobile Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b lg:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] p-0">
              <div className="px-4 py-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="font-bold text-white">SB</span>
                  </div>
                  <span className="font-semibold">SheetBridge</span>
                </div>
                <nav className="flex flex-col gap-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <Separator className="my-2" />
              <div className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>{user?.email[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.email}</span>
                    <Badge variant="outline" className="mt-1 text-xs">Free Plan</Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 justify-start gap-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>{user?.email[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[260px] border-r bg-muted/40">
          <div className="flex flex-col h-full">
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white">SB</span>
                </div>
                <span className="font-semibold">SheetBridge</span>
              </div>
            </div>
            <Separator className="my-2" />
            <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>{user?.email[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.email}</span>
                  <Badge variant="outline" className="mt-1 text-xs">Free Plan</Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="w-full mt-4 justify-start gap-2"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Desktop Header */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex items-center justify-end h-14 px-6">
              <Menubar className="border-none">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" />
                      <AvatarFallback>{user?.email[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent align="end">
                    <MenubarItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </MenubarItem>
                    <MenubarItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </MenubarItem>
                    <Separator className="my-1" />
                    <MenubarItem className="cursor-pointer text-destructive" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </header>
          
          {/* Content Area */}
          <div className="flex-1 p-6 bg-muted/10">
            <div className="max-w-6xl mx-auto bg-background rounded-xl border p-6 shadow-sm">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
