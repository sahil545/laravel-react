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
import { ChevronLeft } from "lucide-react";

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
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Vendor Info */}
        <div className="bg-gradient-to-r from-[#070418] to-[#1a1627] rounded-lg p-8 text-white mb-12">
          <h1 className="text-4xl font-bold mb-2">
            {vendor.shop_name || vendor.name}
          </h1>
          <p className="text-lg text-gray-400 mb-4">Owner: {vendor.name}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Email:</span> {vendor.email}
              </p>
              {vendor.phone_number && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Phone:</span>{" "}
                  {vendor.phone_number}
                </p>
              )}
              {vendor.address && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {vendor.address}
                </p>
              )}
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Username:</span>{" "}
                {vendor.username}
              </p>
            </div>
            <div>
              <p className="text-gray-300">
                <span className="font-semibold">Member Since:</span>{" "}
                {new Date(vendor.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">
            Products from {vendor.shop_name || vendor.name}
          </h2>

          {products.length === 0 ? (
            <p className="text-lg text-gray-600">
              No products available from this vendor.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.product_id}
                  to={`/product/${product.product_id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="bg-gray-200 h-48 overflow-hidden flex items-center justify-center">
                    <img
                      src={getProductImageUrl(product.product_thumbnail)}
                      alt={product.product_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/200?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                      {product.product_name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.product_short_description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#070418]">
                        ₹{product.product_price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.product_quantity}
                      </span>
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
