"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  CalendarDays,
  Users,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrganizerLayout from "@/components/organizer/layout"
import { format } from "date-fns"

// Sample data for the dashboard
const events = [
  {
    id: "1",
    title: "Annual Corporate Gala",
    date: new Date(2025, 4, 15),
    status: "upcoming",
    location: "Grand Ballroom, New York",
    vendors: ["Elegant Catering Co.", "Sound Wave DJ Services"],
    attendees: 150,
  },
  {
    id: "2",
    title: "Product Launch Event",
    date: new Date(2025, 4, 28),
    status: "upcoming",
    location: "Tech Hub, San Francisco",
    vendors: ["City Catering Services", "Capture Moments Photography"],
    attendees: 80,
  },
  {
    id: "3",
    title: "Team Building Retreat",
    date: new Date(2025, 5, 10),
    status: "planning",
    location: "Mountain Lodge, Colorado",
    vendors: ["Adventure Activities Inc."],
    attendees: 45,
  },
  {
    id: "4",
    title: "Quarterly Board Meeting",
    date: new Date(2025, 3, 5),
    status: "completed",
    location: "Headquarters, Chicago",
    vendors: ["Elegant Catering Co."],
    attendees: 20,
  },
  {
    id: "5",
    title: "Holiday Party",
    date: new Date(2024, 11, 18),
    status: "completed",
    location: "Riverside Hotel, Miami",
    vendors: ["Party Planners Pro", "Sound Wave DJ Services", "Capture Moments Photography"],
    attendees: 200,
  },
]

// Status badge colors
const statusColors = {
  upcoming: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  planning: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  completed: "bg-green-100 text-green-800 hover:bg-green-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
}

export default function OrganizerDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter events based on search query and status filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate summary stats
  const totalEvents = events.length
  const upcomingEvents = events.filter((event) => event.status === "upcoming").length
  const bookedVendors = [...new Set(events.flatMap((event) => event.vendors))].length

  // Get upcoming events for the calendar view
  const upcomingEventsList = events
    .filter((event) => event.status === "upcoming" || event.status === "planning")
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  return (
    <OrganizerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500">Manage your events and bookings</p>
          </div>
          <Button className="gap-2" onClick={() => router.push("/organizer/events/new")}>
            <Plus size={16} />
            Create New Event
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <CalendarDays className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
              <p className="text-xs text-gray-500">Events created</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingEvents}</div>
              <p className="text-xs text-gray-500">Events scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Booked Vendors</CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookedVendors}</div>
              <p className="text-xs text-gray-500">Vendors engaged</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search events..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="list" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>My Events</CardTitle>
                <CardDescription>
                  You have {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Vendors</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{format(event.date, "MMM d, yyyy")}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{event.location}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={statusColors[event.status as keyof typeof statusColors]}
                            >
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{event.vendors.length}</TableCell>
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
                                  <Edit className="h-4 w-4" />
                                  Edit Event
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                          No events found. Try adjusting your filters or create a new event.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your next scheduled events</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingEventsList.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEventsList.map((event) => (
                      <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary">
                          <span className="text-sm font-semibold">{format(event.date, "MMM")}</span>
                          <span className="text-xl font-bold">{format(event.date, "d")}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{event.title}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{format(event.date, "h:mm a")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Badge
                              variant="outline"
                              className={statusColors[event.status as keyof typeof statusColors]}
                            >
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                    <p className="text-gray-500 mb-4">You don't have any upcoming events scheduled.</p>
                    <Button onClick={() => router.push("/organizer/events/new")}>Create New Event</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OrganizerLayout>
  )
}
