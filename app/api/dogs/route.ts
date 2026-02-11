import { type NextRequest, NextResponse } from "next/server"

const MOCK_ADDITIONAL_DOGS = [
  {
    name: "Cavapoo",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=cavapoo",
    good_with_children: 5,
    good_with_other_dogs: 4,
    shedding: 3,
    grooming: 4,
    trainability: 4,
    energy: 3,
    barking: 3,
    min_life_expectancy: 12,
    max_life_expectancy: 16,
    max_height_male: 12,
    max_height_female: 11,
    max_weight_male: 25,
    max_weight_female: 24,
    min_height_male: 9,
    min_height_female: 9,
    min_weight_male: 9,
    min_weight_female: 8,
  },
  {
    name: "Maltipoo",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=maltipoo",
    good_with_children: 4,
    good_with_other_dogs: 4,
    shedding: 1,
    grooming: 5,
    trainability: 4,
    energy: 3,
    barking: 4,
    min_life_expectancy: 13,
    max_life_expectancy: 18,
    max_height_male: 10,
    max_height_female: 10,
    max_weight_male: 5,
    max_weight_female: 5,
    min_height_male: 8,
    min_height_female: 8,
    min_weight_male: 2,
    min_weight_female: 2,
  },
  {
    name: "Labradoodle",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=labradoodle",
    good_with_children: 5,
    good_with_other_dogs: 5,
    shedding: 3,
    grooming: 4,
    trainability: 5,
    energy: 4,
    barking: 3,
    min_life_expectancy: 12,
    max_life_expectancy: 16,
    max_height_male: 24,
    max_height_female: 22,
    max_weight_male: 65,
    max_weight_female: 50,
    min_height_male: 21,
    min_height_female: 18,
    min_weight_male: 50,
    min_weight_female: 30,
  },
  {
    name: "Sheepadoodle",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=sheepadoodle",
    good_with_children: 5,
    good_with_other_dogs: 4,
    shedding: 2,
    grooming: 4,
    trainability: 5,
    energy: 4,
    barking: 2,
    min_life_expectancy: 12,
    max_life_expectancy: 15,
    max_height_male: 28,
    max_height_female: 26,
    max_weight_male: 80,
    max_weight_female: 65,
    min_height_male: 22,
    min_height_female: 20,
    min_weight_male: 60,
    min_weight_female: 50,
  },
  {
    name: "Cockapoo",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=cockapoo",
    good_with_children: 5,
    good_with_other_dogs: 4,
    shedding: 2,
    grooming: 4,
    trainability: 4,
    energy: 3,
    barking: 3,
    min_life_expectancy: 12,
    max_life_expectancy: 18,
    max_height_male: 15,
    max_height_female: 15,
    max_weight_male: 24,
    max_weight_female: 24,
    min_height_male: 10,
    min_height_female: 10,
    min_weight_male: 12,
    min_weight_female: 12,
  },
  {
    name: "Aussiedoodle",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=aussiedoodle",
    good_with_children: 5,
    good_with_other_dogs: 4,
    shedding: 1,
    grooming: 4,
    trainability: 5,
    energy: 5,
    barking: 3,
    min_life_expectancy: 12,
    max_life_expectancy: 15,
    max_height_male: 23,
    max_height_female: 21,
    max_weight_male: 70,
    max_weight_female: 50,
    min_height_male: 18,
    min_height_female: 16,
    min_weight_male: 45,
    min_weight_female: 30,
  },
  {
    name: "Bernedoodle",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=bernedoodle",
    good_with_children: 5,
    good_with_other_dogs: 4,
    shedding: 2,
    grooming: 4,
    trainability: 5,
    energy: 3,
    barking: 2,
    min_life_expectancy: 12,
    max_life_expectancy: 18,
    max_height_male: 29,
    max_height_female: 27,
    max_weight_male: 90,
    max_weight_female: 70,
    min_height_male: 22,
    min_height_female: 20,
    min_weight_male: 70,
    min_weight_female: 50,
  },
  {
    name: "Cavachon",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=cavachon",
    good_with_children: 5,
    good_with_other_dogs: 5,
    shedding: 2,
    grooming: 3,
    trainability: 4,
    energy: 3,
    barking: 3,
    min_life_expectancy: 12,
    max_life_expectancy: 16,
    max_height_male: 13,
    max_height_female: 12,
    max_weight_male: 18,
    max_weight_female: 17,
    min_height_male: 12,
    min_height_female: 11,
    min_weight_male: 15,
    min_weight_female: 14,
  },
  {
    name: "Yorkipoo",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=yorkipoo",
    good_with_children: 4,
    good_with_other_dogs: 4,
    shedding: 1,
    grooming: 5,
    trainability: 4,
    energy: 3,
    barking: 4,
    min_life_expectancy: 12,
    max_life_expectancy: 18,
    max_height_male: 8,
    max_height_female: 8,
    max_weight_male: 8,
    max_weight_female: 8,
    min_height_male: 7,
    min_height_female: 7,
    min_weight_male: 3,
    min_weight_female: 3,
  },
  {
    name: "Pomsky",
    image_link: "https://api.api-ninjas.com/v1/dogs?breed=pomsky",
    good_with_children: 4,
    good_with_other_dogs: 3,
    shedding: 4,
    grooming: 3,
    trainability: 3,
    energy: 4,
    barking: 4,
    min_life_expectancy: 13,
    max_life_expectancy: 18,
    max_height_male: 13,
    max_height_female: 12,
    max_weight_male: 38,
    max_weight_female: 38,
    min_height_male: 10,
    min_height_female: 10,
    min_weight_male: 24,
    min_weight_female: 24,
  },
]

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

    let data = await response.json()
    
    // If no search term, combine API results with mock data
    if (!name && Array.isArray(data)) {
      data = [...data, ...MOCK_ADDITIONAL_DOGS]
    }
    
    // If searching by name, filter through both API and mock data
    if (name) {
      const searchLower = name.toLowerCase()
      const mockFiltered = MOCK_ADDITIONAL_DOGS.filter((dog) =>
        dog.name.toLowerCase().includes(searchLower)
      )
      data = [...(Array.isArray(data) ? data : []), ...mockFiltered]
    }

    console.log("[v0] Data received:", Array.isArray(data) ? `Array with ${data.length} items` : typeof data)

    return NextResponse.json(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error("[v0] Error fetching dogs:", error)
    return NextResponse.json(MOCK_ADDITIONAL_DOGS, { status: 200 })
  }
}
