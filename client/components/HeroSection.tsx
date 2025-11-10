import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[965px] overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://api.builder.io/api/v1/image/assets/TEMP/aaadf73c8b13328bc2dac507b23a8a67fec013b2?width=3838"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="font-poppins text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[98px] leading-tight lg:leading-[118px] uppercase mb-6 md:mb-8">
            <span className="font-light">Empowering </span>
            <span className="font-bold">Active Lifestyles</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
            {/* Shop Now Button */}
            <button className="flex items-center justify-center gap-3 bg-black text-white px-6 sm:px-8 py-4 sm:py-5 rounded-[17px] font-jakarta font-bold text-[18px] sm:text-[23px] hover:bg-gray-900 transition">
              <span>Shop Now</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            
            {/* How We Work */}
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="font-jakarta font-bold text-white text-[18px] sm:text-[23px]">
                How We Work
              </span>
              <button className="flex items-center justify-center w-11 h-11 rounded-full border-[3px] border-white hover:bg-white/10 transition">
                <Play className="w-6 h-6 text-white fill-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
