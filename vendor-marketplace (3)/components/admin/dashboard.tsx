"use client"

import { useState } from "react"
import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  UserX,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminLayout from "@/components/admin/layout"
import { format } from "date-fns"

// Sample data for the dashboard
const platformStats = [
  { title: "Total Users", value: "2,845", icon: Users, change: "+12.5%" },
  { title: "Total Events", value: "1,234", icon: Calendar, change: "+23.1%" },
  { title: "Pending Bookings", value: "56", icon: Clock, change: "-5.2%" },
  { title: "Total Vendors", value: "328", icon: DollarSign, change: "+8.7%" },
]

const users = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "organizer",
    status: "active",
    joinDate: new Date(2024, 1, 15),
    eventsCreated: 12,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "vendor",
    status: "active",
    joinDate: new Date(2024, 2, 3),
    vendorType: "Photography",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "organizer",
    status: "inactive",
    joinDate: new Date(2024, 0, 20),
    eventsCreated: 5,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "vendor",
    status: "pending",
    joinDate: new Date(2024, 3, 10),
    vendorType: "Catering",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    role: "attendee",
    status: "active",
    joinDate: new Date(2024, 2, 25),
    eventsAttended: 8,
  },
]

const events = [
  {
    id: "1",
    name: "Tech Conference 2025",
    organizer: "John Smith",
    date: new Date(2025, 5, 15),
    status: "approved",
    attendees: 500,
    vendors: 8,
  },
  {
    id: "2",
    name: "Annual Charity Gala",
    organizer: "Sarah Johnson",
    date: new Date(2025, 4, 20),
    status: "pending",
    attendees: 300,
    vendors: 6,
  },
  {
    id: "3",
    name: "Product Launch Event",
    organizer: "Michael Brown",
    date: new Date(2025, 6, 5),
    status: "pending",
    attendees: 150,
    vendors: 4,
  },
  {
    id: "4",
    name: "Corporate Retreat",
    organizer: "Emily Davis",
    date: new Date(2025, 7, 12),
    status: "approved",
    attendees: 75,
    vendors: 5,
  },
  {
    id: "5",
    name: "Wedding Ceremony",
    organizer: "David Wilson",
    date: new Date(2025, 8, 30),
    status: "rejected",
    attendees: 200,
    vendors: 10,
  },
]

const disputes = [
  {
    id: "1",
    title: "Payment Dispute",
    user: "John Smith",
    vendor: "Elegant Catering Co.",
    date: new Date(2025, 3, 10),
    status: "open",
    priority: "high",
  },
  {
    id: "2",
    title: "Service Quality Issue",
    user: "Sarah Johnson",
    vendor: "Sound Wave DJ Services",
    date: new Date(2025, 3, 15),
    status: "in_progress",
    priority: "medium",
  },
  {
    id: "3",
    title: "Booking Cancellation",
    user: "Michael Brown",
    vendor: "Capture Moments Photography",
    date: new Date(2025, 3, 20),
    status: "resolved",
    priority: "low",
  },
]

// Status badge colors
const userStatusColors = {
  active: "bg-green-100 text-green-800 hover:bg-green-100",
  inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  blocked: "bg-red-100 text-red-800 hover:bg-red-100",
}

const eventStatusColors = {
  approved: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100",
}

const disputeStatusColors = {
  open: "bg-red-100 text-red-800 hover:bg-red-100",
  in_progress: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  resolved: "bg-green-100 text-green-800 hover:bg-green-100",
}

const disputePriorityColors = {
  high: "bg-red-100 text-red-800 hover:bg-red-100",
  medium: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  low: "bg-blue-100 text-blue-800 hover:bg-blue-100",
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userRoleFilter, setUserRoleFilter] = useState("all")
  const [userStatusFilter, setUserStatusFilter] = useState("all")
  const [eventStatusFilter, setEventStatusFilter] = useState("all")

  // Filter users based on search query, role and status filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = userRoleFilter === "all" || user.role === userRoleFilter
    const matchesStatus = userStatusFilter === "all" || user.status === userStatusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  // Filter events based on search query and status filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = eventStatusFilter === "all" || event.status === eventStatusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of platform activity and management</p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage platform users</CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Advanced Filters
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="organizer">Organizer</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="attendee">Attendee</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={userStatusFilter} onValueChange={setUserStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={userStatusColors[user.status as keyof typeof userStatusColors]}
                            >
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(user.joinDate, "MMM d, yyyy")}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  {user.status === "active" ? (
                                    <>
                                      <UserX className="h-4 w-4" />
                                      Deactivate User
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="h-4 w-4" />
                                      Activate User
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                  <XCircle className="h-4 w-4" />
                                  Block User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                          No users found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>Manage platform events</CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Advanced Filters
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search events..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={eventStatusFilter} onValueChange={setEventStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.name}</TableCell>
                          <TableCell>{event.organizer}</TableCell>
                          <TableCell>{format(event.date, "MMM d, yyyy")}</TableCell>
                          <TableCell>{event.attendees}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={eventStatusColors[event.status as keyof typeof eventStatusColors]}
                            >
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                {event.status === "pending" && (
                                  <>
                                    <DropdownMenuItem className="flex items-center gap-2 text-green-600">
                                      <CheckCircle className="h-4 w-4" />
                                      Approve Event
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                      <XCircle className="h-4 w-4" />
                                      Reject Event
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                          No events found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Management</CardTitle>
                <CardDescription>Handle user disputes and issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issue</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">{dispute.title}</TableCell>
                        <TableCell>{dispute.user}</TableCell>
                        <TableCell>{dispute.vendor}</TableCell>
                        <TableCell>{format(dispute.date, "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={disputePriorityColors[dispute.priority as keyof typeof disputePriorityColors]}
                          >
                            {dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={disputeStatusColors[dispute.status as keyof typeof disputeStatusColors]}
                          >
                            {dispute.status === "in_progress"
                              ? "In Progress"
                              : dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
