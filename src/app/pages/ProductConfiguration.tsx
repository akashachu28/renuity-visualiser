import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, ArrowRight, Sparkles, Loader2, X } from "lucide-react";
import { useDesign } from "../context/DesignContext";

interface SKUOption {
  id: string;
  category: string;
  name: string;
  price: string;
  tier: "economic" | "luxury";
  imageUrl: string;
  imageUrlGolden?: string; // Optional golden/ivory variant
}

const SKU_OPTIONS: SKUOption[] = [
  // Bathtubs - Economic
  {
    id: "tub-classic",
    category: "Bathtub",
    name: "Classic Alcove Tub",
    price: "$1,299",
    tier: "economic",
    imageUrl: "/assets/bathtub1_white.png",
    imageUrlGolden: "/assets/bathtub1_ivory.png",
  },
  {
    id: "tub-standard",
    category: "Bathtub",
    name: "Standard Soaking Tub",
    price: "$1,799",
    tier: "economic",
    imageUrl: "/assets/bathtub2_white.png",
    imageUrlGolden: "/assets/bathtub2_ivory.png",
  },
  // Bathtubs - Luxury
  {
    id: "tub-modern",
    category: "Bathtub",
    name: "Modern Freestanding Tub",
    price: "$2,499",
    tier: "luxury",
    imageUrl: "/assets/bathtub1_white.png",
    imageUrlGolden: "/assets/bathtub1_ivory.png",
  },
  {
    id: "tub-luxury",
    category: "Bathtub",
    name: "Luxury Soaking Tub",
    price: "$3,999",
    tier: "luxury",
    imageUrl: "/assets/bathtub2_white.png",
    imageUrlGolden: "/assets/bathtub2_ivory.png",
  },
  // Faucet - Economic
  {
    id: "fixture-chrome",
    category: "Faucet",
    name: "Chrome Faucet Set",
    price: "$299",
    tier: "economic",
    imageUrl: "/assets/shower2_silver.png",
    imageUrlGolden: "/assets/shower2_gold.png"
  },
  {
    id: "fixture-nickel",
    category: "Faucet",
    name: "Brushed Nickel Set",
    price: "$349",
    tier: "economic",
    imageUrl: "/assets/shower1_silver.png",
    imageUrlGolden: "/assets/shower1_gold.png"
  },
  // Faucet - Luxury
  {
    id: "fixture-brass",
    category: "Faucet",
    name: "Brass Faucet Set",
    price: "$449",
    tier: "luxury",
    imageUrl: "/assets/shower2_silver.png",
    imageUrlGolden: "/assets/shower2_gold.png"
  },
  {
    id: "fixture-black",
    category: "Faucet",
    name: "Matte Black Faucet Set",
    price: "$599",
    tier: "luxury",
    imageUrl: "/assets/shower1_silver.png",
    imageUrlGolden: "/assets/shower1_gold.png"
  },
  // Curtain - Economic
  {
    id: "tile-ceramic",
    category: "Curtain",
    name: "Gray Normal Curtain",
    price: "$45/sq ft",
    tier: "economic",
    imageUrl: "/assets/curtains_silver.png",
    imageUrlGolden: "/assets/curtains_golden.png"
  },
  {
    id: "tile-subway",
    category: "Curtain",
    name: "Classic Silver Curtain",
    price: "$55/sq ft",
    tier: "economic",
    imageUrl: "/assets/curtains_silver.png",
    imageUrlGolden: "/assets/curtains_golden.png"
  },
  // Curtain - Luxury
  {
    id: "tile-marble",
    category: "Curtain",
    name: "White Curtain",
    price: "$89/sq ft",
    tier: "luxury",
    imageUrl: "/assets/curtains_silver.png",
    imageUrlGolden: "/assets/curtains_golden.png"
  },
  {
    id: "tile-stone",
    category: "Curtain",
    name: "Natural Stone Curtain",
    price: "$129/sq ft",
    tier: "luxury",
    imageUrl: "/assets/curtains_silver.png",
    imageUrlGolden: "/assets/curtains_golden.png"
  },
  // Door - Economic
  {
    id: "floor-laminate",
    category: "Door",
    name: "Classic Silver Door",
    price: "$12/sq ft",
    tier: "economic",
    imageUrl: "/assets/window_silver.png",
    imageUrlGolden: "/assets/window_gold.png"
  },
  {
    id: "floor-vinyl",
    category: "Door",
    name: "Ellegance Door",
    price: "$15/sq ft",
    tier: "economic",
    imageUrl: "/assets/window_silver.png",
    imageUrlGolden: "/assets/window_gold.png"
  },
  // Door - Luxury
  {
    id: "floor-herringbone",
    category: "Door",
    name: "Herringbone Door",
    price: "$35/sq ft",
    tier: "luxury",
    imageUrl: "/assets/window_silver.png",
    imageUrlGolden: "/assets/window_gold.png"
  },
  {
    id: "floor-slate",
    category: "Door",
    name: "Premium Slate Door",
    price: "$45/sq ft",
    tier: "luxury",
    imageUrl: "/assets/window_silver.png",
    imageUrlGolden: "/assets/window_gold.png"
  },
  // Wall - Economic
  {
    id: "wall-classic",
    category: "Wall",
    name: "Classic Wall Finish",
    price: "$25/sq ft",
    tier: "economic",
    imageUrl: "/assets/wall1.png",
    imageUrlGolden: "/assets/wall1Gold.png"
  },
  {
    id: "wall-modern",
    category: "Wall",
    name: "Modern Wall Finish",
    price: "$35/sq ft",
    tier: "economic",
    imageUrl: "/assets/wall2.png",
    imageUrlGolden: "/assets/wall2Gold.png"
  },
  // Wall - Luxury
  {
    id: "wall-premium",
    category: "Wall",
    name: "Premium Wall Finish",
    price: "$55/sq ft",
    tier: "luxury",
    imageUrl: "/assets/wall1.png",
    imageUrlGolden: "/assets/wall1Gold.png"
  },
  {
    id: "wall-designer",
    category: "Wall",
    name: "Designer Wall Finish",
    price: "$75/sq ft",
    tier: "luxury",
    imageUrl: "/assets/wall2.png",
    imageUrlGolden: "/assets/wall2Gold.png"
  },
  // Ceiling - Economic
  {
    id: "ceiling-standard",
    category: "Ceiling",
    name: "Standard Ceiling",
    price: "$18/sq ft",
    tier: "economic",
    imageUrl: "/assets/top.png",
    imageUrlGolden: "/assets/topGold.png"
  },
  {
    id: "ceiling-smooth",
    category: "Ceiling",
    name: "Smooth Ceiling",
    price: "$22/sq ft",
    tier: "economic",
    imageUrl: "/assets/top.png",
    imageUrlGolden: "/assets/topGold.png"
  },
  // Ceiling - Luxury
  {
    id: "ceiling-premium",
    category: "Ceiling",
    name: "Premium Ceiling",
    price: "$38/sq ft",
    tier: "luxury",
    imageUrl: "/assets/top.png",
    imageUrlGolden: "/assets/topGold.png"
  },
  {
    id: "ceiling-designer",
    category: "Ceiling",
    name: "Designer Ceiling",
    price: "$52/sq ft",
    tier: "luxury",
    imageUrl: "/assets/top.png",
    imageUrlGolden: "/assets/topGold.png"
  },
];

export function ProductConfiguration() {
  const navigate = useNavigate();
  const { selections, updateSelections } = useDesign();
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: string;
  }>({});
  const [selectedColors, setSelectedColors] = useState<{
    [key: string]: "white" | "golden";
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
    setSelectedProducts((prev) => {
      // If clicking the same product, deselect it
      if (prev[category] === productId) {
        const newSelections = { ...prev };
        delete newSelections[category];
        return newSelections;
      }
      // Otherwise, select the new product
      return {
        ...prev,
        [category]: productId,
      };
    });
    // Set default color to white when product is selected
    if (!selectedColors[productId]) {
      setSelectedColors((prev) => ({
        ...prev,
        [productId]: "white",
      }));
    }
  };

  const handleColorSelect = (productId: string, color: "white" | "golden", category: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
    // Automatically select the product when color is clicked
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
      },
    );

    // Save selected products with their images and colors
    const selectedProductsData: {
      [category: string]: {
        id: string;
        name: string;
        imageUrl: string;
        color: "white" | "golden";
      };
    } = {};

    Object.entries(selectedProducts).forEach(([category, productId]) => {
      const product = SKU_OPTIONS.find((s) => s.id === productId);
      const color = selectedColors[productId] || "white";
      const imageUrl = color === "golden" && product?.imageUrlGolden
        ? product.imageUrlGolden
        : product?.imageUrl || "";

      if (product) {
        selectedProductsData[category] = {
          id: productId,
          name: product.name,
          imageUrl,
          color,
        };
      }
    });

    updateSelections({
      visualizer: {
        wallFinish: products.find((p) => p.category === "Curtain")?.name || "",
        tubStyle: products.find((p) => p.category === "Bathtub")?.name || "",
        fixture: products.find((p) => p.category === "Faucet")?.name || "",
        flooring: products.find((p) => p.category === "Door")?.name || "",
      },
      selectedProductsData,
    });

    navigate("/result");
  };

  const allCategoriesSelected = categories.every(
    (category) => selectedProducts[category],
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
                <span className="text-[10px] font-bold text-[#2A9D8F] tracking-[0.2em] uppercase">
                  Step 04
                </span>
                <h1 className="text-xl font-bold text-[#1A3A52]">
                  Product Configuration
                </h1>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 hidden md:block" />
              <p className="text-sm text-[#6B6B6B] hidden md:block italic">
                Customize your bathroom with premium selections
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/room")}
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
                  (s) => s.category === category && s.tier === currentTier,
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
                          {/* {currentTier === "luxury" && (
                            <Sparkles className="w-3 h-3" />
                          )} */}
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
                        const selectedColor =
                          selectedColors[product.id] || "white";
                        const displayImageUrl =
                          selectedColor === "golden" && product.imageUrlGolden
                            ? product.imageUrlGolden
                            : product.imageUrl;

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
                                src={displayImageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              {isSelected && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductSelect(category, product.id);
                                  }}
                                  className="absolute top-1 right-1 bg-[#2A9D8F] hover:bg-[#1A3A52] rounded-full p-[1px] shadow-sm z-10 transition-colors"
                                  title="Deselect"
                                >
                                  <X className="w-3 h-3 text-white" />
                                </button>
                              )}
                            </div>
                            <div className="px-1">
                              <p className="text-xs font-bold text-[#1A3A52] line-clamp-2 leading-tight mb-1">
                                {product.name}
                              </p>
                              <p className="text-[10px] text-[#2A9D8F] font-bold mb-2">
                                {product.price}
                              </p>

                              {/* Color Selection */}
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] text-[#6B6B6B] font-medium">
                                  Color:
                                </span>
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleColorSelect(product.id, "white", category);
                                    }}
                                    className={`w-4 h-4 rounded-full bg-gradient-to-br from-[#ffffff] to-[#f4f3f0] border-1 transition-all ${
                                      selectedColors[product.id] === "white"
                                        ? "border-[#2A9D8F] ring-2 ring-[#2A9D8F]/30"
                                        : "border-gray-300 hover:border-gray-400"
                                    }`}
                                    title="White"
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleColorSelect(product.id, "golden", category);
                                    }}
                                    className={`w-4 h-4 rounded-full bg-gradient-to-br from-[#FEFAE6] to-[#DACFAB] border-1 transition-all ${
                                      selectedColors[product.id] === "golden"
                                        ? "border-[#2A9D8F] ring-2 ring-[#2A9D8F]/30"
                                        : "border-[#d5ccb5] hover:border-[#c1b390]"
                                    }`}
                                    title="Golden"
                                  />
                                </div>
                              </div>
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[20px] font-bold text-[#1A3A52]">
                  Design Preview
                </h2>
                <p className="text-[#6B6B6B] text-[12px]">
                  Real-time visualization of your selections
                </p>
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
                      <span>
                        {hasGenerated
                          ? "Regenerate AI Preview"
                          : "Generate AI Preview"}
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Preview Area */}
            <div className="flex-1 relative rounded-3xl overflow-hidden bg-[#F5F4F0] shadow-2xl mb-4 group">
              <div className="absolute inset-0">
                {isGenerating ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F4F0]">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-[#2A9D8F]/20 border-t-[#2A9D8F] rounded-full animate-spin mb-6"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#2A9D8F]" />
                    </div>
                    <p className="text-xl font-bold text-[#1A3A52]">
                      Applying your choices...
                    </p>
                    <p className="text-[#6B6B6B]">
                      This will only take a few moments
                    </p>
                  </div>
                ) : (
                  <motion.div
                    key={JSON.stringify(selectedProducts) + hasGenerated}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex justify-center items-center relative"
                  >
                    {/* Container with fixed aspect ratio */}
                    <div className="relative inline-block">
                      {/* Background Image - Relative Container */}
                      <img
                        src="/assets/staticBG.png"
                        alt="Bathroom Preview"
                        className="object-contain block"
                        style={{ width: '1000px', height: '475px' }}
                      />

                      {/* Overlay Selected Bathtub */}
                      {selectedProducts["Bathtub"] && (() => {
                        const selectedBathtub = SKU_OPTIONS.find(
                          (s) => s.id === selectedProducts["Bathtub"]
                        );
                        const selectedColor = selectedColors[selectedProducts["Bathtub"]] || "white";
                        const bathtubImageUrl = selectedColor === "golden" && selectedBathtub?.imageUrlGolden
                          ? selectedBathtub.imageUrlGolden
                          : selectedBathtub?.imageUrl;

                        return (
                          <motion.img
                            key={selectedProducts["Bathtub"] + selectedColor}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            src={bathtubImageUrl}
                            alt="Selected Bathtub"
                            className="absolute pointer-events-none object-contain"
                            style={{
                              top: '-19%',
                              left: '14.5%',
                              width: '71.5%',
                              height: 'auto',
                              zIndex: 2
                            }}
                          />
                        );
                      })()}

                          {/* Overlay Selected Faucet */}
                          {selectedProducts["Faucet"] && (() => {
                            const selectedFixture = SKU_OPTIONS.find(
                              (s) => s.id === selectedProducts["Faucet"]
                            );
                            const selectedColor = selectedColors[selectedProducts["Faucet"]] || "white";
                            const fixtureImageUrl = selectedColor === "golden" && selectedFixture?.imageUrlGolden
                              ? selectedFixture.imageUrlGolden
                              : selectedFixture?.imageUrl;

                            return (
                              <motion.img
                                key={selectedProducts["Faucet"] + selectedColor}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                src={fixtureImageUrl}
                                alt="Selected Fixture"
                                className="absolute pointer-events-none"
                                style={{
                                  top: '0%',
                                  right: '15%',
                                  width: '70%',
                                  height: '90%',
                                  zIndex: 2,
                                  objectFit: 'fill'
                                }}
                              />
                            );
                          })()}

                          {/* Overlay Selected Curtain */}
                          {selectedProducts["Curtain"] && (() => {
                            const selectedCurtain = SKU_OPTIONS.find(
                              (s) => s.id === selectedProducts["Curtain"]
                            );
                            const selectedColor = selectedColors[selectedProducts["Curtain"]] || "white";
                            const curtainImageUrl = selectedColor === "golden" && selectedCurtain?.imageUrlGolden
                              ? selectedCurtain.imageUrlGolden
                              : selectedCurtain?.imageUrl;

                            return (
                              <motion.img
                                key={selectedProducts["Curtain"] + selectedColor}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                src={curtainImageUrl}
                                alt="Selected Curtain"
                                className="absolute pointer-events-none object-contain"
                                style={{
                                  top: '-14%',
                                  left: '14.5%',
                                  width: '71%',
                                  height: 'auto',
                                  zIndex: 5
                                }}
                              />
                            );
                          })()}

                          {/* Overlay Selected Door */}
                          {selectedProducts["Door"] && (() => {
                            const selectedWindow = SKU_OPTIONS.find(
                              (s) => s.id === selectedProducts["Door"]
                            );
                            const selectedColor = selectedColors[selectedProducts["Door"]] || "white";
                            const windowImageUrl = selectedColor === "golden" && selectedWindow?.imageUrlGolden
                              ? selectedWindow.imageUrlGolden
                              : selectedWindow?.imageUrl;

                            return (
                              <motion.img
                                key={selectedProducts["Door"] + selectedColor}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                src={windowImageUrl}
                                alt="Selected Door"
                                className="absolute pointer-events-none"
                                style={{
                                  top: '-3%',
                                  left: '14.6%',
                                  width: '71%',
                                  height: '95%',
                                  objectFit: 'fill',
                                  zIndex: 10
                                }}
                              />
                            );
                          })()}

                          {/* Overlay Selected Wall */}
                          {selectedProducts["Wall"] && (() => {
                            const selectedWall = SKU_OPTIONS.find(
                              (s) => s.id === selectedProducts["Wall"]
                            );
                            const selectedColor = selectedColors[selectedProducts["Wall"]] || "white";
                            const wallImageUrl = selectedColor === "golden" && selectedWall?.imageUrlGolden
                              ? selectedWall.imageUrlGolden
                              : selectedWall?.imageUrl;

                            return (
                              <motion.img
                                key={selectedProducts["Wall"] + selectedColor}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                src={wallImageUrl}
                                alt="Selected Wall"
                                className="absolute pointer-events-none"
                                style={{
                                  top: '0%',
                                  left: '14.8%',
                                  width: '71%',
                                  height: '96%',
                                  objectFit: 'fill',
                                  zIndex: 1
                                }}
                              />
                            );
                          })()}

                          {/* Overlay Selected Ceiling */}
                          {selectedProducts["Ceiling"] && (() => {
                            const selectedCeiling = SKU_OPTIONS.find(
                              (s) => s.id === selectedProducts["Ceiling"]
                            );
                            const selectedColor = selectedColors[selectedProducts["Ceiling"]] || "white";
                            const ceilingImageUrl = selectedColor === "golden" && selectedCeiling?.imageUrlGolden
                              ? selectedCeiling.imageUrlGolden
                              : selectedCeiling?.imageUrl;

                            return (
                              <motion.img
                                key={selectedProducts["Ceiling"] + selectedColor}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                src={ceilingImageUrl}
                                alt="Selected Ceiling"
                                className="absolute pointer-events-none"
                                style={{
                                  top: '-3%',
                                  left: '14.8%',
                                  width: '71%',
                                  height: 'auto',
                                  objectFit: 'contain',
                                  zIndex: 1
                                }}
                              />
                            );
                          })()}
                    </div>

                    {/* Overlay for uploaded image prompt */}
                    {isUploadedImage && !hasGenerated && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl text-center max-w-sm shadow-2xl">
                          <Sparkles className="w-10 h-10 text-[#2A9D8F] mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-[#1A3A52] mb-2">
                            Ready to Visualize
                          </h3>
                          <p className="text-sm text-[#6B6B6B] mb-6">
                            Select your products then click Generate to see them
                            in your space.
                          </p>
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
                    {Object.entries(selectedProducts).map(
                      ([category, productId]) => {
                        const product = SKU_OPTIONS.find(
                          (s) => s.id === productId,
                        );
                        return (
                          <div
                            key={category}
                            className="flex-shrink-0 bg-[#F5F4F0] px-4 py-2 rounded-full border border-[#E8E6E1] flex items-center gap-2"
                          >
                            <span className="text-[10px] font-bold text-[#2A9D8F] uppercase">
                              {category}
                            </span>
                            <span className="text-xs font-bold text-[#1A3A52]">
                              {product?.name}
                            </span>
                          </div>
                        );
                      },
                    )}
                  </div>
                ) : (
                  <p className="text-[12px] text-[#6B6B6B]">
                    Select products from the left to begin your customization.
                  </p>
                )}
              </div>

              <button
                onClick={handleContinue}
                className="flex items-center gap-3 px-5 py-3 bg-[#2A9D8F] hover:bg-[#238b7f] text-white rounded-2xl font-bold text-[15px] shadow-xl shadow-[#2A9D8F]/20 transition-all hover:-translate-y-1 active:translate-y-0"
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
