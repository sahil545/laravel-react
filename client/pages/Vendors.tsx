import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Vendor, getVendors } from "@/lib/api";
import { ChevronRight } from "lucide-react";

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    const vendorsList = await getVendors();
    setVendors(vendorsList);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-xl text-gray-600">Loading vendors...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Our Vendors
          </h1>
          <p className="text-gray-600">
            Browse our {vendors.length} trusted vendors and their products
          </p>
        </div>

        {/* Vendors Grid */}
        {vendors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              No vendors available at the moment.
            </p>
            <Link
              to="/shop"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Browse our shop instead
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Link
                key={vendor.vendor_id}
                to={`/vendor/${vendor.vendor_id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="bg-gradient-to-r from-[#070418] to-[#1a1627] p-8 text-white min-h-[200px] flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {vendor.shop_name || vendor.name}
                    </h2>
                    <p className="text-gray-300 text-sm mb-4">
                      Owner: {vendor.name}
                    </p>
                  </div>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="text-sm font-semibold">View Details</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Email</p>
                      <p className="text-gray-900 font-medium break-all">
                        {vendor.email}
                      </p>
                    </div>

                    {vendor.phone_number && (
                      <div>
                        <p className="text-gray-500 mb-1">Phone</p>
                        <p className="text-gray-900">{vendor.phone_number}</p>
                      </div>
                    )}

                    {vendor.address && (
                      <div>
                        <p className="text-gray-500 mb-1">Address</p>
                        <p className="text-gray-900 line-clamp-2">
                          {vendor.address}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-gray-500 text-xs">
                        Member since{" "}
                        {new Date(vendor.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
