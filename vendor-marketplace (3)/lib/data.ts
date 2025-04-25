import type { Vendor } from "./types"

// Sample vendor data
const vendorData: Vendor = {
  id: "1",
  name: "Elegant Events Photography",
  serviceType: "Photography",
  profileImage: "/placeholder.svg?height=200&width=200",
  image: "/placeholder.svg?height=400&width=600",
  priceRange: [800, 2500],
  rating: 4.8,
  reviewCount: 124,
  location: "New York, NY",
  description:
    "Elegant Events Photography has been capturing special moments for over 10 years. Our team of professional photographers specializes in weddings, corporate events, and private parties. We pride ourselves on our attention to detail, creative compositions, and ability to capture authentic emotions. Our goal is to provide you with timeless photographs that you'll cherish for years to come.",
  gallery: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  services: [
    "Wedding Photography",
    "Engagement Sessions",
    "Corporate Events",
    "Private Parties",
    "Photo Editing",
    "Same-Day Previews",
    "Online Gallery",
    "Printed Albums",
  ],
  packages: [
    {
      name: "Basic Package",
      price: 800,
      description: "Perfect for small events",
      features: [
        "4 hours of coverage",
        "1 photographer",
        "100 edited digital photos",
        "Online gallery",
        "14-day delivery",
      ],
    },
    {
      name: "Premium Package",
      price: 1500,
      description: "Our most popular option",
      features: [
        "8 hours of coverage",
        "2 photographers",
        "300 edited digital photos",
        "Online gallery",
        "Engagement session",
        "10-day delivery",
        "Printed album (20 pages)",
      ],
    },
    {
      name: "Luxury Package",
      price: 2500,
      description: "Complete coverage for your special day",
      features: [
        "Full day coverage (up to 12 hours)",
        "2 photographers",
        "500+ edited digital photos",
        "Online gallery",
        "Engagement session",
        "Same-day previews",
        "7-day delivery",
        "Premium printed album (30 pages)",
        "Canvas wall art",
      ],
    },
  ],
  reviews: [
    {
      id: "r1",
      userName: "Sarah Johnson",
      userImage: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "2025-03-15",
      text: "We hired Elegant Events Photography for our wedding and couldn't be happier with the results! The team was professional, unobtrusive, and captured all the special moments we wanted. The photos turned out absolutely stunning - they really have an eye for composition and lighting. We received our full gallery earlier than expected and were blown away by the quality. Highly recommend!",
      helpfulCount: 12,
      images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
    },
    {
      id: "r2",
      userName: "Michael Chen",
      userImage: "/placeholder.svg?height=100&width=100",
      rating: 4.5,
      date: "2025-02-28",
      text: "Elegant Events Photography did a fantastic job at our corporate gala. The photographers were professional and captured great candid moments throughout the event. The only reason I'm not giving 5 stars is because we had to wait a bit longer than expected for the final delivery. That said, the quality was worth the wait, and I would still recommend their services.",
      helpfulCount: 8,
    },
    {
      id: "r3",
      userName: "Jessica Williams",
      userImage: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "2025-01-10",
      text: "I cannot say enough good things about Elegant Events Photography! From our first consultation to the final delivery, they exceeded all expectations. Our engagement photos and wedding day coverage were both incredible. They have a talent for capturing genuine emotions and making everyone feel comfortable in front of the camera. The online gallery was easy to share with family, and the printed album is absolutely gorgeous. Worth every penny!",
      helpfulCount: 15,
    },
    {
      id: "r4",
      userName: "David Rodriguez",
      userImage: "/placeholder.svg?height=100&width=100",
      rating: 4,
      date: "2024-12-05",
      text: "Good experience overall. The photos came out well and the team was professional during our event. I would have liked more direction during group shots, but the candid moments they captured were perfect. The online gallery was convenient for sharing with guests.",
      helpfulCount: 3,
    },
    {
      id: "r5",
      userName: "Emily Parker",
      userImage: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "2024-11-20",
      text: "Elegant Events Photography shot our wedding last month and delivered the most beautiful photos we could have imagined. They were so easy to work with and made us feel comfortable throughout the day. They captured all the important moments without being intrusive. The premium package was definitely worth it for the second photographer and same-day previews. We received so many compliments from our guests on how professional and friendly the photographers were.",
      helpfulCount: 10,
      images: [
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
      ],
    },
  ],
  contact: {
    phone: "(212) 555-7890",
    email: "info@eleganteventsphoto.com",
    website: "https://www.eleganteventsphoto.com",
    responseTime: "Usually responds within 24 hours",
  },
}

const vendorData2: Vendor = {
  id: "2",
  name: "City Catering Services",
  serviceType: "Catering",
  profileImage: "/placeholder.svg?height=200&width=200",
  image: "/placeholder.svg?height=400&width=600",
  priceRange: [500, 3000],
  rating: 4.5,
  reviewCount: 95,
  location: "Los Angeles, CA",
  description:
    "City Catering Services provides exceptional catering for weddings, corporate events, and private parties. Our experienced chefs create custom menus to suit your taste and budget. We use only the freshest ingredients and provide impeccable service.",
  gallery: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  services: [
    "Wedding Catering",
    "Corporate Catering",
    "Private Party Catering",
    "Custom Menus",
    "Bartending Services",
    "Event Planning",
  ],
  packages: [
    {
      name: "Bronze Package",
      price: 500,
      description: "Basic catering for small events",
      features: ["Buffet style", "2 entree choices", "2 side dishes", "Dessert"],
    },
    {
      name: "Silver Package",
      price: 1500,
      description: "Full catering service",
      features: ["Plated service", "3 entree choices", "3 side dishes", "Appetizers", "Dessert"],
    },
    {
      name: "Gold Package",
      price: 3000,
      description: "Premium catering with custom menu",
      features: ["Custom menu", "Plated service", "Unlimited appetizers", "Dessert bar", "Bartending services"],
    },
  ],
  reviews: [
    {
      id: "r6",
      userName: "Alice Smith",
      userImage: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "2025-04-01",
      text: "City Catering Services catered our wedding and did an amazing job! The food was delicious and the service was impeccable. We received many compliments from our guests.",
      helpfulCount: 7,
    },
  ],
  contact: {
    phone: "(310) 555-1234",
    email: "info@citycatering.com",
    website: "https://www.citycatering.com",
    responseTime: "Usually responds within 1 hour",
  },
}

// Function to get vendor by ID
export function getVendorById(id: string): Vendor | undefined {
  // In a real application, this would fetch from a database
  // For this example, we'll just return our sample data if IDs match
  if (id === vendorData.id) {
    return vendorData
  }
  if (id === vendorData2.id) {
    return vendorData2
  }
  return undefined
}

// Function to get all vendors
export const vendors: Vendor[] = [vendorData, vendorData2]
