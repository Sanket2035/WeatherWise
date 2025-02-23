"use client"

import { useState, useEffect } from "react"
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
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setWeatherData(data)
      setLoading(false)
    } catch (err) {
      setError(err.message || "Failed to fetch weather data")
      setLoading(false)
    }
  }

  if (loading) return <div className="text-white text-2xl">Loading...</div>
  if (error) return <div className="text-red-500 text-2xl">{error}</div>
  if (!weatherData) return <div className="text-white text-2xl">No weather data available</div>

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

