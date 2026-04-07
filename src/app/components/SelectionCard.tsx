import { motion } from "motion/react";
import { Check } from "lucide-react";

interface SelectionCardProps {
  title: string;
  description?: string;
  image: string;
  selected?: boolean;
  onClick: () => void;
  badge?: string;
}

export function SelectionCard({
  title,
  description,
  image,
  selected = false,
  onClick,
  badge,
}: SelectionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${
        selected
          ? "ring-4 ring-[#2A9D8F] shadow-2xl"
          : "shadow-md hover:shadow-xl ring-1 ring-transparent hover:ring-[#E8E6E1]"
      }`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute top-4 left-4 bg-[#C9A961] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
            {badge}
          </div>
        )}
        {selected && (
          <div className="absolute top-4 right-4 w-10 h-10 bg-[#2A9D8F] rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#1A3A52] mb-2">{title}</h3>
        {description && (
          <p className="text-[#6B6B6B] leading-relaxed">{description}</p>
        )}
      </div>

      {/* Hover border effect */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{
          background: selected
            ? "linear-gradient(135deg, rgba(42, 157, 143, 0.1) 0%, rgba(42, 157, 143, 0) 100%)"
            : "linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(26, 58, 82, 0) 100%)",
        }}
      />
    </motion.div>
  );
}
