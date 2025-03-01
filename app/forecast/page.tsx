import MainLayout from "@/components/layout/MainLayout"
import DailyForecast from "@/components/DailyForecast"
import HourlyForecast from "@/components/HourlyForecast"

export default function ForecastPage({ weatherData }) {
  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Weather Forecast</h1>
        <DailyForecast data={weatherData?.daily || []} />
        <HourlyForecast data={weatherData?.hourly || []} />
      </div>
    </MainLayout>
  )
}

