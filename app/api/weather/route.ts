import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY

  if (!apiKey) {
    console.error("OpenWeatherMap API key is not set")
    return NextResponse.json({ error: "API key is not configured" }, { status: 500 })
  }

  const lat = "40.7128"
  const lon = "-74.0060"
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    // Process and transform the data as needed
    const processedData = {
      current: {
        temperature: data.current?.temp,
        feelsLike: data.current?.feels_like,
        humidity: data.current?.humidity,
        uvIndex: data.current?.uvi,
        windSpeed: data.current?.wind_speed,
      },
      daily:
        data.daily?.map((day) => ({
          date: new Date(day.dt * 1000).toLocaleDateString(),
          tempMax: day.temp?.max,
          tempMin: day.temp?.min,
        })) || [],
      hourly:
        data.hourly?.map((hour) => ({
          time: new Date(hour.dt * 1000).toLocaleTimeString(),
          temperature: hour.temp,
          precipitation: hour.pop ? hour.pop * 100 : 0,
        })) || [],
      airQuality: {
        aqi: data.current?.aqi,
        pm25: data.current?.pm2_5,
        pm10: data.current?.pm10,
      },
      alerts: data.alerts || [],
      ephemeris: {
        sunrise: data.current?.sunrise ? new Date(data.current.sunrise * 1000).toLocaleTimeString() : "N/A",
        sunset: data.current?.sunset ? new Date(data.current.sunset * 1000).toLocaleTimeString() : "N/A",
        moonrise: data.daily?.[0]?.moonrise ? new Date(data.daily[0].moonrise * 1000).toLocaleTimeString() : "N/A",
        moonset: data.daily?.[0]?.moonset ? new Date(data.daily[0].moonset * 1000).toLocaleTimeString() : "N/A",
        moonPhase: data.daily?.[0]?.moon_phase ?? "N/A",
      },
    }

    return NextResponse.json(processedData)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

