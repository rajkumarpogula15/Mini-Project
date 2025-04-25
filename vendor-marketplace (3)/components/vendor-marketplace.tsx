"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import VendorCard from "./vendor-card"
import type { Vendor } from "@/lib/types"
import { vendors } from "@/lib/data"

export default function VendorMarketplace() {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    serviceType: "",
    priceRange: [0, 5000],
    minRating: 0,
  })

  const locations = [...new Set(vendors.map((vendor) => vendor.location))]
  const serviceTypes = [...new Set(vendors.map((vendor) => vendor.serviceType))]

  useEffect(() => {
    let results = vendors

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.serviceType.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by location
    if (filters.location) {
      results = results.filter((vendor) => vendor.location === filters.location)
    }

    // Filter by service type
    if (filters.serviceType) {
      results = results.filter((vendor) => vendor.serviceType === filters.serviceType)
    }

    // Filter by price range
    results = results.filter(
      (vendor) => vendor.priceRange[0] <= filters.priceRange[1] && vendor.priceRange[1] >= filters.priceRange[0],
    )

    // Filter by rating
    if (filters.minRating > 0) {
      results = results.filter((vendor) => vendor.rating >= filters.minRating)
    }

    setFilteredVendors(results)
  }, [searchQuery, filters])

  const handlePriceRangeChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: value })
  }

  const handleRatingChange = (value: number[]) => {
    setFilters({ ...filters, minRating: value[0] })
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      serviceType: "",
      priceRange: [0, 5000],
      minRating: 0,
    })
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Find the Perfect Vendor</h1>
      <p className="text-gray-500 mb-8">Browse and connect with top-rated vendors for your event</p>

      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search vendors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.serviceType} onValueChange={(value) => setFilters({ ...filters, serviceType: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {serviceTypes.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal size={16} />
              More Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Options</SheetTitle>
              <SheetDescription>Refine your vendor search</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="pt-4">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={100}
                    value={filters.priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Minimum Rating</h3>
                <div className="pt-4">
                  <Slider
                    defaultValue={[0]}
                    max={5}
                    step={0.5}
                    value={[filters.minRating]}
                    onValueChange={handleRatingChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{filters.minRating} stars</span>
                    <span>5 stars</span>
                  </div>
                </div>
              </div>

              <Button onClick={clearFilters} variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Search and Filter Button */}
      <div className="flex md:hidden items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search vendors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Vendors</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Location</h3>
                <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Service Type</h3>
                <Select
                  value={filters.serviceType}
                  onValueChange={(value) => setFilters({ ...filters, serviceType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="pt-4">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={100}
                    value={filters.priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Minimum Rating</h3>
                <div className="pt-4">
                  <Slider
                    defaultValue={[0]}
                    max={5}
                    step={0.5}
                    value={[filters.minRating]}
                    onValueChange={handleRatingChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{filters.minRating} stars</span>
                    <span>5 stars</span>
                  </div>
                </div>
              </div>

              <Button onClick={clearFilters} variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-500">
          {filteredVendors.length} {filteredVendors.length === 1 ? "vendor" : "vendors"} found
        </p>
      </div>

      {/* Vendor Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No vendors found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
          <Button onClick={clearFilters} variant="outline">
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
