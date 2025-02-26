"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/MainLayout"
import WeatherSuggestions from "@/components/WeatherSuggestions"

export default function SuggestionsPage() {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    // Fetch current weather data
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather")
        const data = await response.json()
        setWeatherData({
          temperature: data.current.temperature,
          windSpeed: data.current.windSpeed,
          precipitation: data.current.precipitation || 0, // Add this to your API if not already present
        })
      } catch (error) {
        console.error("Error fetching weather:", error)
      }
    }

    fetchWeather()
  }, [])

  return <MainLayout>{weatherData && <WeatherSuggestions weatherData={weatherData} />}</MainLayout>
}

