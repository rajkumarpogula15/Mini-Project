import VendorProfile from "@/components/vendor-profile"

export default function VendorProfilePage({ params }: { params: { id: string } }) {
  return <VendorProfile vendorId={params.id} />
}
