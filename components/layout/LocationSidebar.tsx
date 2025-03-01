"use client"

import { useState, useEffect } from "react"
import { MapPin, Search, Star, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function LocationSidebar({ onLocationSelect }) {
  const [query, setQuery] = useState("")
  const [favorites, setFavorites] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadFavorites()
    getCurrentLocation()
  }, [])

  const loadFavorites = async () => {
    try {
      const response = await fetch("/api/favorites")
      const data = await response.json()
      setFavorites(data)
    } catch (error) {
      console.error("Error loading favorites:", error)
      toast({
        title: "Error",
        description: "Failed to load favorite locations",
        variant: "destructive",
      })
    }
  }

  const getCurrentLocation = () => {
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
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      if (data && data.length > 0) {
        onLocationSelect(data[0])
      } else {
        toast({
          title: "Location not found",
          description: "Please try a different search term",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Error",
        description: "Failed to search for location",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (location) => {
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
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      })
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
          Search
        </Button>
      </form>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Current Location</h3>
        {currentLocation && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => onLocationSelect(currentLocation)}
          >
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
              onClick={() => onLocationSelect(location)}
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

