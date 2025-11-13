import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VendorSection from "@/components/VendorSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import CategorySection from "@/components/CategorySection";
import CategoryWithProductsSection from "@/components/CategoryWithProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ExclusiveOfferSection from "@/components/ExclusiveOfferSection";
import ResourcesSection from "@/components/ResourcesSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Index() {
  const womenProducts = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e56f332578268103b535949b6bbcf6273889237e?width=810",
      title: "tailored stretch",
      subtitle: "turn it up pants",
      price: "$180",
      colors: ["#0C0C0C", "#7DC3EB", "#748C70"],
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c2c9e11dc4555c8f4aac05da397470754e87d958?width=808",
      title: "Coats % parkas",
      subtitle: "turn it up pants",
      price: "$120",
      colors: ["#0C0C0C", "#EB7D97", "#76708C"],
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/11aeeb5c9eb939a0f1e9724a2aa295e043f67e0b?width=820",
      title: "Tees % T-shirt",
      subtitle: "turn it up pants",
      price: "$110",
      colors: ["#0C0C0C", "#86EB7D", "#8C7070"],
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f766ece6e4fb68d21ef717a7b8d4ba9696520e5e?width=820",
      title: "Polo T-Shirt",
      subtitle: "turn it up pants",
      price: "$160",
      colors: ["#0C0C0C", "#EB7D97", "#888C70"],
    },
  ];

  const menProducts = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/bf737f6f4fb469b042e3ea9308cc8b51c7a6f0b2?width=810",
      title: "Hoodies & Sweatshirt",
      subtitle: "Explore more",
      price: "$180",
      colors: ["#0C0C0C", "#7DC3EB", "#748C70"],
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/5f3c78acce791f5443ba6ae9b87178c55ff39f2c?width=808",
      title: "Activewear",
      subtitle: "Explore more",
      price: "$120",
      colors: ["#0C0C0C", "#EB7D97", "#76708C"],
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4533c24a5a4260f5375eb2a23bd24e8e2f1bf28f?width=820",
      title: "Boxers",
      subtitle: "Explore more",
      price: "$110",
      colors: ["#0C0C0C", "#86EB7D", "#8C7070"],
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ea5262579d9723390278f0a8e4c9b06cecc2cf67?width=820",
      title: "Polo T-Shirt",
      subtitle: "Explore more",
      price: "$160",
      colors: ["#0C0C0C", "#EB7D97", "#888C70"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <VendorSection />
      <ComingSoonSection />
      <CategorySection />
      <ProductGrid title="Women T-Shirt Product" products={womenProducts} />
      <ProductGrid title="Man T-Shirt Product" products={menProducts} />
      <TestimonialsSection />
      <ExclusiveOfferSection />
      <ResourcesSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
