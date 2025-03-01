"use client"

import { useState, useEffect } from "react"
import { Shirt, Coffee, Umbrella, Snowflake, Sun, Cloud } from "lucide-react"

const clothingSuggestions = {
  Clear: [
    "It's a beautiful day! Time for your favorite sunglasses and a light, breezy outfit. 😎👕",
    "Perfect weather for that summer dress or shorts you've been waiting to wear! ☀️👗",
    "Don't forget your sunscreen! And maybe a stylish hat to complete the look. 🧴👒",
  ],
  Clouds: [
    "Cloudy with a chance of style! A light jacket might be a good idea. ☁️🧥",
    "Layers are your friend today. Start with a t-shirt and bring a sweater just in case. 👕🧶",
    "Gray day? Brighten it up with your most colorful outfit! 🌈👚",
  ],
  Rain: [
    "Time to break out the raincoat and waterproof shoes. Splash in puddles responsibly! 🌧️🥾",
    "Umbrella weather! Choose one that matches your outfit for maximum style points. ☔👜",
    "Rainy days call for cozy sweaters and your favorite pair of rain boots. 🧥🌂",
  ],
  Snow: [
    "Bundle up! It's time for your warmest coat, gloves, and that ridiculous (but warm) hat. ❄️🧣",
    "Layer up like you're preparing for an Arctic expedition. You never know when you'll need to build a snowman! ⛄🧤",
    "Snow day fashion: The 'I can't put my arms down' look is in! 🏔️🧥",
  ],
  Thunderstorm: [
    "Storm's brewing! Time for your sturdiest raincoat and waterproof everything. ⛈️🧥",
    "Thunderstorm chic: Rubber boots, raincoat, and maybe a lightning rod hat? (Just kidding about the hat!) 🌩️👢",
    "Stay dry out there! A hooded raincoat is your best friend today. 🌪️🧥",
  ],
  Drizzle: [
    "Light rain calls for a light raincoat or a stylish umbrella. Don't let a little drizzle dampen your style! 🌦️🌂",
    "A water-resistant jacket should do the trick. And maybe waterproof mascara, just in case. 💧👀",
    "Drizzly day? Time for that trendy clear raincoat you've been wanting to show off! 🌧️👚",
  ],
  Mist: [
    "Misty weather calls for mysterious vibes. Channel your inner film noir detective with a trench coat. 🕵️‍♂️🧥",
    "A light, water-resistant jacket should be perfect for this misty day. 🌫️🧥",
    "Embrace the mystical weather with layers that are easy to adjust as the mist clears. 🧚‍♂️👚",
  ],
}

const foodSuggestions = {
  Clear: [
    "Perfect day for a picnic! Pack some sandwiches and fresh fruit. 🧺🍎",
    "How about a refreshing smoothie or iced tea to beat the heat? 🥤🍹",
    "Grill weather! Time for some BBQ and outdoor dining. 🍖🥗",
  ],
  Clouds: [
    "Cloudy days call for comfort food. How about a warm bowl of soup? 🍲",
    "Perfect weather for baking! Whip up some cookies or a cozy pie. 🍪🥧",
    "Cloudy with a chance of coffee! A latte and a good book sound perfect. ☕📚",
  ],
  Rain: [
    "Rainy day comfort food alert! Time for a steaming bowl of ramen or pho. 🍜",
    "Grilled cheese and tomato soup - the classic rainy day duo! 🧀🍅",
    "Bake some cookies and fill your home with cozy aromas. 🍪☔",
  ],
  Snow: [
    "Snow day calls for a hearty stew or chili to warm you up from the inside. 🍲❄️",
    "Hot chocolate with marshmallows is a must on a snowy day! ☕🧊",
    "Baked mac and cheese - the ultimate snow day comfort food. 🧀🍝",
  ],
  Thunderstorm: [
    "Storm brewing outside? Brew some calming herbal tea inside. 🍵⚡",
    "Comfort food alert! How about some creamy mashed potatoes? 🥔🌩️",
    "Thunderstorms call for thunder-ous flavors. Spicy curry, anyone? 🍛🌶️",
  ],
  Drizzle: [
    "Light rain calls for light meals. How about a fresh salad with grilled chicken? 🥗🍗",
    "Warm up with a bowl of minestrone soup on this drizzly day. 🍲🌧️",
    "Tea and scones make for a perfect light meal on a drizzly afternoon. ☕🥐",
  ],
  Mist: [
    "Misty days call for mystical meals. How about some exotic stir-fry? 🥡🌫️",
    "A bowl of creamy mushroom soup matches the misty mood perfectly. 🍄🌁",
    "Steamed dumplings and green tea - a perfect pair for a misty day. 🥟🍵",
  ],
}

function getWeatherType(weatherDescription) {
  if (!weatherDescription) return "Clear"
  const lowerDescription = weatherDescription.toLowerCase()
  if (lowerDescription.includes("clear")) return "Clear"
  if (lowerDescription.includes("cloud")) return "Clouds"
  if (lowerDescription.includes("rain")) return "Rain"
  if (lowerDescription.includes("snow")) return "Snow"
  if (lowerDescription.includes("thunderstorm")) return "Thunderstorm"
  if (lowerDescription.includes("drizzle")) return "Drizzle"
  if (lowerDescription.includes("mist")) return "Mist"
  return "Clear" // default
}

export default function WeatherSuggestions({ weatherData }) {
  const [suggestions, setSuggestions] = useState({ clothing: "", food: "", weatherTip: "" })

  useEffect(() => {
    if (weatherData) {
      const weatherType = getWeatherType(weatherData.weatherDescription)
      const randomClothing =
        clothingSuggestions[weatherType][Math.floor(Math.random() * clothingSuggestions[weatherType].length)]
      const randomFood = foodSuggestions[weatherType][Math.floor(Math.random() * foodSuggestions[weatherType].length)]

      let weatherTip = ""
      switch (weatherType) {
        case "Clear":
          weatherTip = "Don't forget your sunscreen and stay hydrated!"
          break
        case "Clouds":
          weatherTip = "It's a great day for outdoor activities without the harsh sun."
          break
        case "Rain":
          weatherTip = "Remember to carry an umbrella and wear waterproof shoes."
          break
        case "Snow":
          weatherTip = "Drive carefully and enjoy the winter wonderland!"
          break
        case "Thunderstorm":
          weatherTip = "Stay indoors and keep away from windows during the storm."
          break
        case "Drizzle":
          weatherTip = "A light raincoat should be sufficient for this weather."
          break
        case "Mist":
          weatherTip = "Drive carefully and use your low beam headlights if visibility is reduced."
          break
        default:
          weatherTip = "Enjoy your day, whatever the weather!"
      }

      setSuggestions({ clothing: randomClothing, food: randomFood, weatherTip })
    }
  }, [weatherData])

  if (!weatherData) {
    return <div>Loading suggestions...</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shirt className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Clothing Suggestion</h2>
        </div>
        <p className="text-lg">{suggestions.clothing}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Coffee className="h-6 w-6 text-orange-500" />
          <h2 className="text-xl font-semibold">Food Suggestion</h2>
        </div>
        <p className="text-lg">{suggestions.food}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          {getWeatherType(weatherData.weatherDescription) === "Clear" && <Sun className="h-6 w-6 text-yellow-500" />}
          {getWeatherType(weatherData.weatherDescription) === "Clouds" && <Cloud className="h-6 w-6 text-gray-500" />}
          {getWeatherType(weatherData.weatherDescription) === "Rain" && <Umbrella className="h-6 w-6 text-blue-500" />}
          {getWeatherType(weatherData.weatherDescription) === "Snow" && <Snowflake className="h-6 w-6 text-blue-300" />}
          <h2 className="text-xl font-semibold">Weather Tip</h2>
        </div>
        <p className="text-lg">{suggestions.weatherTip}</p>
      </div>
    </div>
  )
}

