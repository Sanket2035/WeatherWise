export default function AirQuality({ data }) {
  return (
    <div className="bg-purple-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Air Quality</h2>
      <p>AQI: {data.aqi}</p>
      <p>PM2.5: {data.pm25}</p>
      <p>PM10: {data.pm10}</p>
    </div>
  )
}

