import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const favoritesPath = path.join(process.cwd(), "data", "favorites.json")

export async function GET() {
  try {
    const favorites = await fs.readFile(favoritesPath, "utf-8")
    return NextResponse.json(JSON.parse(favorites))
  } catch (error) {
    console.error("Error reading favorites:", error)
    return NextResponse.json({ error: "Failed to read favorites" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const favorites = await request.json()
    await fs.writeFile(favoritesPath, JSON.stringify(favorites, null, 2))
    return NextResponse.json({ message: "Favorites updated successfully" })
  } catch (error) {
    console.error("Error writing favorites:", error)
    return NextResponse.json({ error: "Failed to update favorites" }, { status: 500 })
  }
}

