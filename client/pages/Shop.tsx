import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductFilters, { FilterState } from "@/components/ProductFilters";
import Pagination from "@/components/Pagination";
import {
  Product,
  Vendor,
  getProducts,
  getVendors,
  getProductImageUrl,
} from "@/lib/api";
import { Link } from "react-router-dom";

const PRODUCTS_PER_PAGE = 12;

export default function Shop() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    priceRange: [0, 500],
    vendors: [],
    brands: [],
    categories: [],
    ratings: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
  }, [filters, allProducts]);

  const fetchData = async () => {
    setLoading(true);
    const [products, vendorsList] = await Promise.all([
      getProducts(),
      getVendors(),
    ]);

    setAllProducts(products);
    setVendors(vendorsList);
    setFilteredProducts(products);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...allProducts];

    // Search by product name
    if (filters.searchTerm) {
      filtered = filtered.filter((p) =>
        p.product_name.toLowerCase().includes(filters.searchTerm.toLowerCase()),
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (p) =>
        p.product_price >= filters.priceRange[0] &&
        p.product_price <= filters.priceRange[1],
    );

    // Vendor filter
    if (filters.vendors.length > 0) {
      filtered = filtered.filter((p) => filters.vendors.includes(p.vendor_id));
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand_id));
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.sub_category_id),
      );
    }

    // Note: Rating filter is included but would require additional API data
    // For now, we'll keep the structure but note that ratings aren't in the current API response

    setFilteredProducts(filtered);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    const maxPrice = Math.max(
      ...allProducts.map((p) => p.product_price),
      500,
    );
    setFilters({
      searchTerm: "",
      priceRange: [0, maxPrice],
      vendors: [],
      brands: [],
      categories: [],
      ratings: [],
    });
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const maxPrice = Math.max(
    ...allProducts.map((p) => p.product_price),
    filters.priceRange[1],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-xl text-gray-600">Loading products...</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop</h1>
          <p className="text-gray-600">
            Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
            products
          </p>
        </div>

        {/* Filters and Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <ProductFilters
            products={allProducts}
            vendors={vendors}
            onApplyFilters={handleApplyFilters}
            onReset={handleResetFilters}
            maxPrice={maxPrice}
          />

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">
                  No products found matching your filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.product_id}
                      to={`/product/${product.product_id}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                      <div className="bg-gray-200 h-64 overflow-hidden flex items-center justify-center">
                        <img
                          src={getProductImageUrl(product.product_thumbnail)}
                          alt={product.product_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/300?text=No+Image";
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
                            ${product.product_price.toLocaleString("en-US")}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {product.product_quantity > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
