"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

export default function BookingConfirmation({ vendorId, date }: { vendorId?: string; date?: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({
    eventLocation: "",
    eventDate: format(date ? new Date(date) : new Date(), "yyyy-MM-dd"),
    eventTime: "14:00",
    specialNotes: "",
  })

  // Sample booking data (in a real app, this would come from state/context/API)
  const booking = {
    vendor: {
      id: vendorId || "1",
      name: "Elegant Events Photography",
      image: "/placeholder.svg?height=200&width=200",
      serviceType: "Photography",
    },
    package: {
      name: "Premium Package",
      price: 1500,
      originalPrice: 1800,
      description: "8 hours of coverage with 2 photographers",
      items: [
        "8 hours of coverage",
        "2 photographers",
        "300 edited digital photos",
        "Online gallery",
        "Engagement session",
        "10-day delivery",
        "Printed album (20 pages)",
      ],
    },
    addons: [
      {
        name: "Extra Hour Coverage",
        price: 150,
      },
      {
        name: "Same-Day Preview (15 photos)",
        price: 100,
      },
    ],
    date: date ? new Date(date) : new Date(),
    time: "14:00 - 22:00",
  }

  // Calculate totals
  const subtotal = booking.package.price + booking.addons.reduce((sum, addon) => sum + addon.price, 0)
  const savings = booking.package.originalPrice - booking.package.price
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowTwoFactorDialog(true)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleVerifyAndConfirm = () => {
    // In a real app, you would verify the code here
    if (verificationCode === "123456") {
      setShowTwoFactorDialog(false)
      // Show success and redirect
      toast({
        title: "Booking Confirmed",
        description: "Your booking has been successfully confirmed",
      })
      router.push("/booking/success")
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "The verification code you entered is invalid. Please try again.",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Button variant="outline" className="gap-2" onClick={() => router.back()}>
          <ChevronLeft size={16} />
          Back
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Confirm Your Booking</h1>
        <p className="text-gray-500">Review and confirm the services you're booking</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Review Services</span>
          <span className="text-sm font-medium">Booking Details</span>
          <span className="text-sm font-medium">Payment</span>
        </div>
        <Progress value={(currentStep / 3) * 100} className="h-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={`step-${currentStep}`} className="w-full">
            {/* Step 1: Review Services */}
            <TabsContent value="step-1" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Selected Services</CardTitle>
                  <CardDescription>Review the services you've selected</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Vendor Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image
                        src={booking.vendor.image || "/placeholder.svg"}
                        alt={booking.vendor.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{booking.vendor.name}</h3>
                      <p className="text-gray-500 text-sm">{booking.vendor.serviceType}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Package Details */}
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{booking.package.name}</h3>
                        <p className="text-gray-500 text-sm">{booking.package.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${booking.package.price.toFixed(2)}</div>
                        {booking.package.originalPrice > booking.package.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ${booking.package.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-sm mb-2">Package Includes:</h4>
                      <ul className="space-y-2">
                        {booking.package.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Add-ons */}
                  {booking.addons.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Add-ons</h3>
                      <div className="space-y-3">
                        {booking.addons.map((addon, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{addon.name}</span>
                            <span className="font-medium">${addon.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Date and Time */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-3">Service Date & Time</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-gray-500" />
                        <span>{format(booking.date, "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-gray-500" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleNextStep}>
                    Continue
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Step 2: Booking Details */}
            <TabsContent value="step-2" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Provide details about your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="eventLocation">Event Location</Label>
                      <Input
                        id="eventLocation"
                        name="eventLocation"
                        placeholder="Enter the event address"
                        value={bookingDetails.eventLocation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={bookingDetails.eventDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventTime">Event Start Time</Label>
                      <Input
                        id="eventTime"
                        name="eventTime"
                        type="time"
                        value={bookingDetails.eventTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialNotes">Special Notes or Requirements</Label>
                    <Textarea
                      id="specialNotes"
                      name="specialNotes"
                      placeholder="Any special requests or details the vendor should know"
                      value={bookingDetails.specialNotes}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>

                  <div className="bg-amber-50 p-4 rounded-md flex gap-3">
                    <AlertCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">Important Note</p>
                      <p>
                        Please ensure all details are accurate. The vendor will use this information to prepare for your
                        event.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNextStep}>
                    Continue
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Step 3: Payment */}
            <TabsContent value="step-3" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Review your payment summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold mb-3">Payment Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 flex items-center gap-3 cursor-pointer bg-gray-50">
                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Credit Card</p>
                          <p className="text-sm text-gray-500">Visa ending in 4242</p>
                        </div>
                      </div>
                      <div className="border rounded-md p-4 flex items-center gap-3 cursor-pointer">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center"></div>
                        <div className="flex-1">
                          <p className="font-medium">Add Payment Method</p>
                          <p className="text-sm text-gray-500">Add a new card or payment method</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                        <p className="text-sm text-gray-500">
                          By checking this box, you agree to our{" "}
                          <a href="#" className="text-primary hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNextStep} disabled={!agreedToTerms}>
                    Confirm Booking
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Savings */}
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Package Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                {/* Tax */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator className="my-2" />

                {/* Total */}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Savings Badge */}
              {savings > 0 && (
                <div className="bg-green-50 p-3 rounded-md mt-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      SAVINGS
                    </Badge>
                    <span className="text-green-800 font-medium">You saved ${savings.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    You're saving ${savings.toFixed(2)} with the Premium Package bundle!
                  </p>
                </div>
              )}

              {/* Booking Details Summary */}
              <div className="bg-gray-50 p-3 rounded-md space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar size={16} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-gray-600">
                      {format(booking.date, "MMM d, yyyy")} • {booking.time}
                    </p>
                  </div>
                </div>

                {bookingDetails.eventLocation && (
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{bookingDetails.eventLocation}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push(`/vendors/${booking.vendor.id}`)}>
                Edit Services
              </Button>
            </CardFooter>
          </Card>

          {/* Need Help */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about your booking, our support team is here to help.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2FA Dialog */}
      <Dialog open={showTwoFactorDialog} onOpenChange={setShowTwoFactorDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Your Identity</DialogTitle>
            <DialogDescription>
              We've sent a 6-digit verification code to your phone. Please enter it below to confirm your booking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
              <p className="text-sm text-gray-500 text-center">
                Didn't receive a code? <a className="text-primary hover:underline cursor-pointer">Resend</a>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTwoFactorDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifyAndConfirm} disabled={verificationCode.length !== 6}>
              Verify & Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
