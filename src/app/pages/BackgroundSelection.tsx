import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

interface BackgroundOption {
  id: string;
  name: string;
  imageUrl: string;
}

const BACKGROUNDS: BackgroundOption[] = [
  {
    id: "modern-white",
    name: "Modern White",
    imageUrl: "https://images.unsplash.com/photo-1774578341998-d1e9a74e82f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMHdoaXRlJTIwY2xlYW58ZW58MXx8fHwxNzc1MTI2OTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "luxury-marble",
    name: "Luxury Marble",
    imageUrl: "https://images.unsplash.com/photo-1658760046471-896cbc719c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1hcmJsZXxlbnwxfHx8fDE3NzUwMzcxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "minimalist-spa",
    name: "Minimalist Spa",
    imageUrl: "https://images.unsplash.com/photo-1771239048293-72abf673adb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmF0aHJvb20lMjBzcGF8ZW58MXx8fHwxNzc1MTI2OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "contemporary-gray",
    name: "Contemporary Gray",
    imageUrl: "https://images.unsplash.com/photo-1722153148937-c7abc6cd3361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiYXRocm9vbSUyMGdyYXl8ZW58MXx8fHwxNzc1MTI2OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "natural-light",
    name: "Natural Light",
    imageUrl: "https://images.unsplash.com/photo-1727186434861-23e182dd4722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGludGVyaW9yJTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc3NTEyNjk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "elegant-beige",
    name: "Elegant Beige",
    imageUrl: "https://images.unsplash.com/photo-1760067537877-dd4d2722c649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmF0aHJvb20lMjBiZWlnZXxlbnwxfHx8fDE3NzUxMjY5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function BackgroundSelection() {
  const navigate = useNavigate();
  const [selectedBackground, setSelectedBackground] = useState(BACKGROUNDS[0].id);

  const currentBackground = BACKGROUNDS.find((bg) => bg.id === selectedBackground);

  const handleContinue = () => {
    navigate("/visualizer");
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex flex-col">
      {/* Header */}
      <div className="px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1A3A52] mb-3">
            Choose a room that matches your space
          </h1>
          <p className="text-lg text-[#6B6B6B]">
            Select the background that best represents your bathroom
          </p>
        </div>
      </div>

      {/* Main Preview */}
      <div className="flex-1 px-12 pb-6">
        <div className="max-w-7xl mx-auto h-full">
          <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden bg-white shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedBackground}
                src={currentBackground?.imageUrl}
                alt={currentBackground?.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Overlay Info Badge */}
            <motion.div
              key={`badge-${selectedBackground}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-4"
            >
              <p className="text-sm text-[#6B6B6B] mb-1">Current Selection</p>
              <p className="text-xl font-semibold text-[#1A3A52]">
                {currentBackground?.name}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="px-12 py-8 bg-white border-t border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-6">
            {/* Thumbnails */}
            <div className="flex-1 flex gap-4 overflow-x-auto pb-2">
              {BACKGROUNDS.map((background) => {
                const isSelected = selectedBackground === background.id;

                return (
                  <motion.button
                    key={background.id}
                    onClick={() => setSelectedBackground(background.id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 w-40 h-28 rounded-xl overflow-hidden transition-all duration-300 ${
                      isSelected
                        ? "ring-4 ring-[#2A9D8F] shadow-xl"
                        : "ring-1 ring-[#E8E6E1] hover:ring-2 hover:ring-[#2A9D8F]/50 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={background.imageUrl}
                      alt={background.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Name Label */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium truncate">
                        {background.name}
                      </p>
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="selectedThumbnail"
                        className="absolute inset-0 border-4 border-[#2A9D8F] rounded-xl pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Continue Button */}
            <motion.button
              onClick={handleContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 px-10 py-4 bg-[#2A9D8F] hover:bg-[#238b7f] text-white rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center gap-3"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
