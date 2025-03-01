import { AlertTriangle } from "lucide-react"

export default function AirQuality({ data }) {
  if (!data) {
    return (
      <div className="bg-yellow-100 p-6 rounded-lg mb-8">
        <div className="flex items-center">
          <AlertTriangle className="text-yellow-500 mr-2" />
          <h2 className="text-2xl font-semibold mb-4">Air Quality Data Unavailable</h2>
        </div>
        <p>We're currently unable to retrieve air quality data. Please check back later.</p>
      </div>
    )
  }

  const getAQIDescription = (aqi) => {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 150) return "Unhealthy for Sensitive Groups"
    if (aqi <= 200) return "Unhealthy"
    if (aqi <= 300) return "Very Unhealthy"
    return "Hazardous"
  }

  return (
    <div className="bg-purple-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Air Quality</h2>
      <p>
        AQI: {data.aqi} - {getAQIDescription(data.aqi)}
      </p>
      <p>PM2.5: {data.components?.pm2_5 ?? "N/A"} µg/m³</p>
      <p>PM10: {data.components?.pm10 ?? "N/A"} µg/m³</p>
    </div>
  )
}

