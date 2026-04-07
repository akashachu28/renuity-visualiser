import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { StepIndicator } from "../components/StepIndicator";
import { useDesign } from "../context/DesignContext";

interface TierOption {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  style: "essential" | "premium";
}

const TIERS: TierOption[] = [
  {
    id: "essential",
    title: "Essential",
    subtitle: "Budget-friendly quality",
    features: [
      "Quality fixtures and materials",
      "Classic design options",
      "Standard installation",
      "1-year warranty",
      "Professional consultation",
    ],
    style: "essential",
  },
  {
    id: "premium",
    title: "Premium",
    subtitle: "Luxury experience",
    features: [
      "High-end fixtures and materials",
      "Designer collections",
      "White-glove installation",
      "Lifetime warranty",
      "Dedicated design concierge",
      "Premium finishes available",
    ],
    style: "premium",
  },
];

export function TierSelection() {
  const navigate = useNavigate();
  const { updateSelections } = useDesign();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedTier) {
      const tier = TIERS.find((t) => t.id === selectedTier);
      if (tier) {
        updateSelections({
          tier: {
            id: tier.id,
            title: tier.title,
            subtitle: tier.subtitle,
          },
        });
      }
      navigate("/background");
    }
  };

  const steps = ["Location", "Product", "Tier", "Style", "Materials", "Colors"];

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Step Indicator */}
      <StepIndicator currentStep={3} totalSteps={6} steps={steps} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#1A3A52] mb-4">
              Choose Your Experience
            </h1>
            <p className="text-lg text-[#6B6B6B]">
              Select the tier that best fits your vision and budget
            </p>
          </div>

          {/* Tier Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              const isPremium = tier.style === "premium";

              return (
                <motion.button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-3xl overflow-hidden shadow-xl transition-all duration-300 text-left ${
                    isPremium
                      ? "bg-gradient-to-br from-[#1A3A52] to-[#2d5570]"
                      : "bg-white"
                  } ${
                    isSelected
                      ? isPremium
                        ? "ring-4 ring-[#C9A961] shadow-2xl"
                        : "ring-4 ring-[#2A9D8F] shadow-2xl"
                      : ""
                  }`}
                >
                  {/* Premium Glow Effect */}
                  {isPremium && (
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A961] rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2A9D8F] rounded-full blur-3xl" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative p-10">
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          {isPremium && (
                            <Sparkles className="w-6 h-6 text-[#C9A961]" />
                          )}
                          <h2
                            className={`text-3xl font-bold ${
                              isPremium ? "text-white" : "text-[#1A3A52]"
                            }`}
                          >
                            {tier.title}
                          </h2>
                        </div>
                        <p
                          className={`text-lg ${
                            isPremium ? "text-[#C9A961]" : "text-[#6B6B6B]"
                          }`}
                        >
                          {tier.subtitle}
                        </p>
                      </div>

                      {/* Selected Badge */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                            isPremium ? "bg-[#C9A961]" : "bg-[#2A9D8F]"
                          }`}
                        >
                          <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                      {tier.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isPremium
                                ? "bg-[#C9A961]/20"
                                : "bg-[#2A9D8F]/10"
                            }`}
                          >
                            <Check
                              className={`w-3.5 h-3.5 ${
                                isPremium ? "text-[#C9A961]" : "text-[#2A9D8F]"
                              }`}
                              strokeWidth={3}
                            />
                          </div>
                          <span
                            className={`${
                              isPremium ? "text-white/90" : "text-[#6B6B6B]"
                            }`}
                          >
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom Accent */}
                    <div
                      className={`mt-8 pt-6 border-t ${
                        isPremium ? "border-white/10" : "border-[#E8E6E1]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-medium ${
                            isPremium ? "text-white/70" : "text-[#6B6B6B]"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select this tier"}
                        </span>
                        <ArrowRight
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isSelected ? "translate-x-1" : ""
                          } ${
                            isPremium ? "text-[#C9A961]" : "text-[#2A9D8F]"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selection Border Indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="tierSelection"
                      className={`absolute inset-0 rounded-3xl pointer-events-none ${
                        isPremium
                          ? "ring-4 ring-[#C9A961]"
                          : "ring-4 ring-[#2A9D8F]"
                      }`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedTier ? 1 : 0 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleContinue}
              disabled={!selectedTier}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-12 py-5 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 flex items-center gap-3 ${
                selectedTier
                  ? "bg-[#2A9D8F] hover:bg-[#238b7f] text-white cursor-pointer"
                  : "bg-[#E8E6E1] text-[#B0B0B0] cursor-not-allowed"
              }`}
            >
              Continue to Style Selection
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Reassurance Text */}
          <p className="text-center text-sm text-[#6B6B6B] mt-8">
            You can upgrade or modify your selections at any time
          </p>
        </motion.div>
      </div>
    </div>
  );
}