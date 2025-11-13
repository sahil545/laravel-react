import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { getProductImageUrl } from "@/lib/api";
import StripePaymentForm from "@/components/StripePaymentForm";
import { toast } from "sonner";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0,
  );
  const shippingCost = subtotal > 50 ? 0 : 5;
  const taxAmount = subtotal * 0.05;
  const total = subtotal + shippingCost + taxAmount;

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-2xl text-gray-600 mb-6">
              Your cart is empty. Please add items before checkout.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and
              will be shipped soon.
            </p>
            <div className="bg-gray-50 rounded-lg p-8 mb-8 text-left max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-semibold">Customer Name:</span>{" "}
                  {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="font-semibold">Delivery Address:</span>{" "}
                  {formData.address}, {formData.city}, {formData.state}{" "}
                  {formData.postalCode}
                </p>
                <p>
                  <span className="font-semibold">Order Total:</span> $
                  {total.toLocaleString("en-US")}
                </p>
                <p>
                  <span className="font-semibold">Items:</span> {cart.length}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="px-8 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      alert("Please fill in all address fields");
      return;
    }

    // Payment will be handled by the Stripe payment form
    // Just validate shipping address is complete
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form className="space-y-8">
              {/* Shipping Address Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mb-4"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Information
                </h2>

                <StripePaymentForm
                  amount={total}
                  onSubmit={(e) => {
                    if (
                      !formData.firstName ||
                      !formData.lastName ||
                      !formData.email ||
                      !formData.phone ||
                      !formData.address ||
                      !formData.city ||
                      !formData.state ||
                      !formData.postalCode
                    ) {
                      toast.error(
                        "Please fill in all shipping information first",
                      );
                      return false;
                    }
                    return true;
                  }}
                  onPaymentSuccess={async (paymentIntentId) => {
                    try {
                      console.log("Payment success callback triggered");

                      // Prepare order data
                      const orderData = {
                        customer_email: formData.email,
                        customer_phone: formData.phone,
                        shipping_first_name: formData.firstName,
                        shipping_last_name: formData.lastName,
                        shipping_address: formData.address,
                        shipping_city: formData.city,
                        shipping_state: formData.state,
                        shipping_postal_code: formData.postalCode,
                        shipping_country: "US",
                        subtotal: subtotal,
                        tax_amount: taxAmount,
                        shipping_cost: shippingCost,
                        discount_amount: 0,
                        total_amount: total,
                        promo_code: null,
                        items: cart.map((item) => ({
                          product_id: item.product_id,
                          product_name: item.product_name,
                          unit_price: item.product_price,
                          quantity: item.quantity,
                          total_price: item.product_price * item.quantity,
                          selected_color: item.selectedColor || null,
                        })),
                      };

                      console.log("Sending order data:", orderData);

                      // Send order to backend
                      const response = await fetch(
                        "https://ecommerce.standtogetherhelp.com/api/orders",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(orderData),
                        },
                      );

                      console.log(
                        "Order API response status:",
                        response.status,
                      );
                      const responseText = await response.text();
                      console.log("Order API response:", responseText);

                      if (!response.ok) {
                        try {
                          const errorData = JSON.parse(responseText);
                          throw new Error(
                            errorData.message || "Failed to create order",
                          );
                        } catch {
                          throw new Error(
                            `Server error (${response.status}): ${responseText}`,
                          );
                        }
                      }

                      const orderResult = JSON.parse(responseText);
                      console.log("Order created:", orderResult);

                      // Record payment
                      const paymentData = {
                        order_id: orderResult.order.id,
                        payment_method: "stripe",
                        amount: total,
                        transaction_id: paymentIntentId,
                        card_last_four: "****",
                        card_brand: "card",
                      };

                      console.log("Sending payment data:", paymentData);

                      const paymentResponse = await fetch(
                        "https://ecommerce.standtogetherhelp.com/api/payments",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(paymentData),
                        },
                      );

                      console.log(
                        "Payment API response status:",
                        paymentResponse.status,
                      );
                      const paymentText = await paymentResponse.text();
                      console.log("Payment API response:", paymentText);

                      if (!paymentResponse.ok) {
                        console.warn(
                          "Payment recording failed but continuing:",
                          paymentText,
                        );
                      }

                      // Generate invoice
                      console.log(
                        "Generating invoice for order:",
                        orderResult.order.id,
                      );
                      const invoiceResponse = await fetch(
                        `https://ecommerce.standtogetherhelp.com/api/orders/${orderResult.order.id}/invoice`,
                        {
                          method: "GET",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        },
                      );

                      console.log(
                        "Invoice API response status:",
                        invoiceResponse.status,
                      );

                      clearCart();
                      toast.success("Order placed successfully!");
                      setOrderPlaced(true);
                    } catch (error) {
                      console.error("Error processing order:", error);
                      const errorMessage =
                        error instanceof Error
                          ? error.message
                          : "Failed to process order. Please try again.";
                      console.error("Full error details:", errorMessage);
                      toast.error(errorMessage);
                    }
                  }}
                  onPaymentError={(error) => {
                    toast.error("Payment failed: " + error);
                  }}
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="mb-6 pb-6 border-b border-gray-200 max-h-80 overflow-y-auto">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={getProductImageUrl(item.product_thumbnail)}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded bg-gray-100"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/64?text=No+Image";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-blue-600">
                          $
                          {(item.product_price * item.quantity).toLocaleString(
                            "en-US",
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString("en-US")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>${taxAmount.toLocaleString("en-US")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shippingCost}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${total.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
