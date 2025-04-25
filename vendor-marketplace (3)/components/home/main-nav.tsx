"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ShoppingBag, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/events",
      label: "Events",
      icon: Calendar,
      active: pathname === "/events",
    },
    {
      href: "/vendors",
      label: "Vendors",
      icon: ShoppingBag,
      active: pathname === "/vendors",
    },
    {
      href: "/about",
      label: "About Us",
      icon: Users,
      active: pathname === "/about",
    },
  ]

  return (
    <div className="flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden sm:inline-block font-bold text-xl">EventPro</span>
      </Link>

      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "transition-colors hover:text-primary flex items-center gap-1",
              route.active ? "text-primary" : "text-foreground/60",
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </nav>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsOpen(false)}>
            <span className="font-bold text-xl">EventPro</span>
          </Link>
          <nav className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 py-2",
                  route.active ? "text-primary" : "text-foreground/60",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
