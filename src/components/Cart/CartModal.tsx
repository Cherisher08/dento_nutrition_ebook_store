import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Trash2 } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, getTotalPrice, getDiscountedPrice, getTotalDiscount, clearCart } =
    useCart();
  const [phone, setPhone] = useState("");
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [sentBooks, setSentBooks] = useState<string[]>([]);

  if (!isOpen) return null;

  const cleanPhoneNumber = (phone: string): string => {
    return phone.replace(/\s+/g, "").replace(/-/g, "");
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowPhoneModal(true);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = cleanPhoneNumber(phone);
    setShowPhoneModal(false);
    setPaymentStatus("loading");

    try {
      // Step 1: Create bulk order
      const orderRes = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          books: items.map((item) => ({
            book_id: item.bookId,
            quantity: item.quantity,
          })),
          phone_number: cleanedPhone,
        }),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        throw new Error(errorData.detail || "Failed to create order");
      }

      const order = await orderRes.json();

      // Step 2: Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "Dento Nutrition",
        description: `${items.length} book(s)`,
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
              }),
            });

            const result = await verifyRes.json();
            if (result.success) {
              setSentBooks(result.sent_books || items.map((i) => i.title));
              setPaymentStatus("success");
              setStatusMessage(
                result.message || "Payment successful! Check your WhatsApp for your books.",
              );
              clearCart();
            } else {
              throw new Error(result.message || "Verification failed");
            }
          } catch (err) {
            setPaymentStatus("error");
            setStatusMessage(
              err instanceof Error
                ? err.message
                : "Payment received but verification failed. Please contact support.",
            );
          }
        },
        modal: {
          ondismiss: () => {
            if (paymentStatus === "idle") {
              setPaymentStatus("idle");
            }
          },
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

  const handleCloseSuccess = () => {
    setPaymentStatus("idle");
    setSentBooks([]);
    setPhone("");
    onClose();
  };

  // Modal backdrop
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />

      {/* Main Cart Modal */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.bookId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-4 mb-3">
                    {item.coverImage && (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                      <p className="text-orange-600 font-bold">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.bookId)}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity Display (Read-Only) */}
                  <div className="text-sm font-semibold text-gray-700">Qty: {item.quantity}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            {getTotalDiscount() > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount:</span>
                <span>-₹{getTotalDiscount()}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
              <span>Total:</span>
              <span>₹{getDiscountedPrice()}</span>
            </div>
            {getTotalDiscount() > 0 && (
              <p className="text-xs text-green-600 text-center">
                You save ₹{getTotalDiscount()} with our multi-book discount!
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition cursor-pointer"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Phone Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Enter your WhatsApp number</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your {items.length} eBook(s) will be sent to this number after payment.
            </p>
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={setPhone}
                enableSearch={true}
                placeholder="Enter your WhatsApp number"
                inputClass="!w-full !rounded-lg"
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
                  disabled={!phone}
                  className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-lg text-sm transition cursor-pointer"
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
            {paymentStatus === "success" && sentBooks.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 text-left">
                <p className="font-semibold text-blue-900 text-sm mb-2">Books sent:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  {sentBooks.map((book, idx) => (
                    <li key={idx}>• {book}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={
                paymentStatus === "success" ? handleCloseSuccess : () => setPaymentStatus("idle")
              }
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm transition cursor-pointer"
            >
              {paymentStatus === "success" ? "Done" : "Close"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
