"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { loginUser } from "@/lib/actions/auth-actions"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would call the login API
      const result = await loginUser({ email, password })

      if (result.requiresTwoFactor) {
        setShowTwoFactor(true)
        toast({
          title: "Two-factor authentication required",
          description: "Please enter the code sent to your device",
        })
      } else if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })

        // Redirect based on user role
        if (result.user.role === "admin") {
          router.push("/admin/dashboard")
        } else if (result.user.role === "organizer") {
          router.push("/organizer/dashboard")
        } else if (result.user.role === "vendor") {
          router.push("/vendor/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: result.error || "Invalid email or password",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyTwoFactor = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would verify the 2FA code
      const result = await verifyTwoFactorCode(email, twoFactorCode)

      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })

        // Redirect based on user role
        if (result.user.role === "admin") {
          router.push("/admin/dashboard")
        } else if (result.user.role === "organizer") {
          router.push("/organizer/dashboard")
        } else if (result.user.role === "vendor") {
          router.push("/vendor/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: result.error || "Invalid verification code",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "An error occurred during verification",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Mock function for 2FA verification
  const verifyTwoFactorCode = async (email: string, code: string) => {
    // This would be an API call in a real app
    return {
      success: code === "123456", // For demo purposes
      user: {
        id: "1",
        name: "John Doe",
        email,
        role: "organizer",
      },
      error: code !== "123456" ? "Invalid verification code" : null,
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link href="/register" className="font-medium text-primary hover:text-primary/90">
              create a new account
            </Link>
          </p>
        </div>

        {!showTwoFactor ? (
          <Card>
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/90">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <form onSubmit={handleVerifyTwoFactor}>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Enter the verification code sent to your device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twoFactorCode">Verification Code</Label>
                  <Input
                    id="twoFactorCode"
                    type="text"
                    placeholder="123456"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    required
                    className="text-center text-xl tracking-widest"
                    maxLength={6}
                  />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Didn't receive a code?{" "}
                  <button type="button" className="text-primary hover:text-primary/90">
                    Resend
                  </button>
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowTwoFactor(false)}
                  disabled={isLoading}
                >
                  Back to Login
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
