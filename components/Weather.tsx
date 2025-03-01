"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Sunrise, Sunset, Wind, Droplets, Eye, Cloud } from "lucide-react"
import CurrentWeather from "./CurrentWeather"
import DailyForecast from "./DailyForecast"
import HourlyForecast from "./HourlyForecast"
import AirQuality from "./AirQuality"
import LocationSearch from "./LocationSearch"
import FavoriteCities from "./FavoriteCities"

export default function Weather({ weatherData }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (weatherData) {
      setLoading(false)
    }
  }, [weatherData])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-black text-2xl">Loading weather data...</div>
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
      <LocationSearch onSearch={() => {}} />
      <FavoriteCities onSelectFavorite={() => {}} favorites={[]} />
      {weatherData && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{weatherData.location?.name || "Unknown Location"}</h2>
          </div>
          <CurrentWeather data={weatherData.current} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Sun & Moon</h3>
              <div className="flex items-center mb-2">
                <Sunrise className="mr-2" />
                <span>Sunrise: {weatherData.current?.sunrise || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Sunset className="mr-2" />
                <span>Sunset: {weatherData.current?.sunset || "N/A"}</span>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Additional Info</h3>
              <div className="flex items-center mb-2">
                <Wind className="mr-2" />
                <span>
                  Wind: {weatherData.current?.windSpeed || "N/A"} m/s, {weatherData.current?.windDirection || "N/A"}°
                </span>
              </div>
              <div className="flex items-center mb-2">
                <Droplets className="mr-2" />
                <span>Humidity: {weatherData.current?.humidity || "N/A"}%</span>
              </div>
              <div className="flex items-center mb-2">
                <Eye className="mr-2" />
                <span>
                  Visibility: {weatherData.current?.visibility ? `${weatherData.current.visibility / 1000} km` : "N/A"}
                </span>
              </div>
              <div className="flex items-center">
                <Cloud className="mr-2" />
                <span>Cloudiness: {weatherData.current?.cloudiness || "N/A"}%</span>
              </div>
            </div>
          </div>
          <DailyForecast data={weatherData.daily || []} />
          <HourlyForecast data={weatherData.hourly || []} />
          <AirQuality data={weatherData.airQuality} />
        </>
      )}
    </div>
  )
}

