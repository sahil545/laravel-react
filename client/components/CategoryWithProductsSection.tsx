import { useState, useEffect } from "react";
import { getCategoryWithProducts, CategoryWithProducts } from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface CategoryWithProductsSectionProps {
  categoryId: number;
}

export default function CategoryWithProductsSection({ categoryId }: CategoryWithProductsSectionProps) {
  const [categoryData, setCategoryData] = useState<CategoryWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCategoryWithProducts(categoryId);
        setCategoryData(data);
        if (data && data.sub_categories.length > 0) {
          setActiveSubCategoryId(data.sub_categories[0].sub_category_id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch category data");
        setCategoryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  if (loading) {
    return (
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center py-8">
            <p className="text-gray-600">Loading category...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !categoryData) {
    return (
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center py-8">
            <p className="text-red-600">{error || "Failed to load category"}</p>
          </div>
        </div>
      </section>
    );
  }

  const activeSubCategory = categoryData.sub_categories.find(
    (sub) => sub.sub_category_id === activeSubCategoryId
  );

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="relative mb-8">
          <h2 className="font-mirza font-bold text-[48px] leading-[58px]">
            {categoryData.category_name}
          </h2>
          <svg
            className="absolute -top-1 left-[300px] w-[134px] h-[32px]"
            viewBox="0 0 134 32"
            fill="none"
          >
            <path
              d="M60.5161 3.64148C47.0681 7.61074 16.1376 18.2972 0 29.289C40.8244 34.1742 124.778 35.884 134 3.64148C121.032 0.893534 88.1806 -2.95359 60.5161 3.64148Z"
              fill="#EBD96B"
            />
          </svg>
        </div>

        {/* SubCategories Tabs */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex gap-2 md:gap-4 pb-4">
            {categoryData.sub_categories.map((subCategory) => (
              <button
                key={subCategory.sub_category_id}
                onClick={() => setActiveSubCategoryId(subCategory.sub_category_id)}
                className={`px-4 md:px-6 py-3 rounded-full whitespace-nowrap font-amiko font-semibold text-[14px] md:text-[16px] transition-all ${
                  activeSubCategoryId === subCategory.sub_category_id
                    ? "bg-[#032088] text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                {subCategory.sub_category_name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {activeSubCategory && activeSubCategory.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeSubCategory.products.map((product) => (
              <div
                key={product.product_id}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.product_slug}`)}
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square rounded-[10px] overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={product.product_thumbnail}
                    alt={product.product_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-almarai font-bold text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] tracking-[-0.715px] text-black group-hover:text-[#032088] transition">
                    {product.product_name}
                  </h3>

                  {/* Price */}
                  <div>
                    <span className="font-amiko font-bold text-[16px] md:text-[18px] leading-[22px] text-[#032088]">
                      ${(product.product_price / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <p className="text-gray-600">No products available in this subcategory</p>
          </div>
        )}
      </div>
    </section>
  );
}
