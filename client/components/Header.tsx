import { Link } from "react-router-dom";
import { ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Promo Banner */}
      <div className="w-full bg-gradient-to-r from-[#DBF4E2] to-[#F6FDEC] py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center justify-center gap-1">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none">
              <path
                d="M17.5 9.5C17.5 8.469 17.3165 7.4805 16.98 6.566C16.75 9.2605 15.3135 10.6445 13.8125 10C12.4065 9.396 13.354 7.0415 13.424 5.918C13.542 4.0135 13.418 1.8335 9.9585 0.0209999C11.396 2.771 10.125 4.4795 8.792 4.5835C7.313 4.699 5.9585 3.3125 6.4585 1.0625C4.8395 2.2555 4.7925 4.2635 5.292 5.5625C5.813 6.9165 5.271 8.0415 4.0005 8.1665C2.5805 8.3065 1.7915 6.646 2.519 4C1.26 5.4825 0.5 7.4025 0.5 9.5C0.5 14.1945 4.3055 18 9 18C13.6945 18 17.5 14.1945 17.5 9.5Z"
                fill="#F4900C"
              />
              <path
                d="M14.197 11.9995C14.271 13.5415 12.9165 14.146 12.1875 13.854C11.1345 13.4325 11.417 12.7085 11.146 11.2085C10.875 9.7085 9.8335 8.667 8.292 8.2085C9.417 11.375 7.6685 12.542 6.752 12.7505C5.816 12.9635 4.8755 12.75 4.768 10.747C3.676 11.834 3 13.338 3 15C3 15.184 3.0115 15.365 3.0275 15.545C4.5625 17.062 6.671 18 9 18C11.329 18 13.4375 17.062 14.9725 15.545C14.9885 15.365 15 15.184 15 15C15 13.9065 14.708 12.882 14.197 11.9995Z"
                fill="#FFCC4D"
              />
            </svg>
            <span className="font-jakarta font-bold text-[18px] leading-[25.2px]">
              Free shipping on all U.S. orders $50+ Best Offer
            </span>
          </div>
          <button className="ml-4 bg-white rounded-[7px] px-5 py-2 font-jakarta font-bold text-[15px]">
            Shop Now
          </button>
          <button className="ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/166b3b778a297e21a1d679bc543c6f4ff198af27?width=828"
                alt="The Activelist"
                className="h-12 w-auto"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-[18px] font-poppins font-medium">
              <Link to="/" className="hover:text-brand-green transition">
                Home
              </Link>
              <Link to="/shop" className="hover:text-brand-green transition">
                Shop
              </Link>
              <Link to="/vendors" className="hover:text-brand-green transition">
                Vendors
              </Link>
              <Link to="/blogs" className="hover:text-brand-green transition">
                Blogs
              </Link>
              <Link to="/contact" className="hover:text-brand-green transition">
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
              <Link
                to="/cart"
                className="hidden md:flex relative hover:text-blue-600 transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button className="hidden md:block hover:text-blue-600 transition">
                <User className="w-6 h-6" />
              </button>
              <Link
                to="/login"
                className="hidden lg:block font-poppins font-medium text-[18px] hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="https://ecommerce.standtogetherhelp.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center justify-center px-4 py-3 bg-brand-blue text-white rounded-[10px] font-poppins font-medium text-[18px] hover:opacity-90 transition"
              >
                Seller Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
