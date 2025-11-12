import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Vendor, getVendors } from "@/lib/api";
import { Link } from "react-router-dom";

export default function VendorCarousel() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    const data = await getVendors();
    setVendors(data);
    setLoading(false);
  };

  const itemsPerView = 5;
  const canScrollLeft = currentIndex > 0;
  const canScrollRight =
    currentIndex < Math.max(0, vendors.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(vendors.length - itemsPerView, currentIndex + 1));
  };

  const visibleVendors = vendors.slice(
    currentIndex,
    currentIndex + itemsPerView,
  );

  return (
    <section className="w-full bg-[#070418] border border-[#323232] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-league text-white text-center text-[54px] tracking-[8.1px] mb-12">
          Our Vendors
        </h2>

        {loading ? (
          <div className="text-center text-white">Loading vendors...</div>
        ) : vendors.length === 0 ? (
          <div className="text-center text-white">No vendors available</div>
        ) : (
          <div className="relative">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={!canScrollLeft}
                className="flex-shrink-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {visibleVendors.map((vendor) => (
                    <Link
                      key={vendor.id}
                      to={`/vendor/${vendor.id}`}
                      className="bg-white rounded-lg overflow-hidden h-[120px] hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center"
                    >
                      {vendor.photo ? (
                        <img
                          src={vendor.photo}
                          alt={vendor.shop_name || vendor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full w-full gap-2 bg-gradient-to-br from-blue-50 to-purple-50">
                          <ShoppingBag className="w-6 h-6 text-blue-600" />
                          <p className="text-xs font-semibold text-[#070418] truncate px-2">
                            {vendor.shop_name || vendor.name}
                          </p>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!canScrollRight}
                className="flex-shrink-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
