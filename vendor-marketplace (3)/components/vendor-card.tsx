import Image from "next/image"
import { Star, StarHalf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Vendor } from "@/lib/types"

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-amber-400 text-amber-400" size={16} />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-amber-400 text-amber-400" size={16} />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={16} />)
    }

    return stars
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={vendor.image || "/placeholder.svg"}
          alt={vendor.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white/80">
          {vendor.serviceType}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{vendor.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex mr-2">{renderRating(vendor.rating)}</div>
          <span className="text-sm text-gray-500">({vendor.reviewCount})</span>
        </div>
        <p className="text-gray-500 text-sm mb-3">{vendor.location}</p>
        <div className="flex justify-between items-center">
          <div className="font-medium">
            ${vendor.priceRange[0]} - ${vendor.priceRange[1]}
          </div>
          <Button size="sm">View Profile</Button>
        </div>
      </div>
    </div>
  )
}
