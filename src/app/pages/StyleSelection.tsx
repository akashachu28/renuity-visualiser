import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StepIndicator } from "../components/StepIndicator";
import { SelectionCard } from "../components/SelectionCard";

const styles = [
  {
    id: "modern",
    title: "Modern",
    description: "Clean lines, minimalist design, and sleek fixtures",
    image: "https://images.unsplash.com/photo-1774578341998-d1e9a74e82f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYmF0aHJvb20lMjB3aGl0ZXxlbnwxfHx8fDE3NzUwNDg1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Popular",
  },
  {
    id: "traditional",
    title: "Traditional",
    description: "Classic elegance with timeless details and warm finishes",
    image: "https://images.unsplash.com/photo-1769356814886-abdadde25ea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNsYXNzaWMlMjBiYXRocm9vbSUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1MTI1ODY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "transitional",
    title: "Transitional",
    description: "Perfect blend of modern and traditional aesthetics",
    image: "https://images.unsplash.com/photo-1682817240020-f4f447888af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2l0aW9uYWwlMjBiYXRocm9vbSUyMG5ldXRyYWwlMjB0b25lc3xlbnwxfHx8fDE3NzUxMjU4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "contemporary",
    title: "Contemporary Spa",
    description: "Resort-inspired luxury with calming natural elements",
    image: "https://images.unsplash.com/photo-1652903761255-4fbf11cff931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBzcGElMjBiYXRocm9vbXxlbnwxfHx8fDE3NzUxMjU4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const steps = ["Style", "Fixtures", "Materials", "Colors", "Summary"];

export function StyleSelection() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedStyle) {
      navigate("/fixtures");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
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

          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={1} totalSteps={5} steps={steps} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#1A3A52] mb-4">
            Choose Your Style
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Select a design style that resonates with your vision. This will guide
            the rest of your selections.
          </p>
        </motion.div>

        {/* Style Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {styles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <SelectionCard
                title={style.title}
                description={style.description}
                image={style.image}
                selected={selectedStyle === style.id}
                onClick={() => setSelectedStyle(style.id)}
                badge={style.badge}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: selectedStyle ? 1.02 : 1 }}
            whileTap={{ scale: selectedStyle ? 0.98 : 1 }}
            onClick={handleContinue}
            disabled={!selectedStyle}
            className={`group px-12 py-5 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center gap-3 ${
              selectedStyle
                ? "bg-[#2A9D8F] hover:bg-[#238b7f] text-white cursor-pointer"
                : "bg-[#E8E6E1] text-[#6B6B6B] cursor-not-allowed"
            }`}
          >
            Continue to Fixtures
            <ArrowRight
              className={`w-6 h-6 transition-transform ${
                selectedStyle ? "group-hover:translate-x-1" : ""
              }`}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
