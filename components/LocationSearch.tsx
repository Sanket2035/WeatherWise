"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function LocationSearch({ onSearch }) {
  const [query, setQuery] = useState("")

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("Failed to fetch location data")
      const data = await response.json()
      if (data.length > 0) {
        onSearch({
          lat: data[0].lat,
          lon: data[0].lon,
          name: data[0].name,
        })
      } else {
        throw new Error("Location not found")
      }
    } catch (error) {
      console.error("Search error:", error)
      // You might want to show this error to the user
    }
  }

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  )
}

