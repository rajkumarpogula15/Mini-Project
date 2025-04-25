"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock, MapPin, ChevronLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import OrganizerLayout from "@/components/organizer/layout"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Sample data
const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Conference",
  "Seminar",
  "Product Launch",
  "Gala",
  "Retreat",
  "Team Building",
  "Other",
]

const services = [
  { id: "catering", name: "Catering", icon: "🍽️" },
  { id: "photography", name: "Photography", icon: "📸" },
  { id: "decoration", name: "Decoration", icon: "🎨" },
  { id: "entertainment", name: "Entertainment", icon: "🎵" },
  { id: "venue", name: "Venue", icon: "🏢" },
  { id: "transportation", name: "Transportation", icon: "🚗" },
  { id: "accommodation", name: "Accommodation", icon: "🏨" },
  { id: "audioVisual", name: "Audio/Visual", icon: "🎬" },
]

const vendors = {
  catering: [
    { id: "c1", name: "Elegant Catering Co.", rating: 4.8, price: "$$" },
    { id: "c2", name: "Gourmet Delights", rating: 4.9, price: "$$$" },
    { id: "c3", name: "City Catering Services", rating: 4.5, price: "$$" },
  ],
  photography: [
    { id: "p1", name: "Capture Moments Photography", rating: 4.9, price: "$$$" },
    { id: "p2", name: "Lens Masters", rating: 4.7, price: "$$" },
    { id: "p3", name: "Elegant Events Photography", rating: 4.8, price: "$$$" },
  ],
  decoration: [
    { id: "d1", name: "Bloom & Petal Decorations", rating: 4.7, price: "$$" },
    { id: "d2", name: "Floral Fantasy", rating: 4.4, price: "$$" },
    { id: "d3", name: "Luxe Linens", rating: 4.5, price: "$" },
  ],
  entertainment: [
    { id: "e1", name: "Sound Wave DJ Services", rating: 4.5, price: "$$" },
    { id: "e2", name: "Rhythm & Beats", rating: 4.6, price: "$$" },
    { id: "e3", name: "Live Band Collective", rating: 4.7, price: "$$$" },
  ],
  venue: [
    { id: "v1", name: "Venue Masters", rating: 4.8, price: "$$$" },
    { id: "v2", name: "Grand Ballroom", rating: 4.9, price: "$$$$" },
    { id: "v3", name: "Garden Pavilion", rating: 4.6, price: "$$" },
  ],
  transportation: [
    { id: "t1", name: "Luxury Fleet Services", rating: 4.7, price: "$$$" },
    { id: "t2", name: "City Shuttle Co.", rating: 4.5, price: "$$" },
    { id: "t3", name: "Executive Transportation", rating: 4.8, price: "$$$" },
  ],
  accommodation: [
    { id: "a1", name: "Grand Hotel", rating: 4.8, price: "$$$" },
    { id: "a2", name: "Boutique Suites", rating: 4.7, price: "$$" },
    { id: "a3", name: "Luxury Resorts", rating: 4.9, price: "$$$$" },
  ],
  audioVisual: [
    { id: "av1", name: "Tech Solutions AV", rating: 4.6, price: "$$" },
    { id: "av2", name: "Sound & Vision Pro", rating: 4.8, price: "$$$" },
    { id: "av3", name: "Event Tech Services", rating: 4.7, price: "$$" },
  ],
}

export default function NewEventForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("12:00")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedVendors, setSelectedVendors] = useState<Record<string, string>>({})
  const [eventDetails, setEventDetails] = useState({
    title: "",
    type: "",
    location: "",
    description: "",
    attendees: "",
  })

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleVendorSelect = (serviceId: string, vendorId: string) => {
    setSelectedVendors((prev) => ({
      ...prev,
      [serviceId]: vendorId,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveEvent = () => {
    // In a real app, this would save the event to the database
    console.log("Saving event:", {
      ...eventDetails,
      date,
      time: selectedTime,
      services: selectedServices,
      vendors: selectedVendors,
    })

    // Redirect to dashboard
    router.push("/organizer/dashboard")
  }

  const handleContinueToBooking = () => {
    // In a real app, this would save the event and redirect to booking
    console.log("Continuing to booking:", {
      ...eventDetails,
      date,
      time: selectedTime,
      services: selectedServices,
      vendors: selectedVendors,
    })

    // Redirect to booking page
    router.push("/organizer/booking")
  }

  return (
    <OrganizerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2" onClick={() => router.back()}>
            <ChevronLeft size={16} />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
            <p className="text-gray-500">Fill in the details to create your event</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Basic information about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter event title"
                      value={eventDetails.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select
                      value={eventDetails.type}
                      onValueChange={(value) => setEventDetails((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Event Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger id="time" className="w-full">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => {
                          const hour = i.toString().padStart(2, "0")
                          return (
                            <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                              {`${hour}:00`}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Event Location</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      name="location"
                      placeholder="Enter event location"
                      className="flex-1"
                      value={eventDetails.location}
                      onChange={handleInputChange}
                    />
                    <Button variant="outline" className="gap-2">
                      <MapPin size={16} />
                      Map
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attendees">Expected Attendees</Label>
                  <Input
                    id="attendees"
                    name="attendees"
                    type="number"
                    placeholder="Number of attendees"
                    value={eventDetails.attendees}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Add notes or description for your event"
                    rows={4}
                    value={eventDetails.description}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Services Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Services Required</CardTitle>
                <CardDescription>Select the services you need for your event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-colors",
                        selectedServices.includes(service.id) ? "border-primary bg-primary/5" : "hover:border-gray-400",
                      )}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{service.icon}</span>
                        <Checkbox
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                      </div>
                      <p className="font-medium">{service.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vendor Selection */}
            {selectedServices.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Vendors</CardTitle>
                  <CardDescription>Choose vendors for each selected service</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {selectedServices.map((serviceId) => {
                      const service = services.find((s) => s.id === serviceId)
                      const serviceVendors = vendors[serviceId as keyof typeof vendors] || []

                      return (
                        <AccordionItem key={serviceId} value={serviceId}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span>{service?.icon}</span>
                              <span>{service?.name}</span>
                              {selectedVendors[serviceId] && (
                                <Badge variant="outline" className="ml-2">
                                  Vendor Selected
                                </Badge>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              <RadioGroup
                                value={selectedVendors[serviceId] || ""}
                                onValueChange={(value) => handleVendorSelect(serviceId, value)}
                              >
                                {serviceVendors.map((vendor) => (
                                  <div
                                    key={vendor.id}
                                    className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50"
                                  >
                                    <RadioGroupItem value={vendor.id} id={vendor.id} />
                                    <Label htmlFor={vendor.id} className="flex-1 cursor-pointer">
                                      <div className="flex justify-between">
                                        <span className="font-medium">{vendor.name}</span>
                                        <span className="text-gray-500">{vendor.price}</span>
                                      </div>
                                      <div className="flex items-center mt-1">
                                        <div className="flex">
                                          {Array.from({ length: 5 }).map((_, i) => (
                                            <span
                                              key={i}
                                              className={cn(
                                                "text-sm",
                                                i < Math.floor(vendor.rating) ? "text-amber-500" : "text-gray-300",
                                              )}
                                            >
                                              ★
                                            </span>
                                          ))}
                                        </div>
                                        <span className="text-sm text-gray-500 ml-1">{vendor.rating}</span>
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => router.push(`/vendors?service=${serviceId}`)}
                              >
                                <Plus size={14} />
                                Browse More Vendors
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {eventDetails.title && (
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Event</h3>
                    <p>{eventDetails.title}</p>
                  </div>
                )}

                {date && (
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Date & Time</h3>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <span>{format(date, "PPP")}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                )}

                {eventDetails.location && (
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Location</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{eventDetails.location}</span>
                    </div>
                  </div>
                )}

                {selectedServices.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Services</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedServices.map((serviceId) => {
                        const service = services.find((s) => s.id === serviceId)
                        return (
                          <Badge key={serviceId} variant="secondary" className="gap-1">
                            <span>{service?.icon}</span>
                            <span>{service?.name}</span>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                {Object.keys(selectedVendors).length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Selected Vendors</h3>
                    <div className="space-y-2 mt-1">
                      {Object.entries(selectedVendors).map(([serviceId, vendorId]) => {
                        const service = services.find((s) => s.id === serviceId)
                        const serviceVendors = vendors[serviceId as keyof typeof vendors] || []
                        const vendor = serviceVendors.find((v) => v.id === vendorId)

                        return vendor ? (
                          <div key={serviceId} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-1">
                              <span>{service?.icon}</span>
                              <span>{service?.name}:</span>
                            </div>
                            <span className="font-medium">{vendor.name}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                )}

                {!eventDetails.title && !date && !eventDetails.location && selectedServices.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <p>Fill in the event details to see a summary here.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button
                  className="w-full"
                  onClick={handleContinueToBooking}
                  disabled={!eventDetails.title || !date || !eventDetails.location || selectedServices.length === 0}
                >
                  Continue to Booking
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSaveEvent}
                  disabled={!eventDetails.title || !date || !eventDetails.location}
                >
                  Save Event
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Not sure what services you need for your event? Our event planning experts can help.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  )
}
