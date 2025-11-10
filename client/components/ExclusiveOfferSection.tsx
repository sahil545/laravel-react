export default function ExclusiveOfferSection() {
  return (
    <section className="w-full bg-[#FEFFD4] py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            {/* Decorative Dots Pattern */}
            <div className="absolute top-1/2 -left-4 grid grid-cols-5 gap-9 opacity-50">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#328B56]" />
              ))}
            </div>
            
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/af23cb136cc7f178e45b9ed13e18dac73d673d77?width=964"
              alt="Exclusive Offer"
              className="w-full max-w-md mx-auto lg:mx-0 relative z-10"
            />
            
            {/* Decorative Background */}
            <div className="absolute top-1/3 left-1/4 w-[190px] h-[131px] bg-[#DFFBEA]/50 -z-10"></div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 md:space-y-8">
            <h2 className="font-spicy text-[#224F34] text-[36px] md:text-[48px] leading-normal">
              Exclusive offer
            </h2>
            
            <p className="font-poppins font-medium text-[#224F34] text-[18px] md:text-[20px] lg:text-[22px] leading-[32px] md:leading-[37px]">
              Unlock the ultimate style upgrade with our exclusive offer Enjoy savings of up to 40% off on our latest New Arrivals
            </p>

            {/* Countdown Timer */}
            <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
              {[
                { value: "06", label: "Days" },
                { value: "18", label: "Hours" },
                { value: "48", label: "Min" },
              ].map((time, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[3px] shadow-[0_7px_30px_0_rgba(0,0,0,0.05)] w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex flex-col items-center justify-center"
                >
                  <span className="font-poppins font-semibold text-[#224F34] text-[24px] md:text-[32px] leading-none">
                    {time.value}
                  </span>
                  <span className="font-poppins font-medium text-[#224F34] text-[16px] mt-2">
                    {time.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-[#224F34] text-white px-10 md:px-16 py-4 md:py-6 rounded-lg shadow-[0_7px_30px_0_rgba(0,0,0,0.05)] hover:bg-[#1a3a28] transition">
              <span className="font-poppins font-medium text-[20px] uppercase">
                Buy Now
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
