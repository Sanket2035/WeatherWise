"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Sunrise, Sunset, Wind, Droplets, Eye, Cloud } from "lucide-react"
import CurrentWeather from "./CurrentWeather"
import DailyForecast from "./DailyForecast"
import HourlyForecast from "./HourlyForecast"
import AirQuality from "./AirQuality"
import LocationSearch from "./LocationSearch"
import FavoriteCities from "./FavoriteCities"

export default function Weather() {
  interface WeatherData {
    current: {
      sunrise: string;
      sunset: string;
      windSpeed: number;
      windDirection: number;
      humidity: number;
      visibility: number;
      cloudiness: number;
    };
    daily: any; // Replace 'any' with the actual type if available
    hourly: any; // Replace 'any' with the actual type if available
    airQuality: any; // Replace 'any' with the actual type if available
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number | null; lon: number | null; name: string | null }>({ lat: null, lon: null, name: null })

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeatherData(location.lat, location.lon)
    } else {
      getCurrentLocation()
    }
  }, [location])

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: "Current Location",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          setError("Unable to get current location. Please search for a city.")
          setLoading(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city.")
      setLoading(false)
    }
  }

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)

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
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch weather data")
      } else {
        setError("Failed to fetch weather data")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchLocation: { lat: number; lon: number; name: string }) => {
    setLocation(searchLocation)
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

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Weather Forecast</h1>
      <LocationSearch onSearch={handleSearch} />
      <FavoriteCities 
        favorites={[]} 
        onSelectFavorite={handleSearch} 
        onRemoveFavorite={() => {}} 
      />
      {weatherData && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{location.name}</h2>
          </div>
          <CurrentWeather data={weatherData.current} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Sun & Moon</h3>
              <div className="flex items-center mb-2">
                <Sunrise className="mr-2" />
                <span>Sunrise: {weatherData.current.sunrise}</span>
              </div>
              <div className="flex items-center">
                <Sunset className="mr-2" />
                <span>Sunset: {weatherData.current.sunset}</span>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Additional Info</h3>
              <div className="flex items-center mb-2">
                <Wind className="mr-2" />
                <span>
                  Wind: {weatherData.current.windSpeed} m/s, {weatherData.current.windDirection}°
                </span>
              </div>
              <div className="flex items-center mb-2">
                <Droplets className="mr-2" />
                <span>Humidity: {weatherData.current.humidity}%</span>
              </div>
              <div className="flex items-center mb-2">
                <Eye className="mr-2" />
                <span>Visibility: {weatherData.current.visibility / 1000} km</span>
              </div>
              <div className="flex items-center">
                <Cloud className="mr-2" />
                <span>Cloudiness: {weatherData.current.cloudiness}%</span>
              </div>
            </div>
          </div>
          <DailyForecast data={weatherData.daily} />
          <HourlyForecast data={weatherData.hourly} />
          <AirQuality data={weatherData.airQuality} />
        </>
      )}
    </div>
  )
}

