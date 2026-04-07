import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useDesign } from "../context/DesignContext";

interface SKUOption {
  id: string;
  category: string;
  name: string;
  price: string;
  tier: "economic" | "luxury";
  imageUrl: string;
}

const SKU_OPTIONS: SKUOption[] = [
  // Bathtubs - Economic
  {
    id: "tub-classic",
    category: "Bathtub",
    name: "Classic Alcove Tub",
    price: "$1,299",
    tier: "economic",
    imageUrl: "https://images.unsplash.com/photo-1723015814159-685e9ed894a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYWxjb3ZlJTIwYmF0aHR1YnxlbnwxfHx8fDE3NzUxMzE0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "tub-standard",
    category: "Bathtub",
    name: "Standard Soaking Tub",
    price: "$1,799",
    tier: "economic",
    imageUrl: "https://images.unsplash.com/photo-1723015814159-685e9ed894a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYWxjb3ZlJTIwYmF0aHR1YnxlbnwxfHx8fDE3NzUxMzE0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  // Bathtubs - Luxury
  {
    id: "tub-modern",
    category: "Bathtub",
    name: "Modern Freestanding Tub",
    price: "$2,499",
    tier: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1773867567838-3292f16e4aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmcmVlc3RhbmRpbmclMjBiYXRodHViJTIwd2hpdGV8ZW58MXx8fHwxNzc1MTMxNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "tub-luxury",
    category: "Bathtub",
    name: "Luxury Soaking Tub",
    price: "$3,999",
    tier: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1773867567838-3292f16e4aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmcmVlc3RhbmRpbmclMjBiYXRodHViJTIwd2hpdGV8ZW58MXx8fHwxNzc1MTMxNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  // Fixtures - Economic
  {
    id: "fixture-chrome",
    category: "Fixtures",
    name: "Chrome Faucet Set",
    price: "$299",
    tier: "economic",
    imageUrl: "https://images.unsplash.com/photo-1773177930292-463ca3c5b86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbWUlMjBiYXRocm9vbSUyMGZhdWNldHxlbnwxfHx8fDE3NzUwNzIwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "fixture-nickel",
    category: "Fixtures",
    name: "Brushed Nickel Set",
    price: "$349",
    tier: "economic",
    imageUrl: "https://images.unsplash.com/photo-1773177930292-463ca3c5b86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbWUlMjBiYXRocm9vbSUyMGZhdWNldHxlbnwxfHx8fDE3NzUwNzIwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  // Fixtures - Luxury
  {
    id: "fixture-brass",
    category: "Fixtures",
    name: "Brass Faucet Set",
    price: "$449",
    tier: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1771681744660-d3ff70bc24a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGJhdGhyb29tJTIwZmF1Y2V0fGVufDF8fHx8MTc3NTA3MjAyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "fixture-black",
    category: "Fixtures",
    name: "Matte Black Faucet Set",
    price: "$599",
    tier: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1771681744660-d3ff70bc24a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGJhdGhyb29tJTIwZmF1Y2V0fGVufDF8fHx8MTc3NTA3MjAyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  // Wall Tiles - Economic
  {
    id: "tile-ceramic",
    category: "Wall Tiles",
    name: "Gray Ceramic Tiles",
    price: "$45/sq ft",
    tier: "economic",
    imageUrl: "https://images.unsplash.com/photo-1681752054467-e7132ed8b47e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwY2VyYW1pYyUyMHRpbGUlMjBiYXRocm9vbXxlbnwxfHx8fDE3NzUxMzE0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "tile-subway",
    category: "Wall Tiles",
    name: "Classic Subway Tiles",
    price: "$55/sq ft",
    tier: "economic",
    imageUrl: "https://images.unsplash.com/photo-1681752054467-e7132ed8b47e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwY2VyYW1pYyUyMHRpbGUlMjBiYXRocm9vbXxlbnwxfHx8fDE3NzUxMzE0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  // Wall Tiles - Luxury
  {
    id: "tile-marble",
    category: "Wall Tiles",
    name: "White Marble Tiles",
    price: "$89/sq ft",
    tier: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hcmJsZSUyMHRpbGUlMjBiYXRocm9vbXxlbnwxfHx8fDE3NzUxMzE0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "tile-stone",
    category: "Wall Tiles",
    name: "Natural Stone Tiles",
    price: "$129/sq ft",
    tier: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hcmJsZSUyMHRpbGUlMjBiYXRocm9vbXxlbnwxfHx8fDE3NzUxMzE0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  // Flooring - Economic
  {
    id: "floor-laminate",
    category: "Flooring",
    name: "Waterproof Laminate",
    price: "$12/sq ft",
    tier: "economic",
    imageUrl: "https://images.unsplash.com/photo-1581858726785-0d7353fd9461?q=80&w=500",
  },
  {
    id: "floor-vinyl",
    category: "Flooring",
    name: "Luxury Vinyl Plank",
    price: "$15/sq ft",
    tier: "economic",
    imageUrl: "https://images.unsplash.com/photo-1620626011761-9963d7521576?q=80&w=500",
  },
  // Flooring - Luxury
  {
    id: "floor-herringbone",
    category: "Flooring",
    name: "Herringbone Porcelain",
    price: "$35/sq ft",
    tier: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=500",
  },
  {
    id: "floor-slate",
    category: "Flooring",
    name: "Premium Slate Tile",
    price: "$45/sq ft",
    tier: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=500",
  },
];

export function ProductConfiguration() {
  const navigate = useNavigate();
  const { selections, updateSelections } = useDesign();
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: string;
  }>({});
  const [categoryTiers, setCategoryTiers] = useState<{
    [key: string]: "economic" | "luxury";
  }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const categories = Array.from(new Set(SKU_OPTIONS.map((s) => s.category)));

  // Check if user uploaded their own image
  const isUploadedImage = selections.background === "custom-upload";

  // Initialize tiers to economic for all categories
  if (Object.keys(categoryTiers).length === 0) {
    const initialTiers: { [key: string]: "economic" | "luxury" } = {};
    categories.forEach((cat) => {
      initialTiers[cat] = "economic";
    });
    setCategoryTiers(initialTiers);
  }

  const handleTierToggle = (category: string, tier: "economic" | "luxury") => {
    setCategoryTiers((prev) => ({
      ...prev,
      [category]: tier,
    }));
    // Clear selection for this category when tier changes
    setSelectedProducts((prev) => {
      const newSelections = { ...prev };
      delete newSelections[category];
      return newSelections;
    });
  };

  const handleProductSelect = (category: string, productId: string) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [category]: productId,
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsGenerating(false);
    setHasGenerated(true);
  };

  const handleContinue = () => {
    // Save selected products to context
    const products = Object.entries(selectedProducts).map(
      ([category, productId]) => {
        const product = SKU_OPTIONS.find((s) => s.id === productId);
        return {
          category,
          name: product?.name,
          price: product?.price,
          tier: product?.tier,
        };
      }
    );

    updateSelections({
      visualizer: {
        wallFinish: products.find((p) => p.category === "Wall Tiles")?.name || "",
        tubStyle: products.find((p) => p.category === "Bathtub")?.name || "",
        fixture: products.find((p) => p.category === "Fixtures")?.name || "",
        flooring: products.find((p) => p.category === "Flooring")?.name || "",
      },
    });

    navigate("/result");
  };

  const allCategoriesSelected = categories.every(
    (category) => selectedProducts[category]
  );

  // Always allow continuing, unless generating
  const canContinue = !isGenerating;

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E6E1]">
        <div className="max-w-[1600px] mx-auto py-4 px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#2A9D8F] tracking-[0.2em] uppercase">Step 04</span>
                <h1 className="text-xl font-bold text-[#1A3A52]">Product Configuration</h1>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 hidden md:block" />
              <p className="text-sm text-[#6B6B6B] hidden md:block italic">Customize your bathroom with premium selections</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="text-sm font-bold text-[#1A3A52] hover:underline"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Split Layout */}
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-73px)] overflow-hidden">
          {/* Left Panel - SKU Selection (25%) */}
          <div className="lg:col-span-3 bg-[#F5F4F0] p-6 overflow-y-auto border-r border-[#E8E6E1]">
            <div className="space-y-8">
              {categories.map((category) => {
                const currentTier = categoryTiers[category] || "economic";
                const filteredProducts = SKU_OPTIONS.filter(
                  (s) => s.category === category && s.tier === currentTier
                );

                return (
                  <div key={category}>
                    {/* Category Header with Tier Toggle */}
                    <div className="mb-4">
                      <h2 className="text-lg font-bold text-[#1A3A52] mb-3">
                        {category}
                      </h2>

                      {/* Tier Toggle */}
                      <div className="flex bg-white rounded-lg p-1 shadow-sm border border-[#E8E6E1]">
                        <button
                          onClick={() => handleTierToggle(category, "economic")}
                          className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                            currentTier === "economic"
                              ? "bg-[#2A9D8F] text-white"
                              : "text-[#6B6B6B] hover:bg-gray-50"
                          }`}
                        >
                          Economic
                        </button>
                        <button
                          onClick={() => handleTierToggle(category, "luxury")}
                          className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1 ${
                            currentTier === "luxury"
                              ? "bg-[#1A3A52] text-white"
                              : "text-[#6B6B6B] hover:bg-gray-50"
                          }`}
                        >
                          {currentTier === "luxury" && (
                            <Sparkles className="w-3 h-3" />
                          )}
                          Luxury
                        </button>
                      </div>
                    </div>

                    {/* Product Grid */}
                    <motion.div
                      key={`${category}-${currentTier}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {filteredProducts.map((product) => {
                        const isSelected =
                          selectedProducts[category] === product.id;

                        return (
                          <button
                            key={product.id}
                            onClick={() =>
                              handleProductSelect(category, product.id)
                            }
                            className={`group relative flex flex-col p-2 bg-white rounded-xl border-2 transition-all duration-200 text-left ${
                              isSelected
                                ? "border-[#2A9D8F] shadow-md"
                                : "border-transparent hover:border-gray-200 hover:shadow-sm"
                            }`}
                          >
                            <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100 mb-2 relative">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              {isSelected && (
                                <div className="absolute top-1 right-1 bg-[#2A9D8F] rounded-full p-0.5 shadow-sm z-10">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="px-1">
                              <p className="text-xs font-bold text-[#1A3A52] line-clamp-2 leading-tight mb-1">
                                {product.name}
                              </p>
                              <p className="text-[10px] text-[#2A9D8F] font-bold">
                                {product.price}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Preview (75%) */}
          <div className="lg:col-span-9 bg-white p-8 flex flex-col relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1A3A52]">Design Preview</h2>
                <p className="text-[#6B6B6B] text-sm">Real-time visualization of your selections</p>
              </div>

              {/* Generate/Regenerate button - ONLY for uploaded images */}
              {isUploadedImage && (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
                    isGenerating
                      ? "bg-[#E8E6E1] text-[#6B6B6B] cursor-wait"
                      : "bg-[#1A3A52] hover:bg-[#2A4A62] text-white shadow-lg shadow-[#1A3A52]/20"
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{hasGenerated ? "Regenerate AI Preview" : "Generate AI Preview"}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Preview Area */}
            <div className="flex-1 relative rounded-3xl overflow-hidden bg-[#F5F4F0] shadow-2xl mb-8 group">
              <div className="absolute inset-0">
                {isGenerating ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F4F0]">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-[#2A9D8F]/20 border-t-[#2A9D8F] rounded-full animate-spin mb-6"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#2A9D8F]" />
                    </div>
                    <p className="text-xl font-bold text-[#1A3A52]">Applying your choices...</p>
                    <p className="text-[#6B6B6B]">This will only take a few moments</p>
                  </div>
                ) : (
                  <motion.div
                    key={JSON.stringify(selectedProducts) + hasGenerated}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1700074817207-c55fc074a562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBiYXRocm9vbSUyMGJlZm9yZSUyMGFmdGVyJTIwcmVub3ZhdGlvbiUyMHJlbW9kZWx8ZW58MXx8fHwxNzc1MTMyMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Bathroom Preview"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay for uploaded image prompt */}
                    {isUploadedImage && !hasGenerated && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl text-center max-w-sm shadow-2xl">
                          <Sparkles className="w-10 h-10 text-[#2A9D8F] mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-[#1A3A52] mb-2">Ready to Visualize</h3>
                          <p className="text-sm text-[#6B6B6B] mb-6">Select your products then click Generate to see them in your space.</p>
                          <button 
                            onClick={handleGenerate}
                            className="w-full py-3 bg-[#2A9D8F] text-white rounded-xl font-bold"
                          >
                            Generate Now
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                {Object.keys(selectedProducts).length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {Object.entries(selectedProducts).map(([category, productId]) => {
                      const product = SKU_OPTIONS.find(s => s.id === productId);
                      return (
                        <div key={category} className="flex-shrink-0 bg-[#F5F4F0] px-4 py-2 rounded-full border border-[#E8E6E1] flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#2A9D8F] uppercase">{category}</span>
                          <span className="text-xs font-bold text-[#1A3A52]">{product?.name}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-[#6B6B6B]">Select products from the left to begin your customization.</p>
                )}
              </div>
              
              <button
                onClick={handleContinue}
                className="flex items-center gap-3 px-10 py-5 bg-[#2A9D8F] hover:bg-[#238b7f] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#2A9D8F]/20 transition-all hover:-translate-y-1 active:translate-y-0"
              >
                <span>View Final Design</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}