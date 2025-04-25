"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

// Sample testimonials data
const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Event Organizer",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "EventPro made planning my corporate event so much easier. I found amazing vendors and the platform handled all the contracts and payments seamlessly.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Wedding Planner",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "As a wedding planner, I rely on EventPro to find reliable vendors for my clients. The rating system helps me choose the best services every time.",
    rating: 5,
  },
  {
    id: "3",
    name: "Jessica Williams",
    role: "Photography Vendor",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Being a vendor on EventPro has increased my bookings by 40%. The platform makes it easy to showcase my work and connect with clients.",
    rating: 4,
  },
]

export function Testimonials() {
  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} size={16} />
    ))
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from organizers and vendors who have used our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex mb-4">{renderRating(testimonial.rating)}</div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
