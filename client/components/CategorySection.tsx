export default function CategorySection() {
  const categories = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c4d7ef44968b587260db4ba0980dc126336283c9?width=1156",
      title: "Men's",
      subtitle: "Sale off 20%",
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/883b77f2d7a232d16f886c8db14a71d9f20d6c78?width=1156",
      title: "Women's",
      subtitle: "Sale from 10%",
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/5137eb7e88bec483113dc7bc910159836e838840?width=1156",
      title: "Kid's",
      subtitle: "Sale up to 40%",
    },
  ];

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
          {categories.map((category, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-[20px]">
              <div className="relative w-full aspect-square">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-center">
                  <h3 className="font-inter font-bold text-white text-[28px] md:text-[36px] lg:text-[41px] leading-[40px] md:leading-[58px] mb-1">
                    {category.title}
                  </h3>
                  <p className="font-inter font-semibold text-white text-[14px] md:text-[16px] lg:text-[18px] tracking-[1.28px] uppercase">
                    {category.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
