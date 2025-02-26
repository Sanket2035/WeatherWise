"use client"

import { Sun, Cloud, Wind, Droplets } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/", icon: Sun },
  { name: "Forecast", href: "/forecast", icon: Cloud },
  { name: "Details", href: "/details", icon: Wind },
  { name: "Suggestions", href: "/suggestions", icon: Droplets },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

