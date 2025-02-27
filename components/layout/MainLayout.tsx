"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import Header from "./Header"
import LocationSidebar from "./LocationSidebar"
import WeatherBackground from "../WeatherBackground"

export default function MainLayout({ children }) {
  const [weatherCondition, setWeatherCondition] = useState("Clear")

  useEffect(() => {
    // Fetch current weather data to set the background
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather?lat=0&lon=0") // Default coordinates
        const data = await response.json()
        if (data && data.current && data.current.weatherDescription) {
          setWeatherCondition(data.current.weatherDescription.split(" ")[0])
        }
      } catch (error) {
        console.error("Error fetching weather for background:", error)
      }
    }

    fetchWeather()
  }, [])

  return (
    <SidebarProvider defaultOpen={true}>
      <WeatherBackground weatherCondition={weatherCondition} />
      <div className="flex min-h-screen relative z-10">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <h2 className="text-lg font-semibold">Weather App</h2>
          </SidebarHeader>
          <SidebarContent>
            <LocationSidebar />
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-white bg-opacity-75">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

