"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample data for featured events
const featuredEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 15-17, 2024",
    location: "San Francisco, CA",
    attendees: 1200,
    category: "Conference",
  },
  {
    id: "2",
    title: "Summer Music Festival",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 8-10, 2024",
    location: "Austin, TX",
    attendees: 5000,
    category: "Festival",
  },
  {
    id: "3",
    title: "Wedding Expo",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 22, 2024",
    location: "New York, NY",
    attendees: 800,
    category: "Expo",
  },
]

export function FeaturedEvents() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Featured Events</h2>
            <p className="text-gray-600">Discover upcoming events you won't want to miss</p>
          </div>
          <Link href="/events">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Events
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white/80">
                    {event.category}
                  </Badge>
                </div>
                <CardContent className="pt-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees.toLocaleString()} attendees</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/events/${event.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
