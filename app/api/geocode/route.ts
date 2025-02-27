import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const apiKey = process.env.OPENWEATHERMAP_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "Geocoding API configuration is missing" }, { status: 500 })
  }

  try {
    let url
    if (query) {
      // Forward geocoding
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
    } else if (lat && lon) {
      // Reverse geocoding
      url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    } else {
      return NextResponse.json({ error: "Either query or coordinates are required" }, { status: 400 })
    }

    const response = await fetch(url)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Geocoding API error: ${errorData.message || response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching geocoding data:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch location data",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

