import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StepIndicator } from "../components/StepIndicator";
import { SelectionCard } from "../components/SelectionCard";

const materials = {
  tile: [
    {
      id: "marble",
      title: "White Marble",
      description: "Luxurious natural stone with elegant veining",
      image: "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hcmJsZSUyMGJhdGhyb29tJTIwdGlsZXxlbnwxfHx8fDE3NzUxMjU5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Premium",
    },
    {
      id: "subway",
      title: "Subway Tile",
      description: "Classic porcelain with timeless appeal",
      image: "https://images.unsplash.com/photo-1585145868197-46c43674375b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JjZWxhaW4lMjBzdWJ3YXklMjB0aWxlJTIwYmF0aHJvb218ZW58MXx8fHwxNzc1MTI1OTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Popular",
    },
    {
      id: "natural-stone",
      title: "Natural Stone",
      description: "Organic texture with earthy tones",
      image: "https://images.unsplash.com/photo-1749496223160-679300ae70b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3RvbmUlMjB0aWxlJTIwYmF0aHJvb218ZW58MXx8fHwxNzc1MTI1OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
  countertop: [
    {
      id: "quartz",
      title: "Quartz",
      description: "Durable engineered stone, low maintenance",
      image: "https://images.unsplash.com/photo-1771795638652-01821921a461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFydHolMjBjb3VudGVydG9wJTIwYmF0aHJvb218ZW58MXx8fHwxNzc1MTI1OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Popular",
    },
    {
      id: "marble-counter",
      title: "Marble",
      description: "Elegant natural stone with unique patterns",
      image: "https://images.unsplash.com/photo-1771681744660-d3ff70bc24a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBjb3VudGVydG9wJTIwYmF0aHJvb20lMjB2YW5pdHl8ZW58MXx8fHwxNzc1MTI1OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Luxury",
    },
    {
      id: "wood",
      title: "Wood",
      description: "Warm natural wood with modern finish",
      image: "https://images.unsplash.com/photo-1771681278446-6f8eb0c7323f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwYmF0aHJvb20lMjB2YW5pdHklMjBjb3VudGVydG9wfGVufDF8fHx8MTc3NTEyNTkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
};

const steps = ["Style", "Fixtures", "Materials", "Colors", "Summary"];

export function MaterialSelection() {
  const navigate = useNavigate();
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [selectedCountertop, setSelectedCountertop] = useState<string | null>(null);

  const isComplete = selectedTile && selectedCountertop;

  const handleContinue = () => {
    if (isComplete) {
      navigate("/colors");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/fixtures")}
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
      <StepIndicator currentStep={3} totalSteps={5} steps={steps} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#1A3A52] mb-4">
            Choose Your Materials
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Select premium materials that define your bathroom's character and ensure
            lasting beauty.
          </p>
        </motion.div>

        {/* Tile Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-[#1A3A52] mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#2A9D8F] text-white rounded-lg flex items-center justify-center text-sm font-bold">
              1
            </span>
            Wall & Floor Tile
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {materials.tile.map((tile, index) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <SelectionCard
                  title={tile.title}
                  description={tile.description}
                  image={tile.image}
                  selected={selectedTile === tile.id}
                  onClick={() => setSelectedTile(tile.id)}
                  badge={tile.badge}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Countertop Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#1A3A52] mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#2A9D8F] text-white rounded-lg flex items-center justify-center text-sm font-bold">
              2
            </span>
            Countertop
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {materials.countertop.map((counter, index) => (
              <motion.div
                key={counter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <SelectionCard
                  title={counter.title}
                  description={counter.description}
                  image={counter.image}
                  selected={selectedCountertop === counter.id}
                  onClick={() => setSelectedCountertop(counter.id)}
                  badge={counter.badge}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: isComplete ? 1.02 : 1 }}
            whileTap={{ scale: isComplete ? 0.98 : 1 }}
            onClick={handleContinue}
            disabled={!isComplete}
            className={`group px-12 py-5 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-3 ${
              isComplete
                ? "bg-[#2A9D8F] hover:bg-[#238b7f] text-white cursor-pointer"
                : "bg-[#E8E6E1] text-[#6B6B6B] cursor-not-allowed"
            }`}
          >
            Continue to Colors
            <ArrowRight
              className={`w-6 h-6 transition-transform ${
                isComplete ? "group-hover:translate-x-1" : ""
              }`}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
