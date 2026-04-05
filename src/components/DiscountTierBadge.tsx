import React, { useState } from "react";
import { Gift } from "lucide-react";

interface DiscountTierBadgeProps {
  onShowLadder?: () => void;
  compact?: boolean;
}

export const DiscountTierBadge: React.FC<DiscountTierBadgeProps> = ({
  onShowLadder,
  compact = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (compact) {
    return (
      <div
        className="inline-flex w-fit items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onShowLadder}
      >
        <Gift className="h-3.5 w-3.5" />
        <span>Save up to ₹200</span>
      </div>
    );
  }

  return (
    <button
      onClick={onShowLadder}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg transition-all transform hover:scale-105 cursor-pointer shadow-lg"
    >
      <div className="flex items-center gap-2">
        <Gift className="h-5 w-5" />
        <span>Bundle & Save</span>
      </div>

      {isHovered && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded whitespace-nowrap z-50">
          Click to see savings breakdown
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </button>
  );
};
