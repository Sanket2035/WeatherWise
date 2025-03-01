import MainLayout from "@/components/layout/MainLayout"
import CurrentWeather from "@/components/CurrentWeather"
import AirQuality from "@/components/AirQuality"

export default function DetailsPage({ weatherData }) {
  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Weather Details</h1>
        <CurrentWeather data={weatherData?.current ?? null} />
        <AirQuality data={weatherData?.airQuality ?? null} />
      </div>
    </MainLayout>
  )
}

