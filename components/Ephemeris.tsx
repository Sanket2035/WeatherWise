export default function Ephemeris({ data }) {
  return (
    <div className="bg-indigo-100 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Sun & Moon</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Sun</h3>
          <p>Sunrise: {data.sunrise}</p>
          <p>Sunset: {data.sunset}</p>
        </div>
        <div>
          <h3 className="font-semibold">Moon</h3>
          <p>Moonrise: {data.moonrise}</p>
          <p>Moonset: {data.moonset}</p>
          <p>Moon Phase: {data.moonPhase}</p>
        </div>
      </div>
    </div>
  )
}

