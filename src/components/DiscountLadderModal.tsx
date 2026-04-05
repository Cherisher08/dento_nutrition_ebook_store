import React from "react";
import { X, Check, ChevronRight } from "lucide-react";

interface DiscountLadderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscountLadderModal: React.FC<DiscountLadderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Light Backdrop with Blur */}
      <div className="fixed inset-0 backdrop-blur-xs z-40 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
          {/* Header - Fixed */}
          <div className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white px-6 py-6 flex items-center justify-between flex-shrink-0 z-10">
            <div>
              <h2 className="text-2xl font-bold">Smart Savings</h2>
              <p className="text-emerald-50 text-sm mt-1">More books = More savings</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-emerald-700 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto flex-1 p-6 space-y-4">
            {/* Tier Breakdown */}
            <div className="space-y-3">
              {[1, 2, 4].map((itemCount) => {
                const isCombo = itemCount >= 2 && itemCount <= 3;
                const isFull = itemCount === 4;
                const discount = itemCount === 1 ? 0 : isCombo ? 100 : 200;

                return (
                  <div
                    key={itemCount}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      isFull
                        ? "bg-linear-to-r from-yellow-50 to-orange-50 border-orange-300 shadow-md"
                        : isCombo
                          ? "bg-linear-to-r from-emerald-50 to-cyan-50 border-emerald-300"
                          : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left side: Item count and label */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-flex items-center justify-center h-7 w-7 rounded-full font-bold text-sm ${
                              isFull
                                ? "bg-orange-500 text-white"
                                : isCombo
                                  ? "bg-emerald-500 text-white"
                                  : "bg-gray-300 text-gray-700"
                            }`}
                          >
                            {itemCount}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {itemCount === 1
                              ? "Single Book"
                              : itemCount <= 3
                                ? "2-3 Books"
                                : "Complete Bundle (All 4)"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 ml-9">
                          {itemCount === 1
                            ? "No discount"
                            : itemCount <= 3
                              ? "Best for starters"
                              : "Best value! Maximum savings"}
                        </p>
                      </div>

                      {/* Right side: Discount amount */}
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            isFull
                              ? "text-orange-600"
                              : isCombo
                                ? "text-emerald-600"
                                : "text-gray-400"
                          }`}
                        >
                          Save {discount === 0 ? "₹0" : `₹${discount}`}
                        </div>
                        {isFull && (
                          <div className="flex items-center gap-1 text-xs font-bold text-orange-600 mt-1 justify-end">
                            <Check className="h-3.5 w-3.5" />
                            Best Deal
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tier badge for full bundle */}
                    {isFull && (
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md">
                        ⭐ Premium
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Visual Flow */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">How it works</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-emerald-700">1</span>
                  </div>
                  <p>Add 2 books to your cart</p>
                </div>
                <div className="flex items-center gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-500 shrink-0" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-emerald-700">2</span>
                  </div>
                  <p>Automatic ₹100 discount applied</p>
                </div>
                <div className="flex items-center gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-500 shrink-0" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-orange-700">3</span>
                  </div>
                  <p>Add the 4th book for ₹200 total savings!</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer"
              >
                Start Shopping & Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
