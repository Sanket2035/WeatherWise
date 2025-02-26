import { X } from "lucide-react"

export default function FavoriteCities({ favorites, onSelectFavorite, onRemoveFavorite }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Favorite Cities</h3>
      <div className="flex flex-wrap gap-2">
        {favorites.map((city) => (
          <div key={city.name} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <button onClick={() => onSelectFavorite(city)} className="text-blue-500 hover:text-blue-700">
              {city.name}
            </button>
            <button onClick={() => onRemoveFavorite(city)} className="ml-2 text-red-500 hover:text-red-700">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

