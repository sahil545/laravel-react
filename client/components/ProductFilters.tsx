import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Product, Vendor } from "@/lib/api";
import { X } from "lucide-react";

export interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  vendors: number[];
  brands: number[];
  categories: number[];
  ratings: number[];
}

interface ProductFiltersProps {
  products: Product[];
  vendors: Vendor[];
  onApplyFilters: (filters: FilterState) => void;
  onReset: () => void;
  maxPrice: number;
}

export default function ProductFilters({
  products,
  vendors,
  onApplyFilters,
  onReset,
  maxPrice,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Extract unique brands and categories
  const uniqueBrands = Array.from(
    new Set(products.map((p) => p.brand_id).filter(Boolean)),
  ).sort((a, b) => a - b);

  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.sub_category_id).filter(Boolean)),
  ).sort((a, b) => a - b);

  const vendorList = vendors.filter((v) =>
    products.some((p) => p.vendor_id === v.vendor_id),
  );

  const ratingOptions = [1, 2, 3, 4, 5];

  const handleApplyFilters = () => {
    onApplyFilters({
      searchTerm,
      priceRange,
      vendors: selectedVendors,
      brands: selectedBrands,
      categories: selectedCategories,
      ratings: selectedRatings,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setPriceRange([0, maxPrice]);
    setSelectedVendors([]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    onReset();
  };

  const isFiltersActive =
    searchTerm ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    selectedVendors.length > 0 ||
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedRatings.length > 0;

  return (
    <div className="w-full lg:w-72 bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {isFiltersActive && (
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search by Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Search Product
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#070418]"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Price Range
          </label>
          <div className="space-y-3">
            <Slider
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange([value[0], value[1]])
              }
              min={0}
              max={maxPrice}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Vendors */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Vendors
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {vendorList.map((vendor) => (
              <div key={vendor.id} className="flex items-center gap-2">
                <Checkbox
                  id={`vendor-${vendor.id}`}
                  checked={selectedVendors.includes(vendor.vendor_id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedVendors([
                        ...selectedVendors,
                        vendor.vendor_id,
                      ]);
                    } else {
                      setSelectedVendors(
                        selectedVendors.filter((v) => v !== vendor.vendor_id),
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`vendor-${vendor.id}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {vendor.shop_name || vendor.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Categories
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uniqueCategories.map((catId) => (
              <div key={catId} className="flex items-center gap-2">
                <Checkbox
                  id={`category-${catId}`}
                  checked={selectedCategories.includes(catId)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, catId]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== catId),
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`category-${catId}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Category {catId}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Brands
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uniqueBrands.map((brandId) => (
              <div key={brandId} className="flex items-center gap-2">
                <Checkbox
                  id={`brand-${brandId}`}
                  checked={selectedBrands.includes(brandId)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBrands([...selectedBrands, brandId]);
                    } else {
                      setSelectedBrands(
                        selectedBrands.filter((b) => b !== brandId),
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`brand-${brandId}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Brand {brandId}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Ratings
          </label>
          <div className="space-y-2">
            {ratingOptions.map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedRatings([...selectedRatings, rating]);
                    } else {
                      setSelectedRatings(
                        selectedRatings.filter((r) => r !== rating),
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm text-gray-700 cursor-pointer flex items-center gap-1"
                >
                  {"⭐".repeat(rating)} {rating}+ Stars
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-4 border-t space-y-2">
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-[#070418] text-white hover:bg-gray-900 font-semibold py-2"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
