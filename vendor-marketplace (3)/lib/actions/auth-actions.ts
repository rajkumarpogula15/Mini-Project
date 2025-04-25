"use server"

import { revalidatePath } from "next/cache"

// Mock user data for demonstration
const users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "organizer",
    companyName: "Event Masters",
    phoneNumber: "+1 (555) 123-4567",
    hasTwoFactorEnabled: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "vendor",
    companyName: "Elegant Photography",
    phoneNumber: "+1 (555) 987-6543",
    hasTwoFactorEnabled: false,
  },
  {
    id: "3",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "admin",
    hasTwoFactorEnabled: true,
  },
]

export async function loginUser({ email, password }: { email: string; password: string }) {
  // In a real app, this would validate credentials against a database
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return {
      success: false,
      error: "Invalid email or password",
    }
  }

  // Check if user has 2FA enabled
  if (user.hasTwoFactorEnabled) {
    return {
      success: false,
      requiresTwoFactor: true,
      userId: user.id,
    }
  }

  // In a real app, this would create a session
  return {
    success: true,
    user: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    },
  }
}

export async function registerUser(userData: {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  companyName?: string
  phoneNumber?: string
}) {
  // In a real app, this would validate and store user data in a database

  // Check if email already exists
  const existingUser = users.find((u) => u.email === userData.email)
  if (existingUser) {
    return {
      success: false,
      error: "Email already in use",
    }
  }

  // Create new user (in a real app, this would be stored in a database)
  const newUser = {
    id: String(users.length + 1),
    ...userData,
    hasTwoFactorEnabled: false,
  }

  // In a real app, this would add the user to the database
  // users.push(newUser)

  return {
    success: true,
    user: {
      id: newUser.id,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      role: newUser.role,
    },
  }
}

export async function logoutUser() {
  // In a real app, this would destroy the session

  revalidatePath("/")

  return {
    success: true,
  }
}
