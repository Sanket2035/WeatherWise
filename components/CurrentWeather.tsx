import { CloudRain, Sun, Wind } from "lucide-react"

export default function CurrentWeather({ data }) {
  if (!data) {
    return <div>Loading current weather data...</div>
  }

  return (
    <div className="bg-blue-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-4xl font-bold">{data.temperature?.toFixed(1) ?? "N/A"}°C</p>
          <p className="text-xl">Feels like: {data.feelsLike?.toFixed(1) ?? "N/A"}°C</p>
        </div>
        <div>
          <p>
            <Sun className="inline mr-2" /> UV Index: {data.uvIndex ?? "N/A"}
          </p>
          <p>
            <Wind className="inline mr-2" /> Wind: {data.windSpeed ?? "N/A"} km/h
          </p>
          <p>
            <CloudRain className="inline mr-2" /> Humidity: {data.humidity ?? "N/A"}%
          </p>
        </div>
      </div>
    </div>
  )
}

