"use client"

import { useEffect, useState } from "react"

const weatherBackgrounds = {
  Clear: "bg-gradient-to-br from-blue-400 to-blue-200",
  Clouds: "bg-gradient-to-br from-gray-400 to-gray-200",
  Rain: "bg-gradient-to-br from-blue-700 to-blue-500",
  Snow: "bg-gradient-to-br from-blue-100 to-white",
  Thunderstorm: "bg-gradient-to-br from-gray-700 to-gray-500",
  Drizzle: "bg-gradient-to-br from-blue-300 to-blue-100",
  Mist: "bg-gradient-to-br from-gray-300 to-gray-100",
  Fog: "bg-gradient-to-br from-gray-400 to-gray-200",
  Haze: "bg-gradient-to-br from-yellow-200 to-yellow-100",
  Smoke: "bg-gradient-to-br from-gray-600 to-gray-400",
  Dust: "bg-gradient-to-br from-yellow-700 to-yellow-500",
  Sand: "bg-gradient-to-br from-yellow-600 to-yellow-400",
  Ash: "bg-gradient-to-br from-gray-800 to-gray-600",
  Squall: "bg-gradient-to-br from-blue-800 to-blue-600",
  Tornado: "bg-gradient-to-br from-gray-900 to-gray-700",
}

export default function WeatherBackground({ weatherCondition }) {
  const [background, setBackground] = useState(weatherBackgrounds.Clear)

  useEffect(() => {
    setBackground(weatherBackgrounds[weatherCondition] || weatherBackgrounds.Clear)
  }, [weatherCondition])

  return <div className={`fixed inset-0 ${background} transition-colors duration-500`} />
}

