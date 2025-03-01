"use client"

import React from "react"

import { useState, useEffect } from "react"
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import Header from "./Header"
import LocationSidebar from "./LocationSidebar"
import WeatherBackground from "../WeatherBackground"

export default function MainLayout({ children }) {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState({ lat: 51.5074, lon: -0.1278, name: "London" }) // Default to London

  useEffect(() => {
    fetchWeatherData(location.lat, location.lon)
  }, [location])

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      if (!response.ok) throw new Error("Failed to fetch weather data")
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error("Error fetching weather data:", error)
      setWeatherData(null)
    }
  }

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation)
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <WeatherBackground weatherCondition={weatherData?.current?.weatherDescription || "Clear"} />
      <div className="flex min-h-screen relative z-10">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <h2 className="text-lg font-semibold">Weather App</h2>
          </SidebarHeader>
          <SidebarContent>
            <LocationSidebar onLocationSelect={handleLocationSelect} />
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-white bg-opacity-75">{React.cloneElement(children, { weatherData })}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

