import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ShoppingBag, Star } from "lucide-react"
import { FeaturedEvents } from "@/components/home/featured-events"
import { TopVendors } from "@/components/home/top-vendors"
import { HeroSection } from "@/components/home/hero-section"
import { Testimonials } from "@/components/home/testimonials"
import { Footer } from "@/components/home/footer"
import { MainNav } from "@/components/home/main-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Everything you need to manage events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform connects event organizers with top vendors to create memorable experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Event Planning</h3>
                <p className="text-gray-600">Create and manage events of any size with our intuitive tools</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vendor Booking</h3>
                <p className="text-gray-600">Find and book the perfect vendors for your event needs</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Attendee Management</h3>
                <p className="text-gray-600">Manage guest lists, send invitations, and track RSVPs</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reviews & Ratings</h3>
                <p className="text-gray-600">Find top-rated vendors and share your experiences</p>
              </div>
            </div>
          </div>
        </section>

        <FeaturedEvents />
        <TopVendors />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
