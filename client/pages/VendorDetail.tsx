import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Vendor,
  Product,
  getVendors,
  getProducts,
  getProductImageUrl,
} from "@/lib/api";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  Star,
  Shield,
} from "lucide-react";

export default function VendorDetail() {
  const { vendor_id } = useParams<{ vendor_id: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [vendor_id]);

  const fetchData = async () => {
    setLoading(true);

    const vendorShopId = parseInt(vendor_id || "0", 10);

    const vendors = await getVendors();
    const foundVendor = vendors.find((v) => v.vendor_id === vendorShopId);
    setVendor(foundVendor || null);

    const allProducts = await getProducts();
    const vendorProducts = allProducts.filter(
      (p) => p.vendor_id === vendorShopId,
    );
    setProducts(vendorProducts);

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-xl text-gray-600">Loading vendor details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-xl text-gray-600 mb-4">Vendor not found</p>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Vendor Header Section */}
        <div className="bg-white rounded-xl border border-gray-200 mb-12 overflow-hidden">
          {/* Hero Background */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700"></div>

          {/* Vendor Info Container */}
          <div className="px-8 pb-8 -mt-16 relative z-10">
            {/* Vendor Avatar Placeholder */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-6">
              <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {(vendor.shop_name || vendor.name).charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 break-words">
                  {vendor.shop_name || vendor.name}
                </h1>
                <p className="text-lg text-gray-600">
                  Operated by {vendor.name}
                </p>
              </div>
            </div>

            {/* Vendor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-gray-900">Active Vendor</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <p className="font-semibold text-gray-900">{products.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(vendor.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-semibold text-gray-900">Trusted</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a
                    href={`mailto:${vendor.email}`}
                    className="text-blue-600 hover:text-blue-700 font-medium break-all"
                  >
                    {vendor.email}
                  </a>
                </div>
              </div>
              {vendor.phone_number && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <a
                      href={`tel:${vendor.phone_number}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {vendor.phone_number}
                    </a>
                  </div>
                </div>
              )}
              {vendor.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="text-gray-900 font-medium">{vendor.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Products from {vendor.shop_name || vendor.name}
            </h2>
            <p className="text-gray-600">
              Browse {products.length} available{" "}
              {products.length === 1 ? "product" : "products"}
            </p>
          </div>

          {products.length === 0 ? (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600">
                No products available from this vendor yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.product_id}
                  to={`/product/${product.product_id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="bg-gray-100 h-56 overflow-hidden flex items-center justify-center relative">
                    <img
                      src={getProductImageUrl(product.product_thumbnail)}
                      alt={product.product_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/200?text=No+Image";
                      }}
                    />
                    {/* Stock Badge */}
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {product.product_quantity > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
                        {product.product_name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                        {product.product_short_description}
                      </p>
                    </div>

                    {/* Price and Stock */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Price</p>
                          <p className="text-xl font-bold text-blue-600">
                            ${product.product_price.toLocaleString("en-US")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Available</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {product.product_quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
