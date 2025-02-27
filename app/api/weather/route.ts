import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const apiKey = process.env.OPENWEATHERMAP_API_KEY

  if (!apiKey) {
    console.error("OpenWeatherMap API key is not set")
    return NextResponse.json({ error: "Weather API configuration is missing" }, { status: 500 })
  }

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
  }

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

    // Fetch air pollution data
    const pollutionResponse = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    )

    if (!pollutionResponse.ok) {
      const errorData = await pollutionResponse.json()
      console.error("Air Pollution API Error:", errorData)
      throw new Error(`Air Pollution API error: ${errorData.message || pollutionResponse.statusText}`)
    }

    const pollutionData = await pollutionResponse.json()

    // Process and transform the data
    const processedData = {
      current: {
        temperature: currentData.main.temp,
        feelsLike: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        windSpeed: currentData.wind.speed,
        windDirection: currentData.wind.deg,
        weatherDescription: currentData.weather[0].description,
        weatherIcon: currentData.weather[0].icon,
        sunrise: new Date(currentData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(currentData.sys.sunset * 1000).toLocaleTimeString(),
        visibility: currentData.visibility,
        cloudiness: currentData.clouds.all,
      },
      daily: forecastData.list
        .filter((item: any, index: number) => index % 8 === 0)
        .map((day: any) => ({
          date: new Date(day.dt * 1000).toLocaleDateString(),
          tempMax: day.main.temp_max,
          tempMin: day.main.temp_min,
          weatherDescription: day.weather[0].description,
          weatherIcon: day.weather[0].icon,
        })),
      hourly: forecastData.list.slice(0, 24).map((hour: any) => ({
        time: new Date(hour.dt * 1000).toLocaleTimeString(),
        temperature: hour.main.temp,
        precipitation: hour.pop * 100,
        weatherIcon: hour.weather[0].icon,
      })),
      airQuality: {
        aqi: pollutionData.list[0].main.aqi,
        components: pollutionData.list[0].components,
      },
    }

    return NextResponse.json(processedData)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch weather data. Please try again later.",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

