import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY

  if (!apiKey) {
    console.error("OpenWeatherMap API key is not set")
    return NextResponse.json({ error: "Weather API configuration is missing" }, { status: 500 })
  }

  const lat = "40.7128"
  const lon = "-74.0060"

  try {
    // Fetch current weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    )

    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json()
      console.error("Weather API Error:", errorData)
      throw new Error(`Weather API error: ${errorData.message || weatherResponse.statusText}`)
    }

    const currentData = await weatherResponse.json()

    // Fetch 5 day forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    )

    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json()
      console.error("Forecast API Error:", errorData)
      throw new Error(`Forecast API error: ${errorData.message || forecastResponse.statusText}`)
    }

    const forecastData = await forecastResponse.json()

    // Process and transform the data
    const processedData = {
      current: {
        temperature: currentData.main?.temp ?? "N/A",
        feelsLike: currentData.main?.feels_like ?? "N/A",
        humidity: currentData.main?.humidity ?? "N/A",
        uvIndex: "N/A", // UV Index requires separate API call or subscription
        windSpeed: currentData.wind?.speed ?? "N/A",
      },
      daily:
        forecastData.list
          ?.filter((item: any, index: number) => index % 8 === 0) // Get one reading per day
          .map((day: any) => ({
            date: new Date(day.dt * 1000).toLocaleDateString(),
            tempMax: day.main?.temp_max ?? "N/A",
            tempMin: day.main?.temp_min ?? "N/A",
          })) ?? [],
      hourly:
        forecastData.list?.slice(0, 24).map((hour: any) => ({
          time: new Date(hour.dt * 1000).toLocaleTimeString(),
          temperature: hour.main?.temp ?? "N/A",
          precipitation: hour.pop ? (hour.pop * 100).toFixed(0) : "0",
        })) ?? [],
      airQuality: {
        aqi: "N/A", // Air quality requires separate API call or subscription
        pm25: "N/A",
        pm10: "N/A",
      },
      alerts: [], // Alerts require separate API call or subscription
      ephemeris: {
        sunrise: currentData.sys?.sunrise ? new Date(currentData.sys.sunrise * 1000).toLocaleTimeString() : "N/A",
        sunset: currentData.sys?.sunset ? new Date(currentData.sys.sunset * 1000).toLocaleTimeString() : "N/A",
        moonrise: "N/A", // Moon data requires separate API call or subscription
        moonset: "N/A",
        moonPhase: "N/A",
      },
    }

    return NextResponse.json(processedData)
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching weather data:", {
        message: error.message,
        stack: error.stack,
      })
    } else {
      console.error("Error fetching weather data:", error)
    }

    return NextResponse.json(
      {
        error: "Failed to fetch weather data. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

