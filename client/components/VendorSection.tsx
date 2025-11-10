export default function VendorSection() {
  const vendors = [
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/ae9ca15d67a0395ef88e93f02150521edc54762e?width=418", alt: "Nike" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/4808c1469ec3318445b3011f3675a797f0fab1d7?width=342", alt: "H&M" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/33f017aaeb4a64bfb2f77bfb442b70aafc3c35c3?width=312", alt: "Levi's" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/013edfb1cdb49d9b43d8e7e18dafef4c4258e6a2?width=417", alt: "Polo Ralph Lauren" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/27068e4e61b3c500636d0d413145d0eed6fda86b?width=315", alt: "Puma" },
  ];

  return (
    <section className="w-full bg-[#070418] border border-[#323232] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-league text-white text-center text-[54px] tracking-[8.1px] mb-12">
          Our Vendors
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {vendors.map((vendor, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 flex items-center justify-center h-[120px]"
            >
              <img 
                src={vendor.src} 
                alt={vendor.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
