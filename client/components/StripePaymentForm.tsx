import { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { AlertCircle, Loader } from "lucide-react";

interface StripePaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  isProcessing?: boolean;
}

const cardElementOptions: StripeCardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#9ca3af",
      },
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSmoothing: "antialiased",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function StripePaymentForm({
  amount,
  onPaymentSuccess,
  onPaymentError,
  isProcessing = false,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not loaded. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setError("Card element not found");
        setLoading(false);
        return;
      }

      // Create payment method
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: "Customer Name",
          },
        });

      if (paymentMethodError) {
        setError(paymentMethodError.message || "Payment failed");
        setLoading(false);
        onPaymentError(paymentMethodError.message || "Payment failed");
        return;
      }

      // In a real app, you would send the paymentMethod.id to your backend
      // to create a payment intent and process the payment
      // For now, we'll simulate a successful payment
      console.log("Payment Method:", paymentMethod);

      // Simulate successful payment
      setTimeout(() => {
        setLoading(false);
        onPaymentSuccess(paymentMethod?.id || "test_payment_intent");
      }, 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      onPaymentError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Card Details
        </label>
        <div className="p-4 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-900">Payment Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading || isProcessing}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading || isProcessing ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Processing payment...
          </>
        ) : (
          `Pay ${amount > 0 ? "$" + amount.toLocaleString("en-US") : "Now"}`
        )}
      </button>

      {/* Test Card Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          Test Card Information
        </p>
        <div className="text-xs text-blue-700 space-y-1">
          <p>
            <strong>Card Number:</strong> 4242 4242 4242 4242
          </p>
          <p>
            <strong>Expiry:</strong> 12/25
          </p>
          <p>
            <strong>CVC:</strong> 123
          </p>
          <p className="mt-2 text-blue-600">
            Use any future expiry date and any 3-digit CVC for testing.
          </p>
        </div>
      </div>
    </form>
  );
}
