import MainLayout from "@/components/layout/MainLayout"
import WeatherSuggestions from "@/components/WeatherSuggestions"

export default function SuggestionsPage({ weatherData }) {
  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Weather Suggestions</h1>
        <WeatherSuggestions weatherData={weatherData?.current || null} />
      </div>
    </MainLayout>
  )
}

