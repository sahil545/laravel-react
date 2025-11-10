export default function ResourcesSection() {
  const articles = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/096c1d958311a349c0618f54c348a735275d2443?width=621",
      category: "Design Services",
      title: "Make yourself happy with our T-shirt customer…",
      author: "admin",
      date: "March 18, 2024",
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/132b6b44403c71925a25ed44feb0dee33e2a25af?width=621",
      category: "Print Company",
      categories: ["Print Company", "Print Shop"],
      title: "Are you ready to make it awesome with us",
      author: "admin",
      date: "March 18, 2024",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-inter font-bold text-[36px] md:text-[48px] lg:text-[56px] leading-[44px] md:leading-[56px] lg:leading-[64px] mb-4">
            More Resources
          </h2>
          <p className="font-inter text-[#7E7E7E] text-[16px] md:text-[18px] leading-[28px] md:leading-[32px] max-w-2xl mx-auto">
            T-shirt Printing for Everyone. Get a headstart with free design templates
            you can customize in a few clicks.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
          {articles.map((article, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="w-full md:w-[311px] h-[200px] flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                {/* Category Badge */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.categories ? (
                    article.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-2 rounded-full bg-[#F5F5F5] font-inter font-semibold text-[15px] leading-[27px] text-brand-teal"
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span className="inline-flex items-center px-3 py-2 rounded-full bg-[#F5F5F5] font-inter font-semibold text-[15px] leading-[27px] text-brand-teal">
                      {article.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-inter font-bold text-[24px] leading-[34px] mb-4 flex-1">
                  {article.title}
                </h3>

                {/* Author & Date */}
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/e83bc100ac8a2a911a8dde127cc29a71e5395faa?width=104"
                    alt="Author"
                    className="w-[52px] h-[52px] rounded-full"
                  />
                  <div>
                    <p className="font-inter text-[16px] leading-[29px] text-[#7E7E7E]">
                      by <span className="font-semibold text-black">{article.author}</span>
                    </p>
                    <p className="font-inter text-[16px] leading-[29px] text-[#7E7E7E]">
                      {article.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
