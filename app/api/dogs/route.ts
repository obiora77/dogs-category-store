import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")

  try {
    const url = name
      ? `https://api.api-ninjas.com/v1/dogs?name=${encodeURIComponent(name)}`
      : "https://api.api-ninjas.com/v1/dogs?energy=5"

    console.log("[v0] Fetching from URL:", url)

    const response = await fetch(url, {
      headers: {
        "X-Api-Key": "7vu68WpSEHm+OMuOaiKdlg==316GyfhfQzRI0kI4",
      },
    })

    console.log("[v0] Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Error response:", errorText)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Data received:", Array.isArray(data) ? `Array with ${data.length} items` : typeof data)

    return NextResponse.json(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error("[v0] Error fetching dogs:", error)
    return NextResponse.json([], { status: 500 })
  }
}
