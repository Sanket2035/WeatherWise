import MainLayout from "@/components/layout/MainLayout"
import Weather from "@/components/Weather"

export default function Home({ weatherData }) {
  return (
    <MainLayout>
      <Weather weatherData={weatherData} />
    </MainLayout>
  )
}

