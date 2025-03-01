import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react"

const getWeatherIcon = (description) => {
  if (!description) return <Sun className="w-6 h-6 text-yellow-500" />
  const lowerDescription = description.toLowerCase()
  if (lowerDescription.includes("clear")) return <Sun className="w-6 h-6 text-yellow-500" />
  if (lowerDescription.includes("cloud")) return <Cloud className="w-6 h-6 text-gray-500" />
  if (lowerDescription.includes("rain")) return <CloudRain className="w-6 h-6 text-blue-500" />
  if (lowerDescription.includes("snow")) return <Snowflake className="w-6 h-6 text-blue-300" />
  return <Sun className="w-6 h-6 text-yellow-500" />
}

export default function HourlyForecast({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hourly Forecast</h2>
        <p>No hourly forecast data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Hourly Forecast</h2>
      <div className="flex space-x-4">
        {data.slice(0, 24).map((hour, index) => (
          <div key={index} className="text-center p-2 bg-gray-100 rounded-lg min-w-[100px]">
            <p className="font-semibold">
              {new Date(hour.time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}
            </p>
            <div className="flex justify-center my-2">{getWeatherIcon(hour.weatherDescription)}</div>
            <p className="text-sm">{hour.weatherDescription || "N/A"}</p>
            <p className="font-bold">{Math.round(hour.temperature)}°C</p>
            <p>{Math.round(hour.precipitation)}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

