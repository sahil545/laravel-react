import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Vendor, getVendors } from "@/lib/api";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, ShoppingBag, ChevronRight } from "lucide-react";

const VENDORS_PER_PAGE = 6;

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
  }, [searchTerm, vendors]);

  const fetchVendors = async () => {
    setLoading(true);
    const vendorsList = await getVendors();
    setVendors(vendorsList);
    setFilteredVendors(vendorsList);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...vendors];

    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          (v.shop_name || v.name)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          v.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredVendors(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredVendors.length / VENDORS_PER_PAGE);
  const startIndex = (currentPage - 1) * VENDORS_PER_PAGE;
  const paginatedVendors = filteredVendors.slice(
    startIndex,
    startIndex + VENDORS_PER_PAGE,
  );

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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Explore Our Vendors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover amazing products from our trusted vendors. Each vendor is
            carefully selected to ensure quality and excellent customer service.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vendors by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {searchTerm && (
              <button
                onClick={handleReset}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Showing {paginatedVendors.length} of {filteredVendors.length}{" "}
            vendors
          </p>
        </div>

        {/* Vendors List */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">
              No vendors found matching your search.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {paginatedVendors.map((vendor) => (
                <Link
                  key={vendor.id}
                  to={`/vendor/${vendor.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Left: Vendor Avatar/Image Area */}
                      <div className="md:w-48 md:h-48 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <ShoppingBag className="w-12 h-12 text-blue-600" />
                          </div>
                          <p className="text-white font-semibold text-sm">
                            {vendor.shop_name || vendor.name}
                          </p>
                        </div>
                      </div>

                      {/* Right: Vendor Content */}
                      <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                            {vendor.shop_name || vendor.name}
                          </h3>
                          <p className="text-gray-700 font-semibold mb-1">
                            {vendor.name}
                          </p>

                          {vendor.shop_description && (
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {vendor.shop_description}
                            </p>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            {vendor.email && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <span className="text-sm truncate">
                                  {vendor.email}
                                </span>
                              </div>
                            )}
                            {vendor.phone_number && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-5 h-5 text-blue-600" />
                                <span className="text-sm">
                                  {vendor.phone_number}
                                </span>
                              </div>
                            )}
                            {vendor.address && (
                              <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
                                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                <span className="text-sm truncate">
                                  {vendor.address}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                Active Vendor
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                          <span className="text-sm text-gray-500">
                            Member since{" "}
                            {new Date(vendor.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                              },
                            )}
                          </span>
                          <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                            View Shop
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
