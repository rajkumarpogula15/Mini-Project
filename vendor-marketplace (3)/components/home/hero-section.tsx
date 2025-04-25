"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-30 z-0" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Create Unforgettable <span className="text-primary">Events</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Connect with top vendors and plan your perfect event with our all-in-one platform
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register?role=organizer">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Planning
                </Button>
              </Link>
              <Link href="/vendors">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Vendors
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-6 lg:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Find Your Perfect Event</h2>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search events or vendors..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input placeholder="Event type" className="pl-10" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input placeholder="Location" className="pl-10" />
                </div>
              </div>

              <Button className="w-full">Search</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
