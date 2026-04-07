import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { StepIndicator } from "../components/StepIndicator";
import { useDesign } from "../context/DesignContext";

interface ProductOption {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const PRODUCTS: ProductOption[] = [
  {
    id: "bathtub",
    title: "Bathtub",
    description: "Classic soaking tub for relaxation and comfort",
    imageUrl: "https://images.unsplash.com/photo-1575245122563-776ff6af7411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRodHViJTIwd2hpdGV8ZW58MXx8fHwxNzc1MTI2Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "shower",
    title: "Shower",
    description: "Modern walk-in shower with sleek glass enclosure",
    imageUrl: "https://images.unsplash.com/photo-1611066415956-91ab6f1f57cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxrJTIwaW4lMjBzaG93ZXIlMjBnbGFzc3xlbnwxfHx8fDE3NzUxMjY2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "walkin-tub",
    title: "Walk-in Tub",
    description: "Safe and accessible tub with easy entry and exit",
    imageUrl: "https://images.unsplash.com/photo-1633466157985-353c80c9d6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxrJTIwaW4lMjB0dWIlMjBhY2Nlc3NpYmxlfGVufDF8fHx8MTc3NTEyNjY3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function ProductSelection() {
  const navigate = useNavigate();
  const { updateSelections } = useDesign();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedProduct) {
      const product = PRODUCTS.find((p) => p.id === selectedProduct);
      if (product) {
        updateSelections({
          product: {
            id: product.id,
            title: product.title,
            description: product.description,
          },
        });
      }
      navigate("/tier");
    }
  };

  const steps = ["Location", "Product", "Style", "Fixtures", "Materials", "Colors"];

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Step Indicator */}
      <StepIndicator currentStep={2} totalSteps={6} steps={steps} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#1A3A52] mb-4">
              What's Your Primary Focus?
            </h1>
            <p className="text-lg text-[#6B6B6B]">
              Select the main feature for your bathroom renovation
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {PRODUCTS.map((product) => {
              const isSelected = selectedProduct === product.id;

              return (
                <motion.button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 text-left group ${
                    isSelected
                      ? "ring-4 ring-[#2A9D8F] shadow-2xl"
                      : selectedProduct
                      ? "opacity-50 hover:opacity-70"
                      : "hover:shadow-xl"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-[#E8E6E1]">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isSelected ? "scale-105" : "group-hover:scale-110"
                      }`}
                    />

                    {/* Selected Badge */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-4 right-4 w-12 h-12 bg-[#2A9D8F] rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-7 h-7 text-white" strokeWidth={3} />
                      </motion.div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                      isSelected ? "text-[#2A9D8F]" : "text-[#1A3A52]"
                    }`}>
                      {product.title}
                    </h3>
                    <p className="text-[#6B6B6B] leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Bottom Border Indicator */}
                  <div
                    className={`h-1 transition-all duration-300 ${
                      isSelected ? "bg-[#2A9D8F]" : "bg-transparent"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedProduct ? 1 : 0 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleContinue}
              disabled={!selectedProduct}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-12 py-5 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 flex items-center gap-3 ${
                selectedProduct
                  ? "bg-[#2A9D8F] hover:bg-[#238b7f] text-white cursor-pointer"
                  : "bg-[#E8E6E1] text-[#B0B0B0] cursor-not-allowed"
              }`}
            >
              Continue to Style Selection
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}