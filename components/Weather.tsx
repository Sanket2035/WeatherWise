"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import CurrentWeather from "./CurrentWeather"
import DailyForecast from "./DailyForecast"
import HourlyForecast from "./HourlyForecast"
import AirQuality from "./AirQuality"
import Alerts from "./Alerts"
import Ephemeris from "./Ephemeris"

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async () => {
    try {
      const response = await fetch("/api/weather")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setWeatherData(data)
      setError(null)
    } catch (err) {
      console.error("Weather data fetch error:", err)
      setError(err.message || "Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-white text-2xl">Loading weather data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-red-50 rounded-lg p-4">
        <div className="flex items-center text-red-800">
          <AlertCircle className="mr-2" />
          <span>{error}</span>
        </div>
      </div>
    )
  }

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-white text-2xl">No weather data available</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Weather Forecast</h1>
      <CurrentWeather data={weatherData.current} />
      <DailyForecast data={weatherData.daily} />
      <HourlyForecast data={weatherData.hourly} />
      <AirQuality data={weatherData.airQuality} />
      <Alerts data={weatherData.alerts} />
      <Ephemeris data={weatherData.ephemeris} />
    </div>
  )
}

