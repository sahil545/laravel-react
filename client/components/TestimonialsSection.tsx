export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dean D.",
      role: "Director",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/64d23a98366c7d7860f5314be7abad0c0a9baee3?width=206",
      quote: "Great quality products - Flags, programs for exceptional capacities, birthday, and occasion welcome are largely still mainstream on paper.",
    },
    {
      name: "Cristian L.",
      role: "Manager",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/5886d14b082fd177627cea6bf47c0ce213bba8a4?width=206",
      quote: "Best services ever - Flags, programs for exceptional capacities, birthday, and are largely still mainstream on paper occasion welcome.",
    },
    {
      name: "Leonel R.",
      role: "Designer",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/47519c9629f63a5c58c0319fba8aaf2077143c39?width=206",
      quote: "Top noth support - Flags, programs for, birthday, and occasion welcome are largely still mainstream on paper exceptional capacities.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h2 className="font-almarai font-bold text-[48px] leading-[60px] mb-2">
              What People Are Saying
            </h2>
            <svg className="absolute -top-2 left-1/2 -translate-x-1/2 w-[106px] h-[29px]" viewBox="0 0 106 29" fill="none">
              <path d="M47.871 3.30009C37.233 6.89723 12.7656 16.5818 0 26.5431C32.2939 30.9704 98.7054 32.5199 106 3.30009C95.7419 0.809765 69.7548 -2.67669 47.871 3.30009Z" fill="#EBD96B"/>
            </svg>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-[13px] p-6 md:p-8 lg:p-12 shadow-[0_0_13px_0_rgba(0,0,0,0.12)]"
            >
              {/* Avatar & Info */}
              <div className="flex items-start gap-4 mb-8">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-[103px] h-[103px] rounded-full object-cover"
                />
                <div className="flex-1 pt-4">
                  <h3 className="font-jakarta font-bold text-[23px] leading-[32px]">
                    {testimonial.name}
                  </h3>
                  <p className="font-jakarta font-medium text-[19px] leading-[27px] text-[#7E7E7E]">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="font-jakarta font-medium text-[20px] md:text-[23px] lg:text-[26px] leading-[36px] md:leading-[46px]">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
