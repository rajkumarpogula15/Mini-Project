export interface Vendor {
  id: string
  name: string
  serviceType: string
  profileImage: string
  image: string
  priceRange: [number, number]
  rating: number
  reviewCount: number
  location: string
  description: string
  gallery: string[]
  services: string[]
  packages: Package[]
  reviews: Review[]
  contact: {
    phone: string
    email: string
    website: string
    responseTime: string
  }
}

export interface Package {
  name: string
  price: number
  description: string
  features: string[]
}

export interface Review {
  id: string
  userName: string
  userImage: string
  rating: number
  date: string
  text: string
  helpfulCount: number
  images?: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  organizer: {
    id: string
    name: string
  }
  type: string
  status: "draft" | "published" | "cancelled" | "completed"
  attendees: number
  image: string
  vendors: Vendor[]
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "admin" | "organizer" | "vendor" | "attendee"
  profileImage?: string
  companyName?: string
  phoneNumber?: string
  createdAt: Date
  status: "active" | "inactive" | "pending" | "blocked"
}

export interface Booking {
  id: string
  event: {
    id: string
    title: string
  }
  organizer: {
    id: string
    name: string
  }
  vendor: {
    id: string
    name: string
  }
  package: Package
  addons: {
    name: string
    price: number
  }[]
  date: Date
  time: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  totalAmount: number
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: Date
  contractUrl?: string
}

export interface Message {
  id: string
  sender: {
    id: string
    name: string
    role: "organizer" | "vendor" | "admin"
  }
  receiver: {
    id: string
    name: string
    role: "organizer" | "vendor" | "admin"
  }
  content: string
  createdAt: Date
  read: boolean
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}
