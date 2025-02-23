export default function Alerts({ data }) {
  return (
    <div className="bg-red-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Weather Alerts</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((alert, index) => (
            <li key={index} className="mb-2">
              <strong>{alert.event}</strong>: {alert.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No current weather alerts.</p>
      )}
    </div>
  )
}

