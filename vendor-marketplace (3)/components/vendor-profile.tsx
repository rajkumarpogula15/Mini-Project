"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, CalendarIcon, MessageCircle, Star, MapPin, Clock, Phone, Mail, Globe, ChevronLeft } from "lucide-react"
import { getVendorById } from "@/lib/data"
import VendorGallery from "./vendor-gallery"
import VendorReviews from "./vendor-reviews"

export default function VendorProfile({ vendorId }: { vendorId: string }) {
  const vendor = getVendorById(vendorId)
  const [date, setDate] = useState<Date | undefined>(new Date())

  if (!vendor) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Vendor not found</h1>
        <p className="mb-6">The vendor you're looking for doesn't exist or has been removed.</p>
        <Button variant="outline" className="gap-2">
          <ChevronLeft size={16} />
          Back to vendors
        </Button>
      </div>
    )
  }

  // Disabled dates for the calendar (example)
  const disabledDates = [
    new Date(2025, 3, 5),
    new Date(2025, 3, 6),
    new Date(2025, 3, 7),
    new Date(2025, 3, 15),
    new Date(2025, 3, 16),
    new Date(2025, 3, 17),
    new Date(2025, 3, 25),
    new Date(2025, 3, 26),
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" className="mb-6 gap-2">
        <ChevronLeft size={16} />
        Back to vendors
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src={vendor.profileImage || "/placeholder.svg?height=200&width=200"}
                alt={vendor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{vendor.name}</h1>
                <Badge>{vendor.serviceType}</Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="fill-amber-400 text-amber-400" size={16} />
                  <span>
                    {vendor.rating} ({vendor.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* About */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <VendorGallery images={vendor.gallery} />
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vendor.services.map((service, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="text-green-500" size={18} />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pricing Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vendor.packages.map((pkg, index) => (
                <Card key={index} className={index === 1 ? "border-primary shadow-md" : ""}>
                  {index === 1 && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">${pkg.price}</p>
                    <ul className="mt-4 space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="text-green-500 mt-1 flex-shrink-0" size={16} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                      Select Package
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <VendorReviews reviews={vendor.reviews} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <Card>
            <CardHeader>
              <CardTitle>Book this Vendor</CardTitle>
              <CardDescription>Check availability and secure your date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <p className="text-2xl font-bold">
                  ${vendor.priceRange[0]} - ${vendor.priceRange[1]}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Availability</h3>
                <Tabs defaultValue="calendar">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="dates">Quick Dates</TabsTrigger>
                  </TabsList>
                  <TabsContent value="calendar" className="pt-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={[{ before: new Date() }, ...disabledDates]}
                      className="rounded-md border"
                    />
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span>Unavailable</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="dates" className="pt-4">
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => {
                        const date = new Date()
                        date.setDate(date.getDate() + i + 1)
                        return (
                          <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                            <div className="flex items-center gap-2">
                              <CalendarIcon size={16} />
                              <span>
                                {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                              </span>
                            </div>
                            <Badge variant={i % 3 === 0 ? "secondary" : "outline"}>
                              {i % 3 === 0 ? "Limited" : "Available"}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Instant Book</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Booking</DialogTitle>
                    <DialogDescription>
                      You're about to book {vendor.name} for{" "}
                      {date?.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      .
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Please review the details before confirming your booking.</p>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm Booking</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full">
                Send Booking Request
              </Button>
            </CardFooter>
          </Card>

          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Vendor</CardTitle>
              <CardDescription>Get in touch with {vendor.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-500" />
                <span>{vendor.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-500" />
                <span>{vendor.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-gray-500" />
                <a href={vendor.contact.website} className="text-primary hover:underline">
                  {vendor.contact.website.replace("https://", "")}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-gray-500" />
                <span>Response time: {vendor.contact.responseTime}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <MessageCircle size={16} />
                    Message Vendor
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Message {vendor.name}</SheetTitle>
                    <SheetDescription>Send a direct message to this vendor</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <textarea
                      className="w-full min-h-[200px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </SheetContent>
              </Sheet>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
