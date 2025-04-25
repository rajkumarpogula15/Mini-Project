"use client"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Review } from "@/lib/types"
import Image from "next/image"

export default function VendorReviews({ reviews }: { reviews: Review[] }) {
  const [sortBy, setSortBy] = useState("recent")
  const [expandedReviews, setExpandedReviews] = useState<string[]>([])

  const toggleExpand = (reviewId: string) => {
    setExpandedReviews((prev) => (prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]))
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else if (sortBy === "lowest") {
      return a.rating - b.rating
    }
    return 0
  })

  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-amber-400 text-amber-400" size={16} />)
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half-star"
          className="fill-amber-400 text-amber-400"
          size={16}
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={16} />)
    }

    return stars
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => Math.floor(review.rating) === rating).length
    const percentage = (count / reviews.length) * 100
    return { rating, count, percentage }
  })

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">{renderRating(averageRating)}</div>
            <p className="text-gray-500 text-sm">Based on {reviews.length} reviews</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-medium mb-3">Rating Distribution</h3>
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-12 text-sm">{rating} stars</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="w-8 text-sm text-right">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">{reviews.length} Reviews</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {sortedReviews.map((review) => {
          const isExpanded = expandedReviews.includes(review.id)
          const reviewDate = new Date(review.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })

          return (
            <div key={review.id} className="pb-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.userImage || "/placeholder.svg"} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-wrap justify-between gap-2">
                    <h4 className="font-medium">{review.userName}</h4>
                    <span className="text-gray-500 text-sm">{reviewDate}</span>
                  </div>

                  <div className="flex items-center gap-1 mt-1 mb-2">{renderRating(review.rating)}</div>

                  <p className={`text-gray-700 ${!isExpanded && review.text.length > 250 ? "line-clamp-3" : ""}`}>
                    {review.text}
                  </p>

                  {review.text.length > 250 && (
                    <button
                      onClick={() => toggleExpand(review.id)}
                      className="text-primary text-sm mt-1 hover:underline"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {review.images.map((image, index) => (
                        <div key={index} className="relative h-16 w-16 rounded overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg?height=100&width=100"}
                            alt={`Review image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3">
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-500 hover:text-gray-700">
                      <ThumbsUp size={14} />
                      <span>Helpful ({review.helpfulCount})</span>
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="mt-6" />
            </div>
          )
        })}
      </div>

      {reviews.length > 5 && (
        <div className="mt-6 text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}
    </div>
  )
}
