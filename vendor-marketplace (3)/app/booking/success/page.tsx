import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingSuccessPage() {
  // In a real app, this data would come from state/context/API
  const bookingDetails = {
    bookingId: "BK-12345678",
    vendor: {
      name: "Elegant Events Photography",
      image: "/placeholder.svg?height=200&width=200",
    },
    package: "Premium Package",
    date: "Monday, April 24, 2025",
    time: "14:00 - 22:00",
    location: "123 Main Street, New York, NY 10001",
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-gray-500">Your booking has been successfully confirmed.</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
          <CardDescription>Booking ID: {bookingDetails.bookingId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-md overflow-hidden">
              <Image
                src={bookingDetails.vendor.image || "/placeholder.svg"}
                alt={bookingDetails.vendor.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{bookingDetails.vendor.name}</h3>
              <p className="text-gray-500 text-sm">{bookingDetails.package}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md space-y-3 text-left">
            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{bookingDetails.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-gray-600">{bookingDetails.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">{bookingDetails.location}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <p className="text-sm text-gray-500 mb-2">
            A confirmation email has been sent to your registered email address.
          </p>
          <Button variant="outline" className="w-full">
            Download Booking Details
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">What's Next?</h2>
        <p className="text-gray-600">
          The vendor will contact you within 24 hours to discuss the details of your event.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
