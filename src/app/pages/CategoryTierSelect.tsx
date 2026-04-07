import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useDesign } from "../context/DesignContext";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

const CATEGORIES: Category[] = [
  {
    id: "bathroom",
    name: "Bathroom",
    imageUrl: "https://images.unsplash.com/photo-1774578342098-66adff9c1fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHJlbm92YXRpb24lMjBtb2Rlcm58ZW58MXx8fHwxNzc1MDkzODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1772567732969-c1506edf80a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcmVtb2RlbCUyMGNvbnRlbXBvcmFyeXxlbnwxfHx8fDE3NzUxMjk5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "living",
    name: "Living Room",
    imageUrl: "https://images.unsplash.com/photo-1749704647804-81338ade5546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzUxMjk5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function CategoryTierSelect() {
  const navigate = useNavigate();
  const { updateSelections } = useDesign();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedCategory) {
      const category = CATEGORIES.find((c) => c.id === selectedCategory);
      
      updateSelections({
        category: category?.name,
      });
      
      navigate("/room");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/zip")}
          className="absolute top-12 left-12 flex items-center gap-2 text-[#1A3A52] hover:text-[#2A9D8F] font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Zip Code
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#2A9D8F] tracking-wider uppercase mb-3">
              Step 2 of 5
            </p>
            <h1 className="text-5xl font-bold text-[#1A3A52] mb-4">
              Choose Your Space
            </h1>
            <p className="text-xl text-[#6B6B6B]">
              Select the room type you want to remodel
            </p>
          </div>

          {/* Category Selection */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 text-left group ${
                      isSelected
                        ? "ring-4 ring-[#2A9D8F] shadow-2xl"
                        : selectedCategory
                        ? "opacity-50 hover:opacity-70"
                        : "hover:shadow-xl"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isSelected ? "scale-105" : "group-hover:scale-110"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Selected Badge */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-4 right-4 w-10 h-10 bg-[#2A9D8F] rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        </motion.div>
                      )}

                      {/* Category Name */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedCategory ? 1 : 0 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleContinue}
              disabled={!selectedCategory}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-12 py-6 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 flex items-center gap-3 ${
                selectedCategory
                  ? "bg-[#2A9D8F] hover:bg-[#238b7f] text-white cursor-pointer"
                  : "bg-[#E8E6E1] text-[#B0B0B0] cursor-not-allowed"
              }`}
            >
              Continue to Room Selection
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}