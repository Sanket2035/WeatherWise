interface HourlyForecastProps {
  data: Array<{
    time: string;
    temperature: number;
    precipitation: number;
  }>;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  return (
    <div className="bg-yellow-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Hourly Forecast</h2>
      <div className="grid grid-cols-6 gap-4">
        {data.slice(0, 24).map((hour, index) => (
          <div key={index} className="text-center">
            <p>{hour.time}</p>
            <p className="font-bold">{hour.temperature}°C</p>
            <p>{hour.precipitation}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

