"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample data for top vendors
const topVendors = [
  {
    id: "1",
    name: "Elegant Events Photography",
    image: "/placeholder.svg?height=300&width=300",
    category: "Photography",
    location: "New York, NY",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "2",
    name: "Gourmet Delights Catering",
    image: "/placeholder.svg?height=300&width=300",
    category: "Catering",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Bloom & Petal Decorations",
    image: "/placeholder.svg?height=300&width=300",
    category: "Decoration",
    location: "Chicago, IL",
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: "4",
    name: "Sound Wave DJ Services",
    image: "/placeholder.svg?height=300&width=300",
    category: "Entertainment",
    location: "Miami, FL",
    rating: 4.5,
    reviewCount: 72,
  },
]

export function TopVendors() {
  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-amber-400 text-amber-400" size={16} />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half-star" className="fill-amber-400 text-amber-400" size={16} />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={16} />)
    }

    return stars
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Top-Rated Vendors</h2>
            <p className="text-gray-600">Discover the best vendors for your next event</p>
          </div>
          <Link href="/vendors">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Vendors
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image src={vendor.image || "/placeholder.svg"} alt={vendor.name} fill className="object-cover" />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white/80">
                    {vendor.category}
                  </Badge>
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-1">{vendor.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">{renderRating(vendor.rating)}</div>
                    <span className="text-sm text-gray-500">({vendor.reviewCount})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{vendor.location}</span>
                  </div>
                  <Link href={`/vendors/${vendor.id}`}>
                    <Button size="sm" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
