"use client"

import { useState, useEffect } from "react"
import { MapPin, Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function LocationSidebar() {
  const [query, setQuery] = useState("")
  const [favorites, setFavorites] = useState<{ name: string }[]>([])
  const [currentLocation, setCurrentLocation] = useState<{ name: string } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Load favorites from JSON file
    fetch("/api/favorites")
      .then((response) => response.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error("Error loading favorites:", error))

    // Get current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const response = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`)
            const data = await response.json()
            setCurrentLocation(data[0])
          } catch (error) {
            console.error("Error getting location name:", error)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      // Handle search results...
      console.log(data)
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  const toggleFavorite = async (location: { name: string }) => {
    const isFavorite = favorites.some((fav) => fav.name === location.name)
    let newFavorites

    if (isFavorite) {
      newFavorites = favorites.filter((fav) => fav.name !== location.name)
      toast({
        title: "Location removed",
        description: `${location.name} has been removed from favorites`,
      })
    } else {
      newFavorites = [...favorites, location]
      toast({
        title: "Location added",
        description: `${location.name} has been added to favorites`,
      })
    }

    setFavorites(newFavorites)

    // Save to JSON file via API
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFavorites),
      })
    } catch (error) {
      console.error("Error saving favorites:", error)
    }
  }

  return (
    <div className="px-4 py-2">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Current Location</h3>
        {currentLocation && (
          <Button variant="ghost" className="w-full justify-start gap-2">
            <MapPin className="h-4 w-4" />
            {currentLocation.name}
          </Button>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Favorite Locations</h3>
        <div className="space-y-1">
          {favorites.map((location) => (
            <Button
              key={location.name}
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => toggleFavorite(location)}
            >
              <Star className="h-4 w-4" />
              {location.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

