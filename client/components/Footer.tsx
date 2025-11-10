import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Footer Links Section */}
      <div className="w-full bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Company Info */}
            <div>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/301cba01dbb0a7c87221750b4fc7cac7101ed43d?width=696"
                alt="The Activelist"
                className="h-12 w-auto mb-6"
              />
              <div className="space-y-3">
                <p className="font-jakarta font-medium text-[16px] text-[#7E7E7E]">
                  info@yourmail.com
                </p>
                <p className="font-jakarta font-bold text-[18px]">
                  +123 456 7890
                </p>
                <p className="font-jakarta font-medium text-[16px] text-[#7E7E7E] leading-[29px]">
                  3665 Paseo Place, Suite 0960<br />
                  San Diego
                </p>
              </div>
            </div>

            {/* Information */}
            <div>
              <h3 className="font-jakarta font-bold text-[20px] leading-[28px] mb-6">
                Information
              </h3>
              <ul className="space-y-5">
                {["About us", "Our Blog", "Start a Return", "Contact Us", "Shipping FAQ"].map((item) => (
                  <li key={item}>
                    <Link to="/" className="font-jakarta font-medium text-[16px] leading-[29px] text-[#7E7E7E] hover:text-black transition">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="font-jakarta font-bold text-[20px] leading-[28px] mb-6">
                Useful links
              </h3>
              <ul className="space-y-5">
                {["My Account", "Print Provider", "Become a Partner", "Custom Products", "Make your own shirt"].map((item) => (
                  <li key={item}>
                    <Link to="/" className="font-jakarta font-medium text-[16px] leading-[29px] text-[#7E7E7E] hover:text-black transition">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Categories */}
            <div>
              <h3 className="font-jakarta font-bold text-[20px] leading-[28px] mb-6">
                Top Categories
              </h3>
              <ul className="space-y-5">
                {["Men's Clothing", "Women's Clothing", "Kid's Clothing", "Top Vendors", "Make your own shirt"].map((item) => (
                  <li key={item}>
                    <Link to="/" className="font-jakarta font-medium text-[16px] leading-[29px] text-[#7E7E7E] hover:text-black transition">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-jakarta font-bold text-[20px] leading-[28px] mb-4">
                Newsletter
              </h3>
              <p className="font-jakarta font-medium text-[15px] leading-[27px] text-[#7E7E7E] mb-6">
                Get the latest news, events & more delivered
                to your inbox.
              </p>
              
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-5 py-4 rounded-xl border border-white bg-white shadow-[0_4px_34px_0_rgba(0,0,0,0.05)] font-jakarta font-medium text-[15px] placeholder:text-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Copyright */}
      <div className="w-full bg-[#F5F5F5] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            {/* Payment Methods */}
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/4aa9aff5b0a630119db32ae115dfaddf9ca3035a?width=716"
              alt="Payment Methods"
              className="h-8"
            />
            
            {/* Copyright */}
            <p className="font-jakarta font-medium text-[16px] leading-[22px] text-[#7E7E7E] text-center">
              © 2022 TeeSpace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
