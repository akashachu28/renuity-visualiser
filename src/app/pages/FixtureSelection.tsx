import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StepIndicator } from "../components/StepIndicator";
import { SelectionCard } from "../components/SelectionCard";

const fixtures = {
  vanity: [
    {
      id: "single-floating",
      title: "Single Floating Vanity",
      description: "Modern wall-mounted design, maximizes floor space",
      image: "https://images.unsplash.com/photo-1771239048280-0724031de3a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9hdGluZyUyMGJhdGhyb29tJTIwdmFuaXR5JTIwbW9kZXJufGVufDF8fHx8MTc3NTEyNTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Popular",
    },
    {
      id: "double-vanity",
      title: "Double Vanity",
      description: "Spacious marble countertop with dual sinks",
      image: "https://images.unsplash.com/photo-1716078107416-4b9a5dc765dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGRvdWJsZSUyMHZhbml0eSUyMG1hcmJsZXxlbnwxfHx8fDE3NzUxMjU4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
  bathtub: [
    {
      id: "freestanding",
      title: "Freestanding Tub",
      description: "Elegant centerpiece with sculptural presence",
      image: "https://images.unsplash.com/photo-1765766600820-58eaf8687f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlc3RhbmRpbmclMjBiYXRodHViJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzUxMjU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Luxury",
    },
    {
      id: "tub-shower-combo",
      title: "Tub/Shower Combo",
      description: "Space-efficient dual functionality",
      image: "https://images.unsplash.com/photo-1554861147-9428266de650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGJhdGh0dWIlMjBzaG93ZXIlMjBjb21ib3xlbnwxfHx8fDE3NzUxMjU4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
  shower: [
    {
      id: "walk-in-glass",
      title: "Walk-In Glass Shower",
      description: "Frameless glass with premium rainfall head",
      image: "https://images.unsplash.com/photo-1669825009869-5ac1e1505a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxrLWluJTIwc2hvd2VyJTIwZ2xhc3MlMjBkb29yfGVufDF8fHx8MTc3NTEyNTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Premium",
    },
    {
      id: "rainfall-shower",
      title: "Rainfall Shower",
      description: "Spa-inspired luxury with multiple spray options",
      image: "https://images.unsplash.com/photo-1771929662486-f793e08f0f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluZmFsbCUyMHNob3dlciUyMGhlYWQlMjBiYXRocm9vbXxlbnwxfHx8fDE3NzUxMjU4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
};

const steps = ["Style", "Fixtures", "Materials", "Colors", "Summary"];

export function FixtureSelection() {
  const navigate = useNavigate();
  const [selectedVanity, setSelectedVanity] = useState<string | null>(null);
  const [selectedBathtub, setSelectedBathtub] = useState<string | null>(null);
  const [selectedShower, setSelectedShower] = useState<string | null>(null);

  const isComplete = selectedVanity && (selectedBathtub || selectedShower);

  const handleContinue = () => {
    if (isComplete) {
      navigate("/materials");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E6E1]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/style")}
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
      <StepIndicator currentStep={2} totalSteps={5} steps={steps} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#1A3A52] mb-4">
            Select Your Fixtures
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Choose the key fixtures for your bathroom. Select a vanity and at least
            one bathing option.
          </p>
        </motion.div>

        {/* Vanity Section */}
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
            Vanity
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {fixtures.vanity.map((vanity, index) => (
              <motion.div
                key={vanity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <SelectionCard
                  title={vanity.title}
                  description={vanity.description}
                  image={vanity.image}
                  selected={selectedVanity === vanity.id}
                  onClick={() => setSelectedVanity(vanity.id)}
                  badge={vanity.badge}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bathtub Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-[#1A3A52] mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#2A9D8F] text-white rounded-lg flex items-center justify-center text-sm font-bold">
              2
            </span>
            Bathtub <span className="text-base font-normal text-[#6B6B6B]">(Optional)</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {fixtures.bathtub.map((tub, index) => (
              <motion.div
                key={tub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <SelectionCard
                  title={tub.title}
                  description={tub.description}
                  image={tub.image}
                  selected={selectedBathtub === tub.id}
                  onClick={() => setSelectedBathtub(tub.id)}
                  badge={tub.badge}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shower Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#1A3A52] mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#2A9D8F] text-white rounded-lg flex items-center justify-center text-sm font-bold">
              3
            </span>
            Shower <span className="text-base font-normal text-[#6B6B6B]">(Optional)</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {fixtures.shower.map((shower, index) => (
              <motion.div
                key={shower.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <SelectionCard
                  title={shower.title}
                  description={shower.description}
                  image={shower.image}
                  selected={selectedShower === shower.id}
                  onClick={() => setSelectedShower(shower.id)}
                  badge={shower.badge}
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
            Continue to Materials
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
