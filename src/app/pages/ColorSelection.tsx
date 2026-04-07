import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { StepIndicator } from "../components/StepIndicator";

const colorPalettes = [
  {
    id: "serene-whites",
    name: "Serene Whites",
    description: "Crisp, clean, and timeless",
    colors: ["#FFFFFF", "#F5F5F5", "#E8E8E8", "#C9C9C9"],
    badge: "Popular",
  },
  {
    id: "warm-neutrals",
    name: "Warm Neutrals",
    description: "Cozy beige and soft taupe tones",
    colors: ["#F5F0E8", "#E6DDD0", "#D4C5B0", "#B8A793"],
  },
  {
    id: "coastal-blues",
    name: "Coastal Blues",
    description: "Calming ocean-inspired hues",
    colors: ["#E8F4F8", "#B8D8E6", "#7BB5D4", "#4A8FAF"],
  },
  {
    id: "spa-greens",
    name: "Spa Greens",
    description: "Refreshing natural tones",
    colors: ["#E8F3ED", "#C5DDD1", "#8FB8A0", "#5A9577"],
    badge: "Trending",
  },
  {
    id: "modern-grays",
    name: "Modern Grays",
    description: "Sophisticated charcoal palette",
    colors: ["#F0F0F0", "#D1D1D1", "#8E8E8E", "#4A4A4A"],
  },
  {
    id: "elegant-darks",
    name: "Elegant Darks",
    description: "Bold navy and deep charcoal",
    colors: ["#2C3E50", "#34495E", "#1A2B3C", "#0F1922"],
    badge: "Bold",
  },
];

const steps = ["Style", "Fixtures", "Materials", "Colors", "Summary"];

interface ColorPaletteCardProps {
  palette: typeof colorPalettes[0];
  selected: boolean;
  onClick: () => void;
}

function ColorPaletteCard({ palette, selected, onClick }: ColorPaletteCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 p-6 ${
        selected
          ? "ring-4 ring-[#2A9D8F] shadow-2xl"
          : "shadow-md hover:shadow-xl ring-1 ring-transparent hover:ring-[#E8E6E1]"
      }`}
    >
      {/* Badge */}
      {palette.badge && (
        <div className="absolute top-4 right-4 bg-[#C9A961] text-white px-3 py-1 rounded-full text-xs font-medium">
          {palette.badge}
        </div>
      )}

      {/* Selected Check */}
      {selected && (
        <div className="absolute top-4 left-4 w-8 h-8 bg-[#2A9D8F] rounded-full flex items-center justify-center shadow-lg">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Color Swatches */}
      <div className="flex gap-2 mb-6 mt-8">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 h-24 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold text-[#1A3A52] mb-2">
          {palette.name}
        </h3>
        <p className="text-[#6B6B6B]">{palette.description}</p>
      </div>

      {/* Hover effect */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{
          background: selected
            ? "linear-gradient(135deg, rgba(42, 157, 143, 0.05) 0%, rgba(42, 157, 143, 0) 100%)"
            : "linear-gradient(135deg, rgba(26, 58, 82, 0.03) 0%, rgba(26, 58, 82, 0) 100%)",
        }}
      />
    </motion.div>
  );
}

export function ColorSelection() {
  const navigate = useNavigate();
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedPalette) {
      navigate("/summary");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/materials")}
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A3A52] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A3A52] rounded-lg flex items-center justify-center">
              <span className="text-sm font-semibold text-white">R</span>
            </div>
            <span className="text-xl font-semibold text-[#1A3A52]">Renuity</span>
          </div>

          <div className="w-20" />
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={4} totalSteps={5} steps={steps} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#1A3A52] mb-4">
            Select Your Color Palette
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Choose a harmonious color scheme that brings your bathroom vision to life.
          </p>
        </motion.div>

        {/* Color Palette Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {colorPalettes.map((palette, index) => (
            <motion.div
              key={palette.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <ColorPaletteCard
                palette={palette}
                selected={selectedPalette === palette.id}
                onClick={() => setSelectedPalette(palette.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: selectedPalette ? 1.02 : 1 }}
            whileTap={{ scale: selectedPalette ? 0.98 : 1 }}
            onClick={handleContinue}
            disabled={!selectedPalette}
            className={`group px-12 py-5 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-3 ${
              selectedPalette
                ? "bg-[#2A9D8F] hover:bg-[#238b7f] text-white cursor-pointer"
                : "bg-[#E8E6E1] text-[#6B6B6B] cursor-not-allowed"
            }`}
          >
            View Your Design
            <ArrowRight
              className={`w-6 h-6 transition-transform ${
                selectedPalette ? "group-hover:translate-x-1" : ""
              }`}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
