import { useState, useEffect } from 'react';
import { getCategories, Category } from '../lib/api';

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCategories();
        setCategories(data.slice(0, 3));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="relative mb-8">
          <h2 className="font-mirza font-bold text-[48px] leading-[58px]">
            Top Categories
          </h2>
          <svg className="absolute -top-1 left-[180px] w-[134px] h-[32px]" viewBox="0 0 134 32" fill="none">
            <path d="M60.5161 3.64148C47.0681 7.61074 16.1376 18.2972 0 29.289C40.8244 34.1742 124.778 35.884 134 3.64148C121.032 0.893534 88.1806 -2.95359 60.5161 3.64148Z" fill="#EBD96B"/>
          </svg>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {loading && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">Loading categories...</p>
            </div>
          )}
          {error && (
            <div className="col-span-full text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          {!loading && !error && categories.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No categories available</p>
            </div>
          )}
          {categories.map((category) => (
            <div key={category.id} className="relative group cursor-pointer overflow-hidden rounded-[20px]">
              <div className="relative w-full aspect-square bg-gray-200">
                {category.category_thumbnail && (
                  <img
                    src={category.category_thumbnail}
                    alt={category.category_name}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-center">
                  <h3 className="font-inter font-bold text-white text-[28px] md:text-[36px] lg:text-[41px] leading-[40px] md:leading-[58px] mb-1">
                    {category.category_name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
