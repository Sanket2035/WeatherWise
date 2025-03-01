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

export default function forecast({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">7-Day Forecast</h2>
        <p>No forecast data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {data.slice(0, 7).map((day, index) => (
          <div key={index} className="text-center p-2 bg-gray-100 rounded-lg">
            <p className="font-semibold">{new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}</p>
            <div className="flex justify-center my-2">{getWeatherIcon(day.weatherDescription)}</div>
            <p className="text-sm">{day.weatherDescription || "N/A"}</p>
            <p className="font-bold">{Math.round(day.tempMax)}°C</p>
            <p>{Math.round(day.tempMin)}°C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

