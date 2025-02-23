export default function DailyForecast({ data }) {
  return (
    <div className="bg-green-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">16-Day Forecast</h2>
      <div className="grid grid-cols-8 gap-4">
        {data.slice(0, 16).map((day, index) => (
          <div key={index} className="text-center">
            <p>{day.date}</p>
            <p className="font-bold">{day.tempMax}°C</p>
            <p>{day.tempMin}°C</p>
          </div>
        ))}
      </div>
    </div>
  )
}

