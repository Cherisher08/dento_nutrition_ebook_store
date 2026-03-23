import React, { useState } from "react";
import { type Book } from "../contexts/booksContext";
import { FileText, BookOpen, Check, Languages } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Extend window to include Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image?: string;
  prefill?: { contact?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
interface RazorpayInstance {
  open: () => void;
}

interface BookDetailProps {
  book: Book;
}

export const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const [phone, setPhone] = useState("");
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  const handleBuyClick = () => {
    setShowPhoneModal(true);
  };

  // Clean phone number: remove spaces, keep + and digits
  const cleanPhoneNumber = (phone: string): string => {
    return phone.replace(/\s+/g, "").replace(/-/g, "");
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = cleanPhoneNumber(phone);
    setShowPhoneModal(false);
    setPaymentStatus("loading");

    try {
      // Step 1: Create Razorpay order
      const orderRes = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book_id: book.id, phone_number: cleanedPhone }),
      });
      if (!orderRes.ok) throw new Error("Failed to create order");
      const order = await orderRes.json();

      // Step 2: Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "Dento Nutrition",
        description: book.title,
        image: "/logo.jpeg",
        prefill: { contact: cleanedPhone },
        handler: async (response: RazorpayResponse) => {
          // Step 3: Verify payment and send WhatsApp
          try {
            const verifyRes = await fetch(`${API_URL}/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                phone_number: cleanedPhone,
                book_id: book.id,
              }),
            });
            const result = await verifyRes.json();
            if (result.success) {
              setPaymentStatus("success");
              setStatusMessage(result.message || "Payment successful! Check your WhatsApp.");
            } else {
              throw new Error("Verification failed");
            }
          } catch {
            setPaymentStatus("error");
            setStatusMessage("Payment received but verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => setPaymentStatus("idle"),
        },
      });
      rzp.open();
    } catch (err) {
      setPaymentStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 mt-6">
      {/* Phone Number Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Enter your WhatsApp number</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your eBook will be sent to this number after payment.
            </p>
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={setPhone}
                enableSearch={true}
                placeholder="Enter your WhatsApp number"
                inputClass="!w-full !border !border-gray-300 !rounded-lg !px-3 !py-2 !text-sm !focus:outline-none !focus:ring-2 !focus:ring-orange-400"
                containerClass="!w-full"
                buttonClass="!border !border-gray-300 !border-r-0 !rounded-l-lg !bg-white !hover:bg-gray-50"
                dropdownClass="!bg-white !text-gray-900"
                preferredCountries={["in", "us", "gb", "ae", "ca", "au"]}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPhoneModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm transition cursor-pointer"
                >
                  Proceed to Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Status Modal */}
      {(paymentStatus === "success" || paymentStatus === "error") && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <div
              className={`text-4xl mb-3 ${paymentStatus === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {paymentStatus === "success" ? "✅" : "❌"}
            </div>
            <h3
              className={`text-lg font-bold mb-2 ${paymentStatus === "success" ? "text-green-700" : "text-red-700"}`}
            >
              {paymentStatus === "success" ? "Payment Successful!" : "Something went wrong"}
            </h3>
            <p className="text-gray-600 text-sm mb-5">{statusMessage}</p>
            <button
              onClick={() => setPaymentStatus("idle")}
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Left Column: Cover Image */}
      <div className="flex flex-col items-center">
        {book.cover_image ? (
          <div className="w-full max-w-sm aspect-4/5 rounded-2xl shadow-2xl overflow-hidden mb-8 transform transition-transform hover:scale-105 duration-300">
            <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className={`w-full max-w-sm aspect-3/4 rounded-2xl shadow-2xl ${book.coverColor} flex items-center justify-center p-8 mb-8 transform transition-transform hover:scale-105 duration-300`}
          >
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
              <p className="text-xl opacity-90 mb-4">{book.subtitle}</p>
              <p className="font-medium opacity-75">{book.author}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between w-full max-w-sm px-4">
          <div className="flex flex-col items-center">
            <Languages className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-600">{book.details.language}</span>
          </div>
          <div className="flex flex-col items-center">
            <FileText className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-600">
              {book.details.pages || "N/A"} Pages
            </span>
          </div>
          <div className="flex flex-col items-center">
            <BookOpen className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs font-semibold text-gray-600">{book.details.format}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-8 w-full max-w-sm">
          <button
            className="flex-1 py-3 px-6 rounded-xl cursor-pointer bg-cyan-200 font-bold text-gray-900 hover:bg-cyan-300 transition-colors shadow-sm disabled:opacity-60"
            onClick={handleBuyClick}
            disabled={paymentStatus === "loading"}
          >
            {paymentStatus === "loading" ? (
              "Processing…"
            ) : (
              <>
                Buy ₹{book.price}{" "}
                {book.originalPrice && (
                  <span className="line-through pl-2 text-gray-600">₹{book.originalPrice}</span>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Book Info */}
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{book.title}</h1>

        {book.rating && (
          <div className="flex items-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < Math.floor(book.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-500 font-medium">({book.reviews} ratings)</span>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About the eBook</h3>
          <p className="text-gray-600 leading-relaxed mb-6">{book.description}</p>
          <div className="space-y-3">
            {book.highlights?.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 p-1 rounded-full">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {book.editorNote && (
          <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
            <h4 className="font-bold text-pink-900 mb-2">Editor's Note</h4>
            <p className="text-blue-600 text-sm italic">"{book.editorNote}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
